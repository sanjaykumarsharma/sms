<inventory-item>
  <print-header></print-header> 
  <loading-bar if={loading}></loading-bar>  
	<section class=" is-fluid">
      <h2 class="title has-text-centered" style="color: #ff3860;">Inventory Item Details</h2>
		<div class="box no-print">
			<div class="columns">
				<div class="column is-narrow">
					<label class="label" style="margin-left:-14px">Department</label>
				</div>
				<div class="column is-narrow">
					<div class="control">
						<div class="select">
							<select ref="department" style="margin-left:-10px" onchange={filterCategory}onkeyup={addEnter}>
								<option each={inventoryDepartments} value={department}>{department}
	              </option>
							</select>
						</div>
					</div>
				</div>
        <div class="column is-narrow">
          <label class="label" style="margin-left:-14px">Category</label>
        </div>
        <div class="column is-narrow">
          <div class="control">
            <div class="select" >
              <select ref="category_id" id="category_id" style="margin-left:-10px" onchange={filterSubcategory} onkeyup={addEnter}>
                <option each={filteredCategories} value={category_id} >{category_name}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="column is-narrow">
          <label class="label" style="margin-left:-14px">Subcategory</label>
        </div>
        <div class="column is-narrow">
          <div class="control">
            <div class="select">
              <select ref="sub_category_id" id="sub_category_id" style="margin-left:-10px">
                <option each={filteredSubcategories} value={sub_category_id} onkeyup={addEnter}>{sub_category}
                </option>
              </select>
            </div>
          </div>
        </div>
       <div class="column is-narrow">
          <label class="label" style="margin-left:-14px">Item</label>
        </div>
        <div class="column is-narrow">
          <div class="control">
            <input class=" input"
              ref="item_name" type="text" style="margin-left:-10px" onkeyup={addEnter}>
          </div>
        </div>
				<div class="column">
					<button class="button is-danger has-text-weight-bold" style="margin-left:-20px"
					onclick={add} >{title}</button>

          <button class="button is-success has-text-weight-bold ml5 is-pulled-right" onclick={downloadCSV} title="Excel Down Load">
            <span class="icon">
              <i class="far fa-file-excel"></i>
            </span>
          </button>
          <button class="button is-warning is-pulled-right" onclick={readInventoryItem} style="margin-left:5px;margin-right:5px">
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
					<th>Item</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr each={ev, i in inventoryItems}>
					<td>{ i+1 }</td>
					<td>{ ev.department}</td>
          <td>{ ev.category_name}</td>
          <td>{ ev.sub_category}</td>
					<td>{ ev.item_name}</td>
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
      self.readInventoryItem()
    })
