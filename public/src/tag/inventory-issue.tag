<inventory-issue>
  <header></header>
  <loading-bar if={loading}></loading-bar>  
	<section class=" is-fluid" show={inventory_issue_view == 'show_inventory_issue_table'}>
        <h4 class="title has-text-centered" style="color: #ff3860;">Goods Issue from Store Department</h4>
		<div class="box no-print">
			<div class="columns">
        <div class="column is-narrow">
          <label class="label" style="margin-left:-14px">Type</label>
        </div>
        <div class="column is-narrow">
          <div class="control">
            <div class="select" >
              <select ref="r_issue_type">
                  <option>Staff</option>
                  <option>College</option>
                  <option>Health</option>
                  <option>MV</option>
                  <option>Other</option>
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
              <select ref="r_category_id" onchange={readInventoryIssue}>
                <option each={inventoryCategories} value={category_id} >{category_name}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="column">
         <button class="button is-primary has-text-weight-bold is-pulled-right" onclick="window.print()" title="Print">
                  <span class="icon">
                     <i class="fas fa-print"></i>
                 </span>
        </button>
        <button class="button is-warning is-rounded  is-pulled-right" onclick={readInventoryIssue} style="margin-left:3px; margin-right:3px">
        <span class="icon">
          <span class="fas fa-sync-alt"></span>
        </span>
        </button>
          <button class="button is-info is-rounded  is-pulled-right" onclick={show_inventory_issue}>
          <span class="icon">
            <span class="fas fa-plus"></span>
          </span>
        </button>
        </div>
			</div>
		</div>
		<table class="table is-fullwidth is-striped is-hoverable">
			<thead>
				<tr>
					<th>SL</th>
          <th>Date</th>
          <th>Category</th>
					<th>Item</th>
          <th>Issue To</th>
          <th>Quantity</th>
          <th>Purpose</th>
        <!--   <th>Received From</th>
        <th>Rack</th>
        <th>Remarks</th> -->
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr each={ev, i in inventoryIssues}>
					<td>{ i+1 }</td>
					<td>{ ev.issue_date}</td>
          <td>{ ev.category_name}</td>
					<td>{ ev.item_name}</td>
          <td>{ ev.issue_to} {ev.staff_name}</td>
          <td>{ ev.i_quantity}</td>
          <td>{ ev.purpose}</td>
         <!--  <td>{ ev.issue_to}</td>
         <td>{ ev.rack_name}</td>
         <td>{ ev.purpose}</td> -->
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
  <section class="is-fluid" show={inventory_issue_view =='show_inventory_issue_form'}>
  <div class="label">
    <div class="level-left">
      <h2 class="title" style="color: #ff3860;">{title} Inventory Issue</h2>
    </div>
    <div class="level-right">
      <button class="button" onclick={close_inventory_issue_form}>Back</button>
    </div>
  </div>
  <div class="box">
    <div class="columns is-variable is-1 is-multiline">
     
        
        <div class="column is-one-third">
         <label class="label">Issue Date</label>
        <input class="input date flatpickr-input form-control input"  ref="issue_date" placeholder="" tabindex="0"  type="text"  onkeyup={addEnter}>
        </div>
         <div class="column is-one-third">
              <label class="label" for="class">Category</label>
              <div class="control">
                  <div class="select is-fullwidth">
                  <select ref="category_id" id="category_id" onchange={filterSubcategory}>
            <option each={inventoryCategories} value={category_id}>{category_name}
            </option>
          </select>
        </div>
          </div>
      </div>
     
        <div class="column is-one-third">
              <label class="label" for="class">Subcategory</label>
              <div class="control">
                  <div class="select is-fullwidth">
                  <select ref="sub_category_id" id="sub_category_id" onchange={filterItem}>
                  <option each={filteredSubcategories} value={sub_category_id}>{sub_category}
                  </option>
                </select>
        </div>
        </div>
      </div>
       <div class="column is-one-third">
          <label class="label" for="class">Item</label>
          <div class="control">
            <div class="select is-fullwidth">
              <select ref="item_id" id="item_id" onchange={getAvailableItemQuantity}>
                <option each={filteredItems} value={item_id}>{item_name}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="column is-one-third">
          <label class="label" for="class">Return Type</label>
            <div class="control">
              <div class="select is-fullwidth">
               <select ref="return_type"  onkeyup={addEnter}>
                  <option value='Y'>Retunable</option>
                  <option value='N'>Non-Retunable</option>
                </select>
              </div>
            </div>
        </div>
        <div class="column is-one-third">
          <label class="label" for="class">Type</label>
            <div class="control">
              <div class="select is-fullwidth">
               <select ref="issue_type"  onchange={showIssueType}  onkeyup={addEnter}>
                  <option>Staff</option>
                  <option>College</option>
                  <option>Health</option>
                  <option>MV</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
        </div>
        <div class="column is-one-third"  show={show_view == 'show_employee'}>
          <label class="label" for="class">Staff</label>
          <div class="control">
            <div class="select is-fullwidth">
              <select ref="staff_id"  onkeyup={addEnter} >
                <option each={employees} value={emp_id}>{name}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="column is-one-third" show={show_view == 'show_text_box'}>
          <label class="label">Issue To</label>
            <input type="text" ref="issue_to" type="text" class="input"  onkeyup={addEnter}>
        </div>
        <div class="column is-one-third">
          <label class="label">In Stock</label>
            <input type="text" ref="available_quantity" type="text" class="input"  onkeyup={addEnter}>
        </div>
         <div class="column is-one-third">
          <label class="label">Quantity</label>
            <input type="text" ref="issue_quantity" type="text" class="input"  onkeyup={addEnter}>
        </div>
         <div class="column is-one-third">
          <label class="label">Unit</label>
            <input type="text" ref="unit" type="text" class="input"  onkeyup={addEnter}>
        </div>
        <div class="column is-one-third">
           <label class="label">Purpose</label>
           <textarea type="text" ref="purpose" type="text" class="input" rows="3"  onkeyup={addEnter}></textarea> 
        </div>
    <div class="column is-full">
    <button class="button is-danger has-text-weight-bold adjusted-top" onclick={add} >{title}</button>    
   </div>
  </div>
  </div>
