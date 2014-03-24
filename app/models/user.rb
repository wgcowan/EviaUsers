class User < ActiveRecord::Base
  validates_presence_of :username, :password, :fullname, :email
  
  validates_uniqueness_of :username,
                          :on => :create,
                          :message => "is already being used."
          
  attr_accessor :passwrd_confirmation
  validates_confirmation_of :passwrd
  
  validate :passwrd_non_blank

  def passwrd
    @passwrd
  end
  
  def passwrd=(pwd)
    @passwrd = pwd
    return if pwd.blank?
    self.password = User.encrypted_password(self.passwrd)
  end
  
  private
  
  def passwrd_non_blank
      errors.add(:passwrd, "Missing password") if password.blank?
    end
  
  def self.encrypted_password(password)
     Digest::SHA1.hexdigest(password)
  end

end

