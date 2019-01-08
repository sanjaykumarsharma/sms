<approve-staff-profile>
	<loading-bar if={loading}></loading-bar>  
	<section class=" is-fluid" show={staff_view =='show_staff'}>
		<div class="level">
			<div class="level-left">
				<h2 class="title" style="color: #ff3860;">Staff</h2>
			</div>
		</div>
		<div class="box no-print">
			<div class="columns">
				<div class="column is-narrow">
                 <label class="label">Emp Type</label>
               </div>
				<div class="column is-narrow">
					<div class="control">
						<div class="select">
							<select ref="r_emp_type_id">
								<option value={-1}>All</option>
								<option each={employeeTypes} value={emp_type_id}>{emp_type}
	                            </option>
							</select>
						</div>
					</div>
				</div>
			<!-- 	<div class="column is-narrow">
					<div class="control">
			        	<div class="select is-fullwidth">
							<select ref="r_designation_id">
								<option value={-2}>Designation</option>
								<option value={-1}>All</option>
								<option each={designations} value={designation_id}>{designation}
	                            </option>
							</select>
						</div>
			      	</div>
			    </div>
			    <div class="column is-narrow">
					<div class="control">
			        	<div class="select is-fullwidth">
							<select ref="r_level_id">
								<option value={-2}>Level</option>
								<option value={-1}>All</option>
								<option each={levels} value={level_id}>{level}
	                            </option>
							</select>
						</div>
			      	</div>
			    </div>
			    <div class="column is-narrow">
					<div class="control">
			        	<div class="select is-fullwidth">
							<select ref="r_department_id">
								<option value={-2}>Department</option>
								<option value={-1}>All</option>
								<option each={departments} value={department_id}>{department_name}
	                            </option>
							</select>
						</div>
			      	</div>
			    </div> -->
	        	<!-- div class="column is-one-third">
	        						<input class="input" ref="read_enroll_number" type="text" placeholder="Enter Enroll No">
	        	    			</div> -->
				<div class="column">
					<button class="button is-danger has-text-weight-bold"
					onclick={getStaffData}>GO
					</button>
				</div>
			</div>
		</div>
		<table class="table is-fullwidth is-striped is-hoverable is-narrow">
			<thead>
				<tr>
					<th>#</th>
					<th>Photo</th>
					<th>Name</th>
					<th>Designation</th>
					<th>Mobile</th>
					<th>Email</th>
					<th>Office Phone</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr each={st, i in staffs}>
					<td><input type="checkbox" class="id_check_box"  id="{ 'EmpId' + st.emp_id }" onclick={ selectStaff.bind(this,st) } > </td>
					<td>{st.photo}</td>
					<td>{st.first_name} {st.middle_name} {st.last_name}</td>
					<td>{st.designation}</td>
					<td>{st.mobile}</td>
					<td>{st.email}</td>
					<td>{st.phone_o}</td>
					<td class="has-text-right">
		            <div class="inline-flex rounded border border-grey overflow-hidden" hide={st.confirmDelete}>	
		              <span><a class="button is-small is-rounded has-text-success" onclick={edit.bind(this, st.emp_id)}>Approve Profile</a></span>
		              <span> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick={confirmDelete}>Delete</a></span>
		            </div>
		            <div class="table-buttons" if={st.confirmDelete}>
		              <span disabled={loading} class="button is-small is-rounded" onclick={delete}><i class="fa fa-check" ></i></span>
		              <span disabled={loading} class="button is-small  has-text-danger is-rounded" onclick={cancelOperation}><i class="fa fa-times"></i></span>
		            </div>
                  </td>
				</tr>
			</tbody>
		</table>
	</section>

	<section class=" is-fluid" show={staff_view =='add_staff'}>
	<div class="label">
		<div class="level-left">
			<h2 class="title" style="color: #ff3860;">{title} Staff</h2>
		</div>
		<div class="level-right"></div>
	</div>
	<div class="box">
		<div class="columns is-multiline">
		    <div class="column is-one-fifth">
			    <div id="pp_box" class="pp-box" onclick={trigger_file_input.bind(this,'staff_picture')}>
			        <div class="icon has-text-danger" onclick=
			        	{remove_picture.bind(this, 'pp_box','staff_picture')}><i class="fas fa-trash"></i>
			        </div>
			    </div>
			    <input accept="image/*" class="is-hidden" id="staff_picture" name="staff_picture" onchange={loadFile.bind(this, 'pp_box')} type="file">
		    </div>
		    <div class="column ">
		    	<div class="columns ">
		    		<div class="column is-2">
							<label class="label is-small" for="title">Title</label>
				      	</div>
				      	<div class="column is-10">
							<input class="input is-small" id="title" ref="title" type="text">
				      	</div>
				</div>
		    	<div class="columns ">
		    		<!-- <div class="column is-2">
							<label class="label" for="title">Title</label>
				      	</div>
				      	<div class="column is-2">
							<input class="input is-small" id="title" ref="title" type="text">
				      	</div> -->
			      	<div class="column is-2">
						<label class="label is-small" for="first_name">First Name</label>
			      	</div>
			      	<div class="column is-2">
						<input class="input is-small" id="first_name" ref="first_name" type="text">
			      	</div>
			      	<div class="column is-2">
						<label class="label is-small" for="middle_name">Middle Name</label>
			      	</div>
			      	<div class="column is-2">
						<input class="input is-small" ref="middle_name" type="text">
			      	</div>
			      	<div class="column is-2">
						<label class="label is-small" for="last_name">Last Name</label>
			      	</div>
			      	<div class="column is-2">
						<input class="input is-small" ref="last_name" type="text">
			      	</div>
		    	</div>

		    	<div class="columns mt30">
			      	<div class="column is-2">
						<label class="label is-small" for="last_name">Short Name</label>
			      	</div>
			      	<div class="column is-2">
						<input class="input is-small" ref="short_name" type="text">
			      	</div>
			      	<div class="column is-2">
						<label class="label is-small" for="gender">Gender</label>
			      	</div>
			      	<div class="column is-2">
						<div class="select is-fullwidth is-small">
							<select id="gender" ref="gender">
								<option value="M">Male</option>
								<option value="F">Female</option>
							</select>
						</div>
			      	</div>
			      	<div class="column is-2">
						<label class="label is-small" for="">Identification Marks</label>
			      	</div>
			      	<div class="column is-2">
						<input class="input is-small" ref="id_mark" type="text">
			      	</div>
			    </div>

			    <div class="columns mt30">
			      	<div class="column is-2">
						<label class="label is-small" for="blood_group">Blood Group</label>
			      	</div>
			      	<div class="column is-2">
						<div class="select is-fullwidth is-small">
							<select id="blood_group" ref="blood_group">
								<option value="A+">A+</option>
								<option value="A-">A-</option>
								<option value="AB+">AB+</option>
								<option value="AB-">AB-</option>
								<option value="B+">B+</option>
								<option value="B-">B-</option>
								<option value="O+">O+</option>
								<option value="O-">O-</option>
							</select>
						</div>
			      	</div>
			      	<div class="column is-2">
						<label class="label is-small" for="dob">Place of Birth</label>
			      	</div>
			      	<div class="column is-2">
						<input class="input is-small" ref="place_of_birth" type="text">
			      	</div>
			      	<div class="column is-2">
						<label class="label is-small" for="dob">Nationality</label>
			      	</div>
			      	<div class="column is-2">
						<input class="input is-small" ref="nationality" type="text">
			      	</div>
			    </div>
		    </div>
		</div>
		<div class="columns mt30">
      		<div class="column is-2">
				<label class="label is-small" for="religion_id">Religion</label>
	      	</div>
	      	<div class="column is-2">
				<div class="control">
	        		<div class="select is-fullwidth is-small">
						<select id="religion_id" ref="religion_id">
							<option each={religion} value={religion_id}>{religion}
                            </option>
						</select>
					</div>
	      		</div>
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="">Language</label>
	      	</div>
	      	<div class="column is-2">
	      		<input class="input is-small" ref="language" type="text">
	      	</div>
	      	<div class="column is-2">
	      		<label class="label is-small" for="category_id">Cast Category</label>
	      	</div>
	      	<div class="column is-2">
	      		<div class="select is-fullwidth is-small">
					<select ref="category_id">
						<option each={cast} value={category_id}>{category_name}
		                </option>
					</select>
				</div>
	      	</div>
  		</div>

  		<div class="columns mt30">
      		<div class="column is-2">
				<label class="label is-small" for="dob">DOB</label>
	      	</div>
	      	<div class="column is-2">
				<input class="input date is-small" ref="dob" type="text">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="residence_phone">Phone(R)</label>
	      	</div>
	      	<div class="column is-2">
	      		<input class="input is-small" ref="residence_phone" type="number">
	      	</div>
	      	<div class="column is-2">
	      		<label class="label is-small" for="Office_phone">Phone(O)</label>
	      	</div>
	      	<div class="column is-2">
	      		<input class="input is-small" ref="office_phone" type="number">
	      	</div>
  		</div>

  		<div class="columns mt30">
  			<div class="column is-2">
				<label class="label is-small" for="Employee ID">Employee ID</label>
	      	</div>
	      	<div class="column is-2">
				<input class="input is-small" ref="employee_id" type="text">
	      	</div>
      		<div class="column is-2">
				<label class="label is-small" for="Moble">Mobile</label>
	      	</div>
	      	<div class="column is-2">
				<input class="input is-small" ref="mobile" type="number">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="Office_phone">Email</label>
	      	</div>
	      	<div class="column is-2">
	      		<input class="input is-small" ref="email" type="text">
	      	</div>
  		</div>

  		<div class="columns mt30">
			<div class="column is-full">
	          	<h3 class="has-text-weight-bold is-size-6 has-text-link">Contact Information(Permanent Address)</h3>
	          	<hr style="margin-top: 0.5em; margin-bottom: 0.5em;">
	        </div>
	    </div>

	    <div class="columns mt30">
      		<div class="column is-2">
				<label class="label is-small" for="add_l1">Address Line 1</label>
	      	</div>
	      	<div class="column is-2">
				<input class="input is-small" ref="add_l1" type="text">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="add_l2">Address Line 2</label>
	      	</div>
	      	<div class="column is-2">
	      		<input class="input is-small" ref="add_l2" type="text">
	      	</div>
	      	<div class="column is-2">
	      		<label class="label is-small" for="city">City</label>
	      	</div>
	      	<div class="column is-2">
	      		<input class="input is-small" ref="city" type="text">
	      	</div>
  		</div>

  		<div class="columns mt30">
      		<div class="column is-2">
				<label class="label is-small" for="zip">Zip</label>
	      	</div>
	      	<div class="column is-2">
				<input class="input is-small" ref="zip" type="number" maxlength="6">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="state">State</label>
	      	</div>
	      	<div class="column is-2">
	      		<input class="input is-small" ref="state" type="text">
	      	</div>
	      	<div class="column is-2">
	      		<label class="label is-small" for="country">Country</label>
	      	</div>
	      	<div class="column is-2">
	      		<input class="input is-small" ref="country" type="text">
	      	</div>
  		</div> 

  		<div class="columns mt30">
			<div class="column is-full">
		    	<h3 class="has-text-weight-bold is-size-6 has-text-link"> Check if Correspondence Address is same as Permanent Address
		    		<input type="checkbox" id="correspondenceCheckbox" name="correspondenceCheckbox" onclick={copyAddress.bind(this)}>
		      	</h3>
		      	<hr style="margin-top: 0.5em; margin-bottom: 0.5em;">
		    </div>
		</div>
		
		<div class="columns mt30">
      		<div class="column is-2">
				<label class="label is-small" for="c_add_l1">Address Line 1</label>
	      	</div>
	      	<div class="column is-2">
				<input class="input is-small" ref="c_add_l1" type="text">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="c_add_l2">Address Line 2</label>
	      	</div>
	      	<div class="column is-2">
	      		<input class="input is-small" ref="c_add_l2" type="text">
	      	</div>
	      	<div class="column is-2">
	      		<label class="label is-small" for="c_city">City</label>
	      	</div>
	      	<div class="column is-2">
	      		<input class="input is-small" ref="c_city" type="text">
	      	</div>
  		</div>

  		<div class="columns mt30">
      		<div class="column is-2">
				<label class="label is-small" for="c_zip">Zip</label>
	      	</div>
	      	<div class="column is-2">
				<input class="input is-small" ref="c_zip" type="number">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="c_state">State</label>
	      	</div>
	      	<div class="column is-2">
	      		<input class="input is-small" ref="c_state" type="text">
	      	</div>
	      	<div class="column is-2">
	      		<label class="label is-small" for="c_country">Country</label>
	      	</div>
	      	<div class="column is-2">
	      		<input class="input is-small" ref="c_country" type="text">
	      	</div>
  		</div>

  		<div class="columns mt30">
		    <div class="column is-full">
			    <button class="button is-info has-text-weight-bold adjusted-top" onclick={addFamilyInformation}>
			    	Next >>
				</button>
			    <button class="button is-danger has-text-weight-bold adjusted-top" onclick={close}>
			    	Cancel
			    </button>    
		    </div>
		</div>

	</div>
	
</section>



