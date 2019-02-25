<activity-detail>
	<print-header></print-header>
	<loading-bar if={loading}></loading-bar>
	<section class=" is-fluid" show={activity_view =='show_activity'}>
		<h2 class="title has-text-centered is-size-5" style="color: #ff3860;">Activity Detail</h2>
		<div class="level box no-print">
			<div class="level-left">
				<div class="columns">
					<div class="column is-narrow"><label class="label">Category</label></div> 
					<div class="column is-narrow">
						<div class="control">
							<div class="select">
								<select ref="category_id" id="CategoryName" onchange={getActivityData}>
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

				<button class="button is-warning has-text-weight-bold  is-small" onclick={add_new_activity}>
				<span class="icon">
					<span class="fas fa-plus"></span>
				</span>
				
				</button>
	        	<button class="button is-link has-text-weight-bold is-small ml5" onclick={getActivityData}>
			        <span class="icon">
			          <span class="fas fa-sync-alt"></span>
			        </span>
	        	</button>

	        	<button class="button is-success has-text-weight-bold is-small ml5" onclick={downloadCSV}>
        			<span class="icon">
          				<i class="far fa-file-excel"></i>
        			</span>
        		</button>

        		<a class="button is-primary has-text-weight-bold is-small ml5" onclick="window.print()">
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
          			<th>Type</th>
					<th>Date</th>
					<th>Event Name</th>
					<th>Organised By</th>
					<th>Venue</th>
					<th>Teacher Incharge</th>
					<th>Item Taken</th>
					<th>Result</th>
					<th style="width: 160px;" class="no-print"></th>
				</tr>
			</thead>
			<tbody>
				<tr each={ac, i in activities }>
          			<td>{i + 1}</td>
					<td>{ac.activity_type}</td>
					<td>{ac.activity_date}</td>
					<td>{ac.event_name}</td>
					<td>{ac.organised_by}</td>
					<td>{ac.venue}</td>
					<td>{ac.name}</td>
					<td>{ac.item_taken}</td>
					<td>{ac.result}</td>
					<td class="has-text-right no-print">
			            <div class="inline-flex rounded border border-grey overflow-hidden" hide={ac.confirmDelete}>
			              <span><a class="button is-small " onclick={assign_student.bind(this, ac)} title="Assign Participant">
			              	<i class="fa fa-link" aria-hidden="true"></i>
			              </a></span>
			              <span><a class="button is-small" onclick={printEventDetail.bind(this,ac.activity_id)} title="Print">
			              	<i class="fa fa-print" aria-hidden="true"></i>
			              </a></span>
			              <span><a class="button is-small" onclick={edit.bind(this, ac.activity_id)} title="Edit">
			              	<i class="fa fa-edit" aria-hidden="true"></i>
			              </a></span>
			              <span if={role=='ADMIN'}> <a class="button is-small" rel="nofollow" onclick={confirmDelete} title="Delete">
			              	<i class="fa fa-trash" aria-hidden="true"></i>
			              </a></span>
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
	<section class=" is-fluid" show={activity_view =='add_activity'}>
		<div class="level">
		  <div class="level-left">
		    <div class="level-item">
		    	<h2 class="title is-size-5" style="color: #ff3860;">{title} Activity</h2>
		    </div>
		  </div>
		  <div class="level-right">
		    <button class="button is-warning has-text-weight-bold is-small" onclick={close_new_activity}>
          		<span class="icon">
            		<span class="fas fa-arrow-left"></span>
          		</span>
        	</button>
		  </div>
		</div>
		<div class="box">
			<div class="columns">
				<div class="column is-2">
					<label class="label is-small" for="activityTypeInput">Activity Type</label>
				</div>
				<div class="column is-2">
					<div class="select is-fullwidth is-small">
						<select ref="activityTypeInput" id="activityTypeInput">
							<option value="Intra-School">Intra-School</option>
							<option value="Inter-School">Inter-school</option>
						</select>
					</div>
		      	</div>
		      	<div class="column is-2">
					<label class="label is-small" for="activityDateInput">Activity Date</label>
		      	</div>
		      	<div class="column is-2 ">
					<input class="input date is-small" type="text" ref="activityDateInput" readonly >
		      	</div>
		      	<div class="column is-2">
					<label class="label is-small" for="activityCategoryidInput">Category</label>
		      	</div>
		      	<div class="column is-2">
	        		<div class="select is-fullwidth is-small">
  						<select ref="activityCategoryidInput" onchange={readActivityEvent}>
  							<option each={categories} value={category_id}>{category_name}</option>
  						</select>
	  				</div>
		      	</div>
			</div>

			<div class="columns mt30">
				<div class="column is-2">
					<label class="label is-small" for="activityEventIdInput">Event</label>
				</div>
				<div class="column is-2">
					<div class="select is-fullwidth is-small">
						<select ref="activityEventIdInput">
							<option each={readfilteredEvents} value={event_id}>{event_name}</option>
						</select>
					</div>
		      	</div>
		      	<div class="column is-2">
					<label class="label is-small" for="organisedByInput">Organised By</label>
		      	</div>
		      	<div class="column is-2 ">
					<input class="input is-small" ref="organisedByInput" type="text">
		      	</div>
		      	<div class="column is-2">
					<label class="label is-small" for="venueInput">Venue</label>  
		      	</div>
		      	<div class="column is-2">
	        		<input class="input is-small" ref="venueInput" type="text">
		      	</div>
			</div>

			<div class="columns mt30">
				<div class="column is-2">
					<label class="label is-small" for="staffTakenInput">Employee</label>
				</div>
				<div class="column is-2">
					<input class="input is-small" ref="staffTakenInput" type="text"
				    	id="staffModal" onclick={ViewStaffList}>
		      	</div>
		      	<div class="column is-2">
					<label class="label is-small" for="itemTakenInput">Item Taken</label>
		      	</div>
		      	<div class="column is-2 ">
					<input class="input is-small" ref="itemTakenInput" type="text"
				    	id="itemModal" onclick={ViewItemList}>
		      	</div>
		      	<div class="column is-2">
					<label class="label is-small" for="inTimeInput">In Time</label> 
				</div>
				<div class="column is-2">
					<input class="input is-small" ref="inTimeInput" type="time">
		      	</div>
			</div>

			<div class="columns mt30">
				<div class="column is-2">
					<label class="label is-small" for="outTimeInput">Out Time</label>   
		      	</div>
		      	<div class="column is-2">
	        		<input class="input is-small" ref="outTimeInput" type="time">
		      	</div>
		      	<div class="column is-2">
					<label class="label is-small" for="resultInput">Result</label>
		      	</div>
		      	<div class="column is-2 ">
					<input class="input is-small" ref="resultInput" type="text">
		      	</div>
		      	<div class="column is-2">
					<label class="label is-small" for="activityRemarksInput">Remarks/Suggestion</label>
		      	</div>
		      	<div class="column is-2">
	        		<textarea class="textarea is-small" ref="activityRemarksInput" rows="3"></textarea>
		      	</div>
			</div>
			<div class="columns mt60">
				<div class="column is-full">
				    <button class="button is-success has-text-weight-bold adjusted-top" 
				    	onclick={add}>Submit
				    </button>
				    <button class="button is-danger has-text-weight-bold adjusted-top" 
				    	onclick={close_new_activity}>Cancel
				    </button>    
			    </div>
			</div>
		</div>
	</section>
	<!-- Participant List  View Start -->
	
	<section class=" is-fluid" show={activity_view =='participant_list_view'}>
		<div class="level no-print">
		  	<div class="level-left">
			    <div class="level-item">
			    </div>
		  	</div>
		  	<div class="level-right">
			    <button class="button is-success has-text-weight-bold is-small" onclick="window.print()">
	          		<span class="icon">
	            		<span class="fas fa-print"></span>
	          		</span>
	        	</button>
	        	<button class="button is-warning has-text-weight-bold ml5 is-small" onclick={close_participant_list_view}>
	          		<span class="icon">
	            		<span class="fas fa-arrow-left"></span>
	          		</span>
	        	</button>
		  	</div>
		</div>

		<center>
    		<table class="table is-fullwidth is-bordered" style="width:860px;" each={p, i in st}>
    			<caption class="caption-participantlist">Details of Event</caption>
				<tr><td width='120'><h>Activity Date</td><td >{p.activity_date}</td></tr>
    			<tr><td width='120'><h>Event Name</td><td >{p.event_name}</td></tr>
    			<tr><td width='120'><h>Organised By</td><td >{p.organised_by}</td></tr>
    			<tr><td width='120'><h>Venue</td><td >{p.venue}</td></tr>
    			<tr><td width='120'><h>Incharge</td><td >{teacher}</td></tr>
    		</table>	  
	      	
	    	<table class="table is-fullwidth is-bordered" style="width:860px;"><caption class="caption-participantlist">NAME OF PARTICIPANTS</caption>
	    		
	    		<tr bgcolor=#efefef>
	    			<td width='20'><h>Sl</td>
	    			<td><h>Name</td><td width='120'><h>Class</td>
	    			<td width='50'><h>Enroll No</td>
	    			<td width='130'><h>Mobile</td>
	    		</tr>
	    		<tr each={p, i in print_event_detail }>
          			<td>{i + 1}</td>
					<td>{p.participant_name}</td>
					<td>{p.standard}</td>
					<td>{p.enroll_number}</td>
					<td>{p.mobile}</td>
				</tr>
    		</table>

    		<table style="height: 30; border:none">
     			<tr style= "border:none";><td style= "border:none";></td></tr>
     			</table>
     			<table class="table is-fullwidth is-bordered" style="width:860px;" each={p, i in st}>
      				<tr height=70><td width='120'><h>Item Taken</td><td >{p.item_taken}</td></tr>
      				<tr><td width='120'><h>Out Time</td><td >{p.time_out}</td></tr>
      				<tr><td width='120'><h>In Time</td><td >{p.time_in}</td></tr>
      				<tr height=70><td width='120'><h>Remarks/Suggestion</td><td >{p.remarks}</td></tr>
      				<tr><td width='120'><h>Result</td><td >{p.result}</td></tr>
     			</table>
    		
    	</center>
	</section>

	<!-- Participant List  View End -->
	<!-- Assign Student View Start -->
	<section class=" is-fluid" show={activity_view =='assign_student_view'}>
		<div class="level">
		  	<div class="level-left">
			    <div class="level-item">
			    	<h2 class="title is-size-5" style="color: #ff3860;">Assign Participants to Event</h2>
			    </div>
		  	</div>
		  	<div class="level-right">
			    <button class="button is-warning has-text-weight-bold is-small" onclick={close_assign_student_view}>
	          		<span class="icon">
	            		<span class="fas fa-arrow-left"></span>
	          		</span>
	        	</button>
	        	<button class="button is-link has-text-weight-bold ml5 is-small" onclick={refreshStudents}>
			        <span class="icon">
			          <span class="fas fa-sync-alt"></span>
			        </span>
	        	</button>
		  	</div>
		</div>
		<div class="box">
	     	<div class="columns">
	        	<div class="column is-narrow"><label class="label">Standard</label></div>  
		        <div class="column">  
		          <div class="control">
		            <div class="select is-fullwidth">
		              <select ref="standardSelect" onchange={changeSection}>
		                <option each={classes} value={standard_id}>{standard}</option>
		              </select>
		            </div>
		          </div>
		        </div>
	        	<div class="column is-narrow"><label class="label">Section</label></div>  
		        <div class="column">  
		          <div class="control">
		            <div class="select is-fullwidth">
		              <select ref="sectionSelect">
		                <option each={tempSections} value={section_id}>{section}</option>
		              </select>
		            </div>
		          </div>
		        </div>
		        <div class="column">
		          <button class="button is-danger has-text-weight-bold" 
		          onclick={refreshStudents} >Show Data </button>
		        </div>
	      	</div>
    	</div>

    	<div class="columns is-multiline is-mobile">
        	<div class="column">
         		<table class="table is-fullwidth is-striped is-hoverable">
		            <thead>
		              <tr>
		                <th class="slno">Roll</th>
		                <th>Enroll No</th>
		                <th>Free Students</th>
		                <th></th>
		              </tr>
		            </thead>
		            <tbody>
		              <tr each={c, i in freeStudents}>
		                <td>{c.roll_number}</td>
		                <td>{c.enroll_number}</td>
		                <td>{c.student_name}</td>
		                <td class="has-text-right">
		                  <input type="checkbox" checked={selected} id="{'freeSubjectCheckBox'+c.student_id}" onclick={selectFreeSubject.bind(this,c)} > 
		                </td>
		              </tr>
		            </tbody>
          		</table>
        	</div>
        	<div class="column is-vertical-center is-narrow has-text-centered is-multiline">
	        	<table>
		            <tr>
		            	<td>
		                	<button class="button is-small" onclick={assignStudents} style="margin-top:20px;">Assign students  
		                  		<span style="margin-left:10px" class="fas fa-angle-double-right"></span>
		                	</button>
		              	</td>
		            </tr>
	            	<tr>
	              		<td>
	                		<button class="button is-small" onclick={freeUpStandard} style="margin-top:20px;"><span style="margin-right:10px;" class="fas fa-angle-double-left"></span> Free up students</button>
	              		</td>
	            	</tr>
	          	</table>
        	</div>
        	<div class="column">
          		<table class="table is-fullwidth is-striped is-hoverable">
		            <thead>
		              <tr>
		                <th></th>
		                <th class="slno">Roll No</th>
		                <th>Enroll No</th>
		                <th>Assigned Students</th>
		              </tr>
		            </thead>
            		<tbody>
		            	<tr each={c, i in assignedStudents}>
		                	<td class="has-text-right">
		                  		<input type="checkbox" checked={selected} id="{'assignedSubjectCheckBox'+c.activity_id}" onclick={selectAssigndSubject.bind(this,c)} > 
		                	</td>
			                <td>{c.roll_number}</td>
			                <td>{c.enroll_number}</td>
			                <td>{c.student_name}</td>
		              	</tr>
            		</tbody>
          		</table>
        	</div>
      	</div>
	</section>

	<!-- Assign Student View End -->

	<!-- Open ITEM Modal Start -->
	<div id="showItemModal" class="modal ">
	  <div class="modal-background"></div>
	  <div class="modal-card">
	    <header class="modal-card-head">
	      <p class="modal-card-title">Select Item List</p>
	    </header>
	    <section class="modal-card-body">
	      <table class="table is-fullwidth is-striped is-hoverable">
			<thead>
				<tr>
					<th>Item Name</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr each={r, i in items}>
					<td>{ r.item_name}</td>
					<td class="has-text-right">
						<input type="checkbox" class="id_check_box" checked={selected} id="{ 'AddItemName' + r.item_id }" onclick={selectItem.bind(this,r)} > 
					</td>
				</tr>
			</tbody>
		</table>
	    </section>
	    <footer class="modal-card-foot">
	      <button class="button is-danger" id="item-modal-close" onclick={close_item_modal}>Cancel</button>
	    </footer>
	  </div>
	</div>
