class Event < ApplicationRecord
  has_one_attached :image
  validates_presence_of :title, :description, :location, :organizer, :date_and_time
  has_many :attendees, class_name: 'Rsvp'
  belongs_to :group

  scope :future_events, -> { where("date >= ?", Time.zone.today) }
  scope :past_events, -> { where("date <= ?", 1.day.ago) }

end