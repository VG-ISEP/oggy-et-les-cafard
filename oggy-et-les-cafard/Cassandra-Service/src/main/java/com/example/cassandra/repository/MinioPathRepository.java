package Cassandra;

import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.stereotype.Repository;
import com.example.cassandra.model.MinioPath;
import java.util.List;
import java.util.UUID;

@Repository
public interface MinioPathRepository extends CassandraRepository<MinioPath, UUID> {
    List<MinioPath> findByStatus(String status);
}
