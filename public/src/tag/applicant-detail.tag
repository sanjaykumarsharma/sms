<applicant-detail>
	<loading-bar if={loading}></loading-bar>
	<section class=" is-fluid" show={interviewed_candidate_view =='show_interviewed_candidate'}>
  	<h2 class="title has-text-centered is-size-5" style="color: #ff3860;">Interviewee List</h2>

	<div class="box no-print">
		<div class="columns">
			<div class="column is-narrow">
				<label class="label">From Date</label>
			</div>
			<div class="column is-narrow">
				<input class="input date" ref="start_date" id="start_date" type="text" readonly="readonly">
			</div>
			<div class="column is-narrow">
				<label class="label">To Date</label>
			</div>
			<div class="column is-narrow">
				<input class="input date" ref="end_date" id="end_date" type="text" readonly="readonly">
			</div>
			<div class="column">
				<button class="button is-danger has-text-weight-bold"
				onclick={getData} > GO
				</button>
			</div>
      		<div class="column">
        		<button class="button is-primary has-text-weight-bold ml5 is-pulled-right" 
        		onclick={showStaffField}>
          		Setting
        		</button>
            <button class="button is-link has-text-weight-bold ml5 is-pulled-right" onclick={getData}>
              <span class="icon">
                <span class="fas fa-sync-alt"></span>
              </span>
            </button>
      		</div>
		</div>
	</div>
	<table class="table is-fullwidth is-bordered is-hoverable is-narrow">
		<thead>
			<tr>
			    <th>Sl No</th>
			    <th >Applicant No</th>
			    <th show={view_name=='show_name'}>Name</th>
			    <th show={view_post_applied=='show_post_applied'}>Post Applied</th>
			    <th show={view_subject_taught=='show_subject_taught'}>Subject Taught</th>
			    <th show={view_class_taught=='show_class_taught'}>Class Taught</th>
			    <th show={view_dob=='show_dob'}>DOB</th>
			    <th show={view_age=='show_age'}>Age</th>
          <th show={view_sex=='show_sex'}>Sex</th>
          <th show={view_father_name=='show_father_name'}>Father's Name</th>
          <th show={view_husband_name=='show_husband_name'}>Husband's Name</th>
          <th show={view_marital_status=='show_marital_status'}>Marital Status</th>
          <th show={view_email=='show_email'}>Email </th>
          <th show={view_phone_office=='show_phone_office'}>Phone Office </th>
          <th show={view_phone_residence=='show_phone_residence'}>Phone Residence </th>
          <th show={view_p_address=='show_p_address'}> Permanent Address </th>
          <th show={view_address=='show_address'}> Correspondence Address </th>
          <th show={view_bed_institution=='show_bed_institution'}>B.Ed Institution</th>
          <th show={view_bed_college=='show_bed_college'}>B.Ed College</th>
          <th show={view_bed_year=='show_bed_year'}>B.Ed Year</th>
          <th show={view_bed_subject=='show_bed_subject'}>B.Ed Subject</th>
          <th show={view_bed_marks=='show_bed_marks'}>B.Ed Marks</th>
          <th show={view_bed_remarks=='show_bed_remarks'}>B.Ed Remarks</th>
          <th show={view_ttc_institution=='show_ttc_institution'}>TTC Institution</th>
          <th show={view_ttc_college=='show_ttc_college'}>TTC College</th>
          <th show={view_ttc_year=='show_ttc_year'}>TTC Year</th>
          <th show={view_ttc_subject=='show_ttc_subject'}>TTC Subject</th>
          <th show={view_ttc_marks=='show_ttc_marks'}>TTC Marks</th>
          <th show={view_ttc_remarks=='show_ttc_remarks'}>TTC Remarks</th>
          <th show={view_pg_institution=='show_pg_institution'}>PG Institution</th>
          <th show={view_pg_college=='show_pg_college'}>PG College</th>
          <th show={view_pg_year=='show_pg_year'}>PG Year</th>
          <th show={view_pg_subject=='show_pg_subject'}>PG Subject</th>
          <th show={view_pg_marks=='show_pg_marks'}>PG Marks</th>
          <th show={view_pg_remarks=='show_pg_remarks'}>PG Remarks</th>
          <th show={view_xii_institution=='show_xii_institution'}>XII Institution</th>
          <th show={view_xii_college=='show_xii_college'}>XII College</th>
          <th show={view_xii_year=='show_xii_year'}>XII Year</th>
          <th show={view_xii_subject=='show_xii_subject'}>XII Subject</th>
          <th show={view_xii_marks=='show_xii_marks'}>XII Marks</th>
          <th show={view_xii_remarks=='show_xii_remarks'}>XII Remarks</th>
          <th show={view_x_institution=='show_x_institution'}>X Institution</th>
          <th show={view_x_college=='show_x_college'}>X College</th>
          <th show={view_x_year=='show_x_year'}>X Year</th>
          <th show={view_x_subject=='show_x_subject'}>X Subject</th>
          <th show={view_x_marks=='show_x_marks'}>X Marks</th>
          <th show={view_x_remarks=='show_x_remarks'}>X Remarks</th>
          <th show={view_g_institution=='show_g_institution'}>G Institution</th>
          <th show={view_g_college=='show_g_college'}>G College</th>
          <th show={view_g_year=='show_g_year'}>G Year</th>
          <th show={view_g_subject=='show_g_subject'}>G Subject</th>
          <th show={view_g_marks=='show_g_marks'}>G Marks</th>
          <th show={view_g_remarks=='show_g_remarks'}>G Remarks</th>
          <th show={view_degree1=='show_degree1'}>Degree 1</th>
          <th show={view_university1=='show_university1'}>University 1</th>
          <th show={view_marks1=='show_marks1'}>Marks 1</th>
          <th show={view_year1=='show_year1'}>Year 1</th>
          <th show={view_remarks1=='show_remarks1'}>Remarks 1</th>
          <th show={view_degree2=='show_degree2'}>Degree 2</th>
          <th show={view_university2=='show_university2'}>University 2</th>
          <th show={view_marks2=='show_marks2'}>Marks 2</th>
          <th show={view_year2=='show_year2'}>Year 2</th>
          <th show={view_remarks2=='show_remarks2'}>Remarks 2</th>
          <th show={view_degree3=='show_degree3'}>Degree 3</th>
          <th show={view_university3=='show_university3'}>University 3</th>
          <th show={view_marks3=='show_marks3'}>Marks 3</th>
          <th show={view_year3=='show_year3'}>Year 3</th>
          <th show={view_remarks3=='show_remarks3'}>Remarks 3</th>
          <th show={view_school1=='show_school1'}>School 1</th>
          <th show={view_designation1=='show_designation1'}>Designation 1</th>
          <th show={view_class_taught1=='show_class_taught1'}>Class Taught 1</th>
          <th show={view_subject_taught1=='show_subject_taught1'}>Subject Taught 1</th>
          <th show={view_work_profile1=='show_work_profile1'}>Work Profile 1</th>
          <th show={view_from_date1=='show_from_date1'}>From Date 1</th>
          <th show={view_to_date1=='show_to_date1'}>To Date 1</th>
          <th show={view_salary_drawn1=='show_salary_drawn1'}>Salary 1</th>
          <th show={view_school2=='show_school2'}>School 2</th>
          <th show={view_designation2=='show_designation2'}>Designation 2</th>
          <th show={view_class_taught2=='show_class_taught2'}>Class Taught 2</th>
          <th show={view_subject_taught2=='show_subject_taught2'}>Subject Taught 2</th>
          <th show={view_work_profile2=='show_work_profile2'}>Work Profile 2</th>
          <th show={view_from_date2=='show_from_date2'}>From Date 2</th>
          <th show={view_to_date2=='show_to_date2'}>To Date 2</th>
          <th show={view_salary_drawn2=='show_salary_drawn2'}>Salary 2</th>
          <th show={view_school3=='show_school3'}>School 3</th>
          <th show={view_designation3=='show_designation3'}>Designation 3</th>
          <th show={view_class_taught3=='show_class_taught3'}>Class Taught 3</th>
          <th show={view_subject_taught3=='show_subject_taught3'}>Subject Taught 3</th>
          <th show={view_work_profile3=='show_work_profile3'}>Work Profile 3</th>
          <th show={view_from_date3=='show_from_date3'}>From Date 3</th>
          <th show={view_to_date3=='show_to_date3'}>To Date 3</th>
          <th show={view_salary_drawn3=='show_salary_drawn3'}>Salary 3</th>
          <th show={view_creation_date=='show_creation_date'}>Submission Date</th>
			    <th show={view_interview_call=='show_interview_call'}>Interview Call</th>
			    <th class="has-text-right no-print">Action</th>
			</tr>
		</thead>
		<tbody>
			<tr each={a, i in ApplicantData}>
				<td>{ i+1 }</td>
				<td>{a.career_id}</td>
				<td show={view_name=='show_name'}>{a.full_name}</td>
				<td show={view_post_applied=='show_post_applied'}>{a.post_applied_for}</td>
				<td show={view_subject_taught=='show_subject_taught'}>{a.subject_tobe_taught}</td>
				<td show={view_class_taught=='show_class_taught'}>{a.class_tobe_taught}</td>
				<td show={view_dob=='show_dob'}>{a.date_of_birth}</td>
				<td show={view_age=='show_age'}>{a.age} years</td>
        <td show={view_sex=='show_sex'}>{a.sex}</td>
        <td show={view_father_name=='show_father_name'}>{a.father_name}</td>
        <td show={view_husband_name=='show_husband_name'}>{a.husband_name}</td>
        <td show={view_marital_status=='show_marital_status'}>{a.marital_status}</td>
        <td show={view_mobile=='show_mobile'}>{a.mobile}</td>
        <td show={view_email=='show_email'}>{a.email}</td>
        <td show={view_phone_office=='show_phone_office'}>{a.phone_office}</td>
        <td show={view_phone_residence=='show_phone_residence'}>{a.phone_residence}</td>
        <td show={view_p_address=='show_p_address'}>{a.p_address}</td>
        <td show={view_address=='show_address'}>{a.address}</td>
        <td show={view_bed_institution=='show_bed_institution'}>{a.bed_institution}</td>
        <td show={view_bed_college=='show_bed_college'}>{a.bed_college}</td>
        <td show={view_bed_year=='show_bed_year'}>{a.bed_year}</td>
        <td show={view_bed_subject=='show_bed_subject'}>{a.bed_subject}</td>
        <td show={view_bed_marks=='show_bed_marks'}>{a.bed_marks}</td>
        <td show={view_bed_remarks=='show_bed_remarks'}>{a.bed_remarks}</td>
        <td show={view_ttc_institution=='show_ttc_institution'}>{a.ttc_institution}</td>
        <td show={view_ttc_college=='show_ttc_college'}>{a.ttc_college}</td>
        <td show={view_ttc_year=='show_ttc_year'}>{a.ttc_year}</td>
        <td show={view_ttc_subject=='show_ttc_subject'}>{a.ttc_subject}</td>
        <td show={view_ttc_marks=='show_ttc_marks'}>{a.ttc_marks}</td>
        <td show={view_ttc_remarks=='show_ttc_remarks'}>{a.ttc_remarks}</td>
        <td show={view_pg_institution=='show_pg_institution'}>{a.pg_institution}</td>
        <td show={view_pg_college=='show_pg_college'}>{a.pg_college}</td>
        <td show={view_pg_year=='show_pg_year'}>{a.pg_year}</td>
        <td show={view_pg_subject=='show_pg_subject'}>{a.pg_subject}</td>
        <td show={view_pg_marks=='show_pg_marks'}>{a.pg_marks}</td>
        <td show={view_pg_remarks=='show_pg_remarks'}>{a.pg_remarks}</td>
        <td show={view_xii_institution=='show_xii_institution'}>{a.xii_institution}</td>
        <td show={view_xii_college=='show_xii_college'}>{a.xii_college}</td>
        <td show={view_xii_year=='show_xii_year'}>{a.xii_year}</td>
        <td show={view_xii_subject=='show_xii_subject'}>{a.xii_subject}</td>
        <td show={view_xii_marks=='show_xii_marks'}>{a.xii_marks}</td>
        <td show={view_xii_remarks=='show_xii_remarks'}>{a.xii_remarks}</td>
        <td show={view_x_institution=='show_x_institution'}>{a.x_institution}</td>
        <td show={view_x_college=='show_x_college'}>{a.x_college}</td>
        <td show={view_x_year=='show_x_year'}>{a.x_year}</td>
        <td show={view_x_subject=='show_x_subject'}>{a.x_subject}</td>
        <td show={view_x_marks=='show_x_marks'}>{a.x_marks}</td>
        <td show={view_x_remarks=='show_x_remarks'}>{a.x_remarks}</td>
        <td show={view_g_institution=='show_g_institution'}>{a.g_institution}</td>
        <td show={view_g_college=='show_g_college'}>{a.g_college}</td>
        <td show={view_g_year=='show_g_year'}>{a.g_year}</td>
        <td show={view_g_subject=='show_g_subject'}>{a.g_subject}</td>
        <td show={view_g_marks=='show_g_marks'}>{a.g_marks}</td>
        <td show={view_g_remarks=='show_g_remarks'}>{a.g_remarks}</td>
        <td show={view_degree1=='show_degree1'}>{a.degree1}</td>
        <td show={view_university1=='show_university1'}>{a.university1}</td>
        <td show={view_marks1=='show_marks1'}>{a.marks1}</td>
        <td show={view_year1=='show_year1'}>{a.year1}</td>
        <td show={view_remarks1=='show_remarks1'}>{a.remarks1}</td>
        <td show={view_degree2=='show_degree2'}>{a.degree2}</td>
        <td show={view_university2=='show_university2'}>{a.university2}</td>
        <td show={view_marks2=='show_marks2'}>{a.marks2}</td>
        <td show={view_year2=='show_year2'}>{a.year2}</td>
        <td show={view_remarks2=='show_remarks2'}>{a.remarks2}</td>
        <td show={view_degree3=='show_degree3'}>{a.degree3}</td>
        <td show={view_university3=='show_university3'}>{a.university3}</td>
        <td show={view_marks3=='show_marks3'}>{a.marks3}</td>
        <td show={view_year3=='show_year3'}>{a.year3}</td>
        <td show={view_remarks3=='show_remarks3'}>{a.remarks3}</td>
        <td show={view_school1=='show_school1'}>{a.school1}</td>
        <td show={view_address1=='show_address1'}>{a.address1}</td>
        <td show={view_designation1=='show_designation1'}>{a.designation1}</td>
        <td show={view_class_taught1=='show_class_taught1'}>{a.class_taught1}</td>
        <td show={view_subject_taught1=='show_subject_taught1'}>{a.subject_taught1}</td>
        <td show={view_work_profile1=='show_work_profile1'}>{a.work_profile1}</td>
        <td show={view_from_date1=='show_from_date1'}>{a.from_date1}</td>
        <td show={view_to_date1=='show_to_date1'}>{a.to_date1}</td>
        <td show={view_salary_drawn1=='show_salary_drawn1'}>{a.salary_drawn1}</td>
        <td show={view_school2=='show_school2'}>{a.school2}</td>
        <td show={view_address2=='show_address2'}>{a.address2}</td>
        <td show={view_designation2=='show_designation2'}>{a.designation2}</td>
        <td show={view_class_taught2=='show_class_taught2'}>{a.class_taught2}</td>
        <td show={view_subject_taught2=='show_subject_taught2'}>{a.subject_taught2}</td>
        <td show={view_work_profile2=='show_work_profile2'}>{a.work_profile2}</td>
        <td show={view_from_date2=='show_from_date2'}>{a.from_date2}</td>
        <td show={view_to_date2=='show_to_date2'}>{a.to_date2}</td>
        <td show={view_salary_drawn2=='show_salary_drawn2'}>{a.salary_drawn2}</td>
        <td show={view_school3=='show_school3'}>{a.school3}</td>
        <td show={view_address3=='show_address3'}>{a.address3}</td>
        <td show={view_designation3=='show_designation3'}>{a.designation3}</td>
        <td show={view_class_taught3=='show_class_taught3'}>{a.class_taught3}</td>
        <td show={view_subject_taught3=='show_subject_taught3'}>{a.subject_taught3}</td>
        <td show={view_work_profile3=='show_work_profile3'}>{a.work_profile3}</td>
        <td show={view_from_date3=='show_from_date3'}>{a.from_date3}</td>
        <td show={view_to_date3=='show_to_date3'}>{a.to_date3}</td>
        <td show={view_salary_drawn3=='show_salary_drawn3'}>{a.salary_drawn3}</td>
        <td show={view_creation_date=='show_creation_date'}>{a.creation_date}</td>
				<td show={view_interview_call=='show_interview_call'}>{a.interview_call}</td>

    		<td class="has-text-right no-print">
          <div class="inline-flex rounded border border-grey overflow-hidden" hide={a.confirmDelete}>
           <!--  <span><a class="button is-small is-rounded " onclick={download_cv.bind(this, a.career_id)}>Download CV</a></span> -->
            <span show={a.interview_call=="N"}><a class="button is-small is-rounded " onclick={create_interview.bind(this, a.career_id)}>Call for interview</a></span>
            <span><a class="button is-small is-rounded" onclick={view_profile.bind(this, a.career_id)}>Profile</a></span>
            <span > <a class="button is-small is-rounded" rel="nofollow" onclick={confirmDelete}>Delete</a></span>
          </div>
          <div class="table-buttons" if={a.confirmDelete}>
            <span disabled={loading} class="button is-small is-rounded" onclick={delete}><i class="fa fa-check" ></i></span>
            <span disabled={loading} class="button is-small  has-text-danger is-rounded" onclick={cancelOperation}><i class="fa fa-times"></i></span>
          </div>
    		</td>
			</tr>
		</tbody>
	</table>
	</section>

	<!-- columnSetting Modal Start -->
	<div id="columnSetting" class="modal ">
	    <div class="modal-background"></div>
	    <div class="modal-card">
	      <header class="modal-card-head">
	        <p class="modal-card-title">Setting Configuaration</p>
	      </header>
	      <section class="modal-card-body">
	        <div class="columns">
            <table class="table is-fullwidth">
              <tbody>
                <tr each={st, i in fieldList}>
                  <td>
                    <input class="checkbox" type="checkbox" checked={st.done} id="{'addStaffName' + st.array_name}"
                     onclick={addCheckedColumn.bind(this,st) }>{st.field_name}
                  </td>
                </tr>
              </tbody>
            </table>
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
	<!-- columnSetting Modal End -->

	<!-- Open Cancel Result Modal Start -->
  	<div id="createInterviewModal" class="modal ">
    	<div class="modal-background"></div>
    	<div class="modal-card">
      		<header class="modal-card-head">
        		<p class="modal-card-title">Call for Interview</p>
      		</header>
		      	<section class="modal-card-body">
		        	<div class="columns">
		          		<div class="column">
		          			<div class="field">
				              	<div class="control">
				               		<label class="label">Interview Date</label>
				                	<input class="input date" ref="interview_date" type="text" readonly="readonly">
				              	</div>
				            </div>
				            <div class="field">
				              	<div class="control">
				               		<label class="label" for="interview_time">Interview Time</label>
				                	<input class="input is-small" ref="interview_time" type="time">
				              	</div>
				            </div>
	    				</div>
		        	</div>
		        </section>
	      	<footer class="modal-card-foot">
	        	<button class="button is-success" onclick={CreateInterviewCall} >Submit</button>
	        	<button class="button is-danger" id="item-modal-close" 
	        	onclick={closecreateInterviewModal}>Cancel</button>
	      	</footer>
    	</div>
  	</div>
  <!-- Cancel Result Modal End -->

  <!-- Start Profile View -->
  	<print-header></print-header>
  	<section class=" is-fluid" show={interviewed_candidate_view =='applicant_profile'}>
		<div class="level no-print">
			<div class="level-left">
				
			</div>
			<div class="level-right">
				<button class="button is-primary has-text-weight-bold " onclick="window.print()">
		    		<span class="icon">
          				<span class="fas fa-print"></span>
        			</span>
		    	</button>
		    	<button class="button is-warning has-text-weight-bold ml5" onclick={close_applicant_profile}>
		    		<span class="icon">
          				<span class="fas fa-arrow-left"></span>
        			</span>
		    	</button>
			</div>
		</div>

		<center>
  		<table class="table is-bordered career-profile-table">
        <caption class="career-profile-caption">Applicant Profile</caption>
      </table>	  
      <h1 class="career-profile-h3 is-size-5">Personal Details</h1>

      <table class=" table is-bordered career-profile-table">
  		  <tr>
         <th>Name</th>
          <td colspan="3" style="text-transform: capitalize;" class="profile-td">{st.first_name} {st.middle_name}
          {st.last_name}</td>
            <td style="width: 75px;" colspan="2" rowspan="6" class="profile-td"><div style="text-align: center;border: 1px solid #000;padding-top: 46px;margin-top:22px; height:150px;">Affix your recent passport size photograph<div>
            </td>
        </tr>
        <tr>
          <th class="profile-th">Father</th>
            <td colspan="3" class="profile-td">{st.f_first_name} {st.f_middle_name} {st.f_last_name} </td>
        <tr>
          <th class="profile-th">Husband  Name</th>
          <td colspan="3" class="profile-td">{st.husband_first_name} {st.husband_middle_name} {st.husband_last_name} </td>
        </tr>
        <tr>
          <th class="profile-th">Sex</th>
            <td class="profile-td">{st.sex}</td>
          <th class="profile-th">Marital Status</th>
            <td class="profile-td">{st.marital_status}</td>
        </tr>
        <tr>
          <th class="profile-th">DOB</th>
            <td class="profile-td">{st.date_of_birth} </td>
          <th class="profile-th">Age</th>
            <td class="profile-td">{st.age} </td>
        </tr>
        <tr>
        <th class="profile-th">Post Applied</th>
          <td class="profile-td">{st.post_applied_for}</td>
        <th class="profile-th">Subject Taught</th>
          <td class="profile-td">{st.subject_tobe_taught}</td>
        </tr> 
      </table> 

      <h1 class="career-profile-h3 is-size-5">Correspondence Address</h1>

      <table class="table is-bordered career-profile-table">
        <tr>
          <th class="profile-th">Address Line 1</th>
          	<td colspan="5" class="profile-td">{st.address_line1}</td>
        </tr>
        <tr>
          <th class="profile-th">Address Line 2</th>
          	<td colspan="5" class="profile-td">{st.address_line2}</td>
        </tr>
        <tr>
          <th class="profile-th">City</th>
            <td class="profile-td">{st.city}</td>
          <th class="profile-th">Zip</th>
            <td class="profile-td">{st.zip}</td>
          <th class="profile-th">State</th>
            <td class="profile-td">{st.state}</td>
        </tr>
        <tr>
          <th class="profile-th">Country</th>
            <td colspan="5" class="profile-td">{st.country}</td>
        </tr>
      </table>
      <h1 class="career-profile-h3 is-size-5">Permanent Address</h1>

      <table class="table is-bordered career-profile-table">
        <tr>
          <th>Address Line 1</th>
            <td colspan="5">{st.p_address_line1}</td>
        </tr>
        <tr>
          <th>Address Line 2</th>
            <td colspan="5">{st.p_address_line2}</td>
        </tr>
        <tr>
          <th>City</th>
            <td>{st.p_city}</td>
          <th>Zip</th>
            <td>{st.p_zip}</td>
          <th>State</th>
            <td>{st.p_state}</td>
        </tr>
        <tr>
          <th>Country</th>
            <td colspan="5">{st.p_country}</td>
        </tr>
        <tr>
      </table>

      <h1 class="career-profile-h3 is-size-5">Contact Information</h1>

      <table class="table is-bordered career-profile-table">
        <tr>
          <th style="width:80px;">Mobile</th>
            <td style="width:100px;">{st.mobile}</td>
          <th style="width:80px;">Email</th>
            <td>{st.email}</td>
          <th style="width:80px;">Phone (O)</th>
            <td>{st.phone_office} </td>
        </tr>
        </tr>
          <th>phone (R)</th><td colspan="5">{st.phone_residence}</td>  
        </tr>
        <tr>
      </table>
      <h1 class="career-profile-h3 is-size-5">Academic Qualification (B. Ed)</h1><br>
        
      <table class="table is-bordered career-profile-table">
        <tr>
          <th>Institution</th>
          <th>College / University</th>
          <th>Year</th>
          <th>Subject</th>
          <th>Marks (%)</th>
          <th>Remarks</th>
        </tr>
        <tr>
          <td>{st.bed_institution} </td>
          <td>{st.bed_college} </td>
          <td>{st.bed_year} </td>
          <td>{st.bed_subject} </td>
          <td>{st.bed_marks} </td>
          <td>{st.bed_remarks} </td>
        </tr>
  <!--     <tr> -->
      </table>

      <h1 class="career-profile-h3 is-size-5">Montessori / T.T.C</h1>

      <table class="table is-bordered career-profile-table">
        <tr>
          <th>Institution</th>
          <th>College / University</th>
          <th>Year</th>
          <th>Subject</th>
          <th>Marks (%)</th>
          <th>Remarks</th>
        </tr>
        <tr>
          <td>{st.ttc_institution}</td>
          <td>{st.ttc_college} </td>
          <td>{st.ttc_year} </td>
          <td>{st.ttc_subject} </td>
          <td>{st.ttc_marks} </td>
          <td>{st.ttc_remarks} </td>
        </tr>              
      </table>

      <h1 class="career-profile-h3 is-size-5">Post Graduation</h1>
      <table class="table is-bordered career-profile-table">
        <tr>
          <th>Degree</th>
          <th>Institution</th>
          <th>College / University</th>
          <th>Year</th>
          <th>Subject</th>
          <th>Marks (%)</th>
          <th>Remarks</th>
        </tr>
       </tr>
         <td>{st.pg_degree}</td>
         <td>{st.pg_institution}</td>
         <td>{st.pg_college}</td>
         <td>{st.pg_year}</td>
         <td>{st.pg_subject}</td>
         <td>{st.pg_marks}</td>
         <td>{st.pg_remarks}</td>
       </tr>
       <tr>             
      </table> 
      <h1 class="career-profile-h3 is-size-5">Graduation</h1>

      <table class="table is-bordered career-profile-table">
        <tr>
         <th>Degree</th>
         <th>Institution</th>
         <th>College / University</th>
         <th>Year</th>
         <th>Subject</th>
         <th>Marks (%)</th>
         <th>Remarks</th>       
        </tr>
         <tr>
           <td>{st.g_degree}</td>
           <td>{st.g_institution}</td>
           <td>{st.g_college}</td>
           <td>{st.g_year}</td>
           <td>{st.g_subject}</td>
           <td>{st.g_marks}</td>
           <td>{st.g_remarks}</td>
         </tr>
      </table>
        <h1 class="career-profile-h3 is-size-5">XII</h1>
      <table class="table is-bordered career-profile-table">
       <tr>
         <th>Stream</th>
         <th>Institution</th>
          <th>College / University</th>
          <th>Year</th>
          <th>Subject</th>
          <th>Marks (%)</th>
          <th>Remarks</th>
       </tr>
       </tr>
         <td></td>
         <td>{st.xii_institution}</td>
         <td>{st.xii_college}</td>
         <td>{st.xii_year}</td>
         <td>{st.xii_subject}</td>
         <td>{st.xii_marks}</td>
         <td>{st.xii_remarks}</td>
       </tr>
      </table>
      <h1 class="career-profile-h3 is-size-5">X</h1>
      <table class="table is-bordered career-profile-table">
       <tr>
         <th>Institution</th>
          <th>College / University</th>
          <th>Year</th>
          <th>Subject</th>
          <th>Marks (%)</th>
          <th>Remarks</th>
       </tr>
       </tr>
         <td>{st.x_institution}</td>
         <td>{st.x_college}</td>
         <td>{st.x_year}</td>
         <td>{st.x_subject}</td>
         <td>{st.x_marks}</td>
         <td>{st.x_remarks}</td>
       </tr>
      </table>
      <h1 class="career-profile-h3 is-size-5">Other Qualification</h1>
      <table class="table is-bordered career-profile-table">
       <tr>
          <th>Sl.</th>
          <th>Degree/ Certificates</th>
          <th>University/Board/Institution</th>
          <th>Marks (%)</th>
          <th>Year</th>
          <th>Remarks</th>
       </tr>
       <tr>
         <td>1</td>
         <td>{st.degree1}</td>
         <td>{st.university1}</td>
         <td>{st.marks1}</td>
         <td>{st.year1}</td>
         <td>{st.remarks1}</td>
       </tr>
       <tr>
         <td>2</td>
         <td>{st.degree2}</td>
         <td>{st.university2}</td>
         <td>{st.marks2}</td>
         <td>{st.year2}</td>
         <td>{st.remarks2}</td>
      </tr>
      <tr>
         <td>3</td>
         <td>{st.degree3}</td>
         <td>{st.university3}</td>
         <td>{st.marks3}</td>
         <td>{st.year3}</td>
         <td>{st.remarks3}</td>
       </tr>
      </table>
      <h1 class="career-profile-h3 is-size-5">Work Experience</h1>
     <table class="table is-bordered career-profile-table">
     <tr>
        <th class="profile-th">Sl.</th>
        <th class="profile-th">School/Institution</th>
        <th class="profile-th">Address</th>
        <th class="profile-th">Designation</th>
        <th class="profile-th">Class Taught</th>
        <th class="profile-th">Subject Taught</th>
        <th class="profile-th">Work Profile</th>
        <th class="profile-th">From</th>
        <th class="profile-th">To</th>
        <th class="profile-th">Salary</th>
     </tr>
     <tr>
       <td class="profile-td">1</td>
       <td class="profile-td">{st.school1}</td>
       <td class="profile-td">{st.address1} </td>
       <td class="profile-td">{st.designation1} </td>
       <td class="profile-td">{st.class_taught1} </td>
       <td class="profile-td">{st.subject_taught1} </td>
       <td class="profile-td">{st.work_profile1} </td> 
       <td class="profile-td">{st.from_date1} </td>
       <td class="profile-td">{st.to_date1} </td>
       <td class="profile-td">{st.salary_drawn1} </td>
     </tr>
     <tr>
       <td class="profile-td">2</td>
       <td class="profile-td">{st.school2} </td>
       <td class="profile-td">{st.address2} </td>
       <td class="profile-td">{st.designation2} </td>
       <td class="profile-td">{st.class_taught2} </td>
       <td class="profile-td">{st.subject_taught2} </td>
       <td class="profile-td">{st.work_profile2} </td> 
       <td class="profile-td">{st.from_date2} </td>
       <td class="profile-td">{st.to_date2} </td>
       <td class="profile-td">{st.salary_drawn2} </td>
    </tr>
    <tr>
       <td class="profile-td">3</td>
       <td class="profile-td">{st.school3} </td>
       <td class="profile-td">{st.address3} </td>
       <td class="profile-td">{st.designation3} </td>
       <td class="profile-td">{st.class_taught3} </td>
       <td class="profile-td">{st.subject_taught3} </td>
       <td class="profile-td">{st.work_profile3} </td> 
       <td class="profile-td">{st.from_date3} </td>
       <td class="profile-td">{st.to_date3} </td>
       <td class="profile-td">{st.salary_drawn3} </td>
     </tr>
    </table>
    <h1 class="career-profile-h3 is-size-5">Special Achivements</h1>
     <table class="table is-bordered career-profile-table">
     <tr>
       <td colspan="6">{st.s_achievements}</td>
     </tr>
     </table>
    <h1 class="career-profile-h3 is-size-5">References   (If any)</h1>
      <table class="table is-bordered career-profile-table">
       <tr>
         <th>Sl.</th>
         <th>Name</th>
         <th>Organisation</th>
         <th>Designation</th>
         <th>Phone</th>
         <th>Mobile</th>
         <th>Email</th> 
       </tr>
       <tr>
          <td>1</td>
          <td>{st.r_name}</td>
          <td>{st.r_organisation}</td>
          <td>{st.r_designation}</td>
          <td>{st.r_phone}</td>
          <td>{st.r_mobile}</td>
          <td>{st.r_email}</td>
       </tr>
       <tr>
          <td>2</td>
          <td>{st.r1_name}</td>
          <td>{st.r1_organisation}</td>
          <td>{st.r1_designation}</td>
          <td>{st.r1_phone}</td>
          <td>{st.r1_mobile}</td>
          <td>{st.r1_email}</td>
       </tr>
      </table>
      <h1 class="career-profile-h3 is-size-5" style="margin-top: 20px;">Declaration</h1>
      <p style="width:860px;width: 860px;text-align: justify;padding-top: 15px;">
      I hereby declare that all statements made in this application are true, complete and correct to the best of my knowledge and belief. I understand that in the event of any information being found untrue or incorrect at any stage, my candidature is liable to be cancelled.
      </p>
      <p style="width:860px;width: 860px;text-align:right;padding-top:25px;">
      Signature
      </p>
      <div class='page-break'></div>
  </center>
