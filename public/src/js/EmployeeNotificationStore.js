function EmployeeNotificationStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.employees = []

  self.on('read_staff_departments', function() {
    console.log('i am in read_departments api call from ajax')
    let req = {}
    $.ajax({
      url:'/employee-notification',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            console.log(data.staff_departments)
            self.trigger('staff_departments_changed', data.staff_departments)
          }else if(data.status == 'e'){
            showToast("Staff Department Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('read_employees', function(emp_type_id) {
    let req = {}
    $.ajax({
      url:'/employee-notification/'+emp_type_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            if(data.employees.length == 0){
              toastr.info("No Data Found!")
            }
            self.trigger('employees_changed', data.employees)
          }else if(data.status == 'e'){
            console.log('Error' + data.error)
            showToast("Employees Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })


  self.on('send_sms', function(mobile_no,message) {
    let req = {}
    req.mobile_no=mobile_no
    req.message=message
    req.type='Employee'
    $.ajax({
      url:'/sms/',
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('employee_sms_changed')
          }else if(data.status == 'e'){
            showToast("Error sending SMS. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('send_email', function(email,employee_subject,employee_message) {
    let req = {}
    req.email=email
    req.subject=employee_subject
    req.message=employee_message
    req.type='Employee'
    $.ajax({
      url:'/email/',
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('employee_email_changed')
          }else if(data.status == 'e'){
            showToast("Error sending Email. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

}
