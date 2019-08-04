class WeathersController < ApplicationController
  def show
    @weather = WeatherRepository.fetch
  end
end
