<advance-fees>
<section class=" is-fluid">
	<h2 class="title has-text-centered" style="color: #ff3860;">Advance Fees Report</h2>
	<span class="has-text-centered">{selected_start_date} to {selected_end_date}</span>
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
				onclick={advanceFeesReport} > GO
				</button>
				
			</div>
		</div>
	</div>

	<div class="columns is-full">
		<table class="table is-fullwidth is-striped is-hoverable is-bordered" >
			<thead>
				<tr>
					<th class="slNo">#</th>
				    <th>Enrol No.</th>
				    <th >Student's Name</th>
				    <th >Class</th>
				    <th >Month</th>
				    <th >Fee</th>
				    <th >Scholarship</th>
				    <th >Amount</th>
				</tr>
			</thead>
			<tbody>
				<tr each={cd, i in advanceFees}>
					<td>{i + 1}</td>
					<td>{cd.enroll_number}</td>
					<td>{cd.name}</td>
					<td>{cd.standard}</td>
					<td>{cd.fee_slip_name}</td>
					<td class="has-text-right amount">{cd.amount_due}</td>
					<td class="has-text-right amount">{cd.scholorship_amount}</td>
					<td class="has-text-right amount">{cd.total}</td>
				</tr>
				<tr>
					<th class="has-text-right" colspan="5">Grand Total</th>
					<th class="has-text-right amount">{total_amount}</th>
					<th class="has-text-right amount">{total_scholarship}</th>
					<th class="has-text-right amount">{grand_total}</th>
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
      feesReportStore.off('read_advanced_fees_changed',ReadAdvancedFeesChanged)
    })

    self.advanceFeesReport = () => {
    	var obj={}
          obj['start_date']=self.refs.start_date.value
          obj['end_date']=self.refs.end_date.value
          
          self.loading = true
          feesReportStore.trigger('read_early_fees_payer', obj)
    }

    feesReportStore.on('read_advanced_fees_changed',ReadAdvancedFeesChanged)
    function ReadAdvancedFeesChanged(advanceFees){
      self.grand_total = 0
      self.total_amount = 0
      self.total_scholarship = 0
      self.advanceFees = []
      self.advanceFees = advanceFees
       self.advanceFees.map(c => {
          
          self.grand_total +=Number(c.total)
          self.total_amount +=Number(c.amount_due)
          self.total_scholarship +=Number(c.scholorship_amount)
      })
       self.selected_start_date = self.refs.start_date.value
          self.selected_end_date = self.refs.end_date.value
          console.log("----------advance Fees---------")
      console.log("advanceFees")
      self.update()
    }
</script>
 
</advance-fees>