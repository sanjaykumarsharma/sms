function TimeTableRoomSettingsStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.rooms = []

  self.on('read_room', function() {
    console.log('i am in read_level api call from ajax')
    let req = {}
    $.ajax({
      url:'/time-table-room-settings',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.rooms = data.rooms
            self.trigger('room_changed', data.rooms)
          }else if(data.status == 'e'){
            showToast("level Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('delete_room', function(id) {
    $.ajax({
      url:'/time-table-room-settings/delete/'+id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            let tempRoom = self.rooms.filter(c => {
              return c.room_name != id
            })
            self.rooms = tempRoom
            self.trigger('room_changed', self.rooms)
          }else if(data.status == 'e'){
            showToast("Error Deleting Level. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('edit_room', function(room_name,room_details,id) {
    let req = {}
    req.room_name=room_name
    req.room_details=room_details
    req.id=id
    $.ajax({
      url:'/time-table-room-settings/edit/'+id,
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            self.rooms = self.rooms.map(cat => {
              if(cat.room_name == id){
                cat.room_name = room_name
                cat.room_details=room_details
              }
              // cat.confirmEdit = false
              return cat
            })
            self.trigger('room_changed', self.rooms)
          }else if(data.status == 'e'){
            showToast("Error updating Course. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
 
  self.on('add_room', function(room_name,room_details) {
    let req = {}
    req.room_name=room_name
    req.room_details=room_details
    $.ajax({
      url:'/time-table-room-settings/add',
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            console.log('add room_name after')
            let obj = {}
            //obj.level_id = data.level_id
            obj.room_name = room_name
            obj.room_details = room_details
            self.rooms = [obj, ...self.rooms]
            self.trigger('room_changed', self.rooms)
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
