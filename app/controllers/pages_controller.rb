class PagesController < ApplicationController
  def home
    @map = MapModel.new 8, 16
    @map.generate_random_cells
  end
end
