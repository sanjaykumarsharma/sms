function DisciplineReportStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

   self.on('csv_discipline_case_wise_report', function(obj) {
    let req = {}
    req.start_date=obj.start_date
    req.end_date=obj.end_date
    $.ajax({
      url:'/discipline_report/csv_discipline_case_wise_report/'+obj.start_date+'/'+obj.end_date,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('csv_discipline_case_wise_report_changed', data.url)
          }else if(data.status == 'e'){
            
          }
        },
        error: function(data){
          //showToast("", data)
        }
      })
  })

  self.on('read_case_wise_report', function(obj) {
    console.log('i am in read_categories api call from ajax')
    let req = {}
    req.start_date=obj.start_date
    req.end_date=obj.end_date
    $.ajax({
      url:'/discipline_report/'+obj.start_date+'/'+obj.end_date,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.case_wise_reports = data.case_wise_reports
            self.trigger('read_case_wise_report_changed', data.case_wise_reports,data.grand_total)
          }else if(data.status == 'e'){
            showToast("Categories Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('csv_export_read_date_wise_case_report', function(obj) {
    console.log('i am in read_categories api call from ajax')
    let req = {}
    req.data=obj
    $.ajax({
      url:'/discipline_report/csv_export_read_date_wise_case_report/csv_export',
        contentType: "application/json",
        dataType:"json",
        type:'POST',
        data: JSON.stringify(req),
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('csv_export_read_date_wise_case_report_changed', data.url)
          }else if(data.status == 'e'){
            
          }
        },
        error: function(data){
          //showToast("", data)
        }
      })
  })

  self.on('read_date_wise_case_report', function(obj,category_id) {
    console.log('i am in read_categories api call from ajax')
    let req = {}
    req.start_date=obj.start_date
    req.end_date=obj.end_date
    req.category_id=category_id
    $.ajax({
      url:'/discipline_report/read_date_wise_case_report/'+obj.start_date+'/'+obj.end_date+'/'+category_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.date_wise_case_report = data.date_wise_case_report
            self.trigger('read_date_wise_case_report_changed', data.date_wise_case_report,getCookie('session_name'))
          }else if(data.status == 'e'){
            showToast("Categories Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('read_standard', function() {
    console.log('i am in read_categories api call from ajax')
    let req = {}
    $.ajax({
      url:'/discipline_report/read_standard/',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.standards = data.standards
            self.trigger('read_standard_changed', data.standards)
          }else if(data.status == 'e'){
            showToast("Categories Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('read_section', function() {
    console.log('i am in read_categories api call from ajax')
    let req = {}
    $.ajax({
      url:'/discipline_report/read_section/',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.sections = data.sections
            self.trigger('read_section_changed', data.sections)
          }else if(data.status == 'e'){
            showToast("Categories Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('read_session', function() {
    console.log('i am in read_session api call from ajax')
    let req = {}
    $.ajax({
      url:'/discipline_report/read_session/',
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


  self.on('csv_export_read_class_wise_report', function(obj) {
    let req = {}
    req.data=obj
    $.ajax({
      url:'/discipline_report/csv_export_read_class_wise_report/',
        contentType: "application/json",
        dataType:"json",
        type:'POST',
        data: JSON.stringify(req),
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('csv_export_read_class_wise_report_changed', data.url)
          }else if(data.status == 'e'){
            
          }
        },
        error: function(data){
          //showToast("", data)
        }
      })
  })

  self.on('csv_export_read_date_wise_case_report', function(obj) {
    console.log('i am in read_categories api call from ajax')
    let req = {}
    req.data=obj
    $.ajax({
      url:'/discipline_report/csv_export_read_date_wise_case_report/csv_export',
        contentType: "application/json",
        dataType:"json",
        type:'POST',
        data: JSON.stringify(req),
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('csv_export_read_date_wise_case_report_changed', data.url)
          }else if(data.status == 'e'){
            
          }
        },
        error: function(data){
          //showToast("", data)
        }
      })
  })


  self.on('read_class_wise_report', function(standard_id,section_id,session_id) {
    console.log('i am in read_categories api call from ajax')
    let req = {}
    req.standard_id=standard_id
    req.section_id=section_id
    req.session_id=session_id
    $.ajax({
      url:'/discipline_report/read_class_wise_report/'+standard_id+'/'+section_id+'/'+session_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.class_wise_case_report = data.class_wise_case_report
            self.trigger('read_class_wise_report_changed', data.class_wise_case_report,data.grand_total)
          }else if(data.status == 'e'){
            showToast("Categories Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })





}
