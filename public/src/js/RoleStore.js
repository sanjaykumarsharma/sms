function RoleStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.roles = []

  self.on('read_roles', function() {
    console.log('i am in read_roles api call from ajax')
    let req = {}
    $.ajax({
      url:'/roles',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.roles = data.roles
            self.trigger('roles_changed', data.roles)
          }else if(data.status == 'e'){
            showToast("Roles Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('delete_role', function(id) {
    $.ajax({
      url:'/roles/delete/'+id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            let temproles = self.roles.filter(c => {
              return c.id != id
            })
            self.roles = temproles
            toastr.info("Roles Deleted Successfully")
            self.trigger('roles_changed', self.roles)
          }else if(data.status == 'e'){
            showToast("Error Deleting Course. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('edit_role', function(role,id) {
    let req = {}
    req.role=role
    req.id=id
    $.ajax({
      url:'/roles/edit/'+id,
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            self.roles = self.roles.map(cat => {
              if(cat.id == id){
                cat.id = id
                cat.role=role
              }
              // cat.confirmEdit = false
              return cat
            })
            toastr.success("Roles Updated Successfully ")
            self.trigger('roles_changed', self.roles)
          }else if(data.status == 'e'){
            showToast("Error updating Role. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
 
  self.on('add_role', function(role) {
    let req = {}
    req.role=role
    $.ajax({
      url:'/roles/add',
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            console.log('add role after')
            let obj = {}
            obj.id = data.id
            obj.role = role
            self.roles = [obj, ...self.roles]
            toastr.success("Roles Inserserted Successfully ")
            self.trigger('roles_changed', self.roles)
          }else if(data.status == 'e'){
            showToast("Error adding Role. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

}
