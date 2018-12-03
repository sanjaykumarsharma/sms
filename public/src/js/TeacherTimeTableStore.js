function TeacherTimeTableStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.on('read_teachers', function() {
    let req = {}
    $.ajax({
      url:'/teacher-time-table/read-teachers',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('read_teachers_changed', data.teachers)
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
      url:'/teacher-time-table/read-periods/'+emp_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('read_periods_changed', data.periods,data.time_table,data.days)
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