<id-card>
	<section class=" is-fluid" show={student_view =='show_student_list_view'}>
		<div class="level">
			<div class="level-left">
				<h2 class="title" style="color: #ff3860;">Print Cards</h2>
			</div>
			<div class="level-right">
				<button class="button is-small " onclick={id_card_print_preview}>
				<span>Issue Id Card</span>
				</button>

				<button class="button is-small  ml5" onclick={escort_card_print_preview}>
				<span>Issue Escort Card</span>
				</button>

				<button class="button is-small  ml5" onclick={duplicate_id_card_print_preview}>
				<span>Duplicate Id Card</span>
				</button>

				<button class="button  is-small  ml5" onclick={duplicate_escort_card_print_preview}>
				<span>Duplicate Escort Card</span>
				</button>
			</div>
		</div>
		<div class="level box">
			<div class="level-left">
				<div class="columns">
					<div class="column is-narrow">
						<label class="label">Standard</label>
					</div>
					<div class="column is-narrow">
						<div class="control">
							<div class="select">
								<select ref="standard_id" onchange={getSection}>
									<option each={standards} value={standard_id}>
									{standard}</option>
								</select>
							</div>
						</div>
					</div>
					<div class="column is-narrow">
						<label class="label">Section</label>
					</div>
					<div class="column is-narrow">
						<div class="control">
				      <div class="select is-fullwidth">
								<select ref="section_id" onchange={getStudentData}>
									<option each={filteredSections} value={section_id}>{section}</option>
								</select>
							</div>
				    </div>
				  </div>
				</div>
			</div>
			<div class="level-right">
        <div class="column is-narrow field">
          <div class="control">
              <input class="input" ref="searchStudent" onkeyup={filterStudent} type="text" placeholder="Search Here">
            </div>
        </div>
				<div class="column is-narrow field has-addons">
					<div class="control">
				    	<input class="input" ref="read_enroll_number" type="text" placeholder="Enter Enroll No">
				  	</div>
			    <div class="control">
			    	<a class="button is-info" onclick={getStudentData}>Search</a>
			  	</div>
				</div>

				<button class="button is-link has-text-weight-bold ml5" style="margin-bottom:12px;" onclick={getStudentData}>
          <span class="icon">
            <span class="fas fa-sync-alt"></span>
          </span>
        </button>

        <button class="button is-success has-text-weight-bold ml5" style="margin-bottom:12px;" onclick={downloadCSV}>
			    <span class="icon">
            <i class="far fa-file-excel"></i>
          </span>
	      </button>
			</div>
		</div>
		
		<table class="table is-fullwidth is-bordered is-hoverable is-narrow">
			<thead>
				<tr>
					<th>SL no</th>
					<th>Enroll No</th>
					<th>Roll no</th>
					<th>Student Name</th>
					<th class="has-text-centered">
	        	<input type="checkbox" id="checkStudent" onclick={selectAll}>
	      	</th>
				</tr>
			</thead>
			<tbody>
				<tr each={st, i in filteredStudent}>
					<td>{ i+1 }</td>
					<td>{st.enroll_number}</td>
					<td>{st.roll_number}</td>
					<td>{st.name}</td>
					<td class="has-text-centered">
	        	<input type="checkbox" class="id_check_box" checked={st.done} id="{ 'StudentId' + st.student_id }" onclick={selectStudent.bind(this,st)} >
	      	</td>
				</tr>
			</tbody>
		</table>
	</section>

