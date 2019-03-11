<activity-session-wise-report>
	<print-header></print-header>
	<loading-bar if={loading}></loading-bar>
	<section class=" is-fluid">
    <h2 class="title has-text-centered is-size-5" style="color: #ff3860;">Session Wise Activity Detail</h2>

	<div class="box no-print">
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
						<select ref="session_id" id="SessionName" >
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
			<div class="column">
				<button class="button is-success has-text-weight-bold ml5 is-pulled-right" onclick={csvExport}>
          			<span class="icon">
            			<i class="far fa-file-excel"></i>
			        </span>
			    </button>
			    <button class="button is-primary has-text-weight-bold is-pulled-right" onclick="window.print()">
          			<span class="icon">
            			<i class="fas fa-print"></i>
			        </span>
			    </button>
			</div>
		</div>
	</div>

	<table class="table is-striped is-hoverable is-bordered is-fullwidth">
		<p><center><strong>Activity Type:{activityType}  Session: {Session}</strong></center></p>
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
      self.loading = false;
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
      activityReportStore.off('csv_activity_session_wise_report_changed',csvActivitySessionWiseReportChanged)
    })

    self.readSession = () => {
       activityReportStore.trigger('read_session')
    }

    self.getData = () => {
        self.loading = true
        activityReportStore.trigger('read_activity_session_wise_report',self.refs.activity_type.value, 
        self.refs.session_id.value)
    }

    self.csvExport = () => {
      	activityReportStore.trigger('csv_activity_session_wise_report',self.refs.activity_type.value, 
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
      if(self.reportData.length==0){
      	toastr.info("No Data Found")
      }
      self.activityType = self.refs.activity_type.value, 
      self.Session = $("#SessionName option:selected").text();
      self.loading = false;
      self.update()
    }

    activityReportStore.on('csv_activity_session_wise_report_changed',csvActivitySessionWiseReportChanged)
    function csvActivitySessionWiseReportChanged(url){
      var open_url = window.location.origin+url 
      window.open(open_url);
      self.loading = false
      self.update()
    }
</script>
</activity-session-wise-report>