</section>

  <!-- End Profile View -->

<script>
	var self = this
	self.st={}
    self.on("mount", function(){
      self.loading = false;
      
      self.fieldList=[
    	{field_name : "Name", array_name: "full_name"},
    	{field_name : "Post Applied", array_name: "post_applied_for"},
    	{field_name : "Subject Taught", array_name: "subject_tobe_taught"},
    	{field_name : "Class Taught", array_name: "class_tobe_taught"},
      {field_name : "DOB", array_name: "date_of_birth"},
      {field_name : "Age", array_name: "age"},
      {field_name : "Sex", array_name: "sex"},
      {field_name : "Father's Name", array_name: "father_name"},
      {field_name : "Husband's Name", array_name: "husband_name"},
      {field_name : "Marital Status", array_name: "marital_status"},
      {field_name : "Mobile", array_name: "mobile"},
      {field_name : "Email", array_name: "email"},
      {field_name : "Phone Office", array_name: "phone_office"},
      {field_name : "Phone Residence", array_name: "phone_residence"},
      {field_name : "Permanent Address", array_name: "p_address"},
      {field_name : "Correspondence Address", array_name: "address"},
      {field_name : "B.Ed Institution", array_name: "bed_institution"},
      {field_name : "B.Ed College", array_name: "bed_college"},
      {field_name : "B.Ed Year", array_name: "bed_year"},
      {field_name : "B.Ed Subject", array_name: "bed_subject"},
      {field_name : "B.Ed Marks", array_name: "bed_marks"},
      {field_name : "B.Ed Remarks", array_name: "bed_remarks"},
      {field_name : "TTC Institution", array_name: "ttc_institution"},
      {field_name : "TTC College", array_name: "ttc_college"},
      {field_name : "TTC Year", array_name: "ttc_year"},
      {field_name : "TTC Subject", array_name: "ttc_subject"},
      {field_name : "TTC Marks", array_name: "ttc_marks"},
      {field_name : "TTC Remarks", array_name: "ttc_remarks"},
      {field_name : "PG Institution", array_name: "pg_institution"},
      {field_name : "PG College", array_name: "pg_college"},
      {field_name : "PG Year", array_name: "pg_year"},
      {field_name : "PG Subject", array_name: "pg_subject"},
      {field_name : "PG Marks", array_name: "pg_marks"},
      {field_name : "PG Remarks", array_name: "pg_remarks"},
      {field_name : "XII Institution", array_name: "xii_institution"},
      {field_name : "XII College", array_name: "xii_college"},
      {field_name : "XII Year", array_name: "xii_year"},
      {field_name : "XII Subject", array_name: "xii_subject"},
      {field_name : "XII Marks", array_name: "xii_marks"},
      {field_name : "XII Remarks", array_name: "xii_remarks"},
      {field_name : "X Institution", array_name: "x_institution"},
      {field_name : "X College", array_name: "x_college"},
      {field_name : "X Year", array_name: "x_year"},
      {field_name : "X Subject", array_name: "x_subject"},
      {field_name : "X Marks", array_name: "x_marks"},
      {field_name : "X Remarks", array_name: "x_remarks"},
      {field_name : "G Institution", array_name: "g_institution"},
      {field_name : "G College", array_name: "g_college"},
      {field_name : "G Year", array_name: "g_year"},
      {field_name : "G Subject", array_name: "g_subject"},
      {field_name : "G Marks", array_name: "g_marks"},
      {field_name : "G Remarks", array_name: "g_remarks"},
      {field_name : "Degree 1", array_name: "degree1"},
      {field_name : "University 1", array_name: "university1"},
      {field_name : "Marks 1", array_name: "marks1"},
      {field_name : "Year 1", array_name: "year1"},
      {field_name : "Remarks 1", array_name: "remarks1"},
      {field_name : "Degree 2", array_name: "degree2"},
      {field_name : "University 2", array_name: "university2"},
      {field_name : "Marks 2", array_name: "marks2"},
      {field_name : "Year 2", array_name: "year2"},
      {field_name : "Remarks 2", array_name: "remarks2"},
      {field_name : "Degree 3", array_name: "degree3"},
      {field_name : "University 3", array_name: "university3"},
      {field_name : "Marks 3", array_name: "marks3"},
      {field_name : "Year 3", array_name: "year3"},
      {field_name : "Remarks 3", array_name: "remarks3"},
      {field_name : "School 1", array_name: "school1"},
      {field_name : "Address 1", array_name: "address1"},
      {field_name : "Designation 1", array_name: "designation1"},
      {field_name : "Class Taught 1", array_name: "class_taught1"},
      {field_name : "Subject Taught 1", array_name: "subject_taught1"},
      {field_name : "Work Profile 1", array_name: "work_profile1"},
      {field_name : "From Date 1", array_name: "from_date1"},
      {field_name : "To Date 1", array_name: "to_date1"},
      {field_name : "Salary 1", array_name: "salary_drawn1"},
      {field_name : "School 2", array_name: "school2"},
      {field_name : "Address 2", array_name: "address2"},
      {field_name : "Designation 2", array_name: "designation2"},
      {field_name : "Class Taught 2", array_name: "class_taught2"},
      {field_name : "Subject Taught 2", array_name: "subject_taught2"},
      {field_name : "Work Profile 2", array_name: "work_profile2"},
      {field_name : "From Date 2", array_name: "from_date2"},
      {field_name : "To Date 2", array_name: "to_date2"},
      {field_name : "Salary 2", array_name: "salary_drawn2"},
      {field_name : "School 3", array_name: "school3"},
      {field_name : "Address 3", array_name: "address3"},
      {field_name : "Designation 3", array_name: "designation3"},
      {field_name : "Class Taught 3", array_name: "class_taught3"},
      {field_name : "Subject Taught 3", array_name: "subject_taught3"},
      {field_name : "Work Profile 3", array_name: "work_profile3"},
      {field_name : "From Date 3", array_name: "from_date3"},
      {field_name : "To Date 3", array_name: "to_date3"},
      {field_name : "Salary 3", array_name: "salary_drawn3"},
      {field_name : "Submission Date", array_name: "creation_date"},
    	{field_name : "Interview Call", array_name: "interview_call"}
    	
    ]

      self.fieldList.map( q => {
        if(q.array_name== "full_name"){
          self.view_name="show_name"  
          q.done=true  
        }
        if(q.array_name== "post_applied_for"){
          self.view_post_applied="show_post_applied"  
          q.done=true  
        }
        if(q.array_name== "interview_call"){
          self.view_interview_call="show_interview_call"
          q.done=true  
        }
        if(q.array_name== "subject_tobe_taught"){
          self.view_subject_taught= "show_subject_taught"
          q.done=true
        }
        if(q.array_name== "class_tobe_taught"){
          self.view_class_taught ="show_class_taught"
          q.done=true
        }
        if(q.array_name== "date_of_birth"){
          self.view_dob= "show_dob"
          q.done=true
        }
        if(q.array_name== "age"){
          self.view_age= "show_age"
          q.done=true
        }
        if(q.array_name== "sex"){
          self.view_sex= "show_sex"
          q.done=true
        }
        if(q.array_name== "creation_date"){
          self.view_creation_date="show_creation_date"
          q.done=true
        }
      })
      flatpickr(".date", {
	    allowInput: true,
        dateFormat: "d/m/Y",
  		})
      self.interviewed_candidate_view = 'show_interviewed_candidate'
      self.update();
    })

    self.on("unmount", function(){
      careerStore.off('read_applicant_detail_changed',ReadApplicantDetailChanged)
      careerStore.off('read_applicant_profile_changed',ReadApplicantProfileChanged)
      careerStore.off('create_interview_call_changed',CreateInterviewCallChanged)
      careerStore.off('delete_applicant_detail_changed',DeleteApplicantDetailChanged)
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


    if(q.done==true && q.array_name== "full_name"){
      self.view_name="show_name"    
    }
    if(q.done==true && q.array_name== "post_applied_for"){
      self.view_post_applied= "show_post_applied"
    }
    if(q.done==true && q.array_name== "subject_tobe_taught"){
      self.view_subject_taught= "show_subject_taught"
    }
    if(q.done==true && q.array_name== "class_tobe_taught"){
      self.view_class_taught ="show_class_taught"
    }
    if(q.done==true && q.array_name== "date_of_birth"){
      self.view_dob= "show_dob"
    }
    if(q.done==true && q.array_name== "age"){
      self.view_age= "show_age"
    }
    if(q.done==true && q.array_name== "sex"){
      self.view_sex= "show_sex"
    }
    if(q.done==true && q.array_name== "father_name"){
      self.view_father_name="show_father_name"
    }
    if(q.done==true && q.array_name== "husband_name"){
      self.view_husband_name="show_husband_name"
    }
    if(q.done==true && q.array_name== "marital_status"){
      self.view_marital_status="show_marital_status"
    }
    if(q.done==true && q.array_name== "mobile"){
      self.view_mobile="show_mobile"
    }
    if(q.done==true && q.array_name== "email"){
      self.view_email="show_email"
    }
    if(q.done==true && q.array_name== "phone_office"){
      self.view_phone_office="show_phone_office"
    }
    if(q.done==true && q.array_name== "phone_residence"){
      self.view_phone_residence="show_phone_residence"
    }
    if(q.done==true && q.array_name== "p_address"){
      self.view_p_address="show_p_address"
    }
    if(q.done==true && q.array_name== "address"){
      self.view_address="show_address"
    }
    if(q.done==true && q.array_name== "bed_institution"){
      self.view_bed_institution="show_bed_institution"
    }
    if(q.done==true && q.array_name== "bed_college"){
      self.view_bed_college="show_bed_college"
    }
    if(q.done==true && q.array_name== "bed_year"){
      self.view_bed_year="show_bed_year"
    }
    if(q.done==true && q.array_name== "bed_subject"){
      self.view_bed_subject="show_bed_subject"
    }
    if(q.done==true && q.array_name== "bed_marks"){
      self.view_bed_marks="show_bed_marks"
    }
    if(q.done==true && q.array_name== "bed_remarks"){
      self.view_bed_remarks="show_bed_remarks"
    }
    if(q.done==true && q.array_name== "ttc_institution"){
      self.view_ttc_institution="show_ttc_institution"
    }
    if(q.done==true && q.array_name== "ttc_college"){
      self.view_ttc_college="show_ttc_college"
    }
    if(q.done==true && q.array_name== "ttc_year"){
      self.view_ttc_year="show_ttc_year"
    }
    if(q.done==true && q.array_name== "ttc_subject"){
      self.view_ttc_subject="show_ttc_subject"
    }
    if(q.done==true && q.array_name== "ttc_marks"){
      self.view_ttc_marks="show_ttc_marks"
    }
    if(q.done==true && q.array_name== "ttc_remarks"){
      self.view_ttc_remarks="show_ttc_remarks"
    }
    if(q.done==true && q.array_name== "pg_institution"){
      self.view_pg_institution="show_pg_institution"
    }
    if(q.done==true && q.array_name== "pg_college"){
      self.view_pg_college="show_pg_college"
    }
    if(q.done==true && q.array_name== "pg_year"){
      self.view_pg_year="show_pg_year"
    }
    if(q.done==true && q.array_name== "pg_subject"){
      self.view_pg_subject="show_pg_subject"
    }
    if(q.done==true && q.array_name== "pg_marks"){
      self.view_pg_marks="show_pg_marks"
    }
    if(q.done==true && q.array_name== "pg_remarks"){
      self.view_pg_remarks="show_pg_remarks"
    }
    if(q.done==true && q.array_name== "xii_institution"){
      self.view_xii_institution="show_xii_institution"
    }
    if(q.done==true && q.array_name== "xii_college"){
      self.view_xii_college="show_xii_college"
    }
    if(q.done==true && q.array_name== "xii_year"){
      self.view_xii_year="show_xii_year"
    }
    if(q.done==true && q.array_name== "xii_subject"){
      self.view_xii_subject="show_xii_subject"
    }
    if(q.done==true && q.array_name== "xii_marks"){
      self.view_xii_marks="show_xii_marks"
    }
    if(q.done==true && q.array_name== "xii_remarks"){
      self.view_xii_remarks="show_xii_remarks"
    }
    if(q.done==true && q.array_name== "x_institution"){
      self.view_x_institution="show_x_institution"
    }
    if(q.done==true && q.array_name== "x_college"){
      self.view_x_college="show_x_college"
    }
    if(q.done==true && q.array_name== "x_year"){
      self.view_x_year="show_x_year"
    }
    if(q.done==true && q.array_name== "x_subject"){
      self.view_x_subject="show_x_subject"
    }
    if(q.done==true && q.array_name== "x_marks"){
      self.view_x_marks="show_x_marks"
    }
    if(q.done==true && q.array_name== "x_remarks"){
      self.view_x_remarks="show_x_remarks"
    }
    if(q.done==true && q.array_name== "g_institution"){
      self.view_g_institution="show_g_institution"
    }
    if(q.done==true && q.array_name== "g_college"){
      self.view_g_college="show_g_college"
    }
    if(q.done==true && q.array_name== "g_year"){
      self.view_g_year="show_g_year"
    }
    if(q.done==true && q.array_name== "g_subject"){
      self.view_g_subject="show_g_subject"
    }
    if(q.done==true && q.array_name== "g_marks"){
      self.view_g_marks="show_g_marks"
    }
    if(q.done==true && q.array_name== "g_remarks"){
      self.view_g_remarks="show_g_remarks"
    }
    if(q.done==true && q.array_name== "degree1"){
      self.view_degree1="show_degree1"
    }
    if(q.done==true && q.array_name== "university1"){
      self.view_university1="show_university1"
    }
    if(q.done==true && q.array_name== "marks1"){
      self.view_marks1="show_marks1"
    }
    if(q.done==true && q.array_name== "year1"){
      self.view_year1="show_year1"
    }
    if(q.done==true && q.array_name== "remarks1"){
      self.view_remarks1="show_remarks1"
    }
    if(q.done==true && q.array_name== "degree2"){
      self.view_degree2="show_degree2"
    }
    if(q.done==true && q.array_name== "university2"){
      self.view_university2="show_university2"
    }
    if(q.done==true && q.array_name== "marks2"){
      self.view_marks2="show_marks2"
    }
    if(q.done==true && q.array_name== "year2"){
      self.view_year2="show_year2"
    }
    if(q.done==true && q.array_name== "remarks2"){
      self.view_remarks2="show_remarks2"
    }
    if(q.done==true && q.array_name== "degree3"){
      self.view_degree3="show_degree3"
    }
    if(q.done==true && q.array_name== "university3"){
      self.view_university3="show_university3"
    }
    if(q.done==true && q.array_name== "marks3"){
      self.view_marks3="show_marks3"
    }
    if(q.done==true && q.array_name== "year3"){
      self.view_year3="show_year3"
    }
    if(q.done==true && q.array_name== "remarks3"){
      self.view_remarks3="show_remarks3"
    }
    if(q.done==true && q.array_name== "school1"){
      self.view_school1="show_school1"
    }
    if(q.done==true && q.array_name== "address1"){
      self.view_address1="show_address1"
    }
    if(q.done==true && q.array_name== "designation1"){
      self.view_designation1="show_designation1"
    }
    if(q.done==true && q.array_name== "class_taught1"){
      self.view_class_taught1="show_class_taught1"
    }
    if(q.done==true && q.array_name== "subject_taught1"){
      self.view_subject_taught1="show_subject_taught1"
    }
    if(q.done==true && q.array_name== "work_profile1"){
      self.view_work_profile1="show_work_profile1"
    }
    if(q.done==true && q.array_name== "from_date1"){
      self.view_from_date1="show_from_date1"
    }
    if(q.done==true && q.array_name== "to_date1"){
      self.view_to_date1="show_to_date1"
    }
    if(q.done==true && q.array_name== "salary_drawn1"){
      self.view_salary_drawn1="show_salary_drawn1"
    }
    if(q.done==true && q.array_name== "school2"){
      self.view_school2="show_school2"
    }
    if(q.done==true && q.array_name== "address2"){
      self.view_address2="show_address2"
    }
    if(q.done==true && q.array_name== "designation2"){
      self.view_designation2="show_designation2"
    }
    if(q.done==true && q.array_name== "class_taught2"){
      self.view_class_taught2="show_class_taught2"
    }
    if(q.done==true && q.array_name== "subject_taught2"){
      self.view_subject_taught2="show_subject_taught2"
    }
    if(q.done==true && q.array_name== "work_profile2"){
      self.view_work_profile2="show_work_profile2"
    }
    if(q.done==true && q.array_name== "from_date2"){
      self.view_from_date2="show_from_date2"
    }
    if(q.done==true && q.array_name== "to_date2"){
      self.view_to_date2="show_to_date2"
    }
    if(q.done==true && q.array_name== "salary_drawn2"){
      self.view_salary_drawn2="show_salary_drawn2"
    }
    if(q.done==true && q.array_name== "school3"){
      self.view_school3="show_school3"
    }
    if(q.done==true && q.array_name== "address3"){
      self.view_address3="show_address3"
    }
    if(q.done==true && q.array_name== "designation3"){
      self.view_designation3="show_designation3"
    }
    if(q.done==true && q.array_name== "class_taught3"){
      self.view_class_taught3="show_class_taught3"
    }
    if(q.done==true && q.array_name== "subject_taught3"){
      self.view_subject_taught3="show_subject_taught3"
    }
    if(q.done==true && q.array_name== "work_profile3"){
      self.view_work_profile3="show_work_profile3"
    }
    if(q.done==true && q.array_name== "from_date3"){
      self.view_from_date3="show_from_date3"
    }
    if(q.done==true && q.array_name== "to_date3"){
      self.view_to_date3="show_to_date3"
    }
    if(q.done==true && q.array_name== "salary_drawn3"){
      self.view_salary_drawn3="show_salary_drawn3"
    }
    if(q.done==true && q.array_name== "creation_date"){
      self.view_creation_date="show_creation_date"
    }
    if(q.done==true && q.array_name== "interview_call"){
      self.view_interview_call="show_interview_call"
    }


    /*<!-- False Check Box-->*/


    if(q.done==false && q.array_name== "full_name"){
      self.view_name=""
    }
    if(q.done==false && q.array_name== "post_applied_for"){
      self.view_post_applied= ""
    }
    if(q.done==false && q.array_name== "subject_tobe_taught"){
      self.view_subject_taught= "" 
    }
    if(q.done==false && q.array_name== "class_tobe_taught"){
      self.view_class_taught =""  
    }
    if(q.done==false && q.array_name== "date_of_birth"){
      self.view_dob= ""
    }
    if(q.done==false && q.array_name== "age"){
      self.view_age= ""
    }
    if(q.done==false && q.array_name== "sex"){
      self.view_sex= ""
    }
    if(q.done==false && q.array_name== "father_name"){
      self.view_father_name= ""
    }
    if(q.done==false && q.array_name== "husband_name"){
      self.view_husband_name= ""
    }
    if(q.done==false && q.array_name== "marital_status"){
      self.view_marital_status= ""
    }
    if(q.done==false && q.array_name== "mobile"){
      self.view_mobile= ""
    }
    if(q.done==false && q.array_name== "email"){
      self.view_email= ""
    }
    if(q.done==false && q.array_name== "phone_office"){
      self.view_phone_office= ""
    }
    if(q.done==false && q.array_name== "phone_residence"){
      self.view_phone_residence= ""
    }
    if(q.done==false && q.array_name== "p_address"){
      self.view_p_address= ""
    }
    if(q.done==false && q.array_name== "address"){
      self.view_address= ""
    }
    if(q.done==false && q.array_name== "bed_institution"){
      self.view_bed_institution= ""
    }
    if(q.done==false && q.array_name== "bed_college"){
      self.view_bed_college= ""
    }
    if(q.done==false && q.array_name== "bed_year"){
      self.view_bed_year= ""
    }
    if(q.done==false && q.array_name== "bed_subject"){
      self.view_bed_subject= ""
    }
    if(q.done==false && q.array_name== "bed_marks"){
      self.view_bed_marks= ""
    }
    if(q.done==false && q.array_name== "bed_remarks"){
      self.view_bed_remarks= ""
    }
    if(q.done==false && q.array_name== "ttc_institution"){
      self.view_ttc_institution= ""
    }
    if(q.done==false && q.array_name== "ttc_college"){
      self.view_ttc_college= ""
    }
    if(q.done==false && q.array_name== "ttc_year"){
      self.view_ttc_year= ""
    }
    if(q.done==false && q.array_name== "ttc_subject"){
      self.view_ttc_subject= ""
    }
    if(q.done==false && q.array_name== "ttc_marks"){
      self.view_ttc_marks= ""
    }
    if(q.done==false && q.array_name== "ttc_remarks"){
      self.view_ttc_remarks= ""
    }
    if(q.done==false && q.array_name== "pg_institution"){
      self.view_pg_institution= ""
    }
    if(q.done==false && q.array_name== "pg_college"){
      self.view_pg_college= ""
    }
    if(q.done==false && q.array_name== "pg_year"){
      self.view_pg_year= ""
    }
    if(q.done==false && q.array_name== "pg_subject"){
      self.view_pg_subject= ""
    }
    if(q.done==false && q.array_name== "pg_marks"){
      self.view_pg_marks= ""
    }
    if(q.done==false && q.array_name== "pg_remarks"){
      self.view_pg_remarks= ""
    }
    if(q.done==false && q.array_name== "xii_institution"){
      self.view_xii_institution= ""
    }
    if(q.done==false && q.array_name== "xii_college"){
      self.view_xii_college= ""
    }
    if(q.done==false && q.array_name== "xii_year"){
      self.view_xii_year= ""
    }
    if(q.done==false && q.array_name== "xii_subject"){
      self.view_xii_subject= ""
    }
    if(q.done==false && q.array_name== "xii_marks"){
      self.view_xii_marks= ""
    }
    if(q.done==false && q.array_name== "xii_remarks"){
      self.view_xii_remarks= ""
    }
    if(q.done==false && q.array_name== "x_institution"){
      self.view_x_institution= ""
    }
    if(q.done==false && q.array_name== "x_college"){
      self.view_x_college= ""
    }
    if(q.done==false && q.array_name== "x_year"){
      self.view_x_year= ""
    }
    if(q.done==false && q.array_name== "x_subject"){
      self.view_x_subject= ""
    }
    if(q.done==false && q.array_name== "x_marks"){
      self.view_x_marks= ""
    }
    if(q.done==false && q.array_name== "x_remarks"){
      self.view_x_remarks= ""
    }
    if(q.done==false && q.array_name== "g_institution"){
      self.view_g_institution= ""
    }
    if(q.done==false && q.array_name== "g_college"){
      self.view_g_college= ""
    }
    if(q.done==false && q.array_name== "g_year"){
      self.view_g_year= ""
    }
    if(q.done==false && q.array_name== "g_subject"){
      self.view_g_subject= ""
    }
    if(q.done==false && q.array_name== "g_marks"){
      self.view_g_marks= ""
    }
    if(q.done==false && q.array_name== "g_remarks"){
      self.view_g_remarks= ""
    }
    if(q.done==false && q.array_name== "degree1"){
      self.view_degree1= ""
    }
    if(q.done==false && q.array_name== "university1"){
      self.view_university1= ""
    }
    if(q.done==false && q.array_name== "marks1"){
      self.view_marks1= ""
    }
    if(q.done==false && q.array_name== "year1"){
      self.view_year1= ""
    }
    if(q.done==false && q.array_name== "remarks1"){
      self.view_remarks1= ""
    }
    if(q.done==false && q.array_name== "degree2"){
      self.view_degree2= ""
    }
    if(q.done==false && q.array_name== "university2"){
      self.view_university2= ""
    }
    if(q.done==false && q.array_name== "marks2"){
      self.view_marks2= ""
    }
    if(q.done==false && q.array_name== "year2"){
      self.view_year2= ""
    }
    if(q.done==false && q.array_name== "remarks2"){
      self.view_remarks2= ""
    }
    if(q.done==false && q.array_name== "degree3"){
      self.view_degree3= ""
    }
    if(q.done==false && q.array_name== "university3"){
      self.view_university3= ""
    }
    if(q.done==false && q.array_name== "marks3"){
      self.view_marks3= ""
    }
    if(q.done==false && q.array_name== "year3"){
      self.view_year3= ""
    }
    if(q.done==false && q.array_name== "remarks3"){
      self.view_remarks3= ""
    }
    if(q.done==false && q.array_name== "school1"){
      self.view_school1= ""
    }
    if(q.done==false && q.array_name== "address1"){
      self.view_address1= ""
    }
    if(q.done==false && q.array_name== "designation1"){
      self.view_designation1= ""
    }
    if(q.done==false && q.array_name== "class_taught1"){
      self.view_class_taught1= ""
    }
    if(q.done==false && q.array_name== "subject_taught1"){
      self.view_subject_taught1= ""
    }
    if(q.done==false && q.array_name== "work_profile1"){
      self.view_work_profile1= ""
    }
    if(q.done==false && q.array_name== "from_date1"){
      self.view_from_date1= ""
    }
    if(q.done==false && q.array_name== "to_date1"){
      self.view_to_date1= ""
    }
    if(q.done==false && q.array_name== "salary_drawn1"){
      self.view_salary_drawn1= ""
    }
    if(q.done==false && q.array_name== "school2"){
      self.view_school2= ""
    }
    if(q.done==false && q.array_name== "address2"){
      self.view_address2= ""
    }
    if(q.done==false && q.array_name== "designation2"){
      self.view_designation2= ""
    }
    if(q.done==false && q.array_name== "class_taught2"){
      self.view_class_taught2= ""
    }
    if(q.done==false && q.array_name== "subject_taught2"){
      self.view_subject_taught2= ""
    }
    if(q.done==false && q.array_name== "work_profile2"){
      self.view_work_profile2= ""
    }
    if(q.done==false && q.array_name== "from_date2"){
      self.view_from_date2= ""
    }
    if(q.done==false && q.array_name== "to_date2"){
      self.view_to_date2= ""
    }
    if(q.done==false && q.array_name== "salary_drawn2"){
      self.view_salary_drawn2= ""
    }
    if(q.done==false && q.array_name== "school3"){
      self.view_school3= ""
    }
    if(q.done==false && q.array_name== "address3"){
      self.view_address3= ""
    }
    if(q.done==false && q.array_name== "designation3"){
      self.view_designation3= ""
    }
    if(q.done==false && q.array_name== "class_taught3"){
      self.view_class_taught3= ""
    }
    if(q.done==false && q.array_name== "subject_taught3"){
      self.view_subject_taught3= ""
    }
    if(q.done==false && q.array_name== "work_profile3"){
      self.view_work_profile3= ""
    }
    if(q.done==false && q.array_name== "from_date3"){
      self.view_from_date3= ""
    }
    if(q.done==false && q.array_name== "to_date3"){
      self.view_to_date3= ""
    }
    if(q.done==false && q.array_name== "salary_drawn3"){
      self.view_salary_drawn3= ""
    }
    if(q.done==false && q.array_name== "creation_date"){
      self.view_creation_date= ""
    }
    if(q.done==false && q.array_name== "interview_call"){
      self.view_interview_call= ""
    }
  })             
}

    self.getData = () => {
      var startDate = document.getElementById("start_date").value;
      var endDate = document.getElementById("end_date").value;
    	if(!self.refs.start_date.value){
        toastr.info("Please enter From Date and try again")
      	}else if(!self.refs.end_date.value){
      	toastr.info("Please enter To Date and try again")
      	}else if((Date.parse(startDate) >= Date.parse(endDate))){
          toastr.info("Please enter To Date Grater Than From Date")
        }else{
    	    var obj={}
          obj['start_date']=convertDate(self.refs.start_date.value)
          obj['end_date']=convertDate(self.refs.end_date.value)        
          self.loading = true
          careerStore.trigger('read_applicant_detail', obj)

          console.log(obj)
        }
    }

    self.csvExport = () => {
        var startDate = document.getElementById("start_date").value;
        var endDate = document.getElementById("end_date").value;

        if(!self.refs.start_date.value){
        toastr.info("Please enter Start Date and try again")
      	}else if(!self.refs.end_date.value){
      	toastr.info("Please enter End Date and try again")
      	}else if((Date.parse(startDate) >= Date.parse(endDate))){
          toastr.info("Please enter To Date Grater Than From Date")
        }else{
    	    var obj={}
          obj['start_date']=convertDate(self.refs.start_date.value)
          obj['end_date']=convertDate(self.refs.end_date.value)          
          careerStore.trigger('csv_export_applicant_detail', obj)
        }
    }

    self.create_interview = (c,a) => {
      self.career_id = c
      console.log(self.career_id)
      $("#createInterviewModal").addClass("is-active");
    }

    self.closecreateInterviewModal = () => {
      $("#createInterviewModal").removeClass("is-active");
    }

    self.CreateInterviewCall = () =>{
    	var obj={}
    	var interview_detail={};
    	interview_detail['interview_date']=convertDate(self.refs.interview_date.value)
    	interview_detail['interview_time']=self.refs.interview_time.value 
    	obj['interview_detail']=interview_detail;
    	
    	careerStore.trigger('create_interview_call',obj,self.career_id)	
    }

    self.view_profile = (c,a) => {
    	console.log("self.session_id")
    	console.log(self.career_id)
    	self.career_id = c
    	self.interviewed_candidate_view = 'applicant_profile'
    	careerStore.trigger('read_applicant_profile', self.career_id)
    }

    self.close_applicant_profile = () =>{
    	self.interviewed_candidate_view = 'show_interviewed_candidate'
    }

    self.cancelOperation = (e) => {
      self.ApplicantData.map(a => {
          a.confirmDelete = false
          a.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.ApplicantData.map(a => {
        if(a.career_id != e.item.a.career_id){
          a.confirmDelete = false
        }else{
          a.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      careerStore.trigger('delete_applicant_detail', e.item.a.career_id)
    }

    careerStore.on('delete_applicant_detail_changed',DeleteApplicantDetailChanged)
    function DeleteApplicantDetailChanged(){
    	self.loading=false;
     	self.getData()
      	self.update();
    }

    careerStore.on('read_applicant_detail_changed',ReadApplicantDetailChanged)
    function ReadApplicantDetailChanged(applicant_details){
      self.ApplicantData=[];
      self.ApplicantData = applicant_details
      if(self.ApplicantData.length==0){
      	toastr.info("No Data Found")
      }
      self.loading = false;

      self.update();
    }


    careerStore.on('create_interview_call_changed',CreateInterviewCallChanged)
    function CreateInterviewCallChanged(){
      self.closecreateInterviewModal()
      self.getData()
      self.update();
    }

    careerStore.on('read_applicant_profile_changed',ReadApplicantProfileChanged)
    function ReadApplicantProfileChanged(applicant_profile_data){
      self.applicant_profile_data = applicant_profile_data
      self.st=applicant_profile_data[0]
      console.log(self.st.address_line1)
      self.loading = false;
      self.update();
    }
</script>
</applicant-detail>