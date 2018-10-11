function MarksManagerStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.marksSettings = []

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
      url:'/marks-manager/exam-type/'+standard_id,
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
      url:'/marks-manager/subjects/'+standard_id+'/'+section_id,
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

  self.on('read_marks_settings', function(section_id,exam_type_id) {
    $.ajax({
      url:'/marks-manager/marks-settings/'+section_id+'/'+exam_type_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.marksSettings=data.marksSettings
            self.trigger('marks_settings_changed', data.marksSettings)
          }else if(data.status == 'e'){
            showToast("Marks Settings Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  

  self.on('add_marks_settings', function(obj) {
    $.ajax({
      url:'/marks-manager/add',
        type:"POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            toastr.success("Marks Settings Created Successfully ")
            self.trigger('add_marks_settings_changed')
          }else if(data.status == 'e'){
            showToast("Error adding Marks Settings. Please try again.", data.messaage)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })


  self.on('update_grade_settings', function(obj,marks_id) {
    $.ajax({
      url:'/marks-manager/edit/'+marks_id,
        type:"POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            toastr.success("Marks Settings Updated Successfully ")
            self.trigger('add_marks_settings_changed') // same trigger, as Add Exam Scheme
          }else if(data.status == 'e'){
            showToast("Error updating Marks Settings. Please try again.", data.messaage)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('delete_marks_settings', function(marks_id) {
    $.ajax({
      url:'/marks-manager/delete/'+marks_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            let tempExamScheme = self.marksSettings.filter(c => {
              return c.marks_id != marks_id
            })
            self.marksSettings = tempExamScheme
            toastr.info("Marks Manager Deleted Successfully")
            self.trigger('delete_marks_settings_changed', self.marksSettings)
          }else if(data.status == 'e'){
            showToast("Error Deleting Marks Manager. Please try again.", data.messaage)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

}
