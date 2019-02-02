# frozen_string_literal: true

RSpec.describe Event, type: :model do
  describe 'DB table' do
    it { is_expected.to have_db_column :title }
    it { is_expected.to have_db_column :description }
    it { is_expected.to have_db_column :location }
    it { is_expected.to have_db_column :organizer }
    it { is_expected.to have_db_column :date_and_time }
  end

  describe 'Validations' do
    it { is_expected.to validate_presence_of :title }
    it { is_expected.to validate_presence_of :description }
    it { is_expected.to validate_presence_of :location }
    it { is_expected.to validate_presence_of :organizer }
    it { is_expected.to validate_presence_of :date_and_time }
  end

  describe 'Associations' do
    it { is_expected.to have_many :attendees }
    it { is_expected.to belong_to :group }
  end

  describe 'Scopes' do
    let!(:future_event) { create(:event, date: 1.day.from_now) }
    let!(:past_event) { create(:event, date: 1.day.ago) }
    let!(:todays_event) { create(:event, date: Time.zone.today) }

    describe '.future_events' do
      it 'displays events for today' do
        expect(Event.future_events.to_a).to include todays_event
      end
      it 'displays events in the future' do
        expect(Event.future_events.to_a).to include future_event
      end
      it 'excludes events in the past' do
        expect(Event.future_events.to_a).not_to include past_event
      end
    end

    describe '.past_events' do
      it 'displays events in the past' do
        expect(Event.past_events.to_a).to include past_event
      end
      it 'excludes events in the future' do
        expect(Event.past_events.to_a).not_to include todays_event
      end
    end

  end

  describe 'Image attachment' do
    let(:image){ File.open(fixture_path + '/rock1.png')}

     it 'can be attached to event' do
      subject.image.attach(io: image, 
                          filename: 'attachment_1.png', 
                          content_type: 'image/png')
      expect(subject.image).to be_attached
    end
  end

  describe 'Factory' do
    it 'is valid' do
      expect(create(:event)).to be_valid
    end
  end
end
