package com.cassandra.repository;

import com.cassandra.model.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class CassandraFileService {

    @Autowired
    private CassandraFileRepository CassandraFileRepository;


}
