require 'openssl'
require 'base64'

if ARGV.size < 2
  puts "Usage: #{__FILE__} <key> <message>"
  exit 1
end

key = ARGV.shift
msg = ARGV.join ' '

hash_f = OpenSSL::Digest::Digest.new('sha256')
hmac_bytes = OpenSSL::HMAC.digest(hash_f, key, msg);
hmac = Base64.encode64(hmac_bytes).chomp

puts "Msg: \"#{msg}\" MAC: #{hmac}"

