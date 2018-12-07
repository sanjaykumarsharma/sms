function TimeTableAdminStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.on('read_init_class_report', function() {
    let req = {}
    $.ajax({
      url:'/time-table-admin/read-init-class-report',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('read_init_class_report_changed', data.teachers,data.days,data.periods,data.rooms,data.standards,data.sections)
          }else if(data.status == 'e'){
            showToast("Teachers Read Error. Please try again.", data.messaage)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('read_periods_class_report', function(section_id) {
    let req = {}
    $.ajax({
      url:'/time-table-admin/read-periods-class-report/'+section_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('read_periods_class_report_changed', data.time_table)
          }else if(data.status == 'e'){
            showToast("Periods Read Error. Please try again.", data.messaage)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
  

  //Room Report

  self.on('read_init_room_report', function() {
    let req = {}
    $.ajax({
      url:'/time-table-admin/read-init-room-report',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('read_init_room_report_changed', data.teachers,data.days,data.periods,data.rooms,data.standards,data.sections)
          }else if(data.status == 'e'){
            showToast("Teachers Read Error. Please try again.", data.messaage)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('read_periods_room_report', function(room_id) {
    let req = {}
    $.ajax({
      url:'/time-table-admin/read-periods-room-report/'+room_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('read_periods_room_report_changed', data.time_table)
          }else if(data.status == 'e'){
            showToast("Periods Read Error. Please try again.", data.messaage)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  //Teacher Report

  self.on('read_init_teacher_report', function() {
    let req = {}
    $.ajax({
      url:'/time-table-admin/read-init-teacher-report',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('read_init_teacher_report_changed', data.teachers,data.days,data.periods,data.rooms,data.standards,data.sections)
          }else if(data.status == 'e'){
            showToast("Teachers Read Error. Please try again.", data.messaage)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('read_periods_teacher_report', function() {
    let req = {}
    $.ajax({
      url:'/time-table-admin/read-periods-teacher-report/',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('read_periods_teacher_report_changed', data.time_table)
          }else if(data.status == 'e'){
            showToast("Periods Read Error. Please try again.", data.messaage)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

}