<browse-staff>
	<section class=" is-fluid">
		<div class="level">
			<div class="level-left">
				<h2 class="title" style="color: #ff3860;">Staff</h2>
			</div>
		</div>
		<div class="box">
			<div class="columns">
				<div class="column is-narrow">
					<div class="control">
						<div class="select">
							<select ref="emp_type_id" onchange={ReadBrowseStaff}>
								<option value={-1}>All</option>
								<option each={employeeTypes} value={emp_type_id}>{emp_type}
	                            </option>
							</select>
						</div>
					</div>
				</div>
			<!-- 	<div class="column">
				<button class="button is-danger has-text-weight-bold"
				onclick={getStaffData}>GO
				</button>
			</div> -->
			</div>
		</div>
		<table class="table is-fullwidth is-striped is-hoverable is-narrow">
			<thead>
				<tr>
					<th>#</th>
					<th>Emp ID</th>
					<th>First Name</th>
					<th>Middle Name</th>
					<th>Last Name</th>
					<th>City</th>
					<th>Office Phone</th>
					<th>Mobile</th>
					<th>Email</th>
				</tr>
			</thead>
			<tbody>
				<tr each={st, i in browseStaffs}>
					<td>{i+1}</td>
					<td>{st.employee_id}</td>
					<td>{st.first_name}</td>
					<td> {st.middle_name}</td>
					<td> {st.last_name}</td>
					<td>{st.city}</td>
					<td>{st.office_phone}</td>
					<td>{st.mobile}</td>
					<td>{st.email}</td>
					
				</tr>
			</tbody>
		</table>
	</section>
<!-- End Other Information -->
<script>
	
	var self = this
    self.on("mount", function(){
    	self.title='Add'
    	self.role = getCookie('role') 
    	self.readEmployeeTypes()	
        self.update()
        flatpickr(".date", {
	    	allowInput: true,
        	dateFormat: "d/m/Y",
  		})
    })

    self.on("unmount", function(){
      staffStore.off('read_browse_staff_changed',ReadBrowseStaffChanged)
      employeeTypeStore.off('employeeTypes_changed',EmployeeTypesChanged)
    })

    self.ReadBrowseStaff = () =>{
       staffStore.trigger('read_browse_staff', self.refs.emp_type_id.value)
    }
    self.readEmployeeTypes = () => {
       employeeTypeStore.trigger('read_employeeTypes')
    }
    
    employeeTypeStore.on('employeeTypes_changed',EmployeeTypesChanged)
    function EmployeeTypesChanged(employeeTypes){
      //console.log(employeeTypes) 
      self.title='Create'
      self.loading = false
      self.employeeTypes = employeeTypes
      self.update()
      self.ReadBrowseStaff()
    }
    staffStore.on('read_browse_staff_changed',ReadBrowseStaffChanged)
    function ReadBrowseStaffChanged(browseStaffs){
      //console.log(browseStaffs) 
      self.title='Create'
      self.loading = false
      self.browseStaffs = browseStaffs
      self.update()
      //console.log(self.employeeTypes)
    }
    

    
</script>
</browse-staff>