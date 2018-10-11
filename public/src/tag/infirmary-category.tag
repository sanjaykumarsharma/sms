<infirmary-category>
	<section class=" is-fluid">
		<h2 class="title has-text-centered" style="color: #ff3860;">Infirmary Category</h2>
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
							<input class="input" type="text" ref="category_name"
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
				<tr each={c, i in infirmaryCategories}>
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
      infirmarycategoryStore.off('categories_changed', CategoriesChanged)
    })

    //read courses
    self.readCategories = () => {
       infirmarycategoryStore.trigger('read_categories')
    }

     self.add = () => {
      if(!self.refs.category_name.value){
        toastr.info("Please enter Category and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          console.log('create')
          infirmarycategoryStore.trigger('add_category', self.refs.category_name.value)
        }else if(self.title=='Update'){
          console.log('update')
          infirmarycategoryStore.trigger('edit_category', self.refs.category_name.value,
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
      self.infirmaryCategories.map(c => {
          c.confirmDelete = false
          c.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.infirmaryCategories.map(c => {
        if(c.category_id != e.item.c.category_id){
          c.confirmDelete = false
        }else{
          c.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      infirmarycategoryStore.trigger('delete_category', e.item.c.category_id)
    }

    self.edit = (c,e) => {
      console.log(c)
      self.title='Update'
      self.refs.category_name.value = c.category_name
      self.edit_id = c.category_id
    }
    
    infirmarycategoryStore.on('categories_changed',CategoriesChanged)
    function CategoriesChanged(infirmaryCategories){
      console.log(infirmaryCategories) 
      self.title='Create'
      self.refs.category_name.value = ''
      self.loading = false
      self.infirmaryCategories = infirmaryCategories
      /*self.categoryDataItems = []
      self.categoryDataItems = infirmaryCategories*/
      self.update()
      console.log(self.infirmaryCategories)
    }

</script>
</infirmary-category>