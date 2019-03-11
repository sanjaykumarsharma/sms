<outstanding-fees-class>
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
				<button disabled={loading} class="button is-danger has-text-weight-bold"
				onclick={getDueByClass} > GO
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
    
    <p class="has-text-centered" style="color: #ff3860;font-weight:bold">Outstanding Fees Report</p>
	<p class="has-text-centered">Session: {sessionName}</p>
	<p class="has-text-centered">Class:{selectedClass} Month:{selectedMonth}</p>

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
      feesReportStore.off('read_outstanding_classwise_changed',ReadOutStandingClasswiseChanged)
      feesReportStore.off('csv_export_outstanding_byclass_changed',outstandingFeesChanged)
    })

    self.downloadCSV = () => {
      feesReportStore.trigger('csv_outstanding_by_class',self.outstandingFees)
    }

    feesReportStore.on('csv_export_outstanding_byclass_changed',outstandingFeesChanged)
    function outstandingFeesChanged(url){
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
    function ReadOutStandingClasswiseChanged(outstandingFees, session_name){
      	self.grand_total = 0
      	self.outstandingFees = []
      	self.outstandingFees = outstandingFees
        self.loading = false         
        self.sessionName = session_name 
        self.selectedClass = $("#standard_id option:selected").text() + '-' + $("#section_id option:selected").text()
        self.selectedMonth = $("#monthList option:selected").text()
      self.update()
    }
</script>
 
</outstanding-fees-class>