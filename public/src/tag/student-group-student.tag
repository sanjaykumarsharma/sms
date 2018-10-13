<student-group-student>
<loading-bar if={loading}></loading-bar>  
	<section class=" is-fluid" show={view=='student-group-students'}>

    <div class="level">
      <div class="level-left">
        <h2 class="title" style="color: #ff3860;">Group Student</h2>
      </div>
      <div class="level-right">
        <button class="button is-warning is-rounded" onclick={openStudentGroupModal}>
        <span class="icon">
          <span class="fas fa-plus"></span>
        </span>
        </button>

        <button class="button is-warning is-rounded" onclick={readStudentGroup} style="margin-left:2px">
        <span class="icon">
          <span class="fas fa-sync-alt"></span>
        </span>
        </button>

        <button class="button is-warning is-rounded" onclick={readHiddenGroup} style="margin-left:2px">Show Hidden Group</button>

      </div>
    </div>

    <div class="box">
      <div class="columns">

        <div class="column is-narrow"><label class="label">Standard</label></div>  
        <div class="column">  
          <div class="control">
            <div class="select is-fullwidth">
              <select ref="standardSelect" id="standard" onchange={changeSection}>
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
              <select ref="sectionSelect" id="section">
                <option value="">Select Section</option>
                <option each={tempSections} value={section_id}>{section}</option>
              </select>
            </div>
          </div>
        </div>

        <div class="column">
          <button class="button is-danger has-text-weight-bold" onclick={readStudentGroup} >GO </button>
        </div>
          
      </div>
    </div> 

		<table class="table is-fullwidth is-striped is-hoverable">
			<thead>
				<tr>
					<th class="slno">SL</th>
          <th>Group</th>
					<th>Details</th>
          <th></th>
				</tr>
			</thead>
			<tbody>
				<tr each={c, i in studentGroups}>
					<td>{ i+1 }</td>
          <td>{ c.group_name}</td>
          <td>{ c.group_detail}</td>
        	<td class="has-text-right">
      			<div class="inline-flex rounded border border-grey overflow-hidden" hide={c.confirmDelete}>
        				<span><a class="button is-small is-rounded" onclick={edit.bind(this, c)}>Edit</a></span>
                <span><a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick={confirmDelete}>Delete</a></span>
                <span><a class="button is-small is-rounded" onclick={assignStudentsFrom.bind(this, c)}>Students</a></span>
        				<span><a class="button is-small is-rounded" onclick={assignSubjectsFrom.bind(this, c)}>Subjects</a></span>
                <span><a class="button is-small is-rounded" onclick={details.bind(this, c)}>Print Group</a></span>
                <span><a class="button is-small is-rounded" onclick={hideGroup.bind(this, c)}>Hide Group</a></span>
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

  <!-- Open StudentGroup Modal Start -->
  <div id="studentGroupModal" class="modal ">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{title} Student Group</p>
      </header>
      <section class="modal-card-body">
        
        <div class="columns">
          <div class="column">
            <div class="field">
              <label class="label" for="role">Student Group</label>
              <div class="control">
                <input class="input" type="text" ref="studentGroupInput" >
              </div>
            </div>

            <div class="field">
              <label class="label" for="role">Details</label>
              <div class="control">
                <textarea class="textarea" type="text" rows="2" ref="detailsInput"></textarea> 
              </div>
            </div>
          </div>
        </div>

      </section>
      <footer class="modal-card-foot">
        <button class="button is-danger" onclick={add} >{title}</button>
        <button class="button" id="item-modal-close" onclick={closeStudentGroupModal}>Cancel</button>
      </footer>
    </div>
  </div>
  <!-- StudentGroup Modal End -->


  <!-- ***************************************************Students Start************************************************ -->


  <section class=" is-fluid" show={view=='students'}>

    <div class="level">
      <div class="level-left">
        <h2 class="title" style="color: #ff3860;">Students Under : {class}</h2>
      </div>
      <div class="level-right">
        <button class="button is-warning is-rounded" onclick={backToAssignStudentGroup}>
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
                  <input type="checkbox" checked={selected} id="{'freeStudentCheckBox'+c.group_id}" onclick={selectFreeStudent.bind(this,c)} > 
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
                  <input type="checkbox" checked={selected} id="{'assignedStudentCheckBox'+c.group_id}" onclick={selectAssigndStudent.bind(this,c)} > 
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


  <!-- ***************************************************Subjects Start************************************************ -->


  <section class=" is-fluid" show={view=='subjects'}>

    <div class="level">
      <div class="level-left">
        <h2 class="title" style="color: #ff3860;">Subjects Under : {class}</h2>
      </div>
      <div class="level-right">
        <button class="button is-warning is-rounded" onclick={backToAssignStudentGroup}>
        <span class="icon">
          <span class="fas fa-arrow-left"></span>
        </span>
        </button>
        <button class="button is-warning is-rounded ml5" onclick={refreshSubjects}>
        <span class="icon">
          <span class="fas fa-sync-alt"></span>
        </span>
        </button>
      </div>
    </div>

     <div class="columns is-multiline is-mobile">

        <div class="column">
          <table class="table is-fullwidth is-striped is-hoverable">
            <thead>
              <tr>
                <th>Free Subjects</th>
                <th>Subjects Short Name</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr each={c, i in freeSubjects}>
                <td>{c.subject_name}</td>
                <td>{c.subject_short_name}</td>
                <td class="has-text-right">
                  <input type="checkbox" checked={selected} id="{'freeSubjectCheckBox'+c.subject_id}" onclick={selectFreeSubject.bind(this,c)} > 
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="column is-vertical-center is-narrow has-text-centered is-multiline">
          <table>
            <tr>
              <td>
                <button class="button" onclick={assignSubjects} style="margin-top:20px;">Assign subjects  
                  <span style="margin-left:10px" class="fas fa-angle-double-right"></span>
                </button>
              </td>
            </tr>
            <tr>
              <td>
                <button class="button" onclick={freeUpSubject} style="margin-top:20px;"><span style="margin-right:10px;" class="fas fa-angle-double-left"></span> Free up subjects</button>
              </td>
            </tr>
          </table>
        </div>

        <div class="column">
          <table class="table is-fullwidth is-striped is-hoverable">
            <thead>
              <tr>
                <th></th>
                <th>Assigned Subject Name</th>
                <th>Subjects Short Name</th>
                <th style="width:150px">Order No</th>
              </tr>
            </thead>
            <tbody>
              <tr each={c, i in assignedSubjects}>
                <td class="has-text-right">
                  <input type="checkbox" checked={selected} id="{'assignedSubjectCheckBox'+c.subject_id}" onclick={selectAssigndSubject.bind(this,c)} > 
                </td>
                <td>{c.subject_name}</td>
                <td>{c.subject_short_name}</td>
                <td><input type="text" class="input" id="{'orderInput'+c.subject_id}" value={c.order_no}></td>
              </tr>
            </tbody>
          </table>

          <div class="level">
            <div class="level-left">
            </div>
            <div class="level-right">
              <button class="button is-danger ml5" onclick={saveOrderNumber}>Save Order No</button>
              <button class="button is-danger ml5" onclick={openCopyOrderNumberForm}>Copy Order No</button>
            </div>
          </div>
        </div>

      </div>
     
  </section>

  <!-- Open StudentGroup Modal Start -->
  <div id="copyOrderNumberModal" class="modal ">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Copy Order Number</p>
      </header>
      <section class="modal-card-body">
        
        <div class="columns">
          <div class="column">

            <div class="field">
              <label class="label" for="role">Standard</label>
               <div class="control">
                <div class="select is-fullwidth">
                  <select ref="standardSelectCopyOrderNo" id="standardForCopyOrderNo" disabled>
                    <option each={classes} value={standard_id}>{standard}</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="field">
              <label class="label" for="role">Section</label>
               <div class="control">
                <div class="select is-fullwidth">
                  <select ref="sectionSelectCopyOrderNo" id="sectionForCopyOrderNo" onchange={readGroups}>
                    <option value="">Select Section</option>
                    <option each={tempSectionsForCopyOrderNo} value={section_id}>{section}</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="field">
              <label class="label" for="role">Group</label>
               <div class="control">
                <div class="select is-fullwidth">
                  <select ref="groupSelect">
                    <option value="">Select Group</option>
                    <option each={tempSubjectGroups} value={group_id}>{group_name}</option>
                  </select>
                </div>
              </div>
            </div>

          </div>
        </div>

      </section>
      <footer class="modal-card-foot">
        <button class="button is-danger" onclick={copyOrderNumber} >Submit</button>
        <button class="button" id="item-modal-close" onclick={closeCopyOrderNumberForm}>Cancel</button>
      </footer>
    </div>
  </div>
  <!-- StudentGroup Modal End -->

  <!-- details -->
  <section class="is-fluid" show={view=='details'}>
    <div class="level no-print">
      <div class="level-left">
        <h2 class="title" style="color: #ff3860;">Group Student</h2>
      </div>
      <div class="level-right">

        <button class="button is-warning is-rounded" onclick={backToAssignStudentGroup}>
          <span class="icon">
            <span class="fas fa-arrow-left"></span>
          </span>
        </button>

      </div>
    </div>

    <center>
     <h6> <strong>Class:</strong> {class} <strong>Group:</strong> {group_details} </h6>
    </center>
  
    <h6><strong>Students List</strong></h6>
    <table class="table is-fullwidth is-striped is-hoverable">
      <thead>
        <tr>
          <th class="slno">SL</th>
          <th>Roll</th>
          <th>Enroll No</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        <tr each={c, i in studentsDetails}>
          <td>{i+1}</td>
          <td>{c.roll_number}</td>
          <td>{c.enroll_number}</td>
          <td>{c.name}</td>
        </tr>
      </tbody>
    </table>

    <h6><strong>Subjects List</strong></h6>
    <table class="table is-fullwidth is-striped is-hoverable">
      <thead>
        <tr>
          <th class="slno">SL</th>
          <th>Subject Name</th>
          <th>Subject Short Name</th>
        </tr>
      </thead>
      <tbody>
        <tr each={c, i in subjectsDetails}>
          <td>{i+1}</td>
          <td>{c.subject_name}</td>
          <td>{c.subject_short_name}</td>
        </tr>
      </tbody>
    </table>


  </section>

   <!-- Open StudentGroup Modal Start -->
  <div id="hiddenGroupModal" class="modal ">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Hidden Groups</p>
      </header>
      <section class="modal-card-body">
        
        <table class="table is-fullwidth is-striped is-hoverable">
          <thead>
            <tr>
              <th class="slno">SL</th>
              <th>Group</th>
              <th>Details</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr each={c, i in hiddenStudentsGroups}>
              <td>{i+1}</td>
              <td>{c.group_name}</td>
              <td>{c.group_detail}</td>
              <td class="has-text-right">
                <span><a class="button is-small is-rounded is-danger" onclick={unHideGroup.bind(this, c)}>Un-hide Group</a></span>
              </td>
            </tr>
          </tbody>
        </table>        

      </section>
      <footer class="modal-card-foot">
        <button class="button" id="item-modal-close" onclick={closeHiddenGroupModel}>Cancel</button>
      </footer>
    </div>
  </div>
  <!-- StudentGroup Modal End -->

	<script>
	var self = this
    self.on("mount", function(){
      self.title = 'Add'
      self.title_exams = 'Add'
      self.view = 'student-group-students'
      self.loading = false;
      self.update()
      // flatpickr(".date", {
      //   allowInput: true,
      //   dateFormat: "d/m/Y",
      // })
      // self.readStudentGroup()
      self.readClass()
      self.readSection()
    })
    self.on("unmount", function(){
      studentStudentGroupStore.off('read_classes_changed',ClassesChanged)
      studentStudentGroupStore.off('read_section_changed',SectionChanged)
      studentStudentGroupStore.off('read_student_groups_changed',readStudentGroupsChanged)
      studentStudentGroupStore.off('add_student_group_changed',AddStudentGroupChanged)
      studentStudentGroupStore.off('delete_student_group_changed',DeleteStudentGroupChanged)

      studentStudentGroupStore.off('read_students_changed',ReadStudentsChanged)
      studentStudentGroupStore.off('assign_students_changed',AssignStandardChanged)

      studentStudentGroupStore.off('read_subjects_changed',ReadSubjectsChanged)
      studentStudentGroupStore.off('assign_subjects_changed',AssignSubjectsChanged)
      studentStudentGroupStore.off('save_order_number_changed',orderNumberChanged)
      studentStudentGroupStore.off('read_subject_groups_for_copy_order_no_changed',ReadSubjectGroupsForCopyOrderNumberChanged)
      studentStudentGroupStore.off('copy_order_number_changed',CopyOrderNumberChanged)

      studentStudentGroupStore.off('read_student_group_details_changed',ReadStudentGroupDetailsChanged)

      studentStudentGroupStore.off('hide_group_changed',HideGroupChanged)
      studentStudentGroupStore.off('read_hidden_groups_changed',ReadHiddenGroupChanged)
      studentStudentGroupStore.off('read_unhide_group_changed',DeleteHiddenGroupChanged)
    })

    self.readClass = () => {
       self.loading = true;
       studentStudentGroupStore.trigger('read_classes')
    }

    self.readSection = () => {
       self.loading = true;
       studentStudentGroupStore.trigger('read_section')
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

    self.readStudentGroup = () => {
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
        studentStudentGroupStore.trigger('read_student_groups', self.refs.standardSelect.value, self.refs.sectionSelect.value) 
      }
       
    }

    self.openStudentGroupModal = () => {
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
        self.title = 'Add'
        $("#studentGroupModal").addClass("is-active");
      }  
    }

    self.closeStudentGroupModal = () => {
      $("#studentGroupModal").removeClass("is-active");
    }

    self.add = () => {

      let error = '';
      
      if(self.refs.standardSelect.value==''){
        error = error + "Please select standard, "
      }

      if(self.refs.sectionSelect.value==''){
        error = error + "Please select section, "
      }

      if(!self.refs.studentGroupInput.value){
        toastr.info("Please enter student group and try again")
      }

      if(error.length!=0){
        toastr.error(error)
        return
      }else{
        var obj={};
        obj['standard_id']=self.refs.standardSelect.value
        obj['section_id']=self.refs.sectionSelect.value
        obj['group_name']=self.refs.studentGroupInput.value
        obj['group_detail']=self.refs.detailsInput.value

        self.loading = true
        if(self.title=='Add'){
          studentStudentGroupStore.trigger('add_student_group', obj)
        }else if(self.title=='Update'){
          studentStudentGroupStore.trigger('update_student_group', obj, self.edit_id)
        }
      }
    }

    self.edit = (c,e) => {
      console.log(c)
      self.title='Update'
      $("#studentGroupModal").addClass("is-active");
      self.refs.studentGroupInput.value = c.group_name
      self.refs.detailsInput.value = c.group_detail
      self.edit_id = c.group_id
    }

    self.cancelOperation = (e) => {
      self.studentGroups.map(c => {
          c.confirmDelete = false
          c.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.studentGroups.map(c => {
        if(c.group_id != e.item.c.group_id){
          c.confirmDelete = false
        }else{
          c.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      studentStudentGroupStore.trigger('delete_student_group', e.item.c.group_id)
    }


    // ****************************************** students *************************************
    
    self.assignStudentsFrom = (c) => {
      self.class = $("#standard option:selected").text() + ' ' + $("#section option:selected").text() 
      self.group_id = c.group_id
      //self.standard_id = self.refs.standardSelect.value
      //self.section_id = self.refs.sectionSelect.value
      self.view='students'
      self.refreshStudents()
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
        studentStudentGroupStore.trigger('read_students', self.group_id, self.refs.standardSelect.value, self.refs.sectionSelect.value) 
      }
      
    }

    self.selectFreeStudent = (student,e) => {
        self.freeStudents.map(i=>{
          if(student.student_id==i.student_id){
            i.selected=!i.selected
          }
        })
    }

    self.selectAssigndStudent = (student,e) => {
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
      console.log(self.group_id)
      console.log(students_to_assign)

      if(students_to_assign.length==0){
        toastr.error('Please Select Student To Assign Student Group.')
        return
      }else{
        self.loading = true
        studentStudentGroupStore.trigger('assign_students', self.group_id, students_to_assign)
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
        studentStudentGroupStore.trigger('free_up_student', self.group_id, students_to_free)
      }
    }

    self.backToAssignStudentGroup = () =>{
      self.view='student-group-students'
    }

    // ****************************************** subjects *************************************
    
    self.assignSubjectsFrom = (c) => {
      self.class = $("#standard option:selected").text() + ' ' + $("#section option:selected").text() 
      self.group_id = c.group_id
      self.view='subjects'
      self.refreshSubjects()
    }

    self.refreshSubjects = () =>{

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
        studentStudentGroupStore.trigger('read_subjects', self.group_id, self.refs.standardSelect.value, self.refs.sectionSelect.value) 
      }
      
    }

    self.selectFreeSubject = (subject,e) => {
        self.freeSubjects.map(i=>{
          if(subject.subject_id==i.subject_id){
            i.selected=!i.selected
          }
        })
    }

    self.selectAssigndSubject = (subject,e) => {
        self.assignedSubjects.map(i=>{
          if(subject.subject_id==i.subject_id){
            i.selected=!i.selected
          }
        })
        console.log(self.assignedSubjects)
    }

    self.assignSubjects = () =>{
      let subjects_to_assign = self.freeSubjects.filter(c=>{
        return c.selected == true
      })
      console.log(self.group_id)
      console.log(subjects_to_assign)

      if(subjects_to_assign.length==0){
        toastr.error('Please Select subject To Assign subject.')
        return
      }else{
        self.loading = true
        studentStudentGroupStore.trigger('assign_subjects', self.group_id, subjects_to_assign)
      }
    }

    self.freeUpSubject = () =>{
      let subjects_to_free = self.assignedSubjects.filter(c=>{
        return c.selected == true
      })
      
      if(subjects_to_free.length==0){
        toastr.error('Please select subjects to free from student group .')
        return
      }else{
        self.loading = true
        studentStudentGroupStore.trigger('free_up_subject', self.group_id, subjects_to_free)
      }
    }

    self.saveOrderNumber = () =>{
      self.assignedSubjects.map(c=>{
        var orderInput = '#orderInput'+c.subject_id
        c.order_no = $(orderInput).val()
      })
      console.log(self.assignedSubjects)
      studentStudentGroupStore.trigger('save_order_number', self.group_id, self.assignedSubjects)
    }

    //************************************** Copy Order Number

    self.changeSectionForCopyOrderNo = (standard_id) => {
      self.tempSectionsForCopyOrderNo = []
      self.tempSectionsForCopyOrderNo = self.sections.filter(s=>{
        return s.standard_id==standard_id
      })
    }

    self.openCopyOrderNumberForm = (c,e) => {
      self.changeSectionForCopyOrderNo(self.refs.standardSelect.value)
      self.refs.standardSelectCopyOrderNo.value = self.refs.standardSelect.value
      $("#copyOrderNumberModal").addClass("is-active");
      console.log(self.tempSectionsForCopyOrderNo)
    }

    self.closeCopyOrderNumberForm = () => {
      $("#copyOrderNumberModal").removeClass("is-active");
    }

    self.readGroups = () => {
      if(self.refs.sectionSelectCopyOrderNo.value == ''){
        toastr.error('Please select section')
      }else{
        studentStudentGroupStore.trigger('read_subject_groups_for_copy_order_no', self.refs.standardSelect.value, self.refs.sectionSelectCopyOrderNo.value)
      }
    }

    self.copyOrderNumber = () => {

      let error = '';
      
      if(self.refs.sectionSelectCopyOrderNo.value==''){
        error = error + "Please select section, "
      }

      if(self.refs.sectionSelectCopyOrderNo.value==self.refs.sectionSelect.value){
        error = error + "Yor are in the selected section, "
      }

      if(self.refs.groupSelect.value==''){
        error = error + "Please select group, "
      }

      if(self.refs.groupSelect.value==self.group_id){
        error = error + "You are in the selected group, "
      }

      if(error.length!=0){
        toastr.error(error)
        return
      }else{
        self.loading = true
        studentStudentGroupStore.trigger('copy_order_number', self.refs.groupSelect.value)
      }

    } 

    self.details = (c,e) => {
      self.class = $("#standard option:selected").text() + ' ' + $("#section option:selected").text() 
      self.group_details = c.group_name 
      self.loading = true
      studentStudentGroupStore.trigger('read_student_group_details', c.group_id)
    }

    self.hideGroup = (c,e) => {
      self.loading = true
      studentStudentGroupStore.trigger('hide_group', c.group_id, self.refs.sectionSelect.value)
    }

    self.readHiddenGroup = () => {
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
        studentStudentGroupStore.trigger('read_hidden_groups', self.refs.sectionSelect.value) 
      }
       
    }

    self.closeHiddenGroupModel = () => {
      $("#hiddenGroupModal").removeClass("is-active");
    }

    self.unHideGroup = (c,e) => {
      self.loading = true
      studentStudentGroupStore.trigger('unhide_group', c.group_id, self.refs.sectionSelect.value)
    }

    // ****************************************** all change metods *************************************
    studentStudentGroupStore.on('read_classes_changed',ClassesChanged)
    function ClassesChanged(classes){
      self.loading = false
      self.classes = []
      self.classes = classes
      self.update()
      console.log(self.classes)
    }

    studentStudentGroupStore.on('read_section_changed',SectionChanged)
    function SectionChanged(sections){
      self.loading = false
      self.sections = []
      self.sections = sections
      self.update()
    }

    studentStudentGroupStore.on('read_student_groups_changed',readStudentGroupsChanged)
    function readStudentGroupsChanged(studentGroups){
      self.loading = false
      self.studentGroups = []
      self.studentGroups = studentGroups
      self.update()
    }

    studentStudentGroupStore.on('add_student_group_changed',AddStudentGroupChanged)
    function AddStudentGroupChanged(studentGroups){
      self.refs.studentGroupInput.value=''
      self.refs.detailsInput.value=''
      self.closeStudentGroupModal()
      self.loading = false
      self.studentGroups = []
      self.studentGroups = studentGroups
      self.update()
    }

    studentStudentGroupStore.on('delete_student_group_changed',DeleteStudentGroupChanged)
    function DeleteStudentGroupChanged(studentGroups){
      self.loading = false
      self.studentGroups = []
      self.studentGroups = studentGroups
      self.update()
      console.log(self.studentGroups)
    }

   /************************************************ Students Changed Method ************************************************/
   

    studentStudentGroupStore.on('read_students_changed',ReadStudentsChanged)
    function ReadStudentsChanged(freeStudents,assignedStudents){
      console.log('here in students')
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

    studentStudentGroupStore.on('assign_students_changed',AssignStandardChanged)
    function AssignStandardChanged(students_assigned){
      self.loading = false

      self.refreshStudents()
      
    }

    /************************************************ Subjects Changed Method ************************************************/
   

    studentStudentGroupStore.on('read_subjects_changed',ReadSubjectsChanged)
    function ReadSubjectsChanged(freeSubjects,assignedSubjects){
      self.loading = false
      self.freeSubjects = []
      self.freeSubjects = freeSubjects
      self.freeSubjects.map(c => {
          c.selected=false
      })
      console.log(freeSubjects)
      self.assignedSubjects = []
      self.assignedSubjects = assignedSubjects
      self.assignedSubjects.map(c => {
          c.selected=false
      })
      self.view='subjects'
      self.update()
    }

    studentStudentGroupStore.on('assign_subjects_changed',AssignSubjectsChanged)
    function AssignSubjectsChanged(subjects_assigned){
      self.loading = false

      self.refreshSubjects()
      
    } 

    studentStudentGroupStore.on('save_order_number_changed',orderNumberChanged)
    function orderNumberChanged(subjects_assigned){
      self.loading = false
    }
  
    studentStudentGroupStore.on('read_subject_groups_for_copy_order_no_changed',ReadSubjectGroupsForCopyOrderNumberChanged)
    function ReadSubjectGroupsForCopyOrderNumberChanged(subjects){
       self.tempSubjectGroups = []
       self.tempSubjectGroups = subjects
       self.update()
    }

    studentStudentGroupStore.on('copy_order_number_changed',CopyOrderNumberChanged)
    function CopyOrderNumberChanged(subjects){
      self.loading = false
      console.log(subjects)
       self.assignedSubjects.map(s=>{
        subjects.map(o=>{
          if(s.subject_id==o.subject_id){
            s.order_no=o.order_no
          }
        })
       })
       self.closeCopyOrderNumberForm()
       console.log(self.assignedSubjects)
       self.update()
    }

    studentStudentGroupStore.on('read_student_group_details_changed',ReadStudentGroupDetailsChanged)
    function ReadStudentGroupDetailsChanged(students,subjects){
      self.loading = false
      self.studentsDetails = []
      self.studentsDetails = students

      self.subjectsDetails = []
      self.subjectsDetails = subjects

      self.view = 'details'
      self.update()
    }

    studentStudentGroupStore.on('hide_group_changed',HideGroupChanged)
    function HideGroupChanged(info){
      self.loading = false
      if(info.length!=0){
        toastr.error(info)
        self.update()
        return
      }else{
        self.readStudentGroup()
      }
    }

    studentStudentGroupStore.on('read_hidden_groups_changed',ReadHiddenGroupChanged)
    function ReadHiddenGroupChanged(students){
      self.loading = false
      self.hiddenStudentsGroups = []
      self.hiddenStudentsGroups = students
      $("#hiddenGroupModal").addClass("is-active");
      self.update()
    }

    studentStudentGroupStore.on('read_unhide_group_changed',DeleteHiddenGroupChanged)
    function DeleteHiddenGroupChanged(students){
      self.loading = false
      self.readHiddenGroup()
    }


</script>
</student-group-student>