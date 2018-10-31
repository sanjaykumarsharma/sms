<fees-scheme-assigned>
	<section class=" is-fluid" >
		<h2 class="title has-text-centered" style="color: #ff3860;">Fee Scheme Assigned Student</h2>
		<div class="box">
			<div class="columns">
				<div class="column is-narrow">
					<label class="label">Fee Scheme</label>
				</div>
				<div class="column is-narrow">
					<div class="control">
						<div class="select">
							<select ref="fee_plan_id">
								<option>Select Fees Scheme</option>
								<option each={feePlans} value={fee_plan_id}>{fee_plan_name}
	                            </option>
							</select>
						</div>
					</div>
				</div>
				<div class="column">
					<button class="button is-danger has-text-weight-bold"
					onclick={getAssignedStudents} > GO
					</button>
					
				</div> 
			</div>
		</div>
  <div class="columns is-full">
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
  </div>
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
    })
    
    self.readFeePlans = () => {
       feePlanStore.trigger('read_fee_plans')
    }
    self.getAssignedStudents = () =>{
      self.loading = true
      console.log(self.refs.fee_plan_id.value)
      feesReportStore.trigger('read_assigned_students', self.refs.fee_plan_id.value)
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
    function AssignedStudentChanged(assignedStudents){
    	console.log("assignedStudents")
      console.log(assignedStudents) 
       self.assignedStudents = assignedStudents
       self.update()
    }
    

</script>

</fees-scheme-assigned>