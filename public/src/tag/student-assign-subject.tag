<student-assign-subject>
<loading-bar if={loading}></loading-bar>  
  <!-- ***************************************************Subjects Start************************************************ -->
  <section class=" is-fluid">

    <div class="level">
      <div class="level-left">
        <h2 class="title" style="color: #ff3860;">Assign Subjects</h2>
      </div>
      <div class="level-right">
      </div>
    </div>

    <div class="box">
      <div class="columns">

        <div class="column is-narrow"><label class="label">Standard</label></div>  
        <div class="column is-narrow">  
          <div class="control">
            <div class="select is-fullwidth">
              <select ref="standardSelect" id="standard">
                <option value="">Select Standard</option>
                <option each={classes} value={standard_id}>{standard}</option>
              </select>
            </div>
          </div>
        </div>

        <div class="column">
          <button class="button is-danger has-text-weight-bold" onclick={refreshSubjects} >GO </button>
        </div>
          
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
                <th>Assigned Subjects</th>
                <th>Subjects Short Name</th>
              </tr>
            </thead>
            <tbody>
              <tr each={c, i in assignedSubjects}>
                <td class="has-text-right">
                  <input type="checkbox" checked={selected} id="{'assignedSubjectCheckBox'+c.id}" onclick={selectAssigndSubject.bind(this,c)} > 
                </td>
                <td>{c.subject_name}</td>
                <td>{c.subject_short_name}</td>
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
      self.view = 'student-assign-subjects'
      self.loading = false;
      self.update()
      // flatpickr(".date", {
      //   allowInput: true,
      //   dateFormat: "d/m/Y",
      // })
      self.readClass()
    })
    self.on("unmount", function(){
      studentAssignSubjectStore.off('read_classes_changed',ClassesChanged)
      studentAssignSubjectStore.off('read_subjects_changed',ReadSubjectsChanged)
      studentAssignSubjectStore.off('assign_subjects_changed',AssignSubjectsChanged)
    })

    self.readClass = () => {
       self.loading = true;
       studentAssignSubjectStore.trigger('read_classes')
    }

    // ****************************************** subjects *************************************

    self.refreshSubjects = () =>{

      let error = '';
      
      if(self.refs.standardSelect.value==''){
        error = error + "Please select standard, "
      }

      if(error.length!=0){
        toastr.error(error)
        return
      }else{
        self.loading = true
        studentAssignSubjectStore.trigger('read_subjects', self.refs.standardSelect.value) 
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
          if(subject.id==i.id){
            i.selected=!i.selected
          }
        })
        console.log(self.assignedSubjects)
    }

    self.assignSubjects = () =>{
      let subjects_to_assign = self.freeSubjects.filter(c=>{
        return c.selected == true
      })
      console.log(subjects_to_assign)

      if(subjects_to_assign.length==0){
        toastr.error('Please select subject to assign.')
        return
      }else{
        self.loading = true
        studentAssignSubjectStore.trigger('assign_subjects', self.refs.standardSelect.value, subjects_to_assign)
      }
    }

    self.freeUpSubject = () =>{
      let subjects_to_free = self.assignedSubjects.filter(c=>{
        return c.selected == true
      })
      
      if(subjects_to_free.length==0){
        toastr.error('Please select subjects to free .')
        return
      }else{
        self.loading = true
        studentAssignSubjectStore.trigger('free_up_subject', self.refs.standardSelect.value, subjects_to_free)
      }
    }

    // ****************************************** all change metods *************************************
    studentAssignSubjectStore.on('read_classes_changed',ClassesChanged)
    function ClassesChanged(classes){
      self.loading = false
      self.classes = []
      self.classes = classes
      self.update()
      console.log(self.classes)
    }

    studentAssignSubjectStore.on('read_section_changed',SectionChanged)
    function SectionChanged(sections){
      self.loading = false
      self.sections = []
      self.sections = sections
      self.update()
    }

    /************************************************ Subjects Changed Method ************************************************/
   

    studentAssignSubjectStore.on('read_subjects_changed',ReadSubjectsChanged)
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

    studentAssignSubjectStore.on('assign_subjects_changed',AssignSubjectsChanged)
    function AssignSubjectsChanged(subjects_assigned){
      self.loading = false

      self.refreshSubjects()
      
    } 


</script>
</student-assign-subject>