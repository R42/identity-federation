#\ -p 5000
$:<<'.'

require 'bundler/setup'
Bundler.require :default

require 'app'

use Rack::Cors do
  allow do
    origins '*'
    resource '*', :headers => :any, :methods => :any
  end
end

run AuthServer

