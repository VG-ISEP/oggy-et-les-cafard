package com.cassandra.repository;

import com.cassandra.model.Users;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CassandraFileRepository extends CassandraRepository<Users, UUID> {
    List<Users> findByUserId(UUID userId);



}
