function employeeTypeStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.employeeTypes = []

  self.on('csv_export_EmployeeType', function() {
    console.log('i am in csv_export_department api call from ajax')
    let req = {}
    $.ajax({
      url:'/employee_type/csv_export_EmployeeType',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('csv_export_EmployeeType_changed', data.url)
          }else if(data.status == 'e'){}
        },
        error: function(data){
          //showToast("", data)
      }
    })
  })
  

  self.on('read_employeeTypes', function() {
    console.log('i am in read_employee Types api call from ajax')
    let req = {}
    $.ajax({
      url:'/employee_type',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.employeeTypes = data.employeeTypes
            self.emp_id = getCookie('emp_id')
            self.trigger('employeeTypes_changed', data.employeeTypes, self.emp_id)
          }else if(data.status == 'e'){
            showToast("Items Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('delete_employeeType', function(id) {
    $.ajax({
      url:'/employee_type/delete/'+id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            let tempEmployeeTypes = self.employeeTypes.filter(c => {
              return c.emp_type_id != id
            })
            self.employeeTypes = tempEmployeeTypes
            toastr.info("Item Deleted Successfully")
            self.trigger('employeeTypes_changed', self.employeeTypes)
          }else if(data.status == 'e'){
            showToast("Error Deleting Item. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('edit_employeeType', function(employee_type,id) {
    let req = {}
    req.employee_type=employee_type
    req.id=id
    $.ajax({
      url:'/employee_type/edit/'+id,
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            self.employeeTypes = self.employeeTypes.map(cat => {
              if(cat.emp_type_id == id){
                cat.emp_type_id = id
                cat.emp_type=employee_type
              }
              // cat.confirmEdit = false
              return cat
            })
            toastr.success("Employee Type Updated Successfully ")
            self.trigger('employeeTypes_changed', self.employeeTypes)
          }else if(data.status == 'e'){
            showToast("Error updating Employee Type. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
 
  self.on('add_employeeType', function(employee_type) {
    let req = {}
    req.employee_type=employee_type
    $.ajax({
      url:'/employee_type/add',
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            console.log('add employee type after')
            let obj = {}
            obj.emp_type_id = data.emp_type_id
            obj.emp_type = employee_type
            self.employeeTypes = [obj, ...self.employeeTypes]
            toastr.success("Employee Type Inserserted Successfully ")
            self.trigger('employeeTypes_changed', self.employeeTypes)
          }else if(data.status == 'e'){
            showToast("Error adding Item. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

}
