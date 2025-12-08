Rails.application.routes.draw do
resources :tickets
resources :users, only: [:index, :show]
end
