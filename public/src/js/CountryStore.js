function CountryStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.countries = []

  self.on('read_country', function() {
    console.log('i am in read_level api call from ajax')
    let req = {}
    $.ajax({
      url:'/country',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.countries = data.countries
            self.trigger('country_changed', data.countries)
          }else if(data.status == 'e'){
            showToast("level Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('delete_country', function(id) {
    $.ajax({
      url:'/country/delete/'+id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            let tempCountry = self.countries.filter(c => {
              return c.country != id
            })
            self.countries = tempCountry
            self.trigger('country_changed', self.countries)
          }else if(data.status == 'e'){
            showToast("Error Deleting Level. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('edit_country', function(country,code,id) {
    let req = {}
    req.country=country
    req.code=code
    req.id=id
    $.ajax({
      url:'/country/edit/'+id,
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            self.countries = self.countries.map(cat => {
              if(cat.country == id){
                cat.country = country
                cat.code=code
              }
              // cat.confirmEdit = false
              return cat
            })
            self.trigger('country_changed', self.countries)
          }else if(data.status == 'e'){
            showToast("Error updating Course. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
 
  self.on('add_country', function(country,code) {
    let req = {}
    req.country=country
    req.code=code
    $.ajax({
      url:'/country/add',
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            console.log('add country after')
            let obj = {}
            //obj.level_id = data.level_id
            obj.country = country
            obj.code = code
            self.countries = [obj, ...self.countries]
            self.trigger('country_changed', self.countries)
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
