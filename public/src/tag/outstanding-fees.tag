<outstanding-fees>
<header></header>	
<loading-bar if={loading}></loading-bar>
<section class=" is-fluid">
	<div class="box no-print">
		<div class="columns">
			<div class="column is-narrow">
				<label class="label">From Date</label>
			</div>
			<div class="column is-narrow">
				<input class="date input" id="start_date" ref="start_date" tabindex="0" type="text" readonly="readonly">
			</div>
			<div class="column is-narrow">
				<label class="label">To Date</label>
			</div>
			<div class="column is-narrow">
				<input class="date input" id="end_date" ref="end_date" tabindex="0" type="text" readonly="readonly">
			</div>
			<div class="column">
				<button disabled={loading} class="button is-danger has-text-weight-bold"
				onclick={getOutstandingFees} > GO
				</button>
			</div>
			<div class="level-right" >
	          <button class="button is-success has-text-weight-bold  ml5" onclick={downloadCSV}>
	                <span class="icon">
	                  <i class="far fa-file-excel"></i>
	                </span>
	              </button>
	          <button class="button is-primary has-text-weight-bold ml5" onclick="window.print()" title="Print">
	                  <span class="icon">
	                     <i class="fas fa-print"></i>
	                 </span>
	             </button>
	        </div>
		</div>
	</div>
    <p class="has-text-centered" style="color: #ff3860;font-weight:bold">Month Wise Fees Report</p>
	<p class="has-text-centered">Session: {sessionName}</p>
	<p class="has-text-centered">Class:{selectedClass} Month:{selectedMonth}</p>
		<table class="table is-fullwidth is-striped is-hoverable is-bordered" >
			<thead>
				<tr>
				    <th  class="slNo">#</th>
				    <th >Enrol No</th>
				    <th >Class/student's Name</th>
				    <th >Mobile (F)</th>
				    <th >SMS No.</th>
				    <th >Month</th>
				    <th >Fees</th>
				</tr>
			</thead>
			<tbody>
				<tr each={cd, i in outstandingData}>
					<td>{cd.slNo}</td>
					<td>{cd.enroll_number}</td>
					<td>{cd.student_name}</td>
					<td>{cd.f_mobile}</td>
					<td>{cd.mobile}</td>
					<td>{cd.fee_slip_name}</td>
					<td class="has-text-right amount">{cd.fees}</td>
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
      feesReportStore.off('read_outstanding_fees_changed',ReadOutstandingFeesChanged)
      feesReportStore.off('csv_export_outstanding_fees_changed',outstandingFeesChanged)
    })

    self.downloadCSV = () => {
      feesReportStore.trigger('csv_outstanding_fees',self.outstandingData)
    }

    feesReportStore.on('csv_export_outstanding_fees_changed',outstandingFeesChanged)
    function outstandingFeesChanged(url){
      var open_url = window.location.origin+url 
      window.open(open_url);
      self.loading = false
      self.update()
     }

    self.getOutstandingFees = () => {
    	var startDate = document.getElementById("start_date").value
    	var endDate = document.getElementById("end_date").value
    	if(!self.refs.start_date.value){
    		toastr.info("Pleae enter From Date and try again")
    	}else if(!self.refs.end_date.value){
    		toastr.info("Pleae enter End Date and try again")
    	}else if((Date.parse(startDate)> Date.parse(endDate))){
           toastr.info("From date can't be greater")
    	}else{
    	var obj={}
          obj['start_date']=convertDate(self.refs.start_date.value)
          obj['end_date']=convertDate(self.refs.end_date.value)
          self.loading = true
          feesReportStore.trigger('read_outstanding_fees', obj)
          }
    }

    feesReportStore.on('read_outstanding_fees_changed',ReadOutstandingFeesChanged)
    function ReadOutstandingFeesChanged(outstandingData, session_name){
      self.outstandingData = []
      self.outstandingData = outstandingData
      
      self.sessionName = session_name
      self.fromSelectedDate = self.refs.start_date.value
      self.toSelectedDate = self.refs.end_date.value
      self.loading = false
      self.update()
    }
</script>

 
</outstanding-fees>