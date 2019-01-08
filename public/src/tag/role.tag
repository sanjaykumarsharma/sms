<role>
  <header></header> 
  <loading-bar if={loading}></loading-bar>
	<section class=" is-fluid">
		<h2 class="title has-text-centered" style="color: #ff3860;">Employee Role Details</h2>
		<div class="box no-print">
			<div class="columns">
				<div class="column is-narrow">
					<label class="label">Employee</label>
				</div>
				<div class="column is-narrow">
					<div class="control">
						<div class="select">
							<select ref="employee_id">
								<option each={employees} value={employee_id}>{name}
	              </option>
							</select>
						</div>
					</div>
				</div>
				<div class="column is-narrow">
					<label class="label">Role</label>
				</div>
				<div class="column is-narrow">
					<div class="control">
            <div class="select">
              <select ref="addEmployeeRoleInput">
                <option value='Activity'>Activity</option>
                <option value='Mentor'>Mentor</option>
                <option value='Infirmary'>Infirmary</option>
                <option value='Store'>Store</option>
                <option value='Time Table'>Time Table</option>
                <option value='Discipline'>Discipline</option>
                <option value='Career'>Career</option>
                <option value='Admission'>Admission</option>
                <option value='Fees'>Fees</option>
                <option value='Certificate'>Certificate</option>
              </select>
            </div>
						<!-- <input class=" input"
              ref="addEmployeeRoleInput" type="text"> -->
					</div>
				</div>
				<div class="column">
					<button disabled={loading} class="button is-danger has-text-weight-bold"
					onclick={add} >{title}
					</button>
          <button class="button is-primary has-text-weight-bold is-pulled-right" onclick="window.print()" title="Print">
                  <span class="icon">
                     <i class="fas fa-print"></i>
                 </span>
          </button>
				</div>
			</div>
		</div>
		<table class="table is-fullwidth is-striped is-hoverable">
			<thead>
				<tr>
					<th>SL</th>
					<th>Employee</th>
					<th>Role</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr each={ev, i in employeeRoles}>
					<td>{ i+1 }</td>
					<td>{ ev.employee_name}</td>
					<td>{ ev.role}</td>
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
      self.readEmployees()
      self.readEmployeeRoles()
    })
    self.on("unmount", function(){
      employeeRoleStore.off('add_employee_role_changed', AddEmployeeRolesChanged)
      employeeRoleStore.off('read_employee_role_changed', ReadEmployeeRolesChanged)
      employeeRoleStore.off('read_employee_changed',EmployeesChanged)
      employeeRoleStore.off('edit_employee_role_changed',EditEmployeeRolesChanged)
      employeeRoleStore.off('delete_employee_role_changed',DeleteEmployeeRolesChanged)
    })

    //read courses
    self.readEmployees = () => {
        self.loading=true
       employeeRoleStore.trigger('read_employees')
    }

    //read employe_roles
    self.readEmployeeRoles = () => {
      self.loading=true
       employeeRoleStore.trigger('read_employee_roles')
    }

     self.add = () => {
      if(!self.refs.addEmployeeRoleInput.value){
        toastr.info("Please enter Event and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          console.log('create')
          employeeRoleStore.trigger('add_employee_role', self.refs.addEmployeeRoleInput.value,
           self.refs.employee_id.value)
        }else if(self.title=='Update'){
          console.log('update')
          employeeRoleStore.trigger('edit_employee_role', self.refs.addEmployeeRoleInput.value,
            self.refs.employee_id.value, self.edit_id)
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
      self.employeeRoles.map(ev => {
          ev.confirmDelete = false
          ev.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.employeeRoles.map(ev => {
        if(ev.role_id != e.item.ev.role_id){
          ev.confirmDelete = false
        }else{
          ev.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      employeeRoleStore.trigger('delete_employee_role', e.item.ev.role_id)
    }

    self.edit = (ev,e) => {
      console.log(ev)
      self.title='Update'
      self.refs.addEmployeeRoleInput.value = ev.role
      self.refs.employee_id.value = ev.employee_id
      self.edit_id = ev.role_id
    }
    
    employeeRoleStore.on('add_employee_role_changed',AddEmployeeRolesChanged)
    function AddEmployeeRolesChanged(employeeRoles){
      console.log(employeeRoles) 
      self.title='Create'
      self.refs.addEmployeeRoleInput.value = ''
      self.refs.employee_id.value = ''
      self.loading = false
      self.employeeRoles = employeeRoles
      self.update()
      self.readEmployeeRoles()
      console.log(self.employeeRoles)
    }

    employeeRoleStore.on('edit_employee_role_changed',EditEmployeeRolesChanged)
    function EditEmployeeRolesChanged(employeeRoles){
      console.log(employeeRoles) 
      self.title='Create'
      self.refs.addEmployeeRoleInput.value = ''
      self.refs.employee_id.value = ''
      self.loading = false
      self.employeeRoles = employeeRoles
      self.update()
      self.readEmployeeRoles()
      //console.log(self.empemployeeRolesloye_roles)
    }

    employeeRoleStore.on('delete_employee_role_changed',DeleteEmployeeRolesChanged)
    function DeleteEmployeeRolesChanged(employeeRoles){
      console.log(employeeRoles) 
      self.title='Create'
      self.refs.addEmployeeRoleInput.value = ''
      self.refs.employee_id.value = ''
      self.loading = false
      self.employeeRoles = employeeRoles
      self.update()
      self.readEmployeeRoles()
      console.log(self.employeeRoles)
    }

    employeeRoleStore.on('read_employee_role_changed',ReadEmployeeRolesChanged)
    function ReadEmployeeRolesChanged(employeeRoles){
      console.log(employeeRoles) 
      self.title='Create'
      self.refs.addEmployeeRoleInput.value = ''
      self.loading = false
      self.employeeRoles = employeeRoles
      self.update()
      console.log(self.employeeRoles)
    }

    employeeRoleStore.on('read_employees_changed',EmployeesChanged)
    function EmployeesChanged(employees){
      console.log(employees) 
      self.employees = employees
      self.loading=false
      self.update()
      console.log(self.employees)
    }

</script>
</role>