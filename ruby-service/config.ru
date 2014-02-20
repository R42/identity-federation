#\ -p 7000
$:<<'.'

require 'app'
require 'authenticate'

use Authenticate
run SherlockGreetings