<section class="container is-fluid " show={student_view =='show_student_print_view'}>
  <div class="level no-print">
    <div class="level-left"></div>
    <div class="level-right" style="margin-bottom: 5px;">
      <button class="button is-warning has-text-weight-bold" onclick={close_print_view} style="margin-right: 5px;">
        <span class="icon">
          <span class="fas fa-arrow-left"></span>
        </span>
      </button>
      <button class="button is-primary has-text-weight-bold" onclick="window.print()">
        <span class="icon">
          <span class="fas fa-print"></span>
        </span>
      </button>
    </div>
  </div>
  <div each={st, i in students_id_card_details} style="font-size: 0.9rem; font-family: 'Open Sans', sans-serif;">
    <center>
        <div class="card-student-id schoolbg">
            <div class="header-student-id-card">Student Identity Card {st.session_name}</div>

              <div style="padding:2px;"><img style="border:solid Black 1px;height:75px;" src="images/{session_id}/studentImages/{st.student_id}.jpg"></div>

              <div class="title-student-id-card is-uppercase">{st.student_name}</div>

              <div class="title-student-id-card">{st.standard} - {st.section}</div>

              
              <div padding:"2px;"><span class="barcode">*{st.enroll_number}*</span></div>
                 
                  <table class="detail-student-id-card">
                     <tr>
                        <td colSpan="2">Enrolment No.: {st.enroll_number}</td>
                     </tr>
                     <tr>
                        <td colSpan="2" class="" >Fathers'Name: {st.f_name}</td>
                     </tr>
                     <tr>
                      <td align="baseline">Address:</td>
                      <td>{st.c_add_l1} {st.c_add_l2} {st.c_city} {st.c_zip}</td>
                     </tr>
                     <tr>
                        <td colSpan="2">Mob. No.: {st.mobile}</td>
                     </tr>
                     <tr>
                        <td colSpan="2">Mode of Transport: {st.transport_mode}</td>
                     </tr>
                  </table>

                      <div style="width:50%;margin-right: 63px;" class="lower-student-id-card">Blood Group:<span style="color:#ff0000">{st.blood_group}</span></div>
                      <div style="width:45%;right: 10px; position:absolute; bottom:10px" class="principal">
                              <p><img src="images/signatureImages/Principal.jpg" style="height: 24px"></p>
                              <p>Principal</p>
                      </div>
              </div>
        </center>
        <div class="" style="margin-top:65px;"></div>
      <div class="page-break w-full flex-auto" id="id_card_pb_back_16"></div>
  </div>
</section>

<section class="container is-fluid " show={student_view =='show_student_print_view_duplicate'}>
  <div class="level no-print">
    <div class="level-left"></div>
    <div class="level-right" style="margin-bottom: 5px;">
      <button class="button is-warning has-text-weight-bold" onclick={close_duplicate_print_view} style="margin-right: 5px;">
        <span class="icon">
          <span class="fas fa-arrow-left"></span>
        </span>
      </button>
      <button class="button is-primary has-text-weight-bold" onclick="window.print()">
        <span class="icon">
          <span class="fas fa-print"></span>
        </span>
      </button>
    </div>
  </div>
  <div each={st, i in students_id_card_details} style="font-size: 0.9rem; font-family: 'Open Sans', sans-serif;">
    <center>
        <div class="card-student-id schoolbg">
            <div class="header-student-id-card">Duplicate Student Identity Card {st.session_name}</div>

              <div style="padding:2px;"><img style="border:solid Black 1px;height:75px;" src="images/{session_id}/studentImages/{st.student_id}.jpg"></div>

              <div class="title-student-id-card is-uppercase">{st.student_name}</div>

              <div class="title-student-id-card">{st.standard} - {st.section}</div>

              
              <div padding:"2px;"><span class="barcode">*{st.enroll_number}*</span></div>
                 
                  <table class="detail-student-id-card">
                     <tr>
                        <td colSpan="2">Enrolment No.: {st.enroll_number}</td>
                     </tr>
                     <tr>
                        <td colSpan="2" >Fathers'Name: {st.f_name}</td>
                     </tr>
                     <tr>
                      <td align="baseline">Address:</td>
                      <td>{st.c_add_l1} {st.c_add_l2} {st.c_city} {st.c_zip}</td>
                     </tr>
                     <tr>
                        <td colSpan="2">Mob. No.: {st.mobile}</td>
                     </tr>
                     <tr>
                        <td colSpan="2">Mode of Transport: {st.transport_mode}</td>
                     </tr>
                  </table>

                      <div style="width:50%;margin-right: 63px;" class="lower-student-id-card">Blood Group:<span style="color:#ff0000">{st.blood_group}</span></div>
                      <div style="width:45%;right: 10px; position:absolute; bottom:10px" class="principal">
                              <p><img src="images/signatureImages/Principal.jpg" style="height: 24px"></p>
                              <p>Principal</p>
                      </div>
              </div>
        </center>
        <div class="" style="margin-top:65px;"></div>
      <div class="page-break w-full flex-auto" id="id_card_pb_back_16"></div>
  </div>
