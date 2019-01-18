function AttendanceStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this
  

  self.on('read_attendance_data', function(standard_id, section_id,start_date) {
     let req = {}
     req.standard_id=standard_id
     req.section_id=section_id
     req.start_date=start_date
     console.log("inside Store")
     console.log(req)
     $.ajax({
      url:'/attendance/read_attendance_data',
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
             self.attendanceData=data.attendanceData
             if(self.attendanceData=='No Data Found'){
               toastr.info("No Data Found")
             }
              // toastr.success("Successfully")
            self.trigger('read_attendance_data_changed', self.attendanceData)
          }else if(data.status == 'e'){
            showToast("Error . Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data.err)
        }
      })
  })

// Add Attendance
  self.on('add_attendance_data', function(studentData,start_date) {
     let req = {}
     req.studentData=studentData
     req.start_date=start_date
     console.log("inside add_attendance_data store")
     console.log(req)
     $.ajax({
      url:'/attendance/add_attendance_data',
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            // self.attendanceData=data.attendanceData
            toastr.success("Attendance Taken Successfully")
            self.trigger('add_attendance_data_changed')
          }else if(data.status == 'e'){
            showToast("Error . Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data.err)
        }
      })
  })

  // read daily attendance data

  self.on('read_daily_attendance_data', function(start_date) {
     let req = {}
     req.start_date=start_date
     console.log("inside raed_attendance_data store")
     console.log(req)
     $.ajax({
      url:'/attendance/read_daily_attendance_data',
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
             self.dailyAttendanceData=data.dailyAttendanceData
            toastr.success("Successfully")
            self.trigger('read_daily_attendance_data_changed',self.dailyAttendanceData)
          }else if(data.status == 'e'){
            showToast("Error . Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data.err)
        }
      })
  })


  // read Holiday list

 self.on('read_holiday_list', function() {
    let req = {}
    $.ajax({
      url:'/attendance/read_holiday_list',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            console.log("inside holiday list")
            self.holidayLists = data.holidayLists
            self.trigger('read_holiday_list_changed', self.holidayLists)
          }else if(data.status == 'e'){
            showToast("holiday list Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })


 //delete_attendance


  self.on('delete_attendance', function(studentData,start_date){
     let req = {}
     req.start_date=start_date
     req.studentData=studentData
     console.log("inside delete attendance_data store")
     console.log(req)
     $.ajax({
      url:'/attendance/delete_attendance',
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            toastr.success("Successfully Deleted")
            self.trigger('delete_attendance_data_changed')
          }else if(data.status == 'e'){
            showToast("Error . Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data.err)
        }
      })
  })


  

  

  //read Student Family Occupation
 /*self.on('read_student_summary_report', function() {
    let req = {}
    $.ajax({
      url:'/admin_report/read_student_summary_report',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            //self.studentSummaryReports=[]
            console.log("inside report")
            self.studentSummaryReports = data.studentSummaryReports
           // console.log(self.studentSummaryReports[0])
            self.trigger('read_student_summary_report_changed', self.studentSummaryReports)
          }else if(data.status == 'e'){
            showToast("Student Summary Report Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })*/


}
