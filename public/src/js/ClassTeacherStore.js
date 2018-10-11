function ClassTeacherStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.events = []

  self.on('read_standard', function() {
    console.log('i am in read_standard api call from ajax')
    let req = {}
    $.ajax({
      url:'/classteacher',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.standard = data.standard
            self.trigger('read_standard_changed', data.standard)
          }else if(data.status == 'e'){
            showToast("Categories Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
  self.on('read_section_by_standard', function(standard_id) {
    console.log('i am in read_events_by_category api call from ajax')
    console.log(standard_id)
    let req = {}
    $.ajax({
      url:'/classteacher/read_section/'+standard_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.section = data.section
            self.trigger('read_section_by_standardchanged', data.section)
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
