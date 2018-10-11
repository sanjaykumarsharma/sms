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
  /*self.on('read_staff_date_wise_case_report', function(category_id,start_date,end_date) {
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

/*self.on('read_staff_date_wise_case_report', function(category_id,start_date,end_date) {
    let req = {}
     req.category_id=category_id
     req.start_date=start_date
     req.end_date=end_date
    $.ajax({
       url:'/infirmary_staff/readCaseReport',
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
*/


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
              return c.infirmary_id != id
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

}
