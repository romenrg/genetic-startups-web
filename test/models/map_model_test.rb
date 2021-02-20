require "test_helper"

class MapModelTest < ActiveSupport::TestCase

  test "the truth" do
    assert true
  end

  test "actionProbabilityPerQ matrix is generated correctly" do
    @map = MapModel.new 3, 6
    assert_equal MapModel::NUM_QUARTERS, @map.actionProbabilityPerQ.size
    assert_equal MapModel::NUM_ACTIONS, @map.actionProbabilityPerQ[0].size
  end


end