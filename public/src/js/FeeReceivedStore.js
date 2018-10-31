function FeeReceivedStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.students = []

//========= read Fine ========
self.on('read_fine', function() {
    console.log('i am in read_fine api call from ajax')
    let req = {}
    $.ajax({
      url:'/receive_fees',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
         
          if(data.status == 's'){
            self.fines = data.fines
            self.trigger('read_fine_changed', data.fines)
          }else if(data.status == 'e'){
            showToast("Fine Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

//========== read fee slip by students ===
self.on('read_fee_plan', function(student_id) {
    console.log('i am in read fee fee plan api call from ajax')
    let req = {}
    $.ajax({
      url:'/receive_fees/read_fee_plan/'+student_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.fee_plans = data.fee_plans
            self.trigger('read_fee_plan_changed', data.fee_plans)
          }else if(data.status == 'e'){
            showToast("No data found Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
//========read_transaction========
self.on('read_transaction', function(student_id) {
    console.log('i am in read Fees Trancation api call from ajax')
    let req = {}
    $.ajax({
      url:'/receive_fees/read_transaction/'+student_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){

          if(data.status == 's'){
          
            self.transactions = data.transactions
            self.trigger('read_transaction_changed', data.transactions)
          }else if(data.status == 'e'){
            showToast("No tranaction available.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
//=====read student ====
self.on('read_student', function(enrol) {
    console.log('i am in read Student for Receiving Fees api call from ajax')
    let req = {}
    $.ajax({
      url:'/receive_fees/read_student/'+enrol,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.students = data.students
            self.trigger('read_student_changed', data.students)
          }else if(data.status == 'e'){
            showToast("No data found Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
//========== read fee slip by students ===
self.on('read_fee_slip', function(student_id) {
    console.log('i am in read fee fee slip api call from ajax')
    let req = {}
    $.ajax({
      url:'/receive_fees/read_fee_slip/'+student_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.fee_slips = data.fee_slips
            self.trigger('read_feeslip_changed', data.fee_slips)
          }else if(data.status == 'e'){
            showToast("No data found Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })


  self.on('add_fees', function(obj) {
    
    $.ajax({
      url:'/receive_fees/add',
        type:"POST",
        async:false,
        data: JSON.stringify(obj),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            console.log('success')
            
            toastr.success("Fee Received Successfully")
            self.trigger('add_fees_changed')
          }else if(data.status == 'e'){
            showToast("Error in Mapping Heads. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })


  self.on('delete_transaction', function(id) {
    $.ajax({
      url:'/receive_fees/delete/'+id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            let tempTransaction = self.transactions.filter(c => {
              return c.receipt_id != id
            })
            self.transactions = tempTransaction
            toastr.info("transaction Deleted Successfully")
            self.trigger('delete_transaction_changed', self.transactions)
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
