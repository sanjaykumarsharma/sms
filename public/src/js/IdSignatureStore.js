function IdSignatureStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.epmloyee_card_setup = []

   self.on('read_signature', function() {
    let req = {}
    $.ajax({
      url:'/id_signature/read_signature/',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.signature = data.signature
            self.trigger('read_signature_changed', data.signature)
          }else if(data.status == 'e'){
            showToast("Standard Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

   self.on('add_signature', function(type) {
    let req = {}
    req.type=type
    $.ajax({
      url:'/id_signature/add_signature',
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            console.log('add item after')
            toastr.success("Data Inserserted Successfully ")
            self.trigger('add_signature_changed', self.signature,data.type)
          }else if(data.status == 'e'){
            showToast("Error adding Signature. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('edit_signature', function(type,old_type) {
    let req = {}
    req.type=type
    req.old_type=old_type
    $.ajax({
      url:'/id_signature/edit_signature/'+type+'/'+old_type,
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            toastr.success("Data Updated Successfully ")
            self.trigger('edit_signature_changed', self.signature,data.type)
          }else if(data.status == 'e'){
            showToast("Error Updateing Signature. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('delete_signature', function(type) {
    let req = {}
    req.type=type
    $.ajax({
      url:'/id_signature/delete_signature/'+type,
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            toastr.success("Data Deleted Successfully ")
            self.trigger('delete_signature_changed')
          }else if(data.status == 'e'){
            showToast("Error Deleting Signature. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('active_signature', function(type) {
    let req = {}
    req.type=type
    $.ajax({
      url:'/id_signature/active_signature/'+type,
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            toastr.success("Data Updated Successfully ")
            self.trigger('active_signature_changed', data.active_signature)
          }else if(data.status == 'e'){
            showToast("Error Updateing Signature. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('upload_signature_image', function(signature_image,type) {
    var form_data = new FormData(); 
    form_data.append("signature_picture", signature_image);
    $.ajax({
      url:'/id_signature/upload_signature_image/signature/'+type,
        type:"POST",
        dataType: 'script',
        processData: false,
        contentType: false,
        data: form_data,
        headers: {"Authorization": getCookie('token')},
        success: function(image_name){
          console.log(image_name)
          self.trigger('upload_signature_image_changed', image_name)
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

}
