class WeatherRepository
  class << self
    def fetch
      map client.weather(q: 'Sao Paulo,br')
    end

    private

    def client
      @client ||= OpenWeatherMap::Client.new(ENV['OPEN_WEATHER_MAP_APP_ID'])
    end

    def map(response)
      response && Weather.new(temperature: response[:main][:temp])
    end
  end
end
