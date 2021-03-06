<mentor-case>
  <print-header></print-header>
  <loading-bar if={loading}></loading-bar>
	<section class=" is-fluid">
  <h2 class="title has-text-centered is-size-5" style="color: #ff3860;">Mentor Case Management Console</h2>
    <div class="level box no-print">
      <div class="level-left">
        <div class="columns">
          <div class="column is-narrow">
            <label class="label">Category</label>
          </div>
          <div class="column is-narrow">
          <div class="control">
            <div class="select">
              <select ref="category_id" id="category_id">
                <option each={categories} value={category_id}>{category_name}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="column is-narrow">
          <label class="label">Case</label>
        </div>
        <div class="column is-half">
          <div class="control">
            <input class=" input" ref="addCaseInput" id="addCaseInput" type="text">
          </div>
        </div>
          <div class="column">
            <button class="button is-danger has-text-weight-bold " onclick={add} > {title} </button>
          </div>
        </div>
      </div>
      <div class="level-right" >
        <div class="control">
          <input class="input" ref="searchMentorCase" onkeyup={filterMentorCase} type="text" placeholder="Search By Case">
        </div>
        <button class="button is-link has-text-weight-bold ml5 " onclick={getData}>
          <span class="icon">
            <span class="fas fa-sync-alt"></span>
          </span>
        </button>
        <button class="button is-success has-text-weight-bold  ml5" onclick={downloadCSV}>
          <span class="icon">
            <i class="far fa-file-excel"></i>
          </span>
        </button>
        <button class="button is-primary has-text-weight-bold  ml5" onclick="window.print()">
          <span class="icon">
            <i class="fas fa-print"></i>
          </span>
        </button>
      </div>
    </div>
		<table class="table is-fullwidth is-striped is-hoverable">
			<thead>
				<tr>
					<th>SL</th>
					<th>Category</th>
					<th>Case</th>
					<th class="no-print" style="width:140px;"></th>
				</tr>
			</thead>
			<tbody>
				<tr each={ca, i in filteredMentorCase}>
					<td>{ i+1 }</td>
					<td>{ ca.category_name}</td>
					<td>{ ca.case_name}</td>
        	<td class="has-text-right no-print">
      			<div class="inline-flex rounded border border-grey overflow-hidden" hide={ca.confirmDelete}>
        				<span><a class="button is-small" onclick={edit.bind(this, ca)} title="Edit">
                  <i class="fa fa-edit" aria-hidden="true"></i>  
                </a></span>
        				<span if={role=='ADMIN'}> <a class="button is-small" rel="nofollow" onclick={confirmDelete} title="Delete">
                  <i class="fa fa-trash" aria-hidden="true"></i>
                </a></span>
      			</div>
      			<div class="table-buttons" if={ca.confirmDelete}>
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
      self.loading = false
      self.role = getCookie('role')
      /*document.getElementById("addCaseInput").focus()*/
      self.update()
      self.readCategories()
      self.readCase()
    })
    self.on("unmount", function(){
      mentorcaseStore.off('add_case_changed', AddCaseChanged)
      mentorcaseStore.off('read_case_changed', ReadCaseChanged)
      mentorcaseStore.off('read_categories_changed',CategoriesChanged)
      mentorcaseStore.off('edit_case_changed',EditCaseChanged)
      mentorcaseStore.off('delete_case_changed',DeleteCaseChanged)
      mentorcaseStore.off('csv_export_mentor_case_changed',csvMentorCaseChanged)
    })

    //read courses
    self.readCategories = () => {
       mentorcaseStore.trigger('read_categories')
    }
    //read case
    self.readCase = () => {
       mentorcaseStore.trigger('read_case')
    }
    self.getData = () =>{
      self.loading = true
      mentorcaseStore.trigger('read_case')
    }

    self.downloadCSV = () => {
      mentorcaseStore.trigger('csv_export_mentor_case',self.mentor_case)
    }
     self.add = () => {
      if(!self.refs.addCaseInput.value){
        toastr.info("Please enter Case and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          mentorcaseStore.trigger('add_case', self.refs.addCaseInput.value,
           self.refs.category_id.value)
        }else if(self.title=='Update'){
          console.log('update')
          mentorcaseStore.trigger('edit_case', self.refs.addCaseInput.value,
            self.refs.category_id.value, self.edit_id)
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
      self.mentor_case.map(ca => {
          ca.confirmDelete = false
          ca.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.mentor_case.map(ca => {
        if(ca.case_id != e.item.ca.case_id){
          ca.confirmDelete = false
        }else{
          ca.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      mentorcaseStore.trigger('delete_case', e.item.ca.case_id)
    }

    self.edit = (ca,e) => {
      console.log(ca)
      self.title='Update'
      document.getElementById("addCaseInput").focus()
      self.refs.addCaseInput.value = ca.case_name
      self.refs.category_id.value = ca.category_id
      self.edit_id = ca.case_id
    }

    self.filterMentorCase = ()=>{
      self.filteredMentorCase = self.mentor_case.filter(c => {
        return JSON.stringify(c).toLowerCase().indexOf(self.refs.searchMentorCase.value.toLowerCase())>=0
      })
    }
    
    mentorcaseStore.on('add_case_changed',AddCaseChanged)
    function AddCaseChanged(mentor_case){
      console.log(mentor_case) 
      self.title='Create'
      self.refs.addCaseInput.value = ''
      self.mentor_case = mentor_case
      self.update()
      self.readCase()
      self.readCategories()
    }

    mentorcaseStore.on('edit_case_changed',EditCaseChanged)
    function EditCaseChanged(mentor_case){
      console.log(mentor_case) 
      self.title='Create'
      self.refs.addCaseInput.value = ''
      self.mentor_case = mentor_case
      self.update()
      self.readCase()
      self.readCategories()
    }

    mentorcaseStore.on('delete_case_changed',DeleteCaseChanged)
    function DeleteCaseChanged(mentor_case){
      console.log(mentor_case) 
      self.title='Create'
      self.loading = false
      self.mentor_case = mentor_case
      self.update()
      self.readCase()
      self.readCategories()
    }

    mentorcaseStore.on('read_case_changed',ReadCaseChanged)
    function ReadCaseChanged(mentor_case){
      self.title='Create'
      self.refs.addCaseInput.value = ''
      self.loading = false
      self.mentor_case = mentor_case
      self.filteredMentorCase = mentor_case
      self.update()
    }

    mentorcaseStore.on('read_categories_changed',CategoriesChanged)
    function CategoriesChanged(categories){
      console.log(categories) 
      self.categories = categories
      self.update()
      console.log(self.categories)
    }

    mentorcaseStore.on('csv_export_mentor_case_changed',csvMentorCaseChanged)
    function csvMentorCaseChanged(url){
      var open_url = window.location.origin+url 
      window.open(open_url);
      self.loading = false
      self.update()
     }

</script>
</mentor-case>