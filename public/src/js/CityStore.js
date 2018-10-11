function CityStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.cities = []

  self.on('read_city', function() {
    console.log('i am in read_city api call from ajax')
    let req = {}
    $.ajax({
      url:'/city',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.cities = data.cities
            self.trigger('city_changed', data.cities)
          }else if(data.status == 'e'){
            showToast("level Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('delete_city', function(id) {
    $.ajax({
      url:'/city/delete/'+id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            let tempCity = self.cities.filter(c => {
              return c.city != id
            })
            self.cities = tempCity
            self.trigger('city_changed', self.cities)
          }else if(data.status == 'e'){
            showToast("Error Deleting Level. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('edit_city', function(city,code,id) {
    let req = {}
    req.city=city
    req.code=code
    req.id=id
    $.ajax({
      url:'/city/edit/'+id,
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            self.cities = self.cities.map(cat => {
              if(cat.city == id){
                cat.city = city
                cat.code = code
              }
              // cat.confirmEdit = false
              return cat
            })
            self.trigger('city_changed', self.cities)
          }else if(data.status == 'e'){
            showToast("Error updating Course. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
 
  self.on('add_city', function(city,code) {
    let req = {}
    req.city=city
    req.code=code
    $.ajax({
      url:'/city/add',
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            console.log('add city after')
            let obj = {}
            //obj.level_id = data.level_id
            obj.city = city
            obj.code = code
            self.cities = [obj, ...self.cities]
            self.trigger('city_changed', self.cities)
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
