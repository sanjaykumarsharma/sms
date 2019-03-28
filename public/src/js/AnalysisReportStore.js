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
  self.on('read_subjects', function(standard_id) {
    let req = {}
    $.ajax({
      url:'/yearly_section_wise_comparison_report/read_subjects/'+standard_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('read_subjects_changed', data.subjects)
          }else if(data.status == 'e'){
            showToast("Standard Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
  self.on('read_subjects_for_yearly_class_wise_comparison_report', function() {
    let req = {}
    $.ajax({
      url:'/yearly_class_wise_comparison_report/read_subjects_for_yearly_class_wise_comparison_report/',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('read_subjects_for_yearly_class_wise_comparison_report_changed', data.subjects)
          }else if(data.status == 'e'){
            showToast("Standard Read Error. Please try again.", data)
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
      url:'/student/read_section/',
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
  self.on('read_subjects', function(standard_id,section_id) {
    $.ajax({
      url:'/marks-entry/subjects/'+standard_id+'/'+section_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('subjects_changed', data.subjects)
          }else if(data.status == 'e'){
            showToast("Subjects Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('read_assessment_report', function(obj) {
    $.ajax({
      url:'/assessment_report/read_assessment_report',
        type:"POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('read_assessment_report_changed',data.sections,data.subjects,data.graphData)
          }else if(data.status == 'e'){
            showToast("Error Read Assessment Report. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('read_year_wise_class_subject_avg_report', function(standard_id,term_id) {
    $.ajax({
      url:'/yearly_class_wise_subject_avg_report/read_year_wise_class_subject_avg_report/'+standard_id+'/'+term_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('read_year_wise_class_subject_avg_report_changed',data.sessions,data.subjects,data.graphData)
          }else if(data.status == 'e'){
            showToast("Student Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('read_yearly_section_wise_comparison_report', function(obj) {
    $.ajax({
      url:'/yearly_section_wise_comparison_report/read_yearly_section_wise_comparison_report',
        type:"POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('read_yearly_section_wise_comparison_report_changed',data.sections,data.sessions,data.graphData)
          }else if(data.status == 'e'){
            showToast("Error Read Assessment Report. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('read_yearly_class_wise_comparison_report', function(obj) {
    $.ajax({
      url:'/yearly_class_wise_comparison_report/read_yearly_class_wise_comparison_report',
        type:"POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('read_yearly_class_wise_comparison_report_changed',data.sections,data.sessions,data.graphData)
          }else if(data.status == 'e'){
            showToast("Error Read Assessment Report. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('read_consolidate_tabulation_sheet_report', function(obj) {
    $.ajax({
      url:'/consolidate_tabulation_sheet_report/read_consolidate_tabulation_sheet_report',
        type:"POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('read_consolidate_tabulation_sheet_report_changed',data.headers, data.reports, data.class_teacher)
          }else if(data.status == 'e'){
            showToast("Error Read Assessment Report. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
  self.on('read_subject_wise_failure_report', function(obj) {
    $.ajax({
      url:'/subject_wise_failure_report/read_subject_wise_failure_report',
        type:"POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('read_subject_wise_failure_report_changed',data.report_data)
          }else if(data.status == 'e'){
            showToast("Error Read Assessment Report. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
  self.on('read_student_wise_subject_failure_report', function(obj) {
    $.ajax({
      url:'/student_wise_subject_failure_report/read_student_wise_subject_failure_report',
        type:"POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('read_student_wise_subject_failure_report_changed',data.subject_marks)
          }else if(data.status == 'e'){
            showToast("Error Read Assessment Report. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })


  /*promotion Sheet*/

  // self.on('read_exam_types_promotion_sheet', function(standard_id) {
  //   $.ajax({
  //     url:'/assessment_report/exam-type/'+standard_id,
  //       contentType: "application/json",
  //       dataType:"json",
  //       headers: {"Authorization": getCookie('token')},
  //       success: function(data){
  //         console.log(data)
  //         if(data.status == 's'){
  //           self.trigger('exam_types_promotion_changed', data.examTypes)
  //         }else if(data.status == 'e'){
  //           showToast("Exam Type Read Error. Please try again.", data)
  //         }
  //       },
  //       error: function(data){
  //         showToast("", data)
  //       }
  //     })
  // })

  self.on('read_promotion_sheet_report', function(obj) {
    $.ajax({
      url:'/promotion-sheet-report/read-promotion-sheet-report',
        type:"POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('read_promotion_sheet_report_changed',data.subjects, data.students, data.marks, data.marks1)
          }else if(data.status == 'e'){
            showToast("Error Read Assessment Report. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

}
