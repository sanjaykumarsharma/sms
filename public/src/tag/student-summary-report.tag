<student-summary-report>
	<section class=" is-fluid">
		<div class="level">
			<div class="level-left">
				<h2 class="title" style="color: #ff3860;">Class Wise Report</h2>
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
					<th>A</th>
					<th>B</th>
					<th>C</th>
					<th>D</th>
					<th>E</th>
					<th>N</th>
					<th>Total</th>
				</tr>
			</thead>
			<tbody>
				<tr each={st, i in studentSummaryReports}>
					<td>{i+1}</td>
					<td>{st.standard}</td>
					<td>{st.s0}</td>
					<td>{st.s1}</td>
					<td>{st.s2}</td>
					<td>{st.s3}</td>
					<td>{st.s4}</td>
					<td>{st.n}</td>
					<td>{st.total}</td>
					
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
    	self.readStudentSummaryReport()	
        self.update()
        flatpickr(".date", {
	    	allowInput: true,
        	dateFormat: "d/m/Y",
  		})
    })

    self.on("unmount", function(){
      adminReportStore.off('read_student_summary_report_changed',ReadStudentSummaryReportChanged)
    })

    self.readStudentSummaryReport = () => {
       adminReportStore.trigger('read_student_summary_report')
    }
    
    adminReportStore.on('read_student_summary_report_changed',ReadStudentSummaryReportChanged)
    function ReadStudentSummaryReportChanged(studentSummaryReports){
      //console.log(studentSummaryReports) 
      self.title='Create'
      self.loading = false
      self.studentSummaryReports = studentSummaryReports
      self.update()
      //console.log(self.employeeTypes)
    }
    

    
</script>
</student-summary-report>