function MaturityDevelopmentStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.maturityDevelopments = []

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

  self.on('read_maturity_development_students', function(section_id,exam_term) {
    $.ajax({
      url:'/maturity-development/students/'+section_id+'/'+exam_term,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.maturityDevelopments=data.maturityDevelopments
            self.trigger('maturity_development_students_changed', data.maturityDevelopments)
          }else if(data.status == 'e'){
            showToast("Maturity Development Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('read_maturity_development_details', function(student_id,exam_term) {
    $.ajax({
      url:'/maturity-development/details/'+student_id+'/'+exam_term,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('read_maturity_development_details_changed', data.details)
          }else if(data.status == 'e'){
            showToast("Maturity Development Details Read Error. Please try again.", data.messaage)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
  

  self.on('add_maturity_developments', function(obj) {
    $.ajax({
      url:'/maturity-development/add',
        type:"POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            toastr.success("Maturity Development Created Successfully ")
            self.trigger('add_maturity_developments_changed')
          }else if(data.status == 'e'){
            showToast("Error adding Maturity Development. Please try again.", data.messaage)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('read_maturity_development_update', function(student_id,exam_term) {
    $.ajax({
      url:'/maturity-development/read-for-update/'+student_id+'/'+exam_term,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('maturity_development_student_update_changed', data.details)
          }else if(data.status == 'e'){
            showToast("Maturity Development Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })


  self.on('update_maturity_developments', function(obj,id) {
    $.ajax({
      url:'/maturity-development/edit/'+id,
        type:"POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            toastr.success("Maturity Development Updated Successfully ")
            self.trigger('add_maturity_developments_changed') // same trigger, as Add Exam Scheme
          }else if(data.status == 'e'){
            showToast("Error updating Maturity Development. Please try again.", data.messaage)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('delete_maturity_developments', function(student_id,exam_term) {
    $.ajax({
      url:'/maturity-development/delete/'+student_id+'/'+exam_term,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            toastr.info("Marks Manager Deleted Successfully")
            self.trigger('delete_maturity_developments_changed')
          }else if(data.status == 'e'){
            showToast("Error Deleting Marks Manager. Please try again.", data.messaage)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

}
