function RemarkStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.remarks = []


  self.on('read_remark', function() {
    console.log('i am in remark api call from ajax')
    let req = {}
    $.ajax({
      url:'/remark/read_remark',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.remarks = data.remarks
            self.trigger('read_remark_changed', data.remarks)
          }else if(data.status == 'e'){
            showToast("Club Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('delete_remark', function(id) {
    $.ajax({
      url:'/remark/delete/'+id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            let tempRemarks = self.remarks.filter(c => {
              return c.remark_id != id
            })
            self.remarks = tempRemarks
            toastr.info("Remark Deleted Successfully")
            self.trigger('delete_remark_changed', self.remarks)
          }else if(data.status == 'e'){
            showToast("Error Deleting Remark. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('edit_remark', function(remark,short_remark,remark_id) {
    let req = {}
    req.remark=remark
    req.short_remark=short_remark
    req.id=remark_id
    $.ajax({
      url:'/remark/edit/'+remark_id,
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            self.remarks = self.remarks.map(cat => {
              if(cat.remark_id == remark_id){
                cat.remark_id =remark_id
                cat.remark=remark
                cat.short_remark=short_remark
              }
              // cat.confirmEdit = false
              return cat
            })
            toastr.success("Reamrk  Updated Successfully ")
            self.trigger('edit_remark_changed', self.remarks)
          }else if(data.status == 'e'){
            showToast("Error updating remarks. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
 
  self.on('add_remark', function(remark,short_remark) {
    let req = {}
    req.remark=remark
    req.short_remark=short_remark
    $.ajax({
      url:'/remark/add',
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            console.log('add Remark after')
            let obj = {}
                 obj.remark_id =data.id
                obj.remark=remark
                obj.short_remark=short_remark
           // obj.name = name
            self.remarks = [obj, ...self.remarks]
            toastr.success("Remark Inserserted Successfully ")
            self.trigger('add_remark_changed', self.remarks)
          }else if(data.status == 'e'){
            showToast("Invalid Username or password. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

}
