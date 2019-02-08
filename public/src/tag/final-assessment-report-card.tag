<final-assessment-report-card>
<section class=" is-fluid" show={student_view =='show_student_list_view'}>
		<h2 class="title has-text-centered is-size-5" style="color: #ff3860;">Final Assessment Report Card</h2>
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
				<div class="column is-narrow"><label class="label">Issue date</label></div>
					<div class="column is-narrow">
						<div class="control">
							<input class="input date is-small" ref="issue_date" type="text">
						</div>
					</div>
					
				<button class="button is-warning has-text-weight-bold ml5 is-small" onclick={final_assessment_report_card}>
					Print Report Card
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
					<th>First Term</th>
					<th>Final Term</th>
					<th class="has-text-centered">
	        			<input type="checkbox" id="checkStudent" onclick={selectAll}>
	      			</th>
				</tr>
			</thead>
			<tbody>
				<tr each={st, i in students}>
					<td>{ i+1 }</td>
					<td>{st.enroll_number}</td>
					<td>{st.roll_number}</td>
					<td>{st.name}</td>
					<td></td>
					<td></td>
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
	</section>

<script>
	
	var self = this
    self.on("mount", function(){
    	self.role = getCookie('role')
    	self.student_view = 'show_student_list_view'
    	self.readStandard()
    	self.readSection()
        self.update()
        flatpickr(".date", {
	    	allowInput: true,
        	dateFormat: "d/m/Y",
  		})
    })

    self.on("unmount", function(){
     	finalAssessmentReportStore.off('read_standard_changed',StandardChanged)
    	finalAssessmentReportStore.off('read_section_changed',SectionChanged)
    	finalAssessmentReportStore.off('read_student_changed',StudentChanged)
    })

    
    self.getStudentData = () =>{

		finalAssessmentReportStore.trigger('read_student', self.refs.standard_id.value,self.refs.section_id.value)
    }

    self.readStandard = () => {
       finalAssessmentReportStore.trigger('read_standard')
    }

    self.readSection = () => {
       finalAssessmentReportStore.trigger('read_section')
    }

    self.getSection = () => {
    	self.filteredSections = []
    	self.filteredSections = self.sections.filter(s => {
    		return s.standard_id == self.refs.standard_id.value
    	})
      self.update()
      self.getStudentData()
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
    self.close_print_view = () => {
      self.student_view = 'show_student_list_view'
    }
    self.final_assessment_report_card = () => {
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
        	return;
      	}else if(!self.refs.issue_date.value){
        	toastr.error("Please enter Issue Date and try again")
        	return;
      	}else{
      		self.student_view	= 'show_student_print_view'
      		var obj={}
          	obj['issue_date']=convertDate(self.refs.issue_date.value)
          	obj['standard_id']=self.refs.standard_id.value
          	obj['section_id']=self.refs.section_id.value
          	obj['student_id']=student_id
          	self.loading = true
        	finalAssessmentReportStore.trigger('read_final_assessment_report_card',obj)
      	}
    }

    finalAssessmentReportStore.on('read_standard_changed',StandardChanged)
    function StandardChanged(standards){
      console.log(standards) 
      self.standards = standards
      self.update()
    }

    finalAssessmentReportStore.on('read_section_changed',SectionChanged)
    function SectionChanged(sections){
      console.log(sections) 
      self.sections = sections
      self.update()
      self.getSection()
      self.getStudentData()
    }

    finalAssessmentReportStore.on('read_student_changed',StudentChanged)
    function StudentChanged(students){
      console.log(students) 
      self.students = students
      self.students.map(i=>{
	      i.done = false;
      })
      self.update()
    }
</script>
</final-assessment-report-card>