</section>

<section class="container is-fluid " show={student_view =='show_student_escort_card_print_view'}>
  <div class="level no-print">
    <div class="level-left"></div>
    <div class="level-right" style="margin-bottom: 5px;">
      <button class="button is-warning has-text-weight-bold" onclick={close_print_view} style="margin-right: 5px;">
        <span class="icon">
          <span class="fas fa-arrow-left"></span>
        </span>
      </button>
      <button class="button is-primary has-text-weight-bold" onclick="window.print()">
        <span class="icon">
          <span class="fas fa-print"></span>
        </span>
      </button>
    </div>
  </div>
  <div each={st, i in students_escort_card_details} style="font-size: 0.9rem; font-family: 'Open Sans', sans-serif;">
    <center>
        <div class="card-student-escort schoolbg-escort">
            <div class="header-student-escort-card">Student Escort Card {st.session_name}</div>

              <div style="padding:2px;"><img style="border:solid Black 1px;height:75px;" src="images/{session_id}/studentImages/{st.student_id}.jpg"></div>

              <div class="title-student-id-card is-uppercase">{st.student_name}</div>

              <div class="title-student-id-card">{st.standard} - {st.section}</div>

              
              <div padding:"2px;"><span class="barcode">*{st.enroll_number}*</span></div>
                 
                  <table class="detail-student-id-card" style="">
                     <tr>
                        <td colSpan="2">Enrolment No.: {st.enroll_number}</td>
                     </tr>
                     <tr>
                        <td colSpan="2" >Fathers'Name: {st.f_name}</td>
                     </tr>
                     <tr>
                      <td align="baseline">Address:</td>
                      <td>{st.c_add_l1} {st.c_add_l2} {st.c_city} {st.c_zip}</td>
                     </tr>
                     <tr>
                        <td colSpan="2">Mob. No.: {st.mobile}</td>
                     </tr>
                     <tr>
                        <td colSpan="2">Mode of Transport: {st.transport_mode}</td>
                     </tr>
                  </table>

                      <div style="width:50%;margin-right: 63px;" class="lower-student-id-card">Blood Group:<span style="color:#ff0000">{st.blood_group}</span></div>
                      <div style="width:45%;right: 10px; position:absolute; bottom:10px" class="principal">
                              <p><img src="images/signatureImages/Principal.jpg" style="height: 24px"></p>
                              <p>Principal</p>
                      </div>
              </div>
        </center>
        <div class="" style="margin-top:65px;"></div>
      <div class="page-break w-full flex-auto" id="id_card_pb_back_16"></div>
  </div>
</section>

