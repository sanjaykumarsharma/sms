<advance-by-class>
<section class="is-fluid">
	<h2 class="title has-text-centered" style="color: #ff3860;">Class Wise Advance Fees Detail</h2>
	<span class=" has-text-centered">Class:{selectedClass} </span>
	<div class="flex items-center mt-2 mb-6 no-print">
		<div class="bg-green py-1 rounded w-10">
			<div class="bg-grey h-px flex-auto"></div>
		</div>
	</div>
	<div class="box">
		<div class="columns">
			<div class="column is-narrow">
					<label class="label">Standard</label>
				</div>
				<div class="column is-narrow">
					<div class="control">
						<div class="select">
							<select ref="standard_id" id="standard_id" onchange={getAdvanceData}>
								<option ></option>
								<option each={standards} value={standard_id}>{standard}
	                            </option>
							</select>
						</div>
					</div>
				</div>
			
			<div class="column">
				<button class="button is-danger has-text-weight-bold"
				onclick={getAdvanceData} > GO
				</button>
			</div>
		</div>
	</div>
	<div class="columns is-full">
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
    	var obj={}
    	  obj.standard_id = self.refs.standard_id.value
    	  
          self.loading = true
          feesReportStore.trigger('read_advance_classwise', obj)
    }

    feesReportStore.on('read_advance_classwise_changed',ReadAdvanceClasswiseChanged)
    function ReadAdvanceClasswiseChanged(classWiseAdvanceFees){
      self.grand_total = 0
      self.classWiseAdvanceFees = []
      self.classWiseAdvanceFees = classWiseAdvanceFees
      console.log("=====advance fees detail fees =====")
      console.log(classWiseAdvanceFees)
               

          self.selectedClass = $("#standard_id option:selected").text() 

          //self.selectedMonth = self.refs.monthList.value 
      self.update()
    }
</script>
 
 
</advance-by-class>