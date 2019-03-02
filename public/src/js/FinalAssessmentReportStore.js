function FinalAssessmentReportStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.on('read_standard', function() {
    let req = {}
    $.ajax({
      url:'/final_assessment_report/read_standard/',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('read_standard_changed', data.standards, data.sections, data.end_date, data.end_date_final)
          }else if(data.status == 'e'){
            showToast("Standard and Sections Read Error. Please try again.", data)
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
      url:'/final_assessment_report/read_section/',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.sections = data.sections
            self.trigger('read_section_changed', data.sections)
          }else if(data.status == 'e'){
            showToast("Section Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('read_student', function(standard_id,section_id) {
    let req = {}
    req.standard_id=standard_id
    req.section_id=section_id
    $.ajax({
      url:'/final_assessment_report/read_student/'+standard_id+'/'+section_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.students = data.students
            self.trigger('read_student_changed', data.students)
          }else if(data.status == 'e'){
            showToast("Student Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('read_final_assessment_report_card_one_to_four', function(obj) {
    console.log('i am in read_categories api call from ajax')
    $.ajax({
      url:'/final_assessment_report/read_final_assessment_report_card_one_to_four',
        contentType: "application/json",
        type:"POST",
        dataType:"json",
        data: JSON.stringify(obj),
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            
            self.trigger('read_final_assessment_report_card_one_to_four_changed',data.marks)
          }else if(data.status == 'e'){
            showToast("Data Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
  
  self.on('read_final_assessment_report_card_five_to_eight', function(obj) {
    console.log('i am in read_categories api call from ajax')
    $.ajax({
      url:'/final_assessment_report/read_final_assessment_report_card_five_to_eight',
        contentType: "application/json",
        type:"POST",
        dataType:"json",
        data: JSON.stringify(obj),
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            
            self.trigger('read_final_assessment_report_card_five_to_eight_changed',data.marks)
          }else if(data.status == 'e'){
            showToast("Data Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })


  self.on('read_final_assessment_report_card_nine', function(obj) {
    $.ajax({
      url:'/final_assessment_report/read_final_assessment_report_card_nine',
        contentType: "application/json",
        type:"POST",
        dataType:"json",
        data: JSON.stringify(obj),
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            
            self.trigger('read_final_assessment_report_card_nine_changed',data.marks)
          }else if(data.status == 'e'){
            showToast("Data Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('read_final_assessment_report_card_eleven', function(obj) {
    $.ajax({
      url:'/final_assessment_report/read_final_assessment_report_card_eleven',
        contentType: "application/json",
        type:"POST",
        dataType:"json",
        data: JSON.stringify(obj),
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            
            self.trigger('read_final_assessment_report_card_eleven_changed',data.marks)
          }else if(data.status == 'e'){
            showToast("Data Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

}