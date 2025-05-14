package Cassandra;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.cassandra.model.MinioPath;
import java.util.List;
import java.util.UUID;

@Service
public class CassandraMinioPathService {

    @Autowired
    private MinioPathRepository minioPathRepository;

    // 🔹 Stocker un chemin minIO au format JSON
    public void saveMinioPath(UUID requestId, UUID sessionId, String path, String jsonData, String status) {
        MinioPath minioPath = new MinioPath(requestId, sessionId, path, jsonData, status, System.currentTimeMillis());
        minioPathRepository.save(minioPath);
    }

    // 🔹 Récupérer un chemin minIO par ID
    public MinioPath getMinioPathById(UUID requestId) {
        return minioPathRepository.findById(requestId).orElse(null);
    }

    // 🔹 Récupérer tous les chemins minIO selon un statut
    public List<MinioPath> getMinioPathsByStatus(String status) {
        return minioPathRepository.findByStatus(status);
    }
}
