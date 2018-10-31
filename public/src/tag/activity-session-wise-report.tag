<activity-session-wise-report>
		<section class=" is-fluid">
	<h2 class="title has-text-centered" style="color: #ff3860;">Session Wise Activity Detail</h2>
	<div class="flex items-center mt-2 mb-6 no-print">
		<div class="bg-green py-1 rounded w-10">
			<div class="bg-grey h-px flex-auto"></div>
		</div>
	</div>
	<div class="box">
		<div class="columns">
			<div class="column is-narrow">
				<label class="label">Type</label>
			</div>
			<div class="column is-narrow">
					<div class="control">
						<div class="select">
							<select ref="activity_type">
								<option value="Intra-School">Intra-School</option>
								<option value="Inter-School">Inter-School</option>
								<option value="Both">Both</option>
							</select>
						</div>
					</div>
				</div>
			<div class="column is-narrow">
				<label class="label">Session</label>
			</div>
			<div class="column is-narrow">
				<div class="control">
					<div class="select">
						<select ref="session_id" >
							<option each={sessions} value={session_id}>{session_name}
                            </option>
						</select>
					</div>
				</div>
			</div>
			<div class="column">
				<button class="button is-danger has-text-weight-bold"
				onclick={getData} > GO
				</button>
			</div>
		</div>
	</div>

		<table class="table is-striped is-hoverable is-bordered is-fullwidth">
			<thead>
				<tr>
				    <th>Sl No</th>
				    <th>Date</th>
				    <th>Event Name</th>
				    <th>Organised By</th>
				    <th>Venue</th>
				    <th>Participant</th>
				    <th>Teacher Incharge</th>
				    <th>Result</th>
				</tr>
			</thead>
			<tbody>
				<tr each={a, i in reportData}>
					<td>{ i+1 }</td>
					<td>{a.activity_date}</td>
					<td>{a.event_name}</td>
					<td>{a.organised_by}</td>
					<td>{a.venue}</td>
					<td>{a.participant_name}</td>
					<td>{a.teacher_name}</td>
					<td>{a.result}</td>
				</tr>
			</tbody>
		</table>
</section>
<script>
	var self = this
    self.on("mount", function(){
      flatpickr(".date", {
	    allowInput: true,
        dateFormat: "d/m/Y",
  		})
      self.readSession()
      self.update();
    })

    self.on("unmount", function(){
      activityReportStore.off('read_activity_session_wise_report_changed',ReadActivitySessionWiseReportChanged)
      activityReportStore.off('read_session_changed',SessionChanged)
    })

    self.readSession = () => {
       activityReportStore.trigger('read_session')
    }

    self.getData = () => {
    	var obj={}
          self.loading = true
          activityReportStore.trigger('read_activity_session_wise_report',self.refs.activity_type.value, 
          	self.refs.session_id.value)
    }

    activityReportStore.on('read_session_changed',SessionChanged)
    function SessionChanged(sessions){
      console.log(sessions) 
      self.sessions = sessions
      self.update()
    }

    activityReportStore.on('read_activity_session_wise_report_changed',ReadActivitySessionWiseReportChanged)
    function ReadActivitySessionWiseReportChanged(activity_session_wise_report){
      self.reportData=[];
      self.reportData = activity_session_wise_report
      console.log(self.reportData)
      self.update()
    }
</script>
</activity-session-wise-report>