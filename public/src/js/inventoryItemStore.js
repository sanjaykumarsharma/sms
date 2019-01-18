function InventoryItemStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.inventoryItems=[];

  //read Inventory Item

  self.on('read_inventory_item', function() {
    console.log('i am in Item api call from ajax')
    let req = {}
    $.ajax({
      url:'/inventory_item',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.inventoryItems = data.inventoryItems
            self.trigger('read_inventory_item_changed', data.inventoryItems)
          }else if(data.status == 'e'){
            showToast("Item Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
  
  

  self.on('delete_inventory_item', function(id) {
    $.ajax({
      url:'/inventory_item/delete/'+id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            let tempInventoryItems = self.inventoryItems.filter(c => {
              return c.item_id != id
            })
            self.inventoryItems = tempInventoryItems
            toastr.info("Item Deleted Successfully")
            self.trigger('delete_inventory_item_changed', self.inventoryItems)
          }else if(data.status == 'e'){
            showToast("Error Deleting Item. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('edit_inventory_item', function(department,category_id,sub_category_id,item_name,id,category_name,subcategory_name) {
    let req = {}
    req.department=department
    req.category_id=category_id
    req.sub_category_id=sub_category_id
    req.item_name=item_name
    req.id=id
    $.ajax({
      url:'/inventory_item/edit/'+id,
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            self.inventoryItems = self.inventoryItems.map(cat => {
              if(cat.item_id == id){
                cat.item_id = id
                cat.category_id=category_id
                cat.department=department
                cat.sub_category_id=sub_category_id
                cat.item_name=item_name
                cat.category_name=category_name
                cat.sub_category=subcategory_name
              }
              // cat.confirmEdit = false
              return cat
            })
            toastr.success("Item Updated Successfully ")
            self.trigger('edit_inventory_item_changed', self.inventoryItems)
          }else if(data.status == 'e'){
            showToast("Error updating Item. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
 
  self.on('add_inventory_item', function(department,category_id, sub_category_id, item_name,category_name,subcategory_name) {
    let req = {}
    req.department=department
    req.category_id=category_id
    req.sub_category_id=sub_category_id
    req.item_name=item_name
    $.ajax({
      url:'/inventory_item/add',
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
            obj.item_id = data.item_id
            obj.sub_category_id = sub_category_id
            obj.department = department
            obj.category_id = category_id
            obj.item_name = item_name
            obj.category_name=category_name
            obj.sub_category=subcategory_name
            self.inventoryItems = [obj, ...self.inventoryItems]
            toastr.success("Item Inserserted Successfully ")
            self.trigger('add_inventory_item_changed', self.inventoryItems)
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
