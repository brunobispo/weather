class WeatherRepository
  class << self
    def fetch(city_id)
      city = City.find(city_id)
      map client.weather(q: "#{city.name},BR")
    end

    private

    def client
      @client ||= OpenWeatherMap::Client.new(ENV['OPEN_WEATHER_MAP_APP_ID'])
    end

    def map(response)
      raise NotFound unless response.present?

      Weather.new(temperature: response[:main][:temp])
    end
  end

  class NotFound < StandardError; end
end
