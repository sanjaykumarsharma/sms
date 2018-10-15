<student-withdrawn-student>
<loading-bar if={loading}></loading-bar>  

  <section class=" is-fluid">

    <div class="level">
      <div class="level-left">
        <h2 class="title" style="color: #ff3860;">Withdrawn Student</h2>
      </div>
      <div class="level-right">
      </div>
    </div>
     
    <div class="box">
      <div class="columns">

        <div class="column is-narrow"><label class="label">From Date</label></div>  
        <div class="column is-small">  
          <div class="control">
            <input class="input date" type="text" ref="fromDateInput" >
          </div>
        </div>

        <div class="column is-narrow"><label class="label">To Date</label></div>  
        <div class="column is-small">  
          <div class="control">
            <input class="input date" type="text" ref="toDateInput" >
          </div>
        </div>

        <div class="column is-narrow"><label class="label">Standard</label></div>  
        <div class="column is-narrow">  
          <div class="control">
            <div class="select is-fullwidth">
              <select ref="standardSelect" id="standard" onchange={changeSection}>
                <option value="">Select Standard</option>
                <option each={classes} value={standard_id}>{standard}</option>
                <option value="-1">All</option>
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
                <option value="-1">All</option>
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
          <th class="slno">Sl</th>
          <th>Enroll No</th>
          <th>Student Name</th>
          <th>Withdraw class</th>
          <th>Date of withdraw</th>
          <th>Reason</th>
          <th>TC No</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr each={c, i in students}>
          <td>{i+1}</td>
          <td>{c.enroll_number}</td>
          <td>{c.first_name} {c.middle_name} {c.last_name}</td>
          <td>{c.prev_class}</td>
          <td>{c.dol}</td>
          <td>{c.remarks}</td>
          <td>{c.tc_no}</td>
          <td class="has-text-right">
            <span><a class="button is-small is-rounded is-danger" rel="nofollow" onclick={cancleWithdraw.bind(this, c)}>Cancle Withdraw</a></span>
          </td>
        </tr>
      </tbody>
    </table>
     
  </section>
	<script>
	var self = this
    self.on("mount", function(){
      self.loading = false;
      self.update()
      flatpickr(".date", {
        allowInput: true,
        dateFormat: "d/m/Y",
      })
      self.readClass()
      self.readSection()
    })
    self.on("unmount", function(){
      studentWithdrawnStudentStore.off('read_classes_changed',ClassesChanged)
      studentWithdrawnStudentStore.off('read_section_changed',SectionChanged)

      studentWithdrawnStudentStore.off('read_students_changed',ReadSectionsChanged)
      studentWithdrawnStudentStore.off('cancle_withdraw_students_changed',CancleWithdrawStudentChanged)
    })

    self.readClass = () => {
       self.loading = true;
       studentWithdrawnStudentStore.trigger('read_classes')
    }

    self.readSection = () => {
       self.loading = true;
       studentWithdrawnStudentStore.trigger('read_section')
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
      
      if(self.refs.fromDateInput.value==''){
        error = error + "Please select from date, "
      }

      if(self.refs.toDateInput.value==''){
        error = error + "Please select to date, "
      }

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
        studentWithdrawnStudentStore.trigger('read_students', self.refs.standardSelect.value, self.refs.sectionSelect.value , convertDate(self.refs.fromDateInput.value), convertDate(self.refs.toDateInput.value)) 
      }
      
    }


    self.cancleWithdraw = (c,e) =>{
      self.loading = true
      studentWithdrawnStudentStore.trigger('cancle_withdraw_students', c.student_id)
    }

    // ****************************************** all change metods *************************************
    studentWithdrawnStudentStore.on('read_classes_changed',ClassesChanged)
    function ClassesChanged(classes){
      self.loading = false
      self.classes = []
      self.classes = classes
      self.update()
      console.log(self.classes)
    }

    studentWithdrawnStudentStore.on('read_section_changed',SectionChanged)
    function SectionChanged(sections){
      self.loading = false
      self.sections = []
      self.sections = sections
      self.update()
    }

    /************************************************ students changed Method ************************************************/
   

    studentWithdrawnStudentStore.on('read_students_changed',ReadSectionsChanged)
    function ReadSectionsChanged(students){
      self.loading = false
      self.students = []
      self.students = students
      self.students.map(c => {
          c.selected=false
      })
     
      self.update()
    }

    studentWithdrawnStudentStore.on('cancle_withdraw_students_changed',CancleWithdrawStudentChanged)
    function CancleWithdrawStudentChanged(){
      self.loading = false

      self.refreshStudents()
      
    } 


</script>
</student-withdrawn-student>