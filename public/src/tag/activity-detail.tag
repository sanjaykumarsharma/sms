<activity-detail>
	<section class="container is-fluid" show={activity_view =='show_activity'}>
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
							<select ref="category_id">
								<option value="-1">ALL</option>
								<option each={categories} value={category_id}>{category_name}
	                            </option>
							</select>
						</div>
					</div>
				</div>
				<div class="column">
					<button class="button is-danger has-text-weight-bold"
					onclick={getActivityData} >GO
					</button>
				</div>
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
					<th></th>
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
			              <span><a class="button is-small is-rounded" onclick={edit.bind(this, ac.activity_id)}>Edit</a></span>
			              <span if={role=='ADMIN'} > <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick={confirmDelete}>Delete</a></span>
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
	<section class="container is-fluid" show={activity_view =='add_activity'}>
		<div class="level">
		  <div class="level-left">
		    <div class="level-item">
		    	<h2 class="title" style="color: #ff3860;">{title} Event</h2>
		    </div>
		  </div>
		  <div class="level-right">
		    <a class="button" onclick={close_new_activity}>Back</a>
		  </div>
		</div>
		<div class="flex items-center mt-2 mb-6 no-print">
			<div class="bg-green py-1 rounded w-10"></div>
			<div class="bg-grey h-px flex-auto"></div>
		</div>	
		<div class="columns">
			<div class="column is-three-fifths">
				<div  class="box max-w-md">
					<div class="columns is-multiline">   
					    <div class="column is-half">
					      	<div class="field">
								<label class="label" for="activityTypeInput">Activity Type</label>
								<div class="control">
					        		<div class="select is-fullwidth">
										<select id="activityTypeInput" ref="activityTypeInput">
											<option value="intra_school">Intra-School</option>
											<option value="inter_school">Inter-school</option>
										</select>
									</div>
					      		</div>
					      	</div>
					      	<div class="field">
								<label class="label" for="add_category_id">Category</label>
								<div class="control">
						        	<div class="select is-fullwidth">
										<select ref="CategoryidInput" onchange={readEvent}>
											<option>Select Category</option>
											<option each={categories} value={category_id}>{category_name}</option>
										</select>
									</div>
						      	</div>
					      	</div>
					      	<div class="field">
								<label class="label" for="organisedByInput">Organised By</label>
								<input class="input" ref="organisedByInput" type="text">
					      	</div>
					      	<div class="field">
								<label class="label" for="staffTakenInput">Employee</label>
								<input class="input" ref="staffTakenInput" type="text"
								 id="staffModal" onclick={ViewStaffList}>
					      	</div>
					      	<div class="field">
								<label class="label" for="inTimeInput">In Time</label>
								<input class="input" ref="inTimeInput" type="time">
					      	</div>
					   	</div>
					    <div class="column is-half">
					    	<div class="field">
							<label class="label" for="activityDateInput">Activity Date</label>
								<input class="date input flatpickr-input form-control input" 
								ref="activityDateInput" placeholder="" tabindex="0" type="text" readonly="readonly">
					    	</div>
					    	<div class="field">
								<label class="label" for="eventIdInput">Event</label>
							<div class="control">
					        	<div class="select is-fullwidth">
									<select ref="eventIdInput">
										<option each={events} value={event_id}>{event_name}</option>
									</select>
								</div>
					      	</div>
					      </div>
					      	<div class="field">
								<label class="label" for="venueInput">Venue</label>
								<input class="input" ref="venueInput" type="text">
					      	</div>
					      	<div class="field">
								<label class="label" for="itemTakenInput">Item Taken</label>
								<input class="input" ref="itemTakenInput" type="text" 
								 id="itemModal" onclick={ViewItemList}>
					      	</div>
					      	<div class="field">
								<label class="label" for="outTimeInput">Out Time</label>
								<input class="input" ref="outTimeInput" type="time">
					      	</div>
					    </div>
					    <div class="column is-full">
							<label class="label" for="remarksInput">Remarks/Suggestion</label>
							<textarea class="textarea" ref="remarksInput" rows="2"></textarea>
					    </div>
					    <div class="column is-full">
							<label class="label" for="resultInput">Result</label>
								<input class="input" ref="resultInput" type="text">
					    </div>
					    <div class="column is-full">
							<button class="button is-danger" onclick={add}>Submit</button>
						</div>
					</div>
				</div>
			</div>
		</div>