<section class="container is-fluid" show={student_view =='show_student_escort_card_print_view_duplicate'}>
	<div class="level no-print">
		<div class="level-left"></div>
		<div class="level-right" style="margin-bottom: 5px;">
			<button class="button is-warning has-text-weight-bold" onclick={close_print_view} style="margin-right: 5px;">
				<span class="icon">
					<span class="fas fa-arrow-left"></span>
				</span>
			</button>
			<button class="button is-primary has-text-weight-bold" onclick="window.print()">
				<span class="icon">
					<span class="fas fa-print"></span>
				</span>
			</button>
		</div>
	</div>
	<div each={st, i in students_escort_card_details} style="font-size: 0.9rem; font-family: 'Open Sans', sans-serif;">
		<center>
        <div class="card-student-escort schoolbg-escort-duplicate">
            <div class="header-student-escort-card-duplicate">Duplicate Student Escort Card {st.session_name}</div>

              <div style="padding:2px;"><img style="border:solid Black 1px;height:75px;" src="images/{session_id}/studentImages/{st.student_id}.jpg"></div>

              <div class="title-student-id-card is-uppercase">{st.student_name}</div>

              <div class="title-student-id-card">{st.standard} - {st.section}</div>

              
              <div padding:"2px;"><span class="barcode">*{st.enroll_number}*</span></div>
                 
                  <table class="detail-student-id-card" >
                     <tr>
                        <td colSpan="2">Enrolment No.: {st.enroll_number}</td>
                     </tr>
                     <tr>
                        <td colSpan="2" >Fathers'Name: {st.f_name}</td>
                     </tr>
                     <tr>
                      <td align="baseline">Address:</td>
                      <td>{st.c_add_l1} {st.c_add_l2} {st.c_city} {st.c_zip}</td>
                     </tr>
                     <tr>
                        <td colSpan="2">Mob. No.: {st.mobile}</td>
                     </tr>
                     <tr>
                        <td colSpan="2">Mode of Transport: {st.transport_mode}</td>
                     </tr>
                  </table>

                      <div style="width:50%; margin-right: 63px;" class="lower-student-id-card">Blood Group:<span style="color:#ff0000">{st.blood_group}</span></div>
                      <div style="width:45%;right: 10px; position:absolute; bottom:10px" class="principal">
                              <p><img src="images/signatureImages/Principal.jpg" style="height: 24px"></p>
                              <p>Principal</p>
                      </div>
              </div>
        </center>
        <div class="" style="margin-top:65px;"></div>
  		<div class="page-break w-full flex-auto" id="id_card_pb_back_16"></div>
	</div>
</section>

