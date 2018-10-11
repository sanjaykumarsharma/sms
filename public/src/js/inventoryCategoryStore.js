function InventoryCategoryStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.inventoryCategories = []
   /*self.inventoryDepartments=[]

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
  })*/


  self.on('read_inventory_category', function() {
    console.log('i am in category api call from ajax')
    let req = {}
    $.ajax({
      url:'/inventory_category',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.inventoryCategories = data.inventoryCategories
            self.trigger('read_inventory_category_changed', data.inventoryCategories)
          }else if(data.status == 'e'){
            showToast("Roles Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('delete_inventory_category', function(id) {
    $.ajax({
      url:'/inventory_category/delete/'+id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            let tempInventoryCategory = self.inventoryCategories.filter(c => {
              return c.category_id != id
            })
            self.inventoryCategories = tempInventoryCategory
            toastr.info("Category Deleted Successfully")
            self.trigger('delete_inventory_category_changed', self.inventoryCategories)
          }else if(data.status == 'e'){
            showToast("Error Deleting Category. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('edit_inventory_category', function(department,category_name,id) {
    let req = {}
    req.department=department
    req.category_name=category_name
    req.id=id
    $.ajax({
      url:'/inventory_category/edit/'+id,
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            self.inventoryCategories = self.inventoryCategories.map(cat => {
              if(cat.category_id == id){
                cat.category_id = id
                cat.category_name=category_name
                cat.department=department
              }
              // cat.confirmEdit = false
              return cat
            })
            toastr.success("Category Updated Successfully ")
            self.trigger('edit_inventory_category_changed', self.inventoryCategories)
          }else if(data.status == 'e'){
            showToast("Error updating Category. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
 
  self.on('add_inventory_category', function(department,category_name) {
    let req = {}
    req.department=department
    req.category_name=category_name
    $.ajax({
      url:'/inventory_category/add',
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
            obj.category_id = data.category_id
            obj.category_name = category_name
            obj.department = department
            self.inventoryCategories = [obj, ...self.inventoryCategories]
            toastr.success("Categeory Inserserted Successfully ")
            self.trigger('add_inventory_category_changed', self.inventoryCategories)
          }else if(data.status == 'e'){
            showToast("Error adding Categeory. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

}
