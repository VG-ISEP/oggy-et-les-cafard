package com.hingage.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID userId;

    private String userName;
    private String userSurname;
    private LocalDate dateOfBirth;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    private Long timestamp;

    @OneToMany(mappedBy = "sender", cascade = CascadeType.ALL)
    private List<Messages> sentMessages;

    @OneToMany(mappedBy = "receiver", cascade = CascadeType.ALL)
    private List<Messages> receivedMessages;

    @OneToMany(mappedBy = "user1", cascade = CascadeType.ALL)
    private List<Conversations> initiatedConversations;

    @OneToMany(mappedBy = "user2", cascade = CascadeType.ALL)
    private List<Conversations> receivedConversations;
}
