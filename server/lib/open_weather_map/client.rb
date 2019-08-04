module OpenWeatherMap
  class Client
    include HTTParty
    base_uri 'https://api.openweathermap.org/data/2.5'

    def initialize(app_id)
      @app_id = app_id
    end

    def weather(q: nil)
      handle_status self.class.get('/weather',
                                   query: { q: q,
                                            appid: @app_id,
                                            units: 'imperial' })
    end

    def handle_status(result)
      raise InvalidApiKey if result.unauthorized?
      return result.with_indifferent_access if result.success?
    end
  end
end
