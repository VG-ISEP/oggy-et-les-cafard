package com.hingage.repository;

import com.hingage.model.Messages;
import com.hingage.model.Users;
import com.hingage.model.Conversations;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface MessageRepository extends JpaRepository<Messages, UUID> {
    List<Messages> findBySenderOrReceiver(Users sender, Users receiver);
    List<Messages> findByConversationOrderByTimestampAsc(Conversations conversation);
}
