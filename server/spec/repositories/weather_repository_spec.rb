describe WeatherRepository do
  subject(:repository) { described_class }
  let(:response) { { main: { temp: 232.22 } } }

  before do
    allow_any_instance_of(OpenWeatherMap::Client)
      .to receive(:weather).with(q: 'Sao Paulo,br')
                           .and_return(response)
  end

  describe '.fetch' do
    subject { repository.fetch }

    it { is_expected.to be_a Weather }
    its(:temperature) { is_expected.to eq 232.22 }

    context 'when nil is returned' do
      let(:response) { nil }

      it { is_expected.to be_nil }
    end
  end
end
