function AlumniStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.on('read_alumni', function() {
    console.log('i am in read_courses api call from ajax')
    let req = {}
    $.ajax({
      url:'/alumni/read_alumni',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('read_alumni_changed', data.alumni)
          }else if(data.status == 'e'){
            showToast("Items Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('read_approved_alumni', function() {
    console.log('i am in read_courses api call from ajax')
    let req = {}
    $.ajax({
      url:'/alumni/read_approved_alumni',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('read_approved_alumni_changed', data.alumni)
          }else if(data.status == 'e'){
            showToast("Items Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('approved_alumni', function(approval_date,fees,alumni_id) {
    let req = {}
   
    $.ajax({
      url:'/alumni/approved_alumni/'+approval_date+'/'+fees+'/'+alumni_id,
        type:"POST",
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            toastr.success("Successfully Approved")
            self.trigger('approved_alumni_changed')
          }else if(data.status == 'e'){
            showToast("Error Updating Student. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('read_for_edit_alumni', function(alumni_id) {
    let req = {}
   
    $.ajax({
      url:'/alumni/read_for_edit_alumni/'+alumni_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('read_for_edit_alumni_changed',data.alumni_details)
          }else if(data.status == 'e'){
            showToast("Error Updating Student. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('edit_alumni', function(obj,alumni_id) {
    let req = {}
    req.alumni_id=alumni_id
    $.ajax({
      url:'/alumni/edit_alumni/'+alumni_id,
        type:"POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            toastr.success("Successfully Update")
            self.trigger('edit_alumni_changed')
          }else if(data.status == 'e'){
            showToast("Error Updating Student. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('delete_alumni', function(alumni_id) {
    let req = {}
    req.alumni_id=alumni_id
  
    $.ajax({
      url:'/alumni/delete_alumni/'+alumni_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            /*let tempstudents = self.students.filter(c => {
              return c.student_id != student_id
            })
            self.students = tempstudents*/
            toastr.info("Successfully Deleted")
            self.trigger('delete_alumni_changed', )
          }else if(data.status == 'e'){
            showToast("Error Deleting Alumni. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('read_alumni_profile', function(alumni_id) {
    let req = {}
    $.ajax({
      url:'/alumni/read_alumni_profile/'+alumni_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('read_alumni_profile_changed', data.alumni_profile_details)
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
