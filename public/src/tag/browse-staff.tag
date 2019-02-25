<browse-staff>
    <print-header></print-header> 
      <loading-bar if={loading}></loading-bar>
	<section class=" is-fluid">
        <h2 class="title has-text-centered printOnly_t" style="color: #ff3860;">Employee Details</h2>
		<div class="level">
			<div class="level-left no-print">
				<h2 class="title  has-text-centered" style="color: #ff3860;">Employee Browser</h2>
			</div>
		</div>
		<div class="box no-print">
			<div class="columns">
				<div class="column ">
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
              
			    <div class="column">
                      <button class="button is-primary has-text-weight-bold is-pulled-right is-small" onclick="window.print()" title="Print">
                    <span class="icon">
                       <i class="fas fa-print"></i>
                   </span>
                  </button>
                  <button class="button is-warning is-rounded is-pulled-right is-small" onclick={ReadBrowseStaff} style="margin-left:5px;margin-right:5px">
                  <span class="icon">
                    <span class="fas fa-sync-alt"></span>
                  </span>
                  </button>
					<button class="button is-small  has-text-weight-bold is-pulled-right"
					onclick={showStaffField}>Setting
					</button>
			    </div> 
			</div>
		</div>
		<table class="table is-fullwidth is-striped is-hoverable is-narrow">
			<thead>
				<tr>
					<th>#</th>
					    <th show={view_title='show_title'}>title</th>
    <th show={view_first_name=='show_first_name'}>first_name</th>
    <th show={view_middle_name=='show_middle_name'}>middle_name</th>
    <th show={view_last_name=='show_last_name'}>last_name</th>
    <th show={view_employee_id=='show_employee_id'}>employee_id</th>
    <th show={view_short_name=='show_short_name'}>short_name</th>
    <th show={view_marital_status=='show_marital_status'}>marital_status</th>
    <th show={view_father_name=='show_father_name'}>father_name</th>
    <th show={view_spouse=='show_spouse'}>spouse</th>  
    <th show={view_blood_group=='show_blood_group'}>blood_group</th>
    <th show={view_religion_id=='show_religion_id'}>religion_id</th>
    <th show={view_language=='show_language'}>language</th>
    <th show={view_emp_type_id=='show_emp_type_id'}>emp_type_id</th>
    <th show={view_department_id=='show_department_id'}>department_id</th>
    <th show={view_employment_status_id=='show_employment_status_id'}>employment_status_id</th>
    <th show={view_subject_id=='show_subject_id'}>subject_id</th>
    <th show={view_designation_id=='show_designation_id'}>designation_id</th>
    <th show={view_qualification=='show_qualification'}>qualification</th>
    <th show={view_doj=='show_doj'}>doj</th>
    <th show={view_dob=='show_dob'}>dob</th>
    <th show={view_add_l1=='show_add_l1'}>add_l1</th>
    <th show={view_city=='show_city'}>city</th>
    <th show={view_zip=='show_zip'}>zip</th>
    <th show={view_state=='show_state'}>state</th>
    <th show={view_country=='show_country'}>country</th>
    <th show={view_residence_phone=='show_residence_phone'}>residence_phone</th>
    <th show={view_office_phone=='show_office_phone'}>office_phone</th>
    <th show={view_mobile=='show_mobile'}>mobile</th>
    <th show={view_email=='show_email'}>email</th>
    <th show={view_nationality=='show_nationality'}>nationality</th>
    <th show={view_x_subject=='show_x_subject'}>x_subject</th>
    <th show={view_x_institution=='show_x_institution'}>x_institution</th>
    <th show={view_x_board=='show_x_board'}>x_board</th>
    <th show={view_x_yop=='show_x_yop'}>x_yop</th>
    <th show={view_x_marks=='show_x_marks'}>x_marks</th>
    <th show={view_x_div=='show_x_div'}>x_div</th>
    <th show={view_xii_subject=='show_xii_subject'}>xii_subject</th>
    <th show={view_xii_institution=='show_xii_institution'}>xii_institution</th>
    <th show={view_xii_board=='show_xii_board'}>xii_board</th>
    <th show={view_xii_yop=='show_xii_yop'}>xii_yop</th>
    <th show={view_xii_marks=='show_xii_marks'}>xii_marks</th>
    <th show={view_xii_div=='show_xii_div'}>xii_div</th>
    <th show={view_ug_course=='show_ug_course'}>ug_course</th>
    <th show={view_ug_institution=='show_ug_institution'}>ug_institution</th>
    <th show={view_ug_university=='show_ug_university'}>ug_university</th>
    <th show={view_ug_yop=='show_ug_yop'}>ug_yop</th>
    <th show={view_ug_marks=='show_ug_marks'}>ug_marks</th>
    <th show={view_ug_div=='show_ug_div'}>ug_div</th>
    <th show={view_pg_course=='show_pg_course'}>pg_course</th>
    <th show={view_pg_institution=='show_pg_institution'}>pg_institution</th>
    <th show={view_pg_university=='show_pg_university'}>pg_university</th>
    <th show={view_pg_yop=='show_pg_yop'}>pg_yop</th>
    <th show={view_pg_marks=='show_pg_marks'}>pg_marks</th>
    <th show={view_pg_div=='show_pg_div'}>pg_div</th>
    <th show={view_bed_stream=='show_bed_stream'}>bed_stream</th>
    <th show={view_bed_institution=='show_bed_institution'}>bed_institution</th>
    <th show={view_bed_university=='show_bed_university'}>bed_university</th>
    <th show={view_bed_yop=='show_bed_yop'}>bed_yop</th>
    <th show={view_bed_marks=='show_bed_marks'}>bed_marks</th>
    <th show={view_bed_div=='show_bed_div'}>bed_div</th>
    <th show={view_bt_stream=='show_bt_stream'}>bt_stream</th>
    <th show={view_bt_institution=='show_bt_institution'}>bt_institution</th>
    <th show={view_bt_university=='show_bt_university'}>bt_university</th>
    <th show={view_bt_yop=='show_bt_yop'}>bt_yop</th>
    <th show={view_bt_marks=='show_bt_marks'}>bt_marks</th>
    <th show={view_bt_div=='show_bt_div'}>bt_div</th>
    <th show={view_bped_stream=='show_bped_stream'}>bped_stream</th>
    <th show={view_bped_institution=='show_bped_institution'}>bped_institution</th>
    <th show={view_bped_university=='show_bped_university'}>bped_university</th>
    <th show={view_bped_yop=='show_bped_yop'}>bped_yop</th>
    <th show={view_bped_marks=='show_bped_marks'}>bped_marks</th>
    <th show={view_bped_div=='show_bped_div'}>bped_div</th>
    <th show={view_dped_stream=='show_dped_stream'}>dped_stream</th>
    <th show={view_dped_institution=='show_dped_institution'}>dped_institution</th>
    <th show={view_dped_university=='show_dped_university'}>dped_university</th>
    <th show={view_dped_yop=='show_dped_yop'}>dped_yop</th>
    <th show={view_dped_marks=='show_dped_marks'}>dped_marks</th>
    <th show={view_dped_div=='show_dped_div'}>dped_div</th>
    <th show={view_mped_stream=='show_mped_stream'}>mped_stream</th>
    <th show={view_mped_institution=='show_mped_institution'}>mped_institution</th>
    <th show={view_mped_university=='show_mped_university'}>mped_university</th>
    <th show={view_mped_yop=='show_mped_yop'}>mped_yop</th>
    <th show={view_mped_marks=='show_mped_marks'}>mped_marks</th>
    <th show={view_mped_div=='show_mped_div'}>mped_div</th>
    <th show={view_med_stream=='show_med_stream'}>med_stream</th>
    <th show={view_med_institution=='show_med_institution'}>med_institution</th>
    <th show={view_med_university=='show_med_university'}>med_university</th>
    <th show={view_med_yop=='show_med_yop'}>med_yop</th>
    <th show={view_med_marks=='show_med_marks'}>med_marks</th>
    <th show={view_med_div=='show_med_div'}>med_div</th>
    <th show={view_mphil_stream=='show_mphil_stream'}>mphil_stream</th>
    <th show={view_mphil_institution=='show_mphil_institution'}>mphil_institution</th>
    <th show={view_mphil_university=='show_mphil_university'}>mphil_university</th>
    <th show={view_mphil_yop=='show_mphil_yop'}>mphil_yop</th>
    <th show={view_mphil_marks=='show_mphil_marks'}>mphil_marks</th>
    <th show={view_mphil_div=='show_mphil_div'}>mphil_div</th>
    <th show={view_phd_stream=='show_phd_stream'}>phd_stream</th>
    <th show={view_phd_institution=='show_phd_institution'}>phd_institution</th>
    <th show={view_phd_university=='show_phd_university'}>phd_university</th>
    <th show={view_phd_yop=='show_phd_yop'}>phd_yop</th>
    <th show={view_phd_marks=='show_phd_marks'}>phd_marks</th>
    <th show={view_phd_div=='show_phd_div'}>phd_div</th>
    <th show={view_other_stream=='show_other_stream'}>other_stream</th>
    <th show={view_other_institution=='show_other_institution'}>other_institution</th>
    <th show={view_other_university=='show_other_university'}>other_university</th>
    <th show={view_other_yop=='show_other_yop'}>other_yop</th>
    <th show={view_other_marks=='show_other_marks'}>other_marks</th>
    <th show={view_other_div=='show_other_div'}>other_div</th>
    <th show={view_details_scholarship=='show_details_scholarship'}>details_scholarship</th>
    <th show={view_details_honours=='show_details_honours'}>details_honours</th>
    <th show={view_details_publication=='show_details_publication'}>details_publication</th>
    <th show={view_details_curricular_activities=='show_details_curricular_activities'}>
    	details_curricular_activities
    </th>
    <th show={view_details_sport=='show_details_sport'}>details_sport</th>
					<!-- <th show={view_employee_id ==='show_employee_id'}>Emp ID</th>
					<th show={view_first_name ==='show_first_name'}>First Name</th>
					<th show={view_middle_name ==='show_middle_name'}>Middle Name</th>
					<th show={view_last_name ==='show_last_name'}>Last Name</th>
					<th show={view_city ==='show_city'}>City</th>
					<th show={view_office_phone ==='show_office_phone'}>Office Phone</th>
					<th show={view_mobile ==='show_mobile'}>Mobile</th>
					<th show={view_email ==='show_email'}>Email</th> -->
				</tr>
			</thead>
			<tbody>
				<tr each={st, i in browseStaffs}>
					<td>{i+1}</td>
					    <td show={view_title=='show_title'}>{st.title}</td>
    <td show={view_first_name=='show_first_name'}>{st.first_name}</td>
    <td show={view_middle_name=='show_middle_name'}>{st.middle_name}</td>
    <td show={view_last_name=='show_last_name'}>{st.last_name}</td>
    <td show={view_employee_id=='show_employee_id'}>{st.employee_id}</td>
    <td show={view_short_name=='show_short_name'}>{st.short_name}</td>
    <td show={view_marital_status=='show_marital_status'}>{st.marital_status}</td>
    <td show={view_father_name=='show_father_name'}>{st.father_name}</td>
    <td show={view_spouse=='show_spouse'}>{st.spouse}</td>  
    <td show={view_blood_group=='show_blood_group'}>{st.blood_group}</td>
    <td show={view_religion_id=='show_religion_id'}>{st.religion_id}</td>
    <td show={view_language=='show_language'}>{st.language}</td>
    <td show={view_emp_type_id=='show_emp_type_id'}>{st.emp_type_id}</td>
    <td show={view_department_id=='show_department_id'}>{st.department_id}</td>
    <td show={view_employment_status_id=='show_employment_status_id'}>{st.employment_status_id}</td>
    <td show={view_subject_id=='show_subject_id'}>{st.subject_id}</td>
    <td show={view_designation_id=='show_designation_id'}>{st.designation_id}</td>
    <td show={view_qualification=='show_qualification'}>{st.qualification}</td>
    <td show={view_doj=='show_doj'}>{st.doj}</td>
    <td show={view_dob=='show_dob'}>{st.dob}</td>
    <td show={view_add_l1=='show_add_l1'}>{st.add_l1}</td>
    <td show={view_city=='show_city'}>{st.city}</td>
    <td show={view_zip=='show_zip'}>{st.zip}</td>
    <td show={view_state=='show_state'}>{st.state}</td>
    <td show={view_country=='show_country'}>{st.country}</td>
    <td show={view_residence_phone=='show_residence_phone'}>{st.residence_phone}</td>
    <td show={view_office_phone=='show_office_phone'}>{st.office_phone}</td>
    <td show={view_mobile=='show_mobile'}>{st.mobile}</td>
    <td show={view_email=='show_email'}>{st.email}</td>
    <td show={view_nationality=='show_nationality'}>{st.nationality}</td>
    <td show={view_x_subject=='show_x_subject'}>x_subject}</td>
    <td show={view_x_institution=='show_x_institution'}>{st.x_institution}</td>
    <td show={view_x_board=='show_x_board'}>{st.x_board}</td>
    <td show={view_x_yop=='show_x_yop'}>{st.x_yop}</td>
    <td show={view_x_marks=='show_x_marks'}>{st.x_marks}</td>
    <td show={view_x_div=='show_x_div'}>{st.x_div}</td>
    <td show={view_xii_subject=='show_xii_subject'}>{st.xii_subject}</td>
    <td show={view_xii_institution=='show_xii_institution'}>{st.xii_institution}</td>
    <td show={view_xii_board=='show_xii_board'}>{st.xii_board}</td>
    <td show={view_xii_yop=='show_xii_yop'}>{st.xii_yop}</td>
    <td show={view_xii_marks=='show_xii_marks'}>{st.xii_marks}</td>
    <td show={view_xii_div=='show_xii_div'}>{st.xii_div}</td>
    <td show={view_ug_course=='show_ug_course'}>{st.ug_course}</td>
    <td show={view_ug_institution=='show_ug_institution'}>{st.ug_institution}</td>
    <td show={view_ug_university=='show_ug_university'}>{st.ug_university}</td>
    <td show={view_ug_yop=='show_ug_yop'}>{st.ug_yop}</td>
    <td show={view_ug_marks=='show_ug_marks'}>{st.ug_marks}</td>
    <td show={view_ug_div=='show_ug_div'}>{st.ug_div}</td>
    <td show={view_pg_course=='show_pg_course'}>{st.pg_course}</td>
    <td show={view_pg_institution=='show_pg_institution'}>{st.pg_institution}</td>
    <td show={view_pg_university=='show_pg_university'}>{st.pg_university}</td>
    <td show={view_pg_yop=='show_pg_yop'}>{st.pg_yop}</td>
    <td show={view_pg_marks=='show_pg_marks'}>{st.pg_marks}</td>
    <td show={view_pg_div=='show_pg_div'}>{st.pg_div}</td>
    <td show={view_bed_stream=='show_bed_stream'}>{st.bed_stream}</td>
    <td show={view_bed_institution=='show_bed_institution'}>{st.bed_institution}</td>
    <td show={view_bed_university=='show_bed_university'}>{st.bed_university}</td>
    <td show={view_bed_yop=='show_bed_yop'}>{st.bed_yop}</td>
    <td show={view_bed_marks=='show_bed_marks'}>{st.bed_marks}</td>
    <td show={view_bed_div=='show_bed_div'}>{st.bed_div}</td>
    <td show={view_bt_stream=='show_bt_stream'}>{st.bt_stream}</td>
    <td show={view_bt_institution=='show_bt_institution'}>{st.bt_institution}</td>
    <td show={view_bt_university=='show_bt_university'}>{st.bt_university}</td>
    <td show={view_bt_yop=='show_bt_yop'}>{st.bt_yop}</td>
    <td show={view_bt_marks=='show_bt_marks'}>{st.bt_marks}</td>
    <td show={view_bt_div=='show_bt_div'}>{st.bt_div}</td>
    <td show={view_bped_stream=='show_bped_stream'}>{st.bped_stream}</td>
    <td show={view_bped_institution=='show_bped_institution'}>{st.bped_institution}</td>
    <td show={view_bped_university=='show_bped_university'}>{st.bped_university}</td>
    <td show={view_bped_yop=='show_bped_yop'}>{st.bped_yop}</td>
    <td show={view_bped_marks=='show_bped_marks'}>{st.bped_marks}</td>
    <td show={view_bped_div=='show_bped_div'}>{st.bped_div}</td>
    <td show={view_dped_stream=='show_dped_stream'}>{st.dped_stream}</td>
    <td show={view_dped_institution=='show_dped_institution'}>{st.dped_institution}</td>
    <td show={view_dped_university=='show_dped_university'}>{st.dped_university}</td>
    <td show={view_dped_yop=='show_dped_yop'}>{st.dped_yop}</td>
    <td show={view_dped_marks=='show_dped_marks'}>{st.dped_marks}</td>
    <td show={view_dped_div=='show_dped_div'}>{st.dped_div}</td>
    <td show={view_mped_stream=='show_mped_stream'}>{st.mped_stream}</td>
    <td show={view_mped_institution=='show_mped_institution'}>{st.mped_institution}</td>
    <td show={view_mped_university=='show_mped_university'}>{st.mped_university}</td>
    <td show={view_mped_yop=='show_mped_yop'}>{st.mped_yop}</td>
    <td show={view_mped_marks=='show_mped_marks'}>{st.mped_marks}</td>
    <td show={view_mped_div=='show_mped_div'}>{st.mped_div}</td>
    <td show={view_med_stream=='show_med_stream'}>{st.med_stream}</td>
    <td show={view_med_institution=='show_med_institution'}>{st.med_institution}</td>
    <td show={view_med_university=='show_med_university'}>{st.med_university}</td>
    <td show={view_med_yop=='show_med_yop'}>{st.med_yop}</td>
    <td show={view_med_marks=='show_med_marks'}>{st.med_marks}</td>
    <td show={view_med_div=='show_med_div'}>{st.med_div}</td>
    <td show={view_mphil_stream=='show_mphil_stream'}>{st.mphil_stream}</td>
    <td show={view_mphil_institution=='show_mphil_institution'}>{st.mphil_institution}</td>
    <td show={view_mphil_university=='show_mphil_university'}>{st.mphil_university}</td>
    <td show={view_mphil_yop=='show_mphil_yop'}>{st.mphil_yop}</td>
    <td show={view_mphil_marks=='show_mphil_marks'}>{st.mphil_marks}</td>
    <td show={view_mphil_div=='show_mphil_div'}>{st.mphil_div}</td>
    <td show={view_phd_stream=='show_phd_stream'}>{st.phd_stream}</td>
    <td show={view_phd_institution=='show_phd_institution'}>{st.phd_institution}</td>
    <td show={view_phd_university=='show_phd_university'}>{st.phd_university}</td>
    <td show={view_phd_yop=='show_phd_yop'}>{st.phd_yop}</td>
    <td show={view_phd_marks=='show_phd_marks'}>{st.phd_marks}</td>
    <td show={view_phd_div=='show_phd_div'}>{st.phd_div}</td>
    <td show={view_other_stream=='show_other_stream'}>{st.other_stream}</td>
    <td show={view_other_institution=='show_other_institution'}>{st.other_institution}</td>
    <td show={view_other_university=='show_other_university'}>{st.other_university}</td>
    <td show={view_other_yop=='show_other_yop'}>{st.other_yop}</td>
    <td show={view_other_marks=='show_other_marks'}>{st.other_marks}</td>
    <td show={view_other_div=='show_other_div'}>{st.other_div}</td>
    <td show={view_details_scholarship=='show_details_scholarship'}>{st.details_scholarship}</td>
    <td show={view_details_honours=='show_details_honours'}>{st.details_honours}</td>
    <td show={view_details_publication=='show_details_publication'}>{st.details_publication}</td>
    <td show={view_details_curricular_activities=='show_details_curricular_activities'}>
    	{st.details_curricular_activities}
    </td>
    <td show={view_details_sport=='show_details_sport'}>{st.details_sport}</td>
					<!-- <td show={view_employee_id =='show_employee_id'}>{st.employee_id}</td>
					<td show={view_first_name =='show_first_name'}>{st.first_name}</td>
					<td show={view_middle_name =='show_middle_name'}>{st.middle_name}</td>
					<td show={view_last_name =='show_last_name'}>{st.last_name}</td>
					<td show={view_city =='show_city'}>{st.city}</td>
					<td show={view_office_phone =='show_office_phone'}>{st.office_phone}</td>
					<td show={view_mobile =='show_mobile'}>{st.mobile}</td>
					<td  show={view_email =='show_email'}>{st.email}</td> -->
					
				</tr>
			</tbody>
		</table>
	</section>
	    <section>	
		  <div id="columnSetting" class="modal ">
		    <div class="modal-background"></div>
		    <div class="modal-card">
		      <header class="modal-card-head">
		        <p class="modal-card-title">Setting Configuaration</p>
		      </header>
		      <section class="modal-card-body">
		        <div class="columns">
		          <div class="column">
		            <div class="field">
		              <label class="label" for="role"></label>
		              <div class="control" each={st, i in fieldList}>
		                <input class="checkbox" type="checkbox" checked={st.done} id="{ 'addStaffName' + st.array_name}" 
                           onclick={addCheckedColumn.bind(this,st) }>{st.field_name}
		              </div>
		            </div>
		          </div>
		        </div>
		      </section>
		      <footer class="modal-card-foot">
		        <div class="control">
		            <input type="checkbox" id="checkAllCheckBox" 
			      onclick={selectAllCheckBox}> All
		        </div>
		        <button class="button" id="item-modal-close" onclick={closeCheckBoxModal}>Close</button>
		      </footer>
		    </div>
		  </div>
	</section>
