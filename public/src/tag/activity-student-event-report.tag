<activity-student-event-report>
  <print-header></print-header>
	<loading-bar if={loading}></loading-bar>
	<section class=" is-fluid">
  <h2 class="title has-text-centered is-size-5" style="color: #ff3860;">Student Event Report</h2>

	<div class="box no-print">
		<div class="columns">
			<div class="column is-narrow">
				<label class="label">From Date</label>
			</div>
			<div class="column is-narrow">
				<input class="input date" ref="start_date" id="start_date" type="text" readonly="readonly">
			</div>
			<div class="column is-narrow">
				<label class="label">To Date</label>
			</div>
			<div class="column is-narrow">
				<input class="input date" ref="end_date" id="end_date" type="text" readonly="readonly">
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
    <p><center><strong>From:{st_date}  To: {en_date}</strong></center></p>
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
      self.loading = false;
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
      var startDate = document.getElementById("start_date").value;
      var endDate = document.getElementById("end_date").value;
    	if(!self.refs.start_date.value){
        toastr.info("Please enter From Date and try again")
      	}else if(!self.refs.end_date.value){
      	toastr.info("Please enter To Date and try again")
      	}else if((Date.parse(startDate) >= Date.parse(endDate))){
          toastr.info("Please enter To Date Grater Than From Date")
        }else{
    	    var obj={}
          obj['start_date']=convertDate(self.refs.start_date.value)
          obj['end_date']=convertDate(self.refs.end_date.value)          
          self.loading = true
          activityReportStore.trigger('read_student_event_report', obj)
          console.log(obj)
        }
    }

    self.csvExport = () => {
        var startDate = document.getElementById("start_date").value;
        var endDate = document.getElementById("end_date").value;

        if(!self.refs.start_date.value){
        toastr.info("Please enter Start Date and try again")
      	}else if(!self.refs.end_date.value){
      	toastr.info("Please enter End Date and try again")
      	}else if((Date.parse(startDate) >= Date.parse(endDate))){
          toastr.info("Please enter To Date Grater Than From Date")
        }else{
    	    var obj={}
          obj['start_date']=convertDate(self.refs.start_date.value)
          obj['end_date']=convertDate(self.refs.end_date.value)          
          activityReportStore.trigger('csv_student_event_report', obj)
        }
    }

    activityReportStore.on('read_student_event_report_changed',ReadStudentEventReportChanged)
    function ReadStudentEventReportChanged(student_event_report){
      self.reportData=[];
      self.reportData = student_event_report
      if(self.reportData.length==0){
      	toastr.info("No Data Found")
      }
      self.st_date = self.refs.start_date.value
      self.en_date = self.refs.end_date.value
      self.loading = false;
      self.update();
    }
</script>
</activity-student-event-report>