class Api::V1::ProbabilitiesController < ApplicationController
  def index
    probabilities = ProbabilitiesModel.new
    render json: probabilities.action_probabilities_per_q
  end
end
