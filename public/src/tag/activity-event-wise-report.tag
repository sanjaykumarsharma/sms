<activity-event-wise-report>
	<section class=" is-fluid">
	<h2 class="title has-text-centered" style="color: #ff3860;">Event Wise Activity Detail</h2>
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
				<label class="label">Event</label>
			</div>
			<div class="column is-narrow">
				<div class="control">
					<div class="select">
						<select ref="event_id" >
							<option each={events} value={event_id}>{event_name}
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
				    <th>Type</th>
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
					<td>{a.activity_type}</td>
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
      self.readEvent()
      self.update();
    })

    self.on("unmount", function(){
      activityReportStore.off('read_activity_event_wise_report_changed',ReadActivityEventWiseReportChanged)
      activityReportStore.off('read_event_changed',EventChanged)
    })

    self.readEvent = () => {
       activityReportStore.trigger('read_event')
    }

    self.getData = () => {
    	var obj={}
          self.loading = true
          activityReportStore.trigger('read_activity_event_wise_report',self.refs.activity_type.value, 
          	self.refs.event_id.value)
    }

    activityReportStore.on('read_event_changed',EventChanged)
    function EventChanged(events){
      console.log(events) 
      self.events = events
      self.update()
    }

    activityReportStore.on('read_activity_event_wise_report_changed',ReadActivityEventWiseReportChanged)
    function ReadActivityEventWiseReportChanged(activity_event_wise_report){
      self.reportData=[];
      self.reportData = activity_event_wise_report
      console.log(self.reportData)
      self.update()
    }
</script>
</activity-event-wise-report>