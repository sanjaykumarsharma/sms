function EmployeeRoleStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.employeeRoles = []

  self.on('read_employees', function() {
    console.log('i am in read_employees api call from ajax')
    let req = {}
    $.ajax({
      url:'/role/readEmployee',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.employees = data.employees
            self.trigger('read_employees_changed', data.employees)
          }else if(data.status == 'e'){
            showToast("Categories Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('read_employee_roles', function() {
    console.log('i am in read_events api call from ajax')
    let req = {}
    $.ajax({
      url:'/role/read_employee_roles',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.employeeRoles = data.employeeRoles
            self.trigger('read_employee_role_changed', data.employeeRoles)
          }else if(data.status == 'e'){
            showToast("Events Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('delete_employee_role', function(id) {
    $.ajax({
      url:'/role/delete/'+id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            let tempEmployeeRoles = self.employeeRoles.filter(c => {
              return c.id != id
            })
            self.employeeRoles = tempEmployeeRoles
            toastr.info("Event Deleted Successfully")
            self.trigger('delete_employee_role_changed', self.employeeRoles)
          }else if(data.status == 'e'){
            showToast("Error Deleting Event. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('edit_employee_role', function(role,employee_id,id) {
    let req = {}
    req.role=role
    req.employee_id=employee_id
    req.id=id
    $.ajax({
      url:'/role/edit/'+id,
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            self.employeeRoles = self.employeeRoles.map(cat => {
              if(cat.role_id == id){
                cat.role_id =id
                cat.role=role
                cat.employee_id=employee_id
              }
              // cat.confirmEdit = false
              return cat
            })
            toastr.success("Event Updated Successfully ")
            self.trigger('edit_employee_role_changed', self.employeeRoles)
          }else if(data.status == 'e'){
            showToast("Error updating employeeRoles. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
 
  self.on('add_employee_role', function(role,employee_id) {
    let req = {}
    req.role=role
    req.employee_id=employee_id
    $.ajax({
      url:'/role/add',
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            console.log('add employee role after')
            let obj = {}
            obj.role_id = data.role_id
            obj.role = role
            obj.employee_id = employee_id
           // obj.name = name
            self.employeeRoles = [obj, ...self.employeeRoles]
            toastr.success("employee role Inserserted Successfully ")
            self.trigger('add_employee_role_changed', self.employeeRoles)
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
