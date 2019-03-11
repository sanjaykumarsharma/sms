function NewEventStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.newEvents = []

  self.on('read_event_type', function() {
    console.log('i am in read_sections api call from ajax')
    let req = {}
    $.ajax({
      url:'/new_event/readEventType',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.eventTypes = data.eventTypes
            self.trigger('read_event_type_changed', data.eventTypes)
          }else if(data.status == 'e'){
            showToast("section Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('csv_export_new_event', function() {
    console.log('i am in csv_export_new_event api call from ajax')
    let req = {}
    $.ajax({
      url:'/new_event/csv_export_new_event',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('csv_export_new_event_changed', data.url)
          }else if(data.status == 'e'){}
        },
        error: function(data){
          //showToast("", data)
      }
    })
  })

  self.on('read_new_event', function() {
    console.log('i am in read_new_event api call from ajax')
    let req = {}
    $.ajax({
      url:'/new_event/read_new_event',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            console.log("inside read")
            self.newEvents = data.newEvents
            self.trigger('read_new_event_changed', data.newEvents)
          }else if(data.status == 'e'){
            showToast("Event Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('delete_new_event', function(id) {
    $.ajax({
      url:'/new_event/delete/'+id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            let tempNewEvents = self.newEvents.filter(c => {
              return c.event_id != id
            })
            self.newEvents = tempNewEvents
            toastr.info("Event Deleted Successfully")
            self.trigger('delete_new_event_changed', self.newEvents)
          }else if(data.status == 'e'){
            showToast("Error Deleting Event. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('edit_new_event', function(event_type_id,event_name,start_date,end_date,detail,holiday,id) {
    let req = {}
    req.event_type_id=event_type_id,
    req.event_name=event_name,
    req.start_date=start_date,
    req.end_date=end_date,
    req.detail=detail,
    req.holiday=holiday,
    req.id=id
    $.ajax({
      url:'/new_event/edit/'+id,
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            self.newEvents = self.newEvents.map(cat => {
              if(cat.event_id == id){
                cat.event_id = data.event_id
                cat.event_name = event_name
                cat.event_type_id = event_type_id
                cat.start_date = start_date
                cat.end_date = end_date
                cat.detail = detail
                //cat.standard_id=standard_id
              }
              // cat.confirmEdit = false
              return cat
            })
            toastr.success("Event Updated Successfully ")
            self.trigger('edit_new_event_changed', self.newEvents)
          }else if(data.status == 'e'){
            showToast("Error updating events. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
 
  self.on('add_new_event', function(event_type_id,event_name,start_date,end_date,detail,holiday) {
    let req = {}
    req.event_type_id=event_type_id,
    req.event_name=event_name,
    req.start_date=start_date,
    req.end_date=end_date,
    req.detail=detail,
    req.holiday=holiday,
    $.ajax({
      url:'/new_event/add',
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
            obj.event_type_id = event_type_id
            obj.start_date = start_date
            obj.end_date = end_date
            obj.detail = detail
           // obj.name = name
            self.newEvents = [obj, ...self.newEvents]
            toastr.success("event Inserserted Successfully ")
            self.trigger('add_new_event_changed', self.newEvents)
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