self.on("unmount", function(){
  inventoryCategoryStore.off('read_inventory_category_changed', ReadInventoryCategoryChanged)
  inventorydepartmentStore.off('read_inventorydepartment_changed', ReadInventoryDepartmentChanged)
  inventorySubcategoryStore.off('read_inventory_subcategory_changed',ReadInventorySubcategoryChanged)
  
  inventoryItemStore.off('read_inventory_item_changed', ReadInventoryItemChanged) 
  inventoryItemStore.off('add_inventory_item_changed', AddInventoryItemChanged) 
  inventoryItemStore.off('edit_inventory_item_changed',EditInventoryItemChanged)    
  inventoryItemStore.off('delete_inventory_item_changed',DeleteInventoryItemChanged)
  inventoryItemStore.off('csv_export_inventory_item_changed',csvInventoryItemChanged)
})
    //filter subcategory and category

    self.filterCategory = () => {
      self.filteredCategories = []
      self.filteredCategories = self.inventoryCategories.filter(s => {
       return s.department == self.refs.department.value
      })
       self.update()
      console.log(self.refs.category_id.value)
       self.filterSubcategory()
   }
   self.filterSubcategory = () => {
      self.filteredSubcategories = []
      self.filteredSubcategories = self.inventorySubcategories.filter(s => {
      return s.category_id == self.refs.category_id.value    
    })
      self.update()
      console.log(self.filteredSubcategories)
      ///self.filterSubcategory()
   }
   //if(self.refs.department.value){
     
    //}
    //read department
    self.readInventoryDepartment = () => {
       inventorydepartmentStore.trigger('read_inventorydepartment')
    }

    //read employe_roles
    self.readInventoryCategory = () => {
       inventoryCategoryStore.trigger('read_inventory_category')
    }

    self.readInventorySubcategory = () => {
       inventorySubcategoryStore.trigger('read_inventory_subcategory')
    }

    self.readInventoryItem = () => {
      self.loading=true
      inventoryItemStore.trigger('read_inventory_item')
    }
    self.downloadCSV = () => {
      inventoryItemStore.trigger('csv_export_inventory_item',self.inventoryItems)
    }

     self.add = () => {
      if(!self.refs.department.value){
        toastr.info("Please enter department and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          
          self.category_name = $("#category_id option:selected").text();
          self.subcategory_name = $("#sub_category_id option:selected").text();

        inventoryItemStore.trigger('add_inventory_item', self.refs.department.value,
           self.refs.category_id.value,self.refs.sub_category_id.value,self.refs.item_name.value,  self.category_name,self.subcategory_name)
        }else if(self.title=='Update'){
            self.category_name = $("#category_id option:selected").text();
          self.subcategory_name = $("#sub_category_id option:selected").text();
        inventoryItemStore.trigger('edit_inventory_item', self.refs.department.value,
           self.refs.category_id.value,self.refs.sub_category_id.value,self.refs.item_name.value, self.edit_id,self.category_name,self.subcategory_name)
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
      self.inventoryItems.map(ev => {
          ev.confirmDelete = false
          ev.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.inventoryItems.map(ev => {
        if(ev.item_id != e.item.ev.item_id){
          ev.confirmDelete = false
        }else{
          ev.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      inventoryItemStore.trigger('delete_inventory_item', e.item.ev.item_id)
    }

    self.edit = (ev,e) => {
      console.log(ev)
      self.title='Update'

      document.getElementById("category_id").focus()
      //self.refs.category_id.value = ev.category_id
      self.refs.department.value = ev.department
      
      /*self.filteredCategories=[];
      self.filteredCategories = self.inventoryCategories.filter(s => {
        return s.department == ev.department
      })*/
       self.filterCategory()
       self.update()
       self.refs.category_id.value=ev.category_id
       self.filterSubcategory()
       self.update()
       self.refs.sub_category_id.value=ev.subcategory_id
      
      self.refs.item_name.value = ev.item_name
      self.edit_id = ev.item_id
    }
    
    inventoryItemStore.on('add_inventory_item_changed',AddInventoryItemChanged)
    function AddInventoryItemChanged(inventoryItems){
      console.log(inventoryItems) 
      self.title='Create'
      self.refs.category_id.value = ''
      self.refs.department.value = ''
      self.refs.sub_category_id.value = ''
      self.refs.item_name.value = ''
      self.loading = false
      self.inventoryItems = inventoryItems
      self.update()
      self.readInventoryItem()
      console.log(self.inventoryItems)
    }

  inventoryItemStore.on('edit_inventory_item_changed',EditInventoryItemChanged)
    function EditInventoryItemChanged(inventoryItems){
      console.log(inventoryItems) 
      self.title='Create'
      self.refs.category_id.value = ''
      self.refs.department.value = ''
      self.refs.item_name.value = ''
      self.refs.sub_category_id.value = ''
      self.loading = false
      self.inventoryItems = inventoryItems
      self.update()
     // self.readInventoryCategory()
      //console.log(self.empinventoryCategoriesloye_roles)
    }

    inventoryItemStore.on('delete_inventory_item_changed',DeleteInventoryItemChanged)
    function DeleteInventoryItemChanged(inventoryItems){
      console.log(inventoryItems) 
      self.title='Create'
      self.refs.sub_category.value = ''
      self.refs.item_name.value = ''
      self.refs.department.value = ''
      self.refs.category_id.value = ''
      self.loading = false
      self.inventoryItems = inventoryItems
      self.update()
    //  self.readInventoryItem()
      console.log(self.inventoryItems)
    }

    inventoryCategoryStore.on('read_inventory_category_changed',ReadInventoryCategoryChanged)
    function ReadInventoryCategoryChanged(inventoryCategories){
      console.log(inventoryCategories) 
      self.title='Create'
      self.loading = false
      self.inventoryCategories = inventoryCategories
      self.refs.sub_category_id.value = ''
      self.refs.department.value = ''
      self.refs.category_id.value = ''
      self.refs.item_name.value = ''
      self.update()
      console.log(self.inventoryCategories)
    }
  inventorySubcategoryStore.on('read_inventory_subcategory_changed',ReadInventorySubcategoryChanged)
    function ReadInventorySubcategoryChanged(inventorySubcategories){
      console.log(inventorySubcategories) 
      self.title='Create'
      self.loading = false
      self.inventorySubcategories = inventorySubcategories
      self.refs.sub_category_id.value = ''
      self.refs.department.value = ''
      self.refs.item_name.value = ''
      self.refs.category_id.value = ''
      self.update()
      console.log(self.inventorySubcategories)
    }

   inventoryItemStore.on('read_inventory_item_changed',ReadInventoryItemChanged)
    function ReadInventoryItemChanged(inventoryItems){
      console.log(inventoryItems) 
      self.title='Create'
      self.loading = false
      self.inventoryItems = inventoryItems
      self.refs.sub_category_id.value = ''
      self.refs.department.value = ''
      self.refs.item_name.value = ''
      self.refs.category_id.value = ''
      //self.readInventoryItem()
      self.update()
      console.log(self.inventoryItems)
    }  

    inventorydepartmentStore.on('read_inventorydepartment_changed',ReadInventoryDepartmentChanged)
    function ReadInventoryDepartmentChanged(inventoryDepartments){
      console.log(inventoryDepartments) 
      self.inventoryDepartments = inventoryDepartments
      self.update()
      console.log(self.inventoryDepartments)
    }
    inventoryItemStore.on('csv_export_inventory_item_changed',csvInventoryItemChanged)
    function csvInventoryItemChanged(url){
      var open_url = window.location.origin+url 
      window.open(open_url);
      self.loading = false
      self.update()
    }

</script>
</inventory-item>