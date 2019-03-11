<merit-list>
<print-header></print-header>
<loading-bar if={loading}></loading-bar>  
	<section class=" is-fluid">

    <div class="level no-print">
      <div class="level-left">
        <h2 class="title" style="color: #ff3860;">Merit List</h2>
      </div>
      <div class="level-right">
        <button class="button is-warning ml5" onclick={readReport}>
        <span class="icon">
          <span class="fas fa-sync-alt"></span>
        </span>
        </button>
        <button class="button is-primary ml5" onclick="window.print()">
        <span class="icon">
            <i class="fas fa-print"></i>
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
              <select ref="standardSelect" onchange={changeSection}>
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
              <select ref="sectionSelect" onchange={readClassSubject}>
                <option value="">Select Section</option>
                <option each={tempSections} value={section_id}>{section}</option>
              </select>
            </div>
          </div>
        </div>

        <div class="column">
          <button class="button is-danger has-text-weight-bold" onclick={readReport}>GO </button>
        </div>
          
      </div>
    </div>

	<table class="table is-fullwidth is-striped is-hoverable">
		<thead>
			<tr>
				<th style="width:100px;">Sl No</th>
      			<th>Enroll No</th>
      			<th>Student Name</th>
      			<th>Roll No</th>
				<th>Max Marks</th>
				<th>Marks Obtained</th>
				<th>Percentage</th>
				<th>Rank</th>
			</tr>
		</thead>
		<tbody>
			<tr each={c, i in reports}>
				<td>{i+1}</td>
		        <td>{c.enroll_number}</td>
      			<td>{c.student_name}</td>
				<td>{c.roll_number}</td>
				<td>{c.max_marks}</td>
				<td>{c.marks_obtained}</td>
				<td>{c.percentage}</td>
				<td>{i+1}</td>
			</tr>
		</tbody>
	</table>
      
</section>
  

	<script>
	var self = this
    self.on("mount", function(){
      self.loading = false;
      self.update()
      self.readClass()
      self.readSection()
    })
    self.on("unmount", function(){
      marksReportStore.off('read_classes_changed',ClassesChanged)
      marksReportStore.off('read_section_changed',SectionChanged)

      marksReportStore.off('read_merit_list_changed',ReportChanged)
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

      if(self.refs.standardSelect.value==''){
        error = error + "Please select exam type, "
      }
      
      if(error.length!=0){
        toastr.error(error)
        return
      }else{
        self.loading=true
        marksReportStore.trigger('read_merit_list',self.refs.standardSelect.value, self.refs.sectionSelect.value)
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

    marksReportStore.on('read_merit_list_changed',ReportChanged)
    function ReportChanged(reports){
      self.loading = false
      self.reports = []
      self.reports = reports
      self.update()
    }

</script>
</merit-list>