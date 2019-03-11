function DepartmentStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.departments = []

  self.on('read_department', function() {
    console.log('i am in read_department api call from ajax')
    let req = {}
    $.ajax({
      url:'/department/read_department',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.departments = data.departments
            self.trigger('departments_changed', data.departments)
          }else if(data.status == 'e'){
            showToast("Department Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('csv_export_Department', function() {
    console.log('i am in csv_export_Department api call from ajax')
    let req = {}
    $.ajax({
      url:'/department/csv_export_Department',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('csv_export_Department_changed', data.url)
          }else if(data.status == 'e'){}
        },
        error: function(data){
          //showToast("", data)
      }
    })
  })

  self.employees = []

  self.on('read_hod', function() {
    console.log('i am in read_hod api call from ajax')
    let req = {}
    $.ajax({
      url:'/department/read_hod',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.employees = data.employees
            self.trigger('read_hod_changed', data.employees)
          }else if(data.status == 'e'){
            showToast("HOD Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('delete_department', function(id) {
    $.ajax({
      url:'/department/delete/'+id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            let tempDepartment = self.departments.filter(c => {
              return c.department_id != id
            })
            self.departments = tempDepartment
            self.trigger('departments_changed', self.departments)
          }else if(data.status == 'e'){
            showToast("Error Deleting Department. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('edit_department', function(department_name,employee_name, id) {
    let req = {}
    req.department_name=department_name
    req.employee_name=employee_name
    req.id=id
    $.ajax({
      url:'/department/edit/'+id,
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            self.departments = self.departments.map(cat => {
              if(cat.department_id == id){
                cat.department_id = id
                cat.department_name=department_name
                cat.emp_name=employee_name
              }
              // cat.confirmEdit = false
              return cat
            })
            self.trigger('departments_changed', self.departments)
          }else if(data.status == 'e'){
            showToast("Error updating Department. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
 
  self.on('add_department', function(department_name, employee_name) {
    let req = {}
    req.department_name=department_name
    req.employee_name=employee_name
    $.ajax({
      url:'/department/add',
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            console.log('add department after')
            let obj = {}
            obj.department_id = data.id
            obj.department_name = department_name
            obj.hod = employee_name
            self.departments = [obj, ...self.departments]
            self.trigger('departments_changed', self.departments)
          }else if(data.status == 'e'){
            showToast("Error adding Department. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

}
