#\ -p 7000
$:<<'.'

require 'bundler/setup'
Bundler.require :default

require 'rack/cors'

require 'app'
require 'authenticate'


use Rack::Cors do 
  allow do
    origins '*'
    resource '*', :headers => :any, :methods => [:get, :options, :post, :put], :credentials => false
  end
end

use Authenticate
run SherlockGreetings
