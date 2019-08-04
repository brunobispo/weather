class Temperature
  attr_reader :fahrenheit

  def initialize(fahrenheit:)
    @fahrenheit = fahrenheit
  end

  def celsius
    @celsius ||= ((@fahrenheit.to_f - 32) * 5 / 9).round
  end

  def ==(other)
    fahrenheit == other&.fahrenheit
  end
end
