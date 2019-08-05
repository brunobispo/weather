class ApplicationController < ActionController::API
  rescue_from Exception, with: :render_error

  def render_error
    render status: :not_found,
           json: { status: 500, error: "That's an error" }
  end
end
