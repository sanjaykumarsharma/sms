function InfirmaryCategoryStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.infirmaryCategories = []


  self.on('csv_export_infirmary_category', function(obj) {
    let req = {}
    req.data=obj
    $.ajax({
      url:'/infirmary_category/csv_export_infirmary_category',
        contentType: "application/json",
        dataType:"json",
        type:'POST',
        data: JSON.stringify(req),
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('csv_export_infirmary_category_changed', data.url)
          }else if(data.status == 'e'){
            
          }
        },
        error: function(data){
          //showToast("", data)
        }
      })
  })

  self.on('read_categories', function() {
    console.log('i am in read_courses api call from ajax')
    let req = {}
    $.ajax({
      url:'/infirmary_category',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.infirmaryCategories = data.infirmaryCategories
            self.trigger('categories_changed', data.infirmaryCategories)
          }else if(data.status == 'e'){
            showToast("Items Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('delete_category', function(id) {
    $.ajax({
      url:'/infirmary_category/delete/'+id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            let tempCategories = self.infirmaryCategories.filter(c => {
              return c.category_id != id
            })
            self.infirmaryCategories = tempCategories
            toastr.info("Category Deleted Successfully")
            self.trigger('categories_changed', self.infirmaryCategories)
          }else if(data.status == 'e'){
            showToast("Error Deleting Category. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('edit_category', function(category_name,id) {
    let req = {}
    req.category_name=category_name
    req.id=id
    $.ajax({
      url:'/infirmary_category/edit/'+id,
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            self.infirmaryCategories = self.infirmaryCategories.map(cat => {
              if(cat.category_id == id){
                cat.category_id = id
                cat.category_name=category_name
              }
              // cat.confirmEdit = false
              return cat
            })
            toastr.success("Category Updated Successfully ")
            self.trigger('categories_changed', self.infirmaryCategories)
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
      url:'/infirmary_category/add',
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
            obj.category_id = data.id
            obj.category_name = category_name
            self.infirmaryCategories = [obj, ...self.infirmaryCategories]
            toastr.success("Category Inserserted Successfully ")
            self.trigger('categories_changed', self.infirmaryCategories)
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
