<subject>
  <print-header></print-header> 
  <loading-bar if={loading}></loading-bar>  
	<section class=" is-fluid">
      <h2 class="title has-text-centered" style="color: #ff3860;">Subject Details</h2>
	<!-- <div class="level">
        <div class="level-left">
          <h2 class="title has-text-centered" style="color: #ff3860;">Subject Details</h2>
        </div>
        <div class="level-right no-print">
          <button class="button is-warning is-rounded" onclick={readSubject} style="margin-left:2px">
          <span class="icon">
            <span class="fas fa-sync-alt"></span>
          </span>
          </button>
        </div>
      </div> -->
		<div class="box no-print">
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
              ref="subject_short_name" type="text" style="width:150px" id='subject_short_name'>
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
          <button class="button is-success has-text-weight-bold is-small ml5 is-pulled-right" onclick={downloadCSV} title="Excel Down Load">
              <span class="icon">
                  <i class="far fa-file-excel"></i>
              </span>
          </button>
          <button class="button is-primary has-text-weight-bold is-pulled-right is-small ml5" onclick="window.print()" title="Print">
                  <span class="icon">
                     <i class="fas fa-print"></i>
                 </span>
        </button>
          <button class="button is-warning is-rounded is-pulled-right is-small ml5" onclick={readSubject} style="margin-right:3px;margin-left:2px">
          <span class="icon"><span class="fas fa-sync-alt"></span></span>
        </button>
         <input class="input is-pulled-right" ref="searchSubject" onkeyup={filteredSubject} type="text" style="width:180px;margin-right:5px" placeholder="Search">
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
				<tr each={ev, i in filteredSubjects}>
					<td>{ i+1 }</td>
					<td>{ ev.subject_name}</td>
          <td>{ ev.subject_short_name}</td>
					<td>{ ev.department_name}</td>
		          	<td class="has-text-right no-print">
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
      self.loading=false
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
      subjectStore.off('csv_export_subject_changed',csv_export_subjectChanged)
    })

    self.downloadCSV = () =>{
          subjectStore.trigger('csv_export_Subject')
        //  console.log(obj)
    }

    self.filteredSubject = ()=>{
      self.filteredSubjects = self.subjects.filter(c => {
        return JSON.stringify(c).toLowerCase().indexOf(self.refs.searchSubject.value.toLowerCase())>=0
      })
    } 

    //read courses
    self.readDepartment = () => {
       self.loading=true
       departmentStore.trigger('read_department')
    }

    //read employe_roles
    self.readSubject = () => {
        self.loading=true
       subjectStore.trigger('read_subject')
    }

     self.add = () => {
      if(!self.refs.subject_name.value){
        toastr.info("Please enter Subject and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          self.loading=true
          subjectStore.trigger('add_subject', self.refs.subject_name.value,
           self.refs.subject_short_name.value,self.refs.department_id.value)
         
        }else if(self.title=='Update'){
          self.loading=true
          subjectStore.trigger('edit_subject', self.refs.subject_name.value,
            self.refs.subject_short_name.value, self.refs.department_id.value, self.edit_id)
           //self.readSubject()
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
       document.getElementById("subject_short_name").focus()
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
      self.readSubject()
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
      self.filteredSubjects = subjects
       self.loading=false
      self.update()
      console.log(self.subjects)
    }

    subjectStore.on('csv_export_subject_changed',csv_export_subjectChanged)
    function csv_export_subjectChanged(url){
      var open_url = window.location.origin+url 
      window.open(open_url);
      self.loading = false
      self.update()
    }

</script>
</subject>