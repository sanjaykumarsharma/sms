function CourseStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.courses = []

  self.on('read_courses', function() {
    console.log('i am in read_courses api call from ajax')
    let req = {}
    $.ajax({
      url:'/courses',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.courses = data.courses
            self.trigger('courses_changed', data.courses)
          }else if(data.status == 'e'){
            showToast("Course Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('delete_course', function(id) {
    $.ajax({
      url:'/courses/delete/'+id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            let tempCourses = self.courses.filter(c => {
              return c.id != id
            })
            self.courses = tempCourses
            toastr.info("Course Deleted Successfully")
            self.trigger('courses_changed', self.courses)
          }else if(data.status == 'e'){
            showToast("Error Deleting Course. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('edit_course', function(course,course_full_name,id) {
    let req = {}
    req.course=course
    req.course_full_name=course_full_name
    req.id=id
    $.ajax({
      url:'/courses/edit/'+id,
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            self.courses = self.courses.map(cat => {
              if(cat.id == id){
                cat.id = id
                cat.course=course
                cat.course_full_name=course_full_name
              }
              // cat.confirmEdit = false
              return cat
            })
            toastr.success("Course Updated Successfully ")
            self.trigger('courses_changed', self.courses)
          }else if(data.status == 'e'){
            showToast("Error updating Course. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
 
  self.on('add_course', function(course,full_name) {
    let req = {}
    req.course=course
    req.full_name=full_name
    $.ajax({
      url:'/courses/add',
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            console.log('add course after')
            let obj = {}
            obj.id = data.id
            obj.course = course
            obj.course_full_name = full_name
            self.courses = [obj, ...self.courses]
            toastr.success("Course Inserserted Successfully ")
            self.trigger('courses_changed', self.courses)
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
