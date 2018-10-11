<marks-manager>
<loading-bar if={loading}></loading-bar>  
	<section class=" is-fluid" show={view=='marks_settings'}>

    <div class="level">
      <div class="level-left">
        <h2 class="title" style="color: #ff3860;">Marks Manager <span show={action=='MarksSettingsForm'}>(</span>{title}<span show={action=='MarksSettingsForm'}>)</span></h2>
      </div>
      <div class="level-right">
        <button class="button is-warning is-rounded" onclick={openMarksSettingsForm} hide={action=='MarksSettingsForm'}>
        <span class="icon">
          <span class="fas fa-plus"></span>
        </span>
        </button>

        <button class="button is-warning is-rounded" onclick={closeMarksSettingsForm} show={action=='MarksSettingsForm'}>
        <span class="icon">
          <span class="fas fa-arrow-left"></span>
        </span>
        </button>

        <button class="button is-warning is-rounded ml5" onclick={readMarksSettings} hide={action=='MarksSettingsForm'} >
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

        <div class="column is-narrow"><label class="label">Exam Type</label></div>  
        <div class="column">
          <div class="control">
            <div class="select is-fullwidth">
              <select ref="examTypeSelect">
                <option value="">Select Exam Type</option>
                <option each={examTypes} value={exam_type_id}>{exam_type}</option>
              </select>
            </div>
          </div>
        </div>

        <div class="column is-narrow" show={action=='MarksSettingsForm'}><label class="label">Subjects</label></div>  
        <div class="column" show={action=='MarksSettingsForm'}>
          <div class="control">
            <div class="select is-fullwidth">
              <select ref="subjectSelect">
                <option value="">Select Subject</option>
                <option each={subjects} value={subject_id}>{subject_name}</option>
              </select>
            </div>
          </div>
        </div>

        <div class="column">
          <button class="button is-danger has-text-weight-bold" onclick={readMarksSettings} hide={action=='MarksSettingsForm'}>GO </button>
        </div>
          
      </div>
    </div>  

		<table class="table is-fullwidth is-striped is-hoverable" hide={action=='MarksSettingsForm'}>
			<thead>
				<tr>
					<th class="slno">SL</th>
          <th>Subject</th>
          <th>Exam Date</th>
          <th>Max Marks</th>
          <th>Min Marks</th>
          <th>Marking Type</th>
					<th>Details</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr each={c, i in marksSettings}>
					<td>{i+1 }</td>
          <td>{c.subject_name}</td>
          <td>{c.exam_date}</td>
          <td>{c.max_marks}</td>
          <td>{c.min_marks}</td>
          <td>{c.marking_type}</td>
					<td>{c.details}</td>
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


    <section class=" is-fluid" show={action=='MarksSettingsForm'}> 

      <div class="columns">

        <div class="column">
          <div class="field">
            <label class="label" for="role">Date of Exam</label>
            <div class="control">
              <input class="input date" type="text" ref="examDateInput" >
            </div>
          </div>
          <div class="field">
            <label class="label" for="role">Marking Type</label>
            <div class="control">
              <div class="select is-fullwidth">
                <select ref="markingTypeSelect" onchange={selectIncludeInGrandTotal}>
                  <option value="N">Numbered</option>
                  <option value="G">Graded</option>
                  <option value="NG">Number Graded</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div class="column">
          <div class="field">
            <label class="label" for="role">Max Marks</label>
            <div class="control">
              <input class="input" type="text" ref="maxMarksInput" >
            </div>
          </div>
          <div class="field">
            <label class="label" for="role">Include In Grand Total</label>
            <div class="control">
              <div class="select is-fullwidth">
                <select ref="includeInGrandTotalSelect">
                  <option value="Y">Yes</option>
                  <option value="N">No</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        <div class="column">  
          <div class="field">
            <label class="label" for="role">Min Marks</label>
            <div class="control">
              <input class="input" type="text" ref="minMarksInput" >
            </div>
          </div>
          <div class="field">
            <label class="label" for="role">Show in</label>
            <div class="control">
              <div class="select is-fullwidth">
                <select ref="showInSelect">
                  <option value="B1">Block I</option>
                  <option value="B2">Block II</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div class="column">  
          <div class="field">
            <label class="label" for="role">Details</label>
            <div class="control">
              <textarea class="textarea" rows="4" ref="detailsInput" ></textarea> 
            </div>
          </div>
        </div>

      </div> 

      <div class="level">
        <div class="level-left">
          
        </div>
        <div class="level-right">
          <button class="button is-danger" onclick={add} >{title}</button>
          <button class="button ml5" onclick={closeMarksSettingsForm}>Cancel</button>
        </div>
      </div>
    </section>  

      
	</section>
  

	<script>
	var self = this
    self.on("mount", function(){
      self.title = ''
      self.view = 'marks_settings'
      self.action = ''
      self.loading = false;
      self.tempSections = []
      self.update()
      flatpickr(".date", {
        allowInput: true,
        dateFormat: "d/m/Y",
      })
      self.readClass()
      self.readSection()
    })
    self.on("unmount", function(){
      marksManagerStore.off('read_classes_changed',ClassesChanged)
      marksManagerStore.off('read_section_changed',SectionChanged)
      marksManagerStore.off('exam_types_changed',ExamTypesChanged)
      marksManagerStore.off('subjects_changed',SubjectsChanged)
      marksManagerStore.off('marks_settings_changed',MarksSettingssChanged)
    })

    self.readClass = () => {
       self.loading = true;
       marksManagerStore.trigger('read_classes')
    }

    self.readSection = () => {
       self.loading = true;
       marksManagerStore.trigger('read_section')
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
       marksManagerStore.trigger('read_exam_types',self.refs.standardSelect.value)
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
       marksManagerStore.trigger('read_subjects',self.refs.standardSelect.value, self.refs.sectionSelect.value)
      }
    }

    self.readMarksSettings = () => {
      let error = '';
      
      if(self.refs.sectionSelect.value==''){
        error = error + "Please select section, "
      }

      if(self.refs.examTypeSelect.value==''){
        error = error + "Please select exam type "
      }
      
      console.log(self.refs.examTypeSelect.value)
      if(error.length!=0){
        toastr.error(error)
        return
      }else{
        self.loading=true
        marksManagerStore.trigger('read_marks_settings',self.refs.sectionSelect.value, self.refs.examTypeSelect.value)
      }  

    }

    self.openMarksSettingsForm = () => {
      self.title='Add'
      self.action='MarksSettingsForm'
      self.update()
    }

    self.closeMarksSettingsForm = () => {
      self.title=''
      self.action=''
    }

    self.selectIncludeInGrandTotal = () => {
      console.log(self.refs.markingTypeSelect.value)
      if(self.refs.markingTypeSelect.value=='G'){
        self.refs.includeInGrandTotalSelect.value='N'
      }else{
        self.refs.includeInGrandTotalSelect.value='Y'
      }
      // self.update()
    }

    self.add = () => {
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

      if(self.refs.maxMarksInput.value==''){
        error = error + "Please enter max marks, "
      }

      if(self.refs.minMarksInput.value==''){
        error = error + "Please enter min marks, "
      }

      if(Number(self.refs.maxMarksInput.value)<Number(self.refs.minMarksInput.value)){
        error = error + "Min marks can not be greater than max marks "
      }

      if(error.length!=0){
        toastr.error(error)
        return
      }else{
        var obj = {}
        obj['section_id'] = self.refs.sectionSelect.value
        obj['exam_id'] = self.refs.examTypeSelect.value
        obj['subject_id'] = self.refs.subjectSelect.value
        obj['date_of_exam'] = convertDate(self.refs.examDateInput.value)
        obj['marking_type'] = self.refs.markingTypeSelect.value
        obj['grand_total'] = self.refs.includeInGrandTotalSelect.value
        obj['max_marks'] = self.refs.maxMarksInput.value
        obj['min_marks'] = self.refs.minMarksInput.value
        obj['show_in'] = self.refs.showInSelect.value
        obj['details'] = self.refs.detailsInput.value

        self.loading = true
        if(self.title=='Add'){
          marksManagerStore.trigger('add_marks_settings', obj)
        }else if(self.title=='Update'){
          marksManagerStore.trigger('update_grade_settings', obj, self.edit_id)
        }
      }  

    }

    self.edit = (c,e) => {
      self.title='Update'
      self.action='MarksSettingsForm'
      self.refs.subjectSelect.value = c.subject_id
      self.refs.examDateInput.value = c.exam_date
      self.refs.markingTypeSelect.value = c.marking_type
      self.refs.includeInGrandTotalSelect.value = c.grand_total
      self.refs.maxMarksInput.value = c.max_marks
      self.refs.minMarksInput.value = c.min_marks
      self.refs.showInSelect.value = c.show_in
      self.refs.detailsInput.value = c.details
      self.edit_id = c.marks_id

      console.log(self.refs.examDateInput.value)

      self.update()
    }

   self.cancelOperation = (e) => {
      self.marksSettings.map(c => {
          c.confirmDelete = false
          c.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.marksSettings.map(c => {
        if(c.marks_id != e.item.c.marks_id){
          c.confirmDelete = false
        }else{
          c.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      marksManagerStore.trigger('delete_marks_settings', e.item.c.marks_id)
    }


    // ****************************************** all change metods *************************************

    marksManagerStore.on('read_classes_changed',ClassesChanged)
    function ClassesChanged(classes){
      self.loading = false
      self.classes = []
      self.classes = classes
      self.update()
      console.log(self.classes)
    }

    marksManagerStore.on('read_section_changed',SectionChanged)
    function SectionChanged(sections){
      self.loading = false
      self.sections = []
      self.sections = sections
      self.update()
    }

    marksManagerStore.on('exam_types_changed',ExamTypesChanged)
    function ExamTypesChanged(examTypes){
      self.loading = false
      self.examTypes = []
      self.examTypes = examTypes
      self.update()
    }

    marksManagerStore.on('subjects_changed',SubjectsChanged)
    function SubjectsChanged(subjects){
      self.loading = false
      self.subjects = []
      self.subjects = subjects
      self.update()
    }

    marksManagerStore.on('marks_settings_changed',MarksSettingssChanged)
    function MarksSettingssChanged(marksSettings){
      self.loading = false
      self.marksSettings = []
      self.marksSettings = marksSettings
      self.update()
    }

    marksManagerStore.on('add_marks_settings_changed',AddMarksSettingsChanged)//update changes calls the same method
    function AddMarksSettingsChanged(marksSettings){
      self.refs.maxMarksInput.value=''
      self.refs.minMarksInput.value=''
      self.refs.examDateInput.value=''
      self.refs.detailsInput.value=''
      self.closeMarksSettingsForm()
      self.loading = false
      self.readMarksSettings()
    }

    marksManagerStore.on('delete_marks_settings_changed',DeleteMarksSettingsChanged)
    function DeleteMarksSettingsChanged(marksSettings){
      self.loading = false
      self.marksSettings = []
      self.marksSettings = marksSettings
      self.update()
    }

</script>
</marks-manager>