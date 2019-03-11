<monthly-attendance>
	<header></header>
  <loading-bar if={loading}></loading-bar>
	<section class=" is-fluid">
			<h2 class="title has-text-centered" style="color: #ff3860;">Monthly Attendance Report</h2>
	<div class="box no-print">
		<div class="columns">
			<div class="column is-narrow">
				<label class="label">Standard</label>
			</div>
			<div class="column is-narrow">
				<div class="control">
					<div class="select">
						<select ref="standard_id" id="standard_id" onchange={readStandardSection}>
							<option ></option>
							<option each={standards} value={standard_id}>{standard}
                            </option>
						</select>
					</div>
				</div>
			</div>
			<div class="column is-narrow">
				<label class="label">Section</label>
			</div>
			<div class="column is-narrow">
				<div class="control">
					<div class="select">
						<select ref="section_id" id="section_id" onchange={getMonthlyAttendanceData}>
							<option each={filteredSections} value={section_id} >{section}
                            </option>
						</select>
					</div>
				</div>
			</div>
			<div class="column is-narrow">
				<label class="label">Month</label>
			</div>
			<div class="column is-narrow">
				<div class="control">
					<div class="select">
						<select ref="monthList" id="monthList" onchange={readYear}>
							<option>Choose Year</option>
							<option value="1">January</option>
							<option value="2">February</option>
							<option value="3">March</option>
							<option value="4">April</option>
							<option value="5">May</option>
							<option value="6">June</option>
							<option value="7">July</option>
							<option value="8">August</option>
							<option value="9">September</option>
							<option value="10">October</option>
							<option value="11">November</option>
							<option value="12">December</option>
						</select>
					</div>
				</div>
			</div>
			<div class="column">
				<button disabled={loading} class="button is-danger has-text-weight-bold"
				onclick={getMonthlyAttendanceData} > GO
				</button>
				<button class="button is-primary has-text-weight-bold is-pulled-right" onclick="window.print()" title="Print">
		               <span class="icon">
		                 <i class="fas fa-print"></i>
		             </span>
		         </button>
			</div>
		</div>
	</div>
	<div style=" overflow-x: scroll;" class="table-border-hide">
		<table class="table is-fullwidth is-striped is-hoverable">
			<thead>
				<tr>
					<th>Roll No</th>
	  				<th>Enroll No</th>
	  				<th style="min-width: 210px;">Student Name</th>
	      			<th each={c, i in headers}>{c}</th>
	      			<th>Ab</th>
	      			<th>Attn</th>
	      			<th>mnth%</th>
	      			<th style="min-width: 90px;">Toatl Attn</th>
	      			<th style="min-width: 50px;">Toatl %</th>
					
				</tr>
			</thead>
			<tbody>
				<tr each={c, i in student_list}>
					<td>{c.roll_number}</td>
			    	<td>{c.enroll_number}</td>
	      			<td>{c.student_name}</td>
	      			<td each={a, j in c.orderedAttendance} class="{a} {c.bold}" >{a}</td>
	      			<td>{c.total_ab_month}</td>
	      			<td>{c.attn}</td>
	      			<td>{c.mnth}</td>
	      			<td>{c.total_attn}</td>
	      			<td>{c.total_percentage}</td>
				</tr>
			</tbody>
		</table>
	</div>

	</section>
	
<!-- End Other Information -->
<script>
	
	var self = this
    self.on("mount", function(){
    	self.title='Add'
    	self.role = getCookie('role') 
        flatpickr(".date", {
    	allowInput: true,
        dateFormat: "d/m/Y",
  		})
  		self.readSection()
	    self.readStandard()
	    self.readYear()
	    self.update();
    })

    self.on("unmount", function(){
       applyPlanStore.off('read_standard_changed',StandardChanged)
       applyPlanStore.off('read_section_changed',SectionChanged)	
       attendanceStore.off('read_year_changed',ReadYearChanged)
       attendanceStore.off('read_monthly_attendance_data_changed',ReadMonthlyAttendanceDataChanged)
    })

    self.readYear = () => {
       attendanceStore.trigger('read_year',self.refs.monthList.value)
    }

    //read standard 
   self.readStandard = () => {
       applyPlanStore.trigger('read_standards')
    }
    self.readSection = () => {
       applyPlanStore.trigger('read_sections')
       
    }

    self.readStandardSection = () => {
       
       console.log('filter')
       self.filteredSections = []
       self.filteredSections = self.sections.filter(s => {
       	return s.standard_id == self.refs.standard_id.value
       })
    }

    applyPlanStore.on('read_standard_changed',StandardChanged)
    function StandardChanged(standards){
      console.log(standards) 
      self.standards = standards
      self.update()
      //self.readStandardSection()
    }
    applyPlanStore.on('read_section_changed',SectionChanged)
    function SectionChanged(sections){
      console.log(sections) 
      self.sections = sections
      self.section_id = sections[0].section_id

      self.update()
    }
   

    /*self.readDailyAttendanceData = () => {
    	 self.loading = true
       attendanceStore.trigger('read_daily_attendance_data',self.refs.start_date.value)  
    }*/
    self.getMonthlyAttendanceData = () =>{
      var obj={}
	  obj.standard_id = self.refs.standard_id.value
	  obj.section_id = self.refs.section_id.value
      obj.month_id = self.refs.monthList.value
      obj.year = self.year
     // self.loading = true
      attendanceStore.trigger('read_monthly_attendance_data', obj)
    }

    attendanceStore.on('read_year_changed',ReadYearChanged)
    function ReadYearChanged(year){
      self.year = year
      self.update()
    }

    attendanceStore.on('read_monthly_attendance_data_changed',ReadMonthlyAttendanceDataChanged)
    function ReadMonthlyAttendanceDataChanged(headers,student_list){
      //console.log(monthlyAttendanceData) 
      self.loading = false
      
      self.headers = headers
      self.student_list = student_list
      self.update()
    }

</script>
</monthly-attendance>