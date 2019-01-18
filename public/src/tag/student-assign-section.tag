<student-assign-section>
<loading-bar if={loading}></loading-bar>  
  <!-- ***************************************************Sections Start************************************************ -->
  <section class=" is-fluid">

    <div class="level">
      <div class="level-left">
        <h2 class="title" style="color: #ff3860;">Assign Sections</h2>
      </div>
      <div class="level-right">
      </div>
    </div>

     

     <div class="columns is-multiline is-mobile">

        <div class="column">

          <div class="box">
            <div class="columns">

              <div class="column is-narrow"><label class="label">Standard</label></div>  
              <div class="column is-narrow" style="width:150px">  
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
              <div class="column is-narrow" style="width:150px">  
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
                <button class="button is-danger has-text-weight-bold" onclick={refreshStudents} >GO </button>
              </div>
                
            </div>
          </div>

          <table class="table is-fullwidth is-striped is-hoverable">
            <thead>
              <tr>
                <th>Roll No</th>
                <th>Enroll No</th>
                <th>Student Name</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr each={c, i in freeStudents}>
                <td>{c.roll_number}</td>
                <td>{c.enroll_number}</td>
                <td>{c.first_name} {c.middle_name} {c.last_name}</td>
                <td class="has-text-right">
                  <input type="checkbox" checked={selected} id="{'freeSubjectCheckBox'+c.student_id}" onclick={selectFreeStudent.bind(this,c)} > 
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="column is-vertical-center is-narrow has-text-centered is-multiline" style="margin-top:125px;">
          <table>
            <tr>
              <td>
                <button class="button" onclick={assignStudents} style="margin-top:20px;">Assign section  
                  <span style="margin-left:10px" class="fas fa-angle-double-right"></span>
                </button>
              </td>
            </tr>
            <tr>
              <td>
                <button class="button" onclick={freeUpStudent} style="margin-top:20px;"><span style="margin-right:10px;" class="fas fa-angle-double-left"></span> Free up section</button>
              </td>
            </tr>
          </table>
        </div>

        <div class="column">

          <div class="box">
            <div class="columns">

              <div class="column is-narrow"><label class="label">Section</label></div>  
              <div class="column is-narrow">  
                <div class="control">
                  <div class="select is-fullwidth">
                    <select ref="sectionSelectSecond" id="section" onchange={refreshStudents}>
                      <option value="">Select Section</option>
                      <option each={tempSections} value={section_id}>{section}</option>
                    </select>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <table class="table is-fullwidth is-striped is-hoverable">
            <thead>
              <tr>
                <th></th>
                <th>Roll No</th>
                <th>Enroll Number</th>
                <th>Student Name</th>
              </tr>
            </thead>
            <tbody>
              <tr each={c, i in assignedStudents}>
                <td class="has-text-right">
                  <input type="checkbox" checked={selected} id="{'assignedSubjectCheckBox'+c.student_id}" onclick={selectAssigndStudent.bind(this,c)} > 
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
	<script>
	var self = this
    self.on("mount", function(){
      self.title = 'Add'
      self.title_exams = 'Add'
      self.view = 'student-assign-sections'
      self.loading = false;
      self.update()
      // flatpickr(".date", {
      //   allowInput: true,
      //   dateFormat: "d/m/Y",
      // })
      self.readClass()
      self.readSection()
    })
    self.on("unmount", function(){
      studentAssignSectionStore.off('read_classes_changed',ClassesChanged)
      studentAssignSectionStore.off('read_section_changed',SectionChanged)
      studentAssignSectionStore.off('read_students_changed',ReadSectionsChanged)
      studentAssignSectionStore.off('assign_students_changed',AssignSectionsChanged)
    })

    self.readClass = () => {
       self.loading = true;
       studentAssignSectionStore.trigger('read_classes')
    }

    self.readSection = () => {
       self.loading = true;
       studentAssignSectionStore.trigger('read_section')
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

    // ****************************************** subjects *************************************

    self.refreshStudents = () =>{

      let error = '';
      
      if(self.refs.standardSelect.value==''){
        error = error + "Please select standard, "
      }

      if(self.refs.sectionSelect.value==''){
        error = error + "Please select section of student, "
      }

      if(self.refs.sectionSelectSecond.value==''){
        error = error + "Please select section to transfer, "
      }

      if(error.length!=0){
        toastr.error(error)
        return
      }else{
        self.loading = true
        studentAssignSectionStore.trigger('read_students', self.refs.standardSelect.value, self.refs.sectionSelect.value, self.refs.sectionSelectSecond.value) 
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
      let subjects_to_assign = self.freeStudents.filter(c=>{
        return c.selected == true
      })
      console.log(subjects_to_assign)

      if(subjects_to_assign.length==0){
        toastr.error('Please select student to assign.')
        return
      }else{
        self.loading = true
        studentAssignSectionStore.trigger('assign_students', self.refs.sectionSelectSecond.value, subjects_to_assign)
      }
    }

    self.freeUpStudent = () =>{
      let subjects_to_free = self.assignedStudents.filter(c=>{
        return c.selected == true
      })
      
      if(subjects_to_free.length==0){
        toastr.error('Please select student to free .')
        return
      }else{
        self.loading = true
        studentAssignSectionStore.trigger('free_up_students', self.refs.sectionSelect.value, subjects_to_free)
      }
    }

    // ****************************************** all change metods *************************************
    studentAssignSectionStore.on('read_classes_changed',ClassesChanged)
    function ClassesChanged(classes){
      self.loading = false
      self.classes = []
      self.classes = classes
      self.update()
      console.log(self.classes)
    }

    studentAssignSectionStore.on('read_section_changed',SectionChanged)
    function SectionChanged(sections){
      self.loading = false
      self.sections = []
      self.sections = sections
      self.update()
    }

    /************************************************ Sections Changed Method ************************************************/
   

    studentAssignSectionStore.on('read_students_changed',ReadSectionsChanged)
    function ReadSectionsChanged(freeStudents,assignedStudents){
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
      self.update()
    }

    studentAssignSectionStore.on('assign_students_changed',AssignSectionsChanged)
    function AssignSectionsChanged(subjects_assigned){
      self.loading = false

      self.refreshStudents()
      
    } 


</script>
</student-assign-section>