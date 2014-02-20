require 'signer'

KEY = ENV['KEY']
raise 'No key defined' unless KEY

module Issuer
  def self.token_for(email)
    ts = Time.now.utc.to_i
    text = "#{email} #{ts}"
    mac = Signer.sign(KEY, text)
    text + " #{mac}"
  end
end

