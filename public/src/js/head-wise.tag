<head-wise>
<print-header></print-header>	
<loading-bar if={loading}></loading-bar>
<section class=" is-fluid">
	
	<div class="box no-print">
		<div class="columns">
			<div class="column is-narrow">
				<label class="label">From Date</label>
			</div>
			<div class="column is-narrow">
				<input class="date is-small input" id="start_date" ref="start_date" tabindex="0" type="text" readonly="readonly">
			</div>
			<div class="column is-narrow">
				<label class="label">To Date</label>
			</div>
			<div class="column is-narrow">
				<input class="date is-small input" id="end_date" ref="end_date" tabindex="0" type="text" readonly="readonly">
			</div>
			<div class="column">
				<button class="button is-danger has-text-weight-bold"
				onclick={getHeadWise} > GO
				</button>

				<button class="button is-primary has-text-weight-bold is-pulled-right" onclick="window.print()" title="Print">
		               <span class="icon">
		                 <i class="fas fa-print"></i>
		             </span>
		         </button>
				
			</div>
		</div>
	</div>

	<p class="has-text-centered" style="color: #ff3860;font-weight:bold">Head Wise Collection Detail</p>
	<p class="has-text-centered">Session: {sessionName}</p>
	<p class="has-text-centered">{fromSelectedDate} - {toSelectedDate}</p>

		<table class="table is-fullwidth is-striped is-hoverable is-bordered" >
			<tr each={cd, i in headCategoryWiseData}>
				<td>{cd.slNo}</td>
				<td>{cd.head}</td>
				<td class="has-text-right amount">{cd.cash}</td>
			</tr>
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
      feesReportStore.off('read_head_category_wise_changed',ReadHeadCategoryWiseChanged)
    })

    self.getHeadWise = () => {
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
          feesReportStore.trigger('read_head_category_wise_fees', obj)
       }
    }

    feesReportStore.on('read_head_category_wise_changed',ReadHeadCategoryWiseChanged)
    function ReadHeadCategoryWiseChanged(headCategoryWiseData, session_name){
    
      self.headCategoryWiseData = []
      self.headCategoryWiseData = headCategoryWiseData

      self.sessionName = session_name
   	  self.fromSelectedDate = self.refs.start_date.value
      self.toSelectedDate = self.refs.end_date.value
      
      self.loading = false 
       
      self.update()
    }
</script> 
</head-wise>