<!-- Start Family Information -->
<section class=" is-fluid" show={staff_view =='add_family_information'}>
	<div class="label">
		<div class="level-left">
			<h2 class="title" style="color: #ff3860;">{title} Family</h2>
		</div>
		<div class="level-right">
		</div>
	</div>
	<div class="box">
		<div class="columns mt30">
			<div class="column is-2">
				<label class="label is-small" for="marital_status">Marital Status</label>
			</div>
			<div class="column is-2">
				<div class="select is-fullwidth is-small">
					<select id="marital_status" ref="marital_status">
						<option value="S">Single</option>
						<option value="M">Married</option>
					</select>
				</div>
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="f_occupation">Father Name</label>
	      	</div>
	      	<div class="column is-2 ">
				<input class="input is-small" id="father_name" ref="father_name" type="text">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="">Father Occupation</label>
	      	</div>
	      	<div class="column is-2">
        		<input class="input is-small" id="father_occupation" ref="father_occupation" type="text">
	      	</div>
		</div>

		<div class="columns mt30">
			<div class="column is-2">
				<label class="label is-small" for="">Spouse's Name</label>
			</div>
			<div class="column is-2">
				<input class="input is-small" id="" ref="spouse" type="text">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="">Spouse's Occupation</label>
	      	</div>
	      	<div class="column is-2 ">
				<input class="input is-small" id="" ref="spouse_occupation" type="text">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="f_organisation_name">Anniversary</label>
	      	</div>
	      	<div class="column is-2">
        		<input class="input date is-small" ref="anniversary" type="date">
	      	</div>
		</div>

		<div class="columns mt30">
			<div class="column is-full">
		    	<h3 class="has-text-weight-bold is-size-6 has-text-link">Child1</h3>
		      	<hr style="margin-top: 0.5em; margin-bottom: 0.5em;">
		    </div>
		</div>
		
		<div class="columns mt30">
			<div class="column is-2">
				<label class="label is-small" for="child1_first_name">First Name</label>
			</div>
			<div class="column is-2">
				<input class="input is-small" ref="child1_first_name" type="text">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="">Last Name</label>
	      	</div>
	      	<div class="column is-2 ">
				<input class="input is-small" ref="child1_last_name" type="text">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="gender">Gender</label>
	      	</div>
	      	<div class="column is-2">
        		<div class="select is-fullwidth is-small">
					<select id="sex" ref="child1_sex">
						<option value="M">Male</option>
						<option value="F">Female</option>
					</select>
				</div>
	      	</div>
		</div>

		<div class="columns mt30">
			<div class="column is-2">
				<label class="label is-small" for="">Dob</label>
			</div>
			<div class="column is-2">
				<input class="input date is-small" ref="child1_dob" type="text">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="">School</label>
	      	</div>
	      	<div class="column is-2 ">
				<input class="input is-small" ref="child1_school" type="text">
	      	</div>	      	
		</div>

		<div class="columns mt30">
			<div class="column is-full">
		    	<h3 class="has-text-weight-bold is-size-6 has-text-link">Child2</h3>
		      	<hr style="margin-top: 0.5em; margin-bottom: 0.5em;">
		    </div>
		</div>
		
		<div class="columns mt30">
			<div class="column is-2">
				<label class="label is-small" for="child2_first_name">First Name</label>
			</div>
			<div class="column is-2">
				<input class="input is-small" ref="child2_first_name" type="text">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="">Last Name</label>
	      	</div>
	      	<div class="column is-2 ">
				<input class="input is-small" ref="child2_last_name" type="text">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="gender">Gender</label>
	      	</div>
	      	<div class="column is-2">
        		<div class="select is-fullwidth is-small">
					<select id="sex" ref="child2_sex">
						<option value="M">Male</option>
						<option value="F">Female</option>
					</select>
				</div>
	      	</div>
		</div>

		<div class="columns mt30">
			<div class="column is-2">
				<label class="label is-small" for="">Dob</label>
			</div>
			<div class="column is-2">
				<input class="input date is-small" ref="child2_dob" type="text">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="">School</label>
	      	</div>
	      	<div class="column is-2 ">
				<input class="input is-small" ref="child2_school" type="text">
	      	</div>	      	
		</div>

		<div class="columns mt30">
			<div class="column is-full">
		    	<h3 class="has-text-weight-bold is-size-6 has-text-link">Child3</h3>
		      	<hr style="margin-top: 0.5em; margin-bottom: 0.5em;">
		    </div>
		</div>
		
		<div class="columns mt30">
			<div class="column is-2">
				<label class="label is-small" for="child3_first_name">First Name</label>
			</div>
			<div class="column is-2">
				<input class="input is-small" ref="child3_first_name" type="text">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="">Last Name</label>
	      	</div>
	      	<div class="column is-2 ">
				<input class="input is-small" ref="child3_last_name" type="text">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="gender">Gender</label>
	      	</div>
	      	<div class="column is-2">
        		<div class="select is-fullwidth is-small">
					<select id="sex" ref="child3_sex">
						<option value="M">Male</option>
						<option value="F">Female</option>
					</select>
				</div>
	      	</div>
		</div>

		<div class="columns mt30">
			<div class="column is-2">
				<label class="label is-small" for="">Dob</label>
			</div>
			<div class="column is-2">
				<input class="input date is-small" ref="child3_dob" type="text">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="">School</label>
	      	</div>
	      	<div class="column is-2 ">
				<input class="input is-small" ref="child3_school" type="text">
	      	</div>	      	
		</div>

		<div class="columns mt30">
		    <div class="column is-full">
			    <button class="button is-primary has-text-weight-bold adjusted-top" onclick={closeFamilyInformation}>
			    	Previous
			    </button>
			    <button class="button is-info has-text-weight-bold adjusted-top" onclick={addQualificationInformation}>
			    	Next >>
			    </button>
			    <button class="button is-danger has-text-weight-bold adjusted-top" onclick={close}>
			    	Cancel
			    </button>   
		    </div>
		</div>
	</div>
	
</section>
<!-- End Family  Information -->

<!-- Start of Academic Qualofication-->
<section class=" is-fluid" show={staff_view =='add_qualification_information'}>
	<div class="label">
		<div class="level-left">
			<h2 class="title" style="color: #ff3860;">{title} Qualification</h2>
		</div>
		<div class="level-right">
		</div>
	</div>
	<div class="box">
		<div class="columns mt30">
			<div class="column is-full">
		    	<h3 class="has-text-weight-bold is-size-6 has-text-link">Academic Qualification</h3>
		    </div>
		</div>

		<div class="columns mt30">
			<div class="column is-full">
		    	<h3 class="has-text-weight-bold is-size-8 has-text-link">X information</h3>
		      	<hr style="margin-top: 0.5em; margin-bottom: 0.5em;">
		    </div>
		</div>

		<div class="columns mt30">
			<div class="column is-2">
				<label class="label is-small" for="x_subject">X Subject </label>
			</div>
			<div class="column is-2">
				<input class="input is-small" ref="x_subject" type="text">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="">X Instituition</label>
	      	</div>
	      	<div class="column is-2 ">
				<input class="input is-small" ref="x_institution" type="text">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="">X Board</label>
	      	</div>
	      	<div class="column is-2">
        		<input class="input is-small" ref="x_board" type="text">
	      	</div>
		</div>

		<div class="columns mt30">
			<div class="column is-2">
				<label class="label is-small" for="">X YOP</label>
			</div>
			<div class="column is-2">
				<input class="input is-small" ref="x_yop" type="text">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="">X Marks</label>
	      	</div>
	      	<div class="column is-2 ">
				<input class="input is-small" ref="x_marks" type="text">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="">X Division</label>
	      	</div>
	      	<div class="column is-2">
        		<input class="input is-small" ref="x_div" type="text">
	      	</div>
		</div>

		<div class="columns mt30">
			<div class="column is-full">
		    	<h3 class="has-text-weight-bold is-size-8 has-text-link">XII information</h3>
		      	<hr style="margin-top: 0.5em; margin-bottom: 0.5em;">
		    </div>
		</div>

		<div class="columns mt30">
			<div class="column is-2">
				<label class="label is-small" for="xii_subject">XII Subject </label>
			</div>
			<div class="column is-2">
				<input class="input is-small" ref="xii_subject" type="text">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="">XII Instituition</label>
	      	</div>
	      	<div class="column is-2 ">
				<input class="input is-small" ref="xii_institution" type="text">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="">XII Board</label>
	      	</div>
	      	<div class="column is-2">
        		<input class="input is-small" ref="xii_board" type="text">
	      	</div>
		</div>

		<div class="columns mt30">
			<div class="column is-2">
				<label class="label is-small" for="">XII YOP</label>
			</div>
			<div class="column is-2">
				<input class="input is-small" ref="xii_yop" type="text">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="">XII Marks</label>
	      	</div>
	      	<div class="column is-2 ">
				<input class="input is-small" ref="xii_marks" type="text">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="">XII Division</label>
	      	</div>
	      	<div class="column is-2">
        		<input class="input is-small" ref="xii_div" type="text">
	      	</div>
		</div>
		
		<div class="columns mt30">
			<div class="column is-full">
		    	<h3 class="has-text-weight-bold is-size-6 has-text-link">Professional Qualification</h3>
		    </div>
		</div>

		<div class="columns mt30">
			<div class="column is-full">
		    	<h3 class="has-text-weight-bold is-size-8 has-text-link">UG information</h3>
		      	<hr style="margin-top: 0.5em; margin-bottom: 0.5em;">
		    </div>
		</div>

		<div class="columns mt30">
			<div class="column is-2">
				<label class="label is-small" for="ug_course">UG Course </label>
			</div>
			<div class="column is-2">
				<input class="input is-small" ref="ug_course" type="text">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="">UG Instituition</label>
	      	</div>
	      	<div class="column is-2 ">
				<input class="input is-small" ref="ug_institution" type="text">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="">UG University</label>
	      	</div>
	      	<div class="column is-2">
        		<input class="input is-small" ref="ug_university" type="text">
	      	</div>
		</div>

		<div class="columns mt30">
			<div class="column is-2">
				<label class="label is-small" for="">UG YOP</label>
			</div>
			<div class="column is-2">
				<input class="input is-small" ref="ug_yop" type="text">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="">UG Marks</label>
	      	</div>
	      	<div class="column is-2 ">
				<input class="input is-small" ref="ug_marks" type="text">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="">UG Division</label>
	      	</div>
	      	<div class="column is-2">
        		<input class="input is-small" ref="ug_div" type="text">
	      	</div>
		</div>

		<div class="columns mt30">
			<div class="column is-full">
		    	<h3 class="has-text-weight-bold is-size-8 has-text-link">PG information</h3>
		      	<hr style="margin-top: 0.5em; margin-bottom: 0.5em;">
		    </div>
		</div>

		<div class="columns mt30">
			<div class="column is-2">
				<label class="label is-small" for="pg_course">PG Course </label>
			</div>
			<div class="column is-2">
				<input class="input is-small" ref="pg_course" type="text">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="">PG Instituition</label>
	      	</div>
	      	<div class="column is-2 ">
				<input class="input is-small" ref="pg_institution" type="text">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="">PG University</label>
	      	</div>
	      	<div class="column is-2">
        		<input class="input is-small" ref="pg_university" type="text">
	      	</div>
		</div>

		<div class="columns mt30">
			<div class="column is-2">
				<label class="label is-small" for="">PG YOP</label>
			</div>
			<div class="column is-2">
				<input class="input is-small" ref="pg_yop" type="text">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="">PG Marks</label>
	      	</div>
	      	<div class="column is-2 ">
				<input class="input is-small" ref="pg_marks" type="text">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="">PG Division</label>
	      	</div>
	      	<div class="column is-2">
        		<input class="input is-small" ref="pg_div" type="text">
	      	</div>
		</div>

		<div class="columns mt30">
		    <div class="column is-full">
			    <button class="button is-primary has-text-weight-bold adjusted-top" onclick={closeQualificationInformation}>
			    	Previous
			    </button>
			    <button class="button is-info has-text-weight-bold adjusted-top" onclick={addProfessionalCourseInformation}>
			    	Next >>
			    </button>
			    <button class="button is-danger has-text-weight-bold adjusted-top" onclick={close}>
			    	Cancel
			    </button>    
		    </div>
		</div>
	</div>	
</section>
<!-- End OF Qualifivcation Information-->

<!-- Start professional Course-->
<section class=" is-fluid" show={staff_view =='add_professional_course_information'}>
	<div class="label">
		<div class="level-left">
			<h2 class="title" style="color: #ff3860;">{title} New Employee</h2>
		</div>
		<div class="level-right">
		</div>
	</div>
	<div class="box">
		<div class="columns mt30">
			<div class="column is-full">
		    	<h3 class="has-text-weight-bold is-size-6 has-text-link">B.Ed. information</h3>
		    </div>
		</div>

		<div class="columns mt30">
			<div class="column is-2">
				<label class="label is-small" for="bed_stream">B.Ed. stream </label>
			</div>
			<div class="column is-2">
				<input class="input is-small" ref="bed_stream" type="text">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="">B.Ed. Instituition</label>
	      	</div>
	      	<div class="column is-2 ">
				<input class="input is-small" ref="bed_institution" type="text">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="">B.Ed. University</label>
	      	</div>
	      	<div class="column is-2">
        		<input class="input is-small" ref="bed_university" type="text">
	      	</div>
		</div>

		<div class="columns mt30">
			<div class="column is-2">
				<label class="label is-small" for="">B.Ed. YOP</label>
			</div>
			<div class="column is-2">
				<input class="input is-small" ref="bed_yop" type="text">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="">B.Ed. Marks</label>
	      	</div>
	      	<div class="column is-2 ">
				<input class="input is-small" ref="bed_marks" type="text">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="">B.Ed. Division</label>
	      	</div>
	      	<div class="column is-2">
        		<input class="input is-small" ref="bed_div" type="text">
	      	</div>
		</div>

		<div class="columns mt30">
			<div class="column is-full">
		    	<h3 class="has-text-weight-bold is-size-6 has-text-link">B.T. information</h3>
		    </div>
		</div>

		<div class="columns mt30">
			<div class="column is-2">
				<label class="label is-small" for="bt_stream">B.T. Stream </label>
			</div>
			<div class="column is-2">
				<input class="input is-small" ref="bt_stream" type="text">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="">B.T. Instituition</label>
	      	</div>
	      	<div class="column is-2 ">
				<input class="input is-small" ref="bt_institution" type="text">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="">B.T. University</label>
	      	</div>
	      	<div class="column is-2">
        		<input class="input is-small" ref="bt_university" type="text">
	      	</div>
		</div>

		<div class="columns mt30">
			<div class="column is-2">
				<label class="label is-small" for="">B.T. YOP</label>
			</div>
			<div class="column is-2">
				<input class="input is-small" ref="bt_yop" type="text">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="">B.T. Marks</label>
	      	</div>
	      	<div class="column is-2 ">
				<input class="input is-small" ref="bt_marks" type="text">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="">B.T. Division</label>
	      	</div>
	      	<div class="column is-2">
        		<input class="input is-small" ref="bt_div" type="text">
	      	</div>
		</div>

		<div class="columns mt30">
			<div class="column is-full">
		    	<h3 class="has-text-weight-bold is-size-6 has-text-link">B.P.Ed. information</h3>
		    </div>
		</div>

		<div class="columns mt30">
			<div class="column is-2">
				<label class="label is-small" for="bped_stream">B.P.Ed. stream </label>
			</div>
			<div class="column is-2">
				<input class="input is-small" ref="bped_stream" type="text">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="">B.P.Ed. Instituition</label>
	      	</div>
	      	<div class="column is-2 ">
				<input class="input is-small" ref="bped_institution" type="text">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="">B.P.Ed. University</label>
	      	</div>
	      	<div class="column is-2">
        		<input class="input is-small" ref="bped_university" type="text">
	      	</div>
		</div>

		<div class="columns mt30">
			<div class="column is-2">
				<label class="label is-small" for="">B.P.Ed. YOP</label>
			</div>
			<div class="column is-2">
				<input class="input is-small" ref="bped_yop" type="text">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="">B.P.Ed. Marks</label>
	      	</div>
	      	<div class="column is-2 ">
				<input class="input is-small" ref="bped_marks" type="text">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="">B.P.Ed. Division</label>
	      	</div>
	      	<div class="column is-2">
        		<input class="input is-small" ref="bped_div" type="text">
	      	</div>
		</div>

		<div class="columns mt30">
			<div class="column is-full">
		    	<h3 class="has-text-weight-bold is-size-6 has-text-link">D.P.Ed. information</h3>
		    </div>
		</div>

		<div class="columns mt30">
			<div class="column is-2">
				<label class="label is-small" for="dped_stream">D.P.Ed. stream </label>
			</div>
			<div class="column is-2">
				<input class="input is-small" ref="dped_stream" type="text">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="">D.P.Ed. Instituition</label>
	      	</div>
	      	<div class="column is-2 ">
				<input class="input is-small" ref="dped_institution" type="text">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="">D.P.Ed. University</label>
	      	</div>
	      	<div class="column is-2">
        		<input class="input is-small" ref="dped_university" type="text">
	      	</div>
		</div>

		<div class="columns mt30">
			<div class="column is-2">
				<label class="label is-small" for="">D.P.Ed. YOP</label>
			</div>
			<div class="column is-2">
				<input class="input is-small" ref="dped_yop" type="text">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="">D.P.Ed. Marks</label>
	      	</div>
	      	<div class="column is-2 ">
				<input class="input is-small" ref="dped_marks" type="text">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="">D.P.Ed. Division</label>
	      	</div>
	      	<div class="column is-2">
        		<input class="input is-small" ref="dped_div" type="text">
	      	</div>
		</div>

		<div class="columns mt30">
		    <div class="column is-full">
			    <button class="button is-primary has-text-weight-bold adjusted-top" onclick={closeProfessionalCourseInformation}>
			    	Previous
			    </button>
			    <button class="button is-info has-text-weight-bold adjusted-top" onclick={addProfessionalMasterCourseInformation}>
			    	Next >>
			    </button>
			    <button class="button is-danger has-text-weight-bold adjusted-top" onclick={close}>
			    	Cancel
			    </button>    
		    </div>
		</div>
	</div>
	
