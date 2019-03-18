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
 self.on('read_occupation', function() {
    let req = {}
    $.ajax({
      url:'/admin_report/read_occupation/',
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
      url:'/admin_report/read_occupation_report/'+occupation,
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
            self.session_name = data.session_name
           // console.log(self.studentSummaryReports[0])
            self.trigger('read_student_summary_report_changed', self.studentSummaryReports,self.session_name)
          }else if(data.status == 'e'){
            showToast("Student Summary Report Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
  self.on('csv_export_student_summary_report', function(obj) {
    let req = {}
    req.data=obj
    $.ajax({
      url:'/admin_report/csv_export_student_summary_report',
        contentType: "application/json",
        dataType:"json",
        type:'POST',
        data: JSON.stringify(req),
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('csv_export_student_summary_report_changed', data.url)
          }else if(data.status == 'e'){
            
          }
        },
        error: function(data){
          
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
            self.session_name = data.session_name
           // console.log(self.studentStrengthReports[0])
            self.trigger('read_student_strength_report_changed', self.studentStrengthReports,self.session_name )
          }else if(data.status == 'e'){
            showToast("Student Strength Report Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

 self.on('csv_export_student_strength_report', function(obj) {
    let req = {}
    req.data=obj
    $.ajax({
      url:'/admin_report/csv_export_student_strength_report',
        contentType: "application/json",
        dataType:"json",
        type:'POST',
        data: JSON.stringify(req),
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('csv_export_student_strength_report_changed', data.url)
          }else if(data.status == 'e'){
            
          }
        },
        error: function(data){
          
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
            self.session_name = data.session_name
            console.log(self.studentCategorySummaryReports)
            self.trigger('read_student_category_summary_report_changed', self.studentCategorySummaryReports,self.session_name)
          }else if(data.status == 'e'){
            showToast("Student Category Report Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

 self.on('csv_export_student_category_summary_report', function(obj) {
    let req = {}
    req.data=obj
    $.ajax({
      url:'/admin_report/csv_export_student_category_summary_report',
        contentType: "application/json",
        dataType:"json",
        type:'POST',
        data: JSON.stringify(req),
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('csv_export_student_category_summary_report_changed', data.url)
          }else if(data.status == 'e'){
            
          }
        },
        error: function(data){
          
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
            self.session_name = data.session_name
            console.log(self.studentCategoryStrengthReports)
            self.trigger('read_student_category_strength_report_changed', self.studentCategoryStrengthReports,self.session_name)
          }else if(data.status == 'e'){
            showToast("Student Category Report Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

 self.on('csv_export_student_category_strength_report', function(obj) {
    let req = {}
    req.data=obj
    $.ajax({
      url:'/admin_report/csv_export_student_category_strength_report',
        contentType: "application/json",
        dataType:"json",
        type:'POST',
        data: JSON.stringify(req),
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('csv_export_student_category_strength_report_changed', data.url)
          }else if(data.status == 'e'){
            
          }
        },
        error: function(data){
          
        }
      })
  })

 // student  religion listing

 self.on('read_student_religion_listing_report', function() {
    let req = {}
    $.ajax({
      url:'/admin_report/read_student_religion_listing_report',
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
            self.studentReligionListingReports = data.studentReligionListingReports
            self.session_name = data.session_name
            console.log(self.studentReligionListingReports)
            self.trigger('read_student_religion_listing_report_changed', self.studentReligionListingReports,self.session_name)
          }else if(data.status == 'e'){
            showToast("Student Religion Report Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
  self.on('csv_export_student_religion_listing_report', function(obj) {
    let req = {}
    req.data=obj
    $.ajax({
      url:'/admin_report/csv_export_student_religion_listing_report',
        contentType: "application/json",
        dataType:"json",
        type:'POST',
        data: JSON.stringify(req),
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('csv_export_student_religion_listing_report_changed', data.url)
          }else if(data.status == 'e'){
            
          }
        },
        error: function(data){
          
        }
      })
  })
 // student  Blood Grooup listing

 self.on('read_student_blood_group_listing_report', function() {
    let req = {}
    $.ajax({
      url:'/admin_report/read_student_blood_group_listing_report',
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
            self.session_name = data.session_name
            self.studentBloodGroupListingReports = data.studentBloodGroupListingReports

               /*  var map = {
                    'A+'  : "A_plus",
                    'A-'  : "A_min",
                    'AB+' : "AB_plus",
                    'AB-' : "AB_min",
                    'B+'  : "B_plus",
                    'B-'  : "B_min",
                    'O+'  : "O_plus",
                    'O-'  : "O_min"
                  } 
                  

                   var tab = {
                        abc:1,
                        def:40,
                        xyz: 50
                      }

                      var map = {
                          abc : "newabc",
                          def : "newdef",
                          xyz : "newxyz"
                      }


                   for (var [key, value] of tab) {
                          key = map[key] || key;
                          tab[key] = value;
                          console.log(tab)   
                      };*/


              /*    for (var [key, value] of  self.studentBloodGroupListingReports) {
                      console.log(key + ' = ' + value);
                        key = map[key] || key;
                       self.studentBloodGroupListingReports[key] = value;
                    }*/
             /* self.studentBloodGroupListingReports.map( => {
                  key = map[key] || key;
                  self.studentBloodGroupListingReports[key] = value;
              })
*/
              /* self.studentBloodGroupListingReports.map(value, key) {
                    key.replace(/\+/g,' ')
                    self.studentBloodGroupListingReports[key] = value;
                };*/

            console.log(self.studentBloodGroupListingReports)
            self.trigger('read_student_blood_group_listing_report_changed', self.studentBloodGroupListingReports,self.session_name)
          }else if(data.status == 'e'){
            showToast("Student Blood Group Report Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

 self.on('csv_export_student_blood_group_listing_report', function(obj) {
    let req = {}
    req.data=obj
    $.ajax({
      url:'/admin_report/csv_export_student_blood_group_listing_report',
        contentType: "application/json",
        dataType:"json",
        type:'POST',
        data: JSON.stringify(req),
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('csv_export_student_blood_group_listing_report_changed', data.url)
          }else if(data.status == 'e'){
            
          }
        },
        error: function(data){
          
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
            var grandTotal=0;
            self.studentGroupReports.map(i=>{
                   grandTotal=Number(grandTotal) + Number(i.total)
                 })
            self.trigger('read_student_group_report_change', self.studentGroupReports,grandTotal)
          }else if(data.status == 'e'){
            showToast("Student Group Report Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
 self.on('csv_export_student_group_report', function(obj) {
    let req = {}
    req.data=obj
    $.ajax({
      url:'/admin_report/csv_export_student_group_report',
        contentType: "application/json",
        dataType:"json",
        type:'POST',
        data: JSON.stringify(req),
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('csv_export_student_group_report_changed', data.url)
          }else if(data.status == 'e'){
            
          }
        },
        error: function(data){
          
        }
      })
  })

 // read Udise Report

 self.on('read_udise_report', function(standard_id,section_id,sesion_id) {
    let req = {}
    $.ajax({
      url:'/admin_report/read_udise_report/'+standard_id+'/'+section_id+'/'+sesion_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            //self.studentSummaryReports=[]
            console.log("inside udise report")
            self.udiseReports = data.udiseReports
            self.trigger('read_udise_report_change', self.udiseReports)
          }else if(data.status == 'e'){
            showToast("UdiseReport Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

 // read Udise Report

 self.on('read_session', function() {
    let req = {}
    $.ajax({
      url:'/admin_report/read_session',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            //self.studentSummaryReports=[]
            console.log("inside session")
            self.sessions = data.sessions
            self.trigger('read_session_change', self.sessions)
          }else if(data.status == 'e'){
            showToast("session name Read Error. Please try again.", data)
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
            self.session_name = data.session_name
            self.studentHouseReports = data.studentHouseReports
            var grandTotal=0;
            self.studentHouseReports.map(i=>{
                   grandTotal=Number(grandTotal) + Number(i.total)
                 })
            self.trigger('read_student_house_report_change', self.studentHouseReports,grandTotal,self.session_name)
          }else if(data.status == 'e'){
            showToast("Student House Report Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

 self.on('csv_export_student_house_report', function(obj) {
    let req = {}
    req.data=obj
    $.ajax({
      url:'/admin_report/csv_export_student_house_report',
        contentType: "application/json",
        dataType:"json",
        type:'POST',
        data: JSON.stringify(req),
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('csv_export_student_house_report_changed', data.url)
          }else if(data.status == 'e'){
            
          }
        },
        error: function(data){
          
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
            self.session_name = data.session_name
            console.log(self.studentClassTeacherReports)
            self.trigger('read_class_teacher_report_change', self.studentClassTeacherReports,self.session_name)
          }else if(data.status == 'e'){
            showToast("Student Class teacher Report Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

 self.on('csv_export_student_class_teacher_report', function(obj) {
    let req = {}
    req.data=obj
    $.ajax({
      url:'/admin_report/csv_export_student_class_teacher_report',
        contentType: "application/json",
        dataType:"json",
        type:'POST',
        data: JSON.stringify(req),
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('csv_export_student_class_teacher_report_changed', data.url)
          }else if(data.status == 'e'){
            
          }
        },
        error: function(data){
          
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
            self.session_name=getCookie('session_name')
            self.newStudentListReports = data.newStudentListReports
            console.log(self.newStudentListReports)
            self.trigger('read_new_student_list_report_changed', self.newStudentListReports,self.session_name)
          }else if(data.status == 'e'){
            showToast("Student List Report Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

self.on('csv_export_new_student_list_report', function(obj) {
    let req = {}
    req.data=obj
    $.ajax({
      url:'/admin_report/csv_export_new_student_list_report',
        contentType: "application/json",
        dataType:"json",
        type:'POST',
        data: JSON.stringify(req),
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('csv_export_new_student_list_report_changed', data.url)
          }else if(data.status == 'e'){
            
          }
        },
        error: function(data){
          
        }
      })
  })

//read new student caTEGORY REPORT
self.on('read_new_student_category_report', function() {
    let req = {}
    $.ajax({
      url:'/admin_report/read_new_student_category_report',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.session_name =data.session_name
            self.newStudentCategoryReports = data.newStudentCategoryReports
            self.trigger('read_new_student_category_report_changed', self.newStudentCategoryReports,self.session_name)
          }else if(data.status == 'e'){
            showToast("New Student Category Report Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })




 



}
