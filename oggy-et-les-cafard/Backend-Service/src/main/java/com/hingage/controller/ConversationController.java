package com.hingage.controller;

import com.hingage.model.Conversations;
import com.hingage.model.Users;
import com.hingage.service.ConversationService;
import com.hingage.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/conversations")
@RequiredArgsConstructor
public class ConversationController {

    private final ConversationService conversationService;
    private final UserService userService;

    @PostMapping
    public ResponseEntity<Conversations> startConversation(@RequestParam UUID user1Id, @RequestParam UUID user2Id) {
        Optional<Users> user1 = userService.getUserById(user1Id);
        Optional<Users> user2 = userService.getUserById(user2Id);
        if (user1.isPresent() && user2.isPresent()) {
            return ResponseEntity.ok(conversationService.createConversation(user1.get(), user2.get()));
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Conversations> getConversation(@PathVariable UUID id) {
        return conversationService.getConversation(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/user")
    public ResponseEntity<List<Conversations>> getConversationsByUser(@RequestParam UUID userId) {
        return userService.getUserById(userId)
                .map(conversationService::getUserConversations)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
