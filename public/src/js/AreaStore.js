function AreaStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.areas = []

  self.on('read_area', function() {
    console.log('i am in read_area api call from ajax')
    let req = {}
    $.ajax({
      url:'/area',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.areas = data.areas
            self.trigger('area_changed', data.areas)
          }else if(data.status == 'e'){
            showToast("area Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

   self.on('csv_export_area', function() {
    console.log('i am in csv_export_area api call from ajax')
    let req = {}
    $.ajax({
      url:'/area/csv_export_area',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('csv_export_area_changed', data.url)
          }else if(data.status == 'e'){}
        },
        error: function(data){
          //showToast("", data)
      }
    })
  })

  self.on('delete_area', function(id) {
    $.ajax({
      url:'/area/delete/'+id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            let tempArea = self.areas.filter(c => {
              return c.area != id
            })
            self.areas = tempArea
            self.trigger('area_changed', self.areas)
          }else if(data.status == 'e'){
            showToast("Error Deleting Level. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('edit_area', function(area,id) {
    let req = {}
    req.area=area
    req.id=id
    $.ajax({
      url:'/area/edit/'+id,
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            self.areas = self.areas.map(cat => {
              if(cat.area == id){
                cat.area = area
              }
              // cat.confirmEdit = false
              return cat
            })
            self.trigger('area_changed', self.areas)
          }else if(data.status == 'e'){
            showToast("Error updating Course. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
 
  self.on('add_area', function(area) {
    let req = {}
    req.area=area
    $.ajax({
      url:'/area/add',
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            console.log('add area after')
            let obj = {}
            obj.area = area
            self.areas = [obj, ...self.areas]
            self.trigger('area_changed', self.areas)
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
