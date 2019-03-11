<fees-scheme-assigned>
<header></header> 
<loading-bar if={loading}></loading-bar>
	<section class=" is-fluid" >
		<div class="box  no-print">
			<div class="columns">
				<div class="column is-narrow">
					<label class="label">Fee Scheme</label>
				</div>
				<div class="column is-narrow">
					<div class="control">
						<div class="select">
							<select ref="fee_plan_id" id="fee_plan_id">
								<option>Select Fees Scheme</option>
								<option each={feePlans} value={fee_plan_id}>{fee_plan_name}
	                            </option>
							</select>
						</div>
          </div>
        </div>
        <div class="column">
          <button disabled={loading} class="button is-danger has-text-weight-bold"
          onclick={getAssignedStudents} > GO
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
  <p class="has-text-centered" style="color: #ff3860;font-weight:bold">Fee Scheme Assigned Student</p>
  <p class="has-text-centered">Session: {sessionName}</p>
  <p class="has-text-centered">Scheme: {selectedScheme}</p>

    <table class="table is-fullwidth is-striped is-hoverable is-bordered" >
      <thead>
        <tr>
            <th class="slno">#</th>
            <th >Enrol No.</th>
            <th >Student's Name</th>
            <th >Class</th>
            <th >Mobile</th>
            <th >SMS</th>
            <th >Phone</th>
        </tr>
        
      </thead>
      <tbody>
        <tr each={cd, i in assignedStudents}>
          <td>{i + 1}</td>
          <td>{cd.enroll_number}</td>
          <td>{cd.name}</td>
          <td>{cd.standard}</td>
          <td>{cd.f_mobile}</td>
          <td>{cd.mobile}</td>
          <td>{cd.f_phone}</td>
        </tr>
      </tbody>
    </table>
</section>  
<script>
	var self = this
    self.on("mount", function(){
      self.role = getCookie('role')
       flatpickr(".date", {
    	/*altInput: true,*/
    	allowInput: true,
    	altFormat: "d/m/Y",
    	dateFormat: "Y-m-d",
  		})
      self.update()
      self.readFeePlans()
    })
    self.on("unmount", function(){
      feePlanStore.off('fee_plan_changed', PlansChanged)
      feesReportStore.off('read_assigned_student_changed',AssignedStudentChanged)
      feesReportStore.off('csv_export_assigned_scheme_changed',assignedSchemeChanged)
    })
    
    self.readFeePlans = () => {
       feePlanStore.trigger('read_fee_plans')
    }
    self.getAssignedStudents = () =>{
      self.loading = true
      console.log(self.refs.fee_plan_id.value)
      feesReportStore.trigger('read_assigned_students', self.refs.fee_plan_id.value)
    }

    self.downloadCSV = () => {
      feesReportStore.trigger('csv_assigned_scheme',self.assignedStudents)
    }

    feesReportStore.on('csv_export_assigned_scheme_changed',assignedSchemeChanged)
    function assignedSchemeChanged(url){
      var open_url = window.location.origin+url 
      window.open(open_url);
      self.loading = false
      self.update()
     }


    feePlanStore.on('fee_plan_changed',PlansChanged)
    function PlansChanged(feePlans){
      
      self.loading = false
       self.feePlans = []
      self.feePlans = feePlans
      self.update()
      /*console.log(self.feePlans)*/
    }
      
    feesReportStore.on('read_assigned_student_changed',AssignedStudentChanged)
    function AssignedStudentChanged(assignedStudents,session_name){
    	console.log("assignedStudents")
      console.log(assignedStudents) 
       self.assignedStudents = assignedStudents
       self.selectedScheme = $("#fee_plan_id option:selected").text()
       self.sessionName = session_name 
      self.loading = false
       self.update()
    }
    

</script>

</fees-scheme-assigned>