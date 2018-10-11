function ApplyPlanStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.students = []

  self.on('read_students', function(id) {
    console.log('i am in read Student Plan api call from ajax')
    let req = {}
    $.ajax({
      url:'/apply_fee_plans/readStudents/'+id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.students = data.students
            self.trigger('read_apply_changed', data.students)
          }else if(data.status == 'e'){
            showToast("No data found Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
  //========Read Fee Plan By Standard =========
  self.on('read_plan_standard', function(id) {
    console.log('i am in read Fee  Plan By Standard api call from ajax')
    let req = {}
    $.ajax({
      url:'/apply_fee_plans/readPlanByStandard/'+id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.plans = data.plans
            self.trigger('read_plan_changed', data.plans)
          }else if(data.status == 'e'){
            showToast("No data found Please try again.", data)
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
      url:'/apply_fee_plans/readStandards',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.standards = data.standards
            self.trigger('read_standard_changed', data.standards)
          }else if(data.status == 'e'){
            showToast("Standard Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

    //=====read Sections ===
   
    self.on('read_sections', function() {
    console.log('i am in read sections api call from ajax')
    let req = {}
    $.ajax({
      url:'/apply_fee_plans/readSections',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.sections = data.sections
            self.trigger('read_section_changed', data.sections)
          }else if(data.status == 'e'){
            showToast("Sections Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('apply_fee_plan', function(obj) {
    
    console.log(obj)
    $.ajax({
      url:'/apply_fee_plans/add',
        type:"POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            console.log('add apply plan after')
            /*let obj = {}
            obj.id = data.id
            obj.head = head
            self.feePlans = [obj, ...self.feePlans]*/
            toastr.success("Plan Inserserted Successfully ")
             //self.trigger('ApplyPlanChanged', self.students)
             self.trigger('ApplyPlanChanged')
          }else if(data.status == 'e'){
            showToast("Error adding Item. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  /*=========Remove Plan========*/
  self.on('remove_fee_plan', function(obj) {
    
    console.log(obj)
    $.ajax({
      url:'/apply_fee_plans/remove',
        type:"POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            console.log('remove applied plan after')
            toastr.success("Plan removed Successfully ")
             //self.trigger('ApplyPlanChanged', self.students)
             self.trigger('ApplyPlanChanged')
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
              return c.head_id != id
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
