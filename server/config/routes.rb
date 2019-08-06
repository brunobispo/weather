Rails.application.routes.draw do
  resource :weather
  resources :cities, only: :index
  resources :sessions
  resources :user_cities
end
