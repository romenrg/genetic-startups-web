class MapModel
  NUM_QUARTERS = 4
  NUM_ACTIONS = 10

  def initialize(num_rows, num_cols)
    @num_rows = num_rows
    @num_cols = num_cols
    @actionProbabilityPerQ = Array.new(NUM_QUARTERS){Array.new(NUM_ACTIONS)}
  end

  attr_reader :num_rows
  attr_reader :num_cols
  attr_reader :actionProbabilityPerQ

  attr_writer :num_rows
  attr_writer :num_cols
  attr_writer :actionProbabilityPerQ

end