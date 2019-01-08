<daily-collection>
<header></header>	
<loading-bar if={loading}></loading-bar>	
<section class=" is-fluid">
	
	<div class="flex items-center mt-2 mb-6 no-print">
		<div class="bg-green py-1 rounded w-10">
			<div class="bg-grey h-px flex-auto"></div>
		</div>
	</div>
	<div class="box no-print">
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
				onclick={getDailyFees} > GO
				</button>
				<button class="button is-primary has-text-weight-bold is-pulled-right" onclick="window.print()" title="Print">
		               <span class="icon">
		                 <i class="fas fa-print"></i>
		             </span>
		         </button>
				
			</div>
		</div>
	</div>
    <p class="has-text-centered" style="color: #ff3860;font-weight:bold">Fees Transaction Report</p>
	<p class="has-text-centered">Session: {sessionName}</p>
	<p class="has-text-centered">{fromSelectedDate} - {toSelectedDate}</p>
		<table class="table is-fullwidth is-striped is-hoverable is-bordered" >
			
			<tbody>
				<tr each={cd, i in dailyData}>
					<td><raw content="{cd.slNo}"></raw></td>
					<td><raw content="{cd.receipt_date}"></raw></td>
					<td><raw content="{cd.receipt_id}"></raw></td>
					<td><raw content="{cd.enroll_number}"></raw></td>
					<td><raw content="{cd.name}"></raw></td>
					<td><raw content="{cd.fee_slip_name}"></raw></td>
					<td><raw content="{cd.class}"></raw></td>
					<td><raw content="{cd.bank_name}"></raw></td>
					<td><raw content="{cd.item_no}"></raw></td>
					<td><raw content="{cd.mode}"></raw></td>
					<td class="has-text-right amount"> <raw content="{cd.amount_due}"></raw></td>
					<td class="has-text-right amount"> <raw content="{cd.fine}"></raw></td>
					<td class="has-text-right amount"> <raw content="{cd.scholorship_amount}"></raw></td>
					<td class="has-text-right amount"> <raw content="{cd.total}"></raw></td>
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
      feesReportStore.off('read_daily_fees_changed',ReadDailyFeesChanged)
    })

    self.getDailyFees = () => {
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
          feesReportStore.trigger('read_daily_fees', obj)
         }
    }

    feesReportStore.on('read_daily_fees_changed',ReadDailyFeesChanged)
    function ReadDailyFeesChanged(dailyData, session_name){
      self.totalFees = 0
      self.totalFine = 0
      self.totalScholarship = 0
      self.totalGrandTotal = 0
       
      self.loading = false
      self.dailyData = []
      self.dailyData = dailyData
      self.sessionName = session_name
   	  self.fromSelectedDate = self.refs.start_date.value
      self.toSelectedDate = self.refs.end_date.value

      self.update()
    }
</script>

</daily-collection>