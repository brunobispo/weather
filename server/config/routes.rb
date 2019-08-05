Rails.application.routes.draw do
  resource :weather
  resources :cities, only: :index
end
