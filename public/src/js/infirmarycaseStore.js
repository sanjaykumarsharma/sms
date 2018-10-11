function InfirmaryCaseStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.infirmaryCases = []
  self.infirmaryCategories=[];
  self.on('read_infirmary_category', function() {
    console.log('i am in read_sections api call from ajax')
    let req = {}
    $.ajax({
      url:'/infirmary_case/readInfirmaryCategory',
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

  self.on('read_infirmary_case', function() {
    console.log('i am in read_section api call from ajax')
    let req = {}
    $.ajax({
      url:'/infirmary_case/read_infirmary_case',
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

  self.on('delete_infirmary_case', function(id) {
    $.ajax({
      url:'/infirmary_case/delete/'+id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            let tempInfarmaryCases = self.infirmaryCases.filter(c => {
              return c.case_id != id
            })
            self.infirmaryCases = tempInfarmaryCases
            toastr.info("Case Deleted Successfully")
            self.trigger('delete_infirmary_case_changed', self.infirmaryCases)
          }else if(data.status == 'e'){
            showToast("Error Deleting Case. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('edit_infirmary_case', function(case_name,category_id,id) {
    let req = {}
    req.case_name=case_name
    req.category_id=category_id
    req.id=id
    $.ajax({
      url:'/infirmary_case/edit/'+id,
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            self.infirmaryCases = self.infirmaryCases.map(cat => {
              if(cat.case_id == id){
                cat.case_id =id
                cat.case_name=case_name
                cat.category_id=category_id
                //cat.standard_id=standard_id
              }
              // cat.confirmEdit = false
              return cat
            })
            toastr.success("Case Updated Successfully ")
            self.trigger('edit_infirmary_case_changed', self.infirmaryCases)
          }else if(data.status == 'e'){
            showToast("Error updating Case. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
 
  self.on('add_infirmary_case', function(case_name,category_id) {
    let req = {}
    req.case_name=case_name
    req.category_id=category_id
    $.ajax({
      url:'/infirmary_case/add',
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
            obj.case_id = data.case_id
            obj.case_name = case_name
            obj.category_id = category_id
           // obj.name = name
            self.infirmaryCases = [obj, ...self.infirmaryCases]
            toastr.success("Case  Inserserted Successfully ")
            self.trigger('add_infirmary_case_changed', self.infirmaryCases)
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
