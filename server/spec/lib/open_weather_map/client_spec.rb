describe OpenWeatherMap::Client, :vcr do
  subject(:api) { described_class.new('28824d09e6e5681471dda517c504b889') }

  describe '#weather(q:)' do
    context 'when a invalid token is provided' do
      subject(:api) { described_class.new('invalid_token') }

      it 'throws an error' do
        expect { api.weather(q: 'London,uk') }
          .to raise_exception(OpenWeatherMap::InvalidApiKey)
      end
    end

    context 'when a valid city is given' do
      subject(:result) { api.weather(q: 'London,uk') }

      it { is_expected.to be_present }

      it 'fetches the temperature' do
        expect(result[:main][:temp]).to eq 70.16
      end
    end

    context 'when a invalid city is given' do
      subject(:result) { api.weather(q: 'Foiuao,uk') }

      it { is_expected.to be_blank }
    end
  end
end
