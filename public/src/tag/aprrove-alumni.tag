<aprrove-alumni>
	<print-header></print-header>
	<loading-bar if={loading}></loading-bar>
	<section class=" is-fluid" show={alumni_view =='show_alumni'}>
	    <div class="level">
	    	<div class="level-left">
	        	<h2 class="title is-size-5" style="color: #ff3860;">Alumni Management Console </h2>
	      	</div>
	      	<div class="level-right">
	        	<button class="button is-primary has-text-weight-bold ml5" onclick={showAlumniField} title="Setting">
	        		<i class="fa fa-wrench" aria-hidden="true"></i>
	        	</button>
	        	<button class="button is-link has-text-weight-bold ml5" onclick={getData}>
		        	<span class="icon">
		            	<span class="fas fa-sync-alt"></span>
		          	</span>
	        	</button>
		        <button class="button is-success has-text-weight-bold ml5" onclick={downloadCSV}>
		          <span class="icon">
		            <i class="far fa-file-excel"></i>
		          </span>
		        </button>
	      	</div>
	    </div>
	    <div style=" overflow-x: scroll;" class="table-border-hide">
			<table class="table is-fullwidth is-bordered is-hoverable is-narrow">
				<thead>
					<tr>
					<th class="slno">SL</th>
		          	<th show={view_name=='show_name'}>Name</th>
		          	<th show={view_enroll_no=='show_enroll_no'}>Enroll No</th>
		          	<th show={view_email=='show_email'}>Email</th>
		          	<th show={view_residence_city=='show_residence_city'}>City</th>
		          	<th show={view_residence_state=='show_residence_state'}>State</th>
		          	<th show={view_residence_country=='show_residence_country'}>Country</th>
		          	<th show={view_residence_zip=='show_residence_zip'}>Zip</th>
		          	<th show={view_batch_year=='show_batch_year'}>Batch Year</th>
		          	<th show={view_mobile=='show_mobile'}>Mobile</th>
		          	<th show={view_approved=='show_approved'}>Approved</th>
		          	<th show={view_fees=='show_fees'}>Fees</th>
		          	<th show={view_creation_date=='show_creation_date'}>Submission Date</th>
		          	<th show={view_icse_school=='show_icse_school'}>Icse School</th>
		          	<th show={view_icse_board=='show_icse_board'}>Icse Board</th>
		          	<th show={view_icse_city=='show_icse_city'}>Icse City</th>
		          	<th show={view_icse_division=='show_icse_division'}>Icse Division</th>
		          	<th show={view_isc_school=='show_isc_school'}>Isc School</th>
		          	<th show={view_isc_board=='show_isc_board'}>Isc Board</th>
		          	<th show={view_isc_city=='show_isc_city'}>Isc City</th>
		          	<th show={view_isc_division=='show_isc_division'}>Isc Division</th>
		          	<th show={view_bachlor_school=='show_bachlor_school'}>Bachlor School</th>
		          	<th show={view_bachlor_board=='show_bachlor_board'}>Bachlor Board</th>
		          	<th show={view_bachlor_city=='show_bachlor_city'}>Bachlor City</th>
		          	<th show={view_bachlor_division=='show_bachlor_division'}>Bachlor Division</th>
		          	<th show={view_master_school=='show_master_school'}>Master School</th>
		          	<th show={view_master_board=='show_master_board'}>Master Board</th>
		          	<th show={view_master_city=='show_master_city'}>Master City</th>
		          	<th show={view_master_division=='show_master_division'}>Master Division</th>
		          	<th show={view_other_school=='show_other_school'}>Other School</th>
		          	<th show={view_other_board=='show_other_board'}>Other Board</th>
		          	<th show={view_other_city=='show_other_city'}>Other City</th>
		          	<th show={view_other_division=='show_other_division'}>Other Division</th>
		          	<th show={view_c_institute=='show_c_institute'}>Current Institute</th>
		          	<th show={view_c_course=='show_c_course'}>Current Course</th>
		          	<th show={view_c_year=='show_c_year'}>Current Year</th>
		          	<th show={view_c_degree=='show_c_degree'}>Current Degree</th>
		          	<th show={view_company_name=='show_company_name'}>Office Name</th>
		          	<th show={view_nature_of_job=='show_nature_of_job'}>Nature of Job</th>
		          	<th show={view_designation=='show_designation'}>Designation</th>
		          	<th show={view_office_addl1=='show_office_addl1'}>Office Add Line1</th>
		          	<th show={view_office_addl2=='show_office_addl2'}>Office Add Line2</th>
		          	<th show={view_office_city=='show_office_city'}>Office City</th>
		          	<th show={view_office_zip=='show_office_zip'}>Office Zip</th>
		          	<th show={view_office_state=='show_office_state'}>Office State</th>
		          	<th show={view_office_country=='show_office_country'}>Office Country</th>
		          	<th show={view_office_mobile=='show_office_mobile'}>Office Mobile</th>
		          	<th show={view_otelephone=='show_otelephone'}>Office Telephone</th>
		          	<th show={view_office_email=='show_office_email'}>Office Email</th>
		          	<th class="has-text-right no-print" style="width:160px;"></th>
					</tr>
				</thead>
				<tbody>
					<tr each={c, i in AlumniData}>
						<td >{i+1 }</td>
				        <td show={view_name=='show_name'}>{c.name}</td>
				        <td show={view_enroll_no=='show_enroll_no'}>{c.enroll_no}</td>
				        <td show={view_email=='show_email'}>{c.email}</td>
				        <td show={view_residence_city=='show_residence_city'}>{c.residence_city}</td>
				        <td show={view_residence_state=='show_residence_state'}>{c.residence_state}</td>
				        <td show={view_residence_country=='show_residence_country'}>{c.residence_country}</td>
				        <td show={view_residence_zip=='show_residence_zip'}>{c.residence_zip}</td>
				        <td show={view_batch_year=='show_batch_year'}>{c.batch_year}</td>
				        <td show={view_mobile=='show_mobile'}>{c.mobile}</td>
				        <td show={view_approved=='show_approved'}>{c.approved}</td>
				        <td show={view_fees=='show_fees'}>{c.fees}</td>
				        <td show={view_creation_date=='show_creation_date'}>{c.creation_date}</td>
				        <td show={view_icse_school=='show_icse_school'}>{c.icse_school}</td>
				        <td show={view_icse_board=='show_icse_board'}>{c.icse_board}</td>
				        <td show={view_icse_city=='show_icse_city'}>{c.icse_city}</td>
				        <td show={view_icse_division=='show_icse_division'}>{c.icse_division}</td>
				        <td show={view_isc_school=='show_isc_school'}>{c.isc_school}</td>
				        <td show={view_isc_board=='show_isc_board'}>{c.isc_board}</td>
				        <td show={view_isc_city=='show_isc_city'}>{c.isc_city}</td>
				        <td show={view_isc_division=='show_isc_division'}>{c.isc_division}</td>
				        <td show={view_bachlor_school=='show_bachlor_school'}>{c.bachlor_school}</td>
				        <td show={view_bachlor_board=='show_bachlor_board'}>{c.bachlor_board}</td>
				        <td show={view_bachlor_city=='show_bachlor_city'}>{c.bachlor_city}</td>
				        <td show={view_bachlor_division=='show_bachlor_division'}>{c.bachlor_division}</td>
				        <td show={view_master_school=='show_master_school'}>{c.master_school}</td>
				        <td show={view_master_board=='show_master_board'}>{c.master_board}</td>
				        <td show={view_master_city=='show_master_city'}>{c.master_city}</td>
				        <td show={view_master_division=='show_master_division'}>{c.master_division}</td>
				        <td show={view_other_school=='show_other_school'}>{c.other_school}</td>
				        <td show={view_other_board=='show_other_board'}>{c.other_board}</td>
				        <td show={view_other_city=='show_other_city'}>{c.other_city}</td>
				        <td show={view_other_division=='show_other_division'}>{c.other_division}</td>
				        <td show={view_c_institute=='show_c_institute'}>{c.c_institute}</td>
				        <td show={view_c_course=='show_c_course'}>{c.c_course}</td>
				        <td show={view_c_year=='show_c_year'}>{c.c_year}</td>
				        <td show={view_c_degree=='show_c_degree'}>{c.c_degree}</td>
				        <td show={view_company_name=='show_company_name'}>{c.company_name}</td>
				        <td show={view_nature_of_job=='show_nature_of_job'}>{c.nature_of_job}</td>
				        <td show={view_designation=='show_designation'}>{c.designation}</td>
				        <td show={view_office_addl1=='show_office_addl1'}>{c.office_addl1}</td>
				        <td show={view_office_addl2=='show_office_addl2'}>{c.office_addl2}</td>
				        <td show={view_office_city=='show_office_city'}>{c.office_city}</td>
				        <td show={view_office_zip=='show_office_zip'}>{c.office_zip}</td>
				        <td show={view_office_state=='show_office_state'}>{c.office_state}</td>
				        <td show={view_office_country=='show_office_country'}>{c.office_country}</td>
				        <td show={view_office_mobile=='show_office_mobile'}>{c.office_mobile}</td>
				        <td show={view_otelephone=='show_otelephone'}>{c.otelephone}</td>
				        <td show={view_office_email=='show_office_email'}>{c.office_email}</td>
				        <td class="has-text-right no-print">
		          			<div class="inline-flex rounded border border-grey overflow-hidden" hide={c.confirmDelete}>
		            			<span><a class="button is-small" onclick={approve_alumni.bind(this,c.alumni_id)} title="Approve">
		            				<i class="fa fa-check" aria-hidden="true"></i>
		            			</a></span>
		            			<span><a class="button is-small" rel="nofollow" onclick={confirmDelete} title="Delete">
		            				<i class="fa fa-trash" aria-hidden="true"></i>
		            			</a></span>
		            			<span><a class="button is-small" onclick={update_alumni.bind(this,c.alumni_id)} title="Update">
		            				<i class="fa fa-edit" aria-hidden="true"></i>
		            			</a></span>
		            			<span><a class="button is-small" onclick={view_profile.bind(this, c.alumni_id)} title="Profile">
		            				<i class="fa fa-eye" aria-hidden="true"></i>
		            			</a></span>
		          			</div>
					        <div class="table-buttons" if={c.confirmDelete}>
					            <span disabled={loading} class="button is-small is-rounded" onclick={delete}><i class="fa fa-check" ></i></span>
					            <span disabled={loading} class="button is-small  has-text-danger is-rounded" onclick={cancelOperation}><i class="fa fa-times"></i></span>
					        </div>
		    			</td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>
	<!-- columnSetting Modal Start -->
	<div id="columnSetting" class="modal ">
	    <div class="modal-background"></div>
		<div class="modal-card">
	    	<header class="modal-card-head">
	        	<p class="modal-card-title">Setting Configuaration</p>
	      	</header>
	  		<section class="modal-card-body">
	    		<div each={st, i in fieldList}  class="setting-detail">
	      			<input class="checkbox" style="" type="checkbox" checked={st.done} id="{'addStaffName' + st.array_name}"
	            		onclick={addCheckedColumn.bind(this,st) }>{st.field_name}
	    		</div>
	  		</section>
	  		<footer class="modal-card-foot">
	   			<button class="button" id="item-modal-close" onclick={closeCheckBoxModal}>Close</button>
	  		</footer>
		</div>
	</div>
	<!-- columnSetting Modal End -->

