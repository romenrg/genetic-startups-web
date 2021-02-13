class PagesController < ApplicationController
  def home
    @map = MapModel.new 3, 6
  end
end
