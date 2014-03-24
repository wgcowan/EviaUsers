class EviaMailer < ActionMailer::Base
  default from: 'idahdev@indiana.edu'
  
  def welcome_email(user)
      @user=user
      @url = 'https://media.eviada.org'
      mail(to: @user.email, subject: 'Welcome to EVIADA Website')
    end
end