<!-- ITEM Modal End -->

<!-- Open EMPLOYEE Modal Start -->
	<div id="showStaffModal" class="modal ">
	  <div class="modal-background"></div>
	  <div class="modal-card">
	    <header class="modal-card-head">
	      <p class="modal-card-title">Select Staff</p>
	    </header>
	    <section class="modal-card-body">
	      <table class="table is-fullwidth is-striped is-hoverable">
			<thead>
				<tr>
					<th> Name</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr each={s, i in staff}>
					<td>{ s.name} ({s.employee_id})</td>
					<td class="has-text-right">
						<input type="checkbox" class="id_check_box" checked={selected} id="{ 'AddStaffName' + s.emp_id }" onclick={selectStaff.bind(this,s)} > 
					</td>
				</tr>
			</tbody>
		</table>
	    </section>
	    <footer class="modal-card-foot">
	      <button class="button is-danger" id="staff-modal-close" onclick={close_employee_modal}>Cancel</button>
	    </footer>
	  </div>
	</div>
<!-- EMPLOYYEE Modal End -->
<script>
	var self = this
    self.on("mount", function(){
      self.title='Add'
      self.role = getCookie('role')
      self.loading = false;
      self.activity_view = 'show_activity'
      self.update()
      flatpickr(".date", {
      	allowInput: true,
      	dateFormat: "d/m/Y",
      })
      self.readCategories()
      self.readEvent()
      self.readItems()
      self.readStaff()
      self.readClass()
      self.readSection()
    })

    self.on("unmount", function(){
      activityStore.off('read_activity_categories_changed',ActivityCategoriesChanged)
      activityStore.off('read_activity_event_changed',ActivityEventChanged)
      activityStore.off('read_items_changed',ItemsChanged)
      activityStore.off('read_staff_changed',StaffChanged)
      activityStore.off('add_activity_changed',AddActivityChanged)
      activityStore.off('edit_activity_changed',EditActivityChanged)
      activityStore.off('delete_activity_changed',DeleteActivityChanged)
      activityStore.off('read_activity_by_category_changed',ActivitiesChanged)
      activityStore.off('read_data_for_update_changed',UpdateActivityDataChanged)
      activityStore.off('read_students_changed',ReadStudentsChanged)
      activityStore.off('assign_students_changed',AssignStandardChanged)
      activityStore.off('read_print_event_detail_changed',PrintEventDetailChanged)
    })

    self.readClass = () => {
       self.loading = true;
       activityStore.trigger('read_classes')
    }

    self.readSection = () => {
       self.loading = true;
       activityStore.trigger('read_section')
    }
    self.changeSection = () => {
        self.tempSections = []
        self.tempSections = self.sections.filter(s=>{
          return s.standard_id==self.refs.standardSelect.value
        })
        self.update()
       }

    //Participant List
    self.printEventDetail = (ac,e) =>{
    	self.activity_id = ac
    	self.activity_view='participant_list_view'
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
		self.print_date = today;

    	activityStore.trigger('read_print_event_detail',self.activity_id)
    }

    self.close_participant_list_view = () =>{
    	self.activity_view='show_activity'
    }

    //Student Assign
    self.assign_student = (ac) =>{
    	self.activity_id = ac.activity_id
    	self.activity_view='assign_student_view'
    	self.freeStudents = []
    	self.assignedStudents = []
    }

    self.close_assign_student_view = ()=>{
    	self.activity_view='show_activity'
    }

    self.refreshStudents = () =>{

      let error = '';
      
      if(self.refs.standardSelect.value==''){
        error = error + "Please select standard, "
      }

      if(self.refs.sectionSelect.value==''){
        error = error + "Please select section, "
      }

      if(error.length!=0){
        toastr.error(error)
        return
      }else{
        self.loading = true
        activityStore.trigger('read_students', self.activity_id, self.refs.standardSelect.value, self.refs.sectionSelect.value) 
      }
      
    }
    self.selectFreeSubject = (student,e) => {
        self.freeStudents.map(i=>{
          if(student.student_id==i.student_id){
            i.selected=!i.selected
          }
        })
    }

    self.selectAssigndSubject = (student,e) => {
        self.assignedStudents.map(i=>{
          if(student.student_id==i.student_id){
            i.selected=!i.selected
          }
        })
        console.log(self.assignedStudents)
    }

    self.assignStudents = () =>{
      let students_to_assign = self.freeStudents.filter(c=>{
        return c.selected == true
      })
      console.log(self.activity_id)
      console.log(students_to_assign)

      if(students_to_assign.length==0){
        toastr.error('Please Select Student To Assign House.')
        return
      }else{
        self.loading = true
        activityStore.trigger('assign_students', self.activity_id, students_to_assign)
      }
    }

    self.freeUpStandard = () =>{
      let students_to_free = self.assignedStudents.filter(c=>{
        return c.selected == true
      })
      
      if(students_to_free.length==0){
        toastr.error('Please select students to free from house .')
        return
      }else{
        self.loading = true
        activityStore.trigger('free_up_student', self.activity_id, students_to_free)
      }
    }

    //read activity data
    self.getActivityData = () => {
    	self.loading = true
    	var obj={}
          obj['category_id']=self.refs.category_id.value
          activityStore.trigger('read_activity_by_category', obj)
          console.log(obj)
    }

    self.readCategories = () => {
       activityStore.trigger('read_activity_categories')
    }

    self.readEvent = () => {
       activityStore.trigger('read_activity_event')
    }

    self.readActivityEvent = () => {
    	self.readfilteredEvents = []
    	self.readfilteredEvents = self.activity_events.filter(c => {
          return c.category_id == self.refs.activityCategoryidInput.value
        }) 
        self.update()
    }

    self.close_new_activity = () => {
    	self.activity_view='show_activity'
    	self.update()
    }

    self.add_new_activity = () =>{
    	self.activity_view='add_activity'
    	self.clearForm()
    	self.title='Add'
    	self.readStaff()
        self.readItems()
    	self.update()
    }

    self.readItems = () => {
    	activityStore.trigger('read_items')
    }

    self.readStaff = () => {
    	activityStore.trigger('read_staff')
    }

    self.ViewItemList = () =>{
    	$("#showItemModal").addClass("is-active");
		
    }

    self.close_item_modal = () =>{
    	$("#showItemModal").removeClass("is-active");
    	self.itemList()
    }
    self.itemList = () => {
    	let item_name='';
      	self.items.map( q => {
	        if(q.selected){
	          if(item_name==''){
	            item_name=q.item_name
	          }else{
	            item_name=item_name+','+q.item_name
	          }
	        }
		self.refs.itemTakenInput.value = item_name

    	})
    }
    self.selectItem = (item_name,e) => {
        self.items.map(i=>{
          if(item_name.item_name==i.item_name){
            i.selected=!i.selected
            console.log(i.selected);
              if(i.selected==true){
                console.log(i.item_name);
              }else if(i.selected==false){
              console.log(i.item_name);
              }
            }
        })
    }

    self.ViewStaffList = () =>{
		$("#showStaffModal").addClass("is-active");  
		
    }

    self.close_employee_modal = () =>{
		$("#showStaffModal").removeClass("is-active");
		self.staffList()
    }

    self.staffList = () => {
    	let name='';
    	self.teachers = [];
      	self.staff.map( q => {
	        if(q.selected){
	          self.teachers.push(q.emp_id)
	          if(name==''){
	            name=q.name + "(" + q.employee_id + ")"
	          }else{
	            name=name+', '+q.name + "(" + q.employee_id + ")"
	          }
	        }
		self.refs.staffTakenInput.value = name

    	})
    }
    self.selectStaff = (name,e) => {
        self.staff.map(i=>{
          if(name.name==i.name){
            i.selected=!i.selected
            console.log(i.selected);
              if(i.selected==true){
                console.log(i.name);
              }else if(i.selected==false){
              	console.log(i.name);
              }
            }
        })
    }

    self.edit = (ac,e) => {
      console.log(ac)
      self.activity_id = ac
      self.activity_view='add_activity'
      self.title='Update'
      self.readStaff()
      self.readItems()
      activityStore.trigger('read_data_for_update', ac)
    }


    self.add = () => {
     	if(!self.refs.activityDateInput.value){
       		toastr.info("Please enter Activity Date and try again")
      	}else if(!self.refs.activityEventIdInput.value){
        	toastr.info("Please Select Event and try again")
      	}else if(!self.refs.organisedByInput.value){
        	toastr.info("Please enter Organised By and try again")
      	}else if(!self.refs.venueInput.value){
        	toastr.info("Please enter Venue and try again")
      	}else{
	     	var obj={}
	     	obj['activity_type']=self.refs.activityTypeInput.value
	     	obj['activity_date']=convertDate(self.refs.activityDateInput.value)
	     	obj['category_id']=self.refs.activityCategoryidInput.value
	     	obj['event_id']=self.refs.activityEventIdInput.value
	     	obj['event_name']=null
	     	obj['organised_by']=self.refs.organisedByInput.value
	     	obj['venue']=self.refs.venueInput.value
	     	obj['emp_id']=self.teachers
	     	obj['teacher_incharge']=null
	     	obj['item_taken']=self.refs.itemTakenInput.value
	     	obj['time_in']=self.refs.inTimeInput.value
	     	obj['time_out']=self.refs.outTimeInput.value
	     	obj['remarks']=self.refs.activityRemarksInput.value
	     	obj['result']=self.refs.resultInput.value
	     	console.log(obj)
	     	if(self.title=='Add'){
	           activityStore.trigger('add_activity', obj)
	           self.activity_view = 'show_activity'
	        }else if(self.title=='Update'){
	           activityStore.trigger('edit_activity', obj,self.activity_id)  
	           self.activity_view = 'show_activity'         
	        }
	    }
    }

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

    self.cancelOperation = (ac) => {
      self.activities.map(c => {
          c.confirmDelete = false
          c.confirmEdit = false
      })
    }
    self.confirmDelete = (ac) => {
      self.activities.map(c => {
        if(c.activity_id != ac.item.ac.activity_id){
          c.confirmDelete = false
        }else{
          c.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      activityStore.trigger('delete_activity', e.item.ac.activity_id)
    }
    self.clearForm = () =>{
    	self.refs.activityTypeInput.value = 'Intra-School'
	    self.refs.activityDateInput.value = ''
	    self.refs.organisedByInput.value = ''
	    self.refs.venueInput.value = ''
	    self.refs.itemTakenInput.value = ''
	    self.refs.staffTakenInput.value = ''
	    self.refs.inTimeInput.value = ''
	    self.refs.outTimeInput.value = ''
	    self.refs.activityRemarksInput.value = ''
	    self.refs.resultInput.value = ''
	    self.readActivityEvent()
	    self.readCategories()
    }

    self.downloadCSV = () =>{
    	var obj={}
          obj['category_id']=self.refs.category_id.value
          activityStore.trigger('csv_export_activity', obj)
          console.log(obj)
    }

    activityStore.on('read_print_event_detail_changed',PrintEventDetailChanged)
    function PrintEventDetailChanged(print_event_detail,teacher){
      console.log(print_event_detail) 
      console.log(teacher)
      self.print_event_detail = print_event_detail 
      self.st = []
      self.st.push(print_event_detail[0])
      self.teacher = teacher
      self.update()
    }

    activityStore.on('read_activity_categories_changed',ActivityCategoriesChanged)
    function ActivityCategoriesChanged(categories){
      console.log(categories) 
      self.categories = categories
      self.update()

      self.readEvent()
    }

    activityStore.on('read_activity_event_changed',ActivityEventChanged)
    function ActivityEventChanged(activity_events){
      console.log(activity_events) 
      self.activity_events = activity_events
      self.update()
      self.readActivityEvent()
      self.getActivityData()
    }

    activityStore.on('read_items_changed',ItemsChanged)
    function ItemsChanged(items){
      console.log(items) 
      self.items = items
      self.update()
      self.items.map(i=>{
        i.selected = false;
      })
    }

    activityStore.on('read_staff_changed',StaffChanged)
    function StaffChanged(staff){
      console.log(staff) 
      self.staff = staff
      self.update()
      self.staff.map(i=>{
        i.selected = false;
      })
    }

    activityStore.on('add_activity_changed',AddActivityChanged)
    function AddActivityChanged(){
      self.update()
      self.getActivityData()
    }

    activityStore.on('edit_activity_changed',EditActivityChanged)
    function EditActivityChanged(){
      self.update()
      self.getActivityData()
    }

    activityStore.on('delete_activity_changed',DeleteActivityChanged)
    function DeleteActivityChanged(){
    	self.loading=false;
     	self.update()
     	self.getActivityData()
    }

    activityStore.on('read_activity_by_category_changed',ActivitiesChanged)
    function ActivitiesChanged(activities){
      console.log(activities) 
      self.loading = false
      self.activities = activities
      if(self.activities.length==0){
      	toastr.info("No Data Found")
      }
      self.categoryName = $("#CategoryName option:selected").text();
      self.name = name
      self.update()
    }

    activityStore.on('read_data_for_update_changed',UpdateActivityDataChanged)
    function UpdateActivityDataChanged(update_activity, employees,techer_in_charge){
      self.update_activity = update_activity
      self.employees = employees
      self.techer_in_charge = techer_in_charge
      self.update_activity.map(i=>{
	    self.refs.activityTypeInput.value= i.activity_type
	    self.refs.activityCategoryidInput.value= i.category_id
        self.readfilteredEvents = []
    	self.readfilteredEvents = self.activity_events.filter(c => {
          return c.category_id == i.category_id
        }) 
	    self.refs.organisedByInput.value= i.organised_by
        self.refs.inTimeInput.value= i.time_in
        self.refs.activityDateInput.value= i.activity_date
        self.refs.venueInput.value= i.venue
        self.refs.outTimeInput.value= i.time_out
        self.refs.activityRemarksInput.value= i.remarks
        self.refs.resultInput.value= i.result
        

      })
      var str='';
      str = self.techer_in_charge.toString();
      var techer_in_charge = str.split(",");
	  
      console.log(techer_in_charge);
      var name = "";
      self.teachers = [];
      techer_in_charge.map(i=>{
      	self.staff.map(e=>{
      		if(i==e.emp_id){
        		e.selected = true; 
        		$('#AddStaffName' + e.emp_id ).prop('checked', true);
        		if(e.selected){
	          		self.teachers.push(e.emp_id)
	        		if(name==''){
			            name=e.name + "(" + e.employee_id + ")"
			          }else{
			            name=name+','+e.name + "(" + e.employee_id + ")"
			        }
			    }
      		}
      	})
      })
      self.refs.staffTakenInput.value = name

      var Items = self.update_activity[0].item_taken
      console.log(Items)
      var ItemTaken = Items.split(",");
      console.log(ItemTaken)

      let item_name='';
      ItemTaken.map(i=>{
      	console.log(i)
      	self.items.map(e=>{
      		if(i==e.item_name){
        		e.selected = true; 
        		$('#AddItemName' + e.item_id ).prop('checked', true);

        		if(item_name==''){
		            item_name=e.item_name
		          }else{
		            item_name=item_name+','+e.item_name 
		        }
      		}
      	})
      })

      self.refs.itemTakenInput.value = item_name
      self.update()
      self.refs.activityEventIdInput.value= self.update_activity[0].event_id

    }
    activityStore.on('read_classes_changed',ClassesChanged)
    function ClassesChanged(classes){
      self.loading = false
      self.classes = []
      self.classes = classes
      self.update()
    }

    activityStore.on('read_section_changed',SectionChanged)
    function SectionChanged(sections){
      self.loading = false
      self.sections = []
      self.sections = sections
      self.update()
      self.changeSection()
    }
    activityStore.on('read_students_changed',ReadStudentsChanged)
    function ReadStudentsChanged(freeStudents,assignedStudents){
      self.loading = false
      self.freeStudents = []
      self.freeStudents = freeStudents
      self.freeStudents.map(c => {
          c.selected=false
      })
      console.log(freeStudents)
      self.assignedStudents = []
      self.assignedStudents = assignedStudents
      self.assignedStudents.map(c => {
          c.selected=false
      })
      //self.view='students'
      self.update()
    }
    activityStore.on('assign_students_changed',AssignStandardChanged)
    function AssignStandardChanged(students_assigned){
      self.loading = false

      self.refreshStudents()
      
    }

</script>
</activity-detail>	