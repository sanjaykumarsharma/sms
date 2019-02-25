<daily-attendance>
	 <print-header></print-header> 
  <loading-bar if={loading}></loading-bar>
	<section class=" is-fluid">
			<h2 class="title has-text-centered" style="color: #ff3860;">Daily Attendance Summary</h2>
		<div class="box no-print">
			<div class="columns">
				<div class="column is-narrow">
                <label class="label">Date</label>
                </div>
		        <div class="column is-narrow">
		          <div class="control">
		             <input class="input date flatpickr-input form-control input"  ref="start_date" placeholder="" tabindex="0"  type="text">
		          </div>
		        </div>
		        <div class="column">
					<div class="control">
						<button class="button is-danger has-text-weight-bold" onclick={readDailyAttendanceData}>Go</button>
						<button class="button is-primary has-text-weight-bold is-pulled-right" onclick="window.print()" title="Print">
		                  <span class="icon">  <i class="fas fa-print"></i></span>
		                 </button>
					</div>
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
        self.update()
        flatpickr(".date", {
	    	allowInput: true,
        	dateFormat: "Y-m-d",
  		})
    })

    self.on("unmount", function(){
       attendanceStore.off('read_daily_attendance_data_changed',ReadDailyAttendanceDataChanged)
    })
   

    self.readDailyAttendanceData = () => {
    	 self.loading = true
       attendanceStore.trigger('read_daily_attendance_data',self.refs.start_date.value)  
    }

    attendanceStore.on('read_daily_attendance_data_changed',ReadDailyAttendanceDataChanged)
    function ReadDailyAttendanceDataChanged(dailyAttendanceData){
      //console.log(dailyAttendanceData) 
      self.title='Create'
      self.loading = false
      self.dailyAttendanceData = dailyAttendanceData
      self.update()
    }

</script>
</daily-attendance>