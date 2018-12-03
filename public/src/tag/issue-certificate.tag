<issue-certificate>
	<section class=" is-fluid">
		<div class="level">
			<div class="level-left">
				<h2 class="title" style="color: #ff3860;">Print Certificate</h2>
			</div>
		</div>
		<div class="box">
			<div class="columns">
				<div class="column is-narrow">
					<div class="control">
						<div class="select">
							<select ref="standard_id" onchange={getReadSection}>
								<option>Choose Standard</option>
								<!-- <option value='-1'>All</option> -->
								<option each={standards} value={standard_id}>{standard}
	                            </option>
							</select>
						</div>
					</div>
				</div>
				<div class="column is-narrow">
					<div class="control">
			        	<div class="select is-fullwidth">
							<select ref="section_id">
								<option>Choose Section</option>
								<!-- <option value='-1'>All</option> -->
								<option each={readfilteredSections} value={section_id}>{section}
	                            </option>
							</select>
						</div>
			      	</div>
			    </div>
				<div class="column is-narrow">
					<button class="button is-danger has-text-weight-bold"
					onclick={readStudent} >GO
					</button>
					<!-- <input type="checkbox" id="checkTable" checked={e.done}
									    onclick={viewTable}  style="margin-top: 12px;"> Add New  -->
				</div>
				<!-- <div class="column is-narrow" show={report_view =='show_text_box'}>
					    <input class="input" ref="new_certiifcate_name" type="text">
				</div> -->
			</div>
		</div>
		
		<div style="height:270px; overflow-x: scroll; overflow-y:scroll ;border:solid #000 3px;">
		<table class="table is-fullwidth is-striped is-hoverable is-narrow">
			<thead>
				<tr>
					<th style="width:40px">#</th>
					<th style="width:40px">
	        			<input type="checkbox" id="checkStudent" onclick={selectAll}>
	      			</th>
					<th>Enroll no</th>
					<th>Roll no</th>
					<th>Name</th>
				</tr>
			</thead>
			<tbody>
				<tr each={st, i in students}>
					<td>{i+1}</td>
					<td>
	        			<input type="checkbox" class="id_check_box" checked={st.done} id="{ 'StudentId' + st.student_id }" onclick={selectStudent.bind(this,st)} >
	      			</td>
					<td>{st.enroll_number}</td>
					<td>{st.roll_number}</td>
					<td>{st.student_name}</td>
				</tr>
			</tbody>
		</table>
	</div>
	<div class="columns" style="margin-top:5px">
		<div class="column is-narrow">
			<div class="control">
				<div class="select">
					<select ref="c_id">
						<option>Choose Certificate</option>
						<option each={certificates} value={c_id}>{certificate_name}
	                    </option>
					</select>
				</div>
			</div>
		</div>
		<!-- <div class="column is-narrow" show={report_view =='show_text_box'}>
			<div class="control">
			        <input class="input" ref="new_certiifcate_name" type="text">
			      	</div>
			    </div> -->
	    <div class="column is-narrow">
			<div class="control">
	        <button class="button" onclick={printOriginalCertificate}>Print</button>
	        <button class="button" onclick={printDuplicateCertificate}>Duplicate Print</button>
	      	</div>
	    </div>	    
	</div>
	</section>


<!-- End Other Information -->
<script>
	
	var self = this
    self.on("mount", function(){
    	self.title='Add'
    	self.report_view = 'show_old_text_box'
    	self.readStandard()
    	self.readSection()
    	self.readCertificate()
    	self.role = getCookie('role') 
    	 
		 // console.log(formatted.getHours())
        self.update()
        flatpickr(".date", {
	    	allowInput: true,
        	dateFormat: "d/m/Y",
  		})
    })

    self.on("unmount", function(){
      studentStore.off('read_standard_changed',StandardChanged)
      studentStore.off('read_section_changed',SectionChanged)
      certificateStore.off('read_student_change',ReadStudentChanged)
      certificateStore.off('read_certificate_change',ReadCertificateChanged)
      certificateStore.off('print_certificate_change',PrintCertificateChanged)
    })

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

     self.viewTable = () => {
    	if($('#checkTable').is(":checked")){
	        self.report_view = 'show_text_box'
    	}else{
	        self.report_view = 'show_old_text_box'
    	}
    }

	self.readCertificate = () => {
       certificateStore.trigger('read_certificate')
    }

    self.readStandard = () => {
       studentStore.trigger('read_standard')
    }

    self.readSection = () => {
       studentStore.trigger('read_section')
    }

    self.getReadSection = () => {
    	self.readfilteredSections = []
    	self.readfilteredSections = self.sections.filter(s => {
    		return s.standard_id == self.refs.standard_id.value
    	})
    }
    self.readStudent= () => {
       certificateStore.trigger('read_student',self.refs.standard_id.value,self.refs.section_id.value)
    }

    self.printOriginalCertificate=()=>{
    	var now = new Date();
		var jsonDate = now.toJSON();
		var dt = new Date(jsonDate);
    	var certificateKey = "MCKV/" + dt.getHours() + dt.getDay() + dt.getMinutes() + dt.getMonth() + dt.getSeconds() + dt.getFullYear();
    	console.log("Key")
    	console.log(certificateKey)

    	let studentData=[]
        self.students.map( q => {
        	let a={}
	        if(q.done==true){
	        	a.student_id=q.student_id
	            studentData.push(a)
	          }
        })
        console.log(studentData)
        self.c_type='O'
        certificateStore.trigger('add_issue_certificate', studentData,self.refs.c_id.value,self.refs.standard_id.value,self.refs.section_id.value,certificateKey,self.c_type)  
    }

    certificateStore.on('read_certificate_changed',ReadCertificateChanged)
    function ReadCertificateChanged(certificates){
      console.log(certificates) 
      self.certificates = certificates
      self.update()
    }

    certificateStore.on('print_certificate_changed',PrintCertificateChanged)
    function PrintCertificateChanged(){
      console.log() 
      self.certificates.map(i=>{
	      if(i.c_id==self.refs.c_id.value){
	      	self.certificate_text=i.certificate_text
		      var str=self.certificate_text
		       var res = str.replace("|name|", "Tarique");
		       self.res1 = res.replace("|hesheCaps|", "HE");
		      //console.log(res1)
		      console.log("inside chnage method")
		     // console.log(res)
	      }
      })

      self.update() 
    }
    
   studentStore.on('read_standard_changed',StandardChanged)
    function StandardChanged(standards){
      console.log(standards) 
      self.standards = standards
      self.update()
    }

    studentStore.on('read_section_changed',SectionChanged)
    function SectionChanged(sections){
      console.log(sections) 
      self.sections = sections
      self.update()
      self.getReadSection()
    }
    certificateStore.on('read_student_change',ReadStudentChanged)
    function ReadStudentChanged(students){
      //console.log(students) 
      self.title='Create'
      self.loading = false
      self.students = students
       self.students.map(i=>{
	      i.done = false;
      })
      self.update()
      //console.log(self.employeeTypes)
    }
    

    
</script>
</issue-certificate>