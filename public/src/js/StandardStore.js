function StandardStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.standards = []

  self.on('read_standard', function() {
    console.log('i am in read_standard api call from ajax')
    let req = {}
    $.ajax({
      url:'/standard',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.standards = data.standards
            self.trigger('standard_changed', data.standards)
          }else if(data.status == 'e'){
            showToast("standard Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('csv_export_standard', function() {
    console.log('i am in csv_export_standard api call from ajax')
    let req = {}
    $.ajax({
      url:'/standard/csv_export_standard',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('csv_export_standard_changed', data.url)
          }else if(data.status == 'e'){}
        },
        error: function(data){
          //showToast("", data)
      }
    })
  })

  self.on('delete_standard', function(id) {
    $.ajax({
      url:'/standard/delete/'+id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            let tempStandard = self.standards.filter(c => {
              return c.standard_id != id
            })
            self.standards = tempStandard
            self.trigger('standard_changed', self.standards)
          }else if(data.status == 'e'){
            showToast("Error Deleting Level. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('edit_standard', function(standard,id) {
    let req = {}
    req.standard=standard
    req.id=id
    $.ajax({
      url:'/standard/edit/'+id,
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            self.standards = self.standards.map(cat => {
              if(cat.standard_id == id){
                cat.standard = standard
                cat.standard_id = id
              }
              // cat.confirmEdit = false
              return cat
            })
            self.trigger('standard_changed', self.standards)
          }else if(data.status == 'e'){
            showToast("Error updating Course. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
 
  self.on('add_standard', function(standard) {
    let req = {}
    req.standard=standard
    $.ajax({
      url:'/standard/add',
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            console.log('add standard after')
            let obj = {}
            obj.standard_id = data.standard_id
            obj.standard = standard
            self.standards = [obj, ...self.standards]
            self.trigger('standard_changed', self.standards)
          }else if(data.status == 'e'){
            showToast("Error adding Designation. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

}
