function StudentStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.on('read_standard', function() {
    let req = {}
    $.ajax({
      url:'/student/read_standard/',
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
      url:'/student/read_section/',
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

  self.on('read_house', function() {
    let req = {}
    $.ajax({
      url:'/student/read_house/',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.houses = data.houses
            self.trigger('read_house_changed', data.houses)
          }else if(data.status == 'e'){
            showToast("House Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('read_cast', function() {
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
  })

  self.on('read_student', function(read_standard_id,read_section_id,read_enroll_number) {
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
  })

  self.on('read_for_edit_student', function(student_id) {
    console.log(student_id)
    let req = {}
    req.student_id=student_id

    $.ajax({
      url:'/student/read_for_edit_student/'+student_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.student_details = data.student_details
            self.trigger('read_for_edit_student_changed', data.student_details)
          }else if(data.status == 'e'){
            showToast("Student Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('add_student', function(obj) {
    $.ajax({
      url:'/student/add',
        type:"POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            console.log('add Student after')
            toastr.success("Successfully Inserted")
            self.trigger('add_student_changed', self.students)
          }else if(data.status == 'e'){
            showToast("Error adding Student. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

}
