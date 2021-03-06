<inventory-sale>
 <print-header></print-header> 
  <loading-bar if={loading}></loading-bar>  
	<section class=" is-fluid" show={inventory_sale_view == 'show_inventory_sale_table'}>
        <h4 class="title has-text-centered" style="color: #ff3860;">Goods Sale From Store Department</h4>
		<div class="box no-print">
			<div class="columns">
        <div class="column is-narrow">
          <label class="label" style="margin-left:-14px">Category</label>
        </div>
        <div class="column is-narrow">
          <div class="control">
            <div class="select" >
              <select ref="r_category_id" onchange={readInventorySale}>
                <option each={inventoryCategories} value={category_id} >{category_name}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="column">
           <button class="button is-success has-text-weight-bold ml5 is-pulled-right" onclick={downloadCSV} title="Excel Down Load">
              <span class="icon">
                  <i class="far fa-file-excel"></i>
              </span>
          </button>
         <button class="button is-primary has-text-weight-bold is-pulled-right ml5 " onclick="window.print()" title="Print">
                  <span class="icon">
                     <i class="fas fa-print"></i>
                 </span>
        </button>
        <button class="button is-warning is-rounded is-pulled-right ml5" onclick={readInventorySale} style="margin-left:3px;margin-right:3px">
        <span class="icon">
          <span class="fas fa-sync-alt"></span>
        </span>
        </button>
          <button class="button is-info is-rounded is-pulled-right ml5" onclick={show_inventory_sale}>
          <span class="icon">
            <span class="fas fa-plus"></span>
          </span>
        </button>
         <input class="input is-pulled-right" ref="searchInventorySale" onkeyup={filteredInventorySale} type="text" style="width:200px;margin-right:5px;" placeholder="Search" >
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
          <th>Sale To</th>
          <!-- <th>Purpose</th> -->
        <!--   <th>Received From</th>
        <th>Rack</th>
        <th>Remarks</th> -->
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr each={ev, i in filteredInventorySales}>
					<td>{ i+1 }</td>
					<td>{ ev.sa_date}</td>
          <td>{ ev.category_name}</td>
					<td>{ ev.item_name}</td>
          <td>{ ev.quantity}</td>
          <td>{ ev.sale_rate}</td>
          <td>{ ev.amount}</td>
          <td>{ ev.sale_to}</td>
          <!-- <td>{ ev.purpose}</td> -->
         <!--  <td>{ ev.sale_to}</td>
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
  <section class="is-fluid" show={inventory_sale_view =='show_inventory_sale_form'}>
  <div class="label">
    <div class="level-left">
      <h2 class="title" style="color: #ff3860;">{title} Inventory Sale</h2>
    </div>
    <div class="level-right">
      <button class="button" onclick={close_inventory_sale_form}>Back</button>
    </div>
  </div>
  <div class="box">
    <div class="columns is-variable is-1 is-multiline">
   
        
        <div class="column is-one-third">
         <label class="label">Sale Date</label>
        <input class="input date flatpickr-input form-control input"  ref="sale_date" placeholder="" tabindex="0" type="text"onkeyup={addEnter}>
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
                  <select ref="sub_category_id" id="sub_category_id"  onchange={filterItem}>
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
          <label class="label">In Stock</label>
            <input type="text" ref="available_quantity" type="text" class="input" onkeyup={addEnter} >
        </div>
         <div class="column is-one-third">
          <label class="label">Quantity</label>
            <input type="text" ref="sale_quantity" type="text" class="input" onkeyup={addEnter} >
        </div>
         <div class="column is-one-third">
          <label class="label">Unit</label>
            <input type="text" ref="unit" type="text" class="input" onkeyup={addEnter} >
        </div>
        <div class="column is-one-third">
          <label class="label">Rate</label>
            <input type="text" ref="rate" type="text" class="input" onkeyup={addEnter} >
        </div>
        <div class="column is-one-third">
          <label class="label">Sale To</label>
            <input type="text" ref="sale_to" type="text" class="input" onkeyup={addEnter} >
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
      self.inventory_sale_view='show_inventory_sale_table'
     // self.refs.sale_type.value='Staff'
       flatpickr(".date", {
         allowInput: true,
          dateFormat: "d/m/Y",
       })
      //self.showSaleType()
      self.loading=false
      self.update()
    //  self.readInventoryDepartment()
      self.readInventoryCategory()
      //self.readInventoryUnit()
      self.readInventorySubcategory()
      //self.readEmployee()
      self.readInventoryItem()
     // self.readInventoryRack()
    //  self.readInventorySale()
    })
  self.on("unmount", function(){
      inventoryCategoryStore.off('read_inventory_category_changed', ReadInventoryCategoryChanged)
      inventoryItemStore.off('read_inventory_item_changed', ReadInventoryItemChanged)
      inventorySubcategoryStore.off('read_inventory_subcategory_changed',ReadInventorySubcategoryChanged)
      inventoryIssueStore.off('read_inventory_available_quantity_changed', ReadInventoryAvailableQuantityChanged)
      // staffinfirmaryStore.off('read_employee_changed',EmployeeChanged)
      inventorySaleStore.off('read_inventory_sale_changed', ReadInventorySaleChanged) 
      inventorySaleStore.off('add_inventory_sale_changed', AddInventorySaleChanged) 
      inventorySaleStore.off('edit_inventory_sale_changed', EditInventorySaleChanged)    
      inventorySaleStore.off('delete_inventory_sale_changed', DeleteInventorySaleChanged)
      inventorySaleStore.off('csv_export_inventory_sale_changed',csvInventorySaleChanged)
  })

     self.filteredInventorySale = ()=>{
        self.filteredInventorySales = self.inventorySales.filter(c => {
          return JSON.stringify(c).toLowerCase().indexOf(self.refs.searchInventorySale.value.toLowerCase())>=0
        })
      } 
    /*self.showSaleType=()=>{
        console.log(self.refs.sale_type.value)
        if(self.refs.sale_type.value=='Staff'){
          self.show_view='show_employee' 
          self.refs.sale_to.value=''
        }else{
          self.show_view='show_text_box'
          self.refs.staff_id.value=''
        }
    }*/
    self.show_inventory_sale=()=>{
       self.inventory_sale_view='show_inventory_sale_form'
       self.title='Create'
       self.refs.category_id.value=''
       self.refs.sub_category_id.value=''
       self.refs.item_id.value=''
       self.refs.sale_date.value=''
       self.refs.unit.value=''
       self.refs.available_quantity.value=''
       self.refs.sale_quantity.value=''
       self.refs.rate.value=''
       self.refs.sale_to.value=''
     //  self.refs.return_type.value='Non-Retunable'
    }
    self.close_inventory_sale_form=()=>{
       self.inventory_sale_view='show_inventory_sale_table'
       self.title='Create'
       self.refs.category_id.value=''
       self.refs.sub_category_id.value=''
       self.refs.item_id.value=''
       self.refs.sale_date.value=''
       self.refs.unit.value=''
       self.refs.available_quantity.value=''
       self.refs.sale_quantity.value=''
       self.refs.rate.value=''
       self.refs.sale_to.value=''
    }
    
   self.filterSubcategory = () => {
      self.filteredSubcategories = []
      self.filteredSubcategories = self.inventorySubcategories.filter(s => {
        console.log("inside")
      return s.category_id == self.refs.category_id.value    
    })
      self.update()
      console.log(self.filteredSubcategories)
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
    
    self.readInventorySale = () => {
      self.loading=true
       inventorySaleStore.trigger('read_inventory_sale', self.refs.r_category_id.value)
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
       inventoryIssueStore.trigger('read_inventory_available_quantity',self.refs.item_id.value)
    }

    /*self.readEmployee = () => {
        staffinfirmaryStore.trigger('read_employee')
     }*/

     self.downloadCSV = () => {
      inventorySaleStore.trigger('csv_export_inventory_sale',self.inventorySales)
    }

    self.add = () => {

      self.sale_date=convertDate(self.refs.sale_date.value)
      self.category_name = $("#category_id option:selected").text();
      self.subcategory_name = $("#sub_category_id option:selected").text();  
      self.item_name = $("#item_id option:selected").text();  

      self.aq=self.refs.available_quantity.value
      self.iq=self.refs.sale_quantity.value
       if(Number(self.aq) < Number(self.iq)){
          toastr.info("Sale Quantity is greater than available stock")
          return
       } 
      if(!self.refs.category_id.value){
        toastr.info("Please enter category name and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          console.log('create')
        inventorySaleStore.trigger('add_inventory_sale', self.sale_date, self.refs.category_id.value,self.refs.sub_category_id.value,self.refs.item_id.value,self.refs.sale_to.value, self.refs.available_quantity.value,self.refs.sale_quantity.value,self.unit_id,self.refs.rate.value,self.category_name, self.subcategory_name,self.item_name)
        }else if(self.title=='Update'){
          console.log('update')
        inventorySaleStore.trigger('edit_inventory_sale', self.sale_date, self.refs.category_id.value,self.refs.sub_category_id.value,self.refs.item_id.value,self.refs.sale_to.value, self.refs.available_quantity.value,self.refs.sale_quantity.value,self.unit_id,self.refs.rate.value , self.edit_id,self.category_name, self.subcategory_name,self.item_name)
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
      self.inventorySales.map(ev => {
          ev.confirmDelete = false
          ev.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.inventorySales.map(ev => {
        if(ev.sale_id != e.item.ev.sale_id){
          ev.confirmDelete = false
        }else{
          ev.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      console.log("delet")
      inventorySaleStore.trigger('delete_inventory_sale', e.item.ev.sale_id)
    }

    self.edit = (ev,e) => {
      console.log("insie edit")
        flatpickr(".date", {
         allowInput: true,
          dateFormat: "d/m/Y",
       })
       self.inventory_sale_view='show_inventory_sale_form'
       self.refs.category_id.value=ev.category_id
       self.filterSubcategory()
       self.update()
       self.refs.sub_category_id.value=ev.sub_category_id
       self.filterItem()
       self.update()
       self.refs.item_id.value=ev.item_id
       self.refs.sale_date.value=ev.sa_date
       self.refs.unit.value=ev.unit
       self.unit_id=ev.unit_id
       self.refs.rate.value=ev.sale_rate
       self.refs.available_quantity.value=ev.available_quantity
       self.refs.sale_quantity.value=ev.sale_quantity
       self.refs.sale_to.value=ev.sale_to
       self.edit_id = ev.sale_id
       self.title='Update'
       self.inventory_sale_view='show_inventory_sale_form'
    }
    
    inventorySaleStore.on('add_inventory_sale_changed',AddInventorySaleChanged)
    function AddInventorySaleChanged(inventorySales){
      console.log(inventorySales) 
      self.title='Create'
     self.refs.category_id.value=''
       self.refs.sub_category_id.value=''
       self.refs.item_id.value=''
       self.refs.sale_date.value=''
       self.refs.unit.value=''
       self.refs.rate.value=''
       self.refs.available_quantity.value=''
       self.refs.sale_quantity.value=''
       //self.refs.sale_type.value=''
      // self.refs.return_type.value=''
       self.refs.sale_to.value=''
       self.refs.rate.value=''
      // self.refs.staff_id.value=''
       //self.refs.purpose.value=''
      self.loading = false
      self.readInventorySale()
      self.update()
      //self.readInventoryCategory()
      console.log(self.inventorySales)
    }

  inventorySaleStore.on('edit_inventory_sale_changed',EditInventorySaleChanged)
    function EditInventorySaleChanged(inventorySales){
      console.log(inventorySales) 
       self.title='Create'
       self.refs.category_id.value=''
       self.refs.sub_category_id.value=''
       self.refs.item_id.value=''
       self.refs.sale_date.value=''
       self.refs.unit.value=''
       self.refs.available_quantity.value=''
       self.refs.sale_quantity.value=''
       self.refs.rate.value=''
      // self.refs.sale_type.value=''
      // self.refs.return_type.value=''
       self.refs.sale_to.value=''
       //self.refs.staff_id.value=''
       //self.refs.purpose.value=''
      self.loading = false
      self.inventorySales = inventorySales
      self.filteredInventorySales = inventorySales
      self.readInventorySale()
      self.update()
     // self.readInventoryCategory()
      //console.log(self.empinventoryCategoriesloye_roles)
    }

    inventorySaleStore.on('delete_inventory_sale_changed',DeleteInventorySaleChanged)
    function DeleteInventorySaleChanged(inventorySales){
      console.log(inventorySales) 
      self.title='Create'
      self.loading = false
      self.inventorySales = inventorySales
      self.filteredInventorySales = inventorySales
      self.update()
      //self.readInventoryItem()
      console.log(self.inventorySales)
    }

    inventoryCategoryStore.on('read_inventory_category_changed',ReadInventoryCategoryChanged)
    function ReadInventoryCategoryChanged(inventoryCategories){
      console.log(inventoryCategories) 
      //self.title='Create'
      self.loading = false
      self.inventoryCategories = inventoryCategories
      self.refs.sub_category_id.value = ''
      /*self.refs.department.value = ''*/
      
      self.update()
      console.log(self.inventoryCategories)
      self.readInventorySale()
    }
   
inventoryIssueStore.on('read_inventory_available_quantity_changed',ReadInventoryAvailableQuantityChanged)
    function ReadInventoryAvailableQuantityChanged(availableItems,rack_ids){
      console.log(availableItems) 
     // self.title='Create'
      self.loading = false
      self.availableItems = availableItems
      if(availableItems[0].total_issued==null || availableItems[0].total_issued==''){
        availableItems[0].total_issued=0;
      }
      if(availableItems[0].total_sale==null || availableItems[0].total_sale==''){
        availableItems[0].total_sale=0;
      }
       if(self.title=='Create'){
         self.refs.available_quantity.value=availableItems[0].total_received - (availableItems[0].total_issued + availableItems[0].total_sale)
        }else{
          self.refs.available_quantity.value=availableItems[0].total_received - (availableItems[0].total_issued + availableItems[0].total_sale) + Number(self.refs.sale_quantity.value)
          console.log("inside")
        }
      self.refs.unit.value=availableItems[0].unit
      self.unit_id=availableItems[0].unit_id
      self.update()
      console.log(self.availableItems)
    }
  inventorySubcategoryStore.on('read_inventory_subcategory_changed',ReadInventorySubcategoryChanged)
    function ReadInventorySubcategoryChanged(inventorySubcategories){
      console.log(inventorySubcategories) 
     // self.title='Create'
      self.loading = false
      self.inventorySubcategories = inventorySubcategories
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
    inventorySaleStore.on('read_inventory_sale_changed',ReadInventorySaleChanged)
    function ReadInventorySaleChanged(inventorySales){
      console.log(inventorySales) 
      self.title='Create'
      self.loading = false
      self.inventorySales = inventorySales
      self.filteredInventorySales = inventorySales
      self.update()
      console.log(self.inventorySales)
    }  

  /*staffinfirmaryStore.on('read_employee_changed',EmployeeChanged)
     function EmployeeChanged(employees){
       console.log(employees) 
       self.employees = employees
       self.update()
       console.log(self.employees)
     }*/

    inventorySaleStore.on('csv_export_inventory_sale_changed',csvInventorySaleChanged)
    function csvInventorySaleChanged(url){
      var open_url = window.location.origin+url 
      window.open(open_url);
      self.loading = false
      self.update()
    }

</script>
</inventory-sale>