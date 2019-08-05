class JWTEncoder
  def initialize(user:,
                 secret_key: ENV['JWT_SECRET_KEY'],
                 expires_at: 7.days.from_now,
                 issued_at: Time.zone.now.to_i)
    @user = user
    @secret_key = secret_key
    @expires_at = expires_at
    @issued_at = issued_at
  end

  def call
    JWT.encode payload, @secret_key, 'HS256'
  end

  private

  def payload
    {
      sub: @user.id,
      exp: @expires_at.to_i,
      iat: @issued_at.to_i
    }
  end
end
