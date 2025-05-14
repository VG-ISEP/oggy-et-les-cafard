package Cassandra;

import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

import java.util.UUID;

@Table("chatbot_files")
public class ChatbotFile {

    @PrimaryKey
    private UUID requestId;  // UUID unique par fichier stocké
    private UUID sessionId;
    private String jsonData;   // Contenu du fichier JSON
    private String status;     // status (might refer to kafka topic)
    private Long timestamp;    // Date de stockage

    public ChatbotFile(UUID requestId, UUID sessionId, String jsonData, String status, Long timestamp) {
        this.requestId = requestId;
        this.sessionId = sessionId;
        this.jsonData = jsonData;
        this.status = status;
        this.timestamp = timestamp;
    }

    // Getters & Setters
    public UUID getRequestId() { return requestId; }
    public void setRequestId(UUID requestId) { this.requestId = requestId; }

    public UUID getSessionId() { return requestId; }
    public void setSessionId(UUID sessionId) { this.sessionId = sessionId; }

    public String getJsonData() { return jsonData; }
    public void setJsonData(String jsonData) { this.jsonData = jsonData; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Long getTimestamp() { return timestamp; }
    public void setTimestamp(Long timestamp) { this.timestamp = timestamp; }
}
