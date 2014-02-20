require './signer'

KEY = ENV['KEY']
raise 'No key defined' unless KEY

SESSION_TIME = 10 * 60

module Validator
  def self.valid(token)
    email, ts, mac = token.split ' '
    return false unless email && ts && mac

    age_in_seconds = Time.now.to_i - ts.to_i;
    return false unless age_in_seconds < SESSION_TIME

    text = "#{email} #{ts}"
    signed = Signer.sign KEY, text
    return false unless mac == signed

    true
  end
end

