function StaffBPWeightStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.staffWiseReports=[];
  self.employees=[];

  self.on('read_employee', function() {
    console.log('i am in employee  api call from ajax')
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
 
  self.on('read_staff_wise_report', function(staff_id,start_date,end_date) {
    let req = {}
     req.staff_id=staff_id
     req.start_date=start_date
     req.end_date=end_date
    $.ajax({
       url:'/staff_bp_weight/read_staff_wise_report',
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            toastr.success("Successfully ")
            self.staffWiseReports = data.staffWiseReports
            self.trigger('read_staff_wise_report_changed', self.staffWiseReports)
          }else if(data.status == 'e'){
            showToast("Invalid Username or password. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('read_staff_bp_weight', function(id) {
    console.log('i am in read_section api call from ajax');
    let req = {}
    $.ajax({
      url:'/staff_bp_weight/read_staff_bp_weight',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.staffBPWeights = data.staffBPWeights
            self.trigger('read_staff_bp_weight_changed', data.staffBPWeights)
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
  

  self.on('delete_staff_bp_weight', function(id) {
    $.ajax({
      url:'/staff_bp_weight/delete/'+id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            let tempStaffBPWeight = self.staffBPWeights.filter(c => {
              return c.health_id != id
            })
            self.staffBPWeights = tempStaffBPWeight
            toastr.info("Infirmary Deleted Successfully")
            self.trigger('delete_staff_bp_weight_changed', self.staffBPWeights)
          }else if(data.status == 'e'){
            showToast("Error Deleting Case. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('edit_staff_bp_weight', function(staff_id,checkup_date,time_in,time_out, upper_bp,lower_bp,height,weight,bmi,id) {
   let req = {}
     req.staff_id=staff_id
     req.height=height
     req.weight=weight
     req.checkup_date=checkup_date
     req.time_in=time_in
     req.time_out=time_out
     req.upper_bp=upper_bp
     req.lower_bp=lower_bp
     req.bmi=bmi
     console.log(id);
     req.id=id
     $.ajax({
      url:'/staff_bp_weight/edit/'+id,
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            self.staffBPWeights = self.staffBPWeights.map(cat => {
              if(cat.health_id == id){
                 cat.staff_id=staff_id
                 cat.height=height
                 cat.weight=weight
                 cat.health_id=id
                 cat.checkup_date=checkup_date
                 cat.time_in=time_in
                 cat.time_out=time_out
                 cat.upper_bp=upper_bp
                 cat.lower_bp=lower_bp
                 cat.bmi=bmi
                //cat.standard_id=standard_id
              }
              // cat.confirmEdit = false
              return cat
            })
            toastr.success("Infirmary Updated Successfully ")
            self.trigger('edit_staff_bp_weight_changed', self.staffInfirmarys)
          }else if(data.status == 'e'){
            showToast("Error updating Case. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
 
  self.on('add_staff_bp_weight', function(staff_id,checkup_date,time_in,time_out, upper_bp,lower_bp,height,weight,bmi) {
    let req = {}
     req.staff_id=staff_id
     req.height=height
     req.weight=weight
     req.checkup_date=checkup_date
     req.time_in=time_in
     req.time_out=time_out
     req.upper_bp=upper_bp
     req.lower_bp=lower_bp
     req.bmi=bmi
    $.ajax({
       url:'/staff_bp_weight/add',
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            console.log('add bp weight  after')
            let obj = {}
             obj.staff_id=staff_id
             obj.height=height
             obj.weight=weight
             obj.checkup_date=checkup_date
             obj.time_in=time_in
             obj.time_out=time_out
             obj.upper_bp=upper_bp
             obj.lower_bp=lower_bp
             obj.bmi=bmi
             //bmi=bmi
            self.staffBPWeights = [obj, ...self.staffBPWeights]
            toastr.success("staff weight  Inserserted Successfully ")
            self.trigger('add_staff_bp_weight_changed', self.staffBPWeights)
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
