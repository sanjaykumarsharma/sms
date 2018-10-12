function StudentStudentGroupStore() {
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

  self.on('read_student_groups', function(standard_id,section_id) {
    let req = {}
    $.ajax({
      url:'/student-group-student/'+standard_id+'/'+section_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.studentGroups = data.studentGroups
            self.trigger('read_student_groups_changed', data.studentGroups)
          }else if(data.status == 'e'){
            showToast("StudentGroup Read Error. Please try again.", data.messaage)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('add_student_group', function(req) {
    $.ajax({
      url:'/student-group-student/add',
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            let obj = {}
            obj.group_id = data.group_id
            obj.group_name = req.group_name
            obj.group_detail = req.group_detail
            self.studentGroups = [obj, ...self.studentGroups]
            toastr.success("Student Group Created Successfully ")
            self.trigger('add_student_group_changed', self.studentGroups)
          }else if(data.status == 'e'){
            showToast("Error adding student group. Please try again.", data.messaage)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })


  self.on('update_student_group', function(req,group_id) {
    $.ajax({
      url:'/student-group-student/edit/'+group_id,
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            self.studentGroups = self.studentGroups.map(cat => {
              if(cat.group_id == group_id){
                cat.group_id = group_id
                cat.group_name=req.group_name
                cat.group_detail = req.group_detail
              }
              cat.confirmEdit = false
              return cat
            })
            toastr.success("Student Group Updated Successfully ")
            self.trigger('add_student_group_changed', self.studentGroups) // same trigger, as Add StudentGroup
          }else if(data.status == 'e'){
            showToast("Error updating StudentGroup. Please try again.", data.messaage)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })


  self.on('delete_student_group', function(group_id) {
    console.log('calling me')
    $.ajax({
      url:'/student-group-student/delete/student-group/'+group_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            let tempStudentGroup = self.studentGroups.filter(c => {
              return c.group_id != group_id
            })
            self.studentGroups = tempStudentGroup
            toastr.info("StudentGroup Deleted Successfully")
            self.trigger('delete_student_group_changed', self.studentGroups)
          }else if(data.status == 'e'){
            showToast("Error Deleting StudentGroup. Please try again.", data.messaage)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
  

  /*******************************************************************students start*****************************************************************/

  self.on('read_students', function(group_id,standard_id,section_id) {
    let req = {}
    $.ajax({
      url:'/student-group-student/students/'+group_id+'/'+standard_id+'/'+section_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('read_students_changed', data.freeStudents, data.assignedStudents)
          }else if(data.status == 'e'){
            showToast("StudentGroup Read Error. Please try again.", data.messaage)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('assign_students', function(group_id,students) {
    var obj = {}
    obj['group_id'] = group_id
    obj['students'] = students
    $.ajax({
      url:'/student-group-student/assign-students/',
        type:"POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            toastr.success("Students assigned successfully ")
            self.trigger('assign_students_changed', students) 
          }else if(data.status == 'e'){
            showToast("Error assigning students. Please try again.", data.messaage)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('free_up_student', function(group_id,students) {
    var obj = {}
    obj['group_id'] = group_id
    obj['students'] = students
    $.ajax({
      url:'/student-group-student/free-up-student/',
        type:"POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            
            toastr.success("Students freed successfully ")
            self.trigger('assign_students_changed', students) 
          }else if(data.status == 'e'){
            showToast("Error while free up students. Please try again.", data.messaage)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })


  
  /*******************************************************************subjects start*****************************************************************/

 self.on('read_subjects', function(group_id,standard_id,section_id) {
    let req = {}
    $.ajax({
      url:'/student-group-student/subjects/'+group_id+'/'+standard_id+'/'+section_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('read_subjects_changed', data.freeSubjects, data.assignedSubjects)
          }else if(data.status == 'e'){
            showToast("StudentGroup Read Error. Please try again.", data.messaage)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('assign_subjects', function(group_id,subjects) {
    var obj = {}
    obj['group_id'] = group_id
    obj['subjects'] = subjects
    $.ajax({
      url:'/student-group-student/assign-subjects/',
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

  self.on('free_up_subject', function(group_id,subjects) {
    var obj = {}
    obj['group_id'] = group_id
    obj['subjects'] = subjects
    $.ajax({
      url:'/student-group-student/free-up-subject/',
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

  self.on('read_student_by_student_group', function(group_id,) {
    let req = {}
    $.ajax({
      url:'/student-group-student/students_by_student_group/'+group_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('read_student_by_student_group_changed', data.students)
          }else if(data.status == 'e'){
            showToast("Students Read Error. Please try again.", data.messaage)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })



  self.on('update_student_group_captain', function(group_id,captain_id,vice_captain_id) {
    let req = {}
    $.ajax({
      url:'/student-group-student/update-captain/'+group_id+'/'+captain_id+'/'+vice_captain_id,
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            toastr.success("StudentGroup Captain Updated Successfully ")
            self.trigger('update_student_group_captain_changed')
          }else if(data.status == 'e'){
            showToast("Error updating house captain. Please try again.", data.messaage)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })


  self.on('read_student_by_student_group_details', function(group_id,) {
    let req = {}
    $.ajax({
      url:'/student-group-student/students_by_student_group_details/'+group_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('read_student_by_student_group_details_changed', data.students)
          }else if(data.status == 'e'){
            showToast("Students Read Error. Please try again.", data.messaage)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })


}
