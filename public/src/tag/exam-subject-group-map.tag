<subject-group-map>
<loading-bar if={loading}></loading-bar>  
	<section class=" is-fluid" show={view=='subject-group-maps'}>

    <div class="level">
      <div class="level-left">
        <h2 class="title" style="color: #ff3860;">Subject Group</h2>
      </div>
      <div class="level-right">
        <button class="button is-warning is-rounded" onclick={openSubjectGroupModal}>
        <span class="icon">
          <span class="fas fa-plus"></span>
        </span>
        </button>

        <button class="button is-warning is-rounded" onclick={readSubjectGroupMap} style="margin-left:2px">
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
					<th>Subject Group</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr each={c, i in subjectGroupMaps}>
					<td>{ i+1 }</td>
					<td>{ c.subject_group}</td>
        	<td class="has-text-right">
      			<div class="inline-flex rounded border border-grey overflow-hidden" hide={c.confirmDelete}>
        				<span><a class="button is-small is-rounded" onclick={edit.bind(this, c)}>Edit</a></span>
                <span><a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick={confirmDelete}>Delete</a></span>
        				<span><a class="button is-small is-rounded" rel="nofollow" onclick={readSubjects.bind(this, c)}>Subjects</a></span>
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

  <!-- Open Subject Group Modal Start -->
  <div id="subjectGroupModal" class="modal ">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{title} Subject Group</p>
      </header>
      <section class="modal-card-body">
        
        <div class="columns">
          <div class="column">
            <div class="field">
              <label class="label" for="role">Subject Group</label>
              <div class="control">
                <input class="input" type="text" ref="subjectGroupInput" >
              </div>
            </div>
          </div>
        </div>

      </section>
      <footer class="modal-card-foot">
        <button class="button is-danger" onclick={add} >{title}</button>
        <button class="button" id="item-modal-close" onclick={closeSubjectGroupModal}>Cancel</button>
      </footer>
    </div>
  </div>
  <!-- Subject Group Modal End -->


  <!-- ***************************************************Subjects Start************************************************ -->


  <section class=" is-fluid" show={view=='subjects'}>

    <div class="level">
      <div class="level-left">
        <h2 class="title" style="color: #ff3860;">Subjects Under : {subject_group}</h2>
      </div>
      <div class="level-right">
        <button class="button is-warning is-rounded" onclick={backToSubjectGroupMap}>
        <span class="icon">
          <span class="fas fa-arrow-left"></span>
        </span>
        </button>
        <button class="button is-warning is-rounded ml5" onclick={refreshSubjects}>
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
                <th>Free Subjects</th>
                <th>Short Name</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr each={c, i in freeSubjects}>
                <td>{i+1 }</td>
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
                <button class="button" onclick={assignSubjects} style="margin-top:20px;">Assign subjects  <span style="margin-left:10px" class="fas fa-angle-double-right"></span></button>
              </td>
            </tr>
            <tr>
              <td>
                <button class="button" onclick={freeUpStandard} style="margin-top:20px;"><span style="margin-right:10px;" class="fas fa-angle-double-left"></span> Free up subjects</button>
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
                <th>Assigned Subjects</th>
                <th>Short Name</th>
              </tr>
            </thead>
            <tbody>
              <tr each={c, i in assignedSubjects}>
                <td class="has-text-right">
                  <input type="checkbox" checked={selected} id="{'assignedSubjectCheckBox'+c.subject_id}" onclick={selectAssigndSubject.bind(this,c)} > 
                </td>
                <td>{i+1 }</td>
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
      self.view = 'subject-group-maps'
      self.loading = false;
      self.update()
      flatpickr(".date", {
        allowInput: true,
        dateFormat: "d/m/Y",
      })
      self.readSubjectGroupMap()
    })
    self.on("unmount", function(){
      examSubjectGroupMapStore.off('subject_group_changed', SubjectGroupMapChanged)
      examSubjectGroupMapStore.off('add_subject_group_changed',AddSubjectGroupMapChanged)
      examSubjectGroupMapStore.off('delete_subject_group_changed',DeleteSubjectGroupMapChanged)
      examSubjectGroupMapStore.off('read_subjects_changed',ReadSubjectsChanged)
      examSubjectGroupMapStore.off('assign_subjects_changed',AssignStandardChanged)
    })

    //read courses
    self.readSubjectGroupMap = () => {
       self.loading = true;
       examSubjectGroupMapStore.trigger('read_subject_groups')
    }

    self.openSubjectGroupModal = () => {
      self.title = 'Add'
      $("#subjectGroupModal").addClass("is-active");
    }

    self.closeSubjectGroupModal = () => {
      $("#subjectGroupModal").removeClass("is-active");
    }

    self.add = () => {
      if(!self.refs.subjectGroupInput.value){
        toastr.info("Please enter Subject Group and try again")
      }else{
        self.loading = true
        if(self.title=='Add'){
          examSubjectGroupMapStore.trigger('add_subject_group', self.refs.subjectGroupInput.value)
        }else if(self.title=='Update'){
          examSubjectGroupMapStore.trigger('update_subject_group', self.refs.subjectGroupInput.value,self.edit_id)
        }
      }
    }

    self.edit = (c,e) => {
      console.log(c)
      self.title='Update'
      $("#subjectGroupModal").addClass("is-active");
      self.refs.subjectGroupInput.value = c.subject_group
      self.edit_id = c.id
    }

    self.cancelOperation = (e) => {
      self.subjectGroupMaps.map(c => {
          c.confirmDelete = false
          c.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.subjectGroupMaps.map(c => {
        if(c.id != e.item.c.id){
          c.confirmDelete = false
        }else{
          c.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      examSubjectGroupMapStore.trigger('delete_subject_group', e.item.c.id)
    }


    // ****************************************** subjects *************************************
    
    self.readSubjects = (c) => {
      self.subject_group = c.subject_group
      self.id = c.subject_group
      self.loading = true
      examSubjectGroupMapStore.trigger('read_subjects', c.subject_group)
    }

    self.refreshSubjects = () =>{
      self.loading = true
      examSubjectGroupMapStore.trigger('read_subjects', self.id) 
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
          if(subject.subject_id==i.subject_id){
            i.selected=!i.selected
          }
        })
        console.log(self.assignedSubjects)
    }

    self.assignSubjects = () =>{
      let subjects_to_assign = self.freeSubjects.filter(c=>{
        return c.selected == true
      })
      console.log(self.id)
      console.log(subjects_to_assign)
      self.loading = true
      examSubjectGroupMapStore.trigger('assign_subjects', self.id, subjects_to_assign)
    }

    self.freeUpStandard = () =>{
      let subjects_to_free = self.assignedSubjects.filter(c=>{
        return c.selected == true
      })

      examSubjectGroupMapStore.trigger('free_up_subject', self.id, subjects_to_free)
    }
    self.backToSubjectGroupMap = () =>{
      self.view='subject-group-maps'
    }

    // ****************************************** all change metods *************************************

    examSubjectGroupMapStore.on('subject_group_changed',SubjectGroupMapChanged)
    function SubjectGroupMapChanged(subjectGroupMaps){
      console.log(subjectGroupMaps) 
      self.loading = false
      self.subjectGroupMaps = []
      self.subjectGroupMaps = subjectGroupMaps
      self.update()
      console.log(self.subjectGroupMaps)
    }

    examSubjectGroupMapStore.on('add_subject_group_changed',AddSubjectGroupMapChanged)
    function AddSubjectGroupMapChanged(subjectGroupMaps){
      self.refs.subjectGroupInput.value=''
      self.closeSubjectGroupModal()
      self.loading = false
      self.subjectGroupMaps = []
      self.subjectGroupMaps = subjectGroupMaps
      self.update()
      console.log(self.subjectGroupMaps)
    }

    examSubjectGroupMapStore.on('delete_subject_group_changed',DeleteSubjectGroupMapChanged)
    function DeleteSubjectGroupMapChanged(subjectGroupMaps){
      self.loading = false
      self.subjectGroupMaps = []
      self.subjectGroupMaps = subjectGroupMaps
      self.update()
      console.log(self.subjectGroupMaps)
    }

   /************************************************ Subjects Changed Method ************************************************/
    examSubjectGroupMapStore.on('read_subjects_changed',ReadSubjectsChanged)
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

    examSubjectGroupMapStore.on('assign_subjects_changed',AssignStandardChanged)
    function AssignStandardChanged(subjects_assigned){
      self.loading = false

      self.refreshSubjects()
      
    }


</script>
</subject-group-map>