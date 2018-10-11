function ClubStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.clubs = []


  self.on('read_club', function() {
    console.log('i am in read_events api call from ajax')
    let req = {}
    $.ajax({
      url:'/club/read_club',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.clubs = data.clubs
            self.trigger('read_club_changed', data.clubs)
          }else if(data.status == 'e'){
            showToast("Club Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('delete_club', function(id) {
    $.ajax({
      url:'/club/delete/'+id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            let tempClubs = self.clubs.filter(c => {
              return c.id != id
            })
            self.clubs = tempClubs
            toastr.info("Club Deleted Successfully")
            self.trigger('delete_club_changed', self.clubs)
          }else if(data.status == 'e'){
            showToast("Error Deleting Club. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('edit_club', function(club_name,captain,club_detail,id) {
    let req = {}
    req.club_name=club_name
    req.captain=captain
    req.club_detail=club_detail
    req.id=id
    $.ajax({
      url:'/club/edit/'+id,
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            self.clubs = self.clubs.map(cat => {
              if(cat.club_id == id){
                cat.club_id =id
                cat.club_name=club_name
                cat.captain=captain
                cat.club_detail=club_detail
              }
              // cat.confirmEdit = false
              return cat
            })
            toastr.success("Club Updated Successfully ")
            self.trigger('edit_club_changed', self.clubs)
          }else if(data.status == 'e'){
            showToast("Error updating clubs. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
 
  self.on('add_club', function(club_name,captain,club_detail) {
    let req = {}
    req.club_name=club_name
    req.captain=captain
    req.club_detail=club_detail
    $.ajax({
      url:'/club/add',
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            console.log('add Club role after')
            let obj = {}
                obj.club_id =data.id
                obj.club_name=club_name
                obj.captain=captain
                obj.club_detail=club_detail
           // obj.name = name
            self.clubs = [obj, ...self.clubs]
            toastr.success("club Inserserted Successfully ")
            self.trigger('add_club_changed', self.clubs)
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
