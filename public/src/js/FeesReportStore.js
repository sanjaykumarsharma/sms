function FeesReportStore(){
  riot.observable(this) // Riot provides our event emitter.
  var self = this


 //========= read head wise fees ==========
 self.headWiseData = []
  self.on('read_head_wise_fees', function(obj) {
    console.log('i am in read head wise fees api call from ajax')
    let req = {}
   /* req.start_date=obj.start_date
    req.end_date=obj.end_date*/
    $.ajax({
      url:'/fees_report/read_head_wise_fees/'+obj.start_date+'/'+obj.end_date,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)


          if(data.status == 's'){
            console.log("===================")
            console.log(data.headWiseData)
            self.headWiseData = data.headWiseData
            self.trigger('read_head_wise_changed', data.headWiseData, getCookie('session_name'))
          }else if(data.status == 'e'){
            showToast("data read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  }) 
  //====== read head category wise fees ======
  
   self.headCategoryWiseData = []
  self.on('read_head_category_wise_fees', function(obj) {
    console.log('i am in read head wise fees api call from ajax')
    let req = {}
   /* req.start_date=obj.start_date
    req.end_date=obj.end_date*/
    $.ajax({
      url:'/fees_report/read_head_category_wise_fees/'+obj.start_date+'/'+obj.end_date,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)


          if(data.status == 's'){
            console.log("===================")
            console.log(data.headCategoryWiseData)
            self.headCategoryWiseData = data.headCategoryWiseData
            self.trigger('read_head_category_wise_changed', data.headCategoryWiseData, getCookie('session_name'))
          }else if(data.status == 'e'){
            showToast("data read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
//========= read un assigned students ============
 self.on('read_no_scheme', function() {
    console.log('i am in read_no_scheme api call from ajax')
    let req = {}
    $.ajax({
      url:'/fees_report/read_un_assigned',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.students = data.students
            self.trigger('read_no_scheme_changed', data.students, getCookie('session_name'))
          }else if(data.status == 'e'){
            showToast("students Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
 //========= read session wise fees plan (scheme)==
 
 self.on('read_session_scheme', function(session_id) {
    console.log('i am in  read_session_scheme api call from ajax')
    $.ajax({
      url:'/fees_report/read_session_scheme/'+session_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.schemes = data.schemes
            self.trigger('read_session_scheme_changed', data.schemes, data.grand_total, getCookie('session_name'))
          }else if(data.status == 'e'){
            showToast("Error in reading data. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
 //========== read Issued Letter =============
 
 self.on('read_issued_fees_letter', function(month_id) {
    console.log('i am in  read_issued_fees_letter api call from ajax')
    console.log("id =" +month_id)
    $.ajax({
      url:'/fees_report/read_issued_fees_letter/'+month_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.letter_students = data.letter_students
            self.trigger('read_fees_letter_changed', data.letter_students, getCookie('session_name'))
          }else if(data.status == 'e'){
            showToast("Error in reading data. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
 //============== read assigned students =========
 self.on('read_assigned_students', function(fee_plan_id) {
    console.log('i am in  read_assigned_students api call from ajax')
    console.log("id =" +fee_plan_id)
    $.ajax({
      url:'/fees_report/read_assigned_students/'+fee_plan_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.assignedStudents = data.assignedStudents
            self.trigger('read_assigned_student_changed', data.assignedStudents, getCookie('session_name'))
          }else if(data.status == 'e'){
            showToast("Error in reading data. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
//======= read datewise fees ===============
 self.dateWiseData = []
  self.on('read_date_wise_fees', function(obj) {
    console.log('i am in read date wise fees api call from ajax')
    let req = {}
   /* req.start_date=obj.start_date
    req.end_date=obj.end_date*/
    $.ajax({
      url:'/fees_report/read_date_wise_fees/'+obj.start_date+'/'+obj.end_date,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.dateWiseData = data.dateWiseData
            self.trigger('read_date_fees_changed', data.dateWiseData, getCookie('session_name'))
          }else if(data.status == 'e'){
            showToast("data read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
//=========== read early fees ========


  self.scholarships = []
  self.on('read_early_fees_payer', function(obj) {
    console.log('i am in read advanceFees fees api call from ajax')
    let req = {}
   /* req.start_date=obj.start_date
    req.end_date=obj.end_date*/
    $.ajax({
      url:'/fees_report/read_early_fees_payer/'+obj.start_date+'/'+obj.end_date,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.advanceFees = data.advanceFees
            self.trigger('read_advanced_fees_changed', data.advanceFees, getCookie('session_name'))
          }else if(data.status == 'e'){
            showToast("data read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
  //======= read scholarship list ========
  
  self.scholarships = []
  self.on('read_scholarship_list', function(obj) {
    console.log('i am in read scholarship fees api call from ajax')
    let req = {}
   /* req.start_date=obj.start_date
    req.end_date=obj.end_date*/
    $.ajax({
      url:'/fees_report/getScholarshipList/'+obj.start_date+'/'+obj.end_date,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.scholarships = data.scholarships
            self.trigger('read_scholarship_list_changed', data.scholarships, getCookie('session_name'))
          }else if(data.status == 'e'){
            showToast("data read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
//=========== read fees collection summary ======
  self.collectionSummary = []
  self.on('read_collection_summary', function(obj) {
    console.log("path")
    console.log(obj)
    console.log("-------path----")
    $.ajax({
      url:'/fees_report/read_collection_summary',
        type:"POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log("---=======---collection=======-----======")
          console.log(data)
          console.log("---=======---=======-----======")
          if(data.status == 's'){
            self.collectionSummary = data.collectionSummary
            self.trigger('read_collection_summary_changed', data.collectionSummary, getCookie('session_name'))
          }else if(data.status == 'e'){
            showToast("Error in reading data. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
  //========= read daily fees collection ======
  self.dailyData = []
  self.on('read_daily_fees', function(obj) {
    console.log('i am in read daily fees api call from ajax')
    let req = {}
   /* req.start_date=obj.start_date
    req.end_date=obj.end_date*/
    $.ajax({
      url:'/fees_report/read_daily_fees/'+obj.start_date+'/'+obj.end_date,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.dailyData = data.dailyData
            self.trigger('read_daily_fees_changed', data.dailyData, getCookie('session_name'))
          }else if(data.status == 'e'){
            showToast("data read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
 //======= read fees register ================ 
  self.registerData = []
  self.on('read_fees_register', function(obj) {
    console.log('i am in read fees register api call from ajax')
    let req = {}
   /* req.start_date=obj.start_date
    req.end_date=obj.end_date*/
    $.ajax({
      url:'/fees_report/read_fees_register/'+obj.start_date+'/'+obj.end_date,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.registerData = data.registerData
            self.trigger('read_fees_register_changed', data.registerData, getCookie('session_name'))
          }else if(data.status == 'e'){
            showToast("data read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
//============ read month wise fees============
  self.monthlyData = []
  self.on('read_monthly_fees', function(obj) {
    console.log('i am in read monthly fees api call from ajax')
    let req = {}
   /* req.start_date=obj.start_date
    req.end_date=obj.end_date*/
    $.ajax({
      url:'/fees_report/read_monthly_fees/'+obj.start_date+'/'+obj.end_date,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.monthlyData = data.monthlyData
            self.trigger('read_monthly_fees_changed', data.monthlyData, getCookie('session_name'))
          }else if(data.status == 'e'){
            showToast("data read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
 //============ read outstanding by date ==========
  
 self.outstandingData = []
  self.on('read_outstanding_fees', function(obj) {
    console.log('i am in read outstanding fees api call from ajax')
    let req = {}
   /* req.start_date=obj.start_date
    req.end_date=obj.end_date*/
    $.ajax({
      url:'/fees_report/read_outstanding_fees/'+obj.start_date+'/'+obj.end_date,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log("--=000---")
          console.log(data)
          if(data.status == 's'){
            self.outstandingData = data.outstandingData
            self.trigger('read_outstanding_fees_changed', data.outstandingData, getCookie('session_name'))
          }else if(data.status == 'e'){
            showToast("data read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
 
//============ read outstanding by class ==========

self.on('read_outstanding_classwise', function(obj) {
    $.ajax({
      url:'/fees_report/read_outstanding_classwise',
        type:"POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.outstandingFees = data.outstandingFees
            self.trigger('read_outstanding_classwise_changed', data.outstandingFees, getCookie('session_name'))
          }else if(data.status == 'e'){
            showToast("Error in reading data. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
//=========== read read_due_classwise =======
self.on('read_due_classwise', function(obj) {
    $.ajax({
      url:'/fees_report/read_due_classwise',
        type:"POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log("=========data =========")
          console.log(data)
          if(data.status == 's'){
            self.classWiseDueFees = data.classWiseDueFees
            self.trigger('read_due_classwise_changed', data.classWiseDueFees, getCookie('session_name'))
          }else if(data.status == 'e'){
            showToast("Error in reading data. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

//========== read advance classwise =========

self.on('read_advance_classwise', function(obj) {
    $.ajax({
      url:'/fees_report/read_advance_classwise',
        type:"POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log("=========data =========")
          console.log(data)
          if(data.status == 's'){
            self.classWiseAdvanceFees = data.classWiseAdvanceFees
            self.trigger('read_advance_classwise_changed', data.classWiseAdvanceFees, getCookie('session_name'))
          }else if(data.status == 'e'){
            showToast("Error in reading data. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
  //=============== read estimated fees =============
  
self.on('read_estimated_fees', function(obj) {
    $.ajax({
      url:'/fees_report/read_estimated_fees',
        type:"POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log("---=======---=======-----======")
          console.log(data)
          console.log("---=======---=======-----======")
          if(data.status == 's'){
            self.estimatedFees = data.estimatedFees
            self.trigger('read_estimated_fees_changed', data.estimatedFees, getCookie('session_name'))
          }else if(data.status == 'e'){
            showToast("Error in reading data. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

//======= read bank wise fees ==============
  self.on('read_bank_wise_fees', function(obj) {
    
    $.ajax({
      url:'/fees_report/read_bank_wise_fees',
        type:"POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          
          console.log("---=======---=======-----======")
          if(data.status == 's'){
            self.bankWiseFees = data.bankWiseFees
            self.trigger('read_bank_wise_changed', data.bankWiseFees, getCookie('session_name'))
          }else if(data.status == 'e'){
            showToast("Error in reading data. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
//========read banks===========
  self.on('read_banks', function() {
    console.log('i am in banks api call from ajax')
    let req = {}
    $.ajax({
      url:'/fees_report/read_banks',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            self.banks = data.banks
            self.trigger('read_bank_changed', data.banks, getCookie('session_name'))
          }else if(data.status == 'e'){
            showToast("bank list Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
  //======= read modes =======  
self.on('read_mode', function() {
    console.log('i am in mode api call from ajax')
    let req = {}
    $.ajax({
      url:'/fees_report/read_mode',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            self.modes = data.modes
            self.trigger('read_mode_changed', data.modes, getCookie('session_name'))
          }else if(data.status == 'e'){
            showToast("mode list Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  /*self.dailyFees = []

  self.on('read_daily_fees', function(obj) {
    console.log('i am in read daily fees api call from ajax')
    let req = {}
   
    $.ajax({
      url:'/fees_report/read_daily_fees/'+obj.start_date+'/'+obj.end_date,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.dailyFees = data.dailyFees
            self.trigger('read_monthly_fees_changed', data.dailyFees)
          }else if(data.status == 'e'){
            showToast("Categories Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })*/

self.on('csv_export_month_wise', function(obj){
  let req = {}
  req.data=obj
  $.ajax({
    url:'/fees_report/csv_export_month_wise',
      contentType: "application/json",
      dataType:"json",
      type:'POST',
      data: JSON.stringify(req),
      headers: {"Authorization": getCookie('token')},
      success: function(data){
        console.log(data)
        if(data.status == 's'){
          self.trigger('csv_export_month_wise_changed', data.url)
        }else if(data.status == 'e'){}
      },
      error: function(data){
        //showToast("", data)
    }
  })
})

//============== daily fees export =========
self.on('csv_export_daily_fees', function(obj){
  let req = {}
  req.data=obj
  $.ajax({
    url:'/fees_report/csv_export_daily_fees',
      contentType: "application/json",
      dataType:"json",
      type:'POST',
      data: JSON.stringify(req),
      headers: {"Authorization": getCookie('token')},
      success: function(data){
        console.log(data)
        if(data.status == 's'){
          self.trigger('csv_export_daily_collection_changed', data.url)
        }else if(data.status == 'e'){}
      },
      error: function(data){
        //showToast("", data)
    }
  })
})


self.on('csv_assigned_scheme', function(obj){
  let req = {}
  req.data=obj
  $.ajax({
    url:'/fees_report/csv_assigned_scheme',
      contentType: "application/json",
      dataType:"json",
      type:'POST',
      data: JSON.stringify(req),
      headers: {"Authorization": getCookie('token')},
      success: function(data){
        console.log(data)
        if(data.status == 's'){
          self.trigger('csv_export_assigned_scheme_changed', data.url)
        }else if(data.status == 'e'){}
      },
      error: function(data){
        //showToast("", data)
    }
  })
})

//========== fees register ===========

self.on('csv_fees_register', function(obj){
  console.log("---inside-----")
  let req = {}
  req.data=obj
  $.ajax({
    url:'/fees_report/csv_fees_register',
      contentType: "application/json",
      dataType:"json",
      type:'POST',
      data: JSON.stringify(req),
      headers: {"Authorization": getCookie('token')},
      success: function(data){
        console.log(data)
        if(data.status == 's'){
          self.trigger('csv_export_register_changed', data.url)
        }else if(data.status == 'e'){}
      },
      error: function(data){
        //showToast("", data)
    }
  })
})


self.on('csv_bankwise_collection', function(obj){
  
  let req = {}
  req.data=obj
  $.ajax({
    url:'/fees_report/csv_bankwise_collection',
      contentType: "application/json",
      dataType:"json",
      type:'POST',
      data: JSON.stringify(req),
      headers: {"Authorization": getCookie('token')},
      success: function(data){
        console.log(data)
        if(data.status == 's'){
          self.trigger('csv_export_bank_collection_changed', data.url)
        }else if(data.status == 'e'){}
      },
      error: function(data){
        //showToast("", data)
    }
  })
})

self.on('csv_datewise_fees', function(obj){
  
  let req = {}
  req.data=obj
  $.ajax({
    url:'/fees_report/csv_datewise_fees',
      contentType: "application/json",
      dataType:"json",
      type:'POST',
      data: JSON.stringify(req),
      headers: {"Authorization": getCookie('token')},
      success: function(data){
        console.log(data)
        if(data.status == 's'){
          self.trigger('csv_export_datewise_fees_changed', data.url)
        }else if(data.status == 'e'){}
      },
      error: function(data){
        //showToast("", data)
    }
  })
})


self.on('csv_headwise_summary', function(obj){
  let req = {}
  req.data=obj
  $.ajax({
    url:'/fees_report/csv_headwise_summary',
      contentType: "application/json",
      dataType:"json",
      type:'POST',
      data: JSON.stringify(req),
      headers: {"Authorization": getCookie('token')},
      success: function(data){
        console.log(data)
        if(data.status == 's'){
          self.trigger('csv_export_headwise_summary_changed', data.url)
        }else if(data.status == 'e'){}
      },
      error: function(data){
        //showToast("", data)
    }
  })
})


self.on('csv_headwise_fees', function(obj){
  let req = {}
  req.data=obj
  $.ajax({
    url:'/fees_report/csv_headwise_fees',
      contentType: "application/json",
      dataType:"json",
      type:'POST',
      data: JSON.stringify(req),
      headers: {"Authorization": getCookie('token')},
      success: function(data){
        console.log(data)
        if(data.status == 's'){
          self.trigger('csv_export_headwise_fees_changed', data.url)
        }else if(data.status == 'e'){}
      },
      error: function(data){
        //showToast("", data)
    }
  })
})


self.on('csv_outstanding_fees', function(obj){
  let req = {}
  req.data=obj
  $.ajax({
    url:'/fees_report/csv_outstanding_fees',
      contentType: "application/json",
      dataType:"json",
      type:'POST',
      data: JSON.stringify(req),
      headers: {"Authorization": getCookie('token')},
      success: function(data){
        console.log(data)
        if(data.status == 's'){
          self.trigger('csv_export_outstanding_fees_changed', data.url)
        }else if(data.status == 'e'){}
      },
      error: function(data){
        //showToast("", data)
    }
  })
})

self.on('csv_outstanding_by_class', function(obj){
  let req = {}
  req.data=obj
  $.ajax({
    url:'/fees_report/csv_outstanding_by_class',
      contentType: "application/json",
      dataType:"json",
      type:'POST',
      data: JSON.stringify(req),
      headers: {"Authorization": getCookie('token')},
      success: function(data){
        console.log(data)
        if(data.status == 's'){
          self.trigger('csv_export_outstanding_byclass_changed', data.url)
        }else if(data.status == 'e'){}
      },
      error: function(data){
        //showToast("", data)
    }
  })
})


self.on('csv_dueby_class', function(obj){
  let req = {}
  req.data=obj
  $.ajax({
    url:'/fees_report/csv_dueby_class',
      contentType: "application/json",
      dataType:"json",
      type:'POST',
      data: JSON.stringify(req),
      headers: {"Authorization": getCookie('token')},
      success: function(data){
        console.log(data)
        if(data.status == 's'){
          self.trigger('csv_export_due_byclass_changed', data.url)
        }else if(data.status == 'e'){}
      },
      error: function(data){
        //showToast("", data)
    }
  })
})

self.on('csv_fees_collection', function(obj){
  let req = {}
  req.data=obj
  $.ajax({
    url:'/fees_report/csv_fees_collection',
      contentType: "application/json",
      dataType:"json",
      type:'POST',
      data: JSON.stringify(req),
      headers: {"Authorization": getCookie('token')},
      success: function(data){
        console.log(data)
        if(data.status == 's'){
          self.trigger('csv_export_fees_collection_changed', data.url)
        }else if(data.status == 'e'){}
      },
      error: function(data){
        //showToast("", data)
    }
  })
})


self.on('csv_estimated_fees', function(obj){
  let req = {}
  req.data=obj
  $.ajax({
    url:'/fees_report/csv_estimated_fees',
      contentType: "application/json",
      dataType:"json",
      type:'POST',
      data: JSON.stringify(req),
      headers: {"Authorization": getCookie('token')},
      success: function(data){
        console.log(data)
        if(data.status == 's'){
          self.trigger('csv_export_estimated_fees_changed', data.url)
        }else if(data.status == 'e'){}
      },
      error: function(data){
        //showToast("", data)
    }
  })
})


self.on('csv_advance_fees', function(obj){
  let req = {}
  req.data=obj
  $.ajax({
    url:'/fees_report/csv_advance_fees',
      contentType: "application/json",
      dataType:"json",
      type:'POST',
      data: JSON.stringify(req),
      headers: {"Authorization": getCookie('token')},
      success: function(data){
        console.log(data)
        if(data.status == 's'){
          self.trigger('csv_export_advance_fees_changed', data.url)
        }else if(data.status == 'e'){}
      },
      error: function(data){
        //showToast("", data)
    }
  })
})

self.on('csv_scholarship_list', function(obj){
  let req = {}
  req.data=obj
  $.ajax({
    url:'/fees_report/csv_scholarship_list',
      contentType: "application/json",
      dataType:"json",
      type:'POST',
      data: JSON.stringify(req),
      headers: {"Authorization": getCookie('token')},
      success: function(data){
        console.log(data)
        if(data.status == 's'){
          self.trigger('csv_export_scholarshiplist_changed', data.url)
        }else if(data.status == 'e'){}
      },
      error: function(data){
        //showToast("", data)
    }
  })
})
self.on('csv_issued_letter', function(obj){
  let req = {}
  req.data=obj
  $.ajax({
    url:'/fees_report/csv_issued_letter',
      contentType: "application/json",
      dataType:"json",
      type:'POST',
      data: JSON.stringify(req),
      headers: {"Authorization": getCookie('token')},
      success: function(data){
        console.log(data)
        if(data.status == 's'){
          self.trigger('csv_export_issued_letter_changed', data.url)
        }else if(data.status == 'e'){}
      },
      error: function(data){
        //showToast("", data)
    }
  })
})

self.on('csv_fees_scheme', function(obj){
  let req = {}
  req.data=obj
  $.ajax({
    url:'/fees_report/csv_fees_scheme',
      contentType: "application/json",
      dataType:"json",
      type:'POST',
      data: JSON.stringify(req),
      headers: {"Authorization": getCookie('token')},
      success: function(data){
        console.log(data)
        if(data.status == 's'){
          self.trigger('csv_export_fees_scheme_changed', data.url)
        }else if(data.status == 'e'){}
      },
      error: function(data){
        //showToast("", data)
    }
  })
})
self.on('csv_scheme_unassigned', function(obj){
  let req = {}
  req.data=obj
  $.ajax({
    url:'/fees_report/csv_scheme_unassigned',
      contentType: "application/json",
      dataType:"json",
      type:'POST',
      data: JSON.stringify(req),
      headers: {"Authorization": getCookie('token')},
      success: function(data){
        console.log(data)
        if(data.status == 's'){
          self.trigger('csv_export_fees_scheme_unassigned_changed', data.url)
        }else if(data.status == 'e'){}
      },
      error: function(data){
        //showToast("", data)
    }
  })
})






}
