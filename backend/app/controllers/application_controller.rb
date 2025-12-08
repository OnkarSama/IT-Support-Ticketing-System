class ApplicationController < ActionController::Base
include ApplicationController::RequestForgeryProtection
before_action :snake_case_params
before_action :attach_authenticity_token

def current_user

end
