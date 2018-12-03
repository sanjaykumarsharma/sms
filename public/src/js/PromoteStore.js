function PromoteStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.events = []


  self.on('read_students', function(standard_id,section_id) {
    let req = {}
    $.ajax({
      url:'/promote/students/'+standard_id+'/'+section_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('read_students_changed', data.freeStudents)
          }else if(data.status == 'e'){
            showToast("House Read Error. Please try again.", data.messaage)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  //======== read promoted students ======
  
    self.on('read_promoted', function(standard_id,section_id) {
    let req = {}
    $.ajax({
      url:'/promote/read_promoted/'+standard_id+'/'+section_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log("---------------")
          console.log(data)
          console.log("---------------")
          if(data.status == 's'){
            self.trigger('read_promoted_student_changed', data.promotedStudents)
          }else if(data.status == 'e'){
            showToast("House Read Error. Please try again.", data.messaage)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

    self.on('free_up_student', function(section_id,students) {
    var obj = {}
    obj['section_id'] = section_id
    obj['students'] = students
    $.ajax({
      url:'/promote/free_up_student/',
        type:"POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            console.log(data.error_msg);
              self.trigger('free_students_changed', students,data.error_msg) 
            
          }else if(data.status == 'e'){
            showToast("Error while free up students. Please try again.", data.messaage)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('assign_students', function(section_id,students) {
    var obj = {}
    obj['section_id'] = section_id
    obj['students'] = students
    $.ajax({
      url:'/promote/assign_students/',
        type:"POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            console.log(data.error_msg);
              self.trigger('assign_students_changed', students,data.error_msg) 
            
          }else if(data.status == 'e'){
            showToast("Error while free up students. Please try again.", data.messaage)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })


  /*self.on('freeStudents', function(standard_id,section_id) {
    console.log("under read free studer store")
    let req = {}
    $.ajax({
      url:'/promote/freeStudents/'+standard_id+'/'+section_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('read_students_changed', data.freeStudents)
          }else if(data.status == 'e'){
            showToast("House Read Error. Please try again.", data.messaage)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })*/

}
