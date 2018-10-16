<student-school-leaving>
<loading-bar if={loading}></loading-bar>  

  <section class=" is-fluid" show={view=='home'}>

    <div class="level">
      <div class="level-left">
        <h2 class="title" style="color: #ff3860;">School Leaving Certificate</h2>
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
              <select ref="standardSelect" id="standard" onchange={changeSection}>
                <option value="">Select Standard</option>
                <option each={classes} value={standard_id}>{standard}</option>
              </select>
            </div>
          </div>
        </div>

        <div class="column is-narrow"><label class="label">Section</label></div>  
        <div class="column is-narrow">  
          <div class="control">
            <div class="select is-fullwidth">
              <select ref="sectionSelect" id="section">
                <option value="">Select Section</option>
                <option each={tempSections} value={section_id}>{section}</option>
              </select>
            </div>
          </div>
        </div>

        <div class="column is-narrow"><label class="label">Type</label></div>  
        <div class="column is-narrow">  
          <div class="control">
            <div class="select is-fullwidth">
              <select ref="typeSelect">
                <option value="">Select Type</option>
                <option value="Normal">Normal</option>
                <option value="TC">TC</option>
              </select>
            </div>
          </div>
        </div>

        <div class="column is-narrow">
          <button class="button is-danger has-text-weight-bold" onclick={refreshStudents} >GO </button>
        </div>
          
      </div>
    </div> 

     <table class="table is-fullwidth is-striped is-hoverable">
      <thead>
        <tr>
          <th class="sl_no">SL No</th>
          <th>Enroll No</th>
          <th>Student Name</th>
          <th>Withdraw Class</th>
          <th>Date of Withdraw</th>
          <th>Reason</th>
          <th>Certificate Issue</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr each={c, i in students}>
          <td>{i+1}</td>
          <td>{c.enroll_number}</td>
          <td>{c.first_name} {c.middle_name} {c.last_name}</td>
          <td>{c.dol}</td>
          <td>{c.remarks}</td>
          <td>{c.type}</td>
          <td class="has-text-right">
            <span>
              <a class="button is-small is-rounded is-danger" show={c.active_result=='Y'} rel="nofollow" onclick={allowBlock.bind(this, c)}>Block</a>
              <a class="button is-small is-rounded is-primary" show={c.active_result=='N'} rel="nofollow" onclick={allowBlock.bind(this, c)}>Allow</a>
            </span>
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
      // flatpickr(".date", {
      //   allowInput: true,
      //   dateFormat: "d/m/Y",
      // })
      self.readClass()
      self.readSection()
    })
    self.on("unmount", function(){
      studentSchoolLeavingStore.off('read_classes_changed',ClassesChanged)
      studentSchoolLeavingStore.off('read_section_changed',SectionChanged)

      studentSchoolLeavingStore.off('read_students_changed',ReadSectionsChanged)
      studentSchoolLeavingStore.off('update_result_status_changed',UpdateLoginStatusChanged)
    })

    self.readClass = () => {
       self.loading = true;
       studentSchoolLeavingStore.trigger('read_classes')
    }

    self.readSection = () => {
       self.loading = true;
       studentSchoolLeavingStore.trigger('read_section')
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

      if(self.refs.typeSelect.value==''){
        error = error + "Please select type, "
      }

      if(error.length!=0){
        toastr.error(error)
        return
      }else{
        self.loading = true
        studentSchoolLeavingStore.trigger('read_students', self.refs.standardSelect.value, self.refs.sectionSelect.value, self.refs.typeSelect.value) 
      }
      
    }


    self.allowBlock = (c,e) =>{
      self.loading = true
      var active_result = 'N'
      if(c.active_result=='Y'){
        active_result='N'
      }else{
        active_result='Y'
      }
      studentSchoolLeavingStore.trigger('update_result_status', c.enroll_number, active_result)
    }

    // ****************************************** all change metods *************************************
    studentSchoolLeavingStore.on('read_classes_changed',ClassesChanged)
    function ClassesChanged(classes){
      self.loading = false
      self.classes = []
      self.classes = classes
      self.update()
      console.log(self.classes)
    }

    studentSchoolLeavingStore.on('read_section_changed',SectionChanged)
    function SectionChanged(sections){
      self.loading = false
      self.sections = []
      self.sections = sections
      self.update()
    }

    /************************************************ students changed Method ************************************************/
    studentSchoolLeavingStore.on('read_students_changed',ReadSectionsChanged)
    function ReadSectionsChanged(students){
      self.loading = false
      self.students = []
      self.students = students
      self.students.map(c => {
          c.selected=false
      })
     
      self.update()
    }

    studentSchoolLeavingStore.on('update_result_status_changed',UpdateLoginStatusChanged)
    function UpdateLoginStatusChanged(){
      self.loading = false

      self.refreshStudents()
      
    } 

</script>
</student-school-leaving>