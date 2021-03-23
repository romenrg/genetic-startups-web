Rails.application.routes.draw do
  root 'pages#home'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
      namespace :v1 do
          resources :content, only: [:index]
      end
  end
end
