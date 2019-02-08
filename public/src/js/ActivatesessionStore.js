function ActivatesessionStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.sessions = []

  self.on('read_session', function() {
    console.log('i am in read_categories api call from ajax')
    let req = {}
    $.ajax({
      url:'/activate_session/read_session',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.sessions = data.sessions
            self.trigger('read_session_changed', data.sessions)
          }else if(data.status == 'e'){
            showToast("Session Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  
  self.on('current_session', function(session_id) {
    $.ajax({
      url:'/activate_session/current_session/'+session_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            toastr.info("Session Marked Successfully")
            self.trigger('current_session_changed', self.sessions)
          }else if(data.status == 'e'){
            showToast("Error in Marked Current Session. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

}
