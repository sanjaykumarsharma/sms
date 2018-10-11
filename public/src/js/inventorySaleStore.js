function InventorySaleStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.inventorySales=[];

  //read Inventory Isseu

  self.on('read_inventory_sale', function(id) {
   // console.log(id)
    console.log('i am in sale api call from ajax')
    let req = {}
    $.ajax({
      url:'/inventory_sale/'+id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.inventorySales = data.inventorySales
            self.trigger('read_inventory_sale_changed', data.inventorySales)
          }else if(data.status == 'e'){
            showToast("Item Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  //read available Item Quantity
  
 /*self.on('read_inventory_available_quantity', function(id) {
    console.log(id)
    console.log('i am in reading quantity api call from ajax')
    let req = {}
    $.ajax({
      url:'/inventory_sale/read_available_qunatity/'+id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.availableItems = data.availableItems
            self.trigger('read_inventory_available_quantity_changed', data.availableItems)
          }else if(data.status == 'e'){
            showToast("Item Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  }) */

  self.on('delete_inventory_sale', function(id) {
    console.log("delet")
    console.log('i am in delete api call from ajax')
    $.ajax({
      url:'/inventory_sale/delete/'+id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            let tempInventoryIssues = self.inventorySales.filter(c => {
              return c.sale_id != id
            })
            self.inventorySales = tempInventoryIssues
            toastr.info("Issue Deleted Successfully")
            self.trigger('delete_inventory_sale_changed', self.inventorySales)
          }else if(data.status == 'e'){
            showToast("Error Deleting Issue Item. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

 self.on('edit_inventory_sale', function(sale_date, category_id,sub_category_id,item_id,sale_to, available_quantity,sale_quantity,unit_id,rate ,id) {
    let req = {}
    req.sale_date=sale_date,
    req.category_id=category_id,
    req.sub_category_id=sub_category_id,
    req.item_id=item_id,
    req.sale_to=sale_to,
    req.available_quantity=available_quantity,
    req.sale_quantity=sale_quantity,
    req.unit_id=unit_id,
    req.rate=rate,
    req.id=id
    $.ajax({
      url:'/inventory_sale/edit/'+id,
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            self.inventorySales = self.inventorySales.map(cat => {
              if(cat.received_id == id){
                  cat.sale_date=sale_date,
                  cat.category_id=category_id,
                  cat.sub_category_id=sub_category_id,
                  cat.item_id=item_id,
                  cat.sale_to=sale_to,
                  cat.available_quantity=available_quantity,
                  cat.sale_quantity=sale_quantity,
                  cat.unit_id=unit_id,
                  cat.rate=rate,
                  cat.sale_id=id
              }
              // cat.confirmEdit = false
              return cat
            })
            toastr.success("Sale Item Updated Successfully ")
            self.trigger('edit_inventory_sale_changed', self.inventorySales)
          }else if(data.status == 'e'){
            showToast("Error updating Sale Item. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
  self.on('add_inventory_sale', function(sale_date, category_id,sub_category_id,item_id,sale_to,available_quantity,sale_quantity,unit_id,rate) {
    let req = {}
    req.sale_date=sale_date,
    req.category_id=category_id,
    req.sub_category_id=sub_category_id,
    req.item_id=item_id,
    req.sale_to=sale_to,
    req.available_quantity=available_quantity,
    req.sale_quantity=sale_quantity,
    req.unit_id=unit_id,
    req.rate=rate,
    $.ajax({
      url:'/inventory_sale/add',
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            console.log('add Issue after')
            let obj = {}
            obj.sale_id=data.sale_id
            req.sale_date=sale_date,
            req.category_id=category_id,
            req.sub_category_id=sub_category_id,
            req.item_id=item_id,
            req.sale_to=sale_to,
            req.available_quantity=available_quantity,
            req.sale_quantity=sale_quantity,
            req.unit_id=unit_id,
            req.rate=rate,
           // obj.category_id = category_id
            self.inventorySales = [obj, ...self.inventorySales]
            toastr.success("Sale Item Inserserted Successfully ")
            self.trigger('add_inventory_sale_changed', self.inventorySales)
          }else if(data.status == 'e'){
            showToast("Error adding Issue Item. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

}