<script>
	
	var self = this
    self.on("mount", function(){
    	self.role = getCookie('role')
    	self.readStandard()
    	self.readSection()
    	self.student_view = 'show_student_list_view'
        self.update()
        flatpickr(".date", {
	    	allowInput: true,
        	dateFormat: "d/m/Y",
  		})
    })

    self.on("unmount", function(){
     	idCardStore.off('read_standard_changed',StandardChanged)
    	idCardStore.off('read_section_changed',SectionChanged)
    	idCardStore.off('read_student_changed',StudentChanged)
    	idCardStore.off('read_id_card_changed',ReadIdCardChanged)
      idCardStore.off('csv_export_id_card_changed',csvIDCardChanged)
    })

    self.downloadCSV = () =>{
      idCardStore.trigger('csv_export_id_card', self.students)
    }

    self.getStudentData = () =>{

    	if(self.refs.read_enroll_number.value==""){
        self.loading = true
    		idCardStore.trigger('read_student', self.refs.standard_id.value,self.refs.section_id.value,0)
    	}else{
        self.loading = true
    		idCardStore.trigger('read_student',self.refs.standard_id.value,self.refs.section_id.value,
      	self.refs.read_enroll_number.value)
    	} 
    }

    self.readStandard = () => {
       idCardStore.trigger('read_standard')
    }

    self.readSection = () => {
       idCardStore.trigger('read_section')
    }

    self.getSection = () => {
    	self.filteredSections = []
    	self.filteredSections = self.sections.filter(s => {
    		return s.standard_id == self.refs.standard_id.value
    	})
      self.update()
      self.getStudentData()
    }

    self.id_card_print_preview = () => {
    	
    	let student_id='';
	     self.students.map( q => {
	        if(q.done){
	          if(student_id==''){
	            student_id=q.student_id
	          }else{
	            student_id=student_id+','+q.student_id
	          }
	        }
	      })
	     console.log(student_id);
      if(student_id==''){
        toastr.info('Please select at least one student and try again')
      }else{
      	self.student_view	= 'show_student_print_view'
        idCardStore.trigger('read_id_card',student_id)
      }
    }

    self.duplicate_id_card_print_preview = () => {
    	let student_id='';
	     self.students.map( q => {
	        if(q.done){
	          if(student_id==''){
	            student_id=q.student_id
	          }else{
	            student_id=student_id+','+q.student_id
	          }
	        }
	      })
	     console.log(student_id);
      if(student_id==''){
        toastr.info('Please select at least one student and try again')
      }else{
      	self.student_view	= 'show_student_print_view_duplicate'
        idCardStore.trigger('read_id_card',student_id)
      }
    }
    self.close_print_view = () => {
      self.student_view = 'show_student_list_view'
    }

    self.close_duplicate_print_view = () => {
    	self.student_view	= 'show_student_list_view'
    }

     self.escort_card_print_preview = () => {
    	
    	let student_id='';
	     self.students.map( q => {
	        if(q.done){
	          if(student_id==''){
	            student_id=q.student_id
	          }else{
	            student_id=student_id+','+q.student_id
	          }
	        }
	      })
	     console.log(student_id);
      if(student_id==''){
        toastr.info('Please select at least one student and try again')
      }else{
      	self.student_view	= 'show_student_escort_card_print_view'
        idCardStore.trigger('read_escort_card',student_id)
      }
    }

    self.duplicate_escort_card_print_preview = () => {
    	
    	let student_id='';
	     self.students.map( q => {
	        if(q.done){
	          if(student_id==''){
	            student_id=q.student_id
	          }else{
	            student_id=student_id+','+q.student_id
	          }
	        }
	      })
	     console.log(student_id);
      if(student_id==''){
        toastr.info('Please select at least one student and try again')
      }else{
      	self.student_view	= 'show_student_escort_card_print_view_duplicate'
        idCardStore.trigger('read_escort_card',student_id)
      }
    }

    self.selectAll = () => {

    	if($('#checkStudent').is(":checked")){
    		self.students.map(i=>{
	          i.done = true;
	          $('StudentId'+i.student_id).prop('checked', true);
	          
	        })
    	}else{
    		self.students.map(i=>{
	          i.done = false;
	          $('StudentId'+i.student_id).prop('checked', false);
	          self.student_id = i.student_id;
            console.log(self.student_id)
	        })
    	}
      console.log(self.students)
    }

    self.selectStudent = (item,event) => {
    	item.done=!event.item.st.done
        self.student_id = item.student_id;
        console.log(self.student_id)
    }

    self.filterStudent = ()=>{
      self.filteredStudent = self.students.filter(c => {
        return JSON.stringify(c).toLowerCase().indexOf(self.refs.searchStudent.value.toLowerCase())>=0
      })
    }

    idCardStore.on('read_id_card_changed',ReadIdCardChanged)
    function ReadIdCardChanged(students_id_card_details, session_id){
      console.log(students_id_card_details)
      self.session_id = session_id
      self.students_id_card_details = []
      self.students_id_card_details = students_id_card_details
      self.update()
    }

    idCardStore.on('read_escort_card_changed',ReadEscortCardChanged)
    function ReadEscortCardChanged(students_escort_card_details,session_id){
      console.log(students_escort_card_details)
      self.session_id = session_id
      self.students_escort_card_details = []
      self.students_escort_card_details = students_escort_card_details
      self.update()
    }

    idCardStore.on('read_standard_changed',StandardChanged)
    function StandardChanged(standards){
      console.log(standards) 
      self.standards = standards
      self.update()
    }

    idCardStore.on('read_section_changed',SectionChanged)
    function SectionChanged(sections){
      console.log(sections) 
      self.sections = sections
      self.update()
      self.getSection()
      self.getStudentData()
    }

    idCardStore.on('read_student_changed',StudentChanged)
    function StudentChanged(students){
      self.loading = false
      self.students = students
      self.filteredStudent = students
      self.students.map(i=>{
	      i.done = false;
      })
      $("#checkStudent").prop("checked", false);
      self.update()
    }

    idCardStore.on('csv_export_id_card_changed',csvIDCardChanged)
    function csvIDCardChanged(url){
      var open_url = window.location.origin+url 
      window.open(open_url);
      self.loading = false
      self.update()
    }
</script>
</id-card>