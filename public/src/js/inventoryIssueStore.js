function InventoryIssueStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.inventoryIssues=[];

  //read Inventory Isseu

  self.on('read_inventory_issue', function(id,type) {
    console.log("item_id")
    console.log(id)
    //console.log('i am in stock api call from ajax')
    let req = {}
    $.ajax({
      url:'/inventory_issue/'+id+'/'+type,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.inventoryIssues = data.inventoryIssues
            self.trigger('read_inventory_issue_changed', data.inventoryIssues)
          }else if(data.status == 'e'){
            showToast("Item Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
  self.on('read_inventory_returnable_item', function(id,type) {
    console.log("item_id")
    console.log(id)
    //console.log('i am in stock api call from ajax')
    let req = {}
    $.ajax({
      url:'/inventory_issue/read_returnable/'+id+'/'+type,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.inventoryReturnableGoods = data.inventoryReturnableGoods
            self.trigger('read_inventory_returnable_changed', data.inventoryReturnableGoods)
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
  
 self.on('read_inventory_available_quantity', function(id) {
    console.log("item_id")
    console.log(id)
    if(id==''){
      return;
    }
    let req = {}
    $.ajax({
      url:'/inventory_issue/read_qunatity/'+id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.availableItems = data.availableItems
            self.rack_ids = data.rack_ids
            self.trigger('read_inventory_available_quantity_changed', data.availableItems,self.rack_ids)
          }else if(data.status == 'e'){
            showToast("Item Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  }) 

  self.on('delete_inventory_issue', function(id) {
    console.log("delet")
    console.log('i am in delete api call from ajax')
    $.ajax({
      url:'/inventory_issue/delete/'+id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            let tempInventoryIssues = self.inventoryIssues.filter(c => {
              return c.issue_id != id
            })
            self.inventoryIssues = tempInventoryIssues
            toastr.info("Issue Item Deleted Successfully")
            self.trigger('delete_inventory_issue_changed', self.inventoryIssues)
          }else if(data.status == 'e'){
            showToast("Error Deleting Issue Item. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('edit_inventory_issue', function(issue_date, category_id,sub_category_id,item_id,return_type,issue_type,issue_to,staff_id, available_quantity,issue_quantity,unit_id,purpose,rack_id,id,category_name, subcategory_name,item_name) {
    let req = {}
    req.issue_date=issue_date,
    req.category_id=category_id,
    req.sub_category_id=sub_category_id,
    req.item_id=item_id,
    req.return_type=return_type,
    req.issue_type=issue_type,
    req.issue_to=issue_to,
    req.staff_id=staff_id,
    req.available_quantity=available_quantity,
    req.issue_quantity=issue_quantity,
    req.unit_id=unit_id,
    req.purpose=purpose,
    req.rack_id=rack_id,
    req.id=id
    $.ajax({
      url:'/inventory_issue/edit/'+id,
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            self.inventoryIssues = self.inventoryIssues.map(cat => {
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
                  cat.category_name=category_name
                  cat.subcategory_name=subcategory_name
                  cat.item_name=item_name
              }
              // cat.confirmEdit = false
              return cat
            })
            toastr.success("Issue item Updated Successfully ")
            self.trigger('edit_inventory_issue_changed', self.inventoryIssues)
          }else if(data.status == 'e'){
            showToast("Error updating Issue Item. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
 
  self.on('add_inventory_issue', function(issue_date, category_id,sub_category_id,item_id,return_type,issue_type,issue_to,staff_id, available_quantity,issue_quantity,unit_id,purpose,rack_id,category_name, subcategory_name,item_name) {
    let req = {}
    req.issue_date=issue_date,
    req.category_id=category_id,
    req.sub_category_id=sub_category_id,
    req.item_id=item_id,
    req.return_type=return_type,
    req.issue_type=issue_type,
    req.issue_to=issue_to,
    req.staff_id=staff_id,
    req.available_quantity=available_quantity,
    req.issue_quantity=issue_quantity,
    req.unit_id=unit_id,
    req.purpose=purpose,
    req.rack_id=rack_id,
    $.ajax({
      url:'/inventory_issue/add',
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
            obj.issue_id=data.issue_id
            obj.issue_date=issue_date,
            obj.category_id=category_id,
            obj.sub_category_id=sub_category_id,
            obj.item_id=item_id,
            obj.return_type=return_type,
            obj.issue_type=issue_type,
            obj.issue_to=issue_to,
            obj.staff_id=staff_id,
            obj.available_quantity=available_quantity,
            obj.issue_quantity=issue_quantity,
            obj.unit_id=unit_id,
            obj.purpose=purpose,
            obj.rack_id=rack_id,
            obj.category_name=category_name
            obj.subcategory_name=subcategory_name
            obj.item_name=item_name
           // obj.category_id = category_id
            self.inventoryIssues = [obj, ...self.inventoryIssues]
            toastr.success("Issue Item Inserserted Successfully ")
            self.trigger('add_inventory_issue_changed', self.inventoryIssues)
          }else if(data.status == 'e'){
            showToast("Error adding Issue Item. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

// add Retun goods
  
  self.on('add_inventory_return_goods', function(obj, return_date,return_to,return_quantity,remark) {
    let req = {}
    req.obj=obj, 
    req.return_date=return_date,
    req.return_to=return_to,
    req.return_quantity=return_quantity,
    req.remark=remark,
   /* req.issue_type=issue_type,
    req.issue_to=issue_to,
    req.staff_id=staff_id,
    req.available_quantity=available_quantity,
    req.issue_quantity=issue_quantity,
    req.unit_id=unit_id,
    req.purpose=purpose,
    req.rack_id=rack_id,*/
    $.ajax({
      url:'/inventory_issue/add_inventory_return_goods',
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            console.log('add Retun goods after')
            let obj = {}
             obj.return_date=return_date,
             obj.return_to=return_to,
             obj.return_quantity=return_quantity,
             obj.remark=remark,
            /*obj.issue_id=data.issue_id
            obj.issue_date=issue_date,
            obj.category_id=category_id,
            obj.sub_category_id=sub_category_id,
            obj.item_id=item_id,
            obj.return_type=return_type,
            obj.issue_type=issue_type,
            obj.issue_to=issue_to,
            obj.staff_id=staff_id,
            obj.available_quantity=available_quantity,
            obj.issue_quantity=issue_quantity,
            obj.unit_id=unit_id,
            obj.purpose=purpose,
            obj.rack_id=rack_id,*/
           // obj.category_id = category_id
            self.inventoryReturnableGoods = [obj, ...self.inventoryReturnableGoods]
            toastr.success("Issue Item Inserserted Successfully ")
            self.trigger('add_inventory_return_goods_changed', self.inventoryReturnableGoods)
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
