riot.tag2('assign-role', '<section class="container is-fluid" show="{employee_role_view ==\'employee_list\'}"> <div class="level"> <div class="level-left"> <h2 class="title" style="color: #ff3860;">Employees</h2> </div> </div> <div class="box"> <div class="columns"> <div class="column is-narrow"> <label class="label">Department</label> </div> <div class="column is-narrow"> <div class="control"> <div class="select"> <select ref="read_employee_department_id"> <option each="{staffDepartments}" riot-value="{id}">{department} </option> </select> </div> </div> </div> <div class="column"> <button class="button is-danger has-text-weight-bold" onclick="{readEmployee}">Submit </button> </div> </div> </div> <table class="table is-fullwidth is-striped is-hoverable is-narrow"> <thead> <tr> <th>#</th> <th></th> <th>Emp Id</th> <th>Roles</th> <th>Name</th> <th>Department</th> <th>Designation</th> <th>Mobile</th> <th class="has-text-right"></th> </tr> </thead> <tbody> <tr each="{e, i in employees}"> <td>{i + 1}</td> <td><img riot-src="images/employee/{e.profile_picture}" alt="" class="avatar"></td> <td>{e.username}</td> <td>{e.role}</td> <td>{e.name}</td> <td>{e.department}</td> <td>{e.designation}</td> <td>{e.mobile}</td> <td class="has-text-right"> <span><a class="button is-small is-rounded is-danger" onclick="{add_assign_employee_view.bind(this, e)}">Assign Role</a></span> </td> </tr> </tbody> </table> </section> <section class="container is-fluid" show="{employee_role_view ==\'employee_list_for_assignment\'}"> <div class="level"> <div class="level-left"> <h2 class="title">Assign Roles to ({employee_name})</h2> </div> <div class="level-right"> <a class="button no-print" onclick="{close_assign_employee_view}">Back</a> </div> </div> <div> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th>Role</th> <th class="has-text-right"> <input type="checkbox" id="checkEmployeeRole" onclick="{selectAll}"> </th> </tr> </thead> <tbody> <tr each="{r, i in roles}"> <td>{r.role}</td> <td class="has-text-right"> <input type="checkbox" class="id_check_box" checked="{r.done}" id="{\'RoleId\' + r.id}" onclick="{selectRole.bind(this,r)}"> </td> </tr> </tbody> </table> <br> <button class="button is-danger is-pulled-right" onclick="{addAssignEmployee}">Submit</button> </div> </section>', '', '', function(opts) {
"use strict";

var self = this;
self.on("mount", function () {
  self.employee_role_view = 'employee_list';
  self.update();
  self.readDepartments();
  self.readRoles();
});

self.on("unmount", function () {
  assignRoleStore.off('assign_role_changed', AssignEmployeeChanged);
});

self.close_assign_employee_view = function () {
  self.employee_role_view = 'employee_list';
  self.update();
};
self.add_assign_employee_view = function (c, e) {
  self.employee_role_view = 'employee_list_for_assignment';
  self.employee_name = c.name;
  self.roles.map(function (i) {
    i.done = false;
    i.employee_id = c.id;
  });

  console.log(self.roles);
};

self.readDepartments = function () {
  assignRoleStore.trigger('read_staff_departments');
};
self.readRoles = function () {
  assignRoleStore.trigger('read_roles');
};

self.readEmployee = function () {
  assignRoleStore.trigger('read_employees_for_assignment', self.refs.read_employee_department_id.value);
};

self.selectAll = function () {
  self.role = [];
  if ($('#checkEmployeeRole').is(":checked")) {
    self.roles.map(function (i) {
      i.done = true;
      $('RoleId' + i.id).prop('checked', true);
      self.role = i.id;
      console.log(self.role);
    });
  } else {
    self.roles.map(function (i) {
      i.done = false;
      $('RoleId' + i.id).prop('checked', false);
    });
  }
  console.log(self.roles);
};

self.selectRole = function (item, event) {
  item.done = !event.item.r.done;
  self.role_id = item.id;
  console.log(self.roles);
  console.log(self.role_id);
};

self.addAssignEmployee = function () {
  var tempRoles = self.roles.filter(function (c) {
    return c.done == true;
  });
  assignRoleStore.trigger('add_employees_for_assignment', tempRoles);
};

assignRoleStore.on('staff_departments_changed', DepartmentChanged);
function DepartmentChanged(staff_departments) {
  self.staffDepartments = [];
  self.staffDepartments = staff_departments;
  self.update();
}
assignRoleStore.on('assign_role_changed', AssignEmployeeChanged);
function AssignEmployeeChanged(employees) {
  self.employees = [];
  self.employees = employees;
  self.update();
}

assignRoleStore.on('roles_changed', RolesChanged);
function RolesChanged(roles) {
  self.roles = [];
  self.roles = roles;
  self.update();
}
});