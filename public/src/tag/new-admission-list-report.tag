<new-admission-list-report>
	 <print-header></print-header> 
	<loading-bar if={loading}></loading-bar>  
	<section class=" is-fluid">
	   <h4 class="title has-text-centered" style="color: #ff3860;">New Student For Admission ({session_name})</h4>
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
			       <button class="button is-warning is-rounded is-pulled-right is-small ml5" onclick={ReadNewStudentListReports} style="margin-left:5px;margin-right:5px">
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
					<th>Enroll No</th>
					<th>Student Name</th>
					<th>Category Name</th>
					<th>DOB</th>
					<th>Blood Group</th>
					<th>Religion</th>
					<th>Withdrawn</th>
				</tr>
			</thead>
			<tbody>
				<tr each={st, i in newStudentListReports}>
					<td>{i+1}</td>
					<td>{st.enroll_number}</td>
					<td>{st.student_name}</td>
					<td>{st.category_name}</td>
					<td>{st.dob}</td>
					<td>{st.blood_group}</td>
					<td>{st.religion}</td>
					<td>{st.withdraw}</td>
				</tr>
			</tbody>
		</table>
	</section>
<!-- End Other Information -->
<script>
	
	var self = this
    self.on("mount", function(){
    	self.title='Add'
    	self.ReadNewStudentListReports()
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
      adminReportStore.off('read_new_student_list_report_changed',ReadNewStudentListReportChanged)
    })

    
    self.ReadNewStudentListReports = () => {
    	self.loading=true
       adminReportStore.trigger('read_new_student_list_report')
    }
    
 
    adminReportStore.on('read_new_student_list_report_changed',ReadNewStudentListReportChanged)
    function ReadNewStudentListReportChanged(newStudentListReports,session_name){
      //console.log(newStudentListReports) 
      self.title='Create'
      self.loading = false
      self.session_name = session_name
      self.newStudentListReports = newStudentListReports
      self.update()
      //console.log(self.employeeTypes)
    }
    

    
</script>
</new-admission-list-report>