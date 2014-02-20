require 'openssl'
require 'base64'

module Signer
  def self.sign(key, msg)
    hash_f = OpenSSL::Digest::Digest.new('sha256')
    hmac_bytes = OpenSSL::HMAC.digest(hash_f, key, msg);

    Base64.encode64(hmac_bytes).chomp
  end
end

