<date-wise>
<section class=" is-fluid">
	<h2 class="title has-text-centered" style="color: #ff3860;">Date Wise Fees Received</h2>
	<title>{selected_start_date} - {selected_end_date}</title>
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
				onclick={getDateWiseFees} > GO
				</button>
				
			</div>
		</div>
	</div>

	<div class="columns is-full">
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
      feesReportStore.off('read_date_fees_changed',ReadDateFeesChanged)
    })

    self.getDateWiseFees = () => {
    	var obj={}
          obj['start_date']=self.refs.start_date.value
          obj['end_date']=self.refs.end_date.value
          self.loading = true
          feesReportStore.trigger('read_date_wise_fees', obj)
       self.selected_start_date = self.refs.start_date.value
       self.selected_end_date = self.refs.end_date.value
    }

    feesReportStore.on('read_date_fees_changed',ReadDateFeesChanged)
    function ReadDateFeesChanged(dateWiseData){
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
       
      console.log("dateWiseData")
      self.update()
    }
</script>

</date-wise>