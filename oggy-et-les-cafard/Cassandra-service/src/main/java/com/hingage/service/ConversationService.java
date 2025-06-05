package com.hingage.service;

import com.hingage.model.Conversations;
import com.hingage.model.Users;
import com.hingage.repository.ConversationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ConversationService {

    @Autowired
    private ConversationRepository conversationRepository;

    public Conversations createConversation(Users user1, Users user2) {
        Optional<Conversations> existing = conversationRepository.findByUser1AndUser2(user1, user2);
        if (existing.isPresent()) {
            return existing.get();
        }
        Conversations conversation = new Conversations();
        conversation.setUser1(user1);
        conversation.setUser2(user2);
        conversation.setStartedAt(System.currentTimeMillis());
        return conversationRepository.save(conversation);
    }

    public List<Conversations> getUserConversations(Users user) {
        return conversationRepository.findByUser1OrUser2(user, user);
    }

    public Optional<Conversations> getConversation(UUID conversationId) {
        return conversationRepository.findById(conversationId);
    }
}
