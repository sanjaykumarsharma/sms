<student-browser>
 	<print-header></print-header> 
	<loading-bar if={loading}></loading-bar>  
	<section class=" is-fluid" show={student_view =='student_list'}>
				<h4 class="title has-text-centered" style="color: #ff3860;">Students Details <span class="printOnly_t"><br> Session: <span style="color:#000">{session_name}</span></span></h4>
		<div class="box no-print">
			<div class="columns">
				<div class="column is-narrow">
					<label class="label">Standard</label>
				</div>
				<div class="column is-narrow">
					<div class="control">
						<div class="select">
							<select ref="standard_id" onchange={getReadSection} onkeyup={addEnter}>
								<option each={standards} value={standard_id}>{standard}
	                            </option>
							</select>
						</div>
					</div>
				</div>
				<div class="column is-narrow">
					<label class="label">Section</label>
				</div>
				<div class="column is-narrow">
					<div class="control">
			        	<div class="select is-fullwidth">
							<select ref="section_id" onkeyup={addEnter}>
								<option each={readfilteredSections} value={section_id}>{section}
	                            </option>
							</select>
						</div>
			      	</div>
			    </div>
				<div class="column">
					<button class="button is-danger has-text-weight-bold"
					onclick={readStudentBrowserData} >GO
					</button>
					<button if={role=='Class Teacher'} class="button ml5 is-pulled-right" onclick={view_images} title="View Images">
		              <span class="icon">
		                  <i class="fa fa-address-book" aria-hidden="true"></i>
		              </span>
		           </button>
		           <button if={role=='Class Teacher'} class="button is-link has-text-weight-bold ml5 is-pulled-right" onclick={print_list} title="Print List">
		              <span class="icon">
		                  <i class="far fa-eye"></i>
		              </span>
		           </button>
		           <button class="button is-success has-text-weight-bold ml5 is-pulled-right" onclick={downloadCSV} title="Excel Down Load">
		              <span class="icon">
		                  <i class="far fa-file-excel"></i>
		              </span>
		           </button>
					<button class="button is-primary has-text-weight-bold is-pulled-right ml5" onclick="window.print()" title="Print" style="margin-left:5px">
	                  <span class="icon">
	                     <i class="fas fa-print"></i>
	                 </span>
	                </button>

					<button class="button is-warning has-text-weight-bold is-pulled-right ml5"
				      onclick={showStudentField}>Setting
				    </button>
				    <input class="input is-pulled-right" ref="searchBrowseStudent" onkeyup={filteredBrowseStudent} type="text" style="width:200px;margin-right:5px;" placeholder="Search">  	
				</div>
			</div>
		</div>
		<div style="overflow-x: scroll; border:solid #000 1px;">
		    <table class="table is-fullwidth is-bordered is-hoverable is-narrow">
			<thead>
				<tr>
					<th>#</th>
					<th show={roll_no_view =='show_roll_no'}>Roll No</th>
					<th show={enroll_no_view =='show_enroll_no'}>Enroll No</th>
					<th show={student_view =='show_student'}>Student Name</th>
					<th show={class_view =='show_class'}>Class</th>
					<th show={group_view =='show_group'}>Group</th>
					<th show={house_view =='show_house'}>House</th>
					<th show={reg_no_view =='show_reg_no'}>Reg. No</th>
					<th show={gender_view =='show_gender'}>Gender</th>
					<th show={category_view =='show_category'}>Category</th>
					<th show={dob_view =='show_dob'}>DOB</th>
					<th show={age_view =='show_age'}>Age</th>
					<th show={income_view =='show_income'}>Income</th>
					<th show={f_annual_income_view =='show_f_annual_income'}>Father's AnnualIncome</th>
					<th show={doa_view =='show_doa'}>DOA</th>
					<th show={old_doa_view =='show_old_doa'}>Old DOA</th>
					<th show={old_doj_view =='show_old_doj'}>Old DOJ</th>
					<th show={title_view =='show_title'}>Title</th>
					<th show={first_name_view =='show_first_name'}>First Name</th>
					<th show={middle_name_view =='show_middle_name'}>Middle Name </th>
					<th show={last_name_view =='show_last_name'}>Last Name</th>
					<th show={withdrawn_view =='show_withdrawn'}>Withdrawn</th>
					
					<th show={doj_view =='show_doj'}>DOJ</th>
					<th show={mother_tongue_view =='show_mother_tongue'}>Mother Tongue</th>
					<th show={last_school_view =='show_last_school'}>Last School</th>
					<th show={last_class_view =='show_last_class'}>Last Class</th>
					<th show={admission_for_view =='show_admission_for'}>Admission For</th>
					<th show={hobby_view =='show_hobby'}>Hobby</th>
					<th show={blood_group_view =='show_blood_group'}>Blood Group</th>
					<th show={nationality_view =='show_nationality'}>Nationality</th>
					<th show={cast_view =='show_cast'}>Cast</th>
					<th show={religion_view =='show_religion'}>Religion</th>
					<th show={c_add_view =='show_c_add'}>C Add</th>
					<th show={p_add_view =='show_p_add'}>P Add</th>
					<th show={sms_view =='show_sms'}>SMS</th>
					<th show={residence_phone_view =='show_residence_phone'}>Residence Phone </th>
					<th show={fax_view =='show_fax'}>Emergency No.</th>
					<th show={student_type_view =='show_student_type'}>Student Type</th>
					<th show={staff_child_view =='show_staff_child'}>Staff Child</th>
					<th show={staff_name_view =='show_staff_name'}>Staff Name</th>
					<th show={student_email_view =='show_student_email'}>Student Email</th>
					<th show={f_title_view =='show_f_title'}>Father Title</th>
					<th show={f_name_view =='show_f_name'}>Father's Name</th>
					<th show={f_school_name_view =='show_f_school_name'}>Father's School Name</th>
					<th show={f_school_exam__view =='show_f_school_exam_'}>Father's School Exam</th>
					<th show={f_college_name_view =='show_f_college_name'}>Father's College Name</th>
					<th show={f_college_exam_view =='show_f_college_exam'}>Father's College Exam</th>
					<th show={f_occupation_view =='show_f_occupation'}>Father's Occupation</th>
					<th show={f_add_view =='show_f_add'}>Father's Address</th>
					<th show={f_phone_view =='show_f_phone'}>Father's Phone</th>
					<th show={f_mobile_view =='show_f_mobile'}>Father's Mobile</th>
					<!-- <th show={f_fax_view =='show_f_fax'}>Father's Fax</th> -->
					<th show={f_email_view =='show_f_email'}>Father's Email</th>
					<th show={f_organisation_type_view =='show_f_organisation_type'}>Father's Organisation Type</th>
					<th show={f_organisation_view =='show_f_organisation'}>Father's Organisation</th>
					<th show={f_designation_view =='show_f_designation'}>Father's Designation</th>
					<th show={f_department_view =='show_f_department'}>Father's Department</th>
					<th show={f_office_add_view =='show_f_office_add'}>Father's Office  Add</th>
					<th show={f_office_phone_view =='show_f_office_phone'}>Father's Office Phone</th>
					<th show={f_nationality_view =='show_f_nationality'}>Father's Nationality</th>
					<th show={m_title_view =='show_m_title'}>Mother Title</th>
					<th show={m_name_view =='show_m_name'}>Mother's Name</th>
					<th show={m_school_exam_view =='show_m_school_exam'}>Mother's School Name</th>
					<th show={m_exam_exam_view =='show_m_exam_exam'}>Mother's School Exam</th>
					<th show={m_college_exam_view =='show_m_college_exam'}>Mother's College Name</th>
					<th show={m_college_name_view =='show_m_college_name'}>Mother's College Exam</th>
					<th show={m_occupation_view =='show_m_occupation'}>Mother's Occupation</th>
					<th show={m_add_view =='show_m_add'}>Mother's Address</th>
					<th show={m_phone_view =='show_m_phone'}>Mother's Phone</th>
					<th show={m-mobile_view =='show_m-mobile'}>Mother's Mobile</th>
					<!-- <th show={m_fax_view =='show_m_fax'}>Mother's Fax</th> -->
					<th show={m_email_view =='show_m_email'}>Mother's Email</th>
					<th show={m_organisation_view =='show_m_organisation'}>Mother's Organisation</th>
					<th show={m_annual_income_view =='show_m_annual_income'}>Mother's AnnualIncome</th>
					<th show={m_designation_view =='show_m_designation'}>Mother's Designation</th>
					<th show={m_department_view =='show_m_department'}>Mother's Department</th>
					<th show={m_office_add_view =='show_m_office_add'}>Mother's Office  Add</th>
					<th show={m_office_phone_view =='show_m_office_phone'}>Mother's Office Phone</th>
					<th show={m_nationality_view =='show_m_nationality'}>Mother's Nationality</th>
					<th show={g_name_view =='show_g_name'}>Guardian's Name</th>
					<th show={g_school_name_view =='show_g_school_name'}>Guardian's School Name</th>
					<th show={g_school_exam_view =='show_g_school_exam'}>Guardian's School Exam</th>
					<th show={g_college_name_view =='show_g_college_name'}>Guardian's College Name</th>
					<th show={g-college_exam_view =='show_g-college_exam'}>Guardian's College Exam</th>
					<th show={g_occupation_view =='show_g_occupation'}>Guardian's Occupation</th>
					<th show={g_add_view =='show_g_add'}>Guardian's Address</th>
					<th show={g_phone_view =='show_g_phone'}>Guardian's Phone</th>
					<th show={g_mobile_view =='show_g_mobile'}>Guardian's Mobile</th>
					<!-- <th show={g_fax_view =='show_g_fax'}>Guardian's Fax</th> -->
					<th show={g_email_view =='show_g_email'}>Guardian's Email</th>
					<th show={g_organisation_view =='show_g_organisation'}>Guardian's Organisation</th>
					<th show={g_annual_income_view =='show_g_annual_income'}>Guardian's AnnualIncome</th>
					<th show={g_designation_view =='show_g_designation'}>Guardian's Designation</th>
					<th show={g_department_view =='show_g_department'}>Guardian's Department</th>
					<th show={g_office_add_view =='show_g_office_add'}>Guardian's Office  Add</th>
					<th show={g_office_phone_view =='show_g_office_phone'}>Guardian's Office Phone</th>
					<th show={g_nationality_view =='show_g_nationality'}>Guardian's Nationality</th>
					<th show={g_relation_view =='show_g_relation'}>Guardian's Relation</th>
					<th show={sibling_name_view =='show_sibling_name'}>Sibling Name</th>
					<th show={sibling_enroll_no_view =='show_sibling_enroll_no'}>Sibling Enroll No</th>
					
				</tr>
			</thead>
			<tbody>
				<tr each={st, i in filteredBrowseStudents}>
					<td>{i+1}</td>
					<td show={roll_no_view =='show_roll_no'}>{st.roll_number}</td>
					<td show={enroll_no_view =='show_enroll_no'}>{st.enroll_number}</td>
					<td show={student_view =='show_student'}>{st.first_name} {st.middle_name} {st.last_name}</td>
					<td show={class_view =='show_class'}>{st.standard}</td>
					<td show={group_view =='show_group'}>{st.group_name}</td>
					<td show={house_view =='show_house'}>{st.house_name}</td>
					<td show={reg_no_view =='show_reg_no'}>{st.reg_number}</td>
					<td show={gender_view =='show_gender'}>{st.gender}</td>
					<td show={category_view =='show_category'}>{st.category_name}</td>
					<td show={age_view =='show_dob'}>{st.dob}</td>
					<td show={dob_view =='show_age'}>{st.age}</td>
					<td show={income_view =='income_age'}>{st.f_annual_income}</td>
					<td show={f_annual_income_view =='show_f_annual_income'}>{st.f_annual_income}</td>
					<td show={doa_view =='show_doa'}>{st.doa}</td>
					<td show={title_view =='show_title'}>{st.title}</td>
					<td show={first_name_view =='show_first_name'}>{st.first_name}</td>
					<td show={middle_name_view =='show_middle_name'}>{st.middle_name}</td>
					<td show={last_name_view =='show_last_name'}>{st.last_name}</td>
					<td show={withdrawn_view =='show_withdrawn'}>{st.withdrawn}</td>
					<td show={doj_view =='show_doj'}>{st.doj}</td>
					<td show={mother_tongue_view =='show_mother_tongue'}>{st.mother_tongue}</td>
					<td show={last_school_view =='show_last_school'}>{st.last_school}</td>
					<td show={last_class_view =='show_last_class'}>{st.last_class}</td>
					<td show={admission_for_view =='show_admission_for'}>{st.admission_for_class}</td>
					<td show={hobby_view =='show_hobby'}>{st.hobby}</td>
					<td show={blood_group_view =='show_blood_group'}>{st.blood_group}</td>
					<td show={nationality_view =='show_nationality'}>{st.nationality}</td>
					<td show={cast_view =='show_cast'}>{st.cast}</td>
					<td show={religion_view =='show_religion'}>{st.religion}</td>
					<td show={c_add_view =='show_c_add'}>{st.c_add_l1} {st.c_add_l2} <br> {st.c_city}-{st.c_zip} <br>{st.c_state}, {st.c_country}</td>
					<td show={p_add_view =='show_p_add'}>{st.p_add_l1} {st.p_add_l2} <br> {st.p_city}-{st.p_zip} <br>{st.p_state}, {st.p_country}</td>
					<td show={mobile_view =='show_mobile'}>{st.mobile}</td>
					<td show={residence_phone_view =='show_residence_phone'}>{st.residence_phone}</td>
					<td show={fax_view =='show_fax'}>{st.fax}</td>
					<td show={student_type_view =='show_student_type'}>{st.student_type}</td>
					<td show={staff_child_view =='show_staff_child'}>{st.staff_child}</td>
					<td show={staff_name_view =='show_staff_name'}>{st.staff_name}</td>
					<td show={email_view =='show_email'}>{st.email}</td>
					<td show={f_title_view =='show_f_title'}>{st.f_title}</td>
					<td show={f_name_view =='show_f_name'}>{st.f_name}</td>
					<td show={f_school_name_view =='show_f_school_name'}>{st.f_school_name}</td>
					<td show={f_school_exam_view =='show_f_school_exam'}>{st.f_school_exam_passed}</td>
					<td show={f_college_name_view =='show_f_college_name'}>{st.f_college_name}</td>
					<td show={f_college_exam =='show_f_college_exam'}>{st.f_college_exam_passed}</td>
					<td show={occupation_view =='show_occupation'}>{f_occupation}</td>
					<td show={f_add_view =='show_f_add'}>{st.f_add_l1} {st.f_add_l2} <br> {st.f_city}-{st.f_zip} <br>{st.f_state}, {st.f_country}</td>
					<td show={f_phone_view =='show_f_phone'}>{st.f_phone}</td>
					<td show={f_mobile_view =='show_f_mobile'}>{st.f_mobile}</td>
					<td show={f_fax_view =='show_f_fax'}>{st.f_fax}</td>
					<td show={f_email_view =='show_f_email'}>{st.f_email}</td>
					<td show={f_organisation_type_view =='show_f_organisation_type'}>{st.f_organisation_type}</td>
					<td show={f_organisation_view =='show_f_organisation'}>{st.f_organisation_name}</td>
					<td show={f_designation_view =='show_f_designation'}>{st.f_designation}</td>
					<td show={f_department_view =='show_f_department'}>{st.f_department}</td>
					<td show={f_office_add_view =='show_f_office_add'}>{st.f_office_add_l1} {st.f_office_add_l2} <br> {st.f_office_city}-{st.f_office_zip} <br>{st.f_office_state}, {st.f_office_country}</td>
					<td show={f_office_phone_view =='show_f_office_phone'}>{st.f_office_phone}</td>
					<td show={f_nationality_view =='show_f_nationality'}>{st.f_nationality}</td>
					<td show={m_title_view =='show_itle'}>{st.m_title}</td>
					<td show={m_name_view =='show_m_name'}>{st.m_name}</td>
					<td show={m_school_name_view =='show_m_school_name'}>{st.m_school_name}</td>
					<td show={m_school_exam_view =='show_chool_exam'}>{st.m_school_exam_passed}</td>
					<td show={m_college_name_view =='show_m_college_name'}>{st.m_college_name}</td>
					<td show={m_college_exam_view =='show_m_college_exam'}>{st.m_college_exam_passed}</td>
					<td show={occupation_view =='show_occupation'}>{m_occupation}</td>
					<td show={m_add_view =='show_m_add'}>{st.m_add_l1} {st.m_add_l2} <br> {st.m_city}-{st.m_zip} <br>{st.m_state}, {st.m_country}</td>
					<td show={m_phone_view =='show_m_phone'}>{st.m_phone}</td>
					<td show={m_mobile_view =='show_m_mobile'}>{st.m_mobile}</td>
					<td show={m_fax_view =='show_m_fax'}>{st.m_fax}</td>
					<td show={m_email_view =='show_m_email'}>{st.m_email}</td>
					<td show={m_organisation_view =='show_m_organisation'}>{st.m_organisation_name}</td>
					<td show={m_annual_income_view =='show_m_annual_income'}>{st.m_annual_income}</td>
					<td show={m_designation_view =='show_m_designation'}>{st.m_designation}</td>
					<td show={m_department_view =='show_m_department'}>{st.m_department}</td>
					<td show={m_office_add_view =='show_m_office_add'}>{st.m_office_add_l1} {st.m_office_add_l2} <br> {st.m_office_city}-{st.m_office_zip} <br>{st.m_office_state}, {st.m_office_country}</td>
					<td show={m_office_phone_view =='show_m_office_phone'}>{st.m_office_phone}</td>
					<td show={m_nationality_view =='show_m_nationality'}>{st.m_nationality}</td>
					<td show={g_title_view =='show_g_title'}>{st.g_title}</td>
					<td show={g_name_view =='show_g_name'}>{st.g_name}</td>
					<td show={g_school_name_view =='show_g_school_name'}>{st.g_school_name}</td>
					<td show={g_school_exam_view =='show_g_school_exam'}>{st.g_school_exag_passed}</td>
					<td show={g_college_name_view =='show_g_college_name'}>{st.g_college_name}</td>
					<td show={g_college_exam_view =='show_g_college_exam'}>{st.g_college_exag_passed}</td>
					<td show={occupation_view =='show_occupation'}>{g_occupation}</td>
					<td show={g_add_view =='show_g_add'}>{st.g_add_l1} {st.g_add_l2} <br> {st.g_city}-{st.g_zip} <br>{st.g_state}, {st.g_country}</td>
					<td show={g_phone_view =='show_g_phone'}>{st.g_phone}</td>
					<td show={g_mobile_view =='show_g_mobile'}>{st.g_mobile}</td>
					<td show={g_fax_view =='show_g_fax'}>{st.g_fax}</td>
					<td show={g_email_view =='show_g_email'}>{st.g_email}</td>
					<td show={g_organisation_view =='show_g_organisation'}>{st.g_organisation_name}</td>
					<td show={g_annual_income_view =='show_g_annual_income'}>{st.g_annual_income}</td>
					<td show={g_designation_view =='show_g_designation'}>{st.g_designation}</td>
					<td show={g_department_view =='show_g_department'}>{st.g_department}</td>
					<td show={g_office_add_view =='show_g_office_add'}>{st.g_office_add_l1} {st.g_office_add_l2} <br> {st.g_office_city}-{st.g_office_zip} <br>{st.g_office_state}, {st.g_office_country}</td>
					<td show={g_office_phone_view =='show_g_office_phone'}>{st.g_office_phone}</td>
					<td show={g_nationality_view =='show_g_nationality'}>{st.g_nationality}</td>
					<td show={g_relation_view =='show_g_relation'}>{st.g_relation}</td>
					<td show={sibling_name_view =='show_sibling_name'}>{st.sibling_name}</td>
					<td show={sibling_enroll_no_view =='show_sibling_enroll_no'}>{st.sibling_enroll_number}</td>
				</tr>
			</tbody>
		   </table>
		</div>
	</section>
	<section>	
		  <div id="columnSetting" class="modal">
		    <div class="modal-background"></div>
		    <div class="modal-card">
		      <header class="modal-card-head">
		        <p class="modal-card-title">Setting Configuaration</p>
		      </header>
		      <section class="modal-card-body">
		        <div class="columns">
		          <div class="column">
		            <div class="field">
		              <div class="control" each={st, i in fieldList}>
		                <input class="checkbox" type="checkbox" checked={st.done} id="{ 'addStudentName' + st.array_name}" 
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

	<section class=" is-fluid" show={student_view =='print_list'}>
		<div class="level no-print">
			<div class="level-left">
			</div>
			<div class="level-right">
				<div class="control no-print">
	        		<div class="select is-fullwidth is-small">
						<select id="add_column" ref="add_column" onchange={AddColumn}>
							<option value="0">Select Column</option>
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4</option>
							<option value="5">5</option>
							<option value="6">6</option>
							<option value="7">7</option>
							<option value="8">8</option>
							<option value="9">9</option>
						</select>
					</div>
	      		</div>
				<input type="checkbox" id="checkHouse" checked={e.done} 
				onclick={viewHouse}  class="no-print ml5"> <b class="ml5">House</b>

				<!-- <a class="button no-print ml10" onclick={}>Back</a> -->
				<button class="button is-primary has-text-weight-bold ml5 is-small" onclick="window.print()">
		            <span class="icon">
		              <i class="fas fa-print"></i>
		            </span>
		        </button>
				<button class="button is-warning has-text-weight-bold ml5 is-small " onclick={close_print_list}>
		    		<span class="icon">
          				<span class="fas fa-arrow-left"></span>
        			</span>
		    	</button>

			</div>
		</div>
		<center>			

	      	<div style="text-align:left;">
		      	<table class="table is-fullwidth is-bordered" >
		      		<caption class="caption">Students List {pl.standard} - {pl.section} ({pl.session_name})  </caption>
			        <tr>
			        	<th style="">Roll No</th>
	          			<th style="">Enrol No</th>
	          			<th style="">Name</th>
	          			<th style="" show={house_column}>House</th>
	          			<th show={column_one}></th>
	          			<th show={column_two}></th>
	          			<th show={column_three}></th>
	          			<th show={column_four}></th>
	          			<th show={column_five}></th>
	          			<th show={column_six}></th>
	          			<th show={column_seven}></th>
	          			<th show={column_eight}></th>
	          			<th show={column_nine}></th>
			        </tr>     	
					<tr each={pl, i in print_list}>
						
		           		<td >{pl.roll_number}</td> 
		           		<td >{pl.enroll_number}</td> 
		            	<td >{pl.name}</td>
		            	<td show={house_column}>{pl.house}</td>
		            	<td show={column_one}></td>
		            	<td show={column_two}></td>
		            	<td show={column_three}></td>
		            	<td show={column_four}></td>
		            	<td show={column_five}></td>
		            	<td show={column_six}></td>
		            	<td show={column_seven}></td>
		            	<td show={column_eight}></td>
		            	<td show={column_nine}></td>
		           	</tr>
		        </table>
	    	</div>
    	</center>
	</section>

	<section class=" is-fluid" show={student_view =='image_list_view'}>
		<div class="level no-print">
			<div class="level-left">
				<h2 class="title has-text-danger is-size-5"></h2>
			</div>
			<div class="level-right">
				<!-- <a class="button no-print" onclick={}>Back</a> -->
				<button class="button is-primary has-text-weight-bold " onclick="window.print()">
		    		<span class="icon">
          				<span class="fas fa-print"></span>
        			</span>
		    	</button>
		    	<button class="button is-warning has-text-weight-bold ml5" onclick={close_image_list}>
		    		<span class="icon">
          				<span class="fas fa-arrow-left"></span>
        			</span>
		    	</button>
			</div>
		</div>
		<center>
			<table class="table class-teacher-table"><caption class="class-teacher-caption"> Student\'s Image Varification </caption></table>
	      		<table class="table class-teacher-table" each={c, i in image_list} style="margin-top:-25px;">
	      			<tr class="class-teacher-tr">
   						<td rowspan="3" style="width:100px;" class="">
      						<img src="images/{session_id}/studentImages/{c.student_id}.jpg" height="75" >
   						</td>
   						<th > Name </th>
   						<td >{c.name}</td>
   						<th style="width:160px;">Enroll No</th>
   						<td > {c.enroll_number}</td>
					</tr>
					<tr class="class-teacher-tr">
          				<th >Date of Birth </th>
          				<td >{c.dob}</td>
          				<th >Reg. No</th>
          				<td style='width:150px' > {c.reg_number}</td>
     				</tr>
					<tr class="class-teacher-tr"> 
          				<th style='width:115px;' > standard </th>
          				<td colSpan='3' ></td>
      				</tr>
	      		</table>
    	</center>
	</section>
