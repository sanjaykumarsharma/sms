function StaffInfirmaryStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.infirmaryCases = []
  self.infirmaryCategories=[];
  self.staffInfirmarys=[];
  self.employees=[];

  self.on('read_employee', function() {
    console.log('i am in read_sections api call from ajax')
    let req = {}
    $.ajax({
      url:'/infirmary_staff/read_employee',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.employees = data.employees
            self.trigger('read_employee_changed', data.employees)
          }else if(data.status == 'e'){
            showToast("case Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
  self.on('read_infirmary_category', function() {
    console.log('i am in read_sections api call from ajax')
    let req = {}
    $.ajax({
      url:'/infirmary_staff/readInfirmaryCategory',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.infirmaryCategories = data.infirmaryCategories
            self.trigger('read_infirmary_category_changed', data.infirmaryCategories)
          }else if(data.status == 'e'){
            showToast("case Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  
  /*
  self.on('read_staff_date_wise_case_report', function(category_id,start_date,end_date) {
    console.log('i am in read_staff_date_wise_case_report')
      let req = {}
       req.category_id=category_id
       req.start_date=start_date
       req.end_date=end_date
        url:'/infirmary_staff/readCaseReport',
        type:"POST",
        data: JSON.stringify(req),
         contentType: "application/json",
         dataType:"json",
         headers: {"Authorization": getCookie('token')},
          success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.staffDateWiseCaseReports = data.staffDateWiseCaseReports
            self.trigger('read_staff_date_wise_case_report_changed', data.staffDateWiseCaseReports)
          }else if(data.status == 'e'){
            showToast("case Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })*/


  //Staff Yearly  Health report

self.on('read_staff_health_report', function(employee_id,start_date,end_date) {
    let req = {}
     req.employee_id=employee_id
     req.start_date=start_date
     req.end_date=end_date
    $.ajax({
       url:'/infirmary_staff/read_staff_health_report',
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
           // toastr.success("Successfully ")
             self.staffHealthReports = data.staffHealthReports
             self.staffInfirmaryHealthReports =[];
             var prev_emp_id='';
             var prev_name='';
             var prev_designation=''
             var prev_checkup_date='';
             var prev_c_date='';
             var prev_dob='';
             var prev_time_in='';
             var prev_time_out='';
             var prev_weight='';
             var prev_blood_pressure='';
             var prev_bmi='';
             var prev_height='';
             var prev_department_name='';
             var prev_employee_id='';
             
              self.staffHealthReports.map(v => {
                    console.log("inside store")
                    console.log(v)
                    if(prev_emp_id==''){//loop runs first time
                           self.obj={};
                            self.helathArray =[];
                             prev_emp_id=v.emp_id
                             prev_name=v.name
                             prev_designation=v.designation
                             prev_checkup_date=v.checkup_date
                             prev_c_date=v.c_date
                             prev_dob=v.dob
                             prev_time_in=v.time_in
                             prev_time_out=v.time_out
                             prev_weight=v.weight
                             prev_blood_pressure=v.blood_pressure
                             prev_bmi=v.bmi
                             prev_height=v.height
                             prev_department_name=v.department_name
                             prev_employee_id=v.employee_id

                            self.obj.name=v.name
                            self.obj.designation=v.designation
                            self.obj.checkup_date=v.checkup_date
                            self.obj.c_date=v.c_date
                            self.obj.dob=v.dob
                            self.obj.time_in=v.time_in
                            self.obj.time_out=v.time_out
                            self.obj.weight=v.weight
                            self.obj.blood_pressure=v.blood_pressure
                            self.obj.bmi=v.bmi
                            self.obj.height=v.height
                            self.obj.department_name=v.department_name
                            self.obj.employee_id=v.employee_id
                            self.helathArray.push(v);
                            self.obj.staffHelathArray=self.helathArray
                         }else if(prev_emp_id==v.emp_id){
                           self.obj={}
                            self.obj.name=v.name
                            self.obj.designation=v.designation
                            self.obj.checkup_date=v.checkup_date
                            self.obj.c_date=v.c_date
                            self.obj.dob=v.dob
                            self.obj.time_in=v.time_in
                            self.obj.time_out=v.time_out
                            self.obj.weight=v.weight
                            self.obj.blood_pressure=v.blood_pressure
                            self.obj.bmi=v.bmi
                            self.obj.height=v.height
                            self.obj.department_name=v.department_name
                            self.obj.employee_id=v.employee_id
                            self.helathArray.push(v);
                            self.obj.staffHelathArray=self.helathArray;
                             prev_emp_id=v.emp_id
                             prev_name=v.name
                             prev_designation=v.designation
                             prev_checkup_date=v.checkup_date
                             prev_c_date=v.c_date
                             prev_dob=v.dob
                             prev_time_in=v.time_in
                             prev_time_out=v.time_out
                             prev_weight=v.weight
                             prev_blood_pressure=v.blood_pressure
                             prev_bmi=v.bmi
                             prev_height=v.height
                             prev_department_name=v.department_name
                             prev_employee_id=v.employee_id
                          }else{
                            self.staffInfirmaryHealthReports.push(self.obj);
                            self.helathArray=[];
                            self.obj={};  
                             prev_emp_id=v.emp_id
                             prev_name=v.name
                             prev_designation=v.designation
                             prev_checkup_date=v.checkup_date
                             prev_c_date=v.c_date
                             prev_dob=v.dob
                             prev_time_in=v.time_in
                             prev_time_out=v.time_out
                             prev_weight=v.weight
                             prev_blood_pressure=v.blood_pressure
                             prev_bmi=v.bmi
                             prev_height=v.height
                             prev_department_name=v.department_name
                             prev_employee_id=v.employee_id
                            self.obj={}
                            self.obj.name=v.name
                            self.obj.designation=v.designation
                            self.obj.checkup_date=v.checkup_date
                            self.obj.c_date=v.c_date
                            self.obj.dob=v.dob
                            self.obj.time_in=v.time_in
                            self.obj.time_out=v.time_out
                            self.obj.weight=v.weight
                            self.obj.blood_pressure=v.blood_pressure
                            self.obj.bmi=v.bmi
                            self.obj.height=v.height
                            self.obj.department_name=v.department_name
                            self.obj.employee_id=v.employee_id
                            self.helathArray.push(v);
                            self.obj.staffHelathArray=self.helathArray;
                          }
                     })
                    if(prev_emp_id!=''){
                          self.staffInfirmaryHealthReports.push(self.obj);
                      }


            self.trigger('read_staff_health_report_changed', self.staffInfirmaryHealthReports,getCookie('session_name'))
          }else if(data.status == 'e'){
            showToast("Invalid Username or password. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })



  self.on('read_infirmary_case', function() {
    console.log('i am in read_section api call from ajax')
    let req = {}
    $.ajax({
      url:'/infirmary_staff/read_infirmary_case',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.infirmaryCases = data.infirmaryCases
            self.trigger('read_infirmary_case_changed', data.infirmaryCases)
          }else if(data.status == 'e'){
            showToast("Case Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  // Read staff Monthly Case Report

  self.on('read_staff_monthly_case_report', function(month_id) {
    console.log('i am in monthly case api call from ajax')
    let req = {}
    $.ajax({
      url:'/infirmary_staff/read_staff_monthly_case_report/'+month_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.staffMonthlyReport = data.staffMonthlyReport
            self.trigger('read_staff_monthly_report_changed', data.staffMonthlyReport)
          }else if(data.status == 'e'){
            showToast("Case Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('read_staff_infirmary', function(id) {
    console.log('i am in read_section api call from ajax')
    let req = {}
    $.ajax({
      url:'/infirmary_staff/read_staff_infirmary/'+id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.staffInfirmarys = data.staffInfirmarys
            self.trigger('read_staff_infirmary_changed', data.staffInfirmarys)
          }else if(data.status == 'e'){
            showToast("Case Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
  
// read Staff Infirmary date wise case report which have tag file name infirmary-staff-date-wise-repor
  self.on('read_staff_date_wise_case_report', function(category_id,start_date,end_date) {
    let req = {}
     req.category_id=category_id
     req.start_date=start_date
     req.end_date=end_date
    $.ajax({
       url:'/infirmary_staff/readStaffCaseReport',
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            toastr.success("Successfully ")
            self.staffDateWiseCaseReports = data.staffDateWiseCaseReports
            self.trigger('read_staff_date_wise_case_report_changed', self.staffDateWiseCaseReports)
          }else if(data.status == 'e'){
            showToast("Invalid Username or password. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('delete_staff_infirmary', function(id) {
    $.ajax({
      url:'/infirmary_staff/delete/'+id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            let tempStaffInfirmary = self.staffInfirmarys.filter(c => {
              return c.staff_infirmary_id != id
            })
            self.staffInfirmarys = tempStaffInfirmary
            toastr.info("Infirmary Deleted Successfully")
            self.trigger('delete_staff_infirmary_changed', self.staffInfirmarys)
          }else if(data.status == 'e'){
            showToast("Error Deleting Case. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })



  self.on('edit_staff_infirmary', function(staff_id,category_id,case_id,treatment_date,time_in,time_out,treatment,id,case_name) {
    let req = {}
   req.staff_id=staff_id
   req.category_id=category_id
   req.case_id=case_id
   req.treatment_date=treatment_date
   req.time_in=time_in
   req.time_out=time_out
   req.treatment=treatment
   req.case_name=case_name
   console.log(id);
    req.id=id
    $.ajax({
      url:'/infirmary_staff/edit/'+id,
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            self.staffInfirmarys = self.staffInfirmarys.map(cat => {
              if(cat.staff_infirmary_id == id){
                 cat.staff_id=staff_id
                 cat.category_id=category_id
                 cat.case_id=case_id
                 cat.staff_infirmary_id=id
                 cat.treatment_date=treatment_date
                 cat.time_in=time_in
                 cat.time_out=time_out
                 cat.treatment=treatment
                //cat.standard_id=standard_id
              }
              // cat.confirmEdit = false
              return cat
            })
            toastr.success("Infirmary Updated Successfully ")
            self.trigger('edit_staff_infirmary_changed', self.staffInfirmarys)
          }else if(data.status == 'e'){
            showToast("Error updating Case. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

 

  self.on('add_staff_infirmary', function(staff_id,category_id,case_id,treatment_date,time_in,time_out, treatment,case_name) {
    let req = {}
     req.staff_id=staff_id
     req.category_id=category_id
     req.case_id=case_id
     req.treatment_date=treatment_date
     req.time_in=time_in
     req.time_out=time_out
     req.treatment=treatment
     req.case_name=case_name
    $.ajax({
       url:'/infirmary_staff/add',
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            console.log('add case  after')
            let obj = {}
                 obj.staff_id=staff_id
                 obj.category_id=category_id
                 obj.case_id=case_id
                 obj.staff_infirmary_id=data.staff_infirmary_id
                 obj.treatment_date=treatment_date
                 obj.time_in=time_in
                 obj.time_out=time_out
                 obj.treatment=treatment
               //  obj.treatment=treatment
           // obj.name = name
            self.staffInfirmarys = [obj, ...self.staffInfirmarys]
            toastr.success("Infirmary  Inserserted Successfully ")
            self.trigger('add_staff_infirmary_changed', self.staffInfirmarys)
          }else if(data.status == 'e'){
            showToast("Invalid Username or password. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })



// read Staff Infirmary lab tets
  self.on('read_staff_lab_test', function() {
    let req = {}
    /*req.category_id=category_id
     req.start_date=start_date
     req.end_date=end_date*/
    $.ajax({
       url:'/infirmary_staff/read_staff_lab_test',
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            toastr.success("Successfully ")
            self.staffInfirmaryLabTests = data.staffInfirmaryLabTests
            self.trigger('read_staff_infirmary_lab_test_changed', self.staffInfirmaryLabTests)
          }else if(data.status == 'e'){
            showToast("Invalid Username or password. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })


// add LAb Test

self.on('add_staff_lab_test_infirmary', function(emp_id,heamoglobin,platelet,creatinine,blood_sugar_f,blood_sugar_p,triglyceride,total_cholesterol,sgpt,sgot,systolic_bp,diastolic_bp) {
    let req = {}
     req.emp_id=emp_id
     req.heamoglobin=heamoglobin
     req.platelet=platelet
     req.creatinine=creatinine
     req.blood_sugar_f=blood_sugar_f
     req.blood_sugar_p=blood_sugar_p
     req.triglyceride=triglyceride
     req.total_cholesterol=total_cholesterol
     req.sgpt=sgpt
     req.sgot=sgot
     req.systolic_bp=systolic_bp
     req.diastolic_bp=diastolic_bp
    $.ajax({
       url:'/infirmary_staff/add_staff_lab_test_infirmary',
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            console.log('add case  after')
                let obj = {}
                obj.lab_id=data.lab_id
                obj.emp_id=emp_id
                obj.heamoglobin=heamoglobin
                obj.platelet=platelet
                obj.creatinine=creatinine
                obj.blood_sugar_f=blood_sugar_f
                obj.blood_sugar_p=blood_sugar_p
                obj.triglyceride=triglyceride
                obj.total_cholesterol=total_cholesterol
                obj.sgpt=sgpt
                obj.sgot=sgot
                obj.systolic_bp=systolic_bp
                obj.diastolic_bp=diastolic_bp
            self.staffInfirmaryLabTests = [obj, ...self.staffInfirmaryLabTests]
            toastr.success("Lab Report Inderted Successfully ")
            self.trigger('add_staff_infirmary_lab_test_changed', self.staffInfirmaryLabTests)
          }else if(data.status == 'e'){
            showToast("Invalid Username or password. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

// add LAb Test

self.on('edit_staff_lab_test_infirmary', function(emp_id,heamoglobin,platelet,creatinine,blood_sugar_f,blood_sugar_p,triglyceride,total_cholesterol,sgpt,sgot,systolic_bp,diastolic_bp,id) {
    let req = {}
     req.emp_id=emp_id
     req.heamoglobin=heamoglobin
     req.platelet=platelet
     req.creatinine=creatinine
     req.blood_sugar_f=blood_sugar_f
     req.blood_sugar_p=blood_sugar_p
     req.triglyceride=triglyceride
     req.total_cholesterol=total_cholesterol
     req.sgpt=sgpt
     req.sgot=sgot
     req.systolic_bp=systolic_bp
     req.diastolic_bp=diastolic_bp
     req.id=id
    $.ajax({
       url:'/infirmary_staff/edit_staff_lab_test_infirmary/'+id,
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){

            self.staffInfirmarysstaffInfirmaryLabTests = self.staffInfirmaryLabTests.map(cat => {
              if(cat.lab_id == id){
                  cat.lab_id=id
                  cat.emp_id=emp_id
                  cat.heamoglobin=heamoglobin
                  cat.platelet=platelet
                  cat.creatinine=creatinine
                  cat.blood_sugar_f=blood_sugar_f
                  cat.blood_sugar_p=blood_sugar_p
                  cat.triglyceride=triglyceride
                  cat.total_cholesterol=total_cholesterol
                  cat.sgpt=sgpt
                  cat.sgot=sgot
                  cat.systolic_bp=systolic_bp
                  cat.diastolic_bp=diastolic_bp
              }
              // cat.confirmEdit = false
              return cat
            })
          //  self.staffInfirmaryLabTests = [obj, ...self.staffInfirmaryLabTests]
            toastr.success("Lab Report Updated Successfully ")
            self.trigger('edit_staff_infirmary_lab_test_changed', self.staffInfirmaryLabTests)
          }else if(data.status == 'e'){
            showToast("Invalid Username or password. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
//delete staff lab test
self.on('delete_lab_test', function(id) {
    $.ajax({
      url:'/infirmary_staff/delete_lab_test/'+id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            let tempStaffInfirmaryLabTests = self.staffInfirmaryLabTests.filter(c => {
              return c.lab_id != id
            })
            self.staffInfirmaryLabTests = tempStaffInfirmaryLabTests
            toastr.info("lab test deleted successfully")
            self.trigger('delete_staff_infirmary_lab_test_changed', self.staffInfirmaryLabTests)
          }else if(data.status == 'e'){
            showToast("Error Deleting Case. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })




}// end of store 
