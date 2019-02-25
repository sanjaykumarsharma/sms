<student-login-slip>
<loading-bar if={loading}></loading-bar>  

  <section class=" is-fluid" show={view=='home'}>

    <div class="level">
      <div class="level-left">
        <h2 class="title" style="color: #ff3860;">Login Slip</h2>
      </div>
      <div class="level-right">
        <button class="button has-text-weight-bold" onclick={allowBlock}>Allow/Block</button>
        <button class="button has-text-weight-bold ml5" onclick={printLoginSlipAll}> Print Login Slip </button>
        <button class="button has-text-weight-bold ml5" onclick={generateID}> Generate ID </button>
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
        <div class="column is-narrow">
          <div class="control">
            <input class="input" ref="searchStudent" onkeyup={filterStudent} type="text" placeholder="Search Here">
          </div>
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
           <th class="has-text-centered">
            <input type="checkbox" id="checkStudent" onclick={selectAll}>
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr each={c, i in filteredStudent}>
          <td>{i+1}</td>
          <td>{c.roll_number}</td>
          <td>{c.enroll_number}</td>
          <td>{c.login}</td>
          <td>{c.student}</td>
          <td>{c.f_name}</td>
          <td>{c.is_active}</td>
          <td class="has-text-centered">
            <input type="checkbox" class="id_check_box" checked={c.done} id="{ 'StudentId' + c.student_id }" onclick={selectStudent.bind(this,c)} >
          </td>
          <td class="has-text-right">
            <span>
              <!-- <a class="button is-small is-rounded is-danger" show={c.is_active=='Y'} rel="nofollow" onclick={allowBlock.bind(this, c)}>Block</a>
              <a class="button is-small is-rounded is-primary" show={c.is_active=='N'} rel="nofollow" onclick={allowBlock.bind(this, c)}>Allow</a> -->
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

    <center>  
      <div each={c, i in studentDetails} class="login-slip-box">
        <div class="outer">
          <table class="table login-table">
            <tr><th class="login-th">Student Name</th><td class="login-td">{c.student}</td></tr>
            <tr><th class="login-th">Class</th><td class="login-td">{c.standard} {c.section}</td></tr>
            <tr><th class="login-th">Enroll Number</th><td class="login-td">{c.enroll_number}</td></tr>
            <tr><th class="login-th">Father's Name</th><td class="login-td">{c.f_name}</td></tr>
            <tr><th class="login-th">Student's/Parent Login ID</th><td class="login-td">{c.login}</td></tr>
            <tr><th class="login-th">Student's Password</th><td class="login-td">{c.password}</td></tr>
            <tr><th class="login-th">Parent's Password</th><td class="login-td">{c.parent_password}</td></tr>    
          </table>
          <h6 class="login-h6">How to login on website:- www.mckv.edu.in> Member Login > Enter login ID and Password >> Select user type (Students or parents) > Press OK</h6>
          <p style="text-align:left;">Note : Please keep the password details secure with you.</p>
        </div>
        <div class="login-slip-divider" show={((i+1)%4)!=0}>
          <hr>
        </div>
        <div class="page-break" show={((i+1)%4)==0}></div>
      </div>
    </center>

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

    self.selectAll = () => {
      if($('#checkStudent').is(":checked")){
        self.students.map(c=>{
          c.done = true;
          $('StudentId'+c.student_id).prop('checked', true);  
        })
      }else{
        self.students.map(c=>{
          c.done = false;
          $('StudentId'+c.student_id).prop('checked', false);
          self.student_id = c.student_id;
        })
      }
    }

    self.selectStudent = (item,event) => {
      item.done=!event.item.c.done
      self.student_id = item.student_id;
    }

    self.allowBlock = () =>{
      let enroll_number='';
      var is_active = 'N'
      var st = []
       self.students.map( q => {
          if(q.done){
            var ob ={}
            ob.enroll_number=q.enroll_number

            if(q.is_active=='Y'){
              ob.is_active='N'
            }else{
              ob.is_active='Y'
            }
            st.push(ob)
          }
        })
        if(st.length==0){
          toastr.info('Please select at least one student and try again')
        }else{
          self.loading = true
          studentLoginSlipStore.trigger('update_login_status', st)
      }
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

    self.filterStudent = ()=>{
      self.filteredStudent = self.students.filter(c => {
        return JSON.stringify(c).toLowerCase().indexOf(self.refs.searchStudent.value.toLowerCase())>=0
      })
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
      self.filteredStudent = students
      self.students.map(c => {
        c.done=false
      })
      $("#checkStudent").prop("checked", false);
     
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