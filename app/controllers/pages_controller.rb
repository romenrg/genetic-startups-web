class PagesController < ApplicationController
  def home
    @numRows = 4
    @numCols = 8
  end
end
