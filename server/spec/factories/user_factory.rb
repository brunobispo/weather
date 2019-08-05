FactoryBot.define do
  factory :user do
    name { Faker::Name.name }
    facebook_id { SecureRandom.uuid }
  end
end
