<mentor-detail>
	<print-header></print-header>
	<loading-bar if={loading}></loading-bar>
	<section class=" is-fluid" show={mentor_view =='show_mentor'}>
	<h2 class="title has-text-centered is-size-5" style="color: #ff3860;">Mentor Detail</h2>
		<div class="level box no-print">
			<div class="level-left">
				<div class="columns">
					<div class="column is-narrow"><label class="label">Category</label></div> 
					<div class="column is-narrow">
						<div class="control">
							<div class="select">
								<select ref="category_id" id="CategoryName" onchange={getMentorData}>
									<option value="-1">ALL</option>
									<option each={categories} value={category_id}>{category_name}
		                            </option>
								</select>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="level-right">
				<div class="control">
          			<input class="input" ref="searchMentorDetail" onkeyup={filterMentorDetail} type="text" placeholder="Search By Enroll No or Name">
        		</div>
				<button class="button is-warning has-text-weight-bold ml5" onclick={add_new_mentor}>
				<span class="icon">
					<span class="fas fa-plus"></span>
				</span>
				
				</button>
	        	<button class="button is-link has-text-weight-bold  ml5" onclick={getMentorData}>
			        <span class="icon">
			          <span class="fas fa-sync-alt"></span>
			        </span>
	        	</button>

	        	<button class="button is-success has-text-weight-bold ml5" onclick={downloadCSV}>
        			<span class="icon">
          				<i class="far fa-file-excel"></i>
        			</span>
        		</button>

        		<a class="button is-primary has-text-weight-bold ml5" onclick="window.print()">
        			<span class="icon">
          				<i class="fas fa-print"></i>
        			</span>
        		</a>
        		
			</div>
		</div>

		<table class="table is-fullwidth is-bordered is-hoverable is-narrow">
			<p><center><strong>Category:{categoryName}</strong></center></p>
			<thead>
				<tr>
          			<th>SL No</th>
          			<th>Referred by</th>
					<th>Name</th>
					<th>Enroll No</th>
					<th>Class</th>
					<th>Case</th>
					<th>Date</th>
					<th>Time In</th>
					<th>Time Out</th>
					<th>Diagnosis</th>
					<th>Suggestion</th>
					<th style="width: 120px;" class="no-print"></th>
				</tr>
			</thead>
			<tbody>
				<tr each={ac, i in filteredMentorDetail }>
          			<td>{i + 1}</td>
					<td>{ac.referred_by}</td>
					<td>{ac.student_name}</td>
					<td>{ac.enroll_number}</td>
					<td>{ac.standard}</td>
					<td>{ac.case_name}</td>
					<td>{ac.consult_date}</td>
					<td>{ac.time_in}</td>
					<td>{ac.time_out}</td>
					<td>{ac.diagnosis}</td>
					<td>{ac.suggestion}</td>
					<td class="has-text-right no-print">
			            <div class="inline-flex rounded border border-grey overflow-hidden " hide={ac.confirmDelete}>
			              <span><a class="button is-small" onclick={case_detail.bind(this, ac)} title="Case Detail">
			              	<i class="fa fa-share" aria-hidden="true"></i></a></span>
			              <span><a class="button is-small" onclick={edit.bind(this, ac.id)} title="Edit">
			              	<i class="fa fa-edit" aria-hidden="true"></i></a></span>
			              <span if={role=='ADMIN'} > <a class="button is-small" rel="nofollow" onclick={confirmDelete} title="Delete"><i class="fa fa-trash" aria-hidden="true"></i></a></span>
			            </div>
			            <div class="table-buttons" if={ac.confirmDelete}>
			              <span disabled={loading} class="button is-small is-rounded" onclick={delete}><i class="fa fa-check" ></i></span>
			              <span disabled={loading} class="button is-small  has-text-danger is-rounded" onclick={cancelOperation}><i class="fa fa-times"></i></span>
			            </div>
          			</td>
				</tr>
			</tbody>
		</table>
	</section>
	<section class=" is-fluid" show={mentor_view =='add_mentor'}>
		<div class="level">
		  <div class="level-left">
		    <div class="level-item">
		    	<h2 class="title is-size-5" style="color: #ff3860;">{title} Detail</h2>
		    </div>
		  </div>
		  <div class="level-right">
		    <button class="button is-warning has-text-weight-bold is-small" onclick={close_new_mentor}>
		    <span class="icon">
          		<span class="fas fa-arrow-left"></span>
        	</span>
		    </button>
		  </div>
		</div>	

		<div class="box">
			<div class="columns">
				<div class="column is-2">
					<label class="label is-small" for="referredInput">Referred by</label>
				</div>
				<div class="column is-2">
					<div class="select is-fullwidth is-small">
						<select ref="referredInput" id="referredInput">
							<option value="Class Teacher">Class Teacher</option>
							<option value="School Authority">School Authority</option>
							<option value="Parent">Parent</option>
							<option value="Out Sider">Out Sider</option>
							<option value="Student Directly">Student Directly</option>
						</select>
					</div>
		      	</div>
		      	<div class="column is-2">
					<label class="label is-small" for="enrollInput">Enroll No</label>
		      	</div>
		      	<div class="column is-2 ">
					<input class="input is-small" type="text" ref="enrollInput" >
		      	</div>
		      	<div class="column is-2">
					<label class="label is-small" for="CategoryidInput">Category</label>
		      	</div>
		      	<div class="column is-2">
	        		<div class="select is-fullwidth is-small">
  						<select ref="CategoryidInput" onchange={readCategoryCase}>
							<option each={categories} value={category_id}>{category_name}
                            </option>
						</select>
	  				</div>
		      	</div>
			</div>

			<div class="columns mt30">
				<div class="column is-2">
					<label class="label is-small" for="case_id">Case</label>
				</div>
				<div class="column is-2">
					<div class="select is-fullwidth is-small">
						<select ref="case_id">
							<option each={cases} value={case_id}>{case_name}
                            </option>
						</select>
					</div>
		      	</div>
		      	<div class="column is-2">
					<label class="label is-small" for="mentorDateInput">Date</label>
		      	</div>
		      	<div class="column is-2 ">
					<input class="input date is-small" type="text" ref="mentorDateInput" readonly>
		      	</div>
		      	<div class="column is-2">
					<label class="label is-small" for="inTimeInput">Time In</label>
		      	</div>
		      	<div class="column is-2">
	        		<input class="input is-small" ref="inTimeInput" type="time">
		      	</div>
			</div>

			<div class="columns mt30">
				<div class="column is-2">
					<label class="label is-small" for="outTimeInput">Time Out</label>
				</div>
				<div class="column is-2">
					<input class="input is-small" ref="outTimeInput" type="time">
		      	</div>
		      	<div class="column is-2">
					<label class="label is-small" for="diagnosisInput">Diagnosis</label>
				</div>
				<div class="column is-2">
					<input class="input is-small" ref="diagnosisInput"  type="text">
		      	</div>
		      	<div class="column is-2">
					<label class="label is-small" for="suggestionInput">Suggestion</label>
		      	</div>
		      	<div class="column is-2 ">
					<textarea class="textarea is-small" ref="suggestionInput" rows="3"></textarea>
		      	</div>
			</div>
			<div class="columns mt60">
				<div class="column is-full">
				    <button class="button is-success has-text-weight-bold adjusted-top" 
				    	onclick={add}>Submit
				    </button>
				    <button class="button is-danger has-text-weight-bold adjusted-top" 
				    	onclick={close_new_mentor}>Cancel
				    </button>    
			    </div>
			</div>
		</div>	
	</section>

	<section class=" is-fluid" show={mentor_view =='view_case_detail'}>
		<div class="level no-print">
		  <div class="level-left">
		    <div class="level-item">
		    	
		    </div>
		  </div>
		  <div class="level-right">
		    <button class="button is-warning has-text-weight-bold is-small" onclick={add_case_detail} title="Add Case
		    ">
				<span class="icon">
					<span class="fas fa-plus"></span>
				</span>
			</button>
			<button class="button is-link has-text-weight-bold is-small ml10" onclick={refress_case_detail}>
		        <span class="icon">
		          <span class="fas fa-sync-alt"></span>
		        </span>
        	</button>
        	<button class="button is-success has-text-weight-bold is-small ml5" onclick={downloadCaseCSV}>
    			<span class="icon">
      				<i class="far fa-file-excel"></i>
    			</span>
        	</button>
        	<a class="button is-primary has-text-weight-bold is-small ml5" onclick="window.print()">
    			<span class="icon">
      				<i class="fas fa-print"></i>
    			</span>
        	</a>
		    <button class="button is-warning has-text-weight-bold is-small ml10" onclick={close_case_detail_view}>
	        	<span class="icon">
	          		<span class="fas fa-arrow-left"></span>
	        	</span>
        	</button>
		  </div>
		</div>
		<table class="table is-fullwidth is-bordered is-hoverable is-narrow">
			
			<p class="is-size-5 has-text-centered" style="color: #ff3860;">Case: { case_name }  </p>
			<thead>
				<tr>
          			<th>SL No</th>
          			<th>Visitor</th>
					<th>Visit Date</th>
					<th>Time In</th>
					<th>Time Out</th>
					<th>Suggestion</th>
					<th>Status</th>
					<th style="width: 100px;" class="no-print"></th>
				</tr>
			</thead>
			<tbody>
				<tr each={ca, i in caseDetails }>
          			<td>{i + 1}</td>
					<td>{ca.visitor}</td>
					<td>{ca.visit_date}</td>
					<td>{ca.time_in}</td>
					<td>{ca.time_out}</td>
					<td>{ca.suggestion}</td>
					<td>{ca.status}</td>
					<td class="has-text-right no-print">
			            <div class="inline-flex rounded border border-grey overflow-hidden" hide={ca.confirmCaseDelete}>
			              <span><a class="button is-small" onclick={editCase.bind(this, ca.id)} title="Edit">
			              	<i class="fa fa-edit" aria-hidden="true"></i></a></span>
			              <span if={role=='ADMIN'} > <a class="button is-small" rel="nofollow" onclick={confirmCaseDelete} 
			              	title="Delete"><i class="fa fa-trash" aria-hidden="true"></i></a>
			          	  </span>
			            </div>
			            <div class="table-buttons" if={ca.confirmCaseDelete}>
			              <span disabled={loading} class="button is-small is-rounded" onclick={deleteCase}><i class="fa fa-check" ></i></span>
			              <span disabled={loading} class="button is-small  has-text-danger is-rounded" onclick={cancelCaseOperation}><i class="fa fa-times"></i></span>
			            </div>
          			</td>
				</tr>
			</tbody>
		</table>
		
	</section>

	<section class=" is-fluid" show={mentor_view =='add_case_detail'}>
		<div class="level">
		  <div class="level-left">
		    <div class="level-item">
		    	<h2 class="title is-size-5" style="color: #ff3860;">{title} Case Detail</h2>
		    </div>
		  </div>
		  <div class="level-right">
		    <button class="button is-warning has-text-weight-bold is-small" onclick={close_add_case}>
		    <span class="icon">
          		<span class="fas fa-arrow-left"></span>
        	</span>
		    </button>
		  </div>
		</div>
		<div class="box">
			<div class="columns">
				<div class="column is-2">
					<label class="label is-small" for="visitorInput">Visitor</label>
				</div>
				<div class="column is-2">
					<div class="select is-fullwidth is-small">
						<select ref="visitorInput" id="visitorInput">
							<option value="Student">Student</option>
							<option value="Class Teacher">Class Teacher</option>
							<option value="Parent">Parent</option>
						</select>
					</div>
		      	</div>
		      	<div class="column is-2">
					<label class="label is-small" for="visitingDateInput">Visiting Date</label>
		      	</div>
		      	<div class="column is-2 ">
					<input class="input date is-small" type="text" ref="visitingDateInput" readonly>
		      	</div>
		      	<div class="column is-2">
					<label class="label is-small" for="addCaseinTimeInput">Time In</label>
		      	</div>
		      	<div class="column is-2">
	        		<input class="input is-small" ref="addCaseinTimeInput" type="time">
		      	</div>
			</div>

			<div class="columns mt30">
				<div class="column is-2">
					<label class="label is-small" for="addCaseoutTimeInput">Time Out</label>
				</div>
				<div class="column is-2">
					<input class="input is-small" ref="addCaseoutTimeInput" type="time">
		      	</div>
		      	<div class="column is-2">
					<label class="label is-small" for="statusInput">Status</label>
		      	</div>
		      	<div class="column is-2 ">
					<input class="input is-small" ref="statusInput" type="text">
		      	</div>
		      	<div class="column is-2">
					<label class="label is-small" for="addCasesuggestionInput">Suggestion</label>
		      	</div>
		      	<div class="column is-2">
	        		<textarea class="textarea is-small" ref="addCasesuggestionInput" rows="3"></textarea>
		      	</div>
			</div>
			<div class="columns mt60">
				<div class="column is-full">
				    <button class="button is-success has-text-weight-bold adjusted-top" 
				    	onclick={addCase}>Submit
				    </button>
				    <button class="button is-danger has-text-weight-bold adjusted-top" 
				    	onclick={close_add_case}>Cancel
				    </button>    
			    </div>
			</div>
		</div>
	</section>

