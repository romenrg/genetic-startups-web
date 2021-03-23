class Api::V1::ContentController < ApplicationController
  def index
    @rows = Integer(params[:rows])
    @cols = Integer(params[:cols])
    @map = MapModel.new @rows, @cols
    @map.generate_random_cells
    @cells_string = @map.cells.join(" ")
    render json: @cells_string.split(" ").map(&:to_i)
  end
end