<!-- End Other Information -->
<script>
	
	var self = this
    self.on("mount", function(){
    self.title='Add'
    self.fieldList=[
        {field_name : "title", array_name: "title"},
    	{field_name : "first_name", array_name: "first_name"},
    	{field_name : "middle_name", array_name: "middle_name"},
    	{field_name : "last_name", array_name: "last_name"},
    	{field_name : "employee_id", array_name: "employee_id"},
    	{field_name : "short_name", array_name: "short_name"},
    	{field_name : "marital_status", array_name: "marital_status"},
    	{field_name : "father_name", array_name: "father_name"},
    	{field_name : "spouse", array_name: "spouse"},
    	{field_name : "blood_group", array_name: "blood_group"},
    	{field_name : "religion_id", array_name: "religion_id"},
    	{field_name : "language", array_name: "language"},
    	{field_name : "emp_type_id", array_name: "emp_type_id"},
    	{field_name : "department_id", array_name: "department_id"},
    	{field_name : "employment_status_id", array_name: "employment_status_id"},
    	{field_name : "subject_id", array_name: "subject_id"},
    	{field_name : "designation_id", array_name: "designation_id"},
    	{field_name : "qualification", array_name: "qualification"},
    	{field_name : "doj" , array_name : "doj"},
    	{field_name : "dob" , array_name: "dob"},
    	{field_name : "add_l1", array_name: "add_l1"},
    	{field_name : "city", array_name: "city"},
    	{field_name : "zip", array_name: "zip"},
    	{field_name : "state", array_name: "state"},
    	{field_name : "country", array_name: "country"},
    	{field_name : "residence_phone", array_name: "residence_phone"},
    	{field_name : "office_phone", array_name: "office_phone"},
    	{field_name : "mobile", array_name: "mobile"},
    	{field_name : "email", array_name: "email"},
    	{field_name : "nationality", array_name: "nationality"},
    	{field_name : 'x_subject' , array_name : "x_subject"},
    	{field_name : 'x_institution' , array_name : "x_institution"},
    	{field_name : 'x_board' , array_name : "x_board"},
    	{field_name : 'x_yop' , array_name : "x_yop"},
    	{field_name : 'x_marks' , array_name : "x_marks"},
    	{field_name : 'x_div' , array_name : "x_div"},
    	{field_name : 'xii_subject' , array_name : "xii_subject"},
    	{field_name : 'xii_institution' , array_name : "xii_institution"},
    	{field_name : 'xii_board' , array_name : "xii_board"},
    	{field_name : 'xii_yop' , array_name : "xii_yop"},
    	{field_name : 'xii_marks' , array_name : "xii_marks"},
    	{field_name : 'xii_div' , array_name : "xii_div"},
    	{field_name : 'ug_course' , array_name : "ug_course"},
    	{field_name : 'ug_institution' , array_name : "ug_institution"},
    	{field_name : 'ug_university' , array_name : "ug_university"},
    	{field_name : 'ug_yop' , array_name : "ug_yop"},
    	{field_name : 'ug_marks' , array_name : "ug_marks"},
    	{field_name : 'ug_div' , array_name : "ug_div"},
    	{field_name : 'pg_course' , array_name : "pg_course"},
    	{field_name : 'pg_institution' , array_name : "pg_institution"},
    	{field_name : 'pg_university' , array_name : "pg_university"},
    	{field_name : 'pg_yop' , array_name : "pg_yop"},
    	{field_name : 'pg_marks' , array_name : "pg_marks"},
    	{field_name : 'pg_div' , array_name : "pg_div"},
    	{field_name : 'bed_stream' , array_name : "bed_stream"},
    	{field_name : 'bed_institution' , array_name : "bed_institution"},
    	{field_name : 'bed_university' , array_name : "bed_university"},
    	{field_name : 'bed_yop' , array_name : "bed_yop"},
    	{field_name : 'bed_marks' , array_name : "bed_marks"},
    	{field_name : 'bed_div' , array_name : "bed_div"},
    	{field_name : 'bt_stream' , array_name : "bt_stream"},
    	{field_name : 'bt_institution' , array_name : "bt_institution"},
    	{field_name : 'bt_university' , array_name : "bt_university"},
    	{field_name : 'bt_yop' , array_name : "bt_yop"},
    	{field_name : 'bt_marks' , array_name : "bt_marks"},
    	{field_name : 'bt_div' , array_name : "bt_div"},
    	{field_name : 'bped_stream' , array_name : "bped_stream"},
    	{field_name : 'bped_institution' , array_name : "bped_institution"},
    	{field_name : 'bped_university' , array_name : "bped_university"},
    	{field_name : 'bped_yop' , array_name : "bped_yop"},
    	{field_name : 'bped_marks' , array_name : "bped_marks"},
    	{field_name : 'bped_div' , array_name : "bped_div"},
    	{field_name : 'dped_stream' , array_name : "dped_stream"},
    	{field_name : 'dped_institution' , array_name : "dped_institution"},
    	{field_name : 'dped_university' , array_name : "dped_university"},
    	{field_name : 'dped_yop' , array_name : "dped_yop"},
    	{field_name : 'dped_marks' , array_name : "dped_marks"},
    	{field_name : 'dped_div' , array_name : "dped_div"},
    	{field_name : 'mped_stream' , array_name : "mped_stream"},
    	{field_name : 'mped_institution' , array_name : "mped_institution"},
    	{field_name : 'mped_university' , array_name : "mped_university"},
    	{field_name : 'mped_yop' , array_name : "mped_yop"},
    	{field_name : 'mped_marks' , array_name : "mped_marks"},
    	{field_name : 'mped_div' , array_name : "mped_div"},
    	{field_name : 'med_stream' , array_name : "med_stream"},
    	{field_name : 'med_institution' , array_name : "med_institution"},
    	{field_name : 'med_university' , array_name : "med_university"},
    	{field_name : 'med_yop' , array_name : "med_yop"},
    	{field_name : 'med_marks' , array_name : "med_marks"},
    	{field_name : 'med_div' , array_name : "med_div"},
    	{field_name : 'mphil_stream' , array_name : "mphil_stream"},
    	{field_name : 'mphil_institution' , array_name : "mphil_institution"},
    	{field_name : 'mphil_university' , array_name : "mphil_university"},
    	{field_name : 'mphil_yop' , array_name : "mphil_yop"},
    	{field_name : 'mphil_marks' , array_name : "mphil_marks"},
    	{field_name : 'mphil_div' , array_name : "mphil_div"},
    	{field_name : 'phd_stream' , array_name : "phd_stream"},
    	{field_name : 'phd_institution' , array_name : "phd_institution"},
    	{field_name : 'phd_university' , array_name : "phd_university"},
    	{field_name : 'phd_yop' , array_name : "phd_yop"},
    	{field_name : 'phd_marks' , array_name : "phd_marks"},
    	{field_name : 'phd_div' , array_name : "phd_div"},
    	{field_name : 'other_stream' , array_name : "other_stream"},
    	{field_name : 'other_institution' , array_name : "other_institution"},
    	{field_name : 'other_university' , array_name : "other_university"},
    	{field_name : 'other_yop' , array_name : "other_yop"},
    	{field_name : 'other_marks' , array_name : "other_marks"},
    	{field_name : 'other_div' , array_name : "other_div"},
    	{field_name : 'details_scholarship' , array_name : "details_scholarship"},
    	{field_name : 'details_honours' , array_name : "details_honours"},
    	{field_name : 'details_publication' , array_name : "details_publication"},
    	{field_name : 'details_curricular_activities' , array_name : "details_curricular_activities"},
    	{field_name : 'details_sport' , array_name : "details_sport"}
    ]

      //  for default true value

       self.fieldList.map( q => {
           
            if(q.array_name== "first_name"){
                    self.view_first_name="show_irst_name"    
                     q.done=true 
                }
            if(q.array_name== "middle_name"){
                    self.view_middle_name= "show_middle_name"
                     q.done=true 
                }
            if(q.array_name== "last_name"){
                    self.view_last_name= "show_last_name"
                    q.done=true 
                }
            if(q.array_name== "employee_id"){
                self.view_employee_id ="show_employee_id"
                q.done=true 
            }

             if(q.array_name== "office_phone"){
                self.view_office_phone ="show_office_phone"
                q.done=true 
            }
             if(q.array_name== "mobile"){
                self.view_mobile ="show_mobile"
                q.done=true 
            }
             if(q.array_name== "email"){
                self.view_email ="show_email"
                q.done=true 
            }
             
       })


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
    self.showStaffField = () =>{
       $("#columnSetting").addClass("is-active")
           
    }

    self.closeCheckBoxModal=()=>{
    	 $("#columnSetting").removeClass("is-active");
    }
    self.selectAllCheckBox = () => {
    	console.log("checkAlll")
      if($('#checkAllCheckBox').is(":checked")){
        self.fieldList.map(i=>{
        	console.log(i)
          i.done = true;
          $('addStaffName'+i.array_name).prop('checked', true);
        })
      }else{
        self.fieldList.map(i=>{
          i.done = false;
          $('addStaffName'+i.array_name).prop('checked', false);
        })
      }
      	var item=''
      	var event=''
       self.addCheckedColumn(item,event)
    }

self.addCheckedColumn = (item, event) => {
console.log(item)
 	if(item!=''){
	 item.done=!event.item.st.done
 	} 
self.fieldList.map( q => {
    console.log(q.field_name)
if(q.done==true && q.array_name== "title"){
        self.view_title= "show_title"
    }
if(q.done==true && q.array_name== "first_name"){
        self.view_first_name="show_irst_name"    
    }
if(q.done==true && q.array_name== "middle_name"){
        self.view_middle_name= "show_middle_name"
    }
if(q.done==true && q.array_name== "last_name"){
        self.view_last_name= "show_last_name"
    }
if(q.done==true && q.array_name== "employee_id"){
        self.view_employee_id ="show_employee_id"
    }
if(q.done==true && q.array_name== "short_name"){
        self.view_short_name= "show_short_name"
    }
if(q.done==true && q.array_name== "marital_status"){
        self.view_marital_status= "show_marital_status"  
    }
if(q.done==true && q.array_name== "father_name"){
    self.view_father_name= "show_father_name"

    }
if(q.done==true && q.array_name== "spouse"){
    self.view_spouse= "show_spouse"

    }
if(q.done==true && q.array_name== "blood_group"){
    self.view_blood_group= "show_blood_group"

    }
if(q.done==true && q.array_name== "religion_id"){
    self.view_religion_id= "show_religion_id"

    }
if(q.done==true && q.array_name== "language"){
    self.view_language= "show_language"

    }
if(q.done==true && q.array_name== "emp_type_id"){
    self.view_emp_type_id= "show_emp_type_id"

    }
if(q.done==true && q.array_name== "department_id"){
    self.view_department_id= "show_department_id"

    }
if(q.done==true && q.array_name== "employment_status_id"){
    self.view_employment_status_id= "show_employment_status_id"

    }
if(q.done==true && q.array_name== "subject_id"){
    self.view_subject_id= "show_subject_id"

    }
if(q.done==true && q.array_name== "designation_id"){
    self.view_designation_id= "show_designation_id"

    }
if(q.done==true && q.array_name== "qualification"){
    self.view_qualification= "show_qualification"

    }
if(q.done==true && q.array_name=="doj"){
    self.view_doj="show_doj"

    }
if(q.done==true && q.array_name=="dob"){
    self.view_dob="show_dob"

    }
if(q.done==true && q.array_name== "add_l1"){
    self.view_add_l1= "show_add_l1"

    }
if(q.done==true && q.array_name== "city"){
    self.view_city= "show_city"

    }
if(q.done==true && q.array_name== "zip"){
    self.view_zip= "show_zip"

    }
if(q.done==true && q.array_name== "state"){
    self.view_state= "show_state"

    }
if(q.done==true && q.array_name== "country"){
    self.view_country= "show_country"

    }
if(q.done==true && q.array_name== "residence_phone"){
    self.view_residence_phone= "show_residence_phone"

    }
if(q.done==true && q.array_name== "office_phone"){
    self.view_office_phone= "show_office_phone"

    }
if(q.done==true && q.array_name== "mobile"){
    self.view_mobile= "show_mobile"

    }
if(q.done==true && q.array_name== "email"){
    self.view_email= "show_email"

    }
if(q.done==true && q.array_name== "nationality"){
    self.view_nationality= "show_nationality"

    }
	if (q.done==true && q.array_name == "x_subject"){
        self.view_x_subject= "show_x_subject"
        
    }
	if (q.done==true && q.array_name == "x_institution"){
        self.view_x_institution= "show_x_institution"
        
    }
	if (q.done==true && q.array_name == "x_board"){
        self.view_x_board= "show_x_board"
        
    }
	if (q.done==true && q.array_name == "x_yop"){
        self.view_x_yop= "show_x_yop"
        
    }
	if (q.done==true && q.array_name == "x_marks"){
        self.view_x_marks= "show_x_marks"
        
    }
	if (q.done==true && q.array_name == "x_div"){
        self.view_x_div= "show_x_div"
        
    }
	if (q.done==true && q.array_name == "xii_subject"){
        self.view_xii_subject= "show_xii_subject"
        
    }
	if (q.done==true && q.array_name == "xii_institution"){
        self.view_xii_institution= "show_xii_institution"
        
    }
	if (q.done==true && q.array_name == "xii_board"){
        self.view_xii_board= "show_xii_board"
        
    }
	if (q.done==true && q.array_name == "xii_yop"){
        self.view_xii_yop= "show_xii_yop"
        
    }
	if (q.done==true && q.array_name == "xii_marks"){
        self.view_xii_marks= "show_xii_marks"
        
    }
	if (q.done==true && q.array_name == "xii_div"){
        self.view_xii_div= "show_xii_div"
        
    }
	if (q.done==true && q.array_name == "ug_course"){
        self.view_ug_course= "show_ug_course"
        
    }
	if (q.done==true && q.array_name == "ug_institution"){
        self.view_ug_institution= "show_ug_institution"
        
    }
	if (q.done==true && q.array_name == "ug_university"){
        self.view_ug_university= "show_ug_university"
        
    }
	if (q.done==true && q.array_name == "ug_yop"){
        self.view_ug_yop= "show_ug_yop"
        
    }
	if (q.done==true && q.array_name == "ug_marks"){
        self.view_ug_marks= "show_ug_marks"
        
    }
	if (q.done==true && q.array_name == "ug_div"){
        self.view_ug_div= "show_ug_div"
        
    }
	if (q.done==true && q.array_name == "pg_course"){
        self.view_pg_course= "show_pg_course"
        
    }
	if (q.done==true && q.array_name == "pg_institution"){
        self.view_pg_institution= "show_pg_institution"
        
    }
	if (q.done==true && q.array_name == "pg_university"){
        self.view_pg_university= "show_pg_university"
        
    }
	if (q.done==true && q.array_name == "pg_yop"){
        self.view_pg_yop= "show_pg_yop"
        
    }
	if (q.done==true && q.array_name == "pg_marks"){
        self.view_pg_marks= "show_pg_marks"
        
    }
	if (q.done==true && q.array_name == "pg_div"){
        self.view_pg_div= "show_pg_div"
        
    }
	if (q.done==true && q.array_name == "bed_stream"){
        self.view_bed_stream= "show_bed_stream"
        
    }
	if (q.done==true && q.array_name == "bed_institution"){
        self.view_bed_institution= "show_bed_institution"
        
    }
	if (q.done==true && q.array_name == "bed_university"){
        self.view_bed_university= "show_bed_university"
        
    }
	if (q.done==true && q.array_name == "bed_yop"){
        self.view_bed_yop= "show_bed_yop"
        
    }
	if (q.done==true && q.array_name == "bed_marks"){
        self.view_bed_marks= "show_bed_marks"
        
    }
	if (q.done==true && q.array_name == "bed_div"){
        self.view_bed_div= "show_bed_div"
        
    }
	if (q.done==true && q.array_name == "bt_stream"){
        self.view_bt_stream= "show_bt_stream"
        
    }
	if (q.done==true && q.array_name == "bt_institution"){
        self.view_bt_institution= "show_bt_institution"
        
    }
	if (q.done==true && q.array_name == "bt_university"){
        self.view_bt_university= "show_bt_university"
        
    }
	if (q.done==true && q.array_name == "bt_yop"){
        self.view_bt_yop= "show_bt_yop"
        
    }
	if (q.done==true && q.array_name == "bt_marks"){
        self.view_bt_marks= "show_bt_marks"
        
    }
	if (q.done==true && q.array_name == "bt_div"){
        self.view_bt_div= "show_bt_div"
        
    }
	if (q.done==true && q.array_name == "bped_stream"){
        self.view_bped_stream= "show_bped_stream"
        
    }
	if (q.done==true && q.array_name == "bped_institution"){
        self.view_bped_institution= "show_bped_institution"
        
    }
	if (q.done==true && q.array_name == "bped_university"){
        self.view_bped_university= "show_bped_university"
        
    }
	if (q.done==true && q.array_name == "bped_yop"){
        self.view_bped_yop= "show_bped_yop"
        
    }
	if (q.done==true && q.array_name == "bped_marks"){
        self.view_bped_marks= "show_bped_marks"
        
    }
	if (q.done==true && q.array_name == "bped_div"){
        self.view_bped_div= "show_bped_div"
        
    }
	if (q.done==true && q.array_name == "dped_stream"){
        self.view_dped_stream= "show_dped_stream"
        
    }
	if (q.done==true && q.array_name == "dped_institution"){
        self.view_dped_institution= "show_dped_institution"
        
    }
	if (q.done==true && q.array_name == "dped_university"){
        self.view_dped_university= "show_dped_university"
        
    }
	if (q.done==true && q.array_name == "dped_yop"){
        self.view_dped_yop= "show_dped_yop"
        
    }
	if (q.done==true && q.array_name == "dped_marks"){
        self.view_dped_marks= "show_dped_marks"
        
    }
	if (q.done==true && q.array_name == "dped_div"){
        self.view_dped_div= "show_dped_div"
        
    }
	if (q.done==true && q.array_name == "mped_stream"){
        self.view_mped_stream= "show_mped_stream"
        
    }
	if (q.done==true && q.array_name == "mped_institution"){
        self.view_mped_institution= "show_mped_institution"
        
    }
	if (q.done==true && q.array_name == "mped_university"){
        self.view_mped_university= "show_mped_university"
        
    }
	if (q.done==true && q.array_name == "mped_yop"){
        self.view_mped_yop= "show_mped_yop"
        
    }
	if (q.done==true && q.array_name == "mped_marks"){
        self.view_mped_marks= "show_mped_marks"
        
    }
	if (q.done==true && q.array_name == "mped_div"){
        self.view_mped_div= "show_mped_div"
        
    }
	if (q.done==true && q.array_name == "med_stream"){
        self.view_med_stream= "show_med_stream"
        
    }
	if (q.done==true && q.array_name == "med_institution"){
        self.view_med_institution= "show_med_institution"
        
    }
	if (q.done==true && q.array_name == "med_university"){
        self.view_med_university= "show_med_university"
        
    }
	if (q.done==true && q.array_name == "med_yop"){
        self.view_med_yop= "show_med_yop"
        
    }
	if (q.done==true && q.array_name == "med_marks"){
        self.view_med_marks= "show_med_marks"
        
    }
	if (q.done==true && q.array_name == "med_div"){
        self.view_med_div= "show_med_div"
        
    }
	if (q.done==true && q.array_name == "mphil_stream"){
        self.view_mphil_stream= "show_mphil_stream"
        
    }
	if (q.done==true && q.array_name == "mphil_institution"){
        self.view_mphil_institution= "show_mphil_institution"
        
    }
	if (q.done==true && q.array_name == "mphil_university"){
        self.view_mphil_university= "show_mphil_university"
        
    }
	if (q.done==true && q.array_name == "mphil_yop"){
        self.view_mphil_yop= "show_mphil_yop"
        
    }
	if (q.done==true && q.array_name == "mphil_marks"){
        self.view_mphil_marks= "show_mphil_marks"
        
    }
	if (q.done==true && q.array_name == "mphil_div"){
        self.view_mphil_div= "show_mphil_div"
        
    }
	if (q.done==true && q.array_name == "phd_stream"){
        self.view_phd_stream= "show_phd_stream"
        
    }
	if (q.done==true && q.array_name == "phd_institution"){
        self.view_phd_institution= "show_phd_institution"
        
    }
	if (q.done==true && q.array_name == "phd_university"){
        self.view_phd_university= "show_phd_university"
        
    }
	if (q.done==true && q.array_name == "phd_yop"){
        self.view_phd_yop= "show_phd_yop"
        
    }
	if (q.done==true && q.array_name == "phd_marks"){
        self.view_phd_marks= "show_phd_marks"
        
    }
	if (q.done==true && q.array_name == "phd_div"){
        self.view_phd_div= "show_phd_div"
        
    }
	if (q.done==true && q.array_name == "other_stream"){
        self.view_other_stream= "show_other_stream"
        
    }
	if (q.done==true && q.array_name == "other_institution"){
        self.view_other_institution= "show_other_institution"
        
    }
	if (q.done==true && q.array_name == "other_university"){
        self.view_other_university= "show_other_university"
        
    }
	if (q.done==true && q.array_name == "other_yop"){
        self.view_other_yop= "show_other_yop"
        
    }
	if (q.done==true && q.array_name == "other_marks"){
        self.view_other_marks= "show_other_marks"
        
    }
	if (q.done==true && q.array_name == "other_div"){
        self.view_other_div= "show_other_div"
        
    }
	if (q.done==true && q.array_name == "details_scholarship"){
        self.view_details_scholarship= "show_details_scholarship"
        
    }
	if (q.done==true && q.array_name == "details_honours"){
        self.view_details_honours= "show_details_honours"
        
    }
	if (q.done==true && q.array_name == "details_publication"){
        self.view_details_publication= "show_details_publication"
        
    }
	if (q.done==true && q.array_name == "details_curricular_activities"){
        self.view_details_curricular_activities= "show_details_curricular_activities"
        
    }
	if (q.done==true && q.array_name == "details_sport"){
        self.view_details_sport= "show_details_sport"
        
    } 

<!-- False Check Box-->

if(q.done==false && q.array_name== "title"){
        self.view_title= ""
}
if(q.done==false && q.array_name== "first_name"){
        self.view_first_name=""
    
    }
if(q.done==false && q.array_name== "middle_name"){
        self.view_middle_name= ""
    
    }
if(q.done==false && q.array_name== "last_name"){
        self.view_ast_name= ""
    
    }
if(q.done==false && q.array_name== "employee_id"){
        self.view_employee_id =""
    
    }
if(q.done==false && q.array_name== "short_name"){
        self.view_short_name= ""
    
    }
if(q.done==false && q.array_name== "marital_status"){
        self.view_marital_status= ""
    
    }
if(q.done==false && q.array_name== "father_name"){
    self.view_father_name= ""
    }
if(q.done==false && q.array_name== "spouse"){
    self.view_spouse= ""
    }
if(q.done==false && q.array_name== "blood_group"){
    self.view_blood_group= ""
    }
if(q.done==false && q.array_name== "religion_id"){
    self.view_religion_id= ""
    }
if(q.done==false && q.array_name== "language"){
    self.view_language= ""
    }
if(q.done==false && q.array_name== "emp_type_id"){
    self.view_emp_type_id= ""
    }
if(q.done==false && q.array_name== "department_id"){
    self.view_department_id= ""
    }
if(q.done==false && q.array_name== "employment_status_id"){
    self.view_employment_status_id= ""
    }
if(q.done==false && q.array_name== "subject_id"){
    self.view_subject_id= ""
    }
if(q.done==false && q.array_name== "designation_id"){
    self.view_designation_id= ""
    }
if(q.done==false && q.array_name== "qualification"){
    self.view_qualification= ""
    }
if(q.done==false && q.array_name=="doj"){
    self.view_doj=""
    }
if(q.done==false && q.array_name=="dob"){
    self.view_dob=""
    }
if(q.done==false && q.array_name== "add_l1"){
    self.view_add_l1= ""
    }
if(q.done==false && q.array_name== "city"){
    self.view_city= ""
    }
if(q.done==false && q.array_name== "zip"){
    self.view_zip= ""
    }
if(q.done==false && q.array_name== "state"){
    self.view_state= ""
    }
if(q.done==false && q.array_name== "country"){
    self.view_country= ""
    }
if(q.done==false && q.array_name== "residence_phone"){
    self.view_residence_phone= ""
    }
if(q.done==false && q.array_name== "office_phone"){
    self.view_office_phone= ""
    }
if(q.done==false && q.array_name== "mobile"){
    self.view_mobile= ""
    }
if(q.done==false && q.array_name== "email"){
    self.view_email= ""
    }
if(q.done==false && q.array_name== "nationality"){
    self.view_nationality= ""
    }
	if (q.done==false && q.array_name == "x_subject"){
        self.view_x_subject= ""
    
    }
	if (q.done==false && q.array_name == "x_institution"){
        self.view_x_institution= ""
    
    }
	if (q.done==false && q.array_name == "x_board"){
        self.view_x_board= ""
    
    }
	if (q.done==false && q.array_name == "x_yop"){
        self.view_x_yop= ""
    
    }
	if (q.done==false && q.array_name == "x_marks"){
        self.view_x_marks= ""
    
    }
	if (q.done==false && q.array_name == "x_div"){
        self.view_x_div= ""
    
    }
	if (q.done==false && q.array_name == "xii_subject"){
        self.view_xii_subject= ""
    
    }
	if (q.done==false && q.array_name == "xii_institution"){
        self.view_xii_institution= ""
    
    }
	if (q.done==false && q.array_name == "xii_board"){
        self.view_xii_board= ""
    
    }
	if (q.done==false && q.array_name == "xii_yop"){
        self.view_xii_yop= ""
    
    }
	if (q.done==false && q.array_name == "xii_marks"){
        self.view_xii_marks= ""
    
    }
	if (q.done==false && q.array_name == "xii_div"){
        self.view_xii_div= ""
    
    }
	if (q.done==false && q.array_name == "ug_course"){
        self.view_ug_course= ""
    
    }
	if (q.done==false && q.array_name == "ug_institution"){
        self.view_ug_institution= ""
    
    }
	if (q.done==false && q.array_name == "ug_university"){
        self.view_ug_university= ""
    
    }
	if (q.done==false && q.array_name == "ug_yop"){
        self.view_ug_yop= ""
    
    }
	if (q.done==false && q.array_name == "ug_marks"){
        self.view_ug_marks= ""
    
    }
	if (q.done==false && q.array_name == "ug_div"){
        self.view_ug_div= ""
    
    }
	if (q.done==false && q.array_name == "pg_course"){
        self.view_pg_course= ""
    
    }
	if (q.done==false && q.array_name == "pg_institution"){
        self.view_pg_institution= ""
    
    }
	if (q.done==false && q.array_name == "pg_university"){
        self.view_pg_university= ""
    
    }
	if (q.done==false && q.array_name == "pg_yop"){
        self.view_pg_yop= ""
    
    }
	if (q.done==false && q.array_name == "pg_marks"){
        self.view_pg_marks= ""
    
    }
	if (q.done==false && q.array_name == "pg_div"){
        self.view_pg_div= ""
    
    }
	if (q.done==false && q.array_name == "bed_stream"){
        self.view_bed_stream= ""
    
    }
	if (q.done==false && q.array_name == "bed_institution"){
        self.view_bed_institution= ""
    
    }
	if (q.done==false && q.array_name == "bed_university"){
        self.view_bed_university= ""
    
    }
	if (q.done==false && q.array_name == "bed_yop"){
        self.view_bed_yop= ""
    
    }
	if (q.done==false && q.array_name == "bed_marks"){
        self.view_bed_marks= ""
    
    }
	if (q.done==false && q.array_name == "bed_div"){
        self.view_bed_div= ""
    
    }
	if (q.done==false && q.array_name == "bt_stream"){
        self.view_bt_stream= ""
    
    }
	if (q.done==false && q.array_name == "bt_institution"){
        self.view_bt_institution= ""
    
    }
	if (q.done==false && q.array_name == "bt_university"){
        self.view_bt_university= ""
    
    }
	if (q.done==false && q.array_name == "bt_yop"){
        self.view_bt_yop= ""
    
    }
	if (q.done==false && q.array_name == "bt_marks"){
        self.view_bt_marks= ""
    
    }
	if (q.done==false && q.array_name == "bt_div"){
        self.view_bt_div= ""
    
    }
	if (q.done==false && q.array_name == "bped_stream"){
        self.view_bped_stream= ""
    
    }
	if (q.done==false && q.array_name == "bped_institution"){
        self.view_bped_institution= ""
    
    }
	if (q.done==false && q.array_name == "bped_university"){
        self.view_bped_university= ""
    
    }
	if (q.done==false && q.array_name == "bped_yop"){
        self.view_bped_yop= ""
    
    }
	if (q.done==false && q.array_name == "bped_marks"){
        self.view_bped_marks= ""
    
    }
	if (q.done==false && q.array_name == "bped_div"){
        self.view_bped_div= ""
    
    }
	if (q.done==false && q.array_name == "dped_stream"){
        self.view_dped_stream= ""
    
    }
	if (q.done==false && q.array_name == "dped_institution"){
        self.view_dped_institution= ""
    
    }
	if (q.done==false && q.array_name == "dped_university"){
        self.view_dped_university= ""
    
    }
	if (q.done==false && q.array_name == "dped_yop"){
        self.view_dped_yop= ""
    
    }
	if (q.done==false && q.array_name == "dped_marks"){
        self.view_dped_marks= ""
    
    }
	if (q.done==false && q.array_name == "dped_div"){
        self.view_dped_div= ""
    
    }
	if (q.done==false && q.array_name == "mped_stream"){
        self.view_mped_stream= ""
    
    }
	if (q.done==false && q.array_name == "mped_institution"){
        self.view_mped_institution= ""
    
    }
	if (q.done==false && q.array_name == "mped_university"){
        self.view_mped_university= ""
    
    }
	if (q.done==false && q.array_name == "mped_yop"){
        self.view_mped_yop= ""
    
    }
	if (q.done==false && q.array_name == "mped_marks"){
        self.view_mped_marks= ""
    
    }
	if (q.done==false && q.array_name == "mped_div"){
        self.view_mped_div= ""
    
    }
	if (q.done==false && q.array_name == "med_stream"){
        self.view_med_stream= ""
    
    }
	if (q.done==false && q.array_name == "med_institution"){
        self.view_med_institution= ""
    
    }
	if (q.done==false && q.array_name == "med_university"){
        self.view_med_university= ""
    
    }
	if (q.done==false && q.array_name == "med_yop"){
        self.view_med_yop= ""
    
    }
	if (q.done==false && q.array_name == "med_marks"){
        self.view_med_marks= ""
    
    }
	if (q.done==false && q.array_name == "med_div"){
        self.view_med_div= ""
    
    }
	if (q.done==false && q.array_name == "mphil_stream"){
        self.view_mphil_stream= ""
    
    }
	if (q.done==false && q.array_name == "mphil_institution"){
        self.view_mphil_institution= ""
    
    }
	if (q.done==false && q.array_name == "mphil_university"){
        self.view_mphil_university= ""
    
    }
	if (q.done==false && q.array_name == "mphil_yop"){
        self.view_mphil_yop= ""
    
    }
	if (q.done==false && q.array_name == "mphil_marks"){
        self.view_mphil_marks= ""
    
    }
	if (q.done==false && q.array_name == "mphil_div"){
        self.view_mphil_div= ""
    
    }
	if (q.done==false && q.array_name == "phd_stream"){
        self.view_phd_stream= ""
    
    }
	if (q.done==false && q.array_name == "phd_institution"){
        self.view_phd_institution= ""
    
    }
	if (q.done==false && q.array_name == "phd_university"){
        self.view_phd_university= ""
    
    }
	if (q.done==false && q.array_name == "phd_yop"){
        self.view_phd_yop= ""
    
    }
	if (q.done==false && q.array_name == "phd_marks"){
        self.view_phd_marks= ""
    
    }
	if (q.done==false && q.array_name == "phd_div"){
        self.view_phd_div= ""
    
    }
	if (q.done==false && q.array_name == "other_stream"){
        self.view_other_stream= ""
    
    }
	if (q.done==false && q.array_name == "other_institution"){
        self.view_other_institution= ""
    
    }
	if (q.done==false && q.array_name == "other_university"){
        self.view_other_university= ""
    
    }
	if (q.done==false && q.array_name == "other_yop"){
        self.view_other_yop= ""
    
    }
	if (q.done==false && q.array_name == "other_marks"){
        self.view_other_marks= ""
    
    }
	if (q.done==false && q.array_name == "other_div"){
        self.view_other_div= ""
    
    }
	if (q.done==false && q.array_name == "details_scholarship"){
        self.view_details_scholarship= ""
    
    }
	if (q.done==false && q.array_name == "details_honours"){
        self.view_details_honours= ""
    
    }
	if (q.done==false && q.array_name == "details_publication"){
        self.view_details_publication= ""
    
    }
	if (q.done==false && q.array_name == "details_curricular_activities"){
        self.view_details_curricular_activities= ""
    
    }
	if (q.done==false && q.array_name == "details_sport"){
        self.view_details_sport= ""
    
    }    
  })             
}

    self.ReadBrowseStaff = () =>{
        self.loading=true
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