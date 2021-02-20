require "test_helper"

class MapModelTest < ActiveSupport::TestCase

  test "the truth" do
    assert true
  end

  test "actionProbabilityPerQ matrix is generated correctly" do
    @map = MapModel.new 3, 6
    assert_equal MapModel::NUM_QUARTERS, @map.actionProbabilitiesPerQ.size
    assert_equal MapModel::NUM_ACTIONS, @map.actionProbabilitiesPerQ[0].size
  end

  test "probabilities per map quarter should amount to 100" do
    @map = MapModel.new 3, 6
    @map.actionProbabilitiesPerQ.each do |quarter|
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

end