function ActivityItemStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.items = []

  self.on('csv_export_activity_item', function() {
    console.log('i am in csv_export_department api call from ajax')
    let req = {}
    $.ajax({
      url:'/activity_item/csv_export_activity_item',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            
          self.trigger('csv_export_activity_item_changed', data.url)
          }else if(data.status == 'e'){}
        },
        error: function(data){
          //showToast("", data)
      }
    })
  })

  self.on('read_items', function() {
    console.log('i am in read_courses api call from ajax')
    let req = {}
    $.ajax({
      url:'/activity_item',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.items = data.items
            self.trigger('items_changed', data.items)
          }else if(data.status == 'e'){
            showToast("Items Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('delete_item', function(item_id) {
    $.ajax({
      url:'/activity_item/delete/'+item_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            let tempItems = self.items.filter(c => {
              return c.item_id != item_id
            })
            self.items = tempItems
            toastr.info("Item Deleted Successfully")
            self.trigger('items_changed', self.items)
          }else if(data.status == 'e'){
            showToast("Error Deleting Item. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('edit_item', function(item_name,item_id) {
    let req = {}
    req.item_name=item_name
    req.item_id=item_id
    $.ajax({
      url:'/activity_item/edit/'+item_id,
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            self.items = self.items.map(cat => {
              if(cat.item_id == item_id){
                cat.item_id = item_id
                cat.item_name=item_name
              }
              // cat.confirmEdit = false
              return cat
            })
            toastr.success("Item Updated Successfully ")
            self.trigger('items_changed', self.items)
          }else if(data.status == 'e'){
            showToast("Error updating Item. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
 
  self.on('add_item', function(item_name) {
    let req = {}
    req.item_name=item_name
    $.ajax({
      url:'/activity_item/add',
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            console.log('add item after')
            let obj = {}
            obj.id = data.id
            obj.item_name = item_name
            self.items = [obj, ...self.items]
            toastr.success("Item Inserserted Successfully ")
            self.trigger('items_changed', self.items)
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
