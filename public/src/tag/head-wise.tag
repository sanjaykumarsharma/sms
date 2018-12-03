<head-wise>

<section class=" is-fluid">
	<h2 class="title has-text-centered" style="color: #ff3860;">Head Wise Collection Detail</h2>
	<title class="title has-text-centered">{selected_start_date} - {selected_end_date}</title>
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
				onclick={getHeadWise} > GO
				</button>
				
			</div>
		</div>
	</div>

	<div class="columns is-full">
		<table class="table is-fullwidth is-striped is-hoverable is-bordered" >
			<tr each={cd, i in headCategoryWiseData}>
				<td>{cd.slNo}</td>
				<td>{cd.head}</td>
				<td class="has-text-right amount">{cd.cash}</td>
			</tr>
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
      feesReportStore.off('read_head_category_wise_changed',ReadHeadCategoryWiseChanged)
    })

    self.getHeadWise = () => {
    	var obj={}
          obj['start_date']=self.refs.start_date.value
          obj['end_date']=self.refs.end_date.value
          self.loading = true
          feesReportStore.trigger('read_head_category_wise_fees', obj)
       self.selected_start_date = self.refs.start_date.value
       self.selected_end_date = self.refs.end_date.value
    }

    feesReportStore.on('read_head_category_wise_changed',ReadHeadCategoryWiseChanged)
    function ReadHeadCategoryWiseChanged(headCategoryWiseData){
    
      self.headCategoryWiseData = []
      self.headCategoryWiseData = headCategoryWiseData
       
      self.update()
    }
</script> 
</head-wise>