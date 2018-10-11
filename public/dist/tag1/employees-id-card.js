riot.tag2('employees-id-card', '<section class="container is-fluid" show="{employee_view ==\'show_employee_list_view\'}"> <div class="level"> <div class="level-left"> <h2 class="title" style="color: #ff3860;">Employee ID Cards</h2> </div> <div class="level-right"> <button class="button is-warning is-rounded" onclick="{print_preview}"> <span class="icon"> <span class="fas fa-print"></span> </span> <span>Print Preview</span> </button> </div> </div> <table class="table is-fullwidth is-striped is-hoverable no-print" style="margin-bottom: 100px;"> <thead> <tr> <th>Emp Id</th> <th>Name</th> <th>Department</th> <th>Designation</th> <th>Email</th> <th>Mobile</th> <th class="has-text-right"> <input type="checkbox" id="checkEmployee" onclick="{selectAll}"> </th> </tr> </thead> <tbody> <tr each="{e, i in employees}"> <td>{e.username}</td> <td>{e.name}</td> <td>{e.department}</td> <td>{e.designation}</td> <td>{e.email}</td> <td>{e.mobile}</td> <td class="has-text-right"> <input type="checkbox" class="id_check_box" checked="{e.done}" id="{\'EmployeeId\' + e.id}" onclick="{selectEmployee.bind(this,e)}"> </td> </tr> </tbody> </table> </section> <section class="container is-fluid" show="{employee_view ==\'show_employee_print_view\'}"> <div class="level"> <div class="level-left"> <a class="button no-print" onclick="{close_print_view}">Back</a> </div> <div class="level-right"> <button class="button is-warning is-rounded no-print" onclick="window.print()"> <span class="icon"> <span class="fas fa-print"></span> </span> </button> </div> </div> <div each="{e, i in employees}"> <div if="{e.done == true}"> <div id="id_card_front_16" style="margin-top: 10px;"> <div class="idcard-header"> <img src=""> </div> <div class="content has-text-centred has-text-black"> <img riot-src="images/employee/{e.profile_picture}" style="height: 105px; margin: 5px auto; display: inherit; border: solid #000 1px;"> <div class="has-text-centered" style="font-size: 18px; font-family: \'Open Sans\', sans-serif; font-weight: 800;">{e.name}</div> <div class="has-text-centered is-size-3 barcode">{e.username}</div> <div class="columns is-mobile is-gapless is-variable is-2 is-multiline"> <div class="column is-5 has-text-left has-text-weight-bold pad-bottom"> Emp ID: </div> <div class="column is-7 has-text-weight-bold pad-right pad-bottom"> {e.username} </div> <div class="column is-5 has-text-left has-text-weight-bold pad-bottom"> Designation: </div> <div class="column is-7 has-text-weight-bold pad-right pad-bottom"> {e.designation} </div> <div class="column is-5 has-text-left has-text-weight-bold pad-bottom"> Blood Group: </div> <div class="column is-7 has-text-weight-bold pad-right pad-bottom has-text-danger"> {e.blood_group} </div> </div> <div class="column is-full has-text-right" style="margin-top: -20px;"> <img src="" style="height:32px;"> <div style="font-size: 0.6rem; font-weight: bold;">Authorised Signatory</div> </div> </div> </div> <div class="page-break w-full flex-auto" id="id_card_pb_front_16"></div> <div class="id_card w-full bg-white rounded" id="" style="font-size: 0.95rem; line-height: 1.15;"> <div class="content has-text-weight-bold has-text-black"> <p class="has-text-weight-bold has-text-centered is-uppercase" style="margin-top: 20px;">Instructions</p> <ol style="padding-left: 0; margin-left: 0;"> <li></li> <li></li> <li></li> <li></li> </ol> <p class="has-text-weight-bold is-size-6" style="margin-bottom: 5px;">Residential Address</p> <address class="is-normal is-size-7"> {e.address} <br> {e.po} {e.ps}<br> {e.city} {e.state} </address> <div class="is-full">Mobile: {e.mobile} </div> </div> </div> </div> <div class="page-break w-full flex-auto" id="id_card_pb_back_16"></div> </div> </section>', '', '', function(opts) {
'use strict';

var self = this;
self.on("mount", function () {
   self.employee_view = 'show_employee_list_view';
   self.update();
   self.readEmployees();
});
self.readEmployees = function () {
   console.log('readEmployees');
   employeeIdCardStore.trigger('read_employees');
};
self.on("unmount", function () {
   employeeIdCardStore.off('employees_id_card_changed', EmployeeIdCardChanged);
});
self.print_preview = function () {
   self.employee_view = 'show_employee_print_view';
};
self.close_print_view = function () {
   self.employee_view = 'show_employee_list_view';
};
self.selectAll = function () {

   if ($('#checkEmployee').is(":checked")) {
      self.employees.map(function (i) {
         i.done = true;
         $('EmployeeId' + i.id).prop('checked', true);
      });
   } else {
      self.employees.map(function (i) {
         i.done = false;
         $('EmployeeId' + i.id).prop('checked', false);
      });
   }
   console.log(self.employees);
};

self.selectEmployee = function (item, event) {
   item.done = !event.item.e.done;
   console.log(self.employees);
};

self.viewEmployeeIdCard = function (i) {
   console.log("Id Card View");
   console.log("Id Card Id =>" + i.id);
};

employeeIdCardStore.on('employees_id_card_changed', EmployeeIdCardChanged);
function EmployeeIdCardChanged(employees) {
   console.log(employees);
   self.employees = [];
   self.employees = employees;
   self.employees.map(function (i) {
      i.done = false;
   });
   self.update();
}
});