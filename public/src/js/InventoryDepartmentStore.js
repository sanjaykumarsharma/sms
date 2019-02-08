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

   self.on('readFreeStaff', function(id) {
    console.log('i am in readFreeStaff staff api call from ajax')
    let req = {}
    $.ajax({
      url:'/inventory_department/readFreeStaff/'+id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.freeStaffs = data.freeStaffs
            self.trigger('read_readFreeStaff_changed', data.freeStaffs)
          }else if(data.status == 'e'){
            showToast("read Free Staff Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('readAssignStaff', function() {
    console.log('i am in inventorydepartment api call from ajax')
    let req = {}
    $.ajax({
      url:'/inventory_department/readAssignStaff',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.assignedStaffs = data.assignedStaffs
            self.trigger('read_readAssignStaff_changed', data.assignedStaffs)
          }else if(data.status == 'e'){
            showToast("Assign Staff Read Error. Please try again.", data)
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


  self.on('assign_staff', function(department,staffs) {
    var obj = {}
    obj['department'] = department
    obj['staffs'] = staffs
    $.ajax({
      url:'/inventory_department/assign_staff',
        type:"POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            toastr.success("staff assigned successfully ")
            self.trigger('assign_staffs_changed', staffs) 
          }else if(data.status == 'e'){
            showToast("Error assigning students. Please try again.", data.messaage)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('free_up_staff', function(department,staffs) {
    var obj = {}
    obj['department'] = department
    obj['staffs'] = staffs
    $.ajax({
      url:'/inventory_department/free_up_staff',
        type:"POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            
            toastr.success("Staff assigned successfully ")
            self.trigger('assign_staffs_changed', staffs) 
          }else if(data.status == 'e'){
            showToast("Error while free up staffs. Please try again.", data.messaage)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

}
