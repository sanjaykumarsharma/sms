function DisciplineCaseStore() {
  riot.observable(this) // Riot provides our Case emitter.
  var self = this

  self.discipline_case = []

  self.on('read_discipline_category', function() {
    console.log('i am in read_categories api call from ajax')
    let req = {}
    $.ajax({
      url:'/discipline_case',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.categories = data.categories
            self.trigger('read_discipline_categories_changed', data.categories)
          }else if(data.status == 'e'){
            showToast("Categories Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('read_discipline_case', function() {
    console.log('i am in add_case api call from ajax')
    let req = {}
    $.ajax({
      url:'/discipline_case/read_case',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.discipline_case = data.discipline_case
            self.trigger('read_discipline_case_changed', data.discipline_case)
          }else if(data.status == 'e'){
            showToast("Error Reading Case. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('delete_discipline_case', function(case_id) {
    $.ajax({
      url:'/discipline_case/delete/'+case_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            let tempCase = self.discipline_case.filter(c => {
              return c.case_id != case_id
            })
            self.discipline_case = tempCase
            toastr.info("Case Deleted Successfully")
            self.trigger('delete_discipline_case_changed', self.discipline_case)
          }else if(data.status == 'e'){
            showToast("Error Deleting Case. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('edit_discipline_case', function(case_name,category_id,case_id) {
    let req = {}
    req.case_name=case_name
    req.category_id=category_id
    req.case_id=case_id
    $.ajax({
      url:'/discipline_case/edit/'+case_id,
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            self.discipline_case = self.discipline_case.map(cat => {
              if(cat.case_id == case_id){
                cat.case_id = case_id
                cat.case_name=case_name
                cat.category_id=category_id
              }
              // cat.confirmEdit = false
              return cat
            })
            toastr.success("Case Updated Successfully ")
            self.trigger('edit_discipline_case_changed', self.discipline_case)
          }else if(data.status == 'e'){
            showToast("Error updating Case. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
 
  self.on('add_discipline_case', function(case_name,category_id) {
    let req = {}
    req.case_name=case_name
    req.category_id=category_id
    $.ajax({
      url:'/discipline_case/add',
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            let obj = {}
            obj.case_id = data.case_id
            obj.case_name = case_name
            obj.category_id = category_id
            self.discipline_case = [obj, ...self.discipline_case]
            toastr.success("Case Inserserted Successfully ")
            self.trigger('add_discipline_case_changed', self.discipline_case)
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
