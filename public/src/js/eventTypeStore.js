function EventTypeStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.eventTypes = []

  self.on('read_eventTypes', function() {
    console.log('i am in read_event Types api call from ajax')
    let req = {}
    $.ajax({
      url:'/event_type',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.eventTypes = data.eventTypes
            self.trigger('eventTypes_changed', data.eventTypes)
          }else if(data.status == 'e'){
            showToast("Items Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('delete_eventType', function(id) {
    $.ajax({
      url:'/event_type/delete/'+id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            let tempEventTypes = self.eventTypes.filter(c => {
              return c.event_type_id != id
            })
            self.eventTypes = tempEventTypes
            toastr.info("Item Deleted Successfully")
            self.trigger('eventTypes_changed', self.eventTypes)
          }else if(data.status == 'e'){
            showToast("Error Deleting Item. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('edit_eventType', function(event_type,id) {
    let req = {}
    req.event_type=event_type
    req.id=id
    $.ajax({
      url:'/event_type/edit/'+id,
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            self.eventTypes = self.eventTypes.map(cat => {
              if(cat.event_type_id == id){
                cat.event_type_id = id
                cat.event_type=event_type
              }
              // cat.confirmEdit = false
              return cat
            })
            toastr.success("Event Type Updated Successfully ")
            self.trigger('eventTypes_changed', self.eventTypes)
          }else if(data.status == 'e'){
            showToast("Error updating Event Type. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
 
  self.on('add_eventType', function(event_type) {
    let req = {}
    req.event_type=event_type
    $.ajax({
      url:'/event_type/add',
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            console.log('add Event type after')
            let obj = {}
            obj.event_type_id = data.event_type_id
            obj.event_type = event_type
            self.eventTypes = [obj, ...self.eventTypes]
            toastr.success("Event Type Inserserted Successfully ")
            self.trigger('eventTypes_changed', self.eventTypes)
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
