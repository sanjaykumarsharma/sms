<exam-scheme>
<loading-bar if={loading}></loading-bar>  
	<section class=" is-fluid" show={view=='exam-schemes'}>

    <div class="level">
      <div class="level-left">
        <h2 class="title" style="color: #ff3860;">Exam Scheme</h2>
      </div>
      <div class="level-right">
        <button class="button is-warning is-rounded" onclick={openExamSchemeModal}>
        <span class="icon">
          <span class="fas fa-plus"></span>
        </span>
        </button>

        <button class="button is-warning is-rounded" onclick={readExamSchemes} style="margin-left:2px">
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
					<th>Scheme Name</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr each={c, i in examSchemes}>
					<td>{ i+1 }</td>
					<td>{ c.scheme_name}</td>
        	<td class="has-text-right">
      			<div class="inline-flex rounded border border-grey overflow-hidden" hide={c.confirmDelete}>
        				<span><a class="button is-small is-rounded" onclick={edit.bind(this, c)}>Edit</a></span>
                <span><a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick={confirmDelete}>Delete</a></span>
                <span><a class="button is-small is-rounded" rel="nofollow" onclick={readExams.bind(this, c)}>Exams</a></span>
        				<span><a class="button is-small is-rounded" rel="nofollow" onclick={readClasses.bind(this, c)}>Classes</a></span>
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

  <!-- Open Exam Scheme Modal Start -->
  <div id="examSchemeModal" class="modal ">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{title} Exam Scheme</p>
      </header>
      <section class="modal-card-body">
        
        <div class="columns">
          <div class="column">
            <div class="field">
              <label class="label" for="role">Exam Scheme</label>
              <div class="control">
                <input class="input" type="text" ref="schemeNameInput" >
              </div>
            </div>
          </div>
        </div>

      </section>
      <footer class="modal-card-foot">
        <button class="button is-danger" onclick={add} >{title}</button>
        <button class="button" id="item-modal-close" onclick={closeExamSchemeModal}>Cancel</button>
      </footer>
    </div>
  </div>
  <!-- Exam Scheme Modal End -->


  <!-- ***************************************************Exams Start************************************************ -->

  <section class=" is-fluid" show={view=='exams'}>

    <div class="level">
      <div class="level-left">
        <h2 class="title" style="color: #ff3860;">Exam Under : {exam_scheme}</h2>
      </div>
      <div class="level-right">
        <button class="button is-warning is-rounded" onclick={backToExamSchemes}>
        <span class="icon">
          <span class="fas fa-arrow-left"></span>
        </span>
        </button>

        <button class="button is-warning is-rounded" onclick={openExamsForm} style="margin-left:2px">
        <span class="icon">
          <span class="fas fa-plus"></span>
        </span>
        </button>

        <button class="button is-warning is-rounded" onclick={refreshExams} style="margin-left:2px">
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
          <th>Exam</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Last Login Date</th>
          <th>Assessment Type</th>
          <th>Exam Group</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr each={c, i in exams}>
          <td>{ i+1 }</td>
          <td>{ c.exam_type}</td>
          <td>{ c.start_date}</td>
          <td>{ c.end_date}</td>
          <td>{ c.last_login_date}</td>
          <td>{ c.assessment}</td>
          <td>{ c.exam_group}</td>
          <td class="has-text-right">
            <div class="inline-flex rounded border border-grey overflow-hidden" hide={c.confirmDelete}>
                <span><a class="button is-small is-rounded" onclick={editExam.bind(this, c)}>Edit</a></span>
                <span><a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick={confirmExamDelete}>Delete</a></span>
            </div>
            <div class="table-buttons" if={c.confirmDelete}>
                <span disabled={loading} class="button is-small is-rounded" onclick={deleteExam}><i class="fa fa-check" ></i></span>
                <span disabled={loading} class="button is-small  has-text-danger is-rounded" onclick={cancelExamDeleteOperation}><i class="fa fa-times"></i></span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </section>

  <section class=" is-fluid" show={view=='exams-form'}>

    <div class="level">
      <div class="level-left">
        <h2 class="title" style="color: #ff3860;">{title_exams} Exam Under : {exam_scheme}</h2>
      </div>
      <div class="level-right">
        <button class="button is-warning is-rounded" onclick={backToExams}>
        <span class="icon">
          <span class="fas fa-arrow-left"></span>
        </span>
        </button>
      </div>
    </div>

     <div class="columns">

        <div class="column">
          <div class="field">
            <label class="label" for="role">Exam</label>
            <div class="control">
              <input class="input" type="text" ref="examTypeInput" >
            </div>
          </div>
          <div class="field">
            <label class="label" for="role">Start Date</label>
            <div class="control">
              <input class="input date" type="text" ref="startDateInput" >
            </div>
          </div>
        </div>

        <div class="column">
          <div class="field">
            <label class="label" for="role">End Date</label>
            <div class="control">
              <input class="input date" type="text" ref="endDateInput" >
            </div>
          </div>
          <div class="field">
            <label class="label" for="role">Last Login Date</label>
            <div class="control">
              <input class="input date" type="text" ref="lastLoginInput" >
            </div>
          </div>
        </div>
        
        <div class="column">  
          <div class="field">
            <label class="label" for="role">Assessment Type</label>
            <div class="control">
              <div class="select is-fullwidth">
                <select ref="assessmentInput">
                  <option value="H">Half Yearly</option>
                  <option value="F">Final</option>
                </select>
              </div>
            </div>
          </div>
          <div class="field">
            <label class="label" for="role">Exam Group</label>
            <div class="control">
              <div class="select is-fullwidth">
                <select ref="examGroupInput">
                  <option>First</option>
                  <option>Second</option>
                </select>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div class="level">
        <div class="level-left">
          
        </div>
        <div class="level-right">
          <button class="button is-danger" onclick={addEditExam} >{title_exams}</button>
          <button class="button ml5" id="item-modal-close" onclick={backToExams}>Cancel</button>
        </div>
      </div>


  </section>


  <section class=" is-fluid" show={view=='classes'}>

    <div class="level">
      <div class="level-left">
        <h2 class="title" style="color: #ff3860;">Classes Under : {exam_scheme}</h2>
      </div>
      <div class="level-right">
        <button class="button is-warning is-rounded" onclick={backToExamSchemes}>
        <span class="icon">
          <span class="fas fa-arrow-left"></span>
        </span>
        </button>
        <button class="button is-warning is-rounded ml5" onclick={refreshClasses}>
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
                <th class="slno">SL</th>
                <th>Free Classes</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr each={c, i in freeClasses}>
                <td>{i+1 }</td>
                <td>{c.standard}</td>
                <td class="has-text-right">
                  <input type="checkbox" checked={selected} id="{'freeClassCheckBox'+c.standard_id}" onclick={selectFreeClass.bind(this,c)} > 
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="column is-vertical-center is-narrow has-text-centered is-multiline">
          <table>
            <tr>
              <td>
                <button class="button" onclick={assignStandard} style="margin-top:20px;">Assign classes  <span style="margin-left:10px" class="fas fa-angle-double-right"></span></button>
              </td>
            </tr>
            <tr>
              <td>
                <button class="button" onclick={freeUpStandard} style="margin-top:20px;"><span style="margin-right:10px;" class="fas fa-angle-double-left"></span> Free up classes</button>
              </td>
            </tr>
          </table>
        </div>

        <div class="column">
          <table class="table is-fullwidth is-striped is-hoverable">
            <thead>
              <tr>
                <th></th>
                <th class="slno">SL</th>
                <th>Assigned Classes</th>
              </tr>
            </thead>
            <tbody>
              <tr each={c, i in assignedClasses}>
                <td class="has-text-right">
                  <input type="checkbox" checked={selected} id="{'assignedClassCheckBox'+c.standard_id}" onclick={selectAssigndClass.bind(this,c)} > 
                </td>
                <td>{i+1 }</td>
                <td>{c.standard}</td>
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
      self.view = 'exam-schemes'
      self.loading = false;
      self.update()
      flatpickr(".date", {
        allowInput: true,
        dateFormat: "d/m/Y",
      })
      self.readExamSchemes()
    })
    self.on("unmount", function(){
      examSchemeStore.off('exam_scheme_changed', ExamSchemesChanged)
      examSchemeStore.off('add_exam_scheme_changed',AddExamSchemesChanged)
      examSchemeStore.off('delete_exam_scheme_changed',DeleteExamSchemesChanged)
      examSchemeStore.off('read_exams_changed',ExamSChanged)
      examSchemeStore.off('add_exams_changed',ExamsAddChanged)
      examSchemeStore.off('delete_exam_changed',ExamsDeleteChanged)
      examSchemeStore.off('read_classes_changed',ReadClassesChanged)
      examSchemeStore.off('assign_standard_changed',AssignStandardChanged)
    })

    //read courses
    self.readExamSchemes = () => {
       self.loading = true;
       examSchemeStore.trigger('read_exam_schemes')
    }

    self.openExamSchemeModal = () => {
      self.title = 'Add'
      $("#examSchemeModal").addClass("is-active");
    }

    self.closeExamSchemeModal = () => {
      $("#examSchemeModal").removeClass("is-active");
    }

    self.add = () => {
      if(!self.refs.schemeNameInput.value){
        toastr.info("Please enter Exam Scheme and try again")
      }else{
        self.loading = true
        if(self.title=='Add'){
          examSchemeStore.trigger('add_exam_scheme', self.refs.schemeNameInput.value)
        }else if(self.title=='Update'){
          examSchemeStore.trigger('update_exam_scheme', self.refs.schemeNameInput.value,self.edit_id)
        }
      }
    }

    self.edit = (c,e) => {
      console.log(c)
      self.title='Update'
      $("#examSchemeModal").addClass("is-active");
      self.refs.schemeNameInput.value = c.scheme_name
      self.edit_id = c.scheme_id
    }

    self.cancelOperation = (e) => {
      self.examSchemes.map(c => {
          c.confirmDelete = false
          c.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.examSchemes.map(c => {
        if(c.scheme_id != e.item.c.scheme_id){
          c.confirmDelete = false
        }else{
          c.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      examSchemeStore.trigger('delete_exam_scheme', e.item.c.scheme_id)
    }


    /**********************************************exams section start************************************************/
    
    self.readExams = (c,e) => {
      console.log(c)
      self.exam_scheme = c.scheme_name
      self.scheme_id = c.scheme_id
      self.loading = true
      examSchemeStore.trigger('read_exams', c.scheme_id)
    }
    
    self.refreshExams = () =>{
      self.loading = true
      examSchemeStore.trigger('read_exams', self.scheme_id)
    }

    self.openExamsForm = () => {
      self.title_exams = 'Add'
      self.view = 'exams-form'
    }

    self.closeExamsModal = () => {
      $("#examsModal").removeClass("is-active");
    }
    
    self.backToExamSchemes = () => {
      self.view = 'exam-schemes'
    }

    self.backToExams = () => {
      self.view = 'exams'
    }

    self.addEditExam = () =>{
      let error = '';

      console.log(error.length)
      
      if(self.refs.examTypeInput.value==''){
        error = error + "Please Enter Exam, "
      }

      if(self.refs.endDateInput.value==''){
        error = error + "Please Enter End Date, "
      }

      if(self.refs.startDateInput.value==''){
        error = error + "Please Enter Start Date, "
      }

      if(self.refs.assessmentInput.value==''){
        error = error + "Please Enter Assessment Type, "
      }

      if(self.refs.lastLoginInput.value==''){
        error = error + "Please Enter Last Login Date, "
      }

      if(self.refs.examGroupInput.value==''){
        error = error + "Please Enter Exam Group, "
      }

      console.log(error)
      console.log(error.length)
     
      if(error.length!=0){
        toastr.error(error)
        return
      }else{
        var obj = {}
        obj['scheme_id'] = self.scheme_id
        obj['exam_type'] = self.refs.examTypeInput.value
        obj['assessment'] = self.refs.assessmentInput.value
        obj['exam_group'] = self.refs.examGroupInput.value
        obj['start_date'] = convertDate(self.refs.startDateInput.value)
        obj['end_date'] = convertDate(self.refs.endDateInput.value)
        obj['last_login_date'] = convertDate(self.refs.lastLoginInput.value)
        console.log(obj)

        self.loading = true
        if(self.title_exams=='Add'){
          examSchemeStore.trigger('add_exam', obj)
        }else if(self.title_exams=='Update'){
          examSchemeStore.trigger('update_exam', obj,self.edit_exam_type_id)
        }
        
      }

    }

    self.clearExamForm = () => {
      self.refs.examTypeInput.value = ''
      self.refs.endDateInput.value = ''
      self.refs.startDateInput.value = ''
      self.refs.assessmentInput.value = ''
      self.refs.lastLoginInput.value = ''
      self.refs.examGroupInput.value = ''
    }

    self.editExam = (c,e) => {
      console.log(c)
      self.title_exams='Update'
      self.view = 'exams-form'
      self.refs.examTypeInput.value = c.exam_type
      self.refs.endDateInput.value = c.end_date
      self.refs.startDateInput.value = c.start_date
      self.refs.assessmentInput.value = c.assessment
      self.refs.lastLoginInput.value = c.last_login_date
      self.refs.examGroupInput.value = c.exam_group
      self.edit_exam_type_id = c.exam_type_id
    }

    self.cancelExamDeleteOperation = (e) => {
      self.exams.map(c => {
          c.confirmDelete = false
          c.confirmEdit = false
      })
    }

    self.confirmExamDelete = (e) => {
      self.exams.map(c => {
        if(c.exam_type_id != e.item.c.exam_type_id){
          c.confirmDelete = false
        }else{
          c.confirmDelete = true
        }
      })
    }

    self.deleteExam = (e) => {
      self.loading = true
      examSchemeStore.trigger('delete_exam', e.item.c.exam_type_id)
    }

    // ****************************************** classes *************************************
    
    self.readClasses = (c) => {
      self.exam_scheme = c.scheme_name
      self.scheme_id = c.scheme_id
      self.loading = true
      examSchemeStore.trigger('read_classes', c.scheme_id)
    }

    self.refreshClasses = () =>{
      self.loading = true
      examSchemeStore.trigger('read_classes', self.scheme_id) 
    }

    self.selectFreeClass = (standard,e) => {
        self.freeClasses.map(i=>{
          if(standard.standard_id==i.standard_id){
            i.selected=!i.selected
          }
        })
    }

    self.selectAssigndClass = (standard,e) => {
        self.assignedClasses.map(i=>{
          if(standard.standard_id==i.standard_id){
            i.selected=!i.selected
          }
        })
        console.log(self.assignedClasses)
    }

    self.assignStandard = () =>{
      let classes_to_assign = self.freeClasses.filter(c=>{
        return c.selected == true
      })
      self.loading = true
      examSchemeStore.trigger('assign_standard', self.scheme_id, classes_to_assign)
    }

    self.freeUpStandard = () =>{
      let classes_to_free = self.assignedClasses.filter(c=>{
        return c.selected == true
      })

      examSchemeStore.trigger('free_up_standard', self.scheme_id, classes_to_free)
    }

    // ****************************************** all change metods *************************************

    examSchemeStore.on('exam_scheme_changed',ExamSchemesChanged)
    function ExamSchemesChanged(examSchemes){
      console.log(examSchemes) 
      self.loading = false
      self.examSchemes = []
      self.examSchemes = examSchemes
      self.update()
      console.log(self.examSchemes)
    }

    examSchemeStore.on('add_exam_scheme_changed',AddExamSchemesChanged)
    function AddExamSchemesChanged(examSchemes){
      self.refs.schemeNameInput.value=''
      self.closeExamSchemeModal()
      self.loading = false
      self.examSchemes = []
      self.examSchemes = examSchemes
      self.update()
      console.log(self.examSchemes)
    }

    examSchemeStore.on('delete_exam_scheme_changed',DeleteExamSchemesChanged)
    function DeleteExamSchemesChanged(examSchemes){
      self.loading = false
      self.examSchemes = []
      self.examSchemes = examSchemes
      self.update()
      console.log(self.examSchemes)
    }

    /************************************************ Exams Changed Method ************************************************/
    examSchemeStore.on('read_exams_changed',ExamSChanged)
    function ExamSChanged(exams){
      self.loading = false
      self.exams = []
      self.exams = exams
      self.view='exams'
      self.update()
    }

    examSchemeStore.on('add_exam_changed',ExamsAddChanged)
    function ExamsAddChanged(exams){
      self.loading = false
      self.clearExamForm()
      self.view='exams'
      self.exams = []
      self.exams = exams
      self.update()
    }

    examSchemeStore.on('delete_exam_changed',ExamsDeleteChanged)
    function ExamsDeleteChanged(exams){
      self.loading = false
      self.exams = []
      self.exams = exams
      self.update()
    }
   
   /************************************************ Classes Changed Method ************************************************/
    examSchemeStore.on('read_classes_changed',ReadClassesChanged)
    function ReadClassesChanged(freeClasses,assignedClasses){
      self.loading = false
      self.freeClasses = []
      self.freeClasses = freeClasses
      self.freeClasses.map(c => {
          c.selected=false
      })
      console.log(freeClasses)
      self.assignedClasses = []
      self.assignedClasses = assignedClasses
      self.assignedClasses.map(c => {
          c.selected=false
      })
      self.view='classes'
      self.update()
    }

    examSchemeStore.on('assign_standard_changed',AssignStandardChanged)
    function AssignStandardChanged(classes_assigned){
      self.loading = false

      self.refreshClasses()
      
      /*
      //remove from freeClasses
      let newFreeClases = self.freeClasses.filter(fc=>{
          classes_assigned.map(ca=>{
            return fc.standard_id!=ca.standard_id
          })
      })
      self.freeClasses=[]
      self.freeClasses=newFreeClases

      //Add to assignedClasses
      classes_assigned.map(ca=>{
        self.assignedClasses.push(ca)
      })*/
      
    }


</script>
</exam-scheme>