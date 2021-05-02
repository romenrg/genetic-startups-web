class MapModel

  def initialize(num_rows, num_cols)
    @num_rows = num_rows
    @num_cols = num_cols
    probabilities = ProbabilitiesModel.new
    @action_probabilities_per_q = probabilities.action_probabilities_per_q
  end

  attr_reader :num_rows
  attr_reader :num_cols
  attr_reader :cells

  attr_writer :num_rows
  attr_writer :num_cols

  def generate_random_cells()
    @cells = Array.new(num_cols) { Array.new(num_rows) }
    q = 0
    for j in 0..num_cols-1 do
      if j < num_cols / 4
        q = 0
      elsif j < 2 * num_cols / 4
        q = 1
      elsif j < 3 * num_cols / 4
        q = 2
      else
        q = 3
      end
      for i in 0..num_rows-1 do
        random_num = rand(101)
        @cells[j][i] = get_action_from_q_and_num(q, random_num)
      end
    end
  end

  def get_action_from_q_and_num(q, num)
    current_action = 0
    current_range = @action_probabilities_per_q[q][current_action]
    i = 1
    while current_range < num
      current_action = i
      current_range += @action_probabilities_per_q[q][current_action]
      i+=1
    end
    return current_action
  end

end