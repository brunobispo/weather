class UserCitiesController < ApplicationController
  def create
    @city = AddUserCity.call(user: current_user!,
                             city_id: params[:city_id]).city
  end
end
