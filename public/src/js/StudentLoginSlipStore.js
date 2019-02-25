function StudentLoginSlipStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.studentGroups = []


  self.on('read_classes', function() {
    let req = {}
    $.ajax({
      url:'/standard',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('read_classes_changed', data.standards)
          }else if(data.status == 'e'){
            showToast("standards Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('read_section', function() {
    let req = {}
    $.ajax({
      url:'/section',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('read_section_changed', data.sections)
          }else if(data.status == 'e'){
            showToast("section Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })


  /*******************************************************************subjects start*****************************************************************/

 self.on('read_students', function(standard_id,section_id) {
     var obj = {}
    obj['standard_id'] = standard_id
    obj['section_id'] = section_id
    $.ajax({
      url:'/student-login-slip/students',
        type:"POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('read_students_changed', data.students)
          }else if(data.status == 'e'){
            showToast("LoginSlip Read Error. Please try again.", data.messaage)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('update_login_status', function(st) {
    
    $.ajax({
      url:'/student-login-slip/update-login-status/',
        type:"POST",
        data: JSON.stringify(st),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            toastr.success("Login status updated successfully ")
            self.trigger('update_login_status_changed') 
          }else if(data.status == 'e'){
            showToast("Error updating status. Please try again.", data.messaage)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
  
  self.on('print_login_slip', function(standard_id,section_id,student_id) {
    var obj = {}
    obj['student_id'] = student_id
    obj['standard_id'] = standard_id
    obj['section_id'] = section_id
    $.ajax({
      url:'/student-login-slip/print-login-slip/',
        type:"POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            
            self.trigger('print_login_slip_changed',data.students) 
          }else if(data.status == 'e'){
            showToast("Error print login slip. Please try again.", data.messaage)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('print_login_slip_all', function(standard_id,section_id) {
    var obj = {}
    obj['standard_id'] = standard_id
    obj['section_id'] = section_id
    $.ajax({
      url:'/student-login-slip/print-login-slip-all/',
        type:"POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            
            self.trigger('print_login_slip_changed',data.students) 
          }else if(data.status == 'e'){
            showToast("Error print login slip. Please try again.", data.messaage)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
  
  self.on('reset_password', function(enroll_number) {
    var obj = {}
    obj['enroll_number'] = enroll_number
    $.ajax({
      url:'/student-login-slip/reset-password/',
        type:"POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            toastr.success("Password reset successfully ")
            self.trigger('reset_password_changed') 
          }else if(data.status == 'e'){
            showToast("Error in reset password. Please try again.", data.messaage)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })


  self.on('generate_id', function(standard_id,section_id,student_id) {
    var obj = {}
    obj['student_id'] = student_id
    obj['standard_id'] = standard_id
    obj['section_id'] = section_id
    $.ajax({
      url:'/student-login-slip/generate-id/',
        type:"POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            
            self.trigger('generate_id_changed') 
          }else if(data.status == 'e'){
            showToast("Error generating ID. Please try again.", data.messaage)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
  
  

}
