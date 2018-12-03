function StudentSearchStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this
  

  self.on('read_by_field', function(roll_no,student_name,reg_number,f_name,m_name) {
     let req = {}
     req.roll_no=roll_no
     req.student_name=student_name
     req.reg_number=reg_number
     req.f_name=f_name
     req.m_name=m_name
    $.ajax({
      url:'/studentSearch/read_by_field',
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
             self.searchStudents=data.searchStudents
            toastr.success("Successfully")
            self.trigger('read_by_field_change', self.searchStudents)
          }else if(data.status == 'e'){
            showToast("Error search Student. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })


  //student Browser Data

  self.on('read_student_browser', function(standard_id,section_id) {
     let req = {}
     req.standard_id=standard_id
     req.section_id=section_id
    $.ajax({
      url:'/studentSearch/read_student_browser',
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
             self.browseStudents=data.browseStudents
            toastr.success("Successfully")
            self.trigger('read_student_browser_change', self.browseStudents)
          }else if(data.status == 'e'){
            showToast("Error search Student. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  //read Student Family Occupation
 self.on('read_occupation', function() {
    let req = {}
    $.ajax({
      url:'/studentSearch/read_occupation/',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.parentOccupations = data.parentOccupations
            self.trigger('read_occupation_changed', data.parentOccupations)
          }else if(data.status == 'e'){
            showToast("Occuaption Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })


 //Read Occupation Report

 self.on('read_occupation_report', function(occupation) {
    let req = {}
    $.ajax({
      url:'/studentSearch/read_occupation_report/'+occupation,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.occupationReports = data.occupationReports
            self.trigger('read_occupation_report_change', data.occupationReports)
          }else if(data.status == 'e'){
            showToast("Occuaption Report Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })




}
