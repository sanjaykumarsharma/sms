<inventory-department>
  <header></header>
  <loading-bar if={loading}></loading-bar>
	<section class=" is-fluid">
		<h2 class="title has-text-centered" style="color: #ff3860;">Inventory Department</h2>
		<div class="box no-print">
			<div class="columns">
				<div class="column is-narrow">
					<label class="label">Department</label>
				</div>
				<div class="column is-narrow">
					<div class="control">
						<div class="control">
							<input class=" input"
              ref="addInventoryDepartmentInput" type="text" onkeyup={addEnter}>
						</div>
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
           <button class="button is-warning is-rounded is-pulled-right" onclick={readInventoryDepartment} style="margin-right:5px;margin-left:5px">
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
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr each={ev, i in inventoryDepartments}>
					<td>{ i+1 }</td>
					<td>{ ev.department}</td>
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
      self.update()
      self.readInventoryDepartment()
    })
    self.on("unmount", function(){
      inventorydepartmentStore.off('add_inventorydepartment_changed', AddInventoryDepartmentChanged)
      inventorydepartmentStore.off('read_inventorydepartment_changed', ReadInventoryDepartmentChanged)
      inventorydepartmentStore.off('edit_inventorydepartment_changed',EditInventoryDepartmentChanged)
      inventorydepartmentStore.off('delete_inventorydepartment_changed',DeleteInventoryDepartmentChanged)
    })

    //read employe_roles
    self.readInventoryDepartment = () => {
       inventorydepartmentStore.trigger('read_inventorydepartment')
    }

     self.add = () => {
      if(!self.refs.addInventoryDepartmentInput.value){
        toastr.info("Please enter Inventory Department and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          console.log('create')
          inventorydepartmentStore.trigger('add_inventorydepartment', self.refs.addInventoryDepartmentInput.value)
        }else if(self.title=='Update'){
          console.log('update')
          inventorydepartmentStore.trigger('edit_inventorydepartment', self.refs.addInventoryDepartmentInput.value,self.edit_id)
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
      self.inventoryDepartments.map(ev => {
          ev.confirmDelete = false
          ev.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.inventoryDepartments.map(ev => {
        if(ev.department != e.item.ev.department){
          ev.confirmDelete = false
        }else{
          ev.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      inventorydepartmentStore.trigger('delete_inventorydepartment', e.item.ev.department)
    }

    self.edit = (ev,e) => {
      console.log(ev)
      self.title='Update'
      self.refs.addInventoryDepartmentInput.value = ev.department
      self.edit_id = ev.department
    }
    
    inventorydepartmentStore.on('add_inventorydepartment_changed',AddInventoryDepartmentChanged)
    function AddInventoryDepartmentChanged(inventoryDepartments){
      console.log(inventoryDepartments) 
      self.title='Create'
      self.refs.addInventoryDepartmentInput.value =''
      self.loading = false
      self.inventoryDepartments = inventoryDepartments
      self.update()
      self.readInventoryDepartment()
      console.log(self.inventoryDepartments)
    }

    inventorydepartmentStore.on('edit_inventorydepartment_changed',EditInventoryDepartmentChanged)
    function EditInventoryDepartmentChanged(inventoryDepartments){
      console.log(inventoryDepartments) 
      self.title='Update'
      self.refs.addInventoryDepartmentInput.value =''
      self.loading = false
      self.inventoryDepartments = inventoryDepartments
      self.update()
      self.readInventoryDepartment()
      //console.log(self.empinventoryDepartmentsloye_roles)
    }

    inventorydepartmentStore.on('delete_inventorydepartment_changed',DeleteInventoryDepartmentChanged)
    function DeleteInventoryDepartmentChanged(inventoryDepartments){
      console.log(inventoryDepartments) 
      self.title='Create'
      self.refs.addInventoryDepartmentInput.value =''
      self.loading = false
      self.inventoryDepartments = inventoryDepartments
      self.update()
      self.readInventoryDepartment()
      console.log(self.inventoryDepartments)
    }

    inventorydepartmentStore.on('read_inventorydepartment_changed',ReadInventoryDepartmentChanged)
    function ReadInventoryDepartmentChanged(inventoryDepartments){
      console.log(inventoryDepartments) 
      self.title='Create'
      self.refs.addInventoryDepartmentInput.value =''
      self.loading = false
      self.inventoryDepartments = inventoryDepartments
      self.update()
      console.log(self.inventoryDepartments)
    }

</script>
</inventory-department>