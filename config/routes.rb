Rails.application.routes.draw do
  root 'pages#home'
  get "/info", to: 'pages#home'
  get "/info/map", to: 'pages#home'
  get "/info/algorithm", to: 'pages#home'
  get "/info/architecture", to: 'pages#home'
  get "/info/usage", to: 'pages#home'
  get "/info/contributing", to: 'pages#home'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
      namespace :v1 do
          resources :content, only: [:index]
          resources :probabilities, only: [:index]
      end
  end
end
