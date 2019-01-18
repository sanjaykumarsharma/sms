<inventory-returnable>
  <header></header>
	<section class=" is-fluid" show={inventory_returnable_view == 'show_inventory_returnable_table'}>
		    <h4 class="title has-text-centered" style="color: #ff3860;">Returnable Items</h4>
		<div class="box no-print">
			<div class="columns">
        <div class="column is-narrow">
          <label class="label" style="margin-left:-14px">Type</label>
        </div>
        <div class="column is-narrow">
          <div class="control">
            <div class="select" >
              <select ref="r_returnable_type">
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
              <select ref="r_category_id" onchange={readInventoryReturnableItem}>
                <option each={inventoryCategories} value={category_id} >{category_name}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="column">
          <button class="button is-warning is-rounded is-pulled-right" onclick={readInventoryReturnableItem} style="margin-left:5px;margin-right:5px">
          <span class="icon">
            <span class="fas fa-sync-alt"></span>
          </span>
          </button>
           <button class="button is-info is-rounded is-pulled-right" onclick={show_inventory_returnable_modal}>
         <span class="icon"><span class="fas fa-plus"></span></span>
          </button>
			</div>
    </div>
		</div>
		<table class="table is-fullwidth is-striped is-hoverable">
			<thead>
				<tr>
          <th>SL</th>
					<th>#</th>
          <th>Date</th>
          <th>Category</th>
					<th>Item</th>
          <th>Issue To</th>
          <th>Issued Quantity</th>
          <th>Availble Quantity</th>
          <th>Purpose</th>
				</tr>
			</thead>
			<tbody>
				<tr each={ev, i in inventoryReturnableGoods}>
					<td>{ i+1 }</td>
          <td><input type="checkbox" class="id_check_box" checked={ev.done} id="{ 'IssueId' + ev.issue_id }" onclick={selectReturnableGoods.bind(this,ev)} > </td>
					<td>{ ev.issued_date}</td>
          <td>{ ev.category_name}</td>
					<td>{ ev.item_name}</td>
          <td>{ ev.issue_to} {ev.staff_name}</td>
          <td>{ ev.issued_quantity}</td>
          <td>{ ev.available_qty}</td>
          <td>{ ev.purpose}</td>
				</tr>
			</tbody>
		</table>
	</section>

   <!-- Retunable Item Modal Start -->
  <div id="returnableModal" class="modal ">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{title} Return Goods Entry</p>
      </header>
      <section class="modal-card-body">
        
        <div class="columns">
          <div class="column">
            <div class="field">
              <label class="label" for="role">Return Date</label>
              <div class="control">
                <input class="input" type="text" ref="return_date" >
              </div>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <label class="label" for="role">Return To</label>
              <div class="control">
                <input class="input" type="text" ref="return_to" >
              </div>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <label class="label" for="role">Available Quantity</label>
              <div class="control">
                <input class="input" type="text" ref="available_quantity" >
              </div>
            </div>
          </div>
        </div>
         <div class="columns">
          <div class="column">
            <div class="field">
              <label class="label" for="role">Return Quantity</label>
              <div class="control">
                <input class="input" type="text" ref="return_quantity" >
              </div>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <label class="label" for="role">Return Rack</label>
              <div class="control">
                <input class="input" type="text" ref="rack_name" >
              </div>
            </div>
          </div>
           <div class="column">
            <div class="field">
              <label class="label" for="role">Remarks</label>
              <div class="control">
                <textarea class="input" type="text" ref="remark" rows="3"></textarea>
              </div>
            </div>
          </div>
        </div>

      </section>
      <footer class="modal-card-foot">
        <button class="button is-danger" onclick={add} >{title}</button>
        <button class="button" id="item-modal-close" onclick={closeReturnableModal}>Cancel</button>
      </footer>
    </div>
  </div>
  <!-- Retunable  Modal End -->
  
	<script>
	var self = this
    self.on("mount", function(){
      self.title='Create'
      self.loading = false;
      self.role = getCookie('role')
      self.inventory_returnable_view='show_inventory_returnable_table'
      self.refs.r_returnable_type.value='Staff'
      self.readInventoryCategory()
      flatpickr(".date", {
         allowInput: true,
         altFormat: "d/m/Y",
         dateFormat: "Y-m-d",
       })
      self.update()
    })
    self.on("unmount", function(){
        inventoryCategoryStore.off('read_inventory_category_changed', ReadInventoryCategoryChanged)
        inventoryIssueStore.off('read_inventory_returnable_changed', ReadInventoryReturnableChanged) 
        inventoryIssueStore.off('add_inventory_return_goods_changed', AddInventoryReturnGoodsChanged) 
        /*inventoryIssueStore.off('edit_inventory_issue_changed', EditInventoryIssueChanged)    
        inventoryIssueStore.off('delete_inventory_issue_changed', DeleteInventoryIssueChanged)
        inventoryIssueStore.off('read_inventory_available_quantity_changed', ReadInventoryAvailableQuantityChanged)*/
    })
    self.selectReturnableGoods = (item,event) => {
      item.done=!event.item.ev.done
      console.log(item.done)
      if(event.item.ev.done==true){
        self.obj={};
        self.obj.issue_id = item.issue_id;
        self.obj.issue_date = item.issue_date;
        self.obj.item_id=item.issue_item_id
        self.obj.category_id=item.issue_category_id
        self.obj.sub_category_id=item.issue_sub_category_id
        self.obj.rack_id=item.issue_rack_id
        self.obj.rack_name=item.rack_name
        self.obj.unit=item.issue_unit
        self.obj.issue_type=item.issue_type
        self.obj.return_type=item.return_type
        self.obj.staff_id=item.staff_id
        self.obj.issue_to=item.issue_to
        self.obj.available_quantity=item.available_quantity
        self.obj.issue_quantity=item.issue_quantity
        self.refs.available_quantity.value=item.available_quantity
       self.refs.rack_name.value=item.rack_name
        console.log(self.obj)
        self.show_inventory_returnable_modal()
        
       }
     }

    self.readInventoryCategory = () => {
       inventoryCategoryStore.trigger('read_inventory_category')
    }
    self.show_inventory_returnable_modal = () => {
      self.title = 'Add'
      $("#returnableModal").addClass("is-active");
    }

    self.closeReturnableModal = () => {
      $("#returnableModal").removeClass("is-active");
      self.refs.return_date.value=''
      self.refs.available_quantity.value=''
      self.refs.rack_name.value=''
      self.refs.return_to.value=''
      self.refs.return_quantity.value=''
      self.refs.remark.value=''
       self.inventoryReturnableGoods.map(i=>{
          i.done = false;
          $('IssueId'+i.issue_id).prop('checked', false); 
       })
    }
    
    self.readInventoryReturnableItem = () => {
       inventoryIssueStore.trigger('read_inventory_returnable_item', self.refs.r_category_id.value,self.refs.r_returnable_type.value,)
    }
    

    self.add = () => { 
      if(!self.refs.return_date.value){
        toastr.info("Please enter return_date  and try again")
      }else{
        self.loading = true
          console.log('create')
          inventoryIssueStore.trigger('add_inventory_return_goods',self.obj, self.refs.return_date.value,
            self.refs.return_to.value,self.refs.return_quantity.value,self.refs.remark.value)
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

   
    
    /*inventoryIssueStore.on('add_inventory_returnable_changed',AddInventoryReturnableChanged)
    function AddInventoryReturnableChanged(inventoryReturnableGoods){
      console.log(inventoryReturnableGoods) 
      self.title='Create'
      self.loading = false
      self.update()
      //self.readInventoryCategory()
      console.log(self.inventoryReturnableGoods)
    }*/

    inventoryIssueStore.on('add_inventory_return_goods_changed',AddInventoryReturnGoodsChanged)
    function AddInventoryReturnGoodsChanged(inventoryReturnableGoods){
      console.log(inventoryReturnableGoods) 
      self.title='Create'
      self.loading = false
      self.update()
      self.closeReturnableModal();
      //self.readInventoryCategory()
      console.log(self.inventoryReturnableGoods)
    }

 
    inventoryCategoryStore.on('read_inventory_category_changed',ReadInventoryCategoryChanged)
    function ReadInventoryCategoryChanged(inventoryCategories){
      console.log(inventoryCategories) 
      //self.title='Create'
      self.loading = false
      self.inventoryCategories = inventoryCategories
      self.update()
      self.readInventoryReturnableItem()
      console.log(self.inventoryCategories)
      //self.readInventoryIssue()
    }

    inventoryIssueStore.on('read_inventory_returnable_changed',ReadInventoryReturnableChanged)
    function ReadInventoryReturnableChanged(inventoryReturnableGoods){
      console.log(inventoryReturnableGoods) 
      self.inventoryReturnableGoods = inventoryReturnableGoods
      self.inventoryReturnableGoods.map(i=>{
         if(i.issue_id==null){
              i.done = false; //RoleId1
               self.issue_id=i.issue_id
         }else{
          i.done = false;
          $('IssueId'+i.issue_id).prop('checked', false);
         }  
       })
      self.loading = false
      self.update()
      console.log(self.inventoryReturnableGoods)
    }
  
    /*inventoryIssueStore.on('read_inventory_returnable_changed',ReadInventoryReturrnableChanged)
    function ReadInventoryReturrnableChanged(inventoryIssues){
      console.log(inventoryIssues) 
      self.title='Create'
      self.loading = false
      self.inventoryIssues = inventoryIssues
      self.update()
      console.log(self.inventoryIssues)
    }  
*/
 /* staffinfirmaryStore.on('read_employee_changed',EmployeeChanged)
     function EmployeeChanged(employees){
       console.log(employees) 
       self.employees = employees
       self.update()
       console.log(self.employees)
     }*/

</script>
</inventory-returnable>