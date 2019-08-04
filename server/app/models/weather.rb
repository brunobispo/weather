class Weather
  include ActiveModel::Model

  attr_writer :temperature

  def temperature
    Temperature.new(fahrenheit: @temperature)
  end
end
