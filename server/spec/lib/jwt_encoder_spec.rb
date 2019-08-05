describe JWTEncoder do
  subject(:encoder) { described_class.new(user: user, secret_key: 'abc123') }

  let(:user) { build(:user, id: 10) }

  describe '#call' do
    let(:decoded_token) do
      JWT.decode(encoder.call, 'abc123', true, algorithm: 'HS256')
    end

    it 'encodes user_id on "sub" field' do
      expect(decoded_token[0]['sub']).to be user.id
    end

    it 'expires in 7 days' do
      expect(decoded_token[0]['exp']).to eq 7.days.from_now.to_i
    end

    it 'includes the issued date' do
      expect(decoded_token[0]['iat']).to eq Time.zone.now.to_i
    end
  end
end
