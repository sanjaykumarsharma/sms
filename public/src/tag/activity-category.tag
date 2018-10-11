<activity-category>
	<section class=" is-fluid">
		<h2 class="title has-text-centered" style="color: #ff3860;">Activity Category Management</h2>
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
							<input class="input" type="text" ref="addCategoryInput"
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
				<tr each={c, i in categoryDataItems}>
					<td>{ i+1 }</td>
					<td>{ c.category_name}</td>
		          	<td class="has-text-right">
            			<div class="inline-flex rounded border border-grey overflow-hidden" hide={c.confirmDelete}>
              				<span><a class="button is-small is-rounded" onclick={edit.bind(this, c)}>Edit</a></span>
              				<span if={role=='ADMIN'}> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick={confirmDelete}>Delete</a></span>
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
    self.on("mount", function(){
      self.title='Create'
      self.role = getCookie('role')
      self.update()
      self.readCategories()
    })
    self.on("unmount", function(){
      activitycategoryStore.off('categories_changed', CategoriesChanged)
    })

    //read courses
    self.readCategories = () => {
       activitycategoryStore.trigger('read_categories')
    }

     self.add = () => {
      if(!self.refs.addCategoryInput.value){
        toastr.info("Please enter Category and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          console.log('create')
          activitycategoryStore.trigger('add_category', self.refs.addCategoryInput.value)
        }else if(self.title=='Update'){
          console.log('update')
          activitycategoryStore.trigger('edit_category', self.refs.addCategoryInput.value,
            self.edit_id)
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
      self.categories.map(c => {
          c.confirmDelete = false
          c.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.categories.map(c => {
        if(c.category_id != e.item.c.category_id){
          c.confirmDelete = false
        }else{
          c.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      activitycategoryStore.trigger('delete_category', e.item.c.category_id)
    }

    self.edit = (c,e) => {
      console.log(c)
      self.title='Update'
      self.refs.addCategoryInput.value = c.category
      self.edit_id = c.category_id
    }
    
    activitycategoryStore.on('categories_changed',CategoriesChanged)
    function CategoriesChanged(categories){
      console.log(categories) 
      self.title='Create'
      self.refs.addCategoryInput.value = ''
      self.loading = false
      self.categories = categories
       self.categoryDataItems = []
      self.categoryDataItems = categories
      self.update()
      console.log(self.categories)
    }

</script>
</activity-category>