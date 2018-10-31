<student-browser>
	<section class=" is-fluid">
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
							<select ref="standard_id" onchange={getReadSection}>
								<option>Choose Standard</option>
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
								<option each={readfilteredSections} value={section_id}>{section}
	                            </option>
							</select>
						</div>
			      	</div>
			    </div>
				<div class="column">
					<button class="button is-danger has-text-weight-bold"
					onclick={readStudentBrowserData} >GO
					</button>
				</div>
			</div>
		</div>
		<table class="table is-fullwidth is-striped is-hoverable is-narrow">
			<thead>
				<tr>
					<th>#</th>
					<th>Roll No</th>
					<th>Enroll No</th>
					<th>Student Name</th>
					<th>Class</th>
					<th>SMS</th>
					<th>Student Email</th>
					<th>Father's Name</th>
				</tr>
			</thead>
			<tbody>
				<tr each={st, i in browseStudents}>
					<td>{i+1}</td>
					<td>{st.roll_number}</td>
					<td> {st.enroll_number}</td>
					<td>{st.first_name} {st.middle_name} {st.last_name}</td>
					<td>{st.standard}</td>
					<td>{st.mobile}</td>
					<td> {st.email}</td>
					<td>{st.f_name}</td>
					
				</tr>
			</tbody>
		</table>
	</section>
<!-- End Other Information -->
<script>
	
	var self = this
    self.on("mount", function(){
    	self.title='Add'
    	self.readStandard()
    	self.readSection()
    	self.role = getCookie('role') 
        self.update()
        flatpickr(".date", {
	    	allowInput: true,
        	dateFormat: "d/m/Y",
  		})
    })

    self.on("unmount", function(){
      studentStore.off('read_standard_changed',StandardChanged)
      studentStore.off('read_section_changed',SectionChanged)
      studentSearchStore.off('read_student_browser_change',ReadStudentBrowserChanged)
    })

    
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
    self.readStudentBrowserData = () => {
       studentSearchStore.trigger('read_student_browser',self.refs.standard_id.value,self.refs.section_id.value)
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
    studentSearchStore.on('read_student_browser_change',ReadStudentBrowserChanged)
    function ReadStudentBrowserChanged(browseStudents){
      //console.log(browseStudents) 
      self.title='Create'
      self.loading = false
      self.browseStudents = browseStudents
      self.update()
      //console.log(self.employeeTypes)
    }
    

    
</script>
</student-browser>