<discipline-category>
  <print-header></print-header>
  <loading-bar if={loading}></loading-bar>
	<section class=" is-fluid">
		<h2 class="title has-text-centered is-size-5" style="color: #ff3860;">Discipline Category Management</h2>
		<div class="box no-print">
			<div class="columns">
        <div class="column is-narrow">
          <label class="label" for="role">Category</label>
        </div>
        <div class="column">
          <input class="input" type="text" ref="addDisciplineCategoryInput" id="addDisciplineCategoryInput" onkeyup={addEnter}>
        </div>
        <div class="column">
          <button class="button is-danger has-text-weight-bold " onclick={add} > {title} </button>
        </div>
        <div class="column">
          <button class="button is-success has-text-weight-bold ml5 is-pulled-right" onclick={csvExport}>
            <span class="icon">
              <i class="far fa-file-excel"></i>
            </span>
          </button>
          <button class="button is-primary has-text-weight-bold ml5 is-pulled-right" onclick="window.print()">
            <span class="icon">
              <i class="fas fa-print"></i>
            </span>
          </button>
          <button class="button is-link has-text-weight-bold ml5 is-pulled-right" onclick={getData}>
            <span class="icon">
              <i class="fas fa-sync-alt"></i>
            </span>
          </button>
        </div>
      </div>
		</div>
		<table class="is-hoverable table is-fullwidth is-striped is-hoverable">
			<thead>
				<tr>
					<th>SL</th>
					<th>Category</th>
					<th ></th>
				</tr>
			</thead>
			<tbody>
				<tr each={dc, i in discipline_categories}>
					<td>{ i+1 }</td>
					<td>{ dc.category_name}</td>
          	<td class="has-text-right no-print">
        			<div class="inline-flex rounded border border-grey overflow-hidden" hide={dc.confirmDelete}>
          				<span><a class="button is-small is-rounded" onclick={edit.bind(this, dc)}>Edit</a></span>
          				<span if={role=='ADMIN'}> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick={confirmDelete}>Delete</a></span>
        			</div>
        			<div class="table-buttons" if={dc.confirmDelete}>
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
      disciplinecategoryStore.off('discipline_category_changed',DisciplineCategoryChanged)
    })

    //read Category
    self.readCategories = () => {
       disciplinecategoryStore.trigger('read_discipline_category')
    }

    self.getData = () =>{
      self.loading = true
      disciplinecategoryStore.trigger('read_discipline_category')
    }

    self.csvExport = () => {
      disciplinecategoryStore.trigger('csv_export_discipline_category')
    }

     self.add = () => {
      if(!self.refs.addDisciplineCategoryInput.value){
        toastr.info("Please enter Category and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          console.log('create')
          disciplinecategoryStore.trigger('add_discipline_category', self.refs.addDisciplineCategoryInput.value)
        }else if(self.title=='Update'){
          console.log('update')
          disciplinecategoryStore.trigger('edit_discipline_category', self.refs.addDisciplineCategoryInput.value,self.edit_id)
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
      self.discipline_categories.map(dc => {
          dc.confirmDelete = false
          dc.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.discipline_categories.map(dc => {
        if(dc.category_id != e.item.dc.category_id){
          dc.confirmDelete = false
        }else{
          dc.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      disciplinecategoryStore.trigger('delete_discipline_category', e.item.dc.category_id)
    }

    self.edit = (dc,e) => {
      console.log(dc)
      self.title='Update'
      self.refs.addDisciplineCategoryInput.value = dc.category_name
      self.edit_id = dc.category_id
    }
    
    disciplinecategoryStore.on('discipline_category_changed',DisciplineCategoryChanged)
    function DisciplineCategoryChanged(discipline_categories){
      console.log(discipline_categories) 
      self.title='Create'
      self.refs.addDisciplineCategoryInput.value = ''
      self.loading = false
      self.discipline_categories = discipline_categories
      self.update()
      console.log(self.discipline_categories)
    }

</script>
</discipline-category>