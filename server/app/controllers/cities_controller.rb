class CitiesController < ApplicationController
  def index
    @cities = CitiesRepository.search(params[:term])
  end
end
