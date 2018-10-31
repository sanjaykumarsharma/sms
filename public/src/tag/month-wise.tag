<month-wise>
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
				onclick={getMonthlyFees} > GO
				</button>
				
			</div>
		</div>
	</div>

	<div class="columns is-full">
		<table class="table is-fullwidth is-striped is-hoverable is-bordered" >
			<thead>
				<tr>
				    <th>Month</th>
				    <th >Fees</th>
				    <th >Fine</th>
				    <th >Scholarship</th>
				    <th >Total</th>
				</tr>
			</thead>
			<tbody>
				<tr each={cd, i in monthlyData}>
					<td>{cd.month}</td>
					<td class="has-text-right amount">{cd.fees}</td>
					<td class="has-text-right amount">{cd.fine}</td>
					<td class="has-text-right amount">{cd.scholarship}</td>
					<td class="has-text-right amount">{cd.total}</td>
				</tr>
				<tr>
					<th class="has-text-right">Total</th>
					<th class="has-text-right amount">{totalFees}</th>
					<th class="has-text-right amount">{totalFine}</th>
					<th class="has-text-right amount">{totalScholarship}</th>
					<th class="has-text-right amount">{totalGrandTotal}</th>
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
      feesReportStore.off('read_monthly_fees_changed',ReadMonthlyFeesChanged)
    })

    self.getMonthlyFees = () => {
    	var obj={}
          obj['start_date']=self.refs.start_date.value
          obj['end_date']=self.refs.end_date.value
          self.loading = true
          feesReportStore.trigger('read_monthly_fees', obj)
          console.log(obj)
    }

    feesReportStore.on('read_monthly_fees_changed',ReadMonthlyFeesChanged)
    function ReadMonthlyFeesChanged(monthlyData){
      self.totalFees = 0
      self.totalFine = 0
      self.totalScholarship = 0
      self.totalGrandTotal = 0
      console.log(monthlyData) 
      self.monthlyData = []
      self.monthlyData = monthlyData
       self.monthlyData.map(c => {
          self.totalFees +=Number(c.fees)
          self.totalFine +=Number(c.fine)
          self.totalScholarship +=Number(c.scholarship)
          self.totalGrandTotal +=Number(c.total)
      })
      console.log("monthlyData")
      self.update()
    }
</script>

</month-wise>