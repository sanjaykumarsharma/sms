<student-login-slip>
<loading-bar if={loading}></loading-bar>  

  <section class=" is-fluid" show={view=='home'}>

    <div class="level">
      <div class="level-left">
        <h2 class="title" style="color: #ff3860;">Login Slip</h2>
      </div>
      <div class="level-right">
        <button class="button is-warning is-rounded has-text-weight-bold" onclick={printLoginSlipAll}> Print Login Slip </button>
        <button class="button is-warning is-rounded has-text-weight-bold ml5" onclick={generateID}> Generate ID </button>
      </div>
    </div>
     
    <div class="box">
      <div class="columns">

        <div class="column is-narrow"><label class="label">Standard</label></div>  
        <div class="column is-narrow">  
          <div class="control">
            <div class="select is-fullwidth">
              <select ref="standardSelect" id="standard" onchange={changeSection}>
                <option value="">Select Standard</option>
                <option each={classes} value={standard_id}>{standard}</option>
              </select>
            </div>
          </div>
        </div>

        <div class="column is-narrow"><label class="label">Section</label></div>  
        <div class="column is-narrow">  
          <div class="control">
            <div class="select is-fullwidth">
              <select ref="sectionSelect" id="section">
                <option value="">Select Section</option>
                <option each={tempSections} value={section_id}>{section}</option>
              </select>
            </div>
          </div>
        </div>

        <div class="column is-narrow">
          <button class="button is-danger has-text-weight-bold" onclick={refreshStudents} >GO </button>
        </div>
          
      </div>
    </div> 

     <table class="table is-fullwidth is-striped is-hoverable">
      <thead>
        <tr>
          <th class="slno">Sl</th>
          <th>Roll No</th>
          <th>Enroll No</th>
          <th>Login ID</th>
          <th>Student's Name</th>
          <th>Father's Name</th>
          <th>Active</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr each={c, i in students}>
          <td>{i+1}</td>
          <td>{c.roll_number}</td>
          <td>{c.enroll_number}</td>
          <td>{c.login}</td>
          <td>{c.student}</td>
          <td>{c.f_name}</td>
          <td>{c.is_active}</td>
          <td class="has-text-right">
            <span>
              <a class="button is-small is-rounded is-danger" show={c.is_active=='Y'} rel="nofollow" onclick={allowBlock.bind(this, c)}>Block</a>
              <a class="button is-small is-rounded is-primary" show={c.is_active=='N'} rel="nofollow" onclick={allowBlock.bind(this, c)}>Allow</a>
              <a class="button is-small is-rounded" onclick={printLoginSlip.bind(this, c)}>Print</a>
              <a class="button is-small is-rounded" onclick={resetPassword.bind(this, c)}>Reset Password</a>
            </span>
          </td>
        </tr>
      </tbody>
    </table>
     
  </section>

  <section class=" is-fluid" show={view=='print-details'}>

    <div class="level no-print">
      <div class="level-left">
        <h2 class="title" style="color: #ff3860;">Login Slip</h2>
      </div>
      <div class="level-right">
        <button class="button is-warning is-rounded" onclick={backToHome}>
        <span class="icon">
          <span class="fas fa-arrow-left"></span>
        </span>
        </button>
        
      </div>
    </div>


    <div each={c, i in studentDetails}>
      <table class="table">
          <tr><th>Student Name</th><td>{c.student}</td></tr>
          <tr><th>Class</th><td>{c.standard} {c.section}</td></tr>
          <tr><th>Enroll Number</th><td>{c.enroll_number}</td></tr>
          <tr><th>Father's Name</th><td>{c.f_name}</td></tr>
          <tr><th>Student's/Parent Login ID</th><td>{c.login}</td></tr>
          <tr><th>Student's Password</th><td>{c.password}</td></tr>
          <tr><th>Parent's Password</th><td>{c.parent_password}</td></tr>    
     </table>
     <h6>How to login on website:- www.mckv.edu.in> Member Login > Enter login ID and Password >> Select user type (Students or parents) > Press OK</h6>
     <p>Note : Please keep the password details secure with you.</p>
    </div>

  </section>
	<script>
	var self = this
    self.on("mount", function(){
      self.loading = false;
      self.view = 'home'
      self.update()
      // flatpickr(".date", {
      //   allowInput: true,
      //   dateFormat: "d/m/Y",
      // })
      self.readClass()
      self.readSection()
    })
    self.on("unmount", function(){
      studentLoginSlipStore.off('read_classes_changed',ClassesChanged)
      studentLoginSlipStore.off('read_section_changed',SectionChanged)

      studentLoginSlipStore.off('read_students_changed',ReadSectionsChanged)
      studentLoginSlipStore.off('update_login_status_changed',UpdateLoginStatusChanged)
      studentLoginSlipStore.off('print_login_slip_changed',PrintLoginSlipChanged)
      studentLoginSlipStore.off('reset_password_changed', ResetPasswordChanged)
      studentLoginSlipStore.off('generate_id_changed', GenerateIDChanged)
    })

    self.readClass = () => {
       self.loading = true;
       studentLoginSlipStore.trigger('read_classes')
    }

    self.readSection = () => {
       self.loading = true;
       studentLoginSlipStore.trigger('read_section')
    }

    self.changeSection = () => {
       if(self.refs.standardSelect.value==''){
        toastr.info("Please select standard and try again")
       }else{
        self.tempSections = []
        self.tempSections = self.sections.filter(s=>{
          return s.standard_id==self.refs.standardSelect.value
        })
       }
    }

    // ****************************************** students *************************************

    self.refreshStudents = () =>{

      let error = '';
      
      if(self.refs.standardSelect.value==''){
        error = error + "Please select standard, "
      }

      if(self.refs.sectionSelect.value==''){
        error = error + "Please select section of student, "
      }

      if(error.length!=0){
        toastr.error(error)
        return
      }else{
        self.loading = true
        studentLoginSlipStore.trigger('read_students', self.refs.standardSelect.value, self.refs.sectionSelect.value) 
      }
      
    }


    self.allowBlock = (c,e) =>{
      self.loading = true
      var is_active = 'N'
      if(c.is_active=='Y'){
        is_active='N'
      }else{
        is_active='Y'
      }
      studentLoginSlipStore.trigger('update_login_status', c.enroll_number, is_active)
    }

    self.resetPassword = (c,e) =>{
      self.loading = true
      studentLoginSlipStore.trigger('reset_password', c.enroll_number)
    }

    self.printLoginSlip = (c,e) =>{
      let error = '';
      
      if(self.refs.standardSelect.value==''){
        error = error + "Please select standard, "
      }

      if(self.refs.sectionSelect.value==''){
        error = error + "Please select section of student, "
      }

      if(error.length!=0){
        toastr.error(error)
        return
      }else{
        self.loading = true
        studentLoginSlipStore.trigger('print_login_slip', self.refs.standardSelect.value, self.refs.sectionSelect.value, c.student_id) 
      }

    }

    self.printLoginSlipAll = () =>{
      let error = '';
      
      if(self.refs.standardSelect.value==''){
        error = error + "Please select standard, "
      }

      if(self.refs.sectionSelect.value==''){
        error = error + "Please select section of student, "
      }

      if(error.length!=0){
        toastr.error(error)
        return
      }else{
        self.loading = true
        studentLoginSlipStore.trigger('print_login_slip_all', self.refs.standardSelect.value, self.refs.sectionSelect.value) 
      }

    }

    self.backToHome = () => {
      self.view = 'home'
    }

    self.generateID = () =>{
      let error = '';
      
      if(self.refs.standardSelect.value==''){
        error = error + "Please select standard, "
      }

      if(self.refs.sectionSelect.value==''){
        error = error + "Please select section of student, "
      }

      if(error.length!=0){
        toastr.error(error)
        return
      }else{
        self.loading = true
        studentLoginSlipStore.trigger('generate_id', self.refs.standardSelect.value, self.refs.sectionSelect.value) 
      }

    }

    // ****************************************** all change metods *************************************
    studentLoginSlipStore.on('read_classes_changed',ClassesChanged)
    function ClassesChanged(classes){
      self.loading = false
      self.classes = []
      self.classes = classes
      self.update()
      console.log(self.classes)
    }

    studentLoginSlipStore.on('read_section_changed',SectionChanged)
    function SectionChanged(sections){
      self.loading = false
      self.sections = []
      self.sections = sections
      self.update()
    }

    /************************************************ students changed Method ************************************************/
   

    studentLoginSlipStore.on('read_students_changed',ReadSectionsChanged)
    function ReadSectionsChanged(students){
      self.loading = false
      self.students = []
      self.students = students
      self.students.map(c => {
          c.selected=false
      })
     
      self.update()
    }

    studentLoginSlipStore.on('update_login_status_changed',UpdateLoginStatusChanged)
    function UpdateLoginStatusChanged(){
      self.loading = false

      self.refreshStudents()
      
    } 

    studentLoginSlipStore.on('print_login_slip_changed',PrintLoginSlipChanged)
    function PrintLoginSlipChanged(details){
      self.view = 'print-details'
      self.loading = false
      self.studentDetails = []
      self.studentDetails = details
      self.update()
    }
    
    studentLoginSlipStore.on('reset_password_changed', ResetPasswordChanged)
    function ResetPasswordChanged(){
      self.loading = false
      self.update()
    }

    studentLoginSlipStore.on('generate_id_changed', GenerateIDChanged)
    function GenerateIDChanged(){
      self.loading = false
      self.update()
    }


</script>
</student-login-slip>