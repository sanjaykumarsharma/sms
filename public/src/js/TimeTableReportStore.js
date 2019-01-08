function TimeTableReportStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this


  self.on('read_summary', function() {
    console.log('i am in read_level api call from ajax')
    let req = {}
    $.ajax({
      url:'/time-table-report',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('summary_changed', data.summaries)
          }else if(data.status == 'e'){
            showToast("Summary Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('read_detail', function() {
    console.log('i am in read_level api call from ajax')
    let req = {}
    $.ajax({
      url:'/time-table-report/details',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('detail_changed', data.details)
          }else if(data.status == 'e'){
            showToast("Details Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

}
