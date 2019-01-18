<inventory-subcategory>
  <header></header>
  <loading-bar if={loading}></loading-bar>  
	<section class=" is-fluid">
     <h4 class="title has-text-centered" style="color: #ff3860;">Inventory Subcategory Details</h4>
		<div class="box no-print">
			<div class="columns">
				<div class="column is-narrow">
					<label class="label">Department</label>
				</div>
				<div class="column is-narrow">
					<div class="control">
						<div class="select">
							<select ref="department" onkeyup={addEnter}>
								<option each={inventoryDepartments} value={department}>{department}
	              </option>
							</select>
						</div>
					</div>
				</div>
        <div class="column is-narrow">
          <label class="label">Category</label>
        </div>
        <div class="column is-narrow">
          <div class="control">
            <div class="select">
              <select ref="category_id" id="category_id" onkeyup={addEnter}>
                <option each={inventoryCategories} value={category_id}>{category_name}
                </option>
              </select>
            </div>
          </div>
        </div>
				<!-- <div class="column is-narrow">
          <label class="label">Category</label>
        </div>
        <div class="column is-narrow">
          <div class="control">
              <select ref="category_id">
                        <option each={inventoryCategories} value={category_id}>{category_name}
                        </option>
                      </select>
          </div>
        </div> -->
       <div class="column is-narrow">
          <label class="label">Subcategory</label>
        </div>
        <div class="column is-narrow">
          <div class="control">
            <input class=" input"
              ref="sub_category" type="text" onkeyup={addEnter}>
          </div>
        </div>
				<div class="column">
					<button class="button is-danger has-text-weight-bold"
					onclick={add} >{title}
					</button>
          <button class="button is-primary has-text-weight-bold is-pulled-right" onclick="window.print()" title="Print">
                    <span class="icon">
                       <i class="fas fa-print"></i>
                   </span>
          </button>
           <button class="button is-warning is-rounded is-pulled-right" onclick={readInventorySubcategory} style="margin-right:5px;margin-left:5px">
        <span class="icon">
          <span class="fas fa-sync-alt"></span>
        </span>
        </button>
				</div>
			</div>
		</div>
		<table class="table is-fullwidth is-striped is-hoverable">
			<thead>
				<tr>
					<th>SL</th>
					<th>Department</th>
          <th>Category</th>
					<th>Subcategory</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr each={ev, i in inventorySubcategories}>
					<td>{ i+1 }</td>
					<td>{ ev.department}</td>
          <td>{ ev.category_name}</td>
					<td>{ ev.sub_category}</td>
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
      self.update()
      self.readInventoryDepartment()
      self.readInventoryCategory()
      self.readInventorySubcategory()
    })
