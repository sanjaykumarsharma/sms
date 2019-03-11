function LevelStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.levels = []

  self.on('read_level', function() {
    console.log('i am in read_level api call from ajax')
    let req = {}
    $.ajax({
      url:'/level',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.levels = data.levels
            self.trigger('level_changed', data.levels)
          }else if(data.status == 'e'){
            showToast("level Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('csv_export_Level', function() {
    console.log('i am in csv_export_Level api call from ajax')
    let req = {}
    $.ajax({
      url:'/level/csv_export_Level',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('csv_export_Level_changed', data.url)
          }else if(data.status == 'e'){}
        },
        error: function(data){
          //showToast("", data)
      }
    })
  })

  self.on('delete_level', function(id) {
    $.ajax({
      url:'/level/delete/'+id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            let tempLevel = self.levels.filter(c => {
              return c.level_id != id
            })
            self.levels = tempLevel
            self.trigger('level_changed', self.levels)
          }else if(data.status == 'e'){
            showToast("Error Deleting Level. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('edit_level', function(level,id) {
    let req = {}
    req.level=level
    req.id=id
    $.ajax({
      url:'/level/edit/'+id,
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            self.levels = self.levels.map(cat => {
              if(cat.level_id == id){
                cat.level_id = id
                cat.level=level
              }
              // cat.confirmEdit = false
              return cat
            })
            self.trigger('level_changed', self.levels)
          }else if(data.status == 'e'){
            showToast("Error updating Course. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
 
  self.on('add_level', function(level) {
    let req = {}
    req.level=level
    $.ajax({
      url:'/level/add',
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            console.log('add level after')
            let obj = {}
            obj.level_id = data.level_id
            obj.level = level
            self.levels = [obj, ...self.levels]
            self.trigger('level_changed', self.levels)
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
