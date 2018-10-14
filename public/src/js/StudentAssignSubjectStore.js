function StudentAssignSubjectStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.studentGroups = []


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


  /*******************************************************************subjects start*****************************************************************/

 self.on('read_subjects', function(standard_id) {
    let req = {}
    $.ajax({
      url:'/student-assign-subject/subjects/'+standard_id+'/',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('read_subjects_changed', data.freeSubjects, data.assignedSubjects)
          }else if(data.status == 'e'){
            showToast("AssignSubject Read Error. Please try again.", data.messaage)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('assign_subjects', function(standard_id,subjects) {
    var obj = {}
    obj['standard_id'] = standard_id
    obj['subjects'] = subjects
    $.ajax({
      url:'/student-assign-subject/assign-subjects/',
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
            showToast("Error assigning subjects. Please try again.", data.messaage)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('free_up_subject', function(standard_id,subjects) {
    var obj = {}
    obj['standard_id'] = standard_id
    obj['subjects'] = subjects
    $.ajax({
      url:'/student-assign-subject/free-up-subject/',
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
            showToast("Error while free up subjects. Please try again.", data.messaage)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
  

}
