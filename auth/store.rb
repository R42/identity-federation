
module Store
  def self.validate(email, pass)
    pass == email + '123'
  end
end

