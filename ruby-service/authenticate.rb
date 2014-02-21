require './validator'

class Authenticate
  
  def initialize(app)
    @app = app
    @realm_exp = /^\s*token\s+/i
  end

  def call(env)
    auth_header = env['HTTP_AUTHORIZATION']
   
    return [401, {}, ['Missing Authorization header']] if auth_header.nil?

    regex = Regexp.new(@realm_exp)
    return [401, {}, ['Invalid Authorization scheme']] unless regex.match(auth_header)
    
    with_authorization(auth_header) do 
      @app.call(env)
    end
   
  end

  private
  def with_authorization(header)
    header.gsub!(@realm_exp, '')
    return [ 401, {}, ['Invalid Authorization']] unless Validator.valid(header)
    yield
  end

end
