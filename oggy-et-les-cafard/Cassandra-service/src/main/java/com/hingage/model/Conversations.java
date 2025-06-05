package com.hingage.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "conversations")
public class Conversations {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID conversationId;

    @ManyToOne
    @JoinColumn(name = "user1_id", nullable = false)
    private Users user1;

    @ManyToOne
    @JoinColumn(name = "user2_id", nullable = false)
    private Users user2;

    @OneToMany(mappedBy = "conversation", cascade = CascadeType.ALL)
    private List<Messages> messages;

    private Long startedAt;
}
