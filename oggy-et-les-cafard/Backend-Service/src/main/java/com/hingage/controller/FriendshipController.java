package com.hingage.controller;

import com.hingage.model.Friendship;
import com.hingage.model.Users;
import com.hingage.service.FriendshipService;
import com.hingage.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/friendships")
@RequiredArgsConstructor
public class FriendshipController {

    private final FriendshipService friendshipService;
    private final UserService userService;

    @PostMapping("/like")
    public ResponseEntity<Friendship> likeUser(@RequestParam UUID fromUserId, @RequestParam UUID toUserId) {
        Optional<Users> from = userService.getUserById(fromUserId);
        Optional<Users> to = userService.getUserById(toUserId);
        if (from.isPresent() && to.isPresent()) {
            return ResponseEntity.ok(friendshipService.sendFriendRequest(from.get(), to.get()));
        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping("/accept")
    public ResponseEntity<Friendship> acceptFriendship(@RequestParam UUID friendshipId) {
        return friendshipService.getFriendshipById(friendshipId)
                .map(friendshipService::acceptFriendRequest)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/block")
    public ResponseEntity<Friendship> blockUser(@RequestParam UUID fromUserId, @RequestParam UUID toUserId) {
        Optional<Users> from = userService.getUserById(fromUserId);
        Optional<Users> to = userService.getUserById(toUserId);
        if (from.isPresent() && to.isPresent()) {
            return ResponseEntity.ok(friendshipService.blockUser(from.get(), to.get()));
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/sent")
    public ResponseEntity<List<Friendship>> sentRequests(@RequestParam UUID userId) {
        return userService.getUserById(userId)
                .map(friendshipService::getSentRequests)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/received")
    public ResponseEntity<List<Friendship>> receivedRequests(@RequestParam UUID userId) {
        return userService.getUserById(userId)
                .map(friendshipService::getReceivedRequests)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
