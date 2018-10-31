<student-religion-strength-report>
	<section class=" is-fluid">
		<div class="level">
			<div class="level-left">
				<h2 class="title" style="color: #ff3860;">Religion Listing</h2>
			</div>
		</div>
		<!-- <div class="box">
			<div class="columns">
				<div class="column is-narrow">
					<div class="control">
						<div class="select">
							<select ref="emp_type_id" onchange={ReadBrowseStaff}>
								<option value={-1}>All</option>
								<option each={employeeTypes} value={emp_type_id}>{emp_type}
			                            </option>
							</select>
						</div>
					</div>
				</div>
			</div>
		</div> -->
		<table class="table is-fullwidth is-striped is-hoverable is-narrow">
			<thead>
				<tr>
					<th>#</th>
					<th>Standard</th>
					<th>General</th>
					<th>ST</th>
					<th>SC</th>
					<th>OBC</th>
				</tr>
			</thead>
			<tbody>
				<tr each={st, i in studentCategorySummaryReports}>
					<td>{i+1}</td>
					<td>{st.standard}</td>
					<td>{st.s0}</td>
					<td>{st.s1}</td>
					<td>{st.s2}</td>
					<td>{st.s3}</td>
					
				</tr>
			</tbody>
		</table>
	</section>
<!-- End Other Information -->
<script>
	
	var self = this
    self.on("mount", function(){
    	self.title='Add'
    	self.role = getCookie('role') 
    	//self.readStudentCategorySummaryReport()	
        self.update()
        flatpickr(".date", {
	    	allowInput: true,
        	dateFormat: "d/m/Y",
  		})
    })

    self.on("unmount", function(){
      adminReportStore.off('read_student_category_summary_report_changed',ReadStudentCategorySummaryReportChanged)
    })

    self.readStudentCategorySummaryReport = () => {
       adminReportStore.trigger('read_student_category_summary_report')
    }
    
    adminReportStore.on('read_student_category_summary_report_changed',ReadStudentCategorySummaryReportChanged)
    function ReadStudentCategorySummaryReportChanged(studentCategorySummaryReports){
      //console.log(studentCategorySummaryReports) 
      self.title='Create'
      self.loading = false
      self.studentCategorySummaryReports = studentCategorySummaryReports
      self.update()
      //console.log(self.employeeTypes)
    }
    

    
</script>
</student-religion-strength-report>