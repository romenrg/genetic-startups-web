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
    for i in 0..NUM_QUARTERS-1 do
      @actionProbabilitiesPerQ[i][ACTIONS["None"]] = 10
      @actionProbabilitiesPerQ[i][ACTIONS["Advisor"]] = 10
      @actionProbabilitiesPerQ[i][ACTIONS["Circus"]] = 10
      @actionProbabilitiesPerQ[i][ACTIONS["Team"]] = 10
      @actionProbabilitiesPerQ[i][ACTIONS["Product"]] = 10
      @actionProbabilitiesPerQ[i][ACTIONS["Feedback"]] = 10
      @actionProbabilitiesPerQ[i][ACTIONS["Investor"]] = 10
      @actionProbabilitiesPerQ[i][ACTIONS["Doubts"]] = 10
      @actionProbabilitiesPerQ[i][ACTIONS["Sales"]] = 10
      @actionProbabilitiesPerQ[i][ACTIONS["BadNews"]] = 10
    end
  end

end