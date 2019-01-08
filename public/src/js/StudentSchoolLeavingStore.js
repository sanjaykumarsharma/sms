function StudentSchoolLeavingStore() {
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

 self.on('read_students', function(standard_id,section_id,type) {
    var obj = {}
    obj['standard_id'] = standard_id
    obj['section_id'] = section_id
    obj['type'] = type
    $.ajax({
      url:'/student-school-leaving/students',
        type:"POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            if(data.students.length ==0){
              toastr.info("No Data Found");
            }
            self.trigger('read_students_changed', data.students)
          }else if(data.status == 'e'){
            showToast("SchoolLeaving Read Error. Please try again.", data.messaage)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

 self.on('create_certificate', function(obj) {
    $.ajax({
      url:'/student-school-leaving/create_certificate',
        type:"POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            toastr.success("Successfully Created")
            self.trigger('create_certificate_changed')
          }else if(data.status == 'e'){
            showToast("SchoolLeaving Read Error. Please try again.", data.messaage)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('print_feed_back_form', function(student_id) {
    var obj = {}
    obj['student_id'] = student_id
    $.ajax({
      url:'/student-school-leaving/print-feed-back-form/',
        type:"POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            
            // toastr.success("Login status updated successfully ")
            self.trigger('print_feed_back_form_changed',data.students,getCookie('session_name')) 
          }else if(data.status == 'e'){
            showToast("Error reading. Please try again.", data.messaage)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('print_certificate', function(student_id) {
    let req = {}
    req.student_id=student_id
    console.log(student_id)
    $.ajax({
      url:'/student-school-leaving/print_certificate/'+student_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            
            // toastr.success("Login status updated successfully ")
            self.trigger('print_certificate_changed',data.students,getCookie('session_name')) 
          }else if(data.status == 'e'){
            showToast("Error reading. Please try again.", data.messaage)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
  

}
