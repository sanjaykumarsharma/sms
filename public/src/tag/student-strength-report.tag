<student-strength-report>
	<section class=" is-fluid">
		<div class="level">
			<div class="level-left">
				<h2 class="title" style="color: #ff3860;">Student Strenth</h2>
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
					<th>Class</th>
					<th>Total</th>
				</tr>
			</thead>
			<tbody>
				<tr each={st, i in studentStrengthReports}>
					<td>{i+1}</td>
					<td>{st.standard}</td>
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
    	self.readStudentStrengthReport()	
        self.update()
        flatpickr(".date", {
	    	allowInput: true,
        	dateFormat: "d/m/Y",
  		})
    })

    self.on("unmount", function(){
      adminReportStore.off('read_student_strength_report_changed',ReadStudentStrengthReportChanged)
    })

    self.readStudentStrengthReport = () => {
       adminReportStore.trigger('read_student_strength_report')
    }
    
    adminReportStore.on('read_student_strength_report_changed',ReadStudentStrengthReportChanged)
    function ReadStudentStrengthReportChanged(studentStrengthReports){
      //console.log(studentStrengthReports) 
      self.title='Create'
      self.loading = false
      self.studentStrengthReports = studentStrengthReports
      self.update()
      //console.log(self.employeeTypes)
    }
    

    
</script>
</student-strength-report>