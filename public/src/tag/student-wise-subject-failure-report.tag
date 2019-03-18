<student-wise-subject-failure-report>
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
					<button class="button is-danger has-text-weight-bold" onclick={getStudentWiseSubjectFailureReport}>GO</button>
				</div>
			</div>
			
		</div>

		<p><center><b>Standard:</b>{StandardName} <b>Section:</b>{SectionName} <b>Exam:</b>{ExamtypeName}</center></p>

		<div each={st, i in subject_marks}>
			<p class="is-size-5"><b>Name:</b>{st.student_details.name}  <b>Enroll No:</b>{st.student_details.enroll_number}</p>
			<table class="table is-fullwidth is-bordered is-hoverable">
				<thead>
					<tr>
						<th style="width:60px;">Sl no</th>
						<th>Subject Name</th>
						<th style="width:60px;">Marks</th>
					</tr>
				</thead>
				<tbody>
					<tr each={d, i in st.subjectList}>
						<td>{i+1}</td>
						<td>{d.subject_name}</td>
						<td class="has-text-right">{d.marks}</td>
					</tr>
				</tbody>
			</table>
		</div>	
  		
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
      analysisReportStore.off('read_student_wise_subject_failure_report_changed',StudentWiseSubjectFailureReportChanged)
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
    
    self.getSection = () => {
    	self.filteredSections = []
    	self.filteredSections = self.sections.filter(s => {
    		return s.standard_id == self.refs.standard_id.value
    	})
    }
    
    self.getStudentWiseSubjectFailureReport = () =>{
    	var obj={}
        var searchdata={};
	    
    	searchdata['standard_id']=self.refs.standard_id.value
    	searchdata['section_id']=self.refs.section_id.value
    	searchdata['exam_type_id']=self.refs.exam_type_id.value
    	obj['searchdata']=searchdata;
    	console.log(obj)
    	analysisReportStore.trigger('read_student_wise_subject_failure_report', obj)	
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
   	
    analysisReportStore.on('read_student_wise_subject_failure_report_changed',StudentWiseSubjectFailureReportChanged)
    function StudentWiseSubjectFailureReportChanged(subject_marks){
    	self.StandardName = $("#standard_id option:selected").text();
    	self.SectionName = $("#section_id option:selected").text();
    	self.ExamtypeName = $("#exam_type_id option:selected").text();
    	self.subject_marks = subject_marks;
      	self.update()
    }
</script>
</student-wise-subject-failure-report>