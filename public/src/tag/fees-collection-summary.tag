<fees-collection-summary>
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
				onclick={getFeesCollectionSummary} > GO
				</button>

				<button class="button is-primary has-text-weight-bold is-pulled-right" onclick="window.print()" title="Print">
		              <span class="icon">
		                 <i class="fas fa-print"></i>
		             </span>
		         </button>
				
			</div>
		</div>
	</div>

	<p class="has-text-centered" style="color: #ff3860;font-weight:bold">Bank/Cash Collection Summary</p>
	<p class="has-text-centered">Session: {sessionName}</p>
	<p class="has-text-centered">Class:{selectedClass} Month:{selectedMonth}</p>


		<table class="table is-fullwidth is-striped is-hoverable is-bordered" >
			<thead>
				<tr>
					<th>#</th>
				    <th>Bank</th>
				    <th >Cash</th>
				    <th >Cheque</th>
				    <th >Online</th>
				    <th >Total</th>
				</tr>
			</thead>
			<tbody>
				<tr each={cd, i in collectionSummary}>
					<td>{i + 1}</td>
					<td>{cd.bank}</td>
					<td class="has-text-right amount">{cd.cash}</td>
					<td class="has-text-right amount">{cd.cheque}</td>
					<td class="has-text-right amount">{cd.online}</td>
					<td class="has-text-right amount">{cd.total}</td>
				</tr>
				<tr>
					<th class="has-text-right" colspan="2">Total</th>
					<th class="has-text-right amount">{totalCash}</th>
					<th class="has-text-right amount">{totalCheque}</th>
					<th class="has-text-right amount">{totalOnline}</th>
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
      feesReportStore.off('read_collection_summary_changed',ReadCollectionSummaryChanged)
    })

    self.getFeesCollectionSummary = () => {
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
          feesReportStore.trigger('read_collection_summary', obj)
          }
    }

    feesReportStore.on('read_collection_summary_changed',ReadCollectionSummaryChanged)
    function ReadCollectionSummaryChanged(collectionSummary, session_name){
       console.log(collectionSummary) 
          self.collectionSummary = []
          self.collectionSummary = collectionSummary
          self.totalCash = 0;
          self.totalCheque = 0;
          self.totalGrandTotal = 0;
          self.totalOnline = 0;
          self.collectionSummary.map(c => {
          	if(c.cash) self.totalCash = Number(self.totalCash) + Number(c.cash)
            if(c.cheque) self.totalCheque =Number(self.totalCheque) + Number(c.cheque)
            if(c.total) self.totalGrandTotal =Number(self.totalGrandTotal) + Number(c.total)
            if(c.online) self.totalOnline =Number(self.totalOnline) + Number(c.total)
      })
      self.sessionName = session_name
       self.fromSelectedDate = self.refs.start_date.value
       self.toSelectedDate = self.refs.end_date.value
       self.loading = false
      self.update()
    }
</script>

 
</fees-collection-summary>