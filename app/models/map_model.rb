class MapModel
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

  def initialize(num_rows, num_cols)
    @num_rows = num_rows
    @num_cols = num_cols
    generateActionProbabilitiesPerQ()
  end

  attr_reader :num_rows
  attr_reader :num_cols
  attr_reader :actionProbabilitiesPerQ

  attr_writer :num_rows
  attr_writer :num_cols
  attr_writer :actionProbabilitiesPerQ

  private

  def generateActionProbabilitiesPerQ
    @actionProbabilitiesPerQ = Array.new(NUM_QUARTERS) { Array.new(NUM_ACTIONS) }
    # First Q
    @actionProbabilitiesPerQ[0][ACTIONS["None"]] = 65
    @actionProbabilitiesPerQ[0][ACTIONS["Advisor"]] = 11
    @actionProbabilitiesPerQ[0][ACTIONS["Circus"]] = 8
    @actionProbabilitiesPerQ[0][ACTIONS["Team"]] = 4
    @actionProbabilitiesPerQ[0][ACTIONS["Product"]] = 2
    @actionProbabilitiesPerQ[0][ACTIONS["Feedback"]] = 2
    @actionProbabilitiesPerQ[0][ACTIONS["Investor"]] = 1
    @actionProbabilitiesPerQ[0][ACTIONS["Doubts"]] = 4
    @actionProbabilitiesPerQ[0][ACTIONS["Sales"]] = 1
    @actionProbabilitiesPerQ[0][ACTIONS["BadNews"]] = 2
    # Second Q
    @actionProbabilitiesPerQ[1][ACTIONS["None"]] = 55
    @actionProbabilitiesPerQ[1][ACTIONS["Advisor"]] = 8
    @actionProbabilitiesPerQ[1][ACTIONS["Circus"]] = 13
    @actionProbabilitiesPerQ[1][ACTIONS["Team"]] = 4
    @actionProbabilitiesPerQ[1][ACTIONS["Product"]] = 6
    @actionProbabilitiesPerQ[1][ACTIONS["Feedback"]] = 4
    @actionProbabilitiesPerQ[1][ACTIONS["Investor"]] = 1
    @actionProbabilitiesPerQ[1][ACTIONS["Doubts"]] = 3
    @actionProbabilitiesPerQ[1][ACTIONS["Sales"]] = 1
    @actionProbabilitiesPerQ[1][ACTIONS["BadNews"]] = 5
    # Third Q
    @actionProbabilitiesPerQ[2][ACTIONS["None"]] = 55
    @actionProbabilitiesPerQ[2][ACTIONS["Advisor"]] = 6
    @actionProbabilitiesPerQ[2][ACTIONS["Circus"]] = 6
    @actionProbabilitiesPerQ[2][ACTIONS["Team"]] = 4
    @actionProbabilitiesPerQ[2][ACTIONS["Product"]] = 5
    @actionProbabilitiesPerQ[2][ACTIONS["Feedback"]] = 7
    @actionProbabilitiesPerQ[2][ACTIONS["Investor"]] = 3
    @actionProbabilitiesPerQ[2][ACTIONS["Doubts"]] = 2
    @actionProbabilitiesPerQ[2][ACTIONS["Sales"]] = 4
    @actionProbabilitiesPerQ[2][ACTIONS["BadNews"]] = 8
    # Fourth Q
    @actionProbabilitiesPerQ[3][ACTIONS["None"]] = 70
    @actionProbabilitiesPerQ[3][ACTIONS["Advisor"]] = 2
    @actionProbabilitiesPerQ[3][ACTIONS["Circus"]] = 4
    @actionProbabilitiesPerQ[3][ACTIONS["Team"]] = 3
    @actionProbabilitiesPerQ[3][ACTIONS["Product"]] = 3
    @actionProbabilitiesPerQ[3][ACTIONS["Feedback"]] = 5
    @actionProbabilitiesPerQ[3][ACTIONS["Investor"]] = 3
    @actionProbabilitiesPerQ[3][ACTIONS["Doubts"]] = 0
    @actionProbabilitiesPerQ[3][ACTIONS["Sales"]] = 7
    @actionProbabilitiesPerQ[3][ACTIONS["BadNews"]] = 3
  end

end