<inventory-department>
 <print-header></print-header> 
  <loading-bar if={loading}></loading-bar>
	<section class=" is-fluid"  show={inventory_view =='show_assign_department'}>
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
                        <span if={role=='ADMIN'}> <a class="button is-small is-rounded" rel="nofollow" onclick={assignUser.bind(this, ev)}>Assign User</a></span>
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

  <section  show={inventory_view =='show_assign_table'}>
       <div class="level">
        <div class="level-left">
       
        </div>
        <div class="level-right">
              <button class="button is-info is-small is-pulled-right" onclick={backAssignTable}>Back</button>
        </div>
      </div>
         <div class="columns is-multiline is-mobile">
          <div class="column">
          <table class="table is-fullwidth is-striped is-hoverable">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Name</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr each={c, i in freeStaffs}>
                <td>{c.employee_id}</td>
                <td>{c.staff_name}</td>
                 <td class="has-text-right">
                  <input type="checkbox" checked={selected} id="{'freeStaffCheckBox'+c.employee_id}" onclick={selectFreeStaff.bind(this,c)} > 
                </td>
              </tr>
            </tbody>
          </table>
        </div>

          <div class="column is-vertical-center is-narrow has-text-centered is-multiline" style="margin-top:50px;">
          <table>
            <tr>
              <td>
                <button class="button" onclick={assignStaffs} style="margin-top:20px;">Assign Department  
                  <span style="margin-left:10px" class="fas fa-angle-double-right"></span>
                </button>
              </td>
            </tr>
            <tr>
              <td>
                <button class="button" onclick={freeUpStaffs} style="margin-top:20px;"><span style="margin-right:10px;" class="fas fa-angle-double-left"></span> Free up Department</button>
              </td>
            </tr>
          </table>
        </div>

        <div class="column">
          <table class="table is-fullwidth is-striped is-hoverable">
            <thead>
              <tr>
                <th></th>
                <th>Employee ID</th>
                <th>Department</th>
                <th>Namer</th>
              </tr>
            </thead>
            <tbody>
              <tr each={c, i in assignedStaffs}>
                <td class="has-text-right">
                  <input type="checkbox" checked={selected} id="{'assignedStaffCheckBox'+c.id}" onclick={selectAssigndStaff.bind(this,c)} > 
                </td>
                <td>{c.employee_id}</td>
                <td>{c.department}</td>
                <td>{c.staff_name}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  </section>
	<script>
	var self = this
    self.on("mount", function(){
      self.title='Create'
      self.role = getCookie('role')
      self.inventory_view ='show_assign_department'
      self.update()
      self.readInventoryDepartment()
      self.readAssignStaff()
    })
    self.on("unmount", function(){
      inventorydepartmentStore.off('add_inventorydepartment_changed', AddInventoryDepartmentChanged)
      inventorydepartmentStore.off('read_inventorydepartment_changed', ReadInventoryDepartmentChanged)
      inventorydepartmentStore.off('read_readAssignStaff_changed', ReadAssignStaffChanged)
      inventorydepartmentStore.off('read_readFreeStaff_changed', ReadFreeStaffChanged)
      inventorydepartmentStore.off('edit_inventorydepartment_changed',EditInventoryDepartmentChanged)
      inventorydepartmentStore.off('assign_staffs_changed',AssignStaffsChanged)
      inventorydepartmentStore.off('delete_inventorydepartment_changed',DeleteInventoryDepartmentChanged)
    })

    //read employe_roles
    self.readInventoryDepartment = () => {
       inventorydepartmentStore.trigger('read_inventorydepartment')
    }

    self.readAssignStaff = () => {
       inventorydepartmentStore.trigger('readAssignStaff')
    }
    self.backAssignTable = () => {
       self.inventory_view ='show_assign_department'
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


    self.selectFreeStaff = (staff,e) => {
        self.freeStaffs.map(i=>{
          if(staff.employee_id==i.employee_id){
            i.selected=!i.selected
          }
        })
    }

    self.selectAssigndStaff = (staff,e) => {
        self.assignedStaffs.map(i=>{
          if(staff.id==i.id){
            i.selected=!i.selected
          }
        })
        console.log(self.assignedStaffs)
    }

    self.assignStaffs = () =>{
      console.log("inside")
      let employee_to_assign = self.freeStaffs.filter(c=>{
        return c.selected == true
      })
      console.log(employee_to_assign)

      if(employee_to_assign.length==0){
        toastr.error('Please select Employee to assign.')
        return
      }else{
        self.loading = true
        inventorydepartmentStore.trigger('assign_staff', self.department, employee_to_assign)
      }
    }

    self.freeUpStaffs = () =>{
      let employee_to_free = self.assignedStaffs.filter(c=>{
        return c.selected == true
      })
      
      if(employee_to_free.length==0){
        toastr.error('Please select Employee to free .')
        return
      }else{
        self.loading = true
        inventorydepartmentStore.trigger('free_up_staff', self.department, employee_to_free)
      }
    }

    self.assignUser = (ev,e) => {
       console.log(ev)
       if(ev!=undefined){
        self.department= ev.department
       } 
       inventorydepartmentStore.trigger('readFreeStaff',  self.department)
      self.inventory_view ='show_assign_table'
     //  self.readAssignStaff()
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
     inventorydepartmentStore.on('read_Free_changed',ReadInventoryDepartmentChanged)
    function ReadInventoryDepartmentChanged(inventoryDepartments){
      console.log(inventoryDepartments) 
      self.title='Create'
      self.refs.addInventoryDepartmentInput.value =''
      self.loading = false
      self.inventoryDepartments = inventoryDepartments
      self.update()
      console.log(self.inventoryDepartments)
    }

    /*inventorydepartmentStore.off('read_readAssignStaff_changed', ReadAssignStaffChanged)
      inventorydepartmentStore.off('read_readFreeStaff_changed', ReadFreeStaffChanged)*/

    inventorydepartmentStore.on('read_readAssignStaff_changed',ReadAssignStaffChanged)
    function ReadAssignStaffChanged(assignedStaffs){
      console.log(assignedStaffs) 
      self.loading = false
      self.assignedStaffs = assignedStaffs
      self.update()
      console.log(self.assignedStaffs)
    }


    inventorydepartmentStore.on('read_readFreeStaff_changed',ReadFreeStaffChanged)
    function ReadFreeStaffChanged(freeStaffs){
      console.log(freeStaffs) 
      self.loading = false
      self.freeStaffs = freeStaffs
      self.update()
      console.log(self.freeStaffs)
    }

    inventorydepartmentStore.on('assign_staffs_changed',AssignStaffsChanged)
    function AssignStaffsChanged(staffs){
      self.loading = false
      self.readAssignStaff()
      self.assignUser()
      
    } 

</script>
</inventory-department>