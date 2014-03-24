EviaUser404::Application.routes.draw do
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'
  root 'login#login'
  get 'user/search' => 'user#search'
  get 'user/list' => 'user#list'
  get 'user/index' => 'user#index'
  get 'user/email_sent/:id' => 'user#email_sent'
  post 'user/email_sent/:id' => 'user#email_sent'
  
  resources :user
  resource :users
  get 'login/validate_login' => 'login#validate_login'
  get 'login/logout' => 'login#logout'
  get 'users' => 'user#list'
  get 'user/show' => 'user#show'
  #get 'user/edit/:id' => 'user#edit'
  get 'user/destroy' => 'user#destroy'
  #get 'user/new' => 'user#new'
  get 'user/set_activation' => 'user#set_activation'
  get 'user/unset_activation' => 'user#unset_activation'
  #get 'user/update' => 'user#update'
  #get 'user/create' => 'user#create'
  #get 'user/:id' => 'user#show'
  #post 'user/show' => 'user#show'
  #post 'user/edit/:id' => 'user#edit'
  post 'user/list' => 'user#index'
  #post 'user/new' => 'user#new'
  post 'user/destroy' => 'user#destroy'
  post 'user/:id/edit/' => 'user#edit'
  post 'user/set_activation/:id' => 'user#set_activation'
  post 'user/unset_activation/:id' => 'user#unset_activation' 
  post 'users' => "user#index"
  post 'user/index' => 'user#index'
  
  #patch 'user/:id' => 'user#update'   
  post '/user/:id' => 'user#show'
  
  
  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
