function ExamSubjectGroupMapStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.subjectGroupMaps = []

  self.on('read_subject_groups', function() {
    let req = {}
    $.ajax({
      url:'/exam-subject-group-map',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.subjectGroupMaps = data.subjectGroupMaps
            self.trigger('subject_group_changed', data.subjectGroupMaps)
          }else if(data.status == 'e'){
            showToast("Exam Scheme Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('add_subject_group', function(subject_group) {
    let req = {}
    req.subject_group=subject_group
    $.ajax({
      url:'/exam-subject-group-map/add',
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            let obj = {}
            obj.id = data.id
            obj.subject_group = subject_group
            self.subjectGroupMaps = [obj, ...self.subjectGroupMaps]
            toastr.success("Exam Scheme Created Successfully ")
            self.trigger('add_subject_group_changed', self.subjectGroupMaps)
          }else if(data.status == 'e'){
            showToast("Error adding Item. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })


  self.on('update_subject_group', function(subject_group,id) {
    let req = {}
    req.subject_group=subject_group
    req.id=id
    $.ajax({
      url:'/exam-subject-group-map/edit/'+id,
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            self.subjectGroupMaps = self.subjectGroupMaps.map(cat => {
              if(cat.id == id){
                cat.id = id
                cat.subject_group=subject_group
              }
              cat.confirmEdit = false
              return cat
            })
            toastr.success("Exam Scheme Updated Successfully ")
            self.trigger('add_subject_group_changed', self.subjectGroupMaps) // same trigger, as Add Exam Scheme
          }else if(data.status == 'e'){
            showToast("Error updating Exam Scheme. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('delete_subject_group', function(id) {
    $.ajax({
      url:'/exam-subject-group-map/delete/'+id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            let tempExamScheme = self.subjectGroupMaps.filter(c => {
              return c.id != id
            })
            self.subjectGroupMaps = tempExamScheme
            toastr.info("Exam Scheme Deleted Successfully")
            self.trigger('delete_subject_group_changed', self.subjectGroupMaps)
          }else if(data.status == 'e'){
            showToast("Error Deleting Exam Scheme. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })


  /*******************************************************************subjects start*****************************************************************/
  self.on('read_subjects', function(id) {
    let req = {}
    $.ajax({
      url:'/exam-subject-group-map/subjects/'+id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('read_subjects_changed', data.freeSubjects, data.assignedSubjects)
          }else if(data.status == 'e'){
            showToast("Exam Scheme Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('assign_subjects', function(id,subjects) {
    var obj = {}
    obj['id'] = id
    obj['subjects'] = subjects
    $.ajax({
      url:'/exam-subject-group-map/assign-subjects/',
        type:"POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            toastr.success("Subjects assigned successfully ")
            self.trigger('assign_subjects_changed', subjects) 
          }else if(data.status == 'e'){
            showToast("Error assigning subjects. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('free_up_subject', function(id,subjects) {
    var obj = {}
    obj['id'] = id
    obj['subjects'] = subjects
    $.ajax({
      url:'/exam-subject-group-map/free-up-subject/',
        type:"POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            
            toastr.success("Subjects freed successfully ")
            self.trigger('assign_subjects_changed', subjects) 
          }else if(data.status == 'e'){
            showToast("Error while free up subjects. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

}
