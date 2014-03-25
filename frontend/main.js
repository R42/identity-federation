var display = (function() {

  var controls = {};

  controls.login = login;
  
  function login() {
    $('.view').hide();
    $('.login').show();
  }

  controls.watson  = watson;
  function watson(data) {
    $('.view').hide();
    $('.profile').show();
    $('#watson').html(data);
  }

  controls.holmes  = holmes;
  function holmes(data) {
    $('.view').hide();
    $('.profile').show();
    $('#holmes').html(data)
  }
  
  return controls;
}());

var services = (function() {
  var controls = {};

  controls.holmes = holmes;
  function holmes(errorBack, success) {
    $.ajax({
      url:"http://holmes.local:7000", 
      headers: {"Authorization": 'token' + ' ' + localStorage.sessionToken },
      success: success,
      error: errorBack
    })
  }


  controls.watson =  watson;
  function watson(errorBack, success) {
    $.ajax({
      url:"http://watson.local:9000", 
      headers: {"Authorization": 'token' + ' ' + localStorage.sessionToken },
      success: success,
      error: errorBack
    })
  }

  return controls;
})();

function loadServicesQuotes() {
  loadHolmesServiceQuote();
  loadWatsonServiceQuote();
}

function afterLogin(data) {
  localStorage.sessionToken = data;
  debugger
  loadServicesQuotes();
}

function init() {
  $('.form-signin.login').submit(doLogin);
  if (! localStorage.sessionToken)
    return display.login();

  loadServicesQuotes();
}

function doLogin(e) {
  e.preventDefault();

  var form = $('.form-signin.login');
  var emailInput = form.find('input[type=email]');
  var passInput = form.find('input[type=password]');
  var email = emailInput.val();
  var pass = passInput.val();

  if (!email || !pass)
    return;

  var input = emailInput.add(passInput);
  var submitButton = form.find('input[type=submit]');
  submitButton.attr('disabled', '');
 
  $.ajax({
    url: 'http://auth.local:5000/',
    type: 'POST',
    data: { email: email, pass: pass },
    error: alert.bind(null, 'Something\'s wrong Jimmy...'),
    success: [input.val.bind(input, ''), afterLogin],
    complete: submitButton.removeAttr.bind(submitButton, 'disabled')
  });
}


function loginError(jqXHR, textStatus, errorThrown) {
  console.log('Problems!', jqXHR, textStatus, errorThrown);
}


function loadWatsonServiceQuote() {

  services.watson(errorBack, callback);

  function errorBack(response) {
    if (response.status = 401) {
      localStorage.removeItem('sessionToken') 
      display.login();
    }
  }

  function callback(data) {
    display.watson(data);
  }
}  

function loadHolmesServiceQuote() {

  services.holmes(errorBack, callback);

  function errorBack(response) {
    if (response.status = 401) {
      localStorage.removeItem('sessionToken') 
      display.login();
    }
  }

  function callback(data) {
    display.holmes(data);
  }
}  

init();

