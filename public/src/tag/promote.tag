<promote>
  <loading-bar if={loading}></loading-bar>
  <section class=" is-fluid">
    <div class="level">
        <div class="level-item">
          <h2 class="title has-text-centered" style="color: #ff3860; ">Promote Student Console</h2>
        </div>
    </div>
    <div class="columns is-multiline is-mobile">
        <div class="column">
            <div class="columns">
            <div class="column is-narrow"><label class="label">Standard</label></div>  
            <div class="column">  
              <div class="control">
                <div class="select is-fullwidth">
                  <select ref="standardSelect" onchange={changeSection}>
                    <option each={classes} value={standard_id}>{standard}</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="column is-narrow"><label class="label">Section</label></div>  
            <div class="column">  
              <div class="control">
                <div class="select is-fullwidth">
                  <select ref="sectionSelect" onchange={readFreeStudents}>
                    <option each={tempSections} value={section_id}>{section}</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="column">
              <button class="button is-warning is-rounded ml5" style="margin-bottom:12px;" onclick={readFreeStudents}>
              <span class="icon">
                <span class="fas fa-sync-alt"></span>
              </span>
            </button>
            </div>
          </div>
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
                    <td>{c.name}</td>
                    <td class="has-text-right">
                      <input type="checkbox" checked={selected} id="{'freeSubjectCheckBox'+c.student_id}" onclick={selectFreeStudents.bind(this,c)} > 
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
                      <button class="button" onclick={freeUpStudents} style="margin-top:20px;"><span style="margin-right:10px;" class="fas fa-angle-double-left"></span> Free up students</button>
                    </td>
                </tr>
              </table>
          </div>
          <div class="column">
            <div class="columns">
            <div class="column is-narrow"><label class="label">Standard</label></div>  
            <div class="column">  
              <div class="control">
                <div class="select is-fullwidth">
                  <select ref="assignedStandard" id="StandardAssign" onchange={changeAssignedSection}>
                    <option each={classes} value={standard_id}>{standard}</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="column is-narrow"><label class="label">Section</label></div>  
            <div class="column">  
              <div class="control">
                <div class="select is-fullwidth">
                  <select ref="assignedSection" onchange={readPromotedStudents}>
                    <option each={tempAssignedSections} value={section_id}>{section}</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="column">
              <button class="button is-warning is-rounded ml5" style="margin-bottom:12px;" onclick={readPromotedStudents}>
              <span class="icon">
                <span class="fas fa-sync-alt"></span>
              </span>
            </button>
            <button class="button is-success is-rounded ml5" style="margin-bottom:12px;" onclick={openReShuffleModal} title="Re-Shuffle">
              <span class="icon">
                <i class="fa fa-random" aria-hidden="true"></i>
              </span>
            </button>
            </div>
          </div>
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
                  <tr each={c, i in promotedStudents}>
                      <td class="has-text-right">
                          <input type="checkbox" checked={selected} id="{'assignedSubjectCheckBox'+c.student_id}" onclick={selectAssigndStudents.bind(this,c)} > 
                      </td>
                      <td>{c.roll_number}</td>
                      <td>{c.enroll_number}</td>
                      <td>{c.name}</td>
                    </tr>
                </tbody>
              </table>
          </div>
        </div>
  </section>

  <!-- Open Re Shuffle  Modal Start -->
  <div id="reShuffleModal" class="modal ">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title"> Class: {StandardName} </p>
      </header>
      <section class="modal-card-body">
        
        <div class="columns">
          <div class="column is-narrow"><label class="label">Section</label></div>  
            <div class="column">  
              <div class="control">
                <div class="select is-fullwidth">
                  <select ref="assignedSectionForReShuffle" onchange={readPromotedStudents}>
                    <option each={tempAssignedSections} value={section_id}>{section}</option>
                  </select>
                </div>
              </div>
            </div>
        </div>

      </section>
      <footer class="modal-card-foot">
        <button class="button is-danger" onclick={add} >Submit</button>
        <button class="button" id="item-modal-close" onclick={closeReShuffleModal}>Cancel</button>
      </footer>
    </div>
  </div>
  <!-- Exam Scheme Modal End -->


