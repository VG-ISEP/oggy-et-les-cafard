package Cassandra;

import com.example.cassandra.model.ChatbotFile;
import com.example.cassandra.repository.CassandraFileService;
import io.cucumber.java.en.*;
import io.cucumber.java.After;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.ResponseEntity;

import java.util.Objects;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;


public class StepDefinitions {

    @Autowired
    private CassandraFileService cassandraFileService;

    private final TestRestTemplate restTemplate = new TestRestTemplate();
    private ResponseEntity<String> response;

    @After
    public void after(){
        cassandraFileService.deleteFile(UUID.fromString("550e8400-e29b-41d4-a716-446655440000"));
    }

    @Given("Cassandra up and running")
    public void the_chatbot_is_running() {
        System.out.println("Cassandra is running ✅");
    }

    @When("I insert a new line containing the requestId {string}")
    public void i_send_the_message(String requestId) {
        cassandraFileService.saveFile(UUID.fromString(requestId), UUID.fromString("550e8400-e29b-41d4-a716-446655440000"), "", "TEST");
    }

    @Then("I should find a line with the requestId {string} in the database")
    public void i_should_receive_a_response_containing(String requestId) {
        assertNotNull(cassandraFileService.getFileById(UUID.fromString(requestId)));
        assertEquals("TEST", cassandraFileService.getFileById(UUID.fromString(requestId)).getStatus());
    }
}