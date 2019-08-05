class ApplicationController < ActionController::API
  rescue_from Exception, with: :render_error
  rescue_from JWT::ExpiredSignature, with: :render_unauthorized
  rescue_from JWT::VerificationError, with: :render_unauthorized

  def current_user!
    @current_user ||=
      JWTDecoder.new(token: request.headers['Authorization']).call
  end

  def render_error(exception)
    Rails.logger.error exception

    render status: :internal_error,
           json: { status: 500, error: "That's an error" }
  end

  def render_unauthorized
    Rails.logger.error exception

    render status: :unauthorized,
           json: { status: 401, error: "You can't access this" }
  end
end
