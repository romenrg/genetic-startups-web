class MapModel

  def initialize(num_rows, num_cols)
    @num_rows = num_rows
    @num_cols = num_cols
  end

  attr_reader :num_rows
  attr_reader :num_cols

  attr_writer :num_rows
  attr_writer :num_cols

end