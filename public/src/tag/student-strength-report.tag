<student-strength-report>
	<header></header>
	 <loading-bar if={loading}></loading-bar>  
	<section class=" is-fluid">
		 <h4 class="title has-text-centered" style="color: #ff3860;">Student Strength School <br> ({grandTotal})</h4>
	   <div class='box no-print'>
	   		<div class="columns">
			    <div class=" column">
				<!-- <div class="level-right"> -->
			        <button class="button is-primary has-text-weight-bold is-pulled-right" onclick="window.print()" title="Print">
			          <span class="icon"> <i class="fas fa-print"></i></span>
			        </button>
			       <button class="button is-warning is-rounded is-pulled-right" onclick={readStudentStrengthReport} style="margin-left:5px;margin-right:5px">
			        <span class="icon">
			          <span class="fas fa-sync-alt"></span>
			        </span>
			        </button>
			    </div>
		   </div>
		</div>
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
    	self.loading=true
       adminReportStore.trigger('read_student_strength_report')
    }
    
    adminReportStore.on('read_student_strength_report_changed',ReadStudentStrengthReportChanged)
    function ReadStudentStrengthReportChanged(studentStrengthReports,session_name){
      //console.log(studentStrengthReports) 
      self.title='Create'
      self.loading = false
      self.studentStrengthReports = studentStrengthReports
      self.grandTotal=0
      self.studentStrengthReports.map(d => {
          self.grandTotal= Number(self.grandTotal) + Number(d.total)
      })
      self.session_name = session_name
      self.update()
      //console.log(self.employeeTypes)
    }
    

    
</script>
</student-strength-report>