require "test_helper"

class MapModelTest < ActiveSupport::TestCase

  test "none is the first action for first q" do
    @map = MapModel.new 3, 40
    action = @map.get_action_from_q_and_num(0, 20)
    assert_equal ProbabilitiesModel::ACTIONS["None"], action
  end

  test "circus is the action to which '60' belongs, for second q" do
    @map = MapModel.new 3, 40
    action = @map.get_action_from_q_and_num(1, 60)
    assert_equal ProbabilitiesModel::ACTIONS["Circus"], action
  end

  test "badnews is the last action for last q" do
    @map = MapModel.new 3, 40
    action = @map.get_action_from_q_and_num(3, 100)
    assert_equal ProbabilitiesModel::ACTIONS["BadNews"], action
  end

  test "board matrix is properly generated" do
    @map = MapModel.new 3, 40
    @map.generate_random_cells
    assert_equal 40, @map.cells.size()
    assert_equal 3, @map.cells[0].size()
  end

end