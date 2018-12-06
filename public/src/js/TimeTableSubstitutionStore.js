function TimeTableSubstitutaionStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.on('read_init', function() {
    let req = {}
    $.ajax({
      url:'/time-table-substitutation/read-init',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('read_init_changed', data.teachers,data.days,data.periods,data.rooms)
            // self.trigger('read_init_changed', data.teachers,data.days,data.periods,data.standards,data.sections,data.subjects)
          }else if(data.status == 'e'){
            showToast("Teachers Read Error. Please try again.", data.messaage)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

   self.on('read_periods', function(emp_id) {
    let req = {}
    $.ajax({
      url:'/time-table-substitutation/read-periods/'+emp_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('read_periods_changed', data.time_table)
          }else if(data.status == 'e'){
            showToast("Periods Read Error. Please try again.", data.messaage)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('read_edit_time_table', function(obj) {
    $.ajax({
      url:'/time-table-substitutation/read-edit-time-table/',
        contentType: "application/json",
        dataType:"json",
        type:"POST",
        data: JSON.stringify(obj),
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('read_edit_time_table_changed', data.free_periods, data.teacher_peiods)
          }else if(data.status == 'e'){
            showToast("Free Periods Read Error. Please try again.", data.messaage)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('reset_time_table', function(obj) {
    $.ajax({
      url:'/time-table-substitutation/reset-time-table',
        type:"POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('reset_time_table_changed')
          }else if(data.status == 'e'){
            showToast("Error resetting time table. Please try again.", data.messaage)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })


  self.on('update_time_table', function(obj) {
    $.ajax({
      url:'/time-table-substitutation/edit-time-table',
        type:"POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('update_time_table_changed')
          }else if(data.status == 'e'){
            showToast("Error updating time table. Please try again.", data.messaage)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('add_time_table', function(obj) {
    $.ajax({
      url:'/time-table-substitutation/add-time-table',
        type:"POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('add_time_table_changed')
          }else if(data.status == 'e'){
            showToast("Error adding time table. Please try again.", data.messaage)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })


  

}