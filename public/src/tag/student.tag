<student>
	<section class=" is-fluid" show={student_view =='show_student'}>
		<div class="level">
			<div class="level-left">
				<h2 class="title" style="color: #ff3860;">Students</h2>
			</div>
			<div class="level-right">
				<button class="button is-warning is-rounded" onclick={add_new_student}>
				<span class="icon">
					<span class="fas fa-plus"></span>
				</span>
				<span>New Student</span>
				</button>
			</div>
		</div>
		<div class="box">
			<div class="columns">
				<div class="column is-narrow">
					<div class="control">
						<div class="select">
							<select ref="read_standard_id" onchange={getReadSection}>
								<option>Choose Section</option>
								<option each={standards} value={standard_id}>{standard}
	                            </option>
							</select>
						</div>
					</div>
				</div>
				<div class="column is-narrow">
					<div class="control">
			        	<div class="select is-fullwidth">
							<select ref="read_section_id">
								<option>Choose Class</option>
								<option each={readfilteredSections} value={section_id}>{section}
	                            </option>
							</select>
						</div>
			      	</div>
			    </div>
	        	<div class="column is-one-third">
					<input class="input" ref="read_enroll_number" type="text" placeholder="Enter Enroll No">
    			</div>
				<div class="column">
					<button class="button is-danger has-text-weight-bold"
					onclick={getStudentData} >GO
					</button>
				</div>
			</div>
		</div>
		<table class="table is-fullwidth is-striped is-hoverable is-narrow">
			<thead>
				<tr>
					<th>Roll no</th>
					<th>Student Name</th>
					<th>Enroll No</th>
					<th>Registration No</th>
					<th>SMS</th>
					<th>Father's Name</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr each={st, i in students}>
					<td>{st.roll_number}</td>
					<td>{st.name}</td>
					<td>{st.enroll_number}</td>
					<td>{st.reg_number}</td>
					<td>{st.mobile}</td>
					<td>{st.f_name}</td>
					<td class="has-text-right">
		            <div class="inline-flex rounded border border-grey overflow-hidden" hide={st.confirmDelete}>
		              <span><a class="button is-small is-rounded has-text-success" onclick={edit.bind(this, st.student_id)}>Edit</a></span>
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

	<section class=" is-fluid" show={student_view =='add_student'}>
	<div class="label">
		<div class="level-left">
			<h2 class="title" style="color: #ff3860;">{title} Student</h2>
		</div>
		<div class="level-right"></div>
	</div>
	<div class="box">
		<div class="columns is-variable is-1 is-multiline">
		    <div class="column is-half">
			      <div id="pp_box" class="pp-box"
			      onclick={trigger_file_input.bind(this,'student_picture')}>
			        <div class="icon has-text-danger" onclick=
			        {remove_picture.bind(this, 'pp_box','student_picture')}><i class="fas fa-trash"></i></div>
			      </div>
			      <input accept="image/*" class="is-hidden" id="student_picture" name="student_picture" onchange={loadFile.bind(this, 'pp_box')} type="file">
		    </div>
		    <div class="column is-half">
		      	<div class="column is-narrow">
				<label class="label" for="first_name">First Name</label>
					<input class="input" id="first_name" ref="first_name" type="text">
		      	</div>
		      	<div class="column is-narrow">
		      		<label class="label" for="middle_name">Middle Name</label>
		      		<input class="input" ref="middle_name" type="text">
		      	</div>
		       <div class="column is-narrow">
				<label class="label" for="last_name">Last Name</label>
					<input class="input" ref="last_name" type="text">
		      	</div>
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="standard_id">Class</label>
				<div class="control">
		        	<div class="select is-fullwidth">
						<select ref="standard_id" onchange={getSection}>
							<option each={standards} value={standard_id}>{standard}
                            </option>
						</select>
					</div>
		      	</div>
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="section_id">Section</label>
				<div class="control">
		        	<div class="select is-fullwidth">
						<select ref="section_id">
							<option each={filteredSections} value={section_id}>{section}
                            </option>
						</select>
					</div>
		      	</div>
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="house_id">House</label>
				<div class="control">
		        	<div class="select is-fullwidth">
						<select ref="house_id">
							<option each={houses} value={house_id}>{house_name}
                            </option>
						</select>
					</div>
		      	</div>
		    </div>
		    <div class="column is-full">
		    	<h3 class="has-text-weight-bold is-size-4 has-text-link">Given Concession</h3>
		      	<hr style="margin-top: 0.5em; margin-bottom: 0.5em;">
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="enroll_number">Enroll No</label>
				<input class="input" ref="enroll_number" type="number">
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="roll_number">Roll No</label>
				<input class="input" ref="roll_number" type="number">
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="reg_number">Reg. No</label>
				<input class="input" ref="reg_number" type="text">
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="gender">Gender</label>
				<div class="control">
	        		<div class="select is-fullwidth">
						<select id="gender" ref="gender">
							<option value="M">Male</option>
						</select>
					</div>
	      		</div>
			</div>
			<div class="column is-one-third">
				<label class="label" for="category_id">Cast Category</label>
				<div class="control">
	        		<div class="select is-fullwidth">
						<select ref="category_id">
							<option each={cast} value={category_id}>{category_name}
                            </option>
						</select>
					</div>
	      		</div>
			</div>
			<div class="column is-one-third">
				<label class="label" for="dob">DOB</label>
				<input class="date input flatpickr-input form-control input" 
				ref="dob" placeholder="" tabindex="0" type="text" readonly="readonly">
			</div>
    		<div class="column is-one-third">
				<label class="label" for="blood_group">Blood Group</label>
				<div class="control">
	        		<div class="select is-fullwidth">
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
			</div>
			<div class="column is-full">
          		<h3 class="has-text-weight-bold is-size-4 has-text-link">Contact Information(Permanent Address)</h3>
          		<hr style="margin-top: 0.5em; margin-bottom: 0.5em;">
        	</div>
			<div class="column is-one-third">
				<label class="label" for="p_add_l1">Address Line 1</label>
				<input class="input" ref="p_add_l1" type="text">
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="p_add_l2">Address Line 2</label>
				<input class="input" ref="p_add_l2" type="text">
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="p_city">City</label>
				<input class="input" ref="p_city" type="text">
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="p_zip">Zip</label>
				<input class="input" ref="p_zip" type="number">
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="p_state">State</label>
				<input class="input" ref="p_state" type="text">
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="p_country">Country</label>
				<input class="input" ref="p_country" type="text">
		    </div>
		    <div class="column is-full">
		    	<h3 class="has-text-weight-bold is-size-4 has-text-link"> Check if Correspondence Address is same as Permanent Address
		    		<input type="checkbox" id="correspondenceCheckbox" name="correspondenceCheckbox" onclick={copyAddress.bind(this)}>
		      	</h3>
		      	<hr style="margin-top: 0.5em; margin-bottom: 0.5em;">
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="c_add_l1">Address Line 1</label>
				<input class="input" ref="c_add_l1" type="text">
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="c_add_l2">Address Line 2</label>
				<input class="input" ref="c_add_l2" type="text">
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="c_city">City</label>
				<input class="input" ref="c_city" type="text">
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="c_zip">Zip</label>
				<input class="input" ref="c_zip" type="number">
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="c_state">State</label>
				<input class="input" ref="c_state" type="text">
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="c_country">Country</label>
				<input class="input" ref="c_country" type="text">
		    </div>
		    <div class="column is-full">
		    	<hr style="margin-top: 0.5em; margin-bottom: 0.5em;">
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="residence_phone">Phone(R)</label>
				<input class="input" ref="residence_phone" type="number">
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="mobile">SMS No.</label>
				<input class="input" ref="mobile" type="number">
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="emergency_no">Emergency No.</label>
				<input class="input" ref="emergency_no" type="number">
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="student_type">Student Type</label>
				<div class="control">
	        		<div class="select is-fullwidth">
						<select id="student_type" ref="student_type">
							<option value="Day Scholar">Day Scholar</option>
						</select>
					</div>
	      		</div>
			</div>
			<div class="column is-full">
		    	<h3 class="has-text-weight-bold is-size-4 has-text-link">Other Information</h3>
		    	<hr style="margin-top: 0.5em; margin-bottom: 0.5em;">
		    </div>

			<div class="column is-one-third">
				<label class="label" for="aadhar_no">Aadhar No</label>
				<input class="input" ref="aadhar_no" type="text">
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="doa">Date of Admission</label>
				<input class="date input flatpickr-input form-control input" 
				ref="doa" placeholder="" tabindex="0" type="text" readonly="readonly">
			</div>
			<div class="column is-one-third">
				<label class="label" for="old_doa">Old Date of Admission</label>
				<input class="date input flatpickr-input form-control input" 
				ref="old_doa" placeholder="" tabindex="0" type="text" readonly="readonly">
			</div>
			<div class="column is-one-third">
				<label class="label" for="doj">Date of Joining</label>
				<input class="date input flatpickr-input form-control input" 
				ref="doj" placeholder="" tabindex="0" type="text" readonly="readonly">
			</div>
			<div class="column is-one-third">
				<label class="label" for="old_doj">Old Date of Joining</label>
				<input class="date input flatpickr-input form-control input" 
				ref="old_doj" placeholder="" tabindex="0" type="text" readonly="readonly">
			</div>
			<div class="column is-one-third">
				<label class="label" for="mother_tongue">Mother Tongue</label>
				<input class="input" ref="mother_tongue" type="text">
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="last_school">Last School</label>
				<input class="input" ref="last_school" type="text">
		    </div>
		    <div class="column is-one-third">
		    	<label class="label" for="last_class">Last Class</label>
				<input class="input" ref="last_class" type="text">
		    </div>
		    <div class="column is-one-third">
		    	<label class="label" for="admission_for_class">Admission For Class</label>
				<input class="input" ref="admission_for_class" type="text">
		    </div>
		    <div class="column is-one-third">
		    	<label class="label" for="hobby">Hobbies</label>
				<input class="input" ref="hobby" type="text">
		    </div>
		    <div class="column is-one-third">
		    	<label class="label" for="cast">Cast</label>
				<input class="input" ref="cast" type="text">
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="religion_id">Religion</label>
				<div class="control">
	        		<div class="select is-fullwidth">
						<select id="religion_id" ref="religion_id">
							<option each={religion} value={religion_id}>{religion}
                            </option>
						</select>
					</div>
	      		</div>
			</div>
			<div class="column is-one-third">
				<label class="label" for="staff_child">Staff Member Child</label>
				<div class="control">
	        		<div class="select is-fullwidth">
						<select id="staff_child" ref="staff_child"  onchange={GetStaffName}>
							<option value="Y">Yes</option>
							<option value="N">No</option>
						</select>
					</div>
	      		</div>
			</div>
			<div class="column is-one-third" show={staff_name}>
		    	<label class="label" for="staff_name">Staff's Name</label>
				<input class="input" ref="staff_name" type="text">
		    </div>
		    <div class="column is-full">
			    <button class="button is-info has-text-weight-bold adjusted-top" onclick={addFatherInformation}>
			    	Next >>
			    </button>
			    <button class="button is-danger has-text-weight-bold adjusted-top" onclick={close}>
			    	Cancel
			    </button>    
		    </div>
  		</div>
	</div>
