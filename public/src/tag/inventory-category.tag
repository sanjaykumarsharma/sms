<inventory-category>
  <header></header>
  <loading-bar if={loading}></loading-bar>  
	<section class=" is-fluid">
		<h2 class="title has-text-centered" style="color: #ff3860;">Inventory Category Details</h2>
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
						<input class=" input" ref="category_name" type="text" onkeyup={addEnter}>
					</div>
				</div>
				<div class="column">
					<button class="button is-danger has-text-weight-bold"
					onclick={add} >{title}
					</button>
          <button class="button is-warning is-rounded is-pulled-right" onclick={readInventoryItem} style="margin-left:5px;margin-right:5px">
          <span class="icon">
            <span class="fas fa-sync-alt"></span>
          </span>
          </button>
           <button class="button is-primary has-text-weight-bold is-pulled-right" onclick="window.print()" title="Print">
            <span class="icon"><i class="fas fa-print"></i></span>
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
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr each={ev, i in inventoryCategories}>
					<td>{ i+1 }</td>
					<td>{ ev.department}</td>
					<td>{ ev.category_name}</td>
		          	<td class="has-text-right">
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
      self.update()
      self.readInventoryDepartment()
      self.readInventoryCategory()
    })
    self.on("unmount", function(){
      inventoryCategoryStore.off('add_inventory_category_changed', AddInventoryCategoryChanged)
      inventoryCategoryStore.off('read_inventory_category_changed', ReadInventoryCategoryChanged)
      //inventoryCategoryStore.off('read_inventory-department_changed',InventoryDepartmentChanged)
      inventorydepartmentStore.off('read_inventorydepartment_changed', ReadInventoryDepartmentChanged)
      inventoryCategoryStore.off('edit_inventory_category_changed',EditInventoryCategoryChanged)
      inventoryCategoryStore.off('delete_inventory_category_changed',DeleteInventoryCategoryChanged)
    })

    //read courses
    self.readInventoryDepartment = () => {
       inventorydepartmentStore.trigger('read_inventorydepartment')
    }

    //read employe_roles
    self.readInventoryCategory = () => {
      self.loading=true
       inventoryCategoryStore.trigger('read_inventory_category')
    }

     self.add = () => {
      if(!self.refs.department.value){
        toastr.info("Please enter department and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          console.log('create')
          inventoryCategoryStore.trigger('add_inventory_category', self.refs.department.value,
           self.refs.category_name.value)
        }else if(self.title=='Update'){
          console.log('update')
          inventoryCategoryStore.trigger('edit_inventory_category', self.refs.department.value,
           self.refs.category_name.value, self.edit_id)
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
      self.inventoryCategories.map(ev => {
          ev.confirmDelete = false
          ev.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.inventoryCategories.map(ev => {
        if(ev.category_id != e.item.ev.category_id){
          ev.confirmDelete = false
        }else{
          ev.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      inventoryCategoryStore.trigger('delete_inventory_category', e.item.ev.category_id)
    }

    self.edit = (ev,e) => {
      console.log(ev)
      self.title='Update'
      self.refs.category_name.value = ev.category_name
      self.refs.department.value = ev.department
      self.edit_id = ev.category_id
    }
    
    inventoryCategoryStore.on('add_inventory_category_changed',AddInventoryCategoryChanged)
    function AddInventoryCategoryChanged(inventoryCategories){
      console.log(inventoryCategories) 
      self.title='Create'
      self.refs.category_name.value = ''
      self.refs.department.value = ''
      self.loading = false
      self.inventoryCategories = inventoryCategories
      self.update()
      //self.readInventoryCategory()
      console.log(self.inventoryCategories)
    }

    inventoryCategoryStore.on('edit_inventory_category_changed',EditInventoryCategoryChanged)
    function EditInventoryCategoryChanged(inventoryCategories){
      console.log(inventoryCategories) 
      self.title='Create'
      self.refs.category_name.value = ''
      self.refs.department.value = ''
      self.loading = false
      self.inventoryCategories = inventoryCategories
      self.update()
     // self.readInventoryCategory()
      //console.log(self.empinventoryCategoriesloye_roles)
    }

    inventoryCategoryStore.on('delete_inventory_category_changed',DeleteInventoryCategoryChanged)
    function DeleteInventoryCategoryChanged(inventoryCategories){
      console.log(inventoryCategories) 
      self.title='Create'
      self.refs.category_name.value = ''
      self.refs.department.value = ''
      self.loading = false
      self.inventoryCategories = inventoryCategories
      self.update()
      self.readInventoryCategory()
      console.log(self.inventoryCategories)
    }

    inventoryCategoryStore.on('read_inventory_category_changed',ReadInventoryCategoryChanged)
    function ReadInventoryCategoryChanged(inventoryCategories){
      console.log(inventoryCategories) 
      self.title='Create'
      self.refs.category_name.value = ''
      self.refs.department.value = ''
      self.loading = false
      self.inventoryCategories = inventoryCategories
      self.update()
      console.log(self.inventoryCategories)
    }

    inventorydepartmentStore.on('read_inventorydepartment_changed',ReadInventoryDepartmentChanged)
    function ReadInventoryDepartmentChanged(inventoryDepartments){
      console.log(inventoryDepartments) 
      self.inventoryDepartments = inventoryDepartments
      self.loading=true
      self.update()
      console.log(self.inventoryDepartments)
    }

</script>
</inventory-category>