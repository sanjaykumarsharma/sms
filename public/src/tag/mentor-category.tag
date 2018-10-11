<mentor-category>
	<section class=" is-fluid">
		<h2 class="title has-text-centered" style="color: #ff3860;">Mentor Category Management</h2>
		<div class="flex items-center mt-2 mb-6 no-print">
			<div class="bg-green py-1 rounded w-10">
				<div class="bg-grey h-px flex-auto"></div>
			</div>
		</div>
		<div class="box">
			<div class="columns">
				<div class="column is-half">
					<div class="field">
						<label class="label" for="role">Category</label>
						<div class="control">
							<input class="input" type="text" ref="addMentorCategoryInput"
							onkeyup={addEnter}>
						</div>
					</div>
				</div>
				<div class="column is-narrow">
					<div class="field">
						<div class="control">
							<button class="button is-danger has-text-weight-bold adjusted-top"
					         onclick={add} >{title}</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<table class="table is-fullwidth is-striped is-hoverable">
			<thead>
				<tr>
					<th>SL</th>
					<th>Category</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr each={mc, i in mentor_categories}>
					<td>{ i+1 }</td>
					<td>{ mc.category_name}</td>
          	<td class="has-text-right">
        			<div class="inline-flex rounded border border-grey overflow-hidden" hide={mc.confirmDelete}>
          				<span><a class="button is-small is-rounded" onclick={edit.bind(this, mc)}>Edit</a></span>
          				<span if={role=='ADMIN'}> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick={confirmDelete}>Delete</a></span>
        			</div>
        			<div class="table-buttons" if={mc.confirmDelete}>
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
    })
    self.on("unmount", function(){
      mentorcategoryStore.off('mentor_category_changed',MentorCategoryChanged)
    })

    //read Category
    self.readCategories = () => {
       mentorcategoryStore.trigger('read_mentor_category')
    }

     self.add = () => {
      if(!self.refs.addMentorCategoryInput.value){
        toastr.info("Please enter Category and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          console.log('create')
          mentorcategoryStore.trigger('add_mentor_category', self.refs.addMentorCategoryInput.value)
        }else if(self.title=='Update'){
          console.log('update')
          mentorcategoryStore.trigger('edit_mentor_category', self.refs.addMentorCategoryInput.value,self.edit_id)
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
      self.mentor_categories.map(mc => {
          mc.confirmDelete = false
          mc.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.mentor_categories.map(mc => {
        if(mc.category_id != e.item.mc.category_id){
          mc.confirmDelete = false
        }else{
          mc.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      mentorcategoryStore.trigger('delete_mentor_category', e.item.mc.category_id)
    }

    self.edit = (mc,e) => {
      console.log(mc)
      self.title='Update'
      self.refs.addMentorCategoryInput.value = mc.category_name
      self.edit_id = mc.category_id
    }
    
    mentorcategoryStore.on('mentor_category_changed',MentorCategoryChanged)
    function MentorCategoryChanged(mentor_categories){
      console.log(mentor_categories) 
      self.title='Create'
      self.refs.addMentorCategoryInput.value = ''
      self.loading = false
      self.mentor_categories = mentor_categories
      self.update()
      console.log(self.mentor_categories)
    }

</script>
</mentor-category>