</section>
<!-- Start Father Information -->
<section class=" is-fluid" show={student_view =='add_father_information'}>
	<div class="label">
		<div class="level-left">
			<h2 class="title" style="color: #ff3860;">{title} Father</h2>
		</div>
		<div class="level-right">
		</div>
	</div>
	<div class="box">
		<div class="columns is-variable is-1 is-multiline">
		    <div class="column is-half">
			      <div id="f_pp_box" class="f_pp-box"
			      onclick={trigger_father_file_input.bind(this,'father_picture')}>
			        <div class="icon has-text-danger" onclick=
			        {remove_father_picture.bind(this, 'f_pp_box','father_picture')}><i class="fas fa-trash"></i></div>
			      </div>
			      <input accept="image/*" class="is-hidden" id="father_picture" name="father_picture" onchange={loadFatherFile.bind(this, 'f_pp_box')} type="file">
		    </div>
		    <div class="column is-half">
		      	<div class="column is-narrow">
					<label class="label" for="f_title">Title</label>
					<input class="input" id="f_title" ref="f_title" type="text">
		      	</div>
		       <div class="column is-narrow">
					<label class="label" for="f_name">Father's Name</label>
					<input class="input" ref="f_name" type="text">
		      	</div>
		    </div>
		    <div class="column is-full">
		      <h3 class="has-text-weight-bold is-size-4 has-text-link">Work Information</h3>
		      <hr style="margin-top: 0.5em; margin-bottom: 0.5em;">
		    </div>
		    <div class="column is-one-third">
			<label class="label" for="f_occupation">Occupation</label>
				<input class="input" id="f_occupation" ref="f_occupation" type="text">
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="f_organisation_type">Organization Type</label>
				<div class="control">
	        		<div class="select is-fullwidth">
						<select id="f_organisation_type" ref="f_organisation_type">
							<option value="Governmnet">Governmnet</option>
							<option value="Business">Business</option>
							<option value="NGO">NGO</option>
							<option value="Professional">Professional</option>
							<option value="Other">Other</option>
						</select>
					</div>
	      		</div>
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="f_annual_income">Annual Income</label>
				<input class="input" id="f_annual_income" ref="f_annual_income" type="number">
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="f_work_profile">Work Profile</label>
				<input class="input" ref="f_work_profile" type="text">
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="f_organisation_name">Organization Name</label>
				<input class="input" ref="f_organisation_name" type="text">
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="f_designation">Designation</label>
				<input class="input" ref="f_designation" type="text">
		    </div>
		    <div class="column is-one-third">
			<label class="label" for="f_department">Department</label>
				<input class="input" ref="f_department" type="text">
		    </div>
		    
			<div class="column is-one-third">
				<label class="label" for="f_office_add_l1">Office Address Line 1</label>
				<input class="input" ref="f_office_add_l1" type="text">
			</div>
			<div class="column is-one-third">
				<label class="label" for="f_office_add_l2">Office Address Line 2</label>
				<input class="input" ref="f_office_add_l2" type="text">
			</div>
			<div class="column is-one-third">
				<label class="label" for="f_office_city">City</label>
				<input class="input" ref="f_office_city" type="text">
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="f_office_zip">Zip</label>
				<input class="input" ref="f_office_zip" type="number">
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="f_office_state">State</label>
				<input class="input" ref="f_office_state" type="text">
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="f_office_country">Country</label>
				<input class="input" ref="f_office_country" type="text">
		    </div>
		    <div class="column is-one-third">
			<label class="label" for="f_office_phone">Phone(O)</label>
				<input class="input" ref="f_office_phone" type="number">
		    </div>
		    <div class="column is-full">
		      <h3 class="has-text-weight-bold is-size-4 has-text-link">Educational Information</h3>
		      <hr style="margin-top: 0.5em; margin-bottom: 0.5em;">
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="f_qualification">Qualification</label>
				<input class="input" ref="f_qualification" type="text">
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="f_other_qualification">Other Qualification</label>
				<input class="input" ref="f_other_qualification" type="text">
		    </div>
		    <div class="column is-full">
		    	<h3 class="has-text-weight-bold is-size-4 has-text-link">Check if Candidate's Correspondence Address is same as Father's Address
		      		<input type="checkbox" id="fatherCorrespondenceCheckbox" onclick={copyFatherAddress.bind(this)}>
		      	</h3>
		      	<hr style="margin-top: 0.5em; margin-bottom: 0.5em;">
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="f_add_l1">Address Line 1</label>
				<input class="input" ref="f_add_l1" type="text">
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="f_add_l2">Address Line 2</label>
				<input class="input" ref="f_add_l2" type="text">
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="f_city">City</label>
				<input class="input" ref="f_city" type="text">
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="f_zip">Zip</label>
				<input class="input" ref="f_zip" type="number">
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="f_state">State</label>
				<input class="input" ref="f_state" type="text">
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="f_country">Country</label>
				<input class="input" ref="f_country" type="text">
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="f_mobile">Mobile</label>
				<input class="input" ref="f_mobile" type="number">
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="f_email">Email</label>
				<input class="input" ref="f_email" type="email">
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="f_nationality">Nationality</label>
				<input class="input" ref="f_nationality" type="text">
		    </div>
		    <div class="column is-full">
			    <button class="button is-primary has-text-weight-bold adjusted-top" onclick={closeFatherInformation}>
			    	Previous
			    </button>
			    <button class="button is-info has-text-weight-bold adjusted-top" onclick={addMotherInformation}>
			    	Next >>
			    </button>
			    <button class="button is-danger has-text-weight-bold adjusted-top" onclick={close}>
			    	Cancel
			    </button>    
		    </div>
  		</div>
	</div>
</section>
<!-- End Father Information -->

<!-- Start Mother Information -->
<section class=" is-fluid" show={student_view =='add_mother_information'}>
	<div class="label">
		<div class="level-left">
			<h2 class="title" style="color: #ff3860;">{title} Mother</h2>
		</div>
		<div class="level-right">
		</div>
	</div>
	<div class="box">
		<div class="columns is-variable is-1 is-multiline">
		    <div class="column is-half">
			      <div id="m_pp_box" class="m_pp-box"
			      onclick={trigger_mother_file_input.bind(this,'mother_picture')}>
			        <div class="icon has-text-danger" onclick=
			        {remove_mother_picture.bind(this, 'm_pp_box','mother_picture')}><i class="fas fa-trash"></i></div>
			      </div>
			      <input accept="image/*" class="is-hidden" id="mother_picture" name="mother_picture" onchange={loadMotherFile.bind(this, 'm_pp_box')} type="file">
		    </div>
		    <div class="column is-half">
		      	<div class="column is-narrow">
					<label class="label" for="m_title">Title</label>
					<input class="input" id="m_title" ref="m_title" type="text">
		      	</div>
		       <div class="column is-narrow">
					<label class="label" for="m_name">Mother's Name</label>
					<input class="input" ref="m_name" type="text">
		      	</div>
		    </div>
		    <div class="column is-full">
		      <h3 class="has-text-weight-bold is-size-4 has-text-link">Work Information</h3>
		      <hr style="margin-top: 0.5em; margin-bottom: 0.5em;">
		    </div>
		    <div class="column is-one-third">
			<label class="label" for="m_occupation">Occupation</label>
				<input class="input" ref="m_occupation" type="text">
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="m_organisation_type">Organization Type</label>
				<div class="control">
	        		<div class="select is-fullwidth">
						<select ref="m_organisation_type">
							<option value="Governmnet">Governmnet</option>
							<option value="Business">Business</option>
							<option value="NGO">NGO</option>
							<option value="Professional">Professional</option>
							<option value="Other">Other</option>
						</select>
					</div>
	      		</div>
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="m_annual_income">Annual Income</label>
				<input class="input" ref="m_annual_income" type="number">
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="m_work_profile">Work Profile</label>
				<input class="input" ref="m_work_profile" type="text">
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="m_organisation_name">Organization Name</label>
				<input class="input" ref="m_organisation_name" type="text">
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="m_designation">Designation</label>
				<input class="input" ref="m_designation" type="text">
		    </div>
		    <div class="column is-one-third">
			<label class="label" for="m_department">Department</label>
				<input class="input" ref="m_department" type="text">
		    </div>
		    
			<div class="column is-one-third">
				<label class="label" for="m_office_add_l1">Office Address Line 1</label>
				<input class="input" ref="m_office_add_l1" type="text">
			</div>
			<div class="column is-one-third">
				<label class="label" for="m_office_add_l2">Office Address Line 2</label>
				<input class="input" ref="m_office_add_l2" type="text">
			</div>
			<div class="column is-one-third">
				<label class="label" for="m_office_city">City</label>
				<input class="input" ref="m_office_city" type="text">
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="m_office_zip">Zip</label>
				<input class="input" ref="m_office_zip" type="number">
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="m_office_state">State</label>
				<input class="input" ref="m_office_state" type="text">
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="m_office_country">Country</label>
				<input class="input" ref="m_office_country" type="text">
		    </div>
		    <div class="column is-one-third">
			<label class="label" for="m_office_phone">Phone(O)</label>
				<input class="input" ref="m_office_phone" type="number">
		    </div>
		    <div class="column is-full">
		      <h3 class="has-text-weight-bold is-size-4 has-text-link">Educational Information</h3>
		      <hr style="margin-top: 0.5em; margin-bottom: 0.5em;">
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="m_qualification">Qualification</label>
				<input class="input" ref="m_qualification" type="text">
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="m_other_qualification">Other Qualification</label>
				<input class="input" ref="m_other_qualification" type="text">
		    </div>
		    <div class="column is-full">
		    	<h3 class="has-text-weight-bold is-size-4 has-text-link">Contact Information Check if Mother's Address is same as Father's Address
		      		<input type="checkbox" id="motherCorrespondenceCheckbox" onclick={copyMotherAddress.bind(this)}>
		      	</h3>
		      	<hr style="margin-top: 0.5em; margin-bottom: 0.5em;">
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="m_add_l1">Address Line 1</label>
				<input class="input" ref="m_add_l1" type="text">
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="m_add_l2">Address Line 2</label>
				<input class="input" ref="m_add_l2" type="text">
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="m_city">City</label>
				<input class="input" ref="m_city" type="text">
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="m_zip">Zip</label>
				<input class="input" ref="m_zip" type="number">
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="m_state">State</label>
				<input class="input" ref="m_state" type="text">
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="m_country">Country</label>
				<input class="input" ref="m_country" type="text">
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="m_mobile">Mobile</label>
				<input class="input" ref="m_mobile" type="number">
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="m_email">Email</label>
				<input class="input" ref="m_email" type="email">
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="m_nationality">Nationality</label>
				<input class="input" ref="m_nationality" type="text">
		    </div>
		    <div class="column is-full">
			    <button class="button is-primary has-text-weight-bold adjusted-top" onclick={closeMotherInformation}>
			    	Previous
			    </button>
			    <button class="button is-info has-text-weight-bold adjusted-top" onclick={addGuardianInformation}>
			    	Next >>
			    </button>
			    <button class="button is-danger has-text-weight-bold adjusted-top" onclick={close}>
			    	Cancel
			    </button>    
		    </div>
  		</div>
	</div>
