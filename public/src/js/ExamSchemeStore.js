function ExamSchemeStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.examSchemes = []

   self.on('read_exam_csv', function(obj) {
    let req = {}
    req.data=obj
    $.ajax({
      url:'/exam-scheme/read_exam_csv',
        contentType: "application/json",
        dataType:"json",
        type:'POST',
        data: JSON.stringify(req),
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('read_exam_csv_changed', data.url)
          }else if(data.status == 'e'){
            
          }
        },
        error: function(data){
          
        }
      })
  })

  self.on('read_exam_schemes', function() {
    let req = {}
    $.ajax({
      url:'/exam-scheme',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.examSchemes = data.examSchemes
            self.trigger('exam_scheme_changed', data.examSchemes)
          }else if(data.status == 'e'){
            showToast("Exam Scheme Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('add_exam_scheme', function(scheme_name) {
    let req = {}
    req.scheme_name=scheme_name
    $.ajax({
      url:'/exam-scheme/add',
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            let obj = {}
            obj.scheme_id = data.scheme_id
            obj.scheme_name = scheme_name
            self.examSchemes = [obj, ...self.examSchemes]
            toastr.success("Exam Scheme Created Successfully ")
            self.trigger('add_exam_scheme_changed', self.examSchemes)
          }else if(data.status == 'e'){
            showToast("Error adding Item. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })


  self.on('update_exam_scheme', function(scheme_name,scheme_id) {
    let req = {}
    req.scheme_name=scheme_name
    req.scheme_id=scheme_id
    $.ajax({
      url:'/exam-scheme/edit/'+scheme_id,
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            self.examSchemes = self.examSchemes.map(cat => {
              if(cat.scheme_id == scheme_id){
                cat.scheme_id = scheme_id
                cat.scheme_name=scheme_name
              }
              cat.confirmEdit = false
              return cat
            })
            toastr.success("Exam Scheme Updated Successfully ")
            self.trigger('add_exam_scheme_changed', self.examSchemes) // same trigger, as Add Exam Scheme
          }else if(data.status == 'e'){
            showToast("Error updating Exam Scheme. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('delete_exam_scheme', function(scheme_id) {
    $.ajax({
      url:'/exam-scheme/delete/'+scheme_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            let tempExamScheme = self.examSchemes.filter(c => {
              return c.scheme_id != scheme_id
            })
            self.examSchemes = tempExamScheme
            toastr.info("Exam Scheme Deleted Successfully")
            self.trigger('delete_exam_scheme_changed', self.examSchemes)
          }else if(data.status == 'e'){
            showToast("Error Deleting Exam Scheme. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })


  /*******************************************************************exams start*****************************************************************/
  self.exams = []
  self.on('read_exams', function(scheme_id) {
    let req = {}
    $.ajax({
      url:'/exam-scheme/exams/'+scheme_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.exams = data.exams
            self.trigger('read_exams_changed', data.exams)
          }else if(data.status == 'e'){
            showToast("Exams Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('add_exam', function(obj) {
    $.ajax({
      url:'/exam-scheme/add-exam',
        type:"POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            let ob = {}
            ob.exam_type_id = data.exam_type_id
            ob.exam_type = obj.exam_type
            ob.start_date = obj.start_date
            ob.end_date = obj.end_date
            ob.last_login_date = obj.last_login_date
            ob.assessment = obj.assessment
            ob.exam_group = obj.exam_group
            self.exams = [ob, ...self.exams]
            toastr.success("Exam Created Successfully ")
            self.trigger('add_exam_changed', self.exams)
          }else if(data.status == 'e'){
            showToast("Error adding . Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('delete_exam', function(exam_type_id) {
    $.ajax({
      url:'/exam-scheme/delete-exam/'+exam_type_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            let tempExams = self.exams.filter(c => {
              return c.exam_type_id != exam_type_id
            })
            self.exams = tempExams
            toastr.info("Exam Deleted Successfully")
            self.trigger('delete_exam_changed', self.exams)
          }else if(data.status == 'e'){
            showToast("Error Deleting Exam. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('update_exam', function(obj,exam_type_id) {
    $.ajax({
      url:'/exam-scheme/edit-exam/'+exam_type_id,
        type:"POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            self.exams = self.exams.map(ob => {
              if(ob.exam_type_id == exam_type_id){
                ob.exam_type_id = exam_type_id
                ob.exam_type = obj.exam_type
                ob.start_date = obj.start_date
                ob.end_date = obj.end_date
                ob.last_login_date = obj.last_login_date
                ob.assessment = obj.assessment
                ob.exam_group = obj.exam_group
              }
              ob.confirmEdit = false
              return ob
            })
            toastr.success("Exam Updated Successfully ")
            self.trigger('add_exam_changed', self.exams) // same trigger, as Add Exam
          }else if(data.status == 'e'){
            showToast("Error updating Exam. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
  
  /*******************************************************************classes start*****************************************************************/
  self.on('read_classes', function(scheme_id) {
    let req = {}
    $.ajax({
      url:'/exam-scheme/classes/'+scheme_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('read_classes_changed', data.freeClasses, data.assignedClasses)
          }else if(data.status == 'e'){
            showToast("Exam Scheme Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('assign_standard', function(scheme_id,standards) {
    var obj = {}
    obj['scheme_id'] = scheme_id
    obj['standards'] = standards
    $.ajax({
      url:'/exam-scheme/assign-standard/',
        type:"POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            toastr.success("Classes assigned successfully ")
            self.trigger('assign_standard_changed', standards) 
          }else if(data.status == 'e'){
            showToast("Error assigning classes. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('free_up_standard', function(scheme_id,standards) {
    var obj = {}
    obj['scheme_id'] = scheme_id
    obj['standards'] = standards
    $.ajax({
      url:'/exam-scheme/free-up-standard/',
        type:"POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            
            toastr.success("Classes freed successfully ")
            self.trigger('assign_standard_changed', standards) 
          }else if(data.status == 'e'){
            showToast("Error while free up classes. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

}
