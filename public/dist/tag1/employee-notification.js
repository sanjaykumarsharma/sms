riot.tag2('employee-notification', '<section class="container is-fluid"> <div class="level"> <div class="level-left"> <h2 class="title" style="color: #ff3860;">Employees</h2> </div> </div> <div class="box"> <div class="columns"> <div class="column is-narrow"> <label class="label">Department</label> </div> <div class="column is-narrow"> <div class="control"> <div class="select"> <select ref="read_employee_department_id"> <option each="{staffDepartments}" riot-value="{id}">{department} </option> </select> </div> </div> </div> <div class="column"> <button class="button is-danger has-text-weight-bold" onclick="{getNotificationEmployee}">Submit </button> </div> </div> </div> <table class="table is-fullwidth is-striped is-hoverable is-narrow"> <thead> <tr> <th>#</th> <th></th> <th>Emp Id</th> <th>Name</th> <th>Department</th> <th>Designation</th> <th>Mobile</th> <th style="text-align:center;"> <input type="checkbox" checked="{selected}" id="checkFacultyName" onclick="{selectAll}"> </th> </tr> </thead> <tbody> <tr each="{emp, i in employees}"> <td>{i+1}</td> <td><img riot-src="images/employee/{emp.profile_picture}" alt="" class="avatar"></td> <td>{emp.username}</td> <td>{emp.name}</td> <td>{emp.department}</td> <td>{emp.designation}</td> <td>{emp.mobile}</td> <td style="width:2%; text-align:center;"><input type="checkbox" checked="{selected}" id="{\'addEmployeeName\' + emp.mobile}" onclick="{selectEmployee.bind(this,emp)}"></td> </tr> </tbody> </table> <textarea class="textarea" id="employee_sms_text" ref="employee_sms_text" placeholder="SMS TEXT"></textarea><br> <button class="button is-danger is-pulled-right" onclick="{sendEmployeeNotification}">Send SMS</button> </section>', '', '', function(opts) {
"use strict";

var self = this;
self.on("mount", function () {
  self.addAllCheckBox = true;
  self.addCheckBox = true;
  // self.SendSms=true
  self.update();
  flatpickr(".date", {
    altInput: true,
    altFormat: "d/m/Y",
    dateFormat: "Y-m-d"
  });
  self.readDepartments();
});
self.readDepartments = function () {
  console.log('readDepartments for employee tag file');
  employeeNotificationStore.trigger('read_staff_departments');
};
self.on("unmount", function () {
  employeeNotificationStore.off('employees_changed', EmployeeChanged);
  employeeNotificationStore.off('employee_sms_changed', SendSmsChanged);
});

self.getNotificationEmployee = function () {
  console.log("inside Employee");
  console.log("Hello");
  console.log(self.refs.read_employee_department_id.value);
  employeeNotificationStore.trigger('read_employees', self.refs.read_employee_department_id.value);
};

self.selectAll = function () {
  if ($(checkFacultyName).prop("checked") == true) {
    self.employees.map(function (i) {
      var addEmployeeName = '#addEmployeeName' + i.mobile;
      $(addEmployeeName).prop('checked', true);
      if ($(addEmployeeName).is(':checked')) {
        i.selected = true;
        console.log(i.mobile);
        // self.SendSms=false;
      } else {
        i.selected = false;
      }
    });
  } else if ($(checkFacultyName).prop("checked") == false) {
    self.employees.map(function (i) {
      var addEmployeeName = '#addEmployeeName' + i.mobile;
      $(addEmployeeName).prop('checked', false);
      if ($(addEmployeeName).is(':checked')) {
        i.selected = true;
      } else {
        i.selected = false;
      }
      console.log(i.mobile);
      //self.SendSms=true;
    });
  }
};

self.selectEmployee = function (item, e) {
  self.employees.map(function (i) {
    if (item.mobile == i.mobile) {
      i.selected = !i.selected;
      console.log(i.selected);
      if (i.selected == true) {
        console.log(i.mobile);
      } else if (i.selected == false) {
        console.log("hiiiii hellooooo");
      }
    }
  });
};

self.sendEmployeeNotification = function () {
  var mobile = '';

  self.employees.map(function (q) {
    if (q.selected) {
      if (mobile == '') {
        mobile = q.mobile;
      } else {
        mobile = mobile + ',' + q.mobile;
      }
    }
  });

  console.log(mobile);
  if (mobile == '') {
    toastr.info('Please select at least one employee and try again');
  } else {
    employeeNotificationStore.trigger('send_sms', mobile, self.refs.employee_sms_text.value);
  }
};

employeeNotificationStore.on('read_employee_notification_changed', function (employees) {
  self.loading = false;
  self.employees = employees;
  self.update();
});

employeeNotificationStore.on('staff_departments_changed', DepartmentChanged);
function DepartmentChanged(staff_departments) {
  console.log('courses_changed1');
  console.log(staff_departments);
  self.staffDepartments = [];
  self.staffDepartments = staff_departments;
  self.update();
}
employeeNotificationStore.on('employees_changed', EmployeeChanged);
function EmployeeChanged(employees) {
  console.log('courses_changed1');
  console.log(employees);
  self.employees = [];
  self.employees = employees;
  self.update();
}
employeeNotificationStore.on('employee_sms_changed', SendSmsChanged);
function SendSmsChanged() {
  self.refs.employee_sms_text.value = '';
  toastr.success('sms send successfully');
  self.update();
}
});