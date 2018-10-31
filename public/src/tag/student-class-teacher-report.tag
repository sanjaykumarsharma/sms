<student-class-teacher-report>
	<section class=" is-fluid">
		<div class="level">
			<div class="level-left">
			<!-- 	<h2 class="title" style="color: #ff3860;">Student House Report</h2> -->
			</div>
		</div>
<!-- 		<div class="box">
	<div class="columns">
		<div class="column is-narrow">
			<div class="control">
				<div class="select">
					<select ref="standard_id" onchange={getReadSection}>
						<option>Choose Standard</option>
						<option value='-1'>All</option>
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
						<option value='-1'>All</option>
						<option each={readfilteredSections} value={section_id}>{section}
	                            </option>
					</select>
				</div>
	      	</div>
	    </div>
		<div class="column">
			<button class="button is-danger has-text-weight-bold"
			onclick={readStudentHouseReport} >GO
			</button>
			<input type="checkbox" id="checkTable" checked={e.done}
		    onclick={viewTable}  style="margin-top: 12px;"> Table
		</div>
	</div>
</div> -->
		<table class="table is-fullwidth is-striped is-hoverable is-narrow">
			<thead>
				<tr>
					<th>#</th>
					<th>Class</th>
					<th>Section</th>
					<th>Teacher</th>
				</tr>
			</thead>
			<tbody>
				<tr each={st, i in studentClassTeacherReports}>
					<td>{i+1}</td>
					<td>{st.standard}</td>
					<td>{st.section}</td>
					<td>{st.teacher_name}</td>
				</tr>
			</tbody>
		</table>
	</section>
<!-- End Other Information -->
<script>
	
	var self = this
    self.on("mount", function(){
    	self.title='Add'
    	self.readClassTeaherReport()
    	self.role = getCookie('role') 
        self.update()
        flatpickr(".date", {
	    	allowInput: true,
        	dateFormat: "d/m/Y",
  		})
    })

    self.on("unmount", function(){
      /*studentStore.off('read_standard_changed',StandardChanged)
      studentStore.off('read_section_changed',SectionChanged)*/
      adminReportStore.off('read_class_teacher_report_change',ReadClassTeacherReportChanged)
    })

     /*self.viewTable = () => {
    	if($('#checkTable').is(":checked")){
	        self.report_view = 'show_table'
    	}else{
	        self.report_view = 'show_graph'
    	}
    }
*/
	/*self.readStandard = () => {
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
    }*/
    self.readClassTeaherReport = () => {
       adminReportStore.trigger('read_class_teacher_report')
    }
    
  /* studentStore.on('read_standard_changed',StandardChanged)
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
    }*/
    adminReportStore.on('read_class_teacher_report_change',ReadClassTeacherReportChanged)
    function ReadClassTeacherReportChanged(studentClassTeacherReports){
      //console.log(studentClassTeacherReports) 
      self.title='Create'
      self.loading = false
      self.studentClassTeacherReports = studentClassTeacherReports
      self.update()
      //console.log(self.employeeTypes)
    }
    

    
</script>
</student-class-teacher-report>