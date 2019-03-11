<student-blood-group-report>
	 <print-header></print-header> 
	<loading-bar if={loading}></loading-bar>  
	<section class=" is-fluid">
	   <h4 class="title has-text-centered" style="color: #ff3860;">Class Wise Blood Group ({session_name})</h4>
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
			       <button class="button is-warning is-rounded is-pulled-right is-small ml5" onclick={readStudentBloodGroupListingReport} style="margin-left:5px;margin-right:5px">
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
				<tr each={st, i in studentBloodGroupListingReports}  if={st.standard!='Total'}>
					<td>{i+1}</td>
					<td>{st.standard}</td>
					<td>{st['A+']}</td>
					<td>{st['A-']}</td>
					<td>{st['AB+']}</td>
					<td>{st['AB-']}</td>
					<td>{st['B+']}</td>
					<td>{st['B-']}</td>
					<td>{st['O+']}</td>
					<td>{st['O-']}</td>
				</tr>
				<tr>
					<td colspan="2" class="has-text-centered" style="font-size:18px">Total</td>
					<td style="font-size:18px">{total_A_plus}</td>
					<td style="font-size:18px">{total_A_min}</td>
					<td style="font-size:18px">{total_AB_plus}</td>
					<td style="font-size:18px">{total_AB_min}</td>
					<td style="font-size:18px">{total_B_plus}</td>
					<td style="font-size:18px">{total_B_min}</td>
					<td style="font-size:18px">{total_O_plus}</td>
					<td style="font-size:18px">{total_O_min}</td>
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

      self.total_A_plus=0
      self.total_A_min=0
      self.total_AB_plus=0
      self.total_AB_min=0
      self.total_B_plus=0
      self.total_B_min=0
      self.total_O_plus=0
      self.total_O_min=0
      self.studentBloodGroupListingReports.map(c => {
      if(c['A+']!=undefined){
       		self.total_A_plus= Number(self.total_A_plus) + Number(c['A+'])
        }
        if(c['A-']!=undefined){
          self.total_A_min= self.total_A_min + c['A-']
        }

        if(c['AB+']!=undefined){
       	  self.total_AB_plus= self.total_AB_plus + c['AB+']
        }
        if(c['AB-']!=undefined){
            self.total_AB_min= self.total_AB_min + c['AB-']
        }


        if(c['B+']!=undefined){
       	   self.total_B_plus= self.total_B_plus + c['B+']
        }
        if(c['B-']!=undefined){
            self.total_B_min= self.total_B_min + c['B-']
        }


        if(c['O+']!=undefined){
       	    self.total_O_plus= self.total_O_plus + c['O+']
        }
        if(c['O-']!=undefined){
            self.total_O_min= self.total_O_min + c['O-']
        }
     
      })

      // console.log(studentBloodGroupListingReports)

      self.update()
      //console.log(self.employeeTypes)
    }
    

    
</script>
</student-blood-group-report>