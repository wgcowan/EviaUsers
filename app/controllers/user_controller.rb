class UserController < ApplicationController
  require 'will_paginate/array' 
  def index
    @users = User.order('username').paginate(page: params[:page], per_page: 20)
  end

  # GETs should be safe (see http://www.w3.org/2001/tag/doc/whenToUseGet.html)
#  verify :method => :post, :only => [ :destroy, :create, :update ],
#         :redirect_to => { :action => :list }

  def list
#    @users = User.paginate :page => params[:page], :per_page=>'20', :order=>'username'
    @users = User.order('username').paginate(page: params[:page], per_page: 20)

  end
  
  def search
        @searchStr='0','1'
        if params[:show_act].nil?
          @activated = '0'
        else
        @activated = '1'
        end
        if params[:search_term].nil?
          search_name = '%'
        else
          search_name = '%'.concat(params[:search_term].concat('%'))
      end
    #    @searh_name='%'.concat(@search_name.concat('%'))
        if @activated == "1"
          @searchStr = '0'
        end
        @users = User.order('username').where("(username like :search1 or fullname like :search1 or email like :search1) and
                           account_activated in (:search2)",
                           :search1 => search_name, :search2 => @searchStr ).paginate(page: params[:page], per_page: 20)
    end
  
  def show
    @user = User.find(params[:id])
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(params[:user])
    if @user.save
      flash[:notice] = 'User was successfully created.'
      redirect_to :action => 'list'
    else
      render :action => 'new'
    end
  end

  def edit
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(params[:id])
    if @user.domain == 1
      @user.password = ''
    end
    if @user.update(user_params)
      flash[:notice] = 'User was successfully updated.'
      redirect_to :action => 'show', :id => @user
    else
      render :action => 'edit'
    end
  end

 def set_activation
   @user = User.find(params[:id])

  if @user.update_attribute('account_activated', true)
    flash[:notice] = 'User was successfully updated.'
    redirect_to :action => 'show', :id => @user
  else
    render :action => 'edit'
  end
 end
 
 def unset_activation
   @user = User.find(params[:id])
   @user.update_attribute('account_activation_key', 'AAA')
  if @user.update_attribute('account_activated', false)
    flash[:notice] = 'User was successfully updated.'
    redirect_to :action => 'show', :id => @user
  else
    render :action => 'edit'
  end
 end
 
 def email_sent  
   @user = User.find(params[:id]) 

     if @user.update_attribute('activation_email_sent', true)
       flash[:notice] = 'Activation email sent checkbox has been updated.'
     else
       render :action => 'edit'
     end
    
   EviaMailer.welcome_email(@user).deliver
   render :action => 'show'
   
 end

  def destroy
    User.find(params[:id]).destroy
    redirect_to :action => 'list'
  end
end
private

def user_params
  params.require(:user).permit(:user, :username, :fullname, :administrator, :email, :institution, :passwrd, :salt, :encrypted_password)
end
