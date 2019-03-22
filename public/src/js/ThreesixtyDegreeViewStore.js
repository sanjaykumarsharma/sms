function ThreesixtyDegreeViewStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.on('read_student', function(obj) {
 
    $.ajax({
      url:'/threesixty_degree_view/read_student/',
        type:"POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
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
  self.on('read_student_details', function(student_id) {
    console.log(student_id)
    let req = {}
    req.student_id=student_id

    $.ajax({
      url:'/threesixty_degree_view/read_student_details/'+student_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('read_student_details_changed', data.student_details,getCookie('session_id'))
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
