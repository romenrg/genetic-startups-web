class ProbabilitiesModel
  NUM_QUARTERS = 4
  NUM_ACTIONS = 10
  ACTIONS = {
    "None" => 0,
    "Advisor" => 1,
    "Circus" => 2,
    "Team" => 3,
    "Product" => 4,
    "Feedback" => 5,
    "Investor" => 6,
    "Doubts" => 7,
    "Sales" => 8,
    "BadNews" => 9
  }

  def initialize
    super
    @action_probabilities_per_q = Array.new(NUM_QUARTERS) { Array.new(NUM_ACTIONS) }
    # First Q
    @action_probabilities_per_q[0][ACTIONS["None"]] = 55
    @action_probabilities_per_q[0][ACTIONS["Advisor"]] = 11
    @action_probabilities_per_q[0][ACTIONS["Circus"]] = 8
    @action_probabilities_per_q[0][ACTIONS["Team"]] = 5
    @action_probabilities_per_q[0][ACTIONS["Product"]] = 5
    @action_probabilities_per_q[0][ACTIONS["Feedback"]] = 2
    @action_probabilities_per_q[0][ACTIONS["Investor"]] = 1
    @action_probabilities_per_q[0][ACTIONS["Doubts"]] = 8
    @action_probabilities_per_q[0][ACTIONS["Sales"]] = 1
    @action_probabilities_per_q[0][ACTIONS["BadNews"]] = 4
    # Second Q
    @action_probabilities_per_q[1][ACTIONS["None"]] = 50
    @action_probabilities_per_q[1][ACTIONS["Advisor"]] = 9
    @action_probabilities_per_q[1][ACTIONS["Circus"]] = 10
    @action_probabilities_per_q[1][ACTIONS["Team"]] = 4
    @action_probabilities_per_q[1][ACTIONS["Product"]] = 7
    @action_probabilities_per_q[1][ACTIONS["Feedback"]] = 6
    @action_probabilities_per_q[1][ACTIONS["Investor"]] = 1
    @action_probabilities_per_q[1][ACTIONS["Doubts"]] = 5
    @action_probabilities_per_q[1][ACTIONS["Sales"]] = 1
    @action_probabilities_per_q[1][ACTIONS["BadNews"]] = 7
    # Third Q
    @action_probabilities_per_q[2][ACTIONS["None"]] = 50
    @action_probabilities_per_q[2][ACTIONS["Advisor"]] = 5
    @action_probabilities_per_q[2][ACTIONS["Circus"]] = 7
    @action_probabilities_per_q[2][ACTIONS["Team"]] = 5
    @action_probabilities_per_q[2][ACTIONS["Product"]] = 7
    @action_probabilities_per_q[2][ACTIONS["Feedback"]] = 10
    @action_probabilities_per_q[2][ACTIONS["Investor"]] = 4
    @action_probabilities_per_q[2][ACTIONS["Doubts"]] = 3
    @action_probabilities_per_q[2][ACTIONS["Sales"]] = 3
    @action_probabilities_per_q[2][ACTIONS["BadNews"]] = 6
    # Fourth Q
    @action_probabilities_per_q[3][ACTIONS["None"]] = 55
    @action_probabilities_per_q[3][ACTIONS["Advisor"]] = 2
    @action_probabilities_per_q[3][ACTIONS["Circus"]] = 3
    @action_probabilities_per_q[3][ACTIONS["Team"]] = 6
    @action_probabilities_per_q[3][ACTIONS["Product"]] = 4
    @action_probabilities_per_q[3][ACTIONS["Feedback"]] = 7
    @action_probabilities_per_q[3][ACTIONS["Investor"]] = 5
    @action_probabilities_per_q[3][ACTIONS["Doubts"]] = 2
    @action_probabilities_per_q[3][ACTIONS["Sales"]] = 13
    @action_probabilities_per_q[3][ACTIONS["BadNews"]] = 3
  end

  attr_reader :action_probabilities_per_q

end