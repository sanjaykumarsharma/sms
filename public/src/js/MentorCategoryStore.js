function MentorCategoryStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.mentor_categories = []

  self.on('csv_export_mentor_category', function() {
    let req = {}
    $.ajax({
      url:'/mentor_category/csv_export_mentor_category',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            
          }else if(data.status == 'e'){}
        },
        error: function(data){
          //showToast("", data)
      }
    })
  })

  self.on('read_mentor_category', function() {
    console.log('i am in read_courses api call from ajax')
    let req = {}
    $.ajax({
      url:'/mentor_category',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.mentor_categories = data.mentor_categories
            self.trigger('mentor_category_changed', data.mentor_categories)
          }else if(data.status == 'e'){
            showToast("Items Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('delete_mentor_category', function(category_id) {
    $.ajax({
      url:'/mentor_category/delete/'+category_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            let tempMentorCategories = self.mentor_categories.filter(c => {
              return c.category_id != category_id
            })
            self.mentor_categories = tempMentorCategories
            toastr.info("Category Deleted Successfully")
            self.trigger('mentor_category_changed', self.mentor_categories)
          }else if(data.status == 'e'){
            showToast("Error Deleting Item. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('edit_mentor_category', function(category_name,category_id) {
    let req = {}
    req.category_name=category_name
    req.category_id=category_id
    $.ajax({
      url:'/mentor_category/edit/'+category_id,
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            self.mentor_categories = self.mentor_categories.map(cat => {
              if(cat.category_id == category_id){
                cat.category_id = category_id
                cat.category_name=category_name
              }
              // cat.confirmEdit = false
              return cat
            })
            toastr.success("Category Updated Successfully ")
            self.trigger('mentor_category_changed', self.mentor_categories)
          }else if(data.status == 'e'){
            showToast("Error updating Item. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
 
  self.on('add_mentor_category', function(category_name) {
    let req = {}
    req.category_name=category_name
    $.ajax({
      url:'/mentor_category/add',
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
            self.mentor_categories = [obj, ...self.mentor_categories]
            toastr.success("Category Inserserted Successfully ")
            self.trigger('mentor_category_changed', self.mentor_categories)
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
