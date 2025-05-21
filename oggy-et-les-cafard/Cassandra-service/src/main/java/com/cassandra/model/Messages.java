package com.cassandra.model;

import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.UUID;
import java.time.LocalDate;

@Table("messages")
public class Messages {

    @PrimaryKey
    private UUID userId;
    private String userName;
    private String userSurname;
    private LocalDate dateOfBirth;
    private String username;
    private String email;
    private String password;
    private Long timestamp;

    public Messages(UUID userId, String userName, String userSurname, LocalDate dateOfBirth, String username, String email, String password, Long timestamp) {
        this.userId = userId;
        this.userName = userName;
        this.userSurname = userSurname;
        this.dateOfBirth = dateOfBirth;
        this.username = username;
        this.email = email;
        setPassword(password);
        this.timestamp = timestamp;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserSurname() {
        return userSurname;
    }

    public void setUserSurname(String userSurname) {
        this.userSurname = userSurname;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        this.password = encoder.encode(password);
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    public Long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Long timestamp) {
        this.timestamp = timestamp;
    }
}
