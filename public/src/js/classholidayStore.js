function ClassHolidayStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.classHolidays = []

  self.on('read_standard', function() {
    console.log('i am in standard api call from ajax')
    let req = {}
    $.ajax({
      url:'/class_holiday/readStandard',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.standards = data.standards
            self.trigger('read_standard_changed', data.standards)
          }else if(data.status == 'e'){
            showToast("section Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
  self.on('csv_export_class_holiday', function() {
    console.log('i am in csv_export_class_holiday api call from ajax')
    let req = {}
    $.ajax({
      url:'/class_holiday/csv_export_class_holiday',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('csv_export_class_holiday_changed', data.url)
          }else if(data.status == 'e'){}
        },
        error: function(data){
          //showToast("", data)
      }
    })
  })

  self.on('read_class_holiday', function() {
    console.log('i am in read_class_holiday api call from ajax')
    let req = {}
    $.ajax({
      url:'/class_holiday/read_class_holiday',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            console.log("inside read")
            self.classHolidays = data.classHolidays
            self.trigger('read_class_holiday_changed', data.classHolidays)
          }else if(data.status == 'e'){
            showToast("Event Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('delete_class_holiday', function(id) {
    $.ajax({
      url:'/class_holiday/delete/'+id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            let tempClassHolidays = self.classHolidays.filter(c => {
              return c.event_id != id
            })
            self.classHolidays = tempClassHolidays
            toastr.info("Event Deleted Successfully")
            self.trigger('delete_class_holiday_changed', self.classHolidays)
          }else if(data.status == 'e'){
            showToast("Error Deleting Event. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('edit_class_holiday', function(event_name,section_id,start_date,end_date,description,id) {
    let req = {}
    req.section_id=section_id,
    req.event_name=event_name,
    req.start_date=start_date,
    req.end_date=end_date,
    req.description=description,
    req.id=id
    $.ajax({
      url:'/class_holiday/edit/'+id,
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            self.classHolidays = self.classHolidays.map(cat => {
              if(cat.event_id == id){
                cat.event_id = data.event_id
                cat.event_name = event_name
                cat.section_id = section_id
                cat.start_date = start_date
                cat.end_date = end_date
                cat.description = description
                //cat.standard_id=standard_id
              }
              // cat.confirmEdit = false
              return cat
            })
            toastr.success("Class holiday Updated Successfully ")
            self.trigger('edit_class_holiday_changed', self.classHolidays)
          }else if(data.status == 'e'){
            showToast("Error updating events. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
 
  self.on('add_class_holiday', function(event_name,section_id,start_date,end_date,description,holiday) {
    let req = {}
    req.section_id=section_id,
    req.event_name=event_name,
    req.start_date=start_date,
    req.end_date=end_date,
    req.description=description,
    req.holiday=holiday,
    console.log(holiday)
    $.ajax({
      url:'/class_holiday/add',
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            console.log('add class holiday after')
            let obj = {}
            obj.event_id = data.event_id
            obj.event_name = event_name
            obj.section_id = section_id
            obj.start_date = start_date
            obj.end_date =   end_date
            obj.description = description
           // obj.name = name
            self.classHolidays = [obj, ...self.classHolidays]
            toastr.success("class holiday Inserserted Successfully ")
            self.trigger('add_class_holiday_changed', self.classHolidays)
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
