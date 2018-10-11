function FeeSlipStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.slips = []

  self.on('read_slips', function() {
    console.log('i am in read slips api call from ajax')
    let req = {}
    $.ajax({
      url:'/fee_slips',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.slips = data.slips
            self.trigger('slips_changed', data.slips)
          }else if(data.status == 'e'){
            showToast("Slip Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('delete_slip', function(fee_slip_name) {
    $.ajax({
      url:'/fee_slips/delete/'+fee_slip_name,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            let tempSlips = self.slips.filter(c => {
              return c.fee_slip_name != fee_slip_name
            })
            self.slips = tempSlips
            toastr.info("Slip Deleted Successfully")
            self.trigger('slips_changed', self.slips)
          }else if(data.status == 'e'){
            showToast("Error Deleting Head. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('edit_slip', function(fee_slip_name,old_fee_slip_name) {
    let req = {}
    console.log("old"+old_fee_slip_name)
    req.fee_slip_name=fee_slip_name
    req.old_fee_slip_name=old_fee_slip_name
    $.ajax({
      url:'/fee_slips/edit',
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            self.slips = self.slips.map(cat => {
              if(cat.fee_slip_name == old_fee_slip_name){
                cat.fee_slip_name=fee_slip_name
              }
              // cat.confirmEdit = false
              return cat
            })
            toastr.success("Slip Updated Successfully ")
            self.trigger('slips_changed', self.slips)
          }else if(data.status == 'e'){
            showToast("Error updating Item. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
 
  self.on('add_slip', function(fee_slip_name) {
    let req = {}
    req.fee_slip_name=fee_slip_name
    $.ajax({
      url:'/fee_slips/add',
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            console.log('add fee slip after')
            let obj = {}
            obj.fee_slip_name = fee_slip_name
            self.slips = [obj, ...self.slips]
            toastr.success("Slip Inserserted Successfully ")
            self.trigger('slips_changed', self.slips)
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
