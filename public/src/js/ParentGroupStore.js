function ParentGroupStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.parentGroups = []


  self.on('read_parentgroup', function() {
    console.log('i am in parent Group api call from ajax')
    let req = {}
    $.ajax({
      url:'/parent_group/read_parentgroup',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.parentGroups = data.parentGroups
            self.trigger('read_parentgroup_changed', data.parentGroups)
          }else if(data.status == 'e'){
            showToast("Club Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('delete_parentgroup', function(id) {
    $.ajax({
      url:'/parent_group/delete/'+id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            let tempParentGroups = self.parentGroups.filter(c => {
              return c.pgroup_id != id
            })
            self.parentGroups = tempParentGroups
            toastr.info("Club Deleted Successfully")
            self.trigger('delete_parentgroup_changed', self.parentGroups)
          }else if(data.status == 'e'){
            showToast("Error Deleting Club. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('edit_parentgroup', function(pgroup_name,pgroup_detail,pgroup_id) {
    let req = {}
    req.pgroup_name=pgroup_name
    req.pgroup_detail=pgroup_detail
    req.id=pgroup_id
    $.ajax({
      url:'/parent_group/edit/'+pgroup_id,
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            self.parentGroups = self.parentGroups.map(cat => {
              if(cat.pgroup_id == pgroup_id){
                cat.pgroup_id =pgroup_id
                cat.pgroup_name=pgroup_name
                cat.pgroup_detail=pgroup_detail
              }
              // cat.confirmEdit = false
              return cat
            })
            toastr.success("Prent Group Updated Successfully ")
            self.trigger('edit_parentgroup_changed', self.parentGroups)
          }else if(data.status == 'e'){
            showToast("Error updating parentGroups. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
 
  self.on('add_parentgroup', function(pgroup_name,pgroup_detail) {
    let req = {}
    req.pgroup_name=pgroup_name
    req.pgroup_detail=pgroup_detail
    $.ajax({
      url:'/parent_group/add',
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
                 obj.pgroup_id =data.id
                obj.pgroup_name=pgroup_name
                obj.pgroup_detail=pgroup_detail
           // obj.name = name
            self.parentGroups = [obj, ...self.parentGroups]
            toastr.success("parent group Inserserted Successfully ")
            self.trigger('add_parentgroup_changed', self.parentGroups)
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
