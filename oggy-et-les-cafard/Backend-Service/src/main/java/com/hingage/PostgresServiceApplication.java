package com.hingage;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com")
public class PostgresServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(PostgresServiceApplication.class, args);
    }
}