<script>
  var self = this
    self.on("mount", function(){
      self.title='Add'
      self.role = getCookie('role')
      self.loading = false;
      self.st = [];
      self.update()
      flatpickr(".date", {
        allowInput: true,
        dateFormat: "d/m/Y",
      })
      self.readClass()
      self.readSection()
    })

    self.on("unmount", function(){
      
      activityStore.off('read_classes_changed',ClassesChanged)
      activityStore.off('read_section_changed',SectionChanged)
      promoteStore.off('read_students_changed',ReadStudentsChanged)
      promoteStore.off('read_promoted_student_changed',ReadPromotedStudentsChanged)
      promoteStore.off('assign_students_changed',AssignStudentChanged)
      promoteStore.off('free_students_changed',FreeStudentChanged)
      promoteStore.off('re_shuffle_student_changed',ReShuffleStudentChanged)
    })
    self.readClass = () => {
       self.loading = true;
       activityStore.trigger('read_classes')
    }
    self.readSection = () => {
       self.loading = true;
       activityStore.trigger('read_section')
    }
    /*self.changeSection = () => {
      console.log("clicked")
       if(self.refs.standardSelect.value==''){
        toastr.info("Please select standard and try again")
       }else{
        self.tempSections = []
        self.tempSections = self.sections.filter(s=>{
          return s.standard_id==self.refs.standardSelect.value
        })
       }
    }*/

     self.changeSection = () => {
        self.tempSections = []
        self.tempSections = self.sections.filter(s=>{
          return s.standard_id==self.refs.standardSelect.value
        })
        self.update()
       }
   /*self.changeAssignedSection = () => {
      console.log("clicked")
       if(self.refs.standardSelect.value==''){
        toastr.info("Please select standard and try again")
       }else{
        self.tempAssignedSections = []
        self.tempAssignedSections = self.sections.filter(s=>{
          return s.standard_id==self.refs.assignedStandard.value
        })
       }
    }*/

    self.changeAssignedSection = () => {
        self.tempAssignedSections = []
        self.tempAssignedSections = self.sections.filter(s=>{
          return s.standard_id==self.refs.assignedStandard.value
        })
        self.update()
       }
    
  //========= read free students =======
  self.readFreeStudents = () =>{
        self.loading = true
        promoteStore.trigger('read_students',self.refs.standardSelect.value, self.refs.sectionSelect.value) 
    }

  // ============= read promoted students ========
  self.readPromotedStudents = () =>{
        self.loading = true
        promoteStore.trigger('read_promoted',self.refs.assignedStandard.value, self.refs.assignedSection.value) 
    }

    self.selectFreeStudents = (student,e) => {
        self.freeStudents.map(i=>{
          if(student.student_id==i.student_id){
            i.selected=!i.selected
          }
        })
    }

    self.selectAssigndStudents = (student,e) => {
        self.promotedStudents.map(i=>{
          if(student.student_id==i.student_id){
            i.selected=!i.selected
            self.student_id = student.student_id;
          }
        })
        /*console.log(self.student_id)
        console.log(self.promotedStudents)*/
    }

    self.assignStudents = () =>{
      let students_to_assign = self.freeStudents.filter(c=>{
        return c.selected == true
      })
      console.log(self.student_id)
      console.log(students_to_assign)

      if(students_to_assign.length==0){
        toastr.error('Please Select Student To Assign House.')
        return
      }else{
        self.loading = true
        promoteStore.trigger('assign_students', self.refs.assignedSection.value, students_to_assign)
      }
    }

    self.freeUpStudents = () =>{
      let students_to_free = self.promotedStudents.filter(c=>{
        return c.selected == true
      })
      console.log("students_to_free")
      console.log(students_to_free)
      
      if(students_to_free.length==0){
        toastr.error('Please select students to free from house .')
        return
      }else{
        self.loading = true
        promoteStore.trigger('free_up_student',self.refs.assignedSection.value, students_to_free)
      }
    }

    self.openReShuffleModal = () => {
      var student_id='';
       self.promotedStudents.map( q => {
          if(q.selected){
            var ob ={}
            ob.student_id=q.student_id
            self.st.push(ob)
          }
        })
       console.log(self.st);
       console.log(self.refs.assignedSectionForReShuffle.value);
        if(self.st.length==0){
          toastr.info('Please select at least one Student and try again')
        }else{
          self.StandardName = $("#StandardAssign option:selected").text();
          $("#reShuffleModal").addClass("is-active");
        }
    }

    self.closeReShuffleModal = () => {
      $("#reShuffleModal").removeClass("is-active");
      self.st=[];
    }

    self.add = () =>{
      self.loading = true
      promoteStore.trigger('re_shuffle_student', self.st,self.refs.assignedSectionForReShuffle.value)
    }

    activityStore.on('read_classes_changed',ClassesChanged)
    function ClassesChanged(classes){
      self.loading = false
      self.classes = []
      self.classes = classes
      self.update()
      self.readSection()
      console.log(self.classes)
    }

    activityStore.on('read_section_changed',SectionChanged)
    function SectionChanged(sections){
      self.loading = false
      self.sections = []
      self.sections = sections
      self.update()
      self.changeSection()
      self.changeAssignedSection()
      self.readPromotedStudents()
      self.readFreeStudents()

    }
    
    promoteStore.on('read_students_changed',ReadStudentsChanged)
    function ReadStudentsChanged(freeStudents){
      console.log("reading free students")
      self.loading = false
      self.freeStudents = []
      if(freeStudents.length>0){
      self.freeStudents = freeStudents
      self.freeStudents.map(c => {
          c.selected=false
      })
     }else{
      toastr.info("All students has been promoted from select class")
     }
      self.update()
    }
   promoteStore.on('read_promoted_student_changed',ReadPromotedStudentsChanged)
    function ReadPromotedStudentsChanged(promotedStudents){
      console.log("reading promoted students")
      console.log(promotedStudents)
      self.loading = false
      self.promotedStudents = []
      if(promotedStudents.length>0){
      self.promotedStudents = promotedStudents
      self.promotedStudents.map(c => {
          c.selected=false
      })
     }else{
      toastr.info("No students has been promoted Yet!")
     }
      self.update()
    }
   

    promoteStore.on('free_students_changed',FreeStudentChanged)
    function FreeStudentChanged(students_assigned,error_msg){

      if(error_msg != ""){
        toastr.info("You Can't delete this student. His fees has been received in this session ")
      }
      self.loading = false
      self.update()
      
      self.readFreeStudents()
      
    }

    promoteStore.on('assign_students_changed',AssignStudentChanged)
    function AssignStudentChanged(students_assigned,error_msg){

      self.loading = false
      self.update()
      self.readPromotedStudents()
      
    }

    promoteStore.on('re_shuffle_student_changed',ReShuffleStudentChanged)
    function ReShuffleStudentChanged(){

      self.loading = false
      $("#reShuffleModal").removeClass("is-active");
      self.readPromotedStudents()
      self.readFreeStudents()
      self.update()
      
    }

</script>
</promote>