<marks-entry>
<loading-bar if={loading}></loading-bar>  
	<section class=" is-fluid">

    <div class="level">
      <div class="level-left">
        <h2 class="title" style="color: #ff3860;">Marks Entry</h2>
      </div>
      <div class="level-right">
        <button class="button is-warning is-rounded ml5" onclick={readMarksEntry}>
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
              <select ref="sectionSelect" onchange={readClassSubject}>
                <option value="">Select Section</option>
                <option each={tempSections} value={section_id}>{section}</option>
              </select>
            </div>
          </div>
        </div>

        <div class="column is-narrow"><label class="label">Subjects</label></div>  
        <div class="column">
          <div class="control">
            <div class="select is-fullwidth" onchange={readMarksLimit}>
              <select ref="subjectSelect">
                <option value="">Select Subject</option>
                <option each={subjects} value={subject_id}>{subject_name}</option>
              </select>
            </div>
          </div>
        </div>

        <div class="column is-narrow"><label class="label">Exam Type</label></div>  
        <div class="column">
          <div class="control">
            <div class="select is-fullwidth">
              <select ref="examTypeSelect" onchange={readMarksLimit}>
                <option value="">Select Exam Type</option>
                <option each={examTypes} value={exam_type_id}>{exam_type}</option>
              </select>
            </div>
          </div>
        </div>

        <div class="column">
          <button class="button is-danger has-text-weight-bold" onclick={readMarksEntry}>GO </button>
        </div>
          
      </div>
    </div>


    <div class="box">
      <div class="columns">

        <div class="column">  
          <div><i>Roll No:</i> <strong>{roll_number}</strong></div>
          <div><i>Enroll No:</i> <strong>{enroll_number}</strong></div>
        </div>

        <div class="column">
          <div><i>Name:</i> <strong>{name}</strong></div>
        </div>

        <div class="column">
          <div><i>Marks:</i> 
            <input class="input" type="text" ref="marksInput" id="marksInput" style="width:100px;font-weight:bold;    text-transform: uppercase;" onkeyup={addEnter}>
            <button class="button is-danger has-text-weight-bold" onclick={add}>{title}</button>
          </div>
          <div><i>Absent:</i> <input type="checkbox" class="checkbox" ref="absentCheckBox" id="absentCheckBoxId"></div>
        </div>
          
        <div class="column" hide={marksLimit.marking_type=='G'}>
          <div><i>Max Marks:</i> <strong>{marksLimit.max_marks}</strong>
               <strong style="color:#FF0000">({marksLimit.marking_type})</strong>
          </div>
          <div><i>Min Marks:</i> <strong>{marksLimit.min_marks}</strong></div>
        </div>
      </div>
    </div> 

		<table class="table is-fullwidth is-striped is-hoverable">
			<thead>
				<tr>
					<th style="width:200px;">Roll No</th>
          <th>Enroll No</th>
          <th>Student Name</th>
          <th hide={marksLimit.marking_type=='G'}>Marks</th>
          <th>Grade</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr each={c, i in marksEntries}>
					<td>{c.roll_number}</td>
          <td>{c.enroll_number}</td>
          <td>{c.name}</td>
          <td hide={marksLimit.marking_type=='G'}>{c.marks}</td>
          <td>{c.marks_grade}</td>
        	<td class="has-text-right">
      			<div class="inline-flex rounded border border-grey overflow-hidden" hide={c.confirmDelete}>
        				<span><a class="button is-small is-rounded" onclick={edit.bind(this, c)}>Edit</a></span>
                <span><a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick={confirmDelete}>Delete</a></span>
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
  

	<script>
	var self = this
  self.marksLimit = {}
  self.marksLimit['min_marks'] = '';
  self.marksLimit.max_marks = '';
  self.marksLimit.marking_type = '';
    self.on("mount", function(){
      self.title = 'Add'
      self.loading = false;
      self.tempSections = []
      self.update()
      self.readClass()
      self.readSection()
    })
    self.on("unmount", function(){
      marksEntryStore.off('read_classes_changed',ClassesChanged)
      marksEntryStore.off('read_section_changed',SectionChanged)
      marksEntryStore.off('exam_types_changed',ExamTypesChanged)
      marksEntryStore.off('subjects_changed',SubjectsChanged)
      marksEntryStore.off('marks_limit_changed',MarksLimitChanged)
      marksEntryStore.off('marks_entries_changed',MarksEntriesChanged)
      marksEntryStore.off('add_marks_entries_changed',AddMarksEntriesChanged)
      marksEntryStore.off('delete_marks_entries_changed',DeleteMarksEntriesChanged)
    })

    self.readClass = () => {
       self.loading = true;
       marksEntryStore.trigger('read_classes')
    }

    self.readSection = () => {
       self.loading = true;
       marksEntryStore.trigger('read_section')
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

       //read exam type
       marksEntryStore.trigger('read_exam_types',self.refs.standardSelect.value)
    }

    self.readClassSubject = () =>{
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
       marksEntryStore.trigger('read_subjects',self.refs.standardSelect.value, self.refs.sectionSelect.value)
      }
    }

    self.readMarksLimit = () => {
      //public function readMarksLimit($section_id, $subject_id,$exam_id)
      let error = '';
      
      if(self.refs.sectionSelect.value==''){
        error = error + "Please select section, "
      }
      
      if(self.refs.subjectSelect.value==''){
        error = error + "Please select standard, "
      }

      if(self.refs.examTypeSelect.value==''){
        error = error + "Please select exam type, "
      }

      if(error.length!=0){
        toastr.error(error)
        return
      }else{
        self.loading=true
       marksEntryStore.trigger('read_marks_limit', self.refs.sectionSelect.value, self.refs.subjectSelect.value, self.refs.examTypeSelect.value)
      }
    }

    self.readMarksEntry = () => {
      //public function readStudent($exam_id,$section_id,$subject_id,$type)
      let error = '';
      
      if(self.refs.sectionSelect.value==''){
        error = error + "Please select section, "
      }

      if(self.refs.examTypeSelect.value==''){
        error = error + "Please select exam type, "
      }

      if(self.refs.subjectSelect.value==''){
        error = error + "Please select subject, "
      }
      
      if(error.length!=0){
        toastr.error(error)
        return
      }else{
        self.loading=true
        marksEntryStore.trigger('read_marks_entries',self.refs.examTypeSelect.value, self.refs.sectionSelect.value, self.refs.subjectSelect.value, self.marksLimit.marking_type)
      }  

    }

    self.addEnter = (e) => {
      if(e.which == 13){
        self.add()
      }
    }

    self.add = () => {
      let error = '';
      
      if($('#absentCheckBoxId').prop("checked") == false){
        if(self.refs.marksInput.value==''){
          error = error + "Please enter marks, "
        }

        if(self.marksLimit.marking_type=='N'){
          if(Number(self.marksLimit.max_marks)<Number(self.refs.marksInput.value)){
            error = error + "Marks can not be greater than max marks, "
          }  
        }else if(self.marksLimit.marking_type=='G'){
          if(!isNaN(self.refs.marksInput.value)){
            error = error + "Please enter grade "
          }
        }

      }
      

      if(self.refs.sectionSelect.value==''){
        error = error + "Please select section, "
      }

      if(self.refs.examTypeSelect.value==''){
        error = error + "Please select exam type, "
      }

      if(self.refs.subjectSelect.value==''){
        error = error + "Please select subject, "
      }

      if(!self.marksLimit.marking_type){
        error = error + "No Marking Type defined, "
      }
      
      
      

      if(error.length!=0){
        toastr.error(error)
        return
      }else{
          var obj = {}
          obj['marks_id'] = self.marksLimit.marks_id            
          obj['student_id'] = self.students[0].student_id            
          obj['exam_id'] = self.refs.examTypeSelect.value            
          obj['subject_id'] = self.refs.subjectSelect.value            
          obj['section_id'] = self.refs.sectionSelect.value            
          obj['marks_group'] = self.marksLimit.exam_group            
          obj['marking_type'] = self.marksLimit.marking_type     

        if(self.marksLimit.marking_type =='N'){

          if($('#absentCheckBoxId').prop("checked") == true){
            obj['marks'] = -1
          }else{
            obj['marks'] = self.refs.marksInput.value  
          }

        }else if(self.marksLimit.marking_type =='G'){

          if($('#absentCheckBoxId').prop("checked") == true){
            obj['marks_grade'] = -1
          }else{
            obj['marks_grade'] = self.refs.marksInput.value         //grade   
          }  

        }else if(self.marksLimit.marking_type =='NG') {

          if($('#absentCheckBoxId').prop("checked") == true){
            obj['marks'] = -1
          }else{
            obj['marks'] = self.refs.marksInput.value            
          }

        }
        
        self.loading = true
        if(self.title=='Add'){
          console.log(obj)
          marksEntryStore.trigger('add_marks_entries', obj)
        }else if(self.title=='Update'){
          marksEntryStore.trigger('update_marks_entries', obj, self.edit_id)
        }
      }  

    }

    self.edit = (c,e) => {
      self.title='Update'
      self.students = []
      self.students.push(c)
      self.roll_number = c.roll_number
      self.enroll_number = c.enroll_number
      self.name = c.name

      if(c.marks == 'AB' || c.marks_grade == 'AB'){
        document.getElementById("absentCheckBoxId").checked = true;
        $("#absentCheckBoxId").focus();
      }else{
        self.refs.marksInput.value = c.marks
        $("#marksInput").focus();
      }
      
      self.edit_id = c.id
      self.update()
    }

   self.cancelOperation = (e) => {
      self.marksEntries.map(c => {
          c.confirmDelete = false
          c.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.marksEntries.map(c => {
        if(c.id != e.item.c.id){
          c.confirmDelete = false
        }else{
          c.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      marksEntryStore.trigger('delete_marks_entries', e.item.c.id)
    }


    // ****************************************** all change metods *************************************

    marksEntryStore.on('read_classes_changed',ClassesChanged)
    function ClassesChanged(classes){
      self.loading = false
      self.classes = []
      self.classes = classes
      self.update()
      console.log(self.classes)
    }

    marksEntryStore.on('read_section_changed',SectionChanged)
    function SectionChanged(sections){
      self.loading = false
      self.sections = []
      self.sections = sections
      self.update()
    }

    marksEntryStore.on('exam_types_changed',ExamTypesChanged)
    function ExamTypesChanged(examTypes){
      self.loading = false
      self.examTypes = []
      self.examTypes = examTypes
      self.update()
    }

    marksEntryStore.on('subjects_changed',SubjectsChanged)
    function SubjectsChanged(subjects){
      self.loading = false
      self.subjects = []
      self.subjects = subjects
      self.update()
    }

    marksEntryStore.on('marks_limit_changed',MarksLimitChanged)
    function MarksLimitChanged(marksLimit){
      self.loading = false
      self.marksLimit = {}
      
      if(marksLimit.length==0){
        toastr.error('Min marks, Max marks not defined on this subject')
      }else{
        self.marksLimit = marksLimit[0]
      }
      self.update()
    }

    marksEntryStore.on('marks_entries_changed',MarksEntriesChanged)
    function MarksEntriesChanged(marksEntries,students){
      self.loading = false
      self.marksEntries = []
      self.marksEntries = marksEntries
      self.students = []
      self.students = students
      if(students.length==0){
        toastr.info('No students to for marks entry')
        self.roll_number = ''
        self.enroll_number = ''
        self.name = ''
      }else{
        self.roll_number = students[0].roll_number
        self.enroll_number = students[0].enroll_number
        self.name = students[0].name
      }
      
      self.update()
    }

    marksEntryStore.on('add_marks_entries_changed',AddMarksEntriesChanged)//update changes calls the same method
    function AddMarksEntriesChanged(){
      self.loading = false
      self.title = 'Add'
      self.refs.marksInput.value=''
      document.getElementById("absentCheckBoxId").checked = false;
      self.readMarksEntry()
    }

    marksEntryStore.on('delete_marks_entries_changed',DeleteMarksEntriesChanged)
    function DeleteMarksEntriesChanged(){
      self.loading = false
      self.readMarksEntry()
    }

</script>
</marks-entry>