<login>

 <div class="login-banner">
  <div class="columns is-gapless is-marginless">
    <div class="column is-three-fifths is-hidden-mobile" style="height: 100vh;">
      <div class="cover_image" style="background-image: url('img/classroom.jpg'); height: 100%;"></div>
    </div>
    <div class="column is-two-fifths has-background-white">
      <section class="section">
        <div class="pad">
          <h1 class="title is-spaced has-text-success is-size-1 has-text-weight-bold">Sarathi</h1>
          <p class="is-size-6 has-text-grey" style="margin-top: -1.5em; margin-bottom: 2em;">School Management simplified!</p>
          <div class="subtitle">Login</div>
            <div>

              <div class="field">
                <label class="label" for="username">Username</label>              
                <div class="control">
                  <input class="input is-medium" id="username" ref="username" type="text" onkeyup={addEnter}>             
                </div>
              </div>

              <div class="field">
                <label class="label" for="user_password">Password</label>              
                <div class="control">
                  <input class="input is-medium" ref="password" type="password" onkeyup={addEnter}>              
                </div>
              </div>

              <div class="field">
                <label class="label" for="user_role">Role</label>
                <div class="control">
                  <div class="select is-fullwidth">
                    <select ref="role">
                      <option value="ADMIN">ADMIN</option>
                      <option value="Teacher">Teacher</option>
                      <option value="Class Teacher">Class Teacher</option>
                      <option each={roles} value={role}>{role}</option>
                    </select>
                  </div>
                </div>
              </div>
                          
              <div class="field">
                <div class="control">
                 <button class="button is-danger is-medium" type="submit" onclick={login}>Submit</button>              
                </div>
              </div>

          </div>        
        </div>
      </section>
    </div>
  </div>
</div>


  <script>
    var self = this
    self.login_warning = false

    self.on('mount', function() {
      document.getElementById("username").focus()
      self.update()
      self.readRoles()
    })

    self.on("unmount", function(){
      loginStore.off('login_changed', LoginChanged)
      loginStore.off('roles_for_login_changed',RolesChanged)
    })

    self.readRoles = () => {
      loginStore.trigger('read_roles')
    }
    self.addEnter = (e) => {
      if(e.which == 13){
        self.login()
      }
    }

    self.login = (e) => {
      if(!self.refs.username.value){
        toastr.info("Please enter Username and try again")
        return;
      }else  if(!self.refs.password.value){
        toastr.info("Please enter Password and try again")
        return;
      }else if(!self.refs.username.value || !self.refs.password.value){
        self.login_warning = true
      }
      loginStore.trigger('check_login', self.refs.username.value, self.refs.password.value, self.refs.role.value)
    }

    loginStore.on('login_changed',LoginChanged)
    function LoginChanged(role){
      console.log(role)
      console.log("Login Changed");
        
        
        if(role == 'ADMIN'){
          route("/setting")
        }else if(role =='Teacher'){
          route("/student-browser")
        }else if(role =='Class Teacher'){
          route("/student-browser")
        }else if(role =='Activity'){
          route("/activity-detail")
        }else if(role =='Career'){
          route("/career-setting/applicant-detail")
        }else if(role =='Mentor'){
         route("/mentor-detail")
        }else if(role =='Store'){
          route("/inventory-stock")
        }else if(role =='Infirmary'){
          route("/infirmary-setting/infirmary-category")
        }else if(role =='Discipline'){
         route("/discipline-detail")
        }else if(role =='Admission'){
         route("/student")
        }
        window.location.reload(true);

        //
    }

    loginStore.on('roles_for_login_changed',RolesChanged)
    function RolesChanged(roles){
        self.roles = roles
        self.update()
    }

  </script>
</login>