</section>
<!-- End Mother Information -->

<!-- Start Guardian Information -->
<section class=" is-fluid" show={student_view =='add_guardian_information'}>
	<div class="label">
		<div class="level-left">
			<h2 class="title" style="color: #ff3860;">{title} Guardian</h2>
		</div>
		<div class="level-right">
			<div class="column is-one-third">
				<label class="label" for="is_guardian">Select Guardian</label>
				<div class="control">
	        		<div class="select is-fullwidth">
						<select ref="is_guardian" id="guardian" onchange={getGuardianInformation}>
							<option >Select Guardian</option>
							<option value="Father">Father</option>
							<option value="Mother">Mother</option>
							<option value="Other">Other</option>
						</select>
					</div>
	      		</div>
		    </div>
		</div>
	</div>
	<div class="box">
		<div class="columns is-variable is-1 is-multiline">
		    <div class="column is-half">
			      <div id="g_pp_box" class="g_pp-box"
			      onclick={trigger_guardian_file_input.bind(this,'guardian_picture')}>
			        <div class="icon has-text-danger" onclick=
			        {remove_guardian_picture.bind(this, 'g_pp_box','guardian_picture')}><i class="fas fa-trash"></i></div>
			      </div>
			      <input accept="image/*" class="is-hidden" id="guardian_picture" name="guardian_picture" onchange={loadGuardianFile.bind(this, 'g_pp_box')} type="file">
		    </div>
		    <div class="column is-half">
		      	<div class="column is-narrow">
					<label class="label" for="g_title">Title</label>
					<input class="input" id="g_title" ref="g_title" type="text">
		      	</div>
		       <div class="column is-narrow">
					<label class="label" for="g_name">Guardian's Name</label>
					<input class="input" id="g_name" ref="g_name" type="text">
		      	</div>
		    </div>
		    <div class="column is-full">
		      <h3 class="has-text-weight-bold is-size-4 has-text-link">Work Information</h3>
		      <hr style="margin-top: 0.5em; margin-bottom: 0.5em;">
		    </div>
		    <div class="column is-one-third">
			<label class="label" for="g_occupation">Occupation</label>
				<input class="input" id="g_occupation" ref="g_occupation" type="text">
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="g_organisation_type">Organization Type</label>
				<div class="control">
	        		<div class="select is-fullwidth">
						<select ref="g_organisation_type" id="g_organisation_type">
							<option value="Governmnet">Governmnet</option>
							<option value="Business">Business</option>
							<option value="NGO">NGO</option>
							<option value="Professional">Professional</option>
							<option value="Other">Other</option>
						</select>
					</div>
	      		</div>
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="g_annual_income">Annual Income</label>
				<input class="input" id="g_annual_income" ref="g_annual_income" type="number">
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="g_work_profile">Work Profile</label>
				<input class="input" id="g_work_profile" ref="g_work_profile" type="text">
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="g_organisation_name">Organization Name</label>
				<input class="input" id="g_organisation_name" ref="g_organisation_name" type="text">
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="g_designation">Designation</label>
				<input class="input" id="g_designation" ref="g_designation" type="text">
		    </div>
		    <div class="column is-one-third">
			<label class="label" for="g_department">Department</label>
				<input class="input" id="g_department" ref="g_department" type="text">
		    </div>
		    
			<div class="column is-one-third">
				<label class="label" for="g_office_add_l1">Office Address Line 1</label>
				<input class="input" id="g_office_add_l1" ref="g_office_add_l1" type="text">
			</div>
			<div class="column is-one-third">
				<label class="label" for="g_office_add_l2">Office Address Line 2</label>
				<input class="input" id="g_office_add_l2" ref="g_office_add_l2" type="text">
			</div>
			<div class="column is-one-third">
				<label class="label" for="g_office_city">City</label>
				<input class="input" id="g_office_city" ref="g_office_city" type="text">
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="g_office_zip">Zip</label>
				<input class="input" id="g_office_zip" ref="g_office_zip" type="number">
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="g_office_state">State</label>
				<input class="input" id="g_office_state" ref="g_office_state" type="text">
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="g_office_country">Country</label>
				<input class="input" id="g_office_country" ref="g_office_country" type="text">
		    </div>
		    <div class="column is-one-third">
			<label class="label" for="g_office_phone">Phone(O)</label>
				<input class="input" id="g_office_phone" ref="g_office_phone" type="number">
		    </div>
		    <div class="column is-full">
		      <h3 class="has-text-weight-bold is-size-4 has-text-link">Educational Information</h3>
		      <hr style="margin-top: 0.5em; margin-bottom: 0.5em;">
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="g_qualification">Qualification</label>
				<input class="input" id="g_qualification" ref="g_qualification" type="text">
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="g_other_qualification">Other Qualification</label>
				<input class="input" id="g_other_qualification" ref="g_other_qualification" type="text">
		    </div>
		    <div class="column is-full">
		    	<h3 class="has-text-weight-bold is-size-4 has-text-link">Contact Information</h3>
		      	<hr style="margin-top: 0.5em; margin-bottom: 0.5em;">
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="g_add_l1">Address Line 1</label>
				<input class="input" id="g_add_l1" ref="g_add_l1" type="text">
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="g_add_l2">Address Line 2</label>
				<input class="input" id="g_add_l2" ref="g_add_l2" type="text">
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="g_city">City</label>
				<input class="input" id="g_city" ref="g_city" type="text">
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="g_zip">Zip</label>
				<input class="input" id="g_zip" ref="g_zip" type="number">
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="g_state">State</label>
				<input class="input" id="g_state" ref="g_state" type="text">
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="g_country">Country</label>
				<input class="input" id="g_country" ref="g_country" type="text">
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="g_phone">Phone(R)</label>
				<input class="input" id="g_phone" ref="g_phone" type="number">
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="g_mobile">Mobile</label>
				<input class="input" id="g_mobile" ref="g_mobile" type="number">
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="g_email">Email</label>
				<input class="input" id="g_email" ref="g_email" type="email">
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="g_nationality">Nationality</label>
				<input class="input" id="g_nationality" ref="g_nationality" type="text">
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="g_relation">Relationship</label>
				<input class="input" id="g_relation" ref="g_relation" type="text">
		    </div>
		    <div class="column is-full">
			    <button class="button is-primary has-text-weight-bold adjusted-top" onclick={closeGuardianInformation}>
			    	Previous
			    </button>
			    <button class="button is-info has-text-weight-bold adjusted-top" onclick={addSiblingInformation}>
			    	Next >>
			    </button>
			    <button class="button is-danger has-text-weight-bold adjusted-top" onclick={close}>
			    	Cancel
			    </button>    
		    </div>
  		</div>
	</div>
</section>
<!-- End Guardian Information -->

<!-- Start Sibling Information -->
<section class=" is-fluid" show={student_view =='add_sibling_information'}>
	<div class="label">
		<div class="level-left">
			<h2 class="title" style="color: #ff3860;">Sibling Detail</h2>
		</div>
		<div class="level-right">
		</div>
	</div>
	<div class="box">
		<div class="columns is-variable is-1 is-multiline">
		    <div class="column is-full">
		    	<h3 class="has-text-weight-bold is-size-4 has-text-link">First Child</h3>
		      	<hr style="margin-top: 0.5em; margin-bottom: 0.5em;">
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="first_child_name">Name</label>
				<input class="input" id="first_child_name" ref="first_child_name" type="text">
	    	</div>
	    	<div class="column is-one-third">
				<label class="label" for="first_child_age">Age</label>
				<input class="input" id="first_child_age" ref="first_child_age" type="number">
	    	</div>
	    	<div class="column is-one-third">
				<label class="label" for="first_child_class">Class</label>
				<input class="input" id="first_child_class" ref="first_child_class" type="text">
	    	</div>
	    	<div class="column is-one-third">
				<label class="label" for="first_child_section">Section</label>
				<input class="input" id="first_child_section" ref="first_child_section" type="text"
				onkeyup="this.value = this.value.toUpperCase();">
	    	</div>
	    	<div class="column is-one-third">
				<label class="label" for="first_enrol">Enroll No.</label>
				<input class="input" id="first_enrol" ref="first_enrol" type="text">
	    	</div>
	    	<div class="column is-one-third">
				<label class="label" for="first_child_school">School</label>
				<input class="input" id="first_child_school" ref="first_child_school" type="text">
	    	</div>
	    	<div class="column is-full">
	    		<h3 class="has-text-weight-bold is-size-4 has-text-link">Second Child</h3>
	      		<hr style="margin-top: 0.5em; margin-bottom: 0.5em;">
	    	</div>
	    	<div class="column is-one-third">
				<label class="label" for="second_child_name">Name</label>
				<input class="input" id="second_child_name" ref="second_child_name" type="text">
	    	</div>
	    	<div class="column is-one-third">
				<label class="label" for="second_child_age">Age</label>
				<input class="input" id="second_child_age" ref="second_child_age" type="number">
	    	</div>
	    	<div class="column is-one-third">
				<label class="label" for="second_child_class">Class</label>
				<input class="input" id="second_child_class" ref="second_child_class" type="text">
	    	</div>
	    	<div class="column is-one-third">
				<label class="label" for="second_child_section">Section</label>
				<input class="input" id="second_child_section" ref="second_child_section" type="text"
				onkeyup="this.value = this.value.toUpperCase();">
	    	</div>
	    	<div class="column is-one-third">
				<label class="label" for="second_enrol">Enroll No.</label>
				<input class="input" id="second_enrol" ref="second_enrol" type="text">
	    	</div>
	    	<div class="column is-one-third">
				<label class="label" for="second_child_school">School</label>
				<input class="input" id="second_child_school" ref="second_child_school" type="text">
	    	</div>
	    	<div class="column is-full">
	    		<h3 class="has-text-weight-bold is-size-4 has-text-link">Third Child</h3>
	      		<hr style="margin-top: 0.5em; margin-bottom: 0.5em;">
	    	</div>
	    	<div class="column is-one-third">
				<label class="label" for="third_child_name">Name</label>
				<input class="input" id="third_child_name" ref="third_child_name" type="text">
	    	</div>
	    	<div class="column is-one-third">
				<label class="label" for="third_child_age">Age</label>
				<input class="input" id="third_child_age" ref="third_child_age" type="number">
	    	</div>
	    	<div class="column is-one-third">
				<label class="label" for="third_child_class">Class</label>
				<input class="input" id="third_child_class" ref="third_child_class" type="text">
	    	</div>
	    	<div class="column is-one-third">
				<label class="label" for="third_child_section">Section</label>
				<input class="input" id="third_child_section" ref="third_child_section" type="text"
				onkeyup="this.value = this.value.toUpperCase();">
	    	</div>
	    	<div class="column is-one-third">
				<label class="label" for="third_enrol">Enroll No.</label>
				<input class="input" id="third_enrol" ref="third_enrol" type="text">
	    	</div>
	    	<div class="column is-one-third">
				<label class="label" for="third_child_school">School</label>
				<input class="input" id="third_child_school" ref="third_child_school" type="text">
	    	</div>
	    	<div class="column is-full">
	    		<h3 class="has-text-weight-bold is-size-4 has-text-link">Fourth Child</h3>
	      		<hr style="margin-top: 0.5em; margin-bottom: 0.5em;">
	    	</div>
	    	<div class="column is-one-third">
				<label class="label" for="fourth_child_name">Name</label>
				<input class="input" id="fourth_child_name" ref="fourth_child_name" type="text">
	    	</div>
	    	<div class="column is-one-third">
				<label class="label" for="fourth_child_age">Age</label>
				<input class="input" id="fourth_child_age" ref="fourth_child_age" type="number">
	    	</div>
	    	<div class="column is-one-third">
				<label class="label" for="fourth_child_class">Class</label>
				<input class="input" id="fourth_child_class" ref="fourth_child_class" type="text">
	    	</div>
	    	<div class="column is-one-third">
				<label class="label" for="fourth_child_section">Section</label>
				<input class="input" id="fourth_child_section" ref="fourth_child_section" type="text"
				onkeyup="this.value = this.value.toUpperCase();">
	    	</div>
	    	<div class="column is-one-third">
				<label class="label" for="fourth_enrol">Enroll No.</label>
				<input class="input" id="fourth_enrol" ref="fourth_enrol" type="text">
	    	</div>
	    	<div class="column is-one-third">
				<label class="label" for="fourth_child_school">School</label>
				<input class="input" id="fourth_child_school" ref="fourth_child_school" type="text">
	    	</div>
		    <div class="column is-full">
			    <button class="button is-primary has-text-weight-bold adjusted-top" 
			    	onclick={closeSiblingInformation}>Previous
			    </button>
			    <button class="button is-info has-text-weight-bold adjusted-top" 
			    	onclick={addOtherInformation}>Next >>
			    </button>
			    <button class="button is-danger has-text-weight-bold adjusted-top" 
			    	onclick={close}>Cancel
			    </button>    
		    </div>
  		</div>
	</div>
