<activity-student-event-report>
	<section class=" is-fluid">
	<h2 class="title has-text-centered" style="color: #ff3860;">Student Event Report</h2>
	<div class="flex items-center mt-2 mb-6 no-print">
		<div class="bg-green py-1 rounded w-10">
			<div class="bg-grey h-px flex-auto"></div>
		</div>
	</div>
	<div class="box">
		<div class="columns">
			<div class="column is-narrow">
				<label class="label">From Date</label>
			</div>
			<div class="column is-narrow">
				<input class="input date" ref="start_date" type="text" readonly="readonly">
			</div>
			<div class="column is-narrow">
				<label class="label">To Date</label>
			</div>
			<div class="column is-narrow">
				<input class="input date" ref="end_date" type="text" readonly="readonly">
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
			    <th>Participant Name</th>
			    <th>Enroll No</th>
			    <th>Class</th>
			    <th>Event</th>
			</tr>
		</thead>
		<tbody>
			<tr each={a, i in reportData}>
				<td>{ i+1 }</td>
				<td>{a.student_name}</td>
				<td>{a.enroll_number}</td>
				<td>{a.standard}</td>
				<td>{a.event_name}</td>
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
      self.update();
    })

    self.on("unmount", function(){
      activityReportStore.off('read_activity_date_wise_report_changed',ReadStudentEventReportChanged)
    })

    self.getData = () => {
    	if(!self.refs.start_date.value){
        toastr.info("Please enter Start Date and try again")
      	}else if(!self.refs.end_date.value){
      	toastr.info("Please enter End Date and try again")
      	}else{
    	var obj={}
          obj['start_date']=convertDate(self.refs.start_date.value)
          obj['end_date']=convertDate(self.refs.end_date.value)          
          self.loading = true
          activityReportStore.trigger('read_student_event_report', obj)
          console.log(obj)
        }
    }

    activityReportStore.on('read_student_event_report_changed',ReadStudentEventReportChanged)
    function ReadStudentEventReportChanged(student_event_report){
      self.reportData=[];
      self.reportData = student_event_report
      console.log(self.reportData)
      self.update();
    }
</script>
</activity-student-event-report>