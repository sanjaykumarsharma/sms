function BirthDayStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this
  

  self.on('read_birth_day', function(dayType, s_date,e_date,type_id) {
     let req = {}
     req.dayType=dayType
     req.s_date=s_date
     req.e_date=e_date
     req.type_id=type_id
     console.log("inside Store")
     console.log(req)
     $.ajax({
      url:'/birth_day/read_birth_day',
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
             self.birthDayData=data.birthDayData
            toastr.success("Successfully")
            self.trigger('read_birth_day_changed', self.birthDayData)
          }else if(data.status == 'e'){
            showToast("Error . Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
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
