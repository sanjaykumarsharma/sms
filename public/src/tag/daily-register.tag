<daily-register>
<header></header>	
<loading-bar if={loading}></loading-bar>	
<section class=" is-fluid">
	<div class="box no-print">
		<div class="columns">
			<div class="column is-narrow">
				<label class="label">From Date</label>
			</div>
			<div class="column is-narrow">
				<input class="date input form-control input" id="start_date" ref="start_date" tabindex="0" type="text" readonly="readonly">
			</div>
			<div class="column is-narrow">
				<label class="label">To Date</label>
			</div>
			<div class="column is-narrow">
				<input class="date input form-control input" id="end_date" ref="end_date" tabindex="0" type="text" readonly="readonly">
			</div>
			<div class="column">
				<button disabled={loading} class="button is-danger has-text-weight-bold"
				onclick={getFeesRegisterData} > GO
				</button>

				<button class="button is-primary has-text-weight-bold is-pulled-right" onclick="window.print()" title="Print">
		               <span class="icon">
		                 <i class="fas fa-print"></i>
		             </span>
		         </button>
				
			</div>
		</div>
	</div>
	
	<p class="has-text-centered" style="color: #ff3860;font-weight:bold">Daily Fees Register</p>
	<p class="has-text-centered">Session: {sessionName}</p>
	<p class="has-text-centered">{fromSelectedDate} - {toSelectedDate}</p>

		<table class="table is-fullwidth is-striped is-hoverable is-bordered" >
			
			<tbody>
				<tr each={cd, i in registerData}>
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
					<td class="has-text-right amount">{cd.scholorship_amount}</td>
					<td class="has-text-right amount">{cd.total}</td>
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
      feesReportStore.off('read_fees_register_changed',ReadFeesRegisterChanged)
    })

    self.getFeesRegisterData = () => {
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
          feesReportStore.trigger('read_fees_register', obj)
          console.log(obj)
      }
    }

    feesReportStore.on('read_fees_register_changed',ReadFeesRegisterChanged)
    function ReadFeesRegisterChanged(registerData, session_name){
      self.totalFees = 0
      self.totalFine = 0
      self.totalScholarship = 0
      self.totalGrandTotal = 0
      console.log(registerData) 
      self.registerData = []
      self.registerData = registerData

      self.sessionName = session_name
   	  self.fromSelectedDate = self.refs.start_date.value
      self.toSelectedDate = self.refs.end_date.value
      
      self.loading = false 
      console.log("registerData")
      self.update()
    }
</script>

</daily-register>