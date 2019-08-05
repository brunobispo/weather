describe CitiesRepository do
  subject(:repository) { described_class }
  let!(:limeira) { create(:city, name: 'Limeira') }
  let!(:sao_paulo) { create(:city, name: 'São Paulo') }

  describe '.search(term)' do
    subject { repository.search(term) }
    let(:term) { 'limei' }

    it { is_expected.to include limeira }
    it { is_expected.not_to include sao_paulo }

    context 'when no city is found' do
      let(:term) { 'aoaishab' }

      it { is_expected.to be_empty }
    end

    context 'when % is provided' do
      let(:term) { '%%' }

      it { is_expected.to be_empty }
    end

    context 'when nil is provided' do
      let(:term) { nil }

      it { is_expected.to be_empty }
    end

    context 'when accents are ommited' do
      let(:term) { 'Sao Paulo' }

      it { is_expected.to include sao_paulo }
    end
  end
end
