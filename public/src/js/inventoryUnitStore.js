function InventoryUnitStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.inventoryUnits = []

  self.on('read_inventory_unit', function() {
    console.log('i am in Unit Master api call from ajax')
    let req = {}
    $.ajax({
      url:'/inventory_unit',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.inventoryUnits = data.inventoryUnits
            self.trigger('inventoryUnit_changed', data.inventoryUnits)
          }else if(data.status == 'e'){
            showToast("Items Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('delete_inventory_unit', function(id) {
    $.ajax({
      url:'/inventory_unit/delete/'+id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            let tempUnits = self.inventoryUnits.filter(c => {
              return c.unit_id != id
            })
            self.inventoryUnits = tempUnits
            toastr.info("Units Deleted Successfully")
            self.trigger('inventoryUnit_changed', self.inventoryUnits)
          }else if(data.status == 'e'){
            showToast("Error Deleting Unit. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('edit_inventory_unit', function(unit,id) {
    let req = {}
    req.unit=unit
    req.id=id
    $.ajax({
      url:'/inventory_unit/edit/'+id,
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            self.inventoryUnits = self.inventoryUnits.map(cat => {
              if(cat.unit_id == id){
                cat.unit_id = id
                cat.unit=unit
              }
              // cat.confirmEdit = false
              return cat
            })
            toastr.success("Unit Updated Successfully ")
            self.trigger('inventoryUnit_changed', self.inventoryUnits)
          }else if(data.status == 'e'){
            showToast("Error updating Item. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
 
  self.on('add_inventory_unit', function(unit) {
    let req = {}
    req.unit=unit
    $.ajax({
      url:'/inventory_unit/add',
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            console.log('add unit after')
            let obj = {}
            obj.unit_id = data.unit_id
            obj.unit = unit
            self.inventoryUnits = [obj, ...self.inventoryUnits]
            toastr.success("Unit Inserserted Successfully ")
            self.trigger('inventoryUnit_changed', self.inventoryUnits)
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
