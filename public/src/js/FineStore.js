function FineStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.fines = []

  self.on('read_fine_setting', function() {
    console.log('i am in read api call from ajax')
    let req = {}
    $.ajax({
      url:'/fine_setting',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.fines = data.fines
            self.trigger('read_fine_changed', data.fines)
          }else if(data.status == 'e'){
            showToast("Fine Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('add', function(fine_grace_preiod, fine_amount, fine_type){
    let req = {}
    req.fine_type=fine_type
    req.fine_grace_preiod=fine_grace_preiod
    req.fine_amount=fine_amount
    $.ajax({
      url:'/fine_setting/add',
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            console.log('add event after')
            let obj = {}
            obj.id = data.id
            obj.fine_type = fine_type
            obj.fine_grace_preiod = fine_grace_preiod
            obj.fine_amount = fine_amount
            self.fines = [obj, ...self.fines]
            toastr.success("Fine Inserserted Successfully ")
            self.trigger('add_bank_changed', self.fines)
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
