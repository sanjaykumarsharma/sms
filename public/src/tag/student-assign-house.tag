<student-assign-house>
<loading-bar if={loading}></loading-bar>  
	<section class=" is-fluid" show={view=='student-assign-houses'}>

    <div class="level">
      <div class="level-left">
        <h2 class="title" style="color: #ff3860;">House</h2>
      </div>
      <div class="level-right">
        <button class="button is-warning is-rounded" onclick={openHouseModal}>
        <span class="icon">
          <span class="fas fa-plus"></span>
        </span>
        </button>

        <button class="button is-warning is-rounded" onclick={readAssignHouse} style="margin-left:2px">
        <span class="icon">
          <span class="fas fa-sync-alt"></span>
        </span>
        </button>
      </div>
    </div>

		<table class="table is-fullwidth is-striped is-hoverable">
			<thead>
				<tr>
					<th class="slno">SL</th>
          <th>House</th>
					<th>Captain</th>
          <th>Vice-Captain</th>
					<th>No of Students</th>
          <th></th>
				</tr>
			</thead>
			<tbody>
				<tr each={c, i in houses}>
					<td>{ i+1 }</td>
          <td>{ c.house_name}</td>
          <td>{ c.captain_name}</td>
          <td>{ c.vice_captain_name}</td>
					<td>{ c.number_of_students}</td>
        	<td class="has-text-right">
      			<div class="inline-flex rounded border border-grey overflow-hidden" hide={c.confirmDelete}>
        				<span><a class="button is-small is-rounded" onclick={edit.bind(this, c)}>Edit</a></span>
                <span><a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick={confirmDelete}>Delete</a></span>
        				<span><a class="button is-small is-rounded" onclick={assignStudentsFrom.bind(this, c)}>Students</a></span>
                <span><a class="button is-small is-rounded" onclick={openCaptainFrom.bind(this, c)}>Captain</a></span>
                <span><a class="button is-small is-rounded" onclick={details.bind(this, c)}>Details</a></span>
      			</div>
      			<div class="table-buttons" if={c.confirmDelete}>
        				<span disabled={loading} class="button is-small is-rounded" onclick={delete}><i class="fa fa-check" ></i></span>
        				<span disabled={loading} class="button is-small  has-text-danger is-rounded" onclick={cancelOperation}><i class="fa fa-times"></i></span>
      			</div>
    			</td>
				</tr>
			</tbody>
		</table>
	</section>

  <!-- Open House Modal Start -->
  <div id="houseModal" class="modal ">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{title} House</p>
      </header>
      <section class="modal-card-body">
        
        <div class="columns">
          <div class="column">
            <div class="field">
              <label class="label" for="role">House</label>
              <div class="control">
                <input class="input" type="text" ref="houseInput" >
              </div>
            </div>
          </div>
        </div>

      </section>
      <footer class="modal-card-foot">
        <button class="button is-danger" onclick={add} >{title}</button>
        <button class="button" id="item-modal-close" onclick={closeHouseModal}>Cancel</button>
      </footer>
    </div>
  </div>
  <!-- House Modal End -->


  <!-- ***************************************************Students Start************************************************ -->


  <section class=" is-fluid" show={view=='students'}>

    <div class="level">
      <div class="level-left">
        <h2 class="title" style="color: #ff3860;">Students Under : {house}</h2>
      </div>
      <div class="level-right">
        <button class="button is-warning is-rounded" onclick={backToAssignHouse}>
        <span class="icon">
          <span class="fas fa-arrow-left"></span>
        </span>
        </button>
        <button class="button is-warning is-rounded ml5" onclick={refreshStudents}>
        <span class="icon">
          <span class="fas fa-sync-alt"></span>
        </span>
        </button>
      </div>
    </div>

    <div class="box">
      <div class="columns">

        <div class="column is-narrow"><label class="label">Standard</label></div>  
        <div class="column">  
          <div class="control">
            <div class="select is-fullwidth">
              <select ref="standardSelect" onchange={changeSection}>
                <option value="">Select Standard</option>
                <option each={classes} value={standard_id}>{standard}</option>
              </select>
            </div>
          </div>
        </div>

        <div class="column is-narrow"><label class="label">Section</label></div>  
        <div class="column">  
          <div class="control">
            <div class="select is-fullwidth">
              <select ref="sectionSelect">
                <option value="">Select Section</option>
                <option each={tempSections} value={section_id}>{section}</option>
              </select>
            </div>
          </div>
        </div>

        <div class="column">
          <button class="button is-danger has-text-weight-bold" onclick={refreshStudents} >GO </button>
        </div>
          
      </div>
    </div> 

     <div class="columns is-multiline is-mobile">

        <div class="column">
          <table class="table is-fullwidth is-striped is-hoverable">
            <thead>
              <tr>
                <th class="slno">Roll</th>
                <th>Enroll No</th>
                <th>Free Students</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr each={c, i in freeStudents}>
                <td>{c.roll_number}</td>
                <td>{c.enroll_number}</td>
                <td>{c.first_name} {c.middle_name} {c.last_name}</td>
                <td class="has-text-right">
                  <input type="checkbox" checked={selected} id="{'freeSubjectCheckBox'+c.house_id}" onclick={selectFreeSubject.bind(this,c)} > 
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="column is-vertical-center is-narrow has-text-centered is-multiline">
          <table>
            <tr>
              <td>
                <button class="button" onclick={assignStudents} style="margin-top:20px;">Assign students  
                  <span style="margin-left:10px" class="fas fa-angle-double-right"></span>
                </button>
              </td>
            </tr>
            <tr>
              <td>
                <button class="button" onclick={freeUpStandard} style="margin-top:20px;"><span style="margin-right:10px;" class="fas fa-angle-double-left"></span> Free up students</button>
              </td>
            </tr>
          </table>
        </div>

        <div class="column">
          <table class="table is-fullwidth is-striped is-hoverable">
            <thead>
              <tr>
                <th></th>
                <th class="slno">Roll No</th>
                <th>Enroll No</th>
                <th>Assigned Students</th>
              </tr>
            </thead>
            <tbody>
              <tr each={c, i in assignedStudents}>
                <td class="has-text-right">
                  <input type="checkbox" checked={selected} id="{'assignedSubjectCheckBox'+c.house_id}" onclick={selectAssigndSubject.bind(this,c)} > 
                </td>
                <td>{c.roll_number}</td>
                <td>{c.enroll_number}</td>
                <td>{c.first_name} {c.middle_name} {c.last_name}</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
     
  </section>

  <!-- Open House Modal Start -->
  <div id="captainModal" class="modal ">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Captain & Vice-Captain of {house_for_captain}</p>
      </header>
      <section class="modal-card-body">
        
        <div class="columns">
          <div class="column">

            <div class="field">
              <label class="label" for="role">Captain</label>
              <div class="control">
                <div class="select is-fullwidth">
                  <select ref="captainSelect">
                    <option value="">Select Captain</option>
                    <option each={studentsCaptains} value={student_id}>{first_name}{middle_name}{last_name}</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="field">
              <label class="label" for="role">Vice-Captain</label>
              <div class="control">
                <div class="select is-fullwidth">
                  <select ref="viceCaptainSelect">
                    <option value="">Select Vice-Captain</option>
                    <option each={studentsCaptains} value={student_id}>{first_name}{middle_name}{last_name}</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>
      <footer class="modal-card-foot">
        <button class="button is-danger" onclick={updateCaptain} >Submit</button>
        <button class="button" id="item-modal-close" onclick={closeCaptainForm}>Cancel</button>
      </footer>
    </div>
  </div>
  <!-- House Modal End -->

  <section class="is-fluid" show={view=='details'}>
    <div class="level no-print">
      <div class="level-left">
        <h2 class="title" style="color: #ff3860;">House: {house_for_captain}</h2>
      </div>
      <div class="level-right">

        <button class="button is-warning is-rounded" onclick={backToAssignHouse}>
          <span class="icon">
            <span class="fas fa-arrow-left"></span>
          </span>
        </button>

      </div>
    </div>

    <center>
     <h6 class="title">House: {house_for_captain}</h6>
    </center>

    <table class="table is-fullwidth is-striped is-hoverable">
      <thead>
        <tr>
          <th class="slno">SL</th>
          <th>Enroll No</th>
          <th>Class</th>
          <th>Student's Name</th>
          <th>Father's Name</th>
          <th>SMS</th>
        </tr>
      </thead>
      <tbody>
        <tr each={c, i in studentsDetails}>
          <td>{i+1}</td>
          <td>{c.enroll_number}</td>
          <td>{c.standard}</td>
          <td>{c.name}</td>
          <td>{c.f_name}</td>
          <td>{c.mobile}</td>
        </tr>
      </tbody>
    </table>


  </section>

	<script>
	var self = this
    self.on("mount", function(){
      self.title = 'Add'
      self.title_exams = 'Add'
      self.view = 'student-assign-houses'
      self.loading = false;
      self.update()
      flatpickr(".date", {
        allowInput: true,
        dateFormat: "d/m/Y",
      })
      self.readAssignHouse()
      self.readClass()
      self.readSection()
    })
    self.on("unmount", function(){
      studentAssignHouseStore.off('house_changed', AssignHouseChanged)
      studentAssignHouseStore.off('add_house_changed',AddAssignHouseChanged)
      studentAssignHouseStore.off('delete_house_changed',DeleteAssignHouseChanged)

      studentAssignHouseStore.off('read_classes_changed',ClassesChanged)
      studentAssignHouseStore.off('read_section_changed',SectionChanged)

      studentAssignHouseStore.off('read_students_changed',ReadStudentsChanged)
      studentAssignHouseStore.off('assign_students_changed',AssignStandardChanged)

      studentAssignHouseStore.off('read_student_by_house_changed',ReadStudentsByHouseChanged)
      studentAssignHouseStore.off('update_house_captain_changed',UpdateHouseCaptainChanged)
      studentAssignHouseStore.off('read_student_by_house_details_changed',ReadStudentsByHouseDetailsChanged)
    })

    self.readClass = () => {
       self.loading = true;
       studentAssignHouseStore.trigger('read_classes')
    }

    self.readSection = () => {
       self.loading = true;
       studentAssignHouseStore.trigger('read_section')
    }

    self.changeSection = () => {
       if(self.refs.standardSelect.value==''){
        toastr.info("Please select standard and try again")
       }else{
        self.tempSections = []
        self.tempSections = self.sections.filter(s=>{
          return s.standard_id==self.refs.standardSelect.value
        })
       }
    }

    //read courses
    self.readAssignHouse = () => {
       self.loading = true;
       studentAssignHouseStore.trigger('read_houses')
    }

    self.openHouseModal = () => {
      self.title = 'Add'
      $("#houseModal").addClass("is-active");
    }

    self.closeHouseModal = () => {
      $("#houseModal").removeClass("is-active");
    }

    self.add = () => {
      if(!self.refs.houseInput.value){
        toastr.info("Please enter House and try again")
      }else{
        self.loading = true
        if(self.title=='Add'){
          studentAssignHouseStore.trigger('add_house', self.refs.houseInput.value)
        }else if(self.title=='Update'){
          studentAssignHouseStore.trigger('update_house', self.refs.houseInput.value,self.edit_id)
        }
      }
    }

    self.edit = (c,e) => {
      console.log(c)
      self.title='Update'
      $("#houseModal").addClass("is-active");
      self.refs.houseInput.value = c.house_name
      self.edit_id = c.house_id
    }

    self.cancelOperation = (e) => {
      self.houses.map(c => {
          c.confirmDelete = false
          c.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.houses.map(c => {
        if(c.house_id != e.item.c.house_id){
          c.confirmDelete = false
        }else{
          c.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      studentAssignHouseStore.trigger('delete_house', e.item.c.house_id)
    }


    // ****************************************** students *************************************
    
    self.assignStudentsFrom = (c) => {
      self.house = c.house_name
      self.house_id = c.house_id
      self.view='students'
    }

    self.refreshStudents = () =>{

      let error = '';
      
      if(self.refs.standardSelect.value==''){
        error = error + "Please select standard, "
      }

      if(self.refs.sectionSelect.value==''){
        error = error + "Please select section, "
      }

      if(error.length!=0){
        toastr.error(error)
        return
      }else{
        self.loading = true
        studentAssignHouseStore.trigger('read_students', self.house_id, self.refs.standardSelect.value, self.refs.sectionSelect.value) 
      }
      
    }

    self.selectFreeSubject = (student,e) => {
        self.freeStudents.map(i=>{
          if(student.student_id==i.student_id){
            i.selected=!i.selected
          }
        })
    }

    self.selectAssigndSubject = (student,e) => {
        self.assignedStudents.map(i=>{
          if(student.student_id==i.student_id){
            i.selected=!i.selected
          }
        })
        console.log(self.assignedStudents)
    }

    self.assignStudents = () =>{
      let students_to_assign = self.freeStudents.filter(c=>{
        return c.selected == true
      })
      console.log(self.house_id)
      console.log(students_to_assign)

      if(students_to_assign.length==0){
        toastr.error('Please Select Student To Assign House.')
        return
      }else{
        self.loading = true
        studentAssignHouseStore.trigger('assign_students', self.house_id, students_to_assign)
      }
    }

    self.freeUpStandard = () =>{
      let students_to_free = self.assignedStudents.filter(c=>{
        return c.selected == true
      })
      
      if(students_to_free.length==0){
        toastr.error('Please select students to free from house .')
        return
      }else{
        self.loading = true
        studentAssignHouseStore.trigger('free_up_student', self.house_id, students_to_free)
      }
    }

    self.backToAssignHouse = () =>{
      self.view='student-assign-houses'
    }

    //**************************************Captain & Vice-captain

    self.details = (c,e) => {
      self.house_for_captain = c.house_name
      self.view = 'details'
      studentAssignHouseStore.trigger('read_student_by_house_details', c.house_id)
    }

    self.openCaptainFrom = (c,e) => {
      self.house_for_captain = c.house_name
      self.house_id_captain = c.house_id
      self.captain_id = c.captain_id
      self.vice_captain_id = c.vice_captain_id
      studentAssignHouseStore.trigger('read_student_by_house', c.house_id)
    }

    self.closeCaptainForm = () => {
      $("#captainModal").removeClass("is-active");
    }

    self.updateCaptain = () => {

      let error = '';
      
      if(self.refs.captainSelect.value==''){
        error = error + "Please select Captain, "
      }

      if(self.refs.viceCaptainSelect.value==''){
        error = error + "Please select vice captain, "
      }

      if(self.refs.viceCaptainSelect.value==self.refs.captainSelect.value){
        error = error + "captain and vice captain can't be same, "
      }

      if(error.length!=0){
        toastr.error(error)
        return
      }else{
        self.loading = true
        studentAssignHouseStore.trigger('update_house_captain', self.house_id_captain, self.refs.captainSelect.value, self.refs.viceCaptainSelect.value)
      }

    }

    // ****************************************** all change metods *************************************

    studentAssignHouseStore.on('house_changed',AssignHouseChanged)
    function AssignHouseChanged(houses){
      console.log(houses) 
      self.loading = false
      self.houses = []
      self.houses = houses
      self.update()
      console.log(self.houses)
    }

    studentAssignHouseStore.on('add_house_changed',AddAssignHouseChanged)
    function AddAssignHouseChanged(houses){
      self.refs.houseInput.value=''
      self.closeHouseModal()
      self.loading = false
      self.houses = []
      self.houses = houses
      self.update()
      console.log(self.houses)
    }

    studentAssignHouseStore.on('delete_house_changed',DeleteAssignHouseChanged)
    function DeleteAssignHouseChanged(houses){
      self.loading = false
      self.houses = []
      self.houses = houses
      self.update()
      console.log(self.houses)
    }

   /************************************************ Students Changed Method ************************************************/
   studentAssignHouseStore.on('read_classes_changed',ClassesChanged)
    function ClassesChanged(classes){
      self.loading = false
      self.classes = []
      self.classes = classes
      self.update()
      console.log(self.classes)
    }

    studentAssignHouseStore.on('read_section_changed',SectionChanged)
    function SectionChanged(sections){
      self.loading = false
      self.sections = []
      self.sections = sections
      self.update()
    }

    studentAssignHouseStore.on('read_students_changed',ReadStudentsChanged)
    function ReadStudentsChanged(freeStudents,assignedStudents){
      self.loading = false
      self.freeStudents = []
      self.freeStudents = freeStudents
      self.freeStudents.map(c => {
          c.selected=false
      })
      console.log(freeStudents)
      self.assignedStudents = []
      self.assignedStudents = assignedStudents
      self.assignedStudents.map(c => {
          c.selected=false
      })
      self.view='students'
      self.update()
    }

    studentAssignHouseStore.on('assign_students_changed',AssignStandardChanged)
    function AssignStandardChanged(students_assigned){
      self.loading = false

      self.refreshStudents()
      
    }

    studentAssignHouseStore.on('read_student_by_house_changed',ReadStudentsByHouseChanged)
    function ReadStudentsByHouseChanged(students){
      self.loading = false
      self.studentsCaptains = []
      self.studentsCaptains = students
      $("#captainModal").addClass("is-active");
      self.update()
      self.refs.captainSelect.value=self.captain_id
      self.refs.viceCaptainSelect.value=self.vice_captain_id
    }

    studentAssignHouseStore.on('update_house_captain_changed',UpdateHouseCaptainChanged)
    function UpdateHouseCaptainChanged(students){
       $("#captainModal").removeClass("is-active");
       self.readAssignHouse()
    }

    studentAssignHouseStore.on('read_student_by_house_details_changed',ReadStudentsByHouseDetailsChanged)
    function ReadStudentsByHouseDetailsChanged(students){
      self.loading = false
      self.studentsDetails = []
      self.studentsDetails = students
      self.update()
    }


</script>
</student-assign-house>