</section>
	<script>
	var self = this
    self.on("mount", function(){
      self.title='Create'
      self.role = getCookie('role')
      self.inventory_issue_view='show_inventory_issue_table'
      self.refs.issue_type.value='Staff'
     flatpickr(".date", {
         allowInput: true,
          dateFormat: "d/m/Y",
       })
      self.showIssueType()
      self.loading=false
      self.update()
    //  self.readInventoryDepartment()
      self.readInventoryCategory()
      //self.readInventoryUnit()
      self.readInventorySubcategory()
      self.readEmployee()
      self.readInventoryItem()
     // self.readInventoryRack()
    //  self.readInventoryIssue()
    })
  self.on("unmount", function(){
      inventoryCategoryStore.off('read_inventory_category_changed', ReadInventoryCategoryChanged)
      inventoryItemStore.off('read_inventory_item_changed', ReadInventoryItemChanged)
      inventorySubcategoryStore.off('read_inventory_subcategory_changed',ReadInventorySubcategoryChanged)
       staffinfirmaryStore.off('read_employee_changed',EmployeeChanged)
      inventoryIssueStore.off('read_inventory_issue_changed', ReadInventoryIssueChanged) 
      inventoryIssueStore.off('add_inventory_issue_changed', AddInventoryIssueChanged) 
      inventoryIssueStore.off('edit_inventory_issue_changed', EditInventoryIssueChanged)    
      inventoryIssueStore.off('delete_inventory_issue_changed', DeleteInventoryIssueChanged)
      inventoryIssueStore.off('read_inventory_available_quantity_changed', ReadInventoryAvailableQuantityChanged)
  })

    
    self.showIssueType=()=>{
        console.log(self.refs.issue_type.value)
        if(self.refs.issue_type.value=='Staff'){
          self.show_view='show_employee' 
          self.refs.issue_to.value=''
        }else{
          self.show_view='show_text_box'
          self.refs.staff_id.value=''
        }
    }
    self.show_inventory_issue=()=>{
       self.inventory_issue_view='show_inventory_issue_form'
       self.refs.return_type.value='Non-Retunable'
    }
    self.close_inventory_issue_form=()=>{
        self.inventory_issue_view='show_inventory_issue_table'
        self.title='Add'
        self.refs.issue_date.value=''
        self.refs.category_id.value=''
        self.refs.sub_category_id.value=''
        self.refs.item_id.value=''
        self.refs.return_type.value=''
        self.refs.issue_type.value=''
        self.refs.issue_to.value=''
        self.refs.staff_id.value=''
         self.refs.available_quantity.value=''
         self.refs.issue_quantity.value=''
        self.refs.unit.value=''
        self.refs.purpose.value=''
        self.rack_id=''
    }
    
   self.filterSubcategory = () => {
      self.filteredSubcategories = []
      self.filteredSubcategories = self.inventorySubcategories.filter(s => {
        console.log("inside")
         return s.category_id == self.refs.category_id.value    
    })
      
      console.log(self.filteredSubcategories)
      self.update()
      self.filterItem()
   }

    self.filterItem = () => {
      self.filteredItems = []
      self.filteredItems = self.inventoryItems.filter(s => {
        console.log(s)
        return s.subcategory_id == self.refs.sub_category_id.value    
    })
      self.update()
      self.getAvailableItemQuantity()
   }
    
    self.readInventoryIssue = () => {
      self.loading=true
       inventoryIssueStore.trigger('read_inventory_issue', self.refs.r_category_id.value,self.refs.r_issue_type.value,)
    }
    
    self.readInventoryCategory = () => {
       inventoryCategoryStore.trigger('read_inventory_category')
    }

    self.readInventorySubcategory = () => {
       inventorySubcategoryStore.trigger('read_inventory_subcategory')
    }

    self.readInventoryItem = () => {
       inventoryItemStore.trigger('read_inventory_item')
    }
    self.getAvailableItemQuantity = () => {
      console.log("item_id");
      console.log(self.refs.item_id.value);
      //if(self.refs.item_id.value!=null || self.refs.item_id.value!='' || self.refs.item_id.value!=undefined){
       inventoryIssueStore.trigger('read_inventory_available_quantity',self.refs.item_id.value)
     // }
    }

    self.readEmployee = () => {
        staffinfirmaryStore.trigger('read_employee')
     }



    self.add = () => {
        self.issue_date=convertDate(self.refs.issue_date.value)
        self.category_name = $("#category_id option:selected").text();
        self.subcategory_name = $("#sub_category_id option:selected").text();  
        self.item_name = $("#item_id option:selected").text();  

        self.aq=self.refs.available_quantity.value
        self.iq=self.refs.issue_quantity.value
       if(Number(self.aq) < Number(self.iq)){
          toastr.info("Issue Quantity is greater than available stock")
          return
       } 
      if(!self.refs.category_id.value){
        toastr.info("Please enter category name and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
      
        inventoryIssueStore.trigger('add_inventory_issue', self.issue_date, self.refs.category_id.value,self.refs.sub_category_id.value,self.refs.item_id.value,self.refs.return_type.value,self.refs.issue_type.value,self.refs.issue_to.value,self.refs.staff_id.value, self.refs.available_quantity.value,self.refs.issue_quantity.value,self.unit_id,self.refs.purpose.value,self.rack_id,self.category_name, self.subcategory_name,self.item_name)
        }else if(self.title=='Update'){
        
        inventoryIssueStore.trigger('edit_inventory_issue', self.issue_date, self.refs.category_id.value,self.refs.sub_category_id.value,self.refs.item_id.value,self.refs.return_type.value,self.refs.issue_type.value,self.refs.issue_to.value,self.refs.staff_id.value, self.refs.available_quantity.value,self.refs.issue_quantity.value,self.unit_id,self.refs.purpose.value , self.rack_id, self.edit_id,self.category_name, self.subcategory_name,self.item_name)
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
      self.inventoryIssues.map(ev => {
          ev.confirmDelete = false
          ev.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.inventoryIssues.map(ev => {
        if(ev.issue_id != e.item.ev.issue_id){
          ev.confirmDelete = false
        }else{
          ev.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      console.log("delet")
      inventoryIssueStore.trigger('delete_inventory_issue', e.item.ev.issue_id)
    }

    self.edit = (ev,e) => {
      console.log("insie edit")
      flatpickr(".date", {
         allowInput: true,
          dateFormat: "d/m/Y",
       })
       self.inventory_issue_view='show_inventory_issue_form'
       self.refs.category_id.value=ev.category_id
       self.filterSubcategory()
       self.update()
       self.refs.sub_category_id.value=ev.sub_category_id
       self.filterItem()
       self.update()
       self.refs.item_id.value=ev.item_id
       self.refs.issue_date.value=ev.issue_date
       self.refs.unit.value=ev.unit
       self.unit_id=ev.unit_id
       self.rack_id=ev.rack_id
       self.refs.available_quantity.value=ev.available_quantity
       self.refs.issue_quantity.value=ev.issue_quantity
       self.refs.issue_type.value=ev.issue_type
       self.refs.return_type.value=ev.return_type
       self.refs.issue_to.value=ev.issue_to
       self.refs.staff_id.value=ev.staff_id
       self.refs.purpose.value=ev.purpose
       self.edit_id = ev.issue_id
       self.title='Update'
       self.inventory_issue_view='show_inventory_issue_form'
    }
    
    inventoryIssueStore.on('add_inventory_issue_changed',AddInventoryIssueChanged)
    function AddInventoryIssueChanged(inventoryIssues){
      console.log(inventoryIssues) 
      self.title='Create'
     self.refs.category_id.value=''
       self.refs.sub_category_id.value=''
       self.refs.item_id.value=''
       self.refs.issue_date.value=''
       self.refs.unit.value=''
       self.refs.available_quantity.value=''
       self.refs.issue_quantity.value=''
       self.refs.issue_type.value=''
       self.refs.return_type.value=''
       self.refs.issue_to.value=''
       self.refs.staff_id.value=''
       self.refs.purpose.value=''
      self.loading = false
      self.update()
      //self.readInventoryCategory()
      console.log(self.inventoryIssues)
    }

  inventoryIssueStore.on('edit_inventory_issue_changed',EditInventoryIssueChanged)
    function EditInventoryIssueChanged(inventoryIssues){
      console.log(inventoryIssues) 
        self.title='Create'
       self.refs.category_id.value=''
       self.refs.sub_category_id.value=''
       self.refs.item_id.value=''
       self.refs.issue_date.value=''
       self.refs.unit.value=''
       self.refs.available_quantity.value=''
       self.refs.issue_quantity.value=''
       self.refs.issue_type.value=''
       self.refs.return_type.value=''
       self.refs.issue_to.value=''
       self.refs.staff_id.value=''
       self.refs.purpose.value=''
      self.loading = false
      self.inventoryIssues = inventoryIssues
      self.update()
     // self.readInventoryCategory()
      //console.log(self.empinventoryCategoriesloye_roles)
    }

    inventoryIssueStore.on('delete_inventory_issue_changed',DeleteInventoryIssueChanged)
    function DeleteInventoryIssueChanged(inventoryIssues){
      console.log(inventoryIssues) 
      self.title='Create'
      self.loading = false
      self.inventoryIssues = inventoryIssues
      self.update()
      //self.readInventoryItem()
      console.log(self.inventoryIssues)
    }

    inventoryCategoryStore.on('read_inventory_category_changed',ReadInventoryCategoryChanged)
    function ReadInventoryCategoryChanged(inventoryCategories){
      console.log(inventoryCategories) 
      //self.title='Create'
      self.loading = false
      self.inventoryCategories = inventoryCategories
      self.refs.sub_category_id.value = ''
      /*self.refs.department.value = ''*/
      self.refs.category_id.value = ''
      self.refs.item_id.value = ''
      self.update()
      console.log(self.inventoryCategories)
      self.readInventoryIssue()
    }
   
inventoryIssueStore.on('read_inventory_available_quantity_changed',ReadInventoryAvailableQuantityChanged)
    function ReadInventoryAvailableQuantityChanged(availableItems,rack_ids){
      console.log(availableItems) 
     // self.title='Create'
     console.log(rack_ids[0].rack_id);
      self.loading = false
      self.availableItems = availableItems
      self.rack_id = rack_ids[0].rack_id
      if(self.title=='Create'){
      self.refs.available_quantity.value=availableItems[0].total_received - (availableItems[0].total_issued + availableItems[0].total_sale)
      }else{
      self.refs.available_quantity.value=availableItems[0].total_received - (availableItems[0].total_issued + availableItems[0].total_sale) + Number(self.refs.issue_quantity.value);
      }
      self.refs.unit.value=availableItems[0].unit
      self.unit_id=availableItems[0].unit_id
     // self.rack_id=availableItems[0].rack_id
      self.update()
      console.log(self.availableItems)
    }
  inventorySubcategoryStore.on('read_inventory_subcategory_changed',ReadInventorySubcategoryChanged)
    function ReadInventorySubcategoryChanged(inventorySubcategories){
      console.log(inventorySubcategories) 
     // self.title='Create'
      self.loading = false
      self.inventorySubcategories = inventorySubcategories
      self.refs.sub_category_id.value = ''
      /*self.refs.department.value = ''*/
     // self.refs.item_id.value = ''
      self.refs.category_id.value = ''
      self.update()
      console.log(self.inventorySubcategories)
    }

   inventoryItemStore.on('read_inventory_item_changed',ReadInventoryItemChanged)
    function ReadInventoryItemChanged(inventoryItems){
      console.log(inventoryItems) 
     // self.title='Create'
      self.loading = false
      self.inventoryItems = inventoryItems
     // self.refs.sub_category_id.value = ''
      /*self.refs.department.value = ''*/
     // self.refs.item_id.value = ''
      //self.refs.category_id.value = ''
      self.update()
      console.log(self.inventoryItems)
    }  
    inventoryIssueStore.on('read_inventory_issue_changed',ReadInventoryIssueChanged)
    function ReadInventoryIssueChanged(inventoryIssues){
      console.log(inventoryIssues) 
      self.title='Create'
      self.loading = false
      self.inventoryIssues = inventoryIssues
      self.update()
      console.log(self.inventoryIssues)
    }  

  staffinfirmaryStore.on('read_employee_changed',EmployeeChanged)
     function EmployeeChanged(employees){
       console.log(employees) 
       self.employees = employees
       self.update()
       console.log(self.employees)
     }

</script>
</inventory-issue>