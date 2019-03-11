function ActivityStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.events = []

  self.on('read_activity_categories', function() {
    console.log('i am in read_categories api call from ajax')
    let req = {}
    $.ajax({
      url:'/activity_detail',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('read_activity_categories_changed', data.categories)
          }else if(data.status == 'e'){
            showToast("Categories Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('read_activity_event', function() {
    let req = {}
  
    $.ajax({
      url:'/activity_detail/read_activity_event',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('read_activity_event_changed', data.activity_event)
          }else if(data.status == 'e'){
            showToast("Event Read Error. Please try again.", data)
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
      url:'/activity_detail/read_activity_by_category/'+obj.category_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.activities = data.activities
            self.trigger('read_activity_by_category_changed', data.activities,getCookie('session_name'))
          }else if(data.status == 'e'){
            showToast("Activities Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('csv_export_activity', function(obj) {
    console.log('i am in csv_export_activity api call from ajax')
    let req = {}
    req.category_id=obj.category_id
    $.ajax({
      url:'/activity_detail/csv_export_activity/'+obj.category_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('csv_export_activity_changed', data.url)
          }else if(data.status == 'e'){
            
          }
        },
        error: function(data){
          //showToast("", data)
        }
      })
  })

  self.on('read_print_event_detail', function(activity_id) {
    console.log('i am in read_data_for_update api call from ajax')
    console.log(activity_id)
    let req = {}
    $.ajax({
      url:'/activity_detail/read_print_event_detail/'+activity_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('read_print_event_detail_changed', data.print_event_detail,data.teacher)
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
      url:'/activity_detail/read_item',
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
      url:'/activity_detail/read_staff',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
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

  self.on('add_activity', function(obj) {
    console.log(obj)
    $.ajax({
      url:'/activity_detail/add',
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

  self.on('edit_activity', function(obj,activity_id) {
    let req = {}
    console.log(obj)
    console.log(activity_id)
    req.activity_id=activity_id
    $.ajax({
      url:'/activity_detail/edit_activity/'+activity_id,
        type:"POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            toastr.success("Successfully Update")
            self.trigger('edit_activity_changed')
          }else if(data.status == 'e'){
            showToast("Error Updating Student. Please try again.", data)
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
      url:'/activity_detail/read_update_activity/'+activity_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.update_activity = data.update_activity
            self.trigger('read_data_for_update_changed', data.update_activity, data.employees,data.techer_in_charge)
          }else if(data.status == 'e'){
            showToast("Events Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('read_classes', function() {
    let req = {}
    $.ajax({
      url:'/activity_detail/standard',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('read_classes_changed', data.standards)
          }else if(data.status == 'e'){
            showToast("standards Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('read_section', function() {
    let req = {}
    $.ajax({
      url:'/activity_detail/section',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('read_section_changed', data.sections)
          }else if(data.status == 'e'){
            showToast("section Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
  self.on('delete_activity', function(activity_id) {
    $.ajax({
      url:'/activity_detail/delete_activity/'+activity_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            /*let tempcaseDetails = self.delete_case_details.filter(c => {
              return c.id != id
            })
            self.delete_case_details = tempcaseDetails*/
            toastr.success("Successfully Deleted")
            self.trigger('delete_activity_changed')
          }else if(data.status == 'e'){
            showToast("Error Deleting Activity. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('read_students', function(activity_id,standard_id,section_id) {
    let req = {}
    $.ajax({
      url:'/activity_detail/students/'+activity_id+'/'+standard_id+'/'+section_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('read_students_changed', data.freeStudents, data.assignedStudents)
          }else if(data.status == 'e'){
            showToast("House Read Error. Please try again.", data.messaage)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('assign_students', function(activity_id,students) {
    var obj = {}
    obj['activity_id'] = activity_id
    obj['students'] = students
    $.ajax({
      url:'/activity_detail/assign_students/',
        type:"POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            toastr.success("Students assigned successfully ")
            self.trigger('assign_students_changed', students) 
          }else if(data.status == 'e'){
            showToast("Error assigning students. Please try again.", data.messaage)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('free_up_student', function(activity_id,students) {
    var obj = {}
    obj['activity_id'] = activity_id
    obj['students'] = students
    $.ajax({
      url:'/activity_detail/free_up_student/',
        type:"POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            
            toastr.success("Students freed successfully ")
            self.trigger('assign_students_changed', students) 
          }else if(data.status == 'e'){
            showToast("Error while free up students. Please try again.", data.messaage)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

}
