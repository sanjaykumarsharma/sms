<outstanding-fees-class>
<section class="is-fluid">
	<h2 class="title has-text-centered" style="color: #ff3860;">Outstanding Fees Report</h2>
	<span class=" has-text-centered">Class:{selectedClass} Month:{selectedMonth}</span>
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
							<select ref="standard_id" id="standard_id" onchange={readStandardSection}>
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
							<select ref="section_id" id="section_id" onchange={getStudentData}>
								<option each={filteredSections} value={section_id} >{section}
	                            </option>
							</select>
						</div>
					</div>
				</div>
			<div class="column is-narrow">
				<label class="label">Month</label>
			</div>
			<div class="column is-narrow">
				<div class="control">
					<div class="select">
						<select ref="monthList" id="monthList">
							<option value="1">January</option>
							<option value="2">February</option>
							<option value="3">March</option>
							<option value="4">April</option>
							<option value="5">May</option>
							<option value="6">June</option>
							<option value="7">July</option>
							<option value="8">August</option>
							<option value="9">September</option>
							<option value="10">October</option>
							<option value="11">November</option>
							<option value="12">December</option>
						</select>
					</div>
				</div>
			</div>
			<div class="column">
				<button class="button is-danger has-text-weight-bold"
				onclick={getDueByClass} > GO
				</button>
			</div>
		</div>
	</div>
	<div class="columns is-full">
		<table class="table is-fullwidth is-striped is-hoverable is-bordered" >
			<thead>
				<tr>
					<th class="slNo">#</th>
				    <th>Enrol No</th>
				    <th>Student's Name</th>
				    <th>Class</th>
				    <th>Father's Name</th>
				    <th>Mobile</th>
				    <th>SMS No</th>
				    <th>Fees</th>
				</tr>
			</thead>
			<tbody>
				<tr each={cd, i in outstandingFees}>
					<td>{i + 1}</td>
					<td>{cd.enroll_number}</td>
					<td>{cd.student_name}</td>
					<td>{cd.standard}</td>
					<td>{cd.f_name}</td>
					<td>{cd.f_mobile}</td>
					<td>{cd.sms}</td>
					<td class="has-text-right">{cd.fees}</td>
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
      feesReportStore.off('read_outstanding_classwise_changed',ReadOutStandingClasswiseChanged)
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

    applyPlanStore.on('read_standard_changed',StandardChanged)
    function StandardChanged(standards){
      console.log(standards) 
      self.standards = standards
      self.update()
      //self.readStandardSection()
    }
    applyPlanStore.on('read_section_changed',SectionChanged)
    function SectionChanged(sections){
      console.log(sections) 
      self.sections = sections
      self.section_id = sections[0].section_id

      self.update()
    } 
    self.getDueByClass = () => {
    	var obj={}
    	  obj.standard_id = self.refs.standard_id.value
    	  obj.section_id = self.refs.section_id.value
          obj.month_id = self.refs.monthList.value
          self.loading = true
          feesReportStore.trigger('read_outstanding_classwise', obj)
    }

    feesReportStore.on('read_outstanding_classwise_changed',ReadOutStandingClasswiseChanged)
    function ReadOutStandingClasswiseChanged(outstandingFees){
      self.grand_total = 0
      self.outstandingFees = []
      self.outstandingFees = outstandingFees
      console.log("=====outstanding fees =====")
      console.log(outstandingFees)
               

          self.selectedClass = $("#standard_id option:selected").text() + '-' + $("#section_id option:selected").text()

          self.selectedMonth = $("#monthList option:selected").text()
          
          //self.selectedMonth = self.refs.monthList.value 
      console.log("month ="+self.selectedMonth)
      self.update()
    }
</script>
 
</outstanding-fees-class>