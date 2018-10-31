function StudentNotificationStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.students = []

  self.on('read_standard', function() {
    let req = {}
    $.ajax({
      url:'/student-notification/read_standard/',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.standards = data.standards
            self.trigger('read_standard_changed', data.standards)
          }else if(data.status == 'e'){
            showToast("Standard Read Error. Please try again.", data)
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
      url:'/student-notification/read_section/',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.sections = data.sections
            self.trigger('read_section_changed', data.sections)
          }else if(data.status == 'e'){
            showToast("Section Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('read_students', function(obj) {
    console.log('i am in read_students api call from ajax')
    let req = {}
    console.log(obj.course);
    req.standard_id=obj.standard_id
    req.section_id=obj.section_id
    $.ajax({
      url:'/student-notification/read_student/'+obj.standard_id+'/'+obj.section_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.students = data.students
            if(data.students.length == 0){
              toastr.info("No Data Found!")
            }
            self.trigger('students_changed', data.students)
          }else if(data.status == 'e'){
            showToast("Student Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

   self.on('send_sms', function(mobile_no,student_message) {
    let req = {}
    req.mobile_no=mobile_no
    req.message=student_message
    req.type='Student'
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
            self.trigger('student_sms_changed')
          }else if(data.status == 'e'){
            showToast("Error sending SMS. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('send_email', function(email,student_subject,student_message) {
    let req = {}
    req.email=email
    req.subject=student_subject
    req.message=student_message
    req.type='Student'
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
            self.trigger('student_email_changed')
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
