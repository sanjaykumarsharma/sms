<main-nav>
  <nav class="navbar is-fixed-top is-light no-print" role="navigation" aria-label="main navigation" if={showAdminNavItems}>
    <div class="container is-fluid" >
      <div class="navbar-brand">
        
          <div class="navbar-item is-size-3 has-text-weight-bold has-text-wight">
            Sarathi
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
            <a class="navbar-item" >Exam</a>
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
            <a class="navbar-item" >Admin</a>
            <div class="navbar-dropdown">
              <a class="navbar-item" href="#/id-card">ID Card</a>
              <a class="navbar-item {active: selected_nav_item == 'certificate'}" href="#/certificate/issue-certificate">Certificate</a>
              <a class="navbar-item " href="#/birthday">Bithday</a>
              <a class="navbar-item " href="#/occupation-report">Occupation Report</a>
              <a class="navbar-item" href="#/id-signature">Id Signature</a>
              <a class="navbar-item" href="#/student-assign-house">Assign House</a>
              <a class="navbar-item" href="#/student-group-student">Group Student</a>
              <a class="navbar-item" href="#/student-assign-subject">Assign Subject</a>
              <a class="navbar-item" href="#/student-assign-section">Assign Section</a>
              <a class="navbar-item" href="#/student-result-activation">Result Activation</a>
            </div>
          </div>

          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-item" >Time Table</a>
            <div class="navbar-dropdown">
              <a class="navbar-item" href="#/teacher-time-table">Teacher Time Table</a>
              <a class="navbar-item" href="#/time-table-substitutation">Time Table Substitutaion</a>
              <a class="navbar-item" href="#/time-table-report-nav">Reports</a>
              <a class="navbar-item" href="#/time-table-admin">Admin</a>
            </div>
          </div>

          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-item" >Student</a>
            <div class="navbar-dropdown">
              <a class="navbar-item" href="#/student">Student</a>
              <a class="navbar-item " href="#/student-search">Search</a>
              <a class="navbar-item " href="#/student-browser">Browser</a>
              <a class="navbar-item {active: selected_nav_item == 'admin-report'}" href="#/admin-report/student-summary-report">Report</a>
              <a class="navbar-item" href="#/student-withdrawn-student">Withdrawn Student</a>
              <a class="navbar-item" href="#/promote">Promote Student</a>
              <a class="navbar-item" href="#/student-login-slip">Login Slip</a>
              <a class="navbar-item" href="#/student-school-leaving">Student Leaving Certificate</a>
              <a class="navbar-item" href="#/student-info-update">Student Info Update</a>
            </div>
          </div>

          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-item" >Notification</a>
            <div class="navbar-dropdown">
              <a class="navbar-item " href="#/student-notification">Student Email & Sms</a>
              <a class="navbar-item" href="#/employee-notification">Employee Email & Sms</a>
              
            </div>
          </div>

          <!-- <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-item" >Activity</a>
            <div class="navbar-dropdown">
              <a class="navbar-item " href="#/activity-detail">Activity Detail</a>
              <a class="navbar-item" href="#/activity-report">Report</a>
              <a class="navbar-item {active: selected_nav_item == 'activity-setting'}" href="#/activity-setting/activity-item">Setting</a>
            </div>
          </div> -->

          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-item">Fees</a> 
            <div class="navbar-dropdown">
              <a class="navbar-item {active: selected_nav_item == 'receive-fees'}" href="#/receive-fees">Receive Fees</a>
              <a class="navbar-item {active: selected_nav_item == 'fee-bill'}" href="#/fee-bill/bill">Fee Head</a>
              <a class="navbar-item {active: selected_nav_item == 'fees-report'}" href="#/fees-report/month-wise">Reports</a>
              <a class="navbar-item {active: selected_nav_item == 'scholarship'}" href="#/scholarship">Scholarship</a>
               <a class="navbar-item {active: selected_nav_item == 'fees-withdraw'}" href="#/fees-withdraw">Withdraw</a>
             
              <a class="navbar-item {active: selected_nav_item == 'fees-setting'}" href="#/fees-setting/fine-setting">Setting</a>
            </div>
          </div>

          <div class="navbar-item has-dropdown is-hoverable">
           <a class="navbar-item" >Mentor</a>
           <div class="navbar-dropdown">
             <a class="navbar-item " href="#/mentor-detail">Mentor Detail</a>
             <a class="navbar-item" href="#/mentor-report">Report</a>
             <a class="navbar-item {active: selected_nav_item == 'mentor-setting'}" href="#/mentor-setting/mentor-category">Setting</a>
           </div>
         </div>
         <div class="navbar-item has-dropdown is-hoverable">
           <a class="navbar-item" >Discipline</a>
           <div class="navbar-dropdown">
             <a class="navbar-item " href="#/discipline-detail">Discipline Detail</a>
             <a class="navbar-item" href="#/discipline-report">Report</a>
             <!-- <a class="navbar-item" href="#/student">Student</a> -->
             <a class="navbar-item {active: selected_nav_item == 'discipline-setting'}" href="#/discipline-setting/discipline-category">Setting</a>
           </div>
         </div>
         <div class="navbar-item has-dropdown is-hoverable">
           <a class="navbar-item" >Activity</a>
           <div class="navbar-dropdown">
             <a class="navbar-item " href="#/activity-detail">Activity Detail</a>
             <a class="navbar-item" href="#/activity-report">Report</a>
             <a class="navbar-item {active: selected_nav_item == 'activity-setting'}" href="#/activity-setting/item">Setting</a>
           </div>
         </div>

          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-item" >Attendance</a>
            <div class="navbar-dropdown">
              <a class="navbar-item " href="#/attendance-entry">Attendance Entry</a>
              <a class="navbar-item " href="#/daily-attendance">Daily Attendance</a>
            </div>
          </div>
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-item" >Staff</a>
            <div class="navbar-dropdown">
              <a class="navbar-item " href="#/staff">Staff</a>
              <a class="navbar-item " href="#/ex-staff">EX-Staff</a>
              <a class="navbar-item " href="#/browse-staff">Browse</a>
              <a class="navbar-item " href="#/approve-staff-profile">Approve Profile</a>
              <a class="navbar-item" href="#/staff-gender-report">Staff By Gender Report</a>
              <a class="navbar-item" href="#/staff-type-report">Staff By Type Report</a>
              <a class="navbar-item {active: selected_nav_item == 'career-setting'}" href="#/career-setting/applicant-detail">Career</a>
            </div>
          </div>

         <!-- tarique -->
         <div class="navbar-end">
           <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-item" >Master</a>
            <div class="navbar-dropdown">
              <a class="navbar-item {active: selected_nav_item == 'master'}" href="#/master/employee-type">Setting</a>
            </div>
          </div>
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-item" >Infirmary</a>
            <div class="navbar-dropdown">
              <a class="navbar-item {active: selected_nav_item == 'infirmary-setting'}" href="#/infirmary-setting/infirmary-category">Setting</a>
                <a class="navbar-item {active: selected_nav_item == 'infirmary'}" href="#/infirmary/infirmary-student">Infirmary Detail</a>
            </div>
          </div>
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-item" >Inventory</a>
            <div class="navbar-dropdown">
              <a class="navbar-item {active: selected_nav_item == 'inventory-setting'}" href="#/inventory-setting/inventory-rack">Setting</a>
              <a class="navbar-item" href="#/inventory-stock">Stock Inwards Entry</a>
              <a class="navbar-item" href="#/inventory-issue">Issue</a>
              <a class="navbar-item" href="#/inventory-sale">Sale</a>
              <a class="navbar-item" href="#/inventory-returnable">Returnable</a>
              <a class="navbar-item {active: selected_nav_item == 'inventory-report'}" href="#/inventory-report/inventory-received-goods-report">Report</a>
             <!--  <a class="navbar-item" href="#/inventory-report">Report</a> -->
                <!-- {active: selected_nav_item == 'inventory-stock'}" <a class="navbar-item {active: selected_nav_item == 'inventory'}" href="#/Inventory/inventory-student">Inventory Detail</a> -->
            </div>
          </div>

          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-item has-text-danger" onclick={logout}><i class="fas fa-power-off"></i></a>
            <div class="navbar-dropdown">
              <a class="navbar-item has-text-danger" onclick={logout}><i class="fas fa-power-off"></i></a>
              <a class="navbar-item" onclick={changePassword}><i class="fas fa-key"></i></a>
            </div>
          </div>

        </div>
      </div>

    </div>
  </nav>
  

  <nav class="navbar is-fixed-top is-light no-print" role="navigation" aria-label="main navigation" if={showTeacherNavItems}>
    <div class="container is-fluid" >
      <div class="navbar-brand">
        
          <div class="navbar-item is-size-3 has-text-weight-bold has-text-wight">
            Sarathi
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
            <a class="navbar-item">My Class</a>
            <div class="navbar-dropdown">
              <a class="navbar-item" href="#/student-browser">Student</a>
              <a class="navbar-item" href="#/marks-entry">Marks Entry</a>
              <!-- <a class="navbar-item" href="#/marks-manager">Marks Manager</a>
              <a class="navbar-item" href="#/marks-entry">Conduct & Application</a> -->
              <a class="navbar-item" href="#/consolidate-tabulation-sheet">Marks Report</a>
              <a class="navbar-item" href="#/maturity-development">Home Work</a>
            </div>
          </div>
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-item" >Staff Profile</a>
          </div>

          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-item" >Time Table</a>
          </div>
          <a class="navbar-item has-text-danger" onclick={logout}><i class="fas fa-power-off"></i></a>
        </div>
      </div>
    </div>
  </nav>

  <nav class="navbar is-fixed-top is-light no-print" role="navigation" aria-label="main navigation" if={showClassTeacherNavItems}>
    <div class="container is-fluid" >
      <div class="navbar-brand">
        
          <div class="navbar-item is-size-3 has-text-weight-bold has-text-wight">
            Sarathi
          </div>
  
      </div>
      <div id="navbarExampleTransparentExample" class="navbar-menu has-text-weight-bold">
        <div class="navbar-end">
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-item">My Class</a>
            <div class="navbar-dropdown">
              <a class="navbar-item" href="#/student-browser">Student</a>
               <a class="navbar-item" href="#/marks-manager">Mark Attendance</a>
               <a class="navbar-item" href="#/marks-manager">Attendance Report</a>
               <a class="navbar-item" href="#/marks-manager">Marks Manager</a>
                <a class="navbar-item" href="#/marks-entry">Marks Entry</a>
              
              <a class="navbar-item" href="#/marks-report">Marks Report</a>
              <a class="navbar-item" href="#/marks-entry">Conduct & Application</a>
              <a class="navbar-item" href="#/maturity-development">Class Holiday</a>
              <a class="navbar-item" href="#/maturity-development">School Leaving</a>
              <a class="navbar-item" href="#/maturity-development">Physical Fitness</a>
            </div>
          </div>
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-item" >Staff Profile</a>
          </div>

          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-item" >Time Table</a>
          </div>
          <a class="navbar-item has-text-danger" onclick={logout}><i class="fas fa-power-off"></i></a>
        </div>
      </div>
    </div>
  </nav>

    <!-- By Tarique Sub Nava For Inventory-->

  <nav class="navbar is-fixed-top is-light no-print" role="navigation" aria-label="main navigation" if={showInventoryNavItems}>
    <div class="container is-fluid" >
      <div class="navbar-brand">
        
          <div class="navbar-item is-size-3 has-text-weight-bold has-text-wight">
            Sarathi
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
            <a class="navbar-item" >Inventory</a>
            <div class="navbar-dropdown">
              <a class="navbar-item {active: selected_nav_item == 'inventory-setting'}" href="#/inventory-setting/inventory-rack">Setting</a>
              <a class="navbar-item" href="#/inventory-stock">Stock Inwards Entry</a>
              <a class="navbar-item" href="#/inventory-issue">Issue</a>
              <a class="navbar-item" href="#/inventory-sale">Sale</a>
              <a class="navbar-item" href="#/inventory-returnable">Returnable</a>
              <a class="navbar-item {active: selected_nav_item == 'inventory-report'}" href="#/inventory-report/inventory-received-goods-report">Report</a>
             <!--  <a class="navbar-item" href="#/inventory-report">Report</a> -->
                <!-- {active: selected_nav_item == 'inventory-stock'}" <a class="navbar-item {active: selected_nav_item == 'inventory'}" href="#/Inventory/inventory-student">Inventory Detail</a> -->
            </div>
          </div>
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-item" href="#/staff-profile">Staff Profile</a>
          </div>
          <a class="navbar-item has-text-danger" onclick={logout}><i class="fas fa-power-off"></i></a>
        </div>
      </div>
    </div>
  </nav>

  <!-- Infirmary-->

    <nav class="navbar is-fixed-top is-light no-print" role="navigation" aria-label="main navigation" if={showInfirmaryNavItems}>
    <div class="container is-fluid" >
      <div class="navbar-brand">
        
          <div class="navbar-item is-size-3 has-text-weight-bold has-text-wight">
            Sarathi
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
            <a class="navbar-item" >Infirmary</a>
            <div class="navbar-dropdown">
              <a class="navbar-item {active: selected_nav_item == 'infirmary-setting'}" href="#/infirmary-setting/infirmary-category">Setting</a>
                <a class="navbar-item {active: selected_nav_item == 'infirmary'}" href="#/infirmary/infirmary-student">Infirmary Detail</a>
            </div>
          </div>
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-item" href="#/staff-profile">Staff Profile</a>
          </div>
          <a class="navbar-item has-text-danger" onclick={logout}><i class="fas fa-power-off"></i></a>
        </div>
      </div>
    </div>
  </nav>
  <!-- END Inventory Sub Nav -->

  <nav class="navbar is-fixed-top is-light no-print" role="navigation" aria-label="main navigation" if={showActivityItems}>
   <div class="container is-fluid" >
     <div class="navbar-brand">
       
         <div class="navbar-item is-size-3 has-text-weight-bold has-text-wight">
           Sarathi
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
           <a class="navbar-item" >Activity</a>
          <div class="navbar-dropdown">
            <a class="navbar-item " href="#/activity-detail">Activity Detail</a>
            <a class="navbar-item" href="#/activity-report">Report</a>
            <a class="navbar-item {active: selected_nav_item == 'activity-setting'}" href="#/activity-setting/activity-item">Setting</a>
          </div>
         </div>
         <div class="navbar-item has-dropdown is-hoverable">
           <a class="navbar-item" >Staff Profile</a>
         </div>
         <a class="navbar-item has-text-danger" onclick={logout}><i class="fas fa-power-off"></i></a>
       </div>
     </div>
   </div>
 </nav>

 <nav class="navbar is-fixed-top is-light no-print" role="navigation" aria-label="main navigation" if={showMentorItems}>
   <div class="container is-fluid" >
     <div class="navbar-brand">
       
         <div class="navbar-item is-size-3 has-text-weight-bold has-text-wight">
           Sarathi
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
          <a class="navbar-item" >Mentor</a>
          <div class="navbar-dropdown">
            <a class="navbar-item " href="#/mentor-detail">Mentor Detail</a>
            <a class="navbar-item" href="#/mentor-report">Report</a>
            <a class="navbar-item {active: selected_nav_item == 'mentor-setting'}" href="#/mentor-setting/mentor-category">Setting</a>
          </div>
         </div>
         <div class="navbar-item has-dropdown is-hoverable">
           <a class="navbar-item" >Staff Profile</a>
         </div>
         <a class="navbar-item has-text-danger" onclick={logout}><i class="fas fa-power-off"></i></a>
       </div>
     </div>
   </div>
 </nav>

 <nav class="navbar is-fixed-top is-light no-print" role="navigation" aria-label="main navigation" if={showDisciplineItems}>
   <div class="container is-fluid" >
     <div class="navbar-brand">
       
         <div class="navbar-item is-size-3 has-text-weight-bold has-text-wight">
           Sarathi
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
          <a class="navbar-item" >Discipline</a>
          <div class="navbar-dropdown">
            <a class="navbar-item " href="#/discipline-detail">Discipline Detail</a>
            <a class="navbar-item" href="#/discipline-report">Report</a>
            <a class="navbar-item {active: selected_nav_item == 'discipline-setting'}" href="#/discipline-setting/discipline-category">Setting</a>
          </div>
         </div>
         <div class="navbar-item has-dropdown is-hoverable">
           <a class="navbar-item" >Staff Profile</a>
         </div>
         <a class="navbar-item has-text-danger" onclick={logout}><i class="fas fa-power-off"></i></a>
       </div>
     </div>
   </div>
 </nav>

 <!-- <nav class="navbar is-fixed-top is-light no-print" role="navigation" aria-label="main navigation" if={showAdmissionItems}>
   <div class="container is-fluid" >
     <div class="navbar-brand">
       
         <div class="navbar-item is-size-3 has-text-weight-bold has-text-wight">
           Sarathi
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
          <a class="navbar-item" href="#/student">Student</a>
         <div class="navbar-item has-dropdown is-hoverable">
           <a class="navbar-item" >Staff Profile</a>
         </div> -->
 
 <div class="modal" id="passwordChangeModalMainUser">
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Change Password</p>
      <button class="delete" aria-label="close" onclick={closeChangePasswordModal}></button>
    </header>
    <section class="modal-card-body">

      <div class="field">
        <p class="control has-icons-left">
          <input class="input" type="password" ref="oldPasswordInput" placeholder="Old Password">
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
        </p>
      </div>

      <div class="field">
        <p class="control has-icons-left">
          <input class="input" type="password" ref="newPasswordInput" placeholder="New Password">
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
        </p>
      </div>

      <div class="field">
        <p class="control has-icons-left">
          <input class="input" type="password" ref="newPasswordInput2" placeholder="Re-type New Password">
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
        </p>
      </div>

    </section>
    <footer class="modal-card-foot">
      <button class="button is-success" onclick={savePassword}>Save changes</button>
      <button class="button" onclick={closeChangePasswordModal}>Cancel</button>
    </footer>
  </div>
