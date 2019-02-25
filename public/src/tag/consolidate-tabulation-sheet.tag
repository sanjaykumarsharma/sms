<consolidate-tabulation-sheet>
<print-header></print-header>
<loading-bar if={loading}></loading-bar>  
	<section class=" is-fluid">

    <div class="level no-print">
      <div class="level-left">
        <h2 class="title" style="color: #ff3860;">Consolidate Tabulation Sheet</h2>
      </div>
      <div class="level-right">
        <button class="button is-warning is-rounded ml5" onclick={readReport}>
        <span class="icon">
          <span class="fas fa-sync-alt"></span>
        </span>
        </button>
      </div>
    </div>

    <div class="box no-print">
      <div class="columns">

        <div class="column is-narrow"><label class="label">Standard</label></div>  
        <div class="column">  
          <div class="control">
            <div class="select is-fullwidth">
              <select ref="standardSelect" onchange={changeSection} id="standard_id">
                <option value="">Select Standard</option>
                <option each={classes} value={standard_id}>{standard}</option>
              </select>
            </div>
          </div>
        </div>

        <div class="column is-narrow"><label class="label">Section</label></div>  
        <div class="column">  
          <div class="control">
            <div class="select is-fullwidth">
              <select ref="sectionSelect" onchange={readClassSubject} id="section_id">
                <option value="">Select Section</option>
                <option each={tempSections} value={section_id}>{section}</option>
              </select>
            </div>
          </div>
        </div>

        <div class="column is-narrow"><label class="label">Exam Type</label></div>  
        <div class="column">
          <div class="control">
            <div class="select is-fullwidth">
              <select ref="examTypeSelect" onchange={readMarksLimit} id="exam_type_id">
                <option value="">Select Exam Type</option>
                <option each={examTypes} value={exam_type_id}>{exam_type}</option>
              </select>
            </div>
          </div>
        </div>

        <div class="column">
          <button class="button is-danger has-text-weight-bold" onclick={readReport}>GO </button>
        </div>
          
      </div>
    </div>

   <h1 class="has-text-centered is-size-4">Consolidated Tabulation Sheet of Class {class}<br>
       Exam : {exam}
   </h1> 
  
  <h1 class="is-size-4">Class Teacher : {class_teacher}</h1>
  <table class="table is-fullwidth is-striped is-hoverable">
		<thead>
			<tr>
				<th>Roll No</th>
  			<th>Enroll No</th>
  			<th>Student Name</th>

      	<th each={c, i in headers}>{c}</th>		

				<th>Percentage</th>
        <th>Total</th>
			</tr>
		</thead>
		<tbody>
			<tr each={c, i in reports}>
				<td>{c.roll_number}</td>
		    <td>{c.enroll_number}</td>
      	<td>{c.student_name}</td>
			  <td each={m, j in c.orderedSubjects}>{m}</td>
			  <td>{c.total}</td>
			  <td>{c.percentage}</td>
			</tr>
		</tbody>
	</table>
      
</section>
  

	<script>
	var self = this
    self.class = ''
    self.exam = ''
    self.class_teacher = ''
    self.on("mount", function(){
      self.loading = false;
      self.update()
      self.readClass()
      self.readSection()
    })
    self.on("unmount", function(){
      marksReportStore.off('read_classes_changed',ClassesChanged)
      marksReportStore.off('read_section_changed',SectionChanged)
      marksReportStore.off('exam_types_changed',ExamTypesChanged)

      marksReportStore.off('read_consolidate_tabulation_sheet_changed',ReportChanged)
    })

    self.readClass = () => {
       self.loading = true;
       marksReportStore.trigger('read_classes')
    }

    self.readSection = () => {
       self.loading = true;
       marksReportStore.trigger('read_section')
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

       //read exam type
       marksReportStore.trigger('read_exam_types',self.refs.standardSelect.value)
    }

    self.readReport = () => {
      let error = '';
      
      if(self.refs.sectionSelect.value==''){
        error = error + "Please select section, "
      }

      if(self.refs.examTypeSelect.value==''){
        error = error + "Please select exam type, "
      }
      
      if(error.length!=0){
        toastr.error(error)
        return
      }else{
        self.loading=true
        marksReportStore.trigger('read_consolidate_tabulation_sheet',self.refs.examTypeSelect.value, self.refs.sectionSelect.value)
      }  

    }

    self.addEnter = (e) => {
      if(e.which == 13){
        self.add()
      }
    }

    // ****************************************** all change metods *************************************

    marksReportStore.on('read_classes_changed',ClassesChanged)
    function ClassesChanged(classes){
      self.loading = false
      self.classes = []
      self.classes = classes
      self.update()
      console.log(self.classes)
    }

    marksReportStore.on('read_section_changed',SectionChanged)
    function SectionChanged(sections){
      self.loading = false
      self.sections = []
      self.sections = sections
      self.update()
    }

    marksReportStore.on('exam_types_changed',ExamTypesChanged)
    function ExamTypesChanged(examTypes){
      self.loading = false
      self.examTypes = []
      self.examTypes = examTypes
      self.update()
    }

    marksReportStore.on('read_consolidate_tabulation_sheet_changed',ReportChanged)
    function ReportChanged(headers,reports,class_teacher){
      self.loading = false
      self.headers = {}
      self.headers = headers

      self.reports = []
      self.reports = reports

      self.class = $("#standard_id option:selected").text()+ ' ' + $("#section_id option:selected").text();
      self.exam = $("#exam_type_id option:selected").text()
      self.class_teacher = class_teacher
      self.update()
    }

</script>
</consolidate-tabulation-sheet>