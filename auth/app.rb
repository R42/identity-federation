require 'sinatra/base'
require 'store'
require 'issuer'

class AuthServer < Sinatra::Base
  post '/' do
    email = params[:email]
    pass = params[:pass]

    return status 400 unless email && pass
    return status 401 unless Store.validate email, pass

    status 201
    Issuer.token_for email
  end
end

