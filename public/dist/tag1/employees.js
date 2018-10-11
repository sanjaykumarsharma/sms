riot.tag2('employees', '<section class="container is-fluid" show="{employee_view ==\'show_employee\'}"> <div class="level"> <div class="level-left"> <h2 class="title" style="color: #ff3860;">Employees</h2> </div> <div class="level-right"> <button class="button is-warning is-rounded" onclick="{add_new_employee}"> <span class="icon"> <span class="fas fa-plus"></span> </span> <span>New Employee</span> </button> </div> </div> <div class="box"> <div class="columns"> <div class="column is-narrow"> <label class="label">Department</label> </div> <div class="column is-narrow"> <div class="control"> <div class="select"> <select ref="read_employee_department_id"> <option each="{staffDepartments}" riot-value="{id}">{department} </option> </select> </div> </div> </div> <div class="column"> <button class="button is-danger has-text-weight-bold" onclick="{readEmployee}">Submit </button> </div> </div> </div> <table class="table is-fullwidth is-striped is-hoverable is-narrow"> <thead> <tr> <th>#</th> <th></th> <th>Emp Id</th> <th>Name</th> <th>Department</th> <th>Designation</th> <th>Mobile</th> <th></th> </tr> </thead> <tbody> <tr each="{e, i in employees}"> <td>{i + 1}</td> <td><img riot-src="images/employee/{e.profile_picture}" alt="" class="avatar"></td> <td>{e.username}</td> <td>{e.title}</td> <td>{e.department}</td> <td>{e.designation}</td> <td>{e.mobile}</td> <td class="has-text-right"> <div class="inline-flex rounded border border-grey overflow-hidden" hide="{e.confirmDelete}"> <span><a class="button is-small is-rounded" onclick="{profile_view.bind(this, e)}">profile</a></span> <span><a class="button is-small is-rounded" onclick="{edit.bind(this, e)}">Edit</a></span> <span> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick="{confirmDelete}">Delete</a></span> </div> <div class="table-buttons" if="{e.confirmDelete}"> <span disabled="{loading}" class="button is-small is-rounded" onclick="{delete}"><i class="fa fa-check"></i></span> <span disabled="{loading}" class="button is-small has-text-danger is-rounded" onclick="{cancelOperation}"><i class="fa fa-times"></i></span> </div> </td> </tr> </tbody> </table> </section> <section class="container is-fluid" show="{employee_view ==\'show_employee_profile\'}"> <div class="level"> <div class="level-left"> <h2 class="title">Profile of {employee_name} </h2> </div> <div class="level-right"> <a class="button no-print" onclick="{close_employee_view}">Back</a> </div> </div> <div class="flex items-center mt-2 mb-6 no-print"> <div class="bg-green py-1 rounded w-10"></div> <div class="bg-grey h-px flex-auto"></div> </div> <div class="columns"> <div class="column"> <div class="columns is-multiline"> <div class="column is-half"> <div id="pp_box1" class="pp-box" style=""> </div> </div> <div class="column is-half"> <div class="field"> <label class="label">Employee ID: <span class="profile-info">{username}</span></label> </div> <div class="field"> <label class="label">Name: <span class="profile-info">{employee_title} </span></label> </div> <div class="field"> <label class="label">Email: <span class="profile-info">{employee_email}</span></label> </div> <div class="field"> <label class="label">Mobile: <span class="profile-info">{employee_mobile}</span></label> </div> <div class="field"> <label class="label">Sex: <span class="profile-info">{employee_sex}</span></label> </div> <div class="field"> <label class="label">Marital Status: <span class="profile-info">{employee_marital_status}</span></label> </div> </div> <div class="column is-half"> <div class="field"> <label class="label">Blood Group: <span class="profile-info">{employee_blood_group}</span></label> </div> <div class="field"> <label class="label">Anniversary: <span class="profile-info">{employee_anniversary}</span></label> </div> <div class="field"> <label class="label">Pan Card No: <span class="profile-info">{employee_panCardNo}</span></label> </div> </div> <div class="column is-half"> <div class="field"> <label class="label">DOB: <span class="profile-info">{employee_dob}</span></label> </div> <div class="field"> <label class="label">Educational Qualification: <span class="profile-info">{employee_educational_qualification}</span></label> </div> <div class="field"> <label class="label">Aadhaar Card No: <span class="profile-info">{employee_aadhaarCardNo}</span></label> </div> </div> <div class="column is-full"> <h3 class="has-text-weight-bold is-size-4 has-text-link">Address</h3> <hr style="margin-top: 0.5em; margin-bottom: 0.5em;"> </div> <div class="column is-full"> <label class="label">Address: <span class="profile-info">{employee_address}</span> </label></div> <div class="column is-half"> <div class="field"> <label class="label">PO: <span class="profile-info">{employee_po}</span></label> </div> <div class="field"> <label class="label">State: <span class="profile-info">{employee_state}</span></label> </div> <div class="field"> <label class="label">City: <span class="profile-info">{employee_city}</span></label> </div> </div> <div class="column is-half"> <div class="field"> <label class="label">PS: <span class="profile-info">{employee_ps}</span></label> </div> <div class="field"> <label class="label">PIN: <span class="profile-info">{employee_pin}</span></label> </div> </div> <hr class="bg-grey h-px my-4 w-full"> <div class="column is-half"> <div class="field"> <label class="label">DOJ: <span class="profile-info">{employee_doj}</span></label> </div> <div class="field"> <label class="label">DOC: <span class="profile-info">{employee_doc}</span></label> </div> </div> </div> </div> </div> </section> <section class="container is-fluid" show="{employee_view ==\'add_employee\'}"> <div class="level"> <div class="level-left"> <div class="level-item"> <h2 class="title" style="color: #ff3860;">{title} Employee</h2> </div> </div> <div class="level-right"> <a class="button" onclick="{close_new_employee}">Back</a> </div> </div> <div class="flex items-center mt-2 mb-6 no-print"> <div class="bg-green py-1 rounded w-10"></div> <div class="bg-grey h-px flex-auto"></div> </div> <div class="columns"> <div class="column is-three-fifths"> <div class="box max-w-md"> <div class="columns is-multiline"> <div class="column is-half"> <div id="pp_box" class="pp-box" onclick="{trigger_file_input.bind(this,\'employee_picture\')}"> <div class="icon has-text-danger" onclick="{remove_picture.bind(this, \'pp_box\',\'employee_picture\')}"><i class="fas fa-trash"></i></div> </div> <input accept="image/*" class="is-hidden" id="employee_picture" name="employee_picture" onchange="{loadFile.bind(this, \'pp_box\')}" type="file"> </div> <div class="column is-half"> <div class="field"> <label class="label" for="employee_Employee ID">Employee id</label> <input class="input" id="username" ref="username" type="text"> </div> <div class="field"> <label class="label" for="employee_title">Title</label> <input class="input" ref="employee_title" type="text"> </div> <div class="field"> <label class="label" for="employee_name">Name</label> <input class="input" ref="employee_name" type="text"> </div> </div> <div class="column is-half"> <label class="label" for="employee_email">Email</label> <input class="input" ref="employee_email" type="text"> </div> <div class="column is-half"> <label class="label" for="employee_mobile">Mobile</label> <input class="input" ref="employee_mobile" type="text"> </div> <div class="column is-one-third"> <label class="label" for="employee_sex">Sex</label> <div class="control"> <div class="select is-fullwidth"> <select id="employee_sex" ref="employee_sex"> <option value="M">Male</option> <option value="F">Female</option> </select> </div> </div> </div> <div class="column is-one-third"> <label class="label" for="employee_MaritalStatus">Marital Status</label> <div class="control"> <div class="select is-fullwidth"> <select id="employee_marital_status" ref="employee_marital_status"> <option value="M">Married</option> <option value="U">Unmarried</option> <option value="D">Divorce</option> </select> </div> </div> </div> <div class="column is-one-third"> <label class="label" for="employee_blood_group">Blood Group</label> <div class="control"> <div class="select is-fullwidth"> <select id="employee_blood_group" ref="employee_blood_group"> <option value=""></option> <option value="A+">A+</option> <option value="A-">A-</option> <option value="AB+">AB+</option> <option value="AB-">AB-</option> <option value="B+">B+</option> <option value="B-">B-</option> <option value="O+">O+</option> <option value="O-">O-</option> </select> </div> </div> </div> <div class="column is-half"> <label class="label" for="employee_dob">DOB</label> <input class="date input flatpickr-input form-control input" ref="employee_dob" placeholder="" tabindex="0" type="text" readonly="readonly"> </div> <div class="column is-half"> <label class="label" for="employee_anniversary">Anniversary</label> <input class="date input flatpickr-input form-control input" ref="employee_anniversary" placeholder="" tabindex="0" type="text" readonly="readonly"> </div> <div class="column is-full"> <label class="label" for="employee_educational_qualification">Educational Qualification</label> <input class="input" ref="employee_educational_qualification" type="text"> </div> <div class="column is-half"> <label class="label" for="employee_aadhaarCardNo">Aadhaar Card No</label> <input class="input" ref="employee_aadhaarCardNo" type="text"> </div> <div class="column is-half"> <label class="label" for="employee_panCardNo">Pan Card No</label> <input class="input" ref="employee_panCardNo" type="text"> </div> <hr> <div class="column is-full"> <label class="label" for="employee_address">Address</label> <textarea class="textarea" ref="employee_address" rows="2"></textarea> </div> <div class="column is-half"> <label class="label" for="employee_po">PO</label> <input class="input" ref="employee_po" type="text"> </div> <div class="column is-half"> <label class="label" for="employee_ps">PS</label> <input class="input" ref="employee_ps" type="text"> </div> <div class="column is-half"> <label class="label" for="employee_city">City/District</label> <input class="input" ref="employee_city" type="text"> </div> <div class="column is-half"> <label class="label" for="employee_state">State</label> <input class="input" ref="employee_state" type="text"> </div> <div class="column is-half"> <label class="label" for="employee_pin">Pin</label> <input class="input" ref="employee_pin" type="text"> </div> <div class="column is-half"></div> <hr class="bg-grey h-px my-4 w-full"> <div class="column is-half"> <label class="label" for="employee_department_id">Department</label> <div class="control"> <div class="select is-fullwidth"> <select ref="employee_department_id"> <option each="{staffDepartments}" riot-value="{id}">{department} </select> </div> </div> </div> <div class="column is-half"> <label class="label" for="employee_designation_id">Designation</label> <div class="control"> <div class="select is-fullwidth"> <select ref="employee_designation_id"> <option each="{staffDesignations}" riot-value="{id}">{designation} </select> </div> </div> </div> <div class="column is-one-third"> <label class="label" for="employee_type">Type</label> <div class="control"> <div class="select is-fullwidth"> <select ref="employee_type"> <option value="A">Admin Staff</option> <option value="F">Faculty</option> <option value="L">Lab Instructor</option> </select> </div> </div> </div> <div class="column is-one-third"> <label class="label" for="employee_doj">Doj</label> <input class="date input flatpickr-input form-control" placeholder="" ref="employee_doj" tabindex="0" type="text" readonly="readonly"> </div> <div class="column is-one-third"> <label class="label" for="employee_doc">Doc</label> <input class="date input flatpickr-input form-control input" placeholder="" ref="employee_doc" tabindex="0" type="text" readonly="readonly"> </div> <div class="column is-full"> <button class="button is-danger" onclick="{add}">Submit</button> </div> </div> </div> </div> </div> </div> </div> </section>', '', '', function(opts) {
'use strict';

var self = this;
self.on("mount", function () {
  self.title = 'Add';
  self.employee_view = 'show_employee';
  self.is_ptofile_image = false;
  self.update();
  self.employee_picture = false;
  flatpickr(".date", {
    /*altInput: true,*/
    allowInput: true,
    altFormat: "d/m/Y",
    dateFormat: "Y-m-d"
  });
  self.readDepartments();
  self.readDesignations();
  /*dateFormat('anniversary')*/

  // employee_picture.addEventListener("change", openFiles, false);
});

self.on("unmount", function () {
  employeeStore.off('employees_changed', EmployeeChanged);
});

self.remove_picture = function (item1, item2, e) {
  console.log('item1' + item1);
  console.log('item2' + item2);
  var pp_box = document.getElementById(item1);
  pp_box.style.backgroundImage = "";
  document.getElementById(item2).value = "";
  event.stopPropagation();
};

self.trigger_file_input = function (item, e) {
  document.getElementById(item).click();
};

self.loadFile = function (item, event) {
  var reader = new FileReader();
  reader.onload = function (e) {
    console.log(item);
    document.getElementById(item).style.backgroundImage = 'url(' + e.target.result + ')';
    console.log(e.target.result);
    self.is_ptofile_image = true;
  };
  reader.readAsDataURL(event.target.files[0]);

  console.log(event.target.files[0]);
  self.employee_picture = event.target.files[0];
};

//read courses
self.readDepartments = function () {
  console.log('readDepartments for employee tag file');
  employeeStore.trigger('read_staff_departments');
};
self.readDesignations = function () {
  console.log('readDesignations for employee tag file');
  employeeStore.trigger('read_staff_designations');
};
self.profile_view = function (c, e) {
  console.log("********************");
  console.log(c);
  console.log("********************");
  self.employee_view = 'show_employee_profile';
  self.username = c.username;
  self.employee_title = c.title;
  self.employee_name = c.name;
  self.employee_email = c.email;
  self.employee_mobile = c.mobile;
  self.employee_sex = c.sex;
  self.employee_marital_status = c.marital_status;
  self.employee_blood_group = c.blood_group;
  self.employee_dob = c.p_dob;
  self.employee_anniversary = c.p_anniversary;
  self.employee_educational_qualification = c.educational_qualification;
  self.employee_aadhaarCardNo = c.aadhaar_card_no;
  self.employee_panCardNo = c.pan_card_no;
  self.employee_address = c.address;
  self.employee_po = c.po;
  self.employee_ps = c.ps;
  self.employee_city = c.city;
  self.employee_state = c.state;
  self.employee_pin = c.pin;
  self.employee_department_id = c.staff_department_id;
  self.employee_designation_id = c.designation_id;
  self.employee_type = c.type;
  self.employee_doj = c.p_doj;
  self.employee_doc = c.p_doc;
  document.getElementById('pp_box1').style.backgroundImage = 'url(/images/employee/' + c.profile_picture + ')';
  /*self.edit_id = c.id*/
};
self.close_employee_view = function () {
  self.employee_view = 'show_employee';
  self.update();
};

self.add_new_employee = function () {
  self.employee_view = 'add_employee';
  self.clearForm();
  self.update();

  document.getElementById("username").focus();
};
self.close_new_employee = function () {
  self.employee_view = 'show_employee';
  self.update();
};

self.readEmployee = function () {
  console.log("Hello");
  console.log(self.refs.read_employee_department_id.value);
  employeeStore.trigger('read_employees', self.refs.read_employee_department_id.value);
};

self.edit = function (c, e) {
  console.log(c);
  self.add_new_employee();
  self.title = 'Update';
  /* dateFormat('doj')
   dateFormat('dod')
   dateFormat('doc')*/
  flatpickr(".date", {
    allowInput: true,
    altFormat: "d/m/Y",
    dateFormat: "Y-m-d"
  });
  self.refs.username.value = c.username;
  self.refs.employee_title.value = c.title;
  self.refs.employee_name.value = c.name;
  self.refs.employee_email.value = c.email;
  self.refs.employee_mobile.value = c.mobile;
  self.refs.employee_sex.value = c.sex;
  self.refs.employee_marital_status.value = c.marital_status;
  self.refs.employee_blood_group.value = c.blood_group;
  self.refs.employee_dob.value = c.dob;
  self.refs.employee_anniversary.value = c.anniversary;
  self.refs.employee_educational_qualification.value = c.educational_qualification;
  self.refs.employee_aadhaarCardNo.value = c.aadhaar_card_no;
  self.refs.employee_panCardNo.value = c.pan_card_no;
  self.refs.employee_address.value = c.address;
  self.refs.employee_po.value = c.po;
  self.refs.employee_ps.value = c.ps;
  self.refs.employee_city.value = c.city;
  self.refs.employee_state.value = c.state;
  self.refs.employee_pin.value = c.pin;
  self.refs.employee_department_id.value = c.staff_department_id;
  self.refs.employee_designation_id.value = c.designation_id;
  self.refs.employee_type.value = c.type;
  /*obj['profile_picture']=self.profile_picture*/
  self.refs.employee_doj.value = c.doj;
  self.refs.employee_doc.value = c.doc;
  document.getElementById('pp_box').style.backgroundImage = 'url(/images/employee/' + c.profile_picture + ')';
  self.edit_id = c.id;
  self.old_image_name = c.profile_picture;
};

self.uploadEmployeeImage = function () {
  employeeStore.trigger('upload_employee_image', self.employee_picture);
};

self.add = function () {
  if (self.is_ptofile_image) {
    self.uploadEmployeeImage();
  } else {
    self.addEmployee();
  }
};

self.addEmployee = function () {
  console.log("Calling");
  if (!self.refs.username.value) {
    toastr.error("Please enter username and try again");
  } else if (!self.refs.employee_name.value) {
    toastr.error("Please enter Name and try again");
  } else if (!self.refs.employee_mobile.value) {
    toastr.error("Please enter Mobile and try again");
  } else {
    var obj = {};
    if (self.is_ptofile_image) {
      obj['profile_picture'] = self.profile_picture;
    } else {
      obj['profile_picture'] = self.old_image_name;
    }
    obj['username'] = self.refs.username.value;
    obj['employee_title'] = self.refs.employee_title.value;
    obj['employee_name'] = self.refs.employee_name.value;
    obj['employee_email'] = self.refs.employee_email.value;
    obj['employee_mobile'] = self.refs.employee_mobile.value;
    obj['employee_sex'] = self.refs.employee_sex.value;
    obj['employee_marital_status'] = self.refs.employee_marital_status.value;
    obj['employee_blood_group'] = self.refs.employee_blood_group.value;
    obj['employee_dob'] = self.refs.employee_dob.value;
    obj['employee_anniversary'] = self.refs.employee_anniversary.value;
    obj['employee_educational_qualification'] = self.refs.employee_educational_qualification.value;
    obj['employee_aadhaarCardNo'] = self.refs.employee_aadhaarCardNo.value;
    obj['employee_panCardNo'] = self.refs.employee_panCardNo.value;
    obj['employee_address'] = self.refs.employee_address.value;
    obj['employee_po'] = self.refs.employee_po.value;
    obj['employee_ps'] = self.refs.employee_ps.value;
    obj['employee_city'] = self.refs.employee_city.value;
    obj['employee_state'] = self.refs.employee_state.value;
    obj['employee_pin'] = self.refs.employee_pin.value;
    obj['employee_department_id'] = self.refs.employee_department_id.value;
    obj['employee_designation_id'] = self.refs.employee_designation_id.value;
    obj['employee_type'] = self.refs.employee_type.value;
    obj['employee_doj'] = self.refs.employee_doj.value;
    obj['employee_doc'] = self.refs.employee_doc.value;
    obj['id'] = self.edit_id;
    console.log(obj);
    if (self.title == 'Add') {
      employeeStore.trigger('add_employee', obj);
      /*self.employee_view='show_employee'*/
    } else if (self.title == 'Update') {
      employeeStore.trigger('edit_employee', obj);
      self.employee_view = 'show_employee';
    }
  }
};
self.cancelOperation = function (e) {
  self.employees.map(function (c) {
    c.confirmDelete = false;
    c.confirmEdit = false;
  });
};
self.confirmDelete = function (e) {
  self.employees.map(function (c) {
    if (c.id != e.item.e.id) {
      c.confirmDelete = false;
    } else {
      c.confirmDelete = true;
    }
  });
};

self.delete = function (e) {
  self.loading = true;
  employeeStore.trigger('delete_employee', e.item.e.id);
};

employeeStore.on('staff_departments_changed', DepartmentChanged);
function DepartmentChanged(staff_departments) {
  console.log('courses_changed1');
  console.log(staff_departments);
  self.staffDepartments = [];
  self.staffDepartments = staff_departments;
  self.update();
}
employeeStore.on('staff_designations_changed', DesignationChanged);
function DesignationChanged(staff_designations) {
  console.log('courses_changed1');
  console.log(staff_designations);
  self.staffDesignations = [];
  self.staffDesignations = staff_designations;
  self.update();
}

employeeStore.on('upload_employee_image_changed', UploadEmployeeImage);
function UploadEmployeeImage(image_name) {
  console.log(image_name);
  self.profile_picture = image_name;
  self.addEmployee();
}
employeeStore.on('employees_changed', EmployeeChanged);
function EmployeeChanged(employees) {
  console.log('courses_changed1');
  console.log(employees);
  self.employees = [];
  self.employees = employees;
  self.clearForm();
  self.update();
}
self.clearForm = function () {
  self.refs.username.value = '';
  self.refs.employee_title.value = '';
  self.refs.employee_name.value = '';
  self.refs.employee_email.value = '';
  self.refs.employee_mobile.value = '';
  self.refs.employee_sex.value = '';
  self.refs.employee_marital_status.value = '';
  self.refs.employee_blood_group.value = '';
  self.refs.employee_dob.value = '';
  self.refs.employee_anniversary.value = '';
  self.refs.employee_educational_qualification.value = '';
  self.refs.employee_aadhaarCardNo.value = '';
  self.refs.employee_panCardNo.value = '';
  self.refs.employee_address.value = '';
  self.refs.employee_po.value = '';
  self.refs.employee_ps.value = '';
  self.refs.employee_city.value = '';
  self.refs.employee_state.value = '';
  self.refs.employee_pin.value = '';
  self.refs.employee_department_id.value = '';
  self.refs.employee_designation_id.value = '';
  self.refs.employee_type.value = '';
  self.refs.employee_doj.value = '';
  self.refs.employee_doc.value = '';
  document.getElementById('pp_box').style.backgroundImage = 'url()';
};
});