<!-- End Other Information -->
<script>
	
	var self = this
    self.on("mount", function(){
    	self.title='Add'
    	self.pl={}
    	self.fieldList =[
			{ field_name : "Group", array_name : "Group"},
			{ field_name : "House", array_name : "House"},
			{ field_name : "Title", array_name : "Title"},
			{ field_name : "FirstName", array_name : "First Name"},
			{ field_name : "MiddleName", array_name : "Middle Name"},
			{ field_name : "LastName", array_name : "Last Name"},
			{ field_name : "FullName" , array_name : "Full Name"},
			{ field_name : "Standard" , array_name : "Class"},
			{ field_name : "Enroll" , array_name : "Enroll No"},
			{ field_name : "Roll" , array_name : "Roll No"},
			{ field_name : "Registration", array_name : "Registration No"},
			{ field_name : "Gender", array_name : "Gender"},
			{ field_name : "Category", array_name : "Category"},
			{ field_name : "DOB", array_name : "DOB"},
			{ field_name : "Age", array_name : "Age as on 1st Apr"},
			{ field_name : "Income", array_name : "Income"},
			{ field_name : "DOA", array_name : "DOA"},
			{ field_name : "DOj", array_name : "DOJ"},
			{ field_name : "Old DOA", array_name : "Old DOA"},
			{ field_name : "Old DOJ", array_name : "Old DOJ"},
			{ field_name : "MotherTongue", array_name : "Mother Tongue"},
			{ field_name : "LastSchool", array_name : "Last School"},
			{ field_name : "LastClass", array_name : "Last Class"},
			{ field_name : "AdmissionforClass", array_name : "Admission for Class"},
			{ field_name : "Hobby", array_name : "Hobby"},
			{ field_name : "BloodGroup", array_name : "Blood Group"},
			{ field_name : "Nationality", array_name : "Nationality"},
			{ field_name : "Cast", array_name : "Cast"},
			{ field_name : "Religion", array_name : "Religion"},
			{ field_name : "c_Address", array_name : "Correspondence Address"},
			{ field_name : "p_Address", array_name : "Permanent Address"},
			{ field_name : "Mobile" , array_name : "SMS"},
			{ field_name : "ResidencePhone", array_name : "Residence Phone"},
			{ field_name : "Emergency No.", array_name : "Emergency No."},
			{ field_name : "StudentType", array_name : "Student Type"},
			{ field_name : "StaffChild", array_name : "Staff Child"},
			{ field_name : "StaffName", array_name : "Staff Name"},
			{ field_name : "stdEmail" , array_name : "Student Email"},
			{ field_name : "f_Title", array_name : "Father Title"},
			{ field_name : "f_Name" , array_name :"Father Name"},
			{ field_name : "f_School" , array_name :"f_School Name"},
			{ field_name : "f_School_Exam" , array_name :"f_School Exam"},
			{ field_name : "f_College" , array_name :"f_College Name"},
			{ field_name : "f_College_Exam" , array_name :"f_College Exam"},
			{ field_name : "f_Occupation" , array_name :"f_Occupation"},
			{ field_name : "f_Address" , array_name :"f_Address"},
			{ field_name : "f_Phone" , array_name :"f_Phone"},
			{ field_name : "f_Mobile" , array_name :"f_Mobile"},
			{ field_name : "f_Fax" , array_name :"f_Fax"},
			{ field_name : "f_Email" , array_name :"f_Email"},
			{ field_name : "f_OrganisationType" , array_name :"f_Organisation Type"},
			{ field_name : "f_AnnualIncom" , array_name :"f_Annual Income"},
			{ field_name : "f_OrganisationName" , array_name :"f_Organisation Name"},
			{ field_name : "f_Designation" , array_name :"f_Designation"},
			{ field_name : "f_Department" , array_name :"f_Department"},
			{ field_name : "f_OfficeAddess" , array_name :"f_Office Address"},
			{ field_name : "f_OfficePhone" , array_name :"f_Office Phone"},
			{ field_name : "f_Nationality" , array_name :"f_Nationality"},
			
			{ field_name : "m_Title" , array_name :"Mother Title"},
			{ field_name : "m_Name" , array_name :"Mother Name"},
			{ field_name : "m_School" , array_name :"m_School Name"},
			{ field_name : "m_School_Exam" , array_name :"m_School Exam"},
			{ field_name : "m_College" , array_name :"m_College Name"},
			{ field_name : "m_College_Exam" , array_name :"m_College Exam"},
			{ field_name : "m_Occupation" , array_name :"m_Occupation"},
			{ field_name : "m_Address" , array_name :"m_Address"},
			{ field_name : "m_Phone" , array_name :"m_Phone"},
			{ field_name : "m_Mobile" , array_name :"m_Mobile"},
			{ field_name : "m_Fax" , array_name :"m_Fax"},
			{ field_name : "m_Email" , array_name :"m_Email"},
			{ field_name : "m_OrganisationType" , array_name :"m_Organisation Type"},
			{ field_name : "m_AnnualIncom" , array_name :"m_Annual Income"},
			{ field_name : "m_OrganisationName" , array_name :"m_Organisation Name"},
			{ field_name : "m_Designation" , array_name :"m_Designation"},
			{ field_name : "m_Department" , array_name :"m_Department"},
			{ field_name : "m_OfficeAddess" , array_name :"m_Office Address"},
			{ field_name : "m_OfficePhone" , array_name :"m_Office Phone"},
			{ field_name : "m_Nationality" , array_name :"m_Nationality"},
			{ field_name : "g_Title" , array_name :"Guardian Title"},
			{ field_name : "g_Name" , array_name :"Guardian Name"},
			{ field_name : "g_School" , array_name :"g_School Name"},
			{ field_name : "g_School_Exam" , array_name :"g_School Exam"},
			{ field_name : "g_College" , array_name :"g_College Name"},
			{ field_name : "g_College_Exam" , array_name :"g_College Exam"},
			{ field_name : "g_Occupation" , array_name :"g_Occupation"},
			{ field_name : "g_Address" , array_name :"g_Address"},
			{ field_name : "g_Phone" , array_name :"g_Phone"},
			{ field_name : "g_Mobile" , array_name :"g_Mobile"},
			{ field_name : "g_Fax" , array_name :"g_Fax"},
			{ field_name : "g_Email" , array_name :"g_Email"},
			{ field_name : "g_OrganisationType" , array_name :"g_Organisation Type"},
			{ field_name : "g_AnnualIncom" , array_name :"g_Annual Income"},
			{ field_name : "g_OrganisationName" , array_name :"g_Organisation Name"},
			{ field_name : "g_Designation" , array_name :"g_Designation"},
			{ field_name : "g_Department" , array_name :"g_Department"},
			{ field_name : "g_OfficeAddess" , array_name :"g_Office Address"},
			{ field_name : "g_OfficePhone" , array_name :"g_Office Phone"},
			{ field_name : "g_Nationality" , array_name :"g_Nationality"},	
			{ field_name : "g_relation" , array_name :"g_relation" },
			{ field_name : "sibling_Name" , array_name :"Sibling Name"},	
			{ field_name : "siblingEnrollNumber" , array_name :"Sibling Enrol Number"}
			                    
			  ];
    	self.sms_no_view ='show_sms_no'
		self.f_name_view ='show_f_name'
		self.m_name_view ='show_m_name'
		self.student_view ='show_student'
		//self.withdrawn_view ='show_withdrawn'
		self.enroll_no_view ='show_enroll_no'
		//self.reg_no_view ='show_reg_no'
		self.roll_no_view ='show_roll_no'
		self.class_view ='show_class'
		//self.gender_view ='show_gender'
    	self.readStandard()
    	self.readSection()
    	self.role = getCookie('role')
    	self.column_one = false
    	self.column_two = false 
    	self.column_three = false
		self.column_four = false   		
		self.column_five = false  		
		self.column_six = false  		
		self.column_seven = false  		
		self.column_eight = false   		
		self.column_nine = false
		self.student_view = 'student_list'
        self.update()
        flatpickr(".date", {
	    	allowInput: true,
        	dateFormat: "d/m/Y",
  		})
    })

    self.on("unmount", function(){
      studentStore.off('read_standard_changed',StandardChanged)
      studentStore.off('read_section_changed',SectionChanged)
      studentSearchStore.off('read_student_browser_change',ReadStudentBrowserChanged)
      studentStore.off('print_list_changed',PrintListChanged)
      studentSearchStore.off('view_image_list_changed',ImageListChanged)
    })

    self.print_list = () =>{
    	var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!

		var yyyy = today.getFullYear();
		if(dd<10){
    		dd='0'+dd;
		} 
		if(mm<10){
    		mm='0'+mm;
		} 
		var today = dd+'/'+mm+'/'+yyyy;
		self.print_date = today
    	self.student_view = 'print_list'
    	studentStore.trigger('print_list', self.refs.standard_id.value,self.refs.section_id.value)
    }

    self.close_print_list = () => {
    	self.student_view = 'student_list'	
    }

    self.AddColumn = () =>{

    	if(self.refs.add_column.value == "0"){
    		self.column_one = false
    		self.column_two = false 
    		self.column_three = false
    		self.column_four = false   		
    		self.column_five = false  		
    		self.column_six = false  		
    		self.column_seven = false  		
    		self.column_eight = false   		
    		self.column_nine = false 
    	}else if(self.refs.add_column.value == "1"){
    		self.column_one = true
    		self.column_two = false
    		self.column_three = false
    		self.column_four = false   		
    		self.column_five = false  		
    		self.column_six = false  		
    		self.column_seven = false  		
    		self.column_eight = false   		
    		self.column_nine = false 
    	}else if(self.refs.add_column.value == "2"){
			self.column_one = true
    		self.column_two = true  
    		self.column_three = false
    		self.column_four = false   		
    		self.column_five = false  		
    		self.column_six = false  		
    		self.column_seven = false  		
    		self.column_eight = false   		
    		self.column_nine = false   		
    	}else if(self.refs.add_column.value == "3"){
			self.column_one = true
    		self.column_two = true    		
    		self.column_three = true 
    		self.column_four = false   		
    		self.column_five = false  		
    		self.column_six = false  		
    		self.column_seven = false  		
    		self.column_eight = false   		
    		self.column_nine = false   		
    	}else if(self.refs.add_column.value == "4"){
			self.column_one = true
    		self.column_two = true
    		self.column_three = true
    		self.column_four = true  
    		self.column_five = false  		
    		self.column_six = false  		
    		self.column_seven = false  		
    		self.column_eight = false   		
    		self.column_nine = false		
    	}else if(self.refs.add_column.value == "5"){
			self.column_one = true
    		self.column_two = true 
    		self.column_three = true
    		self.column_four = true   		
    		self.column_five = true 
    		self.column_six = false  		
    		self.column_seven = false  		
    		self.column_eight = false   		
    		self.column_nine = false 		
    	}else if(self.refs.add_column.value == "6"){
			self.column_one = true
    		self.column_two = true  
    		self.column_three = true
    		self.column_four = true   		
    		self.column_five = true  		
    		self.column_six = true 
    		self.column_seven = false  		
    		self.column_eight = false   		
    		self.column_nine = false  		
    	}else if(self.refs.add_column.value == "7"){
			self.column_one = true
    		self.column_two = true  
    		self.column_three = true
    		self.column_four = true   		
    		self.column_five = true  		
    		self.column_six = true  		
    		self.column_seven = true 
    		self.column_eight = false   		
    		self.column_nine = false  		
    	}else if(self.refs.add_column.value == "8"){
			self.column_one = true
    		self.column_two = true  
    		self.column_three = true
    		self.column_four = true   		
    		self.column_five = true  		
    		self.column_six = true  		
    		self.column_seven = true  		
    		self.column_eight = true  
    		self.column_nine = false 		
    	}else if(self.refs.add_column.value == "9"){
			self.column_one = true
    		self.column_two = true 
    		self.column_three = true
    		self.column_four = true   		
    		self.column_five = true  		
    		self.column_six = true  		
    		self.column_seven = true  		
    		self.column_eight = true   		
    		self.column_nine = true   		
    	}
    }

    self.view_images = () =>{
    	self.student_view = 'image_list_view'
    	studentSearchStore.trigger('view_image_list', self.refs.standard_id.value,self.refs.section_id.value)
    }
    self.close_image_list = () => {
    	self.student_view = 'student_list'	
    }
    self.filteredBrowseStudent = ()=>{
        self.filteredBrowseStudents = self.browseStudents.filter(c => {
          return JSON.stringify(c).toLowerCase().indexOf(self.refs.searchBrowseStudent.value.toLowerCase())>=0
        })
      } 

	self.readStandard = () => {
       studentStore.trigger('read_standard')
    }

    self.readSection = () => {
       studentStore.trigger('read_section')
    }

    self.getReadSection = () => {
    	self.readfilteredSections = []
    	self.readfilteredSections = self.sections.filter(s => {
    		return s.standard_id == self.refs.standard_id.value
    	})
    	self.update()
    }
     self.addEnter = (e) => {
    	console.log("inside enter")
      if(e.which == 13){
        self.readStudentBrowserData()
      }
    }
    self.readStudentBrowserData = () => {
    	self.loading=true
       studentSearchStore.trigger('read_student_browser',self.refs.standard_id.value,self.refs.section_id.value)
    }
    
    studentSearchStore.on('view_image_list_changed',ImageListChanged)
    function ImageListChanged(image_list,session_name,session_id){
      self.image_list = image_list
      self.session_name = session_name
      self.session_id = session_id
      self.update()
    }

    studentStore.on('print_list_changed',PrintListChanged)
    function PrintListChanged(print_list){
      console.log(print_list)
      self.print_list = print_list
      self.pl=print_list[0]
      self.update()
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
    studentSearchStore.on('read_student_browser_change',ReadStudentBrowserChanged)
    function ReadStudentBrowserChanged(browseStudents,session_name){
      //console.log(browseStudents) 
      self.title='Create'
      self.loading = false
      self.browseStudents = browseStudents
      self.filteredBrowseStudents = browseStudents
      self.session_name=session_name
      self.update()
      //console.log(self.employeeTypes)
    }
    self.closeCheckBoxModal=()=>{
    	 $("#columnSetting").removeClass("is-active");
    	/* var item=''
    	 var event=''
    	 self.addCheckedColumn()*/
    }
    self.selectAllCheckBox = () => {
    	console.log("checkAlll")
      if($('#checkAllCheckBox').is(":checked")){
        self.fieldList.map(i=>{
        	console.log(i)
          i.done = true;
          $('addStudentName'+i.array_name).prop('checked', true);
        })
      }else{
        self.fieldList.map(i=>{
          i.done = false;
          $('addStudentName'+i.array_name).prop('checked', false);
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
        	let a={}
	        if(q.done==true && q.array_name=="Group"){
	           self.group_view='show_group'		
            }
           
			if(q.done==true && q.array_name=="House"){
				self.house_view='show_house'			
			}
			if(q.done==true && q.array_name=="Title"){
				self.title_view='show_title'			
			}
			
			if(q.done==true && q.array_name== "First Name"){
					self.first_name_view='show_first_name'		
			}
			if(q.done==true && q.array_name=="Middle Name"){
					self.middle_name_view='show_middle_name'		
			}
			if(q.done==true && q.array_name== "Last Name"){
					self.last_name_view='show_last_name'		
			}
			if(q.done==true && q.array_name=="Full Name"){
					self.student_view='show_student'		
			}
			
			if(q.done==true && q.array_name=="Class"){
					self.class_view='show_class'		
			}
			if(q.done==true && q.array_name=="Enroll No"){
					self.enroll_no_view='show_enroll_no'		
			}
			
			if(q.done==true && q.array_name=="Roll No"){
					self.roll_no_view='show_roll_no'		
			}
			if(q.done==true && q.array_name=="Registration No"){
				self.reg_no_view='show_reg_no'			
			}
			if(q.done==true && q.array_name=="Gender"){
					self.gender_view='show_gender'		
			}
			
			if(q.done==true && q.array_name=="Category"){
					self.category_view='show_category'		
			}
			if(q.done==true && q.array_name=="DOB"){
					self.dob_view='show_dob'		
			}
			if(q.done==true && q.array_name=="Age as on 1st Apr"){
					self.age_view='show_age'		
			}
			if(q.done==true && q.array_name=="Income"){
					self.income_view='show_income'		
			}
			if(q.done==true && q.array_name=="DOA"){
					self.doa_view='show_doa'		
			}
			if(q.done==true && q.array_name=="DOJ"){
					self.doj_view='show_doj'		
			}
			if(q.done==true && q.array_name=="Old DOA"){
					self.old_doa_view='show_old_doa'		
			}
			if(q.done==true && q.array_name=="Old DOJ"){
					self.old_doj_view='show_old_doj'		
			}
			if(q.done==true && q.array_name=="Mother Tongue"){
					self.mother_tongue_view='show_mother_tongue'		
			}
			if(q.done==true && q.array_name=="Last School"){
					self.last_school_view='show_last_school'		
			}
			if(q.done==true && q.array_name=="Last Class"){
					self.last_class_view='show_last_class'		
			}
			if(q.done==true && q.array_name=="Admission for Class"){
					self.admission_for_view='show_admission_for'		
			}
			if(q.done==true && q.array_name=="Hobby"){
					self.hobby_view='show_hobby'		
			}
			if(q.done==true && q.array_name=="Blood Group"){
					self.blood_group_view='show_blood_group'		
			}
			if(q.done==true && q.array_name=="Nationality"){
					self.nationality_view='show_nationality'		
			}
			if(q.done==true && q.array_name=="Cast"){
					self.cast_view='show_cast'		
			}
			if(q.done==true && q.array_name=="Religion"){
					self.religion_view='show_religion'		
			}
			if(q.done==true && q.array_name=="Correspondence Address"){
					self.c_add_view='show_c_add'		
			}
			if(q.done==true && q.array_name=="Permanent Address"){
					self.p_add_view='show_p_add'		
			}
			if(q.done==true && q.array_name=="SMS"){
					self.sms_no_view='show_sms_no'		
			}
			if(q.done==true && q.array_name=="Residence Phone"){
					self.residence_phone_view='show_residence_phone'		
			}
			if(q.done==true && q.array_name=="Fax"){
					self.fax_view='show_fax'		
			}
			if(q.done==true && q.array_name=="Student Type"){
					self.student_type_view='show_student_type'		
			}
			if(q.done==true && q.array_name=="Staff Child"){
					self.staff_child_view='show_staff_child'		
			}
			if(q.done==true && q.array_name=="Staff Name"){
					self.staff_name_view='show_staff_name'		
			}
			if(q.done==true && q.array_name=="Student Email"){
					self.student_email_view='show_student_email'		
			}
			if(q.done==true && q.array_name=="Father Title"){
					self.f_title_view='show_f_title'		
			}
			if(q.done==true && q.array_name=="Father Name"){
					self.f_name_view='show_f_name'		
			}
			if(q.done==true && q.array_name=="f_School Name"){
					self.f_school_name_view='show_f_school_name'		
			}
			if(q.done==true && q.array_name=="f_School Exam"){
					self.f_school_exam_view='show_f_school_exam'		
			}		
			if(q.done==true && q.array_name=="f_College Name"){
					self.f_college_name_view='show_f_college_name'		
			}
			if(q.done==true && q.array_name=="f_College Exam"){
					self.f_college_exam_view='show_f_college_exam'		
			}
			if(q.done==true && q.array_name=="f_Occupation"){
					self.f_occupation_view='show_f_occupation'		
			}
			if(q.done==true && q.array_name=="f_Address"){
					self.f_add_view='show_f_add'		
			}
			if(q.done==true && q.array_name=="f_Phone"){
					self.f_phone_view='show_f_phone'		
			}
			if(q.done==true && q.array_name=="f_Mobile"){
					self.f_mobile_view='show_f_mobile'		
			}
			if(q.done==true && q.array_name=="f_Fax"){
					self.f_fax_view='show_f_fax'		
			}
			if(q.done==true && q.array_name=="f_Email"){
					self.f_email_view='show_f_email'		
			}
			if(q.done==true && q.array_name=="f_Organisation Type"){
					self.f_organisation_type_view='show_f_organisation_type'		
			}
			if(q.done==true && q.array_name=="f_Annual Income"){
					self.f_annual_income_view='show_f_annual_income'		
			}
			if(q.done==true && q.array_name=="f_Organisation Name"){
					self.f_organisation_view='show_f_organisation'		
			}
			if(q.done==true && q.array_name=="f_Designation"){
					self.f_designation_view='show_f_designation'		
			}
			if(q.done==true && q.array_name=="f_Department"){
					self.f_department_view='show_f_department'		
			}
			if(q.done==true && q.array_name=="f_Office Address"){
					self.f_office_add_view='show_f_office_add'		
			}
			if(q.done==true && q.array_name=="f_Office Phone"){
					self.f_office_phone_view='show_f_office_phone'		
			}
			if(q.done==true && q.array_name=="f_Nationality"){
					self.f_nationality_view='show_f_nationality'		
			}

			if(q.done==true && q.array_name=="Mother Title"){
					self.m_title_view='show_m_title'		
			}
			if(q.done==true && q.array_name=="Mother Name"){
					self.m_name_view='show_m_name'		
			}
			if(q.done==true && q.array_name=="m_School Name"){
					self.m_school_name_view='show_m_school_name'		
			}
			if(q.done==true && q.array_name=="m_School Exam"){
					self.m_school_exam_view='show_m_school_exam'		
			}		
			if(q.done==true && q.array_name=="m_College Name"){
					self.m_college_name_view='show_m_college_name'		
			}
			if(q.done==true && q.array_name=="m_College Exam"){
					self.m_college_exam_view='show_m_college_exam'		
			}
			if(q.done==true && q.array_name=="m_Occupation"){
					self.m_occupation_view='show_m_occupation'		
			}
			if(q.done==true && q.array_name=="m_Address"){
					self.m_add_view='show_m_add'		
			}
			if(q.done==true && q.array_name=="m_Phone"){
					self.m_phone_view='show_m_phone'		
			}
			if(q.done==true && q.array_name=="m_Mobile"){
					self.m_mobile_view='show_m_mobile'		
			}
			if(q.done==true && q.array_name=="m_Fax"){
					self.m_fax_view='show_m_fax'		
			}
			if(q.done==true && q.array_name=="m_Email"){
					self.m_email_view='show_m_email'		
			}
			if(q.done==true && q.array_name=="m_Organisation Type"){
					self.m_organisation_view='show_m_organisation'		
			}
			if(q.done==true && q.array_name=="m_Annual Income"){
					self.m_annual_income_view='show_m_annual_income'		
			}
			if(q.done==true && q.array_name=="m_Organisation Name"){
					self.m_organisation_view='show_m_organisation'		
			}
			if(q.done==true && q.array_name=="m_Designation"){
					self.m_designation_view='show_m_designation'		
			}
			if(q.done==true && q.array_name=="m_Department"){
					self.m_department_view='show_m_department'		
			}
			if(q.done==true && q.array_name=="m_Office Address"){
					self.m_office_add_view='show_m_office_add'		
			}
			if(q.done==true && q.array_name=="m_Office Phone"){
					self.m_office_phone_view='show_m_office_phone'		
			}
			if(q.done==true && q.array_name=="m_Nationality"){
					self.m_nationality_view='show_m_nationality'		
			}
			
			if(q.done==true && q.array_name=="Guardian Title"){
					self.g_title_view='show_g_title'		
			}
			if(q.done==true && q.array_name=="Guardian Name"){
					self.g_name_view='show_g_name'		
			}
			if(q.done==true && q.array_name=="g_School Name"){
					self.g_school_name_view='show_g_school_name'		
			}
			if(q.done==true && q.array_name=="g_School Exam"){
					self.g_school_exag_view='show_g_school_exam'		
			}		
			if(q.done==true && q.array_name=="g_College Name"){
					self.g_college_name_view='show_g_college_name'		
			}
			if(q.done==true && q.array_name=="g_College Exam"){
					self.g_college_exag_view='show_g_college_exam'		
			}
			if(q.done==true && q.array_name=="g_Occupation"){
					self.g_occupation_view='show_g_occupation'		
			}
			if(q.done==true && q.array_name=="g_Address"){
					self.g_add_view='show_g_add'		
			}
			if(q.done==true && q.array_name=="g_Phone"){
					self.g_phone_view='show_g_phone'		
			}
			if(q.done==true && q.array_name=="g_Mobile"){
					self.g_mobile_view='show_g_mobile'		
			}
			if(q.done==true && q.array_name=="g_Fax"){
					self.g_fax_view='show_g_fax'		
			}
			if(q.done==true && q.array_name=="g_Email"){
					self.g_email_view='show_g_email'		
			}
			if(q.done==true && q.array_name=="g_Organisation Type"){
					self.g_organisation_view='show_g_organisation'		
			}
			if(q.done==true && q.array_name=="g_Annual Income"){
					self.g_annual_income_view='show_g_annual_income'		
			}
			if(q.done==true && q.array_name=="g_Organisation Name"){
					self.g_organisation_view='show_g_organisation'		
			}
			if(q.done==true && q.array_name=="g_Designation"){
					self.g_designation_view='show_g_designation'		
			}
			if(q.done==true && q.array_name=="g_Department"){
					self.g_department_view='show_g_department'		
			}
			if(q.done==true && q.array_name=="g_Office Address"){
					self.g_office_add_view='show_g_office_add'		
			}
			if(q.done==true && q.array_name=="g_Office Phone"){
					self.g_office_phone_view='show_g_office_phone'		
			}
			if(q.done==true && q.array_name=="g_Nationality"){
					self.g_nationality_view='show_g_nationality'		
			}
			
			if(q.done==true && q.array_name=="g_relation"){
				self.g_relation_view='show_g_relation'		
			}
			if(q.done==true && q.array_name=="Sibling Name"){
				self.sibling_name_view='show_sibling_name'		
			}	
			if(q.done==true && q.array_name=="Sibling Enrol Number"){
				self.sibling_enroll_no_view='show_sibling_enroll_no'		
			}

			<!-- False Condition-->


		    if(q.done==false && q.array_name=="Group"){
	           self.title_view=''
            }
           
			if(q.done==false && q.array_name=="House"){
				self.house_view=''
			}
			if(q.done==false && q.array_name=="Title"){
				self.title_view=''
			}
			
			if(q.done==false && q.array_name== "First Name"){
					self.first_name_view=''
			}
			if(q.done==false && q.array_name=="Middle Name"){
					self.middle_name_view=''
			}
			if(q.done==false && q.array_name== "Last Name"){
					self.last_name_view=''
			}
			if(q.done==false && q.array_name=="Full Name"){
					self.student_view=''
			}
			
			if(q.done==false && q.array_name=="Class"){
					self.class_view=''
			}
			if(q.done==false && q.array_name=="Enroll No"){
					self.enroll_no_view=''
			}
			
			if(q.done==false && q.array_name=="Roll No"){
					self.roll_no_view=''
			}
			if(q.done==false && q.array_name=="Registration No"){
				self.reg_no_view=''
			}
			if(q.done==false && q.array_name=="Gender"){
					self.gender_view=''
			}
			
			if(q.done==false && q.array_name=="Category"){
					self.category_view=''
			}
			if(q.done==false && q.array_name=="DOB"){
					self.dob_view=''
			}
			if(q.done==false && q.array_name=="Age as on 1st Apr"){
					self.age_view=''
			}
			if(q.done==false && q.array_name=="Income"){
					self.annual_income_view=''
			}
			if(q.done==false && q.array_name=="DOA"){
					self.doa_view=''
			}
			if(q.done==false && q.array_name=="DOJ"){
					self.doj_view=''
			}
			if(q.done==false && q.array_name=="Old DOA"){
					self.old_doa_view=''
			}
			if(q.done==false && q.array_name=="Old DOJ"){
					self.old_doj_view=''
			}
			if(q.done==false && q.array_name=="Mother Tongue"){
					self.mother_tongue_view=''
			}
			if(q.done==false && q.array_name=="Last School"){
					self.last_school_view=''
			}
			if(q.done==false && q.array_name=="Last Class"){
					self.last_class_view=''
			}
			if(q.done==false && q.array_name=="Admission for Class"){
					self.admission_for_view=''
			}
			if(q.done==false && q.array_name=="Hobby"){
					self.hobby_view=''
			}
			if(q.done==false && q.array_name=="Blood Group"){
					self.blood_group_view=''
			}
			if(q.done==false && q.array_name=="Nationality"){
					self.nationality_view=''
			}
			if(q.done==false && q.array_name=="Cast"){
					self.cast_view=''
			}
			if(q.done==false && q.array_name=="Religion"){
					self.religion_view=''
			}
			if(q.done==false && q.array_name=="Correspondence Address"){
					self.c_add_view=''
			}
			if(q.done==false && q.array_name=="Permanent Address"){
					self.p_add_view=''
			}
			if(q.done==false && q.array_name=="SMS"){
					self.sms_no_view=''
			}
			if(q.done==false && q.array_name=="Residence Phone"){
					self.residence_phone_view=''
			}
			if(q.done==false && q.array_name=="Fax"){
					self.fax_view=''
			}
			if(q.done==false && q.array_name=="Student Type"){
					self.student_type_view=''
			}
			if(q.done==false && q.array_name=="Staff Child"){
					self.staff_child_view=''
			}
			if(q.done==false && q.array_name=="Staff Name"){
					self.staff_name_view=''
			}
			if(q.done==false && q.array_name=="Student Email"){
					self.student_email_view=''
			}
			if(q.done==false && q.array_name=="Father Title"){
					self.f_title_view=''
			}
			if(q.done==false && q.array_name=="Father Name"){
					self.f_name_view=''
			}
			if(q.done==false && q.array_name=="f_School Name"){
					self.f_school_name_view=''
			}
			if(q.done==false && q.array_name=="f_School Exam"){
					self.f_school_exam_view=''
			}		
			if(q.done==false && q.array_name=="f_College Name"){
					self.f_college_name_view=''
			}
			if(q.done==false && q.array_name=="f_College Exam"){
					self.f_college_exam_view=''
			}
			if(q.done==false && q.array_name=="f_Occupation"){
					self.f_occupation_view=''
			}
			if(q.done==false && q.array_name=="f_Address"){
					self.f_add_view=''
			}
			if(q.done==false && q.array_name=="f_Phone"){
					self.f_phone_view=''
			}
			if(q.done==false && q.array_name=="f_Mobile"){
					self.f_mobile_view=''
			}
			if(q.done==false && q.array_name=="f_Fax"){
					self.f_fax_view=''
			}
			if(q.done==false && q.array_name=="f_Email"){
					self.f_email_view=''
			}
			/*if(q.done==false && q.array_name=="f_Organisation Type"){
					self.f_organisation_view=''
			}*/
			if(q.done==false && q.array_name=="f_Organisation Type"){
					self.f_organisation_type_view=''
			}
			if(q.done==false && q.array_name=="f_Annual Income"){
					self.f_annual_income_view=''
			}
			if(q.done==false && q.array_name=="f_Organisation Name"){
					self.f_organisation_view=''
			}
			if(q.done==false && q.array_name=="f_Designation"){
					self.f_designation_view=''
			}
			if(q.done==false && q.array_name=="f_Department"){
					self.f_department_view=''
			}
			if(q.done==false && q.array_name=="f_Office Address"){
					self.f_office_add_view=''
			}
			if(q.done==false && q.array_name=="f_Office Phone"){
					self.f_office_phone_view=''
			}
			if(q.done==false && q.array_name=="f_Nationality"){
					self.f_nationality_view=''
			}

			if(q.done==false && q.array_name=="Mother Title"){
					self.m_title_view=''
			}
			if(q.done==false && q.array_name=="Mother Name"){
					self.m_name_view=''
			}
			if(q.done==false && q.array_name=="m_School Name"){
					self.m_school_name_view=''
			}
			if(q.done==false && q.array_name=="m_School Exam"){
					self.m_school_exam_view=''
			}		
			if(q.done==false && q.array_name=="m_College Name"){
					self.m_college_name_view=''
			}
			if(q.done==false && q.array_name=="m_College Exam"){
					self.m_college_exam_view=''
			}
			if(q.done==false && q.array_name=="m_Occupation"){
					self.m_occupation_view=''
			}
			if(q.done==false && q.array_name=="m_Address"){
					self.m_add_view=''
			}
			if(q.done==false && q.array_name=="m_Phone"){
					self.m_phone_view=''
			}
			if(q.done==false && q.array_name=="m_Mobile"){
					self.m_mobile_view=''
			}
			if(q.done==false && q.array_name=="m_Fax"){
					self.m_fax_view=''
			}
			if(q.done==false && q.array_name=="m_Email"){
					self.m_email_view=''
			}
			if(q.done==false && q.array_name=="m_Organisation Type"){
					self.m_organisation_view=''
			}
			if(q.done==false && q.array_name=="m_Annual Income"){
					self.m_annual_income_view=''
			}
			if(q.done==false && q.array_name=="m_Organisation Name"){
					self.m_organisation_view=''
			}
			if(q.done==false && q.array_name=="m_Designation"){
					self.m_designation_view=''
			}
			if(q.done==false && q.array_name=="m_Department"){
					self.m_department_view=''
			}
			if(q.done==false && q.array_name=="m_Office Address"){
					self.m_office_add_view=''
			}
			if(q.done==false && q.array_name=="m_Office Phone"){
					self.m_office_phone_view=''
			}
			if(q.done==false && q.array_name=="m_Nationality"){
					self.m_nationality_view=''
			}
			
			if(q.done==false && q.array_name=="Guardian Title"){
					self.g_title_view=''
			}
			if(q.done==false && q.array_name=="Guardian Name"){
					self.g_name_view=''
			}
			if(q.done==false && q.array_name=="g_School Name"){
					self.g_school_name_view=''
			}
			if(q.done==false && q.array_name=="g_School Exam"){
					self.g_school_exag_view=''
			}		
			if(q.done==false && q.array_name=="g_College Name"){
					self.g_college_name_view=''
			}
			if(q.done==false && q.array_name=="g_College Exam"){
					self.g_college_exag_view=''
			}
			if(q.done==false && q.array_name=="g_Occupation"){
					self.g_occupation_view=''
			}
			if(q.done==false && q.array_name=="g_Address"){
					self.g_add_view=''
			}
			if(q.done==false && q.array_name=="g_Phone"){
					self.g_phone_view=''
			}
			if(q.done==false && q.array_name=="g_Mobile"){
					self.g_mobile_view=''
			}
			if(q.done==false && q.array_name=="g_Fax"){
					self.g_fax_view=''
			}
			if(q.done==false && q.array_name=="g_Email"){
					self.g_email_view=''
			}
			if(q.done==false && q.array_name=="g_Organisation Type"){
					self.g_organisation_view=''
			}
			if(q.done==false && q.array_name=="g_Annual Income"){
					self.g_annual_income_view=''
			}
			if(q.done==false && q.array_name=="g_Organisation Name"){
					self.g_organisation_view=''
			}
			if(q.done==false && q.array_name=="g_Designation"){
					self.g_designation_view=''
			}
			if(q.done==false && q.array_name=="g_Department"){
					self.department_view=''
			}
			if(q.done==false && q.array_name=="g_Office Address"){
					self.g_office_add_view=''
			}
			if(q.done==false && q.array_name=="g_Office Phone"){
					self.g_office_phone_view=''
			}
			if(q.done==false && q.array_name=="g_Nationality"){
					self.g_nationality_view=''
			}
			
			if(q.done==false && q.array_name=="g_relation"){

			}
			if(q.done==false && q.array_name=="Sibling Name"){
				self.sibling_view=''
			}	
			if(q.done==false && q.array_name=="Sibling Enrol Number"){
				self.sibling_enroll_no_view=''
			}
            
        })
    }

    self.showStudentField = () =>{
       $("#columnSetting").addClass("is-active")
           
    }
    

    
</script>
</student-browser>