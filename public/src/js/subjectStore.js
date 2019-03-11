function SubjectStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.subjects = []

  self.on('read_subject', function() {
    console.log('i am in suject api call from ajax')
    let req = {}
    $.ajax({
      url:'/subject/read_subject',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.subjects = data.subjects
            self.trigger('read_subject_changed', data.subjects)
          }else if(data.status == 'e'){
            showToast(" Subject Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('csv_export_Subject', function() {
    console.log('i am in csv_export_Subject api call from ajax')
    let req = {}
    $.ajax({
      url:'/subject/csv_export_Subject',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('csv_export_subject_changed', data.url)
          }else if(data.status == 'e'){}
        },
        error: function(data){
          //showToast("", data)
      }
    })
  })

  self.on('delete_subject', function(id) {
    $.ajax({
      url:'/subject/delete/'+id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            let tempSubjects = self.subjects.filter(c => {
              return c.subject_id != id
            })
            self.subjects = tempSubjects
            toastr.info("Subject Deleted Successfully")
            self.trigger('delete_subject_changed', self.subjects)
          }else if(data.status == 'e'){
            showToast("Error Deleting Subject. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('edit_subject', function(subject_name, subject_short_name, department_id,id) {
    let req = {}
    req.subject_name=subject_name
    req.subject_short_name=subject_short_name
    req.department_id=department_id
    req.id=id
    $.ajax({
      url:'/subject/edit/'+id,
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            self.subjects = self.subjects.map(cat => {
              if(cat.subject_id == id){
                cat.subject_id =id
                cat.subject_name=subject_name
                cat.subject_short_name=subject_short_name
                cat.department_id=department_id
              }
              // cat.confirmEdit = false
              return cat
            })
            toastr.success("Subject Updated Successfully ")
            self.trigger('edit_subject_changed', self.subjects)
          }else if(data.status == 'e'){
            showToast("Error updating subjects. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
 
  self.on('add_subject', function(subject_name, subject_short_name, department_id) {
    let req = {}
    req.subject_name=subject_name
    req.subject_short_name=subject_short_name
    req.department_id=department_id
    $.ajax({
      url:'/subject/add',
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            console.log('add subject after')
            let obj = {}
                obj.subject_id = data.id
                obj.subject_name=subject_name
                obj.subject_short_name=subject_short_name
                obj.department_id=department_id
            self.subjects = [obj, ...self.subjects]
            toastr.success("Subject Inserserted Successfully ")
            self.trigger('add_subject_changed', self.subjects)
          }else if(data.status == 'e'){
            showToast("Invalid Username or password. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

}
