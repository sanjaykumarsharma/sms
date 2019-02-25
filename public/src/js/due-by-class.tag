<due-by-class>
<print-header></print-header>	
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
							<select ref="standard_id" id="standard_id" onchange={getStudentData}>
								<option ></option>
								<option each={standards} value={standard_id}>{standard}
	                            </option>
							</select>
						</div>
					</div>
				</div>
			<div class="column">
				<button disabled={loading} class="button is-danger has-text-weight-bold"
				onclick={getDueByClassMonth} > GO
				</button>
				<button class="button is-primary has-text-weight-bold is-pulled-right" onclick="window.print()" title="Print">
		               <span class="icon">
		                 <i class="fas fa-print"></i>
		             </span>
		         </button>
			</div>
		</div>
	</div>
	<p class="has-text-centered" style="color: #ff3860;font-weight:bold">Class Wise Due Detail</p>
	<p class="has-text-centered">Session: {sessionName}</p>
	<p class="has-text-centered">Class:{selectedClass}</p>

	<table class="table is-fullwidth is-striped is-hoverable is-bordered" >
		
		<tbody>
			<tr each={cd, i in classWiseDueFees}>
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
      feesReportStore.off('read_due_classwise_changed',ReadDueClasswiseChanged)
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
    
    self.getDueByClassMonth = () => {
    	var obj={}
    	  obj.standard_id = self.refs.standard_id.value
    	  
          self.loading = true
          feesReportStore.trigger('read_due_classwise', obj)
    }

    feesReportStore.on('read_due_classwise_changed',ReadDueClasswiseChanged)
    function ReadDueClasswiseChanged(classWiseDueFees, session_name){
      self.grand_total = 0
      self.classWiseDueFees = []
      self.classWiseDueFees = classWiseDueFees
      
       self.selectedClass = $("#standard_id option:selected").text() 
       self.sessionName = session_name
       self.loading = false
      self.update()
    }
</script>
 
</due-by-class>