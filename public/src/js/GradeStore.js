function GradeStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.grades = []

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

  self.on('read_exam_types', function(scheme_id) {
    $.ajax({
      url:'/grade/exam-type/'+scheme_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('exam_type_changed', data.examTypes)
          }else if(data.status == 'e'){
            showToast("Exam Type Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('read_grade_csv', function(obj) {
    let req = {}
    req.data=obj
    $.ajax({
      url:'/grade/read_grade_csv/',
        contentType: "application/json",
        dataType:"json",
        type:'POST',
        data: JSON.stringify(req),
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('read_grade_csv_changed', data.url)
          }else if(data.status == 'e'){
            
          }
        },
        error: function(data){
          
        }
      })
  })

  self.on('read_grades', function(scheme_id,exam_type_id) {
    $.ajax({
      url:'/grade/exam-type/'+scheme_id+'/'+exam_type_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.grades=data.grades
            self.trigger('grades_changed', data.grades)
          }else if(data.status == 'e'){
            showToast("Grade Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('add_grade', function(obj) {
    $.ajax({
      url:'/grade/add',
        type:"POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            let ob = {}
            ob.grade_id = data.grade_id
            ob.min_marks = obj.min_marks
            ob.max_marks = obj.max_marks
            ob.grade = obj.grade
            self.grades = [ob, ...self.grades]
            toastr.success("Grade Created Successfully ")
            self.trigger('add_grade_changed', self.grades)
          }else if(data.status == 'e'){
            showToast("Error adding grade. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })


  self.on('update_grade', function(obj,grade_id) {
    $.ajax({
      url:'/grade/edit/'+grade_id,
        type:"POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            self.grades = self.grades.map(cat => {
              if(cat.grade_id == grade_id){
                cat.grade_id = grade_id
                cat.max_marks= obj.max_marks
                cat.min_marks= obj.min_marks
                cat.grade= obj.grade
              }
              cat.confirmEdit = false
              return cat
            })
            toastr.success("Grade Updated Successfully ")
            self.trigger('add_grade_changed', self.grades) // same trigger, as Add Exam Scheme
          }else if(data.status == 'e'){
            showToast("Error updating grade. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('delete_grade', function(grade_id) {
    $.ajax({
      url:'/grade/delete/'+grade_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            let tempExamScheme = self.grades.filter(c => {
              return c.grade_id != grade_id
            })
            self.grades = tempExamScheme
            toastr.info("Grade Deleted Successfully")
            self.trigger('delete_grade_changed', self.grades)
          }else if(data.status == 'e'){
            showToast("Error Deleting Grade. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

}
