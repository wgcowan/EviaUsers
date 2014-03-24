class LoginController < ApplicationController

  def login
   redirect_to("https://cas.iu.edu/cas/login?cassvc=ANY&casurl=http://localhost:3000/login/validate_login")
    
  end
  
  def validate_login
    @casticket=params[:casticket]
    uri = URI.parse("https://cas.iu.edu/cas/validate?cassvc=ANY&casticket=#{@casticket}&casurl=http://localhost:3000/")
    request = Net::HTTP.new(uri.host, uri.port)
    request.use_ssl = true
    request.verify_mode = OpenSSL::SSL::VERIFY_NONE
    response = request.get("https://cas.iu.edu/cas/validate?cassvc=ANY&casticket=#{@casticket}&casurl=http://localhost:3000/")
    @resp = response.body
    if @resp.slice(0,3) == 'yes'
      @resp_true = @resp.slice(0,3)
      @nlength=@resp.length - 7
      @resp_user=@resp.slice(5,@nlength)
      if check_name(@resp_user)
        redirect_to(:controller => 'user',:action => 'list')
      else
        redirect_to(:action => 'logout', :id=>@resp_user)
      end
    else
      @resp_true = @resp.slice(0,2)
      redirect_to(:action => 'logout')
    end
  end
  
  def logout
#    redirect_to(:action => 'login')
  end
  
  def check_name(name)
    @admin_user = User.find_by_sql(["select username,administrator from users where username = ?", name])
    if !@admin_user.blank?
      if @admin_user[0].administrator == 1
        return true
      else
        return false
      end
    else
      return false
    end
  end
end
