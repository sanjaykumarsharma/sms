<student-summary-report>
	<print-header></print-header> 
	<loading-bar if={loading}></loading-bar>  
	<section class=" is-fluid">
	   <h4 class="title has-text-centered" style="color: #ff3860;">Class Wise Strength ({session_name})</h4>
	   <div class='box no-print'>
	   		<div class="columns">
			    <div class=" column">
				<!-- <div class="level-right"> -->
					<button class="button is-success has-text-weight-bold is-small ml5 is-pulled-right" onclick={downloadCSV} title="Excel Down Load">
		              <span class="icon">
		                  <i class="far fa-file-excel"></i>
		              </span>
		           </button>
			        <button class="button is-primary has-text-weight-bold is-pulled-right is-small ml5" onclick="window.print()" title="Print">
			          <span class="icon"> <i class="fas fa-print"></i></span>
			        </button>
			       <button class="button is-warning is-rounded is-pulled-right is-small ml5" onclick={readStudentSummaryReport} style="margin-left:5px;margin-right:5px">
			        <span class="icon">
			          <span class="fas fa-sync-alt"></span>
			        </span>
			        </button>
			    </div>
		   </div>
		</div>
		<!-- </div> -->
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
					<td class="has-text-weight-bold">{st.total}</td>
				</tr>
				<!-- <tr>
					<td colspan="2" class="has-text-centered" style="font-size:18px">Total</td>
					<td style="font-size:18px">{total_s0}</td>
					<td style="font-size:18px">{total_s1}</td>
					<td style="font-size:18px">{total_s2}</td>
					<td style="font-size:18px">{total_s3}</td>
					<td style="font-size:18px">{total_s4}</td>
					<td style="font-size:18px">{total_B_min}</td>
					<td style="font-size:18px">{total_O_plus}</td>
					<td style="font-size:18px">{total_O_min}</td>
				</tr> -->
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
      adminReportStore.off('csv_export_student_summary_report_changed',csvStudentSummaryReportChanged)
    })

    self.readStudentSummaryReport = () => {
    	self.loading=true
       adminReportStore.trigger('read_student_summary_report')
    }
    self.downloadCSV = () =>{
      adminReportStore.trigger('csv_export_student_summary_report', self.studentSummaryReports)
    }
    
    adminReportStore.on('read_student_summary_report_changed',ReadStudentSummaryReportChanged)
    function ReadStudentSummaryReportChanged(studentSummaryReports,session_name){
      //console.log(studentSummaryReports) 
      self.title='Create'
      self.loading = false
      self.studentSummaryReports = studentSummaryReports
      self.session_name = session_name
      self.update()
      //console.log(self.employeeTypes)
    }
    adminReportStore.on('csv_export_student_summary_report_changed',csvStudentSummaryReportChanged)
    function csvStudentSummaryReportChanged(url){
      var open_url = window.location.origin+url 
      window.open(open_url);
      self.loading = false
      self.update()
    }
    

    
</script>
</student-summary-report>