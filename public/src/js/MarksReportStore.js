function MarksReportStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.marksEntry = []

  self.on('read_classes', function() {
    let req = {}
    $.ajax({
      url:'/standard',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('read_classes_changed', data.standards)
          }else if(data.status == 'e'){
            showToast("standards Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('read_section', function() {
    let req = {}
    $.ajax({
      url:'/section',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('read_section_changed', data.sections)
          }else if(data.status == 'e'){
            showToast("section Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('read_exam_types', function(standard_id) {
    $.ajax({
      url:'/marks-report/exam-type/'+standard_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('exam_types_changed', data.examTypes)
          }else if(data.status == 'e'){
            showToast("Exam Type Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('read_consolidate_tabulation_sheet', function(exam_type_id,section_id) {
    $.ajax({
      url:'/marks-report/marks-entries/'+exam_type_id+'/'+section_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('read_consolidate_tabulation_sheet_changed', data.reports)
          }else if(data.status == 'e'){
            showToast("Marks Entries Read Error. Please try again.", data.message)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('read_merit_list', function(exam_type_id,section_id) {
    $.ajax({
      url:'/marks-report/merit-list/'+exam_type_id+'/'+section_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('read_merit_list_changed', data.reports)
          }else if(data.status == 'e'){
            showToast("Merit List Read Error. Please try again.", data.message)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('read_exam_scheme', function(standard_id,section_id) {
    $.ajax({
      url:'/marks-report/exam-type/'+standard_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('read_exam_scheme_changed', data.examTypes)
          }else if(data.status == 'e'){
            showToast("Exam Scheme Read Error. Please try again.", data.message)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })


  self.on('read_top_five', function(exam_type_id,section_id) {
    $.ajax({
      url:'/marks-report/top-five/'+exam_type_id+'/'+section_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('read_top_five_changed', data.reports)
          }else if(data.status == 'e'){
            showToast("Top Five Read Error. Please try again.", data.message)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

}
