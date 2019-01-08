<student-blood-group-report>
	<header></header>
	<loading-bar if={loading}></loading-bar>  
	<section class=" is-fluid">
	   <h4 class="title has-text-centered" style="color: #ff3860;">Class Wise Blood Group ({session_name})</h4>
	   <div class='box no-print'>
	   		<div class="columns">
			    <div class=" column">
				<!-- <div class="level-right"> -->
			        <button class="button is-primary has-text-weight-bold is-pulled-right" onclick="window.print()" title="Print">
			          <span class="icon"> <i class="fas fa-print"></i></span>
			        </button>
			       <button class="button is-warning is-rounded is-pulled-right" onclick={readStudentBloodGroupListingReport} style="margin-left:5px;margin-right:5px">
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
					<th>Standard</th>
					<th>A+</th>
					<th>A-</th>
					<th>AB+</th>
					<th>AB-</th>
					<th>B+</th>
					<th>B-</th>
					<th>O+</th>
					<th>O-</th>
				</tr>
			</thead>
			<tbody>
				<tr each={st, i in studentBloodGroupListingReports}>
					<td>{i+1}</td>
					<td>{st.A}</td>
					<td>{st.A}</td>
					<td>{st.AB}</td>
					<td>{st.AB}</td>
					<td>{st.B}</td>
					<td>{st.B}</td>
					<td>{st.O}</td>
					<td>{st.O}</td>
					
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
    	self.readStudentBloodGroupListingReport()	
        self.update()
        flatpickr(".date", {
	    	allowInput: true,
        	dateFormat: "d/m/Y",
  		})
    })

    self.on("unmount", function(){
      adminReportStore.off('read_student_blood_group_listing_report_changed',ReadStudentBloodGroupListingReportChanged)
    })

    self.readStudentBloodGroupListingReport = () => {
    	self.loading=true
       adminReportStore.trigger('read_student_blood_group_listing_report')
    }
    
    adminReportStore.on('read_student_blood_group_listing_report_changed',ReadStudentBloodGroupListingReportChanged)
    function ReadStudentBloodGroupListingReportChanged(studentBloodGroupListingReports,session_name){
      //console.log(studentBloodGroupListingReports) 
      self.title='Create'
      self.loading = false
      self.session_name = session_name
      self.studentBloodGroupListingReports = studentBloodGroupListingReports
      self.update()
      //console.log(self.employeeTypes)
    }
    

    
</script>
</student-blood-group-report>