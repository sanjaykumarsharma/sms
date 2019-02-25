function ResultActivationStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.maturityDevelopments = []

  self.on('read_result_activation', function() {
    let req = {}
    $.ajax({
      url:'/result-activation',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('read_result_activation_changed', data.classes)
          }else if(data.status == 'e'){
            showToast("result activation read error. Please try again.", data.messaage)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('result_activation_update', function(st) {
    $.ajax({
      url:'/result-activation/update',
        type:"POST",
        data: JSON.stringify(st),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            toastr.success("Update Successfull")
            self.trigger('result_activation_update_changed')
          }else if(data.status == 'e'){
            showToast("Error updating result activation. Please try again.", data.messaage)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

}
