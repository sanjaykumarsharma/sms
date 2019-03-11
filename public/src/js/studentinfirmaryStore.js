function StudentInfirmaryStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.infirmaryCases = []
  self.infirmaryCategories=[];
  self.studentInfirmarys=[];
  self.on('read_infirmary_category', function() {
    console.log('i am in read_sections api call from ajax')
    let req = {}
    $.ajax({
      url:'/infirmary_student/readInfirmaryCategory',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.infirmaryCategories = data.infirmaryCategories
            self.trigger('read_infirmary_category_changed', data.infirmaryCategories)
          }else if(data.status == 'e'){
            showToast("case Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('csv_export_infirmary', function(obj) {
    let req = {}
    req.data=obj
    $.ajax({
      url:'/infirmary_student/csv_export_infirmary',
        contentType: "application/json",
        dataType:"json",
        type:'POST',
        data: JSON.stringify(req),
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('csv_export_infirmary_changed', data.url)
          }else if(data.status == 'e'){
            
          }
        },
        error: function(data){
          //showToast("", data)
        }
      })
  })
 
self.on('read_student_date_wise_case_report', function(category_id,start_date,end_date) {
    let req = {}
     req.category_id=category_id
     req.start_date=start_date
     req.end_date=end_date
    $.ajax({
       url:'/infirmary_student/readCaseReport',
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            toastr.success("Successfully ")
            self.studentDateWiseCaseReports = data.studentDateWiseCaseReports

            self.trigger('read_student_date_wise_case_report_changed', self.studentDateWiseCaseReports, getCookie('session_name'))
          }else if(data.status == 'e'){
            showToast("Invalid Username or password. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

self.on('csv_export_date_wise_case_report', function(obj) {
    let req = {}
    req.data=obj
    $.ajax({
      url:'/infirmary_student/csv_export_date_wise_case_report',
        contentType: "application/json",
        dataType:"json",
        type:'POST',
        data: JSON.stringify(req),
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('csv_export_date_wise_case_report_changed', data.url)
          }else if(data.status == 'e'){
            
          }
        },
        error: function(data){
          //showToast("", data)
        }
      })
  })

//read Class Wise student Case Report

self.on('read_class_wise_report', function(standard_id,section_id) {
    let req = {}
     req.standard_id=standard_id
     req.section_id=section_id
    $.ajax({
       url:'/infirmary_student/read_class_wise_report',
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            toastr.success("Successfully ")
            self.class_wise_case_report = data.class_wise_case_report
              self.grand_total=0
              self.class_wise_case_report.map( q => {
                 self.grand_total=Number(self.grand_total) + Number(q.total)
              })
            //self.grand_total = data.grand_total
           //  , getCookie('session_name')
            self.trigger('read_class_wise_report_changed', self.class_wise_case_report, self.grand_total)
          }else if(data.status == 'e'){
            showToast("Invalid Username or password. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('csv_export_infirmary_class_wise_case_report', function(obj) {
    let req = {}
    req.data=obj
    $.ajax({
      url:'/infirmary_student/csv_export_infirmary_class_wise_case_report',
        contentType: "application/json",
        dataType:"json",
        type:'POST',
        data: JSON.stringify(req),
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('csv_export_infirmary_class_wise_case_report_changed', data.url)
          }else if(data.status == 'e'){
            
          }
        },
        error: function(data){
          //showToast("", data)
        }
      })
  })


// infiramry student case wise report

self.on('read_case_wise_report', function(obj) {
    let req = {}
     req.start_date=obj.start_date
     req.end_date=obj.end_date
    $.ajax({
       url:'/infirmary_student/read_case_wise_report',
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            toastr.success("Successfully ")
                self.case_wise_reports = data.case_wise_reports
                self.grand_total=0
                self.case_wise_reports.map( q => {
                self.grand_total=Number(self.grand_total) + Number(q.total)
              })
            //self.grand_total = data.grand_total
           //  , getCookie('session_name')
            self.trigger('read_case_wise_report_changed', self.case_wise_reports, self.grand_total)
          }else if(data.status == 'e'){
            showToast("Invalid Username or password. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('csv_export_infirmary_case_wise_report', function(obj) {
    let req = {}
    req.data=obj
    $.ajax({
      url:'/infirmary_student/csv_export_infirmary_case_wise_report',
        contentType: "application/json",
        dataType:"json",
        type:'POST',
        data: JSON.stringify(req),
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('csv_export_infirmary_case_wise_report_changed', data.url)
          }else if(data.status == 'e'){
            
          }
        },
        error: function(data){
          //showToast("", data)
        }
      })
  })

  self.on('read_infirmary_case', function() {
    console.log('i am in read_section api call from ajax')
    let req = {}
    $.ajax({
      url:'/infirmary_student/read_infirmary_case',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.infirmaryCases = data.infirmaryCases
            self.trigger('read_infirmary_case_changed', data.infirmaryCases)
          }else if(data.status == 'e'){
            showToast("Case Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
  self.on('read_student_infirmary', function(id) {
    console.log('i am in read_section api call from ajax')
    let req = {}
    $.ajax({
      url:'/infirmary_student/read_student_infirmary/'+id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.studentInfirmarys = data.studentInfirmarys
            self.trigger('read_student_infirmary_changed', data.studentInfirmarys)
          }else if(data.status == 'e'){
            showToast("Case Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('delete_student_infirmary', function(id) {
    $.ajax({
      url:'/infirmary_student/delete/'+id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            let tempStudentInfirmary = self.studentInfirmarys.filter(c => {
              return c.infirmary_id != id
            })
            self.studentInfirmarys = tempStudentInfirmary
            toastr.info("Infirmary Deleted Successfully")
            self.trigger('delete_student_infirmary_changed', self.studentInfirmarys)
          }else if(data.status == 'e'){
            showToast("Error Deleting Case. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('edit_student_infirmary', function(enroll_number,category_id,case_id,treatment_date,time_in,time_out, treatment,sent_home,id,case_name,category) {
  let req = {}
  console.log(id)
   req.enroll_number=enroll_number
   req.category_id=category_id
   req.case_id=case_id
   req.treatment_date=treatment_date
   req.time_in=time_in
   req.time_out=time_out
   req.treatment=treatment
   req.sent_home=sent_home
   req.case_name=case_name
  // req.case=case
   req.category=category
    req.id=id
    $.ajax({
      url:'/infirmary_student/edit/'+id,
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            self.studentInfirmarys = self.studentInfirmarys.map(cat => {
              if(cat.infirmary_id == id){
                 cat.enroll_number=enroll_number
                 cat.category_id=category_id
                 cat.category_name=category
                 cat.case_name=case_name
                 cat.case_id=case_id
                 cat.infirmary_id=id
                 cat.treatment_date=treatment_date
                 cat.time_in=time_in
                 cat.time_out=time_out
                 cat.treatment=treatment
                 cat.sent_home=sent_home
                //cat.standard_id=standard_id
              }
              // cat.confirmEdit = false
              return cat
            })
            toastr.success("Infirmary Updated Successfully ")
            self.trigger('edit_student_infirmary_changed', self.studentInfirmarys)
          }else if(data.status == 'e'){
            showToast("Error updating Case. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
 
  self.on('add_student_infirmary', function(enroll_number,category_id,case_id,treatment_date,time_in,time_out, treatment,sent_home,case_name,category) {
    let req = {}
     req.enroll_number=enroll_number
     req.category_id=category_id
     req.case_id=case_id
     req.treatment_date=treatment_date
     req.time_in=time_in
     req.time_out=time_out
     req.treatment=treatment
     req.sent_home=sent_home
     req.case_name=case_name
     //req.case=case
     req.category=category
    $.ajax({
       url:'/infirmary_student/add',
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            console.log('add case  after')
            let obj = {}
                 obj.infirmary_id=data.infirmary_id
                 obj.enroll_number=enroll_number
                 obj.category_id=category_id
                 obj.case_id=case_id
                 obj.treatment_date=treatment_date
                 obj.time_in=time_in
                 obj.time_out=time_out
                 obj.treatment=treatment
                 obj.category_name=category
                 obj.case_name=case_name
                 obj.sent_home=sent_home
           // obj.name = name
            self.studentInfirmarys = [obj, ...self.studentInfirmarys]
            toastr.success("Infirmary  Inserserted Successfully ")
            self.trigger('add_student_infirmary_changed', self.studentInfirmarys)
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
