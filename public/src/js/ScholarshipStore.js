function ScholarshipStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.banks = []

  self.on('read_scholar_student', function() {
    console.log('i am in scholar students api call from ajax')
    let req = {}
    $.ajax({
      url:'/scholarship',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.students = data.students
            self.trigger('read_scholar_student_changed', data.students)
          }else if(data.status == 'e'){
            showToast("Scholar Students Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

//=====read student ====
self.on('read_student', function(enrol) {
    console.log('i am in read Student for scholar api call from ajax')
    let req = {}
    $.ajax({
      url:'/scholarship/read_student/'+enrol,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.scholarStudent = data.student
            self.trigger('read_student_changed', data.student,getCookie('session_id'))
          }else if(data.status == 'e'){
            showToast("No data found Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
//========== read feeslip students ===
self.on('read_scholarship_slip', function(student_id) {
    console.log('i am in read scholar fee slip api call from ajax')
    let req = {}
    $.ajax({
      url:'/scholarship/read_fee_slip/'+student_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.scholarSlips = data.scholarSlips
            self.trigger('read_scholar_feeslip_changed', data.scholarSlips)
          }else if(data.status == 'e'){
            showToast("No data found Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })


  self.on('add_scholarship_amount', function(obj) {
    console.log("inside add")
    console.log(obj)
    $.ajax({
      url:'/scholarship/add',
        type:"POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            console.log('scholarship after')
            
            toastr.success("Scholarship  Inserserted Successfully, wish to insert more")
            self.trigger('add_scholarship_head_changed')
          }else if(data.status == 'e'){
            showToast("Error in Mapping Heads. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('bank_edit', function(bank_account_no,bank_name,branch,bank_ac_no) {
    let req = {}
    req.bank_account_no=bank_account_no
    req.bank_name=bank_name
    req.branch=branch
    req.bank_ac_no=bank_ac_no
    $.ajax({
      url:'/bank/edit/'+bank_ac_no,
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            self.banks = self.banks.map(cat => {
              if(cat.bank_account_no == bank_ac_no){
                cat.bank_ac_no = bank_ac_no
                cat.bank_account_no=bank_account_no
                cat.bank_name=bank_name
                cat.branch=branch
              }
              // cat.confirmEdit = false
              return cat
            })
            toastr.success("Session Updated Successfully ")
            self.trigger('bank_edit_changed', self.banks)
          }else if(data.status == 'e'){
            showToast("Error updating Event. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('delete', function(bank_account_no) {
    $.ajax({
      url:'/bank/delete/'+bank_account_no,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            let tempSession = self.banks.filter(c => {
              return c.bank_account_no != bank_account_no
            })
            self.banks = tempSession
            toastr.info("Session Deleted Successfully")
            self.trigger('delete_event_changed', self.banks)
          }else if(data.status == 'e'){
            showToast("Error Deleting Event. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })


}
