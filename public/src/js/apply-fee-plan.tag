<apply-fee-plan>
<print-header></print-header>
	  <loading-bar if={loading}></loading-bar>
	<section class=" is-fluid" show={student_vew =='show_data'}>
		<div class="box no-print">
			<div class="columns">
				<div class="column is-narrow">
					<label class="label">Standard</label>
				</div>
				<div class="column is-narrow">
					<div class="control">
						<div class="select">
							<select ref="standard_id" onchange={readStandardSection}>
								<option></option>
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
					<button disabled={loading} class="button is-danger has-text-weight-bold"
					onclick={getStudentData} >GO
					</button>
          <button class="button is-primary has-text-weight-bold is-pulled-right" onclick="window.print()" title="Print">
                <span class="icon">
                   <i class="fas fa-print"></i>
               </span>
             </button>
				</div> 
			</div>
		</div>
	</section>
	<!-- ====== Student Details -->

		<div class="level">
		  <div class="level-left">
		    <div class="level-item">
		    	<h2 class="title" style="color: #ff3860;">Apply Fee Plan</h2>
		    </div>
		  </div>
		</div>
		
	<div class="columns">
		<div class="column is-full">
				<div class="columns is-multiline">   
				    <div class="column is-full">
				    <div class="column is-full">
						 <table class="table is-fullwidth is-striped is-hoverable">
							<thead>
								<tr>
									<th class="has-text-right">
								       <input type="checkbox" id="checkStudent" onclick={selectAll}>
								     </th>
									<th>#</th>
									<th>Enrol No.</th>
									<th>Student's Name</th>
									<th>Plan</th>
								</tr>
							</thead>
							<tbody>
								<tr each={r, i in students}>
									<td class="has-text-right">
										<input type="checkbox" class="check_box" checked={r.done} id="{ 'studentId' + r.student_id }" onclick={selectStudents.bind(this,r)} > 
									</td>
									<td>{ i+1 }</td>
									<td>{r.enroll_number}</td>
									<td>{r.student_name}</td>
									<td>{r.fee_plan_name}</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="columns no-print">
						<div class="column is-narrow">
							<label class="label" >Select Fee Plan</label>
						</div>
						<div class="column is-narrow">
						<div class="control">
				        	<div class="select is-fullwidth">
								<select ref="fee_plan_id">
									<option each={plans} value={fee_plan_id}>{fee_plan_name}</option>
								</select>
							</div>
				      	</div>
				      </div>
			   </div>
					<div class="column is-full no-print">
						<button class="button is-danger" onclick={add}>Apply Plan</button>
						<button class="button is-info" id="showModal"  onclick={removeModal}>Remove Plan</button>
					</div>
				</div>
			</div>
	</div>
</section>

<!-- Open Modal Start -->
	<div class="modal" id="deleteModel">
	  <div class="modal-background"></div>
	  <div class="modal-card">
	    <header class="modal-card-head">
	      <p class="modal-card-title">Delete Confirmation</p>
	    </header>
	    <section class="modal-card-body">
	      <h4>Are you Sure?</h4>
	    </section>
	    <footer class="modal-card-foot">
	      <button class="button is-danger"  onclick={remove}>Delete</button>	
	      <button class="button " id="modal-close">Cancel</button>
	    </footer>
	  </div>
	</div>
