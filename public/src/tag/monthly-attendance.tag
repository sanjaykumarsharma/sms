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
						<select ref="monthList" id="monthList">
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
		<table class="table is-fullwidth is-striped is-hoverable is-narrow">
			<thead>
				<tr>
					<th>#</th>
					<th>Teacher</th>
					<th>Standard</th>
					<th>Section</th>
					<th>Present</th>
					<th>Absent</th>
					<th>Time</th>
					
			    </th>
					
				</tr>
			</thead>
			<tbody>
				<tr each={st, i in dailyAttendanceData}>
					<td>{i+1}</td>
					<td>{st.teacher_name}</td>
					<td>{st.standard} </td>
					<td>{st.section} </td>
					<td>{st.pr} </td>
					<td>{st.ab} </td>
					<td>{st.time} </td>
					
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
        flatpickr(".date", {
    	allowInput: true,
        dateFormat: "d/m/Y",
  		})
  		self.readSection()
	    self.readStandard()
	    self.update();
    })

    self.on("unmount", function(){
       applyPlanStore.off('read_standard_changed',StandardChanged)
       applyPlanStore.off('read_section_changed',SectionChanged)	

       attendanceStore.off('read_monthly_attendance_data_changed',ReadMonthlyAttendanceDataChanged)
    })

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
     // self.loading = true
      attendanceStore.trigger('read_monthly_attendance_data', obj)
    }

    attendanceStore.on('read_monthly_attendance_data_changed',ReadMonthlyAttendanceDataChanged)
    function ReadMonthlyAttendanceDataChanged(monthlyAttendanceData){
      //console.log(monthlyAttendanceData) 
      self.loading = false
      self.monthlyAttendanceData = monthlyAttendanceData
      self.update()
    }

</script>
</monthly-attendance>