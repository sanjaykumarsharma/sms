function TimeTablePeriodSettingsStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.periods = []

  self.on('read_period', function() {
    console.log('i am in read_level api call from ajax')
    let req = {}
    $.ajax({
      url:'/time-table-period-settings',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.periods = data.periods
            self.trigger('period_changed', data.periods)
          }else if(data.status == 'e'){
            showToast("level Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('csv_export_period', function(obj) {
    let req = {}
    req.data=obj
    $.ajax({
      url:'/time-table-period-settings/csv_export_period',
        contentType: "application/json",
        dataType:"json",
        type:'POST',
        data: JSON.stringify(req),
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('csv_export_period_changed', data.url)
          }else if(data.status == 'e'){
            
          }
        },
        error: function(data){
          
        }
      })
  })

  self.on('delete_period', function(id) {
    $.ajax({
      url:'/time-table-period-settings/delete/'+id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            let tempPeriod = self.periods.filter(c => {
              return c.period_id != id
            })
            self.periods = tempPeriod
            self.trigger('period_changed', self.periods)
          }else if(data.status == 'e'){
            showToast("Error Deleting Period. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('edit_period', function(period_name,start_time,end_time,is_break,remarks,id) {
    let req = {}
    req.period_name=period_name
    req.start_time=start_time
    req.end_time=end_time
    req.is_break=is_break
    req.remarks=remarks
    req.period_id=id
    $.ajax({
      url:'/time-table-period-settings/edit/'+id,
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            self.periods = self.periods.map(cat => {
              if(cat.period_id == id){
                cat.period_name = period_name
                cat.start_time=start_time
                cat.end_time=end_time
                cat.is_break=is_break
                cat.remarks=remarks
              }
              // cat.confirmEdit = false
              return cat
            })
            self.trigger('period_changed', self.periods)
          }else if(data.status == 'e'){
            showToast("Error updating Course. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
 
  self.on('add_period', function(period_name,start_time,end_time,is_break,remarks) {
    let req = {}
    req.period_name=period_name
    req.start_time=start_time
    req.end_time=end_time
    req.is_break=is_break
    req.remarks=remarks
    $.ajax({
      url:'/time-table-period-settings/add',
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            console.log('add period_name after')
            let obj = {}
            obj.period_id = data.id
            obj.period_name = period_name
            obj.start_time = start_time
            obj.end_time = end_time
            obj.is_break = is_break
            obj.remarks = remarks
            self.periods = [obj, ...self.periods]
            self.trigger('period_changed', self.periods)
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
