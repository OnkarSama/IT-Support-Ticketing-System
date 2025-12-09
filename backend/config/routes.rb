Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do
    resources :tickets
    resources :users, only: [:index, :show]
    resource :session, only: [:create, :show, :destroy]
  end
  get '*path', to: "static_pages#frontend_index"
end
