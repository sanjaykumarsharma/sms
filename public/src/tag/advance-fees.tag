<advance-fees>
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
				<button disabled={loading}  class="button is-danger has-text-weight-bold"
				onclick={advanceFeesReport} > GO
				</button>
				<button class="button is-primary has-text-weight-bold is-pulled-right" onclick="window.print()" title="Print">
		              <span class="icon">
		                 <i class="fas fa-print"></i>
		             </span>
		         </button>
				
			</div>
		</div>
	</div>
    <p class="has-text-centered" style="color: #ff3860;font-weight:bold">Advance Fees Report</p>
	<p class="has-text-centered">Session: {sessionName}</p>
	<p class="has-text-centered">{fromSelectedDate} - {toSelectedDate}</p>

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
</section>

<script>
	var self = this
    self.on("mount", function(){
      flatpickr(".date", {
    	allowInput: true,
    	altFormat: "Y-m-d",
  		})
      self.update();
    })

    self.on("unmount", function(){
      feesReportStore.off('read_advanced_fees_changed',ReadAdvancedFeesChanged)
    })

    self.advanceFeesReport = () => {
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
          obj['start_date']=self.refs.start_date.value
          obj['end_date']=self.refs.end_date.value
          
          self.loading = true
          feesReportStore.trigger('read_early_fees_payer', obj)
        }
    }

    feesReportStore.on('read_advanced_fees_changed',ReadAdvancedFeesChanged)
    function ReadAdvancedFeesChanged(advanceFees, session_name){
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
        self.sessionName = session_name
       self.fromSelectedDate = self.refs.start_date.value
       self.toSelectedDate = self.refs.end_date.value
       self.loading = false
      self.update()
    }
</script>
 
</advance-fees>