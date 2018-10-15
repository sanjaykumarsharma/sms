<main-nav>
  <nav class="navbar is-fixed-top is-light no-print" role="navigation" aria-label="main navigation" if={showNavItems}>
        <div class="container is-fluid" >
          <div class="navbar-brand">
            
              <div class="navbar-item is-size-3 has-text-weight-bold has-text-wight">
                SMS
              </div>
       
            <div class="navbar-burger burger" data-target="navbarExampleTransparentExample">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </div>
          </div>
          <div id="navbarExampleTransparentExample" class="navbar-menu has-text-weight-bold">
            <div class="navbar-end">

              <div class="navbar-item has-dropdown is-hoverable">
                <a class="navbar-link" >Exam</a>
                <div class="navbar-dropdown">
                  <a class="navbar-item" href="#/exam-scheme">Exam Scheme</a>
                  <a class="navbar-item" href="#/grade">Grade</a>
                  <a class="navbar-item" href="#/marks-manager">Marks Manager</a>
                  <a class="navbar-item" href="#/marks-entry">Marks Entry</a>
                  <a class="navbar-item" href="#/marks-report">Marks Report</a>
                  <a class="navbar-item" href="#/maturity-development">Maturity Development</a>
                  <a class="navbar-item" href="#/result-activation">Result Activation</a>
                  <a class="navbar-item" href="#/physical-fitness">Physical Fitness</a>
                  <a class="navbar-item" href="#/subject-group-map">Subject Group Map</a>
                </div>
              </div>

              <div class="navbar-item has-dropdown is-hoverable">
                <a class="navbar-link" >Student</a>
                <div class="navbar-dropdown">
                  <a class="navbar-item" href="#/student-assign-house">Assign House</a>
                  <a class="navbar-item" href="#/student-group-student">Group Student</a>
                  <a class="navbar-item" href="#/student-assign-subject">Assign Subject</a>
                  <a class="navbar-item" href="#/student-withdrawn-student">Withdrawn Student</a>
                  <a class="navbar-item" href="#/student-assign-section">Assign Section</a>
                  <a class="navbar-item" href="#/student-login-slip">Login Slip</a>
                </div>
              </div>

              <div class="navbar-item has-dropdown is-hoverable">
                <a class="navbar-link" >Activity</a>
                <div class="navbar-dropdown">
                  <a class="navbar-item " href="#/activity-detail">Activity Detail</a>
                  <a class="navbar-item" href="#/report">Report</a>
                  <a class="navbar-item {active: selected_nav_item == 'activity-setting'}" href="#/activity-setting/activity-item">Setting</a>
                </div>
              </div>

              <div class="navbar-item has-dropdown is-hoverable">
                <a class="navbar-link" >Fees</a> 
                <div class="navbar-dropdown">
                  <a class="navbar-item {active: selected_nav_item == 'fee-bill'}" href="#/fee-bill/bill">Fee Head</a>
                  <a class="navbar-item {active: selected_nav_item == 'scholarship'}" href="#/scholarship">Scholarship</a>
                  <a class="navbar-item {active: selected_nav_item == 'fees-setting'}" href="#/fees-setting/fine-setting">Setting</a>
                </div>
              </div>

              <div class="navbar-item has-dropdown is-hoverable">
               <a class="navbar-link" >Mentor</a>
               <div class="navbar-dropdown">
                 <a class="navbar-item " href="#/mentor-detail">Mentor Detail</a>
                 <a class="navbar-item" href="#/mentor-report">Report</a>
                 <a class="navbar-item {active: selected_nav_item == 'mentor-setting'}" href="#/mentor-setting/mentor-category">Setting</a>
               </div>
             </div>
             <div class="navbar-item has-dropdown is-hoverable">
               <a class="navbar-link" >Discipline</a>
               <div class="navbar-dropdown">
                 <a class="navbar-item " href="#/discipline-detail">Discipline Detail</a>
                 <a class="navbar-item" href="#/discipline-report">Report</a>
                 <a class="navbar-item" href="#/student">Student</a>
                 <a class="navbar-item {active: selected_nav_item == 'discipline-setting'}" href="#/discipline-setting/discipline-category">Setting</a>
               </div>
             </div>
             <div class="navbar-item has-dropdown is-hoverable">
               <a class="navbar-link" >Activity</a>
               <div class="navbar-dropdown">
                 <a class="navbar-item " href="#/activity-detail">Activity Detail</a>
                 <a class="navbar-item" href="#/report">Report</a>
                 <a class="navbar-item {active: selected_nav_item == 'activity-setting'}" href="#/activity-setting/item">Setting</a>
               </div>
             </div>

             <!-- tarique -->
             <div class="navbar-end">
               <div class="navbar-item has-dropdown is-hoverable">
                <a class="navbar-link" >Master</a>
                <div class="navbar-dropdown">
                  <a class="navbar-item {active: selected_nav_item == 'master'}" href="#/master/employee-type">Setting</a>
                </div>
              </div>
              <div class="navbar-item has-dropdown is-hoverable">
                <a class="navbar-link" >Infirmary</a>
                <div class="navbar-dropdown">
                  <a class="navbar-item {active: selected_nav_item == 'infirmary-setting'}" href="#/infirmary-setting/infirmary-category">Setting</a>
                    <a class="navbar-item {active: selected_nav_item == 'infirmary'}" href="#/infirmary/infirmary-student">Infirmary Detail</a>
                </div>
              </div>
              <div class="navbar-item has-dropdown is-hoverable">
                <a class="navbar-link" >Inventory</a>
                <div class="navbar-dropdown">
                  <a class="navbar-item {active: selected_nav_item == 'inventory-setting'}" href="#/inventory-setting/inventory-rack">Setting</a>
                  <a class="navbar-item" href="#/inventory-stock">Stock Inwards Entry</a>
                  <a class="navbar-item" href="#/inventory-issue">Issue</a>
                  <a class="navbar-item" href="#/inventory-sale">Sale</a>
                    <!-- {active: selected_nav_item == 'inventory-stock'}" <a class="navbar-item {active: selected_nav_item == 'inventory'}" href="#/Inventory/inventory-student">Inventory Detail</a> -->
                </div>
              </div>

              <a class="navbar-item has-text-danger" onclick={logout}>Logout</a>
            </div>
          </div>
        </div>
      </nav>

  <script>
    var self = this
    console.log('opts.selected_nav_item')
    console.log(opts.selected_nav_item)
    if(!opts.selected_nav_item){
      self.selected_nav_item = 'login'
      self.showNavItems=false
    }else{
      self.selected_nav_item = opts.selected_nav_item
      if(self.selected_nav_item == 'login'){
        self.showNavItems=false
      }else{
        self.showNavItems=true
      }
      
    }
    self.username = undefined
    // self.showNavItems=false


    self.changePassword = () => {
      $("#passwordChangeModal").modal('show')  
    }

    self.savePassword = () => {
      if(self.userNameInput.value==''){
        toastr.error('Please enter username and try again')
        return
      }

      if(self.oldPasswordInput.value==''){
        toastr.error('Please enter old password and try again')
        return
      }

      if(self.newPasswordInput.value==''){
        toastr.error('Please enter new password and try again')
        return
      }

      var str=self.newPasswordInput.value
      var p = str.length

      if(Number(p)<5){
        toastr.error('new password lenth must be >4')
        return;
      }

      if(self.newPasswordInput.value!=self.newPasswordInput2.value){
        toastr.error('new password not match')
        return;
      }
     
      //RiotControl.trigger('change_password',self.userNameInput.value,self.oldPasswordInput.value,self.newPasswordInput.value)

    }

    self.logout = () => {
      console.log("calling logout")
      RiotControl.trigger('logout')
    }

    RiotControl.on('login_changed_main_nav', function(login_status) {
      console.log("calling me in nav tag")
      self.username = login_status.username
      if(login_status.role!='FAIL'){
        self.showNavItems=true
      }
      self.update()
    })

    RiotControl.on('logOut_changed', function() {
     console.log("logged out");
        self.showNavItems=false
        route("/login")
        // riot.route("/login")
    })

    RiotControl.on('change_password_completed', function(count) {
     console.log("Password changed");
     if(Number(count)==1){
        self.userNameInput.value=''
        self.oldPasswordInput.value=''
        self.newPasswordInput.value=''
        self.newPasswordInput2.value=''
        $("#passwordChangeModal").modal('hide')  
        toastr.info('Password Changed Successfully')
        self.update()
     }else{
      toastr.error('Please check your old username and password')
     }

    });
  </script>
</main-nav>
