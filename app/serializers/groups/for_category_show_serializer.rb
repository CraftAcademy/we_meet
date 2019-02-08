# frozen_string_literal: true

class Groups::ForCategoryShowSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :name
  attribute :image_url

  def image_url
    if Rails.env.test?
      rails_blob_url(object.image) if object.image.attachment
    else
      # we will have to update the development and production env with host. 
      # See the test config and https://github.com/rails/rails/issues/32500 
      object.image.service_url(expires_in: 1.hour, disposition: 'inline') if object.image.attachment
    end
  end
end