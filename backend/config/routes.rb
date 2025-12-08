Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do
    resources :tickets
    resources :users, only: [:index, :show]
    resource :session, only: [:create, :show, :destroy]
  end
end
