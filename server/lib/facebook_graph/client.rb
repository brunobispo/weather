module FacebookGraph
  class Client
    include HTTParty
    base_uri 'https://graph.facebook.com'

    def initialize(access_token)
      @access_token = access_token
    end

    def me
      handle_status self.class.get('/me',
                                   query: { access_token: @access_token })
    end

    private

    def handle_status(result)
      raise InvalidAccessToken unless result.success?
      return result.with_indifferent_access if result.success?
    end
  end
end
