function ReligionStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.religions = []

  self.on('read_religion', function() {
    console.log('i am in read_religion api call from ajax')
    let req = {}
    $.ajax({
      url:'/religion',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.religions = data.religions
            self.trigger('religion_changed', data.religions)
          }else if(data.status == 'e'){
            showToast("religion Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('delete_religion', function(id) {
    $.ajax({
      url:'/religion/delete/'+id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            let tempReligion = self.religions.filter(c => {
              return c.religion_id != id
            })
            self.religions = tempReligion
            self.trigger('religion_changed', self.religions)
          }else if(data.status == 'e'){
            showToast("Error Deleting Level. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('edit_religion', function(religion,id) {
    let req = {}
    req.religion=religion
    req.id=id
    $.ajax({
      url:'/religion/edit/'+id,
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            self.religions = self.religions.map(cat => {
              if(cat.religion == id){
                cat.religion = religion
                cat.religion_id = id
              }
              // cat.confirmEdit = false
              return cat
            })
            self.trigger('religion_changed', self.religions)
          }else if(data.status == 'e'){
            showToast("Error updating Course. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
 
  self.on('add_religion', function(religion) {
    let req = {}
    req.religion=religion
    $.ajax({
      url:'/religion/add',
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            console.log('add religion after')
            let obj = {}
            obj.religion_id = data.religion_id
            obj.religion = religion
            self.religions = [obj, ...self.religions]
            self.trigger('religion_changed', self.religions)
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
