riot.tag2('departments', '<section class="container is-fluid"> <h2 class="title" style="color: #ff3860;">Departments</h2> <div class="flex items-center mt-2 mb-6 no-print"> <div class="bg-green py-1 rounded w-10"> <div class="bg-grey h-px flex-auto"></div> </div> </div> <div class="box"> <div class="columns"> <div class="column is-one-quarter"> <label class="label" for="department">Department</label> <input type="text" ref="addDepartmentInput" class="input"> </div> <div class="column is-half"> <label class="label" for="department_full_name">Full name</label> <input class="input" type="text" ref="addDepartmentFullNameInput"> </div> <div class="column is-narrow"> <button class="button is-danger has-text-weight-bold adjusted-top" onclick="{add}">{title}</button> </div> </div> </div> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th>Department</th> <th>Full Name</th> <th></th> </tr> </thead> <tbody> <tr each="{d, i in departmentDataItems}"> <td>{d.department}</td> <td>{d.department_full_name}</td> <td class="has-text-right"> <div class="inline-flex rounded border border-grey overflow-hidden" hide="{d.confirmDelete}"> <span><a class="button is-small is-rounded" onclick="{edit.bind(this, d)}">Edit</a></span> <span> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick="{confirmDelete}">Delete</a></span> </div> <div class="table-buttons" if="{d.confirmDelete}"> <span disabled="{loading}" class="button is-small is-rounded" onclick="{delete}"><i class="fa fa-check"></i></span> <soan disabled="{loading}" class="button is-small has-text-danger is-rounded" onclick="{cancelOperation}"><i class="fa fa-times"></i></span> </div> </td> </tr> </tbody> </table> </section>', '', '', function(opts) {
"use strict";

var self = this;
self.on("mount", function () {
  self.title = 'Create';
  self.update();
  self.readDepartments();
});

self.on("unmount", function () {
  departmentStore.off('departments_changed', DepartmentsChanged);
});
self.readDepartments = function () {
  departmentStore.trigger('read_departments');
};

self.add = function () {
  if (!self.refs.addDepartmentInput.value) {
    toastr.info("Please enter Department and try again");
  } else if (!self.refs.addDepartmentFullNameInput.value) {
    toastr.info("Please enter Full Name and try again");
  } else {
    self.loading = true;
    if (self.title == 'Create') {
      console.log('create');
      departmentStore.trigger('add_department', self.refs.addDepartmentInput.value, self.refs.addDepartmentFullNameInput.value);
    } else if (self.title == 'Update') {
      console.log('update');
      departmentStore.trigger('edit_department', self.refs.addDepartmentInput.value, self.refs.addDepartmentFullNameInput.value, self.edit_id);
    }
  }
};

self.cancelOperation = function (e) {
  self.departments.map(function (d) {
    d.confirmDelete = false;
    d.confirmEdit = false;
  });
};

self.confirmDelete = function (e) {
  self.departments.map(function (d) {
    if (d.id != e.item.d.id) {
      d.confirmDelete = false;
    } else {
      d.confirmDelete = true;
    }
  });
};
self.delete = function (e) {
  self.loading = true;
  departmentStore.trigger('delete_department', e.item.d.id);
};

self.edit = function (d, e) {
  console.log(d);
  self.title = 'Update';
  self.refs.addDepartmentInput.value = d.department;
  self.refs.addDepartmentFullNameInput.value = d.department_full_name;
  self.edit_id = d.id;
};

departmentStore.on('departments_changed', DepartmentsChanged);
function DepartmentsChanged(departments) {
  console.log('departments_changed1');
  console.log(departments);
  self.title = 'Create';
  self.refs.addDepartmentInput.value = '';
  self.refs.addDepartmentFullNameInput.value = '';
  self.loading = false;
  self.departments = departments;
  self.departmentDataItems = [];
  self.departmentDataItems = departments;
  self.update();
  console.log(self.departmentDataItems);
  console.log('self.departmentDataItems');
}
});