</section>
<!-- End Sibling Information -->


<!-- Start Other Information -->
<section class=" is-fluid" show={student_view =='add_other_information'}>
	<div class="box">
		<div class="columns is-variable is-1 is-multiline">
		    <div class="column is-full">
		    	<h3 class="has-text-weight-bold is-size-4 has-text-link">Areas Where Parent(Father or Mentor) can contribute to the school</h3>
		      	<hr style="margin-top: 0.5em; margin-bottom: 0.5em;">
		    </div>
	    	<div class=" column has-text-centered">
	    		<table class="table is-fullwidth is-striped is-hoverable is-narrow">
	    			<tbody>
	    				<tr>
	    					<td>
	    						<input type="checkbox" id="music" ref="music" >Music
	    					</td>
	    					<td>
	    						<input type="checkbox" id="sports" ref="sports">Sports
	    					</td>
	    					<td>
	    						<input type="checkbox" id="social" ref="social">Social Skills
	    					</td>
	    					<td>
	    						<input type="checkbox" id="media" ref="media">Media/PR
	    					</td>
	    				</tr>
	    				<tr>
	    					<td>
	    						<input type="checkbox" id="academic" ref="academic">Academic
	    					</td>
	    					<td>
	    						<input type="checkbox" id="community" ref="community">
	    						Community Programme
	    					</td>
	    					<td>
	    						<input type="checkbox" id="painting" ref="painting">
	    						Painting/Sculpture
	    					</td>
	    					<td>
	    						<input type="checkbox" id="information" ref="information">
	    						Information Technology
	    					</td>
	    				</tr>
	    				<tr>
	    					<td>
	    						<input type="checkbox" id="hr_training" ref="hr_training">HR Training
	    					</td>
	    					<td>
	    						<input type="checkbox" id="medical" ref="medical">Medical
	    					</td>
	    					<td>
	    						<input type="checkbox" id="career" ref="career">
	    						Career Counselling
	    					</td>
	    					<td>
	    						<input type="checkbox" id="communication" ref="communication">
	    						Public Speaking / Communication Skills
	    					</td>
	    				</tr>
	    			</tbody>
	    		</table>
	    	</div>
	    	<div class="column is-full">
	    		<h3 class="has-text-weight-bold is-size-4 has-text-link">Please Mention if either parent possesses any of the following Qualification</h3>
	      		<hr style="margin-top: 0.5em; margin-bottom: 0.5em;">
	    	</div>
	    	<div class=" column is-full">
	    		<table class="table is-fullwidth is-striped is-hoverable is-narrow">
	    			<tbody>
	    				<tr>
	    					<td>
	    						<input type="checkbox" id="med" ref="med">MEd
	    					</td>
	    					<td>
	    						<input type="checkbox" id="bed" ref="bed">BEd
	    					</td>
	    					<td>
	    						<input type="checkbox" id="ttc" ref="ttc">TTC
	    					</td>
	    					<td>
	    						<input type="checkbox" id="montessori" ref="montessori">
	    						Montessori Trained
	    					</td>
	    				</tr>
	    			</tbody>
	    		</table>
	    	</div>

	    	<div class="column is-one-third">
				<label class="label" for="transport_mode">Mode of Transport</label>
				<div class="control">
	        		<div class="select is-fullwidth">
						<select ref="transport_mode" id="transport_mode">
							<option value="None">None</option>
							<option value="Bus">Bus</option>
							<option value="Carpool">Carpool</option>
							<option value="Rikshaw">Rikshaw</option>
							<option value="Self">Self</option>
						</select>
					</div>
	      		</div>
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="school_distance">Distance from school</label>
				<div class="control">
	        		<div class="select is-fullwidth">
						<select ref="school_distance" id="school_distance">
							<option value="1 km">1 km</option>
							<option value="1-2 km">1-2 km</option>
							<option value="More than 2 km">More than 2 km</option>
						</select>
					</div>
	      		</div>
		    </div>
		    <div class="column is-one-third">
				<label class="label" for="differently_abled">If child is Differently Abled</label>
				<div class="control">
	        		<div class="select is-fullwidth">
						<select ref="differently_abled" id="differently_abled">
							<option value="None">None</option>
							<option value="In seeing">In seeing</option>
							<option value="In hearing">In hearing</option>
							<option value="In speaking">In speaking</option>
							<option value="In movement">In movement</option>
							<option value="In mental ability">In mental ability</option>
						</select>
					</div>
	      		</div>
		    </div>
		    <div class="column is-full">
			    <button class="button is-primary has-text-weight-bold adjusted-top" 
			    	onclick={closeOtherInformation}>Previous
			    </button>
			    <button class="button is-info has-text-weight-bold adjusted-top" 
			    	onclick={addInformation}>Submit
			    </button>
			    <button class="button is-danger has-text-weight-bold adjusted-top" 
			    	onclick={close}>Cancel
			    </button>    
		    </div>
  		</div>
	</div>
