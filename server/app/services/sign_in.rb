class SignIn
  Result = Struct.new(:user, :token)

  class << self
    def call(facebook_token:)
      facebook_user = FacebookGraph::Client.new(facebook_token).me

      user = User.where(facebook_id: facebook_user[:id]).first_or_initialize
      user.name = facebook_user[:name]
      user.save if user.changed?

      token = JWTEncoder.new(user: user).call

      Result.new(user, token)
    end
  end
end
