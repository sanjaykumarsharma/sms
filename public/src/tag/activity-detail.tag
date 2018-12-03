<activity-detail>
	<loading-bar if={loading}></loading-bar>
	<section class=" is-fluid" show={activity_view =='show_activity'}>
		<div class="level">
			<div class="level-left">
				<h2 class="title" style="color: #ff3860;">Activity Detail</h2>
			</div>
			<div class="level-right">
				<button class="button is-warning is-rounded" onclick={add_new_activity}>
				<span class="icon">
					<span class="fas fa-plus"></span>
				</span>
				<span>Add Activity</span>
				</button>
			</div>
		</div>
		<div class="box">
			<div class="columns">
				<div class="column is-narrow">
					<label class="label">Category</label>
				</div>
				<div class="column is-narrow">
					<div class="control">
						<div class="select">
							<select ref="category_id" onchange={getActivityData}>
								<option value="-1">ALL</option>
								<option each={categories} value={category_id}>{category_name}
	                            </option>
							</select>
						</div>
					</div>
				</div>
				<!-- <div class="column">
					<button class="button is-danger has-text-weight-bold"
					onclick={getActivityData} >GO
					</button>
				</div> -->
			</div>
		</div>
		<table class="table is-fullwidth is-striped is-hoverable is-narrow">
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
					<th style="width: 260px;"></th>
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
					<td class="has-text-right">
			            <div class="inline-flex rounded border border-grey overflow-hidden" hide={ac.confirmDelete}>
			              <span><a class="button is-small is-rounded " onclick={assign_student.bind(this, ac)}>Assign Student</a></span>
			              <span><a class="button is-small is-rounded" onclick={edit.bind(this, ac.activity_id)}>Edit</a></span>
			              <span if={role=='ADMIN'} > <a class="button is-small is-rounded" rel="nofollow" onclick={confirmDelete}>Delete</a></span>
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
		    	<h2 class="title" style="color: #ff3860;">{title} Activity</h2>
		    </div>
		  </div>
		  <div class="level-right">
		    <button class="button is-warning is-rounded" onclick={close_new_activity}>
          		<span class="icon">
            		<span class="fas fa-arrow-left"></span>
          		</span>
        	</button>
		  </div>
		</div>
		<div class="flex items-center mt-2 mb-6 no-print">
			<div class="bg-green py-1 rounded w-10"></div>
			<div class="bg-grey h-px flex-auto"></div>
		</div>	
		<div class="box">
			<div class="columns is-variable is-1 is-multiline">
			    <div class="column is-one-third">
					<label class="label" for="activityTypeInput">Activity Type</label>
					<div class="control ">
						<div class="select is-fullwidth">
							<select ref="activityTypeInput">
								<option value="intra_school">Intra-School</option>
								<option value="inter_school">Inter-school</option>
							</select>
						</div>
					</div>
			    </div>
			    <div class="column is-one-third">
					<label class="label" for="activityDateInput">Activity Date</label>
					<input class="input date" type="text" ref="activityDateInput" readonly >
			    </div>

	    		<div class="column is-one-third">
				  <label class="label" for="activityCategoryidInput">Category</label>
	  				<div class="control ">
	  					<div class="select is-fullwidth">
	  						<select ref="activityCategoryidInput" onchange={readActivityEvent}>
	  							<option each={categories} value={category_id}>{category_name}</option>
	  						</select>
	  					</div>
	  				</div>
	    		</div>
			    <div class="column is-one-third">
				    <label class="label" for="activityEventIdInput">Event</label>      
	           		<div class="control">
			        	<div class="select is-fullwidth">
							<select ref="activityEventIdInput">
								<option each={readfilteredEvents} value={event_id}>{event_name}</option>
							</select>
						</div>
					</div>
			    </div>

			    <div class="column is-one-third">
					<label class="label" for="organisedByInput">Organised By</label>  
				    <input class="input" ref="organisedByInput" type="text">
			    </div>
			    <div class="column is-one-third">
					<label class="label" for="venueInput">Venue</label>  
				    <input class="input" ref="venueInput" type="text">
			    </div>
			    <div class="column is-one-third">
					<label class="label" for="staffTakenInput">Employee</label>  
				    <input class="input" ref="staffTakenInput" type="text"
				    	id="staffModal" onclick={ViewStaffList}>
			    </div>
			    <div class="column is-one-third">
					<label class="label" for="itemTakenInput">Item Taken</label>  
				    <input class="input" ref="itemTakenInput" type="text"
				    	id="itemModal" onclick={ViewItemList}>
			    </div>
			    <div class="column is-one-third">
					<label class="label" for="outTimeInput">Out Time</label>  
				    <input class="input" ref="outTimeInput" type="time">
			    </div>
			    <div class="column is-one-third">
					<label class="label" for="inTimeInput">In Time</label>  
				    <input class="input" ref="inTimeInput" type="time">
			    </div>
			    <div class="column is-half">
					<label class="label" for="resultInput">Result</label>
					<input class="input" ref="resultInput" type="text">
				</div>
				<div class="column is-half">
					<label class="label" for="activityRemarksInput">Remarks/Suggestion</label>
					<textarea class="textarea" ref="activityRemarksInput" rows="2"></textarea>
				</div>

			    <div class="column is-full">
				    <button class="button is-danger has-text-weight-bold adjusted-top"
				     onclick={add}>Submit</button>    
			   </div>
	  		</div>
		</div>
	</section>
	<!-- Assign Student View Start -->
	<section class=" is-fluid" show={activity_view =='assign_student_view'}>
		<div class="level">
		  	<div class="level-left">
			    <div class="level-item">
			    	<h2 class="title" style="color: #ff3860;">Assign Participants to Event</h2>
			    </div>
		  	</div>
		  	<div class="level-right">
			    <button class="button is-warning is-rounded" onclick={close_assign_student_view}>
	          		<span class="icon">
	            		<span class="fas fa-arrow-left"></span>
	          		</span>
	        	</button>
	        	<button class="button is-warning is-rounded ml5" onclick={refreshStudents}>
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
		                	<button class="button" onclick={assignStudents} style="margin-top:20px;">Assign students  
		                  		<span style="margin-left:10px" class="fas fa-angle-double-right"></span>
		                	</button>
		              	</td>
		            </tr>
	            	<tr>
	              		<td>
	                		<button class="button" onclick={freeUpStandard} style="margin-top:20px;"><span style="margin-right:10px;" class="fas fa-angle-double-left"></span> Free up students</button>
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
	      <button class="button is-danger" id="item-modal-close">Cancel</button>
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
	      <button class="button is-danger" id="staff-modal-close">Cancel</button>
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
      activityStore.off('add_activity_changed',ActivityChanged)
      activityStore.off('read_activity_by_category_changed',ActivitiesChanged)
      activityStore.off('read_data_for_update_changed',UpdateActivityDataChanged)
      activityStore.off('read_students_changed',ReadStudentsChanged)
      activityStore.off('assign_students_changed',AssignStandardChanged)
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
       if(self.refs.standardSelect.value==''){
        toastr.info("Please select standard and try again")
       }else{
        self.tempSections = []
        self.tempSections = self.sections.filter(s=>{
          return s.standard_id==self.refs.standardSelect.value
        })
       }
    }

    //Student Assign
    self.assign_student = (ac) =>{
    	self.activity_id = ac.activity_id
    	self.activity_view='assign_student_view'
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

    self.readActivityEvent = () => {
    	self.events = []
    	self.readfilteredEvents = []
    	self.readfilteredEvents = self.activity_events.filter(c => {
          return c.category_id == self.refs.activityCategoryidInput.value
        }) 
        self.update()
    }

    self.readEvent = () => {
       activityStore.trigger('read_activity_event')
    }

    self.close_new_activity = () => {
    	self.activity_view='show_activity'
    	self.update()
    }

    self.add_new_activity = () =>{
    	self.activity_view='add_activity'
    	self.title='Add'
    	self.update()
    }

    self.readItems = () => {
    	activityStore.trigger('read_items')
    }

    self.readStaff = () => {
    	activityStore.trigger('read_staff')
    }

    self.ViewItemList = () =>{
    	$("#itemModal").click(function() {
  			$("#showItemModal").addClass("is-active");
		});

		$("#item-modal-close").click(function() {
		   $("#showItemModal").removeClass("is-active");
		   self.itemList()

		});
    }
    self.itemList = () => {
    	let item_name='';
      	self.items.map( q => {
	        if(q.selected){
	          if(item_name==''){
	            item_name=q.item_name
	          }else{
	            item_name=item_name+', '+q.item_name
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
    	$("#staffModal").click(function() {
  			$("#showStaffModal").addClass("is-active");  
		});

		$("#staff-modal-close").click(function() {
		   $("#showStaffModal").removeClass("is-active");
		   self.staffList()

		});
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
		console.log(self.teachers)
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
      self.activity_view='add_activity'
      self.title='Update'
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
	     	obj['organised_by']=self.refs.organisedByInput.value
	     	obj['venue']=self.refs.venueInput.value
	     	obj['emp_id']=self.teachers
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
	           activityStore.trigger('edit_activity', obj)  
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

   self.cancelOperation = (e) => {
      self.events.map(ev => {
          ev.confirmDelete = false
          ev.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.events.map(ev => {
        if(ev.id != e.item.ev.id){
          ev.confirmDelete = false
        }else{
          ev.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      eventStore.trigger('delete_event', e.item.ev.id)
    }

    activityStore.on('read_activity_categories_changed',ActivityCategoriesChanged)
    function ActivityCategoriesChanged(categories){
      console.log(categories) 
      self.categories = categories
      self.update()
      console.log(self.categories)
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

    activityStore.on('add_activity_changed',ActivityChanged)
    function ActivityChanged(){
      self.update()
    }

    activityStore.on('read_activity_by_category_changed',ActivitiesChanged)
    function ActivitiesChanged(activities){
      console.log(activities) 
      self.loading = false
      self.activities = activities
      self.name = name
      self.update()
    }

    activityStore.on('read_data_for_update_changed',UpdateActivityDataChanged)
    function UpdateActivityDataChanged(update_activity, update_employee_activity){
      console.log(update_activity)
      console.log(update_employee_activity)
      self.update_activity = update_activity
      self.update_employee_activity = update_employee_activity
      self.update_activity.map(i=>{
        self.activityTypeInput= i.activity_type
        self.activityCategoryidInput= i.category_id
        self.organisedByInput= i.organised_by
        self.inTimeInput= i.time_in
        self.activityDateInput= i.activity_date
        self.activityEventIdInput= i.event_id
        self.venueInput= i.venue
        self.outTimeInput= i.time_out
        self.remarksInput= i.remarks
        self.resultInput= i.result
        /*self.itemTakenInput= i.item_taken*/
        
      })
      
      self.refs.activityTypeInput.value= self.activityTypeInput
	  self.refs.activityCategoryidInput.value = self.activityCategoryidInput
	  self.refs.organisedByInput.value = self.organisedByInput
	  self.refs.inTimeInput.value = self.inTimeInput
	  self.refs.activityDateInput.value = self.activityDateInput
	  self.refs.activityEventIdInput.value = self.activityEventIdInput
	  self.refs.venueInput.value = self.venueInput
	  /*self.refs.itemTakenInput.value = self.itemTakenInput*/
	  self.refs.outTimeInput.value = self.outTimeInput
	  self.refs.remarksInput.value = self.remarksInput
	  self.refs.resultInput.value = self.resultInput
      self.update()

    }
    activityStore.on('read_classes_changed',ClassesChanged)
    function ClassesChanged(classes){
      self.loading = false
      self.classes = []
      self.classes = classes
      self.update()
      console.log(self.classes)
    }

    activityStore.on('read_section_changed',SectionChanged)
    function SectionChanged(sections){
      self.loading = false
      self.sections = []
      self.sections = sections
      self.update()
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