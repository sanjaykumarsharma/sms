<career-report>
	<loading-bar if={loading}></loading-bar>
	<section class=" is-fluid" show={career_view =='show_interviewed_candidate'}>
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
        		<button class="button is-success has-text-weight-bold ml5 is-pulled-right" 
        		onclick={csvExport}>
          		<span class="icon">
            		<i class="far fa-file-excel"></i>
          		</span>
        		</button>
        		<button class="button is-link has-text-weight-bold is-pulled-right" 
            onclick={getData}>
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
			    <th>Applicant No</th>
			    <th>Name</th>
			    <th>Post Applied</th>
			    <th>Subject Taught</th>
			    <th>Attendance</th>
			    <th>Result</th>
			    <th>Panel</th>
			    <th>Feedback</th>
			    <th>Class Taught</th>
			    <th>DOB</th>
			    <th>Sex</th>
			    <th>Marital Status</th>
			    <th>Interview Date</th>
			    <th></th>
			</tr>
		</thead>
		<tbody>
			<tr each={a, i in CareerFeedbackReport}>
				<td>{ i+1 }</td>
				<td>{a.career_id}</td>
				<td>{a.full_name}</td>
				<td>{a.post_applied_for}</td>
				<td>{a.subject_tobe_taught}</td>
				<td>{a.attendance}</td>
				<td>{a.result}</td>
				<td>{a.panel}</td>
				<td>{a.feedback}</td>
				<td>{a.class_tobe_taught}</td>
				<td>{a.date_of_birth}</td>
				<td>{a.sex}</td>
				<td>{a.marital_status}</td>
				<td>{a.interview_date}</td>
				<td class="has-text-right no-print">
		            <span><a class="button is-small" onclick={view_profile.bind(this, a.career_id)} title="Profile"><i class="fa fa-eye" aria-hidden="true"></i></a></span>
          		</td>
			</tr>
		</tbody>
	</table>
	</section>

  <!-- Start Profile View -->
  	<print-header></print-header>
  	<section class=" is-fluid" show={career_view =='applicant_profile'}>
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
      flatpickr(".date", {
	    allowInput: true,
        dateFormat: "d/m/Y",
  		})
      self.career_view = 'show_interviewed_candidate'
      self.update();
    })

    self.on("unmount", function(){
      careerStore.off('read_career_feedback_report_changed',ReadCareerFeedbackReportChanged)
      careerStore.off('read_applicant_profile_changed',ReadApplicantProfileChanged)
    })

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
          careerStore.trigger('read_career_feedback_report', obj)

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
          careerStore.trigger('csv_export_career_feedback_report', obj)
        }
    }

    self.view_profile = (c,a) => {
    	console.log("self.session_id")
    	console.log(self.career_id)
    	self.career_id = c
    	self.career_view = 'applicant_profile'
    	careerStore.trigger('read_applicant_profile', self.career_id)
    }

    self.close_applicant_profile = () =>{
    	self.career_view = 'show_interviewed_candidate'
    }


    careerStore.on('read_career_feedback_report_changed',ReadCareerFeedbackReportChanged)
    function ReadCareerFeedbackReportChanged(career_feedback_report_data){
      self.CareerFeedbackReport=[];
      self.CareerFeedbackReport = career_feedback_report_data
      if(self.CareerFeedbackReport.length==0){
      	toastr.info("No Data Found")
      }
      self.loading = false;
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
</career-report>