function CategoryStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.categories = []

  self.on('read_categories', function() {
    console.log('i am in read_courses api call from ajax')
    let req = {}
    $.ajax({
      url:'/category',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.categories = data.categories
            self.trigger('categories_changed', data.categories)
          }else if(data.status == 'e'){
            showToast("Items Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
  
  self.on('csv_export_category', function() {
    console.log('i am in csv_export_category api call from ajax')
    let req = {}
    $.ajax({
      url:'/category/csv_export_category',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('csv_export_category_changed', data.url)
          }else if(data.status == 'e'){}
        },
        error: function(data){
          //showToast("", data)
      }
    })
  })
  self.on('delete_category', function(category_id) {
    $.ajax({
      url:'/category/delete/'+category_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            let tempCategories = self.categories.filter(c => {
              return c.category_id != category_id
            })
            self.categories = tempCategories
            toastr.info("Category Deleted Successfully")
            self.trigger('categories_changed', self.categories)
          }else if(data.status == 'e'){
            showToast("Error Deleting Category. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('edit_category', function(category_name,category_id) {
    let req = {}
    req.category_name=category_name
    req.category_id=category_id
    $.ajax({
      url:'/category/edit/'+category_id,
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            self.categories = self.categories.map(cat => {
              if(cat.category_id == category_id){
                cat.category_id = category_id
                cat.category_name=category_name
              }
              // cat.confirmEdit = false
              return cat
            })
            toastr.success("Category Updated Successfully ")
            self.trigger('categories_changed', self.categories)
          }else if(data.status == 'e'){
            showToast("Error updating Item. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
 
  self.on('add_category', function(category_name) {
    let req = {}
    req.category_name=category_name
    $.ajax({
      url:'/category/add',
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            console.log('add category after')
            let obj = {}
            obj.category_id = data.category_id
            obj.category_name = category_name
            self.categories = [obj, ...self.categories]
            toastr.success("Category Inserserted Successfully ")
            self.trigger('categories_changed', self.categories)
          }else if(data.status == 'e'){
            showToast("Error adding Item. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

}
