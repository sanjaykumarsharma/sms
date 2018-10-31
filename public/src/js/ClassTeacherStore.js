function ClassTeacherStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.classTeachers = []

  self.on('read_class_teacher', function() {
    console.log('i am in Class teacher api call from ajax')
    let req = {}
    $.ajax({
      url:'/class_teacher/read_class_teacher',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.classTeachers = data.classTeachers
            self.trigger('read_class_teacher_changed', data.classTeachers)
          }else if(data.status == 'e'){
            showToast(" Class Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.employees = []

  self.on('read_teaching_staff', function() {
    console.log('i am in teaching Staff api call from ajax')
    let req = {}
    $.ajax({
      url:'/class_teacher/read_teaching_staff',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.employees = data.employees
            self.trigger('read_teaching_staff_changed', self.employees)
          }else if(data.status == 'e'){
            showToast(" Class Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('delete_class_teacher', function(id) {
    $.ajax({
      url:'/class_teacher/delete/'+id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            let tempClassTeachers = self.classTeachers.filter(c => {
              return c.ts_id != id
            })
            self.classTeachers = tempClassTeachers
            toastr.info("Class teacher Deleted Successfully")
            self.trigger('delete_class_teacher_changed', self.classTeachers)
          }else if(data.status == 'e'){
            showToast("Error Deleting Class Teacher. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('edit_class_teacher', function(standard_id,section_id, class_teacher,asst_class_teacher, room_no,id) {
    let req = {}
    req.standard_id=standard_id
    req.section_id=section_id
    req.class_teacher=class_teacher
    req.asst_class_teacher=asst_class_teacher
    req.room_no=room_no
    req.id=id
    $.ajax({
      url:'/class_teacher/edit/'+id,
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            self.classTeachers = self.classTeachers.map(cat => {
              if(cat.ts_id == id){
                cat.ts_id =id
                cat.standard_id=standard_id
                cat.section_id=section_id
                cat.class_teacher=class_teacher
                cat.asst_class_teacher=asst_class_teacher
                cat.room_no=room_no
              }
              // cat.confirmEdit = false
              return cat
            })
            toastr.success("Class Teacher Updated Successfully ")
            self.trigger('edit_class_teacher_changed', self.classTeachers)
          }else if(data.status == 'e'){
            showToast("Error updating classTeachers. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
 
  self.on('add_class_teacher', function(standard_id,section_id, class_teacher,asst_class_teacher, room_no) {
    let req = {}
    req.standard_id=standard_id
    req.section_id=section_id
    req.class_teacher=class_teacher
    req.asst_class_teacher=asst_class_teacher
    req.room_no=room_no
    $.ajax({
      url:'/class_teacher/add',
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            console.log('add subject after')
            let obj = {}
                obj.ts_id = data.id
                obj.standard_id=standard_id
                obj.section_id=section_id
                obj.class_teacher=class_teacher
                obj.asst_class_teacher=asst_class_teacher
                obj.room_no=room_no
            self.classTeachers = [obj, ...self.classTeachers]
            toastr.success("Class teacher Inserserted Successfully ")
            self.trigger('add_class_teacher_changed', self.classTeachers)
          }else if(data.status == 'e'){
            showToast("Invalid Username or password. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

}
