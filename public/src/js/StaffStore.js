function StaffStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  /*self.on('read_cast', function() {
    let req = {}
    $.ajax({
      url:'/student/read_cast/',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.cast = data.cast
            self.trigger('read_cast_changed', data.cast)
          }else if(data.status == 'e'){
            showToast("Cast Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('read_religion', function() {
    let req = {}
    $.ajax({
      url:'/student/read_religion/',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.religion = data.religion
            self.trigger('read_religion_changed', data.religion)
          }else if(data.status == 'e'){
            showToast("Religion Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })*/

  /*self.on('read_student', function(read_standard_id,read_section_id,read_enroll_number) {
    console.log(read_standard_id)
    console.log(read_section_id)
    console.log(read_enroll_number)
    let req = {}
    req.read_standard_id=read_standard_id
    req.read_section_id=read_section_id
    req.read_enroll_number=read_enroll_number
    $.ajax({
      url:'/student/read_student/'+read_standard_id+'/'+read_section_id+'/'+read_enroll_number,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.students = data.students
            self.trigger('read_student_changed', data.students)
          }else if(data.status == 'e'){
            showToast("Student Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })*/


 //Staff TYpe Report

 self.on('read_employee_type_report', function() {
    let req = {}
    $.ajax({
      url:'/staff/read_employee_type_report',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            //self.studentSummaryReports=[]
            console.log("inside employee  report")
            self.employeeTypeReports = data.employeeTypeReports
            var grandTotal=0;
            self.employeeTypeReports.map(i=>{
                   grandTotal=Number(grandTotal) + Number(i.total)
                 })
            self.trigger('read_employee_type_report_change', self.employeeTypeReports,grandTotal)
          }else if(data.status == 'e'){
            showToast("staff Type Report Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

 self.on('read_employee_gender_report', function(id) {
    let req = {}
    $.ajax({
      url:'/staff/read_employee_gender_report/' + id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            //self.studentSummaryReports=[]
            console.log("inside employee  report")
            self.employeeGenderReports = data.employeeGenderReports
            var grandTotal=0;
            self.employeeGenderReports.map(i=>{
                   grandTotal=Number(grandTotal) + Number(i.total)
                 })
            self.trigger('read_employee_gender_report_change', self.employeeGenderReports,grandTotal)
          }else if(data.status == 'e'){
            showToast("staff Gender Report Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('read_for_edit_staff', function(emp_id) {
    console.log(emp_id)
    let req = {}
    req.emp_id=emp_id

    $.ajax({
      url:'/staff/read_for_edit_staff/'+emp_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.staff_details = data.staff_details
            self.workExperienceArray = data.workExperienceArray
            self.trigger('read_for_edit_staff_changed', data.staff_details, self.workExperienceArray)
          }else if(data.status == 'e'){
            showToast("Student Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
//read temp Edit Staff
  self.on('read_for_edit_temp_staff', function(emp_id) {
    console.log(emp_id)
    let req = {}
    req.emp_id=emp_id

    $.ajax({
      url:'/staff/read_for_edit_temp_staff/'+emp_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.staff_details = data.staff_details
            self.workArray = data.workExperienceArray
            self.trigger('read_for_edit_staff_changed', data.staff_details,self.workArray)
          }else if(data.status == 'e'){
            showToast("Student Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  //read Staff
  var Staffs=[];
  self.on('read_staff', function(employee_type_id,department_id,designation_id,level_id) {
    console.log('i am in staff Form api call from ajax')
    let req = {}
    $.ajax({
      
      url:'/staff/read_staff/'+employee_type_id+'/'+department_id+'/'+designation_id+'/'+level_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.staffs = data.staffs
            self.trigger('read_staff_changed', data.staffs)
          }else if(data.status == 'e'){
            showToast("Received From Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  // read for profile Approved

  //read Staff
  var Staffs=[];
  self.on('read_temp_staff', function(employee_type_id) {
    console.log('i am in temp staff Form api call from ajax')
    let req = {}
    $.ajax({
      
      url:'/staff/read_temp_staff/'+employee_type_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.staffs = data.staffs
            self.trigger('read_staff_changed', data.staffs)
          }else if(data.status == 'e'){
            showToast("Received From Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('read_department', function() {
    let req = {}
    $.ajax({
      url:'/staff/read_department',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.departments = data.departments
            self.trigger('department_changed', data.departments)
          }else if(data.status == 'e'){
            showToast("departments Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('add_staff', function(obj) {
    console.log(obj);
   // return;
    $.ajax({
      url:'/staff/add_staff',
        type:"POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            console.log('add Staff after')
            toastr.success("Successfully Inserted")
            self.trigger('add_staff_changed', self.staffs,data.staff_id)
          }else if(data.status == 'e'){
            showToast("Error adding Staff. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  /*self.on('edit_student', function(obj,student_id) {
    let req = {}
    console.log(obj)
    console.log(student_id)
    req.student_id=student_id
    $.ajax({
      url:'/student/edit_student/'+student_id,
        type:"POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            toastr.success("Successfully Update")
            self.trigger('edit_student_changed', self.students)
          }else if(data.status == 'e'){
            showToast("Error Updating Student. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })*/

  // read Ex-staff
  self.on('read_ex_staff', function(emp_type_id) {
    let req = {}
    $.ajax({
     url:'/staff/read_ex_staff/'+emp_type_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.exStaffs = data.exStaffs
            self.trigger('read_ex_staff_changed', self.exStaffs)
          }else if(data.status == 'e'){
            showToast("Staff Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  // read Browse-staff
  self.on('read_browse_staff', function(emp_type_id) {
    let req = {}
    $.ajax({
     url:'/staff/read_browse_staff/'+emp_type_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.browseStaffs = data.browseStaffs
            self.trigger('read_browse_staff_changed', self.browseStaffs)
          }else if(data.status == 'e'){
            showToast("Staff Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })


   

  self.on('edit_staff', function(obj,staff_id,editType) {
    let req = {}
    console.log(obj)
    console.log(staff_id)
    console.log(editType)
    req.staff_id=staff_id
    $.ajax({
      url:'/staff/edit_staff/'+staff_id+'/'+editType,
        type:"POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            toastr.success("Successfully Update")
            self.trigger('edit_staff_changed', self.staffs)
          }else if(data.status == 'e'){
            showToast("Error Updating staff. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  // update temp  staff into main table

  self.on('edit_temp_staff', function(obj,staff_id) {
    let req = {}
    req.staff_id=staff_id
    $.ajax({
      url:'/staff/edit_temp_staff/'+staff_id,
        type:"POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            toastr.success("Successfully Update")
            self.trigger('edit_staff_changed', self.staffs)
          }else if(data.status == 'e'){
            showToast("Error Updating staff. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('update_staff_status', function(emp_id,leaving_date,remark) {
    let req = {}
    req.emp_id=emp_id
    req.leaving_date=leaving_date
    req.remark=remark
    $.ajax({
      url:'/staff/update_staff_status',
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            toastr.success("Successfully Update")
            self.trigger('update_staff_status_changed')
          }else if(data.status == 'e'){
            showToast("Error Updating staff. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })


  // delete Staff

  self.on('delete_staff', function(id) {
    $.ajax({
      url:'/staff/delete/'+id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            let tempStaffs = self.staffs.filter(c => {
              return c.emp_id!= id
            })
            self.staffs = tempStaffs
            toastr.info("Staff Deleted Successfully")
            self.trigger('delete_staff_changed', self.staffs)
          }else if(data.status == 'e'){
            showToast("Error Deleting Staff. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  //allow Block staff 

  self.on('allow_block_staff', function(emp_id,is_active) {
    let req = {}
    req.emp_id=emp_id
    req.is_active=is_active
    
    $.ajax({
      url:'/staff/allow_block_staff',
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            toastr.success("Successfully Update")
            self.trigger('allow_block_staff_changed')
          }else if(data.status == 'e'){
            showToast("Error Updating staff. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
  self.on('reset_staff_password', function(emp_id) {
    let req = {}
    req.emp_id=emp_id
   // req.password=password
    
    $.ajax({
      url:'/staff/reset_staff_password',
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            toastr.success("Successfully Update")
            self.trigger('reset_staff_password_changed')
          }else if(data.status == 'e'){
            showToast("Error Updating staff. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })


  self.on('upload_staff_image', function(staff_image,staff_id) {
    var form_data = new FormData(); 
    form_data.append("staff_profile_picture", staff_image);
    $.ajax({
      url:'/staff/upload_staff_image/empImages/'+staff_id,
        type:"POST",
        dataType: 'script',
        processData: false,
        contentType: false,
        data: form_data,
        headers: {"Authorization": getCookie('token')},
        success: function(image_name){
          console.log(image_name)
          self.trigger('upload_staff_image_changed', image_name)
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
  

}