</section>
<!-- End Other Information -->
<script>
	
	var self = this
    self.on("mount", function(){
    	self.title='Add'
    	self.student_view = 'show_student'
    	self.is_student_picture=false
    	self.student_picture=false
    	self.role = getCookie('role')
    	self.readStandard()
    	self.readSection()
    	self.readHouse()
    	self.readCategory()
    	self.readReligion()
    	self.staff_name = true
        self.update()
        flatpickr(".date", {
	    	altInput: true,
	    	altFormat: "d/m/Y",
	    	dateFormat: "Y-m-d",
  		})
    })

    self.on("unmount", function(){
      studentStore.off('read_standard_changed',StandardChanged)
      studentStore.off('read_section_changed',SectionChanged)
      studentStore.off('read_house_changed',HouseChanged)
      studentStore.off('read_cast_changed',CastChanged)
      studentStore.off('read_religion_changed',ReligionChanged)
      studentStore.off('read_student_changed',StudentChanged)
      studentStore.off('add_student_changed',AddStudentChanged)
      studentStore.off('read_for_edit_student_changed',ReadForEditStudentChanged)
    })

    self.getStudentData = () =>{
    	if(self.refs.read_enroll_number.value==""){
    		studentStore.trigger('read_student', self.refs.read_standard_id.value,self.refs.read_section_id.value,0)
    	}else{
    		studentStore.trigger('read_student', self.refs.read_standard_id.value,self.refs.read_section_id.value,
      	self.refs.read_enroll_number.value)
    	}
      
    }

    self.add_new_student = () =>{
    	self.student_view='add_student'
    	self.update()
    	document.getElementById("first_name").focus()
    }

    self.close = () =>{
    	self.student_view = 'show_student'
    }

    self.GetStaffName = () =>{
    	if(self.refs.staff_child.value == "Y"){
    		self.staff_name = true
    	}else{
    		self.staff_name = false
    	}
    }

    self.addFatherInformation = () =>{
    	var phoneno = /^\d{10}$/;
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
    		self.student_view='add_father_information'
    		self.update()
    		document.getElementById("f_title").focus()
      	}
    }
    self.closeFatherInformation = () =>{
    	self.student_view = 'add_student'
    	self.update()
    }
    self.addMotherInformation = () =>{
    	if(!self.refs.f_name.value){
    		toastr.error("Please enter Father Name and try again")
    		return;
    	}else{
    		self.student_view='add_mother_information'
    		self.update()
    		document.getElementById("m_title").focus()
      	}
    }
    self.closeMotherInformation = () =>{
    	self.student_view = 'add_father_information'
    	self.update()
    }

    self.addGuardianInformation = () =>{
    	if(!self.refs.m_name.value){
    		toastr.error("Please enter Mother Name and try again")
    		return;
    	}else{
    		self.student_view='add_guardian_information'
    		self.update()
    		document.getElementById("guardian").focus()
      	}
    }
    self.closeGuardianInformation = () =>{
    	self.student_view = 'add_mother_information'
    }
    self.addOtherInformation = () =>{
    	if(!self.refs.g_name.value){
    		toastr.error("Please enter Guardian Name and try again")
    		return;
    	}else{
    		self.student_view='add_other_information'
    		self.update()
      	}
    }
    self.closeOtherInformation = () =>{
    	self.student_view = 'add_sibling_information'
    }

    self.addSiblingInformation = () =>{
    	self.student_view='add_sibling_information'
    	self.update()
    }

    self.closeSiblingInformation = () =>{
    	self.student_view = 'add_guardian_information'
    }

    self.getGuardianInformation = () =>{
    	if(self.refs.is_guardian.value == 'Father'){
    		document.getElementById("g_title").disabled = true;
    		document.getElementById("g_name").disabled = true;
    		document.getElementById("g_occupation").disabled = true;
    		document.getElementById("g_organisation_type").disabled = true;
    		document.getElementById("g_annual_income").disabled = true;
    		document.getElementById("g_work_profile").disabled = true;
    		document.getElementById("g_organisation_name").disabled = true;
    		document.getElementById("g_designation").disabled = true;
    		document.getElementById("g_department").disabled = true;
    		document.getElementById("g_office_add_l1").disabled = true;
    		document.getElementById("g_office_add_l2").disabled = true;
    		document.getElementById("g_office_city").disabled = true;
    		document.getElementById("g_office_zip").disabled = true;
    		document.getElementById("g_office_state").disabled = true;
    		document.getElementById("g_office_state").disabled = true;
    		document.getElementById("g_office_country").disabled = true;
    		document.getElementById("g_office_phone").disabled = true;
    		document.getElementById("g_qualification").disabled = true;
    		document.getElementById("g_other_qualification").disabled = true;
    		document.getElementById("g_add_l1").disabled = true;
    		document.getElementById("g_add_l2").disabled = true;
    		document.getElementById("g_city").disabled = true;
    		document.getElementById("g_zip").disabled = true;
    		document.getElementById("g_state").disabled = true;
    		document.getElementById("g_country").disabled = true;
    		document.getElementById("g_mobile").disabled = true;
    		document.getElementById("g_email").disabled = true;
    		document.getElementById("g_nationality").disabled = true;
    		document.getElementById("g_relation").disabled = true;
    		self.refs.g_title.value = self.refs.f_title.value
    		self.refs.g_name.value = self.refs.f_name.value
    		self.refs.g_occupation.value = self.refs.f_occupation.value
    		self.refs.g_organisation_type.value = self.refs.f_organisation_type.value
    		self.refs.g_annual_income.value = self.refs.f_annual_income.value
    		self.refs.g_work_profile.value = self.refs.f_work_profile.value
    		self.refs.g_organisation_name.value = self.refs.f_organisation_name.value
    		self.refs.g_designation.value = self.refs.f_designation.value
    		self.refs.g_department.value = self.refs.f_department.value
    		self.refs.g_office_add_l1.value = self.refs.f_office_add_l1.value
    		self.refs.g_office_add_l2.value = self.refs.f_office_add_l2.value
    		self.refs.g_office_city.value = self.refs.f_office_city.value
    		self.refs.g_office_zip.value = self.refs.f_office_zip.value
    		self.refs.g_office_state.value = self.refs.f_office_state.value
    		self.refs.g_office_country.value = self.refs.f_office_country.value
    		self.refs.g_office_phone.value = self.refs.f_office_phone.value
    		self.refs.g_qualification.value = self.refs.f_qualification.value
    		self.refs.g_other_qualification.value = self.refs.f_other_qualification.value
    		self.refs.g_add_l1.value = self.refs.f_add_l1.value
    		self.refs.g_add_l2.value = self.refs.f_add_l2.value
    		self.refs.g_city.value = self.refs.f_city.value
    		self.refs.g_zip.value = self.refs.f_zip.value
    		self.refs.g_state.value = self.refs.f_state.value
    		self.refs.g_country.value = self.refs.f_country.value
    		self.refs.g_mobile.value = self.refs.f_mobile.value
    		self.refs.g_email.value = self.refs.f_email.value
    		self.refs.g_nationality.value = self.refs.f_nationality.value
    		self.refs.g_relation.value = self.refs.guardian.value

    	}else if(self.refs.is_guardian.value == 'Mother'){
    		document.getElementById("g_title").disabled = true;
    		document.getElementById("g_name").disabled = true;
    		document.getElementById("g_occupation").disabled = true;
    		document.getElementById("g_organisation_type").disabled = true;
    		document.getElementById("g_annual_income").disabled = true;
    		document.getElementById("g_work_profile").disabled = true;
    		document.getElementById("g_organisation_name").disabled = true;
    		document.getElementById("g_designation").disabled = true;
    		document.getElementById("g_department").disabled = true;
    		document.getElementById("g_office_add_l1").disabled = true;
    		document.getElementById("g_office_add_l2").disabled = true;
    		document.getElementById("g_office_city").disabled = true;
    		document.getElementById("g_office_zip").disabled = true;
    		document.getElementById("g_office_state").disabled = true;
    		document.getElementById("g_office_state").disabled = true;
    		document.getElementById("g_office_country").disabled = true;
    		document.getElementById("g_office_phone").disabled = true;
    		document.getElementById("g_qualification").disabled = true;
    		document.getElementById("g_other_qualification").disabled = true;
    		document.getElementById("g_add_l1").disabled = true;
    		document.getElementById("g_add_l2").disabled = true;
    		document.getElementById("g_city").disabled = true;
    		document.getElementById("g_zip").disabled = true;
    		document.getElementById("g_state").disabled = true;
    		document.getElementById("g_country").disabled = true;
    		document.getElementById("g_mobile").disabled = true;
    		document.getElementById("g_email").disabled = true;
    		document.getElementById("g_nationality").disabled = true;
    		document.getElementById("g_relation").disabled = true;
    		self.refs.g_title.value = self.refs.m_title.value
    		self.refs.g_name.value = self.refs.m_name.value
    		self.refs.g_occupation.value = self.refs.m_occupation.value
    		self.refs.g_organisation_type.value = self.refs.m_organisation_type.value
    		self.refs.g_annual_income.value = self.refs.m_annual_income.value
    		self.refs.g_work_profile.value = self.refs.m_work_profile.value
    		self.refs.g_organisation_name.value = self.refs.m_organisation_name.value
    		self.refs.g_designation.value = self.refs.m_designation.value
    		self.refs.g_department.value = self.refs.m_department.value
    		self.refs.g_office_add_l1.value = self.refs.m_office_add_l1.value
    		self.refs.g_office_add_l2.value = self.refs.m_office_add_l2.value
    		self.refs.g_office_city.value = self.refs.m_office_city.value
    		self.refs.g_office_zip.value = self.refs.m_office_zip.value
    		self.refs.g_office_state.value = self.refs.m_office_state.value
    		self.refs.g_office_country.value = self.refs.m_office_country.value
    		self.refs.g_office_phone.value = self.refs.m_office_phone.value
    		self.refs.g_qualification.value = self.refs.m_qualification.value
    		self.refs.g_other_qualification.value = self.refs.m_other_qualification.value
    		self.refs.g_add_l1.value = self.refs.m_add_l1.value
    		self.refs.g_add_l2.value = self.refs.m_add_l2.value
    		self.refs.g_city.value = self.refs.m_city.value
    		self.refs.g_zip.value = self.refs.m_zip.value
    		self.refs.g_state.value = self.refs.m_state.value
    		self.refs.g_country.value = self.refs.m_country.value
    		self.refs.g_mobile.value = self.refs.m_mobile.value
    		self.refs.g_email.value = self.refs.m_email.value
    		self.refs.g_nationality.value = self.refs.m_nationality.value
    		self.refs.g_relation.value = self.refs.guardian.value
    	}else {
    		document.getElementById("g_title").disabled = false;
    		document.getElementById("g_name").disabled = false;
    		document.getElementById("g_occupation").disabled = false;
    		document.getElementById("g_organisation_type").disabled = false;
    		document.getElementById("g_annual_income").disabled = false;
    		document.getElementById("g_work_profile").disabled = false;
    		document.getElementById("g_organisation_name").disabled = false;
    		document.getElementById("g_designation").disabled = false;
    		document.getElemenis_tById("g_department").disabled = false;
    		document.getElementById("g_office_add_l1").disabled = false;
    		document.getElementById("g_office_add_l2").disabled = false;
    		document.getElementById("g_office_city").disabled = false;
    		document.getElementById("g_office_zip").disabled = false;
    		document.getElementById("g_office_state").disabled = false;
    		document.getElementById("g_office_state").disabled = false;
    		document.getElementById("g_office_country").disabled = false;
    		document.getElementById("g_office_phone").disabled = false;
    		document.getElementById("g_qualification").disabled = false;
    		document.getElementById("g_other_qualification").disabled = false;
    		document.getElementById("g_add_l1").disabled = false;
    		document.getElementById("g_add_l2").disabled = false;
    		document.getElementById("g_city").disabled = false;
    		document.getElementById("g_zip").disabled = false;
    		document.getElementById("g_state").disabled = false;
    		document.getElementById("g_country").disabled = false;
    		document.getElementById("g_mobile").disabled = false;
    		document.getElementById("g_email").disabled = false;
    		document.getElementById("g_nationality").disabled = false;
    		document.getElementById("g_relation").disabled = false;
    		self.refs.g_title.value = ''
    		self.refs.g_name.value = ''
    		self.refs.g_occupation.value = ''
    		self.refs.g_organisation_type.value = ''
    		self.refs.g_annual_income.value = ''
    		self.refs.g_work_profile.value = ''
    		self.refs.g_organisation_name.value = ''
    		self.refs.g_designation.value = ''
    		self.refs.g_department.value = ''
    		self.refs.g_office_add_l1.value = ''
    		self.refs.g_office_add_l2.value = ''
    		self.refs.g_office_city.value = ''
    		self.refs.g_office_zip.value = ''
    		self.refs.g_office_state.value = ''
    		self.refs.g_office_country.value = ''
    		self.refs.g_office_phone.value = ''
    		self.refs.g_qualification.value = ''
    		self.refs.g_other_qualification.value = ''
    		self.refs.g_add_l1.value = ''
    		self.refs.g_add_l2.value = ''
    		self.refs.g_city.value = ''
    		self.refs.g_zip.value = ''
    		self.refs.g_state.value = ''
    		self.refs.g_country.value = ''
    		self.refs.g_mobile.value = ''
    		self.refs.g_email.value = ''
    		self.refs.g_nationality.value = ''
    		self.refs.g_relation.value = ''
    	}
    }
    self.copyAddress = (e) => {
    	let cbox = '#correspondenceCheckbox'
    	if($(cbox).prop('checked') == true){
    		console.log("true")
    		self.refs.c_add_l1.value=self.refs.p_add_l1.value
    		self.refs.c_add_l2.value=self.refs.p_add_l2.value
    		self.refs.c_city.value=self.refs.p_city.value
    		self.refs.c_zip.value=self.refs.p_zip.value
    		self.refs.c_state.value=self.refs.p_state.value
    		self.refs.c_country.value=self.refs.p_country.value
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
    self.copyFatherAddress = (e) => {
    	let cbox = '#fatherCorrespondenceCheckbox'
    	if($(cbox).prop('checked') == true){
    		console.log("true")
    		self.refs.f_add_l1.value=self.refs.c_add_l1.value
    		self.refs.f_add_l2.value=self.refs.c_add_l2.value
    		self.refs.f_city.value=self.refs.c_city.value
    		self.refs.f_zip.value=self.refs.c_zip.value
    		self.refs.f_state.value=self.refs.c_state.value
    		self.refs.f_country.value=self.refs.c_country.value
    		self.update()
    	}else{
    		console.log("false")
    		self.refs.f_add_l1.value=''
    		self.refs.f_add_l2.value=''
    		self.refs.f_city.value=''
    		self.refs.f_zip.value=''
    		self.refs.f_state.value=''
    		self.refs.f_country.value=''
    	}
    }
    self.copyMotherAddress = (e) => {
    	let cbox = '#motherCorrespondenceCheckbox'
    	if($(cbox).prop('checked') == true){
    		console.log("true")
    		self.refs.m_add_l1.value=self.refs.f_add_l1.value
    		self.refs.m_add_l2.value=self.refs.f_add_l2.value
    		self.refs.m_city.value=self.refs.f_city.value
    		self.refs.m_zip.value=self.refs.f_zip.value
    		self.refs.m_state.value=self.refs.f_state.value
    		self.refs.m_country.value=self.refs.f_country.value
    		self.update()
    	}else{
    		console.log("false")
    		self.refs.m_add_l1.value=''
    		self.refs.m_add_l2.value=''
    		self.refs.m_city.value=''
    		self.refs.m_zip.value=''
    		self.refs.m_state.value=''
    		self.refs.m_country.value=''
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
			self.is_student_image=true
		};
		reader.readAsDataURL(event.target.files[0]);
		
		console.log(event.target.files[0])
		self.student_picture = event.target.files[0]
	}

	/* End */

	/* Start Upload Father Image*/
	self.remove_father_picture = (item1, item2, e) => {
		console.log('item1'+item1)
		console.log('item2'+item2)
		var f_pp_box = document.getElementById(item1);
		f_pp_box.style.backgroundImage = "";
		document.getElementById(item2).value = ""
		event.stopPropagation();
	}

	self.trigger_father_file_input = (item,e) => {
		document.getElementById(item).click();
	}


     self.loadFatherFile = (item,event) => {
		var reader = new FileReader();
		reader.onload = function (e) {
			console.log(item)
			document.getElementById(item).style.backgroundImage = 'url(' + e.target.result + ')';
			console.log(e.target.result)
			self.is_father_image=true
		};
		reader.readAsDataURL(event.target.files[0]);
		
		console.log(event.target.files[0])
		self.father_picture = event.target.files[0]
	}

	/* End */

	/* Start Upload Mother Image*/
	self.remove_mother_picture = (item1, item2, e) => {
		console.log('item1'+item1)
		console.log('item2'+item2)
		var m_pp_box = document.getElementById(item1);
		m_pp_box.style.backgroundImage = "";
		document.getElementById(item2).value = ""
		event.stopPropagation();
	}

	self.trigger_mother_file_input = (item,e) => {
		document.getElementById(item).click();
	}


     self.loadMotherFile = (item,event) => {
		var reader = new FileReader();
		reader.onload = function (e) {
			console.log(item)
			document.getElementById(item).style.backgroundImage = 'url(' + e.target.result + ')';
			console.log(e.target.result)
			self.is_mother_image=true
		};
		reader.readAsDataURL(event.target.files[0]);
		
		console.log(event.target.files[0])
		self.mother_picture = event.target.files[0]
	}

	/* End */

	/* Start Guardian Image*/
	self.remove_guardian_picture = (item1, item2, e) => {
		console.log('item1'+item1)
		console.log('item2'+item2)
		var m_pp_box = document.getElementById(item1);
		m_pp_box.style.backgroundImage = "";
		document.getElementById(item2).value = ""
		event.stopPropagation();
	}

	self.trigger_guardian_file_input = (item,e) => {
		document.getElementById(item).click();
	}


     self.loadGuardianFile = (item,event) => {
		var reader = new FileReader();
		reader.onload = function (e) {
			console.log(item)
			document.getElementById(item).style.backgroundImage = 'url(' + e.target.result + ')';
			console.log(e.target.result)
			self.is_guardian_image=true
		};
		reader.readAsDataURL(event.target.files[0]);
		
		console.log(event.target.files[0])
		self.guardian_picture = event.target.files[0]
	}

	/* End */

	 self.readStandard = () => {
       studentStore.trigger('read_standard')
    }

    self.readSection = () => {
       studentStore.trigger('read_section')
    }

    self.readHouse = () => {
       studentStore.trigger('read_house')
    }

    self.readCategory = () => {
       studentStore.trigger('read_cast')
    }

    self.readReligion = () => {
       studentStore.trigger('read_religion')
    }

	self.getSection = () => {
    	self.filteredSections = []
    	self.filteredSections = self.sections.filter(s => {
    		return s.standard_id == self.refs.standard_id.value
    	})
    }

    self.getReadSection = () => {
    	self.readfilteredSections = []
    	self.readfilteredSections = self.sections.filter(s => {
    		return s.standard_id == self.refs.read_standard_id.value
    	})
    }


    self.addInformation = () =>{
    	console.log("addInformation")
    	var obj={}

    	/*Student Information */
        var student={};

    	student['first_name']=self.refs.first_name.value
    	student['middle_name']=self.refs.middle_name.value
    	student['last_name']=self.refs.last_name.value
    	//student['standard_id']=self.refs.standard_id.value
    	//student['section_id']=self.refs.section_id.value
    	//student['house_id']=self.refs.house_id.value
    	student['enroll_number']=self.refs.enroll_number.value
    	student['roll_number']=self.refs.roll_number.value
    	student['reg_number']=self.refs.reg_number.value
    	student['gender']=self.refs.gender.value
    	student['category_id']=self.refs.category_id.value
    	student['dob']=self.refs.dob.value
    	student['blood_group']=self.refs.blood_group.value
    	student['p_add_l1']=self.refs.p_add_l1.value
    	student['p_add_l2']=self.refs.p_add_l2.value
    	student['p_city']=self.refs.p_city.value
    	student['p_zip']=self.refs.p_zip.value
    	student['p_state']=self.refs.p_state.value
    	student['p_country']=self.refs.p_country.value
    	if($('#correspondenceCheckbox').prop('checked') == true){
    		student['is_permanent'] = 1
    	}else{
    		student['is_permanent'] = 0
    	}
    	
    	student['c_add_l1']=self.refs.c_add_l1.value
    	student['c_add_l2']=self.refs.c_add_l2.value
    	student['c_city']=self.refs.c_city.value
    	student['c_zip']=self.refs.c_zip.value
    	student['c_state']=self.refs.c_state.value
    	student['c_country']=self.refs.c_country.value
    	student['residence_phone']=self.refs.residence_phone.value
    	student['mobile']=self.refs.mobile.value
    	student['fax']=self.refs.emergency_no.value
    	student['student_type']=self.refs.student_type.value
    	student['aadhar_no']=self.refs.aadhar_no.value
    	student['doa']=self.refs.doa.value
    	student['old_doa']=self.refs.old_doa.value
    	student['doj']=self.refs.doj.value
    	student['old_doj']=self.refs.old_doj.value
    	student['mother_tongue']=self.refs.mother_tongue.value
    	student['last_school']=self.refs.last_school.value
    	student['last_class']=self.refs.last_class.value
    	student['admission_for_class']=self.refs.admission_for_class.value
    	student['hobby']=self.refs.hobby.value
    	student['cast']=self.refs.cast.value
    	student['religion_id']=self.refs.religion_id.value
    	student['staff_child']=self.refs.staff_child.value
    	student['staff_name']=self.refs.staff_name.value

    	student['transport_mode']=self.refs.transport_mode.value
    	student['school_distance']=self.refs.school_distance.value
    	student['differently_abled']=self.refs.differently_abled.value

        
        obj['student']=student;

        /*Student Current Standing*/

        var student_current_standing={};

    	student_current_standing['section_id']=self.refs.section_id.value
    	student_current_standing['house_id']=self.refs.house_id.value

    	obj['student_current_standing'] = student_current_standing

    	 /*Student Login*/

        var student_login={};

    	student_login['enroll_number']=self.refs.enroll_number.value
    	student_login['password']=self.refs.dob.value
    	student_login['parent_password']='123456'
    	student_login['is_active']='Y'

    	obj['student_login'] = student_login

    	/*Father Information*/
        
        var parent={};

    	parent['f_title']=self.refs.f_title.value
    	parent['f_name']=self.refs.f_name.value
    	parent['f_occupation']=self.refs.f_occupation.value
    	parent['f_organisation_type']=self.refs.f_organisation_type.value
    	parent['f_annual_income']=self.refs.f_annual_income.value
    	parent['f_work_profile']=self.refs.f_work_profile.value
    	parent['f_organisation_name']=self.refs.f_organisation_name.value
    	parent['f_designation']=self.refs.f_designation.value
    	parent['f_department']=self.refs.f_department.value
    	parent['f_office_add_l1']=self.refs.f_office_add_l1.value
    	parent['f_office_add_l2']=self.refs.f_office_add_l2.value
    	parent['f_office_city']=self.refs.f_office_city.value
    	parent['f_office_zip']=self.refs.f_office_zip.value
    	parent['f_office_state']=self.refs.f_office_state.value
    	parent['f_office_country']=self.refs.f_office_country.value
    	parent['f_office_phone']=self.refs.f_office_phone.value
    	parent['f_school_exam_passed']=self.refs.f_qualification.value
    	parent['f_college_exam_passed']=self.refs.f_other_qualification.value

    	if($('#fatherCorrespondenceCheckbox').prop('checked') == true){
    		parent['is_caddress'] = 1
    	}else{
    		parent['is_caddress'] = 0
    	}

    	parent['f_add_l1']=self.refs.f_add_l1.value
    	parent['f_add_l2']=self.refs.f_add_l2.value
    	parent['f_city']=self.refs.f_city.value
    	parent['f_zip']=self.refs.f_zip.value
    	parent['f_state']=self.refs.f_state.value
    	parent['f_country']=self.refs.f_country.value
    	parent['f_mobile']=self.refs.f_mobile.value
    	parent['f_email']=self.refs.f_email.value
    	parent['f_nationality']=self.refs.f_nationality.value


    	/*Mother Information*/

    	parent['m_title']=self.refs.m_title.value
    	parent['m_name']=self.refs.m_name.value
    	parent['m_occupation']=self.refs.m_occupation.value
    	parent['m_organisation_type']=self.refs.m_organisation_type.value
    	parent['m_annual_income']=self.refs.m_annual_income.value
    	parent['m_work_profile']=self.refs.m_work_profile.value
    	parent['m_organisation_name']=self.refs.m_organisation_name.value
    	parent['m_designation']=self.refs.m_designation.value
    	parent['m_department']=self.refs.m_department.value
    	parent['m_office_add_l1']=self.refs.m_office_add_l1.value
    	parent['m_office_add_l2']=self.refs.m_office_add_l2.value
    	parent['m_office_city']=self.refs.m_office_city.value
    	parent['m_office_zip']=self.refs.m_office_zip.value
    	parent['m_office_state']=self.refs.m_office_state.value
    	parent['m_office_country']=self.refs.m_office_country.value
    	parent['m_office_phone']=self.refs.m_office_phone.value
    	parent['m_school_exam_passed']=self.refs.m_qualification.value
    	parent['m_college_exam_passed']=self.refs.m_other_qualification.value
		
		if($('#motherCorrespondenceCheckbox').prop('checked') == true){
    		parent['is_motherAdd'] = 1
    	}else{
    		parent['is_motherAdd'] = 0
    	}

    	parent['m_add_l1']=self.refs.m_add_l1.value
    	parent['m_add_l2']=self.refs.m_add_l2.value
    	parent['m_city']=self.refs.m_city.value
    	parent['m_zip']=self.refs.m_zip.value
    	parent['m_state']=self.refs.m_state.value
    	parent['m_country']=self.refs.m_country.value
    	parent['m_mobile']=self.refs.m_mobile.value
    	parent['m_email']=self.refs.m_email.value
    	parent['m_nationality']=self.refs.m_nationality.value


    	/*Guardian Information*/

    	if($('#motherCorrespondenceCheckbox').prop('checked') == true){
    		parent['is_motherAdd'] = 1
    	}else{
    		parent['is_motherAdd'] = 0
    	}
    	if(self.refs.is_guardian.value == 'Father'){
    		parent['is_guardian'] = 'Father'
    	}else if(self.refs.is_guardian.value == 'Mother'){
    		parent['is_guardian'] = 'Mother'
    	}else{
    		parent['is_guardian'] = 'Other'
    	}

        parent['g_title']=self.refs.g_title.value
    	parent['g_name']=self.refs.g_name.value
    	parent['g_occupation']=self.refs.g_occupation.value
    	parent['g_organisation_type']=self.refs.g_organisation_type.value
    	parent['g_annual_income']=self.refs.g_annual_income.value
    	parent['g_work_profile']=self.refs.g_work_profile.value
    	parent['g_organisation_name']=self.refs.g_organisation_name.value
    	parent['g_designation']=self.refs.g_designation.value
    	parent['g_department']=self.refs.g_department.value
    	parent['g_office_add_l1']=self.refs.g_office_add_l1.value
    	parent['g_office_add_l2']=self.refs.g_office_add_l2.value
    	parent['g_office_city']=self.refs.g_office_city.value
    	parent['g_office_zip']=self.refs.g_office_zip.value
    	parent['g_office_state']=self.refs.g_office_state.value
    	parent['g_office_country']=self.refs.g_office_country.value
    	parent['g_office_phone']=self.refs.g_office_phone.value
    	parent['g_school_exam_passed']=self.refs.g_qualification.value
    	parent['g_college_exam_passed']=self.refs.g_other_qualification.value
    	parent['g_add_l1']=self.refs.g_add_l1.value
    	parent['g_add_l2']=self.refs.g_add_l2.value
    	parent['g_city']=self.refs.g_city.value
    	parent['g_zip']=self.refs.g_zip.value
    	parent['g_state']=self.refs.g_state.value
    	parent['g_country']=self.refs.g_country.value
    	parent['g_phone']=self.refs.g_phone.value
    	parent['g_mobile']=self.refs.g_mobile.value
    	parent['g_email']=self.refs.g_email.value
    	parent['g_nationality']=self.refs.g_nationality.value
    	parent['g_relation']=self.refs.g_relation.value

    	parent['first_child_name']=self.refs.first_child_name.value
    	parent['first_child_age']=self.refs.first_child_age.value
    	parent['first_child_class']=self.refs.first_child_class.value
    	parent['first_child_section']=self.refs.first_child_section.value
    	parent['first_enrol']=self.refs.first_enrol.value
    	parent['first_child_school']=self.refs.first_child_school.value

    	parent['second_child_name']=self.refs.second_child_name.value
    	parent['second_child_age']=self.refs.second_child_age.value
    	parent['second_child_class']=self.refs.second_child_class.value
    	parent['second_child_section']=self.refs.second_child_section.value
    	parent['second_enrol']=self.refs.second_enrol.value
    	parent['second_child_school']=self.refs.second_child_school.value

    	parent['third_child_name']=self.refs.third_child_name.value
    	parent['third_child_age']=self.refs.third_child_age.value
    	parent['third_child_class']=self.refs.third_child_class.value
    	parent['third_child_section']=self.refs.third_child_section.value
    	parent['third_enrol']=self.refs.third_enrol.value
    	parent['third_child_school']=self.refs.third_child_school.value

    	parent['fourth_child_name']=self.refs.fourth_child_name.value
    	parent['fourth_child_age']=self.refs.fourth_child_age.value
    	parent['fourth_child_class']=self.refs.fourth_child_class.value
    	parent['fourth_child_section']=self.refs.fourth_child_section.value
    	parent['fourth_enrol']=self.refs.fourth_enrol.value
    	parent['fourth_child_school']=self.refs.fourth_child_school.value

    	if($('#music').prop('checked') == true){
    		parent['music'] = 1
    	}else{
    		parent['music'] = 0
    	}

    	if($('#sports').prop('checked') == true){
    		parent['sports'] = 1
    	}else{
    		parent['sports'] = 0
    	}

    	if($('#social').prop('checked') == true){
    		parent['social'] = 1
    	}else{
    		parent['social'] = 0
    	}

    	if($('#media').prop('checked') == true){
    		parent['media'] = 1
    	}else{
    		parent['media'] = 0
    	}

    	if($('#academic').prop('checked') == true){
    		parent['academic'] = 1
    	}else{
    		parent['academic'] = 0
    	}

    	if($('#community').prop('checked') == true){
    		parent['community'] = 1
    	}else{
    		parent['community'] = 0
    	}

    	if($('#painting').prop('checked') == true){
    		parent['painting'] = 1
    	}else{
    		parent['painting'] = 0
    	}

    	if($('#information').prop('checked') == true){
    		parent['information'] = 1
    	}else{
    		parent['information'] = 0
    	}

    	if($('#hr_training').prop('checked') == true){
    		parent['hr_training'] = 1
    	}else{
    		parent['hr_training'] = 0
    	}

    	if($('#medical').prop('checked') == true){
    		parent['medical'] = 1
    	}else{
    		parent['medical'] = 0
    	}

    	if($('#career').prop('checked') == true){
    		parent['career'] = 1
    	}else{
    		parent['career'] = 0
    	}

    	if($('#communication').prop('checked') == true){
    		parent['communication'] = 1
    	}else{
    		parent['communication'] = 0
    	}

    	if($('#med').prop('checked') == true){
    		parent['med'] = 1
    	}else{
    		parent['med'] = 0
    	}

    	if($('#bed').prop('checked') == true){
    		parent['bed'] = 1
    	}else{
    		parent['bed'] = 0
    	}

    	if($('#ttc').prop('checked') == true){
    		parent['ttc'] = 1
    	}else{
    		parent['ttc'] = 0
    	}

    	if($('#montessori').prop('checked') == true){
    		parent['montessori'] = 1
    	}else{
    		parent['montessori'] = 0
    	}

    	obj['parent']=parent
    	
    	studentStore.trigger('add_student', obj)
    }

    self.edit = (c,st) => {
      console.log(c)
      self.student_id = c
      flatpickr(".date", {
    	allowInput: true,
    	altFormat: "d/m/Y",
    	dateFormat: "Y-m-d",
  		})
      studentStore.trigger('read_for_edit_student',self.student_id)
      self.add_new_student()
      self.title='Update'
      
    }

    studentStore.on('read_standard_changed',StandardChanged)
    function StandardChanged(standards){
      console.log(standards) 
      self.standards = standards
      self.update()
    }

    studentStore.on('read_section_changed',SectionChanged)
    function SectionChanged(sections){
      console.log(sections) 
      self.sections = sections
      self.update()
      self.getReadSection()
    }

    studentStore.on('read_house_changed',HouseChanged)
    function HouseChanged(houses){
      console.log(houses) 
      self.houses = houses
      self.update()
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

    studentStore.on('read_student_changed',StudentChanged)
    function StudentChanged(students){
      console.log(students) 
      self.students = students
      self.update()
    }

    studentStore.on('add_student_changed',AddStudentChanged)
    function AddStudentChanged(students){
      console.log(students) 
      self.students = students
      self.update()
    }

    studentStore.on('read_for_edit_student_changed',ReadForEditStudentChanged)
    function ReadForEditStudentChanged(student_details){
     	console.log(student_details) 
      	flatpickr(".date", {
    		allowInput: true,
    		altFormat: "d/m/Y",
    		dateFormat: "Y-m-d",
  		})
      	self.student_details = student_details
      	self.refs.first_name.value = student_details[0].first_name
      	self.refs.middle_name.value = student_details[0].middle_name
      	self.refs.last_name.value = student_details[0].last_name
      	self.refs.standard_id.value = student_details[0].standard_id
      	self.filteredSections = []
    	self.filteredSections = self.sections.filter(s => {
    		return s.standard_id == student_details[0].standard_id
    	})
    	self.refs.house_id.value = student_details[0].house_id
    	self.refs.enroll_number.value = student_details[0].enroll_number
		self.refs.roll_number.value = student_details[0].roll_number
		self.refs.reg_number.value = student_details[0].reg_number
		self.refs.gender.value = student_details[0].gender
		self.refs.category_id.value = student_details[0].category_id
		self.refs.dob.value = student_details[0].edit_dob
		self.refs.blood_group.value = student_details[0].blood_group
		self.refs.p_add_l1.value = student_details[0].p_add_l1
		self.refs.p_add_l2.value = student_details[0].p_add_l2
		self.refs.p_city.value = student_details[0].p_city
		self.refs.p_zip.value = student_details[0].p_zip
		self.refs.p_state.value = student_details[0].p_state
		self.refs.p_country.value = student_details[0].p_country
		
		if(student_details[0].is_permanent == 1){
			$('#correspondenceCheckbox').prop('checked', true)
		}
		else{
			$('#correspondenceCheckbox').prop('checked', false)
		}
		self.refs.c_add_l1.value=student_details[0].c_add_l1
    	self.refs.c_add_l2.value=student_details[0].c_add_l2
    	self.refs.c_city.value=student_details[0].c_city
    	self.refs.c_zip.value=student_details[0].c_zip
    	self.refs.c_state.value=student_details[0].c_state
    	self.refs.c_country.value=student_details[0].c_country

		self.refs.mobile.value = student_details[0].mobile
		self.refs.emergency_no.value = student_details[0].fax
		self.refs.student_type.value = student_details[0].student_type
		self.refs.aadhar_no.value = student_details[0].aadhar_no
		self.refs.doa.value = student_details[0].edit_doa
		self.refs.old_doa.value = student_details[0].edit_old_doa
		self.refs.doj.value = student_details[0].edit_doj
		self.refs.old_doj.value = student_details[0].edit_old_doj
		self.refs.mother_tongue.value = student_details[0].mother_tongue
		self.refs.last_school.value = student_details[0].last_school
		self.refs.last_class.value = student_details[0].last_class
		self.refs.admission_for_class.value = student_details[0].admission_for_class
		self.refs.hobby.value = student_details[0].hobby
		self.refs.cast.value = student_details[0].cast
		self.refs.religion_id.value = student_details[0].religion_id
		self.refs.staff_child.value = student_details[0].staff_child
		if(self.refs.staff_child.value == "Y"){
    		self.staff_name = true
    	}else{
    		self.staff_name = false
    	}
    	self.refs.f_title.value = student_details[0].f_title
		self.refs.f_name.value = student_details[0].f_name
		self.refs.f_occupation.value = student_details[0].f_occupation
		self.refs.f_organisation_type.value = student_details[0].f_organisation_type
		self.refs.f_annual_income.value = student_details[0].f_annual_income
		self.refs.f_work_profile.value = student_details[0].f_work_profile
		self.refs.f_organisation_name.value = student_details[0].f_organisation_name
		self.refs.f_designation.value = student_details[0].f_designation
		self.refs.f_department.value = student_details[0].f_department
		self.refs.f_office_add_l1.value = student_details[0].f_office_add_l1
		self.refs.f_office_add_l2.value = student_details[0].f_office_add_l2
		self.refs.f_office_city.value = student_details[0].f_office_city
		self.refs.f_office_zip.value = student_details[0].f_office_zip
		self.refs.f_office_state.value = student_details[0].f_office_state
		self.refs.f_office_country.value = student_details[0].f_office_country
		self.refs.f_office_phone.value = student_details[0].f_office_phone
		self.refs.f_qualification.value = student_details[0].f_school_exam_passed
		self.refs.f_other_qualification.value = student_details[0].f_college_exam_passed
		self.refs.f_mobile.value = student_details[0].f_mobile
		self.refs.f_email.value = student_details[0].f_email
		self.refs.f_nationality.value = student_details[0].f_nationality

    	if(student_details[0].is_caddress == 1){
			$('#fatherCorrespondenceCheckbox').prop('checked', true)
		}
		else{
			$('#fatherCorrespondenceCheckbox').prop('checked', false)
		}
		self.refs.f_add_l1.value=student_details[0].f_add_l1
		self.refs.f_add_l2.value=student_details[0].f_add_l2
		self.refs.f_city.value=student_details[0].f_city
		self.refs.f_zip.value=student_details[0].f_zip
		self.refs.f_state.value=student_details[0].f_state
		self.refs.f_country.value=student_details[0].f_country

		self.refs.m_title.value = student_details[0].m_title
		self.refs.m_name.value = student_details[0].m_name
		self.refs.m_occupation.value = student_details[0].m_occupation
		self.refs.m_organisation_type.value = student_details[0].m_organisation_type
		self.refs.m_annual_income.value = student_details[0].m_annual_income
		self.refs.m_work_profile.value = student_details[0].m_work_profile
		self.refs.m_organisation_name.value = student_details[0].m_organisation_name
		self.refs.m_designation.value = student_details[0].m_designation
		self.refs.m_department.value = student_details[0].m_department
		self.refs.m_office_add_l1.value = student_details[0].m_office_add_l1
		self.refs.m_office_add_l2.value = student_details[0].m_office_add_l2
		self.refs.m_office_city.value = student_details[0].m_office_city
		self.refs.m_office_zip.value = student_details[0].m_office_zip
		self.refs.m_office_state.value = student_details[0].m_office_state
		self.refs.m_office_country.value = student_details[0].m_office_country
		self.refs.m_office_phone.value = student_details[0].m_office_phone
		self.refs.m_qualification.value = student_details[0].m_school_exam_passed
		self.refs.m_other_qualification.value = student_details[0].m_college_exam_passed

		if(student_details[0].is_motherAdd == 1){
			$('#motherCorrespondenceCheckbox').prop('checked', true)
		}
		else{
			$('#motherCorrespondenceCheckbox').prop('checked', false)
		}

		self.refs.m_add_l1.value = student_details[0].m_add_l1
		self.refs.m_add_l2.value = student_details[0].m_add_l2
		self.refs.m_city.value = student_details[0].m_city
		self.refs.m_zip.value = student_details[0].m_zip
		self.refs.m_state.value = student_details[0].m_state
		self.refs.m_country.value = student_details[0].m_country
		self.refs.m_mobile.value = student_details[0].m_mobile
		self.refs.m_email.value = student_details[0].m_email
		self.refs.m_nationality.value = student_details[0].m_nationality

		if(student_details[0].is_guardian == 'Father'){
			self.refs.is_guardian.value = 'Father'
		}else if(student_details[0].is_guardian == 'Father'){
			self.refs.is_guardian.value = 'Mother'
		}else{
			self.refs.is_guardian.value = 'Other'
		}
		self.refs.g_title.value = student_details[0].g_title
		self.refs.g_name.value = student_details[0].g_name
		self.refs.g_occupation.value = student_details[0].g_occupation
		self.refs.g_organisation_type.value = student_details[0].g_organisation_type
		self.refs.g_annual_income.value = student_details[0].g_annual_income
		self.refs.g_work_profile.value = student_details[0].g_work_profile
		self.refs.g_organisation_name.value = student_details[0].g_organisation_name
		self.refs.g_designation.value = student_details[0].g_designation
		self.refs.g_department.value = student_details[0].g_department
		self.refs.g_office_add_l1.value = student_details[0].g_office_add_l1
		self.refs.g_office_add_l2.value = student_details[0].g_office_add_l2
		self.refs.g_office_city.value = student_details[0].g_office_city
		self.refs.g_office_zip.value = student_details[0].g_office_zip
		self.refs.g_office_state.value = student_details[0].g_office_state
		self.refs.g_office_country.value = student_details[0].g_office_country
		self.refs.g_office_phone.value = student_details[0].g_office_phone
		self.refs.g_qualification.value = student_details[0].g_school_exam_passed
		self.refs.g_other_qualification.value = student_details[0].g_college_exam_passed
		self.refs.g_add_l1.value = student_details[0].g_add_l1
		self.refs.g_add_l2.value = student_details[0].g_add_l2
		self.refs.g_city.value = student_details[0].g_city
		self.refs.g_zip.value = student_details[0].g_zip
		self.refs.g_state.value = student_details[0].g_state
		self.refs.g_country.value = student_details[0].g_country
		self.refs.g_phone.value = student_details[0].g_phone
		self.refs.g_mobile.value = student_details[0].g_mobile
		self.refs.g_email.value = student_details[0].g_email
		self.refs.g_nationality.value = student_details[0].g_nationality
		self.refs.g_relation.value = student_details[0].g_relation

		self.refs.first_child_name.value = student_details[0].first_child_name
		self.refs.first_child_age.value = student_details[0].first_child_age
		self.refs.first_child_class.value = student_details[0].first_child_class
		self.refs.first_child_section.value = student_details[0].first_child_section
		self.refs.first_enrol.value = student_details[0].first_enrol
		self.refs.first_child_school.value = student_details[0].first_child_school
		self.refs.second_child_name.value = student_details[0].second_child_name
		self.refs.second_child_age.value = student_details[0].second_child_age
		self.refs.second_child_class.value = student_details[0].second_child_class
		self.refs.second_child_section.value = student_details[0].second_child_section
		self.refs.second_enrol.value = student_details[0].second_enrol
		self.refs.second_child_school.value = student_details[0].second_child_school
		self.refs.third_child_name.value = student_details[0].third_child_name
		self.refs.third_child_age.value = student_details[0].third_child_age
		self.refs.third_child_class.value = student_details[0].third_child_class
		self.refs.third_child_section.value = student_details[0].third_child_section
		self.refs.third_enrol.value = student_details[0].third_enrol
		self.refs.third_child_school.value = student_details[0].third_child_school
		self.refs.fourth_child_name.value = student_details[0].fourth_child_name
		self.refs.fourth_child_age.value = student_details[0].fourth_child_age
		self.refs.fourth_child_class.value = student_details[0].fourth_child_class
		self.refs.fourth_child_section.value = student_details[0].fourth_child_section
		self.refs.fourth_enrol.value = student_details[0].fourth_enrol
		self.refs.fourth_child_school.value = student_details[0].fourth_child_school


		if(student_details[0].music == 1){
			$('#music').prop('checked', true)
		}
		else{
			$('#music').prop('checked', false)
		}

		if(student_details[0].sports == 1){
			$('#sports').prop('checked', true)
		}
		else{
			$('#sports').prop('checked', false)
		}

		if(student_details[0].social == 1){
			$('#social').prop('checked', true)
		}
		else{
			$('#social').prop('checked', false)
		}

		if(student_details[0].media == 1){
			$('#media').prop('checked', true)
		}
		else{
			$('#media').prop('checked', false)
		}

		if(student_details[0].academic == 1){
			$('#academic').prop('checked', true)
		}
		else{
			$('#academic').prop('checked', false)
		}

		if(student_details[0].community == 1){
			$('#community').prop('checked', true)
		}
		else{
			$('#community').prop('checked', false)
		}

		if(student_details[0].painting == 1){
			$('#painting').prop('checked', true)
		}
		else{
			$('#painting').prop('checked', false)
		}

		if(student_details[0].information == 1){
			$('#information').prop('checked', true)
		}
		else{
			$('#information').prop('checked', false)
		}

		if(student_details[0].hr_training == 1){
			$('#hr_training').prop('checked', true)
		}
		else{
			$('#hr_training').prop('checked', false)
		}

		if(student_details[0].medical == 1){
			$('#medical').prop('checked', true)
		}
		else{
			$('#medical').prop('checked', false)
		}

		if(student_details[0].career == 1){
			$('#career').prop('checked', true)
		}
		else{
			$('#career').prop('checked', false)
		}

		if(student_details[0].communication == 1){
			$('#communication').prop('checked', true)
		}
		else{
			$('#communication').prop('checked', false)
		}

		if(student_details[0].med == 1){
			$('#med').prop('checked', true)
		}
		else{
			$('#med').prop('checked', false)
		}

		if(student_details[0].bed == 1){
			$('#bed').prop('checked', true)
		}
		else{
			$('#bed').prop('checked', false)
		}

		if(student_details[0].ttc == 1){
			$('#ttc').prop('checked', true)
		}
		else{
			$('#ttc').prop('checked', false)
		}

		if(student_details[0].montessori == 1){
			$('#montessori').prop('checked', true)
		}
		else{
			$('#montessori').prop('checked', false)
		}

		self.refs.transport_mode.value = student_details[0].transport_mode
		self.refs.school_distance.value = student_details[0].school_distance
		self.refs.differently_abled.value = student_details[0].differently_abled

		self.update()
		self.refs.staff_name.value = student_details[0].staff_name
        self.refs.section_id.value = student_details[0].section_id

    }
</script>
</student>