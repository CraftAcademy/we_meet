class User < ApplicationRecord
  # Fix based on https://github.com/lynndylanhurley/devise_token_auth/issues/1079#issuecomment-363155625
  def tokens_has_json_column_type?
    false
  end
  serialize :token, Hash
  
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  include DeviseTokenAuth::Concerns::User
  
  has_one_attached :image
  has_many :rsvps
  has_many :memberships
  has_many :groups, through: :memberships
  has_many :organized_groups, class_name: 'Group', foreign_key: 'organizer_id'
end
