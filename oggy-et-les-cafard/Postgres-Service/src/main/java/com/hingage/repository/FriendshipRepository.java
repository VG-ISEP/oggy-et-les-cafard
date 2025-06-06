package com.hingage.repository;

import com.hingage.model.Friendship;
import com.hingage.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface FriendshipRepository extends JpaRepository<Friendship, UUID> {

    List<Friendship> findByRequester(Users requester);

    List<Friendship> findByReceiver(Users receiver);

    Optional<Friendship> findByRequesterAndReceiver(Users requester, Users receiver);
}
