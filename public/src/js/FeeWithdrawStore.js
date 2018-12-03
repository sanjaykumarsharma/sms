function FeeWithdrawStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.students = []


  //========== read fee slip by students ===
  self.on('read_fee_slip', function(student_id) {
    console.log('i am in read fee fee slip api call from ajax')
    let req = {}
    $.ajax({
      url:'/fees_withdraw/read_fee_slip/'+student_id,
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

  //=====read student ====
  self.on('read_student', function(enrol) {
    console.log('i am in read Student for Receiving Fees api call from ajax')
    let req = {}
    $.ajax({
      url:'/fees_withdraw/read_student/'+enrol,
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

  self.on('active_fees', function(fee_slip_id,student_id) {
    let req = {}
    req.fee_slip_id=fee_slip_id
    req.student_id=student_id
    $.ajax({
      url:'/fees_withdraw/active_fees/'+fee_slip_id+'/'+student_id,
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            toastr.success("Fees Active successfully ")
            self.trigger('active_fees_changed') 
          }else if(data.status == 'e'){
            showToast("Error assigning students. Please try again.", data.messaage)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })


}
