<employee-type>
	<section class=" is-fluid">
		<h2 class="title has-text-centered" style="color: #ff3860;">Employee Types</h2>
		<div class="flex items-center mt-2 mb-6 no-print">
			<div class="bg-green py-1 rounded w-10">
				<div class="bg-grey h-px flex-auto"></div>
			</div>
		</div>
		<div class="box">
			<div class="columns">
				<div class="column is-half">
					<div class="field">
						<label class="label" for="role">Employee Type</label>
						<div class="control">
							<input class="input" type="text" ref="addEmployeeTypeInput"
							onkeyup={addEnter}>
						</div>
					</div>
				</div>
				<div class="column is-narrow">
					<div class="field">
						<div class="control">
							<button class="button is-danger has-text-weight-bold adjusted-top"
					         onclick={add} >{title}</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<table class="table is-fullwidth is-striped is-hoverable">
			<thead>
				<tr>
					<th>SL</th>
					<th>Employee Type</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr each={r, i in employeeTypes}>
					<td>{ i+1 }</td>
					<td>{ r.emp_type}</td>
		          	<td class="has-text-right">
            			<div class="inline-flex rounded border border-grey overflow-hidden" hide={r.confirmDelete}>
              				<span><a class="button is-small is-rounded" onclick={edit.bind(this, r)}>Edit</a></span>
              				<span if={role=='ADMIN'}> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick={confirmDelete}>Delete</a></span>
            			</div>
            			<div class="table-buttons" if={r.confirmDelete}>
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
      self.readEmployeeTypes()
    })
    self.on("unmount", function(){
      employeeTypeStore.off('employeeTypes_changed', EmployeeTypesChanged)
    })

    //read courses
    self.readEmployeeTypes = () => {
       employeeTypeStore.trigger('read_employeeTypes')
    }

     self.add = () => {
      if(!self.refs.addEmployeeTypeInput.value){
        toastr.info("Please enter Item and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          console.log('create')
          employeeTypeStore.trigger('add_employeeType', self.refs.addEmployeeTypeInput.value)
        }else if(self.title=='Update'){
          console.log('update')
          employeeTypeStore.trigger('edit_employeeType', self.refs.addEmployeeTypeInput.value,
            self.edit_id)
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
      self.employeeTypes.map(r => {
          r.confirmDelete = false
          r.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.employeeTypes.map(r => {
        if(r.emp_type_id != e.item.r.emp_type_id){
          r.confirmDelete = false
        }else{
          r.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      console.log(e.item.r.emp_type_id);
      employeeTypeStore.trigger('delete_employeeType', e.item.r.emp_type_id)
    }

    self.edit = (r,e) => {
      console.log(r)
      self.title='Update'
      self.refs.addEmployeeTypeInput.value = r.emp_type
      self.edit_id = r.emp_type_id
    }
    
    employeeTypeStore.on('employeeTypes_changed',EmployeeTypesChanged)
    function EmployeeTypesChanged(employeeTypes){
      console.log(employeeTypes) 
      self.title='Create'
      self.refs.addEmployeeTypeInput.value = ''
      self.loading = false
      self.employeeTypes = employeeTypes
      self.update()
      console.log(self.employeeTypes)
    }

</script>
</employee-type>