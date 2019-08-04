class WeathersController < ApplicationController
  def show
    render json: WeatherRepository.fetch
  end
end
