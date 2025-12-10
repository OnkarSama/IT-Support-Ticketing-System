Rails.application.config.session_store :cookie_store,
  key: '_my_app_session',
  httponly: false,
  domain: 'localhost',
  same_site: :none,
  secure: Rails.env.development? ? false : true

