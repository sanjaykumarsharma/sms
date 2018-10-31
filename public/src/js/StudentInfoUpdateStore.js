function StudentInfoUpdateStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.on('read_standard', function() {
    let req = {}
    $.ajax({
      url:'/student_info_update/read_standard/',
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
      url:'/student_info_update/read_section/',
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

  self.on('read_student_info_update', function(read_section_id,read_enroll_number) {
    console.log(read_section_id)
    console.log(read_enroll_number)
    let req = {}
    req.read_section_id=read_section_id
    req.read_enroll_number=read_enroll_number
    $.ajax({
      url:'/student_info_update/read_student_info_update/'+read_section_id+'/'+read_enroll_number,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.students = data.students
            self.trigger('read_student_info_update_changed', data.students)
          }else if(data.status == 'e'){
            showToast("Student Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

}
