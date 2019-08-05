class JWTDecoder
  def initialize(token:, secret_key: ENV['JWT_SECRET_KEY'])
    @token = token
    @secret_key = secret_key
  end

  def call
    decoded_token = JWT.decode @token, @secret_key, true, algorithm: 'HS256'
    User.find(decoded_token[0]['sub'])
  end
end
