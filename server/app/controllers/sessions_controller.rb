class SessionsController < ApplicationController
  def create
    @result = SignIn.call(facebook_token: params[:facebook_token])
  end

  def index
    @user = current_user!
  end
end
