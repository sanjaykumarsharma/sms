function FeeHeadStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.heads = []

  self.on('read_heads', function() {
    console.log('i am in read heads api call from ajax')
    let req = {}
    $.ajax({
      url:'/fee_heads',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.heads = data.heads
            self.trigger('heads_changed', data.heads)
          }else if(data.status == 'e'){
            showToast("Items Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('delete_head', function(id) {
    $.ajax({
      url:'/fee_heads/delete/'+id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            let tempHeads = self.heads.filter(c => {
              return c.head_id != id
            })
            self.heads = tempHeads
            toastr.info("Head Deleted Successfully")
            self.trigger('heads_changed', self.heads)
          }else if(data.status == 'e'){
            showToast("Error Deleting Head. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('edit_head', function(head,id) {
    let req = {}
    req.head=head
    req.head_id=id
    $.ajax({
      url:'/fee_heads/edit/'+id,
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            self.heads = self.heads.map(cat => {
              if(cat.head_id == id){
                cat.head_id = id
                cat.head=head
              }
              // cat.confirmEdit = false
              return cat
            })
            toastr.success("Category Updated Successfully ")
            self.trigger('heads_changed', self.heads)
          }else if(data.status == 'e'){
            showToast("Error updating Item. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
 
  self.on('add_head', function(head) {
    let req = {}
    req.head=head
    $.ajax({
      url:'/fee_heads/add',
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            console.log('add head after')
            let obj = {}
            obj.id = data.id
            obj.head = head
            self.heads = [obj, ...self.heads]
            toastr.success("Head Inserserted Successfully ")
            self.trigger('heads_changed', self.heads)
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
