class WeathersController < ApplicationController
  rescue_from WeatherRepository::NotFound, with: :render_404

  def show
    @weather = WeatherRepository.fetch(params[:city_id])
  end

  def render_404
    Rails.logger.error exception

    render status: :not_found,
           json: { status: 404, error: 'Weather forecast could not be found' }
  end
end
