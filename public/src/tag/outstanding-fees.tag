<outstanding-fees>
<section class=" is-fluid">
	<h2 class="title has-text-centered" style="color: #ff3860;">Month Wise Fees Report</h2>
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
				<input class="date input flatpickr-input form-control input" placeholder="" ref="start_date" tabindex="0" type="text" readonly="readonly">
			</div>
			<div class="column is-narrow">
				<label class="label">To Date</label>
			</div>
			<div class="column is-narrow">
				<input class="date input flatpickr-input form-control input" placeholder="" ref="end_date" tabindex="0" type="text" readonly="readonly">
			</div>
			<div class="column">
				<button class="button is-danger has-text-weight-bold"
				onclick={getOutstandingFees} > GO
				</button>
				
			</div>
		</div>
	</div>

	<div class="columns is-full">
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
	</div>
</section>

<script>
	var self = this
    self.on("mount", function(){
      flatpickr(".date", {
    	/*altInput: true,*/
    	allowInput: true,
    	altFormat: "d/m/Y",
    	dateFormat: "Y-m-d",
  		})
      self.update();
    })

    self.on("unmount", function(){
      feesReportStore.off('read_outstanding_fees_changed',ReadOutstandingFeesChanged)
    })

    self.getOutstandingFees = () => {
    	var obj={}
          obj['start_date']=self.refs.start_date.value
          obj['end_date']=self.refs.end_date.value
          self.loading = true
          feesReportStore.trigger('read_outstanding_fees', obj)
          console.log(obj)
    }

    feesReportStore.on('read_outstanding_fees_changed',ReadOutstandingFeesChanged)
    function ReadOutstandingFeesChanged(outstandingData){
      
      console.log("inside tag")
      console.log(outstandingData) 
      self.outstandingData = []
      self.outstandingData = outstandingData
      console.log("outstandingData")
      self.update()
    }
</script>

 
</outstanding-fees>