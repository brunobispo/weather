describe AddUserCity do
  subject(:service) { described_class }
  let(:user) { create(:user) }
  let(:city) { create(:city) }

  describe '.call(user:, city_id:)' do
    subject(:result) { service.call(user: user, city_id: city.id) }

    it 'adds city to user cities' do
      expect(result.user.cities).to include city
    end

    it 'returns added city' do
      expect(result.city).to eq city
    end
  end
end
