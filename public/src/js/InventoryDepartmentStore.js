function InventoryDepartmentStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.inventoryDepartments = []


  self.on('read_inventorydepartment', function() {
    console.log('i am in inventorydepartment api call from ajax')
    let req = {}
    $.ajax({
      url:'/inventory_department/read_inventorydepartment',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.inventoryDepartments = data.inventoryDepartments
            self.trigger('read_inventorydepartment_changed', data.inventoryDepartments)
          }else if(data.status == 'e'){
            showToast("Department Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('delete_inventorydepartment', function(id) {
    $.ajax({
      url:'/inventory_department/delete/'+id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            let tempInventoryDepartment = self.inventoryDepartments.filter(c => {
              return c.department!= id
            })
            self.inventoryDepartments = tempInventoryDepartment
            toastr.info("Department Deleted Successfully")
            self.trigger('delete_inventorydepartment_changed', self.inventoryDepartments)
          }else if(data.status == 'e'){
            showToast("Error Deleting Department. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('edit_inventorydepartment', function(department,id) {
    let req = {}
    req.department=department
    req.id=id
    $.ajax({
      url:'/inventory_department/edit/'+id,
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            self.inventoryDepartments = self.inventoryDepartments.map(cat => {
              if(cat.department == id){
                cat.department=department
              }
              // cat.confirmEdit = false
              return cat
            })
            toastr.success("Department  Updated Successfully ")
            self.trigger('edit_inventorydepartment_changed', self.inventoryDepartments)
          }else if(data.status == 'e'){
            showToast("Error updating Department. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
 
  self.on('add_inventorydepartment', function(department) {
    let req = {}
    req.department=department
    $.ajax({
      url:'/inventory_department/add',
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
                obj.department=department
           // obj.name = name
            self.inventoryDepartments = [obj, ...self.inventoryDepartments]
            toastr.success("Department Inserserted Successfully ")
            self.trigger('add_inventorydepartment_changed', self.inventoryDepartments)
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
