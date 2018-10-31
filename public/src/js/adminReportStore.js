function AdminReportStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this
  
/*
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
            toastr.success("Successfully Inserted")
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
*/

  

  //read Student Family Occupation
 self.on('read_student_summary_report', function() {
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
  })
 //read Student strength 
 self.on('read_student_strength_report', function() {
    let req = {}
    $.ajax({
      url:'/admin_report/read_student_strength_report',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            //self.studentSummaryReports=[]
            console.log("inside report")
            self.studentStrengthReports = data.studentStrengthReports
           // console.log(self.studentStrengthReports[0])
            self.trigger('read_student_strength_report_changed', self.studentStrengthReports)
          }else if(data.status == 'e'){
            showToast("Student Strength Report Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

 //student category summary report
 self.on('read_student_category_summary_report', function(categories) {
    let req = {}
    req.categories=categories
    $.ajax({
      url:'/admin_report/read_student_category_summary_report',
         data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        type:"POST",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            //self.studentSummaryReports=[]
            console.log("inside report")
            self.studentCategorySummaryReports = data.studentCategorySummaryReports
            console.log(self.studentCategorySummaryReports)
            self.trigger('read_student_category_summary_report_changed', self.studentCategorySummaryReports)
          }else if(data.status == 'e'){
            showToast("Student Category Report Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })


 //student category Strength report
 self.on('read_student_category_strength_report', function(category_id) {
    let req = {}
    $.ajax({
      url:'/admin_report/read_student_category_strength_report/'+category_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            //self.studentSummaryReports=[]
            console.log("inside report")
            self.studentCategoryStrengthReports = data.studentCategoryStrengthReports
            console.log(self.studentCategoryStrengthReports)
            self.trigger('read_student_category_strength_report_changed', self.studentCategoryStrengthReports)
          }else if(data.status == 'e'){
            showToast("Student Category Report Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })


 //stdent Group Report

 self.on('read_student_group_report', function(standard_id,section_id) {
    let req = {}
    $.ajax({
      url:'/admin_report/read_student_group_report/'+standard_id+'/'+section_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            //self.studentSummaryReports=[]
            console.log("inside report")
            self.studentGroupReports = data.studentGroupReports
            console.log(self.studentGroupReports)
            self.trigger('read_student_group_report_change', self.studentGroupReports)
          }else if(data.status == 'e'){
            showToast("Student Group Report Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

 //stdent House Report

 self.on('read_student_house_report', function(standard_id,section_id) {
    let req = {}
    $.ajax({
      url:'/admin_report/read_student_house_report/'+standard_id+'/'+section_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            //self.studentSummaryReports=[]
            console.log("inside report")
            self.studentHouseReports = data.studentHouseReports
            console.log(self.studentHouseReports)
            self.trigger('read_student_house_report_change', self.studentHouseReports)
          }else if(data.status == 'e'){
            showToast("Student House Report Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

 //stdent Class Teacher Report

 self.on('read_class_teacher_report', function() {
    let req = {}
    $.ajax({
      url:'/admin_report/read_class_teacher_report',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            //self.studentSummaryReports=[]
            console.log("inside report")
            self.studentClassTeacherReports = data.studentClassTeacherReports
            console.log(self.studentClassTeacherReports)
            self.trigger('read_class_teacher_report_change', self.studentClassTeacherReports)
          }else if(data.status == 'e'){
            showToast("Student Class teacher Report Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

 // new stdent list report

 self.on('read_new_student_list_report', function() {
    let req = {}
    $.ajax({
      url:'/admin_report/read_new_student_list_report',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            //self.studentSummaryReports=[]
            console.log("inside report")
            self.newStudentListReports = data.newStudentListReports
            console.log(self.newStudentListReports)
            self.trigger('read_new_student_list_report_changed', self.newStudentListReports)
          }else if(data.status == 'e'){
            showToast("Student List Report Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })




 



}
