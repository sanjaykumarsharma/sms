function ActivityStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.events = []

  self.on('read_categories', function() {
    console.log('i am in read_categories api call from ajax')
    let req = {}
    $.ajax({
      url:'/activity',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.categories = data.categories
            self.trigger('read_categories_changed', data.categories)
          }else if(data.status == 'e'){
            showToast("Categories Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
  self.on('read_activity_by_category', function(obj) {
    console.log('i am in read_activity_by_category api call from ajax')
    let req = {}
    req.category_id=obj.category_id
    $.ajax({
      url:'/activity/read_activity_by_category/'+obj.category_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.activities = data.activities
            self.trigger('read_activity_by_category_changed', data.activities)
          }else if(data.status == 'e'){
            showToast("Activities Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('read_events_by_category', function(category_id) {
    console.log('i am in read_events_by_category api call from ajax')
    console.log(category_id)
    let req = {}
    $.ajax({
      url:'/activity/read_event/'+category_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.events = data.events
            self.trigger('read_events_by_category_changed', data.events)
          }else if(data.status == 'e'){
            showToast("Events Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('read_items', function() {
    console.log('i am in read_events_by_category api call from ajax')
    let req = {}
    $.ajax({
      url:'/activity/read_item',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.items = data.items
            self.trigger('read_items_changed', data.items)
          }else if(data.status == 'e'){
            showToast("Events Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('read_staff', function() {
    console.log('i am in read_events_by_category api call from ajax')
    let req = {}
    $.ajax({
      url:'/activity/read_staff',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.staff = data.staff
            self.trigger('read_staff_changed', data.staff)
          }else if(data.status == 'e'){
            showToast("Staff Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('read_categories', function() {
    console.log('i am in read_categories api call from ajax')
    let req = {}
    $.ajax({
      url:'/activity',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.categories = data.categories
            self.trigger('read_categories_changed', data.categories)
          }else if(data.status == 'e'){
            showToast("Categories Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('add_activity', function(obj) {
    console.log(obj)
    $.ajax({
      url:'/activity/add',
        type:"POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            console.log('add activity after')
            toastr.success("Successfully Inserted")
            self.trigger('add_activity_changed', self.activities)
          }else if(data.status == 'e'){
            showToast("Error adding Employee. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('read_data_for_update', function(activity_id) {
    console.log('i am in read_data_for_update api call from ajax')
    console.log(activity_id)
    let req = {}
    $.ajax({
      url:'/activity/read_update_activity/'+activity_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.update_activity = data.update_activity
            self.trigger('read_data_for_update_changed', data.update_activity, data.update_employee_activity)
          }else if(data.status == 'e'){
            showToast("Events Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

}
