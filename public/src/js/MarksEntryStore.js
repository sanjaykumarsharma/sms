function MarksEntryStore() {
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
      url:'/marks-entry/exam-type/'+standard_id,
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

  self.on('read_marks_limit', function(section_id,subject_id,exam_type_id) {
    $.ajax({
      url:'/marks-entry/marks-limit/'+section_id+'/'+subject_id+'/'+exam_type_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('marks_limit_changed', data.marksLimit)
          }else if(data.status == 'e'){
            showToast("Marks Limit Read Error. Please try again.", data.messaage)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('read_marks_entries', function(exam_type_id,section_id,subject_id,marking_type) {
    $.ajax({
      url:'/marks-entry/marks-entries/'+exam_type_id+'/'+section_id+'/'+subject_id+'/'+marking_type,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('marks_entries_changed', data.marksEntries, data.students)
          }else if(data.status == 'e'){
            showToast("Marks Entries Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('add_marks_entries', function(obj) {
    $.ajax({
      url:'/marks-entry/add',
        type:"POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            // toastr.success("Marks Entries Successfull")
            self.trigger('add_marks_entries_changed')
          }else if(data.status == 'e'){
            showToast("Error adding Marks Entries. Please try again.", data.messaage)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('update_marks_entries', function(obj,id) {
    $.ajax({
      url:'/marks-entry/edit/'+id,
        type:"POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            toastr.success("Marks Entries Updated Successfully ")
            self.trigger('add_marks_entries_changed') // same trigger, as Add Exam Scheme
          }else if(data.status == 'e'){
            showToast("Error updating Marks Entries. Please try again.", data.messaage)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('delete_marks_entries', function(id) {
    $.ajax({
      url:'/marks-entry/delete/'+id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            toastr.info("Marks Entry Deleted Successfully")
            self.trigger('delete_marks_entries_changed')
          }else if(data.status == 'e'){
            showToast("Error Deleting Marks Entry. Please try again.", data.messaage)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

}
