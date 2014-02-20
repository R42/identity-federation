require 'sinatra/base'
require 'authenticate'

class SherlockGreetings < Sinatra::Base
  
  get '/' do 
    "hello from baker street"
  end

end