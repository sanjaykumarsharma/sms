<ex-staff>
	<print-header></print-header> 
	  <loading-bar if={loading}></loading-bar>
	<section class=" is-fluid">
		<h2 class="title has-text-centered" style="color: #ff3860;">Ex-Employee Details</h2>
	<!-- 	<div class="level">
			<div class="level-left">
			</div>
		</div> -->
		<div class="box no-print">
			<div class="columns">
				<div class="column ">
					<div class="control">
						<div class="select">
							<select ref="emp_type_id" onchange={ReadExStaff}>
								<option value={-1}>All</option>
								<option each={employeeTypes} value={emp_type_id}>{emp_type}
	                            </option>
							</select>
						</div>
					</div>
				</div>
				<div class="column">
					<button class="button is-success has-text-weight-bold is-small ml5 is-pulled-right" onclick={downloadCSV} title="Excel Down Load">
		              <span class="icon">
		                  <i class="far fa-file-excel"></i>
		              </span>
		           </button>
				 <button class="button is-primary has-text-weight-bold is-pulled-right is-small ml5" onclick="window.print()" title="Print">
                    <span class="icon">
                       <i class="fas fa-print"></i>
                   </span>
		          </button>
		          <button class="button is-warning is-rounded is-pulled-right is-small ml5" onclick={ReadExStaff} style="margin-left:5px;margin-right:5px">
		          <span class="icon">
		            <span class="fas fa-sync-alt"></span>
		          </span>
		          </button>
		           <input class="input is-pulled-right" ref="searchExStaff" onkeyup={filteredExStaff} type="text" style="width:200px;margin-right:5px;" placeholder="Search">  
			</div>
			</div>
		</div>
		<table class="table is-fullwidth is-striped is-hoverable is-narrow">
			<thead>
				<tr>
					<th>#</th>
					<th>Emp ID</th>
					<th>Name</th>
					<th>DOJ</th>
					<th>DOL</th>
					<th>Remarks</th>
					<th>Mobile</th>
					<th>Email</th>
				</tr>
			</thead>
			<tbody>
				<tr each={st, i in filteredExStaffs}>
					<td>{i+1}</td>
					<td>{st.employee_id}</td>
					<td>{st.first_name} {st.middle_name} {st.last_name}</td>
					<td>{st.doj}</td>
					<td>{st.dol}</td>
					<td>{st.remarks}</td>
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
      staffStore.off('read_ex_staff_changed',ReadExStaffChanged)
      employeeTypeStore.off('employeeTypes_changed',EmployeeTypesChanged)
      staffStore.off('csv_export_ex_staff_changed',csvExStaffChanged)
    })
    self.filteredExStaff = ()=>{
        self.filteredExStaffs = self.exStaffs.filter(c => {
          return JSON.stringify(c).toLowerCase().indexOf(self.refs.searchExStaff.value.toLowerCase())>=0
        })
      } 
    self.ReadExStaff = () =>{
    	self.loading=true
       staffStore.trigger('read_ex_staff', self.refs.emp_type_id.value)
    }
    self.readEmployeeTypes = () => {
       employeeTypeStore.trigger('read_employeeTypes')
    }
    self.downloadCSV = () =>{
      staffStore.trigger('csv_export_ex_staff', self.exStaffs)
    }
    
    employeeTypeStore.on('employeeTypes_changed',EmployeeTypesChanged)
    function EmployeeTypesChanged(employeeTypes){
      //console.log(employeeTypes) 
      self.title='Create'
      self.loading = false
      self.employeeTypes = employeeTypes
      self.update()
      self.ReadExStaff()
    }
    staffStore.on('read_ex_staff_changed',ReadExStaffChanged)
    function ReadExStaffChanged(exStaffs){
      //console.log(exStaffs) 
      self.title='Create'
      self.loading = false
      self.exStaffs = exStaffs
      self.filteredExStaffs = exStaffs
      self.update()
      //console.log(self.employeeTypes)
    }
    staffStore.on('csv_export_ex_staff_changed',csvExStaffChanged)
    function csvExStaffChanged(url){
      var open_url = window.location.origin+url 
      window.open(open_url);
      self.loading = false
      self.update()
    }
    

    
</script>
</ex-staff>