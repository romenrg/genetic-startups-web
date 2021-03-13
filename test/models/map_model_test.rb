require "test_helper"

class MapModelTest < ActiveSupport::TestCase

  test "the truth" do
    assert true
  end

  test "actionProbabilityPerQ matrix is generated correctly" do
    @map = MapModel.new 3, 6
    assert_equal MapModel::NUM_QUARTERS, @map.action_probabilities_per_q.size
    assert_equal MapModel::NUM_ACTIONS, @map.action_probabilities_per_q[0].size
  end

  test "probabilities per map quarter should amount to 100" do
    @map = MapModel.new 3, 6
    @map.action_probabilities_per_q.each do |quarter|
      total_probabilities = 0
      total_probabilities += quarter[MapModel::ACTIONS["None"]]
      total_probabilities += quarter[MapModel::ACTIONS["Advisor"]]
      total_probabilities += quarter[MapModel::ACTIONS["Circus"]]
      total_probabilities += quarter[MapModel::ACTIONS["Team"]]
      total_probabilities += quarter[MapModel::ACTIONS["Product"]]
      total_probabilities += quarter[MapModel::ACTIONS["Feedback"]]
      total_probabilities += quarter[MapModel::ACTIONS["Investor"]]
      total_probabilities += quarter[MapModel::ACTIONS["Doubts"]]
      total_probabilities += quarter[MapModel::ACTIONS["Sales"]]
      total_probabilities += quarter[MapModel::ACTIONS["BadNews"]]
      assert_equal 100, total_probabilities
    end
  end

  test "none is the first action for first q" do
    @map = MapModel.new 3, 40
    action = @map.get_action_from_q_and_num(0, 20)
    assert_equal MapModel::ACTIONS["None"], action
  end

  test "advisor is the second action for second q" do
    @map = MapModel.new 3, 40
    action = @map.get_action_from_q_and_num(1, 60)
    assert_equal MapModel::ACTIONS["Advisor"], action
  end

  test "badnews is the last action for last q" do
    @map = MapModel.new 3, 40
    action = @map.get_action_from_q_and_num(3, 100)
    assert_equal MapModel::ACTIONS["BadNews"], action
  end

  test "board matrix is properly generated" do
    @map = MapModel.new 3, 40
    @map.generate_random_cells
    assert_equal 40, @map.cells.size()
    assert_equal 3, @map.cells[0].size()
  end

end