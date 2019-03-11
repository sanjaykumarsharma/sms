function DesignationStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.designations = []

  self.on('read_designations', function() {
    console.log('i am in read_designations api call from ajax')
    let req = {}
    $.ajax({
      url:'/designations',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.designations = data.designations
            self.trigger('designations_changed', data.designations)
          }else if(data.status == 'e'){
            showToast("Course Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('csv_export_Designation', function() {
    console.log('i am in csv_export_Designation api call from ajax')
    let req = {}
    $.ajax({
      url:'/designations/csv_export_Designation',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('csv_export_Designation_changed', data.url)
          }else if(data.status == 'e'){}
        },
        error: function(data){
          //showToast("", data)
      }
    })
  })

  self.on('delete_designation', function(id) {
    $.ajax({
      url:'/designations/delete/'+id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            let tempdesignations = self.designations.filter(c => {
              return c.designation_id != id
            })
            self.designations = tempdesignations
            self.trigger('designations_changed', self.designations)
          }else if(data.status == 'e'){
            showToast("Error Deleting Course. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('edit_designation', function(designation,id) {
    let req = {}
    req.designation=designation
    req.id=id
    $.ajax({
      url:'/designations/edit/'+id,
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            self.designations = self.designations.map(cat => {
              if(cat.designation_id == id){
                cat.designation_id = id
                cat.designation=designation
              }
              // cat.confirmEdit = false
              return cat
            })
            self.trigger('designations_changed', self.designations)
          }else if(data.status == 'e'){
            showToast("Error updating Course. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
 
  self.on('add_designation', function(designation) {
    let req = {}
    req.designation=designation
    $.ajax({
      url:'/designations/add',
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            console.log('add designation after')
            let obj = {}
            obj.id = data.id
            obj.designation = designation
            self.designations = [obj, ...self.designations]
            self.trigger('designations_changed', self.designations)
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
