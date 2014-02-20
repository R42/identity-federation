#\ -p 7000
$:<<'.'

require 'bundler/setup'
Bundler.require :default

require 'app'
require 'authenticate'


use Rack::Cors do 
  allow do
    origins '*'
    resource '/*', :headers => :any, :methods => :any
  end
end

use Authenticate
run SherlockGreetings
