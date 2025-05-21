package com.cassandra;

import jakarta.annotation.PostConstruct;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com")
public class CassandraServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(CassandraServiceApplication.class, args);
        System.out.println("✅ Cassandra Service démarre avec succès !");
    }
    @PostConstruct
    public void init() {
        System.out.println("✅ UserMessageController ready!");
    }

}
