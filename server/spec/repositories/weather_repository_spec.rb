describe WeatherRepository do
  subject(:repository) { described_class }
  let(:response) { { main: { temp: 232.22 } } }
  let(:city) { create(:city, name: 'São Paulo') }

  before do
    allow_any_instance_of(OpenWeatherMap::Client)
      .to receive(:weather).with(q: 'São Paulo,BR')
                           .and_return(response)
  end

  describe '.fetch' do
    subject { repository.fetch(city.id) }

    it { is_expected.to be_a Weather }
    its(:temperature) { is_expected.to eq Temperature.new(fahrenheit: 232.22) }

    context 'when nil is returned' do
      let(:response) { nil }

      it 'raises an exception' do
        expect { repository.fetch(city.id) }
          .to raise_exception WeatherRepository::NotFound
      end
    end
  end
end
