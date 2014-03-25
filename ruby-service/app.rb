require 'sinatra/base'
require 'authenticate'


QUOTES = [
  'My name is Sherlock Holmes.  It is my business to know what other people dont know',
  'I am the last and highest court of appeal in detection',
  'There is nothing like first-hand evidence.'
]

class SherlockGreetings < Sinatra::Base
  
  get '/' do 
    QUOTES.sample
  end

end