<!-- Open Modal End -->
<script>
	var self = this
    self.on("mount", function(){
      self.role = getCookie('role')
      self.student_vew = 'show_data'
      self.loading = false
      self.update()
      self.readSection()
      self.readStandard()
    })
    self.on("unmount", function(){
      applyPlanStore.off('read_apply_changed',ApplyPlanChanged)
      applyPlanStore.off('read_standard_changed',StandardChanged)
      applyPlanStore.off('read_section_changed',SectionChanged)
      applyPlanStore.off('read_plan_changed',ReadPlanChanged)
    })
    /*========== Modal ========*/
     self.removeModal = () =>{
    	$("#showModal").click(function() {
  			$("#deleteModel").addClass("is-active");  
		});

		$("#modal-close").click(function() {
		   $("#deleteModel").removeClass("is-active");
		   self.itemList()
		});
		activityStore.trigger('read_items')

    }
	    //Add Fee Plan
    self.add = () => {
       var tempStudents = [];
       var tempStudents = self.students.filter(c => {
          return c.done == true
        })

       var acceptedStudents = []
       tempStudents.map(s=>{
       	 if(s.fee_plan_id == null) acceptedStudents.push(s.student_id)
       })
       console.log("accepted students")
       console.log(acceptedStudents)
      if(!self.refs.fee_plan_id.value){
        toastr.info("Please select fee plan and try again")
      }else if(acceptedStudents.length==0){
          toastr.info("All the selected students have already been assigned to a plan. Please choose student/s who have not been assigned and try again.") 
      }else{
      	console.log("here")
        var obj = {}
        obj['fee_plan_id'] = self.refs.fee_plan_id.value	
        obj['students'] = acceptedStudents
        self.loading = true
          console.log(obj)
          applyPlanStore.trigger('apply_fee_plan', obj)
      }
    }

    self.remove = ()=> {
       var tempStudents = [];
       var tempStudents = self.students.filter(c => {
          return c.done == true
        })

       var removeStudent = []
       tempStudents.map(s=>{
       	 if(s.fee_plan_id != null) removeStudent.push(s)
       })
       console.log("removed students")
       console.log(removeStudent)

      if(removeStudent.length==0){
          toastr.info("Please assign a plan first then try to remove.") 
      }else{
        var obj = {}	
        obj['students'] = removeStudent
        self.loading = true
          console.log(obj)
          applyPlanStore.trigger('remove_fee_plan', obj)
      }
    }

   self.selectStudents = (item,event) => {
    	item.done=!event.item.r.done
    }


    self.selectAll = () => {
    	if($('#checkStudent').is(":checked")){
    		self.students.map(i=>{
	          i.done = true;
	          $('studentId'+i.student_id).prop('checked', true);
	          
	        })
    	}else{
    		self.students.map(i=>{
	          i.done = false;
	          $('studentId'+i.student_id).prop('checked', false);
	          
	        })
    	}
      console.log(self.students)
    }

    //read courses
    self.readStandard = () => {
       applyPlanStore.trigger('read_standards')
    }
    self.readSection = () => {
       applyPlanStore.trigger('read_sections')
       
    }

    self.readStandardSection = () => {
       /*applyPlanStore.trigger('read_sections')*/
       console.log('filter')
       self.filteredSections = []
       self.filteredSections = self.sections.filter(s => {
       	return s.standard_id == self.refs.standard_id.value
       })

       //console.log(self.filteredSections)
       //self.update()
       self.readFeePlanByStandard()
    }
    
    self.readFeePlanByStandard =() =>{
    	console.log(self.refs.standard_id.value)
       applyPlanStore.trigger('read_plan_standard', self.refs.standard_id.value)
    }

    self.getStudentData =() =>{
    	self.loading = true
       applyPlanStore.trigger('read_students', self.refs.section_id.value)
    }


    applyPlanStore.on('read_apply_changed',ApplyPlanChanged)
    function ApplyPlanChanged(students){
      console.log(students) 
      self.students = students
      self.loading = false
      self.update()
      console.log(self.students)
    }
    applyPlanStore.on('read_plan_changed',ReadPlanChanged)
    function ReadPlanChanged(plans){
      console.log(plans) 
      self.plans = plans
      self.loading = false
      self.update()
      console.log(self.plans)
    }
    

    applyPlanStore.on('read_standard_changed',StandardChanged)
    function StandardChanged(standards){
      console.log(standards) 
      self.standards = standards
      self.loading = false

      self.update()
      //self.readStandardSection()
      console.log(self.standards)
    }
    applyPlanStore.on('read_section_changed',SectionChanged)
    function SectionChanged(sections){
      console.log(sections) 
      self.sections = sections
      /*self.sections.map(i=>{
        i.selected = false;
      })*/
      self.section_id = sections[0].section_id
      self.loading = false
      self.update()
      console.log(self.sections)
    }

</script>

</apply-fee-plan>