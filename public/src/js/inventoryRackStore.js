function InventoryRackStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.inventoryRacks = []

  self.on('read_inventory_rack', function() {
    console.log('i am in Rack Master api call from ajax')
    let req = {}
    $.ajax({
      url:'/inventory_rack',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.inventoryRacks = data.inventoryRacks
            self.trigger('inventoryRack_changed', data.inventoryRacks)
          }else if(data.status == 'e'){
            showToast("Items Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('delete_inventory_rack', function(id) {
    $.ajax({
      url:'/inventory_rack/delete/'+id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            let tempRacks = self.inventoryRacks.filter(c => {
              return c.rack_id != id
            })
            self.inventoryRacks = tempRacks
            toastr.info("Racks Deleted Successfully")
            self.trigger('inventoryRack_changed', self.inventoryRacks)
          }else if(data.status == 'e'){
            showToast("Error Deleting Rack. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('edit_inventory_rack', function(rack_name,id) {
    let req = {}
    req.rack_name=rack_name
    req.id=id
    $.ajax({
      url:'/inventory_rack/edit/'+id,
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            self.inventoryRacks = self.inventoryRacks.map(cat => {
              if(cat.rack_id == id){
                cat.rack_id = id
                cat.rack_name=rack_name
              }
              // cat.confirmEdit = false
              return cat
            })
            toastr.success("Rack Updated Successfully ")
            self.trigger('inventoryRack_changed', self.inventoryRacks)
          }else if(data.status == 'e'){
            showToast("Error updating Item. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
 
  self.on('add_inventory_rack', function(rack_name) {
    let req = {}
    req.rack_name=rack_name
    $.ajax({
      url:'/inventory_rack/add',
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            console.log('add rack after')
            let obj = {}
            obj.rack_id = data.rack_id
            obj.rack_name = rack_name
            self.inventoryRacks = [obj, ...self.inventoryRacks]
            toastr.success("Rack Inserserted Successfully ")
            self.trigger('inventoryRack_changed', self.inventoryRacks)
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