</section>
<!-- Start professional Master Course-->
<section class=" is-fluid" show={staff_view =='add_professional_master_course_information'}>
	<div class="label">
		<div class="level-left">
			<h2 class="title" style="color: #ff3860;">{title} New Employee</h2>
		</div>
		<div class="level-right">
		</div>
	</div>
	<div class="box">
		<div class="columns mt30">
			<div class="column is-full">
		    	<h3 class="has-text-weight-bold is-size-6 has-text-link">M.P.Ed. information</h3>
		    </div>
		</div>

		<div class="columns mt30">
			<div class="column is-2">
				<label class="label is-small" for="mped_stream">M.P.Ed. stream </label>
			</div>
			<div class="column is-2">
				<input class="input is-small" ref="mped_stream" type="text">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="">M.P.Ed. Instituition</label>
	      	</div>
	      	<div class="column is-2 ">
				<input class="input is-small" ref="mped_institution" type="text">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="">M.P.Ed. University</label>
	      	</div>
	      	<div class="column is-2">
        		<input class="input is-small" ref="mped_university" type="text">
	      	</div>
		</div>

		<div class="columns mt30">
			<div class="column is-2">
				<label class="label is-small" for="">M.P.Ed. YOP</label>
			</div>
			<div class="column is-2">
				<input class="input is-small" ref="mped_yop" type="text">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="">M.P.Ed. Marks</label>
	      	</div>
	      	<div class="column is-2 ">
				<input class="input is-small" ref="mped_marks" type="text">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="">M.P.Ed. Division</label>
	      	</div>
	      	<div class="column is-2">
        		<input class="input is-small" ref="mped_div" type="text">
	      	</div>
		</div>

		<div class="columns mt30">
			<div class="column is-full">
		    	<h3 class="has-text-weight-bold is-size-6 has-text-link">M.Ed. information</h3>
		    </div>
		</div>

		<div class="columns mt30">
			<div class="column is-2">
				<label class="label is-small" for="med_stream">M.Ed. Stream </label>
			</div>
			<div class="column is-2">
				<input class="input is-small" ref="med_stream" type="text">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="">M.Ed. Instituition</label>
	      	</div>
	      	<div class="column is-2 ">
				<input class="input is-small" ref="med_institution" type="text">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="">M.Ed. University</label>
	      	</div>
	      	<div class="column is-2">
        		<input class="input is-small" ref="med_university" type="text">
	      	</div>
		</div>

		<div class="columns mt30">
			<div class="column is-2">
				<label class="label is-small" for="">M.Ed. YOP</label>
			</div>
			<div class="column is-2">
				<input class="input is-small" ref="med_yop" type="text">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="">M.Ed. Marks</label>
	      	</div>
	      	<div class="column is-2 ">
				<input class="input is-small" ref="med_marks" type="text">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="">M.Ed. Division</label>
	      	</div>
	      	<div class="column is-2">
        		<input class="input is-small" ref="med_div" type="text">
	      	</div>
		</div>

		<div class="columns mt30">
			<div class="column is-full">
		    	<h3 class="has-text-weight-bold is-size-6 has-text-link">M.Phil information</h3>
		    </div>
		</div>

		<div class="columns mt30">
			<div class="column is-2">
				<label class="label is-small" for="mphil_stream">M.Phil stream </label>
			</div>
			<div class="column is-2">
				<input class="input is-small" ref="mphil_stream" type="text">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="">M.Phil Instituition</label>
	      	</div>
	      	<div class="column is-2 ">
				<input class="input is-small" ref="mphil_institution" type="text">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="">M.Phil University</label>
	      	</div>
	      	<div class="column is-2">
        		<input class="input is-small" ref="mphil_university" type="text">
	      	</div>
		</div>

		<div class="columns mt30">
			<div class="column is-2">
				<label class="label is-small" for="">M.Phil YOP</label>
			</div>
			<div class="column is-2">
				<input class="input is-small" ref="mphil_yop" type="text">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="">M.Phil Marks</label>
	      	</div>
	      	<div class="column is-2 ">
				<input class="input is-small" ref="mphil_marks" type="text">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="">M.Phil Division</label>
	      	</div>
	      	<div class="column is-2">
        		<input class="input is-small" ref="mphil_div" type="text">
	      	</div>
		</div>

		<div class="columns mt30">
			<div class="column is-full">
		    	<h3 class="has-text-weight-bold is-size-6 has-text-link">Phd. information</h3>
		    </div>
		</div>

		<div class="columns mt30">
			<div class="column is-2">
				<label class="label is-small" for="phd_stream">Phd. Stream </label>
			</div>
			<div class="column is-2">
				<input class="input is-small" ref="phd_stream" type="text">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="">Phd. Instituition</label>
	      	</div>
	      	<div class="column is-2 ">
				<input class="input is-small" ref="phd_institution" type="text">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="">Phd. University</label>
	      	</div>
	      	<div class="column is-2">
        		<input class="input is-small" ref="phd_university" type="text">
	      	</div>
		</div>

		<div class="columns mt30">
			<div class="column is-2">
				<label class="label is-small" for="">Phd. YOP</label>
			</div>
			<div class="column is-2">
				<input class="input is-small" ref="phd_yop" type="text">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="">Phd. Marks</label>
	      	</div>
	      	<div class="column is-2 ">
				<input class="input is-small" ref="phd_marks" type="text">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="">Phd. Division</label>
	      	</div>
	      	<div class="column is-2">
        		<input class="input is-small" ref="phd_div" type="text">
	      	</div>
		</div>

		<div class="columns mt30">
			<div class="column is-full">
		    	<h3 class="has-text-weight-bold is-size-6 has-text-link">Other information</h3>
		    </div>
		</div>

		<div class="columns mt30">
			<div class="column is-2">
				<label class="label is-small" for="other_stream">Other Stream </label>
			</div>
			<div class="column is-2">
				<input class="input is-small" ref="other_stream" type="text">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="">Other Instituition</label>
	      	</div>
	      	<div class="column is-2 ">
				<input class="input is-small" ref="other_institution" type="text">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="">Other University</label>
	      	</div>
	      	<div class="column is-2">
        		<input class="input is-small" ref="other_university" type="text">
	      	</div>
		</div>

		<div class="columns mt30">
			<div class="column is-2">
				<label class="label is-small" for="">Other YOP</label>
			</div>
			<div class="column is-2">
				<input class="input is-small" ref="other_yop" type="text">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="">Other Marks</label>
	      	</div>
	      	<div class="column is-2 ">
				<input class="input is-small" ref="other_marks" type="text">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="">Other Division</label>
	      	</div>
	      	<div class="column is-2">
        		<input class="input is-small" ref="other_div" type="text">
	      	</div>
		</div>

		<div class="columns mt30">
		    <div class="column is-full">
			    <button class="button is-primary has-text-weight-bold adjusted-top" onclick={closeProfessionalMasterCourseInformation}>
			    	Previous
			    </button>
			    <button class="button is-info has-text-weight-bold adjusted-top" onclick={addExtraActivityInformation}>
			    	Next >>
			    </button>
			    <button class="button is-danger has-text-weight-bold adjusted-top" onclick={close}>
			    	Cancel
			    </button>     
		    </div>
		</div>
	</div>
	    
</section>
<!-- End Of Professional Course-->
<!-- Start Extra Activity Information -->

 <!-- Start professional Master Course-->
<section class=" is-fluid" show={staff_view =='add_extra_activity_information'}>
	<div class="label">
		<div class="level-left">
			<h2 class="title" style="color: #ff3860;">{title} New Employee</h2>
		</div>
		<div class="level-right">
		</div>
	</div>
	<div class="box">
	    <div class="columns mt30">
			<div class="column is-full">
		    	<h3 class="has-text-weight-bold is-size-6 has-text-link">Other information</h3>
		    </div>
		</div>

		<div class="columns mt30">
			<div class="column is-2">
				<label class="label is-small" for="details_scholarship">Scholarship Detail </label>
			</div>
			<div class="column is-2">
				<input class="input is-small" ref="details_scholarship" type="text">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="">Awards/Honours Detail</label>
	      	</div>
	      	<div class="column is-2 ">
				<input class="input is-small" ref="details_honours" type="text">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="">Publication Detail</label>
	      	</div>
	      	<div class="column is-2">
        		<input class="input is-small" ref="details_publication" type="text">
	      	</div>
		</div>

		<div class="columns mt30">
			<div class="column is-2">
				<label class="label is-small" for="">Curricular Activities Detail</label>
			</div>
			<div class="column is-2">
				<input class="input is-small" ref="details_curricular_activities" type="text">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="">Sports Detail</label>
	      	</div>
	      	<div class="column is-2 ">
				<input class="input is-small" ref="details_sport" type="text">
	      	</div>
		</div>

		<div class="columns mt30">
		    <div class="column is-full">
			    <button class="button is-primary has-text-weight-bold adjusted-top" onclick={closeExtraActivityInformation}>
			    	Previous
			    </button>
			    <button class="button is-danger has-text-weight-bold adjusted-top" onclick={addPrevoiusJob}>
			     Next
			    </button>    
			   <button class="button is-info has-text-weight-bold adjusted-top" onclick={close}>
			   Cancel
			   </button>     
		    </div>
		</div>

	</div>
	<!-- <div each={w, i in workArray}><input type="text" name="" class="input" ref='w.name'>
	<button class="button" onclick={addMoreArary.bind(this, w)}>Add</button></div> -->
</section>

<!-- Start professional Master Course-->
<section class=" is-fluid" show={staff_view =='add_previous_job_information'}>
	<div class="label">
		<div class="level-left">
			<h2 class="title" style="color: #ff3860;">{title} New Employee</h2>
		</div>
		<div class="level-right">
		</div>
	</div>
	<div class="box">
	    <div class="columns mt30">
			<div class="column is-full">
		    	<h3 class="has-text-weight-bold is-size-6 has-text-link">Particulars of Previous Job</h3>
		    </div>
		</div>

		<div class="columns mt30">
			<div class="column is-2">
				<label class="label is-small" for="">Organization Name</label>
			</div>
			<div class="column is-2">
				<input class="input is-small" ref="organization_of_previous_job" type="text">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="">Address Line 1</label>
	      	</div>
	      	<div class="column is-2 ">
				<input class="input is-small" ref="add_l1_of_previous_job" type="text">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="">Address Line 2</label>
	      	</div>
	      	<div class="column is-2">
        		<input class="input is-small" ref="add_l2_of_previous_job" type="text">
	      	</div>
		</div>

		<div class="columns mt30">
			<div class="column is-2">
				<label class="label is-small" for="">City</label>
			</div>
			<div class="column is-2">
				<input class="input is-small" ref="city_of_previous_job" type="text">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="">Zip</label>
	      	</div>
	      	<div class="column is-2 ">
				<input class="input is-small" ref="zip_of_previous_job" type="text">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="">State</label>
	      	</div>
	      	<div class="column is-2">
        		<input class="input is-small" ref="state_of_previous_job" type="text">
	      	</div>
		</div>

		<div class="columns mt30">
			<div class="column is-2">
				<label class="label is-small" for="">Country</label>
			</div>
			<div class="column is-2">
				<input class="input is-small" ref="country_of_previous_job" type="text">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="">Designation</label>
	      	</div>
	      	<div class="column is-2 ">
				<input class="input is-small" ref="designation_of_previous_job" type="text">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="">Date of Joining</label>
	      	</div>
	      	<div class="column is-2">
        		<input class="input date is-small" ref="doj_of_previous_job" type="text">
	      	</div>
		</div>

		<div class="columns mt30">
			<div class="column is-2">
				<label class="label is-small" for="">Salary</label>
			</div>
			<div class="column is-2">
				<input class="input is-small" ref="salary_of_previous_job" type="text">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="">Basic</label>
	      	</div>
	      	<div class="column is-2 ">
				<input class="input is-small" ref="basic_of_previous_job" type="text">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="">Allowances</label>
	      	</div>
	      	<div class="column is-2">
        		<input class="input is-small" ref="allowances_of_previous_job" type="text">
	      	</div>
		</div>

		<div class="columns mt30">
			<div class="column is-2">
				<label class="label is-small" for="">Other Benefits</label>
			</div>
			<div class="column is-2">
				<input class="input is-small" ref="other_benefits_of_previous_job" type="text">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="">Bond Details</label>
	      	</div>
	      	<div class="column is-2 ">
				<input class="input is-small" ref="bond_details_of_previous_job" type="text">
	      	</div>
		</div>

		<div class="columns mt30">
			<div class="column is-full">
		    	<h3 class="has-text-weight-bold is-size-6 has-text-link">Work Profile</h3>
		    </div>
		</div>

		<div class="columns mt30">
			<div class="column is-2">
				<label class="label is-small" for="">Qualification</label>
			</div>
			<div class="column is-2">
				<input class="input is-small" ref="qualification" type="text">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="doj">Date of Joining</label>
	      	</div>
	      	<div class="column is-2 ">
				<input class="input date is-small" ref="doj" type="text">
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="subject_id">Specialization</label>
	      	</div>
	      	<div class="column is-2">
        		<div class="select is-fullwidth is-small">
					<select ref="subject_id">
						<option each={subjects} value={subject_id}>{subject_name}
		                </option>
					</select>
				</div>
	      	</div>
		</div>

		<div class="columns mt30">
			<div class="column is-2">
				<label class="label is-small" for="">Employee Type</label>
			</div>
			<div class="column is-2">
				<div class="select is-fullwidth is-small">
					<select ref="emp_type_id">
						<option each={employeeTypes} value={emp_type_id}>{emp_type}
		                </option>
					</select>
				</div>
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="">Designation</label>
	      	</div>
	      	<div class="column is-2 ">
				<div class="select is-fullwidth is-small">
					<select ref="designation_id">
						<option each={designations} value={designation_id}>{designation}
		                </option>
					</select>
				</div>
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="">Department</label>
	      	</div>
	      	<div class="column is-2">
        		<div class="select is-fullwidth is-small">
					<select ref="department_id">
						<option each={departments} value={department_id}>{department_name}
		                </option>
					</select>
				</div>
	      	</div>
		</div>

		<div class="columns mt30">
			<div class="column is-2">
				<label class="label is-small" for="level_id">Level</label>
			</div>
			<div class="column is-2">
				<div class="select is-fullwidth is-small">
					<select ref="level_id">
						<option each={levels} value={level_id}>{level}
		                </option>
					</select>
				</div>
	      	</div>
	      	<div class="column is-2">
				<label class="label is-small" for="">Employment Status</label>
	      	</div>
	      	<div class="column is-2 ">
				<div class="select is-fullwidth is-small">
					<select ref="employment_status_id">
						<option each={employmentStatus} value={employment_status_id}>{employment_status}
		                </option>
					</select>
				</div>
	      	</div>
		</div>

		<div class="columns mt30">
		    <div class="column is-full">
			    <button class="button is-primary has-text-weight-bold adjusted-top" onclick={closePreviousJob}>
			    	<< Previous
			    </button>
			    <button class="button is-info has-text-weight-bold adjusted-top" onclick={addInformation}>
			    	Submit
			    </button>
			    <button class="button is-danger has-text-weight-bold adjusted-top" onclick={close}>
			    	Cancel
			    </button>      
		    </div>
		</div>

	</div>
