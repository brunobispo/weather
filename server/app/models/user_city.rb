class UserCity < ApplicationRecord
  belongs_to :user
  belongs_to :city

  validates :user_id, uniqueness: { scope: :city }
end
