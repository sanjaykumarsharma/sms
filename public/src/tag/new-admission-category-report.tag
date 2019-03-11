<new-admission-category-report>
 <print-header></print-header> 
	<loading-bar if={loading}></loading-bar>  
	<section class=" is-fluid">
	   <h4 class="title has-text-centered" style="color: #ff3860;">New Admission Class wise Category strength({session_name})</h4>
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
			       <button class="button is-warning is-rounded is-pulled-right is-small ml5" onclick={readNewStudentCategoryReport} style="margin-left:5px;margin-right:5px">
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
					<th>General</th>
					<th>ST</th>
					<th>SC</th>
					<th>OBC</th>
				</tr>
			</thead>
			<tbody>
				<tr each={st, i in newStudentCategoryReports}>
					<td>{i+1}</td>
					<td>{st.standard}</td>
					<td>{st.General}</td>
					<td>{st.ST}</td>
					<td>{st.SC}</td>
					<td>{st.OBC}</td>
					
				</tr>
			</tbody>
		</table>
	</section>
<!-- End Other Information -->
<script>
	
	var self = this
    self.on("mount", function(){
    	self.title='Add'
    	self.readNewStudentCategoryReport()
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
      adminReportStore.off('read_new_student_category_report_changed',ReadNewStudentCategoryReportChanged)
    })

   
    self.readNewStudentCategoryReport = () => {
    	self.loading=true
       adminReportStore.trigger('read_new_student_category_report')
    }
    
  
    adminReportStore.on('read_new_student_category_report_changed',ReadNewStudentCategoryReportChanged)
    function ReadNewStudentCategoryReportChanged(newStudentCategoryReports,session_name){
      self.title='Create'
      self.loading = false
      console.log(session_name)
      self.session_name = session_name
      self.newStudentCategoryReports = newStudentCategoryReports
      self.update()
      //console.log(self.employeeTypes)
    }
    
</script>
</new-admission-category-report>