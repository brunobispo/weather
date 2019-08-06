class AddUserCity
  Result = Struct.new(:user, :city)

  class << self
    def call(user:, city_id:)
      city = City.find(city_id)
      user.cities << city

      Result.new(user, city)
    end
  end
end