</section>	


<div id="statusModal" class="modal ">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Update Status</p>
      </header>
      <section class="modal-card-body">
        <div class="columns">
          <div class="column">
            <div class="field">
              <label class="label" for="role">Leaving Date</label>
              <div class="control">
                <input class="input date" type="text" ref="leaving_date" >
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
      </section>
      <footer class="modal-card-foot">
        <button class="button is-danger" onclick={updateEmployeeStatus} >{title}</button>
        <button class="button" id="item-modal-close" onclick={closeStatusUpdateModal}>Cancel</button>
      </footer>
    </div>
  </div>
<!-- End Other Information -->
<section class=" is-fluid" show={staff_view =='staff_profile'}>
		<div class="level">
			<div class="level-left">
				<h2 class="title">Profile of {first_name} {middle_name} {last_name}</h2>
			</div>
			<div class="level-right">
				<a class="button no-print" onclick={close_staff_profile}>Back</a>
			</div>
		</div>
		
		<table class="table is-fullwidth is-bordered">
		<!-- <caption class="caption"> Student\'s Information ({st.session_name})</caption> -->
			<tr>
				<td rowspan="4" colspan="2">
					<img id="pp_box1" width="90" height="90" >
				</td> 
				<td colspan="2"  style="background-color:#efefef"><b>Login ID</b></td>
				<td colspan="3">{employee_id}</td>
			</tr>
			<tr>
				<th>Name</th>
				<td>{first_name} {middle_name} {last_name}</td>
				<th>Short Name</th>
				<td colspan=2>{st.short_name}</td>
			</tr>
			<tr>
				<th>Gender</th>
				<td>{gender} </td>
				<th>Blood Group</th>
				<td colspan="2">{blood_group}</td>
			</tr>
			<tr>
				<th>Category</th>
				<td colspan="2">{category_name}</td>
				<th>Date of Birth</th>
				<td>{dob}</td>

			</tr>
			<tr>
				<th>Marital Status</th>
				<td>{marital_status}</td>
				<th>Date of Marriage</th>
				<td>{dom}</td>
				<th colspan="2">Husband/Wife Name</th>
				<td>{spouse}</td>
				
			</tr>
			<tr>
				<th colspan="2">Permanent Address</th>
				<td colspan="5">{add_l1} , {add_l2}, {city} , {state}-{zip}, {country}</td>
			</tr>
			<tr>
				<th colspan="2">Correspondence Address</th>
				<td colspan="5">{c_add_l1} , {c_add_l2}, {c_city} , {c_state}-{c_zip}, {c_country}</td>
			</tr>
			<tr>
				<th colspan="2">Phone(O)</th>
				<td>{office_phoe}</td>
				<th colspan="2">Mobile</th>
				<td>{mobile}</td>
				
			</tr>
			<tr>
				<th colspan="2">Email</th>
				<td colspan="5">{email}</td>
			</tr>
		 </table>
		 <table class="table is-fullwidth is-bordered">	
			<tr>
				<th colspan="7">Work Profile</th>
			</tr>
			<tr>
				<th colspan="2">Phone(O)</th>
				<td>{office_phoe}</td>
				<th colspan="2">Mobile</th>
				<td>{mobile}</td>
				
			</tr>
			<tr>
				<th>Qulaification</th>
				<td colspan="2">{qualification}</td>
				<th colspan="2">Date of Joining</th>
				<td>{doj}</td>
				
			</tr>
			<tr>
				<th colspan="2">Specialization</th>
				<td>{specialization}</td>
				<th colspan="2">Employee Type</th>
				<td>{emp_type}</td>
				
			</tr>
			<tr>
				<th colspan="2">Designation</th>
				<td>{designation}</td>
				<th colspan="2">Department</th>
				<td>{department_name}</td>
				
			</tr>
			<tr>
				<th colspan="2">Level</th>
				<td>{level_name}</td>
				<th colspan="2">Employment Status</th>
				<td>{employment_status}</td>
				
			</tr>
		</table>
		<table class="table is-fullwidth is-bordered">
			<tr>
				<th colspan="7"><b>Academic Qualification</b></th>
			</tr>
			<tr><th colspan="7">X Infrmation</th></tr>
            <tr>
				<th>Subject</th>
				<th>Institution</th>
				<th>Board</th>
				<th>YOP</th>
				<th>Marks</th>
				<th>Division</th>
			</tr>
			<tr>
				<td>{x_subject}</td>
				<td>{x_institution}</td>
				<td>{x_board}</td>
				<td>{x_yop}</td>
				<td>{x_marks}</td>
				<td>{x_div}</td>
			</tr>
			<tr><th colspan="7">XII Infrmation</th></tr>
            <tr>
				<th>Subject</th>
				<th>Institution</th>
				<th>Board</th>
				<th>YOP</th>
				<th>Marks</th>
				<th>Division</th>
			</tr>
			<tr>
				<td>{xii_subject}</td>
				<td>{xii_institution}</td>
				<td>{xii_board}</td>
				<td>{xii_yop}</td>
				<td>{xii_marks}</td>
				<td>{xii_div}</td>
			</tr>
			<tr><th colspan="7">UG Infrmation</th></tr>
            <tr>
				<th>Course</th>
				<th>Institution</th>
				<th>Board</th>
				<th>YOP</th>
				<th>Marks</th>
				<th>Division</th>
			</tr>
			<tr>
				<td>{ug_course}</td>
				<td>{ug_institution}</td>
				<td>{ug_board}</td>
				<td>{ug_yop}</td>
				<td>{ug_marks}</td>
				<td>{ug_div}</td>
			</tr>
			<tr><th colspan="7">PG Infrmation</th></tr>
            <tr>
				<th>Course</th>
				<th>Institution</th>
				<th>Board</th>
				<th>YOP</th>
				<th>Marks</th>
				<th>Division</th>
			</tr>
			<tr>
				<td>{pg_course}</td>
				<td>{pg_institution}</td>
				<td>{pg_board}</td>
				<td>{pg_yop}</td>
				<td>{pg_marks}</td>
				<td>{pg_div}</td>
			</tr>
			<tr><th colspan="7">B.Ed Infrmation</th></tr>
            <tr>
				<th>Stream</th>
				<th>Institution</th>
				<th>Board</th>
				<th>YOP</th>
				<th>Marks</th>
				<th>Division</th>
			</tr>
			<tr>
				<td>{bed_stream}</td>
				<td>{bed_institution}</td>
				<td>{bed_board}</td>
				<td>{bed_yop}</td>
				<td>{bed_marks}</td>
				<td>{bed_div}</td>
			</tr>
			<tr><th colspan="7">B.T Infrmation</th></tr>
            <tr>
				<th>Stream</th>
				<th>Institution</th>
				<th>Board</th>
				<th>YOP</th>
				<th>Marks</th>
				<th>Division</th>
			</tr>
			<tr>
				<td>{bt_stream}</td>
				<td>{bt_institution}</td>
				<td>{bt_board}</td>
				<td>{bt_yop}</td>
				<td>{bt_marks}</td>
				<td>{bt_div}</td>
			</tr>
			<tr><th colspan="7">B. P. Ed. Information</th></tr>
            <tr>
				<th>Stream</th>
				<th>Institution</th>
				<th>Board</th>
				<th>YOP</th>
				<th>Marks</th>
				<th>Division</th>
			</tr>
			<tr>
				<td>{bped_stream}</td>
				<td>{bped_institution}</td>
				<td>{bped_board}</td>
				<td>{bped_yop}</td>
				<td>{bped_marks}</td>
				<td>{bped_div}</td>
			</tr>
			<tr><th colspan="7">D.P.Ed. Information</th></tr>
            <tr>
				<th>Stream</th>
				<th>Institution</th>
				<th>Board</th>
				<th>YOP</th>
				<th>Marks</th>
				<th>Division</th>
			</tr>
			<tr>
				<td>{dped_stream}</td>
				<td>{dped_institution}</td>
				<td>{dped_board}</td>
				<td>{dped_yop}</td>
				<td>{dped_marks}</td>
				<td>{dped_div}</td>
			</tr>
			<tr><th colspan="7">M.P.Ed. Information</th></tr>
            <tr>
				<th>Stream</th>
				<th>Institution</th>
				<th>Board</th>
				<th>YOP</th>
				<th>Marks</th>
				<th>Division</th>
			</tr>
			<tr>
				<td>{mped_stream}</td>
				<td>{mped_institution}</td>
				<td>{mped_board}</td>
				<td>{mped_yop}</td>
				<td>{mped_marks}</td>
				<td>{mped_div}</td>
			</tr>
			<tr><th colspan="7">M.Ed. Information</th></tr>
            <tr>
				<th>Stream</th>
				<th>Institution</th>
				<th>Board</th>
				<th>YOP</th>
				<th>Marks</th>
				<th>Division</th>
			</tr>
			<tr>
				<td>{med_stream}</td>
				<td>{med_institution}</td>
				<td>{med_board}</td>
				<td>{med_yop}</td>
				<td>{med_marks}</td>
				<td>{med_div}</td>
			</tr>
			<tr><th colspan="7">M.Phil. Information</th></tr>
            <tr>
				<th>Stream</th>
				<th>Institution</th>
				<th>Board</th>
				<th>YOP</th>
				<th>Marks</th>
				<th>Division</th>
			</tr>
			<tr>
				<td>{mphil_stream}</td>
				<td>{mphil_institution}</td>
				<td>{mphil_board}</td>
				<td>{mphil_yop}</td>
				<td>{mphil_marks}</td>
				<td>{mphil_div}</td>
			</tr>
			<tr><th colspan="7">Phd. Information</th></tr>
            <tr>
				<th>Stream</th>
				<th>Institution</th>
				<th>Board</th>
				<th>YOP</th>
				<th>Marks</th>
				<th>Division</th>
			</tr>
			<tr>
				<td>{phd_stream}</td>
				<td>{phd_institution}</td>
				<td>{phd_board}</td>
				<td>{phd_yop}</td>
				<td>{phd_marks}</td>
				<td>{phd_div}</td>
			</tr>
			<tr><th colspan="7">Other Qualification</th></tr>
            <tr>
				<th>Stream</th>
				<th>Institution</th>
				<th>Board</th>
				<th>YOP</th>
				<th>Marks</th>
				<th>Division</th>
			</tr>
			<tr>
				<td>{other_stream}</td>
				<td>{other_institution}</td>
				<td>{other_board}</td>
				<td>{other_yop}</td>
				<td>{other_marks}</td>
				<td>{other_div}</td>
			</tr>
		</table>
		<table class="table is-fullwidth is-bordered">
			<tr>
				<th colspan="7">Extra Activities</th>
			</tr>
			<tr>
			 <th colspan="2">Scholarship Details</th>
			 <td colspan="2">{details_scholarship}</td>	
			 <th colspan="2">Awards/honours Details</th>
			 <td>{details_honours}</td>
			</tr>
			<tr>
			 <th colspan="2">Publication Details</th>
			 <td>{details_publication}</td>	
			 <th colspan="3">Curricular Activities Details</th>	
			 <td>{details_curricular_activities}</td>	
			</tr>
			<tr>
			 <th colspan="3">Sports Detail</th>
			 <td colspan="4">{details_sport}</td>	
			</tr>
		</table>
		<table class="table is-fullwidth is-bordered">
			<tr>
				<th colspan="7">Working Experience</th>
			</tr>
			 <tr>
				<th>Institution</th>
				<th>DOJ</th>
				<th>DOL</th>
				<th>Position</th>
				<th>Subject Taught</th>
			</tr>
			<tr>
				<td>{work_institution}</td>
				<td>{doj}</td>
				<td>{dol}</td>
				<td>{position}</td>
				<td>{subject_taught}</td>
			</tr>
		</table>
	</section>

