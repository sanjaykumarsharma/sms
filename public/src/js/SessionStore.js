function SessionStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.sessions = []

  self.on('read_session', function() {
    console.log('i am in read_categories api call from ajax')
    let req = {}
    $.ajax({
      url:'/fees_session',
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

  self.on('add_session', function(session_name,session_start_date,session_end_date) {
    let req = {}
    req.session_name=session_name
    req.session_start_date=session_start_date
    req.session_end_date=session_end_date
    $.ajax({
      url:'/fees_session/add',
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
            obj.session_name = session_name
            obj.session_start_date = session_start_date
            obj.session_end_date = session_end_date
            self.sessions = [obj, ...self.sessions]
            toastr.success("Session Inserserted Successfully ")
            self.trigger('add_session_changed', self.sessions)
          }else if(data.status == 'e'){
            showToast("Invalid Username or password. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('edit_session', function(session_name,session_start_date,session_end_date,session_id) {
    let req = {}
    req.session_name=session_name
    req.session_start_date=session_start_date
    req.session_end_date=session_end_date
    req.session_id=session_id
    $.ajax({
      url:'/fees_session/edit/'+session_id,
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            self.sessions = self.sessions.map(cat => {
              if(cat.session_id == session_id){
                cat.session_id = session_id
                cat.session_name=session_name
                cat.session_start_date=session_start_date
                cat.session_end_date=session_end_date
              }
              // cat.confirmEdit = false
              return cat
            })
            toastr.success("Session Updated Successfully ")
            self.trigger('edit_session_changed', self.sessions)
          }else if(data.status == 'e'){
            showToast("Error updating Event. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('delete_session', function(session_id) {
    $.ajax({
      url:'/fees_session/delete/'+session_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            let tempSession = self.sessions.filter(c => {
              return c.session_id != session_id
            })
            self.sessions = tempSession
            toastr.info("Session Deleted Successfully")
            self.trigger('delete_event_changed', self.sessions)
          }else if(data.status == 'e'){
            showToast("Error Deleting Event. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  
  self.on('current_session', function(session_id) {
    $.ajax({
      url:'/fees_session/markCurrent/'+session_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            let tempSession = self.sessions.filter(c => {
              return c.session_id != session_id
            })
            self.sessions = tempSession
            toastr.info("Session Marked Successfully")
            self.trigger('marked_event_changed', self.sessions)
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
