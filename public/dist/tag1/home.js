riot.tag2('home', '<div class="login-banner"> <div class="columns is-gapless is-marginless"> <div class="column is-three-fifths is-hidden-mobile" style="height: 100vh;"> <div class="cover_image" style="background-image: url(\'/images/classroom.jpg\'); height: 100%;"></div> </div> <div class="column is-two-fifths has-background-white"> <section class="section"> <div class="pad"> <h1 class="title is-spaced has-text-success is-size-1 has-text-weight-bold">Sarthak</h1> <p class="is-size-6 has-text-grey" style="margin-top: -1.5em; margin-bottom: 2em;">College Management simplified!</p> <div class="subtitle">Login</div> <form accept-charset="UTF-8" action="/mitt" method="post"><input name="_csrf_token" type="hidden" value="BENbAHN0NikPJisEGhV9BiUeDx1ZAAAAL9+C13FyNWDlnCMQJHdH5Q=="><input name="_utf8" type="hidden" value="✓"> <div class="field"> <label class="label" for="user_username">Username</label> <div class="control"> <input class="input is-medium" id="user_username" name="user[username]" type="text"> </div> </div> <div class="field"> <label class="label" for="user_password">Password</label> <div class="control"> <input class="input is-medium" id="user_password" name="user[password]" type="password"> </div> </div> <div class="field"> <label class="label" for="user_role">Role</label> <div class="control"> <div class="select is-fullwidth"> <select name="user[role]"> <option value="ADMIN">ADMIN</option> <option value="6">Power User</option> </select> </div> </div> </div> <div class="field"> <div class="control"> <button class="button is-danger is-medium" type="submit">Submit</button> </div> </div> </form> </div> </section> </div> </div> </div>', '', '', function(opts) {
'use strict';

var self = this;
self.login_warning = false;
self.on('mount', function () {
  RiotControl.trigger('login_init');
  $('#loginButton').prop('disabled', true);
  self.update();
});

RiotControl.on('login_changed', function (login_status) {
  console.log("Changed");
  if (login_status.role && login_status.role != 'FAIL') {
    riot.route("/masters/department-master");
  }
});

self.login = function (e) {
  if (!self.username.value || !self.password.value) {
    self.login_warning = true;
  }
  RiotControl.trigger('check_login', self.username.value, self.password.value);
};

self.loginProcess = function () {

  if (self.username.value == '') {
    $('#loginButton').prop('disabled', true);
  } else {
    if (self.password.value == '') {
      $('#loginButton').prop('disabled', true);
    } else {
      $('#loginButton').prop('disabled', false);
    }
  }
  self.update();
};
});
