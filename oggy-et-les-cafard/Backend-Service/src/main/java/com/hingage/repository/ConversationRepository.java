package com.hingage.repository;

import com.hingage.model.Conversations;
import com.hingage.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ConversationRepository extends JpaRepository<Conversations, UUID> {
    List<Conversations> findByUser1OrUser2(Users user1, Users user2);
    Optional<Conversations> findByUser1AndUser2(Users user1, Users user2);
}
