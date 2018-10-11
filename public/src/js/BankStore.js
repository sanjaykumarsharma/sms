function BankStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.banks = []

  self.on('read_bank', function() {
    console.log('i am in read_categories api call from ajax')
    let req = {}
    $.ajax({
      url:'/bank',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.banks = data.banks
            self.trigger('read_bank_changed', data.banks)
          }else if(data.status == 'e'){
            showToast("Bank Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('add', function(bank_account_no,bank_name,branch) {
    let req = {}
    req.bank_account_no=bank_account_no
    req.bank_name=bank_name
    req.branch=branch
    $.ajax({
      url:'/bank/add',
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            console.log('add event after')
            let obj = {}
            obj.id = data.id
            obj.bank_account_no = bank_account_no
            obj.bank_name = bank_name
            obj.branch = branch
            self.banks = [obj, ...self.banks]
            toastr.success("Session Inserserted Successfully ")
            self.trigger('add_bank_changed', self.banks)
          }else if(data.status == 'e'){
            showToast("Invalid Username or password. Please try again.", data)
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
