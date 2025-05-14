package Cassandra;

import com.datastax.oss.driver.api.core.CqlSession;
import java.net.InetSocketAddress;

public class CassandraTest {
    public static void main(String[] args) {
        try (CqlSession session = CqlSession.builder()
                .addContactPoint(new InetSocketAddress("127.0.0.1", 9042))
                .withLocalDatacenter("datacenter1")
                .withAuthCredentials("cassandra", "cassandra")
                .build()) {

            System.out.println("Cassandra is reachable ✅");
            System.out.println("Keyspaces: " + session.getMetadata().getKeyspaces().keySet());

        } catch (Exception e) {
            System.err.println("❌ Could not connect to Cassandra:");
            e.printStackTrace();
        }
    }
}
