var display = (function() {

  var controls = {};

  $('.view').hide();
  $('.form-signin.login').submit(doLogin);

  controls.login = login;
  function login() {
    $('.view').hide();
    $('.login').show();
  }

  controls.profile = profile;
  function profile() {
    $('.view').hide();
    $('.profile').show();
  }

  return controls;
}());

var profile = (function() {
  var controls = {};

  controls.init = init;
  function init() {
    $.ajax({
      url: 'http://holmes.local:7000/',
      type: 'GET',
      headers: {
        'Authorization': 'token ' + localStorage.sessionToken
      },
      error: function() { console.dir(arguments); },
      success: function(data) { $('.profile.view').text(data); }
    });
  }

  return controls;
})();

function init() {
  if (! localStorage.sessionToken)
    return display.login();

  loadProfile();
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

function afterLogin(token) {
  localStorage.sessionToken = token;
  loadProfile();
}

function loadProfile() {
  profile.init();
  display.profile();
}  

init();

