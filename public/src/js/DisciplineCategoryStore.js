function DisciplineCategoryStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.discipline_categories = []

  self.on('csv_export_discipline_category', function(obj) {
    let req = {}
    req.data=obj
    $.ajax({
      url:'/discipline_category/csv_export_discipline_category',
        contentType: "application/json",
        dataType:"json",
        type:'POST',
        data: JSON.stringify(req),
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('csv_export_discipline_category_changed', data.url)
          }else if(data.status == 'e'){}
        },
        error: function(data){
          //showToast("", data)
      }
    })
  })

  self.on('read_discipline_category', function() {
    console.log('i am in read_courses api call from ajax')
    let req = {}
    $.ajax({
      url:'/discipline_category',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.discipline_categories = data.discipline_categories
            self.trigger('discipline_category_changed', data.discipline_categories)
          }else if(data.status == 'e'){
            showToast("Category Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('delete_discipline_category', function(category_id) {
    $.ajax({
      url:'/discipline_category/delete/'+category_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            let tempDisciplineCategories = self.discipline_categories.filter(c => {
              return c.category_id != category_id
            })
            self.discipline_categories = tempDisciplineCategories
            toastr.info("Category Deleted Successfully")
            self.trigger('discipline_category_changed', self.discipline_categories)
          }else if(data.status == 'e'){
            showToast("Error Deleting Category. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('edit_discipline_category', function(category_name,category_id) {
    let req = {}
    req.category_name=category_name
    req.category_id=category_id
    $.ajax({
      url:'/discipline_category/edit/'+category_id,
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            self.discipline_categories = self.discipline_categories.map(cat => {
              if(cat.category_id == category_id){
                cat.category_id = category_id
                cat.category_name=category_name
              }
              // cat.confirmEdit = false
              return cat
            })
            toastr.success("Category Updated Successfully ")
            self.trigger('discipline_category_changed', self.discipline_categories)
          }else if(data.status == 'e'){
            showToast("Error updating Category. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
 
  self.on('add_discipline_category', function(category_name) {
    let req = {}
    req.category_name=category_name
    $.ajax({
      url:'/discipline_category/add',
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            console.log('add item after')
            let obj = {}
            obj.category_id = data.category_id
            obj.category_name = category_name
            self.discipline_categories = [obj, ...self.discipline_categories]
            toastr.success("Category Inserserted Successfully ")
            self.trigger('discipline_category_changed', self.discipline_categories)
          }else if(data.status == 'e'){
            showToast("Error adding Category. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

}
