require "test_helper"

class ProbabilitiesModelTest < ActiveSupport::TestCase

  test "actionProbabilityPerQ matrix is generated correctly" do
    probabilities = ProbabilitiesModel.new
    assert_equal ProbabilitiesModel::NUM_QUARTERS, probabilities.action_probabilities_per_q.size
    assert_equal ProbabilitiesModel::NUM_ACTIONS, probabilities.action_probabilities_per_q[0].size
  end

  test "probabilities per map quarter should amount to 100" do
    probabilities = ProbabilitiesModel.new
    probabilities.action_probabilities_per_q.each do |quarter|
      total_probabilities = 0
      total_probabilities += quarter[ProbabilitiesModel::ACTIONS["None"]]
      total_probabilities += quarter[ProbabilitiesModel::ACTIONS["Advisor"]]
      total_probabilities += quarter[ProbabilitiesModel::ACTIONS["Circus"]]
      total_probabilities += quarter[ProbabilitiesModel::ACTIONS["Team"]]
      total_probabilities += quarter[ProbabilitiesModel::ACTIONS["Product"]]
      total_probabilities += quarter[ProbabilitiesModel::ACTIONS["Feedback"]]
      total_probabilities += quarter[ProbabilitiesModel::ACTIONS["Investor"]]
      total_probabilities += quarter[ProbabilitiesModel::ACTIONS["Doubts"]]
      total_probabilities += quarter[ProbabilitiesModel::ACTIONS["Sales"]]
      total_probabilities += quarter[ProbabilitiesModel::ACTIONS["BadNews"]]
      assert_equal 100, total_probabilities
    end
  end

end