<!-- Fast Edit Modal-->
       	<section class=" is-fluid" show={staff_view =='show_staff_fast_edit'}>
       		<div class="level">
				<div class="level-left">
					<h2 class="title" style="color: #ff3860;">Fast Edit</h2>
				</div>
				<div class="level-right">
				<div>
				<button class="button is-warning is-rounded" onclick={backToStaff}>
			        <span class="icon">
			          <span class="fas fa-arrow-left"></span>
			        </span>
		        </button>
				</div>
		        </div>
		    </div>
		<div class="box">
			<div class="columns">
				<div class="column is-narrow">
					<div class="control">
						<div class="select">
							<select ref="fast_edit_value" onchange={showFastEdit}>
								<option>Select Field</option>
								<option value='short_name'>Short Name</option>
								<option value='gender'>Gender</option>
								<option value='father_name'>Father Name</option>
								<option value='blood_group'>Blood Group</option>
								<option value='mobile'>Mobile</option>
								<option value='phone_r'>Phone Residence </option>
								<option value='phone_o'>Phone Office</option>
								<option value='city'>City</option>
								<option value='employee_id'>Employee ID</option>
								
							</select>
						</div>
					</div>
				</div>
			</div>
			 
		</div>
		<div class="level-right"><button class="button is-danger" onclick="{fastUpdateStaff}">Update</button></div>
		<table class="table is-fullwidth is-striped is-hoverable is-narrow">
			<thead>
				<tr>
					<th>#</th>
				    <th>EmpId</th>
				    <th>Ttitle</th>
				    <th>Name</th>
				    <th show={view_field=='show_f_short_name'}>short_name</th>
				    <th show={view_field=='show_f_gender'}>Gender</th>
				    <th show={view_field=='show_f_father_name'}>Father Name</th>
				    <th show={view_field=='show_f_blood_group'}>Blood Group</th>
				    <th show={view_field=='show_f_mobile'}>Mobile</th>  
				    <th show={view_field=='show_f_phone_r'}>Phone Residence</th>
				    <th show={view_field=='show_f_phone_o'}>Phone Office </th>
				    <th show={view_field=='show_f_picture'}>Picture</th>
				    <th show={view_field=='show_f_city'}>City</th>
				    <th show={view_field=='show_f_employee_id'}>Employee Id</th>
				</tr>
			</thead>
			<tbody>
				<tr each={st, i in staffs}>
				    <td>{i+1}</td>
				    <td>{st.employee_id}</td>
				    <td>{st.title}</td>
				    <td>{st.first_name} {st.middle_name} {st.last_name}</td>
				    <td show={view_field=='show_f_short_name'}>
				    <input type="text" class='input is-small' id="{'short_name' + st.emp_id}" value={st.short_name}></td>
				    <td show={view_field=='show_f_gender'}>
				    	    <select id="{'gender' + st.emp_id}" value={st.gender}>
								<option value="M">Male</option>
								<option value="F">Female</option>
							</select>
							
				    	<!-- <input type="text" id='gender' value={st.gender} class="input is-small"> -->
				    </td>
				    <td show={view_field=='show_f_father_name'}>
				    <input type="text" class='input is-small' id="{'father_name' + st.emp_id}" value={st.father_name}></td>
				    <td show={view_field=='show_f_blood_group'}>
				    	   <select id="{'blood_group' + st.emp_id}" value={st.blood_group}>
								<option value="A+">A+</option>
								<option value="A-">A-</option>
								<option value="AB+">AB+</option>
								<option value="AB-">AB-</option>
								<option value="B+">B+</option>
								<option value="B-">B-</option>
								<option value="O+">O+</option>
								<option value="O-">O-</option>
							</select>
					</td>  
				    <td show={view_field=='show_f_mobile'}>
				    <input type="text" class='input is-small' id="{'mobile' + st.emp_id}" value={st.mobile}>
				     </td>
				    <td show={view_field=='show_f_phone_r'}>
				    	<input type="text" class='input is-small' id="{'phone_r' + st.emp_id}" value={st.residence_phone}></td>
				    <td show={view_field=='show_f_phone_o'}>
				    <input type="text" class='input is-small' id="{'phone_o' + st.emp_id}" value={st.office_phone}></td>
				   <!--  <td show={view_field=='show_f_phone_r'}>
				   	<input type="text" class='input is-small' id="phone_r" value={st.residence_phone}></td> -->
				    <td show={view_field=='show_f_city'}>
				    	<input type="text" class='input is-small' id="{'city' + st.emp_id}" value={st.city}></td>
				    <td show={view_field=='show_f_employee_id'}>
				    <input type="text" class='input is-small' id="{'employee_id' + st.emp_id}" value={st.employee_id}>
				</td>
				</tr>
			</tbody>
		</table>
		<div class="level-right">
			<button class="button is-danger" onclick="{fastUpdateStaff}">Update</button>
			<button class="button" onclick="{backToStaff}">Cancel</button>
		</div>
	</section>
