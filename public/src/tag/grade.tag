<grade>
<loading-bar if={loading}></loading-bar>  
	<section class=" is-fluid" show={view=='grades'}>

    <div class="level">
      <div class="level-left">
        <h2 class="title" style="color: #ff3860;">Grade</h2>
      </div>
      <div class="level-right">
        <button class="button is-warning is-rounded" onclick={openGradeModal}>
        <span class="icon">
          <span class="fas fa-plus"></span>
        </span>
        </button>

        <button class="button is-warning is-rounded" onclick={readGrade} style="margin-left:2px">
        <span class="icon">
          <span class="fas fa-sync-alt"></span>
        </span>
        </button>
      </div>
    </div>

    <div class="box">
      <div class="columns">

        <div class="column is-narrow"><label class="label">Exam Scheme</label></div>  
        <div class="column">  
          <div class="control">
            <div class="select is-fullwidth">
              <select ref="examSchemeSelect" onchange={readExamType}>
                <option value="">Select Exam Scheme</option>
                <option each={examSchemes} value={scheme_id}>{scheme_name}</option>
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

        <div class="column">
          <button class="button is-danger has-text-weight-bold" onclick={readGrade}>GO </button>
        </div>
          
      </div>
    </div>  

		<table class="table is-fullwidth is-striped is-hoverable">
			<thead>
				<tr>
					<th class="slno">SL</th>
          <th>Max Marks</th>
          <th>Min Marks</th>
					<th>Grade</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr each={c, i in grades}>
					<td>{i+1 }</td>
          <td>{c.max_marks}</td>
          <td>{c.min_marks}</td>
					<td>{c.grade}</td>
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

  <!-- Open Grade Modal Start -->
  <div id="gradeModal" class="modal ">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{title} Grade</p>
      </header>
      <section class="modal-card-body">
        
        <div class="columns">

          <div class="column">

            <div class="field">
              <div class="control">
                <label class="label" for="role">Max Marks</label>
                <input class="input" type="text" ref="maxMarkInput" >
              </div>
            </div>

            <div class="field">
              <div class="control">
                <label class="label" for="role">Min Marks</label>
                <input class="input" type="text" ref="minMarkInput" >
              </div>
            </div>

            <div class="field">
              <div class="control">
                <label class="label" for="role">Grade</label>
                <input class="input" type="text" ref="gradeInput" >
              </div>
            </div>
          </div>
        </div>

      </section>
      <footer class="modal-card-foot">
        <button class="button is-danger" onclick={add} >{title}</button>
        <button class="button" id="item-modal-close" onclick={closeGradeModal}>Cancel</button>
      </footer>
    </div>
  </div>
  <!-- Grade Modal End -->
  

	<script>
	var self = this
    self.on("mount", function(){
      self.title = 'Add'
      self.view = 'grades'
      self.loading = false;
      self.update()
      self.readExamScheme()
    })
    self.on("unmount", function(){
      gradeStore.on('exam_scheme_changed',ExamSchemeChanged)
      gradeStore.off('exam_type_changed',ExamTypeChanged)
      gradeStore.off('add_grade_changed',AddGradeChanged)
      gradeStore.off('delete_grade_changed',DeleteGradeChanged)
    })

    self.readExamScheme = () => {
       self.loading = true;
       gradeStore.trigger('read_exam_schemes')
    }

    self.readExamType = () => {
       if(self.refs.examSchemeSelect.value==''){
        toastr.info("Please select exam scheme and try again")
       }else{
         self.loading = true;
         gradeStore.trigger('read_exam_types',self.refs.examSchemeSelect.value)
       }
    }

    self.readGrade = () => {
      let error = '';

      console.log(error.length)
      
      if(self.refs.examSchemeSelect.value==''){
        error = error + "Please select exam scheme, "
      }

      if(self.refs.examTypeSelect.value==''){
        error = error + "Please select exam type "
      }

      if(error.length!=0){
        toastr.error(error)
        return
      }else{
        gradeStore.trigger('read_grades',self.refs.examSchemeSelect.value, self.refs.examTypeSelect.value)
      }  

    }

    self.openGradeModal = () => {
      let error = '';

      if(self.refs.examSchemeSelect.value==''){
        error = error + "Please select exam scheme, "
      }

      if(self.refs.examTypeSelect.value==''){
        error = error + "Please select exam type "
      }

      if(error.length!=0){
        toastr.error(error)
        return
      }else{
        self.title = 'Add'
        $("#gradeModal").addClass("is-active");
      }
    }

    self.closeGradeModal = () => {
      $("#gradeModal").removeClass("is-active");
    }

    self.add = () => {
      let error = '';

      if(self.refs.maxMarkInput.value==''){
        error = error + "Please enter max marks, "
      }

      if(self.refs.minMarkInput.value==''){
        error = error + "Please enter min marks, "
      }

      if(self.refs.gradeInput.value==''){
        error = error + "Please enter grade, "
      }

      if(Number(self.refs.maxMarkInput.value)<Number(self.refs.minMarkInput.value)){
        error = error + "Min marks can not be greater than max marks "
      }

      if(error.length!=0){
        toastr.error(error)
        return
      }else{
        var obj = {}
        obj['scheme_id'] = self.refs.examSchemeSelect.value
        obj['exam_id'] = self.refs.examTypeSelect.value //exam_id as exam_type_id
        obj['max_marks'] = self.refs.maxMarkInput.value
        obj['min_marks'] = self.refs.minMarkInput.value
        obj['grade'] = self.refs.gradeInput.value

        self.loading = true
        if(self.title=='Add'){
          gradeStore.trigger('add_grade', obj)
        }else if(self.title=='Update'){
          gradeStore.trigger('update_grade', obj, self.edit_id)
        }
      }  

    }

    self.edit = (c,e) => {
      console.log(c)
      self.title='Update'
      $("#gradeModal").addClass("is-active");
      self.refs.maxMarkInput.value = c.max_marks
      self.refs.minMarkInput.value = c.min_marks
      self.refs.gradeInput.value = c.grade
      self.edit_id = c.grade_id
    }

    self.cancelOperation = (e) => {
      self.grades.map(c => {
          c.confirmDelete = false
          c.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.grades.map(c => {
        if(c.grade_id != e.item.c.grade_id){
          c.confirmDelete = false
        }else{
          c.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      gradeStore.trigger('delete_grade', e.item.c.grade_id)
    }


    // ****************************************** all change metods *************************************

    gradeStore.on('exam_scheme_changed',ExamSchemeChanged)
    function ExamSchemeChanged(examSchemes){
      self.loading = false
      self.examSchemes = []
      self.examSchemes = examSchemes
      self.update()
      console.log(self.examSchemes)
    }

    gradeStore.on('exam_type_changed',ExamTypeChanged)
    function ExamTypeChanged(examTypes){
      self.loading = false
      self.examTypes = []
      self.examTypes = examTypes
      self.update()
      console.log(self.examTypes)
    }

    gradeStore.on('grades_changed',GradesChanged)
    function GradesChanged(grades){
      self.loading = false
      self.grades = []
      self.grades = grades
      self.update()
      console.log(self.grades)
    }

    gradeStore.on('add_grade_changed',AddGradeChanged)//update changes calls the same method
    function AddGradeChanged(grades){
      self.refs.maxMarkInput.value=''
      self.refs.minMarkInput.value=''
      self.refs.gradeInput.value=''
      self.closeGradeModal()
      self.loading = false
      self.grades = []
      self.grades = grades
      self.update()
      console.log(self.grades)
    }

    gradeStore.on('delete_grade_changed',DeleteGradeChanged)
    function DeleteGradeChanged(grades){
      self.loading = false
      self.grades = []
      self.grades = grades
      self.update()
      console.log(self.grades)
    }



</script>
</grade>