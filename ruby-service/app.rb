require 'sinatra/base'
require 'sinatra/cross_origin'
require 'authenticate'

class SherlockGreetings < Sinatra::Base
  
  configure do
    enable :cross_origin
  end

  get '/' do 
    "hello from baker street"
  end

end