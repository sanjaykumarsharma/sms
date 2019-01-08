function IdCardStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.on('read_standard', function() {
    let req = {}
    $.ajax({
      url:'/id_card/read_standard/',
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
      url:'/id_card/read_section/',
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

  self.on('read_student', function(standard_id,section_id,enroll_number) {
    console.log(standard_id)
    console.log(section_id)
    console.log(enroll_number)
    let req = {}
    req.standard_id=standard_id
    req.section_id=section_id
    req.enroll_number=enroll_number
    $.ajax({
      url:'/id_card/read_student/'+standard_id+'/'+section_id+'/'+enroll_number,
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
  })

  self.on('read_id_card', function(student_id) {
    console.log(student_id)
    let req = {}
    req.student_id=student_id
    $.ajax({
      url:'/id_card/read_id_card/'+student_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.students = data.students
            self.trigger('read_id_card_changed', data.students_id_card_details)
          }else if(data.status == 'e'){
            showToast("Student Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('read_escort_card', function(student_id) {
    console.log(student_id)
    let req = {}
    req.student_id=student_id
    $.ajax({
      url:'/id_card/read_escort_card/'+student_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.students = data.students
            self.trigger('read_escort_card_changed', data.students_escort_card_details)
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
