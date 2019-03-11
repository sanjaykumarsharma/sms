function TimeTableDaySettingsStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.days = []

  self.on('read_day', function() {
    console.log('i am in read_level api call from ajax')
    let req = {}
    $.ajax({
      url:'/time-table-day-settings',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.days = data.days
            self.trigger('day_changed', data.days)
          }else if(data.status == 'e'){
            showToast("level Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('csv_export_day', function(obj) {
    let req = {}
    req.data=obj
    $.ajax({
      url:'/time-table-day-settings/csv_export_day',
        contentType: "application/json",
        dataType:"json",
        type:'POST',
        data: JSON.stringify(req),
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('csv_export_day_changed', data.url)
          }else if(data.status == 'e'){
            
          }
        },
        error: function(data){
          
        }
      })
  })

  self.on('delete_day', function(id) {
    $.ajax({
      url:'/time-table-day-settings/delete/'+id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            let tempDay = self.days.filter(c => {
              return c.day_id != id
            })
            self.days = tempDay
            self.trigger('day_changed', self.days)
          }else if(data.status == 'e'){
            showToast("Error Deleting Day. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('edit_day', function(day_name,id) {
    let req = {}
    req.day_name=day_name
    req.day_id=id
    $.ajax({
      url:'/time-table-day-settings/edit/'+id,
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            self.days = self.days.map(cat => {
              if(cat.day_id == id){
                cat.day_name = day_name
              }
              // cat.confirmEdit = false
              return cat
            })
            self.trigger('day_changed', self.days)
          }else if(data.status == 'e'){
            showToast("Error updating Course. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
 
  self.on('add_day', function(day_name) {
    let req = {}
    req.day_name=day_name
    $.ajax({
      url:'/time-table-day-settings/add',
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            console.log('add day_name after')
            let obj = {}
            obj.day_id = data.id
            obj.day_name = day_name
            self.days = [obj, ...self.days]
            self.trigger('day_changed', self.days)
          }else if(data.status == 'e'){
            showToast("Error adding Days. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

}
