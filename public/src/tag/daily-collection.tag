<daily-collection>
<section class=" is-fluid">
	<h2 class="title has-text-centered" style="color: #ff3860;">Fees Transaction Report</h2>
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
				onclick={getDailyFees} > GO
				</button>
				
			</div>
		</div>
	</div>

	<div class="columns is-full">
		<table class="table is-fullwidth is-striped is-hoverable is-bordered" >
			
			<tbody>
				<tr each={cd, i in dailyData}>
					<td>{cd.slNo}</td>
					<td>{cd.receipt_date}</td>
					<td>{cd.receipt_id}</td>
					<td>{cd.enroll_number}</td>
					<td>{cd.name}</td>
					<td>{cd.fee_slip_name}</td>
					<td>{cd.class}</td>
					<td>{cd.bank_name}</td>
					<td>{cd.item_no}</td>
					<td>{cd.mode}</td>
					<td class="has-text-right amount">{cd.amount_due}</td>
					<td class="has-text-right amount">{cd.fine}</td>
					<td class="has-text-right amount">{cd.scholarship_amount}</td>
					<td class="has-text-right amount">{cd.total}</td>
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
      feesReportStore.off('read_daily_fees_changed',ReadDailyFeesChanged)
    })

    self.getDailyFees = () => {
    	var obj={}
          obj['start_date']=self.refs.start_date.value
          obj['end_date']=self.refs.end_date.value
          self.loading = true
          feesReportStore.trigger('read_daily_fees', obj)
          console.log(obj)
    }

    feesReportStore.on('read_daily_fees_changed',ReadDailyFeesChanged)
    function ReadDailyFeesChanged(dailyData){
      self.totalFees = 0
      self.totalFine = 0
      self.totalScholarship = 0
      self.totalGrandTotal = 0
      console.log(dailyData) 
      self.dailyData = []
      self.dailyData = dailyData
       
      console.log("dailyData")
      self.update()
    }
</script>

</daily-collection>