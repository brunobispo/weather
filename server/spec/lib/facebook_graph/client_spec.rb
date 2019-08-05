describe FacebookGraph::Client, :vcr do
  subject(:facebook) { described_class.new(token) }

  let(:token) do
    'EAAeZCC9EySNMBAPiuFhF6HpaetGBbvx0ZCwyIhQ0Im' \
    'MjUfrcJmzQW1zZAJfCDP0e0iQaHKaPoE4A2frgQalfG' \
    'dSCJ3SO3szrwyEzudy3tWdk95RHRyhDkzNRJEtUFoCZ' \
    'BjoFQ9J0QexqcRMfk2cMZCK5OcnpBAbSNc6b0iAHvAi' \
    'ABgRovVsQyhyvynev3vOWYrmWj5ZAvr5SMlLh3RywSo'
  end

  describe '#me' do
    subject(:result) { facebook.me }

    it 'returns user name' do
      expect(result[:name]).to eq 'Bruno Bispo'
    end

    it 'returns user id' do
      expect(result[:id]).to eq '120935532548319'
    end

    context 'when an invalid token is provided' do
      let(:token) { 'xxxxx' }

      it 'raises an error' do
        expect { facebook.me }
          .to raise_exception FacebookGraph::InvalidAccessToken
      end
    end
  end
end