<script>
	
	var self = this
    self.on("mount", function(){
        self.title='Add'
    	self.staff_view = 'show_staff'
    	self.is_staff_picture=false
    	self.staff_picture=false
    	self.loading=false
    	self.role = getCookie('role')
    	self.readEmployeeTypes()
    	self.readDesignations()
    	self.readDepartment()
    	self.readLevel()
    	self.readReligion()
    	self.readReligion()
    	self.readCategory()
    	self.readSubject()
    	self.readEmploymentStatus()
    	self.staff_name = true	
        self.update()
      //  console.log(self.workArray);
        flatpickr(".date", {
	    	allowInput: true,
        	dateFormat: "d/m/Y",
  		})
    })

    self.on("unmount", function(){
      employmentStatusStore.off('employment_status_changed', EmploymentStatusChanged)
      subjectStore.off('read_subject_changed',ReadSubjectChanged)	
      studentStore.off('read_cast_changed',CastChanged)
      studentStore.off('read_religion_changed',ReligionChanged)
      employeeTypeStore.off('employeeTypes_changed', EmployeeTypesChanged)
      designationStore.off('designations_changed', DesignationsChanged)
      levelStore.off('level_changed', LevelChanged)
      staffStore.off('department_changed', DepartmentChanged)
      staffStore.off('read_staff_changed',StaffChanged)
      staffStore.off('add_staff_changed',AddStaffChanged)
      staffStore.off('read_for_edit_staff_changed',ReadForEditStaffChanged)
      staffStore.off('upload_staff_image_changed',UploadStaffImage)
      staffStore.off('edit_staff_changed',EditStaffChanged)
      staffStore.off('update_staff_status_changed',UpdateStaffStatusChanged)
      staffStore.off('delete_staff_changed',DeleteStaffChanged)
      staffStore.off('allow_block_staff_changed',AllowBlockStaffChanged)
      staffStore.off('reset_staff_password_changed',ResetStaffPasswordChanged)
      staffStore.off('update_staff_fast_edit_changed',readStaffFastEditChanged)
    })

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

    self.showFastEditModal = () =>{
       self.staff_view ='show_staff_fast_edit'     
    }
     self.backToStaff = () =>{
       self.staff_view ='show_staff'     
    }
    

     self.showFastEdit= () =>{
        if(self.refs.fast_edit_value.value=='gender'){
       	 self.view_field='show_f_gender'
        }
        if(self.refs.fast_edit_value.value=='short_name'){
       	 self.view_field='show_f_short_name'
        }
        if(self.refs.fast_edit_value.value=='father_name'){
       	 self.view_field='show_f_father_name'
        }
        if(self.refs.fast_edit_value.value=='blood_group'){
       	 self.view_field='show_f_blood_group'
        }      
        if(self.refs.fast_edit_value.value=='city'){
       	 self.view_field='show_f_city'
        }
        if(self.refs.fast_edit_value.value=='employee_id'){
       	 self.view_field='show_f_employee_id'
        }
         if(self.refs.fast_edit_value.value=='mobile'){
       	 self.view_field='show_f_mobile'
        }
         if(self.refs.fast_edit_value.value=='phone_o'){
       	 self.view_field='show_f_phone_o'
        }
         if(self.refs.fast_edit_value.value=='phone_r'){
       	 self.view_field='show_f_phone_r'
        }
    }

    self.fastUpdateStaff=()=>{
    	var editValues = []
	    console.log(self.staffs)
	   	self.staffs.map( q => {
	   	var obj={}
	     	obj['emp_id'] = q.emp_id
		    if(self.refs.fast_edit_value.value=='gender'){
	       	  obj['value'] = $('#gender'+q.emp_id).val();
	   	      editValues.push(obj);
	        }
	        if(self.refs.fast_edit_value.value=='short_name'){
	       	 obj['value'] = $('#short_name'+q.emp_id).val();
	   	      editValues.push(obj);
	        }
	        if(self.refs.fast_edit_value.value=='father_name'){
	       	 obj['value'] = $('#father_name'+q.emp_id).val();
	   	      editValues.push(obj);
	        }
	        if(self.refs.fast_edit_value.value=='blood_group'){
	       	 obj['value'] = $('#blood_group'+q.emp_id).val();
	   	      editValues.push(obj);
	        }      
	        if(self.refs.fast_edit_value.value=='city'){
	       	 obj['value'] = $('#city'+q.emp_id).val();
	   	      editValues.push(obj);
	        }
	        if(self.refs.fast_edit_value.value=='employee_id'){
	       	 obj['value'] = $('#employee_id'+q.emp_id).val();
	   	      editValues.push(obj);
	        }
	         if(self.refs.fast_edit_value.value=='mobile'){
	       	 obj['value'] = $('#mobile'+q.emp_id).val();
	   	      editValues.push(obj);
	        }
	         if(self.refs.fast_edit_value.value=='phone_o'){
	       	 obj['value'] = $('#phone_o'+q.emp_id).val();
	   	      editValues.push(obj);
	        }
	         if(self.refs.fast_edit_value.value=='phone_r'){
	       	 obj['value'] = $('#phone_r'+q.emp_id).val();
	   	      editValues.push(obj);
	        }
	   	
	   	})
	   	console.log(editValues)
	     staffStore.trigger('fast_edit_staff',editValues,self.refs.fast_edit_value.value)
    }

    self.closeFastEditModal=()=>{
    	 $("#columnSetting").removeClass("is-active");
    }

     self.showFastEditTable = () =>{
       $("#fastEditTable").addClass("is-active")
           
    }

    self.closeFastEditTable=()=>{
    	 $("#fastEditTable").removeClass("is-active");
    }

    self.close_staff_profile=()=>{
    	self.staff_view='show_staff'
    	self.title='Add';
    }
    self.updateEmployeeStatus=()=>{
    	self.leaving_date=convertDate(self.refs.leaving_date.value)
    	staffStore.trigger('update_staff_status',self.emp_id,self.leaving_date,self.refs.remark.value)
    }
    self.allowBlockStaff=()=>{
    	if(self.is_active=='Y'){
    		 var active='N'
    		staffStore.trigger('allow_block_staff',self.emp_id, active)
    		console.log(is_active)
    	}else{
    		var active='Y'
    		console.log(active)
    		staffStore.trigger('allow_block_staff',self.emp_id, active)
    	}
    }
     self.resetStaffPassword=()=>{
     	//var password=md5('123456')
    	staffStore.trigger('reset_staff_password',self.emp_id)
    }
    self.readEmployeeTypes = () => {
       employeeTypeStore.trigger('read_employeeTypes')
    }
    self.readDesignations = () => {
       designationStore.trigger('read_designations')
    }
    self.readLevel = () => {
       levelStore.trigger('read_level')
    }

    self.readDepartment = () => {
       staffStore.trigger('read_department')
    }
   


    self.getStaffData = () =>{
    	//if(self.refs.read_enroll_number.value==""){
    		self.loading=true
    		staffStore.trigger('read_temp_staff', self.refs.r_emp_type_id.value)
    	//}
      
    }

    self.add_new_staff = () =>{
    	if(self.title=='Add' || self.title=='Update'){
    		self.staff_view='add_staff'
    	}else{
    	  self.staff_view='staff_profile'
    	}
    	self.update()
    	document.getElementById("first_name").focus()
    }

    self.selectStaff = (item,event) => {
      item.done=!event.item.st.done
      console.log(item.done)
      if(event.item.st.done==true){
        self.emp_id=item.emp_id
        self.is_active=item.is_active
        console.log(self.emp_id)
        console.log(self.is_active)
       }
     }

    self.update_staff_status = () => {
        /*self.empIDArray=[]
        self.staffs.map(i=>{
        	var obj ={};
          if(item.emp_id==i.emp_id){
            i.selected=!i.selected
              console.log(i.selected);
	            if(i.selected){
	            	obj.emp_id=i.emp_id
	            	 self.empIDArray.push(obj)
	            }
          	//}
        })*/
        self.title = 'Add'
        $("#statusModal").addClass("is-active");
    }

    self.closeStatusUpdateModal = () => {
      $("#statusModal").removeClass("is-active");
       self.staffs.map(i=>{
          i.done = false;
          $('EmpId'+i.emp_id).prop('checked', false); 
       })
    }

    self.close = () =>{
    	self.staff_view = 'show_staff'
    	self.clearForm();
    }

    self.cancelOperation = (e) => {
      self.staffs.map(ev => {
          ev.confirmDelete = false
          ev.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.staffs.map(ev => {
        if(ev.emp_id != e.item.st.emp_id){
          ev.confirmDelete = false
        }else{
          ev.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      staffStore.trigger('delete_staff', e.item.st.emp_id)
    }

    self.addFamilyInformation = () =>{
    	/*var phoneno = /^\d{10}$/;
    	if(!self.refs.first_name.value){
    		toastr.error("Please enter First Name and try again")
    		return;
    	}else if(!self.refs.enroll_number.value){
        	toastr.error("Please enter Enroll No and try again")
        	return;
      	}else if(!self.refs.dob.value){
        	toastr.error("Please enter DOB and try again")
        	return;
      	}else if(!self.refs.mobile.value){
        	toastr.error("Please enter SMS No and try again")
        	return;
      	}else if(!self.refs.mobile.value.match(phoneno)){
        	toastr.error("Please enter Valid SMS No and try again")
        	return;
      	}else if(!self.refs.doa.value){
        	toastr.error("Please enter DOA and try again")
        	return;
      	}else if(!self.refs.doj.value){
        	toastr.error("Please enter DOJ and try again")
        	return;
      	}else{
    		self.staff_view='add_father_information'
    		self.update()
    		document.getElementById("f_title").focus()
      	}*/
      self.staff_view='add_family_information'
      self.update()	
    } 
    self.closeFamilyInformation = () =>{
    	self.staff_view = 'add_staff'
    	self.update()
    }
    self.addQualificationInformation = () =>{
    	/*if(!self.refs.f_name.value){
    		toastr.error("Please enter Father Name and try again")
    		return;
    	}else{*/
    		self.staff_view='add_qualification_information'
    		self.update()
    	/*	document.getElementById("m_title").focus()
      	}*/
    }
    self.closeQualificationInformation = () =>{
    	self.staff_view = 'add_family_information'
    	self.update()
    }

    self.addProfessionalCourseInformation = () =>{
    	/*if(!self.refs.m_name.value){
    		toastr.error("Please enter Mother Name and try again")
    		return;
    	}else{*/
    		self.staff_view='add_professional_course_information'
    		self.update()
    		//document.getElementById("guardian").focus()
      	//}
    }
    self.closeProfessionalCourseInformation = () =>{
    	self.staff_view = 'add_qualification_information'
    }
    self.addProfessionalMasterCourseInformation = () =>{
    	/*if(!self.refs.m_name.value){
    		toastr.error("Please enter Mother Name and try again")
    		return;
    	}else{*/
    		self.staff_view='add_professional_master_course_information'
    		self.update()
    		//document.getElementById("guardian").focus()
      	//}
    }
    self.closeProfessionalMasterCourseInformation = () =>{
    	self.staff_view = 'add_professional_course_information'
    }

    self.addExtraActivityInformation = () =>{
    	/*if(!self.refs.m_name.value){
    		toastr.error("Please enter Mother Name and try again")
    		return;
    	}else{*/
    		self.staff_view='add_extra_activity_information'
    		self.update()
    		//document.getElementById("guardian").focus()
      	//}
    }
    self.closeExtraActivityInformation = () =>{
    	self.staff_view = 'add_professional_master_course_information'
    }

    self.addPrevoiusJob = () =>{
    		self.staff_view='add_previous_job_information'
    		self.update()
    }
    self.closePreviousJob= () =>{
    	self.staff_view='add_extra_activity_information'
    	self.update()
    }
    self.readSubject = () => {
       subjectStore.trigger('read_subject')
    }
    self.readEmploymentStatus = () => {
       employmentStatusStore.trigger('read_employment_status')
    }

    subjectStore.on('read_subject_changed',ReadSubjectChanged)
    function ReadSubjectChanged(subjects){
      console.log(subjects) 
      self.subjects = subjects
      self.update()
      console.log(self.subjects)
    }

     employmentStatusStore.on('employment_status_changed',EmploymentStatusChanged)
    function EmploymentStatusChanged(employmentStatus){
      console.log('employment_status_changed1') 
      console.log(employmentStatus) 
      self.loading = false
      self.employmentStatus = employmentStatus
      self.update()
    }

    self.copyAddress = (e) => {
    	let cbox = '#correspondenceCheckbox'
    	if($(cbox).prop('checked') == true){
    		console.log("true")
    		self.refs.c_add_l1.value=self.refs.add_l1.value
    		self.refs.c_add_l2.value=self.refs.add_l2.value
    		self.refs.c_city.value=self.refs.city.value
    		self.refs.c_zip.value=self.refs.zip.value
    		self.refs.c_state.value=self.refs.state.value
    		self.refs.c_country.value=self.refs.country.value
    		self.update()
    	}else{
    		console.log("false")
    		self.refs.c_add_l1.value=''
    		self.refs.c_add_l2.value=''
    		self.refs.c_city.value=''
    		self.refs.c_zip.value=''
    		self.refs.c_state.value=''
    		self.refs.c_country.value=''
    	}
    }
    
    /* Start Upload Student Image*/
	self.remove_picture = (item1, item2, e) => {
		console.log('item1'+item1)
		console.log('item2'+item2)
		var pp_box = document.getElementById(item1);
		pp_box.style.backgroundImage = "";
		document.getElementById(item2).value = ""
		event.stopPropagation();
	}

	self.trigger_file_input = (item,e) => {
		document.getElementById(item).click();
	}


     self.loadFile = (item,event) => {
		var reader = new FileReader();
		reader.onload = function (e) {
			console.log(item)
			document.getElementById(item).style.backgroundImage = 'url(' + e.target.result + ')';
			console.log(e.target.result)
			self.is_staff_image=true
		};
		reader.readAsDataURL(event.target.files[0]);
		
		console.log(event.target.files[0])
		self.staff_picture = event.target.files[0]
	}

	self.uploadStaffImage = (staff_id) => {
		if(self.is_staff_image == true){
    		staffStore.trigger('upload_staff_image', self.staff_picture,staff_id)
		}
    } 

	
    self.readCategory = () => {
       studentStore.trigger('read_cast')
    }

    self.readReligion = () => {
       studentStore.trigger('read_religion')
    }


    self.addInformation = () =>{
    	console.log("addInformation")
    	var obj={}

    	/*Student Information */
        var staff={};
        
        
    	staff['title']=self.refs.title.value
    	staff['first_name']=self.refs.first_name.value
    	staff['middle_name']=self.refs.middle_name.value
    	staff['last_name']=self.refs.last_name.value
    	//staff['employee_id']=self.refs.employee_id.value
    	//staff['short_name']=self.refs.short_name.value
    	staff['marital_status']=self.refs.marital_status.value
    	staff['father_name']=self.refs.father_name.value
    	staff['father_occupation']=self.refs.father_occupation.value
    	staff['spouse']=self.refs.spouse.value
    	staff['spouse_occupation']=self.refs.spouse_occupation.value
    	staff['anniversary']=convertDate(self.refs.anniversary.value)
    	staff['id_mark']=self.refs.id_mark.value
    	staff['blood_group']=self.refs.blood_group.value
    	staff['religion_id']=self.refs.religion_id.value
    	staff['language']=self.refs.language.value
    	staff['emp_type_id']=self.refs.emp_type_id.value
    	staff['department_id']=self.refs.department_id.value
    	//staff['level_id']=self.refs.level_id.value
    	//staff['employment_status_id']=self.refs.employment_status_id.value
    	staff['subject_id']=self.refs.subject_id.value
    	staff['designation_id']=self.refs.designation_id.value
    	staff['qualification']=self.refs.qualification.value
    	staff['doj']=convertDate(self.refs.doj.value)
    	staff['place_of_birth']=self.refs.place_of_birth.value
    	staff['category_id']=self.refs.category_id.value
    	staff['dob']=convertDate(self.refs.dob.value)
    	staff['blood_group']=self.refs.blood_group.value
    	staff['add_l1']=self.refs.add_l1.value
    	staff['add_l2']=self.refs.add_l2.value
    	staff['city']=self.refs.city.value
    	staff['zip']=self.refs.zip.value
    	staff['state']=self.refs.state.value
    	staff['country']=self.refs.country.value
    	if($('#correspondenceCheckbox').prop('checked') == true){
    		staff['same_as_p_add'] = 1
    	}else{
    		staff['same_as_p_add'] = 0
    	}
    	
    	staff['c_add_l1']=self.refs.c_add_l1.value
    	staff['c_add_l2']=self.refs.c_add_l2.value
    	staff['c_city']=self.refs.c_city.value
    	staff['c_zip']=self.refs.c_zip.value
    	staff['c_state']=self.refs.c_state.value
    	staff['c_country']=self.refs.c_country.value
    	staff['residence_phone']=self.refs.residence_phone.value
    	staff['office_phone']=self.refs.office_phone.value
    	staff['mobile']=self.refs.mobile.value
    	staff['email']=self.refs.email.value
    	staff['nationality']=self.refs.nationality.value
    	//staff['photo']=self.refs.photo.value
        obj['staff']=staff;
        var staff_login={}
    	staff_login['employee_id']=self.refs.employee_id.value
    	staff_login['password']=self.refs.dob.value
    	if(self.title=='Add'){
    		obj['staff_login'] = staff_login
    	}else if(self.title=='Update'){
    		obj['staff_login']=""
    	}

    	 /*Student Login*/

      //  var staff_login={};


    	/*Father Information*/
        
        var family={};

    	/*family['child1_first_name']=self.refs.child1_first_name.value
    	family['child1_last_name']=self.refs.child1_last_name.value
    	family['child1_sex']=self.refs.child1_sex.value
    	family['child1_dob']=convertDate(self.refs.child1_dob.value)
    	family['child1_school']=self.refs.child1_school.value
    	family['child2_first_name']=self.refs.child2_first_name.value
    	family['child2_last_name']=self.refs.child2_last_name.value
    	family['child2_sex']=self.refs.child2_sex.value
    	family['child2_dob']=convertDate(self.refs.child2_dob.value)
    	family['child2_school']=self.refs.child2_school.value
    	family['child3_first_name']=self.refs.child3_first_name.value
    	family['child3_last_name']=self.refs.child3_last_name.value
    	family['child3_sex']=self.refs.child3_sex.value
    	family['child3_dob']=convertDate(self.refs.child3_dob.value)
    	family['child3_school']=self.refs.child3_school.value*/
        
        family['child1_first_name']=self.refs.child1_first_name.value
    	family['child1_last_name']=self.refs.child1_last_name.value
    	if(self.refs.child1_sex.value==''){
    		family['child1_sex']=null
    	}else{
    	    family['child1_sex']=self.refs.child1_sex.value
    	}
    	family['child1_dob']=convertDate(self.refs.child1_dob.value)
    	family['child1_school']=self.refs.child1_school.value
    	family['child2_first_name']=self.refs.child2_first_name.value
    	family['child2_last_name']=self.refs.child2_last_name.value
    	if(self.refs.child2_sex.value==''){
    		family['child2_sex']=null
    	}else{
    	    family['child2_sex']=self.refs.child2_sex.value
    	}
    	//family['child2_sex']=self.refs.child2_sex.value
    	family['child2_dob']=convertDate(self.refs.child2_dob.value)
    	family['child2_school']=self.refs.child2_school.value
    	family['child3_first_name']=self.refs.child3_first_name.value
    	family['child3_last_name']=self.refs.child3_last_name.value
    	if(self.refs.child3_sex.value==''){
    		family['child3_sex']=null
    	}else{
    	    family['child3_sex']=self.refs.child3_sex.value
    	}
    	//family['child3_sex']=self.refs.child3_sex.value
    	family['child3_dob']=convertDate(self.refs.child3_dob.value)
    	family['child3_school']=self.refs.child3_school.value
        obj['family']=family
    	
    	/*Qualification Information*/
    	var qualification={};
    	qualification['x_subject']=self.refs.x_subject.value
    	qualification['x_institution']=self.refs.x_institution.value
    	qualification['x_board']=self.refs.x_board.value
    	qualification['x_yop']=self.refs.x_yop.value
    	qualification['x_marks']=self.refs.x_marks.value
    	qualification['x_div']=self.refs.x_div.value
    	qualification['xii_subject']=self.refs.xii_subject.value
    	qualification['xii_institution']=self.refs.xii_institution.value
    	qualification['xii_board']=self.refs.xii_board.value
    	qualification['xii_yop']=self.refs.xii_yop.value
    	qualification['xii_marks']=self.refs.xii_marks.value
    	qualification['xii_div']=self.refs.xii_div.value
    	qualification['ug_course']=self.refs.ug_course.value
    	qualification['ug_institution']=self.refs.ug_institution.value
    	qualification['ug_university']=self.refs.ug_university.value
    	qualification['ug_yop']=self.refs.ug_yop.value
    	qualification['ug_marks']=self.refs.ug_marks.value
    	qualification['ug_div']=self.refs.ug_div.value
    	qualification['pg_course']=self.refs.pg_course.value
    	qualification['pg_institution']=self.refs.pg_institution.value
    	qualification['pg_university']=self.refs.pg_university.value
    	qualification['pg_yop']=self.refs.pg_yop.value
    	qualification['pg_marks']=self.refs.pg_marks.value
    	qualification['pg_div']=self.refs.pg_div.value
    	qualification['bed_stream']=self.refs.bed_stream.value
    	qualification['bed_institution']=self.refs.bed_institution.value
    	qualification['bed_university']=self.refs.bed_university.value
    	qualification['bed_yop']=self.refs.bed_yop.value
    	qualification['bed_marks']=self.refs.bed_marks.value
    	qualification['bed_div']=self.refs.bed_div.value

    	qualification['bt_stream']=self.refs.bt_stream.value
    	qualification['bt_institution']=self.refs.bt_institution.value
    	qualification['bt_university']=self.refs.bt_university.value
    	qualification['bt_yop']=self.refs.bt_yop.value
    	qualification['bt_marks']=self.refs.bt_marks.value
    	qualification['bt_div']=self.refs.bt_div.value

    	qualification['bped_stream']=self.refs.bped_stream.value
    	qualification['bped_institution']=self.refs.bped_institution.value
    	qualification['bped_university']=self.refs.bped_university.value
    	qualification['bped_yop']=self.refs.bped_yop.value
    	qualification['bped_marks']=self.refs.bped_marks.value
    	qualification['bped_div']=self.refs.bped_div.value

    	qualification['dped_stream']=self.refs.dped_stream.value
    	qualification['dped_institution']=self.refs.dped_institution.value
    	qualification['dped_university']=self.refs.dped_university.value
    	qualification['dped_yop']=self.refs.dped_yop.value
    	qualification['dped_marks']=self.refs.dped_marks.value
    	qualification['dped_div']=self.refs.dped_div.value

    	qualification['mped_stream']=self.refs.mped_stream.value
    	qualification['mped_institution']=self.refs.mped_institution.value
    	qualification['mped_university']=self.refs.mped_university.value
    	qualification['mped_yop']=self.refs.mped_yop.value
    	qualification['mped_marks']=self.refs.mped_marks.value
    	qualification['mped_div']=self.refs.mped_div.value

    	qualification['med_stream']=self.refs.med_stream.value
    	qualification['med_institution']=self.refs.med_institution.value
    	qualification['med_university']=self.refs.med_university.value
    	qualification['med_yop']=self.refs.med_yop.value
    	qualification['med_marks']=self.refs.med_marks.value
    	qualification['med_div']=self.refs.med_div.value

    	qualification['mphil_stream']=self.refs.mphil_stream.value
    	qualification['mphil_institution']=self.refs.mphil_institution.value
    	qualification['mphil_university']=self.refs.mphil_university.value
    	qualification['mphil_yop']=self.refs.mphil_yop.value
    	qualification['mphil_marks']=self.refs.mphil_marks.value
    	qualification['mphil_div']=self.refs.mphil_div.value

    	qualification['phd_stream']=self.refs.phd_stream.value
    	qualification['phd_institution']=self.refs.phd_institution.value
    	qualification['phd_university']=self.refs.phd_university.value
    	qualification['phd_yop']=self.refs.phd_yop.value
    	qualification['phd_marks']=self.refs.phd_marks.value
    	qualification['phd_div']=self.refs.phd_div.value

    	qualification['other_stream']=self.refs.other_stream.value
    	qualification['other_institution']=self.refs.other_institution.value
    	qualification['other_university']=self.refs.other_university.value
    	qualification['other_yop']=self.refs.other_yop.value
    	qualification['other_marks']=self.refs.other_marks.value
    	qualification['other_div']=self.refs.other_div.value

    	qualification['details_scholarship']=self.refs.details_scholarship.value
    	//qualification['details_awards']=self.refs.details_awards.value
    	qualification['details_honours']=self.refs.details_honours.value
    	qualification['details_publication']=self.refs.details_publication.value
    	qualification['details_curricular_activities']=self.refs.details_curricular_activities.value
    	qualification['details_sport']=self.refs.details_sport.value
    	
    	obj['qualification']=qualification
    	var previous_job={}

    	previous_job['organization_of_previous_job']=self.refs.organization_of_previous_job.value
    	previous_job['add_l1_of_previous_job']=self.refs.add_l1_of_previous_job.value
    	previous_job['add_l2_of_previous_job']=self.refs.add_l2_of_previous_job.value
    	previous_job['city_of_previous_job']=self.refs.city_of_previous_job.value
    	previous_job['zip_of_previous_job']=self.refs.zip_of_previous_job.value
    	previous_job['state_of_previous_job']=self.refs.state_of_previous_job.value
    	previous_job['country_of_previous_job']=self.refs.country_of_previous_job.value
    	previous_job['designation_of_previous_job']=self.refs.designation_of_previous_job.value
    	previous_job['doj_of_previous_job']=convertDate(self.refs.doj_of_previous_job.value)
    	previous_job['salary_of_previous_job']=self.refs.salary_of_previous_job.value
    	previous_job['basic_of_previous_job']=self.refs.basic_of_previous_job.value
    	previous_job['allowances_of_previous_job']=self.refs.allowances_of_previous_job.value
    	previous_job['other_benefits_of_previous_job']=self.refs.other_benefits_of_previous_job.value
    	previous_job['bond_details_of_previous_job']=self.refs.bond_details_of_previous_job.value
		obj['previous_job']=previous_job
		

		var work_experience={}
    	
    	//obj['parent']=parent

    	if(self.title=='Add'){
          staffStore.trigger('add_staff', obj)
        }else if(self.title=='Update'){
        	self.editType='normalEdit'
          staffStore.trigger('edit_temp_staff', obj,self.emp_id)
        }
    }

    self.edit = (c,st) => {
      console.log(c)
      self.emp_id = c
      flatpickr(".date", {
	    allowInput: true,
        dateFormat: "d/m/Y",
  		})
      staffStore.trigger('read_for_edit_temp_staff',self.emp_id)
      document.getElementById('pp_box').style.backgroundImage = 'url(/images/empImages/'+c+'.jpg)';
      self.title='Update'
      self.add_new_staff()
      
    }
    self.printProfile = (c,st) => {
      console.log(c)
      self.emp_id = c
      staffStore.trigger('read_for_edit_staff',self.emp_id)
      document.getElementById('pp_box1').src= '/images/empImages/'+c+'.jpg';
      self.title='printProfile' 
      self.add_new_staff()
    }

    self.clearForm = () => {
    	self.refs.title.value=''
    	self.refs.first_name.value=''
    	self.refs.middle_name.value=''
    	self.refs.last_name.value=''
    	//self.refs.employee_id.value=''
    	self.refs.short_name.value=''
    	self.refs.marital_status.value=''
    	self.refs.father_name.value=''
    	self.refs.father_occupation.value=''
    	self.refs.spouse.value=''
    	self.refs.spouse_occupation.value=''
    	self.refs.anniversary.value=''
    	self.refs.id_mark.value=''
    	self.refs.blood_group.value=''
    	self.refs.religion_id.value=''
    	self.refs.language.value=''
    	self.refs.emp_type_id.value=''
    	self.refs.department_id.value=''
    	//self.refs.level_id.value=''
    	//self.refs.employment_status_id.value=''
    	self.refs.subject_id.value=''
    	self.refs.designation_id.value=''
    	self.refs.qualification.value=''
    	self.refs.qualification.value=''
    	self.refs.doj.value=''
    	self.refs.place_of_birth.value=''
    	self.refs.category_id.value=''
    	self.refs.dob.value=''
    	self.refs.blood_group.value=''
    	self.refs.add_l1.value=''
    	self.refs.add_l2.value=''
    	self.refs.city.value=''
    	self.refs.zip.value=''
    	self.refs.state.value=''
    	self.refs.country.value=''
    	
    	self.refs.c_add_l1.value=''
    	self.refs.c_add_l2.value=''
    	self.refs.c_city.value=''
    	self.refs.c_zip.value=''
    	self.refs.c_state.value=''
    	self.refs.c_country.value=''
    	self.refs.residence_phone.value=''
    	self.refs.office_phone.value=''
    	self.refs.mobile.value=''
    	self.refs.email.value=''
    //	self.refs.photo.value=''
       

    	self.refs.child1_first_name.value=''
    	self.refs.child1_last_name.value=''
    	self.refs.child1_sex.value=''
    	self.refs.child1_dob.value=''
    	self.refs.child1_school.value=''
    	self.refs.child2_first_name.value=''
    	self.refs.child2_last_name.value=''
    	self.refs.child2_sex.value=''
    	self.refs.child2_dob.value=''
    	self.refs.child2_school.value=''
    	self.refs.child3_first_name.value=''
    	self.refs.child3_last_name.value=''
    	self.refs.child3_sex.value=''
    	self.refs.child3_dob.value=''
    	self.refs.child3_school.value=''
        
    	self.refs.x_subject.value=''
    	self.refs.x_institution.value=''
    	self.refs.x_board.value=''
    	self.refs.x_yop.value=''
    	self.refs.x_marks.value=''
    	self.refs.x_div.value=''
    	self.refs.xii_subject.value=''
    	self.refs.xii_institution.value=''
    	self.refs.xii_board.value=''
    	self.refs.xii_yop.value=''
    	self.refs.xii_marks.value=''
    	self.refs.xii_div.value=''
    	self.refs.ug_course.value=''
    	self.refs.ug_institution.value=''
    	self.refs.ug_university.value=''
    	self.refs.ug_yop.value=''
    	self.refs.ug_marks.value=''
    	self.refs.ug_div.value=''
    	self.refs.pg_course.value=''
    	self.refs.pg_institution.value=''
    	self.refs.pg_university.value=''
    	self.refs.pg_yop.value=''
    	self.refs.pg_marks.value=''
    	self.refs.pg_div.value=''
    	self.refs.bed_stream.value=''
    	self.refs.bed_institution.value=''
    	self.refs.bed_university.value=''
    	self.refs.bed_yop.value=''
    	self.refs.bed_marks.value=''
    	self.refs.bed_div.value=''

    	self.refs.bt_stream.value=''
    	self.refs.bt_institution.value=''
    	self.refs.bt_university.value=''
    	self.refs.bt_yop.value=''
    	self.refs.bt_marks.value=''
    	self.refs.bt_div.value=''

    	self.refs.bped_stream.value=''
    	self.refs.bped_institution.value=''
    	self.refs.bped_university.value=''
    	self.refs.bped_yop.value=''
    	self.refs.bped_marks.value=''
    	self.refs.bped_div.value=''

    	self.refs.dped_stream.value=''
    	self.refs.dped_institution.value=''
    	self.refs.dped_university.value=''
    	self.refs.dped_yop.value=''
    	self.refs.dped_marks.value=''
    	self.refs.dped_div.value=''

    	self.refs.mped_stream.value=''
    	self.refs.mped_institution.value=''
    	self.refs.mped_university.value=''
    	self.refs.mped_yop.value=''
    	self.refs.mped_marks.value=''
    	self.refs.mped_div.value=''

    	self.refs.med_stream.value=''
    	self.refs.med_institution.value=''
    	self.refs.med_university.value=''
    	self.refs.med_yop.value=''
    	self.refs.med_marks.value=''
    	self.refs.med_div.value=''

    	self.refs.mphil_stream.value=''
    	self.refs.mphil_institution.value=''
    	self.refs.mphil_university.value=''
    	self.refs.mphil_yop.value=''
    	self.refs.mphil_marks.value=''
    	self.refs.mphil_div.value=''

    	self.refs.phd_stream.value=''
    	self.refs.phd_institution.value=''
    	self.refs.phd_university.value=''
    	self.refs.phd_yop.value=''
    	self.refs.phd_marks.value=''
    	self.refs.phd_div.value=''

    	self.refs.other_stream.value=''
    	self.refs.other_institution.value=''
    	self.refs.other_university.value=''
    	self.refs.other_yop.value=''
    	self.refs.other_marks.value=''
    	self.refs.other_div.value=''

    	self.refs.details_scholarship.value=''
    	//self.refs.details_awards.value=''
    	self.refs.details_honours.value=''
    	self.refs.details_publication.value=''
    	self.refs.details_curricular_activities.value=''
    	self.refs.details_sport.value=''
    }


    studentStore.on('read_cast_changed',CastChanged)
    function CastChanged(cast){
      console.log(cast) 
      self.cast = cast
      self.update()
    }

    studentStore.on('read_religion_changed',ReligionChanged)
    function ReligionChanged(religion){
      console.log(religion) 
      self.religion = religion
      self.update()
    }

    staffStore.on('read_staff_changed',StaffChanged)
    function StaffChanged(staffs){
      console.log(staffs) 
      self.staffs = staffs
      self.loading=false
        self.staffs.map(i=>{
         if(i.emp_id==null){
              i.done = false; //RoleId1
               self.emp_id=i.emp_id
         }else{
          i.done = false;
          $('EmpId'+i.emp_id).prop('checked', false);
         }  
       })
      self.update()
    }

    staffStore.on('add_staff_changed',AddStaffChanged)
    function AddStaffChanged(staffs,staff_id){
      console.log(staffs) 
      self.staffs = staffs
      self.uploadStaffImage(staff_id)
      self.update()
    }

  staffStore.on('edit_staff_changed',EditStaffChanged)
    function EditStaffChanged(staffs){
      console.log(staffs) 
      self.staffs = staffs
      console.log(self.emp_id)
      self.uploadStaffImage(self.emp_id)
      self.clearForm()
      self.update()
    }
    staffStore.on('update_staff_status_changed',UpdateStaffStatusChanged)
    function UpdateStaffStatusChanged(){
      self.refs.leaving_date.value=''
      self.refs.remark.value='';	
      self.closeStatusUpdateModal()
      self.getStaffData();
      self.update()
    }

    staffStore.on('allow_block_staff_changed',AllowBlockStaffChanged)
    function AllowBlockStaffChanged(){
      self.closeStatusUpdateModal()
      self.getStaffData();
      self.update()
    }
    staffStore.on('delete_staff_changed',DeleteStaffChanged)
    function DeleteStaffChanged(){
      self.getStaffData();
      self.update()
    }
    staffStore.on('reset_staff_password_changed',ResetStaffPasswordChanged)
    function ResetStaffPasswordChanged(){
      //self.getStaffData();
      self.update()
    }

    staffStore.on('update_staff_fast_edit_changed',readStaffFastEditChanged)
    function readStaffFastEditChanged(){
      //self.getStaffData();
      self.update()
    }

    staffStore.on('read_for_edit_staff_changed',ReadForEditStaffChanged)
    function ReadForEditStaffChanged(staff_details){
     	self.staff_details=staff_details
     	if(self.title=='Update'){
         self.refs.title.value=staff_details[0].title
    	self.refs.first_name.value=staff_details[0].first_name
    	self.refs.middle_name.value=staff_details[0].middle_name
    	self.refs.last_name.value=staff_details[0].last_name
    	self.refs.gender.value=staff_details[0].gender
    	self.refs.employee_id.value=staff_details[0].employee_id
    	self.refs.short_name.value=staff_details[0].short_name
    	self.refs.marital_status.value=staff_details[0].marital_status
    	self.refs.father_name.value=staff_details[0].father_name
    	self.refs.father_occupation.value=staff_details[0].father_occupation
    	self.refs.spouse.value=staff_details[0].spouse
    	self.refs.spouse_occupation.value=staff_details[0].spouse_occupation
    	self.refs.anniversary.value=staff_details[0].anniversary
    	self.refs.id_mark.value=staff_details[0].id_mark
    	self.refs.blood_group.value=staff_details[0].blood_group
    	self.refs.religion_id.value=staff_details[0].religion_id
    	self.refs.language.value=staff_details[0].language
    	self.refs.emp_type_id.value=staff_details[0].emp_type_id
    	self.refs.department_id.value=staff_details[0].department_id
    	self.refs.level_id.value=staff_details[0].level_id
    	self.refs.employment_status_id.value=staff_details[0].employment_status_id
    	self.refs.subject_id.value=staff_details[0].subject_id
    	self.refs.designation_id.value=staff_details[0].designation_id
    	self.refs.qualification.value=staff_details[0].qualification
    	self.refs.doj.value=staff_details[0].doj
    	self.refs.category_id.value=staff_details[0].category_id

    	console.log(self.refs.category_id.value)
    	self.refs.place_of_birth.value=staff_details[0].place_of_birth
    	self.refs.dob.value=staff_details[0].dob
    	self.refs.blood_group.value=staff_details[0].blood_group
    	self.refs.add_l1.value=staff_details[0].add_l1
    	self.refs.add_l2.value=staff_details[0].add_l2
    	self.refs.city.value=staff_details[0].city
    	self.refs.zip.value=staff_details[0].zip
    	self.refs.state.value=staff_details[0].state
    	self.refs.country.value=staff_details[0].country
    	if(staff_details[0].same_as_p_add == 1){
			$('#correspondenceCheckbox').prop('checked', true)
		}else{
			$('#correspondenceCheckbox').prop('checked', false)
		}
    	self.refs.c_add_l1.value=staff_details[0].c_add_l1
    	self.refs.c_add_l2.value=staff_details[0].c_add_l2
    	self.refs.c_city.value=staff_details[0].c_city
    	self.refs.c_zip.value=staff_details[0].c_zip
    	self.refs.c_state.value=staff_details[0].c_state
    	self.refs.c_country.value=staff_details[0].c_country
    	self.refs.residence_phone.value=staff_details[0].residence_phone
    	self.refs.office_phone.value=staff_details[0].office_phone
    	self.refs.mobile.value=staff_details[0].mobile
    	self.refs.email.value=staff_details[0].email
    //	self.refs.photo.value=staff_details[0].photo
       

    	self.refs.child1_first_name.value=staff_details[0].child1_first_name
    	self.refs.child1_last_name.value=staff_details[0].child1_last_name
    	self.refs.child1_sex.value=staff_details[0].child1_sex
    	self.refs.child1_dob.value=staff_details[0].child1_dob
    	self.refs.child1_school.value=staff_details[0].child1_school
    	self.refs.child2_first_name.value=staff_details[0].child2_first_name
    	self.refs.child2_last_name.value=staff_details[0].child2_last_name
    	self.refs.child2_sex.value=staff_details[0].child2_sex
    	self.refs.child2_dob.value=staff_details[0].child2_dob
    	self.refs.child2_school.value=staff_details[0].child2_school
    	self.refs.child3_first_name.value=staff_details[0].child3_first_name
    	self.refs.child3_last_name.value=staff_details[0].child3_last_name
    	self.refs.child3_sex.value=staff_details[0].child3_sex
    	self.refs.child3_dob.value=staff_details[0].child3_dob
    	self.refs.child3_school.value=staff_details[0].child3_school
        
    	self.refs.x_subject.value=staff_details[0].x_subject
    	self.refs.x_institution.value=staff_details[0].x_institution
    	self.refs.x_board.value=staff_details[0].x_board
    	self.refs.x_yop.value=staff_details[0].x_yop
    	self.refs.x_marks.value=staff_details[0].x_marks
    	self.refs.x_div.value=staff_details[0].x_div
    	self.refs.xii_subject.value=staff_details[0].xii_subject
    	self.refs.xii_institution.value=staff_details[0].xii_institution
    	self.refs.xii_board.value=staff_details[0].xii_board
    	self.refs.xii_yop.value=staff_details[0].xii_yop
    	self.refs.xii_marks.value=staff_details[0].xii_marks
    	self.refs.xii_div.value=staff_details[0].xii_div
    	self.refs.ug_course.value=staff_details[0].ug_course
    	self.refs.ug_institution.value=staff_details[0].ug_institution
    	self.refs.ug_university.value=staff_details[0].ug_university
    	self.refs.ug_yop.value=staff_details[0].ug_yop
    	self.refs.ug_marks.value=staff_details[0].ug_marks
    	self.refs.ug_div.value=staff_details[0].ug_div
    	self.refs.pg_course.value=staff_details[0].pg_course
    	self.refs.pg_institution.value=staff_details[0].pg_institution
    	self.refs.pg_university.value=staff_details[0].pg_university
    	self.refs.pg_yop.value=staff_details[0].pg_yop
    	self.refs.pg_marks.value=staff_details[0].pg_marks
    	self.refs.pg_div.value=staff_details[0].pg_div
    	self.refs.bed_stream.value=staff_details[0].bed_stream
    	self.refs.bed_institution.value=staff_details[0].bed_institution
    	self.refs.bed_university.value=staff_details[0].bed_university
    	self.refs.bed_yop.value=staff_details[0].bed_yop
    	self.refs.bed_marks.value=staff_details[0].bed_marks
    	self.refs.bed_div.value=staff_details[0].bed_div

    	self.refs.bt_stream.value=staff_details[0].bt_stream
    	self.refs.bt_institution.value=staff_details[0].bt_institution
    	self.refs.bt_university.value=staff_details[0].bt_university
    	self.refs.bt_yop.value=staff_details[0].bt_yop
    	self.refs.bt_marks.value=staff_details[0].bt_marks
    	self.refs.bt_div.value=staff_details[0].bt_div

    	self.refs.bped_stream.value=staff_details[0].bped_stream
    	self.refs.bped_institution.value=staff_details[0].bped_institution
    	self.refs.bped_university.value=staff_details[0].bped_university
    	self.refs.bped_yop.value=staff_details[0].bped_yop
    	self.refs.bped_marks.value=staff_details[0].bped_marks
    	self.refs.bped_div.value=staff_details[0].bped_div

    	self.refs.dped_stream.value=staff_details[0].dped_stream
    	self.refs.dped_institution.value=staff_details[0].dped_institution
    	self.refs.dped_university.value=staff_details[0].dped_university
    	self.refs.dped_yop.value=staff_details[0].dped_yop
    	self.refs.dped_marks.value=staff_details[0].dped_marks
    	self.refs.dped_div.value=staff_details[0].dped_div

    	self.refs.mped_stream.value=staff_details[0].mped_stream
    	self.refs.mped_institution.value=staff_details[0].mped_institution
    	self.refs.mped_university.value=staff_details[0].mped_university
    	self.refs.mped_yop.value=staff_details[0].mped_yop
    	self.refs.mped_marks.value=staff_details[0].mped_marks
    	self.refs.mped_div.value=staff_details[0].mped_div

    	self.refs.med_stream.value=staff_details[0].med_stream
    	self.refs.med_institution.value=staff_details[0].med_institution
    	self.refs.med_university.value=staff_details[0].med_university
    	self.refs.med_yop.value=staff_details[0].med_yop
    	self.refs.med_marks.value=staff_details[0].med_marks
    	self.refs.med_div.value=staff_details[0].med_div

    	self.refs.mphil_stream.value=staff_details[0].mphil_stream
    	self.refs.mphil_institution.value=staff_details[0].mphil_institution
    	self.refs.mphil_university.value=staff_details[0].mphil_university
    	self.refs.mphil_yop.value=staff_details[0].mphil_yop
    	self.refs.mphil_marks.value=staff_details[0].mphil_marks
    	self.refs.mphil_div.value=staff_details[0].mphil_div

    	self.refs.phd_stream.value=staff_details[0].phd_stream
    	self.refs.phd_institution.value=staff_details[0].phd_institution
    	self.refs.phd_university.value=staff_details[0].phd_university
    	self.refs.phd_yop.value=staff_details[0].phd_yop
    	self.refs.phd_marks.value=staff_details[0].phd_marks
    	self.refs.phd_div.value=staff_details[0].phd_div

    	self.refs.other_stream.value=staff_details[0].other_stream
    	self.refs.other_institution.value=staff_details[0].other_institution
    	self.refs.other_university.value=staff_details[0].other_university
    	self.refs.other_yop.value=staff_details[0].other_yop
    	self.refs.other_marks.value=staff_details[0].other_marks
    	self.refs.other_div.value=staff_details[0].other_div

    	self.refs.details_scholarship.value=staff_details[0].details_scholarship
    	//self.refs.details_awards.value=staff_details[0].details_awards
    	self.refs.details_honours.value=staff_details[0].details_honours
    	self.refs.details_publication.value=staff_details[0].details_publication
    	self.refs.details_curricular_activities.value=staff_details[0].details_curricular_activities
    	self.refs.details_sport.value=staff_details[0].details_sport
     }else{
     	console.log("inside else")
     	console.log(staff_details[0].first_name)
     	//print profile
     	self.gender=staff_details[0].gender
     	self.title=staff_details[0].title
    	self.first_name=staff_details[0].first_name
    	self.middle_name=staff_details[0].middle_name
    	self.last_name=staff_details[0].last_name
    	self.employee_id=staff_details[0].employee_id
    	self.short_name=staff_details[0].short_name
    	self.marital_status=staff_details[0].marital_status
    	self.father_name=staff_details[0].father_name
    	self.father_occupation=staff_details[0].father_occupation
    	self.spouse=staff_details[0].spouse
    	self.spouse_occupation=staff_details[0].spouse_occupation
    	self.anniversary=staff_details[0].anniversary
    	self.id_mark=staff_details[0].id_mark
    	self.blood_group=staff_details[0].blood_group
    	self.religion_id=staff_details[0].religion_id
    	self.language=staff_details[0].language
    	self.emp_type_id=staff_details[0].emp_type_id
    	self.department_id=staff_details[0].department_id
        self.level_id=staff_details[0].level_id
    	//console.log(staff_details[0].employment_status_id);
    	self.employment_status_id=staff_details[0].employment_status_id
    	self.subject_id=staff_details[0].subject_id
    	self.designation_id=staff_details[0].designation_id
    	self.qualification=staff_details[0].qualification
    	self.category_id=staff_details[0].category_id

    	self.place_of_birth=staff_details[0].place_of_birth
    	self.dob=staff_details[0].dob
    	self.blood_group=staff_details[0].blood_group
    	self.add_l1=staff_details[0].add_l1
    	self.add_l2=staff_details[0].add_l2
    	self.city=staff_details[0].city
    	self.zip=staff_details[0].zip
    	self.state=staff_details[0].state
    	self.country=staff_details[0].country
    	if(staff_details[0].same_as_p_add == 1){
			$('#correspondenceCheckbox').prop('checked', true)
		}else{
			$('#correspondenceCheckbox').prop('checked', false)
		}
    	self.c_add_l1=staff_details[0].c_add_l1
    	self.c_add_l2=staff_details[0].c_add_l2
    	self.c_city=staff_details[0].c_city
    	self.c_zip=staff_details[0].c_zip
    	self.c_state=staff_details[0].c_state
    	self.c_country=staff_details[0].c_country
    	self.residence_phone=staff_details[0].residence_phone
    	self.office_phone=staff_details[0].office_phone
    	self.mobile=staff_details[0].mobile
    	self.email=staff_details[0].email
    //	self.photo=staff_details[0].photo
       

    	self.child1_first_name=staff_details[0].child1_first_name
    	self.child1_last_name=staff_details[0].child1_last_name
    	self.child1_sex=staff_details[0].child1_sex
    	self.child1_dob=staff_details[0].child1_dob
    	self.child1_school=staff_details[0].child1_school
    	self.child2_first_name=staff_details[0].child2_first_name
    	self.child2_last_name=staff_details[0].child2_last_name
    	self.child2_sex=staff_details[0].child2_sex
    	self.child2_dob=staff_details[0].child2_dob
    	self.child2_school=staff_details[0].child2_school
    	self.child3_first_name=staff_details[0].child3_first_name
    	self.child3_last_name=staff_details[0].child3_last_name
    	self.child3_sex=staff_details[0].child3_sex
    	self.child3_dob=staff_details[0].child3_dob
    	self.child3_school=staff_details[0].child3_school
        
    	self.x_subject=staff_details[0].x_subject
    	self.x_institution=staff_details[0].x_institution
    	self.x_board=staff_details[0].x_board
    	self.x_yop=staff_details[0].x_yop
    	self.x_marks=staff_details[0].x_marks
    	self.x_div=staff_details[0].x_div
    	self.xii_subject=staff_details[0].xii_subject
    	self.xii_institution=staff_details[0].xii_institution
    	self.xii_board=staff_details[0].xii_board
    	self.xii_yop=staff_details[0].xii_yop
    	self.xii_marks=staff_details[0].xii_marks
    	self.xii_div=staff_details[0].xii_div
    	self.ug_course=staff_details[0].ug_course
    	self.ug_institution=staff_details[0].ug_institution
    	self.ug_university=staff_details[0].ug_university
    	self.ug_yop=staff_details[0].ug_yop
    	self.ug_marks=staff_details[0].ug_marks
    	self.ug_div=staff_details[0].ug_div
    	self.pg_course=staff_details[0].pg_course
    	self.pg_institution=staff_details[0].pg_institution
    	self.pg_university=staff_details[0].pg_university
    	self.pg_yop=staff_details[0].pg_yop
    	self.pg_marks=staff_details[0].pg_marks
    	self.pg_div=staff_details[0].pg_div
    	self.bed_stream=staff_details[0].bed_stream
    	self.bed_institution=staff_details[0].bed_institution
    	self.bed_university=staff_details[0].bed_university
    	self.bed_yop=staff_details[0].bed_yop
    	self.bed_marks=staff_details[0].bed_marks
    	self.bed_div=staff_details[0].bed_div

    	self.bt_stream=staff_details[0].bt_stream
    	self.bt_institution=staff_details[0].bt_institution
    	self.bt_university=staff_details[0].bt_university
    	self.bt_yop=staff_details[0].bt_yop
    	self.bt_marks=staff_details[0].bt_marks
    	self.bt_div=staff_details[0].bt_div

    	self.bped_stream=staff_details[0].bped_stream
    	self.bped_institution=staff_details[0].bped_institution
    	self.bped_university=staff_details[0].bped_university
    	self.bped_yop=staff_details[0].bped_yop
    	self.bped_marks=staff_details[0].bped_marks
    	self.bped_div=staff_details[0].bped_div

    	self.dped_stream=staff_details[0].dped_stream
    	self.dped_institution=staff_details[0].dped_institution
    	self.dped_university=staff_details[0].dped_university
    	self.dped_yop=staff_details[0].dped_yop
    	self.dped_marks=staff_details[0].dped_marks
    	self.dped_div=staff_details[0].dped_div

    	self.mped_stream=staff_details[0].mped_stream
    	self.mped_institution=staff_details[0].mped_institution
    	self.mped_university=staff_details[0].mped_university
    	self.mped_yop=staff_details[0].mped_yop
    	self.mped_marks=staff_details[0].mped_marks
    	self.mped_div=staff_details[0].mped_div

    	self.med_stream=staff_details[0].med_stream
    	self.med_institution=staff_details[0].med_institution
    	self.med_university=staff_details[0].med_university
    	self.med_yop=staff_details[0].med_yop
    	self.med_marks=staff_details[0].med_marks
    	self.med_div=staff_details[0].med_div

    	self.mphil_stream=staff_details[0].mphil_stream
    	self.mphil_institution=staff_details[0].mphil_institution
    	self.mphil_university=staff_details[0].mphil_university
    	self.mphil_yop=staff_details[0].mphil_yop
    	self.mphil_marks=staff_details[0].mphil_marks
    	self.mphil_div=staff_details[0].mphil_div

    	self.phd_stream=staff_details[0].phd_stream
    	self.phd_institution=staff_details[0].phd_institution
    	self.phd_university=staff_details[0].phd_university
    	self.phd_yop=staff_details[0].phd_yop
    	self.phd_marks=staff_details[0].phd_marks
    	self.phd_div=staff_details[0].phd_div

    	self.other_stream=staff_details[0].other_stream
    	self.other_institution=staff_details[0].other_institution
    	self.other_university=staff_details[0].other_university
    	self.other_yop=staff_details[0].other_yop
    	self.other_marks=staff_details[0].other_marks
    	self.other_div=staff_details[0].other_div

    	self.details_scholarship=staff_details[0].details_scholarship
    	//self.details_awards=staff_details[0].details_awards
    	self.details_honours=staff_details[0].details_honours
    	self.details_publication=staff_details[0].details_publication
    	self.details_curricular_activities=staff_details[0].details_curricular_activities
    	self.details_sport=staff_details[0].details_sport
    	self.update()
     }

    }

    staffStore.on('upload_staff_image_changed',UploadStaffImage)
    function UploadStaffImage(image_name){
      console.log(image_name) 
      self.staff_profile_picture = image_name
    }

    levelStore.on('level_changed',LevelChanged)
    function LevelChanged(levels){
     // console.log('level_changed1') 
     // console.log(levels) 
      self.title='Add'
      self.loading = false
      self.levels = levels
      self.update()
    }
    designationStore.on('designations_changed',DesignationsChanged)
    function DesignationsChanged(designations){
     // console.log('designations_changed1') 
      //console.log(designations) 
      self.title='Add'
      self.loading = false
      self.designations = designations
      self.update()
     // console.log(self.designations)
    }
    employeeTypeStore.on('employeeTypes_changed',EmployeeTypesChanged)
    function EmployeeTypesChanged(employeeTypes){
      //console.log(employeeTypes) 
      self.title='Add'
      self.loading = false
      self.employeeTypes = employeeTypes
      self.update()
      //console.log(self.employeeTypes)
    }
    staffStore.on('department_changed',DepartmentChanged)
    function DepartmentChanged(departments){
      //console.log(departments) 
      self.title='Add'
      self.loading = false
      self.departments = departments
      self.update()
      //console.log(self.employeeTypes)
    }
    

    
</script>
</approve-staff-profile>