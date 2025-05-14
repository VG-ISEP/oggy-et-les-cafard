package Cassandra;

import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.stereotype.Repository;
import com.example.cassandra.model.ChatbotFile;
import java.util.List;
import java.util.UUID;

@Repository
public interface ChatbotFileRepository extends CassandraRepository<ChatbotFile, UUID> {
    List<ChatbotFile> findByRequestId(UUID requestId);

}
