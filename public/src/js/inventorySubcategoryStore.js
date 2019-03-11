function InventorySubCategoryStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.inventorySubcategories = []
  
  self.on('csv_export_inventory_subcategory', function(obj) {
    let req = {}
    req.data=obj
    $.ajax({
      url:'/inventory_subcategory/csv_export_inventory_subcategory',
        contentType: "application/json",
        dataType:"json",
        type:'POST',
        data: JSON.stringify(req),
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('csv_export_inventory_subcategory_changed', data.url)
          }else if(data.status == 'e'){}
        },
        error: function(data){
          //showToast("", data)
      }
    })
  })

  self.on('read_inventory_subcategory', function() {
    console.log('i am in subcategory api call from ajax')
    let req = {}
    $.ajax({
      url:'/inventory_subcategory',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.inventorySubcategories = data.inventorySubcategories
            self.trigger('read_inventory_subcategory_changed', data.inventorySubcategories)
          }else if(data.status == 'e'){
            showToast("Subcategory Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('delete_inventory_subcategory', function(id) {
    $.ajax({
      url:'/inventory_subcategory/delete/'+id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            let tempInventorySubcategory = self.inventorySubcategories.filter(c => {
              return c.sub_category_id != id
            })
            self.inventorySubcategories = tempInventorySubcategory
            toastr.info("Subcategory Deleted Successfully")
            self.trigger('delete_inventory_subcategory_changed', self.inventorySubcategories)
          }else if(data.status == 'e'){
            showToast("Error Deleting Subcategory. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('edit_inventory_subcategory', function(department,category_id,sub_category,id,category_name) {
    let req = {}
    req.department=department
    req.category_id=category_id
    req.sub_category=sub_category
    req.id=id
    $.ajax({
      url:'/inventory_subcategory/edit/'+id,
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            self.inventorySubcategories = self.inventorySubcategories.map(cat => {
              if(cat.sub_category_id == id){
                cat.sub_category_id = id
                cat.category_id=category_id
                cat.department=department
                cat.sub_category=sub_category
                cat.category_name=category_name
              }
              // cat.confirmEdit = false
              return cat
            })
            toastr.success("Subcategory Updated Successfully ")
            self.trigger('edit_inventory_subcategory_changed', self.inventorySubcategories)
          }else if(data.status == 'e'){
            showToast("Error updating Subcategory. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
 
  self.on('add_inventory_subcategory', function(department,category_id, sub_category,category_name) {
    let req = {}
    req.department=department
    req.category_id=category_id
    req.sub_category=sub_category
    $.ajax({
      url:'/inventory_subcategory/add',
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            console.log('add Categeory after')
            let obj = {}
            obj.sub_category_id = data.sub_category_id
            obj.sub_category = sub_category
            obj.department = department
            obj.category_id = category_id
            obj.category_name = category_name
           // obj.category_id = category_id
            self.inventorySubcategories = [obj, ...self.inventorySubcategories]
            toastr.success("Subcategeory Inserserted Successfully ")
            self.trigger('add_inventory_subcategory_changed', self.inventorySubcategories)
          }else if(data.status == 'e'){
            showToast("Error adding Subcategeory. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

}