</section>
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
      self.activity_view = 'show_activity'
      self.update()
      flatpickr(".date", {
    	/*altInput: true,*/
    	allowInput: true,
    	altFormat: "d/m/Y",
    	dateFormat: "Y-m-d",
  		})
      self.readCategories()
      self.readItems()
      self.readStaff()
    })

    self.on("unmount", function(){
      activityStore.off('read_categories_changed',CategoriesChanged)
      activityStore.off('read_events_by_category_changed',EventsChanged)
      activityStore.off('read_items_changed',ItemsChanged)
      activityStore.off('read_staff_changed',StaffChanged)
      activityStore.off('add_activity_changed',ActivityChanged)
      activityStore.off('read_activity_by_category_changed',ActivitiesChanged)
      activityStore.off('read_data_for_update_changed',UpdateActivityDataChanged)
    })

    //read activity data
    self.getActivityData = () => {
    	var obj={}
          obj['category_id']=self.refs.category_id.value
          activityStore.trigger('read_activity_by_category', obj)
          console.log(obj)
    }

    //read courses
    self.readCategories = () => {
       activityStore.trigger('read_categories')
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
    self.readEvent = () =>{
    	activityStore.trigger('read_events_by_category', self.refs.CategoryidInput.value)
    	console.log(self.refs.CategoryidInput.value)

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
      flatpickr(".date", {
    	allowInput: true,
    	altFormat: "d/m/Y",
    	dateFormat: "Y-m-d",
  		})

      activityStore.trigger('read_data_for_update', ac)

      
    }


     self.add = () => {
     	var obj={}
     	obj['activity_type']=self.refs.activityTypeInput.value
     	obj['category_id']=self.refs.CategoryidInput.value
     	obj['organised_by']=self.refs.organisedByInput.value
     	obj['time_in']=self.refs.inTimeInput.value
     	obj['activity_date']=self.refs.activityDateInput.value
     	obj['event_id']=self.refs.eventIdInput.value
     	obj['venue']=self.refs.venueInput.value
     	obj['item_taken']=self.refs.itemTakenInput.value
     	obj['emp_id']=self.teachers
     	obj['time_out']=self.refs.outTimeInput.value
     	obj['remarks']=self.refs.remarksInput.value
     	obj['result']=self.refs.resultInput.value
     	console.log(obj)
     	if(self.title=='Add'){
           activityStore.trigger('add_activity', obj)
           
          }else if(self.title=='Update'){
           activityStore.trigger('edit_activity', obj)
           

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

    activityStore.on('read_categories_changed',CategoriesChanged)
    function CategoriesChanged(categories){
      console.log(categories) 
      self.categories = categories
      self.update()
      console.log(self.categories)
    }

    activityStore.on('read_events_by_category_changed',EventsChanged)
    function EventsChanged(events){
      console.log(events) 
      self.events = events
      self.update()
    }
    activityStore.on('read_items_changed',ItemsChanged)
    function ItemsChanged(items){
      console.log(items) 
      self.items = items
      self.items.map(i=>{
        i.selected = false;
      })
      self.update()
    }

    activityStore.on('read_staff_changed',StaffChanged)
    function StaffChanged(staff){
      console.log(staff) 
      self.staff = staff
      self.staff.map(i=>{
        i.selected = false;
      })
      self.update()
    }

    activityStore.on('add_activity_changed',ActivityChanged)
    function ActivityChanged(activities){
      console.log(activities) 
      self.activities = activities
      self.update()
    }

    activityStore.on('read_activity_by_category_changed',ActivitiesChanged)
    function ActivitiesChanged(activities){
      console.log(activities) 
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
        self.CategoryidInput= i.category_id
        self.organisedByInput= i.organised_by
        self.inTimeInput= i.time_in
        self.activityDateInput= i.activity_date
        self.eventIdInput= i.event_id
        self.venueInput= i.venue
        self.outTimeInput= i.time_out
        self.remarksInput= i.remarks
        self.resultInput= i.result
        /*self.itemTakenInput= i.item_taken*/
        
      })
      
      self.refs.activityTypeInput.value= self.activityTypeInput
	  self.refs.CategoryidInput.value = self.CategoryidInput
	  self.refs.organisedByInput.value = self.organisedByInput
	  self.refs.inTimeInput.value = self.inTimeInput
	  self.refs.activityDateInput.value = self.activityDateInput
	  self.refs.eventIdInput.value = self.eventIdInput
	  self.refs.venueInput.value = self.venueInput
	  /*self.refs.itemTakenInput.value = self.itemTakenInput*/
	  self.refs.outTimeInput.value = self.outTimeInput
	  self.refs.remarksInput.value = self.remarksInput
	  self.refs.resultInput.value = self.resultInput
      self.update()

    }

</script>
</activity-detail>	