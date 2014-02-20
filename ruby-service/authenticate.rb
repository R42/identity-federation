require './validator'

class Authenticate
  
  def initialize(app)
    @app = app
  end

  def call(env)
    auth_header = env['HTTP_AUTHORIZATION']
    exp = /^\s*token\s+/i
    regex = Regexp.new(exp)
    return [401, {}, ['Missing Authorization header']] if auth_header.nil?
    return [401, {}, ['Invalid Authorization scheme']] unless regex.match(auth_header)
    auth_header.gsub!(exp, '')
    return [ 401, {}, ['Invalid Authorization']] unless Validator.valid(auth_header)
    @app.call(env)
  end


end
