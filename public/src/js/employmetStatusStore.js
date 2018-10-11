function EmploymentStatusStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.employmentStatus = []

  self.on('read_employment_status', function() {
    console.log('i am in read_employment_status api call from ajax')
    let req = {}
    $.ajax({
      url:'/employment_status',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.employmentStatus = data.employmentStatus
            self.trigger('employment_status_changed', data.employmentStatus)
          }else if(data.status == 'e'){
            showToast("level Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('delete_employment_status', function(id) {
    $.ajax({
      url:'/employment_status/delete/'+id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            let tempEmploymentStatus = self.employmentStatus.filter(c => {
              return c.employment_status_id != id
            })
            self.employmentStatus = tempEmploymentStatus
            self.trigger('employment_status_changed', self.employmentStatus)
          }else if(data.status == 'e'){
            showToast("Error Deleting Level. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('edit_employment_status', function(employment_status,id) {
    let req = {}
    req.employment_status=employment_status
    req.id=id
    $.ajax({
      url:'/employment_status/edit/'+id,
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            self.employmentStatus = self.employmentStatus.map(cat => {
              if(cat.employment_status_id == id){
                cat.employment_status_id = id
                cat.employment_status=employment_status
              }
              // cat.confirmEdit = false
              return cat
            })
            self.trigger('employment_status_changed', self.employmentStatus)
          }else if(data.status == 'e'){
            showToast("Error updating Course. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
 
  self.on('add_employment_status', function(employment_status) {
    let req = {}
    req.employment_status=employment_status
    $.ajax({
      url:'/employment_status/add',
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            console.log('add employment_status after')
            let obj = {}
            obj.employment_status_id = data.employment_status_id
            obj.employment_status = employment_status
            self.employmentStatus = [obj, ...self.employmentStatus]
            self.trigger('employment_status_changed', self.employmentStatus)
          }else if(data.status == 'e'){
            showToast("Error adding Designation. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

}
