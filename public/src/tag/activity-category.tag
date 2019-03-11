<activity-category>
  <print-header></print-header>
  <loading-bar if={loading}></loading-bar>
	<section class=" is-fluid">
  <h2 class="title has-text-centered is-size-5" style="color: #ff3860;">Activity Category Management</h2>
    <div class="level box no-print">
      <div class="level-left">
        <div class="columns">
          <div class="column is-narrow">
            <label class="label">Category</label>
          </div>
          <div class="column is-full">
            <input class="input" type="text" ref="addCategoryInput" id="addCategoryInput" onkeyup={addEnter}>
          </div>
            <div class="column">
              <button class="button is-danger has-text-weight-bold " onclick={add} > {title} </button>
            </div>
        </div>
      </div>
      <div class="level-right" >
        <div class="control">
          <input class="input" ref="searchActivityCategory" onkeyup={filterActivityCategory} type="text" placeholder="Search By Category">
        </div>
        <button class="button is-link has-text-weight-bold ml5 " onclick={getData}>
          <span class="icon">
            <span class="fas fa-sync-alt"></span>
          </span>
        </button>
        <button class="button is-success has-text-weight-bold  ml5" onclick={csvExport}>
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
		<table class="table is-fullwidth is-striped is-hoverable ">
			<thead>
				<tr>
					<th>SL</th>
					<th>Category</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr each={c, i in filteredActivityCategory}>
					<td>{ i+1 }</td>
					<td>{ c.category_name}</td>
        	<td class="has-text-right">
      			<div class="inline-flex rounded border border-grey overflow-hidden no-print" hide={c.confirmDelete}>
        				<span><a class="button is-small" onclick={edit.bind(this, c)} title="Edit">
                  <i class="fa fa-edit" aria-hidden="true"></i>
                </a></span>
        				<span if={role=='ADMIN'}> <a class="button is-small" rel="nofollow" onclick={confirmDelete} title="Delete">
                  <i class="fa fa-trash" aria-hidden="true"></i>    
                </a></span>
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
      self.loading = false;
      self.role = getCookie('role')
      self.update()
      self.readCategories()
    })
    self.on("unmount", function(){
      activitycategoryStore.off('categories_changed', CategoriesChanged)
      activitycategoryStore.off('csv_export_activity_category_changed',csvActivityCategoryChanged)
    })

    self.readCategories = () => {
       activitycategoryStore.trigger('read_categories')
    }

    self.getData = () =>{
      self.loading = true
      activitycategoryStore.trigger('read_categories')
    }

    self.csvExport = () => {
      activitycategoryStore.trigger('csv_export_activity_category')
    }

    self.add = () => {
      if(!self.refs.addCategoryInput.value){
        toastr.info("Please enter Category and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          activitycategoryStore.trigger('add_category', self.refs.addCategoryInput.value)
        }else if(self.title=='Update'){
          self.loading = true
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
      document.getElementById("addCategoryInput").focus()
      self.refs.addCategoryInput.value = c.category_name
      self.edit_id = c.category_id
    }

    self.filterActivityCategory = ()=>{
      self.filteredActivityCategory = self.categories.filter(c => {
        return JSON.stringify(c).toLowerCase().indexOf(self.refs.searchActivityCategory.value.toLowerCase())>=0
      })
    }
    
    activitycategoryStore.on('categories_changed',CategoriesChanged)
    function CategoriesChanged(categories){
      self.title='Create'
      self.refs.addCategoryInput.value = ''
      self.loading = false
      self.categories = categories
      self.filteredActivityCategory = categories
      self.update()
    }

    activitycategoryStore.on('csv_export_activity_category_changed',csvActivityCategoryChanged)
    function csvActivityCategoryChanged(url){
      var open_url = window.location.origin+url 
      window.open(open_url);
      self.loading = false
      self.update()
    }

</script>
</activity-category>