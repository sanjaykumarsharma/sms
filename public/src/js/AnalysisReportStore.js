function AnalysisReportStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.on('read_standard', function() {
    let req = {}
    $.ajax({
      url:'/student/read_standard/',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.standards = data.standards
            self.trigger('read_standard_changed', data.standards)
          }else if(data.status == 'e'){
            showToast("Standard Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('read_exam_types', function(standard_id) {
    $.ajax({
      url:'/assessment_report/exam-type/'+standard_id,
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

}
