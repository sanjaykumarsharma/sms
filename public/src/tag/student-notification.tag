<student-notification>
	<section class="is-fluid">
		<div class="level">
			<div class="level-left">
				<h2 class="title" style="color: #ff3860;">Students</h2>
			</div>
		</div>
		<div class="box">
			<div class="columns">
				<div class="column is-narrow">
					<div class="control">
						<div class="select">
							<select ref="standard_id" onchange={getSection}>
								<option>Choose Section</option>
								<option each={standards} value={standard_id}>{standard}</option>
							</select>
						</div>
					</div>
				</div>
				<div class="column is-narrow">
					<div class="control">
			      <div class="select is-fullwidth">
							<select ref="section_id" onchange={getStudentData}>
								<option>Choose Class</option>
								<option value="-1">ALL</option>
								<option each={filteredSections} value={section_id}>{section}</option>
							</select>
						</div>
			    </div>
			  </div>
        <div class="column is-narrow">
          <div class="control">
            <div class="select">
              <select ref="get_message_type" onchange={getMessageType}>
                <option>Select Message Type</option>
                <option value="Email">Email</option>
                <option value="SMS">SMS</option>
                <option value="Both">Both</option>
              </select>
            </div>
          </div>
        </div>
        <div class="column is-narrow">
          <div class="control">
            <div class="select">
              <select ref="get_phone_no">
                <option>Send To</option>
                <option value="sms_number">SMS Number</option>
                <option value="parents">Parents</option>
                <option value="Both_Number">Both</option>
              </select>
            </div>
          </div>
        </div>
        <div class="column">
          <button class="button is-danger has-text-weight-bold" onclick={getStudentManually} show={choose_button}>Choose Student Manually
          </button>
          <button class="button has-text-weight-bold" onclick={closeStudentManually} show={close_button} >Close
          </button>
        </div>
			</div>
		</div>
		<table class="table is-fullwidth is-striped is-hoverable is-narrow" show={student_table}>
			<thead>
				<tr>
					<th>#</th>
					<th>Name</th>
					<th>Mobile</th>
					<th>Email</th>
					<th>Course</th>
					<th style="text-align:center;">
			      <input type="checkbox" id="checkStudentName" 
			      onclick={selectAll}>
			    </th>
				</tr>
			</thead>
			<tbody>
				<tr each={st, i in students}>
					<td>{ i+1 }</td>
					<td>{st.name}</td>
					<td>{st.mobile}</td>
					<td>{st.email}</td>
					<td>{st.standard}</td>
					<td style="width:2%; text-align:center;"><input type="checkbox" checked={st.done} id="{ 'addStudentName' + st.student_id }" 
          onclick={ selectStudent.bind(this,st) }></td>
				</tr>
			</tbody>
		</table>
    <input class="input" style="margin-bottom: 12px;" type="text" id="student_subject" ref="student_subject" 
    show={student_subject} placeholder="SUBJECT"><br>
		<textarea class="textarea" id="student_message" ref="student_message" placeholder="MESSAGE"></textarea><br>
    <button class="button is-info is-pulled-right ml5" onclick={clear} >Reset</button>
		<button class="button is-danger is-pulled-right" onclick={sendStudentNotification} >Send</button>
	</section>