<script>
	var self = this
    self.on("mount", function(){
    self.loading = false;
    self.title='Add'
    self.mentor_view = 'show_mentor'
    self.role = getCookie('role')
    self.update()
    flatpickr(".date", {
	   allowInput: true,
       dateFormat: "d/m/Y",
  	})
    self.readCategories()
    self.readCase()
    })

    self.on("unmount", function(){
      mentordetailStore.off('read_mentor_categories_changed',CategoriesChanged)
      mentordetailStore.off('read_case_changed',CaseChanged)
      mentordetailStore.off('read_mentor_changed',ReadMentorChanged)
      mentordetailStore.off('read_mentor_case_changed',ReadMentorCaseDetailsChanged)
      mentordetailStore.off('read_for_edit_mentor_changed',ReadMentorForEditChanged)
      mentordetailStore.off('add_case_detail_changed',AddCaseChanged)
      mentordetailStore.off('read_for_edit_case_changed',ReadCaseDetailsForEditChanged)
      mentordetailStore.off('edit_case_detail_changed',EditCaseDetailsChanged)
      mentordetailStore.off('delete_case_details_changed',DeleteCaseDetailsChanged)
      mentordetailStore.off('csv_export_mentor_changed',csvMentorDetailsChanged)
      mentordetailStore.off('read_mentor_case_csv_changed',csvMentorCaseDetailsChanged)
    })

    self.readCategories = () =>{
      mentordetailStore.trigger('read_mentor_categories')
    }
    self.readCategoryCase = () => {
    	self.cases = []
    	self.cases = self.mentor_case.filter(c => {
          return c.category_id == self.refs.CategoryidInput.value
        }) 
    }

    self.readCase = () =>{
      mentordetailStore.trigger('read_case')
    }

    self.getMentorData = () =>{
      self.loading = true;
      mentordetailStore.trigger('read_mentor', self.refs.category_id.value)
    }

    self.downloadCSV = () =>{
      mentordetailStore.trigger('csv_export_mentor', self.mentors)
    }

    self.add_new_mentor = () =>{
    	self.mentor_view='add_mentor'
    	self.title='Add'
    	self.clearForm()
    	self.update()
    }

     self.close_new_mentor = () =>{
    	self.mentor_view='show_mentor'
    	self.update()
    }

    self.add_case_detail = () => {
    	self.mentor_view='add_case_detail'
    	self.title='Add'
    	self.clearaddCaseForm()
    }

    self.close_add_case = () =>{
    	self.mentor_view='view_case_detail'
    }

    self.addCase = () => {
    	if(!self.refs.visitingDateInput.value){
       		toastr.info("Please enter Date and try again")
      	}else{
     	var obj={}
     	obj['visitor']=self.refs.visitorInput.value
     	obj['visit_date']=convertDate(self.refs.visitingDateInput.value)
     	obj['time_in']=self.refs.addCaseinTimeInput.value
     	obj['time_out']=self.refs.addCaseoutTimeInput.value
     	obj['status']=self.refs.statusInput.value
     	obj['suggestion']=self.refs.addCasesuggestionInput.value
     	obj['enroll_number']=self.enroll_number
     	obj['case_id']=self.case_id
     	console.log(obj)
     	if(self.title=='Add'){
           	mentordetailStore.trigger('add_case_detail', obj)
           	self.mentor_view='view_case_detail'
        }else if(self.title=='Update'){
            mentordetailStore.trigger('edit_case_detail', obj,self.edit_case_id)
            console.log(obj)
            self.mentor_view='view_case_detail'
          }
        }
    }

    self.edit = (c,ac) => {
      console.log(c)
      self.id = c
      mentordetailStore.trigger('read_for_edit_mentor',self.id)
      self.mentor_view='add_mentor'
      self.title='Update'
      
    }

    self.editCase = (c,ca) => {
      console.log(c)
      self.id = c
      mentordetailStore.trigger('read_for_edit_case',self.id)
      self.add_case_detail()
      self.title='Update'
    }
    self.cancelCaseOperation = (ca) => {
      self.caseDetails.map(c => {
          c.confirmCaseDelete = false
          c.confirmCaseEdit = false
      })
    }
    self.confirmCaseDelete = (ca) => {
      self.caseDetails.map(c => {
        if(c.id != ca.item.ca.id){
          c.confirmCaseDelete = false
        }else{
          c.confirmCaseDelete = true
        }
      })
    }

    self.deleteCase = (ca) => {
      self.loading = true
      mentordetailStore.trigger('delete_case_details', ca.item.ca.id)
    }

    self.cancelOperation = (ac) => {
      self.mentors.map(c => {
          c.confirmDelete = false
          c.confirmEdit = false
      })
    }
    self.confirmDelete = (ac) => {
      self.mentors.map(c => {
        if(c.id != ac.item.ac.id){
          c.confirmDelete = false
        }else{
          c.confirmDelete = true
        }
      })
    }

    self.delete = (ac) => {
      self.loading = true
      mentordetailStore.trigger('delete_mentor_detail', ac.item.ac.id)
    }

    self.add = () => {
    	if(!self.refs.enrollInput.value){
       		toastr.info("Please enter Enroll No. and try again")
      	}else if(!self.refs.CategoryidInput.value){
        	toastr.info("Please Select Category and try again")
      	}else if(!self.refs.mentorDateInput.value){
        	toastr.info("Please enter Date and try again")
      	}else{
     	var obj={}
     	obj['referred_by']=self.refs.referredInput.value
     	obj['enroll_number']=self.refs.enrollInput.value
     	obj['category_id']=self.refs.CategoryidInput.value
     	obj['case_id']=self.refs.case_id.value
     	obj['consult_date']=convertDate(self.refs.mentorDateInput.value)
     	obj['time_in']=self.refs.inTimeInput.value
     	obj['time_out']=self.refs.outTimeInput.value
     	obj['diagnosis']=self.refs.diagnosisInput.value
     	obj['suggestion']=self.refs.suggestionInput.value
     	/*obj['id']=self.edit_id*/
     	if(self.title=='Add'){
           	mentordetailStore.trigger('add_mentor_detail', obj)
        }else if(self.title=='Update'){
            mentordetailStore.trigger('edit_mentor_detail', obj,self.edit_id)
            console.log(obj)
            self.mentor_view='show_mentor'
          }
        }
    }
    self.case_detail = (c,ac) => {
    	self.case_name = c.case_name
    	self.case_id = c.id
    	self.enroll_number = c.enroll_number
    	self.mentor_view = 'view_case_detail'
    	self.loading = true;
    	mentordetailStore.trigger('read_mentor_case', c.id,c.enroll_number)
    }

    self.refress_case_detail = () => {
    	self.loading = true;
    	mentordetailStore.trigger('read_mentor_case', self.case_id,self.enroll_number)
    }

    self.downloadCaseCSV = () => {
    	mentordetailStore.trigger('read_mentor_case_csv', self.mentor_case_details)
    }
    self.close_case_detail_view = ()=>{
    	self.mentor_view = 'show_mentor'
    }
    self.clearForm = () =>{
    	self.refs.referredInput.value = 'Class Teacher'
	    self.refs.enrollInput.value = ''
	    self.refs.mentorDateInput.value = ''
	    self.refs.inTimeInput.value = ''
	    self.refs.outTimeInput.value = ''
	    self.refs.diagnosisInput.value = ''
	    self.refs.suggestionInput.value = ''
	    self.readCategories()
	    self.readCategoryCase()
    }
    self.clearaddCaseForm = () => {
		self.refs.visitorInput.value = 'Student'
		self.refs.visitingDateInput.value = ' '
		self.refs.addCaseinTimeInput.value = ' '
		self.refs.addCaseoutTimeInput.value = ' '
		self.refs.statusInput.value = ' '
		self.refs.addCasesuggestionInput.value = ' '
    }

    self.filterMentorDetail = ()=>{
      self.filteredMentorDetail = self.mentors.filter(c => {
      	var filter_value=c.student_name + c.enroll_number;
        return JSON.stringify(filter_value).toLowerCase().indexOf(self.refs.searchMentorDetail.value.toLowerCase())>=0
      })
    }

    mentordetailStore.on('read_mentor_categories_changed',CategoriesChanged)
    function CategoriesChanged(categories){
      console.log(categories) 
      self.categories = categories
      self.update()
      self.getMentorData()
    }

    mentordetailStore.on('read_case_changed',CaseChanged)
    function CaseChanged(mentor_case){
      console.log(mentor_case) 
      self.mentor_case = mentor_case
      self.update()
    }

    mentordetailStore.on('add_mentor_detail_changed',MentorChanged)
    function MentorChanged(mentors){
      console.log(mentors) 
      self.mentors = mentors
      self.mentor_view='show_mentor'
      self.clearForm()
      self.getMentorData()
      self.filteredMentorDetail =self. mentors
      self.update()
    }

    mentordetailStore.on('add_case_detail_changed',AddCaseChanged)
    function AddCaseChanged(case_details){
      console.log(case_details) 
      self.case_details = case_details
      self.refress_case_detail();
      self.filteredMentorDetail = self.mentors
      self.update()
    }

    mentordetailStore.on('read_mentor_changed',ReadMentorChanged)
    function ReadMentorChanged(mentors){
      console.log(mentors)
      self.loading = false;
      self.mentors = mentors
      self.filteredMentorDetail = self.mentors
      self.categoryName = $("#CategoryName option:selected").text();
      if(self.mentors.length==0){
      	toastr.info("No Data Found")
      }
      self.update()
     }

    mentordetailStore.on('read_for_edit_mentor_changed',ReadMentorForEditChanged)
    function ReadMentorForEditChanged(mentor_details){
      console.log(mentor_details) 
      self.mentor_details = mentor_details
      self.refs.referredInput.value = mentor_details[0].referred_by
      self.refs.enrollInput.value = mentor_details[0].enroll_number
      self.refs.CategoryidInput.value = mentor_details[0].category_id
      self.cases = []
	  self.cases = self.mentor_case.filter(a => {
	    return a.category_id == mentor_details[0].category_id
	  })
      self.refs.mentorDateInput.value = mentor_details[0].consult_date
      self.refs.inTimeInput.value = mentor_details[0].time_in
      self.refs.outTimeInput.value = mentor_details[0].time_out
      self.refs.diagnosisInput.value = mentor_details[0].diagnosis
      self.refs.suggestionInput.value = mentor_details[0].suggestion
      self.edit_id = mentor_details[0].id
      self.update()
      self.refs.case_id.value = mentor_details[0].case_id
      console.log(self.mentor_details)
     }

    mentordetailStore.on('edit_mentor_detail_changed',EditMentorChanged)
    function EditMentorChanged(mentors){
      console.log(mentors) 
      self.mentors = mentors
      self.mentor_view='show_mentor'
      self.clearForm()
      self.getMentorData()
      self.filteredMentorDetail = self.mentors
      self.update()
    }

    mentordetailStore.on('read_mentor_case_changed',ReadMentorCaseDetailsChanged)
    function ReadMentorCaseDetailsChanged(mentor_case_details){
      console.log(mentor_case_details)
      self.loading = false;
      self.mentor_case_details = mentor_case_details
      self.caseDetails = []
      self.caseDetails = self.mentor_case_details
      if(self.caseDetails.length==0){
      	toastr.info("No Data Found")
      }
      self.update()
      console.log(self.caseDetails)

     }

    mentordetailStore.on('read_for_edit_case_changed',ReadCaseDetailsForEditChanged)
    function ReadCaseDetailsForEditChanged(update_case_details_for_update){
      self.update_case_details_for_update = update_case_details_for_update
      self.refs.visitorInput.value = update_case_details_for_update[0].visitor
	  self.refs.visitingDateInput.value = update_case_details_for_update[0].visit_date
	  self.refs.addCaseinTimeInput.value = update_case_details_for_update[0].time_in
	  self.refs.addCaseoutTimeInput.value = update_case_details_for_update[0].time_out
	  self.refs.statusInput.value = update_case_details_for_update[0].status
	  self.refs.addCasesuggestionInput.value = update_case_details_for_update[0].suggestion
	  self.edit_case_id = update_case_details_for_update[0].id
	  //console.log(self.edit_case_id)
      self.update()

     }

    mentordetailStore.on('edit_case_detail_changed',EditCaseDetailsChanged)
    function EditCaseDetailsChanged(edit_case_details){
      console.log(edit_case_details) 
      self.refress_case_detail()
      self.update()
    }

    mentordetailStore.on('delete_case_details_changed',DeleteCaseDetailsChanged)
    function DeleteCaseDetailsChanged(delete_case_details){
      console.log(delete_case_details) 
      self.refress_case_detail()
      self.update()
    }

    mentordetailStore.on('delete_mentor_detail_changed',DeleteMentorDetailsChanged)
    function DeleteMentorDetailsChanged(delete_mentor_details){
      console.log(delete_mentor_details) 
      self.getMentorData()
      
      self.update()
    }

    mentordetailStore.on('csv_export_mentor_changed',csvMentorDetailsChanged)
    function csvMentorDetailsChanged(url){
      var open_url = window.location.origin+url 
      window.open(open_url);
      self.loading = false
      self.update()
    }

    mentordetailStore.on('read_mentor_case_csv_changed',csvMentorCaseDetailsChanged)
    function csvMentorCaseDetailsChanged(url){
      var open_url = window.location.origin+url 
      window.open(open_url);
      self.loading = false
      self.update()
    }
</script>
</mentor-detail>