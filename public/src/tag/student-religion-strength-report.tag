<student-religion-strength-report>
	<print-header></print-header> 
	 <loading-bar if={loading}></loading-bar>  
	<section class=" is-fluid">
		<h4 class="title has-text-centered" style="color: #ff3860;">Class Wise Religion  Strength({session_name}) </h4>
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
			       <button class="button is-warning is-rounded is-pulled-right is-small ml5" onclick={readStudentReligionListingReport} style="margin-left:5px;margin-right:5px">
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
					<th>Buddhism</th>
					<th>Christianity</th>
					<th>Hinduism</th>
					<th>Jainism</th>
					<th>Islam</th>
					<th>Sikhism</th>
				</tr>
			</thead>
			<tbody>
				<tr each={st, i in studentReligionListingReports}>
					<td>{i+1}</td>
					<td>{st.standard}</td>
					<td>{st.Buddhism}</td>
					<td>{st.Christianity}</td>
					<td>{st.Hinduism}</td>
					<td>{st.Jainism}</td>
					<td>{st.Islam}</td>
					<td>{st.Sikhism}</td>
				</tr>
				<tr>
					<th colspan="2">Total</th>
					<th>{totalBuddhism}</th>
					<th>{totalChristianity}</th>
					<th>{totalHinduism}</th>
					<th>{totalJainism}</th>
					<th>{totalIslam}</th>
					<th>{totalSikhism}</th>
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
    	self.readStudentReligionListingReport()	
        self.update()
        flatpickr(".date", {
	    	allowInput: true,
        	dateFormat: "d/m/Y",
  		})
    })

    self.on("unmount", function(){
      adminReportStore.off('read_student_religion_listing_report_changed',ReadStudentReligionListingReportChanged)
    })

    self.readStudentReligionListingReport = () => {
    	self.loading=true
       adminReportStore.trigger('read_student_religion_listing_report')
    }
    
    adminReportStore.on('read_student_religion_listing_report_changed',ReadStudentReligionListingReportChanged)
    function ReadStudentReligionListingReportChanged(studentReligionListingReports,session_name){
      //console.log(studentReligionListingReports) 
      self.title='Create'
      self.loading = false
      self.studentReligionListingReports = studentReligionListingReports
      self.session_name = session_name
        self.totalBuddhism=0
		self.totalChristianity=0
		self.totalHinduism=0
		self.totalJainism=0
		self.totalIslam=0
		self.totalSikhism=0
		self.studentReligionListingReports.map(c => {
      	console.log("c.General");
      	console.log(c.General);
	      	if(c.Buddhism!=undefined){
	          self.totalBuddhism=Number(self.totalBuddhism) + Number(c.Buddhism)
	        }
           if(c.Christianity!=undefined){
            self.totalChristianity=Number(self.totalChristianity) + Number(c.Christianity)
          }
          if(c.Hinduism!=undefined){
              self.totalHinduism=Number(self.totalHinduism) + Number(c.Hinduism)
   			}
            if(c.Jainism!=undefined){
              self.totalJainism=Number(self.totalJainism) + Number(c.Jainism)
   			 }
   			 if(c.Islam!=undefined){
              self.totalIslam=Number(self.totalIslam) + Number(c.Islam)
   			 }
   			 if(c.Sikhism!=undefined){
              self.totalSikhism=Number(self.totalSikhism) + Number(c.Sikhism)
   			 }
      })
      self.update()
      //console.log(self.employeeTypes)
    }
    

    
</script>
</student-religion-strength-report>