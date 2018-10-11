function StudentGroupStudentStore() {
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
            showToast("House Read Error. Please try again.", data.messaage)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('add_house', function(house) {
    let req = {}
    req.house=house
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
            obj.id = data.id
            obj.house = house
            self.studentGroups = [obj, ...self.studentGroups]
            toastr.success("House Created Successfully ")
            self.trigger('add_house_changed', self.studentGroups)
          }else if(data.status == 'e'){
            showToast("Error adding Item. Please try again.", data.messaage)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })


  self.on('update_house', function(house,id) {
    let req = {}
    req.house=house
    req.id=id
    $.ajax({
      url:'/student-group-student/edit/'+id,
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            self.studentGroups = self.studentGroups.map(cat => {
              if(cat.group_id == id){
                cat.group_id = id
                cat.house_name=house
              }
              cat.confirmEdit = false
              return cat
            })
            toastr.success("House Updated Successfully ")
            self.trigger('add_house_changed', self.studentGroups) // same trigger, as Add House
          }else if(data.status == 'e'){
            showToast("Error updating House. Please try again.", data.messaage)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('delete_house', function(id) {
    $.ajax({
      url:'/student-group-student/delete/'+id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            let tempExamScheme = self.studentGroups.filter(c => {
              return c.group_id != id
            })
            self.studentGroups = tempExamScheme
            toastr.info("House Deleted Successfully")
            self.trigger('delete_house_changed', self.studentGroups)
          }else if(data.status == 'e'){
            showToast("Error Deleting House. Please try again.", data.messaage)
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
            showToast("House Read Error. Please try again.", data.messaage)
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


  self.on('read_student_by_house', function(group_id,) {
    let req = {}
    $.ajax({
      url:'/student-group-student/students_by_house/'+group_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('read_student_by_house_changed', data.students)
          }else if(data.status == 'e'){
            showToast("Students Read Error. Please try again.", data.messaage)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })



  self.on('update_house_captain', function(group_id,captain_id,vice_captain_id) {
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
            toastr.success("House Captain Updated Successfully ")
            self.trigger('update_house_captain_changed')
          }else if(data.status == 'e'){
            showToast("Error updating house captain. Please try again.", data.messaage)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })


  self.on('read_student_by_house_details', function(group_id,) {
    let req = {}
    $.ajax({
      url:'/student-group-student/students_by_house_details/'+group_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('read_student_by_house_details_changed', data.students)
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
