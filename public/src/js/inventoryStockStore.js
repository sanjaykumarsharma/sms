function InventoryStockStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.inventoryStocks=[];

  //read Inventory Item

  self.on('read_inventory_stock', function(id) {
    console.log(id)
    console.log('i am in stock api call from ajax')
    let req = {}
    $.ajax({
      url:'/inventory_stock/'+id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.inventoryStocks = data.inventoryStocks
            self.trigger('read_inventory_stock_changed', data.inventoryStocks)
          }else if(data.status == 'e'){
            showToast("Item Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
  
  

  self.on('delete_inventory_stock', function(id) {
    $.ajax({
      url:'/inventory_stock/delete/'+id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            let tempInventoryStocks = self.inventoryStocks.filter(c => {
              return c.received_id != id
            })
            self.inventoryStocks = tempInventoryStocks
            toastr.info("Stock Deleted Successfully")
            self.trigger('delete_inventory_stock_changed', self.inventoryStocks)
          }else if(data.status == 'e'){
            showToast("Error Deleting IStock Item. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('edit_inventory_stock', function(received_date, category_id,sub_category_id,item_id,rate,quantity,unit_id,received_from,rack_id,remark,id) {
    let req = {}
    req.received_date=received_date
    req.category_id=category_id
    req.sub_category_id=sub_category_id
    req.item_id=item_id
    req.unit_id=unit_id
    req.received_date=received_date
    req.received_from=received_from
    req.rate=rate
    req.quantity=quantity
    req.rack_id=rack_id
    req.remark=remark
    req.id=id
    $.ajax({
      url:'/inventory_stock/edit/'+id,
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            self.inventoryStocks = self.inventoryStocks.map(cat => {
              if(cat.received_id == id){
                  cat.received_date=received_date
                  cat.category_id=category_id
                  cat.sub_category_id=sub_category_id
                  cat.item_id=item_id
                  cat.unit_id=unit_id
                  cat.received_date=received_date
                  cat.received_from=received_from
                  cat.rate=rate
                  cat.quantity=quantity
                  cat.rack_id=rack_id
                  cat.remark=remark
                  cat.received_id=id
              }
              // cat.confirmEdit = false
              return cat
            })
            toastr.success("Stock Item Updated Successfully ")
            self.trigger('edit_inventory_stock_changed', self.inventoryStocks)
          }else if(data.status == 'e'){
            showToast("Error updating Stock Item. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
 
  self.on('add_inventory_stock', function(received_date, category_id,sub_category_id,item_id,rate,quantity,unit_id,received_from,rack_id,remark) {
    let req = {}
    req.received_date=received_date
    req.category_id=category_id
    req.sub_category_id=sub_category_id
    req.item_id=item_id
    req.unit_id=unit_id
    req.received_date=received_date
    req.received_from=received_from
    req.rate=rate
    req.quantity=quantity
    req.remark=remark
    req.rack_id=rack_id
    $.ajax({
      url:'/inventory_stock/add',
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            console.log('add Stock after')
            let obj = {}
            obj.received_from = data.received_from
            obj.received_date=received_date
            obj.category_id=category_id
            obj.sub_category_id=sub_category_id
            obj.item_id=item_id
            obj.unit_id=unit_id
            obj.received_date=received_date
            obj.received_from=received_from
            obj.rate=rate
            obj.quantity=quantity
            obj.remark=remark
            obj.rack_id=rack_id
           // obj.category_id = category_id
            self.inventoryStocks = [obj, ...self.inventoryStocks]
            toastr.success("Stock Item Inserserted Successfully ")
            self.trigger('add_inventory_stock_changed', self.inventoryStocks)
          }else if(data.status == 'e'){
            showToast("Error adding Stock Item. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

}