<script>
	var self = this
    self.on("mount", function(){
    	self.role = getCookie('role')
    	self.addAllCheckBox=true;
      	self.addCheckBox=true;
    	self.readStandard()
    	self.readSection()
      self.choose_button = true
      self.close_button = false
        self.update()
        flatpickr(".date", {
	    	allowInput: true,
        	dateFormat: "d/m/Y",
  		})
    })

    self.on("unmount", function(){
      studentNotificationStore.off('read_standard_changed', StandardChanged)
      studentNotificationStore.off('read_section_changed', SectionChanged)
      studentNotificationStore.off('students_changed', StudentChanged)
      studentNotificationStore.off('student_sms_changed',SendSmsChanged)
    })

    self.getMessageType = () =>{
      if(self.refs.get_message_type.value =='SMS'){
        self.student_subject = false
      }else if(self.refs.get_message_type.value =='Email'){
        self.student_subject = true
      }else{
        self.student_subject = true
      }
    }

    self.getStudentManually = () =>{
      self.student_table= true;
      self.choose_button = false
      self.close_button = true
    }

    self.closeStudentManually = () =>{
      self.student_table = false;
      self.choose_button = true
      self.close_button = false
    }

    self.readStandard = () => {
       studentNotificationStore.trigger('read_standard')
    }

    self.readSection = () => {
       studentNotificationStore.trigger('read_section')
    }

    self.getSection = () => {
    	self.filteredSections = []
    	self.filteredSections = self.sections.filter(s => {
    		return s.standard_id == self.refs.standard_id.value
    	})
    }
    self.getStudentData = ()=>{
    	console.log("inside student")
    	  var obj={}
          obj['standard_id']=self.refs.standard_id.value
          obj['section_id']=self.refs.section_id.value
          self.loading = true
          studentNotificationStore.trigger('read_students', obj)
          console.log(obj)
    }

    self.selectAll = () => {
      //self.mobile = []
      //self.email = []
      if($('#checkStudentName').is(":checked")){
        self.students.map(i=>{
          i.done = true;
          $('addStudentName'+i.student_id).prop('checked', true);
        })
      }else{
        self.students.map(i=>{
          i.done = false;
          $('addStudentName'+i.student_id).prop('checked', false);
        })
      }
      console.log(self.students)
    }

    self.selectStudent = (item,event) => {
      item.done=!event.item.st.done
      self.mobile = item.mobile;
        console.log(self.mobile)
    }

    self.sendStudentNotification = ()=>{
     let mobile='';
     let email='';
     let p_mobile='';
     let p_email='';
     self.students.map( q => {
        if(q.done){
          if(mobile==''){
            mobile=q.mobile
          }else{
            mobile=mobile+','+q.mobile
          }

          if(email==''){
            email=q.email
          }else{
            email=email+','+q.email
          }

          if(p_mobile==''){
            p_mobile=q.p_mobile
          }else{
            p_mobile=p_mobile+','+q.p_mobile
          }
          if(p_email==''){
            p_email=q.p_email
          }else{
            p_email=p_email+','+q.p_email
          }
        }
      })
      
      console.log(mobile);
      console.log(email);
      if(self.refs.get_message_type.value =='SMS'){
        if(self.refs.get_phone_no.value=='sms_number'){
          studentNotificationStore.trigger('send_sms',mobile,self.refs.student_message.value)
        }else if(self.refs.get_phone_no.value=='parents') {
          studentNotificationStore.trigger('send_sms',p_mobile,self.refs.student_message.value)
        }else if(self.refs.get_phone_no.value=='Both_Number') {
          studentNotificationStore.trigger('send_sms',mobile,self.refs.student_message.value)
          studentNotificationStore.trigger('send_sms',p_mobile,self.refs.student_message.value)
        }
      }else if(self.refs.get_message_type.value =='Email'){
        if(self.refs.get_phone_no.value=='sms_number'){
          studentNotificationStore.trigger('send_email',email,self.refs.student_subject.value,self.refs.student_message.value)
        }else if(self.refs.get_phone_no.value=='parents') {
          studentNotificationStore.trigger('send_email',p_email,self.refs.student_subject.value,self.refs.student_message.value)
        }else if(self.refs.get_phone_no.value=='Both_Number') {
          studentNotificationStore.trigger('send_email',p_email,self.refs.student_subject.value,self.refs.student_message.value)
          studentNotificationStore.trigger('send_email',email,self.refs.student_subject.value,self.refs.student_message.value)
        }
      }else if(self.refs.get_message_type.value=='Both'){
        if(self.refs.get_phone_no.value=='sms_number'){
          studentNotificationStore.trigger('send_sms',mobile,self.refs.student_message.value)
          studentNotificationStore.trigger('send_email',email,self.refs.student_subject.value,self.refs.student_message.value)
        }else if(self.refs.get_phone_no.value=='parents') {
          studentNotificationStore.trigger('send_sms',p_mobile,self.refs.student_message.value)
          studentNotificationStore.trigger('send_email',p_email,self.refs.student_subject.value,self.refs.student_message.value)
        }else if(self.refs.get_phone_no.value=='Both_Number') {
          studentNotificationStore.trigger('send_sms',mobile,self.refs.student_message.value)
          studentNotificationStore.trigger('send_sms',p_mobile,self.refs.student_message.value)
          studentNotificationStore.trigger('send_email',email,self.refs.student_subject.value,self.refs.student_message.value)
          studentNotificationStore.trigger('send_email',p_email,self.refs.student_subject.value,self.refs.student_message.value)
          
        }
      }
    }

    self.clear = () => {
      self.refs.student_subject.value = ''
      self.refs.student_message.value = ''
    }

    studentNotificationStore.on('read_standard_changed',StandardChanged)
    function StandardChanged(standards){
      console.log(standards) 
      self.standards = standards
      self.update()
    }

    studentNotificationStore.on('read_section_changed',SectionChanged)
    function SectionChanged(sections){
      console.log(sections) 
      self.sections = sections
      self.update()
      self.getSection()
    }

    studentNotificationStore.on('students_changed',StudentChanged)
    function StudentChanged(students){
      console.log(students) 
      self.students = []
      self.students = students
      self.students.map(i=>{
      if(i.mobile==""){
        i.done = false; //RoleId1
        //i.mobile = self.mobile
        $('addStudentName' + i.student_id ).prop('checked', false);
      }else{
        i.done = true;
        $('addStudentName' + i.student_id ).prop('checked', true);
      } 
      })
      self.update()
    }

    studentNotificationStore.on('student_sms_changed',SendSmsChanged)
    function SendSmsChanged(){
      toastr.success('sms send successfully')
      self.refs.student_subject.value = ''
      self.refs.student_message.value = ''
      self.update()
    }
    studentNotificationStore.on('student_email_changed',SendEmailChanged)
    function SendEmailChanged(){
      toastr.success('email send successfully')
      self.refs.student_subject.value = ''
      self.refs.student_message.value = ''
      self.update()
    }
</script>
</student-notification>