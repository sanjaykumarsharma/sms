function TeacherTimeTableStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.on('read_init', function() {
    let req = {}
    $.ajax({
      url:'/teacher-time-table/read-init',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('read_init_changed', data.teachers,data.days,data.periods,data.standards,data.sections,data.subjects)
          }else if(data.status == 'e'){
            showToast("Teachers Read Error. Please try again.", data.messaage)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('read_edit_time_table', function(period_id,day_id) {
    let req = {}
    $.ajax({
      url:'/teacher-time-table/read-edit-time-table/'+period_id+'/'+day_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('read_edit_time_table_changed', data.rooms)
          }else if(data.status == 'e'){
            showToast("Rooms Read Error. Please try again.", data.messaage)
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
      url:'/teacher-time-table/read-periods/'+emp_id,
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

  self.on('update_time_table', function(obj) {
    $.ajax({
      url:'/teacher-time-table/edit-time-table',
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
      url:'/teacher-time-table/add-time-table',
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


  self.on('delete_time_table', function(obj) {
      $.ajax({
        url:'/teacher-time-table/delete-time-table',
          type:"POST",
          data: JSON.stringify(obj),
          contentType: "application/json",
          dataType:"json",
          headers: {"Authorization": getCookie('token')},
          success: function(data){
            console.log(data)
            if(data.status == 's'){
              self.trigger('delete_time_table_changed')
            }else if(data.status == 'e'){
              showToast("Error deleting time table. Please try again.", data.messaage)
            }
          },
          error: function(data){
            showToast("", data)
          }
        })
    })

}