self.on("unmount", function(){
  inventoryCategoryStore.off('read_inventory_category_changed', ReadInventoryCategoryChanged)
  inventorydepartmentStore.off('read_inventorydepartment_changed', ReadInventoryDepartmentChanged)
  
  inventorySubcategoryStore.off('add_inventory_subcategory_changed', AddInventorySubcategoryChanged)
          
inventorySubcategoryStore.off('read_inventory_subcategory_changed',ReadInventorySubcategoryChanged)
          
  inventorySubcategoryStore.off('edit_inventory_subcategory_changed',EditInventorySubcategoryChanged)    
  
  inventorySubcategoryStore.off('delete_inventory_subcategory_changed',DeleteInventorySubcategoryChanged)
})

    //read courses
    self.readInventoryDepartment = () => {
       inventorydepartmentStore.trigger('read_inventorydepartment')
    }

    //read employe_roles
    self.readInventoryCategory = () => {
       inventoryCategoryStore.trigger('read_inventory_category')
    }

    self.readInventorySubcategory = () => {
      self.loading=true
       inventorySubcategoryStore.trigger('read_inventory_subcategory')
    }

     self.add = () => {
      if(!self.refs.department.value){
        toastr.info("Please enter department and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
         self.category_name = $("#category_id option:selected").text();
        inventorySubcategoryStore.trigger('add_inventory_subcategory', self.refs.department.value,
           self.refs.category_id.value,self.refs.sub_category.value, self.category_name)
        }else if(self.title=='Update'){
       self.category_name = $("#category_id option:selected").text();
        inventorySubcategoryStore.trigger('edit_inventory_subcategory', self.refs.department.value,
           self.refs.category_id.value, self.refs.sub_category.value, self.edit_id, self.category_name)
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
      self.inventorySubcategories.map(ev => {
          ev.confirmDelete = false
          ev.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.inventorySubcategories.map(ev => {
        if(ev.sub_category_id != e.item.ev.sub_category_id){
          ev.confirmDelete = false
        }else{
          ev.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      inventorySubcategoryStore.trigger('delete_inventory_subcategory', e.item.ev.sub_category_id)
    }

    self.edit = (ev,e) => {
      console.log(ev)
      self.title='Update'
      document.getElementById("category_id").focus()
      self.refs.category_id.value = ev.category_id
      self.refs.department.value = ev.department
      self.refs.sub_category.value = ev.sub_category
      self.edit_id = ev.sub_category_id
    }
    
    inventorySubcategoryStore.on('add_inventory_subcategory_changed',AddInventorySubcategoryChanged)
    function AddInventorySubcategoryChanged(inventorySubcategories){
      console.log(inventorySubcategories) 
      self.title='Create'
      self.refs.category_id.value = ''
      self.refs.department.value = ''
      self.refs.sub_category.value = ''
      self.loading = false
      self.inventorySubcategories = inventorySubcategories
      self.update()
      //self.readInventoryCategory()
      console.log(self.inventorySubcategories)
    }

  inventorySubcategoryStore.on('edit_inventory_subcategory_changed',EditInventorySubcategoryChanged)
    function EditInventorySubcategoryChanged(inventorySubcategories){
      console.log(inventorySubcategories) 
      self.title='Create'
      self.refs.category_id.value = ''
      self.refs.department.value = ''
      self.refs.sub_category.value = ''
      self.loading = false
      self.inventorySubcategories = inventorySubcategories
      self.update()
     // self.readInventoryCategory()
      //console.log(self.empinventoryCategoriesloye_roles)
    }

    inventorySubcategoryStore.on('delete_inventory_subcategory_changed',DeleteInventoryCategoryChanged)
    function DeleteInventoryCategoryChanged(inventorySubcategories){
      console.log(inventorySubcategories) 
      self.title='Create'
      self.refs.sub_category.value = ''
      self.refs.department.value = ''
      self.refs.category_id.value = ''
      self.loading = false
      self.inventorySubcategories = inventorySubcategories
      self.update()
      self.readInventorySubcategory()
      console.log(self.inventorySubcategories)
    }

    inventoryCategoryStore.on('read_inventory_category_changed',ReadInventoryCategoryChanged)
    function ReadInventoryCategoryChanged(inventoryCategories){
      console.log(inventoryCategories) 
      self.title='Create'
      self.loading = false
      self.inventoryCategories = inventoryCategories
      self.refs.sub_category.value = ''
      self.refs.department.value = ''
      self.refs.category_id.value = ''
      self.update()
      console.log(self.inventoryCategories)
    }
  inventorySubcategoryStore.on('read_inventory_subcategory_changed',ReadInventorySubcategoryChanged)
    function ReadInventorySubcategoryChanged(inventorySubcategories){
      console.log(inventorySubcategories) 
      self.title='Create'
      self.loading = false
      self.inventorySubcategories = inventorySubcategories
      self.refs.sub_category.value = ''
      self.refs.department.value = ''
      self.refs.category_id.value = ''
      //self.readInventorySubcategory()
      self.update()
      console.log(self.inventorySubcategories)
    }

    inventorydepartmentStore.on('read_inventorydepartment_changed',ReadInventoryDepartmentChanged)
    function ReadInventoryDepartmentChanged(inventoryDepartments){
      console.log(inventoryDepartments) 
      self.inventoryDepartments = inventoryDepartments
      self.loading=false
      self.update()
      console.log(self.inventoryDepartments)
    }

</script>
</inventory-subcategory>