<estimated-fees>
<header></header>	
<loading-bar if={loading}></loading-bar>
<section class=" is-fluid">
	<div class="box no-print">
		<div class="columns">
			<div class="column is-narrow">
				<label class="label">From Date</label>
			</div>
			<div class="column is-narrow">
				<input class="date input" id ="start_date" ref="start_date" tabindex="0" type="text" readonly="readonly">
			</div>
			<div class="column is-narrow">
				<label class="label">To Date</label>
			</div>
			<div class="column is-narrow">
				<input class="date input" id ="end_date" ref="end_date" tabindex="0" type="text" readonly="readonly">
			</div>
			<div class="column is-narrow">
					<label class="label">Standard</label>
				</div>
				<div class="column is-narrow">
					<div class="control">
						<div class="select">
							<select ref="standard_id" onchange={readStandardSection}>
								<option ></option>
								<option each={standards} value={standard_id}>{standard}</option>
								<option value="-1">All</option>
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
								<option each={filteredSections} value={section_id} >{section}</option>
	                            <option value="-1">All</option>
							</select>
						</div>
					</div>
				</div>
			<div class="column">
				<button disabled={loading} class="button is-danger has-text-weight-bold"
				onclick={getEstematedFees} > GO
				</button>
			</div>
      <div class="level-right" >
              <button class="button is-success has-text-weight-bold  ml5" onclick={downloadCSV}>
                <span class="icon">
                  <i class="far fa-file-excel"></i>
                </span>
              </button>
              <button class="button is-primary has-text-weight-bold ml5" onclick="window.print()" title="Print">
                  <span class="icon">
                     <i class="fas fa-print"></i>
                 </span>
              </button>
        </div>
		</div>
	</div>
	<p class="has-text-centered" style="color: #ff3860;font-weight:bold">Estimated Fees Report</p>
	<p class="has-text-centered">Session: {sessionName}</p>
	<p class="has-text-centered">Date: {fromSelectedDate} - {toSelectedDate} Class:{selectedClass}  </p>

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
</section>

<script>
	var self = this
    self.on("mount", function(){
      flatpickr(".date", {
    	allowInput: true,
    	dateFormat: "d/m/Y",
  		})
      self.readSection()
      self.readStandard()
      self.update();
    })

    self.on("unmount", function(){
      applyPlanStore.off('read_standard_changed',StandardChanged)
      applyPlanStore.off('read_section_changed',SectionChanged)
      feesReportStore.off('read_estimated_fees_changed',ReadEstimatedFeesChanged)
      feesReportStore.off('csv_export_estimated_fees_changed',estimatedFeesChanged)
    })

    self.downloadCSV = () => {
      feesReportStore.trigger('csv_estimated_fees',self.estimatedFees)
    }

    feesReportStore.on('csv_export_estimated_fees_changed',estimatedFeesChanged)
    function estimatedFeesChanged(url){
      var open_url = window.location.origin+url 
      window.open(open_url);
      self.loading = false
      self.update()
     }
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
    	  obj.standard_id = self.refs.standard_id.value
    	  obj.section_id = self.refs.section_id.value
          obj['start_date']=convertDate(self.refs.start_date.value)
          obj['end_date']=convertDate(self.refs.end_date.value)
          self.loading = true
          feesReportStore.trigger('read_estimated_fees', obj)
       }
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
    function ReadEstimatedFeesChanged(estimatedFees, session_name){
      self.grand_total = 0
      self.estimatedFees = []
      console.log("-----estimated-fees----------")
      console.log(estimatedFees)
      self.estimatedFees = estimatedFees
      self.loading = false
       self.estimatedFees.map(c => {
          self.grand_total +=Number(c.total_fees)
      })
          self.sessionName = session_name
          self.selected_start_date = self.refs.start_date.value
          self.selected_end_date = self.refs.end_date.value
          self.selectedClass = 'format class-section'
      self.update()
    }
</script>

 
</estimated-fees>