<month-wise>
<header></header>	
<loading-bar if={loading}></loading-bar>
<section class=" is-fluid">

	<div class="box no-print" >
		<div class="columns">
			<div class="column is-narrow">
				<label class="label">From Date</label>
			</div>
			<div class="column is-narrow">
				<input class="date input  form-control input" id="start_date" ref="start_date" tabindex="0" type="text" readonly="readonly">
			</div>
			<div class="column is-narrow">
				<label class="label">To Date</label>
			</div>
			<div class="column is-narrow">
				<input class="date input  form-control input" id="end_date" ref="end_date" tabindex="0" type="text" readonly="readonly">
			</div>
			<div class="column">
				<button disabled={loading} class="button is-danger has-text-weight-bold"
				onclick={getMonthlyFees} > GO
				</button>
				<button class="button is-primary has-text-weight-bold is-pulled-right" onclick="window.print()" title="Print">
		              <span class="icon">
		                 <i class="fas fa-print"></i>
		             </span>
		         </button>
			</div>
		</div>
	</div>	
	<p class="has-text-centered" style="color: #ff3860;font-weight:bold">Month Wise Fees Report</p>
	<p class="has-text-centered">Session: {sessionName}</p>
	<p class="has-text-centered">{fromSelectedDate} - {toSelectedDate}</p>
	
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
	
</section>

<script>
	var self = this
	self.fromSelectedDate = ''
	self.toSelectedDate = ''
    self.on("mount", function(){
      flatpickr(".date", {
        allowInput: true,
        dateFormat: "d/m/Y",
      })
      self.update();
    })

    self.on("unmount", function(){
      feesReportStore.off('read_monthly_fees_changed',ReadMonthlyFeesChanged)
    })

    self.getMonthlyFees = () => {
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
          feesReportStore.trigger('read_monthly_fees', obj)
         }
    }

    feesReportStore.on('read_monthly_fees_changed',ReadMonthlyFeesChanged)
    function ReadMonthlyFeesChanged(monthlyData, session_name){
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
       self.sessionName = session_name
       self.fromSelectedDate = self.refs.start_date.value
       self.toSelectedDate = self.refs.end_date.value
       self.loading = false
      
      self.update()
    }
</script>

</month-wise>