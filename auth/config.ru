#\ -p 5000
$:<<'.'

require 'bundler/setup'
Bundler.require :default

require 'app'

use Rack::Cors do 
  allow do
    origins '*'
    resource '*', :headers => :any, :methods => [:get, :options, :post, :put], :credentials => false
  end
end

run AuthServer

