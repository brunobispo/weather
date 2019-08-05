describe JWTDecoder do
  subject(:decoder) { described_class.new(token: token, secret_key: 'abc123') }

  let(:user) { build(:user, id: 10) }
  let(:token) { JWTEncoder.new(user: user, secret_key: 'abc123').call }

  before { allow(User).to receive(:find).with(user.id).and_return user }

  describe '#call' do
    it 'decodes user from token' do
      expect(decoder.call).to eq user
    end

    context 'when token is expired' do
      let(:token) do
        JWTEncoder
          .new(user: user, secret_key: 'abc123', expires_at: 1.day.ago)
          .call
      end

      it 'raises an exception' do
        expect { decoder.call }.to raise_error JWT::ExpiredSignature
      end
    end
  end
end
