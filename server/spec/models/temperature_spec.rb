describe Temperature do
  subject(:temperature) { described_class.new(fahrenheit: 100) }

  its(:fahrenheit) { is_expected.to eq 100 }
  its(:celsius) { is_expected.to eq 38 }

  describe '#==' do
    subject { temperature == other }

    context 'when other has same fahrenheit' do
      let(:other) { described_class.new(fahrenheit: 100) }

      it { is_expected.to be true }
    end

    context 'when other has not same fahrenheit' do
      let(:other) { described_class.new(fahrenheit: 33) }

      it { is_expected.to be false }
    end
  end
end
