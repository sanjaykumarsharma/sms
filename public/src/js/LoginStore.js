function LoginStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this


  self.on('read_roles', function() {
    console.log('i am in read_roles api call from ajax')
    let req = {}
    $.ajax({
      url:'/login/roles',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.roles = data.roles
            self.trigger('roles_for_login_changed', data.roles)
          }else if(data.status == 'e'){
            showToast("Roles Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
 
  self.on('check_login', function(Username,password,role) {
    let req = {}
    req.username=Username
    req.password=password
    req.role=role
    console.log(req)
    $.ajax({
      url:'/login/login',
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        success: function(data){
          console.log(data)
          console.log(document.cookie);
          console.log(getCookie('token'));
          if(data.status == 's'){
            console.log('login after')
            self.trigger('login_changed',data.result.role)
            self.trigger('login_changed_main_nav',data.result)
            self.trigger('login_changed_footer',data.result)
          }else if(data.status == 'e'){
            showToast("Invalid Username or password. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })


  self.on('logout', function() {
    $.ajax({
      url:'/login/logout',
        contentType: "application/json",
        dataType:"json",
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            console.log('logout')
            self.trigger('logOut_changed')
          }else if(data.status == 'e'){
            showToast("Error in Logout.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('change_password', function(old_password,new_password) {
    
    let req = {}
    req.action = 'changePassword'
    req.old_password=old_password
    req.new_password=new_password

    $.ajax({
        url:'/login/change-password',
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        success: function(data){
          if(data.status=='s'){
            self.trigger('change_password_completed',data.rows)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

}
