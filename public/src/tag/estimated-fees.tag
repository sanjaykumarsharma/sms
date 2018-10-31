<estimated-fees>

<section class=" is-fluid">
	<h2 class="title has-text-centered" style="color: #ff3860;">Estimated Fees Report</h2>
	<span class=" has-text-centered">{selected_start_date} to {selected_end_date} Class:{selectedClass}</span>
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
			<div class="column is-narrow">
					<label class="label">Standard</label>
				</div>
				<div class="column is-narrow">
					<div class="control">
						<div class="select">
							<select ref="standard_id" onchange={readStandardSection}>
								<option ></option>
								<option each={standards} value={standard_id}>{standard}
	                            </option>
							</select>
						</div>
					</div>
				</div>
				<div class="column is-narrow">
					<label class="label">Section</label>
				</div>
				<div class="column is-narrow">
					<div class="control">
						<div class="select">
							<select ref="section_id" onchange={getStudentData}>
								<option each={filteredSections} value={section_id} >{section}
	                            </option>
							</select>
						</div>
					</div>
				</div>
			<div class="column">
				<button class="button is-danger has-text-weight-bold"
				onclick={getEstematedFees} > GO
				</button>
				
			</div>
		</div>
	</div>

	<div class="columns is-full">
		<table class="table is-fullwidth is-striped is-hoverable is-bordered" >
			<thead>
				<tr>
					<th class="slNo">#</th>
				    <th>Header</th>
				    <th>Amount</th>
				</tr>
			</thead>
			<tbody>
				<tr each={cd, i in estimatedFees}>
					<td>{i + 1}</td>
					<td>{cd.total}</td>
					<td class="has-text-right">{cd.total_fees}</td>
				</tr>
				<tr>
					<th class="has-text-right" colspan="2">Grand Total</th>
					<th class="has-text-right amount">{grand_total}</th>
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
      self.readSection()
      self.readStandard()
      self.update();
    })

    self.on("unmount", function(){
      applyPlanStore.off('read_standard_changed',StandardChanged)
      applyPlanStore.off('read_section_changed',SectionChanged)
      feesReportStore.off('read_estimated_fees_changed',ReadEstimatedFeesChanged)
    })
   //read standard 
   self.readStandard = () => {
       applyPlanStore.trigger('read_standards')
    }
    self.readSection = () => {
       applyPlanStore.trigger('read_sections')
       
    }

    self.readStandardSection = () => {
       
       console.log('filter')
       self.filteredSections = []
       self.filteredSections = self.sections.filter(s => {
       	return s.standard_id == self.refs.standard_id.value
       })
    }

    self.getEstematedFees = () => {
    	var obj={}
    	  obj.standard_id = self.refs.standard_id.value
    	  obj.section_id = self.refs.section_id.value
          obj['start_date']=self.refs.start_date.value
          obj['end_date']=self.refs.end_date.value
          self.loading = true
          feesReportStore.trigger('read_estimated_fees', obj)
    }
    applyPlanStore.on('read_standard_changed',StandardChanged)
    function StandardChanged(standards){
      console.log(standards) 
      self.standards = standards
      self.update()
      //self.readStandardSection()
      console.log(self.standards)
    }
    applyPlanStore.on('read_section_changed',SectionChanged)
    function SectionChanged(sections){
      console.log(sections) 
      self.sections = sections
      self.section_id = sections[0].section_id

      self.update()
      console.log(self.sections)
    } 

    feesReportStore.on('read_estimated_fees_changed',ReadEstimatedFeesChanged)
    function ReadEstimatedFeesChanged(estimatedFees){
      self.grand_total = 0
      self.estimatedFees = []
      self.estimatedFees = estimatedFees
       self.estimatedFees.map(c => {
          
          self.grand_total +=Number(c.total_fees)
      })
       self.selected_start_date = self.refs.start_date.value
          self.selected_end_date = self.refs.end_date.value
          self.selectedClass = 'format class-section'
      console.log("estimatedFees")
      self.update()
    }
</script>

 
</estimated-fees>