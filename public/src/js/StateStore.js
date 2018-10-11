function StateStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.states = []

  self.on('read_state', function() {
    console.log('i am in read_state api call from ajax')
    let req = {}
    $.ajax({
      url:'/state',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.states = data.states
            self.trigger('state_changed', data.states)
          }else if(data.status == 'e'){
            showToast("level Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('delete_state', function(id) {
    $.ajax({
      url:'/state/delete/'+id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            let tempState = self.states.filter(c => {
              return c.state != id
            })
            self.states = tempState
            self.trigger('state_changed', self.states)
          }else if(data.status == 'e'){
            showToast("Error Deleting Level. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('edit_state', function(state,id) {
    let req = {}
    req.state=state
    req.id=id
    $.ajax({
      url:'/state/edit/'+id,
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            self.states = self.states.map(cat => {
              if(cat.state == id){
                cat.state = state
              }
              // cat.confirmEdit = false
              return cat
            })
            self.trigger('state_changed', self.states)
          }else if(data.status == 'e'){
            showToast("Error updating Course. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
 
  self.on('add_state', function(state) {
    let req = {}
    req.state=state
    $.ajax({
      url:'/state/add',
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            console.log('add state after')
            let obj = {}
            //obj.level_id = data.level_id
            obj.state = state
            self.states = [obj, ...self.states]
            self.trigger('state_changed', self.states)
          }else if(data.status == 'e'){
            showToast("Error adding Designation. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

}
