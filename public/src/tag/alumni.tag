<alumni>
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
			          	<th show={view_email=='show_email'}>Email</th>
			          	<th show={view_address=='show_address'}>Address</th>
			          	<th show={view_residence_city=='show_residence_city'}>City</th>
			          	<th show={view_residence_state=='show_residence_state'}>State</th>
			          	<th show={view_residence_country=='show_residence_country'}>Country</th>
			          	<th show={view_residence_zip=='show_residence_zip'}>Zip</th>
			          	<th show={view_batch_year=='show_batch_year'}>Batch Year</th>
			          	<th show={view_mobile=='show_mobile'}>Mobile</th>
			          	<th show={view_fax=='show_fax'}>Fax</th>
			          	<th show={view_approved=='show_approved'}>Approved</th>
			          	<th show={view_approval_date=='show_approval_date'}>Approval Date</th>
			          	<th show={view_fees=='show_fees'}>Fees</th>
			          	<th show={view_creation_date=='show_creation_date'}>Submission Date</th>
			          	<th class="has-text-right no-print" style="width:100px;"></th>
					</tr>
				</thead>
				<tbody>
					<tr each={c, i in ApprovedAlumniData}>
						<td >{i+1 }</td>
				        <td show={view_name=='show_name'}>{c.name}</td>
				        <td show={view_email=='show_email'}>{c.email}</td>
				        <td show={view_address=='show_address'}>{c.address}</td>
				        <td show={view_residence_city=='show_residence_city'}>{c.residence_city}</td>
				        <td show={view_residence_state=='show_residence_state'}>{c.residence_state}</td>
				        <td show={view_residence_country=='show_residence_country'}>{c.residence_country}</td>
				        <td show={view_residence_zip=='show_residence_zip'}>{c.residence_zip}</td>
				        <td show={view_batch_year=='show_batch_year'}>{c.batch_year}</td>
				        <td show={view_mobile=='show_mobile'}>{c.mobile}</td>
				        <td show={view_fax=='show_fax'}>{c.fax}</td>
				        <td show={view_approved=='show_approved'}>{c.approved}</td>
				        <td show={view_approval_date=='show_approval_date'}>{c.approval_date}</td>
				        <td show={view_fees=='show_fees'}>{c.fees}</td>
				        <td show={view_creation_date=='show_creation_date'}>{c.creation_date}</td>
				        <td class="has-text-right no-print">
		          			<div class="inline-flex rounded border border-grey overflow-hidden" hide={c.confirmDelete}>
		            			<span><a class="button is-small" rel="nofollow" onclick={confirmDelete} title="Delete">
		            				<i class="fa fa-trash" aria-hidden="true"></i>
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
		    	{field_name : "Email", array_name: "email"},
		    	{field_name : "Address", array_name: "address"},
		    	{field_name : "City", array_name: "residence_city"},
			    {field_name : "State", array_name: "residence_state"},
			    {field_name : "Country", array_name: "residence_country"},
			    {field_name : "Zip", array_name: "residence_zip"},
			    {field_name : "Batch Year", array_name: "batch_year"},
			    {field_name : "Mobile", array_name: "mobile"},
			    {field_name : "Fax", array_name: "fax"},
			    {field_name : "Approved", array_name: "approved"},
			    {field_name : "Approval Date", array_name: "approval_date"},
			    {field_name : "Fees", array_name: "fees"},
			    {field_name : "Submission Date", array_name: "creation_date"}
    		]

	    	self.fieldList.map( q => {
		        if(q.array_name== "name"){
		          self.view_name="show_name"  
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
		        if(q.array_name== "fax"){
		          self.view_fax= "show_fax"
		          q.done=true
		        }
		        if(q.array_name== "approved"){
		          self.view_approved= "show_approved"
		          q.done=true
		        }
		        if(q.array_name== "approval_date"){
		          self.view_approval_date="show_approval_date"
		          q.done=true
		        }
		        if(q.array_name== "fees"){
		          self.view_fees="show_fees"
		          q.done=true
		        }
		        if(q.array_name== "creation_date"){
		          self.view_creation_date="show_creation_date"
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
	      alumniStore.off('read_approved_alumni_changed',ReadApprovedAlumniChanged)
	      alumniStore.off('delete_alumni_changed',DeleteAlumniChanged)
	      alumniStore.off('read_alumni_profile_changed',AlumniProfileChanged)
	      alumniStore.off('read_approved_alumni_csv_changed',csvApprovedAlumniChanged)
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
			    if(q.done==true && q.array_name== "email"){
			      self.view_email= "show_email"
			    }
			    if(q.done==true && q.array_name== "address"){
			      self.view_address="show_address"
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
			    if(q.done==true && q.array_name== "fax"){
			      self.view_fax="show_fax"
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
			    if(q.done==true && q.array_name== "approval_date"){
			      self.view_approval_date="show_approval_date"
			    }

			    /*<!-- False Check Box-->*/

			    if(q.done==false && q.array_name== "name"){
			      self.view_name=""
			    }
			    if(q.done==false && q.array_name== "email"){
			      self.view_email= "" 
			    }
			    if(q.done==false && q.array_name== "address"){
			      self.view_address =""  
			    }
			    if(q.done==false && q.array_name== "residence_city"){
			      self.view_residence_city =""  
			    }
			    if(q.done==false && q.array_name== "residence_state"){
			      self.view_residence_state =""  
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
			    if(q.done==false && q.array_name== "fax"){
			      self.view_fax= ""
			    }
			    if(q.done==false && q.array_name== "approved"){
			      self.view_approved= ""
			    }
			    if(q.done==false && q.array_name== "fees"){
			      self.view_fees= ""
			    }
			    if(q.done==false && q.array_name== "creation_date"){
			      self.view_creation_date= ""
			    }
			    if(q.done==false && q.array_name== "approval_date"){
			      self.view_approval_date= ""
			    }
  			})
  		}          

	    self.getData = () => {   
          self.loading = true
          alumniStore.trigger('read_approved_alumni')
        }
        self.downloadCSV = () =>{
      		alumniStore.trigger('read_approved_alumni_csv', self.ApprovedAlumniData)
    	}

    	self.cancelOperation = (c) => {
      		self.ApprovedAlumniData.map(a => {
          		a.confirmDelete = false
          		a.confirmEdit = false
      		})
    	}
	    self.confirmDelete = (c) => {
	      self.ApprovedAlumniData.map(a => {
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

	    alumniStore.on('read_approved_alumni_changed',ReadApprovedAlumniChanged)
	    function ReadApprovedAlumniChanged(alumni){
	      self.ApprovedAlumniData=[];
	      self.ApprovedAlumniData = alumni
	      if(self.ApprovedAlumniData.length==0){
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

    	alumniStore.on('delete_alumni_changed',DeleteAlumniChanged)
    	function DeleteAlumniChanged(){
      		self.getData()
      		self.loading = false
    	}

    	alumniStore.on('read_alumni_profile_changed',AlumniProfileChanged)
    	function AlumniProfileChanged(alumni_profile_details){
	    	self.al=alumni_profile_details[0]
	    	self.alumni_profile_details = alumni_profile_details
	      	self.update()
    	}
    	alumniStore.on('read_approved_alumni_csv_changed',csvApprovedAlumniChanged)
    	function csvApprovedAlumniChanged(url){
	    	var open_url = window.location.origin+url 
	      	window.open(open_url);
	      	self.loading = false
	      	self.update()
    	}

	</script>
</alumni>