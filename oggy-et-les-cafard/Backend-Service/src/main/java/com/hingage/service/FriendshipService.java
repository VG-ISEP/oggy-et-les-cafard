package com.hingage.service;

import com.hingage.model.Friendship;
import com.hingage.model.Users;
import com.hingage.repository.FriendshipRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class FriendshipService {

    @Autowired
    private FriendshipRepository friendshipRepository;

    public Friendship sendFriendRequest(Users from, Users to) {
        Optional<Friendship> existing = friendshipRepository.findByRequesterAndReceiver(from, to);

        if (existing.isPresent()) {
            return existing.get(); // ou update le status si besoin
        }

        Friendship friendship = new Friendship();
        friendship.setRequester(from);
        friendship.setReceiver(to);
        friendship.setStatus("pending");
        friendship.setCreatedAt(LocalDateTime.now());

        return friendshipRepository.save(friendship);
    }

    public Friendship acceptFriendRequest(Friendship friendship) {
        friendship.setStatus("accepted");
        return friendshipRepository.save(friendship);
    }

    public Friendship rejectFriendRequest(Friendship friendship) {
        friendship.setStatus("rejected");
        return friendshipRepository.save(friendship);
    }

    public Friendship blockUser(Users from, Users to) {
        Optional<Friendship> existing = friendshipRepository.findByRequesterAndReceiver(from, to);

        Friendship friendship = existing.orElseGet(() -> {
            Friendship f = new Friendship();
            f.setRequester(from);
            f.setReceiver(to);
            f.setCreatedAt(LocalDateTime.now());
            return f;
        });

        friendship.setStatus("blocked");
        return friendshipRepository.save(friendship);
    }

    public List<Friendship> getReceivedRequests(Users user) {
        return friendshipRepository.findByReceiver(user);
    }

    public List<Friendship> getSentRequests(Users user) {
        return friendshipRepository.findByRequester(user);
    }

    public Optional<Friendship> getFriendshipById(UUID id) {
        return friendshipRepository.findById(id);
    }

    public Optional<Friendship> getFriendshipBetween(Users a, Users b) {
        return friendshipRepository.findByRequesterAndReceiver(a, b)
                .or(() -> friendshipRepository.findByRequesterAndReceiver(b, a));
    }
}