</div>

 <script>
    var self = this
    console.log('opts.selected_nav_item')
    console.log(opts.selected_nav_item)
    self.getCookie = (c_name) => {
       var i,x,y,ARRcookies=document.cookie.split(";");
       for (i=0; i<ARRcookies.length; i++)
       {
          x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
          y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
          x=x.replace(/^\s+|\s+$/g,"");
          if (x==c_name)
          {
            return unescape(y);
          }
       }
    }

    if(!opts.selected_nav_item){
      self.selected_nav_item = 'login'
      self.showAdminNavItems=false
      self.showTeacherNavItems=false
      self.showClassTeacherNavItems=false
      self.showActivityItems = false
      self.showMentorItems = false
      self.showDisciplineItems = false
      self.showAdmissionItems = false
    }else{
      self.selected_nav_item = opts.selected_nav_item
      if(self.selected_nav_item == 'login'){
        self.showAdminNavItems=false
        self.showTeacherNavItems=false
        self.showClassTeacherNavItems=false
        self.showActivityItems=false
        self.showMentorItems = false
        self.showDisciplineItems = false
        self.showAdmissionItems = false
      }else{
        var role = self.getCookie('role')
        console.log('role')
        console.log(role)
        if(role=='ADMIN'){
          self.showAdminNavItems=true
        }else if(role=='Teacher'){
          self.showTeacherNavItems=true
        }else if(role=='Class Teacher'){
          self.showClassTeacherNavItems=true
        }else if(role=='Activity'){
          self.showActivityItems=true
        }else if(role=='Mentor'){
         self.showMentorItems=true
        }else {
           
        }
        
        
      }
      
    }
    self.username = undefined
    // self.showAdminNavItems=false


    self.changePassword = () => {
      console.log('calling change password')
      $("#passwordChangeModalMainUser").addClass("is-active");
    }

    self.closeChangePasswordModal = () => {
      $("#passwordChangeModalMainUser").removeClass("is-active");
    }

    self.savePassword = () => {

      if(self.refs.oldPasswordInput.value==''){
        toastr.error('Please enter old password and try again')
        return
      }

      if(self.refs.newPasswordInput.value==''){
        toastr.error('Please enter new password and try again')
        return
      }

      var str=self.refs.newPasswordInput.value
      var p = str.length

      if(Number(p)<5){
        toastr.error('new password lenth must be >4')
        return;
      }

      if(self.refs.newPasswordInput.value!=self.refs.newPasswordInput2.value){
        toastr.error('new password not match')
        return;
      }
     
      RiotControl.trigger('change_password',self.refs.oldPasswordInput.value,self.refs.newPasswordInput.value)

    }

    self.logout = () => {
      console.log("calling logout")
      RiotControl.trigger('logout')
    }

    RiotControl.on('login_changed_main_nav', function(login_status) {
      console.log("calling me in nav tag")
      self.username = login_status.username
      //if(login_status.role!='FAIL'){
        //self.showAdminNavItems=true
      //}

      //user nav 
      console.log("login status = " + login_status.role)
      if(login_status.role=='ADMIN'){
        self.showAdminNavItems=true
      }else if(login_status.role=='Teacher'){
          self.showTeacherNavItems=true
        }else if(login_status.role=='Class Teacher'){
          self.showClassTeacherNavItems=true
        }  else if(role=='Store'){
          self.showInventoryNavItems=true
        }else if(role=='Infirmary'){
          self.showInfirmaryNavItems=true
        }else if(role=='Discipline'){
         self.showDisciplineItems=true
        }else if(role=='Admission'){
         self.showAdmissionItems=true
        }else {
          
        }

      console.log('ADMIN')
      console.log(self.admin)
      console.log(self.teacher)

      self.update()
    })

    RiotControl.on('logOut_changed', function() {
     console.log("logged out");
        self.showAdminNavItems=false
        self.showTeacherNavItems=false
        route("/login")
        window.location.reload(true);
        // riot.route("/login")
    })

    RiotControl.on('change_password_completed', function(count) {
     console.log("Password changed");
     if(Number(count)==1){
        self.refs.oldPasswordInput.value=''
        self.refs.newPasswordInput.value=''
        self.refs.newPasswordInput2.value=''
        $("#passwordChangeModalMainUser").removeClass("is-active");
        toastr.info('Password Changed Successfully')
        self.update()
     }else{
      toastr.error('Please check your password')
     }

    });
  </script>
</main-nav>
