function StudentResultActivationStore() {
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
      url:'/student-result-activation/students',
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
            showToast("ResultActivation Read Error. Please try again.", data.messaage)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('update_result_status', function(enroll_number,active_result) {
    var obj = {}
    obj['enroll_number'] = enroll_number
    obj['active_result'] = active_result
    $.ajax({
      url:'/student-result-activation/update-result-status/',
        type:"POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            
            toastr.success("Login status updated successfully ")
            self.trigger('update_result_status_changed') 
          }else if(data.status == 'e'){
            showToast("Error updating status. Please try again.", data.messaage)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
  

}
