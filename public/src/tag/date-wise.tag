<date-wise>
<header></header>	
<loading-bar if={loading}></loading-bar>	
<section class=" is-fluid">
	
	<div class="box no-print">
		<div class="columns">
			<div class="column is-narrow">
				<label class="label">From Date</label>
			</div>
			<div class="column is-narrow">
				<input class="date input is-small" id="start_date" ref="start_date" tabindex="0" type="text" readonly="readonly">
			</div>
			<div class="column is-narrow">
				<label class="label">To Date</label>
			</div>
			<div class="column is-narrow">
				<input class="date input is-small" id="end_date" ref="end_date" tabindex="0" type="text" readonly="readonly">
			</div>
			<div class="column">
				<button class="button is-danger has-text-weight-bold"
				onclick={getDateWiseFees} > GO
				</button>

				<button class="button is-primary has-text-weight-bold is-pulled-right" onclick="window.print()" title="Print">
		               <span class="icon">
		                 <i class="fas fa-print"></i>
		             </span>
		         </button>
				
			</div>
		</div>
	</div>
    <p class="has-text-centered" style="color: #ff3860;font-weight:bold">Date Wise Fees Received</p>
	<p class="has-text-centered">Session: {sessionName}</p>
	<p class="has-text-centered">{fromSelectedDate} - {toSelectedDate}</p>

		<table class="table is-fullwidth is-striped is-hoverable is-bordered" >
			<thead>
				<tr>
					<th class="slno">#</th>
				    <th>Receipt Date</th>
				    <th >Fees</th>
				    <th >Fine</th>
				    <th >Scholarship</th>
				    <th >Total</th>
				</tr>
			</thead>
			<tbody>
				<tr each={cd, i in dateWiseData}>
					<td>{i + 1}</td>
					<td>{cd.receipt_date}</td>
					<td class="has-text-right amount">{cd.fees}</td>
					<td class="has-text-right amount">{cd.fine}</td>
					<td class="has-text-right amount">{cd.scholarship}</td>
					<td class="has-text-right amount">{cd.total}</td>
				</tr>
				<tr>
					<th class="has-text-right" colspan="
					2">Total</th>
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
    self.on("mount", function(){
      flatpickr(".date", {
        allowInput: true,
        dateFormat: "d/m/Y",
      })
      self.update();
    })

    self.on("unmount", function(){
      feesReportStore.off('read_date_fees_changed',ReadDateFeesChanged)
    })

    self.getDateWiseFees = () => {
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
          feesReportStore.trigger('read_date_wise_fees', obj)
       }
    }

    feesReportStore.on('read_date_fees_changed',ReadDateFeesChanged)
    function ReadDateFeesChanged(dateWiseData, session_name){
      self.totalFees = 0
      self.totalFine = 0
      self.totalScholarship = 0
      self.totalGrandTotal = 0
      console.log(dateWiseData) 
      self.dateWiseData = []
      self.dateWiseData = dateWiseData
       self.dateWiseData.map(c => {
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

</date-wise>