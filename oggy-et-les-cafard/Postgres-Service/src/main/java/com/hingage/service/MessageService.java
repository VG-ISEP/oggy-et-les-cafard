package com.hingage.service;

import com.hingage.model.Messages;
import com.hingage.model.Users;
import com.hingage.model.Conversations;
import com.hingage.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    public Messages sendMessage(Users sender, Users receiver, Conversations conversation, String content) {
        Messages message = new Messages();
        message.setSender(sender);
        message.setReceiver(receiver);
        message.setConversation(conversation);
        message.setContent(content);
        message.setTimestamp(LocalDateTime.now());
        return messageRepository.save(message);
    }

    public List<Messages> getMessagesForConversation(Conversations conversation) {
        return messageRepository.findByConversationOrderByTimestampAsc(conversation);
    }

    public List<Messages> getAllMessagesByUser(Users user) {
        return messageRepository.findBySenderOrReceiver(user, user);
    }
}
