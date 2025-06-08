package com.hingage.controller;

import com.hingage.model.Conversations;
import com.hingage.model.Messages;
import com.hingage.model.Users;
import com.hingage.service.ConversationService;
import com.hingage.service.MessageService;
import com.hingage.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/messages")
@RequiredArgsConstructor
public class MessageController {

    private final MessageService messageService;
    private final UserService userService;
    private final ConversationService conversationService;

    @PostMapping
    public ResponseEntity<Messages> sendMessage(
            @RequestParam UUID senderId,
            @RequestParam UUID receiverId,
            @RequestParam UUID conversationId,
            @RequestParam String content
    ) {
        Optional<Users> sender = userService.getUserById(senderId);
        Optional<Users> receiver = userService.getUserById(receiverId);
        Optional<Conversations> conv = conversationService.getConversation(conversationId);

        if (sender.isPresent() && receiver.isPresent() && conv.isPresent()) {
            return ResponseEntity.ok(
                    messageService.sendMessage(sender.get(), receiver.get(), conv.get(), content)
            );
        }

        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/conversation/{id}")
    public ResponseEntity<List<Messages>> getMessages(@PathVariable UUID id) {
        return conversationService.getConversation(id)
                .map(messageService::getMessagesForConversation)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/user")
    public ResponseEntity<List<Messages>> getUserMessages(@RequestParam UUID userId) {
        return userService.getUserById(userId)
                .map(messageService::getAllMessagesByUser)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
