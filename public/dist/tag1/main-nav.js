riot.tag2('main-nav', '<nav class="navbar is-fixed-top is-light no-print" role="navigation" aria-label="main navigation"> <div class="container is-fluid"> <div class="navbar-brand"> <div class="navbar-item is-size-3 has-text-weight-bold has-text-wight"> MITT </div> <div class="navbar-burger burger" data-target="navbarExampleTransparentExample"> <span aria-hidden="true"></span> <span aria-hidden="true"></span> <span aria-hidden="true"></span> </div> </div> <div id="navbarExampleTransparentExample" class="navbar-menu has-text-weight-bold"> <div class="navbar-end"> <div class="navbar-item has-dropdown is-hoverable"> <a class="navbar-link">Employees</a> <div class="navbar-dropdown"> <a class="navbar-item" href="#/employees">Employees</a> <a class="navbar-item" href="#/employees-id-card">ID Cards</a> <a class="navbar-item" href="#/employees-id-card-setup">ID Card Setup</a> <a class="navbar-item" href="#/staff-departments">Staff Departments</a> </div> </div> <div class="navbar-item has-dropdown is-hoverable"> <a class="navbar-link">Students</a> <div class="navbar-dropdown"> <a class="navbar-item" href="#/students">Students</a> <a class="navbar-item" href="#/id_cards">ID Cards</a> <a class="navbar-item" href="#/id_card_setup">ID Card Setup</a> <a class="navbar-item" href="#/staff_departments">Staff Departments</a> </div> </div> <div class="navbar-item has-dropdown is-hoverable"> <a class="navbar-link">Notification</a> <div class="navbar-dropdown"> <a class="navbar-item" href="#/employee-notification">Employees</a> <a class="navbar-item" href="#/student-notification">students</a> </div> </div> <div class="navbar-item has-dropdown is-hoverable"> <a class="navbar-link">Reports</a> <div class="navbar-dropdown"> <a class="navbar-item" href="#/employee-by-department-report">Employee By Department</a> <a class="navbar-item" href="#/employee-by-blood-group-report">Employee By Blood Group</a> <a class="navbar-item" href="#/employee-by-gender-report">Employee By Gender</a> <a class="navbar-item" href="#/employee-by-marital-status-report">Employee By Marital Status</a> <a class="navbar-item" href="#/employee-by-designation-report">Employee By Deisgnation</a> </div> </div> <div class="navbar-item has-dropdown is-hoverable"> <a class="navbar-link">Setup</a> <div class="navbar-dropdown"> <a class="navbar-item" href="#/courses">Courses</a> <a class="navbar-item" href="#/departments">Departments</a> <a class="navbar-item" href="#/designations">Designation</a> <a class="navbar-item" href="#/roles">Role</a> <a class="navbar-item" href="#/assign-role">Assign Role</a> </div> </div> <div href="" class="navbar-item has-text-danger">Logout</div> </div> </div> </div> </nav>', '', '', function(opts) {
'use strict';

var self = this;
if (!opts.selected_nav_item) {
  self.selected_nav_item = 'home';
  self.showNavItems = false;
} else {
  self.selected_nav_item = opts.selected_nav_item;
  self.showNavItems = true;
}
self.username = undefined;

self.changePassword = function () {
  $("#passwordChangeModal").modal('show');
};

self.savePassword = function () {
  if (self.userNameInput.value == '') {
    toastr.error('Please enter username and try again');
    return;
  }

  if (self.oldPasswordInput.value == '') {
    toastr.error('Please enter old password and try again');
    return;
  }

  if (self.newPasswordInput.value == '') {
    toastr.error('Please enter new password and try again');
    return;
  }

  var str = self.newPasswordInput.value;
  var p = str.length;

  if (Number(p) < 5) {
    toastr.error('new password lenth must be >4');
    return;
  }

  if (self.newPasswordInput.value != self.newPasswordInput2.value) {
    toastr.error('new password not match');
    return;
  }

  RiotControl.trigger('change_password', self.userNameInput.value, self.oldPasswordInput.value, self.newPasswordInput.value);
};

self.doLogout = function () {
  console.log("calling logout");
  RiotControl.trigger('logout');
};

RiotControl.on('login_changed', function (login_status) {
  console.log("calling me in nav tag");
  self.username = login_status.username;
  if (login_status.role != 'FAIL') {
    self.showNavItems = true;
  }
  self.update();
});

RiotControl.on('logOut_changed', function () {
  console.log("logged out");
  self.showNavItems = false;
  riot.route("/");
});

RiotControl.on('change_password_completed', function (count) {
  console.log("Password changed");
  if (Number(count) == 1) {
    self.userNameInput.value = '';
    self.oldPasswordInput.value = '';
    self.newPasswordInput.value = '';
    self.newPasswordInput2.value = '';
    $("#passwordChangeModal").modal('hide');
    toastr.info('Password Changed Successfully');
    self.update();
  } else {
    toastr.error('Please check your old username and password');
  }
});
});
