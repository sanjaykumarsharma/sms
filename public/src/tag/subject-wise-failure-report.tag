<subject-wise-failure-report>
	<print-header></print-header>
	<loading-bar if={loading}></loading-bar>
	<section class=" is-fluid">
		<div class="box no-print">
			<div class="columns">
				<div class="column is-narrow">
					<label class="label">Class</label>
				</div>
				<div class="column is-narrow">
					<div class="control">
						<div class="select">
							<select ref="standard_id" id="standard_id" onchange={changeExamType}>
								<option>--Choose Class--</option>
								<option each={standards} value={standard_id}>{standard}</option>
							</select>
						</div>
					</div>
				</div>
				<div class="column is-narrow">
					<label class="label">Section</label>
				</div>
				<div class="column is-narrow">
					<div class="control">
						<div class="select">
							<select ref="section_id" id="section_id" onchange={changeSubject}>
								<option>--Choose Section--</option>
								<option each={filteredSections} value={section_id}>{section}</option>
							</select>
						</div>
					</div>
				</div>
				<div class="column is-narrow">
					<label class="label">Subject</label>
				</div>
				<div class="column is-narrow">
					<div class="control">
						<div class="select">
							<select ref="subject_id" id="subject_id">
								<option each={subjects} value={subject_id}>{subject_name}</option>
							</select>
						</div>
					</div>
				</div>
				<div class="column is-narrow">
					<label class="label">Exam Type</label>
				</div>
				<div class="column is-narrow">
					<div class="control">
						<div class="select">
							<select ref="exam_type_id" id="exam_type_id">
								<option each={examTypes} value={exam_type_id}>{exam_type}</option>
							</select>
						</div>
					</div>
				</div>
				<div class="column">
					<button class="button is-danger has-text-weight-bold" onclick={getSubjectWiseFailureReport}>GO</button>
				</div>
			</div>
			
		</div>

		<p><center><strong>Subject wise Failure Report</strong></center></p>
		<p><center><b>Standard:</b>{StandardName} <b>Section:</b>{SectionName} <b>Subject:</b>{SubjectName} <b>Exam:</b>{ExamtypeName}</center></p>

		<table class="table is-fullwidth is-bordered is-hoverable">
			<thead>
				<tr>
					<th>Sl no</th>
					<th>Enroll No</th>
					<th>Student Name</th>
					<th>Marks</th>
				</tr>
			</thead>
			<tbody>
				<tr each={st, i in report_data}>
					<td>{i+1}</td>
					<td>{st.enroll_number}</td>
					<td>{st.name}</td>
					<td>{st.marks}</td>
				</tr>
			</tbody>
		</table>
  		
	</section>

<script>
	var self = this;
    self.on("mount", function(){
    	self.readStandard()
    	self.readSection()
        self.update() 
    })
    self.on("unmount", function(){
      analysisReportStore.off('read_standard_changed',StandardChanged)
      analysisReportStore.off('read_section_changed',SectionChanged)
      analysisReportStore.off('exam_types_changed',ExamTypesChanged)
      analysisReportStore.off('subjects_changed',SubjectsChanged)
      analysisReportStore.off('read_subject_wise_failure_report_changed',SubjectWiseFailureReportChanged)
    })

    self.readStandard = () => {
       analysisReportStore.trigger('read_standard')
    }
    self.readSection = () => {
       analysisReportStore.trigger('read_section')
    }
    self.changeExamType = () => {
       analysisReportStore.trigger('read_exam_types',self.refs.standard_id.value)
       self.getSection()
    }
    self.changeSubject = () => {
       analysisReportStore.trigger('read_subjects',self.refs.standard_id.value,self.refs.section_id.value)
       self.getSection()
    }
    self.getSection = () => {
    	self.filteredSections = []
    	self.filteredSections = self.sections.filter(s => {
    		return s.standard_id == self.refs.standard_id.value
    	})
    }
    
    self.getSubjectWiseFailureReport = () =>{
    	var obj={}
        var searchdata={};
	    
    	searchdata['standard_id']=self.refs.standard_id.value
    	searchdata['section_id']=self.refs.section_id.value
    	searchdata['subject_id']=self.refs.subject_id.value
    	searchdata['exam_type_id']=self.refs.exam_type_id.value
    	obj['searchdata']=searchdata;
    	console.log(obj)
    	self.loading=true;
    	analysisReportStore.trigger('read_subject_wise_failure_report', obj)	
    }
    analysisReportStore.on('read_standard_changed',StandardChanged)
    function StandardChanged(standards){
      	self.standards = standards
      	self.update()
    }
    analysisReportStore.on('read_section_changed',SectionChanged)
    function SectionChanged(sections){
      console.log(sections) 
      self.sections = sections
      self.update()
      self.getSection()
      
    }
    analysisReportStore.on('exam_types_changed',ExamTypesChanged)
    function ExamTypesChanged(examTypes){
    	self.loading = false
      	self.examTypes = []
      	self.examTypes = examTypes
      	self.update()
    }
    analysisReportStore.on('subjects_changed',SubjectsChanged)
    function SubjectsChanged(subjects){
      self.loading = false
      self.subjects = []
      self.subjects = subjects
      self.update()
    }
    analysisReportStore.on('read_subject_wise_failure_report_changed',SubjectWiseFailureReportChanged)
    function SubjectWiseFailureReportChanged(report_data){
    	self.loading=false
    	self.StandardName = $("#standard_id option:selected").text();
    	self.SectionName = $("#section_id option:selected").text();
    	self.SubjectName = $("#subject_id option:selected").text();
    	self.ExamtypeName = $("#exam_type_id option:selected").text();
    	self.report_data = report_data;
    	if(self.report_data.length==0){
    		toastr.info("No Data Found!")
    	}
      	self.update()
    }
</script>
</subject-wise-failure-report>