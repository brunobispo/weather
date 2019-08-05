FactoryBot.define do
  factory :city do
    name { Faker::Address.city }
    state { Faker::Address.state_abbr }
  end
end

