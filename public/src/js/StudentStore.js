function StudentStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.on('read_standard', function() {
    let req = {}
    $.ajax({
      url:'/student/read_standard/',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.standards = data.standards
            self.trigger('read_standard_changed', data.standards)
          }else if(data.status == 'e'){
            showToast("Standard Read Error. Please try again.", data)
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
      url:'/student/read_section/',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.sections = data.sections
            self.trigger('read_section_changed', data.sections)
          }else if(data.status == 'e'){
            showToast("Section Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('read_house', function() {
    let req = {}
    $.ajax({
      url:'/student/read_house/',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.houses = data.houses
            self.trigger('read_house_changed', data.houses)
          }else if(data.status == 'e'){
            showToast("House Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('read_cast', function() {
    let req = {}
    $.ajax({
      url:'/student/read_cast/',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.cast = data.cast
            self.trigger('read_cast_changed', data.cast)
          }else if(data.status == 'e'){
            showToast("Cast Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('read_religion', function() {
    let req = {}
    $.ajax({
      url:'/student/read_religion/',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.religion = data.religion
            self.trigger('read_religion_changed', data.religion)
          }else if(data.status == 'e'){
            showToast("Religion Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('read_student_first_edit', function(read_standard_id,read_section_id,first_edit_value) {
   
    let req = {}
    req.read_standard_id=read_standard_id
    req.read_section_id=read_section_id
    req.first_edit_value=first_edit_value
    $.ajax({
      url:'/student/read_student_first_edit/'+read_standard_id+'/'+read_section_id+'/'+first_edit_value,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('read_student_first_edit_changed', data.student_first_edit)
          }else if(data.status == 'e'){
            showToast("Student Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('edit_student_first', function(obj,first_edit_value) {
    let req = {}
   
    req.editValues = obj
    console.log(first_edit_value)
    $.ajax({
      url:'/student/edit_student_first/'+first_edit_value,
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            toastr.success("Successfully Update")
            self.trigger('edit_student_first_changed')
          }else if(data.status == 'e'){
            showToast("Error Updating Student. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('read_student', function(read_standard_id,read_section_id,read_enroll_number) {
 
    let req = {}
    req.read_standard_id=read_standard_id
    req.read_section_id=read_section_id
    req.read_enroll_number=read_enroll_number
    $.ajax({
      url:'/student/read_student/'+read_standard_id+'/'+read_section_id+'/'+read_enroll_number,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            
            if(data.students == []){
               toastr.info("No Data Found!")
            }
            self.trigger('read_student_changed', data.students,getCookie('session_id'),getCookie('session_name'),getCookie('role'))
          }else if(data.status == 'e'){
            showToast("Student Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('read_student_csv', function(read_standard_id,read_section_id,read_enroll_number) {
    
    let req = {}
    req.read_standard_id=read_standard_id
    req.read_section_id=read_section_id
    req.read_enroll_number=read_enroll_number
    $.ajax({
      url:'/student/read_student_csv/'+read_standard_id+'/'+read_section_id+'/'+read_enroll_number,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            
          }else if(data.status == 'e'){
            
          }
        },
        error: function(data){
          
        }
      })
  })

  self.on('read_for_edit_student', function(student_id) {
    console.log(student_id)
    let req = {}
    req.student_id=student_id

    $.ajax({
      url:'/student/read_for_edit_student/'+student_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.student_details = data.student_details
            self.trigger('read_for_edit_student_changed', data.student_details,getCookie('session_id'))
          }else if(data.status == 'e'){
            showToast("Student Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('read_student_profile', function(student_id) {
    console.log(student_id)
    let req = {}
    req.student_id=student_id

    $.ajax({
      url:'/student/read_student_profile/'+student_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.student_profile_details = data.student_profile_details
            self.trigger('read_student_profile_changed', data.student_profile_details,getCookie('session_id'))
          }else if(data.status == 'e'){
            showToast("Student Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('add_student', function(obj) {
    $.ajax({
      url:'/student/add_student',
        type:"POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            console.log('add Student after')
            toastr.success("Successfully Inserted")
            self.trigger('add_student_changed', self.students,data.student_id)
          }else if(data.status == 'e'){
            showToast("Error adding Student. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('edit_student', function(obj,student_id) {
    let req = {}
   
    req.student_id=student_id
    $.ajax({
      url:'/student/edit_student/'+student_id,
        type:"POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            toastr.success("Successfully Update")
            self.trigger('edit_student_changed', self.students)
          }else if(data.status == 'e'){
            showToast("Error Updating Student. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })


  self.on('create_student_withdraw', function(obj,student_id) {
    /*let req = {}*/
  
    /*req.student_id=student_id*/
    $.ajax({
      url:'/student/create_student_withdraw/'+student_id,
        type:"POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            toastr.success("Successfully Withdraw Student")
            self.trigger('create_student_withdraw_changed', self.withdraw_students)
          }else if(data.status == 'e'){
            showToast("Error Updating Student. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('delete_student', function(student_id) {
   
    let req = {}
    req.student_id=student_id
  
    $.ajax({
      url:'/student/delete_student/'+student_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            /*let tempstudents = self.students.filter(c => {
              return c.student_id != student_id
            })
            self.students = tempstudents*/
            toastr.info("Successfully Deleted")
            self.trigger('delete_student_changed', )
          }else if(data.status == 'e'){
            showToast("Error Deleting Student. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('regenerate_roll_no', function(read_section_id) {
    let req = {}
    
    req.read_section_id=read_section_id
    $.ajax({
      url:'/student/regenerate_roll_no/'+read_section_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            toastr.success("Successfully Regenerate Roll No")
            self.trigger('regenerate_roll_no_changed')
          }else if(data.status == 'e'){
            showToast("Error Updating Student. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('student_list', function(read_section_id) {
    let req = {}
    req.read_section_id=read_section_id
    $.ajax({
      url:'/student/student_list/'+read_section_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('student_list_changed', data.student_list,data.total)
          }else if(data.status == 'e'){
            showToast("Error Listing Student. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('print_list', function(read_standard_id,read_section_id) {
    let req = {}
    console.log(read_section_id)
    req.read_standard_id=read_standard_id
    req.read_section_id=read_section_id
    $.ajax({
      url:'/student/print_list/'+read_standard_id+'/'+read_section_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('print_list_changed', data.print_list)
          }else if(data.status == 'e'){
            showToast("Error Listing Student. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('upload_student_image', function(student_image,student_id) {
    var form_data = new FormData(); 
    form_data.append("student_profile_picture", student_image);
    $.ajax({
      url:'/student/upload_student_image/studentImages/'+student_id,
        type:"POST",
        dataType: 'script',
        processData: false,
        contentType: false,
        data: form_data,
        headers: {"Authorization": getCookie('token')},
        success: function(image_name){
          console.log(image_name)
          self.trigger('upload_student_image_changed', image_name)
        },
        error: function(data){
         //showToast("", data)
        }
      })
  })

  self.on('delete_upload_student_image', function(student_id) {

    $.ajax({
      url:'/student/delete_upload_student_image/'+student_id,
        type:"POST",
        dataType: 'script',
        processData: false,
        contentType: false,
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          
          self.trigger('delete_upload_student_image_changed')
        },
        error: function(data){
          //showToast("", data)
        }
      })
  })

  self.on('upload_father_image', function(father_image,student_id) {
    var form_data = new FormData(); 
    form_data.append("father_profile_picture", father_image);
    $.ajax({
      url:'/student/upload_father_image/fatherImages/'+student_id,
        type:"POST",
        dataType: 'script',
        processData: false,
        contentType: false,
        data: form_data,
        headers: {"Authorization": getCookie('token')},
        success: function(image_name){
          console.log(image_name)
          self.trigger('upload_father_image_changed', image_name)
        },
        error: function(data){
          //showToast("", data)
        }
      })
  })

  self.on('delete_upload_father_image', function(student_id) {

    $.ajax({
      url:'/student/delete_upload_father_image/'+student_id,
        type:"POST",
        dataType: 'script',
        processData: false,
        contentType: false,
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          
          self.trigger('delete_upload_father_image_changed')
        },
        error: function(data){
          //showToast("", data)
        }
      })
  })

  self.on('upload_mother_image', function(mother_image,student_id) {
    var form_data = new FormData(); 
    form_data.append("mother_profile_picture", mother_image);
    $.ajax({
      url:'/student/upload_mother_image/motherImages/'+student_id,
        type:"POST",
        dataType: 'script',
        processData: false,
        contentType: false,
        data: form_data,
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(image_name)
          self.trigger('upload_mother_image_changed', image_name)
        },
        error: function(data){
          //showToast("", data)
        }
      })
  })

  self.on('delete_upload_mother_image', function(student_id) {

    $.ajax({
      url:'/student/delete_upload_mother_image/'+student_id,
        type:"POST",
        dataType: 'script',
        processData: false,
        contentType: false,
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          
          self.trigger('delete_upload_mother_image_changed')
        },
        error: function(data){
          //showToast("", data)
        }
      })
  })

  self.on('upload_guardian_image', function(guardian_image,student_id) {
    var form_data = new FormData(); 
    form_data.append("guardian_profile_picture", guardian_image);
    console.log("guardian_image")
    console.log(guardian_image)
    $.ajax({
      url:'/student/upload_guardian_image/guardianImages/'+student_id,
        type:"POST",
        dataType: 'script',
        processData: false,
        contentType: false,
        data: form_data,
        headers: {"Authorization": getCookie('token')},
        success: function(image_name){
          console.log(image_name)
          self.trigger('upload_guardian_image_changed', image_name)
        },
        error: function(data){
          //showToast("", data)
        }
      })
  })

  self.on('delete_upload_guardian_image', function(student_id) {

    $.ajax({
      url:'/student/delete_upload_guardian_image/'+student_id,
        type:"POST",
        dataType: 'script',
        processData: false,
        contentType: false,
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          
          self.trigger('delete_upload_guardian_image_changed')
        },
        error: function(data){
          //showToast("", data)
        }
      })
  })

  self.on('upload_copy_father_image', function(student_id) {
    
    let req = {}
    req.student_id=student_id
    console.log("student_id")
    console.log(req.student_id)
    $.ajax({
      url:'/student/upload_copy_father_image/'+student_id,
      type:"POST",
      data: JSON.stringify(),
      contentType: "application/json",
      dataType:"json",
      headers: {"Authorization": getCookie('token')},
      success: function(data){
        self.trigger('upload_copy_father_image_changed')
        },
        error: function(data){
          //showToast("", data)
        }
      })
  })

  self.on('upload_copy_mother_image', function(student_id) {
    let req = {}
    req.student_id=student_id
    console.log("student_id")
    console.log(req.student_id)
    $.ajax({
      url:'/student/upload_copy_mother_image/'+student_id,
      type:"POST",
      data: JSON.stringify(),
      contentType: "application/json",
      dataType:"json",
      headers: {"Authorization": getCookie('token')},
      success: function(data){
          
        self.trigger('upload_copy_mother_image_changed',)
      },
      error: function(data){
        //showToast("", data)
      }
    })
  })

}
