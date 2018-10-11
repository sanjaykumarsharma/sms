<mentor-case>
	<section class=" is-fluid">
		<h2 class="title has-text-centered" style="color: #ff3860;">Mentor Case Management Console</h2>
		<div class="flex items-center mt-2 mb-6 no-print">
			<div class="bg-green py-1 rounded w-10">
				<div class="bg-grey h-px flex-auto"></div>
			</div>
		</div>
		<div class="box">
			<div class="columns">
				<div class="column is-narrow">
					<label class="label">Category</label>
				</div>
				<div class="column is-narrow">
					<div class="control">
						<div class="select">
							<select ref="category_id">
								<option each={categories} value={category_id}>{category_name}
	              				</option>
							</select>
						</div>
					</div>
				</div>
				<div class="column is-narrow">
					<label class="label">Case</label>
				</div>
				<div class="column is-half">
					<div class="control">
						<input class=" input"
						  ref="addCaseInput" type="text">
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
					<th>Category</th>
					<th>Case</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr each={ca, i in mentor_case}>
					<td>{ i+1 }</td>
					<td>{ ca.category_name}</td>
					<td>{ ca.case_name}</td>
		          	<td class="has-text-right">
            			<div class="inline-flex rounded border border-grey overflow-hidden" hide={ca.confirmDelete}>
              				<span><a class="button is-small is-rounded" onclick={edit.bind(this, ca)}>Edit</a></span>
              				<span if={role=='ADMIN'}> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick={confirmDelete}>Delete</a></span>
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
      self.role = getCookie('role')
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
    })

    //read courses
    self.readCategories = () => {
       mentorcaseStore.trigger('read_categories')
    }

    //read case
    self.readCase = () => {
       mentorcaseStore.trigger('read_case')
    }

     self.add = () => {
      if(!self.refs.addCaseInput.value){
        toastr.info("Please enter Case and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          console.log('create')
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
      self.refs.addCaseInput.value = ca.case_name
      self.refs.category_id.value = ca.category_id
      self.edit_id = ca.case_id
    }
    
    mentorcaseStore.on('add_case_changed',AddCaseChanged)
    function AddCaseChanged(mentor_case){
      console.log(mentor_case) 
      self.title='Create'
      self.refs.addCaseInput.value = ''
      self.mentor_case = mentor_case
      self.update()
      self.readCase()
      console.log(self.mentor_case)
    }

    mentorcaseStore.on('edit_case_changed',EditCaseChanged)
    function EditCaseChanged(mentor_case){
      console.log(mentor_case) 
      self.title='Create'
      self.refs.addCaseInput.value = ''
      self.mentor_case = mentor_case
      self.update()
      self.readCase()
      console.log(self.mentor_case)
    }

    mentorcaseStore.on('delete_case_changed',DeleteCaseChanged)
    function DeleteCaseChanged(mentor_case){
      console.log(mentor_case) 
      self.title='Create'
      self.loading = false
      self.mentor_case = mentor_case
      self.update()
      self.readCase()
      console.log(self.mentor_case)
    }

    mentorcaseStore.on('read_case_changed',ReadCaseChanged)
    function ReadCaseChanged(mentor_case){
      console.log(mentor_case) 
      self.title='Create'
      self.refs.addCaseInput.value = ''
      self.loading = false
      self.mentor_case = mentor_case
      self.update()
    }

    mentorcaseStore.on('read_categories_changed',CategoriesChanged)
    function CategoriesChanged(categories){
      console.log(categories) 
      self.categories = categories
      self.update()
      console.log(self.categories)
    }

</script>
</mentor-case>