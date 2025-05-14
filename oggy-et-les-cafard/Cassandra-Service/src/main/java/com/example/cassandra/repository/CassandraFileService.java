package Cassandra;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.cassandra.model.ChatbotFile;

import java.util.List;
import java.util.UUID;

@Service
public class CassandraFileService {

    @Autowired
    private ChatbotFileRepository chatbotFileRepository;

    // 🔹 Stocker un fichier JSON avec un type spécifique
    public void saveFile(UUID requestId, UUID sessionId, String jsonData, String status) {
        ChatbotFile file = new ChatbotFile(requestId, sessionId, jsonData, status, System.currentTimeMillis());
        chatbotFileRepository.save(file);
    }

    // 🔹 Récupérer un fichier JSON par ID
    public ChatbotFile getFileById(UUID requestId) {
        return chatbotFileRepository.findById(requestId).orElse(null);
    }

    public void deleteFile(UUID requestID)
    {
        ChatbotFile act = getFileById(requestID);
        chatbotFileRepository.delete(act);
    }
}
