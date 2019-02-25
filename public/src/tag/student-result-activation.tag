<student-result-activation>
<loading-bar if={loading}></loading-bar>  

  <section class=" is-fluid" show={view=='home'}>
    <div class="level">
      <div class="level-left">
        <h2 class="title" style="color: #ff3860;">Result Activation</h2>
      </div>
      <div class="level-right">
      </div>
    </div>
    <div class="level box no-print">
      <div class="level-left">
        <div class="columns">
          <div class="column is-narrow">
            <label class="label">Standard</label>
          </div>
          <div class="column is-narrow">
          <div class="control">
            <div class="select">
              <select ref="standardSelect" id="standard" onchange={changeSection}>
                <option value="">Select Standard</option>
                <option each={classes} value={standard_id}>{standard}</option>
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
      <div class="level-right" >
        <div class="control">
          <input class="input" ref="searchStudent" onkeyup={filterStudent} type="text" placeholder="Search Here">
        </div>
        <button class="button is-success has-text-weight-bold ml5 " onclick={allowBlock}>Allow/Block
        </button>
      </div>
    </div>

     <table class="table is-fullwidth is-bordered is-hoverable is-narrow">
      <thead>
        <tr>
          <th>Roll No</th>
          <th>Enroll No</th>
          <th>Student's Name</th>
          <th>Father's Name</th>
          <th>Active</th>
          <th class="has-text-centered">
            <input type="checkbox" id="checkStudent" onclick={selectAll}>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr each={c, i in filteredStudent}>
          <td>{c.roll_number}</td>
          <td>{c.enroll_number}</td>
          <td>{c.student}</td>
          <td>{c.f_name}</td>
          <td>{c.active_result}</td>
          <td class="has-text-centered">
            <input type="checkbox" class="id_check_box" checked={c.done} id="{ 'StudentId' + c.student_id }" onclick={selectStudent.bind(this,c)} >
          </td>
        </tr>
      </tbody>
    </table>
     
  </section>

	<script>
	var self = this
    self.on("mount", function(){
      self.loading = false;
      self.view = 'home'
      self.update()
      self.readClass()
      self.readSection()
    })
    self.on("unmount", function(){
      studentResultActivationStore.off('read_classes_changed',ClassesChanged)
      studentResultActivationStore.off('read_section_changed',SectionChanged)

      studentResultActivationStore.off('read_students_changed',ReadSectionsChanged)
      studentResultActivationStore.off('update_result_status_changed',UpdateLoginStatusChanged)
    })

    self.readClass = () => {
       self.loading = true;
       studentResultActivationStore.trigger('read_classes')
    }

    self.readSection = () => {
       self.loading = true;
       studentResultActivationStore.trigger('read_section')
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

    // ****************************************** students *************************************

    self.refreshStudents = () =>{

      let error = '';
      
      if(self.refs.standardSelect.value==''){
        error = error + "Please select standard, "
      }

      if(self.refs.sectionSelect.value==''){
        error = error + "Please select section of student, "
      }

      if(error.length!=0){
        toastr.error(error)
        return
      }else{
        self.loading = true
        studentResultActivationStore.trigger('read_students', self.refs.standardSelect.value, self.refs.sectionSelect.value) 
      }
      
    }

    self.selectAll = () => {

      if($('#checkStudent').is(":checked")){
        self.students.map(c=>{
          c.done = true;
          $('StudentId'+c.student_id).prop('checked', true);  
        })
      }else{
        self.students.map(c=>{
          c.done = false;
          $('StudentId'+c.student_id).prop('checked', false);
          self.student_id = c.student_id;
        })
      }
    }

    self.selectStudent = (item,event) => {
      item.done=!event.item.c.done
        self.student_id = item.student_id;
    }

    self.allowBlock = () =>{
      let enroll_number='';
      var active_result = 'N'
      var st = []
       self.students.map( q => {
          if(q.done){
            var ob ={}
            ob.enroll_number=q.enroll_number

            if(q.active_result=='Y'){
              ob.active_result='N'
            }else{
              ob.active_result='Y'
            }
            st.push(ob)
          }
        })
        if(st.length==0){
          toastr.info('Please select at least one student and try again')
        }else{
          self.loading = true
          studentResultActivationStore.trigger('update_result_status', st)
      }
    }

    self.filterStudent = ()=>{
      self.filteredStudent = self.students.filter(c => {
        return JSON.stringify(c).toLowerCase().indexOf(self.refs.searchStudent.value.toLowerCase())>=0
      })
    }

    // ****************************************** all change metods *************************************
    studentResultActivationStore.on('read_classes_changed',ClassesChanged)
    function ClassesChanged(classes){
      self.loading = false
      self.classes = []
      self.classes = classes
      self.update()
      console.log(self.classes)
    }

    studentResultActivationStore.on('read_section_changed',SectionChanged)
    function SectionChanged(sections){
      self.loading = false
      self.sections = []
      self.sections = sections
      self.update()
    }

    /************************************************ students changed Method ************************************************/
    studentResultActivationStore.on('read_students_changed',ReadSectionsChanged)
    function ReadSectionsChanged(students){
      self.loading = false
      self.students = []
      self.students = students
      self.filteredStudent = students
      self.students.map(c => {
        c.done=false
      })
      $("#checkStudent").prop("checked", false);
      self.update()
    }

    studentResultActivationStore.on('update_result_status_changed',UpdateLoginStatusChanged)
    function UpdateLoginStatusChanged(){
      self.loading = false
      self.refreshStudents()
      
    } 

</script>
</student-result-activation>