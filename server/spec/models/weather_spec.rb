describe Weather do
  subject { described_class.new(temperature: 100) }
  its(:temperature) { is_expected.to be_a Temperature }
end
