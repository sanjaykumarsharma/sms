<subject>
	<section class=" is-fluid">
		<h2 class="title" style="color: #ff3860;">Subject</h2>
		<div class="box">
			<div class="columns">
				<div class="column is-narrow">
					<label class="label">Name</label>
				</div>
				<div class="column is-narrow">
					<div class="control">
						<input class=" input"
						  ref="subject_name" type="text">
					</div>
				</div>
        <div class="column is-narrow">
          <label class="label">Short Name</label>
        </div>
        <div class="column is-narrow">
          <div class="control">
            <input class=" input"
              ref="subject_short_name" type="text">
          </div>
        </div>
         <div class="column is-narrow">
          <label class="label">Department</label>
        </div>
        <div class="column is-narrow">
          <div class="control">
            <div class="select">
              <select ref="department_id" onkeyup={addEnter}>
                <option>Select</option>
                <option each={departments} value={department_id}>{department_name}
                </option>
              </select>
            </div>
          </div>
        </div>
				<div class="column">
					<button class="button is-danger has-text-weight-bold"
					onclick={add} >{title}
					</button>
				</div>
			</div>
		</div>
		<table class="table is-fullwidth is-striped is-hoverable">
			<thead>
				<tr>
					<th>SL</th>
					<th>Name</th>
          <th>Short Name</th>
					<th>Department</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr each={ev, i in subjects}>
					<td>{ i+1 }</td>
					<td>{ ev.subject_name}</td>
          <td>{ ev.subject_short_name}</td>
					<td>{ ev.department_name}</td>
		          	<td class="has-text-right">
            			<div class="inline-flex rounded border border-grey overflow-hidden" hide={ev.confirmDelete}>
              				<span><a class="button is-small is-rounded" onclick={edit.bind(this, ev)}>Edit</a></span>
              				<span if={role=='ADMIN'}> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick={confirmDelete}>Delete</a></span>
            			</div>
            			<div class="table-buttons" if={ev.confirmDelete}>
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
    self.on("mount", function(){
      self.title='Create'
      self.role = getCookie('role')
      self.readDepartment()
      self.readSubject()
      self.update()
    })
    self.on("unmount", function(){
      departmentStore.off('departments_changed', DepartmentChanged)
      subjectStore.off('add_subject_changed', AddSubjectChanged)
      subjectStore.off('read_subject_changed',ReadSubjectChanged)
      subjectStore.off('edit_subject_changed',EditSubjectChanged)
      subjectStore.off('delete_subject_changed',DeleteSubjectChanged)
    })

    //read courses
    self.readDepartment = () => {
       departmentStore.trigger('read_department')
    }

    //read employe_roles
    self.readSubject = () => {
       subjectStore.trigger('read_subject')
    }

     self.add = () => {
      if(!self.refs.subject_name.value){
        toastr.info("Please enter Subject and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          console.log('create')
          subjectStore.trigger('add_subject', self.refs.subject_name.value,
           self.refs.subject_short_name.value,self.refs.department_id.value)
        }else if(self.title=='Update'){
          console.log('update')
          subjectStore.trigger('edit_subject', self.refs.subject_name.value,
            self.refs.subject_short_name.value, self.refs.department_id.value, self.edit_id)
        }
      }
    }

    self.addEnter = (e) => {
      if(e.which == 13){
        self.add()
      }
    }

     self.editEnter = (e) => {
      if(e.which == 13){
        self.edit(e)
      }  
    }

   self.cancelOperation = (e) => {
      self.subjects.map(ev => {
          ev.confirmDelete = false
          ev.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.subjects.map(ev => {
        if(ev.subject_id != e.item.ev.subject_id){
          ev.confirmDelete = false
        }else{
          ev.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      subjectStore.trigger('delete_subject', e.item.ev.subject_id)
    }

    self.edit = (ev,e) => {
      console.log(ev)
      self.title='Update'
      self.refs.subject_name.value = ev.subject_name
      self.refs.subject_short_name.value = ev.subject_short_name
      self.refs.department_id.value = ev.department_id
      self.edit_id = ev.subject_id
    }
    
    subjectStore.on('add_subject_changed',AddSubjectChanged)
    function AddSubjectChanged(subjects){
      console.log(subjects) 
      self.title='Create'
      self.refs.subject_name.value = ''
      self.refs.subject_short_name.value = ''
      self.refs.department_id.value = ''
      self.loading = false
      self.subjects = subjects
      self.update()
    }

    subjectStore.on('edit_subject_changed',EditSubjectChanged)
    function EditSubjectChanged(subjects){
      console.log(subjects) 
      self.title='Create'
      self.refs.subject_name.value = ''
      self.refs.subject_short_name.value = ''
      self.refs.department_id.value = ''
      self.loading = false
      self.subjects = subjects
      self.update()
    }

    subjectStore.on('delete_subject_changed',DeleteSubjectChanged)
    function DeleteSubjectChanged(subjects){
      console.log(subjects) 
      self.title='Create'
      self.loading = false
      self.subjects = subjects
      self.update()
    }

    departmentStore.on('departments_changed',DepartmentChanged)
    function DepartmentChanged(departments){
      self.title='Create'
      self.departments = departments
      self.loading = false
      self.update()
    }

    subjectStore.on('read_subject_changed',ReadSubjectChanged)
    function ReadSubjectChanged(subjects){
      console.log(subjects) 
      self.subjects = subjects
      self.update()
      console.log(self.subjects)
    }

</script>
</subject>