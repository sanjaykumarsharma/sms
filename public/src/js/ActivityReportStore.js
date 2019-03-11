function ActivityReportStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  /*self.case_wise_reports = []*/

  self.on('read_activity_date_wise_report', function(obj) {
    console.log('i am in read_categories api call from ajax')
    let req = {}
    req.start_date=obj.start_date
    req.end_date=obj.end_date
    req.activity_type=obj.activity_type
    $.ajax({
      url:'/activity_report/read_activity_date_wise_report/'+obj.start_date+'/'+obj.end_date+'/'+obj.activity_type,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.activity_date_wise_report = data.activity_date_wise_report
            self.trigger('read_activity_date_wise_report_changed', self.activity_date_wise_report)
          }else if(data.status == 'e'){
            showToast("Data Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('csv_activity_date_wise_report', function(obj) {
    let req = {}
    req.start_date=obj.start_date
    req.end_date=obj.end_date
    req.activity_type=obj.activity_type
    $.ajax({
      url:'/activity_report/csv_activity_date_wise_report/'+obj.start_date+'/'+obj.end_date+'/'+obj.activity_type,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('csv_activity_date_wise_report_changed', data.url)
          }else if(data.status == 'e'){
            
          }
        },
        error: function(data){
          //showToast("", data)
        }
      })
  })

  self.on('read_activity_session_wise_report', function(activity_type,session_id) {
    console.log('i am in read_categories api call from ajax')
    let req = {}
    req.activity_type=activity_type
    req.session_id=session_id
    $.ajax({
      url:'/activity_report/read_activity_session_wise_report/'+activity_type+'/'+session_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.activity_session_wise_report = data.activity_session_wise_report
            self.trigger('read_activity_session_wise_report_changed', self.activity_session_wise_report)
          }else if(data.status == 'e'){
            showToast("Data Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('csv_activity_session_wise_report', function(activity_type,session_id) {
    console.log('i am in read_categories api call from ajax')
    let req = {}
    req.activity_type=activity_type
    req.session_id=session_id
    $.ajax({
      url:'/activity_report/csv_activity_session_wise_report/'+activity_type+'/'+session_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('csv_activity_session_wise_report_changed', data.url)
          }else if(data.status == 'e'){
           
          }
        },
        error: function(data){
          
        }
      })
  })

  self.on('read_activity_event_wise_report', function(activity_type,event_id) {
    console.log('i am in read_categories api call from ajax')
    let req = {}
    req.activity_type=activity_type
    req.event_id=event_id
    $.ajax({
      url:'/activity_report/read_activity_event_wise_report/'+activity_type+'/'+event_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.activity_event_wise_report = data.activity_event_wise_report
            self.trigger('read_activity_event_wise_report_changed', self.activity_event_wise_report)
          }else if(data.status == 'e'){
            showToast("Data Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('csv_activity_event_wise_report', function(activity_type,event_id) {
    console.log('i am in read_categories api call from ajax')
    let req = {}
    req.activity_type=activity_type
    req.event_id=event_id
    $.ajax({
      url:'/activity_report/csv_activity_event_wise_report/'+activity_type+'/'+event_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('csv_activity_event_wise_report_changed', data.url)
          }else if(data.status == 'e'){

          }
        },
        error: function(data){

        }
      })
  })

  self.on('read_activity_event_wise_graph_report', function(activity_type,session_id) {
    console.log('i am in read_categories api call from ajax')
    let req = {}
    req.activity_type=activity_type
    req.session_id=session_id
    $.ajax({
      url:'/activity_report/read_activity_event_wise_graph_report/'+activity_type+'/'+session_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('read_activity_event_wise_graph_report_changed', data.activity_event_wise_graph_report,data.grand_total)
          }else if(data.status == 'e'){
            showToast("Data Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('csv_activity_event_wise_graph_report', function(activity_type,session_id) {
    let req = {}
    req.activity_type=activity_type
    req.session_id=session_id
    $.ajax({
      url:'/activity_report/csv_activity_event_wise_graph_report/'+activity_type+'/'+session_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('csv_activity_event_wise_graph_report_changed', data.url)
          }else if(data.status == 'e'){

          }
        },
        error: function(data){

        }
      })
  })

  self.on('read_student_event_report', function(obj) {
    console.log('i am in read_categories api call from ajax')
    let req = {}
    req.start_date=obj.start_date
    req.end_date=obj.end_date
    $.ajax({
      url:'/activity_report/read_student_event_report/'+obj.start_date+'/'+obj.end_date,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.student_event_report = data.student_event_report
            self.trigger('read_student_event_report_changed', self.student_event_report)
          }else if(data.status == 'e'){
            showToast("Data Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('csv_student_event_report', function(obj) {
    let req = {}
    req.start_date=obj.start_date
    req.end_date=obj.end_date
    $.ajax({
      url:'/activity_report/csv_student_event_report/'+obj.start_date+'/'+obj.end_date,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('csv_student_event_report_changed', data.url)
          }else if(data.status == 'e'){

          }
        },
        error: function(data){

        }
      })
  })

  


  self.on('read_session', function() {
    console.log('i am in read_session api call from ajax')
    let req = {}
    $.ajax({
      url:'/activity_report/read_session/',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.sessions = data.sessions
            self.trigger('read_session_changed', data.sessions)
          }else if(data.status == 'e'){
            showToast("Session Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('read_event', function() {
    console.log('i am in read_session api call from ajax')
    let req = {}
    $.ajax({
      url:'/activity_report/read_event/',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.events = data.events
            self.trigger('read_event_changed', data.events)
          }else if(data.status == 'e'){
            showToast("Event Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

}
