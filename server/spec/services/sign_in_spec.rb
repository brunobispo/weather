describe SignIn do
  subject(:service) { described_class }
  let(:token) { 'xxxxx' }

  before do
    allow_any_instance_of(FacebookGraph::Client)
      .to receive(:me).and_return(name: 'Bruno Bispo', id: '123')

    allow_any_instance_of(JWTEncoder)
      .to receive(:call).and_return('xyz')
  end

  describe '.call(facebook_token:)' do
    subject(:result) { service.call(facebook_token: token) }

    it 'saves the user name' do
      expect(result.user.name).to eq 'Bruno Bispo'
    end

    it 'generates an api token' do
      expect(result.token).to eq 'xyz'
    end

    context 'when user does not exist' do
      it 'creates a new one' do
        expect { service.call(facebook_token: token) }
          .to change(User, :count).by(1)
      end

      it 'saves the facebook id' do
        expect(result.user.facebook_id).to eq '123'
      end
    end

    context 'when user already exists' do
      let!(:existing_user) { create(:user, name: 'John', facebook_id: '123') }

      it 'creates nothing' do
        expect { service.call(facebook_token: token) }
          .not_to change(User, :count)
      end

      its(:user) { is_expected.to eq existing_user }

      it 'updates the user name' do
        expect(result.user.name).to eq 'Bruno Bispo'
      end
    end
  end
end
