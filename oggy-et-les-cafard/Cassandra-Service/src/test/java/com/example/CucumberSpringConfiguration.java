package Cassandra;

import com.example.cassandra.CassandraServiceApplication;
import io.cucumber.spring.CucumberContextConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.ComponentScan;

@CucumberContextConfiguration
@ComponentScan(basePackages = {
        "request.engine",
        "com.example.cassandra.repository"
})
@SpringBootTest(
        classes = CassandraServiceApplication.class,
        webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT
)
public class CucumberSpringConfiguration {
}
