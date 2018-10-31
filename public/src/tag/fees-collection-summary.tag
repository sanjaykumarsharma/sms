<fees-collection-summary>
<section class=" is-fluid">
	<h2 class="title has-text-centered" style="color: #ff3860;">Bank/Cash Collection Summary</h2>
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
				onclick={getFeesCollectionSummary} > GO
				</button>
				
			</div>
		</div>
	</div>

	<div class="columns is-full">
		<table class="table is-fullwidth is-striped is-hoverable is-bordered" >
			<thead>
				<tr>
					<th>#</th>
				    <th>Bank</th>
				    <th >Cash</th>
				    <th >Cheque</th>
				    <th >Total</th>
				</tr>
			</thead>
			<tbody>
				<tr each={cd, i in collectionSummary}>
					<td>{i + 1}</td>
					<td>{cd.bank}</td>
					<td class="has-text-right amount">{cd.cash}</td>
					<td class="has-text-right amount">{cd.cheque}</td>
					<td class="has-text-right amount">{cd.total}</td>
				</tr>
				<tr>
					<th class="has-text-right" colspan="2">Total</th>
					<th class="has-text-right amount">{totalCash}</th>
					<th class="has-text-right amount">{totalCheque}</th>
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
      feesReportStore.off('read_collection_summary_changed',ReadCollectionSummaryChanged)
    })

    self.getFeesCollectionSummary = () => {
    	var obj={}
          obj['start_date']=self.refs.start_date.value
          obj['end_date']=self.refs.end_date.value
          self.loading = true
          feesReportStore.trigger('read_collection_summary', obj)
          console.log(obj)
    }

    feesReportStore.on('read_collection_summary_changed',ReadCollectionSummaryChanged)
    function ReadCollectionSummaryChanged(collectionSummary){
       console.log(collectionSummary) 
          self.collectionSummary = []
          self.collectionSummary = collectionSummary
          self.collectionSummary.map(c => {
          self.totalCash +=Number(c.cash)
          self.totalCheque +=Number(c.cheque)
          self.totalGrandTotal +=Number(c.total)
      })
      console.log("collectionSummary")
      self.update()
    }
</script>

 
</fees-collection-summary>