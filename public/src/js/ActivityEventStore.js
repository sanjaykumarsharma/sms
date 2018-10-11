function ActivityEventStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.events = []

  self.on('read_categories', function() {
    console.log('i am in read_categories api call from ajax')
    let req = {}
    $.ajax({
      url:'/activity_event',
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

  self.on('read_events', function() {
    console.log('i am in read_events api call from ajax')
    let req = {}
    $.ajax({
      url:'/activity_event/read_event',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.events = data.events
            self.trigger('read_event_changed', data.events)
          }else if(data.status == 'e'){
            showToast("Events Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('delete_event', function(event_id) {
    $.ajax({
      url:'/activity_event/delete/'+event_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            let tempEvents = self.events.filter(c => {
              return c.event_id != event_id
            })
            self.events = tempEvents
            toastr.info("Event Deleted Successfully")
            self.trigger('delete_event_changed', self.events)
          }else if(data.status == 'e'){
            showToast("Error Deleting Event. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('edit_event', function(event_name,category_id,event_id) {
    let req = {}
    req.event_name=event_name
    req.category_id=category_id
    req.event_id=event_id
    $.ajax({
      url:'/activity_event/edit/'+event_id,
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            self.events = self.events.map(cat => {
              if(cat.event_id == event_id){
                cat.event_id = event_id
                cat.event_name=event_name
                cat.category_id=category_id
              }
              // cat.confirmEdit = false
              return cat
            })
            toastr.success("Event Updated Successfully ")
            self.trigger('edit_event_changed', self.events)
          }else if(data.status == 'e'){
            showToast("Error updating Event. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
 
  self.on('add_event', function(event_name,category_id) {
    let req = {}
    req.event_name=event_name
    req.category_id=category_id
    $.ajax({
      url:'/activity_event/add',
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            console.log('add event after')
            let obj = {}
            obj.event_id = data.event_id
            obj.event_name = event_name
            obj.category_id = category_id
            self.events = [obj, ...self.events]
            toastr.success("Event Inserserted Successfully ")
            self.trigger('add_event_changed', self.events)
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
