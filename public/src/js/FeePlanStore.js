function FeePlanStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.feePlans = []

  self.on('read_fee_plans', function() {
    console.log('i am in read Fee Plan api call from ajax')
    let req = {}
    $.ajax({
      url:'/fee_plans',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.feePlans = data.feePlans
            self.trigger('fee_plan_changed', data.feePlans)
          }else if(data.status == 'e'){
            showToast("Items Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
  /*======== Read Fee Heads =======*/
  self.on('read_heads', function(){
    console.log('i am in read heads api call from ajax')
    let req = {}
    $.ajax({
      url:'/fee_heads',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.heads = data.heads
            self.trigger('heads_changed', data.heads)
          }else if(data.status == 'e'){
            showToast("Items Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
  /*======== Read Fee Slip for edit ====*/
  self.on('read_fee_slip_edit', function(id){
    console.log('i am in read Fee Slip Edit  api call from ajax')
    let req = {}
    $.ajax({
      url:'/fee_plans/readSlipEdit/'+id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.feeSlipEditHeads = data.feeSlipEditHeads
            console.log("======Head====")
            console.log(data.feeSlipEditHeads)
            self.trigger('fee_slip_read_edit_changed', data.feeSlipEditHeads)
            
          }else if(data.status == 'e'){
            showToast("No data found Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
  /*====== Read Fee Slips */
  self.on('read_slips', function() {
    console.log('i am in read slips api call from ajax')
    let req = {}
    $.ajax({
      url:'/fee_slips',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.slips = data.slips
            self.trigger('slips_changed', data.slips)
          }else if(data.status == 'e'){
            showToast("Slip Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
//=====read Standards ===
   
    self.on('read_standards', function() {
    console.log('i am in read Standards api call from ajax')
    let req = {}
    $.ajax({
      url:'/fee_plans/readStandards',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.standards = data.standards
            self.trigger('read_standard_changed', data.standards)
          }else if(data.status == 'e'){
            showToast("Items Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

//============= Fee Slip Head =========    
self.on('read_fee_slip_head', function(id){
    console.log('i am in read Fee Slip Head  api call from ajax')
    let req = {}
    $.ajax({
      url:'/fee_plans/readFeeSlips/'+id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            if(data.feeSlipHeads.length>0){
            self.feeSlipHeads = data.feeSlipHeads
            self.trigger('fee_slip_head_changed', data.feeSlipHeads)
            }else{
              showToast("Map Fee Head first and try again.", data)  
            }
          }else if(data.status == 'e'){
            showToast("No data found Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
//=========== Add add_head_amount=============
  self.on('add_head_amount', function(obj) {
    
    console.log(obj)
    $.ajax({
      url:'/fee_plans/addHeadAmount',
        type:"POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            console.log('add head amount after')
            //let obj = {}
            /*obj.id = data.id
            obj.head = head*/
            //self.feePlans = [obj, ...self.feePlans]
            toastr.success("head amount  Inserserted Successfully, wish to insert more")
            self.trigger('map_fee_head_changed')
          }else if(data.status == 'e'){
            showToast("Error in Mapping Heads. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

//=========== Add add_head_amount=============
  self.on('edit_head_amount', function(obj) {
    $.ajax({
      url:'/fee_plans/editHeadAmount/'+obj.fee_slip_id,
        type:"POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            toastr.success("head amount  updated Successfully, wish to insert more")
            self.trigger('map_fee_head_changed')
          }else if(data.status == 'e'){
            showToast("Error in Mapping Heads. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
/*========== end add head amount ===========*/

  self.on('add_plan', function(obj) {
    
    console.log(obj)
    $.ajax({
      url:'/fee_plans/add',
        type:"POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            console.log('add plan after')
            let obj = {}
            /*obj.id = data.id
            obj.head = head*/
            self.feePlans = [obj, ...self.feePlans]
            toastr.success("Plan Inserserted Successfully ")
            self.trigger('add_fee_plan_changed', self.feePlans)
          }else if(data.status == 'e'){
            showToast("Error adding Item. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('delete_plan', function(id) {
    $.ajax({
      url:'/fee_plans/delete/'+id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            let tempPlans = self.feePlans.filter(c => {
              return c.fee_plan_id != id
            })
            self.feePlans = tempPlans
            toastr.info("Fee Plan Deleted Successfully")
            self.trigger('fee_plan_changed', self.feePlans)
          }else if(data.status == 'e'){
            showToast("Error Deleting Plan. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
  //==== delete fee slip id =====
  self.on('delete_fee_slip', function(id) {
    $.ajax({
      url:'/fee_plans/delete_fee_slip/'+id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            
            //self.feePlans = tempPlans
            toastr.info("Fee Slip Deleted Successfully")
            self.trigger('fee_slip_delete_changed')
          }else if(data.status == 'e'){
            showToast("Error Deleting Plan. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('edit_head', function(head,id) {
    let req = {}
    req.head=head
    req.head_id=id
    $.ajax({
      url:'/fee_heads/edit/'+id,
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            self.heads = self.heads.map(cat => {
              if(cat.head_id == id){
                cat.head_id = id
                cat.head=head
              }
              // cat.confirmEdit = false
              return cat
            })
            toastr.success("Category Updated Successfully ")
            self.trigger('heads_changed', self.heads)
          }else if(data.status == 'e'){
            showToast("Error updating Item. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
 


}
