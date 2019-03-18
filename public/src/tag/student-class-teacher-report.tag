<student-class-teacher-report>
  <print-header></print-header> 
	<loading-bar if={loading}></loading-bar>  
	<section class=" is-fluid">
	   <h4 class="title has-text-centered" style="color: #ff3860;">Class Teacher Listing <br> Session : ({session_name})</h4>
	   <div class='box no-print'>
	   		<div class="columns">
			    <div class=" column">
				<!-- <div class="level-right"> -->
              <button class="button is-success has-text-weight-bold is-pulled-right is-small ml5" onclick={downloadCSV} title="Excel Down Load">
                        <span class="icon">
                            <i class="far fa-file-excel"></i>
                        </span>
              </button>
			        <button class="button is-primary has-text-weight-bold is-pulled-right is-small ml5" onclick="window.print()" title="Print">
			          <span class="icon"> <i class="fas fa-print"></i></span>
			        </button>
			       <button class="button is-warning is-rounded is-pulled-right is-small ml5" onclick={readClassTeaherReport} style="margin-left:5px;margin-right:5px">
			        <span class="icon">
			          <span class="fas fa-sync-alt"></span>
			        </span>
			        </button>
			    </div>
		   </div>
		</div>

		<table class="table is-fullwidth is-bordered is-hoverable is-narrow">
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
      adminReportStore.off('csv_export_student_class_teacher_report_changed',csvStudentClassTeacherReportChanged)
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
    	self.loading=true
       adminReportStore.trigger('read_class_teacher_report')
    }
    self.downloadCSV = () =>{
      adminReportStore.trigger('csv_export_student_class_teacher_report', self.studentClassTeacherReports)
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
    function ReadClassTeacherReportChanged(studentClassTeacherReports,session_name){
      //console.log(studentClassTeacherReports) 
      self.title='Create'
      self.loading = false
      self.session_name = session_name
      self.studentClassTeacherReports = studentClassTeacherReports
      self.update()
      //console.log(self.employeeTypes)
    }
    adminReportStore.on('csv_export_student_class_teacher_report_changed',csvStudentClassTeacherReportChanged)
    function csvStudentClassTeacherReportChanged(url){
      var open_url = window.location.origin+url 
      window.open(open_url);
      self.loading = false
      self.update()
    }
    

    
</script>
</student-class-teacher-report>