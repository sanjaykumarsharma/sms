<advance-by-class>
<header></header>	
<loading-bar if={loading}></loading-bar>
<section class="is-fluid">
	
	<div class="box no-print">
		<div class="columns">
			<div class="column is-narrow">
				<label class="label">Standard</label>
			</div>
			<div class="column is-narrow">
				<div class="control">
					<div class="select">
						<select ref="standard_id" id="standard_id" onchange={getAdvanceData}>
							<option each={standards} value={standard_id}>{standard}</option>
                            <option value="-1">All</option>
						</select>
					</div>
				</div>
			</div>
			<div class="column">
				<button disabled={loading} class="button is-danger has-text-weight-bold"
				onclick={getAdvanceData} > GO
				</button>
				<button class="button is-primary has-text-weight-bold is-pulled-right" onclick="window.print()" title="Print">
		              <span class="icon">
		                 <i class="fas fa-print"></i>
		             </span>
		         </button>
			</div>
		</div>
	</div>
	<p class="has-text-centered" style="color: #ff3860;font-weight:bold">Class Wise Advance Fees Detail</p>
	<p class="has-text-centered">Session: {sessionName}</p>
	<p class="has-text-centered">Class:{selectedClass}</p>
		<table class="table is-fullwidth is-striped is-hoverable is-bordered" >
			<tbody>
				<tr each={cd, i in classWiseAdvanceFees}>
					<td>{cd.SlNo}</td>
					<td>{cd.Class}</td>
					<td class="has-text-right">{cd.Apr}</td>
					<td class="has-text-right">{cd.May}</td>
					<td class="has-text-right">{cd.Jun}</td>
					<td class="has-text-right">{cd.Jul}</td>
					<td class="has-text-right">{cd.Aug}</td>
					<td class="has-text-right">{cd.Sep}</td>
					<td class="has-text-right">{cd.Oct}</td>
					<td class="has-text-right">{cd.Nov}</td>
					<td class="has-text-right">{cd.Dec}</td>
					<td class="has-text-right">{cd.Jan}</td>
					<td class="has-text-right">{cd.FebMar}</td>
					<td class="has-text-right">{cd.Total}</td>
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
      self.readStandard()
      self.update();
    })

    self.on("unmount", function(){
      applyPlanStore.off('read_standard_changed',StandardChanged)
      feesReportStore.off('read_advance_classwise_changed',ReadAdvanceClasswiseChanged)
    })
   //read standard 
   self.readStandard = () => {
       applyPlanStore.trigger('read_standards')
    }
   

    

    applyPlanStore.on('read_standard_changed',StandardChanged)
    function StandardChanged(standards){
      console.log(standards) 
      self.standards = standards
      self.update()
      //self.readStandardSection()
    }
    
    self.getAdvanceData = () => {
    	console.log("standard = "+self.refs.standard_id.value)
    	if(self.refs.standard_id.value){
    	var obj={}
    	  obj.standard_id = self.refs.standard_id.value
          self.loading = true
          feesReportStore.trigger('read_advance_classwise', obj)
      }else{
      	toastr.info("Please select a class")
      }
    }

    feesReportStore.on('read_advance_classwise_changed',ReadAdvanceClasswiseChanged)
    function ReadAdvanceClasswiseChanged(classWiseAdvanceFees, session_name){
      self.grand_total = 0
      self.classWiseAdvanceFees = []
      self.classWiseAdvanceFees = classWiseAdvanceFees
      self.sessionName = session_name

          self.selectedClass = $("#standard_id option:selected").text() 
          self.loading = false
          //self.selectedMonth = self.refs.monthList.value 
      self.update()
    }
</script>
 
 
</advance-by-class>