Feature: Chatbot interaction

  Scenario: I insert a line in the database
    Given Cassandra up and running
    When I insert a new line containing the requestId "550e8400-e29b-41d4-a716-446655440000"
    Then I should find a line with the requestId "550e8400-e29b-41d4-a716-446655440000" in the database


#  Scenario: I insert a line in the database
#    Given Cassandra up and running
#    When I insert a new line containing the requestId "550e8400-e29b-41d4-a716-446655440000"
#    Then I should find a line with the requestId "550e8400-e29b-41d4-a716-446655440000" in the database
