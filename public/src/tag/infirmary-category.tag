<infirmary-category>
    <print-header></print-header> 
  <loading-bar if={loading}></loading-bar>
	<section class=" is-fluid">
		<h2 class="title has-text-centered" style="color: #ff3860;">Infirmary Category Details</h2>
     <div class="box no-print" >
    <div class="columns">
      <div class="column is-narrow">
        <label class="label">Category</label>
      </div>
      <div class="column is-narrow">
       <input class="input" type="text" ref="category_name" onkeyup={addEnter}>
      </div>
      <div class="column">
        <button disabled={loading} class="button is-danger has-text-weight-bold"
        onclick={add}>{title}
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
        <button class="button is-warning is-rounded is-pulled-right is-small ml5" onclick={readCategories} style="margin-right:2px">
        <span class="icon">
          <span class="fas fa-sync-alt"></span>
        </span>
        </button>
          <input class="input is-pulled-right" ref="searchInfirmaryCategory" onkeyup={filteredInfirmaryCategory} type="text" style="width:200px;margin-right:5px;" placeholder="Search" >     
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
				<tr each={c, i in filteredInfirmaryCategorys}>
					<td>{ i+1 }</td>
					<td>{ c.category_name}</td>
		          	<td class="has-text-right no-print">
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
      infirmarycategoryStore.off('csv_export_infirmary_category_changed',csvInfirmaryCategoryChanged)
    })

    self.filteredInfirmaryCategory = ()=>{
        self.filteredInfirmaryCategorys = self.infirmaryCategories.filter(c => {
          return JSON.stringify(c).toLowerCase().indexOf(self.refs.searchInfirmaryCategory.value.toLowerCase())>=0
        })
      } 
    //read courses
    self.readCategories = () => {
      self.loading=true
       infirmarycategoryStore.trigger('read_categories')
    }
    self.downloadCSV = () =>{
      infirmarycategoryStore.trigger('csv_export_infirmary_category', self.infirmaryCategories)
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
      self.filteredInfirmaryCategorys = infirmaryCategories
      /*self.categoryDataItems = []
      self.categoryDataItems = infirmaryCategories*/
      self.update()
      console.log(self.infirmaryCategories)
    }
    infirmarycategoryStore.on('csv_export_infirmary_category_changed',csvInfirmaryCategoryChanged)
    function csvInfirmaryCategoryChanged(url){
      var open_url = window.location.origin+url 
      window.open(open_url);
      self.loading = false
      self.update()
     }

</script>
</infirmary-category>