<!-- Open Cancel Result Modal Start -->
  	<div id="createAproveAlumniModal" class="modal ">
    	<div class="modal-background"></div>
    	<div class="modal-card">
      		<header class="modal-card-head">
        		<p class="modal-card-title">Approve Alumni</p>
      		</header>
		      	<section class="modal-card-body">
		        	<div class="columns">
		          		<div class="column">
		          			<div class="field">
				              	<div class="control">
				               		<label class="label">Date of Approval</label>
				                	<input class="input date" ref="approval_date" type="text" readonly="readonly">
				              	</div>
				            </div>
				            <div class="field">
				              	<div class="control">
				               		<label class="label" for="interview_time">Fees</label>
				                	<input class="input" ref="fees" type="number">
				              	</div>
				            </div>
	    				</div>
		        	</div>
		        </section>
	      	<footer class="modal-card-foot">
	        	<button class="button is-success" onclick={approveAlumni} >Submit</button>
	        	<button class="button is-danger" id="item-modal-close" 
	        	onclick={closeapproveAlumniwModal}>Cancel</button>
	      	</footer>
    	</div>
  	</div>
  <!-- Cancel Result Modal End -->

  	<section class=" is-fluid" show={alumni_view =='edit_alumni_first_page'}>
		<h2 class="title is-size-5 has-text-centered" style="color: #ff3860;"> {title} Alumni</h2>
		<div class="box">
			<div class="columns mt20">
				<div class="column is-full">
			    	<h3 class="has-text-weight-bold is-size-6 has-text-link student-h3">Personal Details</h3>
			      	<hr class="student-hr is-full" style="margin-top: 0.5em; margin-bottom: 0.5em;">
			    </div>
			</div>
			<div class="columns mt30">
				<div class="column is-2">
					<label class="label is-small" for="submission_date">Submission Date</label>
				</div>
				<div class="column is-2">
					<input class="input date is-small" ref="submission_date" type="text" readonly="readonly">
		      	</div>
				<div class="column is-2">
					<label class="label is-small" for="first_name">Name</label>
				</div>
				<div class="column is-2">
					<input class="input is-small" id="first_name" ref="first_name" type="text">
		      	</div>
		      	<div class="column is-2">
					<label class="label is-small" for="middle_name">Middle Name</label>
		      	</div>
		      	<div class="column is-2 ">
					<input class="input is-small" id="middle_name" ref="middle_name" type="text">
		      	</div>
			</div>

			<div class="columns mt30">
				<div class="column is-2">
					<label class="label is-small" for="last_name">Last Name</label>
		      	</div>
		      	<div class="column is-2">
	        		<input class="input is-small" id="last_name" ref="last_name" type="text">
		      	</div>
		      	<div class="column is-2">
					<label class="label is-small" for="batch_year">Batch-Year</label>
		      	</div>
		      	<div class="column is-2 ">
					<input class="input is-small" id="batch_year" ref="batch_year" type="text">
		      	</div>
		      	<div class="column is-2">
					<label class="label is-small" for="date_of_birth">Date of Birth</label>
		      	</div>
		      	<div class="column is-2">
	        		<input class="input date is-small" ref="date_of_birth" type="text" readonly="readonly">
		      	</div>
			</div>

			<div class="columns mt30">
				<div class="column is-2">
					<label class="label is-small" for="enroll_no">Enroll Number</label>
		      	</div>
		      	<div class="column is-2">
	        		<input class="input is-small" id="enroll_no" ref="enroll_no" type="text">
		      	</div>
		      	<div class="column is-2">
					<label class="label is-small" for="residence_addl1">Address Line 1</label>
		      	</div>
		      	<div class="column is-2 ">
					<input class="input is-small" id="residence_addl1" ref="residence_addl1" type="text">
		      	</div>
		      	<div class="column is-2">
					<label class="label is-small" for="residence_addl2">Address Line 2</label>
		      	</div>
		      	<div class="column is-2">
	        		<input class="input is-small" id="residence_addl2" ref="residence_addl2" type="text">
		      	</div>
			</div>

			<div class="columns mt30">
				<div class="column is-2">
					<label class="label is-small" for="residence_city">City / District</label>
		      	</div>
		      	<div class="column is-2">
	        		<input class="input is-small" id="residence_city" ref="residence_city" type="text">
		      	</div>
		      	<div class="column is-2">
					<label class="label is-small" for="residence_zip">Zip Code</label>
		      	</div>
		      	<div class="column is-2 ">
					<input class="input is-small" id="residence_zip" ref="residence_zip" type="text">
		      	</div>
		      	<div class="column is-2">
					<label class="label is-small" for="residence_state">State</label>
		      	</div>
		      	<div class="column is-2">
	        		<input class="input is-small" id="residence_state" ref="residence_state" type="text">
		      	</div>
			</div>

			<div class="columns mt30">
				<div class="column is-2">
					<label class="label is-small" for="residence_country">Country</label>
		      	</div>
		      	<div class="column is-2">
	        		<input class="input is-small" id="residence_country" ref="residence_country" type="text">
		      	</div>
		      	<div class="column is-2">
					<label class="label is-small" for="mobile">Mobile</label>
		      	</div>
		      	<div class="column is-2 ">
					<input class="input is-small" id="mobile" ref="mobile" type="text">
		      	</div>
		      	<div class="column is-2">
					<label class="label is-small" for="fax">Fax</label>
		      	</div>
		      	<div class="column is-2">
	        		<input class="input is-small" id="fax" ref="fax" type="text">
		      	</div>
			</div>

			<div class="columns mt30">
				<div class="column is-2">
					<label class="label is-small" for="email">Email</label>
		      	</div>
		      	<div class="column is-2">
	        		<input class="input is-small" id="email" ref="email" type="email">
		      	</div>
		      	<div class="column is-2">
					<label class="label is-small" for="telephone">LandLine</label>
		      	</div>
		      	<div class="column is-2 ">
					<input class="input is-small" id="telephone" ref="telephone" type="text">
		      	</div>
		      	<div class="column is-2">
					<label class="label is-small" for="spouse">Name of Spouse</label>
		      	</div>
		      	<div class="column is-2">
	        		<input class="input is-small" id="spouse" ref="spouse" type="text">
		      	</div>
			</div>
			<div class="columns mt30">
				<div class="column is-2">
					<label class="label is-small" for="marriage_date">Marriage Date</label>
		      	</div>
		      	<div class="column is-2">
	        		<input class="input date is-small" ref="marriage_date" type="text" readonly="readonly">
		      	</div>
			</div>

			<div class="columns mt35">
				<div class="column is-full">
		    		<h3 class="has-text-weight-bold is-size-6 has-text-link student-h3">Do You have any other relative who has studied in or who is currently studing at MCKV ?</h3>
		      		<hr class="student-hr is-full" style="margin-top: 0.5em; margin-bottom: 0.5em;">
		    	</div>
			</div>

			<div class="columns mt30">
				<div class="column is-2">
					<label class="label is-small" for="relative_name">Name</label>
				</div>
				<div class="column is-2">
					<input class="input is-small" id="relative_name" ref="relative_name" type="text">
		      	</div>
		      	<div class="column is-2">
					<label class="label is-small" for="relative_relation">Relation</label>
		      	</div>
		      	<div class="column is-2 ">
					<input class="input is-small" id="relative_relation" ref="relative_relation" type="text">
		      	</div>
		      	<div class="column is-2">
					<label class="label is-small" for="relative_class">Class and Batch</label>
		      	</div>
		      	<div class="column is-2">
	        		<input class="input is-small" id="relative_class" ref="relative_class" type="text">
		      	</div>
			</div>
			
			<div class="columns mt35">
				<div class="column is-full">
		    		<h3 class="has-text-weight-bold is-size-6 has-text-link student-h3">Education Details</h3>
		      		<hr class="student-hr is-full" style="margin-top: 0.5em; margin-bottom: 0.5em;">
		    	</div>
			</div>

			<div class="columns mt30">
				<div class="column">
					<table class="table is-fullwidth is-bordered is-hoverable is-narrow ">
						<thead>
							<tr>
			          			<th style="border:none">Exam</th>
			          			<th style="border:none">School/College</th>
								<th style="border:none">Board</th>
								<th style="border:none">City</th>
								<th style="border:none">Division</th>
							</tr>
						</thead>
						<tbody>
							<tr>
			          			<td style="border:none">ICSE</td>
								<td style="border:none"><input class="input is-small" ref="icse_school" type="text"></td>
								<td style="border:none"><input class="input is-small" ref="icse_board" type="text"></td>
								<td style="border:none"><input class="input is-small" ref="icse_city" type="text"></td>
								<td style="border:none"><input class="input is-small" ref="icse_division" type="text"></td>
							</tr>
							<tr>
			          			<td style="border:none">ISC</td>
								<td style="border:none"><input class="input is-small" ref="isc_school" type="text"></td>
								<td style="border:none"><input class="input is-small" ref="isc_board" type="text"></td>
								<td style="border:none"><input class="input is-small" ref="isc_city" type="text"></td>
								<td style="border:none"><input class="input is-small" ref="isc_division" type="text"></td>
							</tr>
							<tr>
			          			<td style="border:none">Bachelor</td>
								<td style="border:none"><input class="input is-small" ref="bachlor_school" type="text"></td>
								<td style="border:none"><input class="input is-small" ref="bachlor_board" type="text"></td>
								<td style="border:none"><input class="input is-small" ref="bachlor_city" type="text"></td>
								<td style="border:none"><input class="input is-small" ref="bachlor_division" type="text"></td>
							</tr>
							<tr>
			          			<td style="border:none">Master</td>
								<td style="border:none"><input class="input is-small" ref="master_school" type="text"></td>
								<td style="border:none"><input class="input is-small" ref="master_board" type="text"></td>
								<td style="border:none"><input class="input is-small" ref="master_city" type="text"></td>
								<td style="border:none"><input class="input is-small" ref="master_division" type="text"></td>
							</tr>
							<tr>
			          			<td style="border:none">Other</td>
								<td style="border:none"><input class="input is-small" ref="other_school" type="text"></td>
								<td style="border:none"><input class="input is-small" ref="other_board" type="text"></td>
								<td style="border:none"><input class="input is-small" ref="other_city" type="text"></td>
								<td style="border:none"><input class="input is-small" ref="other_division" type="text"></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>

			<div class="columns mt60">
				<div class="column is-full">
				    <button class="button is-info has-text-weight-bold adjusted-top" 
				    	onclick={addNextInformation}>Next >>
				    </button>
				    <button class="button is-danger has-text-weight-bold adjusted-top" 
				    	onclick={close}>Cancel
				    </button>    
			    </div>
			</div>
		</div>
  	</section>

  	<section class=" is-fluid" show={alumni_view =='edit_alumni_second_page'}>
		<h2 class="title is-size-5 has-text-centered" style="color: #ff3860;"> {title} Alumni</h2>
		<div class="box">
			<div class="columns mt20">
				<div class="column is-full">
			    	<h3 class="has-text-weight-bold is-size-6 has-text-link student-h3">If you are studying (fill in the following details)</h3>
			      	<hr class="student-hr is-full" style="margin-top: 0.5em; margin-bottom: 0.5em;">
			    </div>
			</div>
			<div class="columns mt30">
				<div class="column is-2">
					<label class="label is-small" for="c_institute">Current Institution</label>
				</div>
				<div class="column is-2">
					<input class="input is-small" id="c_institute" ref="c_institute" type="text">
		      	</div>
				<div class="column is-2">
					<label class="label is-small" for="c_course">Current Course</label>
				</div>
				<div class="column is-2">
					<input class="input is-small" id="c_course" ref="c_course" type="text">
		      	</div>
		      	<div class="column is-2">
					<label class="label is-small" for="c_location">Current Location</label>
		      	</div>
		      	<div class="column is-2 ">
					<input class="input is-small" id="c_location" ref="c_location" type="text">
		      	</div>
			</div>

			<div class="columns mt30">
				<div class="column is-2">
					<label class="label is-small" for="c_year">Current Year/Sem</label>
				</div>
				<div class="column is-2">
					<input class="input is-small" id="c_year" ref="c_year" type="text">
		      	</div>
				<div class="column is-2">
					<label class="label is-small" for="c_degree">Specialization</label>
				</div>
				<div class="column is-2">
					<input class="input is-small" id="c_degree" ref="c_degree" type="text">
		      	</div>
			</div>

			<div class="columns mt20">
				<div class="column is-full">
			    	<h3 class="has-text-weight-bold is-size-6 has-text-link student-h3">Employment Details</h3>
			      	<hr class="student-hr is-full" style="margin-top: 0.5em; margin-bottom: 0.5em;">
			    </div>
			</div>
			<div class="columns mt30">
				<div class="column is-2">
					<label class="label is-small" for="company_name">Company</label>
				</div>
				<div class="column is-2">
					<input class="input is-small" id="company_name" ref="company_name" type="text">
		      	</div>
				<div class="column is-2">
					<label class="label is-small" for="nature_of_job">job/business</label>
				</div>
				<div class="column is-2">
					<input class="input is-small" id="nature_of_job" ref="nature_of_job" type="text">
		      	</div>
		      	<div class="column is-2">
					<label class="label is-small" for="designation">Designation</label>
		      	</div>
		      	<div class="column is-2 ">
					<input class="input is-small" id="designation" ref="designation" type="text">
		      	</div>
			</div>

			<div class="columns mt30">
				<div class="column is-2">
					<label class="label is-small" for="office_addl1">Address Line 1 </label>
				</div>
				<div class="column is-2">
					<input class="input is-small" id="office_addl1" ref="office_addl1" type="text">
		      	</div>
				<div class="column is-2">
					<label class="label is-small" for="office_addl2">Address Line 2</label>
				</div>
				<div class="column is-2">
					<input class="input is-small" id="office_addl2" ref="office_addl2" type="text">
		      	</div>
		      	<div class="column is-2">
					<label class="label is-small" for="office_city">City/ District</label>
		      	</div>
		      	<div class="column is-2 ">
					<input class="input is-small" id="office_city" ref="office_city" type="text">
		      	</div>
			</div>

			<div class="columns mt30">
				<div class="column is-2">
					<label class="label is-small" for="office_zip">Zip Code </label>
				</div>
				<div class="column is-2">
					<input class="input is-small" id="office_zip" ref="office_zip" type="text">
		      	</div>
				<div class="column is-2">
					<label class="label is-small" for="office_state">State</label>
				</div>
				<div class="column is-2">
					<input class="input is-small" id="office_state" ref="office_state" type="text">
		      	</div>
		      	<div class="column is-2">
					<label class="label is-small" for="office_country">Country</label>
		      	</div>
		      	<div class="column is-2 ">
					<input class="input is-small" id="office_country" ref="office_country" type="text">
		      	</div>
			</div>

			<div class="columns mt30">
				<div class="column is-2">
					<label class="label is-small" for="office_mobile">Mobile </label>
				</div>
				<div class="column is-2">
					<input class="input is-small" id="office_mobile" ref="office_mobile" type="text">
		      	</div>
				<div class="column is-2">
					<label class="label is-small" for="office_fax">Fax</label>
				</div>
				<div class="column is-2">
					<input class="input is-small" id="office_fax" ref="office_fax" type="text">
		      	</div>
		      	<div class="column is-2">
					<label class="label is-small" for="office_email">Email</label>
		      	</div>
		      	<div class="column is-2 ">
					<input class="input is-small" id="office_email" ref="office_email" type="email">
		      	</div>
			</div>

			<div class="columns mt30">
				<div class="column is-2">
					<label class="label is-small" for="otelephone">LandLine </label>
				</div>
				<div class="column is-2">
					<input class="input is-small" id="otelephone" ref="otelephone" type="text">
		      	</div>
			</div>

			<div class="columns mt20">
				<div class="column is-full">
			    	<h3 class="has-text-weight-bold is-size-6 has-text-link student-h3">Please provide us with name of at least 3 MCKV friends who you are still in touch</h3>
			      	<hr class="student-hr is-full" style="margin-top: 0.5em; margin-bottom: 0.5em;">
			    </div>
			</div>
			<div class="columns mt30">
				<div class="column is-2">
					<label class="label is-small" for="f1_name1">(FRIEND 1)Name1</label>
				</div>
				<div class="column is-2">
					<input class="input is-small" id="f1_name1" ref="f1_name1" type="text">
		      	</div>
				<div class="column is-2">
					<label class="label is-small" for="f1_batch_year">Batch-year</label>
				</div>
				<div class="column is-2">
					<input class="input is-small" id="f1_batch_year" ref="f1_batch_year" type="text">
		      	</div>
		      	<div class="column is-2">
					<label class="label is-small" for="f1_stream">Stream</label>
		      	</div>
		      	<div class="column is-2 ">
					<input class="input is-small" id="f1_stream" ref="f1_stream" type="text">
		      	</div>
			</div>

			<div class="columns mt30">
				<div class="column is-2">
					<label class="label is-small" for="f1_contactno">Contact No</label>
		      	</div>
		      	<div class="column is-2 ">
					<input class="input is-small" id="f1_contactno" ref="f1_contactno" type="text">
		      	</div>
				<div class="column is-2">
					<label class="label is-small" for="f2_name2">(FRIEND 2)Name2</label>
				</div>
				<div class="column is-2">
					<input class="input is-small" id="f2_name2" ref="f2_name2" type="text">
		      	</div>
		      	<div class="column is-2">
					<label class="label is-small" for="f2_batch_year">Batch-year</label>
		      	</div>
		      	<div class="column is-2 ">
					<input class="input is-small" id="f2_batch_year" ref="f2_batch_year" type="text">
		      	</div>
			</div>

			<div class="columns mt30">
				<div class="column is-2">
					<label class="label is-small" for="f2_stream">Stream</label>
		      	</div>
		      	<div class="column is-2 ">
					<input class="input is-small" id="f2_stream" ref="f2_stream" type="text">
		      	</div>
				<div class="column is-2">
					<label class="label is-small" for="f2_contactno">Contact No</label>
				</div>
				<div class="column is-2">
					<input class="input is-small" id="f2_contactno" ref="f2_contactno" type="text">
		      	</div>
		      	<div class="column is-2">
					<label class="label is-small" for="f3_name3">(FRIEND 3)Name3</label>
		      	</div>
		      	<div class="column is-2 ">
					<input class="input is-small" id="f3_name3" ref="f3_name3" type="text">
		      	</div>
			</div>

			<div class="columns mt30">
				<div class="column is-2">
					<label class="label is-small" for="f3_batch_year">Batch-year</label>
		      	</div>
		      	<div class="column is-2 ">
					<input class="input is-small" id="f3_batch_year" ref="f3_batch_year" type="text">
		      	</div>
				<div class="column is-2">
					<label class="label is-small" for="f3_stream">Stream</label>
				</div>
				<div class="column is-2">
					<input class="input is-small" id="f3_stream" ref="f3_stream" type="text">
		      	</div>
		      	<div class="column is-2">
					<label class="label is-small" for="f3_contactno">Contact No</label>
		      	</div>
		      	<div class="column is-2 ">
					<input class="input is-small" id="f3_contactno" ref="f3_contactno" type="text">
		      	</div>
			</div>

			<div class="columns mt20">
				<div class="column is-full">
			    	<h3 class="has-text-weight-bold is-size-6 has-text-link student-h3">Are you intrested in becoming involved with any of the following ?</h3>
			      	<hr class="student-hr is-full" style="margin-top: 0.5em; margin-bottom: 0.5em;">
			    </div>
			</div>
			<div class="columns mt30">
				<div class="column">
					<input type="checkbox" id="assisting_org_alumni" ref="assisting_org_alumni" >
					<b>Assiisting the organization of alimni events in the school</b>
		      	</div>
				<div class="column ">
					<input type="checkbox" id="assisting_student_career" ref="assisting_student_career" >
					<b>Assiisting current or future students with career choices</b>
		      	</div>
		      	<div class="column ">
					<input type="checkbox" id="assisting_executive_commitee" ref="assisting_executive_commitee" >
					<b> Servicing on the Alumni Association executive Committe</b>
		      	</div>
			</div>

			<div class="columns mt20">
				<div class="column is-full">
			    	<h3 class="has-text-weight-bold is-size-6 has-text-link student-h3">Your News</h3>
			      	<hr class="student-hr is-full" style="margin-top: 0.5em; margin-bottom: 0.5em;">
			    </div>
			</div>
			<div class="columns mt30">
				<div class="column is-4">
					<textarea class="textarea is-small" ref="news" rows="3"></textarea>
		      	</div>
			</div>

			<div class="columns mt60">
				<div class="column is-full">
				    <button class="button is-primary has-text-weight-bold adjusted-top" 
				    	onclick={closeSecondPage}> << Previous
				    </button>
				    <button class="button is-info has-text-weight-bold adjusted-top" 
				    	onclick={UpdateAlumniInformation}>Submit
				    </button>
				    <button class="button is-danger has-text-weight-bold adjusted-top" 
				    	onclick={close}>Cancel
				    </button>    
			    </div>
			</div>
		</div>
  	</section>

  	<section class=" is-fluid" show={alumni_view =='alumni_profile'}>
		<div class="level no-print">
			<div class="level-left">
			</div>
			<div class="level-right">
				<button class="button is-primary has-text-weight-bold " onclick="window.print()">
		    		<span class="icon">
          				<span class="fas fa-print"></span>
        			</span>
		    	</button>
		    	<button class="button is-warning has-text-weight-bold ml5" onclick={close_alumni_profile}>
		    		<span class="icon">
          				<span class="fas fa-arrow-left"></span>
        			</span>
		    	</button>
			</div>
		</div>
		<div class="lebel">
			<div class="level-left">
				<p><b>Form No:  {al.alumni_id} </b> </p>
			</div>
		</div>
		<table class="table is-fullwidth is-bordered">
			<caption class="caption"> Alumni Profile</caption>
			<tr>
				<th colspan="8"><h3 class="has-text-weight-bold is-size-6 has-text-link student-h3">Personal Details</h3></th>
			</tr>
			<tr>
      			<th>Name</th><td>{al.name}</td>
      			<th>Batch Year</th><td>{al.batch_year}</td>
      			<th>DOB</th><td>{al.dob}</td>
      			<th>Enroll No</th><td>{al.enroll_no}</td>
      		</tr>
      		<tr>
      			<th>Address</th>
      			<td colspan="7">{al.address}</td>
      		</tr>
      		<tr>
      			<th>Mobile</th><td>{al.mobile}</td>
      			<th>Fax </th><td>{al.fax}</td>
      			<th>Email</th><td>{al.email}</td>
      			<th>Landline </th><td>{al.telephone}</td>
      		</tr>
      		<tr>
      			<th>Name of spouse</th><td colspan="2">{al.spouse}</td>
      			<th>Marriage Date</th><td colspan="4">{al.marriage_date}</td>
      		</tr>
      		<tr>
				<th colspan="8"><h3 class="has-text-weight-bold is-size-6 has-text-link student-h3">Relative who has studied in or who is currently studing at MCKV</h3></th>
			</tr>
			<tr>
      			<th>Name</th><td>{al.relative_name}</td>
      			<th>Relation </th><td>{al.relative_relation}</td>
      			<th>Class & Batch</th><td colspan="3">{al.relative_class}</td>
      		</tr>
      		<tr>
				<th colspan="8"><h3 class="has-text-weight-bold is-size-6 has-text-link student-h3">Education Details</h3></th>
			</tr>
			 <tr>
      			<th>Exam</th>
     	 		<th colspan="2">School/College</th>
			    <th colspan="2">Board</th>
			    <th>City </th>
			    <th colspan="2">Division</th>
			</tr>
			<tr>
      			<td>ICSE</td>                      
      			<td colspan="2">{al.icse_school}</td>
      			<td colspan="2">{al.icse_board}</td>
      			<td>{al.icse_city}</td>
      			<td colspan="2">{al.icse_division}</td>
      		</tr>
      		<tr>
		    	<td>ISC</td>
		      	<td colspan="2">{al.isc_school}</td>
		      	<td colspan="2">{al.isc_board}</td>
		      	<td>{al.isc_city}</td>
		      	<td colspan="2">{al.isc_division}</td>
      		</tr>
      		<tr>
      			<td>Bachlor</td>
      			<td colspan="2">{al.bachlor_school}</td>
      			<td colspan="2">{al.bachlor_board}</td>
      			<td>{al.bachlor_city}</td>
      			<td colspan="2">{al.bachlor_division}</td>
      		</tr>
      		<tr>
      			<td>Master</td>
      			<td colspan="2">{al.master_school}</td>
      			<td colspan="2">{al.master_board}</td>
      			<td>{al.master_city}</td>
      			<td colspan="2">{al.master_division}</td>
      		</tr>
      		<tr>
      			<td>Other</td>
      			<td colspan="2">{al.other_school}</td>
      			<td colspan="2">{al.other_board}</td>
      			<td>{al.other_city}</td>
      			<td colspan="2">{al.other_division}</td>
      		</tr>
      		<tr>
				<th colspan="8"><h3 class="has-text-weight-bold is-size-6 has-text-link student-h3">Studying the following</h3></th>
			</tr>
			<tr>
      			<th>Institution</th><td>{al.c_institute}</td>
      			<th>Course </th><td>{al.c_course}</td>
      			<th>Location</th><td colspan="3">{al.c_location}</td>
      		</tr>
      		<tr>
      			<th>Year/ Semester</th><td>{al.c_year}</td>
      			<th colspan=2>Specialization / Major </th><td colspan="4">{al.c_degree}</td>
      		</tr>
      		<tr>
				<th colspan="8"><h3 class="has-text-weight-bold is-size-6 has-text-link student-h3">Employment Details</h3></th>
			</tr>
			<tr>       
      			<th>Name of Company</th><td>{al.company_name}</td>
      			<th>Nature of job / business </th><td>{al.nature_of_job}</td>
      			<th>Designation</th><td colspan="3">{al.designation}</td>
      		</tr>
      		<tr>
      			<th>Address</th><td colspan="7">{al.office_address}</td>
      		</tr>
      		<tr>
				<th colspan="8"><h3 class="has-text-weight-bold is-size-6 has-text-link student-h3">MCKV friends who are still in touch</h3></th>
			</tr>
			<tr>             
      			<th>Name1</th><td>{al.f1_name1}</td>
      			<th>Batch Year</th><td>{al.f1_batch_year}</td>
      			<th>Stream</th><td>{al.f1_stream}</td>
      			<th>Contact No</th><td>{al.f1_contactno}</td>
      		</tr>
      		<tr>             
      			<th>Name2</th><td>{al.f2_name2}</td>
      			<th>Batch Year</th><td>{al.f2_batch_year}</td>
      			<th>Stream</th><td>{al.f2_stream}</td>
      			<th>Contact No</th><td>{al.f2_contactno}</td>
      		</tr>
      		<tr>             
      			<th>Name3</th><td>{al.f3_name3}</td>
      			<th>Batch Year</th><td>{al.f3_batch_year}</td>
      			<th>Stream</th><td>{al.f3_stream}</td>
      			<th>Contact No</th><td>{al.f3_contactno}</td>
      		</tr>
      		<tr>
				<th colspan="8"><h3 class="has-text-weight-bold is-size-6 has-text-link student-h3">Intrested in becoming involved with any of the following</h3></th>
			</tr>
			<tr>             
      			<th colspan="7">Assisting the organization of alumni events in the school</th><td>{al.assisting_org_alumni}</td>
      		</tr>
      		<tr>
      			<th colspan="7">Assisting current or future students with career choices</th><td>{al.assisting_student_career}</td>
      		</tr>
      		<tr>
      			<th colspan="7">Servicing on the Alumni Association executive Committe</th><td>{al.assisting_executive_commitee}</td>
      		</tr>
      		<tr>
				<th colspan="8"><h3 class="has-text-weight-bold is-size-6 has-text-link student-h3">News</h3></th>
			</tr>
			<tr>            
      			<td colspan="8">{al.news}</td>
      		</tr>
		</table>
	</section>

	<script>
		var self = this
		self.st={}
		self.al={}
	    self.on("mount", function(){
	    	self.fieldList=[
		    	{field_name : "Name", array_name: "name"},
		    	{field_name : "Enroll No", array_name: "enroll_no"},
		    	{field_name : "Email", array_name: "email"},
		    	{field_name : "City", array_name: "residence_city"},
			    {field_name : "State", array_name: "residence_state"},
			    {field_name : "Country", array_name: "residence_country"},
			    {field_name : "Zip", array_name: "residence_zip"},
			    {field_name : "Batch Year", array_name: "batch_year"},
			    {field_name : "Mobile", array_name: "mobile"},
			    {field_name : "Approved", array_name: "approved"},
			    {field_name : "Fees", array_name: "fees"},
			    {field_name : "Submission Date", array_name: "creation_date"},
			    {field_name : "Icse School", array_name: "icse_school"},
			    {field_name : "Icse Board", array_name: "icse_board"},
			    {field_name : "Icse City", array_name: "icse_city"},
			    {field_name : "Icse Division", array_name: "icse_division"},
			    {field_name : "Isc School", array_name: "isc_school"},
			    {field_name : "Isc Board", array_name: "isc_board"},
			    {field_name : "Isc City", array_name: "isc_city"},
			    {field_name : "Isc Division", array_name: "isc_division"},
			    {field_name : "Bachlor School", array_name: "bachlor_school"},
			    {field_name : "Bachlor Board", array_name: "bachlor_board"},
			    {field_name : "Bachlor City", array_name: "bachlor_city"},
			    {field_name : "Bachlor Division", array_name: "bachlor_division"},
			    {field_name : "Master School", array_name: "master_school"},
			    {field_name : "Master Board", array_name: "master_board"},
			    {field_name : "Master City", array_name: "master_city"},
			    {field_name : "Master Division", array_name: "master_division"},
			    {field_name : "Other School", array_name: "other_school"},
			    {field_name : "Other Board", array_name: "other_board"},
			    {field_name : "Other City", array_name: "other_city"},
			    {field_name : "Other Division", array_name: "other_division"},
			    {field_name : "Current Institute", array_name: "c_institute"},
			    {field_name : "Current Course", array_name: "c_course"},
			    {field_name : "Current Year", array_name: "c_year"},
			    {field_name : "Current Degree", array_name: "c_degree"},
			    {field_name : "Office Name", array_name: "company_name"},
			    {field_name : "Nature of Job", array_name: "nature_of_job"},
			    {field_name : "Designation", array_name: "designation"},
			    {field_name : "Office Add Line1", array_name: "office_addl1"},
			    {field_name : "Office Add Line2", array_name: "office_addl2"},
			    {field_name : "Office City", array_name: "office_city"},
			    {field_name : "Office Zip", array_name: "office_zip"},
			    {field_name : "Office State", array_name: "office_state"},
			    {field_name : "Office Country", array_name: "office_country"},
			    {field_name : "Office Mobile", array_name: "office_mobile"},
			    {field_name : "Office Telephone", array_name: "otelephone"},
			    {field_name : "Office Email", array_name: "office_email"}
    		]

	    	self.fieldList.map( q => {
		        if(q.array_name== "name"){
		          self.view_name="show_name"  
		          q.done=true  
		        }
		        if(q.array_name== "enroll_no"){
		          self.view_enroll_no="show_enroll_no"  
		          q.done=true  
		        }
		        if(q.array_name== "email"){
		          self.view_email="show_email"
		          q.done=true  
		        }
		        if(q.array_name== "batch_year"){
		          self.view_batch_year ="show_batch_year"
		          q.done=true
		        }
		        if(q.array_name== "mobile"){
		          self.view_mobile= "show_mobile"
		          q.done=true
		        }
		        if(q.array_name== "approved"){
		          self.view_approved= "show_approved"
		          q.done=true
		        }
      		})
	    	self.loading = false;
	    	flatpickr(".date", {
				allowInput: true,
	        	dateFormat: "d/m/Y",
	  		})
	  		self.alumni_view = 'show_alumni'
	  		self.title=''
	  		self.getData();
	    	self.update();
	    })

	    self.on("unmount", function(){
	      alumniStore.off('read_alumni_changed',ReadAlumniChanged)
	      alumniStore.off('approved_alumni_changed',ApprovedAlumniChanged)
	      alumniStore.off('edit_alumni_changed',EditAlumniChanged)
	      alumniStore.off('delete_alumni_changed',DeleteAlumniChanged)
	      alumniStore.off('read_alumni_profile_changed',AlumniProfileChanged)
	    })

	    self.showAlumniField = () =>{
       		$("#columnSetting").addClass("is-active")   
    	}

    	self.closeCheckBoxModal=()=>{
    		$("#columnSetting").removeClass("is-active");
    	}

    	self.addCheckedColumn = (item, event) => {
		 	if(item!=''){
			 item.done=!event.item.st.done
		 	}
		 	self.fieldList.map( q => {
			    if(q.done==true && q.array_name== "name"){
			      self.view_name="show_name"    
			    }
			    if(q.done==true && q.array_name== "enroll_no"){
			      self.view_enroll_no= "show_enroll_no"
			    }
			    if(q.done==true && q.array_name== "email"){
			      self.view_email= "show_email"
			    }
			    if(q.done==true && q.array_name== "residence_city"){
			      self.view_residence_city ="show_residence_city"
			    }
			    if(q.done==true && q.array_name== "residence_state"){
			      self.view_residence_state= "show_residence_state"
			    }
			    if(q.done==true && q.array_name== "residence_country"){
			      self.view_residence_country= "show_residence_country"
			    }
			    if(q.done==true && q.array_name== "residence_zip"){
			      self.view_residence_zip= "show_residence_zip"
			    }
			    if(q.done==true && q.array_name== "batch_year"){
			      self.view_batch_year="show_batch_year"
			    }
			    if(q.done==true && q.array_name== "mobile"){
			      self.view_mobile="show_mobile"
			    }
			    if(q.done==true && q.array_name== "approved"){
			      self.view_approved="show_approved"
			    }
			    if(q.done==true && q.array_name== "fees"){
			      self.view_fees="show_fees"
			    }
			    if(q.done==true && q.array_name== "creation_date"){
			      self.view_creation_date="show_creation_date"
			    }
			    if(q.done==true && q.array_name== "icse_school"){
			      self.view_icse_school="show_icse_school"
			    }
			    if(q.done==true && q.array_name== "icse_board"){
			      self.view_icse_board="show_icse_board"
			    }
			    if(q.done==true && q.array_name== "icse_city"){
			      self.view_icse_city="show_icse_city"
			    }
			    if(q.done==true && q.array_name== "icse_division"){
			      self.view_icse_division="show_icse_division"
			    }
			    if(q.done==true && q.array_name== "isc_school"){
			      self.view_isc_school="show_isc_school"
			    }
			    if(q.done==true && q.array_name== "isc_board"){
			      self.view_isc_board="show_isc_board"
			    }
			    if(q.done==true && q.array_name== "isc_city"){
			      self.view_isc_city="show_isc_city"
			    }
			    if(q.done==true && q.array_name== "isc_division"){
			      self.view_isc_division="show_isc_division"
			    }
			    if(q.done==true && q.array_name== "bachlor_school"){
			      self.view_bachlor_school="show_bachlor_school"
			    }
			    if(q.done==true && q.array_name== "bachlor_board"){
			      self.view_bachlor_board="show_bachlor_board"
			    }
			    if(q.done==true && q.array_name== "bachlor_city"){
			      self.view_bachlor_city="show_bachlor_city"
			    }
			    if(q.done==true && q.array_name== "bachlor_division"){
			      self.view_bachlor_division="show_bachlor_division"
			    }
			    if(q.done==true && q.array_name== "master_school"){
			      self.view_master_school="show_master_school"
			    }
			    if(q.done==true && q.array_name== "master_board"){
			      self.view_master_board="show_master_board"
			    }
			    if(q.done==true && q.array_name== "master_city"){
			      self.view_master_city="show_master_city"
			    }
			    if(q.done==true && q.array_name== "master_division"){
			      self.view_master_division="show_master_division"
			    }
			    if(q.done==true && q.array_name== "other_school"){
			      self.view_other_school="show_other_school"
			    }
			    if(q.done==true && q.array_name== "other_board"){
			      self.view_other_board="show_other_board"
			    }
			    if(q.done==true && q.array_name== "other_city"){
			      self.view_other_city="show_other_city"
			    }
			    if(q.done==true && q.array_name== "other_division"){
			      self.view_other_division="show_other_division"
			    }
			    if(q.done==true && q.array_name== "c_institute"){
			      self.view_c_institute="show_c_institute"
			    }
			    if(q.done==true && q.array_name== "c_course"){
			      self.view_c_course="show_c_course"
			    }
			    if(q.done==true && q.array_name== "c_year"){
			      self.view_c_year="show_c_year"
			    }
			    if(q.done==true && q.array_name== "c_degree"){
			      self.view_c_degree="show_c_degree"
			    }
			    if(q.done==true && q.array_name== "company_name"){
			      self.view_company_name="show_company_name"
			    }
			    if(q.done==true && q.array_name== "nature_of_job"){
			      self.view_nature_of_job="show_nature_of_job"
			    }
			    if(q.done==true && q.array_name== "designation"){
			      self.view_designation="show_designation"
			    }
			    if(q.done==true && q.array_name== "office_addl1"){
			      self.view_office_addl1="show_office_addl1"
			    }
			    if(q.done==true && q.array_name== "office_addl2"){
			      self.view_office_addl2="show_office_addl2"
			    }
			    if(q.done==true && q.array_name== "office_city"){
			      self.view_office_city="show_office_city"
			    }
			    if(q.done==true && q.array_name== "office_zip"){
			      self.view_office_zip="show_office_zip"
			    }
			    if(q.done==true && q.array_name== "office_state"){
			      self.view_office_state="show_office_state"
			    }
			    if(q.done==true && q.array_name== "office_country"){
			      self.view_office_country="show_office_country"
			    }
			    if(q.done==true && q.array_name== "office_mobile"){
			      self.view_office_mobile="show_office_mobile"
			    }
			    if(q.done==true && q.array_name== "otelephone"){
			      self.view_otelephone="show_otelephone"
			    }
			    if(q.done==true && q.array_name== "office_email"){
			      self.view_office_email="show_office_email"
			    }

			    /*<!-- False Check Box-->*/

			    if(q.done==false && q.array_name== "name"){
			      self.view_name=""
			    }
			    if(q.done==false && q.array_name== "enroll_no"){
			      self.view_enroll_no= ""
			    }
			    if(q.done==false && q.array_name== "email"){
			      self.view_email= "" 
			    }
			    if(q.done==false && q.array_name== "residence_city"){
			      self.view_residence_city =""  
			    }
			    if(q.done==false && q.array_name== "date_of_birth"){
			      self.view_residence_state= ""
			    }
			    if(q.done==false && q.array_name== "residence_country"){
			      self.view_residence_country= ""
			    }
			    if(q.done==false && q.array_name== "residence_zip"){
			      self.view_residence_zip= ""
			    }
			    if(q.done==false && q.array_name== "batch_year"){
			      self.view_batch_year= ""
			    }
			    if(q.done==false && q.array_name== "mobile"){
			      self.view_mobile= ""
			    }
			    if(q.done==false && q.array_name== "approved"){
			      self.view_approved= ""
			    }
			    if(q.done==false && q.array_name== "mobile"){
			      self.view_mobile= ""
			    }
			    if(q.done==false && q.array_name== "fees"){
			      self.view_fees= ""
			    }
			    if(q.done==false && q.array_name== "creation_date"){
			      self.view_creation_date= ""
			    }
			    if(q.done==false && q.array_name== "icse_school"){
			      self.view_icse_school= ""
			    }
			    if(q.done==false && q.array_name== "icse_board"){
			      self.view_icse_board= ""
			    }
			    if(q.done==false && q.array_name== "icse_city"){
			      self.view_icse_city= ""
			    }
			    if(q.done==false && q.array_name== "icse_division"){
			      self.view_icse_division= ""
			    }
			    if(q.done==false && q.array_name== "isc_school"){
			      self.view_isc_school= ""
			    }
			    if(q.done==false && q.array_name== "isc_board"){
			      self.view_isc_board= ""
			    }
			    if(q.done==false && q.array_name== "isc_city"){
			      self.view_isc_city= ""
			    }
			    if(q.done==false && q.array_name== "isc_division"){
			      self.view_isc_division= ""
			    }
			    if(q.done==false && q.array_name== "bachlor_school"){
			      self.view_bachlor_school= ""
			    }
			    if(q.done==false && q.array_name== "bachlor_board"){
			      self.view_bachlor_board= ""
			    }
			    if(q.done==false && q.array_name== "bachlor_city"){
			      self.view_bachlor_city= ""
			    }
			    if(q.done==false && q.array_name== "bachlor_division"){
			      self.view_bachlor_division= ""
			    }
			    if(q.done==false && q.array_name== "master_school"){
			      self.view_master_school= ""
			    }
			    if(q.done==false && q.array_name== "master_board"){
			      self.view_master_board= ""
			    }
			    if(q.done==false && q.array_name== "master_city"){
			      self.view_master_city= ""
			    }
			    if(q.done==false && q.array_name== "master_division"){
			      self.view_master_division= ""
			    }
			    if(q.done==false && q.array_name== "other_school"){
			      self.view_other_school= ""
			    }
			    if(q.done==false && q.array_name== "other_board"){
			      self.view_other_board= ""
			    }
			    if(q.done==false && q.array_name== "other_city"){
			      self.view_other_city= ""
			    }
			    if(q.done==false && q.array_name== "other_division"){
			      self.view_other_division= ""
			    }
			    if(q.done==false && q.array_name== "c_institute"){
			      self.view_c_institute= ""
			    }
			    if(q.done==false && q.array_name== "c_course"){
			      self.view_c_course= ""
			    }
			    if(q.done==false && q.array_name== "c_year"){
			      self.view_c_year= ""
			    }
			    if(q.done==false && q.array_name== "c_degree"){
			      self.view_c_degree= ""
			    }
			    if(q.done==false && q.array_name== "company_name"){
			      self.view_company_name= ""
			    }
			    if(q.done==false && q.array_name== "nature_of_job"){
			      self.view_nature_of_job= ""
			    }
			    if(q.done==false && q.array_name== "designation"){
			      self.view_designation= ""
			    }
			    if(q.done==false && q.array_name== "office_addl1"){
			      self.view_office_addl1= ""
			    }
			    if(q.done==false && q.array_name== "office_addl2"){
			      self.view_office_addl2= ""
			    }
			    if(q.done==false && q.array_name== "office_city"){
			      self.view_office_city= ""
			    }
			    if(q.done==false && q.array_name== "office_zip"){
			      self.view_office_zip= ""
			    }
			    if(q.done==false && q.array_name== "office_state"){
			      self.view_office_state= ""
			    }
			    if(q.done==false && q.array_name== "office_country"){
			      self.view_office_country= ""
			    }
			    if(q.done==false && q.array_name== "office_mobile"){
			      self.view_office_mobile= ""
			    }
			    if(q.done==false && q.array_name== "otelephone"){
			      self.view_otelephone= ""
			    }
			    if(q.done==false && q.array_name== "office_email"){
			      self.view_office_email= ""
			    }
			    
  			})
  		}          

	    self.getData = () => {   
          self.loading = true
          alumniStore.trigger('read_alumni')
        }

        self.approve_alumni = (c,a) => {
      		self.alumni_id = c
      		console.log(self.alumni_id)
      		$("#createAproveAlumniModal").addClass("is-active");
    	}

    	self.closeapproveAlumniwModal = () => {
      		$("#createAproveAlumniModal").removeClass("is-active");
    	}

    	self.approveAlumni = () =>{
	    	self.approval_date=convertDate(self.refs.approval_date.value)
	    	self.fees=self.refs.fees.value 
    		alumniStore.trigger('approved_alumni',self.approval_date,self.fees,self.alumni_id)	
    	}

    	self.addNextInformation = () =>{
    		self.alumni_view = 'edit_alumni_second_page'
    	}

    	self.closeSecondPage = () =>{
    		self.alumni_view = 'edit_alumni_first_page'
    	}

    	self.update_alumni = (c,a) =>{
    		console.log(c)
      		self.alumni_id = c
      		self.title='Update'
    		self.alumni_view = 'edit_alumni_first_page'
    		alumniStore.trigger('read_for_edit_alumni',self.alumni_id)
    	}

    	self.UpdateAlumniInformation = () =>{

    		var obj={}
    		/*Alumni Information */
        	var alumni_personal_details={};

	    	alumni_personal_details['creation_date']=convertDate(self.refs.submission_date.value)
	    	alumni_personal_details['first_name']=self.refs.first_name.value
	    	alumni_personal_details['middle_name']=self.refs.middle_name.value
	    	alumni_personal_details['last_name']=self.refs.last_name.value
	    	alumni_personal_details['batch_year']=self.refs.batch_year.value
	    	alumni_personal_details['dob']=convertDate(self.refs.date_of_birth.value)
	    	alumni_personal_details['enroll_no']=self.refs.enroll_no.value
	    	alumni_personal_details['residence_addl1']=self.refs.residence_addl1.value
	    	alumni_personal_details['residence_addl2']=self.refs.residence_addl2.value
	    	alumni_personal_details['residence_city']=self.refs.residence_city.value
	    	alumni_personal_details['residence_zip']=self.refs.residence_zip.value
	    	alumni_personal_details['residence_state']=self.refs.residence_state.value
	    	alumni_personal_details['residence_country']=self.refs.residence_country.value
	    	alumni_personal_details['mobile']=self.refs.mobile.value
	    	alumni_personal_details['telephone']=self.refs.telephone.value
	    	alumni_personal_details['fax']=self.refs.fax.value
	    	alumni_personal_details['email']=self.refs.email.value
	    	alumni_personal_details['spouse']=self.refs.spouse.value
	    	alumni_personal_details['news']=self.refs.news.value
	    	alumni_personal_details['marriage_date']=convertDate(self.refs.marriage_date.value)
	    	if($('#assisting_org_alumni').prop('checked') == true){
	    		alumni_personal_details['assisting_org_alumni'] = "Y"
	    	}else{
	    		alumni_personal_details['assisting_org_alumni'] = "N"
	    	}
	    	if($('#assisting_student_career').prop('checked') == true){
	    		alumni_personal_details['assisting_student_career'] = "Y"
	    	}else{
	    		alumni_personal_details['assisting_student_career'] = "N"
	    	}
	    	if($('#assisting_executive_commitee').prop('checked') == true){
	    		alumni_personal_details['assisting_executive_commitee'] = "Y"
	    	}else{
	    		alumni_personal_details['assisting_executive_commitee'] = "N"
	    	}

	        obj['alumni_personal_details']=alumni_personal_details;

	        // insert value into educational details

	        var alumni_educational_details={};

	    	alumni_educational_details['icse_school']=self.refs.icse_school.value
	    	alumni_educational_details['icse_board']=self.refs.icse_board.value
	    	alumni_educational_details['icse_city']=self.refs.icse_city.value
	    	alumni_educational_details['icse_division']=self.refs.icse_division.value
	    	alumni_educational_details['isc_school']=self.refs.isc_school.value
	    	alumni_educational_details['isc_board']=self.refs.isc_board.value
	    	alumni_educational_details['isc_city']=self.refs.isc_city.value
	    	alumni_educational_details['isc_division']=self.refs.isc_division.value
	    	alumni_educational_details['bachlor_school']=self.refs.bachlor_school.value
	    	alumni_educational_details['bachlor_board']=self.refs.bachlor_board.value
	    	alumni_educational_details['bachlor_city']=self.refs.bachlor_city.value
	    	alumni_educational_details['bachlor_division']=self.refs.bachlor_division.value
	    	alumni_educational_details['master_school']=self.refs.master_school.value
	    	alumni_educational_details['master_board']=self.refs.master_board.value
	    	alumni_educational_details['master_city']=self.refs.master_city.value
	    	alumni_educational_details['master_division']=self.refs.master_division.value
	    	alumni_educational_details['other_school']=self.refs.other_school.value
	    	alumni_educational_details['other_board']=self.refs.other_board.value
	    	alumni_educational_details['other_city']=self.refs.other_city.value
	    	alumni_educational_details['other_division']=self.refs.other_division.value
	    	alumni_educational_details['c_institute']=self.refs.c_institute.value
	    	alumni_educational_details['c_course']=self.refs.c_course.value
	    	alumni_educational_details['c_location']=self.refs.c_location.value
	    	alumni_educational_details['c_year']=self.refs.c_year.value
	    	alumni_educational_details['c_degree']=self.refs.c_degree.value

	    	obj['alumni_educational_details'] = alumni_educational_details

	    	 //insert value into emp_details

	        var alumni_employment_details={};

	    	alumni_employment_details['company_name']=self.refs.company_name.value
	    	alumni_employment_details['nature_of_job']=self.refs.nature_of_job.value
	    	alumni_employment_details['designation']=self.refs.designation.value
	    	alumni_employment_details['office_addl1']=self.refs.office_addl1.value
	    	alumni_employment_details['office_addl2']=self.refs.office_addl2.value
	    	alumni_employment_details['office_city']=self.refs.office_city.value
	    	alumni_employment_details['office_zip']=self.refs.office_zip.value
	    	alumni_employment_details['office_state']=self.refs.office_state.value
	    	alumni_employment_details['office_country']=self.refs.office_country.value
	    	alumni_employment_details['mobile']=self.refs.office_mobile.value
	    	alumni_employment_details['otelephone']=self.refs.otelephone.value
	    	alumni_employment_details['fax']=self.refs.office_fax.value
	    	alumni_employment_details['email']=self.refs.office_email.value

	    	obj['alumni_employment_details'] = alumni_employment_details

	    	//insert value into relative_details
	        
	        var alumni_relative_details={};

	    	alumni_relative_details['relative_name']=self.refs.relative_name.value
	    	alumni_relative_details['relative_relation']=self.refs.relative_relation.value
	    	alumni_relative_details['relative_class']=self.refs.relative_class.value

	    	obj['alumni_relative_details']=alumni_relative_details

	    	//insert value into friend_details
	    	var alumni_friend_details ={};

	    	alumni_friend_details['f1_name1']=self.refs.f1_name1.value
	    	alumni_friend_details['f1_batch_year']=self.refs.f1_batch_year.value
	    	alumni_friend_details['f1_stream']=self.refs.f1_stream.value
	    	alumni_friend_details['f1_contactno']=self.refs.f1_contactno.value
	    	alumni_friend_details['f2_name2']=self.refs.f2_name2.value
	    	alumni_friend_details['f2_batch_year']=self.refs.f2_batch_year.value
	    	alumni_friend_details['f2_stream']=self.refs.f2_stream.value
	    	alumni_friend_details['f2_contactno']=self.refs.f2_contactno.value
	    	alumni_friend_details['f3_name3']=self.refs.f3_name3.value
	    	alumni_friend_details['f3_batch_year']=self.refs.f3_batch_year.value
	    	alumni_friend_details['f3_stream']=self.refs.f3_stream.value
	    	alumni_friend_details['f3_contactno']=self.refs.f3_contactno.value

	    	obj['alumni_friend_details']=alumni_friend_details

			if(self.title=='Update'){
				self.loading = true
	        	alumniStore.trigger('edit_alumni', obj,self.alumni_id)
	          	self.alumni_view = 'show_alumni'
	        }
    	}

    	self.close = () =>{
    		self.alumni_view = 'show_alumni'
    	}

    	self.cancelOperation = (c) => {
      		self.AlumniData.map(a => {
          		a.confirmDelete = false
          		a.confirmEdit = false
      		})
    	}
	    self.confirmDelete = (c) => {
	      self.AlumniData.map(a => {
	        if(a.alumni_id != c.item.c.alumni_id){
	          a.confirmDelete = false
	        }else{
	          a.confirmDelete = true
	        }
	      })
	    }

	    self.delete = (c) => {
	      self.loading = true
	      alumniStore.trigger('delete_alumni', c.item.c.alumni_id)
	    }

	    alumniStore.on('read_alumni_changed',ReadAlumniChanged)
	    function ReadAlumniChanged(alumni){
	      self.AlumniData=[];
	      self.AlumniData = alumni
	      if(self.AlumniData.length==0){
	      	toastr.info("No Data Found")
	      }
	      self.loading = false;
	      self.update();
	    }

	    self.view_profile = (c,a) => {
	    	self.alumni_id = c
	    	self.alumni_view = 'alumni_profile'
	    	alumniStore.trigger('read_alumni_profile', self.alumni_id)
   		}

   		self.close_alumni_profile = () => {
    		self.alumni_view = 'show_alumni'	
    	}

	    alumniStore.on('approved_alumni_changed',ApprovedAlumniChanged)
    	function ApprovedAlumniChanged(){
      		self.closeapproveAlumniwModal()
      		self.getData()
      	}

      	alumniStore.on('read_for_edit_alumni_changed',ReadForEditAlumniChanged)
    	function ReadForEditAlumniChanged(alumni_details){
    		self.alumni_details=[]
      		self.alumni_details = alumni_details
      		self.refs.submission_date.value = alumni_details[0].creation_date
      		self.refs.first_name.value = alumni_details[0].first_name
      		self.refs.middle_name.value = alumni_details[0].middle_name
      		self.refs.last_name.value = alumni_details[0].last_name
    		self.refs.batch_year.value = alumni_details[0].batch_year
			self.refs.date_of_birth.value = alumni_details[0].dob
			self.refs.enroll_no.value = alumni_details[0].enroll_no
			self.refs.residence_addl1.value = alumni_details[0].residence_addl1
			self.refs.residence_addl2.value = alumni_details[0].residence_addl2
			self.refs.residence_city.value = alumni_details[0].residence_city
			self.refs.residence_zip.value = alumni_details[0].residence_zip
			self.refs.residence_state.value = alumni_details[0].residence_state
			self.refs.residence_country.value = alumni_details[0].residence_country
			self.refs.mobile.value = alumni_details[0].mobile
			self.refs.fax.value = alumni_details[0].fax
			self.refs.email.value = alumni_details[0].email
			self.refs.telephone.value = alumni_details[0].telephone
			self.refs.spouse.value=alumni_details[0].spouse
    		self.refs.marriage_date.value=alumni_details[0].marriage_date
    		self.refs.relative_name.value=alumni_details[0].relative_name
    		self.refs.relative_relation.value=alumni_details[0].relative_relation
    		self.refs.relative_class.value=alumni_details[0].relative_class
    		self.refs.icse_school.value=alumni_details[0].icse_school
			self.refs.icse_board.value = alumni_details[0].icse_board
			self.refs.icse_city.value = alumni_details[0].icse_city
			self.refs.icse_division.value = alumni_details[0].icse_division
			self.refs.isc_school.value = alumni_details[0].isc_school
			self.refs.isc_board.value = alumni_details[0].isc_board
			self.refs.isc_city.value = alumni_details[0].isc_city
			self.refs.isc_division.value = alumni_details[0].isc_division
			self.refs.bachlor_school.value = alumni_details[0].bachlor_school
			self.refs.bachlor_board.value = alumni_details[0].bachlor_board
			self.refs.bachlor_city.value = alumni_details[0].bachlor_city
			self.refs.bachlor_division.value = alumni_details[0].bachlor_division
			self.refs.master_school.value = alumni_details[0].master_school
			self.refs.master_board.value = alumni_details[0].master_board
			self.refs.master_city.value = alumni_details[0].master_city
			self.refs.master_division.value = alumni_details[0].master_division
			self.refs.other_school.value = alumni_details[0].other_school
			self.refs.other_board.value = alumni_details[0].other_board
			self.refs.other_city.value = alumni_details[0].other_city
			self.refs.other_division.value = alumni_details[0].other_division
			self.refs.c_institute.value = alumni_details[0].c_institute
			self.refs.c_course.value = alumni_details[0].c_course
			self.refs.c_location.value = alumni_details[0].c_location
			self.refs.c_year.value = alumni_details[0].c_year
			self.refs.c_degree.value = alumni_details[0].c_degree
			self.refs.company_name.value = alumni_details[0].company_name
			self.refs.nature_of_job.value = alumni_details[0].nature_of_job
			self.refs.designation.value = alumni_details[0].designation
			self.refs.office_addl1.value = alumni_details[0].office_addl1
			self.refs.office_addl2.value = alumni_details[0].office_addl2
			self.refs.office_city.value = alumni_details[0].office_city
			self.refs.office_zip.value = alumni_details[0].office_zip
			self.refs.office_state.value = alumni_details[0].office_state
			self.refs.office_country.value = alumni_details[0].office_country
			self.refs.office_mobile.value = alumni_details[0].office_mobile
			self.refs.office_fax.value = alumni_details[0].office_fax
			self.refs.office_email.value=alumni_details[0].office_email
			self.refs.otelephone.value=alumni_details[0].otelephone
			self.refs.f1_name1.value=alumni_details[0].f1_name1
			self.refs.f1_batch_year.value=alumni_details[0].f1_batch_year
			self.refs.f1_stream.value=alumni_details[0].f1_stream
			self.refs.f1_contactno.value=alumni_details[0].f1_contactno
			self.refs.f2_name2.value = alumni_details[0].f2_name2
			self.refs.f2_batch_year.value = alumni_details[0].f2_batch_year
			self.refs.f2_stream.value = alumni_details[0].f2_stream
			self.refs.f2_contactno.value = alumni_details[0].f2_contactno
			self.refs.f3_name3.value = alumni_details[0].f3_name3
			self.refs.f3_batch_year.value = alumni_details[0].f3_batch_year
			self.refs.f3_stream.value = alumni_details[0].f3_stream
			self.refs.f3_contactno.value = alumni_details[0].f3_contactno
			if(alumni_details[0].assisting_org_alumni == "Y"){
				$('#assisting_org_alumni').prop('checked', true)
			}
			else{
				$('#assisting_org_alumni').prop('checked', false)
			}
			if(alumni_details[0].assisting_student_career == "Y"){
				$('#assisting_student_career').prop('checked', true)
			}
			else{
				$('#assisting_student_career').prop('checked', false)
			}
			if(alumni_details[0].assisting_executive_commitee == "Y"){
				$('#assisting_executive_commitee').prop('checked', true)
			}
			else{
				$('#assisting_executive_commitee').prop('checked', false)
			}
			self.refs.news.value = alumni_details[0].news
			self.alumni_id = alumni_details[0].alumni_id
			self.edit_alumni_id = alumni_details[0].alumni_id
			self.update()

    	}

    	alumniStore.on('edit_alumni_changed',EditAlumniChanged)
    	function EditAlumniChanged(){
      		self.getData()
      		self.loading = false
    	}

    	alumniStore.on('delete_alumni_changed',DeleteAlumniChanged)
    	function DeleteAlumniChanged(){
      		self.getData()
      		self.loading = false
    	}

    	alumniStore.on('read_alumni_profile_changed',AlumniProfileChanged)
    	function AlumniProfileChanged(alumni_profile_details){
	    	self.al=alumni_profile_details[0]
	    	self.alumni_profile = alumni_profile
	      	self.update()
    	}

	</script>
</aprrove-alumni>