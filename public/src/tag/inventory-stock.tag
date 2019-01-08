<inventory-stock>
  <header></header>
   <loading-bar if={loading}></loading-bar>  
	  <section class=" is-fluid" show={inventory_stock_view == 'show_inventory_stock_table'}>
        <h4 class="title has-text-centered" style="color: #ff3860;">Goods Entry in Store Department</h4>
		<div class="box no-print">
			<div class="columns">
        <div class="column is-narrow">
          <label class="label" style="margin-left:-14px">Category</label>
        </div>
        <div class="column is-narrow">
          <div class="control">
            <div class="select" >
              <select ref="r_category_id" onchange={readInventoryStock}>
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
        <button class="button is-warning is-rounded is-pulled-right" onclick={readInventoryStock} style="margin-left:3px;margin-right:3px">
        <span class="icon">
          <span class="fas fa-sync-alt"></span>
        </span>
        </button>
           <button class="button is-warning is-rounded is-pulled-right" onclick={show_inventory_stock}>
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
          <th>Quantity</th>
          <th>Rate</th>
          <th>Amount</th>
          <th>Received From</th>
          <th>Rack</th>
          <th>Remarks</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr each={ev, i in inventoryStocks}>
					<td>{ i+1 }</td>
					<td>{ ev.received_date}</td>
          <td>{ ev.category_name}</td>
					<td>{ ev.item_name}</td>
          <td>{ ev.quantity}</td>
          <td>{ ev.rate}</td>
          <td>{ ev.amount}</td>
          <td>{ ev.received_from}</td>
          <td>{ ev.rack_name}</td>
          <td>{ ev.remark}</td>
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
  <section class="is-fluid" show={inventory_stock_view =='show_inventory_stock_form'}>
  <div class="label">
    <div class="level-left">
      <h2 class="title" style="color: #ff3860;">{title} Inventory Stock</h2>
    </div>
    <div class="level-right">
      <button class="button" onclick={close_inventory_stock_form}>Back</button>
    </div>
  </div>
  <div class="box">
    <div class="columns is-variable is-1 is-multiline">
     <!--  <div class="column is-one-third">
       <label class="label">Employee</label>
       <div class="control">
           <div class="select is-fullwidth">
           <select ref="staff_id">
             <option each={employees} value={emp_id}>{name}
             </option>
           </select>
         </div>
         </div>
       </div> -->
  <!--     <div class="column is-one-third">
  <label class="label" for="class">Category</label>
     <div class="control">
        <div class="select is-fullwidth">
        <select ref="category_id">
          <option each={infirmaryCategories} value={category_id}>{category_name}
          </option>
        </select>
      </div>
      </div>
    </div> -->
      <!--   <div class="column is-one-third">
      <label class="label" for="class">Case</label>
      <div class="control">
          <div class="select is-fullwidth">
          <select ref="case_id">
            <option each={infirmaryCases} value={case_id}>{case_name}
            </option>
          </select>
        </div>
          </div>
      </div> -->
        
        <div class="column is-one-third">
         <label class="label">Received Date</label>
        <input class="input date flatpickr-input form-control input"  ref="received_date" placeholder="" tabindex="0" 
        type="text">
        </div>
         <div class="column is-one-third">
              <label class="label" for="class">Category</label>
              <div class="control">
                  <div class="select is-fullwidth">
                  <select ref="category_id" onchange={filterSubcategory}>
            <option each={inventoryCategories} value={category_id}>{category_name}
            </option>
          </select>
        </div>
          </div>
      </div>
      <!--   <div class="column is-one-third">
       <label class="label">Category</label>
        <select ref="category_id" style="margin-left:-10px" onchange={filterSubcategory}>
              <option each={inventoryCategories} value={category_id} >{category_name}
              </option>
       </select>
      </div> -->
        <!--  <div class="column is-one-third">
        <label class="label">Subcategory</label>
         <select ref="category_id" style="margin-left:-10px" onchange={filterItem}>
               <option each={filteredSubcategories} value={sub_category_id} >{sub_category}
               </option>
        </select>
                </div> -->
        <div class="column is-one-third">
              <label class="label" for="class">Subcategory</label>
              <div class="control">
                  <div class="select is-fullwidth">
                  <select ref="sub_category_id" onchange={filterItem}>
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
                  <select ref="item_id" >
            <option each={filteredItems} value={item_id}>{item_name}
            </option>
          </select>
        </div>
          </div>
      </div>
      <div class="column is-one-third">
         <label class="label">Quantity</label>
        <input type="text" ref="quantity" type="text" class="input">
        </div>
      <div class="column is-one-third">
              <label class="label" for="class">Unit</label>
              <div class="control">
                  <div class="select is-fullwidth">
                  <select ref="unit_id" >
            <option each={inventoryUnits} value={unit_id}>{unit}
            </option>
          </select>
        </div>
          </div>
      </div>
        <div class="column is-one-third">
         <label class="label">Rate</label>
        <input type="text" ref="rate" type="text" class="input">
        </div>
        <div class="column is-one-third">
         <label class="label">Received Form</label>
        <input type="text" ref="received_from" type="text" class="input">
        </div>
        <div class="column is-one-third">
          <label class="label" for="class">Rack</label>
            <div class="control">
              <div class="select is-fullwidth">
               <select ref="rack_id" >
                <option each={inventoryRacks} value={rack_id}>{rack_name}
                </option>
              </select>
            </div>
          </div>
       </div>  
        <div class="column is-one-third">
           <label class="label">Remark</label>
           <input type="text" ref="remark" type="text" class="input">
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
      self.loading=false
      self.inventory_stock_view='show_inventory_stock_table'
      flatpickr(".date", {
         allowInput: true,
         altFormat: "d/m/Y",
         dateFormat: "Y-m-d",
       })
      self.update()
    //  self.readInventoryDepartment()
      self.readInventoryCategory()
      self.readInventoryUnit()
      self.readInventorySubcategory()
      self.readInventoryItem()
      self.readInventoryRack()
    //  self.readInventoryStock()
    })
  self.on("unmount", function(){
      inventoryCategoryStore.off('read_inventory_category_changed', ReadInventoryCategoryChanged)
      //inventorydepartmentStore.off('read_inventorydepartment_changed', ReadInventoryDepartmentChanged)
      inventorySubcategoryStore.off('read_inventory_subcategory_changed',ReadInventorySubcategoryChanged)
      inventoryUnitStore.off('inventoryUnit_changed', InventoryUnitChanged)
      inventoryRackStore.off('inventoryRack_changed', InventoryRackChanged)
      
      inventoryStockStore.off('read_inventory_stock_changed', ReadInventoryStockChanged) 
      inventoryStockStore.off('add_inventory_stock_changed', AddInventoryStockChanged) 
      inventoryStockStore.off('edit_inventory_stock_changed', EditInventoryStockChanged)    
      inventoryStockStore.off('delete_inventory_stock_changed', DeleteInventoryStockChanged)
  })


    self.show_inventory_stock=()=>{
      //self.loading=true
       self.inventory_stock_view='show_inventory_stock_form'
    }
    self.close_inventory_stock_form=()=>{
       self.inventory_stock_view='show_inventory_stock_table'
    }
    
   self.filterSubcategory = () => {
      self.filteredSubcategories = []
      self.filteredSubcategories = self.inventorySubcategories.filter(s => {
        console.log("inside")
       return s.category_id == self.refs.category_id.value    
    })
      console.log(self.filteredSubcategories)
      self.filterItem()
      self.update()
   }

    self.filterItem = () => {
      self.filteredItems = []
      self.filteredItems = self.inventoryItems.filter(s => {
        console.log(s)
      return s.subcategory_id == self.refs.sub_category_id.value    
    })
      self.update()
   }
    
    self.readInventoryStock = () => {
      self.loading=true
       inventoryStockStore.trigger('read_inventory_stock', self.refs.r_category_id.value)
    }
    self.readInventoryUnit = () => {
       inventoryUnitStore.trigger('read_inventory_unit')
    }
    self.readInventoryRack = () => {
       inventoryRackStore.trigger('read_inventory_rack')
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

    self.add = () => {
      if(!self.refs.category_id.value){
        toastr.info("Please enter category name and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          console.log('create')
        inventoryStockStore.trigger('add_inventory_stock', self.refs.received_date.value, self.refs.category_id.value,self.refs.sub_category_id.value,self.refs.item_id.value,self.refs.rate.value,self.refs.quantity.value,self.refs.unit_id.value,self.refs.received_from.value,self.refs.rack_id.value,self.refs.remark.value)
        }else if(self.title=='Update'){
          console.log('update')
        inventoryStockStore.trigger('edit_inventory_stock', self.refs.received_date.value, self.refs.category_id.value,self.refs.sub_category_id.value,self.refs.item_id.value,self.refs.rate.value,self.refs.quantity.value,self.refs.unit_id.value,self.refs.received_from.value,self.refs.rack_id.value,self.refs.remark.value, self.edit_id)
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
      self.inventoryStocks.map(ev => {
          ev.confirmDelete = false
          ev.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.inventoryStocks.map(ev => {
        if(ev.received_id != e.item.ev.received_id){
          ev.confirmDelete = false
        }else{
          ev.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      inventoryStockStore.trigger('delete_inventory_stock', e.item.ev.received_id)
    }

    self.edit = (ev,e) => {
      console.log(ev)
      self.title='Update'
       flatpickr(".date", {
         allowInput: true,
         altFormat: "d/m/Y",
         dateFormat: "Y-m-d",
       })
       self.refs.category_id.value=ev.category_id
       self.filterSubcategory()
       self.update()
       self.refs.sub_category_id.value=ev.sub_category_id
       self.filterItem()
       self.update()
       self.refs.item_id.value=ev.item_id
       self.refs.received_date.value=ev.r_date
       self.refs.item_id.value=ev.item_id
       self.refs.unit_id.value=ev.unit_id
       self.refs.quantity.value=ev.quantity
       self.refs.rate.value=ev.rate
       self.refs.received_from.value=ev.received_from
       self.refs.item_id.value=ev.item_id
       self.refs.rack_id.value=ev.rack_id
       self.refs.remark.value=ev.remark
       self.edit_id = ev.received_id
       self.inventory_stock_view='show_inventory_stock_form'
    }
    
    inventoryStockStore.on('add_inventory_stock_changed',AddInventoryStockChanged)
    function AddInventoryStockChanged(inventoryStocks){
      console.log(inventoryStocks) 
      self.title='Create'
      self.refs.received_date.value=''
      self.refs.item_id.value=''
      self.refs.unit_id.value=''
      self.refs.rate.value=''
      self.refs.received_from.value=''
      self.refs.rack_id.value=''
      self.refs.quantity.value=''
      self.refs.remark.value=''
      self.loading = false
      self.update()
      //self.readInventoryCategory()
      console.log(self.inventoryStocks)
    }

  inventoryStockStore.on('edit_inventory_stock_changed',EditInventoryStockChanged)
    function EditInventoryStockChanged(inventoryStocks){
      console.log(inventoryStocks) 
      self.title='Create'
      self.refs.received_date.value=''
      self.refs.item_id.value=''
      self.refs.unit_id.value=''
      self.refs.rate.value=''
      self.refs.received_from.value=''
      self.refs.rack_id.value=''
      self.refs.quantity.value=''
      self.refs.remark.value=''
      self.loading = false
      self.inventoryStocks = inventoryStocks
      self.update()
     // self.readInventoryCategory()
      //console.log(self.empinventoryCategoriesloye_roles)
    }

    inventoryStockStore.on('delete_inventory_stock_changed',DeleteInventoryStockChanged)
    function DeleteInventoryStockChanged(inventoryStocks){
      console.log(inventoryStocks) 
      self.title='Create'
      self.loading = false
      self.inventoryStocks = inventoryStocks
      self.update()
      //self.readInventoryItem()
      console.log(self.inventoryStocks)
    }

    inventoryCategoryStore.on('read_inventory_category_changed',ReadInventoryCategoryChanged)
    function ReadInventoryCategoryChanged(inventoryCategories){
      console.log(inventoryCategories) 
      self.title='Create'
      self.loading = false
      self.inventoryCategories = inventoryCategories
      self.refs.sub_category_id.value = ''
      /*self.refs.department.value = ''*/
      self.refs.category_id.value = ''
      self.refs.item_id.value = ''
      self.update()
      console.log(self.inventoryCategories)
       self.readInventoryStock();
    }
    inventoryUnitStore.on('inventoryUnit_changed',InventoryUnitChanged)
    function InventoryUnitChanged(inventoryUnits){
      console.log(inventoryUnits) 
      self.title='Create'
      //self.refs.unit.value = ''
      self.loading = false
      self.inventoryUnits = inventoryUnits
      /*self.categoryDataItems = []
      self.categoryDataItems = inventoryUnits*/
      self.update()
      console.log(self.inventoryUnits)
    }
     inventoryRackStore.on('inventoryRack_changed',InventoryRackChanged)
    function InventoryRackChanged(inventoryRacks){
      console.log(inventoryRacks) 
      self.title='Create'
      /*self.refs.rack_name.value = ''*/
      self.loading = false
      self.inventoryRacks = inventoryRacks
      /*self.categoryDataItems = []
      self.categoryDataItems = inventoryRacks*/
      self.update()
      console.log(self.inventoryRacks)
    }
  inventorySubcategoryStore.on('read_inventory_subcategory_changed',ReadInventorySubcategoryChanged)
    function ReadInventorySubcategoryChanged(inventorySubcategories){
      console.log(inventorySubcategories) 
      self.title='Create'
      self.loading = false
      self.inventorySubcategories = inventorySubcategories
      self.refs.sub_category_id.value = ''
      /*self.refs.department.value = ''*/
      self.refs.item_id.value = ''
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
      /*self.refs.department.value = ''*/
      self.refs.item_id.value = ''
      self.refs.category_id.value = ''
      self.update()
      console.log(self.inventoryItems)
    }  
    inventoryStockStore.on('read_inventory_stock_changed',ReadInventoryStockChanged)
    function ReadInventoryStockChanged(inventoryStocks){
      console.log(inventoryStocks) 
      self.title='Create'
      self.loading = false
      self.inventoryStocks = inventoryStocks
      self.update()
      console.log(self.inventoryStocks)
    }  

    /*inventorydepartmentStore.on('read_inventorydepartment_changed',ReadInventoryDepartmentChanged)
    function ReadInventoryDepartmentChanged(inventoryDepartments){
      console.log(inventoryDepartments) 
      self.inventoryDepartments = inventoryDepartments
      self.update()
      console.log(self.inventoryDepartments)
    }*/

</script>
</inventory-stock>