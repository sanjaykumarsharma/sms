riot.tag2('activity-category', '<section class=" is-fluid"> <h2 class="title has-text-centered" style="color: #ff3860;">Activity Category Management</h2> <div class="flex items-center mt-2 mb-6 no-print"> <div class="bg-green py-1 rounded w-10"> <div class="bg-grey h-px flex-auto"></div> </div> </div> <div class="box"> <div class="columns"> <div class="column is-half"> <div class="field"> <label class="label" for="role">Category</label> <div class="control"> <input class="input" type="text" ref="addCategoryInput" onkeyup="{addEnter}"> </div> </div> </div> <div class="column is-narrow"> <div class="field"> <div class="control"> <button class="button is-danger has-text-weight-bold adjusted-top" onclick="{add}">{title}</button> </div> </div> </div> </div> </div> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th>SL</th> <th>Category</th> <th></th> </tr> </thead> <tbody> <tr each="{c, i in categoryDataItems}"> <td>{i+1}</td> <td>{c.category_name}</td> <td class="has-text-right"> <div class="inline-flex rounded border border-grey overflow-hidden" hide="{c.confirmDelete}"> <span><a class="button is-small is-rounded" onclick="{edit.bind(this, c)}">Edit</a></span> <span if="{role==\'ADMIN\'}"> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick="{confirmDelete}">Delete</a></span> </div> <div class="table-buttons" if="{c.confirmDelete}"> <span disabled="{loading}" class="button is-small is-rounded" onclick="{delete}"><i class="fa fa-check"></i></span> <span disabled="{loading}" class="button is-small has-text-danger is-rounded" onclick="{cancelOperation}"><i class="fa fa-times"></i></span> </div> </td> </tr> </tbody> </table> </section>', '', '', function(opts) {
	var self = this
    self.on("mount", function(){
      self.title='Create'
      self.role = getCookie('role')
      self.update()
      self.readCategories()
    })
    self.on("unmount", function(){
      activitycategoryStore.off('categories_changed', CategoriesChanged)
    })

    self.readCategories = () => {
       activitycategoryStore.trigger('read_categories')
    }

     self.add = () => {
      if(!self.refs.addCategoryInput.value){
        toastr.info("Please enter Category and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          console.log('create')
          activitycategoryStore.trigger('add_category', self.refs.addCategoryInput.value)
        }else if(self.title=='Update'){
          console.log('update')
          activitycategoryStore.trigger('edit_category', self.refs.addCategoryInput.value,
            self.edit_id)
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
      self.categories.map(c => {
          c.confirmDelete = false
          c.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.categories.map(c => {
        if(c.category_id != e.item.c.category_id){
          c.confirmDelete = false
        }else{
          c.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      activitycategoryStore.trigger('delete_category', e.item.c.category_id)
    }

    self.edit = (c,e) => {
      console.log(c)
      self.title='Update'
      self.refs.addCategoryInput.value = c.category
      self.edit_id = c.category_id
    }

    activitycategoryStore.on('categories_changed',CategoriesChanged)
    function CategoriesChanged(categories){
      console.log(categories)
      self.title='Create'
      self.refs.addCategoryInput.value = ''
      self.loading = false
      self.categories = categories
       self.categoryDataItems = []
      self.categoryDataItems = categories
      self.update()
      console.log(self.categories)
    }

});
riot.tag2('activity-detail', '<section class="container is-fluid" show="{activity_view ==\'show_activity\'}"> <div class="level"> <div class="level-left"> <h2 class="title" style="color: #ff3860;">Activity Detail</h2> </div> <div class="level-right"> <button class="button is-warning is-rounded" onclick="{add_new_activity}"> <span class="icon"> <span class="fas fa-plus"></span> </span> <span>Add Activity</span> </button> </div> </div> <div class="box"> <div class="columns"> <div class="column is-narrow"> <label class="label">Category</label> </div> <div class="column is-narrow"> <div class="control"> <div class="select"> <select ref="category_id"> <option value="-1">ALL</option> <option each="{categories}" riot-value="{category_id}">{category_name} </option> </select> </div> </div> </div> <div class="column"> <button class="button is-danger has-text-weight-bold" onclick="{getActivityData}">GO </button> </div> </div> </div> <table class="table is-fullwidth is-striped is-hoverable is-narrow"> <thead> <tr> <th>SL No</th> <th>Type</th> <th>Date</th> <th>Event Name</th> <th>Organised By</th> <th>Venue</th> <th>Teacher Incharge</th> <th>Item Taken</th> <th>Result</th> <th></th> </tr> </thead> <tbody> <tr each="{ac, i in activities}"> <td>{i + 1}</td> <td>{ac.activity_type}</td> <td>{ac.activity_date}</td> <td>{ac.event_name}</td> <td>{ac.organised_by}</td> <td>{ac.venue}</td> <td>{ac.name}</td> <td>{ac.item_taken}</td> <td>{ac.result}</td> <td class="has-text-right"> <div class="inline-flex rounded border border-grey overflow-hidden" hide="{ac.confirmDelete}"> <span><a class="button is-small is-rounded" onclick="{edit.bind(this, ac.activity_id)}">Edit</a></span> <span if="{role==\'ADMIN\'}"> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick="{confirmDelete}">Delete</a></span> </div> <div class="table-buttons" if="{ac.confirmDelete}"> <span disabled="{loading}" class="button is-small is-rounded" onclick="{delete}"><i class="fa fa-check"></i></span> <span disabled="{loading}" class="button is-small has-text-danger is-rounded" onclick="{cancelOperation}"><i class="fa fa-times"></i></span> </div> </td> </tr> </tbody> </table> </section> <section class="container is-fluid" show="{activity_view ==\'add_activity\'}"> <div class="level"> <div class="level-left"> <div class="level-item"> <h2 class="title" style="color: #ff3860;">{title} Event</h2> </div> </div> <div class="level-right"> <a class="button" onclick="{close_new_activity}">Back</a> </div> </div> <div class="flex items-center mt-2 mb-6 no-print"> <div class="bg-green py-1 rounded w-10"></div> <div class="bg-grey h-px flex-auto"></div> </div> <div class="columns"> <div class="column is-three-fifths"> <div class="box max-w-md"> <div class="columns is-multiline"> <div class="column is-half"> <div class="field"> <label class="label" for="activityTypeInput">Activity Type</label> <div class="control"> <div class="select is-fullwidth"> <select id="activityTypeInput" ref="activityTypeInput"> <option value="intra_school">Intra-School</option> <option value="inter_school">Inter-school</option> </select> </div> </div> </div> <div class="field"> <label class="label" for="add_category_id">Category</label> <div class="control"> <div class="select is-fullwidth"> <select ref="CategoryidInput" onchange="{readEvent}"> <option>Select Category</option> <option each="{categories}" riot-value="{category_id}">{category_name}</option> </select> </div> </div> </div> <div class="field"> <label class="label" for="organisedByInput">Organised By</label> <input class="input" ref="organisedByInput" type="text"> </div> <div class="field"> <label class="label" for="staffTakenInput">Employee</label> <input class="input" ref="staffTakenInput" type="text" id="staffModal" onclick="{ViewStaffList}"> </div> <div class="field"> <label class="label" for="inTimeInput">In Time</label> <input class="input" ref="inTimeInput" type="time"> </div> </div> <div class="column is-half"> <div class="field"> <label class="label" for="activityDateInput">Activity Date</label> <input class="date input flatpickr-input form-control input" ref="activityDateInput" placeholder="" tabindex="0" type="text" readonly="readonly"> </div> <div class="field"> <label class="label" for="eventIdInput">Event</label> <div class="control"> <div class="select is-fullwidth"> <select ref="eventIdInput"> <option each="{events}" riot-value="{event_id}">{event_name}</option> </select> </div> </div> </div> <div class="field"> <label class="label" for="venueInput">Venue</label> <input class="input" ref="venueInput" type="text"> </div> <div class="field"> <label class="label" for="itemTakenInput">Item Taken</label> <input class="input" ref="itemTakenInput" type="text" id="itemModal" onclick="{ViewItemList}"> </div> <div class="field"> <label class="label" for="outTimeInput">Out Time</label> <input class="input" ref="outTimeInput" type="time"> </div> </div> <div class="column is-full"> <label class="label" for="remarksInput">Remarks/Suggestion</label> <textarea class="textarea" ref="remarksInput" rows="2"></textarea> </div> <div class="column is-full"> <label class="label" for="resultInput">Result</label> <input class="input" ref="resultInput" type="text"> </div> <div class="column is-full"> <button class="button is-danger" onclick="{add}">Submit</button> </div> </div> </div> </div> </div> </section> <div id="showItemModal" class="modal "> <div class="modal-background"></div> <div class="modal-card"> <header class="modal-card-head"> <p class="modal-card-title">Select Item List</p> </header> <section class="modal-card-body"> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th>Item Name</th> <th></th> </tr> </thead> <tbody> <tr each="{r, i in items}"> <td>{r.item_name}</td> <td class="has-text-right"> <input type="checkbox" class="id_check_box" checked="{selected}" id="{\'AddItemName\' + r.item_id}" onclick="{selectItem.bind(this,r)}"> </td> </tr> </tbody> </table> </section> <footer class="modal-card-foot"> <button class="button is-danger" id="item-modal-close">Cancel</button> </footer> </div> </div> <div id="showStaffModal" class="modal "> <div class="modal-background"></div> <div class="modal-card"> <header class="modal-card-head"> <p class="modal-card-title">Select Staff</p> </header> <section class="modal-card-body"> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th> Name</th> <th></th> </tr> </thead> <tbody> <tr each="{s, i in staff}"> <td>{s.name} ({s.employee_id})</td> <td class="has-text-right"> <input type="checkbox" class="id_check_box" checked="{selected}" id="{\'AddStaffName\' + s.emp_id}" onclick="{selectStaff.bind(this,s)}"> </td> </tr> </tbody> </table> </section> <footer class="modal-card-foot"> <button class="button is-danger" id="staff-modal-close">Cancel</button> </footer> </div> </div>', '', '', function(opts) {
	var self = this
    self.on("mount", function(){
      self.title='Add'
      self.role = getCookie('role')
      self.activity_view = 'show_activity'
      self.update()
      flatpickr(".date", {

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

    self.getActivityData = () => {
    	var obj={}
          obj['category_id']=self.refs.category_id.value
          activityStore.trigger('read_activity_by_category', obj)
          console.log(obj)
    }

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

      })

      self.refs.activityTypeInput.value= self.activityTypeInput
	  self.refs.CategoryidInput.value = self.CategoryidInput
	  self.refs.organisedByInput.value = self.organisedByInput
	  self.refs.inTimeInput.value = self.inTimeInput
	  self.refs.activityDateInput.value = self.activityDateInput
	  self.refs.eventIdInput.value = self.eventIdInput
	  self.refs.venueInput.value = self.venueInput

	  self.refs.outTimeInput.value = self.outTimeInput
	  self.refs.remarksInput.value = self.remarksInput
	  self.refs.resultInput.value = self.resultInput
      self.update()

    }

});	
riot.tag2('activity-event', '<section class=" is-fluid"> <h2 class="title has-text-centered" style="color: #ff3860;">Activity Event Management</h2> <div class="flex items-center mt-2 mb-6 no-print"> <div class="bg-green py-1 rounded w-10"> <div class="bg-grey h-px flex-auto"></div> </div> </div> <div class="box"> <div class="columns"> <div class="column is-narrow"> <label class="label">Category</label> </div> <div class="column is-narrow"> <div class="control"> <div class="select"> <select ref="category_id"> <option each="{categories}" riot-value="{category_id}">{category_name} </option> </select> </div> </div> </div> <div class="column is-narrow"> <label class="label">Event</label> </div> <div class="column is-narrow"> <div class="control"> <input class=" input" ref="addEventInput" type="text"> </div> </div> <div class="column"> <button class="button is-danger has-text-weight-bold" onclick="{add}">{title} </button> </div> </div> </div> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th>SL</th> <th>Category</th> <th>Event</th> <th></th> </tr> </thead> <tbody> <tr each="{ev, i in eventDataItems}"> <td>{i+1}</td> <td>{ev.category_name}</td> <td>{ev.event_name}</td> <td class="has-text-right"> <div class="inline-flex rounded border border-grey overflow-hidden" hide="{ev.confirmDelete}"> <span><a class="button is-small is-rounded" onclick="{edit.bind(this, ev)}">Edit</a></span> <span if="{role==\'ADMIN\'}"> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick="{confirmDelete}">Delete</a></span> </div> <div class="table-buttons" if="{ev.confirmDelete}"> <span disabled="{loading}" class="button is-small is-rounded" onclick="{delete}"><i class="fa fa-check"></i></span> <span disabled="{loading}" class="button is-small has-text-danger is-rounded" onclick="{cancelOperation}"><i class="fa fa-times"></i></span> </div> </td> </tr> </tbody> </table> </section>', '', '', function(opts) {
	var self = this
    self.on("mount", function(){
      self.title='Create'
      self.role = getCookie('role')
      self.update()
      self.readCategories()
      self.readEvents()
    })
    self.on("unmount", function(){
      activityeventStore.off('add_event_changed', AddEventsChanged)
      activityeventStore.off('read_event_changed', ReadEventsChanged)
      activityeventStore.off('read_categories_changed',CategoriesChanged)
      activityeventStore.off('edit_event_changed',EditEventsChanged)
      activityeventStore.off('delete_event_changed',DeleteEventsChanged)
    })

    self.readCategories = () => {
       activityeventStore.trigger('read_categories')
    }

    self.readEvents = () => {
       activityeventStore.trigger('read_events')
    }

     self.add = () => {
      if(!self.refs.addEventInput.value){
        toastr.info("Please enter Event and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          console.log('create')
          activityeventStore.trigger('add_event', self.refs.addEventInput.value,
           self.refs.category_id.value)
        }else if(self.title=='Update'){
          console.log('update')
          activityeventStore.trigger('edit_event', self.refs.addEventInput.value,
            self.refs.category_id.value, self.edit_id)
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
        if(ev.event_id != e.item.ev.event_id){
          ev.confirmDelete = false
        }else{
          ev.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      activityeventStore.trigger('delete_event', e.item.ev.event_id)
    }

    self.edit = (ev,e) => {
      console.log(ev)
      self.title='Update'
      self.refs.addEventInput.value = ev.events
      self.refs.category_id.value = ev.category_id
      self.edit_id = ev.event_id
    }

    activityeventStore.on('add_event_changed',AddEventsChanged)
    function AddEventsChanged(events){
      console.log(events)
      self.title='Create'
      self.refs.addEventInput.value = ''
      self.refs.category_id.value = ''
      self.loading = false
      self.events = events
      self.update()
      self.readEvents()
      console.log(self.events)
    }

    activityeventStore.on('edit_event_changed',EditEventsChanged)
    function EditEventsChanged(events){
      console.log(events)
      self.title='Create'
      self.refs.addEventInput.value = ''
      self.refs.category_id.value = ''
      self.loading = false
      self.events = events
      self.update()
      self.readEvents()
      console.log(self.events)
    }

    activityeventStore.on('delete_event_changed',DeleteEventsChanged)
    function DeleteEventsChanged(events){
      console.log(events)
      self.title='Create'
      self.refs.addEventInput.value = ''
      self.refs.category_id.value = ''
      self.loading = false
      self.events = events
      self.update()
      self.readEvents()
      console.log(self.events)
    }

    activityeventStore.on('read_event_changed',ReadEventsChanged)
    function ReadEventsChanged(events){
      console.log(events)
      self.title='Create'
      self.refs.addEventInput.value = ''
      self.loading = false
      self.events = events
      self.eventDataItems = []
      self.eventDataItems = events
      self.update()
      console.log(self.events)
    }

    activityeventStore.on('read_categories_changed',CategoriesChanged)
    function CategoriesChanged(categories){
      console.log(categories)
      self.categories = categories
      self.update()
      console.log(self.categories)
    }

});
riot.tag2('activity-item', '<section class=" is-fluid"> <h2 class="title has-text-centered" style="color: #ff3860;">Item Management Console</h2> <div class="flex items-center mt-2 mb-6 no-print"> <div class="bg-green py-1 rounded w-10"> <div class="bg-grey h-px flex-auto"></div> </div> </div> <div class="box"> <div class="columns"> <div class="column is-half"> <div class="field"> <label class="label" for="role">Item</label> <div class="control"> <input class="input" type="text" ref="addItemInput" onkeyup="{addEnter}"> </div> </div> </div> <div class="column is-narrow"> <div class="field"> <div class="control"> <button class="button is-danger has-text-weight-bold adjusted-top" onclick="{add}">{title}</button> </div> </div> </div> </div> </div> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th>SL</th> <th>Item</th> <th></th> </tr> </thead> <tbody> <tr each="{r, i in Items}"> <td>{i+1}</td> <td>{r.item_name}</td> <td class="has-text-right"> <div class="inline-flex rounded border border-grey overflow-hidden" hide="{r.confirmDelete}"> <span><a class="button is-small is-rounded" onclick="{edit.bind(this, r)}">Edit</a></span> <span if="{role==\'ADMIN\'}"> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick="{confirmDelete}">Delete</a></span> </div> <div class="table-buttons" if="{r.confirmDelete}"> <span disabled="{loading}" class="button is-small is-rounded" onclick="{delete}"><i class="fa fa-check"></i></span> <span disabled="{loading}" class="button is-small has-text-danger is-rounded" onclick="{cancelOperation}"><i class="fa fa-times"></i></span> </div> </td> </tr> </tbody> </table> </section>', '', '', function(opts) {
	var self = this
    self.on("mount", function(){
      self.title='Create'
      self.role = getCookie('role')
      self.update()
      self.readItems()
    })
    self.on("unmount", function(){
      activityitemStore.off('items_changed', ItemsChanged)
    })

    self.readItems = () => {
       activityitemStore.trigger('read_items')
    }

     self.add = () => {
      if(!self.refs.addItemInput.value){
        toastr.info("Please enter Item and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          console.log('create')
          activityitemStore.trigger('add_item', self.refs.addItemInput.value)
        }else if(self.title=='Update'){
          console.log('update')
          activityitemStore.trigger('edit_item', self.refs.addItemInput.value,
            self.edit_id)
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
      self.Items.map(r => {
          r.confirmDelete = false
          r.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.Items.map(r => {
        if(r.item_id != e.item.r.item_id){
          r.confirmDelete = false
        }else{
          r.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      activityitemStore.trigger('delete_item', e.item.r.item_id)
    }

    self.edit = (r,e) => {
      console.log(r)
      self.title='Update'
      self.refs.addItemInput.value = r.item_name
      self.edit_id = r.item_id
    }

    activityitemStore.on('items_changed',ItemsChanged)
    function ItemsChanged(items){
      console.log(items)
      self.title='Create'
      self.refs.addItemInput.value = ''
      self.loading = false
      self.Items = items
      self.update()
      console.log(self.Items)
    }

});
riot.tag2('activity-setting', '<div class="field has-addons"> <p class="control"> <a class="button {is-active: selected_master == \'activity-item\'}" href="#/activity-setting/activity-item"> <span>Item</span> </a> </p> <p class="control"> <a class="button {is-active: selected_master == \'activity-event\'}" href="#/activity-setting/activity-event"> <span>Event</span> </a> </p> <p class="control"> <a class="button {is-active: selected_master == \'activity-category\'}" href="#/activity-setting/activity-category"> <span>Category</span> </a> </p> </div> <div id="activity-setting-view"></div>', '', '', function(opts) {
    var self = this
    console.log('opts.selected_master')
    console.log(opts.selected_master)
    if(!opts.selected_master){
      self.selected_master = 'activity-item'
    }else{
      self.selected_master = opts.selected_master
    }
});



riot.tag2('apply-fee-plan', '<section class=" is-fluid" show="{student_vew ==\'show_data\'}"> <div class="box"> <div class="columns"> <div class="column is-narrow"> <label class="label">Standard</label> </div> <div class="column is-narrow"> <div class="control"> <div class="select"> <select ref="standard_id" onchange="{readStandardSection}"> <option></option> <option each="{standards}" riot-value="{standard_id}">{standard} </option> </select> </div> </div> </div> <div class="column is-narrow"> <label class="label">Section</label> </div> <div class="column is-narrow"> <div class="control"> <div class="select"> <select ref="section_id" onchange="{getStudentData}"> <option each="{filteredSections}" riot-value="{section_id}">{section} </option> </select> </div> </div> </div> <div class="column"> <button class="button is-danger has-text-weight-bold" onclick="{getStudentData}">GO </button> </div> </div> </div> </section> <div class="level"> <div class="level-left"> <div class="level-item"> <h2 class="title" style="color: #ff3860;">Apply Fee Plan</h2> </div> </div> </div> <div class="flex items-center mt-2 mb-6 no-print"> <div class="bg-green py-1 rounded w-10"></div> <div class="bg-grey h-px flex-auto"></div> </div> <div class="columns"> <div class="column is-full"> <div class="box max-w-md"> <div class="columns is-multiline"> <div class="column is-full"> <div class="column is-full"> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th class="has-text-right"> <input type="checkbox" id="checkStudent" onclick="{selectAll}"> </th> <th>#</th> <th>Enrol No.</th> <th>Student\'s Name</th> <th>Plan</th> </tr> </thead> <tbody> <tr each="{r, i in students}"> <td class="has-text-right"> <input type="checkbox" class="check_box" checked="{r.done}" id="{\'studentId\' + r.student_id}" onclick="{selectStudents.bind(this,r)}"> </td> <td>{i+1}</td> <td>{r.enroll_number}</td> <td>{r.student_name}</td> <td>{r.fee_plan_name}</td> </tr> </tbody> </table> </div> <div class="columns"> <div class="column is-narrow"> <label class="label">Select Fee Plan</label> </div> <div class="column is-narrow"> <div class="control"> <div class="select is-fullwidth"> <select ref="fee_plan_id"> <option each="{plans}" riot-value="{fee_plan_id}">{fee_plan_name}</option> </select> </div> </div> </div> </div> <div class="column is-full"> <button class="button is-danger" onclick="{add}">Apply Plan</button> <button class="button is-info" id="showModal" onclick="{removeModal}">Remove Plan</button> </div> </div> </div> </div> </div> </section> <div class="modal" id="deleteModel"> <div class="modal-background"></div> <div class="modal-card"> <header class="modal-card-head"> <p class="modal-card-title">Delete Confirmation</p> </header> <section class="modal-card-body"> <h4>Are you Sure?</h4> </section> <footer class="modal-card-foot"> <button class="button is-danger" onclick="{remove}">Delete</button> <button class="button " id="modal-close">Cancel</button> </footer> </div> </div>', '', '', function(opts) {
	var self = this
    self.on("mount", function(){
      self.role = getCookie('role')
      self.student_vew = 'show_data'
      self.update()
      self.readSection()
      self.readStandard()
    })
    self.on("unmount", function(){
      applyPlanStore.off('read_apply_changed',ApplyPlanChanged)
      applyPlanStore.off('read_standard_changed',StandardChanged)
      applyPlanStore.off('read_section_changed',SectionChanged)
      applyPlanStore.off('read_plan_changed',ReadPlanChanged)
    })

     self.removeModal = () =>{
    	$("#showModal").click(function() {
  			$("#deleteModel").addClass("is-active");
		});

		$("#modal-close").click(function() {
		   $("#deleteModel").removeClass("is-active");
		   self.itemList()
		});
		activityStore.trigger('read_items')

    }

    self.add = () => {
       var tempStudents = [];
       var tempStudents = self.students.filter(c => {
          return c.done == true
        })

       var acceptedStudents = []
       tempStudents.map(s=>{
       	 if(s.fee_plan_id == null) acceptedStudents.push(s.student_id)
       })
       console.log("accepted students")
       console.log(acceptedStudents)
      if(!self.refs.fee_plan_id.value){
        toastr.info("Please select fee plan and try again")
      }else if(acceptedStudents.length==0){
          toastr.info("All the selected students have already been assigned to a plan. Please choose student/s who have not been assigned and try again.")
      }else{
      	console.log("here")
        var obj = {}
        obj['fee_plan_id'] = self.refs.fee_plan_id.value
        obj['students'] = acceptedStudents
        self.loading = true
          console.log(obj)
          applyPlanStore.trigger('apply_fee_plan', obj)
      }
    }

    self.remove = ()=> {
       var tempStudents = [];
       var tempStudents = self.students.filter(c => {
          return c.done == true
        })

       var removeStudent = []
       tempStudents.map(s=>{
       	 if(s.fee_plan_id != null) removeStudent.push(s)
       })
       console.log("removed students")
       console.log(removeStudent)

      if(removeStudent.length==0){
          toastr.info("Please assign a plan first then try to remove.")
      }else{
        var obj = {}
        obj['students'] = removeStudent
        self.loading = true
          console.log(obj)
          applyPlanStore.trigger('remove_fee_plan', obj)
      }
    }

   self.selectStudents = (item,event) => {
    	item.done=!event.item.r.done
    }

    self.selectAll = () => {
    	if($('#checkStudent').is(":checked")){
    		self.students.map(i=>{
	          i.done = true;
	          $('studentId'+i.student_id).prop('checked', true);

	        })
    	}else{
    		self.students.map(i=>{
	          i.done = false;
	          $('studentId'+i.student_id).prop('checked', false);

	        })
    	}
      console.log(self.students)
    }

    self.readStandard = () => {
       applyPlanStore.trigger('read_standards')
    }
    self.readSection = () => {
       applyPlanStore.trigger('read_sections')

    }

    self.readStandardSection = () => {

       console.log('filter')
       self.filteredSections = []
       self.filteredSections = self.sections.filter(s => {
       	return s.standard_id == self.refs.standard_id.value
       })

       self.readFeePlanByStandard()
    }

    self.readFeePlanByStandard =() =>{
    	console.log(self.refs.standard_id.value)
       applyPlanStore.trigger('read_plan_standard', self.refs.standard_id.value)
    }

    self.getStudentData =() =>{
    	console.log(self.refs.section_id.value)
       applyPlanStore.trigger('read_students', self.refs.section_id.value)
    }

    applyPlanStore.on('read_apply_changed',ApplyPlanChanged)
    function ApplyPlanChanged(students){
      console.log(students)
      self.students = students
      self.update()
      console.log(self.students)
    }
    applyPlanStore.on('read_plan_changed',ReadPlanChanged)
    function ReadPlanChanged(plans){
      console.log(plans)
      self.plans = plans
      self.update()
      console.log(self.plans)
    }

    applyPlanStore.on('read_standard_changed',StandardChanged)
    function StandardChanged(standards){
      console.log(standards)
      self.standards = standards
      self.update()

      console.log(self.standards)
    }
    applyPlanStore.on('read_section_changed',SectionChanged)
    function SectionChanged(sections){
      console.log(sections)
      self.sections = sections

      self.section_id = sections[0].section_id

      self.update()
      console.log(self.sections)
    }

});
riot.tag2('area', '<section class="is-fluid"> <h2 class="title" style="color: #ff3860;">Areas</h2> <div class="flex items-center mt-2 mb-6 no-print"> <div class="bg-green py-1 rounded w-10"> <div class="bg-grey h-px flex-auto"></div> </div> </div> <div class="box"> <div class="columns"> <div class="column is-narrow"> <label class="label">Area</label> </div> <div class="column is-narrow"> <div class="control"> <input class=" input" ref="addAreaInput" type="text"> </div> </div> <div class="column"> <button class="button is-danger has-text-weight-bold" onclick="{add}">{title} </button> </div> </div> </div> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th>#</th> <th>Area</th> <th></th> </tr> </thead> <tbody> <tr each="{d, i in areas}"> <td>{i + 1}</td> <td>{d.area}</td> <td class="has-text-right"> <div class="inline-flex rounded border border-grey overflow-hidden" hide="{d.confirmDelete}"> <span><a class="button is-small is-rounded" onclick="{edit.bind(this, d)}">Edit</a></span> <span if="{role==\'ADMIN\'}"> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick="{confirmDelete}">Delete</a></span> </div> <div class="table-buttons" if="{d.confirmDelete}"> <span disabled="{loading}" class="button is-small is-rounded" onclick="{delete}"><i class="fa fa-check"></i></span> <soan disabled="{loading}" class="button is-small has-text-danger is-rounded" onclick="{cancelOperation}"><i class="fa fa-times"></i></span> </div> </td> </tr> </tbody> </table> </section>', '', '', function(opts) {
  var self = this
    self.on("mount", function(){
      self.title='Create'
      self.role = getCookie('role')
      self.update()
      self.readArea()
    })

     self.on("unmount", function(){
      areaStore.off('area_changed', AreaChanged)
    })

    self.readArea = () => {
       areaStore.trigger('read_area')
    }

     self.add = () => {
      if(!self.refs.addAreaInput.value){
        toastr.info("Please enter area and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          console.log('create')
          areaStore.trigger('add_area', self.refs.addAreaInput.value)
        }else if(self.title=='Update'){
          console.log('update')
          areaStore.trigger('edit_area', self.refs.addAreaInput.value,
            self.edit_id)
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
      self.areas.map(d => {
          d.confirmDelete = false
          d.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.areas.map(d => {
        if(d.area != e.item.d.area){
          d.confirmDelete = false
        }else{
          d.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      areaStore.trigger('delete_area', e.item.d.area)
    }

    self.edit = (d,e) => {
      console.log(d)
      self.title='Update'
      self.refs.addAreaInput.value = d.area
      self.edit_id = d.area
    }

    areaStore.on('area_changed',AreaChanged)
    function AreaChanged(areas){
      console.log('area_changed1')
      console.log(areas)
      self.title='Create'
      self.refs.addAreaInput.value = ''
      self.loading = false
      self.areas = areas
      self.update()
    }

});
riot.tag2('bank-account-setting', '<section class=" is-fluid"> <h2 class="title has-text-centered" style="color: #ff3860;">Bank Account Management</h2> <div class="flex items-center mt-2 mb-6 no-print"> <div class="bg-green py-1 rounded w-10"> <div class="bg-grey h-px flex-auto"></div> </div> </div> <div class="box"> <div class="columns"> <div class="column is-narrow"> <label class="label">Bank A/C No.</label> </div> <div class="column is-narrow"> <div class="control"> <input class=" input" ref="addBankAccountInput" type="text"> </div> </div> <div class="column is-narrow"> <label class="label">Bank Name</label> </div> <div class="column is-narrow"> <div class="control"> <input class=" input" ref="addBankNameInput" type="text"> </div> </div> <div class="column is-narrow"> <label class="label">Branch</label> </div> <div class="column is-narrow"> <div class="control"> <input class=" input" ref="addBranchInput" type="text"> </div> </div> <div class="column"> <button class="button is-danger has-text-weight-bold" onclick="{add}">{title} </button> </div> </div> </div> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th>SL</th> <th>Bank A/C No.</th> <th>Bank Name</th> <th>Branch</th> <th></th> </tr> </thead> <tbody> <tr each="{s, i in banks}"> <td>{i+1}</td> <td>{s.bank_account_no}</td> <td>{s.bank_name}</td> <td>{s.branch}</td> <td class="has-text-right"> <div class="inline-flex rounded border border-grey overflow-hidden" hide="{s.confirmDelete}"> <span><a class="button is-small is-rounded" onclick="{edit.bind(this, s)}">Edit</a></span> <span> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick="{confirmDelete}">Delete</a></span> </div> <div class="table-buttons" if="{s.confirmDelete}"> <span disabled="{loading}" class="button is-small is-rounded" title="Delete" onclick="{delete}"><i class="fa fa-check"></i></span> <span disabled="{loading}" class="button is-small has-text-danger is-rounded" title="Cancel" onclick="{cancelOperation}"><i class="fa fa-times"></i></span> </div> </td> </tr> </tbody> </table> </section>', '', '', function(opts) {
	var self = this
    self.on("mount", function(){
      self.title='Create'
      self.role = getCookie('role')
      self.update()
      self.readBank()
    })
    self.on("unmount", function(){
      bankStore.off('read_bank_changed', ReadBankChanged)
      bankStore.off('add_bank_changed',AddBankChanged)
      bankStore.on('bank_edit_changed',EditBankChanged)
      bankStore.off('delete_event_changed',DeleteBankChanged)
    })

    self.readBank = () => {
       bankStore.trigger('read_bank')
    }

     self.add = () => {
      if(!self.refs.addBankAccountInput.value){
        toastr.info("Please enter Event and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          console.log('create')
          bankStore.trigger('add', self.refs.addBankAccountInput.value,
           self.refs.addBankNameInput.value , self.refs.addBranchInput.value)
           self.readBank()
        }else if(self.title=='Update'){
          console.log('update')
          bankStore.trigger('bank_edit',self.refs.addBankAccountInput.value,
          self.refs.addBankNameInput.value ,
          self.refs.addBranchInput.value, self.edit_id)
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
      self.banks.map(s => {
          s.confirmDelete = false
          s.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.banks.map(s => {
        if(s.bank_account_no != e.item.s.bank_account_no){
          s.confirmDelete = false
        }else{
          s.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      bankStore.trigger('delete', e.item.s.bank_account_no)
    }

    self.edit = (s,e) => {
      console.log(s)
      self.title='Update'

      self.refs.addBankAccountInput.value = s.bank_account_no
      self.refs.addBankNameInput.value = s.bank_name
      self.refs.addBranchInput.value = s.branch
      self.edit_id = s.bank_account_no
    }

    bankStore.on('read_bank_changed',ReadBankChanged)
    function ReadBankChanged(banks){
      console.log(banks)

      self.banks = banks
      self.update()
      console.log(self.banks)
    }

    bankStore.on('add_bank_changed',AddBankChanged)
    function AddBankChanged(banks){
      console.log(banks)
      self.title='Create'
      self.loading = false
      self.banks = banks
      self.update()
      console.log(self.banks)
    }

    bankStore.on('bank_edit_changed',EditBankChanged)
    function EditBankChanged(banks){
      console.log(banks)
      self.title='Create'
      self.loading = false
      self.banks = banks
      self.refs.addBankAccountInput.value = ''
      self.refs.addBankNameInput.value = ''
      self.refs.addBranchInput.value = ''
      self.update()
      console.log(self.banks)
    }
    bankStore.on('delete_event_changed',DeleteBankChanged)
    function DeleteBankChanged(banks){
      console.log(banks)
      self.title='Create'
      self.banks = banks
      self.update()
    }

});
riot.tag2('bill', '<div class="field has-addons"> <p class="control"> <a class="button {is-active: selected_master == \'fee-head\'}" href="#/fee-bill/fee-head"> <span>Fee Head</span> </a> </p> <p class="control"> <a class="button {is-active: selected_master == \'fee-slip\'}" href="#/fee-bill/fee-slip"> <span>Fee Slip</span> </a> </p> <p class="control"> <a class="button {is-active: selected_master == \'fee-plan\'}" href="#/fee-bill/fee-plan"> <span>Fee Plan</span> </a> </p> <p class="control"> <a class="button {is-active: selected_master == \'apply-fee-plan\'}" href="#/fee-bill/apply-fee-plan"> <span>Apply Fee Plan </span> </a> </p> <p class="control"> <a class="button {is-active: selected_master == \'copy-fee-plan\'}" href="#/fee-bill/copy-fee-plan"> <span>Copy Fee plan</span> </a> </p> </div> <div id="bill-view"></div>', '', '', function(opts) {
    var self = this
    console.log('opts.selected_master')
    console.log(opts.selected_master)
    if(!opts.selected_master){
      self.selected_master = 'fee-head'
    }else{
      self.selected_master = opts.selected_master
    }
});
riot.tag2('calender', '<section class="is-fluid"> <h2 class="title" style="color: #ff3860;">Areas</h2> <div class="flex items-center mt-2 mb-6 no-print"> <div class="bg-green py-1 rounded w-10"> <div class="bg-grey h-px flex-auto"></div> </div> </div> <div class="box"> <div class="columns"> <div class="column is-narrow"> <label class="label">Area</label> </div> <div class="column is-narrow"> <div class="control"> <input class=" input" ref="addAreaInput" type="text"> </div> </div> <div class="column"> <button class="button is-danger has-text-weight-bold" onclick="{add}">{title} </button> </div> </div> </div> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th>#</th> <th>Area</th> <th></th> </tr> </thead> <tbody> <tr each="{d, i in areas}"> <td>{i + 1}</td> <td>{d.area}</td> <td class="has-text-right"> <div class="inline-flex rounded border border-grey overflow-hidden" hide="{d.confirmDelete}"> <span><a class="button is-small is-rounded" onclick="{edit.bind(this, d)}">Edit</a></span> <span if="{role==\'ADMIN\'}"> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick="{confirmDelete}">Delete</a></span> </div> <div class="table-buttons" if="{d.confirmDelete}"> <span disabled="{loading}" class="button is-small is-rounded" onclick="{delete}"><i class="fa fa-check"></i></span> <span disabled="{loading}" class="button is-small has-text-danger is-rounded" onclick="{cancelOperation}"><i class="fa fa-times"></i></span> </div> </td> </tr> </tbody> </table> </section>', '', '', function(opts) {
  var self = this
    self.on("mount", function(){
      self.title='Create'
      self.role = getCookie('role')
      self.update()

    })

});
riot.tag2('category', '<section class=" is-fluid"> <h2 class="title has-text-centered" style="color: #ff3860;">Activity Category Management</h2> <div class="flex items-center mt-2 mb-6 no-print"> <div class="bg-green py-1 rounded w-10"> <div class="bg-grey h-px flex-auto"></div> </div> </div> <div class="box"> <div class="columns"> <div class="column is-half"> <div class="field"> <label class="label" for="role">Category</label> <div class="control"> <input class="input" type="text" ref="addCategoryInput" onkeyup="{addEnter}"> </div> </div> </div> <div class="column is-narrow"> <div class="field"> <div class="control"> <button class="button is-danger has-text-weight-bold adjusted-top" onclick="{add}">{title}</button> </div> </div> </div> </div> </div> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th>SL</th> <th>Category</th> <th></th> </tr> </thead> <tbody> <tr each="{c, i in categoryDataItems}"> <td>{i+1}</td> <td>{c.category_name}</td> <td class="has-text-right"> <div class="inline-flex rounded border border-grey overflow-hidden" hide="{c.confirmDelete}"> <span><a class="button is-small is-rounded" onclick="{edit.bind(this, c)}">Edit</a></span> <span if="{role==\'ADMIN\'}"> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick="{confirmDelete}">Delete</a></span> </div> <div class="table-buttons" if="{c.confirmDelete}"> <span disabled="{loading}" class="button is-small is-rounded" onclick="{delete}"><i class="fa fa-check"></i></span> <span disabled="{loading}" class="button is-small has-text-danger is-rounded" onclick="{cancelOperation}"><i class="fa fa-times"></i></span> </div> </td> </tr> </tbody> </table> </section>', '', '', function(opts) {
	var self = this
    self.on("mount", function(){
      self.title='Create'
      self.role = getCookie('role')
      self.update()
      self.readCategories()
    })
    self.on("unmount", function(){
      categoryStore.off('categories_changed', CategoriesChanged)
    })

    self.readCategories = () => {
       categoryStore.trigger('read_categories')
    }

     self.add = () => {
      if(!self.refs.addCategoryInput.value){
        toastr.info("Please enter Category and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          console.log('create')
          categoryStore.trigger('add_category', self.refs.addCategoryInput.value)
        }else if(self.title=='Update'){
          console.log('update')
          categoryStore.trigger('edit_category', self.refs.addCategoryInput.value,
            self.edit_id)
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
      self.categories.map(c => {
          c.confirmDelete = false
          c.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.categories.map(c => {
        if(c.category_id != e.item.c.category_id){
          c.confirmDelete = false
        }else{
          c.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      categoryStore.trigger('delete_category', e.item.c.category_id)
    }

    self.edit = (c,e) => {
      console.log(c)
      self.title='Update'
      self.refs.addCategoryInput.value = c.category
      self.edit_id = c.category_id
    }

    categoryStore.on('categories_changed',CategoriesChanged)
    function CategoriesChanged(categories){
      console.log(categories)
      self.title='Create'
      self.refs.addCategoryInput.value = ''
      self.loading = false
      self.categories = categories
       self.categoryDataItems = []
      self.categoryDataItems = categories
      self.update()
      console.log(self.categories)
    }

});
riot.tag2('city', '<section class="is-fluid"> <h2 class="title" style="color: #ff3860;">Cities</h2> <div class="flex items-center mt-2 mb-6 no-print"> <div class="bg-green py-1 rounded w-10"> <div class="bg-grey h-px flex-auto"></div> </div> </div> <div class="box"> <div class="columns"> <div class="column is-narrow"> <label class="label">City</label> </div> <div class="column is-narrow"> <div class="control"> <input class=" input" ref="addCityInput" type="text"> </div> </div> <div class="column is-narrow"> <label class="label">Code</label> </div> <div class="column is-narrow"> <div class="control"> <input class=" input" ref="addCodeInput" type="text"> </div> </div> <div class="column"> <button class="button is-danger has-text-weight-bold" onclick="{add}">{title} </button> </div> </div> </div> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th>#</th> <th>city</th> <th>Code</th> <th></th> </tr> </thead> <tbody> <tr each="{d, i in cities}"> <td>{i + 1}</td> <td>{d.city}</td> <td>{d.code}</td> <td class="has-text-right"> <div class="inline-flex rounded border border-grey overflow-hidden" hide="{d.confirmDelete}"> <span><a class="button is-small is-rounded" onclick="{edit.bind(this, d)}">Edit</a></span> <span if="{role==\'ADMIN\'}"> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick="{confirmDelete}">Delete</a></span> </div> <div class="table-buttons" if="{d.confirmDelete}"> <span disabled="{loading}" class="button is-small is-rounded" onclick="{delete}"><i class="fa fa-check"></i></span> <soan disabled="{loading}" class="button is-small has-text-danger is-rounded" onclick="{cancelOperation}"><i class="fa fa-times"></i></span> </div> </td> </tr> </tbody> </table> </section>', '', '', function(opts) {
  var self = this
    self.on("mount", function(){
      self.title='Create'
      self.role = getCookie('role')
      self.update()
      self.readCity()
    })

     self.on("unmount", function(){
      cityStore.off('city_changed', CityChanged)
    })

    self.readCity = () => {
       cityStore.trigger('read_city')
    }

     self.add = () => {
      if(!self.refs.addCityInput.value){
        toastr.info("Please enter city and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          console.log('create')
          cityStore.trigger('add_city', self.refs.addCityInput.value,self.refs.addCodeInput.value,)
        }else if(self.title=='Update'){
          console.log('update')
          cityStore.trigger('edit_city', self.refs.addCityInput.value,self.refs.addCodeInput.value,
            self.edit_id)
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
      self.levels.map(d => {
          d.confirmDelete = false
          d.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.cities.map(d => {
        if(d.city != e.item.d.city){
          d.confirmDelete = false
        }else{
          d.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      cityStore.trigger('delete_city', e.item.d.city)
    }

    self.edit = (d,e) => {
      console.log(d)
      self.title='Update'
      self.refs.addCityInput.value = d.city
      self.refs.addCodeInput.value = d.code
      self.edit_id = d.city
    }

    cityStore.on('city_changed',CityChanged)
    function CityChanged(cities){
      console.log('city_changed1')
      console.log(cities)
      self.title='Create'
      self.refs.addCityInput.value = ''
      self.refs.addCodeInput.value = ''
      self.loading = false
      self.cities = cities
      self.update()
    }

});
riot.tag2('class-holiday', '<section class="is-fluid" show="{class_holiday_view ==\'show_holiday\'}"> <div class="level"> <div class="level-left"> <h2 class="title" style="color: #ff3860;">Class Holiday</h2> </div> <div class="level-right"> <button class="button is-warning is-rounded" onclick="{add_class_holiday}"> <span class="icon"> <span class="fas fa-plus"></span> </span> <span>Class Holiday</span> </button> </div> </div> <table class="table is-fullwidth is-striped is-hoverable is-bordered"> <thead> <tr> <th>#</th> <th>Event</th> <th>CLass</th> <th>Date From</th> <th>Date To</th> <th>Holiday</th> <th>Description</th> <th>Action</th> </tr> </thead> <tbody> <tr each="{st, i in classHolidays}"> <td>{i+1}</td> <td>{st.event_name}</td> <td>{st.class}</td> <td>{st.s_date}</td> <td>{st.e_date}</td> <td>{st.holiday}</td> <td>{st.description}</td> <td class="has-text-right"> <div class="inline-flex rounded border border-grey overflow-hidden" hide="{st.confirmDelete}"> <span><a class="button is-small is-rounded" onclick="{edit.bind(this, st)}">Edit</a></span> <span> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick="{confirmDelete}">Delete</a></span> </div> <div class="table-buttons" if="{st.confirmDelete}"> <span disabled="{loading}" class="button is-small is-rounded" onclick="{delete}"><i class="fa fa-check"></i></span> <soan disabled="{loading}" class="button is-small has-text-danger is-rounded" onclick="{cancelOperation}"><i class="fa fa-times"></i></span> </div> </td> </tr> </tbody> </table> </section> <section class="is-fluid" show="{class_holiday_view ==\'add_class_holiday\'}"> <div class="label"> <div class="level-left"> <h2 class="title" style="color: #ff3860;">{title} Class Holiday</h2> </div> <div class="level-right"> <button class="button" onclick="{close_class_holiday}">Back</button> </div> </div> <div class="box"> <div class="columns is-variable is-1 is-multiline"> <div class="column is-one-third"> <label class="label">Event Name</label> <input type="text" ref="event_name" type="text" class="input"> </div> <div class="column is-one-third"> <label class="label" for="class">Class</label> <div class="control"> <div class="select is-fullwidth"> <select ref="section_id"> <option each="{standards}" riot-value="{section_id}">{class} </option> </select> </div> </div> </div> <div class="column is-one-third"> <label class="label">Date From</label> <input class="input date flatpickr-input form-control input" ref="start_date" placeholder="" tabindex="0" type="text"> </div> <div class="column is-one-third"> <label class="label">Date To</label> <input class="input date flatpickr-input form-control input" ref="end_date" placeholder="" tabindex="0" type="text"> </div> <div class="column is-one-third"> <label class="label">Description</label> <textarea class="input" ref="description" rows="2" type="text"></textarea> </div> <div class="column is-one-third"> <label class="label">Holiday</label> <input type="checkbox" id="holiday_check_box"> </div> <div class="column is-full"> <button class="button is-danger has-text-weight-bold adjusted-top" onclick="{add}">{title}</button> </div> </div> </div> </section>', '', '', function(opts) {
   var self = this
     self.on("mount", function(){
       self.title='Create'
       self.role = getCookie('role')
       self.update()

       self.readStandard()
        self.readClassHoliday()
       self.class_holiday_view='show_holiday'
       flatpickr(".date", {
         allowInput: true,
         altFormat: "d/m/Y",
         dateFormat: "Y-m-d",
       })
     })
     self.on("unmount", function(){
       classholidayStore.off('add_class_holiday_changed', AddClassHolidayChanged)
       classholidayStore.off('read_class_holiday_changed', ReadClassHolidayChanged)

       classholidayStore.off('read_standard_changed',standardChanged)
       classholidayStore.off('edit_class_holiday_changed',EditClassHolidayChanged)
       classholidayStore.off('delete_class_holiday_changed',DeleteClassHolidayChanged)
     })

     self.readNewEvent = () => {
        classholidayStore.trigger('read_new_event')
     }
      self.readStandard = () => {
        classholidayStore.trigger('read_standard')
     }

     self.add_class_holiday = () => {
        self.class_holiday_view='add_class_holiday'

     }
    self.close_class_holiday = () => {
        self.class_holiday_view='show_holiday'

        self.readClassHoliday()
    }

     self.readClassHoliday = () => {
        classholidayStore.trigger('read_class_holiday')
     }

      self.add = () => {
      	if($('#holiday_check_box').is(":checked")){
      		self.holiday='Y';
      	}else{
      		self.holiday='N';
      	}
       if(!self.refs.event_name.value){
         toastr.info("Please enter Event and try again")
       }else{
         self.loading = true
         if(self.title=='Create'){
           console.log('create')
           classholidayStore.trigger('add_class_holiday', self.refs.event_name.value,
            self.refs.section_id.value,self.refs.start_date.value,self.refs.end_date.value,self.refs.description.value,self.holiday)
         }else if(self.title=='Update'){
           console.log('update')
           classholidayStore.trigger('edit_class_hliday',  self.refs.event_name.value,
            self.refs.section_id.value,self.refs.start_date.value,self.refs.end_date.value,self.refs.description.value,self.holiday,self.edit_id)
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
       self.classHolidays.map(ev => {
           ev.confirmDelete = false
           ev.confirmEdit = false
       })
     }

     self.confirmDelete = (e) => {
     	console.log(e.item.st.event_id)
     	console.log("+++++++++++++")
       self.classHolidays.map(ev => {
       	console.log(ev.event_id)
         if(ev.event_id != e.item.st.event_id){
           ev.confirmDelete = false
         }else{
           ev.confirmDelete = true
         }
       })
     }

     self.delete = (e) => {
       self.loading = true
       classholidayStore.trigger('delete_class_holiday', e.item.st.event_id)
     }

     self.edit = (ev,e) => {
       console.log(ev)
       self.title='Update'
        flatpickr(".date", {
         allowInput: true,
         altFormat: "d/m/Y",
         dateFormat: "Y-m-d",
       })

       self.class_holiday_view='add_class_holiday'
       self.refs.event_name.value = ev.event_name
       self.refs.start_date.value = ev.start_date
       console.log(self.refs.start_date.value)
       self.refs.end_date.value = ev.end_date
       self.refs.description.value = ev.description
       self.refs.section_id.value = ev.section_id
       console.log(ev.holiday);
       if(ev.holiday=='Y'){
       	 $('#holiday_check_box').prop('checked',true)
       }else{
       	 $('#holiday_check_box').prop('checked',false)
       }
       self.edit_id = ev.event_id
     }

     classholidayStore.on('add_class_holiday_changed',AddClassHolidayChanged)
     function AddClassHolidayChanged(classHolidays){
       console.log(classHolidays)
       self.title='Create'
       self.refs.start_date.value =''
       self.refs.end_date.value =''
       self.refs.description.value =''

       self.refs.section_id.value =''
       self.loading = false
       self.classHolidays = classHolidays
       self.update()
       self.readClassHoliday()
       console.log(self.classHolidays)
     }

     classholidayStore.on('edit_class_holiday_changed',EditClassHolidayChanged)
     function EditClassHolidayChanged(classHolidays){
       console.log(classHolidays)
       self.title='Create'
       self.refs.start_date.value =''
       self.refs.end_date.value =''
       self.refs.description.value =''

       self.refs.section_id.value =''
       self.loading = false
       self.classHolidays = classHolidays
       self.update()
       self.readClassHoliday()

     }

     classholidayStore.on('delete_class_holiday_changed',DeleteClassHolidayChanged)
     function DeleteClassHolidayChanged(classHolidays){
       console.log(classHolidays)
       self.title='Create'
       self.refs.start_date.value =''
       self.refs.end_date.value =''
       self.refs.description.value =''
       self.refs.event_name.value =''
       self.refs.section_id.value =''
       self.loading = false
       self.classHolidays = classHolidays
       self.update()
       self.readClassHoliday()
       console.log(self.classHolidays)
     }

     classholidayStore.on('read_class_holiday_changed',ReadClassHolidayChanged)
     function ReadClassHolidayChanged(classHolidays){
       console.log(classHolidays)
       self.title='Create'
       self.refs.start_date.value =''
       self.refs.end_date.value =''
       self.refs.description.value =''
       self.refs.event_name.value =''
       self.refs.section_id.value =''
       self.loading = false
       self.classHolidays = classHolidays
       self.update()
       console.log(self.classHolidays)
     }

     classholidayStore.on('read_standard_changed',standardChanged)
     function standardChanged(standards){
       console.log(standards)
       self.standards = standards
       self.update()
       console.log(self.standards)
     }

});
riot.tag2('class-teacher', '<section class=" is-fluid"> <div class="level"> <div class="level-left"> <h2 class="title" style="color: #ff3860;">Class Teacher Standard Map</h2> </div> <div class="level-right"> <button class="button is-warning is-rounded" id="teacherModal" onclick="{addTeacher}"> <span class="icon"> <span class="fas fa-plus"></span> </span> <span>ADD</span> </button> </div> </div> <div id="showItemModal" class="modal "> <div class="modal-background"></div> <div class="modal-card"> <header class="modal-card-head"> <p class="modal-card-title">Add New Teacher</p> </header> <section class="modal-card-body"> <div class="column is-narrow"> <label class="label">Standard</label> </div> <div class="column "> <div class="control"> <div class="select"> <select ref="standardIdInput" onchange="{readSection}"> <option>Select Standard</option> <option each="{standard}" riot-value="{standard_id}">{standard} </option> </select> </div> </div> </div> <div class="column"> <label class="label">Section</label> </div> <div class="column"> <div class="control"> <div class="select"> <select ref="sectionIdInput"> <option each="{section}" riot-value="{section_id}">{section} </option> </select> </div> </div> </div> <div class="column is-narrow"> <label class="label">Room No.</label> </div> <div class="column"> <div class="control"> <input class="input" type="text" ref="addRoomNoInput" onkeyup="{addEnter}"> </div> </div> <div class="column is-narrow"> <label class="label">Class Teacher</label> </div> <div class="column "> <div class="control"> <div class="select"> <select ref="sectionIdInput"> <option each="{section}" riot-value="{section_id}">{section} </option> </select> </div> </div> </div> <div class="column is-narrow"> <label class="label">Assistant Class Teacher</label> </div> <div class="column is-narrow"> <div class="control"> <div class="select"> <select ref="sectionIdInput"> <option each="{section}" riot-value="{section_id}">{section} </option> </select> </div> </div> </div> </section> <footer class="modal-card-foot"> <button class="button is-success" id="" onclick="{add}">Add</button> <button class="button is-danger" id="teacher-modal-close">Cancel</button> </footer> </div> </div> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th>SL</th> <th>Category</th> <th>Event</th> <th></th> </tr> </thead> <tbody> <tr each="{ev, i in eventDataItems}"> <td>{i+1}</td> <td>{ev.category_name}</td> <td>{ev.event_name}</td> <td class="has-text-right"> <div class="inline-flex rounded border border-grey overflow-hidden" hide="{ev.confirmDelete}"> <span><a class="button is-small is-rounded" onclick="{edit.bind(this, ev)}">Edit</a></span> <span if="{role==\'ADMIN\'}"> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick="{confirmDelete}">Delete</a></span> </div> <div class="table-buttons" if="{ev.confirmDelete}"> <span disabled="{loading}" class="button is-small is-rounded" onclick="{delete}"><i class="fa fa-check"></i></span> <span disabled="{loading}" class="button is-small has-text-danger is-rounded" onclick="{cancelOperation}"><i class="fa fa-times"></i></span> </div> </td> </tr> </tbody> </table> </section>', '', '', function(opts) {
	var self = this
    self.on("mount", function(){
      self.title='Create'
      self.role = getCookie('role')
      self.update()
      self.readStandard()
    })
    self.on("unmount", function(){
      classTeacherStore.off('read_standard_changed',StandardChanged)
      classTeacherStore.off('read_section_by_standardchanged',SectionChanged)
    })

    self.readStandard = () => {
       classTeacherStore.trigger('read_standard')
    }

    self.readSection = () =>{
    	classTeacherStore.trigger('read_section_by_standard', self.refs.standardIdInput.value)
    	console.log(self.refs.standardIdInput.value)

    }

    self.addTeacher = () =>{
    	$("#teacherModal").click(function() {
  			$("#showItemModal").addClass("is-active");
		});

		$("#teacher-modal-close").click(function() {
		   $("#showItemModal").removeClass("is-active");
		   self.itemList()

		});
    }

     self.add = () => {
      if(!self.refs.addEventInput.value){
        toastr.info("Please enter Event and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          console.log('create')
          classTeacherStore.trigger('add_event', self.refs.addEventInput.value,
           self.refs.category_id.value)
        }else if(self.title=='Update'){
          console.log('update')
          classTeacherStore.trigger('edit_event', self.refs.addEventInput.value,
            self.refs.category_id.value, self.edit_id)
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
        if(ev.event_id != e.item.ev.event_id){
          ev.confirmDelete = false
        }else{
          ev.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      classTeacherStore.trigger('delete_event', e.item.ev.event_id)
    }

    self.edit = (ev,e) => {
      console.log(ev)
      self.title='Update'
      self.refs.addEventInput.value = ev.events
      self.refs.category_id.value = ev.category_id
      self.edit_id = ev.event_id
    }

    classTeacherStore.on('read_standard_changed',StandardChanged)
    function StandardChanged(standard){
      console.log(standard)
      self.standard = standard
      self.update()
      console.log(self.standard)
    }
    classTeacherStore.on('read_section_by_standardchanged',SectionChanged)
    function SectionChanged(section){
      console.log(section)
      self.section = section
      self.update()
      console.log(self.section)
    }

});
riot.tag2('club', '<section class=" is-fluid"> <h2 class="title" style="color: #ff3860;">Club</h2> <div class="flex items-center mt-2 mb-6 no-print"> <div class="bg-green py-1 rounded w-10"> <div class="bg-grey h-px flex-auto"></div> </div> </div> <div class="box"> <div class="columns"> <div class="column is-narrow"> <label class="label">Club</label> </div> <div class="column is-narrow"> <div class="control"> <div class="control"> <input class=" input" ref="addClubInput" type="text"> </div> </div> </div> <div class="column is-narrow"> <label class="label">Captain</label> </div> <div class="column is-narrow"> <div class="control"> <input class=" input" ref="addCaptainInput" type="text"> </div> </div> <div class="column is-narrow"> <label class="label">Detail</label> </div> <div class="column is-narrow"> <div class="control"> <textarea class=" input" ref="addDetailInput" type="text"></textarea> </div> </div> <div class="column"> <button class="button is-danger has-text-weight-bold" onclick="{add}">{title} </button> </div> </div> </div> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th>SL</th> <th>Club Name</th> <th>Captain</th> <th>Detail</th> <th></th> </tr> </thead> <tbody> <tr each="{ev, i in clubs}"> <td>{i+1}</td> <td>{ev.club_name}</td> <td>{ev.captain}</td> <td>{ev.club_detail}</td> <td class="has-text-right"> <div class="inline-flex rounded border border-grey overflow-hidden" hide="{ev.confirmDelete}"> <span><a class="button is-small is-rounded" onclick="{edit.bind(this, ev)}">Edit</a></span> <span if="{role==\'ADMIN\'}"> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick="{confirmDelete}">Delete</a></span> </div> <div class="table-buttons" if="{ev.confirmDelete}"> <span disabled="{loading}" class="button is-small is-rounded" onclick="{delete}"><i class="fa fa-check"></i></span> <span disabled="{loading}" class="button is-small has-text-danger is-rounded" onclick="{cancelOperation}"><i class="fa fa-times"></i></span> </div> </td> </tr> </tbody> </table> </section>', '', '', function(opts) {
	var self = this
    self.on("mount", function(){
      self.title='Create'
      self.role = getCookie('role')
      self.update()
      self.readClub()
    })
    self.on("unmount", function(){
      clubStore.off('add_club_changed', AddClubChanged)
      clubStore.off('read_club_changed', ReadClubChanged)
      clubStore.off('edit_club_changed',EditClubChanged)
      clubStore.off('delete_club_changed',DeleteClubChanged)
    })

    self.readClub = () => {
       clubStore.trigger('read_club')
    }

     self.add = () => {
      if(!self.refs.addClubInput.value){
        toastr.info("Please enter Club and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          console.log('create')
          clubStore.trigger('add_club', self.refs.addClubInput.value,
           self.refs.addCaptainInput.value,self.refs.addDetailInput.value)
        }else if(self.title=='Update'){
          console.log('update')
          clubStore.trigger('edit_club', self.refs.addClubInput.value,
            self.refs.addCaptainInput.value, self.refs.addDetailInput.value,self.edit_id)
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
      self.clubs.map(ev => {
          ev.confirmDelete = false
          ev.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.clubs.map(ev => {
        if(ev.club_id != e.item.ev.club_id){
          ev.confirmDelete = false
        }else{
          ev.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      clubStore.trigger('delete_club', e.item.ev.club_id)
    }

    self.edit = (ev,e) => {
      console.log(ev)
      self.title='Update'
      self.refs.addClubInput.value = ev.club_name
      self.refs.addCaptainInput.value = ev.captain
      self.refs.addDetailInput.value = ev.club_detail
      self.edit_id = ev.club_id
    }

    clubStore.on('add_club_changed',AddClubChanged)
    function AddClubChanged(clubs){
      console.log(clubs)
      self.title='Create'
      self.refs.addClubInput.value = ''
      self.refs.addCaptainInput.value = ''
      self.refs.addDetailInput.value = ''
      self.loading = false
      self.clubs = clubs
      self.update()
      self.readClub()
      console.log(self.clubs)
    }

    clubStore.on('edit_club_changed',EditClubChanged)
    function EditClubChanged(clubs){
      console.log(clubs)
      self.title='Create'
      self.refs.addClubInput.value =''
      self.refs.addCaptainInput.value =''
      self.refs.addDetailInput.value =''
      self.loading = false
      self.clubs = clubs
      self.update()
      self.readClub()

    }

    clubStore.on('delete_club_changed',DeleteClubChanged)
    function DeleteClubChanged(clubs){
      console.log(clubs)
      self.title='Create'
      self.refs.addClubInput.value =""
      self.refs.addCaptainInput.value =""
      self.refs.addDetailInput.value =""
      self.loading = false
      self.clubs = clubs
      self.update()
      self.readClub()
      console.log(self.clubs)
    }

    clubStore.on('read_club_changed',ReadClubChanged)
    function ReadClubChanged(clubs){
      console.log(clubs)
      self.title='Create'
      self.refs.addClubInput.value =""
      self.refs.addCaptainInput.value =""
      self.refs.addDetailInput.value =""
      self.loading = false
      self.clubs = clubs
      self.update()
      console.log(self.clubs)
    }

});
riot.tag2('consolidate-tabulation-sheet', '<loading-bar if="{loading}"></loading-bar> <section class=" is-fluid"> <div class="level"> <div class="level-left"> <h2 class="title" style="color: #ff3860;">Consolidate Tabulation Sheet</h2> </div> <div class="level-right"> <button class="button is-warning is-rounded ml5" onclick="{readReport}"> <span class="icon"> <span class="fas fa-sync-alt"></span> </span> </button> </div> </div> <div class="box"> <div class="columns"> <div class="column is-narrow"><label class="label">Standard</label></div> <div class="column"> <div class="control"> <div class="select is-fullwidth"> <select ref="standardSelect" onchange="{changeSection}"> <option value="">Select Standard</option> <option each="{classes}" riot-value="{standard_id}">{standard}</option> </select> </div> </div> </div> <div class="column is-narrow"><label class="label">Section</label></div> <div class="column"> <div class="control"> <div class="select is-fullwidth"> <select ref="sectionSelect" onchange="{readClassSubject}"> <option value="">Select Section</option> <option each="{tempSections}" riot-value="{section_id}">{section}</option> </select> </div> </div> </div> <div class="column is-narrow"><label class="label">Exam Type</label></div> <div class="column"> <div class="control"> <div class="select is-fullwidth"> <select ref="examTypeSelect" onchange="{readMarksLimit}"> <option value="">Select Exam Type</option> <option each="{examTypes}" riot-value="{exam_type_id}">{exam_type}</option> </select> </div> </div> </div> <div class="column"> <button class="button is-danger has-text-weight-bold" onclick="{readReport}">GO </button> </div> </div> </div> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th style="width:200px;">Roll No</th> <th>Enroll No</th> <th>Student Name</th> <th>Appl</th> <th>Total</th> <th>Per</th> </tr> </thead> <tbody> <tr each="{c, i in reports}"> <td>{c.roll_number}</td> <td>{c.enroll_number}</td> <td>{c.student_name}</td> <td></td> <td></td> <td></td> </tr> </tbody> </table> </section>', '', '', function(opts) {
	var self = this
    self.on("mount", function(){
      self.loading = false;
      self.update()
      self.readClass()
      self.readSection()
    })
    self.on("unmount", function(){
      marksReportStore.off('read_classes_changed',ClassesChanged)
      marksReportStore.off('read_section_changed',SectionChanged)
      marksReportStore.off('exam_types_changed',ExamTypesChanged)

      marksReportStore.off('read_consolidate_tabulation_sheet_changed',ReportChanged)
    })

    self.readClass = () => {
       self.loading = true;
       marksReportStore.trigger('read_classes')
    }

    self.readSection = () => {
       self.loading = true;
       marksReportStore.trigger('read_section')
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

       marksReportStore.trigger('read_exam_types',self.refs.standardSelect.value)
    }

    self.readReport = () => {
      let error = '';

      if(self.refs.sectionSelect.value==''){
        error = error + "Please select section, "
      }

      if(self.refs.examTypeSelect.value==''){
        error = error + "Please select exam type, "
      }

      if(error.length!=0){
        toastr.error(error)
        return
      }else{
        self.loading=true
        marksReportStore.trigger('read_consolidate_tabulation_sheet',self.refs.examTypeSelect.value, self.refs.sectionSelect.value)
      }

    }

    self.addEnter = (e) => {
      if(e.which == 13){
        self.add()
      }
    }

    marksReportStore.on('read_classes_changed',ClassesChanged)
    function ClassesChanged(classes){
      self.loading = false
      self.classes = []
      self.classes = classes
      self.update()
      console.log(self.classes)
    }

    marksReportStore.on('read_section_changed',SectionChanged)
    function SectionChanged(sections){
      self.loading = false
      self.sections = []
      self.sections = sections
      self.update()
    }

    marksReportStore.on('exam_types_changed',ExamTypesChanged)
    function ExamTypesChanged(examTypes){
      self.loading = false
      self.examTypes = []
      self.examTypes = examTypes
      self.update()
    }

    marksReportStore.on('read_consolidate_tabulation_sheet_changed',ReportChanged)
    function ReportChanged(reports){
      self.loading = false
      self.reports = []
      self.reports = reports
      self.update()
    }

});
riot.tag2('copy-fee-plan', '<h4>copy fee plan</h4>', '', '', function(opts) {
});
riot.tag2('country', '<section class="is-fluid"> <h2 class="title" style="color: #ff3860;">Countries</h2> <div class="flex items-center mt-2 mb-6 no-print"> <div class="bg-green py-1 rounded w-10"> <div class="bg-grey h-px flex-auto"></div> </div> </div> <div class="box"> <div class="columns"> <div class="column is-narrow"> <label class="label">Country</label> </div> <div class="column is-narrow"> <div class="control"> <input class=" input" ref="addCountryInput" type="text"> </div> </div> <div class="column is-narrow"> <label class="label">Code</label> </div> <div class="column is-narrow"> <div class="control"> <input class=" input" ref="addCodeInput" type="text"> </div> </div> <div class="column"> <button class="button is-danger has-text-weight-bold" onclick="{add}">{title} </button> </div> </div> </div> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th>#</th> <th>Country</th> <th>Code</th> <th></th> </tr> </thead> <tbody> <tr each="{d, i in countries}"> <td>{i + 1}</td> <td>{d.country}</td> <td>{d.code}</td> <td class="has-text-right"> <div class="inline-flex rounded border border-grey overflow-hidden" hide="{d.confirmDelete}"> <span><a class="button is-small is-rounded" onclick="{edit.bind(this, d)}">Edit</a></span> <span if="{role==\'ADMIN\'}"> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick="{confirmDelete}">Delete</a></span> </div> <div class="table-buttons" if="{d.confirmDelete}"> <span disabled="{loading}" class="button is-small is-rounded" onclick="{delete}"><i class="fa fa-check"></i></span> <soan disabled="{loading}" class="button is-small has-text-danger is-rounded" onclick="{cancelOperation}"><i class="fa fa-times"></i></span> </div> </td> </tr> </tbody> </table> </section>', '', '', function(opts) {
  var self = this
    self.on("mount", function(){
      self.title='Create'
      self.role = getCookie('role')
      self.update()
      self.readCountry()
    })

     self.on("unmount", function(){
      countryStore.off('country_changed', CountryChanged)
    })

    self.readCountry = () => {
       countryStore.trigger('read_country')
    }

     self.add = () => {
      if(!self.refs.addCountryInput.value){
        toastr.info("Please enter Country and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          console.log('create')
          countryStore.trigger('add_country', self.refs.addCountryInput.value,self.refs.addCodeInput.value,)
        }else if(self.title=='Update'){
          console.log('update')
          countryStore.trigger('edit_country', self.refs.addCountryInput.value,self.refs.addCodeInput.value,
            self.edit_id)
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
      self.levels.map(d => {
          d.confirmDelete = false
          d.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.countries.map(d => {
        if(d.country != e.item.d.country){
          d.confirmDelete = false
        }else{
          d.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      countryStore.trigger('delete_country', e.item.d.country)
    }

    self.edit = (d,e) => {
      console.log(d)
      self.title='Update'
      self.refs.addCountryInput.value = d.country
      self.refs.addCodeInput.value = d.code
      self.edit_id = d.country
    }

    countryStore.on('country_changed',CountryChanged)
    function CountryChanged(countries){
      console.log('country_changed1')
      console.log(countries)
      self.title='Create'
      self.refs.addCountryInput.value = ''
      self.refs.addCodeInput.value = ''
      self.loading = false
      self.countries = countries
      self.update()
    }

});
riot.tag2('courses', '<section class="container is-fluid"> <h2 class="title" style="color: #ff3860;">Courses</h2> <div class="flex items-center mt-2 mb-6 no-print"> <div class="bg-green py-1 rounded w-10"> <div class="bg-grey h-px flex-auto"></div> </div> </div> <div class="box"> <div class="columns"> <div class="column is-one-quarter"> <label class="label" for="course">Course</label> <input type="text" ref="addCourseInput" class="input"> </div> <div class="column is-half"> <label class="label" for="course_full_name">Full name</label> <input class="input" type="text" ref="addCourseFullNameInput"> </div> <div class="column is-narrow"> <button class="button is-danger has-text-weight-bold adjusted-top" onclick="{add}">{title} </button> </div> </div> </div> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th>Course</th> <th>Full Name</th> <th></th> </tr> </thead> <tbody> <tr each="{c, i in courseDataItems}"> <td>{c.course}</td> <td>{c.course_full_name}</td> <td class="has-text-right"> <div class="inline-flex rounded border border-grey overflow-hidden" hide="{c.confirmDelete}"> <span><a class="button is-small is-rounded" onclick="{edit.bind(this, c)}">Edit</a></span> <span if="{role==\'ADMIN\'}"> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick="{confirmDelete}">Delete</a></span> </div> <div class="table-buttons" if="{c.confirmDelete}"> <span disabled="{loading}" class="button is-small is-rounded" onclick="{delete}"><i class="fa fa-check"></i></span> <soan disabled="{loading}" class="button is-small has-text-danger is-rounded" onclick="{cancelOperation}"><i class="fa fa-times"></i></span> </div> </td> </tr> </tbody> </table> </section>', '', '', function(opts) {
	var self = this
    self.on("mount", function(){
      self.title='Create'
      self.role = getCookie('role')
      console.log(self.role)
      console.log(typeof(self.role))
      self.update()
      self.readCourses()
    })

    self.on("unmount", function(){
      courseStore.off('courses_changed', CoursesChanged)
    })

    self.readCourses = () => {
       courseStore.trigger('read_courses')
    }

     self.add = () => {
      if(!self.refs.addCourseInput.value){
        toastr.info("Please enter Course and try again")
      }else  if(!self.refs.addCourseFullNameInput.value){
        toastr.info("Please enter Full Name and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          console.log('create')
          courseStore.trigger('add_course', self.refs.addCourseInput.value, self.refs.addCourseFullNameInput.value)
        }else if(self.title=='Update'){
          console.log('update')
          courseStore.trigger('edit_course', self.refs.addCourseInput.value, self.refs.addCourseFullNameInput.value, self.edit_id)
        }
      }
    }

    self.cancelOperation = (e) => {
      self.courses.map(c => {
          c.confirmDelete = false
          c.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.courses.map(c => {
        if(c.id != e.item.c.id){
          c.confirmDelete = false
        }else{
          c.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      courseStore.trigger('delete_course', e.item.c.id)
    }

    self.edit = (c,e) => {
      console.log(c)
      self.title='Update'
      self.refs.addCourseInput.value = c.course
      self.refs.addCourseFullNameInput.value = c.course_full_name
      self.edit_id = c.id
    }

    courseStore.on('courses_changed',CoursesChanged)
    function CoursesChanged(courses){
      console.log(courses)
      self.title='Create'
      self.refs.addCourseInput.value = ''
      self.refs.addCourseFullNameInput.value = ''
      self.loading = false
      self.courses = courses
      self.courseDataItems = []
      self.courseDataItems = courses
      self.update()
    }

});
riot.tag2('designations', '<section class="is-fluid"> <h2 class="title" style="color: #ff3860;">Designations</h2> <div class="flex items-center mt-2 mb-6 no-print"> <div class="bg-green py-1 rounded w-10"> <div class="bg-grey h-px flex-auto"></div> </div> </div> <div class="box"> <div class="columns"> <div class="column is-half"> <div class="field"> <label class="label" for="designation">Designation</label> <div class="control"> <input class="input" type="text" ref="addDesignationInput" onkeyup="{addEnter}"> </div> </div> </div> <div class="column is-narrow"> <div class="field"> <div class="control"> <button class="button is-danger has-text-weight-bold adjusted-top" onclick="{add}">{title}</button> </div> </div> </div> </div> </div> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th>#</th> <th>Designation</th> <th></th> </tr> </thead> <tbody> <tr each="{d, i in designations}"> <td>{i + 1}</td> <td>{d.designation}</td> <td class="has-text-right"> <div class="inline-flex rounded border border-grey overflow-hidden" hide="{d.confirmDelete}"> <span><a class="button is-small is-rounded" onclick="{edit.bind(this, d)}">Edit</a></span> <span> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick="{confirmDelete}">Delete</a></span> </div> <div class="table-buttons" if="{d.confirmDelete}"> <span disabled="{loading}" class="button is-small is-rounded" onclick="{delete}"><i class="fa fa-check"></i></span> <soan disabled="{loading}" class="button is-small has-text-danger is-rounded" onclick="{cancelOperation}"><i class="fa fa-times"></i></span> </div> </td> </tr> </tbody> </table> </section>', '', '', function(opts) {
  var self = this
    self.on("mount", function(){
      self.title='Create'
      self.role = getCookie('role')
      self.update()
      self.readDesignations()
    })

     self.on("unmount", function(){
      designationStore.off('designations_changed', DesignationsChanged)
    })

    self.readDesignations = () => {
       designationStore.trigger('read_designations')
    }

     self.add = () => {
      if(!self.refs.addDesignationInput.value){
        toastr.info("Please enter Designation and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          console.log('create')
          designationStore.trigger('add_designation', self.refs.addDesignationInput.value)
        }else if(self.title=='Update'){
          console.log('update')
          designationStore.trigger('edit_designation', self.refs.addDesignationInput.value,
            self.edit_id)
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
      self.designations.map(d => {
          d.confirmDelete = false
          d.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.designations.map(d => {
        if(d.id != e.item.d.id){
          d.confirmDelete = false
        }else{
          d.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      designationStore.trigger('delete_designation', e.item.d.id)
    }

    self.edit = (d,e) => {
      console.log(d)
      self.title='Update'
      self.refs.addDesignationInput.value = d.designation
      self.edit_id = d.id
    }

    designationStore.on('designations_changed',DesignationsChanged)
    function DesignationsChanged(designations){
      console.log('designations_changed1')
      console.log(designations)
      self.title='Create'
      self.refs.addDesignationInput.value = ''
      self.loading = false
      self.designations = designations
      self.designations = []
      self.designations = designations
      self.update()
      console.log(self.designations)
      console.log('self.designations')
    }

});
riot.tag2('discipline-case-wise-report', '<section class=" is-fluid"> <h2 class="title has-text-centered" style="color: #ff3860;">Student Category wise Discipline Report</h2> <div class="flex items-center mt-2 mb-6 no-print"> <div class="bg-green py-1 rounded w-10"> <div class="bg-grey h-px flex-auto"></div> </div> </div> <div class="box"> <div class="columns"> <div class="column is-narrow"> <label class="label">From Date</label> </div> <div class="column is-narrow"> <input class="date input flatpickr-input form-control input" placeholder="" ref="start_date" tabindex="0" type="text" readonly="readonly"> </div> <div class="column is-narrow"> <label class="label">To Date</label> </div> <div class="column is-narrow"> <input class="date input flatpickr-input form-control input" placeholder="" ref="end_date" tabindex="0" type="text" readonly="readonly"> </div> <div class="column"> <button class="button is-danger has-text-weight-bold" onclick="{getData}"> GO </button> <input type="checkbox" id="checkTable" checked="{e.done}" onclick="{viewTable}" style="margin-top: 12px;"> Table </div> </div> </div> <canvas id="canvas_pie" show="{report_view ==\'show_graph\'}"></canvas> <div class="columns is-centered"> <table class="table is-striped is-hoverable is-bordered" show="{report_view ==\'show_table\'}"> <thead> <tr> <th>Category</th> <th class="has-text-right">Total</th> </tr> </thead> <tbody> <tr each="{cd, i in case_wise_reports}"> <td>{cd.category_name}</td> <td class="has-text-right">{cd.total}</td> </tr> <tr> <td class="has-text-right">Total</td> <td class="has-text-right">{grand_total}</td> </tr> </tbody> </table> </div> </section>', '', '', function(opts) {
	var self = this
    self.on("mount", function(){
      flatpickr(".date", {

    	allowInput: true,
    	altFormat: "d/m/Y",
    	dateFormat: "Y-m-d",
  		})
      self.update();
    })

    self.on("unmount", function(){
      disciplineReportStore.off('read_case_wise_report_changed',ReadCaseChanged)
    })

    self.viewTable = () => {
    	if($('#checkTable').is(":checked")){
	        self.report_view = 'show_table'
    	}else{
	        self.report_view = 'show_graph'
    	}
    }
    self.getData = () => {
    	var obj={}
          obj['start_date']=self.refs.start_date.value
          obj['end_date']=self.refs.end_date.value
          self.loading = true
          disciplineReportStore.trigger('read_case_wise_report', obj)
          self.report_view = 'show_graph'
          console.log(obj)
    }

    disciplineReportStore.on('read_case_wise_report_changed',ReadCaseChanged)
    function ReadCaseChanged(case_wise_reports,grand_total){
      self.case_wise_reports = case_wise_reports
      self.grand_total = grand_total

      var chartColors = ['#e3342f','#F6993F','#F2D024','#1F9D55','#2779BD','#9561E2','#B8C2CC','#fff'];

		var labels = []
		var chart_percentage = []
        var backgroundColor = []

		 for (var i = self.case_wise_reports.length - 1; i >= 0; i--) {
		 	var total_percentage = ((self.case_wise_reports[i].total*100)/self.grand_total).toFixed(2);
		    var percentage = self.case_wise_reports[i].category_name + ' ( ' + self.case_wise_reports[i].total + ' , ' + total_percentage + '% )';

		    labels.push(percentage)
		    chart_percentage.push(self.case_wise_reports[i].total)
		    if(typeof chartColors[i] != "undefined"){
		    	backgroundColor.push(chartColors[i])
		    }

		 }

		  console.log(labels);
		  console.log(chart_percentage);

		  var config = {
		    type: 'pie',
		    data: {
		      datasets: [{
		        data: chart_percentage,
		        backgroundColor: backgroundColor,
		        label: 'labels'
		      }],
		      labels: labels
		    },
		    options: {
		      responsive: true
		    }
		  };

		  var ctx = document.getElementById('canvas_pie').getContext('2d');
		  window.myPie = new Chart(ctx, config);
      self.update()
      console.log(self.case_wise_reports)
    }
});
riot.tag2('discipline-case', '<section class=" is-fluid"> <h2 class="title has-text-centered" style="color: #ff3860;">Discipline Case Management Console</h2> <div class="flex items-center mt-2 mb-6 no-print"> <div class="bg-green py-1 rounded w-10"> <div class="bg-grey h-px flex-auto"></div> </div> </div> <div class="box"> <div class="columns"> <div class="column is-narrow"> <label class="label">Category</label> </div> <div class="column is-narrow"> <div class="control"> <div class="select"> <select ref="category_id"> <option each="{categories}" riot-value="{category_id}">{category_name} </option> </select> </div> </div> </div> <div class="column is-narrow"> <label class="label">Case</label> </div> <div class="column is-half"> <div class="control"> <input class=" input" ref="addDisciplineCaseInput" type="text"> </div> </div> <div class="column"> <button class="button is-danger has-text-weight-bold" onclick="{add}">{title} </button> </div> </div> </div> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th>SL</th> <th>Category</th> <th>Case</th> <th></th> </tr> </thead> <tbody> <tr each="{ca, i in discipline_case}"> <td>{i+1}</td> <td>{ca.category_name}</td> <td>{ca.case_name}</td> <td class="has-text-right"> <div class="inline-flex rounded border border-grey overflow-hidden" hide="{ca.confirmDelete}"> <span><a class="button is-small is-rounded" onclick="{edit.bind(this, ca)}">Edit</a></span> <span if="{role==\'ADMIN\'}"> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick="{confirmDelete}">Delete</a></span> </div> <div class="table-buttons" if="{ca.confirmDelete}"> <span disabled="{loading}" class="button is-small is-rounded" onclick="{delete}"><i class="fa fa-check"></i></span> <span disabled="{loading}" class="button is-small has-text-danger is-rounded" onclick="{cancelOperation}"><i class="fa fa-times"></i></span> </div> </td> </tr> </tbody> </table> </section>', '', '', function(opts) {
	var self = this
    self.on("mount", function(){
      self.title='Create'
      self.role = getCookie('role')
      self.update()
      self.readCategories()
      self.readCase()
    })
    self.on("unmount", function(){
      disciplinecaseStore.off('read_discipline_categories_changed',CategoriesChanged)
      disciplinecaseStore.off('add_discipline_case_changed', AddCaseChanged)
      disciplinecaseStore.off('read_discipline_case_changed', ReadCaseChanged)
      disciplinecaseStore.off('edit_discipline_case_changed',EditCaseChanged)
      disciplinecaseStore.off('delete_discipline_case_changed',DeleteCaseChanged)
    })

    self.readCategories = () => {
       disciplinecaseStore.trigger('read_discipline_category')
    }

    self.readCase = () => {
       disciplinecaseStore.trigger('read_discipline_case')
    }

     self.add = () => {
      if(!self.refs.addDisciplineCaseInput.value){
        toastr.info("Please enter Case and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){

          disciplinecaseStore.trigger('add_discipline_case', self.refs.addDisciplineCaseInput.value,
           self.refs.category_id.value)

        }else if(self.title=='Update'){

          disciplinecaseStore.trigger('edit_discipline_case', self.refs.addDisciplineCaseInput.value,
            self.refs.category_id.value, self.edit_id)
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
      self.discipline_case.map(ca => {
          ca.confirmDelete = false
          ca.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.discipline_case.map(ca => {
        if(ca.case_id != e.item.ca.case_id){
          ca.confirmDelete = false
        }else{
          ca.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      disciplinecaseStore.trigger('delete_discipline_case', e.item.ca.case_id)
    }

    self.edit = (ca,e) => {
      console.log(ca)
      self.title='Update'
      self.refs.addDisciplineCaseInput.value = ca.case_name
      self.refs.category_id.value = ca.category_id
      self.edit_id = ca.case_id
    }

    disciplinecaseStore.on('add_discipline_case_changed',AddCaseChanged)
    function AddCaseChanged(discipline_case){
      console.log(discipline_case)
      self.title='Create'
      self.refs.addDisciplineCaseInput.value = ''
      self.discipline_case = discipline_case
      self.update()
      self.readCase()
      console.log(self.discipline_case)
    }

    disciplinecaseStore.on('edit_discipline_case_changed',EditCaseChanged)
    function EditCaseChanged(discipline_case){
      console.log(discipline_case)
      self.title='Create'
      self.refs.addDisciplineCaseInput.value = ''
      self.discipline_case = discipline_case
      self.update()
      self.readCase()
      console.log(self.discipline_case)
    }

    disciplinecaseStore.on('delete_discipline_case_changed',DeleteCaseChanged)
    function DeleteCaseChanged(discipline_case){
      console.log(discipline_case)
      self.title='Create'
      self.loading = false
      self.discipline_case = discipline_case
      self.update()
      self.readCase()
      console.log(self.discipline_case)
    }

    disciplinecaseStore.on('read_discipline_case_changed',ReadCaseChanged)
    function ReadCaseChanged(discipline_case){
      console.log(discipline_case)
      self.title='Create'
      self.refs.addDisciplineCaseInput.value = ''
      self.loading = false
      self.discipline_case = discipline_case
      self.update()
    }

    disciplinecaseStore.on('read_discipline_categories_changed',CategoriesChanged)
    function CategoriesChanged(categories){
      console.log(categories)
      self.categories = categories
      self.update()
      console.log(self.categories)
    }

});
riot.tag2('discipline-category', '<section class=" is-fluid"> <h2 class="title has-text-centered" style="color: #ff3860;">Discipline Category Management</h2> <div class="flex items-center mt-2 mb-6 no-print"> <div class="bg-green py-1 rounded w-10"> <div class="bg-grey h-px flex-auto"></div> </div> </div> <div class="box"> <div class="columns"> <div class="column is-half"> <div class="field"> <label class="label" for="role">Category</label> <div class="control"> <input class="input" type="text" ref="addDisciplineCategoryInput" onkeyup="{addEnter}"> </div> </div> </div> <div class="column is-narrow"> <div class="field"> <div class="control"> <button class="button is-danger has-text-weight-bold adjusted-top" onclick="{add}">{title}</button> </div> </div> </div> </div> </div> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th>SL</th> <th>Category</th> <th></th> </tr> </thead> <tbody> <tr each="{dc, i in discipline_categories}"> <td>{i+1}</td> <td>{dc.category_name}</td> <td class="has-text-right"> <div class="inline-flex rounded border border-grey overflow-hidden" hide="{dc.confirmDelete}"> <span><a class="button is-small is-rounded" onclick="{edit.bind(this, dc)}">Edit</a></span> <span if="{role==\'ADMIN\'}"> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick="{confirmDelete}">Delete</a></span> </div> <div class="table-buttons" if="{dc.confirmDelete}"> <span disabled="{loading}" class="button is-small is-rounded" onclick="{delete}"><i class="fa fa-check"></i></span> <span disabled="{loading}" class="button is-small has-text-danger is-rounded" onclick="{cancelOperation}"><i class="fa fa-times"></i></span> </div> </td> </tr> </tbody> </table> </section>', '', '', function(opts) {
	var self = this
    self.on("mount", function(){
      self.title='Create'
      self.role = getCookie('role')
      self.update()
      self.readCategories()
    })
    self.on("unmount", function(){
      disciplinecategoryStore.off('discipline_category_changed',DisciplineCategoryChanged)
    })

    self.readCategories = () => {
       disciplinecategoryStore.trigger('read_discipline_category')
    }

     self.add = () => {
      if(!self.refs.addDisciplineCategoryInput.value){
        toastr.info("Please enter Category and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          console.log('create')
          disciplinecategoryStore.trigger('add_discipline_category', self.refs.addDisciplineCategoryInput.value)
        }else if(self.title=='Update'){
          console.log('update')
          disciplinecategoryStore.trigger('edit_discipline_category', self.refs.addDisciplineCategoryInput.value,self.edit_id)
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
      self.discipline_categories.map(dc => {
          dc.confirmDelete = false
          dc.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.discipline_categories.map(dc => {
        if(dc.category_id != e.item.dc.category_id){
          dc.confirmDelete = false
        }else{
          dc.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      disciplinecategoryStore.trigger('delete_discipline_category', e.item.dc.category_id)
    }

    self.edit = (dc,e) => {
      console.log(dc)
      self.title='Update'
      self.refs.addDisciplineCategoryInput.value = dc.category_name
      self.edit_id = dc.category_id
    }

    disciplinecategoryStore.on('discipline_category_changed',DisciplineCategoryChanged)
    function DisciplineCategoryChanged(discipline_categories){
      console.log(discipline_categories)
      self.title='Create'
      self.refs.addDisciplineCategoryInput.value = ''
      self.loading = false
      self.discipline_categories = discipline_categories
      self.update()
      console.log(self.discipline_categories)
    }

});
riot.tag2('discipline-class-wise-report', '<section class=" is-fluid"> <h2 class="title has-text-centered" style="color: #ff3860;">Class Wise discipline Report</h2> <div class="flex items-center mt-2 mb-6 no-print"> <div class="bg-green py-1 rounded w-10"> <div class="bg-grey h-px flex-auto"></div> </div> </div> <div class="box"> <div class="columns"> <div class="column is-narrow"> <label class="label">Standard</label> </div> <div class="column is-narrow"> <div class="control"> <div class="select"> <select ref="standard_id" onchange="{getSection}"> <option each="{standards}" riot-value="{standard_id}">{standard} </option> <option value="-1">ALL</option> </select> </div> </div> </div> <div class="column is-narrow"> <label class="label">Section</label> </div> <div class="column is-narrow"> <div class="control"> <div class="select"> <select ref="section_id"> <option each="{filteredSections}" riot-value="{section_id}">{section} </option> <option value="-1">ALL</option> </select> </div> </div> </div> <div class="column is-narrow"> <label class="label">Session</label> </div> <div class="column is-narrow"> <div class="control"> <div class="select"> <select ref="session_id"> <option each="{sessions}" riot-value="{session_id}">{session_name} </option> </select> </div> </div> </div> <div class="column"> <button class="button is-danger has-text-weight-bold" onclick="{getData}"> GO </button> <input type="checkbox" id="checkTable" checked="{e.done}" onclick="{viewTable}" style="margin-top: 12px;"> Table </div> </div> </div> <canvas id="canvas_pie" show="{report_view ==\'show_graph\'}"></canvas> <div class="columns is-centered"> <table class="table is-striped is-hoverable is-bordered" show="{report_view ==\'show_table\'}"> <thead> <tr> <th>Case</th> <th class="has-text-right">Total</th> </tr> </thead> <tbody> <tr each="{cd, i in class_wise_case_report}"> <td>{cd.category_name}</td> <td class="has-text-right">{cd.total}</td> </tr> <tr> <td class="has-text-right">Total</td> <td class="has-text-right">{grand_total}</td> </tr> </tbody> </table> </div> </section>', '', '', function(opts) {
	var self = this
    self.on("mount", function(){
      flatpickr(".date", {

    	allowInput: true,
    	altFormat: "d/m/Y",
    	dateFormat: "Y-m-d",
  		})
      self.readStandard()
      self.readSection()
      self.readSession()
      self.update();
    })

    self.on("unmount", function(){
      disciplineReportStore.on('read_class_wise_report_changed',ReadClassWiseReportChanged)
      disciplineReportStore.off('read_standard_changed',StandardChanged)
      disciplineReportStore.off('read_section_changed',SectionChanged)
      disciplineReportStore.off('read_session_changed',SessionChanged)
    })

    self.readStandard = () => {
       disciplineReportStore.trigger('read_standard')
    }

    self.readSection = () => {
       disciplineReportStore.trigger('read_section')
    }

    self.readSession = () => {
       disciplineReportStore.trigger('read_session')
    }

    self.getSection = () => {
    	self.filteredSections = []
    	self.filteredSections = self.sections.filter(s => {
    		return s.standard_id == self.refs.standard_id.value
    	})
    }

    self.viewTable = () => {
    	if($('#checkTable').is(":checked")){
	        self.report_view = 'show_table'
    	}else{
	        self.report_view = 'show_graph'
    	}
    }
    self.getData = () => {
          self.loading = true
          disciplineReportStore.trigger('read_class_wise_report', self.refs.standard_id.value,
          	self.refs.section_id.value,self.refs.session_id.value)
          	self.report_view = 'show_graph'
    }

    disciplineReportStore.on('read_standard_changed',StandardChanged)
    function StandardChanged(standards){
      console.log(standards)
      self.standards = standards
      self.update()
    }

    disciplineReportStore.on('read_section_changed',SectionChanged)
    function SectionChanged(sections){
      console.log(sections)
      self.sections = sections
      self.update()
    }

    disciplineReportStore.on('read_session_changed',SessionChanged)
    function SessionChanged(sessions){
      console.log(sessions)
      self.sessions = sessions
      self.update()
    }

    disciplineReportStore.on('read_class_wise_report_changed',ReadClassWiseReportChanged)
    function ReadClassWiseReportChanged(class_wise_case_report,grand_total){
      self.class_wise_case_report = class_wise_case_report
      self.grand_total = grand_total

      var chartColors = ['#e3342f','#F6993F','#F2D024','#1F9D55','#2779BD','#9561E2','#B8C2CC','#fff'];

		var labels = []
		var chart_percentage = []
        var backgroundColor = []

		 for (var i = self.class_wise_case_report.length - 1; i >= 0; i--) {
		 	var total_percentage = ((self.class_wise_case_report[i].total*100)/self.grand_total).toFixed(2);
		    var percentage = self.class_wise_case_report[i].category_name + ' ( ' + self.class_wise_case_report[i].total + ' , ' + total_percentage + '% )';

		    labels.push(percentage)
		    chart_percentage.push(self.class_wise_case_report[i].total)
		    if(typeof chartColors[i] != "undefined"){
		    	backgroundColor.push(chartColors[i])
		    }

		 }

		  console.log(labels);
		  console.log(chart_percentage);

		  var config = {
		    type: 'pie',
		    data: {
		      datasets: [{
		        data: chart_percentage,
		        backgroundColor: backgroundColor,
		        label: 'labels'
		      }],
		      labels: labels
		    },
		    options: {
		      responsive: true
		    }
		  };

		  var ctx = document.getElementById('canvas_pie').getContext('2d');
		  window.myPie = new Chart(ctx, config);
      self.update()
      console.log(self.class_wise_case_report)
    }
});
riot.tag2('discipline-date-wise-case-report', '<section class=" is-fluid"> <h2 class="title has-text-centered" style="color: #ff3860;">Student Wise Discipline Case Report</h2> <div class="flex items-center mt-2 mb-6 no-print"> <div class="bg-green py-1 rounded w-10"> <div class="bg-grey h-px flex-auto"></div> </div> </div> <div class="box"> <div class="columns"> <div class="column is-narrow"> <label class="label">Category</label> </div> <div class="column is-narrow"> <div class="control"> <div class="select"> <select ref="category_id"> <option value="-1">ALL</option> <option each="{categories}" riot-value="{category_id}">{category_name} </option> </select> </div> </div> </div> <div class="column is-narrow"> <label class="label">From Date</label> </div> <div class="column is-narrow"> <input class="date input flatpickr-input form-control input" placeholder="" ref="start_date" tabindex="0" type="text" readonly="readonly"> </div> <div class="column is-narrow"> <label class="label">To Date</label> </div> <div class="column is-narrow"> <input class="date input flatpickr-input form-control input" placeholder="" ref="end_date" tabindex="0" type="text" readonly="readonly"> </div> <div class="column"> <button class="button is-danger has-text-weight-bold" onclick="{getData}"> GO </button> </div> </div> </div> <table class="table is-striped is-hoverable is-bordered is-fullwidth"> <thead> <tr> <th>Sl No</th> <th>Name</th> <th>Enroll No</th> <th>Class</th> <th>Case</th> <th>Date</th> <th>Diagnosis</th> <th>Remarks</th> </tr> </thead> <tbody> <tr each="{cd, i in date_wise_case_report}"> <td>{i+1}</td> <td>{cd.student_name}</td> <td>{cd.enroll_number}</td> <td>{cd.standard}</td> <td>{cd.case_name}</td> <td>{cd.consult_date}</td> <td>{cd.diagnosis}</td> <td>{cd.remarks}</td> </tr> </tbody> </table> </section>', '', '', function(opts) {
	var self = this
    self.on("mount", function(){
      flatpickr(".date", {

    	allowInput: true,
    	altFormat: "d/m/Y",
    	dateFormat: "Y-m-d",
  		})
      self.readCategories()
      self.update();
    })

    self.on("unmount", function(){
      disciplineReportStore.off('read_date_wise_case_report_changed',ReadDateWiseCaseReportChanged)
      disciplinedetailStore.off('read_discipline_categories_changed',CategoriesChanged)
    })

    self.readCategories = () => {
       disciplinedetailStore.trigger('read_discipline_categories')
    }

    self.getData = () => {
    	var obj={}
          obj['start_date']=self.refs.start_date.value
          obj['end_date']=self.refs.end_date.value
          self.loading = true
          disciplineReportStore.trigger('read_date_wise_case_report', obj,self.refs.category_id.value)
          console.log(obj)
          console.log(self.refs.category_id.value)
    }

    disciplinedetailStore.on('read_discipline_categories_changed',CategoriesChanged)
    function CategoriesChanged(categories){
      console.log(categories)
      self.categories = categories
      self.update()
    }

    disciplineReportStore.on('read_date_wise_case_report_changed',ReadDateWiseCaseReportChanged)
    function ReadDateWiseCaseReportChanged(date_wise_case_report){
      self.date_wise_case_report = date_wise_case_report
      console.log(self.date_wise_case_report)
    }
});
riot.tag2('discipline-detail', '<section class=" is-fluid" show="{discipline_view ==\'show_discipline\'}"> <div class="level"> <div class="level-left"> <h2 class="title" style="color: #ff3860;">Mentor Detail</h2> </div> <div class="level-right"> <button class="button is-warning is-rounded" onclick="{add_new_discipline}"> <span class="icon"> <span class="fas fa-plus"></span> </span> <span>Add Detail</span> </button> </div> </div> <div class="box"> <div class="columns"> <div class="column is-narrow"> <label class="label">Category</label> </div> <div class="column is-narrow"> <div class="control"> <div class="select"> <select ref="category_id"> <option value="-1">ALL</option> <option each="{categories}" riot-value="{category_id}">{category_name} </option> </select> </div> </div> </div> <div class="column"> <button class="button is-danger has-text-weight-bold" onclick="{getDisciplineData}">GO </button> </div> </div> </div> <table class="table is-bordered is-fullwidth is-striped is-hoverable is-narrow"> <thead> <tr> <th>SL No</th> <th>Referred by</th> <th>Recorded by</th> <th>Name</th> <th>Enroll No</th> <th>Class</th> <th>Case</th> <th>Date</th> <th>Diagnosis</th> <th>Suggestion</th> <th style="width: 140px;"></th> </tr> </thead> <tbody> <tr each="{ac, i in disciplines}"> <td>{i + 1}</td> <td>{ac.referred_by}</td> <td>{ac.created_by}</td> <td>{ac.student_name}</td> <td>{ac.enroll_number}</td> <td>{ac.standard}</td> <td>{ac.case_name}</td> <td>{ac.consult_date}</td> <td>{ac.diagnosis}</td> <td>{ac.remarks}</td> <td class="has-text-right"> <div class="inline-flex rounded border border-grey overflow-hidden" hide="{ac.confirmDelete}"> <span><a class="button is-small is-rounded has-text-success" onclick="{edit.bind(this, ac.id)}"> Edit</a></span> <span if="{role==\'ADMIN\'}"> <a class=" button is-small has-text-danger is-rounded" rel="nofollow" onclick="{confirmDelete}">Delete</a></span> </div> <div class="table-buttons" if="{ac.confirmDelete}"> <span disabled="{loading}" class="button is-small is-rounded" onclick="{delete}"><i class="fa fa-check" aria-hidden="true"></i></span> <span disabled="{loading}" class="button is-small has-text-danger is-rounded" onclick="{cancelOperation}"><i class="fa fa-times"></i></span> </div> </td> </tr> </tbody> </table> </section> <section class=" is-fluid" show="{discipline_view ==\'add_discipline\'}"> <div class="level"> <div class="level-left"> <div class="level-item"> <h2 class="title" style="color: #ff3860;">{title} Detail</h2> </div> </div> <div class="level-right"> <a class="button" onclick="{close_new_discipline}">Back</a> </div> </div> <div class="flex items-center mt-2 mb-6 no-print"> <div class="bg-green py-1 rounded w-10"></div> <div class="bg-grey h-px flex-auto"></div> </div> <div class="box"> <div class="columns is-variable is-1 is-multiline"> <div class="column is-one-third"> <label class="label" for="disciplineReferredInput">Referred by</label> <div class="control "> <div class="select is-fullwidth"> <select ref="disciplineReferredInput"> <option value="Class Monitor">Class Monitor</option> <option value="Class Teacher">Class Teacher</option> <option value="Discipline Cell">Discipline Cell</option> <option value="Out Sider">Out Sider</option> <option value="Parent">Parent</option> <option value="School Authority">School Authority</option> <option value="Student Directly">Student Directly</option> <option value="Subject Teacher">Subject Teacher</option> </select> </div> </div> </div> <div class="column is-one-third"> <label class="label" for="disciplineEnrollInput">Enroll No</label> <input class="input" ref="disciplineEnrollInput" type="text"> </div> <div class="column is-one-third"> <label class="label" for="student_dob">Category</label> <div class="control "> <div class="select is-fullwidth"> <select ref="disciplineCategoryidInput" onchange="{readCategoryCase}"> <option each="{categories}" riot-value="{category_id}">{category_name}</option> </select> </div> </div> </div> <div class="column is-one-third"> <label class="label" for="student_gender">Case</label> <div class="control "> <div class="select is-fullwidth"> <select ref="discipline_case_id"> <option each="{cases}" riot-value="{case_id}">{case_name}</option> </select> </div> </div> </div> <div class="column is-one-third"> <label class="label" for="disciplineDateInput">Date</label> <input class="date input flatpickr-input form-control input" ref="disciplineDateInput" placeholder="" tabindex="0" type="text" readonly="readonly"> </div> <div class="column is-one-third"> <label class="label" for="disciplineDiagnosisInput">Diagnosis</label> <input class="input" ref="disciplineDiagnosisInput" type="text"> </div> <div class="column is-full"> <label class="label" for="disciplineRemarksInput">Suggestion</label> <textarea class="textarea" ref="disciplineRemarksInput" rows="2"></textarea> </div> <div class="column is-full"> <button class="button is-danger has-text-weight-bold adjusted-top" onclick="{add}">Submit</button> </div> </div> </div> </section>', '', '', function(opts) {
	var self = this
    self.on("mount", function(){
    self.title='Add'
    self.discipline_view = 'show_discipline'
    self.role = getCookie('role')
    self.update()
      flatpickr(".date", {
    	allowInput: true,
    	altFormat: "d/m/Y",
    	dateFormat: "Y-m-d",
  		})
    self.readCategories()
    self.readCase()
    })

    self.on("unmount", function(){
      disciplinedetailStore.off('read_discipline_categories_changed',CategoriesChanged)
      disciplinedetailStore.off('read_case_changed',CaseChanged)
      disciplinedetailStore.off('read_discipline_changed',ReadDisciplineChanged)
      disciplinedetailStore.off('add_discipline_detail_changed',DisciplineChanged)
      disciplinedetailStore.off('read_for_edit_discipline_changed',ReadDisciplineForEditChanged)
      disciplinedetailStore.off('edit_discipline_detail_changed',EditDisciplineChanged)
      disciplinedetailStore.off('delete_discipline_detail_changed',DeleteDisciplineDetailsChanged)
    })

    self.readCategories = () =>{
      disciplinedetailStore.trigger('read_discipline_categories')
    }
    self.readCategoryCase = () => {
    	self.cases = []
    	self.cases = self.discipline_case.filter(c => {
          return c.category_id == self.refs.disciplineCategoryidInput.value
        })
    }

    self.readCase = () =>{
      disciplinedetailStore.trigger('read_discipline_case')
    }

    self.getDisciplineData = () =>{
      disciplinedetailStore.trigger('read_discipline', self.refs.category_id.value)
    }

    self.add_new_discipline = () =>{
    	self.discipline_view='add_discipline'
    	self.title='Add'
    	self.clearForm()
    	self.update()
    }

     self.close_new_discipline = () =>{
    	self.discipline_view='show_discipline'
    	self.update()
    }

    self.edit = (c,ac) => {
      console.log(c)
      self.id = c
      flatpickr(".date", {
    	allowInput: true,
    	altFormat: "d/m/Y",
    	dateFormat: "Y-m-d",
  		})
      disciplinedetailStore.trigger('read_for_edit_discipline',self.id)
      self.add_new_discipline()
      self.title='Update'

    }

    self.cancelOperation = (ac) => {
      self.disciplines.map(c => {
          c.confirmDelete = false
          c.confirmEdit = false
      })
    }
    self.confirmDelete = (ac) => {
      self.disciplines.map(c => {
        if(c.id != ac.item.ac.id){
          c.confirmDelete = false
        }else{
          c.confirmDelete = true
        }
      })
    }

    self.delete = (ac) => {
      self.loading = true
      disciplinedetailStore.trigger('delete_discipline_detail', ac.item.ac.id)
    }

    self.add = () => {
    	if(!self.refs.disciplineEnrollInput.value){
       		toastr.info("Please enter Enroll No. and try again")
      	}else if(!self.refs.disciplineCategoryidInput.value){
        	toastr.info("Please Select Category and try again")
      	}else if(!self.refs.disciplineDateInput.value){
        	toastr.info("Please enter Date and try again")
      	}else{
     	var obj={}
     	obj['referred_by']=self.refs.disciplineReferredInput.value
     	obj['enroll_number']=self.refs.disciplineEnrollInput.value
     	obj['category_id']=self.refs.disciplineCategoryidInput.value
     	obj['case_id']=self.refs.discipline_case_id.value
     	obj['consult_date']=self.refs.disciplineDateInput.value
     	obj['diagnosis']=self.refs.disciplineDiagnosisInput.value
     	obj['remarks']=self.refs.disciplineRemarksInput.value

     	if(self.title=='Add'){
           	disciplinedetailStore.trigger('add_discipline_detail', obj)
        }else if(self.title=='Update'){
            disciplinedetailStore.trigger('edit_discipline_detail', obj,self.edit_id)
            console.log(obj)
            self.discipline_view='show_discipline'
          }
        }
    }
    self.clearForm = () =>{
    	self.refs.disciplineReferredInput.value = ''
	    self.refs.disciplineEnrollInput.value = ''
	    self.refs.disciplineCategoryidInput.value = ''
	    self.refs.discipline_case_id.value = ''
	    self.refs.disciplineDateInput.value = ''
	    self.refs.disciplineDiagnosisInput.value = ''
	    self.refs.disciplineRemarksInput.value = ''
    }

    disciplinedetailStore.on('read_discipline_categories_changed',CategoriesChanged)
    function CategoriesChanged(categories){
      console.log(categories)
      self.categories = categories
      self.update()
    }

    disciplinedetailStore.on('read_discipline_case_changed',CaseChanged)
    function CaseChanged(discipline_case){
      console.log(discipline_case)
      self.discipline_case = discipline_case
      self.update()
    }

    disciplinedetailStore.on('read_discipline_changed',ReadDisciplineChanged)
    function ReadDisciplineChanged(disciplines){
      console.log(disciplines)
      self.disciplines = disciplines
      self.clearForm()
      self.update()
      console.log(self.disciplines)
     }

    disciplinedetailStore.on('add_discipline_detail_changed',DisciplineChanged)
    function DisciplineChanged(disciplines){
      console.log(disciplines)
      self.disciplines = disciplines
      self.clearForm()
      self.update()
    }

    disciplinedetailStore.on('read_for_edit_discipline_changed',ReadDisciplineForEditChanged)
    function ReadDisciplineForEditChanged(discipline_details){
      console.log(discipline_details)
      flatpickr(".date", {
    	allowInput: true,
    	altFormat: "d/m/Y",
    	dateFormat: "Y-m-d",
  		})
      self.discipline_details = discipline_details

      self.refs.disciplineReferredInput.value = discipline_details[0].referred_by
      self.refs.disciplineEnrollInput.value = discipline_details[0].enroll_number
      self.refs.disciplineCategoryidInput.value = discipline_details[0].category_id
      self.cases = []
	  self.cases = self.discipline_case.filter(c => {
	    return c.category_id == discipline_details[0].category_id
	  })
      self.refs.disciplineDateInput.value = discipline_details[0].c_date
      self.refs.disciplineDiagnosisInput.value = discipline_details[0].diagnosis
      self.refs.disciplineRemarksInput.value = discipline_details[0].remarks
      self.edit_id = discipline_details[0].id
      self.update()
      self.refs.discipline_case_id.value = discipline_details[0].case_id
      console.log(self.discipline_details)
     }

    disciplinedetailStore.on('edit_discipline_detail_changed',EditDisciplineChanged)
    function EditDisciplineChanged(disciplines){
      console.log(disciplines)
      self.disciplines = disciplines
      self.clearForm()
      self.update()
      console.log(self.disciplines)
    }

    disciplinedetailStore.on('delete_discipline_detail_changed',DeleteDisciplineDetailsChanged)
    function DeleteDisciplineDetailsChanged(delete_discipline_details){
      self.getDisciplineData()
      self.update()
     }
});
riot.tag2('discipline-report', '<div class="field has-addons"> <p class="control"> <a class="button {is-active: selected_master == \'discipline-case-wise-report\'}" href="#/discipline-report/discipline-case-wise-report"> <span>Case Wise Report</span> </a> </p> <p class="control"> <a class="button {is-active: selected_master == \'discipline-class-wise-report\'}" href="#/discipline-report/discipline-class-wise-report"> <span>Class Wise Report</span> </a> </p> <p class="control"> <a class="button {is-active: selected_master == \'discipline-date-wise-case-report\'}" href="#/discipline-report/discipline-date-wise-case-report"> <span>Date Wise Case Report</span> </a> </p> </div> <div id="discipline-report-view"></div>', '', '', function(opts) {
    var self = this
    console.log('opts.selected_master')
    console.log(opts.selected_master)
    if(!opts.selected_master){
      self.selected_master = 'discipline-case-wise-report'
    }else{
      self.selected_master = opts.selected_master
    }
});
riot.tag2('discipline-setting', '<div class="field has-addons"> <p class="control"> <a class="button {is-active: selected_master == \'discipline-category\'}" href="#/discipline-setting/discipline-category"> <span>Category</span> </a> </p> <p class="control"> <a class="button {is-active: selected_master == \'discipline-case\'}" href="#/discipline-setting/discipline-case"> <span>Case</span> </a> </p> </div> <div id="discipline-setting-view"></div>', '', '', function(opts) {
    var self = this
    console.log('opts.selected_master')
    console.log(opts.selected_master)
    if(!opts.selected_master){
      self.selected_master = 'discipline-category'
    }else{
      self.selected_master = opts.selected_master
    }
});
riot.tag2('employee-type', '<section class=" is-fluid"> <h2 class="title has-text-centered" style="color: #ff3860;">Employee Types</h2> <div class="flex items-center mt-2 mb-6 no-print"> <div class="bg-green py-1 rounded w-10"> <div class="bg-grey h-px flex-auto"></div> </div> </div> <div class="box"> <div class="columns"> <div class="column is-half"> <div class="field"> <label class="label" for="role">Employee Type</label> <div class="control"> <input class="input" type="text" ref="addEmployeeTypeInput" onkeyup="{addEnter}"> </div> </div> </div> <div class="column is-narrow"> <div class="field"> <div class="control"> <button class="button is-danger has-text-weight-bold adjusted-top" onclick="{add}">{title}</button> </div> </div> </div> </div> </div> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th>SL</th> <th>Employee Type</th> <th></th> </tr> </thead> <tbody> <tr each="{r, i in employeeTypes}"> <td>{i+1}</td> <td>{r.emp_type}</td> <td class="has-text-right"> <div class="inline-flex rounded border border-grey overflow-hidden" hide="{r.confirmDelete}"> <span><a class="button is-small is-rounded" onclick="{edit.bind(this, r)}">Edit</a></span> <span if="{role==\'ADMIN\'}"> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick="{confirmDelete}">Delete</a></span> </div> <div class="table-buttons" if="{r.confirmDelete}"> <span disabled="{loading}" class="button is-small is-rounded" onclick="{delete}"><i class="fa fa-check"></i></span> <span disabled="{loading}" class="button is-small has-text-danger is-rounded" onclick="{cancelOperation}"><i class="fa fa-times"></i></span> </div> </td> </tr> </tbody> </table> </section>', '', '', function(opts) {
	var self = this
    self.on("mount", function(){
      self.title='Create'
      self.role = getCookie('role')
      self.update()
      self.readEmployeeTypes()
    })
    self.on("unmount", function(){
      employeeTypeStore.off('employeeTypes_changed', EmployeeTypesChanged)
    })

    self.readEmployeeTypes = () => {
       employeeTypeStore.trigger('read_employeeTypes')
    }

     self.add = () => {
      if(!self.refs.addEmployeeTypeInput.value){
        toastr.info("Please enter Item and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          console.log('create')
          employeeTypeStore.trigger('add_employeeType', self.refs.addEmployeeTypeInput.value)
        }else if(self.title=='Update'){
          console.log('update')
          employeeTypeStore.trigger('edit_employeeType', self.refs.addEmployeeTypeInput.value,
            self.edit_id)
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
      self.employeeTypes.map(r => {
          r.confirmDelete = false
          r.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.employeeTypes.map(r => {
        if(r.emp_type_id != e.item.r.emp_type_id){
          r.confirmDelete = false
        }else{
          r.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      console.log(e.item.r.emp_type_id);
      employeeTypeStore.trigger('delete_employeeType', e.item.r.emp_type_id)
    }

    self.edit = (r,e) => {
      console.log(r)
      self.title='Update'
      self.refs.addEmployeeTypeInput.value = r.emp_type
      self.edit_id = r.emp_type_id
    }

    employeeTypeStore.on('employeeTypes_changed',EmployeeTypesChanged)
    function EmployeeTypesChanged(employeeTypes){
      console.log(employeeTypes)
      self.title='Create'
      self.refs.addEmployeeTypeInput.value = ''
      self.loading = false
      self.employeeTypes = employeeTypes
      self.update()
      console.log(self.employeeTypes)
    }

});
riot.tag2('employment-status', '<section class="is-fluid"> <h2 class="title" style="color: #ff3860;">Employment Status</h2> <div class="flex items-center mt-2 mb-6 no-print"> <div class="bg-green py-1 rounded w-10"> <div class="bg-grey h-px flex-auto"></div> </div> </div> <div class="box"> <div class="columns"> <div class="column is-half"> <div class="field"> <label class="label" for="employment_status">Employment Status</label> <div class="control"> <input class="input" type="text" ref="addEmploymentStatusInput" onkeyup="{addEnter}"> </div> </div> </div> <div class="column is-narrow"> <div class="field"> <div class="control"> <button class="button is-danger has-text-weight-bold adjusted-top" onclick="{add}">{title}</button> </div> </div> </div> </div> </div> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th>#</th> <th>Employment Status</th> <th></th> </tr> </thead> <tbody> <tr each="{d, i in employmentStatus}"> <td>{i + 1}</td> <td>{d.employment_status}</td> <td class="has-text-right"> <div class="inline-flex rounded border border-grey overflow-hidden" hide="{d.confirmDelete}"> <span><a class="button is-small is-rounded" onclick="{edit.bind(this, d)}">Edit</a></span> <span if="{role==\'ADMIN\'}"> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick="{confirmDelete}">Delete</a></span> </div> <div class="table-buttons" if="{d.confirmDelete}"> <span disabled="{loading}" class="button is-small is-rounded" onclick="{delete}"><i class="fa fa-check"></i></span> <soan disabled="{loading}" class="button is-small has-text-danger is-rounded" onclick="{cancelOperation}"><i class="fa fa-times"></i></span> </div> </td> </tr> </tbody> </table> </section>', '', '', function(opts) {
  var self = this
    self.on("mount", function(){
      self.title='Create'
      self.role = getCookie('role')
      self.update()
      self.readEmploymentStatus()
    })

     self.on("unmount", function(){
      employmentStatusStore.off('employment_status_changed', EmploymentStatusChanged)
    })

    self.readEmploymentStatus = () => {
       employmentStatusStore.trigger('read_employment_status')
    }

     self.add = () => {
      if(!self.refs.addEmploymentStatusInput.value){
        toastr.info("Please enter Levle and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          console.log('create')
          employmentStatusStore.trigger('add_employment_status', self.refs.addEmploymentStatusInput.value)
        }else if(self.title=='Update'){
          console.log('update')
          employmentStatusStore.trigger('edit_employment_status', self.refs.addEmploymentStatusInput.value,
            self.edit_id)
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
      self.employmentStatus.map(d => {
          d.confirmDelete = false
          d.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.employmentStatus.map(d => {
        if(d.employment_status_id != e.item.d.employment_status_id){
          d.confirmDelete = false
        }else{
          d.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      employmentStatusStore.trigger('delete_employment_status', e.item.d.employment_status_id)
    }

    self.edit = (d,e) => {
      console.log(d)
      self.title='Update'
      self.refs.addEmploymentStatusInput.value = d.employment_status
      self.edit_id = d.employment_status_id
    }

    employmentStatusStore.on('employment_status_changed',EmploymentStatusChanged)
    function EmploymentStatusChanged(employmentStatus){
      console.log('employment_status_changed1')
      console.log(employmentStatus)
      self.title='Create'
      self.refs.addEmploymentStatusInput.value = ''
      self.loading = false
      self.employmentStatus = employmentStatus
      self.update()
      console.log('self.employmentStatus')
    }

});
riot.tag2('event-master', '<div class="field has-addons"> <p class="control"> <a class="button {is-active: selected_event_master == \'event-type\'}" href="#/master/event-master/event-type"> <span>Event Type</span> </a> </p> <p class="control"> <a class="button {is-active: selected_event_master == \'new-event\'}" href="#/master/event-master/new-event"> <span>Event</span> </a> </p> <p class="control"> <a class="button {is-active: selected_event_master == \'class-holiday\'}" href="#/master/event-master/class-holiday"> <span>Class Holiday</span> </a> </p> </div> <div id="event-master-view"></div>', '', '', function(opts) {
    var self = this
    console.log('opts.selected_event_master')
    console.log(opts.selected_event_master)
    if(!opts.selected_event_master){
      self.selected_event_master = 'calender'
    }else{
      self.selected_event_master = opts.selected_event_master
    }
});



riot.tag2('event-type', '<section class=" is-fluid"> <h2 class="title has-text-centered" style="color: #ff3860;">Event Type</h2> <div class="flex items-center mt-2 mb-6 no-print"> <div class="bg-green py-1 rounded w-10"> <div class="bg-grey h-px flex-auto"></div> </div> </div> <div class="box"> <div class="columns"> <div class="column is-half"> <div class="field"> <label class="label" for="role">Event Type</label> <div class="control"> <input class="input" type="text" ref="addEventTypeInput" onkeyup="{addEnter}"> </div> </div> </div> <div class="column is-narrow"> <div class="field"> <div class="control"> <button class="button is-danger has-text-weight-bold adjusted-top" onclick="{add}">{title}</button> </div> </div> </div> </div> </div> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th>SL</th> <th>Event Type</th> <th></th> </tr> </thead> <tbody> <tr each="{r, i in eventTypes}"> <td>{i+1}</td> <td>{r.event_type}</td> <td class="has-text-right"> <div class="inline-flex rounded border border-grey overflow-hidden" hide="{r.confirmDelete}"> <span><a class="button is-small is-rounded" onclick="{edit.bind(this, r)}">Edit</a></span> <span if="{role==\'ADMIN\'}"> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick="{confirmDelete}">Delete</a></span> </div> <div class="table-buttons" if="{r.confirmDelete}"> <span disabled="{loading}" class="button is-small is-rounded" onclick="{delete}"><i class="fa fa-check"></i></span> <span disabled="{loading}" class="button is-small has-text-danger is-rounded" onclick="{cancelOperation}"><i class="fa fa-times"></i></span> </div> </td> </tr> </tbody> </table> </section>', '', '', function(opts) {
	var self = this
    self.on("mount", function(){
      self.title='Create'
      self.role = getCookie('role')
      self.update()
      self.readEventTypes()
    })
    self.on("unmount", function(){
      eventTypeStore.off('eventTypes_changed', EventTypesChanged)
    })

    self.readEventTypes = () => {
       eventTypeStore.trigger('read_eventTypes')
    }

     self.add = () => {
      if(!self.refs.addEventTypeInput.value){
        toastr.info("Please enter Item and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          console.log('create')
          eventTypeStore.trigger('add_eventType', self.refs.addEventTypeInput.value)
        }else if(self.title=='Update'){
          console.log('update')
          eventTypeStore.trigger('edit_eventType', self.refs.addEventTypeInput.value,
            self.edit_id)
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
      self.eventTypes.map(r => {
          r.confirmDelete = false
          r.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.eventTypes.map(r => {
        if(r.event_type_id != e.item.r.event_type_id){
          r.confirmDelete = false
        }else{
          r.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      console.log(e.item.r.event_type_id);
      eventTypeStore.trigger('delete_eventType', e.item.r.event_type_id)
    }

    self.edit = (r,e) => {
      console.log(r)
      self.title='Update'
      self.refs.addEventTypeInput.value = r.event_type
      self.edit_id = r.event_type_id
    }

    eventTypeStore.on('eventTypes_changed',EventTypesChanged)
    function EventTypesChanged(eventTypes){
      console.log(eventTypes)
      self.title='Create'
      self.refs.addEventTypeInput.value = ''
      self.loading = false
      self.eventTypes = eventTypes
      self.update()
      console.log(self.eventTypes)
    }

});
riot.tag2('event', '<section class=" is-fluid"> <h2 class="title has-text-centered" style="color: #ff3860;">Activity Event Management</h2> <div class="flex items-center mt-2 mb-6 no-print"> <div class="bg-green py-1 rounded w-10"> <div class="bg-grey h-px flex-auto"></div> </div> </div> <div class="box"> <div class="columns"> <div class="column is-narrow"> <label class="label">Category</label> </div> <div class="column is-narrow"> <div class="control"> <div class="select"> <select ref="category_id"> <option each="{categories}" riot-value="{category_id}">{category_name} </option> </select> </div> </div> </div> <div class="column is-narrow"> <label class="label">Event</label> </div> <div class="column is-narrow"> <div class="control"> <input class=" input" ref="addEventInput" type="text"> </div> </div> <div class="column"> <button class="button is-danger has-text-weight-bold" onclick="{add}">{title} </button> </div> </div> </div> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th>SL</th> <th>Category</th> <th>Event</th> <th></th> </tr> </thead> <tbody> <tr each="{ev, i in eventDataItems}"> <td>{i+1}</td> <td>{ev.category_name}</td> <td>{ev.event_name}</td> <td class="has-text-right"> <div class="inline-flex rounded border border-grey overflow-hidden" hide="{ev.confirmDelete}"> <span><a class="button is-small is-rounded" onclick="{edit.bind(this, ev)}">Edit</a></span> <span if="{role==\'ADMIN\'}"> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick="{confirmDelete}">Delete</a></span> </div> <div class="table-buttons" if="{ev.confirmDelete}"> <span disabled="{loading}" class="button is-small is-rounded" onclick="{delete}"><i class="fa fa-check"></i></span> <span disabled="{loading}" class="button is-small has-text-danger is-rounded" onclick="{cancelOperation}"><i class="fa fa-times"></i></span> </div> </td> </tr> </tbody> </table> </section>', '', '', function(opts) {
	var self = this
    self.on("mount", function(){
      self.title='Create'
      self.role = getCookie('role')
      self.update()
      self.readCategories()
      self.readEvents()
    })
    self.on("unmount", function(){
      eventStore.off('add_event_changed', AddEventsChanged)
      eventStore.off('read_event_changed', ReadEventsChanged)
      eventStore.off('read_categories_changed',CategoriesChanged)
      eventStore.off('edit_event_changed',EditEventsChanged)
      eventStore.off('delete_event_changed',DeleteEventsChanged)
    })

    self.readCategories = () => {
       eventStore.trigger('read_categories')
    }

    self.readEvents = () => {
       eventStore.trigger('read_events')
    }

     self.add = () => {
      if(!self.refs.addEventInput.value){
        toastr.info("Please enter Event and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          console.log('create')
          eventStore.trigger('add_event', self.refs.addEventInput.value,
           self.refs.category_id.value)
        }else if(self.title=='Update'){
          console.log('update')
          eventStore.trigger('edit_event', self.refs.addEventInput.value,
            self.refs.category_id.value, self.edit_id)
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
        if(ev.event_id != e.item.ev.event_id){
          ev.confirmDelete = false
        }else{
          ev.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      eventStore.trigger('delete_event', e.item.ev.event_id)
    }

    self.edit = (ev,e) => {
      console.log(ev)
      self.title='Update'
      self.refs.addEventInput.value = ev.events
      self.refs.category_id.value = ev.category_id
      self.edit_id = ev.event_id
    }

    eventStore.on('add_event_changed',AddEventsChanged)
    function AddEventsChanged(events){
      console.log(events)
      self.title='Create'
      self.refs.addEventInput.value = ''
      self.refs.category_id.value = ''
      self.loading = false
      self.events = events
      self.update()
      self.readEvents()
      console.log(self.events)
    }

    eventStore.on('edit_event_changed',EditEventsChanged)
    function EditEventsChanged(events){
      console.log(events)
      self.title='Create'
      self.refs.addEventInput.value = ''
      self.refs.category_id.value = ''
      self.loading = false
      self.events = events
      self.update()
      self.readEvents()
      console.log(self.events)
    }

    eventStore.on('delete_event_changed',DeleteEventsChanged)
    function DeleteEventsChanged(events){
      console.log(events)
      self.title='Create'
      self.refs.addEventInput.value = ''
      self.refs.category_id.value = ''
      self.loading = false
      self.events = events
      self.update()
      self.readEvents()
      console.log(self.events)
    }

    eventStore.on('read_event_changed',ReadEventsChanged)
    function ReadEventsChanged(events){
      console.log(events)
      self.title='Create'
      self.refs.addEventInput.value = ''
      self.loading = false
      self.events = events
      self.eventDataItems = []
      self.eventDataItems = events
      self.update()
      console.log(self.events)
    }

    eventStore.on('read_categories_changed',CategoriesChanged)
    function CategoriesChanged(categories){
      console.log(categories)
      self.categories = categories
      self.update()
      console.log(self.categories)
    }

});
riot.tag2('exam-scheme', '<loading-bar if="{loading}"></loading-bar> <section class=" is-fluid" show="{view==\'exam-schemes\'}"> <div class="level"> <div class="level-left"> <h2 class="title" style="color: #ff3860;">Exam Scheme</h2> </div> <div class="level-right"> <button class="button is-warning is-rounded" onclick="{openExamSchemeModal}"> <span class="icon"> <span class="fas fa-plus"></span> </span> </button> <button class="button is-warning is-rounded" onclick="{readExamSchemes}" style="margin-left:2px"> <span class="icon"> <span class="fas fa-sync-alt"></span> </span> </button> </div> </div> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th class="slno">SL</th> <th>Scheme Name</th> <th></th> </tr> </thead> <tbody> <tr each="{c, i in examSchemes}"> <td>{i+1}</td> <td>{c.scheme_name}</td> <td class="has-text-right"> <div class="inline-flex rounded border border-grey overflow-hidden" hide="{c.confirmDelete}"> <span><a class="button is-small is-rounded" onclick="{edit.bind(this, c)}">Edit</a></span> <span><a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick="{confirmDelete}">Delete</a></span> <span><a class="button is-small is-rounded" rel="nofollow" onclick="{readExams.bind(this, c)}">Exams</a></span> <span><a class="button is-small is-rounded" rel="nofollow" onclick="{readClasses.bind(this, c)}">Classes</a></span> </div> <div class="table-buttons" if="{c.confirmDelete}"> <span disabled="{loading}" class="button is-small is-rounded" onclick="{delete}"><i class="fa fa-check"></i></span> <span disabled="{loading}" class="button is-small has-text-danger is-rounded" onclick="{cancelOperation}"><i class="fa fa-times"></i></span> </div> </td> </tr> </tbody> </table> </section> <div id="examSchemeModal" class="modal "> <div class="modal-background"></div> <div class="modal-card"> <header class="modal-card-head"> <p class="modal-card-title">{title} Exam Scheme</p> </header> <section class="modal-card-body"> <div class="columns"> <div class="column"> <div class="field"> <label class="label" for="role">Exam Scheme</label> <div class="control"> <input class="input" type="text" ref="schemeNameInput"> </div> </div> </div> </div> </section> <footer class="modal-card-foot"> <button class="button is-danger" onclick="{add}">{title}</button> <button class="button" id="item-modal-close" onclick="{closeExamSchemeModal}">Cancel</button> </footer> </div> </div> <section class=" is-fluid" show="{view==\'exams\'}"> <div class="level"> <div class="level-left"> <h2 class="title" style="color: #ff3860;">Exam Under : {exam_scheme}</h2> </div> <div class="level-right"> <button class="button is-warning is-rounded" onclick="{backToExamSchemes}"> <span class="icon"> <span class="fas fa-arrow-left"></span> </span> </button> <button class="button is-warning is-rounded" onclick="{openExamsForm}" style="margin-left:2px"> <span class="icon"> <span class="fas fa-plus"></span> </span> </button> <button class="button is-warning is-rounded" onclick="{refreshExams}" style="margin-left:2px"> <span class="icon"> <span class="fas fa-sync-alt"></span> </span> </button> </div> </div> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th class="slno">SL</th> <th>Exam</th> <th>Start Date</th> <th>End Date</th> <th>Last Login Date</th> <th>Assessment Type</th> <th>Exam Group</th> <th></th> </tr> </thead> <tbody> <tr each="{c, i in exams}"> <td>{i+1}</td> <td>{c.exam_type}</td> <td>{c.start_date}</td> <td>{c.end_date}</td> <td>{c.last_login_date}</td> <td>{c.assessment}</td> <td>{c.exam_group}</td> <td class="has-text-right"> <div class="inline-flex rounded border border-grey overflow-hidden" hide="{c.confirmDelete}"> <span><a class="button is-small is-rounded" onclick="{editExam.bind(this, c)}">Edit</a></span> <span><a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick="{confirmExamDelete}">Delete</a></span> </div> <div class="table-buttons" if="{c.confirmDelete}"> <span disabled="{loading}" class="button is-small is-rounded" onclick="{deleteExam}"><i class="fa fa-check"></i></span> <span disabled="{loading}" class="button is-small has-text-danger is-rounded" onclick="{cancelExamDeleteOperation}"><i class="fa fa-times"></i></span> </div> </td> </tr> </tbody> </table> </section> <section class=" is-fluid" show="{view==\'exams-form\'}"> <div class="level"> <div class="level-left"> <h2 class="title" style="color: #ff3860;">{title_exams} Exam Under : {exam_scheme}</h2> </div> <div class="level-right"> <button class="button is-warning is-rounded" onclick="{backToExams}"> <span class="icon"> <span class="fas fa-arrow-left"></span> </span> </button> </div> </div> <div class="columns"> <div class="column"> <div class="field"> <label class="label" for="role">Exam</label> <div class="control"> <input class="input" type="text" ref="examTypeInput"> </div> </div> <div class="field"> <label class="label" for="role">Start Date</label> <div class="control"> <input class="input date" type="text" ref="startDateInput"> </div> </div> </div> <div class="column"> <div class="field"> <label class="label" for="role">End Date</label> <div class="control"> <input class="input date" type="text" ref="endDateInput"> </div> </div> <div class="field"> <label class="label" for="role">Last Login Date</label> <div class="control"> <input class="input date" type="text" ref="lastLoginInput"> </div> </div> </div> <div class="column"> <div class="field"> <label class="label" for="role">Assessment Type</label> <div class="control"> <div class="select is-fullwidth"> <select ref="assessmentInput"> <option value="H">Half Yearly</option> <option value="F">Final</option> </select> </div> </div> </div> <div class="field"> <label class="label" for="role">Exam Group</label> <div class="control"> <div class="select is-fullwidth"> <select ref="examGroupInput"> <option>First</option> <option>Second</option> </select> </div> </div> </div> </div> </div> <div class="level"> <div class="level-left"> </div> <div class="level-right"> <button class="button is-danger" onclick="{addEditExam}">{title_exams}</button> <button class="button ml5" id="item-modal-close" onclick="{backToExams}">Cancel</button> </div> </div> </section> <section class=" is-fluid" show="{view==\'classes\'}"> <div class="level"> <div class="level-left"> <h2 class="title" style="color: #ff3860;">Classes Under : {exam_scheme}</h2> </div> <div class="level-right"> <button class="button is-warning is-rounded" onclick="{backToExamSchemes}"> <span class="icon"> <span class="fas fa-arrow-left"></span> </span> </button> <button class="button is-warning is-rounded ml5" onclick="{refreshClasses}"> <span class="icon"> <span class="fas fa-sync-alt"></span> </span> </button> </div> </div> <div class="columns is-multiline is-mobile"> <div class="column"> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th class="slno">SL</th> <th>Free Classes</th> <th></th> </tr> </thead> <tbody> <tr each="{c, i in freeClasses}"> <td>{i+1}</td> <td>{c.standard}</td> <td class="has-text-right"> <input type="checkbox" checked="{selected}" id="{\'freeClassCheckBox\'+c.standard_id}" onclick="{selectFreeClass.bind(this,c)}"> </td> </tr> </tbody> </table> </div> <div class="column is-vertical-center is-narrow has-text-centered is-multiline"> <table> <tr> <td> <button class="button" onclick="{assignStandard}" style="margin-top:20px;">Assign classes <span style="margin-left:10px" class="fas fa-angle-double-right"></span></button> </td> </tr> <tr> <td> <button class="button" onclick="{freeUpStandard}" style="margin-top:20px;"><span style="margin-right:10px;" class="fas fa-angle-double-left"></span> Free up classes</button> </td> </tr> </table> </div> <div class="column"> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th></th> <th class="slno">SL</th> <th>Assigned Classes</th> </tr> </thead> <tbody> <tr each="{c, i in assignedClasses}"> <td class="has-text-right"> <input type="checkbox" checked="{selected}" id="{\'assignedClassCheckBox\'+c.standard_id}" onclick="{selectAssigndClass.bind(this,c)}"> </td> <td>{i+1}</td> <td>{c.standard}</td> </tr> </tbody> </table> </div> </div> </section>', '', '', function(opts) {
	var self = this
    self.on("mount", function(){
      self.title = 'Add'
      self.title_exams = 'Add'
      self.view = 'exam-schemes'
      self.loading = false;
      self.update()
      flatpickr(".date", {
        allowInput: true,
        dateFormat: "d/m/Y",
      })
      self.readExamSchemes()
    })
    self.on("unmount", function(){
      examSchemeStore.off('exam_scheme_changed', ExamSchemesChanged)
      examSchemeStore.off('add_exam_scheme_changed',AddExamSchemesChanged)
      examSchemeStore.off('delete_exam_scheme_changed',DeleteExamSchemesChanged)
      examSchemeStore.off('read_exams_changed',ExamSChanged)
      examSchemeStore.off('add_exams_changed',ExamsAddChanged)
      examSchemeStore.off('delete_exam_changed',ExamsDeleteChanged)
      examSchemeStore.off('read_classes_changed',ReadClassesChanged)
      examSchemeStore.off('assign_standard_changed',AssignStandardChanged)
    })

    self.readExamSchemes = () => {
       self.loading = true;
       examSchemeStore.trigger('read_exam_schemes')
    }

    self.openExamSchemeModal = () => {
      self.title = 'Add'
      $("#examSchemeModal").addClass("is-active");
    }

    self.closeExamSchemeModal = () => {
      $("#examSchemeModal").removeClass("is-active");
    }

    self.add = () => {
      if(!self.refs.schemeNameInput.value){
        toastr.info("Please enter Exam Scheme and try again")
      }else{
        self.loading = true
        if(self.title=='Add'){
          examSchemeStore.trigger('add_exam_scheme', self.refs.schemeNameInput.value)
        }else if(self.title=='Update'){
          examSchemeStore.trigger('update_exam_scheme', self.refs.schemeNameInput.value,self.edit_id)
        }
      }
    }

    self.edit = (c,e) => {
      console.log(c)
      self.title='Update'
      $("#examSchemeModal").addClass("is-active");
      self.refs.schemeNameInput.value = c.scheme_name
      self.edit_id = c.scheme_id
    }

    self.cancelOperation = (e) => {
      self.examSchemes.map(c => {
          c.confirmDelete = false
          c.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.examSchemes.map(c => {
        if(c.scheme_id != e.item.c.scheme_id){
          c.confirmDelete = false
        }else{
          c.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      examSchemeStore.trigger('delete_exam_scheme', e.item.c.scheme_id)
    }

    self.readExams = (c,e) => {
      console.log(c)
      self.exam_scheme = c.scheme_name
      self.scheme_id = c.scheme_id
      self.loading = true
      examSchemeStore.trigger('read_exams', c.scheme_id)
    }

    self.refreshExams = () =>{
      self.loading = true
      examSchemeStore.trigger('read_exams', self.scheme_id)
    }

    self.openExamsForm = () => {
      self.title_exams = 'Add'
      self.view = 'exams-form'
    }

    self.closeExamsModal = () => {
      $("#examsModal").removeClass("is-active");
    }

    self.backToExamSchemes = () => {
      self.view = 'exam-schemes'
    }

    self.backToExams = () => {
      self.view = 'exams'
    }

    self.addEditExam = () =>{
      let error = '';

      console.log(error.length)

      if(self.refs.examTypeInput.value==''){
        error = error + "Please Enter Exam, "
      }

      if(self.refs.endDateInput.value==''){
        error = error + "Please Enter End Date, "
      }

      if(self.refs.startDateInput.value==''){
        error = error + "Please Enter Start Date, "
      }

      if(self.refs.assessmentInput.value==''){
        error = error + "Please Enter Assessment Type, "
      }

      if(self.refs.lastLoginInput.value==''){
        error = error + "Please Enter Last Login Date, "
      }

      if(self.refs.examGroupInput.value==''){
        error = error + "Please Enter Exam Group, "
      }

      console.log(error)
      console.log(error.length)

      if(error.length!=0){
        toastr.error(error)
        return
      }else{
        var obj = {}
        obj['scheme_id'] = self.scheme_id
        obj['exam_type'] = self.refs.examTypeInput.value
        obj['assessment'] = self.refs.assessmentInput.value
        obj['exam_group'] = self.refs.examGroupInput.value
        obj['start_date'] = convertDate(self.refs.startDateInput.value)
        obj['end_date'] = convertDate(self.refs.endDateInput.value)
        obj['last_login_date'] = convertDate(self.refs.lastLoginInput.value)
        console.log(obj)

        self.loading = true
        if(self.title_exams=='Add'){
          examSchemeStore.trigger('add_exam', obj)
        }else if(self.title_exams=='Update'){
          examSchemeStore.trigger('update_exam', obj,self.edit_exam_type_id)
        }

      }

    }

    self.clearExamForm = () => {
      self.refs.examTypeInput.value = ''
      self.refs.endDateInput.value = ''
      self.refs.startDateInput.value = ''
      self.refs.assessmentInput.value = ''
      self.refs.lastLoginInput.value = ''
      self.refs.examGroupInput.value = ''
    }

    self.editExam = (c,e) => {
      console.log(c)
      self.title_exams='Update'
      self.view = 'exams-form'
      self.refs.examTypeInput.value = c.exam_type
      self.refs.endDateInput.value = c.end_date
      self.refs.startDateInput.value = c.start_date
      self.refs.assessmentInput.value = c.assessment
      self.refs.lastLoginInput.value = c.last_login_date
      self.refs.examGroupInput.value = c.exam_group
      self.edit_exam_type_id = c.exam_type_id
    }

    self.cancelExamDeleteOperation = (e) => {
      self.exams.map(c => {
          c.confirmDelete = false
          c.confirmEdit = false
      })
    }

    self.confirmExamDelete = (e) => {
      self.exams.map(c => {
        if(c.exam_type_id != e.item.c.exam_type_id){
          c.confirmDelete = false
        }else{
          c.confirmDelete = true
        }
      })
    }

    self.deleteExam = (e) => {
      self.loading = true
      examSchemeStore.trigger('delete_exam', e.item.c.exam_type_id)
    }

    self.readClasses = (c) => {
      self.exam_scheme = c.scheme_name
      self.scheme_id = c.scheme_id
      self.loading = true
      examSchemeStore.trigger('read_classes', c.scheme_id)
    }

    self.refreshClasses = () =>{
      self.loading = true
      examSchemeStore.trigger('read_classes', self.scheme_id)
    }

    self.selectFreeClass = (standard,e) => {
        self.freeClasses.map(i=>{
          if(standard.standard_id==i.standard_id){
            i.selected=!i.selected
          }
        })
    }

    self.selectAssigndClass = (standard,e) => {
        self.assignedClasses.map(i=>{
          if(standard.standard_id==i.standard_id){
            i.selected=!i.selected
          }
        })
        console.log(self.assignedClasses)
    }

    self.assignStandard = () =>{
      let classes_to_assign = self.freeClasses.filter(c=>{
        return c.selected == true
      })
      self.loading = true
      examSchemeStore.trigger('assign_standard', self.scheme_id, classes_to_assign)
    }

    self.freeUpStandard = () =>{
      let classes_to_free = self.assignedClasses.filter(c=>{
        return c.selected == true
      })

      examSchemeStore.trigger('free_up_standard', self.scheme_id, classes_to_free)
    }

    examSchemeStore.on('exam_scheme_changed',ExamSchemesChanged)
    function ExamSchemesChanged(examSchemes){
      console.log(examSchemes)
      self.loading = false
      self.examSchemes = []
      self.examSchemes = examSchemes
      self.update()
      console.log(self.examSchemes)
    }

    examSchemeStore.on('add_exam_scheme_changed',AddExamSchemesChanged)
    function AddExamSchemesChanged(examSchemes){
      self.refs.schemeNameInput.value=''
      self.closeExamSchemeModal()
      self.loading = false
      self.examSchemes = []
      self.examSchemes = examSchemes
      self.update()
      console.log(self.examSchemes)
    }

    examSchemeStore.on('delete_exam_scheme_changed',DeleteExamSchemesChanged)
    function DeleteExamSchemesChanged(examSchemes){
      self.loading = false
      self.examSchemes = []
      self.examSchemes = examSchemes
      self.update()
      console.log(self.examSchemes)
    }

    examSchemeStore.on('read_exams_changed',ExamSChanged)
    function ExamSChanged(exams){
      self.loading = false
      self.exams = []
      self.exams = exams
      self.view='exams'
      self.update()
    }

    examSchemeStore.on('add_exam_changed',ExamsAddChanged)
    function ExamsAddChanged(exams){
      self.loading = false
      self.clearExamForm()
      self.view='exams'
      self.exams = []
      self.exams = exams
      self.update()
    }

    examSchemeStore.on('delete_exam_changed',ExamsDeleteChanged)
    function ExamsDeleteChanged(exams){
      self.loading = false
      self.exams = []
      self.exams = exams
      self.update()
    }

    examSchemeStore.on('read_classes_changed',ReadClassesChanged)
    function ReadClassesChanged(freeClasses,assignedClasses){
      self.loading = false
      self.freeClasses = []
      self.freeClasses = freeClasses
      self.freeClasses.map(c => {
          c.selected=false
      })
      console.log(freeClasses)
      self.assignedClasses = []
      self.assignedClasses = assignedClasses
      self.assignedClasses.map(c => {
          c.selected=false
      })
      self.view='classes'
      self.update()
    }

    examSchemeStore.on('assign_standard_changed',AssignStandardChanged)
    function AssignStandardChanged(classes_assigned){
      self.loading = false

      self.refreshClasses()

    }

});
riot.tag2('subject-group-map', '<loading-bar if="{loading}"></loading-bar> <section class=" is-fluid" show="{view==\'subject-group-maps\'}"> <div class="level"> <div class="level-left"> <h2 class="title" style="color: #ff3860;">Subject Group</h2> </div> <div class="level-right"> <button class="button is-warning is-rounded" onclick="{openSubjectGroupModal}"> <span class="icon"> <span class="fas fa-plus"></span> </span> </button> <button class="button is-warning is-rounded" onclick="{readSubjectGroupMap}" style="margin-left:2px"> <span class="icon"> <span class="fas fa-sync-alt"></span> </span> </button> </div> </div> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th class="slno">SL</th> <th>Subject Group</th> <th></th> </tr> </thead> <tbody> <tr each="{c, i in subjectGroupMaps}"> <td>{i+1}</td> <td>{c.subject_group}</td> <td class="has-text-right"> <div class="inline-flex rounded border border-grey overflow-hidden" hide="{c.confirmDelete}"> <span><a class="button is-small is-rounded" onclick="{edit.bind(this, c)}">Edit</a></span> <span><a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick="{confirmDelete}">Delete</a></span> <span><a class="button is-small is-rounded" rel="nofollow" onclick="{readSubjects.bind(this, c)}">Subjects</a></span> </div> <div class="table-buttons" if="{c.confirmDelete}"> <span disabled="{loading}" class="button is-small is-rounded" onclick="{delete}"><i class="fa fa-check"></i></span> <span disabled="{loading}" class="button is-small has-text-danger is-rounded" onclick="{cancelOperation}"><i class="fa fa-times"></i></span> </div> </td> </tr> </tbody> </table> </section> <div id="subjectGroupModal" class="modal "> <div class="modal-background"></div> <div class="modal-card"> <header class="modal-card-head"> <p class="modal-card-title">{title} Subject Group</p> </header> <section class="modal-card-body"> <div class="columns"> <div class="column"> <div class="field"> <label class="label" for="role">Subject Group</label> <div class="control"> <input class="input" type="text" ref="subjectGroupInput"> </div> </div> </div> </div> </section> <footer class="modal-card-foot"> <button class="button is-danger" onclick="{add}">{title}</button> <button class="button" id="item-modal-close" onclick="{closeSubjectGroupModal}">Cancel</button> </footer> </div> </div> <section class=" is-fluid" show="{view==\'subjects\'}"> <div class="level"> <div class="level-left"> <h2 class="title" style="color: #ff3860;">Subjects Under : {subject_group}</h2> </div> <div class="level-right"> <button class="button is-warning is-rounded" onclick="{backToSubjectGroupMap}"> <span class="icon"> <span class="fas fa-arrow-left"></span> </span> </button> <button class="button is-warning is-rounded ml5" onclick="{refreshSubjects}"> <span class="icon"> <span class="fas fa-sync-alt"></span> </span> </button> </div> </div> <div class="columns is-multiline is-mobile"> <div class="column"> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th class="slno">SL</th> <th>Free Subjects</th> <th>Short Name</th> <th></th> </tr> </thead> <tbody> <tr each="{c, i in freeSubjects}"> <td>{i+1}</td> <td>{c.subject_name}</td> <td>{c.subject_short_name}</td> <td class="has-text-right"> <input type="checkbox" checked="{selected}" id="{\'freeSubjectCheckBox\'+c.subject_id}" onclick="{selectFreeSubject.bind(this,c)}"> </td> </tr> </tbody> </table> </div> <div class="column is-vertical-center is-narrow has-text-centered is-multiline"> <table> <tr> <td> <button class="button" onclick="{assignSubjects}" style="margin-top:20px;">Assign subjects <span style="margin-left:10px" class="fas fa-angle-double-right"></span></button> </td> </tr> <tr> <td> <button class="button" onclick="{freeUpStandard}" style="margin-top:20px;"><span style="margin-right:10px;" class="fas fa-angle-double-left"></span> Free up subjects</button> </td> </tr> </table> </div> <div class="column"> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th></th> <th class="slno">SL</th> <th>Assigned Subjects</th> <th>Short Name</th> </tr> </thead> <tbody> <tr each="{c, i in assignedSubjects}"> <td class="has-text-right"> <input type="checkbox" checked="{selected}" id="{\'assignedSubjectCheckBox\'+c.subject_id}" onclick="{selectAssigndSubject.bind(this,c)}"> </td> <td>{i+1}</td> <td>{c.subject_name}</td> <td>{c.subject_short_name}</td> </tr> </tbody> </table> </div> </div> </section>', '', '', function(opts) {
	var self = this
    self.on("mount", function(){
      self.title = 'Add'
      self.title_exams = 'Add'
      self.view = 'subject-group-maps'
      self.loading = false;
      self.update()
      flatpickr(".date", {
        allowInput: true,
        dateFormat: "d/m/Y",
      })
      self.readSubjectGroupMap()
    })
    self.on("unmount", function(){
      examSubjectGroupMapStore.off('subject_group_changed', SubjectGroupMapChanged)
      examSubjectGroupMapStore.off('add_subject_group_changed',AddSubjectGroupMapChanged)
      examSubjectGroupMapStore.off('delete_subject_group_changed',DeleteSubjectGroupMapChanged)
      examSubjectGroupMapStore.off('read_subjects_changed',ReadSubjectsChanged)
      examSubjectGroupMapStore.off('assign_subjects_changed',AssignStandardChanged)
    })

    self.readSubjectGroupMap = () => {
       self.loading = true;
       examSubjectGroupMapStore.trigger('read_subject_groups')
    }

    self.openSubjectGroupModal = () => {
      self.title = 'Add'
      $("#subjectGroupModal").addClass("is-active");
    }

    self.closeSubjectGroupModal = () => {
      $("#subjectGroupModal").removeClass("is-active");
    }

    self.add = () => {
      if(!self.refs.subjectGroupInput.value){
        toastr.info("Please enter Subject Group and try again")
      }else{
        self.loading = true
        if(self.title=='Add'){
          examSubjectGroupMapStore.trigger('add_subject_group', self.refs.subjectGroupInput.value)
        }else if(self.title=='Update'){
          examSubjectGroupMapStore.trigger('update_subject_group', self.refs.subjectGroupInput.value,self.edit_id)
        }
      }
    }

    self.edit = (c,e) => {
      console.log(c)
      self.title='Update'
      $("#subjectGroupModal").addClass("is-active");
      self.refs.subjectGroupInput.value = c.subject_group
      self.edit_id = c.id
    }

    self.cancelOperation = (e) => {
      self.subjectGroupMaps.map(c => {
          c.confirmDelete = false
          c.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.subjectGroupMaps.map(c => {
        if(c.id != e.item.c.id){
          c.confirmDelete = false
        }else{
          c.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      examSubjectGroupMapStore.trigger('delete_subject_group', e.item.c.id)
    }

    self.readSubjects = (c) => {
      self.subject_group = c.subject_group
      self.id = c.subject_group
      self.loading = true
      examSubjectGroupMapStore.trigger('read_subjects', c.subject_group)
    }

    self.refreshSubjects = () =>{
      self.loading = true
      examSubjectGroupMapStore.trigger('read_subjects', self.id)
    }

    self.selectFreeSubject = (subject,e) => {
        self.freeSubjects.map(i=>{
          if(subject.subject_id==i.subject_id){
            i.selected=!i.selected
          }
        })
    }

    self.selectAssigndSubject = (subject,e) => {
        self.assignedSubjects.map(i=>{
          if(subject.subject_id==i.subject_id){
            i.selected=!i.selected
          }
        })
        console.log(self.assignedSubjects)
    }

    self.assignSubjects = () =>{
      let subjects_to_assign = self.freeSubjects.filter(c=>{
        return c.selected == true
      })
      console.log(self.id)
      console.log(subjects_to_assign)
      self.loading = true
      examSubjectGroupMapStore.trigger('assign_subjects', self.id, subjects_to_assign)
    }

    self.freeUpStandard = () =>{
      let subjects_to_free = self.assignedSubjects.filter(c=>{
        return c.selected == true
      })

      examSubjectGroupMapStore.trigger('free_up_subject', self.id, subjects_to_free)
    }
    self.backToSubjectGroupMap = () =>{
      self.view='subject-group-maps'
    }

    examSubjectGroupMapStore.on('subject_group_changed',SubjectGroupMapChanged)
    function SubjectGroupMapChanged(subjectGroupMaps){
      console.log(subjectGroupMaps)
      self.loading = false
      self.subjectGroupMaps = []
      self.subjectGroupMaps = subjectGroupMaps
      self.update()
      console.log(self.subjectGroupMaps)
    }

    examSubjectGroupMapStore.on('add_subject_group_changed',AddSubjectGroupMapChanged)
    function AddSubjectGroupMapChanged(subjectGroupMaps){
      self.refs.subjectGroupInput.value=''
      self.closeSubjectGroupModal()
      self.loading = false
      self.subjectGroupMaps = []
      self.subjectGroupMaps = subjectGroupMaps
      self.update()
      console.log(self.subjectGroupMaps)
    }

    examSubjectGroupMapStore.on('delete_subject_group_changed',DeleteSubjectGroupMapChanged)
    function DeleteSubjectGroupMapChanged(subjectGroupMaps){
      self.loading = false
      self.subjectGroupMaps = []
      self.subjectGroupMaps = subjectGroupMaps
      self.update()
      console.log(self.subjectGroupMaps)
    }

    examSubjectGroupMapStore.on('read_subjects_changed',ReadSubjectsChanged)
    function ReadSubjectsChanged(freeSubjects,assignedSubjects){
      self.loading = false
      self.freeSubjects = []
      self.freeSubjects = freeSubjects
      self.freeSubjects.map(c => {
          c.selected=false
      })
      console.log(freeSubjects)
      self.assignedSubjects = []
      self.assignedSubjects = assignedSubjects
      self.assignedSubjects.map(c => {
          c.selected=false
      })
      self.view='subjects'
      self.update()
    }

    examSubjectGroupMapStore.on('assign_subjects_changed',AssignStandardChanged)
    function AssignStandardChanged(subjects_assigned){
      self.loading = false

      self.refreshSubjects()

    }

});
riot.tag2('fee-head', '<section class=" is-fluid"> <h2 class="title has-text-centered" style="color: #ff3860;">Fee Head Management</h2> <div class="flex items-center mt-2 mb-6 no-print"> <div class="bg-green py-1 rounded w-10"> <div class="bg-grey h-px flex-auto"></div> </div> </div> <div class="box"> <div class="columns"> <div class="column is-half"> <div class="field"> <label class="label" for="role">Head</label> <div class="control"> <input class="input" type="text" ref="addHeadInput" onkeyup="{addEnter}"> </div> </div> </div> <div class="column is-narrow"> <div class="field"> <div class="control"> <button class="button is-danger has-text-weight-bold adjusted-top" onclick="{add}">{title}</button> </div> </div> </div> </div> </div> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th>#</th> <th>Head</th> <th></th> </tr> </thead> <tbody> <tr each="{c, i in heads}"> <td>{i+1}</td> <td>{c.head}</td> <td class="has-text-right"> <div class="inline-flex rounded border border-grey overflow-hidden" hide="{c.confirmDelete}"> <span><a class="button is-small is-rounded" onclick="{edit.bind(this, c)}">Edit</a></span> <span if="{role==\'ADMIN\'}"> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick="{confirmDelete}">Delete</a></span> </div> <div class="table-buttons" if="{c.confirmDelete}"> <span disabled="{loading}" class="button is-small is-rounded" onclick="{delete}"><i class="fa fa-check"></i></span> <span disabled="{loading}" class="button is-small has-text-danger is-rounded" onclick="{cancelOperation}"><i class="fa fa-times"></i></span> </div> </td> </tr> </tbody> </table> </section>', '', '', function(opts) {
 var self = this
    self.on("mount", function(){
      self.title='Create'
      self.role = getCookie('role')
      self.update()
      self.readHeads()
    })
    self.on("unmount", function(){
      feeHeadStore.off('heads_changed', HeadsChanged)
    })

    self.readHeads = () => {
       feeHeadStore.trigger('read_heads')
    }

    self.add = () => {
      if(!self.refs.addHeadInput.value){
        toastr.info("Please enter Head and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          console.log('create')
          feeHeadStore.trigger('add_head', self.refs.addHeadInput.value)
        }else if(self.title=='Update'){
          console.log('update')
          feeHeadStore.trigger('edit_head', self.refs.addHeadInput.value,
            self.head_id)
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

   self.edit = (c,e) => {
   	  console.log("here");
      console.log(c)
      self.title='Update'
      self.refs.addHeadInput.value = c.head
      self.head_id = c.head_id
    }

    self.cancelOperation = (e) => {
      self.heads.map(c => {
          c.confirmDelete = false
          c.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.heads.map(c => {
        if(c.head_id != e.item.c.head_id){
          c.confirmDelete = false
        }else{
          c.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      feeHeadStore.trigger('delete_head', e.item.c.head_id)
    }

    feeHeadStore.on('heads_changed',HeadsChanged)
    function HeadsChanged(heads){
      console.log(heads)
      self.title='Create'
      self.refs.addHeadInput.value = ''
      self.loading = false
       self.heads = []
      self.heads = heads
      self.update()
      console.log(self.heads)
    }

});
riot.tag2('fee-plan', '<section class="container is-fluid" show="{fee_plan_view ==\'show_fee_plan\'}"> <div class="level"> <div class="level-left"> <h2 class="title" style="color: #ff3860;">Fee Plan Management</h2> </div> <div class="level-right"> <button class="button is-warning is-rounded" onclick="{add_new_fee_plan}"> <span class="icon"> <span class="fas fa-plus"></span> </span> <span>Add Fee Plan</span> </button> </div> </div> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th>SL</th> <th>Fee Plan Name</th> <th>Standard</th> <th></th> </tr> </thead> <tbody> <tr each="{s, i in feePlans}"> <td>{i+1}</td> <td>{s.fee_plan_name}</td> <td>{s.standard}</td> <td class="has-text-right"> <div class="inline-flex rounded border border-grey overflow-hidden" hide="{s.confirmDelete}"> <span><a class="button is-small is-rounded " onclick="{viewFeeSlip.bind(this, s)}">View/Edit/Del Slips</a></span> <span><a class="button is-small is-rounded is-success" onclick="{mapHead.bind(this, s.fee_plan_id)}">Map Fee Head</a></span> <span> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick="{confirmDelete}">Delete</a></span> </div> <div class="table-buttons" if="{s.confirmDelete}"> <span disabled="{loading}" class="button is-small is-rounded" title="Delete" onclick="{delete}"><i class="fa fa-check"></i></span> <span disabled="{loading}" class="button is-small has-text-danger is-rounded" title="Cancel" onclick="{cancelOperation}"><i class="fa fa-times"></i></span> </div> </td> </tr> </tbody> </table> </section> <section class="container is-fluid" show="{fee_plan_view ==\'add_fee_plan\'}"> <div class="level"> <div class="level-left"> <div class="level-item"> <h2 class="title" style="color: #ff3860;">{title} Fee Plan</h2> </div> </div> <div class="level-right"> <a class="button" onclick="{close_new_fee_plan}">Back</a> </div> </div> <div class="flex items-center mt-2 mb-6 no-print"> <div class="bg-green py-1 rounded w-10"></div> <div class="bg-grey h-px flex-auto"></div> </div> <div class="columns"> <div class="column is-full"> <div class="box max-w-md"> <div class="columns is-multiline"> <div class="column is-two-fifths"> <div class="field"> <label class="label">Plan Name</label> <input class="input" ref="fee_plan_name" type="text"> </div> </div> <div class="column is-three-fifths"> <div class="field"> <label class="label">Description</label> <input class="input" ref="fee_plan_description" type="text"> </div> </div> <div class="column is-full"> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th width="50">Select</th> <th>Standard</th> </tr> </thead> <tbody> <tr each="{r, i in standards}"> <td class="has-text-right"> <input type="checkbox" class="id_check_box" checked="{r.done}" id="{\'standardId\' + r.standard_id}" onclick="{selectStandard.bind(this,r)}"> </td> <td>{r.standard}</td> </tr> </tbody> </table> </div> <div class="column is-full"> <button class="button is-danger" onclick="{add}">Submit</button> </div> </div> </div> </div> </div> </section> <section class="container is-fluid" show="{fee_plan_view ==\'map_fee_head\'}"> <div class="level"> <div class="level-left"> <div class="level-item"> <h2 class="title" style="color: #ff3860;">Map Fee Plan with Fee Heads by Fee Slip</h2> </div> </div> <div class="level-right"> <a class="button" onclick="{close_new_fee_plan}">Back</a> </div> </div> <div class="columns"> <div class="column is-full"> <div class="box max-w-md"> <div class="columns is-multiline"> <div class="columns"> <div class="column is-narrow"> <label class="label">Select Fee Slip</label> </div> <div class="column is-narrow"> <div class="control"> <div class="select is-fullwidth"> <select ref="fee_slip_name"> <option value=""></option> <option each="{slips}" riot-value="{fee_slip_name}">{fee_slip_name}</option> </select> </div> </div> </div> <div class="column is-narrow"> <label class="label">Last Date</label> </div> <div class="column is-narrow"> <div class="control"> <input class="date input flatpickr-input form-control input" ref="lastDateInput" placeholder="" tabindex="0" type="text" readonly="readonly"> </div> </div> </div> <div class="column is-full"> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th width="50">Head</th> <th style="width:100px">Amount</th> </tr> </thead> <tbody> <tr each="{r, i in heads}"> <td>{r.head}</td> <td><input class="input" id="head_amount{r.head_id}" type="text" value="0" onkeyup="{getTotal}"></td> </tr> </tbody> <thead> <tr> <th width="50" class="has-text-right">Total</th> <th>{grandTotal}</th> </tr> </thead> </table> </div> <div class="column is-full"> <button class="button is-danger" style="float:right" onclick="{addHeadAmount}">Submit</button> </div> </div> </div> </div> </div> </section> <section class="container is-fluid" show="{fee_plan_view ==\'edit_fee_head\'}"> <div class="level"> <div class="level-left"> <div class="level-item"> <h4 class="title" style="color: #ff3860;">Edit Fee Slip Heads</h4> </div> </div> <div class="level-right"> <a class="button" onclick="{close_new_fee_plan}">Back</a> </div> </div> <div class="columns"> <div class="column is-full"> <div class="box max-w-md"> <div class="columns is-multiline"> <div class="columns"> <div class="column is-narrow"> <label class="label">Selected {selectedFeeSlip}</label> </div> <div class="column is-narrow"> <label class="label">Last Date</label> </div> <div class="column is-narrow"> <div class="control"> <input class="date input flatpickr-input form-control input" ref="lastDateEdit" placeholder="" tabindex="0" type="text" readonly="readonly"> </div> </div> </div> <div class="column is-full"> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th width="50">Head</th> <th style="width:100px">Amount</th> </tr> </thead> <tbody> <tr each="{r, i in feeSlipEditHeads}"> <td>{r.head}</td> <td><input class="input" id="head_edit{r.head_id}" type="text" riot-value="{r.head_amount}" onkeyup="{getEditTotal}"></td> </tr> </tbody> <thead> <tr> <th width="50" class="has-text-right">Total</th> <th>{grandTotal}</th> </tr> </thead> </table> </div> <div class="column is-full"> <button class="button is-danger" style="float:right" onclick="{editHeadAmount}">Submit</button> </div> </div> </div> </div> </div> </section> <section class="container is-fluid" show="{fee_plan_view ==\'viewFeeSlipDetail\'}"> <div class="level"> <div class="level-left"> <div class="level-item"> <h4 class="title" style="color: #ff3860;">Selected Plan: {selectedPlan}</h4> </div> </div> <div class="level-right"> <a class="button" onclick="{close_new_fee_plan}">Back</a> </div> </div> <div class="columns"> <div class="column is-full"> <div class="box max-w-md"> <div class="column is-full"> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th>Particulars</th> <th class="has-text-right">Amount</th> </tr> </thead> <tbody> <tr each="{f, i in feeSlipHeads}" class="{header:f.amount==\'\'}"> <td class="{texRight:f.head==\'Sub Total\' || f.head==\'Grand Total\'}">{f.head}</td> <td style="text-align: right"> <span class="{texBold:f.head==\'Sub Total\' || f.head==\'Grand Total\'}" show="{f.fee_slip_id==\'\'}">{f.amount} </span> <span show="{f.fee_slip_id!=\'\'}"> <span><a class="button is-small is-rounded" onclick="{editFeeSlip.bind(this, f)}">Edit</a></span> <span> <a class="button is-small has-text-danger is-rounded" id="showModal" onclick="{confirmDeleteFeeSlip.bind(e, f.fee_slip_id)}">Delete</a></span> </span> </td> </tr> </tbody> </table> </div> </div> </div> </div> </section> <section class="container is-fluid" show="{fee_plan_view ==\'editFeeSlipDetail\'}"> <div class="level"> <div class="level-left"> <div class="level-item"> <h4 class="title" style="color: #ff3860;">Edit Fee Slip Under:{selectedPlan} for the month of {selectedSlip}</h4> </div> </div> <div class="level-right"> <a class="button" onclick="{close_new_fee_plan}">Back</a> </div> </div> <div class="columns"> <div class="column is-full"> <div class="box max-w-md"> <div class="columns is-multiline"> <div class="columns"> <div class="column is-narrow"> <label class="label">Select Fee Slip</label> </div> </div> <div class="column is-full"> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th width="50">Head</th> <th style="width:100px">Amount</th> </tr> </thead> <tbody> <tr each="{r, i in heads}"> <td>{r.head}</td> <td><input class="input" id="head_amount{r.head_id}" type="text" value="0" onkeyup="{getTotal}"></td> </tr> </tbody> <thead> <tr> <th width="50" class="has-text-right">Total</th> <th>{grandTotal}</th> </tr> </thead> </table> </div> <div class="column is-full"> <button class="button is-danger" style="float:right" onclick="{addHeadAmount}">Submit</button> </div> </div> </div> </div> </div> </section> <div class="modal" id="deleteFeeSlipModel"> <div class="modal-background"></div> <div class="modal-card"> <header class="modal-card-head"> <p class="modal-card-title">Delete Confirmation</p> </header> <section class="modal-card-body"> <h4>Are you Sure?</h4> </section> <footer class="modal-card-foot"> <button class="button is-danger" onclick="{deleteFeeSlip}">Delete</button> <button class="button " id="modal-close" onclick="{removeDeleteFeeSlip}">Cancel</button> </footer> </div> </div>', '', '', function(opts) {

 var self = this
    self.on("mount", function(){
      flatpickr(".date", {

      allowInput: true,
      altFormat: "d/m/Y",
      dateFormat: "Y-m-d",
      })
      self.title='Add'
      self.role = getCookie('role')
      self.fee_plan_view = 'show_fee_plan'
      self.update()
      self.readFeePlans()
      self.readStandards()
      self.readHeads()
    })

    self.on("unmount", function(){
      feePlanStore.off('fee_plan_changed', PlansChanged)
      feePlanStore.off('fee_slip_head_changed', FeeSlipHeadChanged)
      feePlanStore.off('fee_slip_read_edit_changed', FeeSlipReadEditChanged)
      feePlanStore.off('add_fee_plan_changed', AddFeePlansChanged)
      feePlanStore.off('read_standard_changed', ReadStandnard)
      feePlanStore.off('map_fee_head_changed', MapFeeHeadsChanged)
      feeSlipStore.off('slips_changed', SlipsChanged)
      feeHeadStore.off('heads_changed', HeadsChanged)
      feeHeadStore.off('fee_slip_delete_changed', FeeSlipDeleteChanged)
    })

    self.getTotal = () =>{
      self.feedHeadValues = [];
      self.grandTotal = 0
      self.heads.map(g=>{
        let ha = 'head_amount'+g.head_id
        if(document.getElementById(ha).value!=0){
          self.grandTotal = self.grandTotal + Number(document.getElementById(ha).value)
          var obj ={}
          obj.head_id = g.head_id
          obj.head_amount = Number(document.getElementById(ha).value)
          self.feedHeadValues.push(obj)
        }
      })
    }

    self.getEditTotal = () =>{
      self.feedHeadValues = [];
      self.grandTotal = 0
      self.feeSlipEditHeads.map(g=>{
        let edit = 'head_edit'+g.head_id
        if(document.getElementById(edit).value!=0){
          self.grandTotal = self.grandTotal + Number(document.getElementById(edit).value)
          var obj ={}
          obj.head_id = g.head_id
          obj.head_amount = Number(document.getElementById(edit).value)
          self.feedHeadValues.push(obj)
        }
      })
    }

    self.readFeePlans = () => {
       feePlanStore.trigger('read_fee_plans')
    }
    self.readStandards = () =>{
    	feePlanStore.trigger('read_standards')
    }
self.viewFeeSlip = (c,e) =>{
      console.log("here");
      console.log(c)

      self.selectedPlan = c.fee_plan_name
      self.selected_plan_id = c.fee_plan_id
      feePlanStore.trigger('read_fee_slip_head', c.fee_plan_id)

}
self.readFeePlan = () =>{

}

self.mapHead = (c,e) => {
      console.log("here");
      console.log(c)
      self.readSlips()
      self.readHeads()
      self.selected_fee_plan_id = c
      self.fee_plan_view='map_fee_head'

    }
self.editFeeSlip = (c,e)=>{
  console.log("inside fee slip edit data read")
  console.log(c);

  self.selectedFeeSlip = c.head;
  self.refs.lastDateEdit.value = c.last_date
  self.edit_fee_slip_id = c.fee_slip_id
  self.fee_plan_view='edit_fee_head'
  feePlanStore.trigger('read_fee_slip_edit', c.fee_slip_id)

}

    self.readSlips = () => {
       feeSlipStore.trigger('read_slips')
    }

  self.readHeads = () => {
       feeHeadStore.trigger('read_heads')
    }

 self.close_new_fee_plan = () => {
    	self.fee_plan_view='show_fee_plan'
    	self.update()
    }
   self.selectStandard = (item,event) => {
    	item.done=!event.item.r.done
    	self.standard_id = item.standard_id;
        console.log(self.standards)
        console.log(self.standard_id)
    }
    self.add_new_fee_plan = () =>{
    	self.fee_plan_view='add_fee_plan'
    	self.title='Add'

    	self.update()

    }

    self.addHeadAmount = () =>{
      console.log("----------heads ")
      console.log(self.feedHeadValues)

      if(!self.refs.fee_slip_name.value){
        toastr.info("Please Fee Slip and try again")
      }else if(!self.refs.lastDateInput.value){
        toastr.info("Please insert Last date and try again")
      }else if(self.feedHeadValues.length==0){
          toastr.info("Please Insert Head amount and  try again")
      }else{
        var obj = {}
        obj['fee_slip_name'] = self.refs.fee_slip_name.value
        obj['last_date'] = self.refs.lastDateInput.value
        obj['feeHeads'] = self.feedHeadValues
        obj['total_amount'] = self.grandTotal
        obj['fee_plan_id'] = self.selected_fee_plan_id
        self.loading = true
          console.log("Add")
          console.log(obj)
          feePlanStore.trigger('add_head_amount', obj)
        }
      }

    self.editHeadAmount = () =>{
     if(!self.refs.lastDateEdit.value){
        toastr.info("Please insert Last date and try again")
      }else if(self.feedHeadValues.length==0){
          toastr.info("Please Insert Head amount and  try again")
      }else{
        var obj = {}
        obj['fee_slip_id'] = self.edit_fee_slip_id
        obj['last_date'] = self.refs.lastDateEdit.value
        obj['feeHeads'] = self.feedHeadValues
        obj['total_amount'] = self.grandTotal
        self.loading = true
          console.log("Edit")
          console.log(obj)
          feePlanStore.trigger('edit_head_amount', obj)
        }
      }

    self.add = () => {
       var tempStandards = [];
       var tempStandards = self.standards.filter(c => {
          return c.done == true
        })
      if(!self.refs.fee_plan_name.value){
        toastr.info("Please enter Fee Plan Title and try again")
      }else if(tempStandards.length==0){
          toastr.info("Please Select standard and try again")
      }else{
      	console.log("here")
        var obj = {}
        obj['fee_plan_name'] = self.refs.fee_plan_name.value
        obj['fee_plan_description'] = self.refs.fee_plan_description.value
        obj['standards'] = tempStandards

        self.loading = true
        if(self.title=='Add'){
        	console.log("Add")
          console.log(obj)
          feePlanStore.trigger('add_plan', obj)
        }else if(self.title=='Update'){
          console.log('update')

        }
      }
    }

    feePlanStore.on('fee_plan_changed',PlansChanged)
    function PlansChanged(feePlans){
      console.log(feePlans)
      self.title='Add'

      self.loading = false
       self.feePlans = []
      self.feePlans = feePlans
      self.update()
      console.log(self.feePlans)
    }

    feePlanStore.on('fee_slip_read_edit_changed',FeeSlipReadEditChanged)
     function FeeSlipReadEditChanged(feeSlipEditHeads){
      console.log(feeSlipEditHeads)
      self.loading = false
      self.feeSlipEditHeads = []
      self.feeSlipEditHeads = feeSlipEditHeads
      self.update()
      console.log(self.feeSlipEditHeads)
    }

    feePlanStore.on('fee_slip_head_changed',FeeSlipHeadChanged)
     function FeeSlipHeadChanged(feeSlipHeads){
      console.log(feeSlipHeads)
      self.loading = false
      self.feeSlipHeads = []
      self.fee_plan_view='viewFeeSlipDetail'

      self.feeSlipHeads = feeSlipHeads
      self.update()
      console.log(self.feeSlipHeads)
    }
    self.editDeleteShow = ()=>{
      console.log("inside")
      if(self.refs.edit_fee_slip_name.value!=-1) self.confirmSlipEditDelete = true
      else self.confirmSlipEditDelete = false
    }

    self.confirmDeleteFeeSlip = (e, s) =>{
      console.log("clicked")
      console.log(e)
      console.log("=============")
      console.log(s)
        self.selected_fee_slip_id = e;
        $("#deleteFeeSlipModel").addClass("is-active");
    }

    self.removeDeleteFeeSlip = () =>{
      $("#deleteFeeSlipModel").removeClass("is-active");
    }
    self.deleteFeeSlip = () => {
      self.loading = true
      feePlanStore.trigger('delete_fee_slip', self.selected_fee_slip_id)
    }

    self.confirmDelete = (s) => {
      console.log(s);
      self.feePlans.map(c => {
        console.log(c);
        if(c.fee_plan_id != s.item.s.fee_plan_id){
          c.confirmDelete = false
        }else{
          c.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      feePlanStore.trigger('delete_plan', e.item.s.fee_plan_id)
    }

    feePlanStore.on('read_standard_changed',ReadStandnard)
    function ReadStandnard(standards){
      console.log(standards)
      self.loading = false
      self.standards = standards
      self.update()
      console.log(self.standards)
    }
    feePlanStore.on ('map_fee_head_changed',MapFeeHeadsChanged)
    function MapFeeHeadsChanged(feePlanHeads){
      console.log("-------Heads --------")
      console.log(feePlanHeads)
      self.loading = false
      self.lastDateInput.value =''
      self.refs.fee_slip_name.value = ''

      self.update()

    }
    feePlanStore.on('fee_slip_delete_changed',FeeSlipDeleteChanged)
    function FeeSlipDeleteChanged(){
      self.loading = false
      $("#deleteFeeSlipModel").removeClass("is-active");
      feePlanStore.trigger('read_fee_slip_head', c.fee_plan_id)
      self.update()
    }
    feePlanStore.on('add_fee_plan_changed',AddFeePlansChanged)
    function AddFeePlansChanged(feePlans){
      console.log(feePlans)
      self.title='Add'
      self.loading = false
      self.feePlans = feePlans
      self.update()
      console.log(self.feePlans)
    }
    feeSlipStore.on('slips_changed',SlipsChanged)
    function SlipsChanged(slips){
      self.refs.lastDateInput.value = ''
      self.loading = false
       self.slips = []
      self.slips = slips
      self.update()

    }

    feeHeadStore.on('heads_changed',HeadsChanged)
    function HeadsChanged(heads){
      self.loading = false
       self.heads = []
       self.heads = heads
      self.update()
      console.log(self.heads)
    }
});
riot.tag2('fee-slip', '<section class=" is-fluid"> <h2 class="title has-text-centered" style="color: #ff3860;">Fee Slip Management</h2> <div class="flex items-center mt-2 mb-6 no-print"> <div class="bg-green py-1 rounded w-10"> <div class="bg-grey h-px flex-auto"></div> </div> </div> <div class="box"> <div class="columns"> <div class="column is-half"> <div class="field"> <label class="label" for="role">Slip Name</label> <div class="control"> <input class="input" type="text" ref="addSlipName" onkeyup="{addEnter}"> </div> </div> </div> <div class="column is-narrow"> <div class="field"> <div class="control"> <button class="button is-danger has-text-weight-bold adjusted-top" onclick="{add}">{title}</button> </div> </div> </div> </div> </div> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th>#</th> <th>Slip Name</th> <th></th> </tr> </thead> <tbody> <tr each="{c, i in slips}"> <td>{i+1}</td> <td>{c.fee_slip_name}</td> <td class="has-text-right"> <div class="inline-flex rounded border border-grey overflow-hidden" hide="{c.confirmDelete}"> <span><a class="button is-small is-rounded" onclick="{edit.bind(this, c)}">Edit</a></span> <span if="{role==\'ADMIN\'}"> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick="{confirmDelete}">Delete</a></span> </div> <div class="table-buttons" if="{c.confirmDelete}"> <span disabled="{loading}" class="button is-small is-rounded" onclick="{delete}"><i class="fa fa-check"></i></span> <span disabled="{loading}" class="button is-small has-text-danger is-rounded" onclick="{cancelOperation}"><i class="fa fa-times"></i></span> </div> </td> </tr> </tbody> </table> </section>', '', '', function(opts) {
 var self = this
    self.on("mount", function(){
      self.title='Create'
      self.role = getCookie('role')
      self.update()
      self.readSlips()
    })
    self.on("unmount", function(){
      feeSlipStore.off('slips_changed', SlipsChanged)
    })

    self.readSlips = () => {
       feeSlipStore.trigger('read_slips')
    }

    self.add = () => {
      if(!self.refs.addSlipName.value){
        toastr.info("Please enter Slip Name and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          console.log('create')
          feeSlipStore.trigger('add_slip', self.refs.addSlipName.value)
        }else if(self.title=='Update'){
          console.log('update')
          feeSlipStore.trigger('edit_slip', self.refs.addSlipName.value,
            self.old_fee_slip_name)
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

   self.edit = (c,e) => {
   	  console.log("here");
      console.log(c)
      self.title='Update'
      self.refs.addSlipName.value = c.fee_slip_name
      self.old_fee_slip_name = c.fee_slip_name
    }

    self.cancelOperation = (e) => {
      self.slips.map(c => {
          c.confirmDelete = false
          c.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.slips.map(c => {
        if(c.fee_slip_name != e.item.c.fee_slip_name){
          c.confirmDelete = false
        }else{
          c.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      feeSlipStore.trigger('delete_slip', e.item.c.fee_slip_name)
    }

    feeSlipStore.on('slips_changed',SlipsChanged)
    function SlipsChanged(slips){
      console.log(slips)
      self.title='Create'
      self.refs.addSlipName.value = ''
      self.loading = false
       self.slips = []
      self.slips = slips
      self.update()
      console.log(self.slips)
    }

});
riot.tag2('fees-setting', '<div class="field has-addons"> <p class="control"> <a class="button {is-active: selected_master == \'fine-setting\'}" href="#/fees-setting/fine-setting"> <span>Fine Setting</span> </a> </p> <p class="control"> <a class="button {is-active: selected_master == \'bank-account-setting\'}" href="#/fees-setting/bank-account-setting"> <span>Bank Account </span> </a> </p> <p class="control"> <a class="button {is-active: selected_master == \'session-setting\'}" href="#/fees-setting/session-setting"> <span>Session</span> </a> </p> </div> <div id="setting-view"></div>', '', '', function(opts) {
    var self = this
    console.log('opts.selected_master')
    console.log(opts.selected_master)
    if(!opts.selected_master){
      self.selected_master = 'fine-setting'
    }else{
      self.selected_master = opts.selected_master
    }
});
riot.tag2('final-assessment-report-card', '<h4>final-assessment-report-card</h4>', '', '', function(opts) {
});
riot.tag2('fine-setting', '<section class="container is-fluid"> <div class="level"> <div class="level-left"> <div class="level-item"> <h2 class="title" style="color: #ff3860;">Fine Setting</h2> </div> </div> </div> <div class="flex items-center mt-2 mb-6 no-print"> <div class="bg-green py-1 rounded w-10"></div> <div class="bg-grey h-px flex-auto"></div> </div> <div class="columns"> <div class="column is-two-fifths"> <div class="box max-w-md"> <div class="columns is-multiline"> <div class="column is-full"> <div class="field"> <label class="label" for="venue">Grace Period for Fine</label> <input class="input" ref="fineGracePreiodText" type="number"> </div> </div> <div class="column is-full"> <div class="field"> <label class="label" for="fineTypeList">Fine Type</label> <div class="control"> <div class="select is-fullwidth"> <select id="fineType" ref="fineTypeList"> <option value="Daily">Daily</option> <option value="Slab">Slab</option> </select> </div> </div> </div> </div> <div class="column is-full"> <label class="label" for="fineAmount">Fine Amount</label> <input class="input" ref="fineAmountText" type="number"> </div> <div class="column is-full"> <button class="button is-danger" onclick="{add}">Save</button> <button class="button is-info" onclick="{reset}">Reset</button> </div> </div> </div> </div> </div> </section>', '', '', function(opts) {
	var self = this
    self.on("mount", function(){
      self.title='Save'
      self.role = getCookie('role')
      self.update()
      self.readFineSetting()
    });
    self.on("unmount", function(){
      fineStore.off('read_fine_changed', ReadFineChanged)
      fineStore.off('add_fine_changed',AddFineChanged)

    });
    self.reset = () => {
    	fineStore.trigger('read_fine_setting')
    }

    self.readFineSetting = () => {
       fineStore.trigger('read_fine_setting')

    }

    self.add = () => {
      if(!self.refs.fineGracePreiodText.value){
        toastr.info("Please enter Fine Grace Period and try again")
      }if(!self.refs.fineAmountText.value){
        toastr.info("Please enter Fine Amount and try again")
      }else{
        self.loading = true
          console.log('save')
          fineStore.trigger('add', self.refs.fineGracePreiodText.value,
           self.refs.fineAmountText.value , self.refs.fineTypeList.value)
      }
    }

    fineStore.on('add_fine_changed',AddFineChanged)
    function AddFineChanged(fines){
      self.loading = false
      self.fines = fines
      self.update()
      console.log(self.fines)
    }

     fineStore.on('read_fine_changed',ReadFineChanged)
    function ReadFineChanged(f){
      self.fines = f
      self.update()
      self.refs.fineAmountText.value = self.fines[0].fine_amount
      self.refs.fineGracePreiodText.value = self.fines[0].fine_grace_preiod
      self.refs.fineTypeList.value = self.fines[0].fine_type
    }

});
riot.tag2('first-assessment-report-card', '<h4>first-assessment-report-card</h4>', '', '', function(opts) {
});

riot.tag2('grade', '<loading-bar if="{loading}"></loading-bar> <section class=" is-fluid" show="{view==\'grades\'}"> <div class="level"> <div class="level-left"> <h2 class="title" style="color: #ff3860;">Grade</h2> </div> <div class="level-right"> <button class="button is-warning is-rounded" onclick="{openGradeModal}"> <span class="icon"> <span class="fas fa-plus"></span> </span> </button> <button class="button is-warning is-rounded" onclick="{readGrade}" style="margin-left:2px"> <span class="icon"> <span class="fas fa-sync-alt"></span> </span> </button> </div> </div> <div class="box"> <div class="columns"> <div class="column is-narrow"><label class="label">Exam Scheme</label></div> <div class="column"> <div class="control"> <div class="select is-fullwidth"> <select ref="examSchemeSelect" onchange="{readExamType}"> <option value="">Select Exam Scheme</option> <option each="{examSchemes}" riot-value="{scheme_id}">{scheme_name}</option> </select> </div> </div> </div> <div class="column is-narrow"><label class="label">Exam Type</label></div> <div class="column"> <div class="control"> <div class="select is-fullwidth"> <select ref="examTypeSelect"> <option value="">Select Exam Type</option> <option each="{examTypes}" riot-value="{exam_type_id}">{exam_type}</option> </select> </div> </div> </div> <div class="column"> <button class="button is-danger has-text-weight-bold" onclick="{readGrade}">GO </button> </div> </div> </div> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th class="slno">SL</th> <th>Max Marks</th> <th>Min Marks</th> <th>Grade</th> <th></th> </tr> </thead> <tbody> <tr each="{c, i in grades}"> <td>{i+1}</td> <td>{c.max_marks}</td> <td>{c.min_marks}</td> <td>{c.grade}</td> <td class="has-text-right"> <div class="inline-flex rounded border border-grey overflow-hidden" hide="{c.confirmDelete}"> <span><a class="button is-small is-rounded" onclick="{edit.bind(this, c)}">Edit</a></span> <span><a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick="{confirmDelete}">Delete</a></span> </div> <div class="table-buttons" if="{c.confirmDelete}"> <span disabled="{loading}" class="button is-small is-rounded" onclick="{delete}"><i class="fa fa-check"></i></span> <span disabled="{loading}" class="button is-small has-text-danger is-rounded" onclick="{cancelOperation}"><i class="fa fa-times"></i></span> </div> </td> </tr> </tbody> </table> </section> <div id="gradeModal" class="modal "> <div class="modal-background"></div> <div class="modal-card"> <header class="modal-card-head"> <p class="modal-card-title">{title} Grade</p> </header> <section class="modal-card-body"> <div class="columns"> <div class="column"> <div class="field"> <div class="control"> <label class="label" for="role">Max Marks</label> <input class="input" type="text" ref="maxMarkInput"> </div> </div> <div class="field"> <div class="control"> <label class="label" for="role">Min Marks</label> <input class="input" type="text" ref="minMarkInput"> </div> </div> <div class="field"> <div class="control"> <label class="label" for="role">Grade</label> <input class="input" type="text" ref="gradeInput"> </div> </div> </div> </div> </section> <footer class="modal-card-foot"> <button class="button is-danger" onclick="{add}">{title}</button> <button class="button" id="item-modal-close" onclick="{closeGradeModal}">Cancel</button> </footer> </div> </div>', '', '', function(opts) {
	var self = this
    self.on("mount", function(){
      self.title = 'Add'
      self.view = 'grades'
      self.loading = false;
      self.update()
      self.readExamScheme()
    })
    self.on("unmount", function(){
      gradeStore.on('exam_scheme_changed',ExamSchemeChanged)
      gradeStore.off('exam_type_changed',ExamTypeChanged)
      gradeStore.off('add_grade_changed',AddGradeChanged)
      gradeStore.off('delete_grade_changed',DeleteGradeChanged)
    })

    self.readExamScheme = () => {
       self.loading = true;
       gradeStore.trigger('read_exam_schemes')
    }

    self.readExamType = () => {
       if(self.refs.examSchemeSelect.value==''){
        toastr.info("Please select exam scheme and try again")
       }else{
         self.loading = true;
         gradeStore.trigger('read_exam_types',self.refs.examSchemeSelect.value)
       }
    }

    self.readGrade = () => {
      let error = '';

      console.log(error.length)

      if(self.refs.examSchemeSelect.value==''){
        error = error + "Please select exam scheme, "
      }

      if(self.refs.examTypeSelect.value==''){
        error = error + "Please select exam type "
      }

      if(error.length!=0){
        toastr.error(error)
        return
      }else{
        gradeStore.trigger('read_grades',self.refs.examSchemeSelect.value, self.refs.examTypeSelect.value)
      }

    }

    self.openGradeModal = () => {
      let error = '';

      if(self.refs.examSchemeSelect.value==''){
        error = error + "Please select exam scheme, "
      }

      if(self.refs.examTypeSelect.value==''){
        error = error + "Please select exam type "
      }

      if(error.length!=0){
        toastr.error(error)
        return
      }else{
        self.title = 'Add'
        $("#gradeModal").addClass("is-active");
      }
    }

    self.closeGradeModal = () => {
      $("#gradeModal").removeClass("is-active");
    }

    self.add = () => {
      let error = '';

      if(self.refs.maxMarkInput.value==''){
        error = error + "Please enter max marks, "
      }

      if(self.refs.minMarkInput.value==''){
        error = error + "Please enter min marks, "
      }

      if(self.refs.gradeInput.value==''){
        error = error + "Please enter grade, "
      }

      if(Number(self.refs.maxMarkInput.value)<Number(self.refs.minMarkInput.value)){
        error = error + "Min marks can not be greater than max marks "
      }

      if(error.length!=0){
        toastr.error(error)
        return
      }else{
        var obj = {}
        obj['scheme_id'] = self.refs.examSchemeSelect.value
        obj['exam_id'] = self.refs.examTypeSelect.value
        obj['max_marks'] = self.refs.maxMarkInput.value
        obj['min_marks'] = self.refs.minMarkInput.value
        obj['grade'] = self.refs.gradeInput.value

        self.loading = true
        if(self.title=='Add'){
          gradeStore.trigger('add_grade', obj)
        }else if(self.title=='Update'){
          gradeStore.trigger('update_grade', obj, self.edit_id)
        }
      }

    }

    self.edit = (c,e) => {
      console.log(c)
      self.title='Update'
      $("#gradeModal").addClass("is-active");
      self.refs.maxMarkInput.value = c.max_marks
      self.refs.minMarkInput.value = c.min_marks
      self.refs.gradeInput.value = c.grade
      self.edit_id = c.grade_id
    }

    self.cancelOperation = (e) => {
      self.grades.map(c => {
          c.confirmDelete = false
          c.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.grades.map(c => {
        if(c.grade_id != e.item.c.grade_id){
          c.confirmDelete = false
        }else{
          c.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      gradeStore.trigger('delete_grade', e.item.c.grade_id)
    }

    gradeStore.on('exam_scheme_changed',ExamSchemeChanged)
    function ExamSchemeChanged(examSchemes){
      self.loading = false
      self.examSchemes = []
      self.examSchemes = examSchemes
      self.update()
      console.log(self.examSchemes)
    }

    gradeStore.on('exam_type_changed',ExamTypeChanged)
    function ExamTypeChanged(examTypes){
      self.loading = false
      self.examTypes = []
      self.examTypes = examTypes
      self.update()
      console.log(self.examTypes)
    }

    gradeStore.on('grades_changed',GradesChanged)
    function GradesChanged(grades){
      self.loading = false
      self.grades = []
      self.grades = grades
      self.update()
      console.log(self.grades)
    }

    gradeStore.on('add_grade_changed',AddGradeChanged)
    function AddGradeChanged(grades){
      self.refs.maxMarkInput.value=''
      self.refs.minMarkInput.value=''
      self.refs.gradeInput.value=''
      self.closeGradeModal()
      self.loading = false
      self.grades = []
      self.grades = grades
      self.update()
      console.log(self.grades)
    }

    gradeStore.on('delete_grade_changed',DeleteGradeChanged)
    function DeleteGradeChanged(grades){
      self.loading = false
      self.grades = []
      self.grades = grades
      self.update()
      console.log(self.grades)
    }

});
riot.tag2('infirmary-case', '<section class=" is-fluid"> <h2 class="title" style="color: #ff3860;">Infirmary Case</h2> <div class="flex items-center mt-2 mb-6 no-print"> <div class="bg-green py-1 rounded w-10"> <div class="bg-grey h-px flex-auto"></div> </div> </div> <div class="box"> <div class="columns"> <div class="column is-narrow"> <label class="label">Category</label> </div> <div class="column is-narrow"> <div class="control"> <div class="select"> <select ref="category_id"> <option each="{infirmaryCategories}" riot-value="{category_id}">{category_name} </option> </select> </div> </div> </div> <div class="column is-narrow"> <label class="label">Case</label> </div> <div class="column is-narrow"> <div class="control"> <input class=" input" ref="infirmary_case" type="text"> </div> </div> <div class="column"> <button class="button is-danger has-text-weight-bold" onclick="{add}">{title} </button> </div> </div> </div> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th>SL</th> <th>Category</th> <th>Case</th> <th></th> </tr> </thead> <tbody> <tr each="{ev, i in infirmaryCases}"> <td>{i+1}</td> <td>{ev.category_name}</td> <td>{ev.case_name}</td> <td class="has-text-right"> <div class="inline-flex rounded border border-grey overflow-hidden" hide="{ev.confirmDelete}"> <span><a class="button is-small is-rounded" onclick="{edit.bind(this, ev)}">Edit</a></span> <span if="{role==\'ADMIN\'}"> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick="{confirmDelete}">Delete</a></span> </div> <div class="table-buttons" if="{ev.confirmDelete}"> <span disabled="{loading}" class="button is-small is-rounded" onclick="{delete}"><i class="fa fa-check"></i></span> <span disabled="{loading}" class="button is-small has-text-danger is-rounded" onclick="{cancelOperation}"><i class="fa fa-times"></i></span> </div> </td> </tr> </tbody> </table> </section>', '', '', function(opts) {
	var self = this
    self.on("mount", function(){
      self.title='Create'
      self.role = getCookie('role')
      self.update()
      self.readInfirmaryCategory()
      self.readInfirmaryCase()
    })
    self.on("unmount", function(){
      infirmarycaseStore.off('add_infirmary_case_changed', AddInfirmaryCaseChanged)
      infirmarycaseStore.off('read_infirmary_case_changed', ReadInfirmaryCaseChanged)
      infirmarycaseStore.off('read_infirmary_category_changed',InfirmaryCategoryChanged)
      infirmarycaseStore.off('edit_infirmary_case_changed',EditInfirmaryCaseChanged)
      infirmarycaseStore.off('delete_infirmary_case_changed',DeleteInfirmaryCaseChanged)
    })

    self.readInfirmaryCategory = () => {
       infirmarycaseStore.trigger('read_infirmary_category')
    }

    self.readInfirmaryCase = () => {
       infirmarycaseStore.trigger('read_infirmary_case')
    }

     self.add = () => {
      if(!self.refs.infirmary_case.value){
        toastr.info("Please enter Event and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          console.log('create')
          infirmarycaseStore.trigger('add_infirmary_case', self.refs.infirmary_case.value,
           self.refs.category_id.value)
        }else if(self.title=='Update'){
          console.log('update')
          infirmarycaseStore.trigger('edit_infirmary_case', self.refs.infirmary_case.value,
            self.refs.category_id.value, self.edit_id)
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
      self.infirmaryCases.map(ev => {
          ev.confirmDelete = false
          ev.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.infirmaryCases.map(ev => {
        if(ev.case_id != e.item.ev.case_id){
          ev.confirmDelete = false
        }else{
          ev.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      infirmarycaseStore.trigger('delete_infirmary_case', e.item.ev.case_id)
    }

    self.edit = (ev,e) => {
      console.log(ev)
      self.title='Update'
      self.refs.infirmary_case.value = ev.case_name
      self.refs.category_id.value = ev.category_id
      self.edit_id = ev.case_id
    }

    infirmarycaseStore.on('add_infirmary_case_changed',AddInfirmaryCaseChanged)
    function AddInfirmaryCaseChanged(infirmaryCases){
      console.log(infirmaryCases)
      self.title='Create'
      self.refs.infirmary_case.value = ''
      self.refs.category_id.value = ''
      self.loading = false
      self.infirmaryCases = infirmaryCases
      self.update()
      self.readInfirmaryCase()
      console.log(self.infirmaryCases)
    }

    infirmarycaseStore.on('edit_infirmary_case_changed',EditInfirmaryCaseChanged)
    function EditInfirmaryCaseChanged(infiramryCases){
      console.log(infiramryCases)
      self.title='Create'
      self.refs.infirmary_case.value = ''
      self.refs.category_id.value = ''
      self.loading = false
      self.infiramryCases = infiramryCases
      self.update()
      self.readInfirmaryCase()

    }

    infirmarycaseStore.on('delete_infirmary_case_changed',DeleteInfirmaryCaseChanged)
    function DeleteInfirmaryCaseChanged(infiramryCases){
      console.log(infiramryCases)
      self.title='Create'
      self.refs.infirmary_case.value = ''
      self.refs.category_id.value = ''
      self.loading = false
      self.infiramryCases = infiramryCases
      self.update()
      self.readInfirmaryCase()
      console.log(self.infiramryCases)
    }

    infirmarycaseStore.on('read_infirmary_case_changed',ReadInfirmaryCaseChanged)
    function ReadInfirmaryCaseChanged(infirmaryCases){
      console.log(infirmaryCases)
      self.title='Create'
      self.refs.infirmary_case.value = ''
      self.loading = false
      self.infirmaryCases = infirmaryCases
      self.update()
      console.log(self.infirmaryCases)
    }

    infirmarycaseStore.on('read_infirmary_category_changed',InfirmaryCategoryChanged)
    function InfirmaryCategoryChanged(infirmaryCategories){
      console.log(infirmaryCategories)
      self.infirmaryCategories = infirmaryCategories
      self.update()
      console.log(self.infirmaryCategories)
    }

});
riot.tag2('infirmary-category', '<section class=" is-fluid"> <h2 class="title has-text-centered" style="color: #ff3860;">Infirmary Category</h2> <div class="flex items-center mt-2 mb-6 no-print"> <div class="bg-green py-1 rounded w-10"> <div class="bg-grey h-px flex-auto"></div> </div> </div> <div class="box"> <div class="columns"> <div class="column is-half"> <div class="field"> <label class="label" for="role">Category</label> <div class="control"> <input class="input" type="text" ref="category_name" onkeyup="{addEnter}"> </div> </div> </div> <div class="column is-narrow"> <div class="field"> <div class="control"> <button class="button is-danger has-text-weight-bold adjusted-top" onclick="{add}">{title}</button> </div> </div> </div> </div> </div> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th>SL</th> <th>Category</th> <th></th> </tr> </thead> <tbody> <tr each="{c, i in infirmaryCategories}"> <td>{i+1}</td> <td>{c.category_name}</td> <td class="has-text-right"> <div class="inline-flex rounded border border-grey overflow-hidden" hide="{c.confirmDelete}"> <span><a class="button is-small is-rounded" onclick="{edit.bind(this, c)}">Edit</a></span> <span if="{role==\'ADMIN\'}"> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick="{confirmDelete}">Delete</a></span> </div> <div class="table-buttons" if="{c.confirmDelete}"> <span disabled="{loading}" class="button is-small is-rounded" onclick="{delete}"><i class="fa fa-check"></i></span> <span disabled="{loading}" class="button is-small has-text-danger is-rounded" onclick="{cancelOperation}"><i class="fa fa-times"></i></span> </div> </td> </tr> </tbody> </table> </section>', '', '', function(opts) {
	   var self = this
      self.on("mount", function(){
      self.title='Create'
      self.role = getCookie('role')
      self.update()
      self.readCategories()
    })
    self.on("unmount", function(){
      infirmarycategoryStore.off('categories_changed', CategoriesChanged)
    })

    self.readCategories = () => {
       infirmarycategoryStore.trigger('read_categories')
    }

     self.add = () => {
      if(!self.refs.category_name.value){
        toastr.info("Please enter Category and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          console.log('create')
          infirmarycategoryStore.trigger('add_category', self.refs.category_name.value)
        }else if(self.title=='Update'){
          console.log('update')
          infirmarycategoryStore.trigger('edit_category', self.refs.category_name.value,
            self.edit_id)
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
      self.infirmaryCategories.map(c => {
          c.confirmDelete = false
          c.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.infirmaryCategories.map(c => {
        if(c.category_id != e.item.c.category_id){
          c.confirmDelete = false
        }else{
          c.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      infirmarycategoryStore.trigger('delete_category', e.item.c.category_id)
    }

    self.edit = (c,e) => {
      console.log(c)
      self.title='Update'
      self.refs.category_name.value = c.category_name
      self.edit_id = c.category_id
    }

    infirmarycategoryStore.on('categories_changed',CategoriesChanged)
    function CategoriesChanged(infirmaryCategories){
      console.log(infirmaryCategories)
      self.title='Create'
      self.refs.category_name.value = ''
      self.loading = false
      self.infirmaryCategories = infirmaryCategories

      self.update()
      console.log(self.infirmaryCategories)
    }

});
riot.tag2('infirmary-date-wise-case-report', '<section class="is-fluid"> <div class="box"> <div class="columns"> <div class="column is-narrow"> <label class="label">Category</label> </div> <div class="column is-narrow"> <div class="control"> <div class="select"> <select ref="read_category_id"> <option each="{infirmaryCategories}" riot-value="{category_id}">{category_name} </option> </select> </div> </div> </div> <div class="column is-narrow"> <label class="label">Start Date</label> </div> <div class="column is-narrow"> <div class="control"> <input class="input date flatpickr-input form-control input" ref="start_date" placeholder="" tabindex="0" type="text"> </div> </div> <div class="column is-narrow"> <label class="label">End Date</label> </div> <div class="column is-narrow"> <div class="control"> <input class="input date flatpickr-input form-control input" ref="end_date" placeholder="" tabindex="0" type="text"> </div> </div> <div class="column"> <button class="button is-danger has-text-weight-bold" onclick="{readStudentInfirmaryDateWiseCaseReport}">Go </button> </div> </div> </div> <div class="level"> <div class="level-left"> <h4 class="title" style="color: #ff3860;">Student Date Wise Case Report</h4> </div> </div> <table class="table is-fullwidth is-striped is-hoverable is-bordered"> <thead> <tr> <th>#</th> <th>Name</th> <th>Enroll No</th> <th>Class</th> <th>Case Name</th> <th>Date</th> <th>Time In</th> <th>Time Out</th> <th>Treatment</th> </tr> </thead> <tbody> <tr each="{st, i in studentDateWiseCaseReports}"> <td>{i+1}</td> <td>{st.student_name}</td> <td>{st.enroll_number}</td> <td>{st.standard}</td> <td>{st.case_name}</td> <td>{st.t_date}</td> <td>{st.time_in}</td> <td>{st.time_out}</td> <td>{st.treatment}</td> </tr> </tbody> </table> </section>', '', '', function(opts) {
   var self = this
        self.on("mount", function(){
        self.title='Create'
        self.role = getCookie('role')
        self.readInfirmaryCategory()

        console.log("inside student infirmary")
        flatpickr(".date", {
         allowInput: true,
         altFormat: "d/m/Y",
         dateFormat: "Y-m-d",
       })
        self.update()
     })
     self.on("unmount", function(){
       studentinfirmaryStore.off('read_student_date_wise_case_report_changed', ReadStudentDateWiseCaseReportChanged)
       studentinfirmaryStore.off('read_infirmary_category_changed',InfirmaryCategoryChanged)
     })

     self.readStudentInfirmaryDateWiseCaseReport = () => {
         self.infirmary_student_view='show_student_table'
           studentinfirmaryStore.trigger('read_student_date_wise_case_report', self.refs.read_category_id.value,self.refs.start_date.value,self.refs.end_date.value,)

     }
      self.readInfirmaryCategory = () => {
        studentinfirmaryStore.trigger('read_infirmary_category')
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

     studentinfirmaryStore.on('read_student_date_wise_case_report_changed',ReadStudentDateWiseCaseReportChanged)
     function ReadStudentDateWiseCaseReportChanged(studentDateWiseCaseReports){
       console.log(studentDateWiseCaseReports)
       self.loading = false
       self.studentDateWiseCaseReports = studentDateWiseCaseReports
       self.update()
       console.log(self.studentDateWiseCaseReports)
     }

     studentinfirmaryStore.on('read_infirmary_category_changed',InfirmaryCategoryChanged)
     function InfirmaryCategoryChanged(infirmaryCategories){
       console.log(infirmaryCategories)
       self.infirmaryCategories = infirmaryCategories
       self.update()
       console.log(self.infirmaryCategories)
     }

});
riot.tag2('infirmary-setting', '<div class="field has-addons"> <p class="control"> <a class="button {is-active: selected_master == \'infirmary-category\'}" href="#/infirmary-setting/infirmary-category"> <span>Category</span> </a> </p> <p class="control"> <a class="button {is-active: selected_master == \'infirmary-case\'}" href="#/infirmary-setting/infirmary-case"> <span>Case</span> </a> </p> </div> <div id="infirmary-setting-view"></div>', '', '', function(opts) {
    var self = this
    console.log('opts.selected_master')
    console.log(opts.selected_master)
    if(!opts.selected_master){
      self.selected_master = 'infirmary-category'
    }else{
      self.selected_master = opts.selected_master
    }
});



riot.tag2('infirmary-staff-bp-weight-report', '<div class="field has-addons"> <p class="control"> <a class="button {is-active: selected_infirmary_staff_bp_weight_report == \'infirmary-staff-wise-report\'}" href="#/infirmary/infirmary-staff-bp-weight-report/infirmary-staff-wise-report"> <span>Staff Wise Report</span> </a> </p> <p class="control"> <a class="button {is-active: selected_infirmary_staff_bp_weight_report == \'infirmary-staff-monthly-report\'}" href="#/infirmary/infirmary-staff-bp-weight-report/infirmary-staff-date-wise-report"> <span>Date Wise Report</span> </a> </p> </div> <div id="infirmary-staff-bp-weight-report-view"></div>', '', '', function(opts) {
    var self = this
    console.log('opts.selected_infirmary_staff_bp_weight_report')
    console.log(opts.selected_infirmary_staff_bp_weight_report)
    if(!opts.selected_infirmary_staff_bp_weight_report){
      self.selected_infirmary_staff_bp_weight_report = 'infirmary-staff-wise-report'
    }else{
    self.selected_infirmary_staff_bp_weight_report=opts.selected_infirmary_staff_bp_weight_report
    }
});



riot.tag2('infirmary-staff-bp-weight', '<section class="is-fluid" show="{infirmary_staff_view == \'show_staff_bp_weight_table\'}"> <div class="level"> <div class="level-left"> <h2 class="title" style="color: #ff3860;">Staff Health Detail</h2> </div> <div class="level-right"> <button class="button is-warning is-rounded" onclick="{add_staff_infirmary}"> <span class="icon"> <span class="fas fa-plus"></span> </span> <span>Add</span> </button> </div> </div> <table class="table is-fullwidth is-striped is-hoverable is-bordered"> <thead> <tr> <th>#</th> <th>Name</th> <th>Emp ID</th> <th>Checkup Date</th> <th>Time In</th> <th>Time Out</th> <th>B.P</th> <th>Height</th> <th>Weight</th> <th>B.M.I</th> <th>Action</th> </tr> </thead> <tbody> <tr each="{st, i in staffBpWeights}"> <td>{i+1}</td> <td>{st.name}</td> <td>{st.employee_id}</td> <td>{st.checkup_date}</td> <td>{st.time_in}</td> <td>{st.time_out}</td> <td>{st.blood_pressure}</td> <td>{st.height}</td> <td>{st.weight}</td> <td>{st.bmi}</td> <td class="has-text-right"> <div class="inline-flex rounded border border-grey overflow-hidden" hide="{st.confirmDelete}"> <span><a class="button is-small is-rounded" onclick="{edit.bind(this, st)}">Edit</a></span> <span> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick="{confirmDelete}">Delete</a></span> </div> <div class="table-buttons" if="{st.confirmDelete}"> <span disabled="{loading}" class="button is-small is-rounded" onclick="{delete}"><i class="fa fa-check"></i></span> <soan disabled="{loading}" class="button is-small has-text-danger is-rounded" onclick="{cancelOperation}"><i class="fa fa-times"></i></span> </div> </td> </tr> </tbody> </table> </section> <section class="is-fluid" show="{infirmary_staff_view ==\'show_staff_bp_weight_form\'}"> <div class="label"> <div class="level-left"> <h2 class="title" style="color: #ff3860;">{title}</h2> </div> <div class="level-right"> <button class="button" onclick="{close_staff_infirmary_form}">Back</button> </div> </div> <div class="box"> <div class="columns is-variable is-1 is-multiline"> <div class="column is-one-third"> <label class="label">Employee</label> <div class="control"> <div class="select is-fullwidth"> <select ref="staff_id"> <option each="{employees}" riot-value="{emp_id}">{name} </option> </select> </div> </div> </div> <div class="column is-one-third"> <label class="label">Date</label> <input class="input date flatpickr-input form-control input" ref="checkup_date" placeholder="" tabindex="0" type="text"> </div> <div class="column is-one-third"> <label class="label">Time In</label> <input type="text" ref="time_in" type="text" class="input"> </div> <div class="column is-one-third"> <label class="label">Time Out</label> <input type="text" ref="time_out" type="text" class="input"> </div> <div class="column is-one-third"> <label class="label">Upper B.P</label> <input type="text" ref="upper_bp" type="text" class="input"> </div> <div class="column is-one-third"> <label class="label">Lower B.P</label> <input type="text" ref="lower_bp" type="text" class="input"> </div> <div class="column is-one-third"> <label class="label">Height (Cm)</label> <input ref="height" type="text" class="input" type="number"> </div> <div class="column is-one-third"> <label class="label">Weight (Kg)</label> <input type="text" ref="weight" type="text" class="input" onkeyup="{calculateBmi}"> </div> <div class="column is-one-third"> <label class="label">BMI</label> <input type="text" ref="bmi" type="text" class="input"> </div> <div class="column is-full"> <button class="button is-danger has-text-weight-bold adjusted-top" onclick="{add}">{title}</button> </div> </div> </div> </section>', '', '', function(opts) {
   var self = this
        self.on("mount", function(){
        self.title='Create'
        self.role = getCookie('role')
        self.infirmary_staff_view='show_staff_bp_weight_table'
        self.readStaffBPWeight()
        self.readEmployee()
        console.log("inside staff BP weight")
        flatpickr(".date", {
         allowInput: true,
         altFormat: "d/m/Y",
         dateFormat: "Y-m-d",
       })
        self.update()
     })
     self.on("unmount", function(){
       staffbpweightStore.off('read_staff_bp_weight_changed', ReadStaffBPWeightChanged)
       staffbpweightStore.off('read_employee_changed', EmployeeChanged)
       staffbpweightStore.off('add_staff_bp_weight_changed', AddStaffBPWeightChanged)
       staffbpweightStore.off('edit_staff_bp_weight_changed',EditStaffBPWeightChanged)
       staffbpweightStore.off('delete_staff_bp_weight_changed',DeleteStaffBPWeightChanged)
     })

     self.calculateBmi=()=>{
      self.height=self.refs.height.value
      self.weight=self.refs.weight.value
      console.log(self.height)
      console.log(self.weight)
      self.totalHeight=Number(self.height) * Number(self.height)
      console.log(self.totalHeight)
      self.BMI=self.weight/self.totalHeight
      console.log(self.BMI);
     self.refs.bmi.value=Number((self.BMI) * (10000)).toFixed(2)
     }

     self.readStaffBPWeight = () => {
           staffbpweightStore.trigger('read_staff_bp_weight')

     }

     self.readEmployee = () => {
        staffbpweightStore.trigger('read_employee')
     }

     self.add_staff_infirmary = () => {
        self.title='Create'
        self.infirmary_staff_view='show_staff_bp_weight_form'

     }
    self.close_staff_infirmary_form = () => {
       self.infirmary_staff_view='show_staff_bp_weight_table'
       self.title='Create'
       self.refs.staff_id.value=''
       self.refs.height.value=''
       self.refs.weight.value=''
       self.refs.checkup_date.value=''
       self.refs.time_in.value=''
       self.refs.time_out.value=''
       self.refs.lower_bp.value=''
       self.refs.upper_bp.value=''
       self.refs.bmi.value=''
    }

      self.add = () => {
       if(!self.refs.staff_id.value){
         toastr.info("Please enter Emp ID No and try again")
       }else{
         self.loading = true
         if(self.title=='Create'){
            console.log('create')
           staffbpweightStore.trigger('add_staff_bp_weight', self.refs.staff_id.value,self.refs.checkup_date.value,self.refs.time_in.value,self.refs.time_out.value, self.refs.upper_bp.value,self.refs.lower_bp.value,self.refs.height.value,self.refs.weight.value,self.refs.bmi.value)
         }else if(self.title=='Update'){
           console.log('update')
           console.log(self.edit_id)
           staffbpweightStore.trigger('edit_staff_bp_weight', self.refs.staff_id.value,self.refs.checkup_date.value,self.refs.time_in.value,self.refs.time_out.value, self.refs.upper_bp.value,self.refs.lower_bp.value,self.refs.height.value,self.refs.weight.value,self.refs.bmi.value,self.edit_id)
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
       self.staffBpWeights.map(ev => {
           ev.confirmDelete = false
           ev.confirmEdit = false
       })
     }

     self.confirmDelete = (e) => {
     	console.log(e.item.st.health_id)
     	console.log("+++++++++++++")
       self.staffBpWeights.map(ev => {
       	console.log(ev.health_id)
         if(ev.health_id != e.item.st.health_id){
           ev.confirmDelete = false
         }else{
           ev.confirmDelete = true
         }
       })
     }

     self.delete = (e) => {
       self.loading = true
       staffbpweightStore.trigger('delete_staff_bp_weight', e.item.st.health_id)
     }

     self.edit = (ev,e) => {
       console.log(ev)
       self.title='Update'
        flatpickr(".date", {
         allowInput: true,
         altFormat: "d/m/Y",
         dateFormat: "Y-m-d",
       })

       self.infirmary_staff_view='show_staff_bp_weight_form'
       self.refs.staff_id.value=ev.staff_id
       self.refs.height.value=ev.height
       self.refs.weight.value=ev.weight
       self.refs.checkup_date.value=ev.checkup_date
       self.refs.time_in.value=ev.time_in
       self.refs.time_out.value=ev.time_out
       self.refs.lower_bp.value=ev.lower_bp
       self.refs.upper_bp.value=ev.upper_bp
       self.refs.bmi.value=ev.bmi
       console.log(ev.health_id)
       self.edit_id=ev.health_id
     }

     staffbpweightStore.on('add_staff_bp_weight_changed',AddStaffBPWeightChanged)
     function AddStaffBPWeightChanged(staffBpWeights){
       console.log(staffBpWeights)
       self.title='Create'
       self.refs.staff_id.value=''
       self.refs.height.value=''
       self.refs.weight.value=''
       self.refs.checkup_date.value=''
       self.refs.time_in.value=''
       self.refs.time_out.value=''
       self.refs.upper_bp.value=''
       self.refs.lower_bp.value=''
       self.refs.bmi.value=''
       self.loading = false
       self.staffBpWeights = staffBpWeights
       self.update()
       self.readStaffInfirmary()
       console.log(self.staffBpWeights)
     }

     staffbpweightStore.on('edit_staff_bp_weight_changed',EditStaffBPWeightChanged)
     function EditStaffBPWeightChanged(staffBpWeights){
       console.log(staffBpWeights)
       self.title='Create'
       self.refs.staff_id.value=''
       self.refs.height.value=''
       self.refs.weight.value=''
       self.refs.checkup_date.value=''
       self.refs.time_in.value=''
       self.refs.time_out.value=''
       self.refs.upper_bp.value=''
       self.refs.lower_bp.value=''
       self.refs.bmi.value=''
       self.loading = false
       self.staffBpWeights = staffBpWeights
       self.update()
       self.readStaffInfirmary()

     }

     staffbpweightStore.on('delete_staff_bp_weight_changed',DeleteStaffBPWeightChanged)
     function DeleteStaffBPWeightChanged(staffBpWeights){
       console.log(staffBpWeights)
       self.title='Create'
       self.refs.staff_id.value=''
       self.refs.height.value=''
       self.refs.weight.value=''
       self.refs.checkup_date.value=''
       self.refs.time_in.value=''
       self.refs.time_out.value=''
       self.refs.upper_bp.value=''
       self.refs.lower_bp.value=''
       self.refs.bmi.value=''
       self.loading = false
       self.staffBpWeights = staffBpWeights
       self.update()
       self.readStaffBPWeight()
       console.log(self.staffBpWeights)
     }

     staffbpweightStore.on('read_staff_bp_weight_changed',ReadStaffBPWeightChanged)
     function ReadStaffBPWeightChanged(staffBpWeights){
       console.log(staffBpWeights)
       self.title='Create'
       self.refs.staff_id.value=''
       self.refs.height.value=''
       self.refs.weight.value=''
       self.refs.checkup_date.value=''
       self.refs.time_in.value=''
       self.refs.time_out.value=''
       self.refs.upper_bp.value=''
       self.refs.lower_bp.value=''
       self.refs.bmi.value=''
       self.loading = false
       self.staffBpWeights = staffBpWeights
       self.update()
       console.log(self.staffInfirmarys)
     }

     staffbpweightStore.on('read_employee_changed',EmployeeChanged)
     function EmployeeChanged(employees){
       console.log(employees)
       self.employees = employees
       self.update()
       console.log(self.employees)
     }

});
riot.tag2('infirmary-staff-date-wise-case-report', '<section class="is-fluid" show="{infirmary_staff_view == \'show_staff_date-wise-case-report-table\'}"> <div class="box"> <div class="columns"> <div class="column is-narrow"> <label class="label">Category</label> </div> <div class="column is-narrow"> <div class="control"> <div class="select"> <select ref="read_category_id"> <option each="{infirmaryCategories}" riot-value="{category_id}">{category_name} </option> </select> </div> </div> </div> <div class="column is-narrow"> <label class="label">Start Date</label> </div> <div class="column is-narrow"> <div class="control"> <input class="input date flatpickr-input form-control input" ref="start_date" placeholder="" tabindex="0" type="text"> </div> </div> <div class="column is-narrow"> <label class="label">End Date</label> </div> <div class="column is-narrow"> <div class="control"> <input class="input date flatpickr-input form-control input" ref="end_date" placeholder="" tabindex="0" type="text"> </div> </div> <div class="column"> <button class="button is-danger has-text-weight-bold" onclick="{readStaffInfirmaryDateWiseCaseReport}">Go </button> </div> </div> </div> <div class="level"> <div class="level-left"> <h4 class="title" style="color: #ff3860;">Staff Date Wise Case Report</h4> </div> </div> <table class="table is-fullwidth is-striped is-hoverable is-bordered"> <thead> <tr> <th>#</th> <th>Name</th> <th>Emp ID</th> <th>Case Name</th> <th>Date</th> <th>Time In</th> <th>Time Out</th> <th>Treatment</th> </tr> </thead> <tbody> <tr each="{st, i in staffDateWiseCaseReports}"> <td>{i+1}</td> <td>{st.name}</td> <td>{st.employee_id}</td> <td>{st.case_name}</td> <td>{st.t_date}</td> <td>{st.time_in}</td> <td>{st.time_out}</td> <td>{st.treatment}</td> </tr> </tbody> </table> </section>', '', '', function(opts) {
   var self = this
        self.on("mount", function(){
        self.title='Create'
        self.role = getCookie('role')
        self.infirmary_staff_view='show_staff_date-wise-case-report-table';
        self.readInfirmaryCategory()

        console.log("inside staff infirmary")
        flatpickr(".date", {
         allowInput: true,
         altFormat: "d/m/Y",
         dateFormat: "Y-m-d",
       })
        self.update()
     })
     self.on("unmount", function(){
       staffinfirmaryStore.off('read_staff_date_wise_case_report_changed', ReadStaffDateWiseCaseReportChanged)
         staffinfirmaryStore.off('read_infirmary_category_changed',InfirmaryCategoryChanged)

     })

     self.readStaffInfirmaryDateWiseCaseReport = () => {

           staffinfirmaryStore.trigger('read_staff_date_wise_case_report', self.refs.read_category_id.value,self.refs.start_date.value,self.refs.end_date.value,)

     }

      self.readInfirmaryCategory = () => {
        staffinfirmaryStore.trigger('read_infirmary_category')
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

     staffinfirmaryStore.on('read_staff_date_wise_case_report_changed',ReadStaffDateWiseCaseReportChanged)
     function ReadStaffDateWiseCaseReportChanged(staffDateWiseCaseReports){
       console.log(staffDateWiseCaseReports)
       self.loading = false
       self.staffDateWiseCaseReports = staffDateWiseCaseReports
       self.update()
       console.log(self.staffDateWiseCaseReports)
     }

     staffinfirmaryStore.on('read_infirmary_category_changed',InfirmaryCategoryChanged)
     function InfirmaryCategoryChanged(infirmaryCategories){
       console.log(infirmaryCategories)
       self.infirmaryCategories = infirmaryCategories
       self.update()
       console.log(self.infirmaryCategories)
     }

});
riot.tag2('infirmary-staff-monthly-report', '<section class="is-fluid"> <div class="box"> <div class="columns"> <div class="column is-narrow"> <label class="label">Month</label> </div> <div class="column is-narrow"> <div class="control"> <div class="select"> <select ref="month_id"> <option value="01">JANUARY</option> <option value="02">FEBRUARY</option> <option value="03">MARCH</option> <option value="04">APRIL</option> <option value="05">MAY</option> <option value="06">JUNE</option> <option value="07">JULY</option> <option value="08">AUGUST</option> <option value="09">SEPTEMBER</option> <option value="10">OCTOBER</option> <option value="11">NOVEMBER</option> <option value="12">DECEMBER</option> </select> </div> </div> </div> <div class="column"> <button class="button is-danger has-text-weight-bold" onclick="{readStaffMonthlyCaseReport}">Go </button> </div> </div> </div> <div class="level"> <div class="level-left"> <h4 class="title" style="color: #ff3860;">Staff Monthly Case Report</h4> </div> </div> <table class="table is-fullwidth is-striped is-hoverable is-bordered"> <thead> <tr> <th>#</th> <th>Category</th> <th>Name</th> <th>Date</th> <th>Total</th> </tr> </thead> <tbody> <tr each="{st, i in staffMonthlyCaseReports}"> <td>{i+1}</td> <td>{st.category_name}</td> <td>{st.staff_name}</td> <td>{st.treatment_date}</td> <td>{st.total}</td> </tr> </tbody> </table> </section>', '', '', function(opts) {
   var self = this
        self.on("mount", function(){
        self.title='Create'
        self.role = getCookie('role')

        console.log("inside staff infirmary")
        flatpickr(".date", {
         allowInput: true,
         altFormat: "d/m/Y",
         dateFormat: "Y-m-d",
       })
        self.update()
     })
     self.on("unmount", function(){

      staffinfirmaryStore.off('read_staff_monthly_report_changed',ReadStaffMonthlyCaseReportChanged)
     })

     self.readStaffMonthlyCaseReport = () => {

           staffinfirmaryStore.trigger('read_staff_monthly_case_report', self.refs.month_id.value)
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

    staffinfirmaryStore.on('read_staff_monthly_report_changed',ReadStaffMonthlyCaseReportChanged)
     function ReadStaffMonthlyCaseReportChanged(staffMonthlyCaseReports){
       console.log(staffMonthlyCaseReports)
       self.staffMonthlyCaseReports = staffMonthlyCaseReports
       self.update()
       console.log(self.staffMonthlyCaseReports)
     }

});
riot.tag2('infirmary-staff-report', '<div class="field has-addons"> <p class="control"> <a class="button {is-active: selected_infirmary_staff_report == \'infirmary-staff-date-wise-case-report\'}" href="#/infirmary/infirmary-staff-report/infirmary-staff-date-wise-case-report"> <span>Date Wise Case Report</span> </a> </p> <p class="control"> <a class="button {is-active: selected_infirmary_staff_report == \'infirmary-staff-monthly-report\'}" href="#/infirmary/infirmary-staff-report/infirmary-staff-monthly-report"> <span>Monthly Report</span> </a> </p> <p class="control"> <a class="button {is-active: selected_infirmary_staff_report == \'infirmary-staff-health-card-report\'}" href="#/infirmary/infirmary-staff-report/infirmary-staff-health-card-report"> <span>Health Record</span> </a> </p> </div> <div id="infirmary-staff-report-view"></div>', '', '', function(opts) {
    var self = this
    console.log('opts.selected_infirmary_staff_report')
    console.log(opts.selected_infirmary_staff_report)
    if(!opts.selected_infirmary_staff_report){
      self.selected_infirmary_staff_report = 'infirmary-staff-date-wise-case-report'
    }else{
      self.selected_infirmary_staff_report = opts.selected_infirmary_staff_report
    }
});



riot.tag2('infirmary-staff-wise-report', '<section class="is-fluid"> <div class="box"> <div class="columns"> <div class="column is-narrow"> <label class="label">Employee</label> </div> <div class="column is-narrow"> <div class="control"> <div class="select"> <select ref="staff_id"> <option each="{employees}" riot-value="{emp_id}">{name} </option> </select> </div> </div> </div> <div class="column is-narrow"> <label class="label">Start Date</label> </div> <div class="column is-narrow"> <div class="control"> <input class="input date flatpickr-input form-control input" ref="start_date" placeholder="" tabindex="0" type="text"> </div> </div> <div class="column is-narrow"> <label class="label">End Date</label> </div> <div class="column is-narrow"> <div class="control"> <input class="input date flatpickr-input form-control input" ref="end_date" placeholder="" tabindex="0" type="text"> </div> </div> <div class="column"> <button class="button is-danger has-text-weight-bold" onclick="{readStaffWiseReport}">Go </button> </div> </div> </div> <div class="level"> <div class="level-left"> <h4 class="title" style="color: #ff3860;">Staff Wise Report</h4> </div> </div> <table class="table is-fullwidth is-striped is-hoverable is-bordered"> <thead> <tr> <th>#</th> <th>Checkip Date</th> <th>Weight</th> <th>B.P</th> <th>B.M.I/th> </tr> </thead> <tbody> <tr each="{st, i in staffWiseReports}"> <td>{i+1}</td> <td>{st.checkup_date}</td> <td>{st.weight}</td> <td>{st.blood_presure}</td> <td>{st.bmi}</td> </tr> </tbody> </table> </section>', '', '', function(opts) {
   var self = this
        self.on("mount", function(){
        self.title='Create'
        self.role = getCookie('role')
        self.readEmployee()

        console.log("inside BP")
        flatpickr(".date", {
         allowInput: true,
         altFormat: "d/m/Y",
         dateFormat: "Y-m-d",
       })
        self.update()
     })
     self.on("unmount", function(){
       staffbpweightStore.off('read_staff_wise_report_changed', ReadStaffWiseReportChanged)
       staffbpweightStore.off('read_epmloyee_changed',EmployeeChanged)
     })

     self.readStaffWiseReport = () => {
           staffbpweightStore.trigger('read_staff_wise_report', self.refs.staff_id.value,self.refs.start_date.value,self.refs.end_date.value,)

     }
      self.readEmployee = () => {
        staffbpweightStore.trigger('read_employee')
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

     staffbpweightStore.on('read_staff_wise_report_changed',ReadStaffWiseReportChanged)
     function ReadStaffWiseReportChanged(staffWiseReports){
       console.log(staffWiseReports)
       self.loading = false
       self.staffWiseReports = staffWiseReports
       self.update()
       console.log(self.staffWiseReports)
     }

     staffbpweightStore.on('read_employee_changed',EmployeeChanged)
     function EmployeeChanged(employees){
       console.log(employees)
       self.employees = employees
       self.update()
       console.log(self.employees)
     }

});
riot.tag2('infirmary-staff', '<section class="is-fluid" show="{infirmary_staff_view == \'show_staff_table\'}"> <div class="box"> <div class="columns"> <div class="column is-narrow"> <label class="label">Category</label> </div> <div class="column is-narrow"> <div class="control"> <div class="select"> <select ref="read_category_id"> <option each="{infirmaryCategories}" riot-value="{category_id}">{category_name} </option> </select> </div> </div> </div> <div class="column"> <button class="button is-danger has-text-weight-bold" onclick="{readStaffInfirmary}">Go </button> </div> </div> </div> <div class="level"> <div class="level-left"> <h2 class="title" style="color: #ff3860;">Staff Infirmary</h2> </div> <div class="level-right"> <button class="button is-warning is-rounded" onclick="{add_staff_infirmary}"> <span class="icon"> <span class="fas fa-plus"></span> </span> <span>Add Staff Infirmary</span> </button> </div> </div> <table class="table is-fullwidth is-striped is-hoverable is-bordered"> <thead> <tr> <th>#</th> <th>Name</th> <th>Emp ID</th> <th>Case Name</th> <th>Date</th> <th>Time In</th> <th>Time Out</th> <th>Treatment</th> <th>Action</th> </tr> </thead> <tbody> <tr each="{st, i in staffInfirmarys}"> <td>{i+1}</td> <td>{st.name}</td> <td>{st.employee_id}</td> <td>{st.case_name}</td> <td>{st.t_date}</td> <td>{st.time_in}</td> <td>{st.time_out}</td> <td>{st.treatment}</td> <td class="has-text-right"> <div class="inline-flex rounded border border-grey overflow-hidden" hide="{st.confirmDelete}"> <span><a class="button is-small is-rounded" onclick="{edit.bind(this, st)}">Edit</a></span> <span> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick="{confirmDelete}">Delete</a></span> </div> <div class="table-buttons" if="{st.confirmDelete}"> <span disabled="{loading}" class="button is-small is-rounded" onclick="{delete}"><i class="fa fa-check"></i></span> <soan disabled="{loading}" class="button is-small has-text-danger is-rounded" onclick="{cancelOperation}"><i class="fa fa-times"></i></span> </div> </td> </tr> </tbody> </table> </section> <section class="is-fluid" show="{infirmary_staff_view ==\'show_infirmary_staff_form\'}"> <div class="label"> <div class="level-left"> <h2 class="title" style="color: #ff3860;">{title} Staff Infirmary</h2> </div> <div class="level-right"> <button class="button" onclick="{close_staff_infirmary_form}">Back</button> </div> </div> <div class="box"> <div class="columns is-variable is-1 is-multiline"> <div class="column is-one-third"> <label class="label">Employee</label> <div class="control"> <div class="select is-fullwidth"> <select ref="staff_id"> <option each="{employees}" riot-value="{emp_id}">{name} </option> </select> </div> </div> </div> <div class="column is-one-third"> <label class="label" for="class">Category</label> <div class="control"> <div class="select is-fullwidth"> <select ref="category_id"> <option each="{infirmaryCategories}" riot-value="{category_id}">{category_name} </option> </select> </div> </div> </div> <div class="column is-one-third"> <label class="label" for="class">Case</label> <div class="control"> <div class="select is-fullwidth"> <select ref="case_id"> <option each="{infirmaryCases}" riot-value="{case_id}">{case_name} </option> </select> </div> </div> </div> <div class="column is-one-third"> <label class="label">Date</label> <input class="input date flatpickr-input form-control input" ref="treatment_date" placeholder="" tabindex="0" type="text"> </div> <div class="column is-one-third"> <label class="label">Time In</label> <input type="text" ref="time_in" type="text" class="input"> </div> <div class="column is-one-third"> <label class="label">Time Out</label> <input type="text" ref="time_out" type="text" class="input"> </div> <div class="column is-one-third"> <label class="label">Treatment</label> <input type="text" ref="treatment" type="text" class="input"> </div> <div class="column is-full"> <button class="button is-danger has-text-weight-bold adjusted-top" onclick="{add}">{title}</button> </div> </div> </div> </section>', '', '', function(opts) {
   var self = this
        self.on("mount", function(){
        self.title='Create'
        self.role = getCookie('role')
        self.infirmary_staff_view='show_staff_table'
        self.readInfirmaryCategory()
        self.readInfirmaryCase()
        self.readEmployee()
        console.log("inside staff infirmary")
        flatpickr(".date", {
         allowInput: true,
         altFormat: "d/m/Y",
         dateFormat: "Y-m-d",
       })
        self.update()
     })
     self.on("unmount", function(){
       staffinfirmaryStore.off('read_staff_infirmary_changed', ReadStaffInfirmaryChanged)
       staffinfirmaryStore.off('read_infirmary_category_changed',InfirmaryCategoryChanged)
       staffinfirmaryStore.off('read_infirmary_case_changed',InfirmaryCaseChanged)
       staffinfirmaryStore.off('read_employee_changed',EmployeeChanged)
       staffinfirmaryStore.off('add_staff_infirmary_changed', AddStaffInfirmaryChanged)
       staffinfirmaryStore.off('edit_staff_infirmary_changed',EditStaffInfirmaryChanged)

       staffinfirmaryStore.off('delete_staff_infirmary_changed',DeleteStaffInfirmaryChanged)
     })

     self.readStaffInfirmary = () => {
         self.infirmary_staff_view='show_staff_table'
           staffinfirmaryStore.trigger('read_staff_infirmary', self.refs.read_category_id.value)

     }
      self.readInfirmaryCategory = () => {
        staffinfirmaryStore.trigger('read_infirmary_category')
     }
     self.readEmployee = () => {
        staffinfirmaryStore.trigger('read_employee')
     }
     self.readInfirmaryCase = () => {
        staffinfirmaryStore.trigger('read_infirmary_case')
     }

     self.add_staff_infirmary = () => {
        self.infirmary_staff_view='show_infirmary_staff_form'

     }
    self.close_staff_infirmary_form = () => {
        self.infirmary_staff_view='show_staff_table'

    }

      self.add = () => {
         self.infirmaryCases.map(ev => {
              if(ev.case_id==self.refs.case_id.value){
               self.case_name=ev.case_name;
              }
            })
       if(!self.refs.staff_id.value){
         toastr.info("Please enter Emp ID No and try again")
       }else{
         self.loading = true
         if(self.title=='Create'){
            console.log('create')
           staffinfirmaryStore.trigger('add_staff_infirmary', self.refs.staff_id.value,self.refs.category_id.value,self.refs.case_id.value,self.refs.treatment_date.value,self.refs.time_in.value,self.refs.time_out.value, self.refs.treatment.value, self.case_name)
         }else if(self.title=='Update'){
           console.log('update')
           console.log(self.edit_id)
           staffinfirmaryStore.trigger('edit_staff_infirmary',  self.refs.staff_id.value,self.refs.category_id.value,self.refs.case_id.value,self.refs.treatment_date.value,self.refs.time_in.value,self.refs.time_out.value, self.refs.treatment.value,self.edit_id,self.case_name)
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
       self.staffInfirmarys.map(ev => {
           ev.confirmDelete = false
           ev.confirmEdit = false
       })
     }

     self.confirmDelete = (e) => {
     	console.log(e.item.st.staff_infirmary_id)
     	console.log("+++++++++++++")
       self.staffInfirmarys.map(ev => {
       	console.log(ev.staff_infirmary_id)
         if(ev.staff_infirmary_id != e.item.st.staff_infirmary_id){
           ev.confirmDelete = false
         }else{
           ev.confirmDelete = true
         }
       })
     }

     self.delete = (e) => {
       self.loading = true
       staffinfirmaryStore.trigger('delete_staff_infirmary', e.item.st.staff_infirmary_id)
     }

     self.edit = (ev,e) => {
       console.log(ev)
       self.title='Update'
        flatpickr(".date", {
         allowInput: true,
         altFormat: "d/m/Y",
         dateFormat: "Y-m-d",
       })

       self.infirmary_staff_view='show_infirmary_staff_form'
       self.refs.staff_id.value=ev.staff_id
       self.refs.category_id.value=ev.category_id
       self.refs.case_id.value=ev.case_id
       self.refs.treatment_date.value=ev.treatment_date
       self.refs.time_in.value=ev.time_in
       self.refs.time_out.value=ev.time_out
       self.refs.treatment.value=ev.treatment
       console.log(ev.staff_infirmary_id)
       self.edit_id=ev.staff_infirmary_id
     }

     staffinfirmaryStore.on('add_staff_infirmary_changed',AddStaffInfirmaryChanged)
     function AddStaffInfirmaryChanged(staffInfirmarys){
       console.log(staffInfirmarys)
       self.title='Create'
       self.refs.staff_id.value=''
       self.refs.category_id.value=''
       self.refs.case_id.value=''
       self.refs.treatment_date.value=''
       self.refs.time_in.value=''
       self.refs.time_out.value=''
       self.refs.treatment.value=''
       self.loading = false
       self.staffInfirmarys = staffInfirmarys
       self.update()
       self.readStaffInfirmary()
       console.log(self.staffInfirmarys)
     }

     staffinfirmaryStore.on('edit_staff_infirmary_changed',EditStaffInfirmaryChanged)
     function EditStaffInfirmaryChanged(staffInfirmarys){
       console.log(staffInfirmarys)
       self.title='Create'
       self.refs.staff_id.value=''
       self.refs.category_id.value=''
       self.refs.case_id.value=''
       self.refs.treatment_date.value=''
       self.refs.time_in.value=''
       self.refs.time_out.value=''
       self.refs.treatment.value=''
       self.loading = false
       self.staffInfirmarys = staffInfirmarys
       self.update()
       self.readStaffInfirmary()

     }

     staffinfirmaryStore.on('delete_staff_infirmary_changed',DeleteStaffInfirmaryChanged)
     function DeleteStaffInfirmaryChanged(staffInfirmarys){
       console.log(staffInfirmarys)
       self.title='Create'
       self.refs.staff_id.value=''
       self.refs.category_id.value=''
       self.refs.case_id.value=''
       self.refs.treatment_date.value=''
       self.refs.time_in.value=''
       self.refs.time_out.value=''
       self.refs.treatment.value=''
       self.loading = false
       self.staffInfirmarys = staffInfirmarys
       self.update()
       self.readStudentInfirmary()
       console.log(self.staffInfirmarys)
     }

     staffinfirmaryStore.on('read_staff_infirmary_changed',ReadStaffInfirmaryChanged)
     function ReadStaffInfirmaryChanged(staffInfirmarys){
       console.log(staffInfirmarys)
       self.title='Create'
      self.refs.staff_id.value=''
       self.refs.category_id.value=''
       self.refs.case_id.value=''
       self.refs.treatment_date.value=''
       self.refs.time_in.value=''
       self.refs.time_out.value=''
       self.refs.treatment.value=''
       self.loading = false
       self.staffInfirmarys = staffInfirmarys
       self.update()
       console.log(self.staffInfirmarys)
     }

     staffinfirmaryStore.on('read_infirmary_category_changed',InfirmaryCategoryChanged)
     function InfirmaryCategoryChanged(infirmaryCategories){
       console.log(infirmaryCategories)
       self.infirmaryCategories = infirmaryCategories
       self.update()
       console.log(self.infirmaryCategories)
     }
    staffinfirmaryStore.on('read_infirmary_case_changed',InfirmaryCaseChanged)
     function InfirmaryCaseChanged(infirmaryCases){
       console.log(infirmaryCases)
       self.infirmaryCases = infirmaryCases
       self.update()
       console.log(self.infirmaryCases)
     }
     staffinfirmaryStore.on('read_employee_changed',EmployeeChanged)
     function EmployeeChanged(employees){
       console.log(employees)
       self.employees = employees
       self.update()
       console.log(self.employees)
     }

});
riot.tag2('infirmary-student-report', '<div class="field has-addons"> <p class="control"> <a class="button {is-active: selected_infirmary_student_report == \'infirmary-date-wise-case-report\'}" href="#/infirmary/infirmary-student-report/infirmary-date-wise-case-report"> <span>Date Wise Case Report</span> </a> </p> <p class="control"> <a class="button {is-active: selected_infirmary_student_report == \'class-wise-report\'}" href="#/infirmary/infirmary-student-report/class-wise-report"> <span>Class Wise Report</span> </a> </p> <p class="control"> <a class="button {is-active: selected_infirmary_student_report == \'case-wise-report\'}" href="#/infirmary/infirmary-student-report/case-wise-report"> <span>Case Wise Report</span> </a> </p> </div> <div id="infirmary-student-report-view"></div>', '', '', function(opts) {
    var self = this
    console.log('opts.selected_infirmary_student_report')
    console.log(opts.selected_infirmary_student_report)
    if(!opts.selected_infirmary_student_report){
      self.selected_infirmary_student_report = 'infirmary-date-wise-case-report'
    }else{
      self.selected_infirmary_student_report = opts.selected_infirmary_student_report
    }
});



riot.tag2('infirmary-student', '<section class="is-fluid" show="{infirmary_student_view == \'show_student_table\'}"> <div class="box"> <div class="columns"> <div class="column is-narrow"> <label class="label">Category</label> </div> <div class="column is-narrow"> <div class="control"> <div class="select"> <select ref="read_category_id"> <option each="{infirmaryCategories}" riot-value="{category_id}">{category_name} </option> </select> </div> </div> </div> <div class="column"> <button class="button is-danger has-text-weight-bold" onclick="{readStudentInfirmary}">Go </button> </div> </div> </div> <div class="level"> <div class="level-left"> <h2 class="title" style="color: #ff3860;">Student Infirmary</h2> </div> <div class="level-right"> <button class="button is-warning is-rounded" onclick="{add_student_infirmary}"> <span class="icon"> <span class="fas fa-plus"></span> </span> <span>Add Student Infirmary</span> </button> </div> </div> <table class="table is-fullwidth is-striped is-hoverable is-bordered"> <thead> <tr> <th>#</th> <th>Name</th> <th>Enroll No</th> <th>Class</th> <th>Case Name</th> <th>Date</th> <th>Time In</th> <th>Time Out</th> <th>Treatment</th> <th>Action</th> </tr> </thead> <tbody> <tr each="{st, i in studentInfirmarys}"> <td>{i+1}</td> <td>{st.student_name}</td> <td>{st.enroll_number}</td> <td>{st.standard}</td> <td>{st.case_name}</td> <td>{st.t_date}</td> <td>{st.time_in}</td> <td>{st.time_out}</td> <td>{st.treatment}</td> <td class="has-text-right"> <div class="inline-flex rounded border border-grey overflow-hidden" hide="{st.confirmDelete}"> <span><a class="button is-small is-rounded" onclick="{edit.bind(this, st)}">Edit</a></span> <span> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick="{confirmDelete}">Delete</a></span> </div> <div class="table-buttons" if="{st.confirmDelete}"> <span disabled="{loading}" class="button is-small is-rounded" onclick="{delete}"><i class="fa fa-check"></i></span> <soan disabled="{loading}" class="button is-small has-text-danger is-rounded" onclick="{cancelOperation}"><i class="fa fa-times"></i></span> </div> </td> </tr> </tbody> </table> </section> <section class="is-fluid" show="{infirmary_student_view ==\'show_infirmary_student_form\'}"> <div class="label"> <div class="level-left"> <h2 class="title" style="color: #ff3860;">{title} Student Infirmary</h2> </div> <div class="level-right"> <button class="button" onclick="{close_student_infirmary_form}">Back</button> </div> </div> <div class="box"> <div class="columns is-variable is-1 is-multiline"> <div class="column is-one-third"> <label class="label">Enroll No</label> <input type="text" ref="enroll_number" type="text" class="input"> </div> <div class="column is-one-third"> <label class="label" for="class">Category</label> <div class="control"> <div class="select is-fullwidth"> <select ref="category_id"> <option each="{infirmaryCategories}" riot-value="{category_id}">{category_name} </option> </select> </div> </div> </div> <div class="column is-one-third"> <label class="label" for="class">Case</label> <div class="control"> <div class="select is-fullwidth"> <select ref="case_id"> <option each="{infirmaryCases}" riot-value="{case_id}">{case_name} </option> </select> </div> </div> </div> <div class="column is-one-third"> <label class="label">Date</label> <input class="input date flatpickr-input form-control input" ref="treatment_date" placeholder="" tabindex="0" type="text"> </div> <div class="column is-one-third"> <label class="label">Time In</label> <input type="text" ref="time_in" type="text" class="input"> </div> <div class="column is-one-third"> <label class="label">Time Out</label> <input type="text" ref="time_out" type="text" class="input"> </div> <div class="column is-one-third"> <label class="label">Treatment</label> <input type="text" ref="treatment" type="text" class="input"> </div> <div class="column is-one-third"> <label class="label">Sent Home</label> <input type="checkbox" id="sent_home_check_box"> </div> <div class="column is-full"> <button class="button is-danger has-text-weight-bold adjusted-top" onclick="{add}">{title}</button> </div> </div> </div> </section>', '', '', function(opts) {
   var self = this
        self.on("mount", function(){
        self.title='Create'
        self.role = getCookie('role')
        self.infirmary_student_view='show_student_table'
        self.readInfirmaryCategory()
        self.readInfirmaryCase()

        console.log("inside student infirmary")
        flatpickr(".date", {
         allowInput: true,
         altFormat: "d/m/Y",
         dateFormat: "Y-m-d",
       })
        self.update()
     })
     self.on("unmount", function(){
       studentinfirmaryStore.off('add_student_infirmary_changed', AddStudentInfirmaryChanged)
       studentinfirmaryStore.off('read_student_infirmary_changed', ReadStudentInfirmaryChanged)

       studentinfirmaryStore.off('read_infirmary_category_changed',InfirmaryCategoryChanged)
       studentinfirmaryStore.off('read_infirmary_case_changed',InfirmaryCaseChanged)
       studentinfirmaryStore.off('edit_student_infirmary_changed',EditStudentInfirmaryChanged)
       studentinfirmaryStore.off('delete_student_infirmary_changed',DeleteStudentInfirmaryChanged)
     })

     self.readStudentInfirmary = () => {
         self.infirmary_student_view='show_student_table'
           studentinfirmaryStore.trigger('read_student_infirmary', self.refs.read_category_id.value)

     }
      self.readInfirmaryCategory = () => {
        studentinfirmaryStore.trigger('read_infirmary_category')
     }
     self.readInfirmaryCase = () => {
        studentinfirmaryStore.trigger('read_infirmary_case')
     }

     self.add_student_infirmary = () => {
        self.infirmary_student_view='show_infirmary_student_form'

     }
    self.close_student_infirmary_form = () => {
        self.infirmary_student_view='show_student_table'

    }

      self.add = () => {
      	if($('#sent_home_check_box').is(":checked")){
      		self.sent_home=1;
      	}else{
      		self.sent_home=0;
      	}
         self.infirmaryCases.map(ev => {
              if(ev.case_id==self.refs.category_id.value){
               self.case_name=ev.case_name;
              }
            })
       if(!self.refs.enroll_number.value){
         toastr.info("Please enter Enroll No and try again")
       }else{
         self.loading = true
         if(self.title=='Create'){
            console.log('create')
           studentinfirmaryStore.trigger('add_student_infirmary', self.refs.enroll_number.value,self.refs.category_id.value,self.refs.case_id.value,self.refs.treatment_date.value,self.refs.time_in.value,self.refs.time_out.value, self.refs.treatment.value, self.sent_home,self.case_name)
         }else if(self.title=='Update'){
           console.log('update')
           studentinfirmaryStore.trigger('edit_student_infirmary',  self.refs.enroll_number.value,self.refs.category_id.value,self.refs.case_id.value,self.refs.treatment_date.value,self.refs.time_in.value,self.refs.time_out.value, self.refs.treatment.value, self.sent_home,self.edit_id,self.case_name)
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
       self.studentInfirmarys.map(ev => {
           ev.confirmDelete = false
           ev.confirmEdit = false
       })
     }

     self.confirmDelete = (e) => {
     	console.log(e.item.st.infirmary_id)
     	console.log("+++++++++++++")
       self.studentInfirmarys.map(ev => {
       	console.log(ev.infirmary_id)
         if(ev.infirmary_id != e.item.st.infirmary_id){
           ev.confirmDelete = false
         }else{
           ev.confirmDelete = true
         }
       })
     }

     self.delete = (e) => {
       self.loading = true
       studentinfirmaryStore.trigger('delete_student_infirmary', e.item.st.infirmary_id)
     }

     self.edit = (ev,e) => {
       console.log(ev)
       self.title='Update'
        flatpickr(".date", {
         allowInput: true,
         altFormat: "d/m/Y",
         dateFormat: "Y-m-d",
       })

       self.infirmary_student_view='show_infirmary_student_form'
       self.refs.enroll_number.value=ev.enroll_number
       self.refs.category_id.value=ev.category_id
       self.refs.case_id.value=ev.case_id
       self.refs.treatment_date.value=ev.treatment_date
       self.refs.time_in.value=ev.time_in
       self.refs.time_out.value=ev.time_out
       self.refs.treatment.value=ev.treatment
       self.sent_home
       if(ev.sent_home==1){
       	 $('#sent_home_check_box').prop('checked',true)
       }else{
       	 $('#sent_home_check_box').prop('checked',false)
       }
       self.edit_id = ev.infirmary_id
     }

     studentinfirmaryStore.on('add_student_infirmary_changed',AddStudentInfirmaryChanged)
     function AddStudentInfirmaryChanged(studentInfirmarys){
       console.log(studentInfirmarys)
       self.title='Create'
       self.refs.enroll_number.value=''
       self.refs.category_id.value=''
       self.refs.case_id.value=''
       self.refs.treatment_date.value=''
       self.refs.time_in.value=''
       self.refs.time_out.value=''
       self.refs.treatment.value=''
       self.loading = false
       self.studentInfirmarys = studentInfirmarys
       self.update()
       self.readStudentInfirmary()
       console.log(self.studentInfirmarys)
     }

     studentinfirmaryStore.on('edit_student_infirmary_changed',EditStudentInfirmaryChanged)
     function EditStudentInfirmaryChanged(studentInfirmarys){
       console.log(studentInfirmarys)
       self.title='Create'
       self.refs.enroll_number.value=''
       self.refs.category_id.value=''
       self.refs.case_id.value=''
       self.refs.treatment_date.value=''
       self.refs.time_in.value=''
       self.refs.time_out.value=''
       self.refs.treatment.value=''
       self.loading = false
       self.studentInfirmarys = studentInfirmarys
       self.update()
       self.readStudentInfirmary()

     }

     studentinfirmaryStore.on('delete_student_infirmary_changed',DeleteStudentInfirmaryChanged)
     function DeleteStudentInfirmaryChanged(studentInfirmarys){
       console.log(studentInfirmarys)
       self.title='Create'
       self.refs.enroll_number.value=''
       self.refs.category_id.value=''
       self.refs.case_id.value=''
       self.refs.treatment_date.value=''
       self.refs.time_in.value=''
       self.refs.time_out.value=''
       self.refs.treatment.value=''
       self.loading = false
       self.studentInfirmarys = studentInfirmarys
       self.update()
       self.readStudentInfirmary()
       console.log(self.studentInfirmarys)
     }

     studentinfirmaryStore.on('read_student_infirmary_changed',ReadStudentInfirmaryChanged)
     function ReadStudentInfirmaryChanged(studentInfirmarys){
       console.log(studentInfirmarys)
       self.title='Create'
      self.refs.enroll_number.value=''
       self.refs.category_id.value=''
       self.refs.case_id.value=''
       self.refs.treatment_date.value=''
       self.refs.time_in.value=''
       self.refs.time_out.value=''
       self.refs.treatment.value=''
       self.loading = false
       self.studentInfirmarys = studentInfirmarys
       self.update()
       console.log(self.studentInfirmarys)
     }

     studentinfirmaryStore.on('read_infirmary_category_changed',InfirmaryCategoryChanged)
     function InfirmaryCategoryChanged(infirmaryCategories){
       console.log(infirmaryCategories)
       self.infirmaryCategories = infirmaryCategories
       self.update()
       console.log(self.infirmaryCategories)
     }
      studentinfirmaryStore.on('read_infirmary_case_changed',InfirmaryCaseChanged)
     function InfirmaryCaseChanged(infirmaryCases){
       console.log(infirmaryCases)
       self.infirmaryCases = infirmaryCases
       self.update()
       console.log(self.infirmaryCases)
     }

});
riot.tag2('infirmary', '<div class="field has-addons"> <p class="control"> <a class="button {is-active: selected_master == \'infirmary-student\'}" href="#/infirmary/infirmary-student"> <span>Student Infirmary</span> </a> </p> <p class="control"> <a class="button {is-active: selected_master == \'infirmary-student-report\'}" href="#/infirmary/infirmary-student-report/infirmary-date-wise-case-report">Student Report</a> </a> </p> <p class="control"> <a class="button {is-active: selected_master == \'infirmary-staff\'}" href="#/infirmary/infirmary-staff"> <span>Staff Infirmary</span> </a> </p> <p class="control"> <a class="button {is-active: selected_master == \'infirmary-staff-report\'}" href="#/infirmary/infirmary-staff-report/infirmary-staff-date-wise-case-report"> <span>Staff Report</span> </a> </p> <p class="control"> <a class="button {is-active: selected_master == \'infirmary-staff-bp-weight\'}" href="#/infirmary/infirmary-staff-bp-weight"> <span>Staff B.P/Weight </span> </a> </p> <p class="control"> <a class="button {is-active: selected_master == \'infirmary-staff-bp-weight-report\'}" href="#/infirmary/infirmary-staff-bp-weight-report/infirmary-staff-wise-report"> <span>Staff B.P/Report</span> </a> </p> </div> <div id="infirmary-view"></div>', '', '', function(opts) {
    var self = this
    console.log('opts.selected_master')
    console.log(opts.selected_master)
    if(!opts.selected_master){
      self.selected_master = 'infirmary-student'
    }else{
      self.selected_master = opts.selected_master
    }
});



riot.tag2('inventory-category', '<section class=" is-fluid"> <h2 class="title" style="color: #ff3860;">Inventory Category</h2> <div class="flex items-center mt-2 mb-6 no-print"> <div class="bg-green py-1 rounded w-10"> <div class="bg-grey h-px flex-auto"></div> </div> </div> <div class="box"> <div class="columns"> <div class="column is-narrow"> <label class="label">Department</label> </div> <div class="column is-narrow"> <div class="control"> <div class="select"> <select ref="department"> <option each="{inventoryDepartments}" riot-value="{department}">{department} </option> </select> </div> </div> </div> <div class="column is-narrow"> <label class="label">Category</label> </div> <div class="column is-narrow"> <div class="control"> <input class=" input" ref="category_name" type="text"> </div> </div> <div class="column"> <button class="button is-danger has-text-weight-bold" onclick="{add}">{title} </button> </div> </div> </div> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th>SL</th> <th>Department</th> <th>Category</th> <th></th> </tr> </thead> <tbody> <tr each="{ev, i in inventoryCategories}"> <td>{i+1}</td> <td>{ev.department}</td> <td>{ev.category_name}</td> <td class="has-text-right"> <div class="inline-flex rounded border border-grey overflow-hidden" hide="{ev.confirmDelete}"> <span><a class="button is-small is-rounded" onclick="{edit.bind(this, ev)}">Edit</a></span> <span if="{role==\'ADMIN\'}"> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick="{confirmDelete}">Delete</a></span> </div> <div class="table-buttons" if="{ev.confirmDelete}"> <span disabled="{loading}" class="button is-small is-rounded" onclick="{delete}"><i class="fa fa-check"></i></span> <span disabled="{loading}" class="button is-small has-text-danger is-rounded" onclick="{cancelOperation}"><i class="fa fa-times"></i></span> </div> </td> </tr> </tbody> </table> </section>', '', '', function(opts) {
	var self = this
    self.on("mount", function(){
      self.title='Create'
      self.role = getCookie('role')
      self.update()
      self.readInventoryDepartment()
      self.readInventoryCategory()
    })
    self.on("unmount", function(){
      inventoryCategoryStore.off('add_inventory_category_changed', AddInventoryCategoryChanged)
      inventoryCategoryStore.off('read_inventory_category_changed', ReadInventoryCategoryChanged)

      inventorydepartmentStore.off('read_inventorydepartment_changed', ReadInventoryDepartmentChanged)
      inventoryCategoryStore.off('edit_inventory_category_changed',EditInventoryCategoryChanged)
      inventoryCategoryStore.off('delete_inventory_category_changed',DeleteInventoryCategoryChanged)
    })

    self.readInventoryDepartment = () => {
       inventorydepartmentStore.trigger('read_inventorydepartment')
    }

    self.readInventoryCategory = () => {
       inventoryCategoryStore.trigger('read_inventory_category')
    }

     self.add = () => {
      if(!self.refs.department.value){
        toastr.info("Please enter department and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          console.log('create')
          inventoryCategoryStore.trigger('add_inventory_category', self.refs.department.value,
           self.refs.category_name.value)
        }else if(self.title=='Update'){
          console.log('update')
          inventoryCategoryStore.trigger('edit_inventory_category', self.refs.department.value,
           self.refs.category_name.value, self.edit_id)
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
      self.inventoryCategories.map(ev => {
          ev.confirmDelete = false
          ev.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.inventoryCategories.map(ev => {
        if(ev.category_id != e.item.ev.category_id){
          ev.confirmDelete = false
        }else{
          ev.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      inventoryCategoryStore.trigger('delete_inventory_category', e.item.ev.category_id)
    }

    self.edit = (ev,e) => {
      console.log(ev)
      self.title='Update'
      self.refs.category_name.value = ev.category_name
      self.refs.department.value = ev.department
      self.edit_id = ev.category_id
    }

    inventoryCategoryStore.on('add_inventory_category_changed',AddInventoryCategoryChanged)
    function AddInventoryCategoryChanged(inventoryCategories){
      console.log(inventoryCategories)
      self.title='Create'
      self.refs.category_name.value = ''
      self.refs.department.value = ''
      self.loading = false
      self.inventoryCategories = inventoryCategories
      self.update()

      console.log(self.inventoryCategories)
    }

    inventoryCategoryStore.on('edit_inventory_category_changed',EditInventoryCategoryChanged)
    function EditInventoryCategoryChanged(inventoryCategories){
      console.log(inventoryCategories)
      self.title='Create'
      self.refs.category_name.value = ''
      self.refs.department.value = ''
      self.loading = false
      self.inventoryCategories = inventoryCategories
      self.update()

    }

    inventoryCategoryStore.on('delete_inventory_category_changed',DeleteInventoryCategoryChanged)
    function DeleteInventoryCategoryChanged(inventoryCategories){
      console.log(inventoryCategories)
      self.title='Create'
      self.refs.category_name.value = ''
      self.refs.department.value = ''
      self.loading = false
      self.inventoryCategories = inventoryCategories
      self.update()
      self.readInventoryCategory()
      console.log(self.inventoryCategories)
    }

    inventoryCategoryStore.on('read_inventory_category_changed',ReadInventoryCategoryChanged)
    function ReadInventoryCategoryChanged(inventoryCategories){
      console.log(inventoryCategories)
      self.title='Create'
      self.refs.category_name.value = ''
      self.refs.department.value = ''
      self.loading = false
      self.inventoryCategories = inventoryCategories
      self.update()
      console.log(self.inventoryCategories)
    }

    inventorydepartmentStore.on('read_inventorydepartment_changed',ReadInventoryDepartmentChanged)
    function ReadInventoryDepartmentChanged(inventoryDepartments){
      console.log(inventoryDepartments)
      self.inventoryDepartments = inventoryDepartments
      self.update()
      console.log(self.inventoryDepartments)
    }

});
riot.tag2('inventory-department', '<section class=" is-fluid"> <h2 class="title" style="color: #ff3860;">Inventory Department</h2> <div class="flex items-center mt-2 mb-6 no-print"> <div class="bg-green py-1 rounded w-10"> <div class="bg-grey h-px flex-auto"></div> </div> </div> <div class="box"> <div class="columns"> <div class="column is-narrow"> <label class="label">Department</label> </div> <div class="column is-narrow"> <div class="control"> <div class="control"> <input class=" input" ref="addInventoryDepartmentInput" type="text"> </div> </div> </div> <div class="column"> <button class="button is-danger has-text-weight-bold" onclick="{add}">{title} </button> </div> </div> </div> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th>SL</th> <th>Department</th> <th></th> </tr> </thead> <tbody> <tr each="{ev, i in inventoryDepartments}"> <td>{i+1}</td> <td>{ev.department}</td> <td class="has-text-right"> <div class="inline-flex rounded border border-grey overflow-hidden" hide="{ev.confirmDelete}"> <span><a class="button is-small is-rounded" onclick="{edit.bind(this, ev)}">Edit</a></span> <span if="{role==\'ADMIN\'}"> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick="{confirmDelete}">Delete</a></span> </div> <div class="table-buttons" if="{ev.confirmDelete}"> <span disabled="{loading}" class="button is-small is-rounded" onclick="{delete}"><i class="fa fa-check"></i></span> <span disabled="{loading}" class="button is-small has-text-danger is-rounded" onclick="{cancelOperation}"><i class="fa fa-times"></i></span> </div> </td> </tr> </tbody> </table> </section>', '', '', function(opts) {
	var self = this
    self.on("mount", function(){
      self.title='Create'
      self.role = getCookie('role')
      self.update()
      self.readInventoryDepartment()
    })
    self.on("unmount", function(){
      inventorydepartmentStore.off('add_inventorydepartment_changed', AddInventoryDepartmentChanged)
      inventorydepartmentStore.off('read_inventorydepartment_changed', ReadInventoryDepartmentChanged)
      inventorydepartmentStore.off('edit_inventorydepartment_changed',EditInventoryDepartmentChanged)
      inventorydepartmentStore.off('delete_inventorydepartment_changed',DeleteInventoryDepartmentChanged)
    })

    self.readInventoryDepartment = () => {
       inventorydepartmentStore.trigger('read_inventorydepartment')
    }

     self.add = () => {
      if(!self.refs.addInventoryDepartmentInput.value){
        toastr.info("Please enter Inventory Department and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          console.log('create')
          inventorydepartmentStore.trigger('add_inventorydepartment', self.refs.addInventoryDepartmentInput.value)
        }else if(self.title=='Update'){
          console.log('update')
          inventorydepartmentStore.trigger('edit_inventorydepartment', self.refs.addInventoryDepartmentInput.value,self.edit_id)
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
      self.inventoryDepartments.map(ev => {
          ev.confirmDelete = false
          ev.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.inventoryDepartments.map(ev => {
        if(ev.department != e.item.ev.department){
          ev.confirmDelete = false
        }else{
          ev.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      inventorydepartmentStore.trigger('delete_inventorydepartment', e.item.ev.department)
    }

    self.edit = (ev,e) => {
      console.log(ev)
      self.title='Update'
      self.refs.addInventoryDepartmentInput.value = ev.department
      self.edit_id = ev.department
    }

    inventorydepartmentStore.on('add_inventorydepartment_changed',AddInventoryDepartmentChanged)
    function AddInventoryDepartmentChanged(inventoryDepartments){
      console.log(inventoryDepartments)
      self.title='Create'
      self.refs.addInventoryDepartmentInput.value =''
      self.loading = false
      self.inventoryDepartments = inventoryDepartments
      self.update()
      self.readInventoryDepartment()
      console.log(self.inventoryDepartments)
    }

    inventorydepartmentStore.on('edit_inventorydepartment_changed',EditInventoryDepartmentChanged)
    function EditInventoryDepartmentChanged(inventoryDepartments){
      console.log(inventoryDepartments)
      self.title='Update'
      self.refs.addInventoryDepartmentInput.value =''
      self.loading = false
      self.inventoryDepartments = inventoryDepartments
      self.update()
      self.readInventoryDepartment()

    }

    inventorydepartmentStore.on('delete_inventorydepartment_changed',DeleteInventoryDepartmentChanged)
    function DeleteInventoryDepartmentChanged(inventoryDepartments){
      console.log(inventoryDepartments)
      self.title='Create'
      self.refs.addInventoryDepartmentInput.value =''
      self.loading = false
      self.inventoryDepartments = inventoryDepartments
      self.update()
      self.readInventoryDepartment()
      console.log(self.inventoryDepartments)
    }

    inventorydepartmentStore.on('read_inventorydepartment_changed',ReadInventoryDepartmentChanged)
    function ReadInventoryDepartmentChanged(inventoryDepartments){
      console.log(inventoryDepartments)
      self.title='Create'
      self.refs.addInventoryDepartmentInput.value =''
      self.loading = false
      self.inventoryDepartments = inventoryDepartments
      self.update()
      console.log(self.inventoryDepartments)
    }

});
riot.tag2('inventory-issue', '<section class=" is-fluid" show="{inventory_issue_view == \'show_inventory_issue_table\'}"> <h2 class="title" style="color: #ff3860;">Issue</h2> <div class="flex items-center mt-2 mb-6 no-print"> <div class="bg-green py-1 rounded w-10"> <div class="bg-grey h-px flex-auto"></div> </div> </div> <div class="box"> <div class="columns"> <div class="column is-narrow"> <label class="label" style="margin-left:-14px">Type</label> </div> <div class="column is-narrow"> <div class="control"> <div class="select"> <select ref="r_issue_type"> <option>Staff</option> <option>College</option> <option>Health</option> <option>MV</option> <option>Other</option> </select> </div> </div> </div> <div class="column is-narrow"> <label class="label" style="margin-left:-14px">Category</label> </div> <div class="column is-narrow"> <div class="control"> <div class="select"> <select ref="r_category_id" onchange="{readInventoryIssue}"> <option each="{inventoryCategories}" riot-value="{category_id}">{category_name} </option> </select> </div> </div> </div> </div> </div> <div class="level-right"> <button class="button is-warning is-rounded" onclick="{show_inventory_issue}"> <span class="icon"> <span class="fas fa-plus"></span> </span> <span>Add</span> </button> </div> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th>SL</th> <th>Date</th> <th>Category</th> <th>Item</th> <th>Issue To</th> <th>Quantity</th> <th>Purpose</th> <th></th> </tr> </thead> <tbody> <tr each="{ev, i in inventoryIssues}"> <td>{i+1}</td> <td>{ev.issue_date}</td> <td>{ev.category_name}</td> <td>{ev.item_name}</td> <td>{ev.issue_to} {ev.staff_name}</td> <td>{ev.i_quantity}</td> <td>{ev.purpose}</td> <td class="has-text-right"> <div class="inline-flex rounded border border-grey overflow-hidden" hide="{ev.confirmDelete}"> <span><a class="button is-small is-rounded" onclick="{edit.bind(this, ev)}">Edit</a></span> <span if="{role==\'ADMIN\'}"> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick="{confirmDelete}">Delete</a></span> </div> <div class="table-buttons" if="{ev.confirmDelete}"> <span disabled="{loading}" class="button is-small is-rounded" onclick="{delete}"><i class="fa fa-check"></i></span> <span disabled="{loading}" class="button is-small has-text-danger is-rounded" onclick="{cancelOperation}"><i class="fa fa-times"></i></span> </div> </td> </tr> </tbody> </table> </section> <section class="is-fluid" show="{inventory_issue_view ==\'show_inventory_issue_form\'}"> <div class="label"> <div class="level-left"> <h2 class="title" style="color: #ff3860;">{title} Inventory Issue</h2> </div> <div class="level-right"> <button class="button" onclick="{close_inventory_issue_form}">Back</button> </div> </div> <div class="box"> <div class="columns is-variable is-1 is-multiline"> <div class="column is-one-third"> <label class="label">Issue Date</label> <input class="input date flatpickr-input form-control input" ref="issue_date" placeholder="" tabindex="0" type="text"> </div> <div class="column is-one-third"> <label class="label" for="class">Category</label> <div class="control"> <div class="select is-fullwidth"> <select ref="category_id" onchange="{filterSubcategory}"> <option each="{inventoryCategories}" riot-value="{category_id}">{category_name} </option> </select> </div> </div> </div> <div class="column is-one-third"> <label class="label" for="class">Subcategory</label> <div class="control"> <div class="select is-fullwidth"> <select ref="sub_category_id" onchange="{filterItem}"> <option each="{filteredSubcategories}" riot-value="{sub_category_id}">{sub_category} </option> </select> </div> </div> </div> <div class="column is-one-third"> <label class="label" for="class">Item</label> <div class="control"> <div class="select is-fullwidth"> <select ref="item_id" onchange="{getAvailableItemQuantity}"> <option each="{filteredItems}" riot-value="{item_id}">{item_name}</option> </select> </div> </div> </div> <div class="column is-one-third"> <label class="label" for="class">Return Type</label> <div class="control"> <div class="select is-fullwidth"> <select ref="return_type"> <option value="Y">Retunable</option> <option value="N">Non-Retunable</option> </select> </div> </div> </div> <div class="column is-one-third"> <label class="label" for="class">Type</label> <div class="control"> <div class="select is-fullwidth"> <select ref="issue_type" onchange="{showIssueType}"> <option>Staff</option> <option>College</option> <option>Health</option> <option>MV</option> <option>Other</option> </select> </div> </div> </div> <div class="column is-one-third" show="{show_view == \'show_employee\'}"> <label class="label" for="class">Staff</label> <div class="control"> <div class="select is-fullwidth"> <select ref="staff_id"> <option each="{employees}" riot-value="{emp_id}">{name}</option> </select> </div> </div> </div> <div class="column is-one-third" show="{show_view == \'show_text_box\'}"> <label class="label">Issue To</label> <input type="text" ref="issue_to" type="text" class="input"> </div> <div class="column is-one-third"> <label class="label">In Stock</label> <input type="text" ref="available_quantity" type="text" class="input"> </div> <div class="column is-one-third"> <label class="label">Quantity</label> <input type="text" ref="issue_quantity" type="text" class="input"> </div> <div class="column is-one-third"> <label class="label">Unit</label> <input type="text" ref="unit" type="text" class="input"> </div> <div class="column is-one-third"> <label class="label">Purpose</label> <textarea type="text" ref="purpose" type="text" class="input" rows="3"></textarea> </div> <div class="column is-full"> <button class="button is-danger has-text-weight-bold adjusted-top" onclick="{add}">{title}</button> </div> </div> </div> </section>', '', '', function(opts) {
	var self = this
    self.on("mount", function(){
      self.title='Create'
      self.role = getCookie('role')
      self.inventory_issue_view='show_inventory_issue_table'
      self.refs.issue_type.value='Staff'
      flatpickr(".date", {
         allowInput: true,
         altFormat: "d/m/Y",
         dateFormat: "Y-m-d",
       })
      self.showIssueType()
      self.update()

      self.readInventoryCategory()

      self.readInventorySubcategory()
      self.readEmployee()
      self.readInventoryItem()

    })
  self.on("unmount", function(){
      inventoryCategoryStore.off('read_inventory_category_changed', ReadInventoryCategoryChanged)
      inventoryItemStore.off('read_inventory_item_changed', ReadInventoryItemChanged)
      inventorySubcategoryStore.off('read_inventory_subcategory_changed',ReadInventorySubcategoryChanged)
       staffinfirmaryStore.off('read_employee_changed',EmployeeChanged)
      inventoryIssueStore.off('read_inventory_issue_changed', ReadInventoryIssueChanged)
      inventoryIssueStore.off('add_inventory_issue_changed', AddInventoryIssueChanged)
      inventoryIssueStore.off('edit_inventory_issue_changed', EditInventoryIssueChanged)
      inventoryIssueStore.off('delete_inventory_issue_changed', DeleteInventoryIssueChanged)
      inventoryIssueStore.off('read_inventory_available_quantity_changed', ReadInventoryAvailableQuantityChanged)
  })

    self.showIssueType=()=>{
        console.log(self.refs.issue_type.value)
        if(self.refs.issue_type.value=='Staff'){
          self.show_view='show_employee'
          self.refs.issue_to.value=''
        }else{
          self.show_view='show_text_box'
          self.refs.staff_id.value=''
        }
    }
    self.show_inventory_issue=()=>{
       self.inventory_issue_view='show_inventory_issue_form'
       self.refs.return_type.value='Non-Retunable'
    }
    self.close_inventory_issue_form=()=>{
       self.inventory_issue_view='show_inventory_issue_table'
    }

   self.filterSubcategory = () => {
      self.filteredSubcategories = []
      self.filteredSubcategories = self.inventorySubcategories.filter(s => {
        console.log("inside")
      return s.category_id == self.refs.category_id.value
    })
      self.update()
      console.log(self.filteredSubcategories)
      self.filterItem()
   }

    self.filterItem = () => {
      self.filteredItems = []
      self.filteredItems = self.inventoryItems.filter(s => {
        console.log(s)
        return s.subcategory_id == self.refs.sub_category_id.value
    })
      self.update()
      self.getAvailableItemQuantity()
   }

    self.readInventoryIssue = () => {
       inventoryIssueStore.trigger('read_inventory_issue', self.refs.r_category_id.value,self.refs.r_issue_type.value,)
    }

    self.readInventoryCategory = () => {
       inventoryCategoryStore.trigger('read_inventory_category')
    }

    self.readInventorySubcategory = () => {
       inventorySubcategoryStore.trigger('read_inventory_subcategory')
    }

    self.readInventoryItem = () => {
       inventoryItemStore.trigger('read_inventory_item')
    }
    self.getAvailableItemQuantity = () => {
      console.log("item_id");
      console.log(self.refs.item_id.value);

       inventoryIssueStore.trigger('read_inventory_available_quantity',self.refs.item_id.value)

    }

    self.readEmployee = () => {
        staffinfirmaryStore.trigger('read_employee')
     }

    self.add = () => {
      self.aq=self.refs.available_quantity.value
      self.iq=self.refs.issue_quantity.value
       if(Number(self.aq) < Number(self.iq)){
          toastr.info("Issue Quantity is greater than available stock")
          return
       }
      if(!self.refs.category_id.value){
        toastr.info("Please enter category name and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          console.log('create')
        inventoryIssueStore.trigger('add_inventory_issue', self.refs.issue_date.value, self.refs.category_id.value,self.refs.sub_category_id.value,self.refs.item_id.value,self.refs.return_type.value,self.refs.issue_type.value,self.refs.issue_to.value,self.refs.staff_id.value, self.refs.available_quantity.value,self.refs.issue_quantity.value,self.unit_id,self.refs.purpose.value,self.rack_id)
        }else if(self.title=='Update'){
          console.log('update')
        inventoryIssueStore.trigger('edit_inventory_issue', self.refs.issue_date.value, self.refs.category_id.value,self.refs.sub_category_id.value,self.refs.item_id.value,self.refs.return_type.value,self.refs.issue_type.value,self.refs.issue_to.value,self.refs.staff_id.value, self.refs.available_quantity.value,self.refs.issue_quantity.value,self.unit_id,self.refs.purpose.value , self.rack_id, self.edit_id)
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
      self.inventoryIssues.map(ev => {
          ev.confirmDelete = false
          ev.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.inventoryIssues.map(ev => {
        if(ev.issue_id != e.item.ev.issue_id){
          ev.confirmDelete = false
        }else{
          ev.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      console.log("delet")
      inventoryIssueStore.trigger('delete_inventory_issue', e.item.ev.issue_id)
    }

    self.edit = (ev,e) => {
      console.log("insie edit")
       flatpickr(".date", {
         allowInput: true,
         altFormat: "d/m/Y",
         dateFormat: "Y-m-d",
       })
       self.inventory_issue_view='show_inventory_issue_form'
       self.refs.category_id.value=ev.category_id
       self.filterSubcategory()
       self.update()
       self.refs.sub_category_id.value=ev.sub_category_id
       self.filterItem()
       self.update()
       self.refs.item_id.value=ev.item_id
       self.refs.issue_date.value=ev.iss_date
       self.refs.unit.value=ev.unit
       self.unit_id=ev.unit_id
       self.rack_id=ev.rack_id
       self.refs.available_quantity.value=ev.available_quantity
       self.refs.issue_quantity.value=ev.issue_quantity
       self.refs.issue_type.value=ev.issue_type
       self.refs.return_type.value=ev.return_type
       self.refs.issue_to.value=ev.issue_to
       self.refs.staff_id.value=ev.staff_id
       self.refs.purpose.value=ev.purpose
       self.edit_id = ev.issue_id
       self.title='Update'
       self.inventory_issue_view='show_inventory_issue_form'
    }

    inventoryIssueStore.on('add_inventory_issue_changed',AddInventoryIssueChanged)
    function AddInventoryIssueChanged(inventoryIssues){
      console.log(inventoryIssues)
      self.title='Create'
     self.refs.category_id.value=''
       self.refs.sub_category_id.value=''
       self.refs.item_id.value=''
       self.refs.issue_date.value=''
       self.refs.unit.value=''
       self.refs.available_quantity.value=''
       self.refs.issue_quantity.value=''
       self.refs.issue_type.value=''
       self.refs.return_type.value=''
       self.refs.issue_to.value=''
       self.refs.staff_id.value=''
       self.refs.purpose.value=''
      self.loading = false
      self.update()

      console.log(self.inventoryIssues)
    }

  inventoryIssueStore.on('edit_inventory_issue_changed',EditInventoryIssueChanged)
    function EditInventoryIssueChanged(inventoryIssues){
      console.log(inventoryIssues)
        self.title='Create'
       self.refs.category_id.value=''
       self.refs.sub_category_id.value=''
       self.refs.item_id.value=''
       self.refs.issue_date.value=''
       self.refs.unit.value=''
       self.refs.available_quantity.value=''
       self.refs.issue_quantity.value=''
       self.refs.issue_type.value=''
       self.refs.return_type.value=''
       self.refs.issue_to.value=''
       self.refs.staff_id.value=''
       self.refs.purpose.value=''
      self.loading = false
      self.inventoryIssues = inventoryIssues
      self.update()

    }

    inventoryIssueStore.on('delete_inventory_issue_changed',DeleteInventoryIssueChanged)
    function DeleteInventoryIssueChanged(inventoryIssues){
      console.log(inventoryIssues)
      self.title='Create'
      self.loading = false
      self.inventoryIssues = inventoryIssues
      self.update()

      console.log(self.inventoryIssues)
    }

    inventoryCategoryStore.on('read_inventory_category_changed',ReadInventoryCategoryChanged)
    function ReadInventoryCategoryChanged(inventoryCategories){
      console.log(inventoryCategories)

      self.loading = false
      self.inventoryCategories = inventoryCategories
      self.refs.sub_category_id.value = ''

      self.refs.category_id.value = ''
      self.refs.item_id.value = ''
      self.update()
      console.log(self.inventoryCategories)
      self.readInventoryIssue()
    }

inventoryIssueStore.on('read_inventory_available_quantity_changed',ReadInventoryAvailableQuantityChanged)
    function ReadInventoryAvailableQuantityChanged(availableItems){
      console.log(availableItems)

      self.loading = false
      self.availableItems = availableItems
      if(self.title=='Create'){
      self.refs.available_quantity.value=availableItems[0].total_received - (availableItems[0].total_issued + availableItems[0].total_sale)
      }else{
      self.refs.available_quantity.value=availableItems[0].total_received - (availableItems[0].total_issued + availableItems[0].total_sale) + Number(self.refs.issue_quantity.value);
      }
      self.refs.unit.value=availableItems[0].unit
      self.unit_id=availableItems[0].unit_id
      self.rack_id=availableItems[0].rack_id
      self.update()
      console.log(self.availableItems)
    }
  inventorySubcategoryStore.on('read_inventory_subcategory_changed',ReadInventorySubcategoryChanged)
    function ReadInventorySubcategoryChanged(inventorySubcategories){
      console.log(inventorySubcategories)

      self.loading = false
      self.inventorySubcategories = inventorySubcategories
      self.refs.sub_category_id.value = ''

      self.refs.item_id.value = ''
      self.refs.category_id.value = ''
      self.update()
      console.log(self.inventorySubcategories)
    }

   inventoryItemStore.on('read_inventory_item_changed',ReadInventoryItemChanged)
    function ReadInventoryItemChanged(inventoryItems){
      console.log(inventoryItems)

      self.loading = false
      self.inventoryItems = inventoryItems

      self.update()
      console.log(self.inventoryItems)
    }
    inventoryIssueStore.on('read_inventory_issue_changed',ReadInventoryIssueChanged)
    function ReadInventoryIssueChanged(inventoryIssues){
      console.log(inventoryIssues)
      self.title='Create'
      self.loading = false
      self.inventoryIssues = inventoryIssues
      self.update()
      console.log(self.inventoryIssues)
    }

  staffinfirmaryStore.on('read_employee_changed',EmployeeChanged)
     function EmployeeChanged(employees){
       console.log(employees)
       self.employees = employees
       self.update()
       console.log(self.employees)
     }

});
riot.tag2('inventory-item', '<section class=" is-fluid"> <h2 class="title" style="color: #ff3860;">Inventory Item</h2> <div class="flex items-center mt-2 mb-6 no-print"> <div class="bg-green py-1 rounded w-10"> <div class="bg-grey h-px flex-auto"></div> </div> </div> <div class="box"> <div class="columns"> <div class="column is-narrow"> <label class="label" style="margin-left:-14px">Department</label> </div> <div class="column is-narrow"> <div class="control"> <div class="select"> <select ref="department" style="margin-left:-10px" onchange="{filterCategory}"> <option each="{inventoryDepartments}" riot-value="{department}">{department} </option> </select> </div> </div> </div> <div class="column is-narrow"> <label class="label" style="margin-left:-14px">Category</label> </div> <div class="column is-narrow"> <div class="control"> <div class="select"> <select ref="category_id" style="margin-left:-10px" onchange="{filterSubcategory}"> <option each="{filteredCategories}" riot-value="{category_id}">{category_name} </option> </select> </div> </div> </div> <div class="column is-narrow"> <label class="label" style="margin-left:-14px">Subcategory</label> </div> <div class="column is-narrow"> <div class="control"> <div class="select"> <select ref="sub_category_id" style="margin-left:-10px"> <option each="{filteredSubcategories}" riot-value="{sub_category_id}">{sub_category} </option> </select> </div> </div> </div> <div class="column is-narrow"> <label class="label" style="margin-left:-14px">Item</label> </div> <div class="column is-narrow"> <div class="control"> <input class=" input" ref="item_name" type="text" style="margin-left:-10px"> </div> </div> <div class="column"> <button class="button is-danger has-text-weight-bold" style="margin-left:-20px" onclick="{add}">{title} </button> </div> </div> </div> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th>SL</th> <th>Department</th> <th>Category</th> <th>Subcategory</th> <th>Item</th> <th></th> </tr> </thead> <tbody> <tr each="{ev, i in inventoryItems}"> <td>{i+1}</td> <td>{ev.department}</td> <td>{ev.category_name}</td> <td>{ev.sub_category}</td> <td>{ev.item_name}</td> <td class="has-text-right"> <div class="inline-flex rounded border border-grey overflow-hidden" hide="{ev.confirmDelete}"> <span><a class="button is-small is-rounded" onclick="{edit.bind(this, ev)}">Edit</a></span> <span if="{role==\'ADMIN\'}"> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick="{confirmDelete}">Delete</a></span> </div> <div class="table-buttons" if="{ev.confirmDelete}"> <span disabled="{loading}" class="button is-small is-rounded" onclick="{delete}"><i class="fa fa-check"></i></span> <span disabled="{loading}" class="button is-small has-text-danger is-rounded" onclick="{cancelOperation}"><i class="fa fa-times"></i></span> </div> </td> </tr> </tbody> </table> </section>', '', '', function(opts) {
	var self = this
    self.on("mount", function(){
      self.title='Create'
      self.role = getCookie('role')
      self.update()
      self.readInventoryDepartment()
      self.readInventoryCategory()
      self.readInventorySubcategory()
      self.readInventoryItem()
    })
self.on("unmount", function(){
  inventoryCategoryStore.off('read_inventory_category_changed', ReadInventoryCategoryChanged)
  inventorydepartmentStore.off('read_inventorydepartment_changed', ReadInventoryDepartmentChanged)
  inventorySubcategoryStore.off('read_inventory_subcategory_changed',ReadInventorySubcategoryChanged)

  inventoryItemStore.off('read_inventory_item_changed', ReadInventoryItemChanged)
  inventoryItemStore.off('add_inventory_item_changed', AddInventoryItemChanged)
  inventoryItemStore.off('edit_inventory_item_changed',EditInventoryItemChanged)
  inventoryItemStore.off('delete_inventory_item_changed',DeleteInventoryItemChanged)
})

    self.filterCategory = () => {
      self.filteredCategories = []
      self.filteredCategories = self.inventoryCategories.filter(s => {
       return s.department == self.refs.department.value
      })
       self.update()
      console.log(self.refs.category_id.value)
       self.filterSubcategory()
   }
   self.filterSubcategory = () => {
      self.filteredSubcategories = []
      self.filteredSubcategories = self.inventorySubcategories.filter(s => {
      return s.category_id == self.refs.category_id.value
    })
      self.update()
      console.log(self.filteredSubcategories)

   }

    self.readInventoryDepartment = () => {
       inventorydepartmentStore.trigger('read_inventorydepartment')
    }

    self.readInventoryCategory = () => {
       inventoryCategoryStore.trigger('read_inventory_category')
    }

    self.readInventorySubcategory = () => {
       inventorySubcategoryStore.trigger('read_inventory_subcategory')
    }

    self.readInventoryItem = () => {
       inventoryItemStore.trigger('read_inventory_item')
    }

     self.add = () => {
      if(!self.refs.department.value){
        toastr.info("Please enter department and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          console.log('create')
        inventoryItemStore.trigger('add_inventory_item', self.refs.department.value,
           self.refs.category_id.value,self.refs.sub_category_id.value,self.refs.item_name.value)
        }else if(self.title=='Update'){
          console.log('update')
        inventoryItemStore.trigger('edit_inventory_item', self.refs.department.value,
           self.refs.category_id.value,self.refs.sub_category_id.value,self.refs.item_name.value, self.edit_id)
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
      self.inventoryItems.map(ev => {
          ev.confirmDelete = false
          ev.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.inventoryItems.map(ev => {
        if(ev.item_id != e.item.ev.item_id){
          ev.confirmDelete = false
        }else{
          ev.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      inventoryItemStore.trigger('delete_inventory_item', e.item.ev.item_id)
    }

    self.edit = (ev,e) => {
      console.log(ev)
      self.title='Update'

      self.refs.department.value = ev.department

       self.filterCategory()
       self.update()
       self.refs.category_id.value=ev.category_id
       self.filterSubcategory()
       self.update()
       self.refs.sub_category_id.value=ev.subcategory_id

      self.refs.item_name.value = ev.item_name
      self.edit_id = ev.item_id
    }

    inventoryItemStore.on('add_inventory_item_changed',AddInventoryItemChanged)
    function AddInventoryItemChanged(inventoryItems){
      console.log(inventoryItems)
      self.title='Create'
      self.refs.category_id.value = ''
      self.refs.department.value = ''
      self.refs.sub_category_id.value = ''
      self.refs.item_name.value = ''
      self.loading = false
      self.inventoryItems = inventoryItems
      self.update()

      console.log(self.inventoryItems)
    }

  inventoryItemStore.on('edit_inventory_item_changed',EditInventoryItemChanged)
    function EditInventoryItemChanged(inventoryItems){
      console.log(inventoryItems)
      self.title='Create'
      self.refs.category_id.value = ''
      self.refs.department.value = ''
      self.refs.item_name.value = ''
      self.refs.sub_category_id.value = ''
      self.loading = false
      self.inventoryItems = inventoryItems
      self.update()

    }

    inventoryItemStore.on('delete_inventory_item_changed',DeleteInventoryItemChanged)
    function DeleteInventoryItemChanged(inventoryItems){
      console.log(inventoryItems)
      self.title='Create'
      self.refs.sub_category.value = ''
      self.refs.item_name.value = ''
      self.refs.department.value = ''
      self.refs.category_id.value = ''
      self.loading = false
      self.inventoryItems = inventoryItems
      self.update()
      self.readInventoryItem()
      console.log(self.inventoryItems)
    }

    inventoryCategoryStore.on('read_inventory_category_changed',ReadInventoryCategoryChanged)
    function ReadInventoryCategoryChanged(inventoryCategories){
      console.log(inventoryCategories)
      self.title='Create'
      self.loading = false
      self.inventoryCategories = inventoryCategories
      self.refs.sub_category_id.value = ''
      self.refs.department.value = ''
      self.refs.category_id.value = ''
      self.refs.item_name.value = ''
      self.update()
      console.log(self.inventoryCategories)
    }
  inventorySubcategoryStore.on('read_inventory_subcategory_changed',ReadInventorySubcategoryChanged)
    function ReadInventorySubcategoryChanged(inventorySubcategories){
      console.log(inventorySubcategories)
      self.title='Create'
      self.loading = false
      self.inventorySubcategories = inventorySubcategories
      self.refs.sub_category_id.value = ''
      self.refs.department.value = ''
      self.refs.item_name.value = ''
      self.refs.category_id.value = ''
      self.update()
      console.log(self.inventorySubcategories)
    }

   inventoryItemStore.on('read_inventory_item_changed',ReadInventoryItemChanged)
    function ReadInventoryItemChanged(inventoryItems){
      console.log(inventoryItems)
      self.title='Create'
      self.loading = false
      self.inventoryItems = inventoryItems
      self.refs.sub_category_id.value = ''
      self.refs.department.value = ''
      self.refs.item_name.value = ''
      self.refs.category_id.value = ''
      self.update()
      console.log(self.inventoryItems)
    }

    inventorydepartmentStore.on('read_inventorydepartment_changed',ReadInventoryDepartmentChanged)
    function ReadInventoryDepartmentChanged(inventoryDepartments){
      console.log(inventoryDepartments)
      self.inventoryDepartments = inventoryDepartments
      self.update()
      console.log(self.inventoryDepartments)
    }

});
riot.tag2('inventory-rack', '<section class=" is-fluid"> <h2 class="title has-text-centered" style="color: #ff3860;">Inventory Rack</h2> <div class="flex items-center mt-2 mb-6 no-print"> <div class="bg-green py-1 rounded w-10"> <div class="bg-grey h-px flex-auto"></div> </div> </div> <div class="box"> <div class="columns"> <div class="column is-half"> <div class="field"> <label class="label" for="role">Rack</label> <div class="control"> <input class="input" type="text" ref="rack_name" onkeyup="{addEnter}"> </div> </div> </div> <div class="column is-narrow"> <div class="field"> <div class="control"> <button class="button is-danger has-text-weight-bold adjusted-top" onclick="{add}">{title}</button> </div> </div> </div> </div> </div> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th>SL</th> <th>Rack Name</th> <th></th> </tr> </thead> <tbody> <tr each="{c, i in inventoryRacks}"> <td>{i+1}</td> <td>{c.rack_name}</td> <td class="has-text-right"> <div class="inline-flex rounded border border-grey overflow-hidden" hide="{c.confirmDelete}"> <span><a class="button is-small is-rounded" onclick="{edit.bind(this, c)}">Edit</a></span> <span if="{role==\'ADMIN\'}"> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick="{confirmDelete}">Delete</a></span> </div> <div class="table-buttons" if="{c.confirmDelete}"> <span disabled="{loading}" class="button is-small is-rounded" onclick="{delete}"><i class="fa fa-check"></i></span> <span disabled="{loading}" class="button is-small has-text-danger is-rounded" onclick="{cancelOperation}"><i class="fa fa-times"></i></span> </div> </td> </tr> </tbody> </table> </section>', '', '', function(opts) {
	   var self = this
      self.on("mount", function(){
      self.title='Create'
      self.role = getCookie('role')
      self.update()
      self.readInventoryRack()
    })
    self.on("unmount", function(){
      inventoryRackStore.off('inventoryRack_changed', InventoryRackChanged)
    })

    self.readInventoryRack = () => {
       inventoryRackStore.trigger('read_inventory_rack')
    }

     self.add = () => {
      if(!self.refs.rack_name.value){
        toastr.info("Please enter Rack and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          console.log('create')
          inventoryRackStore.trigger('add_inventory_rack', self.refs.rack_name.value)
        }else if(self.title=='Update'){
          console.log('update')
          inventoryRackStore.trigger('edit_inventory_rack', self.refs.rack_name.value,
            self.edit_id)
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
      self.inventoryRacks.map(c => {
          c.confirmDelete = false
          c.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.inventoryRacks.map(c => {
        if(c.rack_id != e.item.c.rack_id){
          c.confirmDelete = false
        }else{
          c.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      inventoryRackStore.trigger('delete_inventory_rack', e.item.c.rack_id)
    }

    self.edit = (c,e) => {
      console.log(c)
      self.title='Update'
      self.refs.rack_name.value = c.rack_name
      self.edit_id = c.rack_id
    }

    inventoryRackStore.on('inventoryRack_changed',InventoryRackChanged)
    function InventoryRackChanged(inventoryRacks){
      console.log(inventoryRacks)
      self.title='Create'
      self.refs.rack_name.value = ''
      self.loading = false
      self.inventoryRacks = inventoryRacks

      self.update()
      console.log(self.inventoryRacks)
    }

});
riot.tag2('inventory-sale', '<section class=" is-fluid" show="{inventory_sale_view == \'show_inventory_sale_table\'}"> <h2 class="title" style="color: #ff3860;">Sale</h2> <div class="flex items-center mt-2 mb-6 no-print"> <div class="bg-green py-1 rounded w-10"> <div class="bg-grey h-px flex-auto"></div> </div> </div> <div class="box"> <div class="columns"> <div class="column is-narrow"> <label class="label" style="margin-left:-14px">Category</label> </div> <div class="column is-narrow"> <div class="control"> <div class="select"> <select ref="r_category_id" onchange="{readInventorySale}"> <option each="{inventoryCategories}" riot-value="{category_id}">{category_name} </option> </select> </div> </div> </div> </div> </div> <div class="level-right"> <button class="button is-warning is-rounded" onclick="{show_inventory_sale}"> <span class="icon"> <span class="fas fa-plus"></span> </span> <span>Add</span> </button> </div> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th>SL</th> <th>Date</th> <th>Category</th> <th>Item</th> <th>Quantity</th> <th>Rate</th> <th>Amount</th> <th>Sale To</th> <th></th> </tr> </thead> <tbody> <tr each="{ev, i in inventorySales}"> <td>{i+1}</td> <td>{ev.sa_date}</td> <td>{ev.category_name}</td> <td>{ev.item_name}</td> <td>{ev.quantity}</td> <td>{ev.sale_rate}</td> <td>{ev.amount}</td> <td>{ev.sale_to}</td> <td class="has-text-right"> <div class="inline-flex rounded border border-grey overflow-hidden" hide="{ev.confirmDelete}"> <span><a class="button is-small is-rounded" onclick="{edit.bind(this, ev)}">Edit</a></span> <span if="{role==\'ADMIN\'}"> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick="{confirmDelete}">Delete</a></span> </div> <div class="table-buttons" if="{ev.confirmDelete}"> <span disabled="{loading}" class="button is-small is-rounded" onclick="{delete}"><i class="fa fa-check"></i></span> <span disabled="{loading}" class="button is-small has-text-danger is-rounded" onclick="{cancelOperation}"><i class="fa fa-times"></i></span> </div> </td> </tr> </tbody> </table> </section> <section class="is-fluid" show="{inventory_sale_view ==\'show_inventory_sale_form\'}"> <div class="label"> <div class="level-left"> <h2 class="title" style="color: #ff3860;">{title} Inventory Sale</h2> </div> <div class="level-right"> <button class="button" onclick="{close_inventory_sale_form}">Back</button> </div> </div> <div class="box"> <div class="columns is-variable is-1 is-multiline"> <div class="column is-one-third"> <label class="label">Sale Date</label> <input class="input date flatpickr-input form-control input" ref="sale_date" placeholder="" tabindex="0" type="text"> </div> <div class="column is-one-third"> <label class="label" for="class">Category</label> <div class="control"> <div class="select is-fullwidth"> <select ref="category_id" onchange="{filterSubcategory}"> <option each="{inventoryCategories}" riot-value="{category_id}">{category_name} </option> </select> </div> </div> </div> <div class="column is-one-third"> <label class="label" for="class">Subcategory</label> <div class="control"> <div class="select is-fullwidth"> <select ref="sub_category_id" onchange="{filterItem}"> <option each="{filteredSubcategories}" riot-value="{sub_category_id}">{sub_category} </option> </select> </div> </div> </div> <div class="column is-one-third"> <label class="label" for="class">Item</label> <div class="control"> <div class="select is-fullwidth"> <select ref="item_id" onchange="{getAvailableItemQuantity}"> <option each="{filteredItems}" riot-value="{item_id}">{item_name}</option> </select> </div> </div> </div> <div class="column is-one-third"> <label class="label">In Stock</label> <input type="text" ref="available_quantity" type="text" class="input"> </div> <div class="column is-one-third"> <label class="label">Quantity</label> <input type="text" ref="sale_quantity" type="text" class="input"> </div> <div class="column is-one-third"> <label class="label">Unit</label> <input type="text" ref="unit" type="text" class="input"> </div> <div class="column is-one-third"> <label class="label">Rate</label> <input type="text" ref="rate" type="text" class="input"> </div> <div class="column is-one-third"> <label class="label">Sale To</label> <input type="text" ref="sale_to" type="text" class="input"> </div> <div class="column is-full"> <button class="button is-danger has-text-weight-bold adjusted-top" onclick="{add}">{title}</button> </div> </div> </div> </section>', '', '', function(opts) {
	var self = this
    self.on("mount", function(){
      self.title='Create'
      self.role = getCookie('role')
      self.inventory_sale_view='show_inventory_sale_table'

      flatpickr(".date", {
         allowInput: true,
         altFormat: "d/m/Y",
         dateFormat: "Y-m-d",
       })

      self.update()

      self.readInventoryCategory()

      self.readInventorySubcategory()

      self.readInventoryItem()

    })
  self.on("unmount", function(){
      inventoryCategoryStore.off('read_inventory_category_changed', ReadInventoryCategoryChanged)
      inventoryItemStore.off('read_inventory_item_changed', ReadInventoryItemChanged)
      inventorySubcategoryStore.off('read_inventory_subcategory_changed',ReadInventorySubcategoryChanged)
      inventoryIssueStore.off('read_inventory_available_quantity_changed', ReadInventoryAvailableQuantityChanged)

      inventorySaleStore.off('read_inventory_sale_changed', ReadInventorySaleChanged)
      inventorySaleStore.off('add_inventory_sale_changed', AddInventorySaleChanged)
      inventorySaleStore.off('edit_inventory_sale_changed', EditInventorySaleChanged)
      inventorySaleStore.off('delete_inventory_sale_changed', DeleteInventorySaleChanged)
  })

    self.show_inventory_sale=()=>{
       self.inventory_sale_view='show_inventory_sale_form'
       self.title='Create'
       self.refs.category_id.value=''
       self.refs.sub_category_id.value=''
       self.refs.item_id.value=''
       self.refs.sale_date.value=''
       self.refs.unit.value=''
       self.refs.available_quantity.value=''
       self.refs.sale_quantity.value=''
       self.refs.rate.value=''
       self.refs.sale_to.value=''

    }
    self.close_inventory_sale_form=()=>{
       self.inventory_sale_view='show_inventory_sale_table'
       self.title='Create'
       self.refs.category_id.value=''
       self.refs.sub_category_id.value=''
       self.refs.item_id.value=''
       self.refs.sale_date.value=''
       self.refs.unit.value=''
       self.refs.available_quantity.value=''
       self.refs.sale_quantity.value=''
       self.refs.rate.value=''
       self.refs.sale_to.value=''
    }

   self.filterSubcategory = () => {
      self.filteredSubcategories = []
      self.filteredSubcategories = self.inventorySubcategories.filter(s => {
        console.log("inside")
      return s.category_id == self.refs.category_id.value
    })
      self.update()
      console.log(self.filteredSubcategories)
      self.filterItem()
   }

    self.filterItem = () => {
      self.filteredItems = []
      self.filteredItems = self.inventoryItems.filter(s => {
        console.log(s)
      return s.subcategory_id == self.refs.sub_category_id.value
    })
      self.update()
      self.getAvailableItemQuantity()
   }

    self.readInventorySale = () => {
       inventorySaleStore.trigger('read_inventory_sale', self.refs.r_category_id.value)
    }

    self.readInventoryCategory = () => {
       inventoryCategoryStore.trigger('read_inventory_category')
    }

    self.readInventorySubcategory = () => {
       inventorySubcategoryStore.trigger('read_inventory_subcategory')
    }

    self.readInventoryItem = () => {
       inventoryItemStore.trigger('read_inventory_item')
    }
    self.getAvailableItemQuantity = () => {
       inventoryIssueStore.trigger('read_inventory_available_quantity',self.refs.item_id.value)
    }

    self.add = () => {
      self.aq=self.refs.available_quantity.value
      self.iq=self.refs.sale_quantity.value
       if(Number(self.aq) < Number(self.iq)){
          toastr.info("Sale Quantity is greater than available stock")
          return
       }
      if(!self.refs.category_id.value){
        toastr.info("Please enter category name and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          console.log('create')
        inventorySaleStore.trigger('add_inventory_sale', self.refs.sale_date.value, self.refs.category_id.value,self.refs.sub_category_id.value,self.refs.item_id.value,self.refs.sale_to.value, self.refs.available_quantity.value,self.refs.sale_quantity.value,self.unit_id,self.refs.rate.value)
        }else if(self.title=='Update'){
          console.log('update')
        inventorySaleStore.trigger('edit_inventory_sale', self.refs.sale_date.value, self.refs.category_id.value,self.refs.sub_category_id.value,self.refs.item_id.value,self.refs.sale_to.value, self.refs.available_quantity.value,self.refs.sale_quantity.value,self.unit_id,self.refs.rate.value , self.edit_id)
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
      self.inventorySales.map(ev => {
          ev.confirmDelete = false
          ev.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.inventorySales.map(ev => {
        if(ev.sale_id != e.item.ev.sale_id){
          ev.confirmDelete = false
        }else{
          ev.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      console.log("delet")
      inventorySaleStore.trigger('delete_inventory_sale', e.item.ev.sale_id)
    }

    self.edit = (ev,e) => {
      console.log("insie edit")
       flatpickr(".date", {
         allowInput: true,
         altFormat: "d/m/Y",
         dateFormat: "Y-m-d",
       })
       self.inventory_sale_view='show_inventory_sale_form'
       self.refs.category_id.value=ev.category_id
       self.filterSubcategory()
       self.update()
       self.refs.sub_category_id.value=ev.sub_category_id
       self.filterItem()
       self.update()
       self.refs.item_id.value=ev.item_id
       self.refs.sale_date.value=ev.sale_date
       self.refs.unit.value=ev.unit
       self.unit_id=ev.unit_id
       self.refs.rate.value=ev.sale_rate
       self.refs.available_quantity.value=ev.available_quantity
       self.refs.sale_quantity.value=ev.sale_quantity

       self.refs.sale_to.value=ev.sale_to

       self.edit_id = ev.sale_id
       self.title='Update'
       self.inventory_sale_view='show_inventory_sale_form'
    }

    inventorySaleStore.on('add_inventory_sale_changed',AddInventorySaleChanged)
    function AddInventorySaleChanged(inventorySales){
      console.log(inventorySales)
      self.title='Create'
     self.refs.category_id.value=''
       self.refs.sub_category_id.value=''
       self.refs.item_id.value=''
       self.refs.sale_date.value=''
       self.refs.unit.value=''
       self.refs.rate.value=''
       self.refs.available_quantity.value=''
       self.refs.sale_quantity.value=''

       self.refs.sale_to.value=''
       self.refs.rate.value=''

      self.loading = false
      self.update()

      console.log(self.inventorySales)
    }

  inventorySaleStore.on('edit_inventory_sale_changed',EditInventorySaleChanged)
    function EditInventorySaleChanged(inventorySales){
      console.log(inventorySales)
       self.title='Create'
       self.refs.category_id.value=''
       self.refs.sub_category_id.value=''
       self.refs.item_id.value=''
       self.refs.sale_date.value=''
       self.refs.unit.value=''
       self.refs.available_quantity.value=''
       self.refs.sale_quantity.value=''
       self.refs.rate.value=''

       self.refs.sale_to.value=''

      self.loading = false
      self.inventorySales = inventorySales
      self.update()

    }

    inventorySaleStore.on('delete_inventory_sale_changed',DeleteInventorySaleChanged)
    function DeleteInventorySaleChanged(inventorySales){
      console.log(inventorySales)
      self.title='Create'
      self.loading = false
      self.inventorySales = inventorySales
      self.update()

      console.log(self.inventorySales)
    }

    inventoryCategoryStore.on('read_inventory_category_changed',ReadInventoryCategoryChanged)
    function ReadInventoryCategoryChanged(inventoryCategories){
      console.log(inventoryCategories)

      self.loading = false
      self.inventoryCategories = inventoryCategories
      self.refs.sub_category_id.value = ''

      self.refs.category_id.value = ''
      self.refs.item_id.value = ''
      self.update()
      console.log(self.inventoryCategories)
      self.readInventorySale()
    }

inventoryIssueStore.on('read_inventory_available_quantity_changed',ReadInventoryAvailableQuantityChanged)
    function ReadInventoryAvailableQuantityChanged(availableItems){
      console.log(availableItems)

      self.loading = false
      self.availableItems = availableItems
      if(availableItems[0].total_issued==null || availableItems[0].total_issued==''){
        availableItems[0].total_issued=0;
      }
      if(availableItems[0].total_sale==null || availableItems[0].total_sale==''){
        availableItems[0].total_sale=0;
      }
       if(self.title=='Create'){
         self.refs.available_quantity.value=availableItems[0].total_received - (availableItems[0].total_issued + availableItems[0].total_sale)
        }else{
          self.refs.available_quantity.value=availableItems[0].total_received - (availableItems[0].total_issued + availableItems[0].total_sale) + Number(self.refs.sale_quantity.value)
          console.log("inside")
        }
      self.refs.unit.value=availableItems[0].unit
      self.unit_id=availableItems[0].unit_id
      self.update()
      console.log(self.availableItems)
    }
  inventorySubcategoryStore.on('read_inventory_subcategory_changed',ReadInventorySubcategoryChanged)
    function ReadInventorySubcategoryChanged(inventorySubcategories){
      console.log(inventorySubcategories)

      self.loading = false
      self.inventorySubcategories = inventorySubcategories
      self.refs.sub_category_id.value = ''

      self.refs.item_id.value = ''
      self.refs.category_id.value = ''
      self.update()
      console.log(self.inventorySubcategories)
    }

   inventoryItemStore.on('read_inventory_item_changed',ReadInventoryItemChanged)
    function ReadInventoryItemChanged(inventoryItems){
      console.log(inventoryItems)

      self.loading = false
      self.inventoryItems = inventoryItems

      self.update()
      console.log(self.inventoryItems)
    }
    inventorySaleStore.on('read_inventory_sale_changed',ReadInventorySaleChanged)
    function ReadInventorySaleChanged(inventorySales){
      console.log(inventorySales)
      self.title='Create'
      self.loading = false
      self.inventorySales = inventorySales
      self.update()
      console.log(self.inventorySales)
    }

});
riot.tag2('inventory-setting', '<div class="field has-addons"> <p class="control"> <a class="button {is-active: selected_master == \'inventory-rack\'}" href="#/inventory-setting/inventory-rack"> <span>Rack</span> </a> </p> <p class="control"> <a class="button {is-active: selected_master == \'inventory-unit\'}" href="#/inventory-setting/inventory-unit"> <span>Unit</span> </a> </p> <p class="control"> <a class="button {is-active: selected_master == \'inventory-category\'}" href="#/inventory-setting/inventory-category"> <span>Category</span> </a> </p> <p class="control"> <a class="button {is-active: selected_master == \'inventory-subcategory\'}" href="#/inventory-setting/inventory-subcategory"> <span>Sub Category</span> </a> </p> <p class="control"> <a class="button {is-active: selected_master == \'inventory-item\'}" href="#/inventory-setting/inventory-item"> <span>Item</span> </a> </p> </div> <div id="inventory-setting-view"></div>', '', '', function(opts) {
    var self = this
    console.log('opts.selected_master')
    console.log(opts.selected_master)
    if(!opts.selected_master){
      self.selected_master = 'inventory-rack'
    }else{
      self.selected_master = opts.selected_master
    }
});



riot.tag2('inventory-item', '<section class=" is-fluid"> <h2 class="title" style="color: #ff3860;">Inventory Item</h2> <div class="flex items-center mt-2 mb-6 no-print"> <div class="bg-green py-1 rounded w-10"> <div class="bg-grey h-px flex-auto"></div> </div> </div> <div class="box"> <div class="columns"> <div class="column is-narrow"> <label class="label" style="margin-left:-14px">Department</label> </div> <div class="column is-narrow"> <div class="control"> <div class="select"> <select ref="department" style="margin-left:-10px" onchange="{filterCategory}"> <option each="{inventoryDepartments}" riot-value="{department}">{department} </option> </select> </div> </div> </div> <div class="column is-narrow"> <label class="label" style="margin-left:-14px">Category</label> </div> <div class="column is-narrow"> <div class="control"> <div class="select"> <select ref="category_id" style="margin-left:-10px" onchange="{filterSubcategory}"> <option each="{filteredCategories}" riot-value="{category_id}">{category_name} </option> </select> </div> </div> </div> <div class="column is-narrow"> <label class="label" style="margin-left:-14px">Subcategory</label> </div> <div class="column is-narrow"> <div class="control"> <div class="select"> <select ref="sub_category_id" style="margin-left:-10px"> <option each="{filteredSubcategories}" riot-value="{sub_category_id}">{sub_category} </option> </select> </div> </div> </div> <div class="column is-narrow"> <label class="label" style="margin-left:-14px">Item</label> </div> <div class="column is-narrow"> <div class="control"> <input class=" input" ref="item_name" type="text" style="margin-left:-10px"> </div> </div> <div class="column"> <button class="button is-danger has-text-weight-bold" style="margin-left:-20px" onclick="{add}">{title} </button> </div> </div> </div> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th>SL</th> <th>Department</th> <th>Category</th> <th>Subcategory</th> <th>Item</th> <th></th> </tr> </thead> <tbody> <tr each="{ev, i in inventoryItems}"> <td>{i+1}</td> <td>{ev.department}</td> <td>{ev.category_name}</td> <td>{ev.sub_category}</td> <td>{ev.item_name}</td> <td class="has-text-right"> <div class="inline-flex rounded border border-grey overflow-hidden" hide="{ev.confirmDelete}"> <span><a class="button is-small is-rounded" onclick="{edit.bind(this, ev)}">Edit</a></span> <span if="{role==\'ADMIN\'}"> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick="{confirmDelete}">Delete</a></span> </div> <div class="table-buttons" if="{ev.confirmDelete}"> <span disabled="{loading}" class="button is-small is-rounded" onclick="{delete}"><i class="fa fa-check"></i></span> <span disabled="{loading}" class="button is-small has-text-danger is-rounded" onclick="{cancelOperation}"><i class="fa fa-times"></i></span> </div> </td> </tr> </tbody> </table> </section>', '', '', function(opts) {
	var self = this
    self.on("mount", function(){
      self.title='Create'
      self.role = getCookie('role')
      self.update()
      self.readInventoryDepartment()
      self.readInventoryCategory()
      self.readInventorySubcategory()
      self.readInventoryItem()
    })
self.on("unmount", function(){
  inventoryCategoryStore.off('read_inventory_category_changed', ReadInventoryCategoryChanged)
  inventorydepartmentStore.off('read_inventorydepartment_changed', ReadInventoryDepartmentChanged)
  inventorySubcategoryStore.off('read_inventory_subcategory_changed',ReadInventorySubcategoryChanged)

  inventoryItemStore.off('read_inventory_item_changed', ReadInventoryItemChanged)
  inventoryItemStore.off('add_inventory_item_changed', AddInventoryItemChanged)
  inventoryItemStore.off('edit_inventory_item_changed',EditInventoryItemChanged)
  inventoryItemStore.off('delete_inventory_item_changed',DeleteInventoryItemChanged)
})

    self.filterCategory = () => {
      self.filteredCategories = []
      self.filteredCategories = self.inventoryCategories.filter(s => {
       return s.department == self.refs.department.value
      })
       self.update()
      console.log(self.refs.category_id.value)
       self.filterSubcategory()
   }
   self.filterSubcategory = () => {
      self.filteredSubcategories = []
      self.filteredSubcategories = self.inventorySubcategories.filter(s => {
      return s.category_id == self.refs.category_id.value
    })
      self.update()
      console.log(self.filteredSubcategories)

   }

    self.readInventoryDepartment = () => {
       inventorydepartmentStore.trigger('read_inventorydepartment')
    }

    self.readInventoryCategory = () => {
       inventoryCategoryStore.trigger('read_inventory_category')
    }

    self.readInventorySubcategory = () => {
       inventorySubcategoryStore.trigger('read_inventory_subcategory')
    }

    self.readInventoryItem = () => {
       inventoryItemStore.trigger('read_inventory_item')
    }

     self.add = () => {
      if(!self.refs.department.value){
        toastr.info("Please enter department and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          console.log('create')
        inventoryItemStore.trigger('add_inventory_item', self.refs.department.value,
           self.refs.category_id.value,self.refs.sub_category_id.value,self.refs.item_name.value)
        }else if(self.title=='Update'){
          console.log('update')
        inventoryItemStore.trigger('edit_inventory_item', self.refs.department.value,
           self.refs.category_id.value,self.refs.sub_category_id.value,self.refs.item_name.value, self.edit_id)
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
      self.inventoryItems.map(ev => {
          ev.confirmDelete = false
          ev.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.inventoryItems.map(ev => {
        if(ev.item_id != e.item.ev.item_id){
          ev.confirmDelete = false
        }else{
          ev.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      inventoryItemStore.trigger('delete_inventory_item', e.item.ev.item_id)
    }

    self.edit = (ev,e) => {
      console.log(ev)
      self.title='Update'

      self.refs.department.value = ev.department

       self.filterCategory()
       self.update()
       self.refs.category_id.value=ev.category_id
       self.filterSubcategory()
       self.update()
       self.refs.sub_category_id.value=ev.subcategory_id

      self.refs.item_name.value = ev.item_name
      self.edit_id = ev.item_id
    }

    inventoryItemStore.on('add_inventory_item_changed',AddInventoryItemChanged)
    function AddInventoryItemChanged(inventoryItems){
      console.log(inventoryItems)
      self.title='Create'
      self.refs.category_id.value = ''
      self.refs.department.value = ''
      self.refs.sub_category_id.value = ''
      self.refs.item_name.value = ''
      self.loading = false
      self.inventoryItems = inventoryItems
      self.update()

      console.log(self.inventoryItems)
    }

  inventoryItemStore.on('edit_inventory_item_changed',EditInventoryItemChanged)
    function EditInventoryItemChanged(inventoryItems){
      console.log(inventoryItems)
      self.title='Create'
      self.refs.category_id.value = ''
      self.refs.department.value = ''
      self.refs.item_name.value = ''
      self.refs.sub_category_id.value = ''
      self.loading = false
      self.inventoryItems = inventoryItems
      self.update()

    }

    inventoryItemStore.on('delete_inventory_item_changed',DeleteInventoryItemChanged)
    function DeleteInventoryItemChanged(inventoryItems){
      console.log(inventoryItems)
      self.title='Create'
      self.refs.sub_category.value = ''
      self.refs.item_name.value = ''
      self.refs.department.value = ''
      self.refs.category_id.value = ''
      self.loading = false
      self.inventoryItems = inventoryItems
      self.update()
      self.readInventoryItem()
      console.log(self.inventoryItems)
    }

    inventoryCategoryStore.on('read_inventory_category_changed',ReadInventoryCategoryChanged)
    function ReadInventoryCategoryChanged(inventoryCategories){
      console.log(inventoryCategories)
      self.title='Create'
      self.loading = false
      self.inventoryCategories = inventoryCategories
      self.refs.sub_category_id.value = ''
      self.refs.department.value = ''
      self.refs.category_id.value = ''
      self.refs.item_name.value = ''
      self.update()
      console.log(self.inventoryCategories)
    }
  inventorySubcategoryStore.on('read_inventory_subcategory_changed',ReadInventorySubcategoryChanged)
    function ReadInventorySubcategoryChanged(inventorySubcategories){
      console.log(inventorySubcategories)
      self.title='Create'
      self.loading = false
      self.inventorySubcategories = inventorySubcategories
      self.refs.sub_category_id.value = ''
      self.refs.department.value = ''
      self.refs.item_name.value = ''
      self.refs.category_id.value = ''
      self.update()
      console.log(self.inventorySubcategories)
    }

   inventoryItemStore.on('read_inventory_item_changed',ReadInventoryItemChanged)
    function ReadInventoryItemChanged(inventoryItems){
      console.log(inventoryItems)
      self.title='Create'
      self.loading = false
      self.inventoryItems = inventoryItems
      self.refs.sub_category_id.value = ''
      self.refs.department.value = ''
      self.refs.item_name.value = ''
      self.refs.category_id.value = ''
      self.update()
      console.log(self.inventoryItems)
    }

    inventorydepartmentStore.on('read_inventorydepartment_changed',ReadInventoryDepartmentChanged)
    function ReadInventoryDepartmentChanged(inventoryDepartments){
      console.log(inventoryDepartments)
      self.inventoryDepartments = inventoryDepartments
      self.update()
      console.log(self.inventoryDepartments)
    }

});
riot.tag2('inventory-stock', '<section class=" is-fluid" show="{inventory_stock_view == \'show_inventory_stock_table\'}"> <h2 class="title" style="color: #ff3860;">Inventory Stocks</h2> <div class="flex items-center mt-2 mb-6 no-print"> <div class="bg-green py-1 rounded w-10"> <div class="bg-grey h-px flex-auto"></div> </div> </div> <div class="box"> <div class="columns"> <div class="column is-narrow"> <label class="label" style="margin-left:-14px">Category</label> </div> <div class="column is-narrow"> <div class="control"> <div class="select"> <select ref="r_category_id" onchange="{readInventoryStock}"> <option each="{inventoryCategories}" riot-value="{category_id}">{category_name} </option> </select> </div> </div> </div> </div> </div> <div class="level-right"> <button class="button is-warning is-rounded" onclick="{show_inventory_stock}"> <span class="icon"> <span class="fas fa-plus"></span> </span> <span>Add</span> </button> </div> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th>SL</th> <th>Date</th> <th>Category</th> <th>Item</th> <th>Quantity</th> <th>Rate</th> <th>Amount</th> <th>Received From</th> <th>Rack</th> <th>Remarks</th> <th></th> </tr> </thead> <tbody> <tr each="{ev, i in inventoryStocks}"> <td>{i+1}</td> <td>{ev.received_date}</td> <td>{ev.category_name}</td> <td>{ev.item_name}</td> <td>{ev.quantity}</td> <td>{ev.rate}</td> <td>{ev.amount}</td> <td>{ev.received_from}</td> <td>{ev.rack_name}</td> <td>{ev.remark}</td> <td class="has-text-right"> <div class="inline-flex rounded border border-grey overflow-hidden" hide="{ev.confirmDelete}"> <span><a class="button is-small is-rounded" onclick="{edit.bind(this, ev)}">Edit</a></span> <span if="{role==\'ADMIN\'}"> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick="{confirmDelete}">Delete</a></span> </div> <div class="table-buttons" if="{ev.confirmDelete}"> <span disabled="{loading}" class="button is-small is-rounded" onclick="{delete}"><i class="fa fa-check"></i></span> <span disabled="{loading}" class="button is-small has-text-danger is-rounded" onclick="{cancelOperation}"><i class="fa fa-times"></i></span> </div> </td> </tr> </tbody> </table> </section> <section class="is-fluid" show="{inventory_stock_view ==\'show_inventory_stock_form\'}"> <div class="label"> <div class="level-left"> <h2 class="title" style="color: #ff3860;">{title} Inventory Stock</h2> </div> <div class="level-right"> <button class="button" onclick="{close_inventory_stock_form}">Back</button> </div> </div> <div class="box"> <div class="columns is-variable is-1 is-multiline"> <div class="column is-one-third"> <label class="label">Received Date</label> <input class="input date flatpickr-input form-control input" ref="received_date" placeholder="" tabindex="0" type="text"> </div> <div class="column is-one-third"> <label class="label" for="class">Category</label> <div class="control"> <div class="select is-fullwidth"> <select ref="category_id" onchange="{filterSubcategory}"> <option each="{inventoryCategories}" riot-value="{category_id}">{category_name} </option> </select> </div> </div> </div> <div class="column is-one-third"> <label class="label" for="class">Subcategory</label> <div class="control"> <div class="select is-fullwidth"> <select ref="sub_category_id" onchange="{filterItem}"> <option each="{filteredSubcategories}" riot-value="{sub_category_id}">{sub_category} </option> </select> </div> </div> </div> <div class="column is-one-third"> <label class="label" for="class">Item</label> <div class="control"> <div class="select is-fullwidth"> <select ref="item_id"> <option each="{filteredItems}" riot-value="{item_id}">{item_name} </option> </select> </div> </div> </div> <div class="column is-one-third"> <label class="label">Quantity</label> <input type="text" ref="quantity" type="text" class="input"> </div> <div class="column is-one-third"> <label class="label" for="class">Unit</label> <div class="control"> <div class="select is-fullwidth"> <select ref="unit_id"> <option each="{inventoryUnits}" riot-value="{unit_id}">{unit} </option> </select> </div> </div> </div> <div class="column is-one-third"> <label class="label">Rate</label> <input type="text" ref="rate" type="text" class="input"> </div> <div class="column is-one-third"> <label class="label">Received Form</label> <input type="text" ref="received_from" type="text" class="input"> </div> <div class="column is-one-third"> <label class="label" for="class">Rack</label> <div class="control"> <div class="select is-fullwidth"> <select ref="rack_id"> <option each="{inventoryRacks}" riot-value="{rack_id}">{rack_name} </option> </select> </div> </div> </div> <div class="column is-one-third"> <label class="label">Remark</label> <input type="text" ref="remark" type="text" class="input"> </div> <div class="column is-full"> <button class="button is-danger has-text-weight-bold adjusted-top" onclick="{add}">{title}</button> </div> </div> </div> </section>', '', '', function(opts) {
	var self = this
    self.on("mount", function(){
      self.title='Create'
      self.role = getCookie('role')
      self.inventory_stock_view='show_inventory_stock_table'
      flatpickr(".date", {
         allowInput: true,
         altFormat: "d/m/Y",
         dateFormat: "Y-m-d",
       })
      self.update()

      self.readInventoryCategory()
      self.readInventoryUnit()
      self.readInventorySubcategory()
      self.readInventoryItem()
      self.readInventoryRack()

    })
  self.on("unmount", function(){
      inventoryCategoryStore.off('read_inventory_category_changed', ReadInventoryCategoryChanged)

      inventorySubcategoryStore.off('read_inventory_subcategory_changed',ReadInventorySubcategoryChanged)
      inventoryUnitStore.off('inventoryUnit_changed', InventoryUnitChanged)
      inventoryRackStore.off('inventoryRack_changed', InventoryRackChanged)

      inventoryStockStore.off('read_inventory_stock_changed', ReadInventoryStockChanged)
      inventoryStockStore.off('add_inventory_stock_changed', AddInventoryStockChanged)
      inventoryStockStore.off('edit_inventory_stock_changed', EditInventoryStockChanged)
      inventoryStockStore.off('delete_inventory_stock_changed', DeleteInventoryStockChanged)
  })

    self.show_inventory_stock=()=>{
       self.inventory_stock_view='show_inventory_stock_form'
    }
    self.close_inventory_stock_form=()=>{
       self.inventory_stock_view='show_inventory_stock_table'
    }

   self.filterSubcategory = () => {
      self.filteredSubcategories = []
      self.filteredSubcategories = self.inventorySubcategories.filter(s => {
        console.log("inside")
      return s.category_id == self.refs.category_id.value
    })
      self.update()
      console.log(self.filteredSubcategories)
      self.filterItem()
   }

    self.filterItem = () => {
      self.filteredItems = []
      self.filteredItems = self.inventoryItems.filter(s => {
        console.log(s)
      return s.subcategory_id == self.refs.sub_category_id.value
    })
      self.update()
   }

    self.readInventoryStock = () => {
       inventoryStockStore.trigger('read_inventory_stock', self.refs.r_category_id.value)
    }
    self.readInventoryUnit = () => {
       inventoryUnitStore.trigger('read_inventory_unit')
    }
    self.readInventoryRack = () => {
       inventoryRackStore.trigger('read_inventory_rack')
    }

    self.readInventoryCategory = () => {
       inventoryCategoryStore.trigger('read_inventory_category')
    }

    self.readInventorySubcategory = () => {
       inventorySubcategoryStore.trigger('read_inventory_subcategory')
    }

    self.readInventoryItem = () => {
       inventoryItemStore.trigger('read_inventory_item')
    }

    self.add = () => {
      if(!self.refs.category_id.value){
        toastr.info("Please enter category name and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          console.log('create')
        inventoryStockStore.trigger('add_inventory_stock', self.refs.received_date.value, self.refs.category_id.value,self.refs.sub_category_id.value,self.refs.item_id.value,self.refs.rate.value,self.refs.quantity.value,self.refs.unit_id.value,self.refs.received_from.value,self.refs.rack_id.value,self.refs.remark.value)
        }else if(self.title=='Update'){
          console.log('update')
        inventoryStockStore.trigger('edit_inventory_stock', self.refs.received_date.value, self.refs.category_id.value,self.refs.sub_category_id.value,self.refs.item_id.value,self.refs.rate.value,self.refs.quantity.value,self.refs.unit_id.value,self.refs.received_from.value,self.refs.rack_id.value,self.refs.remark.value, self.edit_id)
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
      self.inventoryStocks.map(ev => {
          ev.confirmDelete = false
          ev.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.inventoryStocks.map(ev => {
        if(ev.received_id != e.item.ev.received_id){
          ev.confirmDelete = false
        }else{
          ev.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      inventoryStockStore.trigger('delete_inventory_stock', e.item.ev.received_id)
    }

    self.edit = (ev,e) => {
      console.log(ev)
      self.title='Update'
       flatpickr(".date", {
         allowInput: true,
         altFormat: "d/m/Y",
         dateFormat: "Y-m-d",
       })
       self.refs.category_id.value=ev.category_id
       self.filterSubcategory()
       self.update()
       self.refs.sub_category_id.value=ev.sub_category_id
       self.filterItem()
       self.update()
       self.refs.item_id.value=ev.item_id
       self.refs.received_date.value=ev.r_date
       self.refs.item_id.value=ev.item_id
       self.refs.unit_id.value=ev.unit_id
       self.refs.quantity.value=ev.quantity
       self.refs.rate.value=ev.rate
       self.refs.received_from.value=ev.received_from
       self.refs.item_id.value=ev.item_id
       self.refs.rack_id.value=ev.rack_id
       self.refs.remark.value=ev.remark
       self.edit_id = ev.received_id
       self.inventory_stock_view='show_inventory_stock_form'
    }

    inventoryStockStore.on('add_inventory_stock_changed',AddInventoryStockChanged)
    function AddInventoryStockChanged(inventoryStocks){
      console.log(inventoryStocks)
      self.title='Create'
      self.refs.received_date.value=''
      self.refs.item_id.value=''
      self.refs.unit_id.value=''
      self.refs.rate.value=''
      self.refs.received_from.value=''
      self.refs.item_id.value=''
      self.refs.rack_id.value=''
      self.refs.quantity.value=''
      self.refs.remark.value=''
      self.loading = false
      self.update()

      console.log(self.inventoryStocks)
    }

  inventoryStockStore.on('edit_inventory_stock_changed',EditInventoryStockChanged)
    function EditInventoryStockChanged(inventoryStocks){
      console.log(inventoryStocks)
      self.title='Create'
      self.refs.received_date.value=''
      self.refs.item_id.value=''
      self.refs.unit_id.value=''
      self.refs.rate.value=''
      self.refs.received_from.value=''
      self.refs.item_id.value=''
      self.refs.rack_id.value=''
      self.refs.quantity.value=''
      self.refs.remark.value=''
      self.loading = false
      self.inventoryStocks = inventoryStocks
      self.update()

    }

    inventoryStockStore.on('delete_inventory_stock_changed',DeleteInventoryStockChanged)
    function DeleteInventoryStockChanged(inventoryStocks){
      console.log(inventoryStocks)
      self.title='Create'
      self.loading = false
      self.inventoryStocks = inventoryStocks
      self.update()

      console.log(self.inventoryStocks)
    }

    inventoryCategoryStore.on('read_inventory_category_changed',ReadInventoryCategoryChanged)
    function ReadInventoryCategoryChanged(inventoryCategories){
      console.log(inventoryCategories)
      self.title='Create'
      self.loading = false
      self.inventoryCategories = inventoryCategories
      self.refs.sub_category_id.value = ''

      self.refs.category_id.value = ''
      self.refs.item_id.value = ''
      self.update()
      console.log(self.inventoryCategories)
       self.readInventoryStock();
    }
    inventoryUnitStore.on('inventoryUnit_changed',InventoryUnitChanged)
    function InventoryUnitChanged(inventoryUnits){
      console.log(inventoryUnits)
      self.title='Create'

      self.loading = false
      self.inventoryUnits = inventoryUnits

      self.update()
      console.log(self.inventoryUnits)
    }
     inventoryRackStore.on('inventoryRack_changed',InventoryRackChanged)
    function InventoryRackChanged(inventoryRacks){
      console.log(inventoryRacks)
      self.title='Create'

      self.loading = false
      self.inventoryRacks = inventoryRacks

      self.update()
      console.log(self.inventoryRacks)
    }
  inventorySubcategoryStore.on('read_inventory_subcategory_changed',ReadInventorySubcategoryChanged)
    function ReadInventorySubcategoryChanged(inventorySubcategories){
      console.log(inventorySubcategories)
      self.title='Create'
      self.loading = false
      self.inventorySubcategories = inventorySubcategories
      self.refs.sub_category_id.value = ''

      self.refs.item_id.value = ''
      self.refs.category_id.value = ''
      self.update()
      console.log(self.inventorySubcategories)
    }

   inventoryItemStore.on('read_inventory_item_changed',ReadInventoryItemChanged)
    function ReadInventoryItemChanged(inventoryItems){
      console.log(inventoryItems)
      self.title='Create'
      self.loading = false
      self.inventoryItems = inventoryItems
      self.refs.sub_category_id.value = ''

      self.refs.item_id.value = ''
      self.refs.category_id.value = ''
      self.update()
      console.log(self.inventoryItems)
    }
    inventoryStockStore.on('read_inventory_stock_changed',ReadInventoryStockChanged)
    function ReadInventoryStockChanged(inventoryStocks){
      console.log(inventoryStocks)
      self.title='Create'
      self.loading = false
      self.inventoryStocks = inventoryStocks
      self.update()
      console.log(self.inventoryStocks)
    }

});
riot.tag2('inventory-subcategory', '<section class=" is-fluid"> <h2 class="title" style="color: #ff3860;">Inventory Category</h2> <div class="flex items-center mt-2 mb-6 no-print"> <div class="bg-green py-1 rounded w-10"> <div class="bg-grey h-px flex-auto"></div> </div> </div> <div class="box"> <div class="columns"> <div class="column is-narrow"> <label class="label">Department</label> </div> <div class="column is-narrow"> <div class="control"> <div class="select"> <select ref="department"> <option each="{inventoryDepartments}" riot-value="{department}">{department} </option> </select> </div> </div> </div> <div class="column is-narrow"> <label class="label">Category</label> </div> <div class="column is-narrow"> <div class="control"> <div class="select"> <select ref="category_id"> <option each="{inventoryCategories}" riot-value="{category_id}">{category_name} </option> </select> </div> </div> </div> <div class="column is-narrow"> <label class="label">Subcategory</label> </div> <div class="column is-narrow"> <div class="control"> <input class=" input" ref="sub_category" type="text"> </div> </div> <div class="column"> <button class="button is-danger has-text-weight-bold" onclick="{add}">{title} </button> </div> </div> </div> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th>SL</th> <th>Department</th> <th>Category</th> <th>Subcategory</th> <th></th> </tr> </thead> <tbody> <tr each="{ev, i in inventorySubcategories}"> <td>{i+1}</td> <td>{ev.department}</td> <td>{ev.category_name}</td> <td>{ev.sub_category}</td> <td class="has-text-right"> <div class="inline-flex rounded border border-grey overflow-hidden" hide="{ev.confirmDelete}"> <span><a class="button is-small is-rounded" onclick="{edit.bind(this, ev)}">Edit</a></span> <span if="{role==\'ADMIN\'}"> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick="{confirmDelete}">Delete</a></span> </div> <div class="table-buttons" if="{ev.confirmDelete}"> <span disabled="{loading}" class="button is-small is-rounded" onclick="{delete}"><i class="fa fa-check"></i></span> <span disabled="{loading}" class="button is-small has-text-danger is-rounded" onclick="{cancelOperation}"><i class="fa fa-times"></i></span> </div> </td> </tr> </tbody> </table> </section>', '', '', function(opts) {
	var self = this
    self.on("mount", function(){
      self.title='Create'
      self.role = getCookie('role')
      self.update()
      self.readInventoryDepartment()
      self.readInventoryCategory()
      self.readInventorySubcategory()
    })
self.on("unmount", function(){
  inventoryCategoryStore.off('read_inventory_category_changed', ReadInventoryCategoryChanged)
  inventorydepartmentStore.off('read_inventorydepartment_changed', ReadInventoryDepartmentChanged)

  inventorySubcategoryStore.off('add_inventory_subcategory_changed', AddInventorySubcategoryChanged)

inventorySubcategoryStore.off('read_inventory_subcategory_changed',ReadInventorySubcategoryChanged)

  inventorySubcategoryStore.off('edit_inventory_subcategory_changed',EditInventorySubcategoryChanged)

  inventorySubcategoryStore.off('delete_inventory_subcategory_changed',DeleteInventorySubcategoryChanged)
})

    self.readInventoryDepartment = () => {
       inventorydepartmentStore.trigger('read_inventorydepartment')
    }

    self.readInventoryCategory = () => {
       inventoryCategoryStore.trigger('read_inventory_category')
    }

    self.readInventorySubcategory = () => {
       inventorySubcategoryStore.trigger('read_inventory_subcategory')
    }

     self.add = () => {
      if(!self.refs.department.value){
        toastr.info("Please enter department and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          console.log('create')
        inventorySubcategoryStore.trigger('add_inventory_subcategory', self.refs.department.value,
           self.refs.category_id.value,self.refs.sub_category.value)
        }else if(self.title=='Update'){
          console.log('update')
        inventorySubcategoryStore.trigger('edit_inventory_subcategory', self.refs.department.value,
           self.refs.category_id.value, self.refs.sub_category.value, self.edit_id)
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
      self.inventorySubcategories.map(ev => {
          ev.confirmDelete = false
          ev.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.inventorySubcategories.map(ev => {
        if(ev.sub_category_id != e.item.ev.sub_category_id){
          ev.confirmDelete = false
        }else{
          ev.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      inventorySubcategoryStore.trigger('delete_inventory_subcategory', e.item.ev.sub_category_id)
    }

    self.edit = (ev,e) => {
      console.log(ev)
      self.title='Update'
      self.refs.category_id.value = ev.category_id
      self.refs.department.value = ev.department
      self.refs.sub_category.value = ev.sub_category
      self.edit_id = ev.sub_category_id
    }

    inventorySubcategoryStore.on('add_inventory_subcategory_changed',AddInventorySubcategoryChanged)
    function AddInventorySubcategoryChanged(inventorySubcategories){
      console.log(inventorySubcategories)
      self.title='Create'
      self.refs.category_id.value = ''
      self.refs.department.value = ''
      self.refs.sub_category.value = ''
      self.loading = false
      self.inventorySubcategories = inventorySubcategories
      self.update()

      console.log(self.inventorySubcategories)
    }

  inventorySubcategoryStore.on('edit_inventory_subcategory_changed',EditInventorySubcategoryChanged)
    function EditInventorySubcategoryChanged(inventorySubcategories){
      console.log(inventorySubcategories)
      self.title='Create'
      self.refs.category_id.value = ''
      self.refs.department.value = ''
      self.refs.sub_category.value = ''
      self.loading = false
      self.inventorySubcategories = inventorySubcategories
      self.update()

    }

    inventorySubcategoryStore.on('delete_inventory_subcategory_changed',DeleteInventoryCategoryChanged)
    function DeleteInventoryCategoryChanged(inventorySubcategories){
      console.log(inventorySubcategories)
      self.title='Create'
      self.refs.sub_category.value = ''
      self.refs.department.value = ''
      self.refs.category_id.value = ''
      self.loading = false
      self.inventorySubcategories = inventorySubcategories
      self.update()
      self.readInventorySubcategory()
      console.log(self.inventorySubcategories)
    }

    inventoryCategoryStore.on('read_inventory_category_changed',ReadInventoryCategoryChanged)
    function ReadInventoryCategoryChanged(inventoryCategories){
      console.log(inventoryCategories)
      self.title='Create'
      self.loading = false
      self.inventoryCategories = inventoryCategories
      self.refs.sub_category.value = ''
      self.refs.department.value = ''
      self.refs.category_id.value = ''
      self.update()
      console.log(self.inventoryCategories)
    }
  inventorySubcategoryStore.on('read_inventory_subcategory_changed',ReadInventorySubcategoryChanged)
    function ReadInventorySubcategoryChanged(inventorySubcategories){
      console.log(inventorySubcategories)
      self.title='Create'
      self.loading = false
      self.inventorySubcategories = inventorySubcategories
      self.refs.sub_category.value = ''
      self.refs.department.value = ''
      self.refs.category_id.value = ''
      self.update()
      console.log(self.inventorySubcategories)
    }

    inventorydepartmentStore.on('read_inventorydepartment_changed',ReadInventoryDepartmentChanged)
    function ReadInventoryDepartmentChanged(inventoryDepartments){
      console.log(inventoryDepartments)
      self.inventoryDepartments = inventoryDepartments
      self.update()
      console.log(self.inventoryDepartments)
    }

});
riot.tag2('inventory-unit', '<section class=" is-fluid"> <h2 class="title has-text-centered" style="color: #ff3860;">Inventory Unit</h2> <div class="flex items-center mt-2 mb-6 no-print"> <div class="bg-green py-1 rounded w-10"> <div class="bg-grey h-px flex-auto"></div> </div> </div> <div class="box"> <div class="columns"> <div class="column is-half"> <div class="field"> <label class="label" for="role">Unit</label> <div class="control"> <input class="input" type="text" ref="unit" onkeyup="{addEnter}"> </div> </div> </div> <div class="column is-narrow"> <div class="field"> <div class="control"> <button class="button is-danger has-text-weight-bold adjusted-top" onclick="{add}">{title}</button> </div> </div> </div> </div> </div> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th>SL</th> <th>Unit</th> <th></th> </tr> </thead> <tbody> <tr each="{c, i in inventoryUnits}"> <td>{i+1}</td> <td>{c.unit}</td> <td class="has-text-right"> <div class="inline-flex rounded border border-grey overflow-hidden" hide="{c.confirmDelete}"> <span><a class="button is-small is-rounded" onclick="{edit.bind(this, c)}">Edit</a></span> <span if="{role==\'ADMIN\'}"> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick="{confirmDelete}">Delete</a></span> </div> <div class="table-buttons" if="{c.confirmDelete}"> <span disabled="{loading}" class="button is-small is-rounded" onclick="{delete}"><i class="fa fa-check"></i></span> <span disabled="{loading}" class="button is-small has-text-danger is-rounded" onclick="{cancelOperation}"><i class="fa fa-times"></i></span> </div> </td> </tr> </tbody> </table> </section>', '', '', function(opts) {
	   var self = this
      self.on("mount", function(){
      self.title='Create'
      self.role = getCookie('role')
      self.update()
      self.readInventoryUnit()
    })
    self.on("unmount", function(){
      inventoryUnitStore.off('inventoryUnit_changed', InventoryUnitChanged)
    })

    self.readInventoryUnit = () => {
       inventoryUnitStore.trigger('read_inventory_unit')
    }

     self.add = () => {
      if(!self.refs.unit.value){
        toastr.info("Please enter Unit and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          console.log('creaadd_inventory_unit')
          inventoryUnitStore.trigger('add_inventory_unit', self.refs.unit.value)
        }else if(self.title=='Update'){
          console.log('update')
          inventoryUnitStore.trigger('edit_inventory_unit', self.refs.unit.value,
            self.edit_id)
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
      self.inventoryUnits.map(c => {
          c.confirmDelete = false
          c.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.inventoryUnits.map(c => {
        if(c.unit_id != e.item.c.unit_id){
          c.confirmDelete = false
        }else{
          c.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      inventoryUnitStore.trigger('delete_inventory_unit', e.item.c.unit_id)
    }

    self.edit = (c,e) => {
      console.log(c)
      self.title='Update'
      self.refs.unit.value = c.unit
      self.edit_id = c.unit_id
    }

    inventoryUnitStore.on('inventoryUnit_changed',InventoryUnitChanged)
    function InventoryUnitChanged(inventoryUnits){
      console.log(inventoryUnits)
      self.title='Create'
      self.refs.unit.value = ''
      self.loading = false
      self.inventoryUnits = inventoryUnits

      self.update()
      console.log(self.inventoryUnits)
    }

});
riot.tag2('item', '<section class=" is-fluid"> <h2 class="title has-text-centered" style="color: #ff3860;">Item Management Console</h2> <div class="flex items-center mt-2 mb-6 no-print"> <div class="bg-green py-1 rounded w-10"> <div class="bg-grey h-px flex-auto"></div> </div> </div> <div class="box"> <div class="columns"> <div class="column is-half"> <div class="field"> <label class="label" for="role">Item</label> <div class="control"> <input class="input" type="text" ref="addItemInput" onkeyup="{addEnter}"> </div> </div> </div> <div class="column is-narrow"> <div class="field"> <div class="control"> <button class="button is-danger has-text-weight-bold adjusted-top" onclick="{add}">{title}</button> </div> </div> </div> </div> </div> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th>SL</th> <th>Item</th> <th></th> </tr> </thead> <tbody> <tr each="{r, i in Items}"> <td>{i+1}</td> <td>{r.item_name}</td> <td class="has-text-right"> <div class="inline-flex rounded border border-grey overflow-hidden" hide="{r.confirmDelete}"> <span><a class="button is-small is-rounded" onclick="{edit.bind(this, r)}">Edit</a></span> <span if="{role==\'ADMIN\'}"> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick="{confirmDelete}">Delete</a></span> </div> <div class="table-buttons" if="{r.confirmDelete}"> <span disabled="{loading}" class="button is-small is-rounded" onclick="{delete}"><i class="fa fa-check"></i></span> <span disabled="{loading}" class="button is-small has-text-danger is-rounded" onclick="{cancelOperation}"><i class="fa fa-times"></i></span> </div> </td> </tr> </tbody> </table> </section>', '', '', function(opts) {
	var self = this
    self.on("mount", function(){
      self.title='Create'
      self.role = getCookie('role')
      self.update()
      self.readItems()
    })
    self.on("unmount", function(){
      itemStore.off('items_changed', ItemsChanged)
    })

    self.readItems = () => {
       itemStore.trigger('read_items')
    }

     self.add = () => {
      if(!self.refs.addItemInput.value){
        toastr.info("Please enter Item and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          console.log('create')
          itemStore.trigger('add_item', self.refs.addItemInput.value)
        }else if(self.title=='Update'){
          console.log('update')
          itemStore.trigger('edit_item', self.refs.addItemInput.value,
            self.edit_id)
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
      self.Items.map(r => {
          r.confirmDelete = false
          r.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.Items.map(r => {
        if(r.item_id != e.item.r.item_id){
          r.confirmDelete = false
        }else{
          r.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      itemStore.trigger('delete_item', e.item.r.item_id)
    }

    self.edit = (r,e) => {
      console.log(r)
      self.title='Update'
      self.refs.addItemInput.value = r.item_name
      self.edit_id = r.item_id
    }

    itemStore.on('items_changed',ItemsChanged)
    function ItemsChanged(items){
      console.log(items)
      self.title='Create'
      self.refs.addItemInput.value = ''
      self.loading = false
      self.Items = items
      self.update()
      console.log(self.Items)
    }

});
riot.tag2('level', '<section class="is-fluid"> <h2 class="title" style="color: #ff3860;">Levels</h2> <div class="flex items-center mt-2 mb-6 no-print"> <div class="bg-green py-1 rounded w-10"> <div class="bg-grey h-px flex-auto"></div> </div> </div> <div class="box"> <div class="columns"> <div class="column is-half"> <div class="field"> <label class="label" for="level">Level</label> <div class="control"> <input class="input" type="text" ref="addLevelInput" onkeyup="{addEnter}"> </div> </div> </div> <div class="column is-narrow"> <div class="field"> <div class="control"> <button class="button is-danger has-text-weight-bold adjusted-top" onclick="{add}">{title}</button> </div> </div> </div> </div> </div> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th>#</th> <th>Level</th> <th></th> </tr> </thead> <tbody> <tr each="{d, i in levels}"> <td>{i + 1}</td> <td>{d.level}</td> <td class="has-text-right"> <div class="inline-flex rounded border border-grey overflow-hidden" hide="{d.confirmDelete}"> <span><a class="button is-small is-rounded" onclick="{edit.bind(this, d)}">Edit</a></span> <span if="{role==\'ADMIN\'}"> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick="{confirmDelete}">Delete</a></span> </div> <div class="table-buttons" if="{d.confirmDelete}"> <span disabled="{loading}" class="button is-small is-rounded" onclick="{delete}"><i class="fa fa-check"></i></span> <soan disabled="{loading}" class="button is-small has-text-danger is-rounded" onclick="{cancelOperation}"><i class="fa fa-times"></i></span> </div> </td> </tr> </tbody> </table> </section>', '', '', function(opts) {
  var self = this
    self.on("mount", function(){
      self.title='Create'
      self.role = getCookie('role')
      self.update()
      self.readLevel()
    })

     self.on("unmount", function(){
      levelStore.off('level_changed', LevelChanged)
    })

    self.readLevel = () => {
       levelStore.trigger('read_level')
    }

     self.add = () => {
      if(!self.refs.addLevelInput.value){
        toastr.info("Please enter Levle and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          console.log('create')
          levelStore.trigger('add_level', self.refs.addLevelInput.value)
        }else if(self.title=='Update'){
          console.log('update')
          levelStore.trigger('edit_level', self.refs.addLevelInput.value,
            self.edit_id)
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
      self.levels.map(d => {
          d.confirmDelete = false
          d.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.levels.map(d => {
        if(d.level_id != e.item.d.level_id){
          d.confirmDelete = false
        }else{
          d.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      levelStore.trigger('delete_level', e.item.d.level_id)
    }

    self.edit = (d,e) => {
      console.log(d)
      self.title='Update'
      self.refs.addLevelInput.value = d.level
      self.edit_id = d.level_id
    }

    levelStore.on('level_changed',LevelChanged)
    function LevelChanged(levels){
      console.log('level_changed1')
      console.log(levels)
      self.title='Create'
      self.refs.addLevelInput.value = ''
      self.loading = false
      self.levels = levels
      self.levels = []
      self.levels = levels
      self.update()
      console.log(self.levels)
      console.log('self.levels')
    }

});
riot.tag2('loading-bar', '<div class="load-bar"> <div class="bar"></div> <div class="bar"></div> <div class="bar"></div> </div>', 'loading-bar .load-bar,[data-is="loading-bar"] .load-bar{ position: fixed; top: 68px; left: 0; width: 100%; height: 6px; background-color: #A5D6A7; } loading-bar .bar,[data-is="loading-bar"] .bar{ content: ""; display: inline; position: absolute; width: 0; height: 100%; left: 50%; text-align: center; } loading-bar .bar:nth-child(1),[data-is="loading-bar"] .bar:nth-child(1){ background-color: #00BCD4; animation: loading 3s linear infinite; } loading-bar .bar:nth-child(2),[data-is="loading-bar"] .bar:nth-child(2){ background-color: #FFEB3B; animation: loading 3s linear 1s infinite; } loading-bar .bar:nth-child(3),[data-is="loading-bar"] .bar:nth-child(3){ background-color: #FF5722; animation: loading 3s linear 2s infinite; } @keyframes loading { from {left: 50%; width: 0;z-index:100;} 33.3333% {left: 0; width: 100%;z-index: 10;} to {left: 0; width: 100%;} }', '', function(opts) {
});
riot.tag2('login', '<div class="login-banner"> <div class="columns is-gapless is-marginless"> <div class="column is-three-fifths is-hidden-mobile" style="height: 100vh;"> <div class="cover_image" style="background-image: url(\'img/classroom.jpg\'); height: 100%;"></div> </div> <div class="column is-two-fifths has-background-white"> <section class="section"> <div class="pad"> <h1 class="title is-spaced has-text-success is-size-1 has-text-weight-bold">Sarthak</h1> <p class="is-size-6 has-text-grey" style="margin-top: -1.5em; margin-bottom: 2em;">College Management simplified!</p> <div class="subtitle">Login</div> <div> <div class="field"> <label class="label" for="user_username">Username</label> <div class="control"> <input class="input is-medium" id="user_username" ref="username" type="text"> </div> </div> <div class="field"> <label class="label" for="user_password">Password</label> <div class="control"> <input class="input is-medium" id="user_password" ref="password" type="password"> </div> </div> <div class="field"> <label class="label" for="user_role">Role</label> <div class="control"> <div class="select is-fullwidth"> <select ref="role"> <option value="ADMIN">ADMIN</option> <option each="{roles}" riot-value="{id}">{role}</option> </select> </div> </div> </div> <div class="field"> <div class="control"> <button class="button is-danger is-medium" type="submit" onclick="{login}">Submit</button> </div> </div> </div> </div> </section> </div> </div> </div>', '', '', function(opts) {
    var self = this
    self.login_warning = false

    self.on('mount', function() {
      self.update()
      self.readRoles()
    })

    self.on("unmount", function(){
      loginStore.off('login_changed', LoginChanged)
      loginStore.off('roles_for_login_changed',RolesChanged)
    })

    self.readRoles = () => {
      loginStore.trigger('read_roles')
    }

    self.login = (e) => {
      if(!self.refs.username.value){
        toastr.info("Please enter Username and try again")
        return;
      }else  if(!self.refs.password.value){
        toastr.info("Please enter Password and try again")
        return;
      }else if(!self.refs.username.value || !self.refs.password.value){
        self.login_warning = true
      }
      loginStore.trigger('check_login', self.refs.username.value, self.refs.password.value, self.refs.role.value)
    }

    loginStore.on('login_changed',LoginChanged)
    function LoginChanged(courses){
      console.log("Changed");

        route("/setting")
    }

    loginStore.on('roles_for_login_changed',RolesChanged)
    function RolesChanged(roles){
        self.roles = roles
        self.update()
    }

});

riot.tag2('main-nav', '<nav class="navbar is-fixed-top is-light no-print" role="navigation" aria-label="main navigation" if="{showNavItems}"> <div class="container is-fluid"> <div class="navbar-brand"> <div class="navbar-item is-size-3 has-text-weight-bold has-text-wight"> SMS </div> <div class="navbar-burger burger" data-target="navbarExampleTransparentExample"> <span aria-hidden="true"></span> <span aria-hidden="true"></span> <span aria-hidden="true"></span> </div> </div> <div id="navbarExampleTransparentExample" class="navbar-menu has-text-weight-bold"> <div class="navbar-end"> <div class="navbar-item has-dropdown is-hoverable"> <a class="navbar-link">Exam</a> <div class="navbar-dropdown"> <a class="navbar-item" href="#/exam-scheme">Exam Scheme</a> <a class="navbar-item" href="#/grade">Grade</a> <a class="navbar-item" href="#/marks-manager">Marks Manager</a> <a class="navbar-item" href="#/marks-entry">Marks Entry</a> <a class="navbar-item" href="#/marks-report">Marks Report</a> <a class="navbar-item" href="#/maturity-development">Maturity Development</a> <a class="navbar-item" href="#/result-activation">Result Activation</a> <a class="navbar-item" href="#/physical-fitness">Physical Fitness</a> <a class="navbar-item" href="#/subject-group-map">Subject Group Map</a> </div> </div> <div class="navbar-item has-dropdown is-hoverable"> <a class="navbar-link">Student</a> <div class="navbar-dropdown"> <a class="navbar-item" href="#/student-assign-house">Assign House</a> <a class="navbar-item" href="#/student-group-student">Group Student</a> <a class="navbar-item" href="#/student-assign-subject">Assign Subject</a> <a class="navbar-item" href="#/student-withdrawn-student">Withdrawn Student</a> <a class="navbar-item" href="#/student-assign-section">Assign Section</a> <a class="navbar-item" href="#/student-login-slip">Login Slip</a> <a class="navbar-item" href="#/student-result-activation">Result Activation</a> </div> </div> <div class="navbar-item has-dropdown is-hoverable"> <a class="navbar-link">Activity</a> <div class="navbar-dropdown"> <a class="navbar-item " href="#/activity-detail">Activity Detail</a> <a class="navbar-item" href="#/report">Report</a> <a class="navbar-item {active: selected_nav_item == \'activity-setting\'}" href="#/activity-setting/activity-item">Setting</a> </div> </div> <div class="navbar-item has-dropdown is-hoverable"> <a class="navbar-link">Fees</a> <div class="navbar-dropdown"> <a class="navbar-item {active: selected_nav_item == \'fee-bill\'}" href="#/fee-bill/bill">Fee Head</a> <a class="navbar-item {active: selected_nav_item == \'scholarship\'}" href="#/scholarship">Scholarship</a> <a class="navbar-item {active: selected_nav_item == \'fees-setting\'}" href="#/fees-setting/fine-setting">Setting</a> </div> </div> <div class="navbar-item has-dropdown is-hoverable"> <a class="navbar-link">Mentor</a> <div class="navbar-dropdown"> <a class="navbar-item " href="#/mentor-detail">Mentor Detail</a> <a class="navbar-item" href="#/mentor-report">Report</a> <a class="navbar-item {active: selected_nav_item == \'mentor-setting\'}" href="#/mentor-setting/mentor-category">Setting</a> </div> </div> <div class="navbar-item has-dropdown is-hoverable"> <a class="navbar-link">Discipline</a> <div class="navbar-dropdown"> <a class="navbar-item " href="#/discipline-detail">Discipline Detail</a> <a class="navbar-item" href="#/discipline-report">Report</a> <a class="navbar-item" href="#/student">Student</a> <a class="navbar-item {active: selected_nav_item == \'discipline-setting\'}" href="#/discipline-setting/discipline-category">Setting</a> </div> </div> <div class="navbar-item has-dropdown is-hoverable"> <a class="navbar-link">Activity</a> <div class="navbar-dropdown"> <a class="navbar-item " href="#/activity-detail">Activity Detail</a> <a class="navbar-item" href="#/report">Report</a> <a class="navbar-item {active: selected_nav_item == \'activity-setting\'}" href="#/activity-setting/item">Setting</a> </div> </div> <div class="navbar-end"> <div class="navbar-item has-dropdown is-hoverable"> <a class="navbar-link">Master</a> <div class="navbar-dropdown"> <a class="navbar-item {active: selected_nav_item == \'master\'}" href="#/master/employee-type">Setting</a> </div> </div> <div class="navbar-item has-dropdown is-hoverable"> <a class="navbar-link">Infirmary</a> <div class="navbar-dropdown"> <a class="navbar-item {active: selected_nav_item == \'infirmary-setting\'}" href="#/infirmary-setting/infirmary-category">Setting</a> <a class="navbar-item {active: selected_nav_item == \'infirmary\'}" href="#/infirmary/infirmary-student">Infirmary Detail</a> </div> </div> <div class="navbar-item has-dropdown is-hoverable"> <a class="navbar-link">Inventory</a> <div class="navbar-dropdown"> <a class="navbar-item {active: selected_nav_item == \'inventory-setting\'}" href="#/inventory-setting/inventory-rack">Setting</a> <a class="navbar-item" href="#/inventory-stock">Stock Inwards Entry</a> <a class="navbar-item" href="#/inventory-issue">Issue</a> <a class="navbar-item" href="#/inventory-sale">Sale</a> </div> </div> <a class="navbar-item has-text-danger" onclick="{logout}">Logout</a> </div> </div> </div> </nav>', '', '', function(opts) {
    var self = this
    console.log('opts.selected_nav_item')
    console.log(opts.selected_nav_item)
    if(!opts.selected_nav_item){
      self.selected_nav_item = 'login'
      self.showNavItems=false
    }else{
      self.selected_nav_item = opts.selected_nav_item
      if(self.selected_nav_item == 'login'){
        self.showNavItems=false
      }else{
        self.showNavItems=true
      }

    }
    self.username = undefined

    self.changePassword = () => {
      $("#passwordChangeModal").modal('show')
    }

    self.savePassword = () => {
      if(self.userNameInput.value==''){
        toastr.error('Please enter username and try again')
        return
      }

      if(self.oldPasswordInput.value==''){
        toastr.error('Please enter old password and try again')
        return
      }

      if(self.newPasswordInput.value==''){
        toastr.error('Please enter new password and try again')
        return
      }

      var str=self.newPasswordInput.value
      var p = str.length

      if(Number(p)<5){
        toastr.error('new password lenth must be >4')
        return;
      }

      if(self.newPasswordInput.value!=self.newPasswordInput2.value){
        toastr.error('new password not match')
        return;
      }

    }

    self.logout = () => {
      console.log("calling logout")
      RiotControl.trigger('logout')
    }

    RiotControl.on('login_changed_main_nav', function(login_status) {
      console.log("calling me in nav tag")
      self.username = login_status.username
      if(login_status.role!='FAIL'){
        self.showNavItems=true
      }
      self.update()
    })

    RiotControl.on('logOut_changed', function() {
     console.log("logged out");
        self.showNavItems=false
        route("/login")

    })

    RiotControl.on('change_password_completed', function(count) {
     console.log("Password changed");
     if(Number(count)==1){
        self.userNameInput.value=''
        self.oldPasswordInput.value=''
        self.newPasswordInput.value=''
        self.newPasswordInput2.value=''
        $("#passwordChangeModal").modal('hide')
        toastr.info('Password Changed Successfully')
        self.update()
     }else{
      toastr.error('Please check your old username and password')
     }

    });
});

riot.tag2('marks-entry', '<loading-bar if="{loading}"></loading-bar> <section class=" is-fluid"> <div class="level"> <div class="level-left"> <h2 class="title" style="color: #ff3860;">Marks Entry</h2> </div> <div class="level-right"> <button class="button is-warning is-rounded ml5" onclick="{readMarksEntry}"> <span class="icon"> <span class="fas fa-sync-alt"></span> </span> </button> </div> </div> <div class="box"> <div class="columns"> <div class="column is-narrow"><label class="label">Standard</label></div> <div class="column"> <div class="control"> <div class="select is-fullwidth"> <select ref="standardSelect" onchange="{changeSection}"> <option value="">Select Standard</option> <option each="{classes}" riot-value="{standard_id}">{standard}</option> </select> </div> </div> </div> <div class="column is-narrow"><label class="label">Section</label></div> <div class="column"> <div class="control"> <div class="select is-fullwidth"> <select ref="sectionSelect" onchange="{readClassSubject}"> <option value="">Select Section</option> <option each="{tempSections}" riot-value="{section_id}">{section}</option> </select> </div> </div> </div> <div class="column is-narrow"><label class="label">Subjects</label></div> <div class="column"> <div class="control"> <div class="select is-fullwidth" onchange="{readMarksLimit}"> <select ref="subjectSelect"> <option value="">Select Subject</option> <option each="{subjects}" riot-value="{subject_id}">{subject_name}</option> </select> </div> </div> </div> <div class="column is-narrow"><label class="label">Exam Type</label></div> <div class="column"> <div class="control"> <div class="select is-fullwidth"> <select ref="examTypeSelect" onchange="{readMarksLimit}"> <option value="">Select Exam Type</option> <option each="{examTypes}" riot-value="{exam_type_id}">{exam_type}</option> </select> </div> </div> </div> <div class="column"> <button class="button is-danger has-text-weight-bold" onclick="{readMarksEntry}">GO </button> </div> </div> </div> <div class="box"> <div class="columns"> <div class="column"> <div><i>Roll No:</i> <strong>{roll_number}</strong></div> <div><i>Enroll No:</i> <strong>{enroll_number}</strong></div> </div> <div class="column"> <div><i>Name:</i> <strong>{name}</strong></div> </div> <div class="column"> <div><i>Marks:</i> <input class="input" type="text" ref="marksInput" id="marksInput" style="width:100px;font-weight:bold; text-transform: uppercase;" onkeyup="{addEnter}"> <button class="button is-danger has-text-weight-bold" onclick="{add}">{title}</button> </div> <div><i>Absent:</i> <input type="checkbox" class="checkbox" ref="absentCheckBox" id="absentCheckBoxId"></div> </div> <div class="column" hide="{marksLimit.marking_type==\'G\'}"> <div><i>Max Marks:</i> <strong>{marksLimit.max_marks}</strong> <strong style="color:#FF0000">({marksLimit.marking_type})</strong> </div> <div><i>Min Marks:</i> <strong>{marksLimit.min_marks}</strong></div> </div> </div> </div> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th style="width:200px;">Roll No</th> <th>Enroll No</th> <th>Student Name</th> <th hide="{marksLimit.marking_type==\'G\'}">Marks</th> <th>Grade</th> <th></th> </tr> </thead> <tbody> <tr each="{c, i in marksEntries}"> <td>{c.roll_number}</td> <td>{c.enroll_number}</td> <td>{c.name}</td> <td hide="{marksLimit.marking_type==\'G\'}">{c.marks}</td> <td>{c.marks_grade}</td> <td class="has-text-right"> <div class="inline-flex rounded border border-grey overflow-hidden" hide="{c.confirmDelete}"> <span><a class="button is-small is-rounded" onclick="{edit.bind(this, c)}">Edit</a></span> <span><a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick="{confirmDelete}">Delete</a></span> </div> <div class="table-buttons" if="{c.confirmDelete}"> <span disabled="{loading}" class="button is-small is-rounded" onclick="{delete}"><i class="fa fa-check"></i></span> <span disabled="{loading}" class="button is-small has-text-danger is-rounded" onclick="{cancelOperation}"><i class="fa fa-times"></i></span> </div> </td> </tr> </tbody> </table> </section>', '', '', function(opts) {
	var self = this
  self.marksLimit = {}
  self.marksLimit['min_marks'] = '';
  self.marksLimit.max_marks = '';
  self.marksLimit.marking_type = '';
    self.on("mount", function(){
      self.title = 'Add'
      self.loading = false;
      self.tempSections = []
      self.update()
      self.readClass()
      self.readSection()
    })
    self.on("unmount", function(){
      marksEntryStore.off('read_classes_changed',ClassesChanged)
      marksEntryStore.off('read_section_changed',SectionChanged)
      marksEntryStore.off('exam_types_changed',ExamTypesChanged)
      marksEntryStore.off('subjects_changed',SubjectsChanged)
      marksEntryStore.off('marks_limit_changed',MarksLimitChanged)
      marksEntryStore.off('marks_entries_changed',MarksEntriesChanged)
      marksEntryStore.off('add_marks_entries_changed',AddMarksEntriesChanged)
      marksEntryStore.off('delete_marks_entries_changed',DeleteMarksEntriesChanged)
    })

    self.readClass = () => {
       self.loading = true;
       marksEntryStore.trigger('read_classes')
    }

    self.readSection = () => {
       self.loading = true;
       marksEntryStore.trigger('read_section')
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

       marksEntryStore.trigger('read_exam_types',self.refs.standardSelect.value)
    }

    self.readClassSubject = () =>{
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
       marksEntryStore.trigger('read_subjects',self.refs.standardSelect.value, self.refs.sectionSelect.value)
      }
    }

    self.readMarksLimit = () => {

      let error = '';

      if(self.refs.sectionSelect.value==''){
        error = error + "Please select section, "
      }

      if(self.refs.subjectSelect.value==''){
        error = error + "Please select standard, "
      }

      if(self.refs.examTypeSelect.value==''){
        error = error + "Please select exam type, "
      }

      if(error.length!=0){
        toastr.error(error)
        return
      }else{
        self.loading=true
       marksEntryStore.trigger('read_marks_limit', self.refs.sectionSelect.value, self.refs.subjectSelect.value, self.refs.examTypeSelect.value)
      }
    }

    self.readMarksEntry = () => {

      let error = '';

      if(self.refs.sectionSelect.value==''){
        error = error + "Please select section, "
      }

      if(self.refs.examTypeSelect.value==''){
        error = error + "Please select exam type, "
      }

      if(self.refs.subjectSelect.value==''){
        error = error + "Please select subject, "
      }

      if(error.length!=0){
        toastr.error(error)
        return
      }else{
        self.loading=true
        marksEntryStore.trigger('read_marks_entries',self.refs.examTypeSelect.value, self.refs.sectionSelect.value, self.refs.subjectSelect.value, self.marksLimit.marking_type)
      }

    }

    self.addEnter = (e) => {
      if(e.which == 13){
        self.add()
      }
    }

    self.add = () => {
      let error = '';

      if($('#absentCheckBoxId').prop("checked") == false){
        if(self.refs.marksInput.value==''){
          error = error + "Please enter marks, "
        }

        if(self.marksLimit.marking_type=='N'){
          if(Number(self.marksLimit.max_marks)<Number(self.refs.marksInput.value)){
            error = error + "Marks can not be greater than max marks, "
          }
        }else if(self.marksLimit.marking_type=='G'){
          if(!isNaN(self.refs.marksInput.value)){
            error = error + "Please enter grade "
          }
        }

      }

      if(self.refs.sectionSelect.value==''){
        error = error + "Please select section, "
      }

      if(self.refs.examTypeSelect.value==''){
        error = error + "Please select exam type, "
      }

      if(self.refs.subjectSelect.value==''){
        error = error + "Please select subject, "
      }

      if(!self.marksLimit.marking_type){
        error = error + "No Marking Type defined, "
      }

      if(error.length!=0){
        toastr.error(error)
        return
      }else{
          var obj = {}
          obj['marks_id'] = self.marksLimit.marks_id
          obj['student_id'] = self.students[0].student_id
          obj['exam_id'] = self.refs.examTypeSelect.value
          obj['subject_id'] = self.refs.subjectSelect.value
          obj['section_id'] = self.refs.sectionSelect.value
          obj['marks_group'] = self.marksLimit.exam_group
          obj['marking_type'] = self.marksLimit.marking_type

        if(self.marksLimit.marking_type =='N'){

          if($('#absentCheckBoxId').prop("checked") == true){
            obj['marks'] = -1
          }else{
            obj['marks'] = self.refs.marksInput.value
          }

        }else if(self.marksLimit.marking_type =='G'){

          if($('#absentCheckBoxId').prop("checked") == true){
            obj['marks_grade'] = -1
          }else{
            obj['marks_grade'] = self.refs.marksInput.value
          }

        }else if(self.marksLimit.marking_type =='NG') {

          if($('#absentCheckBoxId').prop("checked") == true){
            obj['marks'] = -1
          }else{
            obj['marks'] = self.refs.marksInput.value
          }

        }

        self.loading = true
        if(self.title=='Add'){
          console.log(obj)
          marksEntryStore.trigger('add_marks_entries', obj)
        }else if(self.title=='Update'){
          marksEntryStore.trigger('update_marks_entries', obj, self.edit_id)
        }
      }

    }

    self.edit = (c,e) => {
      self.title='Update'
      self.students = []
      self.students.push(c)
      self.roll_number = c.roll_number
      self.enroll_number = c.enroll_number
      self.name = c.name

      if(c.marks == 'AB' || c.marks_grade == 'AB'){
        document.getElementById("absentCheckBoxId").checked = true;
        $("#absentCheckBoxId").focus();
      }else{
        self.refs.marksInput.value = c.marks
        $("#marksInput").focus();
      }

      self.edit_id = c.id
      self.update()
    }

   self.cancelOperation = (e) => {
      self.marksEntries.map(c => {
          c.confirmDelete = false
          c.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.marksEntries.map(c => {
        if(c.id != e.item.c.id){
          c.confirmDelete = false
        }else{
          c.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      marksEntryStore.trigger('delete_marks_entries', e.item.c.id)
    }

    marksEntryStore.on('read_classes_changed',ClassesChanged)
    function ClassesChanged(classes){
      self.loading = false
      self.classes = []
      self.classes = classes
      self.update()
      console.log(self.classes)
    }

    marksEntryStore.on('read_section_changed',SectionChanged)
    function SectionChanged(sections){
      self.loading = false
      self.sections = []
      self.sections = sections
      self.update()
    }

    marksEntryStore.on('exam_types_changed',ExamTypesChanged)
    function ExamTypesChanged(examTypes){
      self.loading = false
      self.examTypes = []
      self.examTypes = examTypes
      self.update()
    }

    marksEntryStore.on('subjects_changed',SubjectsChanged)
    function SubjectsChanged(subjects){
      self.loading = false
      self.subjects = []
      self.subjects = subjects
      self.update()
    }

    marksEntryStore.on('marks_limit_changed',MarksLimitChanged)
    function MarksLimitChanged(marksLimit){
      self.loading = false
      self.marksLimit = {}

      if(marksLimit.length==0){
        toastr.error('Min marks, Max marks not defined on this subject')
      }else{
        self.marksLimit = marksLimit[0]
      }
      self.update()
    }

    marksEntryStore.on('marks_entries_changed',MarksEntriesChanged)
    function MarksEntriesChanged(marksEntries,students){
      self.loading = false
      self.marksEntries = []
      self.marksEntries = marksEntries
      self.students = []
      self.students = students
      if(students.length==0){
        toastr.info('No students to for marks entry')
        self.roll_number = ''
        self.enroll_number = ''
        self.name = ''
      }else{
        self.roll_number = students[0].roll_number
        self.enroll_number = students[0].enroll_number
        self.name = students[0].name
      }

      self.update()
    }

    marksEntryStore.on('add_marks_entries_changed',AddMarksEntriesChanged)
    function AddMarksEntriesChanged(){
      self.loading = false
      self.title = 'Add'
      self.refs.marksInput.value=''
      document.getElementById("absentCheckBoxId").checked = false;
      self.readMarksEntry()
    }

    marksEntryStore.on('delete_marks_entries_changed',DeleteMarksEntriesChanged)
    function DeleteMarksEntriesChanged(){
      self.loading = false
      self.readMarksEntry()
    }

});
riot.tag2('marks-manager', '<loading-bar if="{loading}"></loading-bar> <section class=" is-fluid" show="{view==\'marks_settings\'}"> <div class="level"> <div class="level-left"> <h2 class="title" style="color: #ff3860;">Marks Manager <span show="{action==\'MarksSettingsForm\'}">(</span>{title}<span show="{action==\'MarksSettingsForm\'}">)</span></h2> </div> <div class="level-right"> <button class="button is-warning is-rounded" onclick="{openMarksSettingsForm}" hide="{action==\'MarksSettingsForm\'}"> <span class="icon"> <span class="fas fa-plus"></span> </span> </button> <button class="button is-warning is-rounded" onclick="{closeMarksSettingsForm}" show="{action==\'MarksSettingsForm\'}"> <span class="icon"> <span class="fas fa-arrow-left"></span> </span> </button> <button class="button is-warning is-rounded ml5" onclick="{readMarksSettings}" hide="{action==\'MarksSettingsForm\'}"> <span class="icon"> <span class="fas fa-sync-alt"></span> </span> </button> </div> </div> <div class="box"> <div class="columns"> <div class="column is-narrow"><label class="label">Standard</label></div> <div class="column"> <div class="control"> <div class="select is-fullwidth"> <select ref="standardSelect" onchange="{changeSection}"> <option value="">Select Standard</option> <option each="{classes}" riot-value="{standard_id}">{standard}</option> </select> </div> </div> </div> <div class="column is-narrow"><label class="label">Section</label></div> <div class="column"> <div class="control"> <div class="select is-fullwidth"> <select ref="sectionSelect" onchange="{readClassSubject}"> <option value="">Select Section</option> <option each="{tempSections}" riot-value="{section_id}">{section}</option> </select> </div> </div> </div> <div class="column is-narrow"><label class="label">Exam Type</label></div> <div class="column"> <div class="control"> <div class="select is-fullwidth"> <select ref="examTypeSelect"> <option value="">Select Exam Type</option> <option each="{examTypes}" riot-value="{exam_type_id}">{exam_type}</option> </select> </div> </div> </div> <div class="column is-narrow" show="{action==\'MarksSettingsForm\'}"><label class="label">Subjects</label></div> <div class="column" show="{action==\'MarksSettingsForm\'}"> <div class="control"> <div class="select is-fullwidth"> <select ref="subjectSelect"> <option value="">Select Subject</option> <option each="{subjects}" riot-value="{subject_id}">{subject_name}</option> </select> </div> </div> </div> <div class="column"> <button class="button is-danger has-text-weight-bold" onclick="{readMarksSettings}" hide="{action==\'MarksSettingsForm\'}">GO </button> </div> </div> </div> <table class="table is-fullwidth is-striped is-hoverable" hide="{action==\'MarksSettingsForm\'}"> <thead> <tr> <th class="slno">SL</th> <th>Subject</th> <th>Exam Date</th> <th>Max Marks</th> <th>Min Marks</th> <th>Marking Type</th> <th>Details</th> <th></th> </tr> </thead> <tbody> <tr each="{c, i in marksSettings}"> <td>{i+1}</td> <td>{c.subject_name}</td> <td>{c.exam_date}</td> <td>{c.max_marks}</td> <td>{c.min_marks}</td> <td>{c.marking_type}</td> <td>{c.details}</td> <td class="has-text-right"> <div class="inline-flex rounded border border-grey overflow-hidden" hide="{c.confirmDelete}"> <span><a class="button is-small is-rounded" onclick="{edit.bind(this, c)}">Edit</a></span> <span><a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick="{confirmDelete}">Delete</a></span> </div> <div class="table-buttons" if="{c.confirmDelete}"> <span disabled="{loading}" class="button is-small is-rounded" onclick="{delete}"><i class="fa fa-check"></i></span> <span disabled="{loading}" class="button is-small has-text-danger is-rounded" onclick="{cancelOperation}"><i class="fa fa-times"></i></span> </div> </td> </tr> </tbody> </table> <section class=" is-fluid" show="{action==\'MarksSettingsForm\'}"> <div class="columns"> <div class="column"> <div class="field"> <label class="label" for="role">Date of Exam</label> <div class="control"> <input class="input date" type="text" ref="examDateInput"> </div> </div> <div class="field"> <label class="label" for="role">Marking Type</label> <div class="control"> <div class="select is-fullwidth"> <select ref="markingTypeSelect" onchange="{selectIncludeInGrandTotal}"> <option value="N">Numbered</option> <option value="G">Graded</option> <option value="NG">Number Graded</option> </select> </div> </div> </div> </div> <div class="column"> <div class="field"> <label class="label" for="role">Max Marks</label> <div class="control"> <input class="input" type="text" ref="maxMarksInput"> </div> </div> <div class="field"> <label class="label" for="role">Include In Grand Total</label> <div class="control"> <div class="select is-fullwidth"> <select ref="includeInGrandTotalSelect"> <option value="Y">Yes</option> <option value="N">No</option> </select> </div> </div> </div> </div> <div class="column"> <div class="field"> <label class="label" for="role">Min Marks</label> <div class="control"> <input class="input" type="text" ref="minMarksInput"> </div> </div> <div class="field"> <label class="label" for="role">Show in</label> <div class="control"> <div class="select is-fullwidth"> <select ref="showInSelect"> <option value="B1">Block I</option> <option value="B2">Block II</option> </select> </div> </div> </div> </div> <div class="column"> <div class="field"> <label class="label" for="role">Details</label> <div class="control"> <textarea class="textarea" rows="4" ref="detailsInput"></textarea> </div> </div> </div> </div> <div class="level"> <div class="level-left"> </div> <div class="level-right"> <button class="button is-danger" onclick="{add}">{title}</button> <button class="button ml5" onclick="{closeMarksSettingsForm}">Cancel</button> </div> </div> </section> </section>', '', '', function(opts) {
	var self = this
    self.on("mount", function(){
      self.title = ''
      self.view = 'marks_settings'
      self.action = ''
      self.loading = false;
      self.tempSections = []
      self.update()
      flatpickr(".date", {
        allowInput: true,
        dateFormat: "d/m/Y",
      })
      self.readClass()
      self.readSection()
    })
    self.on("unmount", function(){
      marksManagerStore.off('read_classes_changed',ClassesChanged)
      marksManagerStore.off('read_section_changed',SectionChanged)
      marksManagerStore.off('exam_types_changed',ExamTypesChanged)
      marksManagerStore.off('subjects_changed',SubjectsChanged)
      marksManagerStore.off('marks_settings_changed',MarksSettingssChanged)
    })

    self.readClass = () => {
       self.loading = true;
       marksManagerStore.trigger('read_classes')
    }

    self.readSection = () => {
       self.loading = true;
       marksManagerStore.trigger('read_section')
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

       marksManagerStore.trigger('read_exam_types',self.refs.standardSelect.value)
    }

    self.readClassSubject = () =>{
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
       marksManagerStore.trigger('read_subjects',self.refs.standardSelect.value, self.refs.sectionSelect.value)
      }
    }

    self.readMarksSettings = () => {
      let error = '';

      if(self.refs.sectionSelect.value==''){
        error = error + "Please select section, "
      }

      if(self.refs.examTypeSelect.value==''){
        error = error + "Please select exam type "
      }

      console.log(self.refs.examTypeSelect.value)
      if(error.length!=0){
        toastr.error(error)
        return
      }else{
        self.loading=true
        marksManagerStore.trigger('read_marks_settings',self.refs.sectionSelect.value, self.refs.examTypeSelect.value)
      }

    }

    self.openMarksSettingsForm = () => {
      self.title='Add'
      self.action='MarksSettingsForm'
      self.update()
    }

    self.closeMarksSettingsForm = () => {
      self.title=''
      self.action=''
    }

    self.selectIncludeInGrandTotal = () => {
      console.log(self.refs.markingTypeSelect.value)
      if(self.refs.markingTypeSelect.value=='G'){
        self.refs.includeInGrandTotalSelect.value='N'
      }else{
        self.refs.includeInGrandTotalSelect.value='Y'
      }

    }

    self.add = () => {
      let error = '';

      if(self.refs.sectionSelect.value==''){
        error = error + "Please select section, "
      }

      if(self.refs.examTypeSelect.value==''){
        error = error + "Please select exam type, "
      }

      if(self.refs.subjectSelect.value==''){
        error = error + "Please select subject, "
      }

      if(self.refs.maxMarksInput.value==''){
        error = error + "Please enter max marks, "
      }

      if(self.refs.minMarksInput.value==''){
        error = error + "Please enter min marks, "
      }

      if(Number(self.refs.maxMarksInput.value)<Number(self.refs.minMarksInput.value)){
        error = error + "Min marks can not be greater than max marks "
      }

      if(error.length!=0){
        toastr.error(error)
        return
      }else{
        var obj = {}
        obj['section_id'] = self.refs.sectionSelect.value
        obj['exam_id'] = self.refs.examTypeSelect.value
        obj['subject_id'] = self.refs.subjectSelect.value
        obj['date_of_exam'] = convertDate(self.refs.examDateInput.value)
        obj['marking_type'] = self.refs.markingTypeSelect.value
        obj['grand_total'] = self.refs.includeInGrandTotalSelect.value
        obj['max_marks'] = self.refs.maxMarksInput.value
        obj['min_marks'] = self.refs.minMarksInput.value
        obj['show_in'] = self.refs.showInSelect.value
        obj['details'] = self.refs.detailsInput.value

        self.loading = true
        if(self.title=='Add'){
          marksManagerStore.trigger('add_marks_settings', obj)
        }else if(self.title=='Update'){
          marksManagerStore.trigger('update_grade_settings', obj, self.edit_id)
        }
      }

    }

    self.edit = (c,e) => {
      self.title='Update'
      self.action='MarksSettingsForm'
      self.refs.subjectSelect.value = c.subject_id
      self.refs.examDateInput.value = c.exam_date
      self.refs.markingTypeSelect.value = c.marking_type
      self.refs.includeInGrandTotalSelect.value = c.grand_total
      self.refs.maxMarksInput.value = c.max_marks
      self.refs.minMarksInput.value = c.min_marks
      self.refs.showInSelect.value = c.show_in
      self.refs.detailsInput.value = c.details
      self.edit_id = c.marks_id

      console.log(self.refs.examDateInput.value)

      self.update()
    }

   self.cancelOperation = (e) => {
      self.marksSettings.map(c => {
          c.confirmDelete = false
          c.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.marksSettings.map(c => {
        if(c.marks_id != e.item.c.marks_id){
          c.confirmDelete = false
        }else{
          c.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      marksManagerStore.trigger('delete_marks_settings', e.item.c.marks_id)
    }

    marksManagerStore.on('read_classes_changed',ClassesChanged)
    function ClassesChanged(classes){
      self.loading = false
      self.classes = []
      self.classes = classes
      self.update()
      console.log(self.classes)
    }

    marksManagerStore.on('read_section_changed',SectionChanged)
    function SectionChanged(sections){
      self.loading = false
      self.sections = []
      self.sections = sections
      self.update()
    }

    marksManagerStore.on('exam_types_changed',ExamTypesChanged)
    function ExamTypesChanged(examTypes){
      self.loading = false
      self.examTypes = []
      self.examTypes = examTypes
      self.update()
    }

    marksManagerStore.on('subjects_changed',SubjectsChanged)
    function SubjectsChanged(subjects){
      self.loading = false
      self.subjects = []
      self.subjects = subjects
      self.update()
    }

    marksManagerStore.on('marks_settings_changed',MarksSettingssChanged)
    function MarksSettingssChanged(marksSettings){
      self.loading = false
      self.marksSettings = []
      self.marksSettings = marksSettings
      self.update()
    }

    marksManagerStore.on('add_marks_settings_changed',AddMarksSettingsChanged)
    function AddMarksSettingsChanged(marksSettings){
      self.refs.maxMarksInput.value=''
      self.refs.minMarksInput.value=''
      self.refs.examDateInput.value=''
      self.refs.detailsInput.value=''
      self.closeMarksSettingsForm()
      self.loading = false
      self.readMarksSettings()
    }

    marksManagerStore.on('delete_marks_settings_changed',DeleteMarksSettingsChanged)
    function DeleteMarksSettingsChanged(marksSettings){
      self.loading = false
      self.marksSettings = []
      self.marksSettings = marksSettings
      self.update()
    }

});
riot.tag2('marks-report', '<div class="field has-addons"> <p class="control"> <a class="button {is-active: selected_marks_report == \'consolidate-tabulation-sheet\'}" href="#/marks-report/consolidate-tabulation-sheet"> <span>Consolidate Tabulation Sheet</span> </a> </p> <p class="control"> <a class="button {is-active: selected_marks_report == \'merit-list\'}" href="#/marks-report/merit-list"> <span>Merit List</span> </a> </p> <p class="control"> <a class="button {is-active: selected_marks_report == \'top-five\'}" href="#/marks-report/top-five"> <span>Top Five</span> </a> </p> <p class="control"> <a class="button {is-active: selected_marks_report == \'first-assessment-report-card\'}" href="#/marks-report/first-assessment-report-card"> <span>First Assessment Report Card</span> </a> </p> <p class="control"> <a class="button {is-active: selected_marks_report == \'final-assessment-report-card\'}" href="#/marks-report/final-assessment-report-card"> <span>Final Assessment Report Card</span> </a> </p> </div> <div id="marks-report-view"></div>', '', '', function(opts) {
    var self = this
    console.log('opts.selected_marks_report')
    console.log(opts.selected_marks_report)
    if(!opts.selected_marks_report){
      self.selected_marks_report = 'item'
    }else{
      self.selected_marks_report = opts.selected_marks_report
    }
});
riot.tag2('master', '<div class="field has-addons"> <p class="control"> <a class="button {is-active: selected_master == \'employee-type\'}" href="#/master/employee-type"> <span>Employee Type</span> </a> </p> <p class="control"> <a class="button {is-active: selected_master == \'designation\'}" href="#/master/designation"> <span>Designation</span> </a> </p> <p class="control"> <a class="button {is-active: selected_master == \'department\'}" href="#/master/department"> <span>Department</span> </a> </p> <p class="control"> <a class="button {is-active: selected_master == \'level\'}" href="#/master/level"> <span>Level</span> </a> </p> <p class="control"> <a class="button {is-active: selected_master == \'employment-status\'}" href="#/master/employment-status"> <span>Employment Status</span> </a> </p> <p class="control"> <a class="button {is-active: selected_master == \'role\'}" href="#/master/role"> <span>Employee Role</span> </a> </p> <p class="control"> <a class="button {is-active: selected_master == \'country\'}" href="#/master/country"> <span>Country</span> </a> </p> <p class="control"> <a class="button {is-active: selected_master == \'city\'}" href="#/master/city"> <span>City</span> </a> </p> <p class="control"> <a class="button {is-active: selected_master == \'state\'}" href="#/master/state"> <span>State</span> </a> </p> <p class="control"> <a class="button {is-active: selected_master == \'religion\'}" href="#/master/religion"> <span>Religion</span> </a> </p> <p class="control"> <a class="button {is-active: selected_master == \'area\'}" href="#/master/area"> <span>Area</span> </a> </p> <p class="control"> <a class="button {is-active: selected_master == \'standard\'}" href="#/master/standard"> <span>New Class</span> </a> </p> <p class="control"> <a class="button {is-active: selected_master == \'section-master\'}" href="#/master/section-master"> <span>Section</span> </a> </p> </div> <div class="field has-addons"> <p class="control"> <a class="button {is-active: selected_master == \'club\'}" href="#/master/club"> <span>Club</span> </a> </p> <p class="control"> <a class="button {is-active: selected_master == \'parentgroup\'}" href="#/master/parentgroup"> <span>Parent Group</span> </a> </p> <p class="control"> <a class="button {is-active: selected_master == \'remark\'}" href="#/master/remark"> <span>Remark</span> </a> </p> <p class="control"> <a class="button {is-active: selected_master == \'event-master\'}" href="#/master/event-master/calender">Event Calender</a> </a> </p> </div> <div id="master-view"></div>', '', '', function(opts) {
    var self = this
    console.log('opts.selected_master')
    console.log(opts.selected_master)
    if(!opts.selected_master){
      self.selected_master = 'employee-type'
    }else{
      self.selected_master = opts.selected_master
    }
});



riot.tag2('maturity-development', '<loading-bar if="{loading}"></loading-bar> <section class=" is-fluid" show="{view==\'maturity_developments\'}"> <div class="level"> <div class="level-left"> <h2 class="title" style="color: #ff3860;">Maturity Development <span style="font-weight:normal" show="{action==\'MaturityDevelopmentForm\'}">({details})({title})</span> </h2> </div> <div class="level-right"> <button class="button is-warning is-rounded" onclick="{closeMaturityDevelopmentForm}" show="{action==\'MaturityDevelopmentForm\'}"> <span class="icon"> <span class="fas fa-arrow-left"></span> </span> </button> <button class="button is-warning is-rounded ml5" onclick="{readMaturityDevelopmentStudents}" hide="{action==\'MaturityDevelopmentForm\'}"> <span class="icon"> <span class="fas fa-sync-alt"></span> </span> </button> </div> </div> <div class="box"> <div class="columns"> <div class="column is-narrow"><label class="label">Standard</label></div> <div class="column"> <div class="control"> <div class="select is-fullwidth"> <select ref="standardSelect" onchange="{changeSection}"> <option value="">Select Standard</option> <option each="{classes}" riot-value="{standard_id}">{standard}</option> </select> </div> </div> </div> <div class="column is-narrow"><label class="label">Section</label></div> <div class="column"> <div class="control"> <div class="select is-fullwidth"> <select ref="sectionSelect" onchange="{readClassSubject}"> <option value="">Select Section</option> <option each="{tempSections}" riot-value="{section_id}">{section}</option> </select> </div> </div> </div> <div class="column is-narrow"><label class="label">Exam Term</label></div> <div class="column"> <div class="control"> <div class="select is-fullwidth"> <select ref="examTermSelect"> <option value="">Select Exam Term</option> <option value="First">First</option> <option value="Final">Final</option> </select> </div> </div> </div> <div class="column"> <button class="button is-danger has-text-weight-bold" onclick="{readMaturityDevelopmentStudents}" hide="{action==\'MaturityDevelopmentForm\'}">GO </button> </div> </div> </div> <table class="table is-fullwidth is-striped is-hoverable" hide="{action==\'MaturityDevelopmentForm\'}"> <thead> <tr> <th class="slno">SL</th> <th>Enroll No</th> <th>Name</th> <th>Class</th> <th>Status</th> <th></th> </tr> </thead> <tbody> <tr each="{c, i in maturityDevelopments}"> <td>{i+1}</td> <td>{c.enroll_number}</td> <td>{c.student_name}</td> <td>{c.standard}</td> <td>{c.exam_term}</td> <td class="has-text-right"> <div class="inline-flex rounded border border-grey overflow-hidden" hide="{c.confirmDelete}"> <span><a class="button is-small is-rounded" onclick="{openMaturityDevelopmentForm.bind(this, c)}">Assign</a></span> <span><a class="button is-small is-rounded" onclick="{viewDetails.bind(this, c)}">View</a></span> <span><a class="button is-small is-rounded" onclick="{edit.bind(this, c)}">Edit</a></span> <span><a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick="{confirmDelete}">Delete</a></span> </div> <div class="table-buttons" if="{c.confirmDelete}"> <span disabled="{loading}" class="button is-small is-rounded" onclick="{delete}"><i class="fa fa-check"></i></span> <span disabled="{loading}" class="button is-small has-text-danger is-rounded" onclick="{cancelOperation}"><i class="fa fa-times"></i></span> </div> </td> </tr> </tbody> </table> <section class=" is-fluid" show="{action==\'MaturityDevelopmentForm\'}"> <div class="columns"> <div class="column"> <div class="field"> <label class="label" for="role">Initiative and Perseverance</label> <div class="control"> <div class="select is-fullwidth"> <select ref="initiativeAndPerseveranceSelect"> <option value="initiative_first">Self-motivated and completes tasks</option> <option value="initiative_second">Works well with minimum direction</option> <option value="initiative_third">Needs constant guidance</option> <option value="initiative_fourth">Has to be told every thing</option> </select> </div> </div> </div> </div> <div class="column"> <div class="field"> <label class="label" for="role">Interest</label> <div class="control"> <div class="select is-fullwidth"> <select ref="interestSelect"> <option value="interest_first">Easily Stimulated and sustained</option> <option value="interest_second">Interested only in some areas</option> <option value="interest_third">Inconsistent</option> <option value="interest_fourth">Indifferent</option> </select> </div> </div> </div> </div> </div> <div class="columns"> <div class="column"> <div class="field"> <label class="label" for="role">Use of Time</label> <div class="control"> <div class="select is-fullwidth"> <select ref="useOfTimeSelect"> <option value="time_first">Uses time profitably</option> <option value="time_second">Organized most of the time</option> <option value="time_third">Disorganized but responds well to guidance</option> <option value="time_fourth">Easily distracted</option> </select> </div> </div> </div> </div> <div class="column"> <div class="field"> <label class="label" for="role">Works Habits</label> <div class="control"> <div class="select is-fullwidth"> <select ref="worksHabitsSelect"> <option value="work_first">Very careful worker</option> <option value="work_second">Usually neat</option> <option value="work_third">Untidy</option> <option value="work_fourth">Careless</option> </select> </div> </div> </div> </div> </div> <div class="columns"> <div class="column"> <div class="field"> <label class="label" for="role">Participation in Group Work</label> <div class="control"> <div class="select is-fullwidth"> <select ref="participationInGroupWorkSelect"> <option value="participation_first">Contributes readily</option> <option value="participation_second">Tries to dominate the group</option> <option value="participation_third">Takes part occasionally</option> <option value="participation_fourth">Has to be coaxed to participate</option> </select> </div> </div> </div> </div> <div class="column"> <div class="field"> <label class="label" for="role">Responsibility</label> <div class="control"> <div class="select is-fullwidth"> <select ref="responsibilitySelect"> <option value="responsibility_first">Takes initiative in situations which require responsibility</option> <option value="responsibility_second">Accepts a responsibility only when it is assigned</option> <option value="responsibility_third">Casual about responsibility</option> <option value="responsibility_fourth">Reluctant to accept responsibility</option> </select> </div> </div> </div> </div> </div> <div class="level"> <div class="level-left"> </div> <div class="level-right"> <button class="button is-danger" onclick="{add}">{title}</button> <button class="button ml5" onclick="{closeMaturityDevelopmentForm}">Cancel</button> </div> </div> </section> </section> <section class="is-fluid" show="{view==\'details\'}"> <div class="level no-print"> <div class="level-left"> <h2 class="title" style="color: #ff3860;">Maturity Development</h2> </div> <div class="level-right"> <button class="button is-warning is-rounded" onclick="{closeDetails}"> <span class="icon"> <span class="fas fa-arrow-left"></span> </span> </button> </div> </div> <center> <h6 class="title">Maturity Development view for Class {student_info.standard} </h6> <table class="table"> <tbody> <tr> <th>Name</th> <td>{student_info.student_name}</td> <th>Enroll Number</th> <td>{student_info.enroll_number}</td> </tr> </tbody> </table> <table class="table is-bordered"> <tbody> <tr> <td colspan="2">Given below are six areas in which maturity of the students is shown. within each areas, four levels of maturity have been given. This information indicates at which level your son works at school. </td> </tr> <tr> <th class="has-text-centered">INITIATIVE &amp; PERSEVERANCE</th> <th class="has-text-centered" style="width:120px;">{student_info.term} Term</th> </tr> <tr> <td>1. Self - motivated and completes tasks</td> <td class="has-text-centered"> <span class="icon" show="{initiative_first}"> <span class="fas fa-check"></span> </span> </td> </tr> <tr> <td>2. Works well with minimum direction</td> <td class="has-text-centered"> <span class="icon" show="{initiative_second}"> <span class="fas fa-check"></span> </span> </td> </tr> <tr> <td>3. Needs constant guidance</td> <td class="has-text-centered"> <span class="icon" show="{initiative_third}"> <span class="fas fa-check"></span> </span> </td> </tr> <tr> <td>4. has to be told every thing</td> <td class="has-text-centered"> <span class="icon" show="{initiative_fourth}"> <span class="fas fa-check"></span> </span> </td> </tr> <tr> <th class="has-text-centered">INTEREST</th> <td class="has-text-centered"></td> </tr> <tr> <td>1. Easily stimulated &amp; sustained</td> <td class="has-text-centered"> <span class="icon" show="{interest_first}"> <span class="fas fa-check"></span> </span> </td> </tr> <tr> <td>2. Interested only in some areas</td> <td class="has-text-centered"> <span class="icon" show="{interest_second}"> <span class="fas fa-check"></span> </span> </td> </tr> <tr> <td>3. Inconsistent</td> <td class="has-text-centered"> <span class="icon" show="{interest_third}"> <span class="fas fa-check"></span> </span> </td> </tr> <tr> <td>4. Indifferent</td> <td class="has-text-centered"> <span class="icon" show="{interest_fourth}"> <span class="fas fa-check"></span> </span> </td> </tr> <tr> <th class="has-text-centered">USE OF TIME</th> <th class="has-text-centered"></th> </tr> <tr> <td>1. Uses time profitably</td> <td class="has-text-centered"> <span class="icon" show="{time_first}"> <span class="fas fa-check"></span> </span> </td> </tr> <tr> <td>2. Organized most of the time</td> <td class="has-text-centered"> <span class="icon" show="{time_second}"> <span class="fas fa-check"></span> </span> </td> </tr> <tr> <td>3. Disorganized but responds well to guidance</td> <td class="has-text-centered"> <span class="icon" show="{time_third}"> <span class="fas fa-check"></span> </span> </td> </tr> <tr> <td>4. Easily distracted</td> <td class="has-text-centered"> <span class="icon" show="{time_fourth}"> <span class="fas fa-check"></span> </span> </td> </tr> <tr> <th class="has-text-centered">WORK HABITS</th> <th class="has-text-centered"></th> </tr> <tr> <td>1. Very careful worker</td> <td class="has-text-centered"> <span class="icon" show="{work_first}"> <span class="fas fa-check"></span> </span> </td> </tr> <tr> <td>2. Usually neat</td> <td class="has-text-centered"> <span class="icon" show="{work_second}"> <span class="fas fa-check"></span> </span> </td> </tr> <tr> <td>3. Untidy</td> <td class="has-text-centered"> <span class="icon" show="{work_third}"> <span class="fas fa-check"></span> </span> </td> </tr> <tr> <td>4. Careless</td> <td class="has-text-centered"> <span class="icon" show="{work_fourth}"> <span class="fas fa-check"></span> </span> </td> </tr> <tr> <th class="has-text-centered">PARTICIPATION IN GROUP WORK</th> <th class="has-text-centered"></th> </tr> <tr> <td>1. Contributes readily</td> <td class="has-text-centered"> <span class="icon" show="{participation_first}"> <span class="fas fa-check"></span> </span> </td> </tr> <tr> <td>2. Tries to dominate the group</td> <td class="has-text-centered"> <span class="icon" show="{participation_second}"> <span class="fas fa-check"></span> </span> </td> </tr> <tr> <td>3. Takes part occasionally</td> <td class="has-text-centered"> <span class="icon" show="{participation_third}"> <span class="fas fa-check"></span> </span> </td> </tr> <tr> <td>4. Has to be coaxed to participate</td> <td class="has-text-centered"> <span class="icon" show="{participation_fourth}"> <span class="fas fa-check"></span> </span> </td> </tr> <tr> <th class="has-text-centered">RESPONSIBILITY</th> <th class="has-text-centered"></th> </tr> <tr> <td>1. Takes initiative in situations which require responsibility</td> <td class="has-text-centered"> <span class="icon" show="{responsibility_first}"> <span class="fas fa-check"></span> </span> </td> </tr> <tr> <td>2. Accepts a responsibility only when it is assigned</td> <td class="has-text-centered"> <span class="icon" show="{responsibility_second}"> <span class="fas fa-check"></span> </span> </td> </tr> <tr> <td>3. Casual about responsibility</td> <td class="has-text-centered"> <span class="icon" show="{responsibility_third}"> <span class="fas fa-check"></span> </span> </td> </tr> <tr> <td>4. Reluctant to accept responsibility</td> <td class="has-text-centered"> <span class="icon" show="{responsibility_fourth}"> <span class="fas fa-check"></span> </span> </td> </tr> </tbody> </table> </center> </section>', '', '', function(opts) {
	var self = this
  self.student_info = {'student_name':'','enroll_number':'','term':'','standard':''}
    self.on("mount", function(){
      self.title = ''
      self.view = 'maturity_developments'
      self.action = ''
      self.details = ''
      self.loading = false;
      self.tempSections = []
      self.update()
      flatpickr(".date", {
        allowInput: true,
        dateFormat: "d/m/Y",
      })
      self.readClass()
      self.readSection()
    })
    self.on("unmount", function(){
      maturityDevelopmentStore.off('read_classes_changed',ClassesChanged)
      maturityDevelopmentStore.off('read_section_changed',SectionChanged)
      maturityDevelopmentStore.off('maturity_developments_changed',MaturityDevelopmentsChanged)
      maturityDevelopmentStore.off('maturity_development_student_update_changed',MaturityDevelopmentsReadUpdateChanged)
      maturityDevelopmentStore.off('read_maturity_development_details_changed',MaturityDevelopmentsDetailsChanged)
    })

    self.readClass = () => {
       self.loading = true;
       maturityDevelopmentStore.trigger('read_classes')
    }

    self.readSection = () => {
       self.loading = true;
       maturityDevelopmentStore.trigger('read_section')
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

       maturityDevelopmentStore.trigger('read_exam_types',self.refs.standardSelect.value)
    }

    self.readMaturityDevelopmentStudents = () => {
      let error = '';

      if(self.refs.sectionSelect.value==''){
        error = error + "Please select section, "
      }

      if(self.refs.examTermSelect.value==''){
        error = error + "Please select exam type "
      }

      console.log(self.refs.examTermSelect.value)
      if(error.length!=0){
        toastr.error(error)
        return
      }else{
        self.loading=true
        maturityDevelopmentStore.trigger('read_maturity_development_students',self.refs.sectionSelect.value, self.refs.examTermSelect.value)
      }

    }

    self.openMaturityDevelopmentForm = (c,e) => {
      self.title='Add'
      self.action='MaturityDevelopmentForm'
      self.details=c.student_name + ',' + 'Enroll No: ' + c.enroll_number
      self.student_id=c.student_id
      self.update()
    }

    self.closeMaturityDevelopmentForm = () => {
      self.title=''
      self.action=''
    }

    self.selectIncludeInGrandTotal = () => {
      console.log(self.refs.markingTypeSelect.value)
      if(self.refs.markingTypeSelect.value=='G'){
        self.refs.includeInGrandTotalSelect.value='N'
      }else{
        self.refs.includeInGrandTotalSelect.value='Y'
      }

    }

    self.add = () => {
      let error = '';

      var obj = {}
      obj['initiative_first']=0
      obj['initiative_second']=0
      obj['initiative_third']=0
      obj['initiative_fourth']=0

      if(self.refs.initiativeAndPerseveranceSelect.value == 'initiative_first'){
        obj['initiative_first']=1
      }else if(self.refs.initiativeAndPerseveranceSelect.value == 'initiative_second'){
        obj['initiative_second']=1
      }else if(self.refs.initiativeAndPerseveranceSelect.value == 'initiative_third'){
        obj['initiative_third']=1
      }else if(self.refs.initiativeAndPerseveranceSelect.value == 'initiative_fourth'){
        obj['initiative_fourth']=1
      }

      obj['interest_first']=0
      obj['interest_second']=0
      obj['interest_third']=0
      obj['interest_fourth']=0

      if(self.refs.interestSelect.value == 'interest_first'){
        obj['interest_first']=1
      }else if(self.refs.interestSelect.value == 'interest_second'){
        obj['interest_second']=1
      }else if(self.refs.interestSelect.value == 'interest_third'){
        obj['interest_third']=1
      }else if(self.refs.interestSelect.value == 'interest_fourth'){
        obj['interest_fourth']=1
      }

      obj['use_time_first']=0
      obj['use_time_second']=0
      obj['use_time_third']=0
      obj['use_time_fourth']=0

      if(self.refs.useOfTimeSelect.value == 'time_first'){
        obj['use_time_first']=1
      }else if(self.refs.useOfTimeSelect.value == 'time_second'){
        obj['use_time_second']=1
      }else if(self.refs.useOfTimeSelect.value == 'time_third'){
        obj['use_time_third']=1
      }else if(self.refs.useOfTimeSelect.value == 'time_fourth'){
        obj['use_time_fourth']=1
      }

      obj['work_habit_first']=0
      obj['work_habit_second']=0
      obj['work_habit_third']=0
      obj['work_habit_fourth']=0

      if(self.refs.worksHabitsSelect.value == 'work_first'){
        obj['work_habit_first']=1
      }else if(self.refs.worksHabitsSelect.value == 'work_second'){
        obj['work_habit_second']=1
      }else if(self.refs.worksHabitsSelect.value == 'work_third'){
        obj['work_habit_third']=1
      }else if(self.refs.worksHabitsSelect.value == 'work_fourth'){
        obj['work_habit_fourth']=1
      }

      obj['participation_first']=0
      obj['participation_second']=0
      obj['participation_third']=0
      obj['participation_fourth']=0

      if(self.refs.participationInGroupWorkSelect.value == 'participation_first'){
        obj['participation_first']=1
      }else if(self.refs.participationInGroupWorkSelect.value == 'participation_second'){
        obj['participation_second']=1
      }else if(self.refs.participationInGroupWorkSelect.value == 'participation_third'){
        obj['participation_third']=1
      }else if(self.refs.participationInGroupWorkSelect.value == 'participation_fourth'){
        obj['participation_fourth']=1
      }

      obj['responsibility_first']=0
      obj['responsibility_second']=0
      obj['responsibility_third']=0
      obj['responsibility_fourth']=0

      if(self.refs.responsibilitySelect.value == 'responsibility_first'){
        obj['responsibility_first']=1
      }else if(self.refs.responsibilitySelect.value == 'responsibility_second'){
        obj['responsibility_second']=1
      }else if(self.refs.responsibilitySelect.value == 'responsibility_third'){
        obj['responsibility_third']=1
      }else if(self.refs.responsibilitySelect.value == 'responsibility_fourth'){
        obj['responsibility_fourth']=1
      }

      if(self.refs.examTermSelect.value==''){
        error = error + "Please select exam term, "
      }

      if(error.length!=0){
        toastr.error(error)
        return
      }else{
        obj['student_id']=self.student_id
        obj['exam_term']=self.refs.examTermSelect.value

        self.loading = true
        if(self.title=='Add'){
          maturityDevelopmentStore.trigger('add_maturity_developments', obj)
        }else if(self.title=='Update'){
          maturityDevelopmentStore.trigger('update_maturity_developments', obj, self.student_details.id)
        }
      }

    }

    self.viewDetails = (c,e) => {
      self.student_info=c
      self.student_info.term=self.refs.examTermSelect.value
      self.loading=true
      maturityDevelopmentStore.trigger('read_maturity_development_details',c.student_id, self.refs.examTermSelect.value)
    }

    self.closeDetails = (c,e) => {
      self.view='maturity_developments'
      self.update()
    }

    self.edit = (c,e) => {
      self.details=c.student_name + ',' + 'Enroll No: ' + c.enroll_number
      self.loading=true
      maturityDevelopmentStore.trigger('read_maturity_development_update',c.student_id, self.refs.examTermSelect.value)
    }

   self.cancelOperation = (e) => {
      self.maturityDevelopments.map(c => {
          c.confirmDelete = false
          c.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.maturityDevelopments.map(c => {
        if(c.student_id != e.item.c.student_id){
          c.confirmDelete = false
        }else{
          c.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      maturityDevelopmentStore.trigger('delete_maturity_developments', e.item.c.student_id,self.refs.examTermSelect.value)
    }

    maturityDevelopmentStore.on('read_classes_changed',ClassesChanged)
    function ClassesChanged(classes){
      self.loading = false
      self.classes = []
      self.classes = classes
      self.update()
      console.log(self.classes)
    }

    maturityDevelopmentStore.on('read_section_changed',SectionChanged)
    function SectionChanged(sections){
      self.loading = false
      self.sections = []
      self.sections = sections
      self.update()
    }

    maturityDevelopmentStore.on('maturity_development_students_changed',MaturityDevelopmentsChanged)
    function MaturityDevelopmentsChanged(maturityDevelopments){
      self.loading = false
      self.maturityDevelopments = []
      self.maturityDevelopments = maturityDevelopments
      self.update()
    }

    maturityDevelopmentStore.on('maturity_development_student_update_changed',MaturityDevelopmentsReadUpdateChanged)
    function MaturityDevelopmentsReadUpdateChanged(details){
      self.student_details = {}
      if(details.length>0){
        self.student_details = details[0]
        self.title='Update'
        self.action='MaturityDevelopmentForm'

        if(self.student_details.initiative_first==1){
          self.refs.initiativeAndPerseveranceSelect.value = 'initiative_first'
        }else if(self.student_details.initiative_second==1){
          self.refs.initiativeAndPerseveranceSelect.value = 'initiative_second'
        }else if(self.student_details.initiative_third==1){
          self.refs.initiativeAndPerseveranceSelect.value = 'initiative_third'
        }else if(self.student_details.initiative_fourth==1){
          self.refs.initiativeAndPerseveranceSelect.value = 'initiative_fourth'
        }

        if(self.student_details.interest_first==1){
          self.refs.interestSelect.value = 'interest_first'
        }else if(self.student_details.interest_second==1){
          self.refs.interestSelect.value = 'interest_second'
        }else if(self.student_details.interest_third==1){
          self.refs.interestSelect.value = 'interest_third'
        }else if(self.student_details.interest_fourth==1){
          self.refs.interestSelect.value = 'interest_fourth'
        }

        if(self.student_details.use_time_first==1){
          self.refs.useOfTimeSelect.value = 'time_first'
        }else if(self.student_details.use_time_second==1){
          self.refs.useOfTimeSelect.value = 'time_second'
        }else if(self.student_details.use_time_third==1){
          self.refs.useOfTimeSelect.value = 'time_third'
        }else if(self.student_details.use_time_fourth==1){
          self.refs.useOfTimeSelect.value = 'time_fourth'
        }

        if(self.student_details.work_habit_first==1){
          self.refs.worksHabitsSelect.value = 'work_first'
        }else if(self.student_details.work_habit_second==1){
          self.refs.worksHabitsSelect.value = 'work_second'
        }else if(self.student_details.work_habit_third==1){
          self.refs.worksHabitsSelect.value = 'work_third'
        }else if(self.student_details.work_habit_fourth==1){
          self.refs.worksHabitsSelect.value = 'work_fourth'
        }

        if(self.student_details.participation_first==1){
          self.refs.participationInGroupWorkSelect.value = 'participation_first'
        }else if(self.student_details.participation_second==1){
          self.refs.participationInGroupWorkSelect.value = 'participation_second'
        }else if(self.student_details.participation_third==1){
          self.refs.participationInGroupWorkSelect.value = 'participation_third'
        }else if(self.student_details.participation_fourth==1){
          self.refs.participationInGroupWorkSelect.value = 'participation_fourth'
        }

        if(self.student_details.responsibility_first==1){
          self.refs.responsibilitySelect.value = 'responsibility_first'
        }else if(self.student_details.responsibility_second==1){
          self.refs.responsibilitySelect.value = 'responsibility_second'
        }else if(self.student_details.responsibility_third==1){
          self.refs.responsibilitySelect.value = 'responsibility_third'
        }else if(self.student_details.responsibility_fourth==1){
          self.refs.responsibilitySelect.value = 'responsibility_fourth'
        }

        self.loading = false
        self.update()
      }else{
        self.loading = false
        toastr.error('Please Assign Maturity Development')
        self.update()
      }

    }

    maturityDevelopmentStore.on('read_maturity_development_details_changed',MaturityDevelopmentsDetailsChanged)
    function MaturityDevelopmentsDetailsChanged(details){

      if(details.length>0){
        self.view='details'

        self.initiative_first = false
        self.initiative_second = false
        self.initiative_third = false
        self.initiative_fourth = false
        if(details[0].initiative_first==1){
          self.initiative_first = true
        }else if(details[0].initiative_second==1){
          self.initiative_second = true
        }else if(details[0].initiative_third==1){
          self.initiative_third = true
        }else if(details[0].initiative_fourth==1){
          self.initiative_fourth = true
        }

        self.interest_first = false
        self.interest_second = false
        self.interest_third = false
        self.interest_fourth = false
        if(details[0].interest_first==1){
          self.interest_first = true
        }else if(details[0].interest_second==1){
          self.interest_second = true
        }else if(details[0].interest_third==1){
          self.interest_third = true
        }else if(details[0].interest_fourth==1){
          self.interest_fourth = true
        }

        self.time_first = false
        self.time_second = false
        self.time_third = false
        self.time_fourth = false
        if(details[0].use_time_first==1){
          self.time_first = true
        }else if(details[0].use_time_second==1){
          self.time_second = true
        }else if(details[0].use_time_third==1){
          self.time_third = true
        }else if(details[0].use_time_fourth==1){
          self.time_fourth = true
        }

        self.work_first = false
        self.work_second = false
        self.work_third = false
        self.work_fourth = false
        if(details[0].work_habit_first==1){
          self.work_first = true
        }else if(details[0].work_habit_second==1){
          self.work_second = true
        }else if(details[0].work_habit_third==1){
          self.work_third = true
        }else if(details[0].work_habit_fourth==1){
          self.work_fourth = true
        }

        self.participation_first = false
        self.participation_second = false
        self.participation_third = false
        self.participation_fourth = false
        if(details[0].participation_first==1){
          self.participation_first = true
        }else if(details[0].participation_second==1){
          self.participation_second = true
        }else if(details[0].participation_third==1){
          self.participation_third = true
        }else if(details[0].participation_fourth==1){
          self.participation_fourth = true
        }

        self.responsibility_first = false
        self.responsibility_second = false
        self.responsibility_third = false
        self.responsibility_fourth = false
        if(details[0].responsibility_first==1){
          self.responsibility_first = true
        }else if(details[0].responsibility_second==1){
          self.responsibility_second = true
        }else if(details[0].responsibility_third==1){
          self.responsibility_third = true
        }else if(details[0].responsibility_fourth==1){
          self.responsibility_fourth = true
        }

        self.loading = false
        self.update()
      }else{
        self.loading = false
        toastr.error('Please Assign Maturity Development')
        self.update()
      }

    }

    maturityDevelopmentStore.on('add_maturity_developments_changed',AddMaturityDevelopmentChanged)
    function AddMaturityDevelopmentChanged(maturityDevelopments){
      self.closeMaturityDevelopmentForm()
      self.loading = false
      self.readMaturityDevelopmentStudents()
    }

    maturityDevelopmentStore.on('delete_maturity_developments_changed',DeleteMaturityDevelopmentChanged)
    function DeleteMaturityDevelopmentChanged(maturityDevelopments){
      self.loading = false
      self.maturityDevelopments.map(c => {
        c.confirmDelete = false
      })
      self.update()
    }

});
riot.tag2('mentor-case-wise-report', '<section class=" is-fluid"> <h2 class="title has-text-centered" style="color: #ff3860;">Student Category wise Mentor Report</h2> <div class="flex items-center mt-2 mb-6 no-print"> <div class="bg-green py-1 rounded w-10"> <div class="bg-grey h-px flex-auto"></div> </div> </div> <div class="box"> <div class="columns"> <div class="column is-narrow"> <label class="label">From Date</label> </div> <div class="column is-narrow"> <input class="date input flatpickr-input form-control input" placeholder="" ref="start_date" tabindex="0" type="text" readonly="readonly"> </div> <div class="column is-narrow"> <label class="label">To Date</label> </div> <div class="column is-narrow"> <input class="date input flatpickr-input form-control input" placeholder="" ref="end_date" tabindex="0" type="text" readonly="readonly"> </div> <div class="column"> <button class="button is-danger has-text-weight-bold" onclick="{getData}"> GO </button> <input type="checkbox" id="checkTable" checked="{e.done}" onclick="{viewTable}" style="margin-top: 12px;"> Table </div> </div> </div> <canvas id="canvas_pie" show="{report_view ==\'show_graph\'}"></canvas> <div class="columns is-centered"> <table class="table is-striped is-hoverable is-bordered" show="{report_view ==\'show_table\'}"> <thead> <tr> <th>Category</th> <th class="has-text-right">Total</th> </tr> </thead> <tbody> <tr each="{cd, i in case_wise_reports}"> <td>{cd.category_name}</td> <td class="has-text-right">{cd.total}</td> </tr> <tr> <td class="has-text-right">Total</td> <td class="has-text-right">{grand_total}</td> </tr> </tbody> </table> </div> </section>', '', '', function(opts) {
	var self = this
    self.on("mount", function(){
      flatpickr(".date", {

    	allowInput: true,
    	altFormat: "d/m/Y",
    	dateFormat: "Y-m-d",
  		})
      self.update();
    })

    self.on("unmount", function(){
      mentorReportStore.off('read_case_wise_report_changed',ReadCaseChanged)
    })

    self.viewTable = () => {
    	if($('#checkTable').is(":checked")){
	        self.report_view = 'show_table'
    	}else{
	        self.report_view = 'show_graph'
    	}
    }
    self.getData = () => {
    	var obj={}
          obj['start_date']=self.refs.start_date.value
          obj['end_date']=self.refs.end_date.value
          self.loading = true
          mentorReportStore.trigger('read_case_wise_report', obj)
          self.report_view = 'show_graph'
          console.log(obj)
    }

    mentorReportStore.on('read_case_wise_report_changed',ReadCaseChanged)
    function ReadCaseChanged(case_wise_reports,grand_total){
      self.case_wise_reports = case_wise_reports
      self.grand_total = grand_total

      var chartColors = ['#e3342f','#F6993F','#F2D024','#1F9D55','#2779BD','#9561E2','#B8C2CC','#fff'];

		var labels = []
		var chart_percentage = []
        var backgroundColor = []

		 for (var i = self.case_wise_reports.length - 1; i >= 0; i--) {
		 	var total_percentage = ((self.case_wise_reports[i].total*100)/self.grand_total).toFixed(2);
		    var percentage = self.case_wise_reports[i].category_name + ' ( ' + self.case_wise_reports[i].total + ' , ' + total_percentage + '% )';

		    labels.push(percentage)
		    chart_percentage.push(self.case_wise_reports[i].total)
		    if(typeof chartColors[i] != "undefined"){
		    	backgroundColor.push(chartColors[i])
		    }

		 }

		  console.log(labels);
		  console.log(chart_percentage);

		  var config = {
		    type: 'pie',
		    data: {
		      datasets: [{
		        data: chart_percentage,
		        backgroundColor: backgroundColor,
		        label: 'labels'
		      }],
		      labels: labels
		    },
		    options: {
		      responsive: true
		    }
		  };

		  var ctx = document.getElementById('canvas_pie').getContext('2d');
		  window.myPie = new Chart(ctx, config);
      self.update()
      console.log(self.case_wise_reports)
    }
});
riot.tag2('mentor-case', '<section class=" is-fluid"> <h2 class="title has-text-centered" style="color: #ff3860;">Mentor Case Management Console</h2> <div class="flex items-center mt-2 mb-6 no-print"> <div class="bg-green py-1 rounded w-10"> <div class="bg-grey h-px flex-auto"></div> </div> </div> <div class="box"> <div class="columns"> <div class="column is-narrow"> <label class="label">Category</label> </div> <div class="column is-narrow"> <div class="control"> <div class="select"> <select ref="category_id"> <option each="{categories}" riot-value="{category_id}">{category_name} </option> </select> </div> </div> </div> <div class="column is-narrow"> <label class="label">Case</label> </div> <div class="column is-half"> <div class="control"> <input class=" input" ref="addCaseInput" type="text"> </div> </div> <div class="column"> <button class="button is-danger has-text-weight-bold" onclick="{add}">{title} </button> </div> </div> </div> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th>SL</th> <th>Category</th> <th>Case</th> <th></th> </tr> </thead> <tbody> <tr each="{ca, i in mentor_case}"> <td>{i+1}</td> <td>{ca.category_name}</td> <td>{ca.case_name}</td> <td class="has-text-right"> <div class="inline-flex rounded border border-grey overflow-hidden" hide="{ca.confirmDelete}"> <span><a class="button is-small is-rounded" onclick="{edit.bind(this, ca)}">Edit</a></span> <span if="{role==\'ADMIN\'}"> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick="{confirmDelete}">Delete</a></span> </div> <div class="table-buttons" if="{ca.confirmDelete}"> <span disabled="{loading}" class="button is-small is-rounded" onclick="{delete}"><i class="fa fa-check"></i></span> <span disabled="{loading}" class="button is-small has-text-danger is-rounded" onclick="{cancelOperation}"><i class="fa fa-times"></i></span> </div> </td> </tr> </tbody> </table> </section>', '', '', function(opts) {
	var self = this
    self.on("mount", function(){
      self.title='Create'
      self.role = getCookie('role')
      self.update()
      self.readCategories()
      self.readCase()
    })
    self.on("unmount", function(){
      mentorcaseStore.off('add_case_changed', AddCaseChanged)
      mentorcaseStore.off('read_case_changed', ReadCaseChanged)
      mentorcaseStore.off('read_categories_changed',CategoriesChanged)
      mentorcaseStore.off('edit_case_changed',EditCaseChanged)
      mentorcaseStore.off('delete_case_changed',DeleteCaseChanged)
    })

    self.readCategories = () => {
       mentorcaseStore.trigger('read_categories')
    }

    self.readCase = () => {
       mentorcaseStore.trigger('read_case')
    }

     self.add = () => {
      if(!self.refs.addCaseInput.value){
        toastr.info("Please enter Case and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          console.log('create')
          mentorcaseStore.trigger('add_case', self.refs.addCaseInput.value,
           self.refs.category_id.value)
        }else if(self.title=='Update'){
          console.log('update')
          mentorcaseStore.trigger('edit_case', self.refs.addCaseInput.value,
            self.refs.category_id.value, self.edit_id)
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
      self.mentor_case.map(ca => {
          ca.confirmDelete = false
          ca.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.mentor_case.map(ca => {
        if(ca.case_id != e.item.ca.case_id){
          ca.confirmDelete = false
        }else{
          ca.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      mentorcaseStore.trigger('delete_case', e.item.ca.case_id)
    }

    self.edit = (ca,e) => {
      console.log(ca)
      self.title='Update'
      self.refs.addCaseInput.value = ca.case_name
      self.refs.category_id.value = ca.category_id
      self.edit_id = ca.case_id
    }

    mentorcaseStore.on('add_case_changed',AddCaseChanged)
    function AddCaseChanged(mentor_case){
      console.log(mentor_case)
      self.title='Create'
      self.refs.addCaseInput.value = ''
      self.mentor_case = mentor_case
      self.update()
      self.readCase()
      console.log(self.mentor_case)
    }

    mentorcaseStore.on('edit_case_changed',EditCaseChanged)
    function EditCaseChanged(mentor_case){
      console.log(mentor_case)
      self.title='Create'
      self.refs.addCaseInput.value = ''
      self.mentor_case = mentor_case
      self.update()
      self.readCase()
      console.log(self.mentor_case)
    }

    mentorcaseStore.on('delete_case_changed',DeleteCaseChanged)
    function DeleteCaseChanged(mentor_case){
      console.log(mentor_case)
      self.title='Create'
      self.loading = false
      self.mentor_case = mentor_case
      self.update()
      self.readCase()
      console.log(self.mentor_case)
    }

    mentorcaseStore.on('read_case_changed',ReadCaseChanged)
    function ReadCaseChanged(mentor_case){
      console.log(mentor_case)
      self.title='Create'
      self.refs.addCaseInput.value = ''
      self.loading = false
      self.mentor_case = mentor_case
      self.update()
    }

    mentorcaseStore.on('read_categories_changed',CategoriesChanged)
    function CategoriesChanged(categories){
      console.log(categories)
      self.categories = categories
      self.update()
      console.log(self.categories)
    }

});
riot.tag2('mentor-category', '<section class=" is-fluid"> <h2 class="title has-text-centered" style="color: #ff3860;">Mentor Category Management</h2> <div class="flex items-center mt-2 mb-6 no-print"> <div class="bg-green py-1 rounded w-10"> <div class="bg-grey h-px flex-auto"></div> </div> </div> <div class="box"> <div class="columns"> <div class="column is-half"> <div class="field"> <label class="label" for="role">Category</label> <div class="control"> <input class="input" type="text" ref="addMentorCategoryInput" onkeyup="{addEnter}"> </div> </div> </div> <div class="column is-narrow"> <div class="field"> <div class="control"> <button class="button is-danger has-text-weight-bold adjusted-top" onclick="{add}">{title}</button> </div> </div> </div> </div> </div> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th>SL</th> <th>Category</th> <th></th> </tr> </thead> <tbody> <tr each="{mc, i in mentor_categories}"> <td>{i+1}</td> <td>{mc.category_name}</td> <td class="has-text-right"> <div class="inline-flex rounded border border-grey overflow-hidden" hide="{mc.confirmDelete}"> <span><a class="button is-small is-rounded" onclick="{edit.bind(this, mc)}">Edit</a></span> <span if="{role==\'ADMIN\'}"> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick="{confirmDelete}">Delete</a></span> </div> <div class="table-buttons" if="{mc.confirmDelete}"> <span disabled="{loading}" class="button is-small is-rounded" onclick="{delete}"><i class="fa fa-check"></i></span> <span disabled="{loading}" class="button is-small has-text-danger is-rounded" onclick="{cancelOperation}"><i class="fa fa-times"></i></span> </div> </td> </tr> </tbody> </table> </section>', '', '', function(opts) {
	var self = this
    self.on("mount", function(){
      self.title='Create'
      self.role = getCookie('role')
      self.update()
      self.readCategories()
    })
    self.on("unmount", function(){
      mentorcategoryStore.off('mentor_category_changed',MentorCategoryChanged)
    })

    self.readCategories = () => {
       mentorcategoryStore.trigger('read_mentor_category')
    }

     self.add = () => {
      if(!self.refs.addMentorCategoryInput.value){
        toastr.info("Please enter Category and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          console.log('create')
          mentorcategoryStore.trigger('add_mentor_category', self.refs.addMentorCategoryInput.value)
        }else if(self.title=='Update'){
          console.log('update')
          mentorcategoryStore.trigger('edit_mentor_category', self.refs.addMentorCategoryInput.value,self.edit_id)
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
      self.mentor_categories.map(mc => {
          mc.confirmDelete = false
          mc.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.mentor_categories.map(mc => {
        if(mc.category_id != e.item.mc.category_id){
          mc.confirmDelete = false
        }else{
          mc.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      mentorcategoryStore.trigger('delete_mentor_category', e.item.mc.category_id)
    }

    self.edit = (mc,e) => {
      console.log(mc)
      self.title='Update'
      self.refs.addMentorCategoryInput.value = mc.category_name
      self.edit_id = mc.category_id
    }

    mentorcategoryStore.on('mentor_category_changed',MentorCategoryChanged)
    function MentorCategoryChanged(mentor_categories){
      console.log(mentor_categories)
      self.title='Create'
      self.refs.addMentorCategoryInput.value = ''
      self.loading = false
      self.mentor_categories = mentor_categories
      self.update()
      console.log(self.mentor_categories)
    }

});
riot.tag2('mentor-class-wise-report', '<section class=" is-fluid"> <h2 class="title has-text-centered" style="color: #ff3860;">Class Wise Mentor Report</h2> <div class="flex items-center mt-2 mb-6 no-print"> <div class="bg-green py-1 rounded w-10"> <div class="bg-grey h-px flex-auto"></div> </div> </div> <div class="box"> <div class="columns"> <div class="column is-narrow"> <label class="label">Standard</label> </div> <div class="column is-narrow"> <div class="control"> <div class="select"> <select ref="standard_id" onchange="{getSection}"> <option each="{standards}" riot-value="{standard_id}">{standard} </option> <option value="-1">ALL</option> </select> </div> </div> </div> <div class="column is-narrow"> <label class="label">Section</label> </div> <div class="column is-narrow"> <div class="control"> <div class="select"> <select ref="section_id"> <option each="{filteredSections}" riot-value="{section_id}">{section} </option> <option value="-1">ALL</option> </select> </div> </div> </div> <div class="column is-narrow"> <label class="label">Session</label> </div> <div class="column is-narrow"> <div class="control"> <div class="select"> <select ref="session_id"> <option each="{sessions}" riot-value="{session_id}">{session_name} </option> </select> </div> </div> </div> <div class="column"> <button class="button is-danger has-text-weight-bold" onclick="{getData}"> GO </button> <input type="checkbox" id="checkTable" checked="{e.done}" onclick="{viewTable}" style="margin-top: 12px;"> Table </div> </div> </div> <canvas id="canvas_pie" show="{report_view ==\'show_graph\'}"></canvas> <div class="columns is-centered"> <table class="table is-striped is-hoverable is-bordered" show="{report_view ==\'show_table\'}"> <thead> <tr> <th>Case</th> <th class="has-text-right">Total</th> </tr> </thead> <tbody> <tr each="{cd, i in class_wise_case_report}"> <td>{cd.category_name}</td> <td class="has-text-right">{cd.total}</td> </tr> <tr> <td class="has-text-right">Total</td> <td class="has-text-right">{grand_total}</td> </tr> </tbody> </table> </div> </section>', '', '', function(opts) {
	var self = this
    self.on("mount", function(){
      flatpickr(".date", {

    	allowInput: true,
    	altFormat: "d/m/Y",
    	dateFormat: "Y-m-d",
  		})
      self.readStandard()
      self.readSection()
      self.readSession()
      self.update();
    })

    self.on("unmount", function(){
      mentorReportStore.on('read_class_wise_report_changed',ReadClassWiseReportChanged)
      mentorReportStore.off('read_standard_changed',StandardChanged)
      mentorReportStore.off('read_section_changed',SectionChanged)
      mentorReportStore.off('read_session_changed',SessionChanged)
    })

    self.readStandard = () => {
       mentorReportStore.trigger('read_standard')
    }

    self.readSection = () => {
       mentorReportStore.trigger('read_section')
    }

    self.readSession = () => {
       mentorReportStore.trigger('read_session')
    }

    self.getSection = () => {
    	self.filteredSections = []
    	self.filteredSections = self.sections.filter(s => {
    		return s.standard_id == self.refs.standard_id.value
    	})
    }

    self.viewTable = () => {
    	if($('#checkTable').is(":checked")){
	        self.report_view = 'show_table'
    	}else{
	        self.report_view = 'show_graph'
    	}
    }
    self.getData = () => {
          self.loading = true
          mentorReportStore.trigger('read_class_wise_report', self.refs.standard_id.value,
          	self.refs.section_id.value,self.refs.session_id.value)
          	self.report_view = 'show_graph'
    }

    mentorReportStore.on('read_standard_changed',StandardChanged)
    function StandardChanged(standards){
      console.log(standards)
      self.standards = standards
      self.update()
    }

    mentorReportStore.on('read_section_changed',SectionChanged)
    function SectionChanged(sections){
      console.log(sections)
      self.sections = sections
      self.update()
    }

    mentorReportStore.on('read_session_changed',SessionChanged)
    function SessionChanged(sessions){
      console.log(sessions)
      self.sessions = sessions
      self.update()
    }

    mentorReportStore.on('read_class_wise_report_changed',ReadClassWiseReportChanged)
    function ReadClassWiseReportChanged(class_wise_case_report,grand_total){
      self.class_wise_case_report = class_wise_case_report
      self.grand_total = grand_total

      var chartColors = ['#e3342f','#F6993F','#F2D024','#1F9D55','#2779BD','#9561E2','#B8C2CC','#fff'];

		var labels = []
		var chart_percentage = []
        var backgroundColor = []

		 for (var i = self.class_wise_case_report.length - 1; i >= 0; i--) {
		 	var total_percentage = ((self.class_wise_case_report[i].total*100)/self.grand_total).toFixed(2);
		    var percentage = self.class_wise_case_report[i].category_name + ' ( ' + self.class_wise_case_report[i].total + ' , ' + total_percentage + '% )';

		    labels.push(percentage)
		    chart_percentage.push(self.class_wise_case_report[i].total)
		    if(typeof chartColors[i] != "undefined"){
		    	backgroundColor.push(chartColors[i])
		    }

		 }

		  console.log(labels);
		  console.log(chart_percentage);

		  var config = {
		    type: 'pie',
		    data: {
		      datasets: [{
		        data: chart_percentage,
		        backgroundColor: backgroundColor,
		        label: 'labels'
		      }],
		      labels: labels
		    },
		    options: {
		      responsive: true
		    }
		  };

		  var ctx = document.getElementById('canvas_pie').getContext('2d');
		  window.myPie = new Chart(ctx, config);
      self.update()
      console.log(self.class_wise_case_report)
    }
});
riot.tag2('mentor-date-wise-case-report', '<section class=" is-fluid"> <h2 class="title has-text-centered" style="color: #ff3860;">Student Wise Mentor Case Report</h2> <div class="flex items-center mt-2 mb-6 no-print"> <div class="bg-green py-1 rounded w-10"> <div class="bg-grey h-px flex-auto"></div> </div> </div> <div class="box"> <div class="columns"> <div class="column is-narrow"> <label class="label">Category</label> </div> <div class="column is-narrow"> <div class="control"> <div class="select"> <select ref="category_id"> <option value="-1">ALL</option> <option each="{categories}" riot-value="{category_id}">{category_name} </option> </select> </div> </div> </div> <div class="column is-narrow"> <label class="label">From Date</label> </div> <div class="column is-narrow"> <input class="date input flatpickr-input form-control input" placeholder="" ref="start_date" tabindex="0" type="text" readonly="readonly"> </div> <div class="column is-narrow"> <label class="label">To Date</label> </div> <div class="column is-narrow"> <input class="date input flatpickr-input form-control input" placeholder="" ref="end_date" tabindex="0" type="text" readonly="readonly"> </div> <div class="column"> <button class="button is-danger has-text-weight-bold" onclick="{getData}"> GO </button> </div> </div> </div> <table class="table is-striped is-hoverable is-bordered is-fullwidth"> <thead> <tr> <th>Sl No</th> <th>Name</th> <th>Enroll No</th> <th>Class</th> <th>Case</th> <th>Date</th> <th>Diagnosis</th> <th>Suggestion</th> </tr> </thead> <tbody> <tr each="{cd, i in date_wise_case_report}"> <td>{i+1}</td> <td>{cd.student_name}</td> <td>{cd.enroll_number}</td> <td>{cd.standard}</td> <td>{cd.case_name}</td> <td>{cd.consult_date}</td> <td>{cd.diagnosis}</td> <td>{cd.suggestion}</td> </tr> </tbody> </table> </section>', '', '', function(opts) {
	var self = this
    self.on("mount", function(){
      flatpickr(".date", {

    	allowInput: true,
    	altFormat: "d/m/Y",
    	dateFormat: "Y-m-d",
  		})
      self.readCategories()
      self.update();
    })

    self.on("unmount", function(){
      mentorReportStore.off('read_date_wise_case_report_changed',ReadDateWiseCaseReportChanged)
      mentordetailStore.off('read_mentor_categories_changed',CategoriesChanged)
    })

    self.readCategories = () => {
       mentordetailStore.trigger('read_mentor_categories')
    }

    self.getData = () => {
    	var obj={}
          obj['start_date']=self.refs.start_date.value
          obj['end_date']=self.refs.end_date.value
          self.loading = true
          mentorReportStore.trigger('read_date_wise_case_report', obj,self.refs.category_id.value)
          console.log(obj)
          console.log(self.refs.category_id.value)
    }

    mentordetailStore.on('read_mentor_categories_changed',CategoriesChanged)
    function CategoriesChanged(categories){
      console.log(categories)
      self.categories = categories
      self.update()
    }

    mentorReportStore.on('read_date_wise_case_report_changed',ReadDateWiseCaseReportChanged)
    function ReadDateWiseCaseReportChanged(date_wise_case_report){
      self.date_wise_case_report = date_wise_case_report
      console.log(self.date_wise_case_report)
    }
});
riot.tag2('mentor-detail', '<section class=" is-fluid" show="{mentor_view ==\'show_mentor\'}"> <div class="level"> <div class="level-left"> <h2 class="title" style="color: #ff3860;">Mentor Detail</h2> </div> <div class="level-right"> <button class="button is-warning is-rounded" onclick="{add_new_mentor}"> <span class="icon"> <span class="fas fa-plus"></span> </span> <span>Add Detail</span> </button> </div> </div> <div class="box"> <div class="columns"> <div class="column is-narrow"> <label class="label">Category</label> </div> <div class="column is-narrow"> <div class="control"> <div class="select"> <select ref="category_id"> <option value="-1">ALL</option> <option each="{categories}" riot-value="{category_id}">{category_name} </option> </select> </div> </div> </div> <div class="column"> <button class="button is-danger has-text-weight-bold" onclick="{getMentorData}">GO </button> </div> </div> </div> <table class="table is-bordered is-fullwidth is-striped is-hoverable is-narrow"> <thead> <tr> <th>SL No</th> <th>Referred by</th> <th>Name</th> <th>Enroll No</th> <th>Class</th> <th>Case</th> <th>Date</th> <th>Time In</th> <th>Time Out</th> <th>Diagnosis</th> <th>Suggestion</th> <th style="width: 100px;"></th> </tr> </thead> <tbody> <tr each="{ac, i in mentors}"> <td>{i + 1}</td> <td>{ac.referred_by}</td> <td>{ac.student_name}</td> <td>{ac.enroll_number}</td> <td>{ac.standard}</td> <td>{ac.case_name}</td> <td>{ac.consult_date}</td> <td>{ac.time_in}</td> <td>{ac.time_out}</td> <td>{ac.diagnosis}</td> <td>{ac.suggestion}</td> <td class="has-text-right"> <div class="inline-flex rounded border border-grey overflow-hidden" hide="{ac.confirmDelete}"> <span><a class="" onclick="{case_detail.bind(this, ac)}"> <i class=" fas fa-plus"></i></a></span> <span><a class="" onclick="{edit.bind(this, ac.id)}"> <i class="fas fa-edit"></i></a></span> <span if="{role==\'ADMIN\'}"> <a class="" rel="nofollow" onclick="{confirmDelete}"><i class="fas fa-trash-alt"></i></a></span> </div> <div class="table-buttons" if="{ac.confirmDelete}"> <span disabled="{loading}" class="button is-small is-rounded" onclick="{delete}"><i class="fa fa-check"></i></span> <span disabled="{loading}" class="button is-small has-text-danger is-rounded" onclick="{cancelOperation}"><i class="fa fa-times"></i></span> </div> </td> </tr> </tbody> </table> </section> <section class=" is-fluid" show="{mentor_view ==\'add_mentor\'}"> <div class="level"> <div class="level-left"> <div class="level-item"> <h2 class="title" style="color: #ff3860;">{title} Detail</h2> </div> </div> <div class="level-right"> <a class="button" onclick="{close_new_mentor}">Back</a> </div> </div> <div class="flex items-center mt-2 mb-6 no-print"> <div class="bg-green py-1 rounded w-10"></div> <div class="bg-grey h-px flex-auto"></div> </div> <div class="box"> <div class="columns is-variable is-1 is-multiline"> <div class="column is-one-third"> <label class="label" for="referredInput">Referred by</label> <div class="control "> <div class="select is-fullwidth"> <select ref="referredInput"> <option value="Class Teacher">Class Teacher</option> <option value="School Authority">School Authority</option> <option value="Parent">Parent</option> <option value="Out Sider">Out Sider</option> <option value="Student Directly">Student Directly</option> </select> </div> </div> </div> <div class="column is-one-third"> <label class="label" for="enrollInput">Enroll No</label> <input class="input" ref="enrollInput" type="text"> </div> <div class="column is-one-third"> <label class="label" for="student_dob">Category</label> <div class="control "> <div class="select is-fullwidth"> <select ref="CategoryidInput" onchange="{readCategoryCase}"> <option each="{categories}" riot-value="{category_id}">{category_name} </option> </select> </div> </div> </div> <div class="column is-one-third"> <label class="label" for="student_gender">Case</label> <div class="control "> <div class="select is-fullwidth"> <select ref="case_id"> <option each="{cases}" riot-value="{case_id}">{case_name} </option> </select> </div> </div> </div> <div class="column is-one-third"> <label class="label" for="mentorDateInput">Date</label> <input class="date input flatpickr-input form-control input" ref="mentorDateInput" placeholder="" tabindex="0" type="text" readonly="readonly"> </div> <div class="column is-one-third"> <label class="label" for="inTimeInput">Time In</label> <input class="input" ref="inTimeInput" type="time"> </div> <div class="column is-one-third"> <label class="label" for="outTimeInput">Time Out</label> <input class="input" ref="outTimeInput" type="time"> </div> <div class="column is-two-thirds"> <label class="label" for="diagnosisInput">Diagnosis</label> <input class="input" ref="diagnosisInput" type="text"> </div> <div class="column is-full"> <label class="label" for="suggestionInput">Suggestion</label> <textarea class="textarea" ref="suggestionInput" rows="2"></textarea> </div> <div class="column is-full"> <button class="button is-danger has-text-weight-bold adjusted-top" onclick="{add}">Submit</button> </div> </div> </div> </section> <section class=" is-fluid" show="{mentor_view ==\'view_case_detail\'}"> <div class="level"> <div class="level-left"> <div class="level-item"> <h2 class="title" style="color: #ff3860;">Case : {case_name} </h2> </div> </div> <div class="level-right"> <a class="button is-primary" style="margin-right: 4px;" onclick="{add_case_detail}">Add</a> <a class="button" onclick="{close_case_detail_view}">Back</a> </div> </div> <table class="table is-bordered is-fullwidth is-striped is-hoverable is-narrow"> <thead> <tr> <th>SL No</th> <th>Visitor</th> <th>Visit Date</th> <th>Time In</th> <th>Time Out</th> <th>Suggestion</th> <th>Status</th> <th style="width: 100px;"></th> </tr> </thead> <tbody> <tr each="{ca, i in caseDetails}"> <td>{i + 1}</td> <td>{ca.visitor}</td> <td>{ca.visit_date}</td> <td>{ca.time_in}</td> <td>{ca.time_out}</td> <td>{ca.suggestion}</td> <td>{ca.status}</td> <td class="has-text-right"> <div class="inline-flex rounded border border-grey overflow-hidden" hide="{ca.confirmCaseDelete}"> <span><a class="" onclick="{editCase.bind(this, ca.id)}"> <i class="fas fa-edit"></i></a></span> <span if="{role==\'ADMIN\'}"> <a class="" rel="nofollow" onclick="{confirmCaseDelete}"><i class="fas fa-trash-alt"></i></a></span> </div> <div class="table-buttons" if="{ca.confirmCaseDelete}"> <span disabled="{loading}" class="button is-small is-rounded" onclick="{deleteCase}"><i class="fa fa-check"></i></span> <span disabled="{loading}" class="button is-small has-text-danger is-rounded" onclick="{cancelCaseOperation}"><i class="fa fa-times"></i></span> </div> </td> </tr> </tbody> </table> </section> <section class=" is-fluid" show="{mentor_view ==\'add_case_detail\'}"> <div class="level"> <div class="level-left"> <div class="level-item"> <h2 class="title" style="color: #ff3860;">{title} Case Detail</h2> </div> </div> <div class="level-right"> <a class="button" onclick="{close_add_case}">Back</a> </div> </div> <div class="flex items-center mt-2 mb-6 no-print"> <div class="bg-green py-1 rounded w-10"></div> <div class="bg-grey h-px flex-auto"></div> </div> <div class="box"> <div class="columns is-variable is-1 is-multiline"> <div class="column is-one-third"> <label class="label" for="visitorInput">Visitor</label> <div class="control "> <div class="select is-fullwidth"> <select ref="visitorInput"> <option value="Student">Student</option> <option value="Class Teacher">Class Teacher</option> <option value="Parent">Parent</option> </select> </div> </div> </div> <div class="column is-one-third"> <label class="label" for="visitingDateInput">Visiting Date</label> <input class="date input flatpickr-input form-control input" ref="visitingDateInput" placeholder="" tabindex="0" type="text" readonly="readonly"> </div> <div class="column is-one-third"> <label class="label" for="addCaseinTimeInput">Time In</label> <input class="input" ref="addCaseinTimeInput" type="time"> </div> <div class="column is-one-third"> <label class="label" for="addCaseoutTimeInput">Time Out</label> <input class="input" ref="addCaseoutTimeInput" type="time"> </div> <div class="column is-two-thirds"> <label class="label" for="statusInput">Status</label> <input class="input" ref="statusInput" type="text"> </div> <div class="column is-full"> <label class="label" for="addCasesuggestionInput">Suggestion</label> <textarea class="textarea" ref="addCasesuggestionInput" rows="2"></textarea> </div> <div class="column is-full"> <button class="button is-danger has-text-weight-bold adjusted-top" onclick="{addCase}">Submit</button> </div> </div> </div> </section>', '', '', function(opts) {
	var self = this
    self.on("mount", function(){
    self.title='Add'
    self.mentor_view = 'show_mentor'
    self.role = getCookie('role')
    self.update()
      flatpickr(".date", {
    	allowInput: true,
    	altFormat: "d/m/Y",
    	dateFormat: "Y-m-d",
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
      mentordetailStore.trigger('read_mentor', self.refs.category_id.value)
    }
    self.readMentor = () =>{
      mentordetailStore.trigger('read_mentor', self.refs.CategoryidInput.value)
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
     	obj['visit_date']=self.refs.visitingDateInput.value
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
      flatpickr(".date", {
    	allowInput: true,
    	altFormat: "d/m/Y",
    	dateFormat: "Y-m-d",
  		})
      mentordetailStore.trigger('read_for_edit_mentor',self.id)
      self.add_new_mentor()
      self.title='Update'

    }

    self.editCase = (c,ca) => {
      console.log(c)
      self.id = c
      flatpickr(".date", {
    	allowInput: true,
    	altFormat: "d/m/Y",
    	dateFormat: "Y-m-d",
  		})
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
     	obj['consult_date']=self.refs.mentorDateInput.value
     	obj['time_in']=self.refs.inTimeInput.value
     	obj['time_out']=self.refs.outTimeInput.value
     	obj['diagnosis']=self.refs.diagnosisInput.value
     	obj['suggestion']=self.refs.suggestionInput.value

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
    	console.log(c)
    	self.case_name = c.case_name
    	self.case_id = c.id
    	self.enroll_number = c.enroll_number
    	self.mentor_view = 'view_case_detail'
    	mentordetailStore.trigger('read_mentor_case', c.id,c.enroll_number)
    }
    self.close_case_detail_view = ()=>{
    	self.mentor_view = 'show_mentor'
    }
    self.clearForm = () =>{
    	self.refs.referredInput.value = ''
	    self.refs.enrollInput.value = ''
	    self.refs.CategoryidInput.value = ''
	    self.refs.case_id.value = ''
	    self.refs.mentorDateInput.value = ''
	    self.refs.inTimeInput.value = ''
	    self.refs.outTimeInput.value = ''
	    self.refs.diagnosisInput.value = ''
	    self.refs.suggestionInput.value = ''
    }
    self.clearaddCaseForm = () => {
		self.refs.visitorInput.value = ' '
		self.refs.visitingDateInput.value = ' '
		self.refs.addCaseinTimeInput.value = ' '
		self.refs.addCaseoutTimeInput.value = ' '
		self.refs.statusInput.value = ' '
		self.refs.addCasesuggestionInput.value = ' '
    }
    mentordetailStore.on('read_mentor_categories_changed',CategoriesChanged)
    function CategoriesChanged(categories){
      console.log(categories)
      self.categories = categories
      self.update()
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
      self.clearForm()
      self.update()
    }

    mentordetailStore.on('add_case_detail_changed',AddCaseChanged)
    function AddCaseChanged(case_details){
      console.log(case_details)
      self.case_details = case_details
      self.clearaddCaseForm()
      self.update()
    }

    mentordetailStore.on('read_mentor_changed',ReadMentorChanged)
    function ReadMentorChanged(mentors){
      console.log(mentors)
      self.mentors = mentors
      self.clearForm()
      self.update()
      console.log(self.mentors)
     }

    mentordetailStore.on('read_for_edit_mentor_changed',ReadMentorForEditChanged)
    function ReadMentorForEditChanged(mentor_details){
      console.log(mentor_details)
      flatpickr(".date", {
    	allowInput: true,
    	altFormat: "d/m/Y",
    	dateFormat: "Y-m-d",
  		})
      self.mentor_details = mentor_details

      self.refs.referredInput.value = mentor_details[0].referred_by
      self.refs.enrollInput.value = mentor_details[0].enroll_number
      self.refs.CategoryidInput.value = mentor_details[0].category_id
      self.cases = []
	  self.cases = self.mentor_case.filter(a => {
	    return a.category_id == mentor_details[0].category_id
	  })
      self.refs.mentorDateInput.value = mentor_details[0].c_date
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
      self.clearForm()
      self.update()
      console.log(self.mentors)
    }

    mentordetailStore.on('read_mentor_case_changed',ReadMentorCaseDetailsChanged)
    function ReadMentorCaseDetailsChanged(mentor_case_details){
      console.log(mentor_case_details)
      self.mentor_case_details = mentor_case_details
      self.caseDetails = []
      self.caseDetails = self.mentor_case_details
      self.update()
      console.log(self.caseDetails)

     }

    mentordetailStore.on('read_for_edit_case_changed',ReadCaseDetailsForEditChanged)
    function ReadCaseDetailsForEditChanged(update_case_details_for_update){
      console.log(update_case_details_for_update)
      flatpickr(".date", {
    	allowInput: true,
    	altFormat: "d/m/Y",
    	dateFormat: "Y-m-d",
  		})
      self.update_case_details_for_update = update_case_details_for_update
      self.refs.visitorInput.value = update_case_details_for_update[0].visitor
	  self.refs.visitingDateInput.value = update_case_details_for_update[0].v_date
	  self.refs.addCaseinTimeInput.value = update_case_details_for_update[0].time_in
	  self.refs.addCaseoutTimeInput.value = update_case_details_for_update[0].time_out
	  self.refs.statusInput.value = update_case_details_for_update[0].status
	  self.refs.addCasesuggestionInput.value = update_case_details_for_update[0].suggestion
	  self.edit_case_id = update_case_details_for_update[0].id

      self.update()

     }

    mentordetailStore.on('edit_case_detail_changed',EditCaseDetailsChanged)
    function EditCaseDetailsChanged(edit_case_details){
      console.log(edit_case_details)
      self.update()
     }

    mentordetailStore.on('delete_case_details_changed',DeleteCaseDetailsChanged)
    function DeleteCaseDetailsChanged(delete_case_details){
      console.log(delete_case_details)
      self.update()
     }

    mentordetailStore.on('delete_mentor_detail_changed',DeleteMentorDetailsChanged)
    function DeleteMentorDetailsChanged(delete_mentor_details){
      console.log(delete_mentor_details)
      self.update()
     }
});
riot.tag2('mentor-report', '<div class="field has-addons"> <p class="control"> <a class="button {is-active: selected_master == \'mentor-case-wise-report\'}" href="#/mentor-report/mentor-case-wise-report"> <span>Case Wise Report</span> </a> </p> <p class="control"> <a class="button {is-active: selected_master == \'mentor-class-wise-report\'}" href="#/mentor-report/mentor-class-wise-report"> <span>Class Wise Report</span> </a> </p> <p class="control"> <a class="button {is-active: selected_master == \'mentor-date-wise-case-report\'}" href="#/mentor-report/mentor-date-wise-case-report"> <span>Date Wise Case Report</span> </a> </p> </div> <div id="mentor-report-view"></div>', '', '', function(opts) {
    var self = this
    console.log('opts.selected_master')
    console.log(opts.selected_master)
    if(!opts.selected_master){
      self.selected_master = 'mentor-case-wise-report'
    }else{
      self.selected_master = opts.selected_master
    }
});
riot.tag2('mentor-setting', '<div class="field has-addons"> <p class="control"> <a class="button {is-active: selected_master == \'mentor-category\'}" href="#/mentor-setting/mentor-category"> <span>Category</span> </a> </p> <p class="control"> <a class="button {is-active: selected_master == \'mentor-case\'}" href="#/mentor-setting/mentor-case"> <span>Case</span> </a> </p> </div> <div id="mentor-setting-view"></div>', '', '', function(opts) {
    var self = this
    console.log('opts.selected_master')
    console.log(opts.selected_master)
    if(!opts.selected_master){
      self.selected_master = 'mentor-category'
    }else{
      self.selected_master = opts.selected_master
    }
});
riot.tag2('merit-list', '<h4>merit-list</h4>', '', '', function(opts) {
});
riot.tag2('new-event', '<section class="is-fluid" show="{event_view ==\'show_event\'}"> <div class="level"> <div class="level-left"> <h2 class="title" style="color: #ff3860;">New Event</h2> </div> <div class="level-right"> <button class="button is-warning is-rounded" onclick="{add_new_event}"> <span class="icon"> <span class="fas fa-plus"></span> </span> <span>New Event</span> </button> </div> </div> <table class="table is-fullwidth is-striped is-hoverable is-bordered"> <thead> <tr> <th>#</th> <th>Event Type</th> <th>Event Name</th> <th>Start Date</th> <th>End Date</th> <th>Holiday</th> <th>Detail</th> <th>Action</th> </tr> </thead> <tbody> <tr each="{st, i in newEvents}"> <td>{i+1}</td> <td>{st.event_type}</td> <td>{st.event_name}</td> <td>{st.s_date}</td> <td>{st.e_date}</td> <td>{st.holiday}</td> <td>{st.description}</td> <td class="has-text-right"> <div class="inline-flex rounded border border-grey overflow-hidden" hide="{st.confirmDelete}"> <span><a class="button is-small is-rounded" onclick="{edit.bind(this, st)}">Edit</a></span> <span> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick="{confirmDelete}">Delete</a></span> </div> <div class="table-buttons" if="{st.confirmDelete}"> <span disabled="{loading}" class="button is-small is-rounded" onclick="{delete}"><i class="fa fa-check"></i></span> <soan disabled="{loading}" class="button is-small has-text-danger is-rounded" onclick="{cancelOperation}"><i class="fa fa-times"></i></span> </div> </td> </tr> </tbody> </table> </section> <section class="is-fluid" show="{event_view ==\'add_new_event\'}"> <div class="label"> <div class="level-left"> <h2 class="title" style="color: #ff3860;">{title} Event</h2> </div> <div class="level-right"> <button class="button" onclick="{close_new_event}">Back</button> </div> </div> <div class="box"> <div class="columns is-variable is-1 is-multiline"> <div class="column is-one-third"> <label class="label" for="student_course">Event Type</label> <div class="control"> <div class="select is-fullwidth"> <select ref="event_type_id"> <option each="{eventTypes}" riot-value="{event_type_id}">{event_type} </option> </select> </div> </div> </div> <div class="column is-one-third"> <label class="label">Event Name</label> <input class="input" ref="event_name" placeholder="" type="text"> </div> <div class="column is-one-third"> <label class="label">Date From</label> <input class="input date flatpickr-input form-control input" ref="start_date" placeholder="" tabindex="0" type="text"> </div> <div class="column is-one-third"> <label class="label">Date To</label> <input class="input date flatpickr-input form-control input" ref="end_date" placeholder="" tabindex="0" type="text"> </div> <div class="column is-one-third"> <label class="label">Description</label> <textarea class="input" ref="detail" rows="2" type="text"></textarea> </div> <div class="column is-one-third"> <label class="label">Holiday</label> <input type="checkbox" id="holiday_check_box"> </div> <div class="column is-full"> <button class="button is-danger has-text-weight-bold adjusted-top" onclick="{add}">{title}</button> </div> </div> </div> </section>', '', '', function(opts) {
   var self = this
     self.on("mount", function(){
       self.title='Create'
       self.role = getCookie('role')
       self.update()
       self.readEventType()
       self.readNewEvent()
       self.event_view='show_event'
       flatpickr(".date", {
         allowInput: true,
         altFormat: "d/m/Y",
         dateFormat: "Y-m-d",
       })
     })
     self.on("unmount", function(){
       neweventStore.off('add_new_event_changed', AddNewEventChanged)
       neweventStore.off('read_new_event_changed', ReadNewEventChanged)
       neweventStore.off('read_event_type_changed',EventTypeChanged)
       neweventStore.off('edit_new_event_changed',EditEventTypeChanged)
       neweventStore.off('delete_new_event_changed',DeleteEventChanged)
     })

     self.readEventType = () => {
        neweventStore.trigger('read_event_type')
     }

     self.add_new_event = () => {
        self.event_view='add_new_event'
     }
    self.close_new_event = () => {
        self.event_view='show_event'
        self.readNewEvent()
    }

     self.readNewEvent = () => {
        neweventStore.trigger('read_new_event')
     }

      self.add = () => {
          if($('#holiday_check_box').is(":checked")){
          self.holiday='Y';
        }else{
          self.holiday='N';
        }
       if(!self.refs.event_name.value){
         toastr.info("Please enter Event and try again")
       }else{
         self.loading = true
         if(self.title=='Create'){
           console.log('create')
           neweventStore.trigger('add_new_event', self.refs.event_type_id.value,
            self.refs.event_name.value,self.refs.start_date.value,self.refs.end_date.value,self.refs.detail.value,self.holiday)
         }else if(self.title=='Update'){
           console.log('update')
           neweventStore.trigger('edit__new_event', self.refs.event_type_id.value,
            self.refs.event_name.value,self.refs.start_date.value,self.refs.end_date.value,self.refs.detail.value ,self.holiday,self.edit_id)
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
       self.newEvents.map(ev => {
           ev.confirmDelete = false
           ev.confirmEdit = false
       })
     }

     self.confirmDelete = (e) => {
     	console.log(e.item.st.event_id)
     	console.log("+++++++++++++")
       self.newEvents.map(ev => {
       	console.log(ev.event_id)
         if(ev.event_id != e.item.st.event_id){
           ev.confirmDelete = false
         }else{
           ev.confirmDelete = true
         }
       })
     }

     self.delete = (e) => {
       self.loading = true
       neweventStore.trigger('delete_new_event', e.item.st.event_id)
     }

     self.edit = (ev,e) => {
       console.log(ev)
       self.title='Update'
        flatpickr(".date", {
         allowInput: true,
         altFormat: "d/m/Y",
         dateFormat: "Y-m-d",
       })
       self.event_view='add_new_event'
       self.refs.event_name.value = ev.event_name
       self.refs.start_date.value = ev.start_date
       self.refs.end_date.value = ev.end_date
       self.refs.detail.value = ev.description
       self.refs.event_type_id.value = ev.event_type_id
        console.log(ev.holiday);
       if(ev.holiday=='Y'){
         $('#holiday_check_box').prop('checked',true)
       }else{
         $('#holiday_check_box').prop('checked',false)
       }
       self.edit_id = ev.event_id
     }

     neweventStore.on('add_new_event_changed',AddNewEventChanged)
     function AddNewEventChanged(newEvents){
       console.log(newEvents)
       self.title='Create'
       self.refs.event_name.value =''
       self.refs.start_date.value =''
       self.refs.end_date.value =''
       self.refs.detail.value =''
       self.refs.event_type_id.value =''
       self.loading = false
       self.newEvents = newEvents
       self.update()
       self.readNewEvent()
       console.log(self.newEvents)
     }

     neweventStore.on('edit_new_event_changed',EditNewEventChanged)
     function EditNewEventChanged(newEvents){
       console.log(newEvents)
       self.title='Create'
       self.refs.event_name.value =''
       self.refs.start_date.value =''
       self.refs.end_date.value =''
       self.refs.detail.value =''
       self.refs.event_type_id.value =''
       self.loading = false
       self.newEvents = newEvents
       self.update()
       self.readNewEvent()
       console.log(self.empsectionsloye_roles)
     }

     neweventStore.on('delete_new_event_changed',DeleteNewEventChanged)
     function DeleteNewEventChanged(newEvents){
       console.log(newEvents)
       self.title='Create'
       self.refs.event_name.value =''
       self.refs.start_date.value =''
       self.refs.end_date.value =''
       self.refs.detail.value =''
       self.refs.event_type_id.value =''
       self.loading = false
       self.newEvents = newEvents
       self.update()
       self.readNewEvent()
       console.log(self.newEvents)
     }

     neweventStore.on('read_new_event_changed',ReadNewEventChanged)
     function ReadNewEventChanged(newEvents){
       console.log(newEvents)
       self.title='Create'
       self.refs.start_date.value =''
       self.refs.end_date.value =''
       self.refs.detail.value =''
       self.refs.event_type_id.value =''
       self.loading = false
       self.newEvents = newEvents
       self.update()
       console.log(self.newEvents)
     }

     neweventStore.on('read_event_type_changed',EventTypeChanged)
     function EventTypeChanged(eventTypes){
       console.log(eventTypes)
       self.eventTypes = eventTypes
       self.update()
       console.log(self.eventTypes)
     }

});
riot.tag2('parentgroup', '<section class=" is-fluid"> <h2 class="title" style="color: #ff3860;">Parent Groups</h2> <div class="flex items-center mt-2 mb-6 no-print"> <div class="bg-green py-1 rounded w-10"> <div class="bg-grey h-px flex-auto"></div> </div> </div> <div class="box"> <div class="columns"> <div class="column is-narrow"> <label class="label">Group Name</label> </div> <div class="column is-narrow"> <div class="control"> <div class="control"> <input class=" input" ref="addPGNameInput" type="text"> </div> </div> </div> <div class="column is-narrow"> <label class="label">Detail</label> </div> <div class="column is-narrow"> <div class="control"> <textarea class=" input" ref="addPGDetailInput" type="text"></textarea> </div> </div> <div class="column"> <button class="button is-danger has-text-weight-bold" onclick="{add}">{title} </button> </div> </div> </div> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th>SL</th> <th>Group Name</th> <th>Detail</th> <th></th> </tr> </thead> <tbody> <tr each="{ev, i in parentGroups}"> <td>{i+1}</td> <td>{ev.pgroup_name}</td> <td>{ev.pgroup_detail}</td> <td class="has-text-right"> <div class="inline-flex rounded border border-grey overflow-hidden" hide="{ev.confirmDelete}"> <span><a class="button is-small is-rounded" onclick="{edit.bind(this, ev)}">Edit</a></span> <span if="{role==\'ADMIN\'}"> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick="{confirmDelete}">Delete</a></span> </div> <div class="table-buttons" if="{ev.confirmDelete}"> <span disabled="{loading}" class="button is-small is-rounded" onclick="{delete}"><i class="fa fa-check"></i></span> <span disabled="{loading}" class="button is-small has-text-danger is-rounded" onclick="{cancelOperation}"><i class="fa fa-times"></i></span> </div> </td> </tr> </tbody> </table> </section>', '', '', function(opts) {
	var self = this
    self.on("mount", function(){
      self.title='Create'
      self.role = getCookie('role')
      self.update()
      self.readParentGroup()
    })
    self.on("unmount", function(){
      parentgroupStore.off('add_parentgroup_changed', AddParentGroupChanged)
      parentgroupStore.off('read_parentgroup_changed', ReadParentGroupChanged)
      parentgroupStore.off('edit_parentgroup_changed',EditParentGroupChanged)
      parentgroupStore.off('delete_parentgroup_changed',DeleteParentGroupChanged)
    })

    self.readParentGroup = () => {
       parentgroupStore.trigger('read_parentgroup')
    }

     self.add = () => {
      if(!self.refs.addPGNameInput.value){
        toastr.info("Please enter ParentGroup and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          console.log('create')
          parentgroupStore.trigger('add_parentgroup', self.refs.addPGNameInput.value,
          self.refs.addPGDetailInput.value)
        }else if(self.title=='Update'){
          console.log('update')
          parentgroupStore.trigger('edit_parentgroup', self.refs.addPGNameInput.value,
          self.refs.addPGDetailInput.value,self.edit_id)
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
      self.parentGroups.map(ev => {
          ev.confirmDelete = false
          ev.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.parentGroups.map(ev => {
        if(ev.pgroup_id != e.item.ev.pgroup_id){
          ev.confirmDelete = false
        }else{
          ev.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      parentgroupStore.trigger('delete_parentgroup', e.item.ev.pgroup_id)
    }

    self.edit = (ev,e) => {
      console.log(ev)
      self.title='Update'
      self.refs.addPGNameInput.value = ev.pgroup_name
      self.refs.addPGDetailInput.value = ev.pgroup_detail
      self.edit_id = ev.pgroup_id
    }

    parentgroupStore.on('add_parentgroup_changed',AddParentGroupChanged)
    function AddParentGroupChanged(parentGroups){
      console.log(parentGroups)
      self.title='Create'
       self.refs.addPGNameInput.value =''
      self.refs.addPGDetailInput.value =''
      self.loading = false
      self.parentGroups = parentGroups
      self.update()
      self.readParentGroup()
      console.log(self.parentGroups)
    }

    parentgroupStore.on('edit_parentgroup_changed',EditParentGroupChanged)
    function EditParentGroupChanged(parentGroups){
      console.log(parentGroups)
      self.title='Update'
      self.refs.addPGNameInput.value =''
      self.refs.addPGDetailInput.value =''
      self.loading = false
      self.parentGroups = parentGroups
      self.update()
      self.readParentGroup()

    }

    parentgroupStore.on('delete_parentgroup_changed',DeleteParentGroupChanged)
    function DeleteParentGroupChanged(parentGroups){
      console.log(parentGroups)
      self.title='Create'
      self.refs.addPGNameInput.value =''
      self.refs.addPGDetailInput.value =''
      self.loading = false
      self.parentGroups = parentGroups
      self.update()
      self.readParentGroup()
      console.log(self.parentGroups)
    }

    parentgroupStore.on('read_parentgroup_changed',ReadParentGroupChanged)
    function ReadParentGroupChanged(parentGroups){
      console.log(parentGroups)
      self.title='Create'
     self.refs.addPGNameInput.value =''
      self.refs.addPGDetailInput.value =''
      self.loading = false
      self.parentGroups = parentGroups
      self.update()
      console.log(self.parentGroups)
    }

});
riot.tag2('physical-fitness', '<loading-bar if="{loading}"></loading-bar> <section class=" is-fluid" show="{view==\'physical_fitness\'}"> <div class="level"> <div class="level-left"> <h2 class="title" style="color: #ff3860;">Physical Fitness <span style="font-weight:normal" show="{action==\'PhysicalFitnessForm\'}">({details})({title})</span> </h2> </div> <div class="level-right"> <button class="button is-warning is-rounded" onclick="{closePhysicalFitnessForm}" show="{action==\'PhysicalFitnessForm\'}"> <span class="icon"> <span class="fas fa-arrow-left"></span> </span> </button> <button class="button is-warning is-rounded ml5" onclick="{readPhysicalFitnessStudents}" hide="{action==\'PhysicalFitnessForm\'}"> <span class="icon"> <span class="fas fa-sync-alt"></span> </span> </button> <button class="button is-warning is-rounded ml5" onclick="{viewAllDetails}" hide="{action==\'PhysicalFitnessForm\'}"> <span class="icon"> <span class="fas fa-print"></span> </span> </button> </div> </div> <div class="box"> <div class="columns"> <div class="column is-narrow"><label class="label">Standard</label></div> <div class="column"> <div class="control"> <div class="select is-fullwidth"> <select ref="standardSelect" onchange="{changeSection}" id="standard"> <option value="">Select Standard</option> <option each="{classes}" riot-value="{standard_id}">{standard}</option> </select> </div> </div> </div> <div class="column is-narrow"><label class="label">Section</label></div> <div class="column"> <div class="control"> <div class="select is-fullwidth"> <select ref="sectionSelect" onchange="{readClassSubject}" id="section"> <option value="">Select Section</option> <option each="{tempSections}" riot-value="{section_id}">{section}</option> </select> </div> </div> </div> <div class="column is-narrow"><label class="label">Exam Term</label></div> <div class="column"> <div class="control"> <div class="select is-fullwidth"> <select ref="examTermSelect"> <option value="">Select Exam Term</option> <option value="First">First</option> <option value="Final">Final</option> </select> </div> </div> </div> <div class="column"> <button class="button is-danger has-text-weight-bold" onclick="{readPhysicalFitnessStudents}" hide="{action==\'PhysicalFitnessForm\'}">GO </button> </div> </div> </div> <table class="table is-fullwidth is-striped is-hoverable" hide="{action==\'PhysicalFitnessForm\'}"> <thead> <tr> <th class="slno">SL</th> <th>Enroll No</th> <th>Name</th> <th>Status</th> <th></th> </tr> </thead> <tbody> <tr each="{c, i in physicalFitness}"> <td>{i+1}</td> <td>{c.enroll_number}</td> <td>{c.student_name}</td> <td>{c.exam_term}</td> <td class="has-text-right"> <div class="inline-flex rounded border border-grey overflow-hidden" hide="{c.confirmDelete}"> <span><a class="button is-small is-rounded" show="{c.standard_id >= 4}" onclick="{openPhysicalFitnessForm.bind(this, c)}">Add</a></span> <span><a class="button is-small is-rounded" show="{c.standard_id >= 4}" onclick="{viewDetails.bind(this, c)}">View</a></span> <span><a class="button is-small has-text-danger is-rounded" show="{c.standard_id >= 4}" rel="nofollow" onclick="{confirmDelete}">Delete</a></span> </div> <div class="table-buttons" if="{c.confirmDelete}"> <span disabled="{loading}" class="button is-small is-rounded" onclick="{delete}"><i class="fa fa-check"></i></span> <span disabled="{loading}" class="button is-small has-text-danger is-rounded" onclick="{cancelOperation}"><i class="fa fa-times"></i></span> </div> </td> </tr> </tbody> </table> <section class=" is-fluid" show="{action==\'PhysicalFitnessForm\'}"> <div class="columns" if="{first_form}"> <div class="column"> <div class="field"> <label class="label" for="role">Running</label> <div class="control"> <div class="select is-fullwidth"> <select ref="first_skill" id="first_skill"> <option value="EXCELLENT">A</option> <option value="VERY GOOD">B</option> <option value="GOOD">C</option> <option value="AVERAGE">D</option> <option value="NEEDS IMPROVEMENT">E</option> </select> </div> </div> </div> </div> <div class="column"> <div class="field"> <label class="label" for="role">Hopping</label> <div class="control"> <div class="select is-fullwidth"> <select ref="second_skill" id="second_skill"> <option value="EXCELLENT">A</option> <option value="VERY GOOD">B</option> <option value="GOOD">C</option> <option value="AVERAGE">D</option> <option value="NEEDS IMPROVEMENT">E</option> </select> </div> </div> </div> </div> <div class="column"> <div class="field"> <label class="label" for="role">Jumping</label> <div class="control"> <div class="select is-fullwidth"> <select ref="third_skill" id="third_skill"> <option value="EXCELLENT">A</option> <option value="VERY GOOD">B</option> <option value="GOOD">C</option> <option value="AVERAGE">D</option> <option value="NEEDS IMPROVEMENT">E</option> </select> </div> </div> </div> </div> </div> <div class="columns" if="{first_form}"> <div class="column"> <div class="field"> <label class="label" for="role">Catching</label> <div class="control"> <div class="select is-fullwidth"> <select ref="fourth_skill" id="fourth_skill"> <option value="EXCELLENT">A</option> <option value="VERY GOOD">B</option> <option value="GOOD">C</option> <option value="AVERAGE">D</option> <option value="NEEDS IMPROVEMENT">E</option> </select> </div> </div> </div> </div> <div class="column"> <div class="field"> <label class="label" for="role">Throwing</label> <div class="control"> <div class="select is-fullwidth"> <select ref="fifth_skill" id="fifth_skill"> <option value="EXCELLENT">A</option> <option value="VERY GOOD">B</option> <option value="GOOD">C</option> <option value="AVERAGE">D</option> <option value="NEEDS IMPROVEMENT">E</option> </select> </div> </div> </div> </div> <div class="column"> </div> </div> <div class="columns" if="{second_form}"> <div class="column"> <div class="field"> <label class="label" for="role">Aerobic Capacity</label> <div class="control"> <div class="select is-fullwidth"> <select ref="first_skill" id="first_skill"> <option value="NEEDS IMPROVEMENT">0</option> <option value="NEEDS IMPROVEMENT">1</option> <option value="NEEDS IMPROVEMENT">2</option> <option value="AVERAGE">3</option> <option value="AVERAGE">4</option> <option value="GOOD">5</option> <option value="GOOD">6</option> <option value="VERY GOOD">7</option> <option value="VERY GOOD">8</option> <option value="EXCELLENT">9</option> <option value="EXCELLENT">10</option> </select> </div> </div> </div> </div> <div class="column"> <div class="field"> <label class="label" for="role">Agility</label> <div class="control"> <div class="select is-fullwidth"> <select ref="second_skill" id="second_skill"> <option value="NEEDS IMPROVEMENT">0</option> <option value="NEEDS IMPROVEMENT">1</option> <option value="NEEDS IMPROVEMENT">2</option> <option value="AVERAGE">3</option> <option value="AVERAGE">4</option> <option value="GOOD">5</option> <option value="GOOD">6</option> <option value="VERY GOOD">7</option> <option value="VERY GOOD">8</option> <option value="EXCELLENT">9</option> <option value="EXCELLENT">10</option> </select> </div> </div> </div> </div> <div class="column"> <div class="field"> <label class="label" for="role">Explosive Strength</label> <div class="control"> <div class="select is-fullwidth"> <select ref="third_skill" id="third_skill"> <option value="NEEDS IMPROVEMENT">0</option> <option value="NEEDS IMPROVEMENT">1</option> <option value="NEEDS IMPROVEMENT">2</option> <option value="AVERAGE">3</option> <option value="AVERAGE">4</option> <option value="GOOD">5</option> <option value="GOOD">6</option> <option value="VERY GOOD">7</option> <option value="VERY GOOD">8</option> <option value="EXCELLENT">9</option> <option value="EXCELLENT">10</option> </select> </div> </div> </div> </div> </div> <div class="columns" if="{second_form}"> <div class="column"> <div class="field"> <label class="label" for="role">Abdominal Strength</label> <div class="control"> <div class="select is-fullwidth"> <select ref="fourth_skill" id="fourth_skill"> <option value="NEEDS IMPROVEMENT">0</option> <option value="NEEDS IMPROVEMENT">1</option> <option value="NEEDS IMPROVEMENT">2</option> <option value="AVERAGE">3</option> <option value="AVERAGE">4</option> <option value="GOOD">5</option> <option value="GOOD">6</option> <option value="VERY GOOD">7</option> <option value="VERY GOOD">8</option> <option value="EXCELLENT">9</option> <option value="EXCELLENT">10</option> </select> </div> </div> </div> </div> <div class="column"> <div class="field"> <label class="label" for="role">Flexibility</label> <div class="control"> <div class="select is-fullwidth"> <select ref="fifth_skill" id="fifth_skill"> <option value="NEEDS IMPROVEMENT">0</option> <option value="NEEDS IMPROVEMENT">1</option> <option value="NEEDS IMPROVEMENT">2</option> <option value="AVERAGE">3</option> <option value="AVERAGE">4</option> <option value="GOOD">5</option> <option value="GOOD">6</option> <option value="VERY GOOD">7</option> <option value="VERY GOOD">8</option> <option value="EXCELLENT">9</option> <option value="EXCELLENT">10</option> </select> </div> </div> </div> </div> <div class="column"> </div> </div> <div class="level"> <div class="level-left"> </div> <div class="level-right"> <button class="button is-danger" onclick="{add}">{title}</button> <button class="button ml5" onclick="{closePhysicalFitnessForm}">Cancel</button> </div> </div> </section> </section> <section class="is-fluid" show="{view==\'details\'}"> <div class="level no-print"> <div class="level-left"> <h2 class="title" style="color: #ff3860;">Maturity Development</h2> </div> <div class="level-right"> <button class="button is-warning is-rounded" onclick="{closeDetails}"> <span class="icon"> <span class="fas fa-arrow-left"></span> </span> </button> </div> </div> <center> <h6 class="title">Physical Fitness view for Class {student_info.standard} </h6> </center> <table class="table is-fullwidth is-striped is-hoverable"> <tbody> <tr each="{c, i in physicalFitnessDetails}"> <td> <table class="table is-fullwidth is-striped is-hoverable"> <tr> <td>Name: {c.student_name}</td> <td colspan="2">Enrol Number: {c.enroll_number}</td> </tr> <tr> <th>Skill</th> <th>Grade</th> <th>Description</th> </tr> <tr> <td><span show="{senior}">Running </span><span show="{junior}">Aerobic Capacity </span></td> <td>{c.first_description}</td> <td>{c.first_skill}</td> </tr> <tr> <td><span show="{senior}">Hopping </span><span show="{junior}">Agility </span></td> <td>{c.second_description}</td> <td>{c.second_skill}</td> </tr> <tr> <td><span show="{senior}">Jumping </span><span show="{junior}">Explosive Strength </span></td> <td>{c.third_description}</td> <td>{c.third_skill}</td> </tr> <tr> <td><span show="{senior}">Catching </span><span show="{junior}">Abdominal Strength </span></td> <td>{c.fourth_description}</td> <td>{c.fourth_skill}</td> </tr> <tr> <td><span show="{senior}">Throwing </span><span show="{junior}">Flexibility </span></td> <td>{c.fifth_description}</td> <td>{c.fifth_skill}</td> </tr> </table> </td> </tr> </tbody> </table> </section>', '', '', function(opts) {
	var self = this
  self.physicalFitnessDetails= []
  self.second_form=false
  self.first_form=false
  self.senior = false
  self.junior = false
  self.student_info = {'student_name':'','enroll_number':'','term':'','standard':''}
    self.on("mount", function(){
      self.title = ''
      self.view = 'physical_fitness'
      self.action = ''
      self.details = ''
      self.loading = false;
      self.tempSections = []
      self.update()
      flatpickr(".date", {
        allowInput: true,
        dateFormat: "d/m/Y",
      })
      self.readClass()
      self.readSection()
    })
    self.on("unmount", function(){
      physicalFitnessStore.off('read_classes_changed',ClassesChanged)
      physicalFitnessStore.off('read_section_changed',SectionChanged)
      physicalFitnessStore.off('add_physical_fitness_changed',AddPhysicalFitnessChanged)
      physicalFitnessStore.off('delete_physical_fitness_changed',DeletePhysicalFitnessChanged)
      physicalFitnessStore.off('read_physical_fitness_details_changed',PhysicalFitnessDetailsChanged)
    })

    self.readClass = () => {
       self.loading = true;
       physicalFitnessStore.trigger('read_classes')
    }

    self.readSection = () => {
       self.loading = true;
       physicalFitnessStore.trigger('read_section')
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

       physicalFitnessStore.trigger('read_exam_types',self.refs.standardSelect.value)
    }

    self.readPhysicalFitnessStudents = () => {
      let error = '';

      if(self.refs.sectionSelect.value==''){
        error = error + "Please select section, "
      }

      if(self.refs.examTermSelect.value==''){
        error = error + "Please select exam type "
      }

      console.log(self.refs.examTermSelect.value)
      if(error.length!=0){
        toastr.error(error)
        return
      }else{
        self.loading=true
        physicalFitnessStore.trigger('read_physical_fitness_students',self.refs.sectionSelect.value, self.refs.examTermSelect.value)
      }

    }

    self.openPhysicalFitnessForm = (c,e) => {
      if (c.standard_id>=8) {
        self.second_form=true
        self.first_form=false
      }else if (c.standard_id >= 4 && c.standard_id < 8) {
        self.second_form=false
        self.first_form=true
      }else{
        toastr.error("Physical Fitness is not applicable for selected class");
      }
      self.title='Add'
      self.action='PhysicalFitnessForm'
      self.details=c.student_name + ',' + 'Enroll No: ' + c.enroll_number
      self.student_id=c.student_id
      self.update()
    }

    self.closePhysicalFitnessForm = () => {
      self.title=''
      self.action=''
    }

    self.selectIncludeInGrandTotal = () => {
      console.log(self.refs.markingTypeSelect.value)
      if(self.refs.markingTypeSelect.value=='G'){
        self.refs.includeInGrandTotalSelect.value='N'
      }else{
        self.refs.includeInGrandTotalSelect.value='Y'
      }

    }

    self.add = () => {
      let error = '';
      var obj = {}
      obj['student_id']=self.student_id
      obj['section_id']=self.refs.sectionSelect.value
      obj['exam_term']=self.refs.examTermSelect.value
      obj['first_skill']=self.refs.first_skill.value
      obj['first_description']=$("#first_skill option:selected").text()
      obj['second_skill']=self.refs.second_skill.value
      obj['second_description']=$("#second_skill option:selected").text()
      obj['third_skill']=self.refs.third_skill.value
      obj['third_description']=$("#third_skill option:selected").text()
      obj['fourth_skill']=self.refs.fourth_skill.value
      obj['fourth_description']=$("#fourth_skill option:selected").text()
      obj['fifth_skill']=self.refs.fifth_skill.value
      obj['fifth_description']=$("#fifth_skill option:selected").text()

      if(error.length!=0){
        toastr.error(error)
        return
      }else{
        self.loading = true
        physicalFitnessStore.trigger('add_physical_fitness', obj)
      }

    }

    self.viewAllDetails = () => {
      let error = '';

      if(self.refs.sectionSelect.value==''){
        error = error + "Please select section, "
      }

      if(self.refs.examTermSelect.value==''){
        error = error + "Please select exam type "
      }

      console.log(self.refs.examTermSelect.value)
      if(error.length!=0){
        toastr.error(error)
        return
      }else{

        self.student_info.standard= $("#standard option:selected").text() + '-' + $("#section option:selected").text()
        if(self.refs.standardSelect.value>=8){
          self.senior = true
          self.junior = false
        }else{
          self.senior = false
          self.junior = true
        }

        self.loading=true
        physicalFitnessStore.trigger('read_physical_fitness_all_details', self.refs.sectionSelect.value, self.refs.examTermSelect.value)
      }
    }

    self.viewDetails = (c,e) => {
      self.student_info=c
      self.student_info.term=self.refs.examTermSelect.value
      if(self.refs.standardSelect.value>=8){
        self.senior = true
        self.junior = false
      }else{
        self.senior = false
        self.junior = true
      }

      self.loading=true
      physicalFitnessStore.trigger('read_physical_fitness_details',c.student_id, self.refs.examTermSelect.value)
    }

    self.closeDetails = (c,e) => {
      self.view='physical_fitness'
      self.update()
    }

   self.cancelOperation = (e) => {
      self.physicalFitness.map(c => {
          c.confirmDelete = false
          c.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.physicalFitness.map(c => {
        if(c.student_id != e.item.c.student_id){
          c.confirmDelete = false
        }else{
          c.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      physicalFitnessStore.trigger('delete_physical_fitness', e.item.c.student_id,self.refs.examTermSelect.value)
    }

    physicalFitnessStore.on('read_classes_changed',ClassesChanged)
    function ClassesChanged(classes){
      self.loading = false
      self.classes = []
      self.classes = classes
      self.update()
      console.log(self.classes)
    }

    physicalFitnessStore.on('read_section_changed',SectionChanged)
    function SectionChanged(sections){
      self.loading = false
      self.sections = []
      self.sections = sections
      self.update()
    }

    physicalFitnessStore.on('physical_fitness_students_changed',PhysicalFitnessChanged)
    function PhysicalFitnessChanged(physicalFitness){
      self.loading = false
      self.physicalFitness = []
      self.physicalFitness = physicalFitness
      self.update()
    }

    physicalFitnessStore.on('read_physical_fitness_details_changed',PhysicalFitnessDetailsChanged)
    function PhysicalFitnessDetailsChanged(details){

      self.loading=false
      if(details.length>0){
        self.view='details'
        self.physicalFitnessDetails= []
        self.physicalFitnessDetails= details
        self.update()
      }else{
        toastr.error('Please Add Physical Fitness Details')
        self.update()
      }
    }

    physicalFitnessStore.on('add_physical_fitness_changed',AddPhysicalFitnessChanged)
    function AddPhysicalFitnessChanged(physicalFitness){
      self.closePhysicalFitnessForm()
      self.loading = false
      self.update()

    }

    physicalFitnessStore.on('delete_physical_fitness_changed',DeletePhysicalFitnessChanged)
    function DeletePhysicalFitnessChanged(physicalFitness){
      self.loading = false
      self.physicalFitness.map(c => {
        c.confirmDelete = false
      })
      self.update()
    }

});
riot.tag2('religion', '<section class="is-fluid"> <h2 class="title" style="color: #ff3860;">Religions</h2> <div class="flex items-center mt-2 mb-6 no-print"> <div class="bg-green py-1 rounded w-10"> <div class="bg-grey h-px flex-auto"></div> </div> </div> <div class="box"> <div class="columns"> <div class="column is-narrow"> <label class="label">Religion</label> </div> <div class="column is-narrow"> <div class="control"> <input class=" input" ref="ReligionInput" type="text"> </div> </div> <div class="column"> <button class="button is-danger has-text-weight-bold" onclick="{add}">{title} </button> </div> </div> </div> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th>#</th> <th>Religion</th> <th></th> </tr> </thead> <tbody> <tr each="{d, i in religions}"> <td>{i + 1}</td> <td>{d.religion}</td> <td class="has-text-right"> <div class="inline-flex rounded border border-grey overflow-hidden" hide="{d.confirmDelete}"> <span><a class="button is-small is-rounded" onclick="{edit.bind(this, d)}">Edit</a></span> <span if="{role==\'ADMIN\'}"> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick="{confirmDelete}">Delete</a></span> </div> <div class="table-buttons" if="{d.confirmDelete}"> <span disabled="{loading}" class="button is-small is-rounded" onclick="{delete}"><i class="fa fa-check"></i></span> <soan disabled="{loading}" class="button is-small has-text-danger is-rounded" onclick="{cancelOperation}"><i class="fa fa-times"></i></span> </div> </td> </tr> </tbody> </table> </section>', '', '', function(opts) {
  var self = this
    self.on("mount", function(){
      self.title='Create'
      self.role = getCookie('role')
      self.update()
      self.readReligion()
    })

     self.on("unmount", function(){
      religionStore.off('religion_changed', ReligionChanged)
    })

    self.readReligion = () => {
       religionStore.trigger('read_religion')
    }

     self.add = () => {
      if(!self.refs.ReligionInput.value){
        toastr.info("Please enter religion and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          console.log('create')
          religionStore.trigger('add_religion', self.refs.ReligionInput.value)
        }else if(self.title=='Update'){
          console.log('update')
          religionStore.trigger('edit_religion', self.refs.ReligionInput.value,
            self.edit_id)
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
      self.religions.map(d => {
          d.confirmDelete = false
          d.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.religions.map(d => {
        if(d.religion != e.item.d.religion){
          d.confirmDelete = false
        }else{
          d.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      religionStore.trigger('delete_religion', e.item.d.religion_id)
    }

    self.edit = (d,e) => {
      console.log(d)
      self.title='Update'
      self.refs.ReligionInput.value = d.religion
      self.edit_id = d.religion_id
    }

    religionStore.on('religion_changed',ReligionChanged)
    function ReligionChanged(religions){
      console.log('religion_changed1')
      console.log(religions)
      self.title='Create'
      self.refs.ReligionInput.value = ''
      self.loading = false
      self.religions = religions
      self.update()
    }

});
riot.tag2('remark', '<section class=" is-fluid"> <h2 class="title" style="color: #ff3860;">Remarks</h2> <div class="flex items-center mt-2 mb-6 no-print"> <div class="bg-green py-1 rounded w-10"> <div class="bg-grey h-px flex-auto"></div> </div> </div> <div class="box"> <div class="columns"> <div class="column is-narrow"> <label class="label">Remark</label> </div> <div class="column is-narrow"> <div class="control"> <div class="control"> <input class=" input" ref="addRemarkInput" type="text"> </div> </div> </div> <div class="column is-narrow"> <label class="label">Short Reamrk</label> </div> <div class="column is-narrow"> <div class="control"> <input class=" input" ref="addShortRemarkInput" type="text"> </div> </div> <div class="column"> <button class="button is-danger has-text-weight-bold" onclick="{add}">{title} </button> </div> </div> </div> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th>SL</th> <th>Remark</th> <th>Short Remark</th> <th></th> </tr> </thead> <tbody> <tr each="{ev, i in remarks}"> <td>{i+1}</td> <td>{ev.remark}</td> <td>{ev.short_remark}</td> <td class="has-text-right"> <div class="inline-flex rounded border border-grey overflow-hidden" hide="{ev.confirmDelete}"> <span><a class="button is-small is-rounded" onclick="{edit.bind(this, ev)}">Edit</a></span> <span if="{role==\'ADMIN\'}"> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick="{confirmDelete}">Delete</a></span> </div> <div class="table-buttons" if="{ev.confirmDelete}"> <span disabled="{loading}" class="button is-small is-rounded" onclick="{delete}"><i class="fa fa-check"></i></span> <span disabled="{loading}" class="button is-small has-text-danger is-rounded" onclick="{cancelOperation}"><i class="fa fa-times"></i></span> </div> </td> </tr> </tbody> </table> </section>', '', '', function(opts) {
	var self = this
    self.on("mount", function(){
      self.title='Create'
      self.role = getCookie('role')
      self.update()
      self.readRemark()
    })
    self.on("unmount", function(){
      remarkStore.off('add_remark_changed', AddRemarkChanged)
      remarkStore.off('read_remark_changed', ReadRemarkChanged)
      remarkStore.off('edit_remark_changed',EditRemarkChanged)
      remarkStore.off('delete_remark_changed',DeleteRemarkChanged)
    })

    self.readRemark = () => {
       remarkStore.trigger('read_remark')
    }

     self.add = () => {
      if(!self.refs.addRemarkInput.value){
        toastr.info("Please enter Remark and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          console.log('create')
          remarkStore.trigger('add_remark', self.refs.addRemarkInput.value,
          self.refs.addShortRemarkInput.value)
        }else if(self.title=='Update'){
          console.log('update')
          remarkStore.trigger('edit_remark', self.refs.addRemarkInput.value,
          self.refs.addShortRemarkInput.value,self.edit_id)
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
      self.remarks.map(ev => {
          ev.confirmDelete = false
          ev.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.remarks.map(ev => {
        if(ev.remark_id != e.item.ev.remark_id){
          ev.confirmDelete = false
        }else{
          ev.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      remarkStore.trigger('delete_remark', e.item.ev.remark_id)
    }

    self.edit = (ev,e) => {
      console.log(ev)
      self.title='Update'
      self.refs.addRemarkInput.value = ev.remark
      self.refs.addShortRemarkInput.value = ev.short_remark
      self.edit_id = ev.remark_id
    }

    remarkStore.on('add_remark_changed',AddRemarkChanged)
    function AddRemarkChanged(remarks){
      console.log(remarks)
      self.title='Create'
      self.refs.addRemarkInput.value =''
      self.refs.addShortRemarkInput.value =''
      self.loading = false
      self.remarks = remarks
      self.update()
      self.readRemark()
      console.log(self.remarks)
    }

    remarkStore.on('edit_remark_changed',EditRemarkChanged)
    function EditRemarkChanged(remarks){
      console.log(remarks)
      self.title='Update'
      self.refs.addRemarkInput.value =''
      self.refs.addShortRemarkInput.value =''
      self.loading = false
      self.remarks = remarks
      self.update()
      self.readRemark()

    }

    remarkStore.on('delete_remark_changed',DeleteRemarkChanged)
    function DeleteRemarkChanged(remarks){
      console.log(remarks)
      self.title='Create'
      self.refs.addRemarkInput.value =''
      self.refs.addShortRemarkInput.value =''
      self.loading = false
      self.remarks = remarks
      self.update()
      self.readRemark()
      console.log(self.remarks)
    }

    remarkStore.on('read_remark_changed',ReadRemarkChanged)
    function ReadRemarkChanged(remarks){
      console.log(remarks)
      self.title='Create'
      self.refs.addRemarkInput.value =''
      self.refs.addShortRemarkInput.value =''
      self.loading = false
      self.remarks = remarks
      self.update()
      console.log(self.remarks)
    }

});
riot.tag2('result-activation', '<loading-bar if="{loading}"></loading-bar> <section class=" is-fluid"> <div class="level"> <div class="level-left"> <h2 class="title" style="color: #ff3860;">Result Activation </h2> </div> <div class="level-right"> <button class="button is-warning is-rounded ml5" onclick="{readResultActivation}"> <span class="icon"> <span class="fas fa-sync-alt"></span> </span> </button> </div> </div> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th class="slno">SL</th> <th>Standard</th> <th>Section</th> <th>Active</th> <th></th> </tr> </thead> <tbody> <tr each="{c, i in classes}"> <td>{i+1}</td> <td>{c.standard}</td> <td>{c.section}</td> <td>{c.active_section}</td> <td class="has-text-right"> <span show="{c.active_section==\'No\'}"><a class="button is-small is-rounded is-primary" onclick="{edit.bind(this, c)}">Allow</a></span> <span show="{c.active_section==\'Yes\'}"><a class="button is-small is-rounded is-danger" onclick="{edit.bind(this, c)}">Block</a></span> </td> </tr> </tbody> </table> </section>', '', '', function(opts) {
	var self = this

    self.on("mount", function(){
      self.title = ''
      self.loading = false;
      self.readResultActivation()
    })
    self.on("unmount", function(){
      resultActivationStore.off('read_result_activation_changed',ClassesChanged)
      resultActivationStore.off('result_activation_update_changed',UpdateChanged)
    })

    self.readResultActivation = () => {
      self.loading = true;
      resultActivationStore.trigger('read_result_activation')
    }

    self.edit = (c,e) => {
      self.loading=true
      var obj = {}
      obj['section_id'] = c.section_id;

      if(c.active_section=='Yes'){
        obj['active_section'] = 'No';
      }else{
        obj['active_section'] = 'Yes';
      }

      resultActivationStore.trigger('result_activation_update', obj)
    }

    resultActivationStore.on('read_result_activation_changed',ClassesChanged)
    function ClassesChanged(classes){
      self.loading = false
      self.classes = []
      self.classes = classes
      self.update()
      console.log(self.classes)
    }

    resultActivationStore.on('result_activation_update_changed',UpdateChanged)
    function UpdateChanged(){
      self.readResultActivation()
    }

});
riot.tag2('role', '<section class=" is-fluid"> <h2 class="title" style="color: #ff3860;">Employee Role</h2> <div class="flex items-center mt-2 mb-6 no-print"> <div class="bg-green py-1 rounded w-10"> <div class="bg-grey h-px flex-auto"></div> </div> </div> <div class="box"> <div class="columns"> <div class="column is-narrow"> <label class="label">Employee</label> </div> <div class="column is-narrow"> <div class="control"> <div class="select"> <select ref="employee_id"> <option each="{employees}" riot-value="{employee_id}">{name} </option> </select> </div> </div> </div> <div class="column is-narrow"> <label class="label">Role</label> </div> <div class="column is-narrow"> <div class="control"> <input class=" input" ref="addEmployeeRoleInput" type="text"> </div> </div> <div class="column"> <button class="button is-danger has-text-weight-bold" onclick="{add}">{title} </button> </div> </div> </div> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th>SL</th> <th>Employee</th> <th>Role</th> <th></th> </tr> </thead> <tbody> <tr each="{ev, i in employeeRoles}"> <td>{i+1}</td> <td>{ev.name}</td> <td>{ev.role}</td> <td class="has-text-right"> <div class="inline-flex rounded border border-grey overflow-hidden" hide="{ev.confirmDelete}"> <span><a class="button is-small is-rounded" onclick="{edit.bind(this, ev)}">Edit</a></span> <span if="{role==\'ADMIN\'}"> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick="{confirmDelete}">Delete</a></span> </div> <div class="table-buttons" if="{ev.confirmDelete}"> <span disabled="{loading}" class="button is-small is-rounded" onclick="{delete}"><i class="fa fa-check"></i></span> <span disabled="{loading}" class="button is-small has-text-danger is-rounded" onclick="{cancelOperation}"><i class="fa fa-times"></i></span> </div> </td> </tr> </tbody> </table> </section>', '', '', function(opts) {
	var self = this
    self.on("mount", function(){
      self.title='Create'
      self.role = getCookie('role')
      self.update()
      self.readEmployees()
      self.readEmployeeRoles()
    })
    self.on("unmount", function(){
      employeeRoleStore.off('add_employee_role_changed', AddEmployeeRolesChanged)
      employeeRoleStore.off('read_employee_role_changed', ReadEmployeeRolesChanged)
      employeeRoleStore.off('read_employee_changed',EmployeesChanged)
      employeeRoleStore.off('edit_employee_role_changed',EditEmployeeRolesChanged)
      employeeRoleStore.off('delete_employee_role_changed',DeleteEmployeeRolesChanged)
    })

    self.readEmployees = () => {
       employeeRoleStore.trigger('read_employees')
    }

    self.readEmployeeRoles = () => {
       employeeRoleStore.trigger('read_employee_roles')
    }

     self.add = () => {
      if(!self.refs.addEmployeeRoleInput.value){
        toastr.info("Please enter Event and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          console.log('create')
          employeeRoleStore.trigger('add_employee_role', self.refs.addEmployeeRoleInput.value,
           self.refs.employee_id.value)
        }else if(self.title=='Update'){
          console.log('update')
          employeeRoleStore.trigger('edit_employee_role', self.refs.addEmployeeRoleInput.value,
            self.refs.employee_id.value, self.edit_id)
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
      self.employeeRoles.map(ev => {
          ev.confirmDelete = false
          ev.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.employeeRoles.map(ev => {
        if(ev.role_id != e.item.ev.role_id){
          ev.confirmDelete = false
        }else{
          ev.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      employeeRoleStore.trigger('delete_employee_role', e.item.ev.role_id)
    }

    self.edit = (ev,e) => {
      console.log(ev)
      self.title='Update'
      self.refs.addEmployeeRoleInput.value = ev.role
      self.refs.employee_id.value = ev.employee_id
      self.edit_id = ev.role_id
    }

    employeeRoleStore.on('add_employee_role_changed',AddEmployeeRolesChanged)
    function AddEmployeeRolesChanged(employeeRoles){
      console.log(employeeRoles)
      self.title='Create'
      self.refs.addEmployeeRoleInput.value = ''
      self.refs.employee_id.value = ''
      self.loading = false
      self.employeeRoles = employeeRoles
      self.update()
      self.readEmployeeRoles()
      console.log(self.employeeRoles)
    }

    employeeRoleStore.on('edit_employee_role_changed',EditEmployeeRolesChanged)
    function EditEmployeeRolesChanged(employeeRoles){
      console.log(employeeRoles)
      self.title='Create'
      self.refs.addEmployeeRoleInput.value = ''
      self.refs.employee_id.value = ''
      self.loading = false
      self.employeeRoles = employeeRoles
      self.update()
      self.readEmployeeRoles()

    }

    employeeRoleStore.on('delete_employee_role_changed',DeleteEmployeeRolesChanged)
    function DeleteEmployeeRolesChanged(employeeRoles){
      console.log(employeeRoles)
      self.title='Create'
      self.refs.addEmployeeRoleInput.value = ''
      self.refs.employee_id.value = ''
      self.loading = false
      self.employeeRoles = employeeRoles
      self.update()
      self.readEmployeeRoles()
      console.log(self.employeeRoles)
    }

    employeeRoleStore.on('read_employee_role_changed',ReadEmployeeRolesChanged)
    function ReadEmployeeRolesChanged(employeeRoles){
      console.log(employeeRoles)
      self.title='Create'
      self.refs.addEmployeeRoleInput.value = ''
      self.loading = false
      self.employeeRoles = employeeRoles
      self.update()
      console.log(self.employeeRoles)
    }

    employeeRoleStore.on('read_employees_changed',EmployeesChanged)
    function EmployeesChanged(employees){
      console.log(employees)
      self.employees = employees
      self.update()
      console.log(self.employees)
    }

});
riot.tag2('scholarship', '<section class="container is-fluid" show="{scholar_ship_view ==\'scholarStudent\'}"> <div class="level"> <div class="level-left"> <h2 class="title" style="color: #ff3860;">Scholarship Assigned Students</h2> </div> <div class="level-right"> <button class="button is-warning is-rounded" onclick="{assign_scholar_ship}"> <span class="icon"> <span class="fas fa-plus"></span> </span> <span>Add/Update</span> </button> </div> </div> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th>SL</th> <th>Enrol No.</th> <th>Standard</th> <th>Student</th> <th>Fee Slip</th> <th>Scholarship</th> <th>Scholarship</th> <th>Remarks</th> </tr> </thead> <tbody> <tr each="{s, i in ScholarStudents}"> <td>{i+1}</td> <td>{s.enroll_number}</td> <td>{s.standard}</td> <td>{s.student_name}</td> <td>{s.student_name}</td> <td>{s.fee_slip_name}</td> <td>{s.scholorship_amount}</td> <td>{s.scholorship_remarks}</td> </tr> </tbody> </table> </section> <section class="container is-fluid" show="{scholar_ship_view ==\'scholarshipAdd\'}"> <div class="level"> <div class="level-left"> <div class="level-item"> <h2 class="title" style="color: #ff3860;">Add/Edit Scholarship</h2> </div> </div> <div class="level-right"> <a class="button" onclick="{close_scholarship_view}">Back</a> </div> </div> <div class="columns"> <div class="column box is-one-quarter is-multiline"> <div class="column is-narrow"> <div class="control"> <input class=" input" ref="enrolNumberText" type="text" placeholder="Enrol Number"> </div> </div> <div class="column"> <div class="select is-fullwidth"> <select ref="scholarshipType"> <option value="amount">Amount</option> <option value="percentage">Percentage</option> </select> </div> </div> <div class="column"> <input class=" input" ref="amountText" placeholder="Amount" type="number"> </div> <div class="column"> <button class="button is-danger" onclick="{getStudentDetail}">Go</button> </div> <div class="column"> <div class="pp-box"> <img src="https://bulma.io/images/placeholders/128x128.png"> </div> </div> <div class="control"> <div class="column"> <p class="title">{student_name}</p> <p class="title">{standard}</p> </div> </div> </div> <div class="column is-three-quarter"> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th width="50">#</th> <th>Fee Slip Name</th> <th class="has-text-right" style="width:100px">Amount</th> </tr> </thead> <tbody> <tr each="{r, i in slips}"> <td>{i + 1}</td> <td>{r.fee_slip_name}</td> <td class="has-text-right"><input class="input" id="head_amount{r.fee_slip_id}" type="text" riot-value="{r.amount}" onkeyup="{getTotal}"></td> </tr> </tbody> <thead> <tr> <th class="has-text-right" colspan="2">Total</th> <th>{grandTotal}</th> </tr> </thead> </table> <div class="column is-full"> <input class=" input" ref="remarksText" type="text" placeholder="Remarks"> </div> <div class="column is-full"> <button class="button is-danger" style="float:right" onclick="{submitScholarship}">Submit</button> </div> </div> </div> </section>', '', '', function(opts) {
 var self = this
    self.on("mount", function(){
      self.role = getCookie('role')
      self.scholar_ship_view ='scholarStudent'
      self.update()
      self.readScholarStudent()
    })
    self.on("unmount", function(){
      scholarshipStore.off('read_scholar_student_changed', ReadScholarStudentChanged)
      scholarshipStore.off('read_student_changed', ReadStudentChanged)
      scholarshipStore.off('read_scholar_feeslip_changed', ReadScholarFeeSlipChanged)
      scholarshipStore.off('add_scholarship_head_changed', AddScholarshipHeadChanged)

    })

    self.getStudentDetail = () =>{
      console.log('get')
      scholarshipStore.trigger('read_student', self.refs.enrolNumberText.value)
    }

    self.getScholarshipByStudent = ()=>{
      scholarshipStore.trigger('read_scholarship_slip', self.studentId)

    }

    self.readScholarStudent = () => {
       scholarshipStore.trigger('read_scholar_student')
    }
    self.close_scholarship_view = () =>{
    	self.scholar_ship_view ='scholarStudent'
    }
    self.assign_scholar_ship = () =>{
    	self.scholar_ship_view ='scholarshipAdd'
    }

    self.submitScholarship = () =>{
      var assigned_slips = []
      for(var i=0; i<self.slips.length; i++){
          var o ={}
          o.fee_slip_id = self.slips[i].fee_slip_id;
          o.amount = self.slips[i].amount;
          if(Number(self.slips[i].amount)>0){
          assigned_slips.push(o);
        }
      }

        var obj = {}
        obj['scholorship_remarks'] = self.refs.remarksText.value
        obj['student_id'] = self.studentId
        obj['fee'] = assigned_slips
        self.loading = true
        scholarshipStore.trigger('add_scholarship_amount', obj)
    }

   scholarshipStore.on('read_scholar_student_changed',ReadScholarStudentChanged)
    function ReadScholarStudentChanged(students){
      console.log(students)
      self.ScholarStudents = students
      self.update()
      console.log(self.students)
    }

    scholarshipStore.on('add_scholarship_head_changed',AddScholarshipHeadChanged)
    function AddScholarshipHeadChanged(scholarships){
      console.log("under scholarship changed")
      self.loading = false

      self.update()

    }

   scholarshipStore.on('read_student_changed',ReadStudentChanged)
    function ReadStudentChanged(scholarStudent){
      console.log(scholarStudent)
      self.student = []
      self.student = scholarStudent
      self.student_name = self.student[0].student_name;
      self.standard = self.student[0].standard;
      self.studentId = self.student[0].student_id;
      self.update()
      self.getScholarshipByStudent()
      console.log(self.scholarStudent)
    }
    scholarshipStore.on('read_scholar_feeslip_changed',ReadScholarFeeSlipChanged)
    function ReadScholarFeeSlipChanged(scholarSlips){
      console.log(scholarSlips)
      self.scholarSlips = []
      self.scholarSlips = scholarSlips
      self.slips= []
      for(var i=0; i<scholarSlips.length; i++){

        var obj = {};
        obj.fee_slip_id = scholarSlips[i].fee_slip_id;
        obj.fee_slip_name = scholarSlips[i].fee_slip_name;
        obj.scholorship_remarks = scholarSlips[i].scholorship_remarks;

        if(self.refs.scholarshipType.value=='amount'){
          if(scholarSlips[i].scholorship_amount !=null){
            obj.amount = scholarSlips[i].scholorship_amount;
          }else if (scholarSlips[i].scholorship_amount == null){
                obj.amount = self.refs.amountText.value;
          }
          if (scholarSlips[i].scholorship_amount == null && i==11 && self.refs.amountText.value!=""){
             obj.amount = 2*Number(self.refs.amountText.value);
          }

        }else if (self.refs.scholarshipType.value == 'percentage') {
          if(scholarSlips[i].scholorship_amount !=null){
            obj.amount = scholarSlips[i].scholorship_amount;
          }else if (scholarSlips[i].scholorship_amount == null) {
            if (self.refs.amountText.value == ""){
              obj.amount = scholarSlips[i].total_amount;
            }else
            obj.amount =( scholarSlips[i].total_amount * (Number(self.refs.amountText.value) * 0.01));
          }
        }
            self.slips.push(obj);
      }

      self.update()
      console.log(self.scholarSlips)
    }

});
riot.tag2('section-master', '<section class=" is-fluid"> <h2 class="title" style="color: #ff3860;">Sections</h2> <div class="flex items-center mt-2 mb-6 no-print"> <div class="bg-green py-1 rounded w-10"> <div class="bg-grey h-px flex-auto"></div> </div> </div> <div class="box"> <div class="columns"> <div class="column is-narrow"> <label class="label">Standard</label> </div> <div class="column is-narrow"> <div class="control"> <div class="select"> <select ref="standard_id"> <option each="{standards}" riot-value="{standard_id}">{standard} </option> </select> </div> </div> </div> <div class="column is-narrow"> <label class="label">Section</label> </div> <div class="column is-narrow"> <div class="control"> <input class=" input" ref="addSectionInput" type="text"> </div> </div> <div class="column"> <button class="button is-danger has-text-weight-bold" onclick="{add}">{title} </button> </div> </div> </div> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th>SL</th> <th>Standard</th> <th>Section</th> <th></th> </tr> </thead> <tbody> <tr each="{ev, i in sections}"> <td>{i+1}</td> <td>{ev.standard}</td> <td>{ev.section}</td> <td class="has-text-right"> <div class="inline-flex rounded border border-grey overflow-hidden" hide="{ev.confirmDelete}"> <span><a class="button is-small is-rounded" onclick="{edit.bind(this, ev)}">Edit</a></span> <span if="{role==\'ADMIN\'}"> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick="{confirmDelete}">Delete</a></span> </div> <div class="table-buttons" if="{ev.confirmDelete}"> <span disabled="{loading}" class="button is-small is-rounded" onclick="{delete}"><i class="fa fa-check"></i></span> <span disabled="{loading}" class="button is-small has-text-danger is-rounded" onclick="{cancelOperation}"><i class="fa fa-times"></i></span> </div> </td> </tr> </tbody> </table> </section>', '', '', function(opts) {
	var self = this
    self.on("mount", function(){
      self.title='Create'
      self.role = getCookie('role')
      self.update()
      self.readStandard()
      self.readSection()
    })
    self.on("unmount", function(){
      sectionStore.off('add_section_changed', AddSectionChanged)
      sectionStore.off('read_section_changed', ReadSectionChanged)
      sectionStore.off('read_standard_changed',StandardChanged)
      sectionStore.off('edit_section_changed',EditSectionChanged)
      sectionStore.off('delete_section_changed',DeleteSectionChanged)
    })

    self.readStandard = () => {
       sectionStore.trigger('read_standard')
    }

    self.readSection = () => {
       sectionStore.trigger('read_section')
    }

     self.add = () => {
      if(!self.refs.addSectionInput.value){
        toastr.info("Please enter Event and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          console.log('create')
          sectionStore.trigger('add_section', self.refs.addSectionInput.value,
           self.refs.standard_id.value)
        }else if(self.title=='Update'){
          console.log('update')
          sectionStore.trigger('edit_section', self.refs.addSectionInput.value,
            self.refs.standard_id.value, self.edit_id)
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
      self.sections.map(ev => {
          ev.confirmDelete = false
          ev.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.sections.map(ev => {
        if(ev.section_id != e.item.ev.section_id){
          ev.confirmDelete = false
        }else{
          ev.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      sectionStore.trigger('delete_section', e.item.ev.section_id)
    }

    self.edit = (ev,e) => {
      console.log(ev)
      self.title='Update'
      self.refs.addSectionInput.value = ev.section
      self.refs.standard_id.value = ev.standard_id
      self.edit_id = ev.section_id
    }

    sectionStore.on('add_section_changed',AddSectionChanged)
    function AddSectionChanged(sections){
      console.log(sections)
      self.title='Create'
      self.refs.addSectionInput.value = ''
      self.refs.standard_id.value = ''
      self.loading = false
      self.sections = sections
      self.update()
      self.readSection()
      console.log(self.sections)
    }

    sectionStore.on('edit_section_changed',EditSectionChanged)
    function EditSectionChanged(sections){
      console.log(sections)
      self.title='Create'
      self.refs.addSectionInput.value = ''
      self.refs.standard_id.value = ''
      self.loading = false
      self.sections = sections
      self.update()
      self.readSection()

    }

    sectionStore.on('delete_section_changed',DeleteSectionChanged)
    function DeleteSectionChanged(sections){
      console.log(sections)
      self.title='Create'
      self.refs.addSectionInput.value = ''
      self.refs.standard_id.value = ''
      self.loading = false
      self.sections = sections
      self.update()
      self.readSection()
      console.log(self.sections)
    }

    sectionStore.on('read_section_changed',ReadSectionChanged)
    function ReadSectionChanged(sections){
      console.log(sections)
      self.title='Create'
      self.refs.addSectionInput.value = ''
      self.loading = false
      self.sections = sections
      self.update()
      console.log(self.sections)
    }

    sectionStore.on('read_standard_changed',StandardChanged)
    function StandardChanged(standards){
      console.log(standards)
      self.standards = standards
      self.update()
      console.log(self.standards)
    }

});
riot.tag2('session-setting', '<section class=" is-fluid"> <h2 class="title has-text-centered" style="color: #ff3860;">Fee Session Management</h2> <div class="flex items-center mt-2 mb-6 no-print"> <div class="bg-green py-1 rounded w-10"> <div class="bg-grey h-px flex-auto"></div> </div> </div> <div class="box"> <div class="columns"> <div class="column is-narrow"> <label class="label">Session Name</label> </div> <div class="column is-narrow"> <div class="control"> <input class=" input" ref="addSessionInput" type="text"> </div> </div> <div class="column is-narrow"> <label class="label">Start Date</label> </div> <div class="column is-narrow"> <div class="control"> <input class="date input flatpickr-input form-control input" ref="sessionStartDateInput" placeholder="" tabindex="0" type="text" readonly="readonly"> </div> </div> <div class="column is-narrow"> <label class="label">End Date</label> </div> <div class="column is-narrow"> <div class="control"> <input class="date input flatpickr-input form-control input" ref="sessionEndDateInput" placeholder="" tabindex="0" type="text" readonly="readonly"> </div> </div> <div class="column"> <button class="button is-danger has-text-weight-bold" onclick="{add}">{title} </button> </div> </div> </div> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th>SL</th> <th>Session Name</th> <th>Session Start Date</th> <th>Session End Date</th> <th>Current Session</th> <th></th> </tr> </thead> <tbody> <tr each="{s, i in sessions}"> <td>{i+1}</td> <td>{s.session_name}</td> <td>{s.session_start_date}</td> <td>{s.session_end_date}</td> <td>{s.is_current}</td> <td class="has-text-right"> <div class="inline-flex rounded border border-grey overflow-hidden" hide="{s.confirmDelete || s.confirmCurrent}"> <span if="{role==\'ADMIN\'}"> <a class="button is-small is-rounded" rel="nofollow" onclick="{confirmCurrentSession}">Mark Current Session</a></span> <span><a class="button is-small is-rounded" onclick="{edit.bind(this, s)}">Edit</a></span> <span if="{role==\'ADMIN\'}"> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick="{confirmDelete}">Delete</a></span> </div> <div class="table-buttons" if="{s.confirmDelete}"> <span disabled="{loading}" class="button is-small is-rounded" onclick="{delete}"><i class="fa fa-check"></i></span> <span disabled="{loading}" class="button is-small has-text-danger is-rounded" onclick="{cancelOperation}"><i class="fa fa-times"></i></span> </div> <div class="table-buttons" if="{s.confirmCurrent}"> <span disabled="{loading}" class="button is-small is-rounded" onclick="{markCurrent}"><i class="fa fa-check"></i></span> <span disabled="{loading}" class="button is-small has-text-danger is-rounded" onclick="{cancelOperation}"><i class="fa fa-times"></i></span> </div> </td> </tr> </tbody> </table> </section>', '', '', function(opts) {
	var self = this
    self.on("mount", function(){
      self.title='Create'
      self.role = getCookie('role')
      self.update()
      flatpickr(".date", {

    	allowInput: true,
    	altFormat: "d/m/Y",
    	dateFormat: "Y-m-d",
  		})
      self.readSession()
    })
    self.on("unmount", function(){
      sessionStore.off('read_session_changed', ReadSessionChanged)
      sessionStore.off('add_session_changed',AddSessionChanged)
      sessionStore.off('edit_session_changed',EditSessionChanged)
      sessionStore.off('delete_event_changed',DeleteSessionChanged)
    })

    self.readSession = () => {
       sessionStore.trigger('read_session')
    }

     self.add = () => {
      if(!self.refs.addSessionInput.value){
        toastr.info("Please enter Event and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          console.log('create')
          sessionStore.trigger('add_session', self.refs.addSessionInput.value,
           self.refs.sessionStartDateInput.value , self.refs.sessionEndDateInput.value)
           self.readSession()
        }else if(self.title=='Update'){
          console.log('update')
          sessionStore.trigger('edit_session',  self.refs.addSessionInput.value,
          self.refs.sessionStartDateInput.value ,
          self.refs.sessionEndDateInput.value, self.edit_id)
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
      self.sessions.map(s => {
          s.confirmDelete = false
          s.confirmEdit = false
          s.confirmCurrent = false
      })
    }

    self.confirmDelete = (e) => {
      self.sessions.map(s => {
        if(s.session_id != e.item.s.session_id){
          s.confirmDelete = false
        }else{
          s.confirmDelete = true
        }
      })
    }
    self.confirmCurrentSession = (e) =>{
      self.sessions.map(s => {
        if(s.session_id != e.item.s.session_id){
          s.confirmCurrent = false
        }else{
          s.confirmCurrent = true
        }
      })
    }
    self.markCurrent = (e) => {
      self.loading = true
      sessionStore.trigger('current_session', e.item.s.session_id)
    }

    self.delete = (e) => {
      self.loading = true
      sessionStore.trigger('delete_session', e.item.s.session_id)
    }

    self.edit = (s,e) => {
      console.log(s)
      self.title='Update'
      flatpickr(".date", {
    	allowInput: true,
    	altFormat: "d/m/Y",
    	dateFormat: "Y-m-d",
  		})
      self.refs.addSessionInput.value = s.session_name
      self.refs.sessionStartDateInput.value = s.u_session_start_date
      self.refs.sessionEndDateInput.value = s.u_session_end_date
      self.edit_id = s.session_id
    }

    sessionStore.on('read_session_changed',ReadSessionChanged)
    function ReadSessionChanged(sessions){
      console.log(sessions)
      self.title='Create'
      self.loading = false
      self.sessions = sessions
      self.update()
      console.log(self.sessions)
    }

    sessionStore.on('add_session_changed',AddSessionChanged)
    function AddSessionChanged(sessions){
      console.log(sessions)
      self.title='Create'
      self.loading = false
      self.sessions = sessions
      self.update()
      console.log(self.sessions)
    }

    sessionStore.on('edit_session_changed',EditSessionChanged)
    function EditSessionChanged(sessions){
      console.log(sessions)
      self.title='Create'
      self.loading = false
      self.sessions = sessions
      self.refs.addSessionInput.value = ''
      self.refs.sessionStartDateInput.value = ''
      self.refs.sessionEndDateInput.value = ''
      self.update()
      console.log(self.sessions)
    }
    sessionStore.on('delete_event_changed',DeleteSessionChanged)
    function DeleteSessionChanged(sessions){
      console.log(sessions)
      self.title='Create'
      self.sessions = sessions
      self.update()
    }

    sessionStore.on('marked_event_changed',MarkedSessionChanged)
    function MarkedSessionChanged(sessions){
      console.log(sessions)
      self.title='Create'
      self.sessions = sessions
      self.update()
    }

});
riot.tag2('setting', '<div class="field has-addons"> <p class="control"> <a class="button {is-active: selected_master == \'item\'}" href="#/setting/item"> <span>Item</span> </a> </p> <p class="control"> <a class="button {is-active: selected_master == \'event\'}" href="#/setting/event"> <span>Event</span> </a> </p> <p class="control"> <a class="button {is-active: selected_master == \'category\'}" href="#/setting/category"> <span>Category</span> </a> </p> <p class="control"> <a class="button {is-active: selected_master == \'class-teacher\'}" href="#/setting/class-teacher"> <span>Class Teacher</span> </a> </p> </div> <div id="setting-view"></div>', '', '', function(opts) {
    var self = this
    console.log('opts.selected_master')
    console.log(opts.selected_master)
    if(!opts.selected_master){
      self.selected_master = 'item'
    }else{
      self.selected_master = opts.selected_master
    }
});
riot.tag2('standard', '<section class="is-fluid"> <h2 class="title" style="color: #ff3860;">New Class</h2> <div class="flex items-center mt-2 mb-6 no-print"> <div class="bg-green py-1 rounded w-10"> <div class="bg-grey h-px flex-auto"></div> </div> </div> <div class="box"> <div class="columns"> <div class="column is-narrow"> <label class="label">Standard</label> </div> <div class="column is-narrow"> <div class="control"> <input class=" input" ref="addStandardInput" type="text"> </div> </div> <div class="column"> <button class="button is-danger has-text-weight-bold" onclick="{add}">{title} </button> </div> </div> </div> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th>#</th> <th>Standard</th> <th></th> </tr> </thead> <tbody> <tr each="{d, i in standards}"> <td>{i + 1}</td> <td>{d.standard}</td> <td class="has-text-right"> <div class="inline-flex rounded border border-grey overflow-hidden" hide="{d.confirmDelete}"> <span><a class="button is-small is-rounded" onclick="{edit.bind(this, d)}">Edit</a></span> <span if="{role==\'ADMIN\'}"> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick="{confirmDelete}">Delete</a></span> </div> <div class="table-buttons" if="{d.confirmDelete}"> <span disabled="{loading}" class="button is-small is-rounded" onclick="{delete}"><i class="fa fa-check"></i></span> <soan disabled="{loading}" class="button is-small has-text-danger is-rounded" onclick="{cancelOperation}"><i class="fa fa-times"></i></span> </div> </td> </tr> </tbody> </table> </section>', '', '', function(opts) {
  var self = this
    self.on("mount", function(){
      self.title='Create'
      self.role = getCookie('role')
      self.update()
      self.readStandard()
    })

     self.on("unmount", function(){
      standardStore.off('standard_changed', StandardChanged)
    })

    self.readStandard = () => {
       standardStore.trigger('read_standard')
    }

     self.add = () => {
      if(!self.refs.addStandardInput.value){
        toastr.info("Please enter standard and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          console.log('create')
          standardStore.trigger('add_standard', self.refs.addStandardInput.value)
        }else if(self.title=='Update'){
          console.log('update')
          standardStore.trigger('edit_standard', self.refs.addStandardInput.value,
            self.edit_id)
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
      self.standards.map(d => {
          d.confirmDelete = false
          d.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.standards.map(d => {
        if(d.standard != e.item.d.standard){
          d.confirmDelete = false
        }else{
          d.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      standardStore.trigger('delete_standard', e.item.d.standard_id)
    }

    self.edit = (d,e) => {
      console.log(d)
      self.title='Update'
      self.refs.addStandardInput.value = d.standard
      console.log(d.standard_id);
      self.edit_id = d.standard_id
    }

    standardStore.on('standard_changed',StandardChanged)
    function StandardChanged(standards){
      console.log('standard_changed1')
      console.log(standards)
      self.title='Create'
      self.refs.addStandardInput.value = ''
      self.loading = false
      self.standards = standards
      self.update()
    }

});
riot.tag2('state', '<section class="is-fluid"> <h2 class="title" style="color: #ff3860;">States</h2> <div class="flex items-center mt-2 mb-6 no-print"> <div class="bg-green py-1 rounded w-10"> <div class="bg-grey h-px flex-auto"></div> </div> </div> <div class="box"> <div class="columns"> <div class="column is-narrow"> <label class="label">State</label> </div> <div class="column is-narrow"> <div class="control"> <input class=" input" ref="addStateInput" type="text"> </div> </div> <div class="column"> <button class="button is-danger has-text-weight-bold" onclick="{add}">{title} </button> </div> </div> </div> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th>#</th> <th>State</th> <th></th> </tr> </thead> <tbody> <tr each="{d, i in states}"> <td>{i + 1}</td> <td>{d.state}</td> <td class="has-text-right"> <div class="inline-flex rounded border border-grey overflow-hidden" hide="{d.confirmDelete}"> <span><a class="button is-small is-rounded" onclick="{edit.bind(this, d)}">Edit</a></span> <span if="{role==\'ADMIN\'}"> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick="{confirmDelete}">Delete</a></span> </div> <div class="table-buttons" if="{d.confirmDelete}"> <span disabled="{loading}" class="button is-small is-rounded" onclick="{delete}"><i class="fa fa-check"></i></span> <soan disabled="{loading}" class="button is-small has-text-danger is-rounded" onclick="{cancelOperation}"><i class="fa fa-times"></i></span> </div> </td> </tr> </tbody> </table> </section>', '', '', function(opts) {
  var self = this
    self.on("mount", function(){
      self.title='Create'
      self.role = getCookie('role')
      self.update()
      self.readState()
    })

     self.on("unmount", function(){
      stateStore.off('state_changed', StateChanged)
    })

    self.readState = () => {
       stateStore.trigger('read_state')
    }

     self.add = () => {
      if(!self.refs.addStateInput.value){
        toastr.info("Please enter state and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          console.log('create')
          stateStore.trigger('add_state', self.refs.addStateInput.value)
        }else if(self.title=='Update'){
          console.log('update')
          stateStore.trigger('edit_state', self.refs.addStateInput.value,
            self.edit_id)
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
      self.levels.map(d => {
          d.confirmDelete = false
          d.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.states.map(d => {
        if(d.state != e.item.d.state){
          d.confirmDelete = false
        }else{
          d.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      stateStore.trigger('delete_state', e.item.d.state)
    }

    self.edit = (d,e) => {
      console.log(d)
      self.title='Update'
      self.refs.addStateInput.value = d.state
      self.edit_id = d.state
    }

    stateStore.on('state_changed',StateChanged)
    function StateChanged(states){
      console.log('state_changed1')
      console.log(states)
      self.title='Create'
      self.refs.addStateInput.value = ''
      self.loading = false
      self.states = states
      self.update()
    }

});
riot.tag2('student-assign-house', '<loading-bar if="{loading}"></loading-bar> <section class=" is-fluid" show="{view==\'student-assign-houses\'}"> <div class="level"> <div class="level-left"> <h2 class="title" style="color: #ff3860;">House</h2> </div> <div class="level-right"> <button class="button is-warning is-rounded" onclick="{openHouseModal}"> <span class="icon"> <span class="fas fa-plus"></span> </span> </button> <button class="button is-warning is-rounded" onclick="{readAssignHouse}" style="margin-left:2px"> <span class="icon"> <span class="fas fa-sync-alt"></span> </span> </button> </div> </div> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th class="slno">SL</th> <th>House</th> <th>Captain</th> <th>Vice-Captain</th> <th>No of Students</th> <th></th> </tr> </thead> <tbody> <tr each="{c, i in houses}"> <td>{i+1}</td> <td>{c.house_name}</td> <td>{c.captain_name}</td> <td>{c.vice_captain_name}</td> <td>{c.number_of_students}</td> <td class="has-text-right"> <div class="inline-flex rounded border border-grey overflow-hidden" hide="{c.confirmDelete}"> <span><a class="button is-small is-rounded" onclick="{edit.bind(this, c)}">Edit</a></span> <span><a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick="{confirmDelete}">Delete</a></span> <span><a class="button is-small is-rounded" onclick="{assignStudentsFrom.bind(this, c)}">Students</a></span> <span><a class="button is-small is-rounded" onclick="{openCaptainFrom.bind(this, c)}">Captain</a></span> <span><a class="button is-small is-rounded" onclick="{details.bind(this, c)}">Details</a></span> </div> <div class="table-buttons" if="{c.confirmDelete}"> <span disabled="{loading}" class="button is-small is-rounded" onclick="{delete}"><i class="fa fa-check"></i></span> <span disabled="{loading}" class="button is-small has-text-danger is-rounded" onclick="{cancelOperation}"><i class="fa fa-times"></i></span> </div> </td> </tr> </tbody> </table> </section> <div id="houseModal" class="modal "> <div class="modal-background"></div> <div class="modal-card"> <header class="modal-card-head"> <p class="modal-card-title">{title} House</p> </header> <section class="modal-card-body"> <div class="columns"> <div class="column"> <div class="field"> <label class="label" for="role">House</label> <div class="control"> <input class="input" type="text" ref="houseInput"> </div> </div> </div> </div> </section> <footer class="modal-card-foot"> <button class="button is-danger" onclick="{add}">{title}</button> <button class="button" id="item-modal-close" onclick="{closeHouseModal}">Cancel</button> </footer> </div> </div> <section class=" is-fluid" show="{view==\'students\'}"> <div class="level"> <div class="level-left"> <h2 class="title" style="color: #ff3860;">Students Under : {house}</h2> </div> <div class="level-right"> <button class="button is-warning is-rounded" onclick="{backToAssignHouse}"> <span class="icon"> <span class="fas fa-arrow-left"></span> </span> </button> <button class="button is-warning is-rounded ml5" onclick="{refreshStudents}"> <span class="icon"> <span class="fas fa-sync-alt"></span> </span> </button> </div> </div> <div class="box"> <div class="columns"> <div class="column is-narrow"><label class="label">Standard</label></div> <div class="column"> <div class="control"> <div class="select is-fullwidth"> <select ref="standardSelect" onchange="{changeSection}"> <option value="">Select Standard</option> <option each="{classes}" riot-value="{standard_id}">{standard}</option> </select> </div> </div> </div> <div class="column is-narrow"><label class="label">Section</label></div> <div class="column"> <div class="control"> <div class="select is-fullwidth"> <select ref="sectionSelect"> <option value="">Select Section</option> <option each="{tempSections}" riot-value="{section_id}">{section}</option> </select> </div> </div> </div> <div class="column"> <button class="button is-danger has-text-weight-bold" onclick="{refreshStudents}">GO </button> </div> </div> </div> <div class="columns is-multiline is-mobile"> <div class="column"> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th class="slno">Roll</th> <th>Enroll No</th> <th>Free Students</th> <th></th> </tr> </thead> <tbody> <tr each="{c, i in freeStudents}"> <td>{c.roll_number}</td> <td>{c.enroll_number}</td> <td>{c.first_name} {c.middle_name} {c.last_name}</td> <td class="has-text-right"> <input type="checkbox" checked="{selected}" id="{\'freeSubjectCheckBox\'+c.house_id}" onclick="{selectFreeSubject.bind(this,c)}"> </td> </tr> </tbody> </table> </div> <div class="column is-vertical-center is-narrow has-text-centered is-multiline"> <table> <tr> <td> <button class="button" onclick="{assignStudents}" style="margin-top:20px;">Assign students <span style="margin-left:10px" class="fas fa-angle-double-right"></span> </button> </td> </tr> <tr> <td> <button class="button" onclick="{freeUpStandard}" style="margin-top:20px;"><span style="margin-right:10px;" class="fas fa-angle-double-left"></span> Free up students</button> </td> </tr> </table> </div> <div class="column"> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th></th> <th class="slno">Roll No</th> <th>Enroll No</th> <th>Assigned Students</th> </tr> </thead> <tbody> <tr each="{c, i in assignedStudents}"> <td class="has-text-right"> <input type="checkbox" checked="{selected}" id="{\'assignedSubjectCheckBox\'+c.house_id}" onclick="{selectAssigndSubject.bind(this,c)}"> </td> <td>{c.roll_number}</td> <td>{c.enroll_number}</td> <td>{c.first_name} {c.middle_name} {c.last_name}</td> </tr> </tbody> </table> </div> </div> </section> <div id="captainModal" class="modal "> <div class="modal-background"></div> <div class="modal-card"> <header class="modal-card-head"> <p class="modal-card-title">Captain & Vice-Captain of {house_for_captain}</p> </header> <section class="modal-card-body"> <div class="columns"> <div class="column"> <div class="field"> <label class="label" for="role">Captain</label> <div class="control"> <div class="select is-fullwidth"> <select ref="captainSelect"> <option value="">Select Captain</option> <option each="{studentsCaptains}" riot-value="{student_id}">{first_name}{middle_name}{last_name}</option> </select> </div> </div> </div> <div class="field"> <label class="label" for="role">Vice-Captain</label> <div class="control"> <div class="select is-fullwidth"> <select ref="viceCaptainSelect"> <option value="">Select Vice-Captain</option> <option each="{studentsCaptains}" riot-value="{student_id}">{first_name}{middle_name}{last_name}</option> </select> </div> </div> </div> </div> </div> </section> <footer class="modal-card-foot"> <button class="button is-danger" onclick="{updateCaptain}">Submit</button> <button class="button" id="item-modal-close" onclick="{closeCaptainForm}">Cancel</button> </footer> </div> </div> <section class="is-fluid" show="{view==\'details\'}"> <div class="level no-print"> <div class="level-left"> <h2 class="title" style="color: #ff3860;">House: {house_for_captain}</h2> </div> <div class="level-right"> <button class="button is-warning is-rounded" onclick="{backToAssignHouse}"> <span class="icon"> <span class="fas fa-arrow-left"></span> </span> </button> </div> </div> <center> <h6 class="title">House: {house_for_captain}</h6> </center> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th class="slno">SL</th> <th>Enroll No</th> <th>Class</th> <th>Student\'s Name</th> <th>Father\'s Name</th> <th>SMS</th> </tr> </thead> <tbody> <tr each="{c, i in studentsDetails}"> <td>{i+1}</td> <td>{c.enroll_number}</td> <td>{c.standard}</td> <td>{c.name}</td> <td>{c.f_name}</td> <td>{c.mobile}</td> </tr> </tbody> </table> </section>', '', '', function(opts) {
	var self = this
    self.on("mount", function(){
      self.title = 'Add'
      self.title_exams = 'Add'
      self.view = 'student-assign-houses'
      self.loading = false;
      self.update()
      flatpickr(".date", {
        allowInput: true,
        dateFormat: "d/m/Y",
      })
      self.readAssignHouse()
      self.readClass()
      self.readSection()
    })
    self.on("unmount", function(){
      studentAssignHouseStore.off('house_changed', AssignHouseChanged)
      studentAssignHouseStore.off('add_house_changed',AddAssignHouseChanged)
      studentAssignHouseStore.off('delete_house_changed',DeleteAssignHouseChanged)

      studentAssignHouseStore.off('read_classes_changed',ClassesChanged)
      studentAssignHouseStore.off('read_section_changed',SectionChanged)

      studentAssignHouseStore.off('read_students_changed',ReadStudentsChanged)
      studentAssignHouseStore.off('assign_students_changed',AssignStandardChanged)

      studentAssignHouseStore.off('read_student_by_house_changed',ReadStudentsByHouseChanged)
      studentAssignHouseStore.off('update_house_captain_changed',UpdateHouseCaptainChanged)
      studentAssignHouseStore.off('read_student_by_house_details_changed',ReadStudentsByHouseDetailsChanged)
    })

    self.readClass = () => {
       self.loading = true;
       studentAssignHouseStore.trigger('read_classes')
    }

    self.readSection = () => {
       self.loading = true;
       studentAssignHouseStore.trigger('read_section')
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

    self.readAssignHouse = () => {
       self.loading = true;
       studentAssignHouseStore.trigger('read_houses')
    }

    self.openHouseModal = () => {
      self.title = 'Add'
      $("#houseModal").addClass("is-active");
    }

    self.closeHouseModal = () => {
      $("#houseModal").removeClass("is-active");
    }

    self.add = () => {
      if(!self.refs.houseInput.value){
        toastr.info("Please enter House and try again")
      }else{
        self.loading = true
        if(self.title=='Add'){
          studentAssignHouseStore.trigger('add_house', self.refs.houseInput.value)
        }else if(self.title=='Update'){
          studentAssignHouseStore.trigger('update_house', self.refs.houseInput.value,self.edit_id)
        }
      }
    }

    self.edit = (c,e) => {
      console.log(c)
      self.title='Update'
      $("#houseModal").addClass("is-active");
      self.refs.houseInput.value = c.house_name
      self.edit_id = c.house_id
    }

    self.cancelOperation = (e) => {
      self.houses.map(c => {
          c.confirmDelete = false
          c.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.houses.map(c => {
        if(c.house_id != e.item.c.house_id){
          c.confirmDelete = false
        }else{
          c.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      studentAssignHouseStore.trigger('delete_house', e.item.c.house_id)
    }

    self.assignStudentsFrom = (c) => {
      self.house = c.house_name
      self.house_id = c.house_id
      self.view='students'
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
        studentAssignHouseStore.trigger('read_students', self.house_id, self.refs.standardSelect.value, self.refs.sectionSelect.value)
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
      console.log(self.house_id)
      console.log(students_to_assign)

      if(students_to_assign.length==0){
        toastr.error('Please Select Student To Assign House.')
        return
      }else{
        self.loading = true
        studentAssignHouseStore.trigger('assign_students', self.house_id, students_to_assign)
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
        studentAssignHouseStore.trigger('free_up_student', self.house_id, students_to_free)
      }
    }

    self.backToAssignHouse = () =>{
      self.view='student-assign-houses'
    }

    self.details = (c,e) => {
      self.house_for_captain = c.house_name
      self.view = 'details'
      studentAssignHouseStore.trigger('read_student_by_house_details', c.house_id)
    }

    self.openCaptainFrom = (c,e) => {
      self.house_for_captain = c.house_name
      self.house_id_captain = c.house_id
      self.captain_id = c.captain_id
      self.vice_captain_id = c.vice_captain_id
      studentAssignHouseStore.trigger('read_student_by_house', c.house_id)
    }

    self.closeCaptainForm = () => {
      $("#captainModal").removeClass("is-active");
    }

    self.updateCaptain = () => {

      let error = '';

      if(self.refs.captainSelect.value==''){
        error = error + "Please select Captain, "
      }

      if(self.refs.viceCaptainSelect.value==''){
        error = error + "Please select vice captain, "
      }

      if(self.refs.viceCaptainSelect.value==self.refs.captainSelect.value){
        error = error + "captain and vice captain can't be same, "
      }

      if(error.length!=0){
        toastr.error(error)
        return
      }else{
        self.loading = true
        studentAssignHouseStore.trigger('update_house_captain', self.house_id_captain, self.refs.captainSelect.value, self.refs.viceCaptainSelect.value)
      }

    }

    studentAssignHouseStore.on('house_changed',AssignHouseChanged)
    function AssignHouseChanged(houses){
      console.log(houses)
      self.loading = false
      self.houses = []
      self.houses = houses
      self.update()
      console.log(self.houses)
    }

    studentAssignHouseStore.on('add_house_changed',AddAssignHouseChanged)
    function AddAssignHouseChanged(houses){
      self.refs.houseInput.value=''
      self.closeHouseModal()
      self.loading = false
      self.houses = []
      self.houses = houses
      self.update()
      console.log(self.houses)
    }

    studentAssignHouseStore.on('delete_house_changed',DeleteAssignHouseChanged)
    function DeleteAssignHouseChanged(houses){
      self.loading = false
      self.houses = []
      self.houses = houses
      self.update()
      console.log(self.houses)
    }

   studentAssignHouseStore.on('read_classes_changed',ClassesChanged)
    function ClassesChanged(classes){
      self.loading = false
      self.classes = []
      self.classes = classes
      self.update()
      console.log(self.classes)
    }

    studentAssignHouseStore.on('read_section_changed',SectionChanged)
    function SectionChanged(sections){
      self.loading = false
      self.sections = []
      self.sections = sections
      self.update()
    }

    studentAssignHouseStore.on('read_students_changed',ReadStudentsChanged)
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
      self.view='students'
      self.update()
    }

    studentAssignHouseStore.on('assign_students_changed',AssignStandardChanged)
    function AssignStandardChanged(students_assigned){
      self.loading = false

      self.refreshStudents()

    }

    studentAssignHouseStore.on('read_student_by_house_changed',ReadStudentsByHouseChanged)
    function ReadStudentsByHouseChanged(students){
      self.loading = false
      self.studentsCaptains = []
      self.studentsCaptains = students
      $("#captainModal").addClass("is-active");
      self.update()
      self.refs.captainSelect.value=self.captain_id
      self.refs.viceCaptainSelect.value=self.vice_captain_id
    }

    studentAssignHouseStore.on('update_house_captain_changed',UpdateHouseCaptainChanged)
    function UpdateHouseCaptainChanged(students){
       $("#captainModal").removeClass("is-active");
       self.readAssignHouse()
    }

    studentAssignHouseStore.on('read_student_by_house_details_changed',ReadStudentsByHouseDetailsChanged)
    function ReadStudentsByHouseDetailsChanged(students){
      self.loading = false
      self.studentsDetails = []
      self.studentsDetails = students
      self.update()
    }

});
riot.tag2('student-assign-section', '<loading-bar if="{loading}"></loading-bar> <section class=" is-fluid"> <div class="level"> <div class="level-left"> <h2 class="title" style="color: #ff3860;">Assign Sections</h2> </div> <div class="level-right"> </div> </div> <div class="columns is-multiline is-mobile"> <div class="column"> <div class="box"> <div class="columns"> <div class="column is-narrow"><label class="label">Standard</label></div> <div class="column is-narrow" style="width:150px"> <div class="control"> <div class="select is-fullwidth"> <select ref="standardSelect" id="standard" onchange="{changeSection}"> <option value="">Select Standard</option> <option each="{classes}" riot-value="{standard_id}">{standard}</option> </select> </div> </div> </div> <div class="column is-narrow"><label class="label">Section</label></div> <div class="column is-narrow" style="width:150px"> <div class="control"> <div class="select is-fullwidth"> <select ref="sectionSelect" id="section"> <option value="">Select Section</option> <option each="{tempSections}" riot-value="{section_id}">{section}</option> </select> </div> </div> </div> <div class="column"> <button class="button is-danger has-text-weight-bold" onclick="{refreshStudents}">GO </button> </div> </div> </div> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th>Roll No</th> <th>Enroll No</th> <th>Student Name</th> <th></th> </tr> </thead> <tbody> <tr each="{c, i in freeStudents}"> <td>{c.roll_number}</td> <td>{c.enroll_number}</td> <td>{c.first_name} {c.middle_name} {c.last_name}</td> <td class="has-text-right"> <input type="checkbox" checked="{selected}" id="{\'freeSubjectCheckBox\'+c.student_id}" onclick="{selectFreeStudent.bind(this,c)}"> </td> </tr> </tbody> </table> </div> <div class="column is-vertical-center is-narrow has-text-centered is-multiline" style="margin-top:125px;"> <table> <tr> <td> <button class="button" onclick="{assignStudents}" style="margin-top:20px;">Assign section <span style="margin-left:10px" class="fas fa-angle-double-right"></span> </button> </td> </tr> <tr> <td> <button class="button" onclick="{freeUpStudent}" style="margin-top:20px;"><span style="margin-right:10px;" class="fas fa-angle-double-left"></span> Free up section</button> </td> </tr> </table> </div> <div class="column"> <div class="box"> <div class="columns"> <div class="column is-narrow"><label class="label">Section</label></div> <div class="column is-narrow"> <div class="control"> <div class="select is-fullwidth"> <select ref="sectionSelectSecond" id="section"> <option value="">Select Section</option> <option each="{tempSections}" riot-value="{section_id}">{section}</option> </select> </div> </div> </div> </div> </div> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th></th> <th>Roll No</th> <th>Enroll Number</th> <th>Student Name</th> </tr> </thead> <tbody> <tr each="{c, i in assignedStudents}"> <td class="has-text-right"> <input type="checkbox" checked="{selected}" id="{\'assignedSubjectCheckBox\'+c.student_id}" onclick="{selectAssigndStudent.bind(this,c)}"> </td> <td>{c.roll_number}</td> <td>{c.enroll_number}</td> <td>{c.first_name} {c.middle_name} {c.last_name}</td> </tr> </tbody> </table> </div> </div> </section>', '', '', function(opts) {
	var self = this
    self.on("mount", function(){
      self.title = 'Add'
      self.title_exams = 'Add'
      self.view = 'student-assign-sections'
      self.loading = false;
      self.update()

      self.readClass()
      self.readSection()
    })
    self.on("unmount", function(){
      studentAssignSectionStore.off('read_classes_changed',ClassesChanged)
      studentAssignSectionStore.off('read_section_changed',SectionChanged)
      studentAssignSectionStore.off('read_students_changed',ReadSectionsChanged)
      studentAssignSectionStore.off('assign_students_changed',AssignSectionsChanged)
    })

    self.readClass = () => {
       self.loading = true;
       studentAssignSectionStore.trigger('read_classes')
    }

    self.readSection = () => {
       self.loading = true;
       studentAssignSectionStore.trigger('read_section')
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

    self.refreshStudents = () =>{

      let error = '';

      if(self.refs.standardSelect.value==''){
        error = error + "Please select standard, "
      }

      if(self.refs.sectionSelect.value==''){
        error = error + "Please select section of student, "
      }

      if(self.refs.sectionSelectSecond.value==''){
        error = error + "Please select section to transfer, "
      }

      if(error.length!=0){
        toastr.error(error)
        return
      }else{
        self.loading = true
        studentAssignSectionStore.trigger('read_students', self.refs.standardSelect.value, self.refs.sectionSelect.value, self.refs.sectionSelectSecond.value)
      }

    }

    self.selectFreeStudent = (student,e) => {
        self.freeStudents.map(i=>{
          if(student.student_id==i.student_id){
            i.selected=!i.selected
          }
        })
    }

    self.selectAssigndStudent = (student,e) => {
        self.assignedStudents.map(i=>{
          if(student.student_id==i.student_id){
            i.selected=!i.selected
          }
        })
        console.log(self.assignedStudents)
    }

    self.assignStudents = () =>{
      let subjects_to_assign = self.freeStudents.filter(c=>{
        return c.selected == true
      })
      console.log(subjects_to_assign)

      if(subjects_to_assign.length==0){
        toastr.error('Please select student to assign.')
        return
      }else{
        self.loading = true
        studentAssignSectionStore.trigger('assign_students', self.refs.sectionSelectSecond.value, subjects_to_assign)
      }
    }

    self.freeUpStudent = () =>{
      let subjects_to_free = self.assignedStudents.filter(c=>{
        return c.selected == true
      })

      if(subjects_to_free.length==0){
        toastr.error('Please select student to free .')
        return
      }else{
        self.loading = true
        studentAssignSectionStore.trigger('free_up_students', self.refs.sectionSelect.value, subjects_to_free)
      }
    }

    studentAssignSectionStore.on('read_classes_changed',ClassesChanged)
    function ClassesChanged(classes){
      self.loading = false
      self.classes = []
      self.classes = classes
      self.update()
      console.log(self.classes)
    }

    studentAssignSectionStore.on('read_section_changed',SectionChanged)
    function SectionChanged(sections){
      self.loading = false
      self.sections = []
      self.sections = sections
      self.update()
    }

    studentAssignSectionStore.on('read_students_changed',ReadSectionsChanged)
    function ReadSectionsChanged(freeStudents,assignedStudents){
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
      self.update()
    }

    studentAssignSectionStore.on('assign_students_changed',AssignSectionsChanged)
    function AssignSectionsChanged(subjects_assigned){
      self.loading = false

      self.refreshStudents()

    }

});
riot.tag2('student-assign-subject', '<loading-bar if="{loading}"></loading-bar> <section class=" is-fluid"> <div class="level"> <div class="level-left"> <h2 class="title" style="color: #ff3860;">Assign Subjects</h2> </div> <div class="level-right"> </div> </div> <div class="box"> <div class="columns"> <div class="column is-narrow"><label class="label">Standard</label></div> <div class="column is-narrow"> <div class="control"> <div class="select is-fullwidth"> <select ref="standardSelect" id="standard"> <option value="">Select Standard</option> <option each="{classes}" riot-value="{standard_id}">{standard}</option> </select> </div> </div> </div> <div class="column"> <button class="button is-danger has-text-weight-bold" onclick="{refreshSubjects}">GO </button> </div> </div> </div> <div class="columns is-multiline is-mobile"> <div class="column"> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th>Free Subjects</th> <th>Subjects Short Name</th> <th></th> </tr> </thead> <tbody> <tr each="{c, i in freeSubjects}"> <td>{c.subject_name}</td> <td>{c.subject_short_name}</td> <td class="has-text-right"> <input type="checkbox" checked="{selected}" id="{\'freeSubjectCheckBox\'+c.subject_id}" onclick="{selectFreeSubject.bind(this,c)}"> </td> </tr> </tbody> </table> </div> <div class="column is-vertical-center is-narrow has-text-centered is-multiline"> <table> <tr> <td> <button class="button" onclick="{assignSubjects}" style="margin-top:20px;">Assign subjects <span style="margin-left:10px" class="fas fa-angle-double-right"></span> </button> </td> </tr> <tr> <td> <button class="button" onclick="{freeUpSubject}" style="margin-top:20px;"><span style="margin-right:10px;" class="fas fa-angle-double-left"></span> Free up subjects</button> </td> </tr> </table> </div> <div class="column"> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th></th> <th>Assigned Subjects</th> <th>Subjects Short Name</th> </tr> </thead> <tbody> <tr each="{c, i in assignedSubjects}"> <td class="has-text-right"> <input type="checkbox" checked="{selected}" id="{\'assignedSubjectCheckBox\'+c.id}" onclick="{selectAssigndSubject.bind(this,c)}"> </td> <td>{c.subject_name}</td> <td>{c.subject_short_name}</td> </tr> </tbody> </table> </div> </div> </section>', '', '', function(opts) {
	var self = this
    self.on("mount", function(){
      self.title = 'Add'
      self.title_exams = 'Add'
      self.view = 'student-assign-subjects'
      self.loading = false;
      self.update()

      self.readClass()
    })
    self.on("unmount", function(){
      studentAssignSubjectStore.off('read_classes_changed',ClassesChanged)
      studentAssignSubjectStore.off('read_subjects_changed',ReadSubjectsChanged)
      studentAssignSubjectStore.off('assign_subjects_changed',AssignSubjectsChanged)
    })

    self.readClass = () => {
       self.loading = true;
       studentAssignSubjectStore.trigger('read_classes')
    }

    self.refreshSubjects = () =>{

      let error = '';

      if(self.refs.standardSelect.value==''){
        error = error + "Please select standard, "
      }

      if(error.length!=0){
        toastr.error(error)
        return
      }else{
        self.loading = true
        studentAssignSubjectStore.trigger('read_subjects', self.refs.standardSelect.value)
      }

    }

    self.selectFreeSubject = (subject,e) => {
        self.freeSubjects.map(i=>{
          if(subject.subject_id==i.subject_id){
            i.selected=!i.selected
          }
        })
    }

    self.selectAssigndSubject = (subject,e) => {
        self.assignedSubjects.map(i=>{
          if(subject.id==i.id){
            i.selected=!i.selected
          }
        })
        console.log(self.assignedSubjects)
    }

    self.assignSubjects = () =>{
      let subjects_to_assign = self.freeSubjects.filter(c=>{
        return c.selected == true
      })
      console.log(subjects_to_assign)

      if(subjects_to_assign.length==0){
        toastr.error('Please select subject to assign.')
        return
      }else{
        self.loading = true
        studentAssignSubjectStore.trigger('assign_subjects', self.refs.standardSelect.value, subjects_to_assign)
      }
    }

    self.freeUpSubject = () =>{
      let subjects_to_free = self.assignedSubjects.filter(c=>{
        return c.selected == true
      })

      if(subjects_to_free.length==0){
        toastr.error('Please select subjects to free .')
        return
      }else{
        self.loading = true
        studentAssignSubjectStore.trigger('free_up_subject', self.refs.standardSelect.value, subjects_to_free)
      }
    }

    studentAssignSubjectStore.on('read_classes_changed',ClassesChanged)
    function ClassesChanged(classes){
      self.loading = false
      self.classes = []
      self.classes = classes
      self.update()
      console.log(self.classes)
    }

    studentAssignSubjectStore.on('read_section_changed',SectionChanged)
    function SectionChanged(sections){
      self.loading = false
      self.sections = []
      self.sections = sections
      self.update()
    }

    studentAssignSubjectStore.on('read_subjects_changed',ReadSubjectsChanged)
    function ReadSubjectsChanged(freeSubjects,assignedSubjects){
      self.loading = false
      self.freeSubjects = []
      self.freeSubjects = freeSubjects
      self.freeSubjects.map(c => {
          c.selected=false
      })
      console.log(freeSubjects)
      self.assignedSubjects = []
      self.assignedSubjects = assignedSubjects
      self.assignedSubjects.map(c => {
          c.selected=false
      })
      self.view='subjects'
      self.update()
    }

    studentAssignSubjectStore.on('assign_subjects_changed',AssignSubjectsChanged)
    function AssignSubjectsChanged(subjects_assigned){
      self.loading = false

      self.refreshSubjects()

    }

});
riot.tag2('student-group-student', '<loading-bar if="{loading}"></loading-bar> <section class=" is-fluid" show="{view==\'student-group-students\'}"> <div class="level"> <div class="level-left"> <h2 class="title" style="color: #ff3860;">Group Student</h2> </div> <div class="level-right"> <button class="button is-warning is-rounded" onclick="{openStudentGroupModal}"> <span class="icon"> <span class="fas fa-plus"></span> </span> </button> <button class="button is-warning is-rounded" onclick="{readStudentGroup}" style="margin-left:2px"> <span class="icon"> <span class="fas fa-sync-alt"></span> </span> </button> <button class="button is-warning is-rounded" onclick="{readHiddenGroup}" style="margin-left:2px">Show Hidden Group</button> </div> </div> <div class="box"> <div class="columns"> <div class="column is-narrow"><label class="label">Standard</label></div> <div class="column"> <div class="control"> <div class="select is-fullwidth"> <select ref="standardSelect" id="standard" onchange="{changeSection}"> <option value="">Select Standard</option> <option each="{classes}" riot-value="{standard_id}">{standard}</option> </select> </div> </div> </div> <div class="column is-narrow"><label class="label">Section</label></div> <div class="column"> <div class="control"> <div class="select is-fullwidth"> <select ref="sectionSelect" id="section"> <option value="">Select Section</option> <option each="{tempSections}" riot-value="{section_id}">{section}</option> </select> </div> </div> </div> <div class="column"> <button class="button is-danger has-text-weight-bold" onclick="{readStudentGroup}">GO </button> </div> </div> </div> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th class="slno">SL</th> <th>Group</th> <th>Details</th> <th></th> </tr> </thead> <tbody> <tr each="{c, i in studentGroups}"> <td>{i+1}</td> <td>{c.group_name}</td> <td>{c.group_detail}</td> <td class="has-text-right"> <div class="inline-flex rounded border border-grey overflow-hidden" hide="{c.confirmDelete}"> <span><a class="button is-small is-rounded" onclick="{edit.bind(this, c)}">Edit</a></span> <span><a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick="{confirmDelete}">Delete</a></span> <span><a class="button is-small is-rounded" onclick="{assignStudentsFrom.bind(this, c)}">Students</a></span> <span><a class="button is-small is-rounded" onclick="{assignSubjectsFrom.bind(this, c)}">Subjects</a></span> <span><a class="button is-small is-rounded" onclick="{details.bind(this, c)}">Print Group</a></span> <span><a class="button is-small is-rounded" onclick="{hideGroup.bind(this, c)}">Hide Group</a></span> </div> <div class="table-buttons" if="{c.confirmDelete}"> <span disabled="{loading}" class="button is-small is-rounded" onclick="{delete}"><i class="fa fa-check"></i></span> <span disabled="{loading}" class="button is-small has-text-danger is-rounded" onclick="{cancelOperation}"><i class="fa fa-times"></i></span> </div> </td> </tr> </tbody> </table> </section> <div id="studentGroupModal" class="modal "> <div class="modal-background"></div> <div class="modal-card"> <header class="modal-card-head"> <p class="modal-card-title">{title} Student Group</p> </header> <section class="modal-card-body"> <div class="columns"> <div class="column"> <div class="field"> <label class="label" for="role">Student Group</label> <div class="control"> <input class="input" type="text" ref="studentGroupInput"> </div> </div> <div class="field"> <label class="label" for="role">Details</label> <div class="control"> <textarea class="textarea" type="text" rows="2" ref="detailsInput"></textarea> </div> </div> </div> </div> </section> <footer class="modal-card-foot"> <button class="button is-danger" onclick="{add}">{title}</button> <button class="button" id="item-modal-close" onclick="{closeStudentGroupModal}">Cancel</button> </footer> </div> </div> <section class=" is-fluid" show="{view==\'students\'}"> <div class="level"> <div class="level-left"> <h2 class="title" style="color: #ff3860;">Students Under : {class}</h2> </div> <div class="level-right"> <button class="button is-warning is-rounded" onclick="{backToAssignStudentGroup}"> <span class="icon"> <span class="fas fa-arrow-left"></span> </span> </button> <button class="button is-warning is-rounded ml5" onclick="{refreshStudents}"> <span class="icon"> <span class="fas fa-sync-alt"></span> </span> </button> </div> </div> <div class="columns is-multiline is-mobile"> <div class="column"> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th class="slno">Roll</th> <th>Enroll No</th> <th>Free Students</th> <th></th> </tr> </thead> <tbody> <tr each="{c, i in freeStudents}"> <td>{c.roll_number}</td> <td>{c.enroll_number}</td> <td>{c.first_name} {c.middle_name} {c.last_name}</td> <td class="has-text-right"> <input type="checkbox" checked="{selected}" id="{\'freeStudentCheckBox\'+c.group_id}" onclick="{selectFreeStudent.bind(this,c)}"> </td> </tr> </tbody> </table> </div> <div class="column is-vertical-center is-narrow has-text-centered is-multiline"> <table> <tr> <td> <button class="button" onclick="{assignStudents}" style="margin-top:20px;">Assign students <span style="margin-left:10px" class="fas fa-angle-double-right"></span> </button> </td> </tr> <tr> <td> <button class="button" onclick="{freeUpStandard}" style="margin-top:20px;"><span style="margin-right:10px;" class="fas fa-angle-double-left"></span> Free up students</button> </td> </tr> </table> </div> <div class="column"> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th></th> <th class="slno">Roll No</th> <th>Enroll No</th> <th>Assigned Students</th> </tr> </thead> <tbody> <tr each="{c, i in assignedStudents}"> <td class="has-text-right"> <input type="checkbox" checked="{selected}" id="{\'assignedStudentCheckBox\'+c.group_id}" onclick="{selectAssigndStudent.bind(this,c)}"> </td> <td>{c.roll_number}</td> <td>{c.enroll_number}</td> <td>{c.first_name} {c.middle_name} {c.last_name}</td> </tr> </tbody> </table> </div> </div> </section> <section class=" is-fluid" show="{view==\'subjects\'}"> <div class="level"> <div class="level-left"> <h2 class="title" style="color: #ff3860;">Subjects Under : {class}</h2> </div> <div class="level-right"> <button class="button is-warning is-rounded" onclick="{backToAssignStudentGroup}"> <span class="icon"> <span class="fas fa-arrow-left"></span> </span> </button> <button class="button is-warning is-rounded ml5" onclick="{refreshSubjects}"> <span class="icon"> <span class="fas fa-sync-alt"></span> </span> </button> </div> </div> <div class="columns is-multiline is-mobile"> <div class="column"> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th>Free Subjects</th> <th>Subjects Short Name</th> <th></th> </tr> </thead> <tbody> <tr each="{c, i in freeSubjects}"> <td>{c.subject_name}</td> <td>{c.subject_short_name}</td> <td class="has-text-right"> <input type="checkbox" checked="{selected}" id="{\'freeSubjectCheckBox\'+c.subject_id}" onclick="{selectFreeSubject.bind(this,c)}"> </td> </tr> </tbody> </table> </div> <div class="column is-vertical-center is-narrow has-text-centered is-multiline"> <table> <tr> <td> <button class="button" onclick="{assignSubjects}" style="margin-top:20px;">Assign subjects <span style="margin-left:10px" class="fas fa-angle-double-right"></span> </button> </td> </tr> <tr> <td> <button class="button" onclick="{freeUpSubject}" style="margin-top:20px;"><span style="margin-right:10px;" class="fas fa-angle-double-left"></span> Free up subjects</button> </td> </tr> </table> </div> <div class="column"> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th></th> <th>Assigned Subject Name</th> <th>Subjects Short Name</th> <th style="width:150px">Order No</th> </tr> </thead> <tbody> <tr each="{c, i in assignedSubjects}"> <td class="has-text-right"> <input type="checkbox" checked="{selected}" id="{\'assignedSubjectCheckBox\'+c.subject_id}" onclick="{selectAssigndSubject.bind(this,c)}"> </td> <td>{c.subject_name}</td> <td>{c.subject_short_name}</td> <td><input type="text" class="input" id="{\'orderInput\'+c.subject_id}" riot-value="{c.order_no}"></td> </tr> </tbody> </table> <div class="level"> <div class="level-left"> </div> <div class="level-right"> <button class="button is-danger ml5" onclick="{saveOrderNumber}">Save Order No</button> <button class="button is-danger ml5" onclick="{openCopyOrderNumberForm}">Copy Order No</button> </div> </div> </div> </div> </section> <div id="copyOrderNumberModal" class="modal "> <div class="modal-background"></div> <div class="modal-card"> <header class="modal-card-head"> <p class="modal-card-title">Copy Order Number</p> </header> <section class="modal-card-body"> <div class="columns"> <div class="column"> <div class="field"> <label class="label" for="role">Standard</label> <div class="control"> <div class="select is-fullwidth"> <select ref="standardSelectCopyOrderNo" id="standardForCopyOrderNo" disabled> <option each="{classes}" riot-value="{standard_id}">{standard}</option> </select> </div> </div> </div> <div class="field"> <label class="label" for="role">Section</label> <div class="control"> <div class="select is-fullwidth"> <select ref="sectionSelectCopyOrderNo" id="sectionForCopyOrderNo" onchange="{readGroups}"> <option value="">Select Section</option> <option each="{tempSectionsForCopyOrderNo}" riot-value="{section_id}">{section}</option> </select> </div> </div> </div> <div class="field"> <label class="label" for="role">Group</label> <div class="control"> <div class="select is-fullwidth"> <select ref="groupSelect"> <option value="">Select Group</option> <option each="{tempSubjectGroups}" riot-value="{group_id}">{group_name}</option> </select> </div> </div> </div> </div> </div> </section> <footer class="modal-card-foot"> <button class="button is-danger" onclick="{copyOrderNumber}">Submit</button> <button class="button" id="item-modal-close" onclick="{closeCopyOrderNumberForm}">Cancel</button> </footer> </div> </div> <section class="is-fluid" show="{view==\'details\'}"> <div class="level no-print"> <div class="level-left"> <h2 class="title" style="color: #ff3860;">Group Student</h2> </div> <div class="level-right"> <button class="button is-warning is-rounded" onclick="{backToAssignStudentGroup}"> <span class="icon"> <span class="fas fa-arrow-left"></span> </span> </button> </div> </div> <center> <h6> <strong>Class:</strong> {class} <strong>Group:</strong> {group_details} </h6> </center> <h6><strong>Students List</strong></h6> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th class="slno">SL</th> <th>Roll</th> <th>Enroll No</th> <th>Name</th> </tr> </thead> <tbody> <tr each="{c, i in studentsDetails}"> <td>{i+1}</td> <td>{c.roll_number}</td> <td>{c.enroll_number}</td> <td>{c.name}</td> </tr> </tbody> </table> <h6><strong>Subjects List</strong></h6> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th class="slno">SL</th> <th>Subject Name</th> <th>Subject Short Name</th> </tr> </thead> <tbody> <tr each="{c, i in subjectsDetails}"> <td>{i+1}</td> <td>{c.subject_name}</td> <td>{c.subject_short_name}</td> </tr> </tbody> </table> </section> <div id="hiddenGroupModal" class="modal "> <div class="modal-background"></div> <div class="modal-card"> <header class="modal-card-head"> <p class="modal-card-title">Hidden Groups</p> </header> <section class="modal-card-body"> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th class="slno">SL</th> <th>Group</th> <th>Details</th> <th></th> </tr> </thead> <tbody> <tr each="{c, i in hiddenStudentsGroups}"> <td>{i+1}</td> <td>{c.group_name}</td> <td>{c.group_detail}</td> <td class="has-text-right"> <span><a class="button is-small is-rounded is-danger" onclick="{unHideGroup.bind(this, c)}">Un-hide Group</a></span> </td> </tr> </tbody> </table> </section> <footer class="modal-card-foot"> <button class="button" id="item-modal-close" onclick="{closeHiddenGroupModel}">Cancel</button> </footer> </div> </div>', '', '', function(opts) {
	var self = this
    self.on("mount", function(){
      self.title = 'Add'
      self.title_exams = 'Add'
      self.view = 'student-group-students'
      self.loading = false;
      self.update()

      self.readClass()
      self.readSection()
    })
    self.on("unmount", function(){
      studentStudentGroupStore.off('read_classes_changed',ClassesChanged)
      studentStudentGroupStore.off('read_section_changed',SectionChanged)
      studentStudentGroupStore.off('read_student_groups_changed',readStudentGroupsChanged)
      studentStudentGroupStore.off('add_student_group_changed',AddStudentGroupChanged)
      studentStudentGroupStore.off('delete_student_group_changed',DeleteStudentGroupChanged)

      studentStudentGroupStore.off('read_students_changed',ReadStudentsChanged)
      studentStudentGroupStore.off('assign_students_changed',AssignStandardChanged)

      studentStudentGroupStore.off('read_subjects_changed',ReadSubjectsChanged)
      studentStudentGroupStore.off('assign_subjects_changed',AssignSubjectsChanged)
      studentStudentGroupStore.off('save_order_number_changed',orderNumberChanged)
      studentStudentGroupStore.off('read_subject_groups_for_copy_order_no_changed',ReadSubjectGroupsForCopyOrderNumberChanged)
      studentStudentGroupStore.off('copy_order_number_changed',CopyOrderNumberChanged)

      studentStudentGroupStore.off('read_student_group_details_changed',ReadStudentGroupDetailsChanged)

      studentStudentGroupStore.off('hide_group_changed',HideGroupChanged)
      studentStudentGroupStore.off('read_hidden_groups_changed',ReadHiddenGroupChanged)
      studentStudentGroupStore.off('read_unhide_group_changed',DeleteHiddenGroupChanged)
    })

    self.readClass = () => {
       self.loading = true;
       studentStudentGroupStore.trigger('read_classes')
    }

    self.readSection = () => {
       self.loading = true;
       studentStudentGroupStore.trigger('read_section')
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

    self.readStudentGroup = () => {
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
        studentStudentGroupStore.trigger('read_student_groups', self.refs.standardSelect.value, self.refs.sectionSelect.value)
      }

    }

    self.openStudentGroupModal = () => {
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
        self.title = 'Add'
        $("#studentGroupModal").addClass("is-active");
      }
    }

    self.closeStudentGroupModal = () => {
      $("#studentGroupModal").removeClass("is-active");
    }

    self.add = () => {

      let error = '';

      if(self.refs.standardSelect.value==''){
        error = error + "Please select standard, "
      }

      if(self.refs.sectionSelect.value==''){
        error = error + "Please select section, "
      }

      if(!self.refs.studentGroupInput.value){
        toastr.info("Please enter student group and try again")
      }

      if(error.length!=0){
        toastr.error(error)
        return
      }else{
        var obj={};
        obj['standard_id']=self.refs.standardSelect.value
        obj['section_id']=self.refs.sectionSelect.value
        obj['group_name']=self.refs.studentGroupInput.value
        obj['group_detail']=self.refs.detailsInput.value

        self.loading = true
        if(self.title=='Add'){
          studentStudentGroupStore.trigger('add_student_group', obj)
        }else if(self.title=='Update'){
          studentStudentGroupStore.trigger('update_student_group', obj, self.edit_id)
        }
      }
    }

    self.edit = (c,e) => {
      console.log(c)
      self.title='Update'
      $("#studentGroupModal").addClass("is-active");
      self.refs.studentGroupInput.value = c.group_name
      self.refs.detailsInput.value = c.group_detail
      self.edit_id = c.group_id
    }

    self.cancelOperation = (e) => {
      self.studentGroups.map(c => {
          c.confirmDelete = false
          c.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.studentGroups.map(c => {
        if(c.group_id != e.item.c.group_id){
          c.confirmDelete = false
        }else{
          c.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      studentStudentGroupStore.trigger('delete_student_group', e.item.c.group_id)
    }

    self.assignStudentsFrom = (c) => {
      self.class = $("#standard option:selected").text() + ' ' + $("#section option:selected").text()
      self.group_id = c.group_id

      self.view='students'
      self.refreshStudents()
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
        studentStudentGroupStore.trigger('read_students', self.group_id, self.refs.standardSelect.value, self.refs.sectionSelect.value)
      }

    }

    self.selectFreeStudent = (student,e) => {
        self.freeStudents.map(i=>{
          if(student.student_id==i.student_id){
            i.selected=!i.selected
          }
        })
    }

    self.selectAssigndStudent = (student,e) => {
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
      console.log(self.group_id)
      console.log(students_to_assign)

      if(students_to_assign.length==0){
        toastr.error('Please Select Student To Assign Student Group.')
        return
      }else{
        self.loading = true
        studentStudentGroupStore.trigger('assign_students', self.group_id, students_to_assign)
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
        studentStudentGroupStore.trigger('free_up_student', self.group_id, students_to_free)
      }
    }

    self.backToAssignStudentGroup = () =>{
      self.view='student-group-students'
    }

    self.assignSubjectsFrom = (c) => {
      self.class = $("#standard option:selected").text() + ' ' + $("#section option:selected").text()
      self.group_id = c.group_id
      self.view='subjects'
      self.refreshSubjects()
    }

    self.refreshSubjects = () =>{

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
        studentStudentGroupStore.trigger('read_subjects', self.group_id, self.refs.standardSelect.value, self.refs.sectionSelect.value)
      }

    }

    self.selectFreeSubject = (subject,e) => {
        self.freeSubjects.map(i=>{
          if(subject.subject_id==i.subject_id){
            i.selected=!i.selected
          }
        })
    }

    self.selectAssigndSubject = (subject,e) => {
        self.assignedSubjects.map(i=>{
          if(subject.subject_id==i.subject_id){
            i.selected=!i.selected
          }
        })
        console.log(self.assignedSubjects)
    }

    self.assignSubjects = () =>{
      let subjects_to_assign = self.freeSubjects.filter(c=>{
        return c.selected == true
      })
      console.log(self.group_id)
      console.log(subjects_to_assign)

      if(subjects_to_assign.length==0){
        toastr.error('Please Select subject To Assign subject.')
        return
      }else{
        self.loading = true
        studentStudentGroupStore.trigger('assign_subjects', self.group_id, subjects_to_assign)
      }
    }

    self.freeUpSubject = () =>{
      let subjects_to_free = self.assignedSubjects.filter(c=>{
        return c.selected == true
      })

      if(subjects_to_free.length==0){
        toastr.error('Please select subjects to free from student group .')
        return
      }else{
        self.loading = true
        studentStudentGroupStore.trigger('free_up_subject', self.group_id, subjects_to_free)
      }
    }

    self.saveOrderNumber = () =>{
      self.assignedSubjects.map(c=>{
        var orderInput = '#orderInput'+c.subject_id
        c.order_no = $(orderInput).val()
      })
      console.log(self.assignedSubjects)
      studentStudentGroupStore.trigger('save_order_number', self.group_id, self.assignedSubjects)
    }

    self.changeSectionForCopyOrderNo = (standard_id) => {
      self.tempSectionsForCopyOrderNo = []
      self.tempSectionsForCopyOrderNo = self.sections.filter(s=>{
        return s.standard_id==standard_id
      })
    }

    self.openCopyOrderNumberForm = (c,e) => {
      self.changeSectionForCopyOrderNo(self.refs.standardSelect.value)
      self.refs.standardSelectCopyOrderNo.value = self.refs.standardSelect.value
      $("#copyOrderNumberModal").addClass("is-active");
      console.log(self.tempSectionsForCopyOrderNo)
    }

    self.closeCopyOrderNumberForm = () => {
      $("#copyOrderNumberModal").removeClass("is-active");
    }

    self.readGroups = () => {
      if(self.refs.sectionSelectCopyOrderNo.value == ''){
        toastr.error('Please select section')
      }else{
        studentStudentGroupStore.trigger('read_subject_groups_for_copy_order_no', self.refs.standardSelect.value, self.refs.sectionSelectCopyOrderNo.value)
      }
    }

    self.copyOrderNumber = () => {

      let error = '';

      if(self.refs.sectionSelectCopyOrderNo.value==''){
        error = error + "Please select section, "
      }

      if(self.refs.sectionSelectCopyOrderNo.value==self.refs.sectionSelect.value){
        error = error + "Yor are in the selected section, "
      }

      if(self.refs.groupSelect.value==''){
        error = error + "Please select group, "
      }

      if(self.refs.groupSelect.value==self.group_id){
        error = error + "You are in the selected group, "
      }

      if(error.length!=0){
        toastr.error(error)
        return
      }else{
        self.loading = true
        studentStudentGroupStore.trigger('copy_order_number', self.refs.groupSelect.value)
      }

    }

    self.details = (c,e) => {
      self.class = $("#standard option:selected").text() + ' ' + $("#section option:selected").text()
      self.group_details = c.group_name
      self.loading = true
      studentStudentGroupStore.trigger('read_student_group_details', c.group_id)
    }

    self.hideGroup = (c,e) => {
      self.loading = true
      studentStudentGroupStore.trigger('hide_group', c.group_id, self.refs.sectionSelect.value)
    }

    self.readHiddenGroup = () => {
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
        studentStudentGroupStore.trigger('read_hidden_groups', self.refs.sectionSelect.value)
      }

    }

    self.closeHiddenGroupModel = () => {
      $("#hiddenGroupModal").removeClass("is-active");
    }

    self.unHideGroup = (c,e) => {
      self.loading = true
      studentStudentGroupStore.trigger('unhide_group', c.group_id, self.refs.sectionSelect.value)
    }

    studentStudentGroupStore.on('read_classes_changed',ClassesChanged)
    function ClassesChanged(classes){
      self.loading = false
      self.classes = []
      self.classes = classes
      self.update()
      console.log(self.classes)
    }

    studentStudentGroupStore.on('read_section_changed',SectionChanged)
    function SectionChanged(sections){
      self.loading = false
      self.sections = []
      self.sections = sections
      self.update()
    }

    studentStudentGroupStore.on('read_student_groups_changed',readStudentGroupsChanged)
    function readStudentGroupsChanged(studentGroups){
      self.loading = false
      self.studentGroups = []
      self.studentGroups = studentGroups
      self.update()
    }

    studentStudentGroupStore.on('add_student_group_changed',AddStudentGroupChanged)
    function AddStudentGroupChanged(studentGroups){
      self.refs.studentGroupInput.value=''
      self.refs.detailsInput.value=''
      self.closeStudentGroupModal()
      self.loading = false
      self.studentGroups = []
      self.studentGroups = studentGroups
      self.update()
    }

    studentStudentGroupStore.on('delete_student_group_changed',DeleteStudentGroupChanged)
    function DeleteStudentGroupChanged(studentGroups){
      self.loading = false
      self.studentGroups = []
      self.studentGroups = studentGroups
      self.update()
      console.log(self.studentGroups)
    }

    studentStudentGroupStore.on('read_students_changed',ReadStudentsChanged)
    function ReadStudentsChanged(freeStudents,assignedStudents){
      console.log('here in students')
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
      self.view='students'
      self.update()
    }

    studentStudentGroupStore.on('assign_students_changed',AssignStandardChanged)
    function AssignStandardChanged(students_assigned){
      self.loading = false

      self.refreshStudents()

    }

    studentStudentGroupStore.on('read_subjects_changed',ReadSubjectsChanged)
    function ReadSubjectsChanged(freeSubjects,assignedSubjects){
      self.loading = false
      self.freeSubjects = []
      self.freeSubjects = freeSubjects
      self.freeSubjects.map(c => {
          c.selected=false
      })
      console.log(freeSubjects)
      self.assignedSubjects = []
      self.assignedSubjects = assignedSubjects
      self.assignedSubjects.map(c => {
          c.selected=false
      })
      self.view='subjects'
      self.update()
    }

    studentStudentGroupStore.on('assign_subjects_changed',AssignSubjectsChanged)
    function AssignSubjectsChanged(subjects_assigned){
      self.loading = false

      self.refreshSubjects()

    }

    studentStudentGroupStore.on('save_order_number_changed',orderNumberChanged)
    function orderNumberChanged(subjects_assigned){
      self.loading = false
    }

    studentStudentGroupStore.on('read_subject_groups_for_copy_order_no_changed',ReadSubjectGroupsForCopyOrderNumberChanged)
    function ReadSubjectGroupsForCopyOrderNumberChanged(subjects){
       self.tempSubjectGroups = []
       self.tempSubjectGroups = subjects
       self.update()
    }

    studentStudentGroupStore.on('copy_order_number_changed',CopyOrderNumberChanged)
    function CopyOrderNumberChanged(subjects){
      self.loading = false
      console.log(subjects)
       self.assignedSubjects.map(s=>{
        subjects.map(o=>{
          if(s.subject_id==o.subject_id){
            s.order_no=o.order_no
          }
        })
       })
       self.closeCopyOrderNumberForm()
       console.log(self.assignedSubjects)
       self.update()
    }

    studentStudentGroupStore.on('read_student_group_details_changed',ReadStudentGroupDetailsChanged)
    function ReadStudentGroupDetailsChanged(students,subjects){
      self.loading = false
      self.studentsDetails = []
      self.studentsDetails = students

      self.subjectsDetails = []
      self.subjectsDetails = subjects

      self.view = 'details'
      self.update()
    }

    studentStudentGroupStore.on('hide_group_changed',HideGroupChanged)
    function HideGroupChanged(info){
      self.loading = false
      if(info.length!=0){
        toastr.error(info)
        self.update()
        return
      }else{
        self.readStudentGroup()
      }
    }

    studentStudentGroupStore.on('read_hidden_groups_changed',ReadHiddenGroupChanged)
    function ReadHiddenGroupChanged(students){
      self.loading = false
      self.hiddenStudentsGroups = []
      self.hiddenStudentsGroups = students
      $("#hiddenGroupModal").addClass("is-active");
      self.update()
    }

    studentStudentGroupStore.on('read_unhide_group_changed',DeleteHiddenGroupChanged)
    function DeleteHiddenGroupChanged(students){
      self.loading = false
      self.readHiddenGroup()
    }

});
riot.tag2('student-login-slip', '<loading-bar if="{loading}"></loading-bar> <section class=" is-fluid" show="{view==\'home\'}"> <div class="level"> <div class="level-left"> <h2 class="title" style="color: #ff3860;">Login Slip</h2> </div> <div class="level-right"> <button class="button is-warning is-rounded has-text-weight-bold" onclick="{printLoginSlipAll}"> Print Login Slip </button> <button class="button is-warning is-rounded has-text-weight-bold ml5" onclick="{generateID}"> Generate ID </button> </div> </div> <div class="box"> <div class="columns"> <div class="column is-narrow"><label class="label">Standard</label></div> <div class="column is-narrow"> <div class="control"> <div class="select is-fullwidth"> <select ref="standardSelect" id="standard" onchange="{changeSection}"> <option value="">Select Standard</option> <option each="{classes}" riot-value="{standard_id}">{standard}</option> </select> </div> </div> </div> <div class="column is-narrow"><label class="label">Section</label></div> <div class="column is-narrow"> <div class="control"> <div class="select is-fullwidth"> <select ref="sectionSelect" id="section"> <option value="">Select Section</option> <option each="{tempSections}" riot-value="{section_id}">{section}</option> </select> </div> </div> </div> <div class="column is-narrow"> <button class="button is-danger has-text-weight-bold" onclick="{refreshStudents}">GO </button> </div> </div> </div> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th class="slno">Sl</th> <th>Roll No</th> <th>Enroll No</th> <th>Login ID</th> <th>Student\'s Name</th> <th>Father\'s Name</th> <th>Active</th> <th></th> </tr> </thead> <tbody> <tr each="{c, i in students}"> <td>{i+1}</td> <td>{c.roll_number}</td> <td>{c.enroll_number}</td> <td>{c.login}</td> <td>{c.student}</td> <td>{c.f_name}</td> <td>{c.is_active}</td> <td class="has-text-right"> <span> <a class="button is-small is-rounded is-danger" show="{c.is_active==\'Y\'}" rel="nofollow" onclick="{allowBlock.bind(this, c)}">Block</a> <a class="button is-small is-rounded is-primary" show="{c.is_active==\'N\'}" rel="nofollow" onclick="{allowBlock.bind(this, c)}">Allow</a> <a class="button is-small is-rounded" onclick="{printLoginSlip.bind(this, c)}">Print</a> <a class="button is-small is-rounded" onclick="{resetPassword.bind(this, c)}">Reset Password</a> </span> </td> </tr> </tbody> </table> </section> <section class=" is-fluid" show="{view==\'print-details\'}"> <div class="level no-print"> <div class="level-left"> <h2 class="title" style="color: #ff3860;">Login Slip</h2> </div> <div class="level-right"> <button class="button is-warning is-rounded" onclick="{backToHome}"> <span class="icon"> <span class="fas fa-arrow-left"></span> </span> </button> </div> </div> <div each="{c, i in studentDetails}"> <table class="table"> <tr><th>Student Name</th><td>{c.student}</td></tr> <tr><th>Class</th><td>{c.standard} {c.section}</td></tr> <tr><th>Enroll Number</th><td>{c.enroll_number}</td></tr> <tr><th>Father\'s Name</th><td>{c.f_name}</td></tr> <tr><th>Student\'s/Parent Login ID</th><td>{c.login}</td></tr> <tr><th>Student\'s Password</th><td>{c.password}</td></tr> <tr><th>Parent\'s Password</th><td>{c.parent_password}</td></tr> </table> <h6>How to login on website:- www.mckv.edu.in> Member Login > Enter login ID and Password >> Select user type (Students or parents) > Press OK</h6> <p>Note : Please keep the password details secure with you.</p> </div> </section>', '', '', function(opts) {
	var self = this
    self.on("mount", function(){
      self.loading = false;
      self.view = 'home'
      self.update()

      self.readClass()
      self.readSection()
    })
    self.on("unmount", function(){
      studentLoginSlipStore.off('read_classes_changed',ClassesChanged)
      studentLoginSlipStore.off('read_section_changed',SectionChanged)

      studentLoginSlipStore.off('read_students_changed',ReadSectionsChanged)
      studentLoginSlipStore.off('update_login_status_changed',UpdateLoginStatusChanged)
      studentLoginSlipStore.off('print_login_slip_changed',PrintLoginSlipChanged)
      studentLoginSlipStore.off('reset_password_changed', ResetPasswordChanged)
      studentLoginSlipStore.off('generate_id_changed', GenerateIDChanged)
    })

    self.readClass = () => {
       self.loading = true;
       studentLoginSlipStore.trigger('read_classes')
    }

    self.readSection = () => {
       self.loading = true;
       studentLoginSlipStore.trigger('read_section')
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

    self.refreshStudents = () =>{

      let error = '';

      if(self.refs.standardSelect.value==''){
        error = error + "Please select standard, "
      }

      if(self.refs.sectionSelect.value==''){
        error = error + "Please select section of student, "
      }

      if(error.length!=0){
        toastr.error(error)
        return
      }else{
        self.loading = true
        studentLoginSlipStore.trigger('read_students', self.refs.standardSelect.value, self.refs.sectionSelect.value)
      }

    }

    self.allowBlock = (c,e) =>{
      self.loading = true
      var is_active = 'N'
      if(c.is_active=='Y'){
        is_active='N'
      }else{
        is_active='Y'
      }
      studentLoginSlipStore.trigger('update_login_status', c.enroll_number, is_active)
    }

    self.resetPassword = (c,e) =>{
      self.loading = true
      studentLoginSlipStore.trigger('reset_password', c.enroll_number)
    }

    self.printLoginSlip = (c,e) =>{
      let error = '';

      if(self.refs.standardSelect.value==''){
        error = error + "Please select standard, "
      }

      if(self.refs.sectionSelect.value==''){
        error = error + "Please select section of student, "
      }

      if(error.length!=0){
        toastr.error(error)
        return
      }else{
        self.loading = true
        studentLoginSlipStore.trigger('print_login_slip', self.refs.standardSelect.value, self.refs.sectionSelect.value, c.student_id)
      }

    }

    self.printLoginSlipAll = () =>{
      let error = '';

      if(self.refs.standardSelect.value==''){
        error = error + "Please select standard, "
      }

      if(self.refs.sectionSelect.value==''){
        error = error + "Please select section of student, "
      }

      if(error.length!=0){
        toastr.error(error)
        return
      }else{
        self.loading = true
        studentLoginSlipStore.trigger('print_login_slip_all', self.refs.standardSelect.value, self.refs.sectionSelect.value)
      }

    }

    self.backToHome = () => {
      self.view = 'home'
    }

    self.generateID = () =>{
      let error = '';

      if(self.refs.standardSelect.value==''){
        error = error + "Please select standard, "
      }

      if(self.refs.sectionSelect.value==''){
        error = error + "Please select section of student, "
      }

      if(error.length!=0){
        toastr.error(error)
        return
      }else{
        self.loading = true
        studentLoginSlipStore.trigger('generate_id', self.refs.standardSelect.value, self.refs.sectionSelect.value)
      }

    }

    studentLoginSlipStore.on('read_classes_changed',ClassesChanged)
    function ClassesChanged(classes){
      self.loading = false
      self.classes = []
      self.classes = classes
      self.update()
      console.log(self.classes)
    }

    studentLoginSlipStore.on('read_section_changed',SectionChanged)
    function SectionChanged(sections){
      self.loading = false
      self.sections = []
      self.sections = sections
      self.update()
    }

    studentLoginSlipStore.on('read_students_changed',ReadSectionsChanged)
    function ReadSectionsChanged(students){
      self.loading = false
      self.students = []
      self.students = students
      self.students.map(c => {
          c.selected=false
      })

      self.update()
    }

    studentLoginSlipStore.on('update_login_status_changed',UpdateLoginStatusChanged)
    function UpdateLoginStatusChanged(){
      self.loading = false

      self.refreshStudents()

    }

    studentLoginSlipStore.on('print_login_slip_changed',PrintLoginSlipChanged)
    function PrintLoginSlipChanged(details){
      self.view = 'print-details'
      self.loading = false
      self.studentDetails = []
      self.studentDetails = details
      self.update()
    }

    studentLoginSlipStore.on('reset_password_changed', ResetPasswordChanged)
    function ResetPasswordChanged(){
      self.loading = false
      self.update()
    }

    studentLoginSlipStore.on('generate_id_changed', GenerateIDChanged)
    function GenerateIDChanged(){
      self.loading = false
      self.update()
    }

});
riot.tag2('student-result-activation', '<loading-bar if="{loading}"></loading-bar> <section class=" is-fluid" show="{view==\'home\'}"> <div class="level"> <div class="level-left"> <h2 class="title" style="color: #ff3860;">Result Activation</h2> </div> <div class="level-right"> </div> </div> <div class="box"> <div class="columns"> <div class="column is-narrow"><label class="label">Standard</label></div> <div class="column is-narrow"> <div class="control"> <div class="select is-fullwidth"> <select ref="standardSelect" id="standard" onchange="{changeSection}"> <option value="">Select Standard</option> <option each="{classes}" riot-value="{standard_id}">{standard}</option> </select> </div> </div> </div> <div class="column is-narrow"><label class="label">Section</label></div> <div class="column is-narrow"> <div class="control"> <div class="select is-fullwidth"> <select ref="sectionSelect" id="section"> <option value="">Select Section</option> <option each="{tempSections}" riot-value="{section_id}">{section}</option> </select> </div> </div> </div> <div class="column is-narrow"> <button class="button is-danger has-text-weight-bold" onclick="{refreshStudents}">GO </button> </div> </div> </div> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th>Roll No</th> <th>Enroll No</th> <th>Student\'s Name</th> <th>Father\'s Name</th> <th>Active</th> <th></th> </tr> </thead> <tbody> <tr each="{c, i in students}"> <td>{c.roll_number}</td> <td>{c.enroll_number}</td> <td>{c.student}</td> <td>{c.f_name}</td> <td>{c.active_result}</td> <td class="has-text-right"> <span> <a class="button is-small is-rounded is-danger" show="{c.active_result==\'Y\'}" rel="nofollow" onclick="{allowBlock.bind(this, c)}">Block</a> <a class="button is-small is-rounded is-primary" show="{c.active_result==\'N\'}" rel="nofollow" onclick="{allowBlock.bind(this, c)}">Allow</a> </span> </td> </tr> </tbody> </table> </section>', '', '', function(opts) {
	var self = this
    self.on("mount", function(){
      self.loading = false;
      self.view = 'home'
      self.update()

      self.readClass()
      self.readSection()
    })
    self.on("unmount", function(){
      studentResultActivationStore.off('read_classes_changed',ClassesChanged)
      studentResultActivationStore.off('read_section_changed',SectionChanged)

      studentResultActivationStore.off('read_students_changed',ReadSectionsChanged)
      studentResultActivationStore.off('update_result_status_changed',UpdateLoginStatusChanged)
    })

    self.readClass = () => {
       self.loading = true;
       studentResultActivationStore.trigger('read_classes')
    }

    self.readSection = () => {
       self.loading = true;
       studentResultActivationStore.trigger('read_section')
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

    self.refreshStudents = () =>{

      let error = '';

      if(self.refs.standardSelect.value==''){
        error = error + "Please select standard, "
      }

      if(self.refs.sectionSelect.value==''){
        error = error + "Please select section of student, "
      }

      if(error.length!=0){
        toastr.error(error)
        return
      }else{
        self.loading = true
        studentResultActivationStore.trigger('read_students', self.refs.standardSelect.value, self.refs.sectionSelect.value)
      }

    }

    self.allowBlock = (c,e) =>{
      self.loading = true
      var active_result = 'N'
      if(c.active_result=='Y'){
        active_result='N'
      }else{
        active_result='Y'
      }
      studentResultActivationStore.trigger('update_result_status', c.enroll_number, active_result)
    }

    studentResultActivationStore.on('read_classes_changed',ClassesChanged)
    function ClassesChanged(classes){
      self.loading = false
      self.classes = []
      self.classes = classes
      self.update()
      console.log(self.classes)
    }

    studentResultActivationStore.on('read_section_changed',SectionChanged)
    function SectionChanged(sections){
      self.loading = false
      self.sections = []
      self.sections = sections
      self.update()
    }

    studentResultActivationStore.on('read_students_changed',ReadSectionsChanged)
    function ReadSectionsChanged(students){
      self.loading = false
      self.students = []
      self.students = students
      self.students.map(c => {
          c.selected=false
      })

      self.update()
    }

    studentResultActivationStore.on('update_result_status_changed',UpdateLoginStatusChanged)
    function UpdateLoginStatusChanged(){
      self.loading = false

      self.refreshStudents()

    }

});
riot.tag2('student-withdrawn-student', '<loading-bar if="{loading}"></loading-bar> <section class=" is-fluid"> <div class="level"> <div class="level-left"> <h2 class="title" style="color: #ff3860;">Withdrawn Student</h2> </div> <div class="level-right"> </div> </div> <div class="box"> <div class="columns"> <div class="column is-narrow"><label class="label">From Date</label></div> <div class="column is-small"> <div class="control"> <input class="input date" type="text" ref="fromDateInput"> </div> </div> <div class="column is-narrow"><label class="label">To Date</label></div> <div class="column is-small"> <div class="control"> <input class="input date" type="text" ref="toDateInput"> </div> </div> <div class="column is-narrow"><label class="label">Standard</label></div> <div class="column is-narrow"> <div class="control"> <div class="select is-fullwidth"> <select ref="standardSelect" id="standard" onchange="{changeSection}"> <option value="">Select Standard</option> <option each="{classes}" riot-value="{standard_id}">{standard}</option> <option value="-1">All</option> </select> </div> </div> </div> <div class="column is-narrow"><label class="label">Section</label></div> <div class="column is-narrow"> <div class="control"> <div class="select is-fullwidth"> <select ref="sectionSelect" id="section"> <option value="">Select Section</option> <option each="{tempSections}" riot-value="{section_id}">{section}</option> <option value="-1">All</option> </select> </div> </div> </div> <div class="column is-narrow"> <button class="button is-danger has-text-weight-bold" onclick="{refreshStudents}">GO </button> </div> </div> </div> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th class="slno">Sl</th> <th>Enroll No</th> <th>Student Name</th> <th>Withdraw class</th> <th>Date of withdraw</th> <th>Reason</th> <th>TC No</th> <th></th> </tr> </thead> <tbody> <tr each="{c, i in students}"> <td>{i+1}</td> <td>{c.enroll_number}</td> <td>{c.first_name} {c.middle_name} {c.last_name}</td> <td>{c.prev_class}</td> <td>{c.dol}</td> <td>{c.remarks}</td> <td>{c.tc_no}</td> <td class="has-text-right"> <span><a class="button is-small is-rounded is-danger" rel="nofollow" onclick="{cancleWithdraw.bind(this, c)}">Cancle Withdraw</a></span> </td> </tr> </tbody> </table> </section>', '', '', function(opts) {
	var self = this
    self.on("mount", function(){
      self.loading = false;
      self.update()
      flatpickr(".date", {
        allowInput: true,
        dateFormat: "d/m/Y",
      })
      self.readClass()
      self.readSection()
    })
    self.on("unmount", function(){
      studentWithdrawnStudentStore.off('read_classes_changed',ClassesChanged)
      studentWithdrawnStudentStore.off('read_section_changed',SectionChanged)

      studentWithdrawnStudentStore.off('read_students_changed',ReadSectionsChanged)
      studentWithdrawnStudentStore.off('cancle_withdraw_students_changed',CancleWithdrawStudentChanged)
    })

    self.readClass = () => {
       self.loading = true;
       studentWithdrawnStudentStore.trigger('read_classes')
    }

    self.readSection = () => {
       self.loading = true;
       studentWithdrawnStudentStore.trigger('read_section')
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

    self.refreshStudents = () =>{

      let error = '';

      if(self.refs.fromDateInput.value==''){
        error = error + "Please select from date, "
      }

      if(self.refs.toDateInput.value==''){
        error = error + "Please select to date, "
      }

      if(self.refs.standardSelect.value==''){
        error = error + "Please select standard, "
      }

      if(self.refs.sectionSelect.value==''){
        error = error + "Please select section of student, "
      }

      if(error.length!=0){
        toastr.error(error)
        return
      }else{
        self.loading = true
        studentWithdrawnStudentStore.trigger('read_students', self.refs.standardSelect.value, self.refs.sectionSelect.value , convertDate(self.refs.fromDateInput.value), convertDate(self.refs.toDateInput.value))
      }

    }

    self.cancleWithdraw = (c,e) =>{
      self.loading = true
      studentWithdrawnStudentStore.trigger('cancle_withdraw_students', c.student_id)
    }

    studentWithdrawnStudentStore.on('read_classes_changed',ClassesChanged)
    function ClassesChanged(classes){
      self.loading = false
      self.classes = []
      self.classes = classes
      self.update()
      console.log(self.classes)
    }

    studentWithdrawnStudentStore.on('read_section_changed',SectionChanged)
    function SectionChanged(sections){
      self.loading = false
      self.sections = []
      self.sections = sections
      self.update()
    }

    studentWithdrawnStudentStore.on('read_students_changed',ReadSectionsChanged)
    function ReadSectionsChanged(students){
      self.loading = false
      self.students = []
      self.students = students
      self.students.map(c => {
          c.selected=false
      })

      self.update()
    }

    studentWithdrawnStudentStore.on('cancle_withdraw_students_changed',CancleWithdrawStudentChanged)
    function CancleWithdrawStudentChanged(){
      self.loading = false

      self.refreshStudents()

    }

});
riot.tag2('student', '<section class=" is-fluid" show="{student_view ==\'show_student\'}"> <div class="level"> <div class="level-left"> <h2 class="title" style="color: #ff3860;">Students</h2> </div> <div class="level-right"> <button class="button is-warning is-rounded" onclick="{add_new_student}"> <span class="icon"> <span class="fas fa-plus"></span> </span> <span>New Student</span> </button> </div> </div> <div class="box"> <div class="columns"> <div class="column is-narrow"> <div class="control"> <div class="select"> <select ref="read_standard_id" onchange="{getReadSection}"> <option>Choose Section</option> <option each="{standards}" riot-value="{standard_id}">{standard} </option> </select> </div> </div> </div> <div class="column is-narrow"> <div class="control"> <div class="select is-fullwidth"> <select ref="read_section_id"> <option>Choose Class</option> <option each="{readfilteredSections}" riot-value="{section_id}">{section} </option> </select> </div> </div> </div> <div class="column is-one-third"> <input class="input" ref="read_enroll_number" type="text" placeholder="Enter Enroll No"> </div> <div class="column"> <button class="button is-danger has-text-weight-bold" onclick="{getStudentData}">GO </button> </div> </div> </div> <table class="table is-fullwidth is-striped is-hoverable is-narrow"> <thead> <tr> <th>Roll no</th> <th>Student Name</th> <th>Enroll No</th> <th>Registration No</th> <th>SMS</th> <th>Father\'s Name</th> <th></th> </tr> </thead> <tbody> <tr each="{st, i in students}"> <td>{st.roll_number}</td> <td>{st.name}</td> <td>{st.enroll_number}</td> <td>{st.reg_number}</td> <td>{st.mobile}</td> <td>{st.f_name}</td> <td class="has-text-right"> <div class="inline-flex rounded border border-grey overflow-hidden" hide="{st.confirmDelete}"> <span><a class="button is-small is-rounded has-text-success" onclick="{edit.bind(this, st.student_id)}">Edit</a></span> <span> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick="{confirmDelete}">Delete</a></span> </div> <div class="table-buttons" if="{st.confirmDelete}"> <span disabled="{loading}" class="button is-small is-rounded" onclick="{delete}"><i class="fa fa-check"></i></span> <span disabled="{loading}" class="button is-small has-text-danger is-rounded" onclick="{cancelOperation}"><i class="fa fa-times"></i></span> </div> </td> </tr> </tbody> </table> </section> <section class=" is-fluid" show="{student_view ==\'add_student\'}"> <div class="label"> <div class="level-left"> <h2 class="title" style="color: #ff3860;">{title} Student</h2> </div> <div class="level-right"></div> </div> <div class="box"> <div class="columns is-variable is-1 is-multiline"> <div class="column is-half"> <div id="pp_box" class="pp-box" onclick="{trigger_file_input.bind(this,\'student_picture\')}"> <div class="icon has-text-danger" onclick="{remove_picture.bind(this, \'pp_box\',\'student_picture\')}"><i class="fas fa-trash"></i></div> </div> <input accept="image/*" class="is-hidden" id="student_picture" name="student_picture" onchange="{loadFile.bind(this, \'pp_box\')}" type="file"> </div> <div class="column is-half"> <div class="column is-narrow"> <label class="label" for="first_name">First Name</label> <input class="input" id="first_name" ref="first_name" type="text"> </div> <div class="column is-narrow"> <label class="label" for="middle_name">Middle Name</label> <input class="input" ref="middle_name" type="text"> </div> <div class="column is-narrow"> <label class="label" for="last_name">Last Name</label> <input class="input" ref="last_name" type="text"> </div> </div> <div class="column is-one-third"> <label class="label" for="standard_id">Class</label> <div class="control"> <div class="select is-fullwidth"> <select ref="standard_id" onchange="{getSection}"> <option each="{standards}" riot-value="{standard_id}">{standard} </option> </select> </div> </div> </div> <div class="column is-one-third"> <label class="label" for="section_id">Section</label> <div class="control"> <div class="select is-fullwidth"> <select ref="section_id"> <option each="{filteredSections}" riot-value="{section_id}">{section} </option> </select> </div> </div> </div> <div class="column is-one-third"> <label class="label" for="house_id">House</label> <div class="control"> <div class="select is-fullwidth"> <select ref="house_id"> <option each="{houses}" riot-value="{house_id}">{house_name} </option> </select> </div> </div> </div> <div class="column is-full"> <h3 class="has-text-weight-bold is-size-4 has-text-link">Given Concession</h3> <hr style="margin-top: 0.5em; margin-bottom: 0.5em;"> </div> <div class="column is-one-third"> <label class="label" for="enroll_number">Enroll No</label> <input class="input" ref="enroll_number" type="number"> </div> <div class="column is-one-third"> <label class="label" for="roll_number">Roll No</label> <input class="input" ref="roll_number" type="number"> </div> <div class="column is-one-third"> <label class="label" for="reg_number">Reg. No</label> <input class="input" ref="reg_number" type="text"> </div> <div class="column is-one-third"> <label class="label" for="gender">Gender</label> <div class="control"> <div class="select is-fullwidth"> <select id="gender" ref="gender"> <option value="M">Male</option> </select> </div> </div> </div> <div class="column is-one-third"> <label class="label" for="category_id">Cast Category</label> <div class="control"> <div class="select is-fullwidth"> <select ref="category_id"> <option each="{cast}" riot-value="{category_id}">{category_name} </option> </select> </div> </div> </div> <div class="column is-one-third"> <label class="label" for="dob">DOB</label> <input class="date input flatpickr-input form-control input" ref="dob" placeholder="" tabindex="0" type="text" readonly="readonly"> </div> <div class="column is-one-third"> <label class="label" for="blood_group">Blood Group</label> <div class="control"> <div class="select is-fullwidth"> <select id="blood_group" ref="blood_group"> <option value="A+">A+</option> <option value="A-">A-</option> <option value="AB+">AB+</option> <option value="AB-">AB-</option> <option value="B+">B+</option> <option value="B-">B-</option> <option value="O+">O+</option> <option value="O-">O-</option> </select> </div> </div> </div> <div class="column is-full"> <h3 class="has-text-weight-bold is-size-4 has-text-link">Contact Information(Permanent Address)</h3> <hr style="margin-top: 0.5em; margin-bottom: 0.5em;"> </div> <div class="column is-one-third"> <label class="label" for="p_add_l1">Address Line 1</label> <input class="input" ref="p_add_l1" type="text"> </div> <div class="column is-one-third"> <label class="label" for="p_add_l2">Address Line 2</label> <input class="input" ref="p_add_l2" type="text"> </div> <div class="column is-one-third"> <label class="label" for="p_city">City</label> <input class="input" ref="p_city" type="text"> </div> <div class="column is-one-third"> <label class="label" for="p_zip">Zip</label> <input class="input" ref="p_zip" type="number"> </div> <div class="column is-one-third"> <label class="label" for="p_state">State</label> <input class="input" ref="p_state" type="text"> </div> <div class="column is-one-third"> <label class="label" for="p_country">Country</label> <input class="input" ref="p_country" type="text"> </div> <div class="column is-full"> <h3 class="has-text-weight-bold is-size-4 has-text-link"> Check if Correspondence Address is same as Permanent Address <input type="checkbox" id="correspondenceCheckbox" name="correspondenceCheckbox" onclick="{copyAddress.bind(this)}"> </h3> <hr style="margin-top: 0.5em; margin-bottom: 0.5em;"> </div> <div class="column is-one-third"> <label class="label" for="c_add_l1">Address Line 1</label> <input class="input" ref="c_add_l1" type="text"> </div> <div class="column is-one-third"> <label class="label" for="c_add_l2">Address Line 2</label> <input class="input" ref="c_add_l2" type="text"> </div> <div class="column is-one-third"> <label class="label" for="c_city">City</label> <input class="input" ref="c_city" type="text"> </div> <div class="column is-one-third"> <label class="label" for="c_zip">Zip</label> <input class="input" ref="c_zip" type="number"> </div> <div class="column is-one-third"> <label class="label" for="c_state">State</label> <input class="input" ref="c_state" type="text"> </div> <div class="column is-one-third"> <label class="label" for="c_country">Country</label> <input class="input" ref="c_country" type="text"> </div> <div class="column is-full"> <hr style="margin-top: 0.5em; margin-bottom: 0.5em;"> </div> <div class="column is-one-third"> <label class="label" for="residence_phone">Phone(R)</label> <input class="input" ref="residence_phone" type="number"> </div> <div class="column is-one-third"> <label class="label" for="mobile">SMS No.</label> <input class="input" ref="mobile" type="number"> </div> <div class="column is-one-third"> <label class="label" for="emergency_no">Emergency No.</label> <input class="input" ref="emergency_no" type="number"> </div> <div class="column is-one-third"> <label class="label" for="student_type">Student Type</label> <div class="control"> <div class="select is-fullwidth"> <select id="student_type" ref="student_type"> <option value="Day Scholar">Day Scholar</option> </select> </div> </div> </div> <div class="column is-full"> <h3 class="has-text-weight-bold is-size-4 has-text-link">Other Information</h3> <hr style="margin-top: 0.5em; margin-bottom: 0.5em;"> </div> <div class="column is-one-third"> <label class="label" for="aadhar_no">Aadhar No</label> <input class="input" ref="aadhar_no" type="text"> </div> <div class="column is-one-third"> <label class="label" for="doa">Date of Admission</label> <input class="date input flatpickr-input form-control input" ref="doa" placeholder="" tabindex="0" type="text" readonly="readonly"> </div> <div class="column is-one-third"> <label class="label" for="old_doa">Old Date of Admission</label> <input class="date input flatpickr-input form-control input" ref="old_doa" placeholder="" tabindex="0" type="text" readonly="readonly"> </div> <div class="column is-one-third"> <label class="label" for="doj">Date of Joining</label> <input class="date input flatpickr-input form-control input" ref="doj" placeholder="" tabindex="0" type="text" readonly="readonly"> </div> <div class="column is-one-third"> <label class="label" for="old_doj">Old Date of Joining</label> <input class="date input flatpickr-input form-control input" ref="old_doj" placeholder="" tabindex="0" type="text" readonly="readonly"> </div> <div class="column is-one-third"> <label class="label" for="mother_tongue">Mother Tongue</label> <input class="input" ref="mother_tongue" type="text"> </div> <div class="column is-one-third"> <label class="label" for="last_school">Last School</label> <input class="input" ref="last_school" type="text"> </div> <div class="column is-one-third"> <label class="label" for="last_class">Last Class</label> <input class="input" ref="last_class" type="text"> </div> <div class="column is-one-third"> <label class="label" for="admission_for_class">Admission For Class</label> <input class="input" ref="admission_for_class" type="text"> </div> <div class="column is-one-third"> <label class="label" for="hobby">Hobbies</label> <input class="input" ref="hobby" type="text"> </div> <div class="column is-one-third"> <label class="label" for="cast">Cast</label> <input class="input" ref="cast" type="text"> </div> <div class="column is-one-third"> <label class="label" for="religion_id">Religion</label> <div class="control"> <div class="select is-fullwidth"> <select id="religion_id" ref="religion_id"> <option each="{religion}" riot-value="{religion_id}">{religion} </option> </select> </div> </div> </div> <div class="column is-one-third"> <label class="label" for="staff_child">Staff Member Child</label> <div class="control"> <div class="select is-fullwidth"> <select id="staff_child" ref="staff_child" onchange="{GetStaffName}"> <option value="Y">Yes</option> <option value="N">No</option> </select> </div> </div> </div> <div class="column is-one-third" show="{staff_name}"> <label class="label" for="staff_name">Staff\'s Name</label> <input class="input" ref="staff_name" type="text"> </div> <div class="column is-full"> <button class="button is-info has-text-weight-bold adjusted-top" onclick="{addFatherInformation}"> Next >> </button> <button class="button is-danger has-text-weight-bold adjusted-top" onclick="{close}"> Cancel </button> </div> </div> </div> </section> <section class=" is-fluid" show="{student_view ==\'add_father_information\'}"> <div class="label"> <div class="level-left"> <h2 class="title" style="color: #ff3860;">{title} Father</h2> </div> <div class="level-right"> </div> </div> <div class="box"> <div class="columns is-variable is-1 is-multiline"> <div class="column is-half"> <div id="f_pp_box" class="f_pp-box" onclick="{trigger_father_file_input.bind(this,\'father_picture\')}"> <div class="icon has-text-danger" onclick="{remove_father_picture.bind(this, \'f_pp_box\',\'father_picture\')}"><i class="fas fa-trash"></i></div> </div> <input accept="image/*" class="is-hidden" id="father_picture" name="father_picture" onchange="{loadFatherFile.bind(this, \'f_pp_box\')}" type="file"> </div> <div class="column is-half"> <div class="column is-narrow"> <label class="label" for="f_title">Title</label> <input class="input" id="f_title" ref="f_title" type="text"> </div> <div class="column is-narrow"> <label class="label" for="f_name">Father\'s Name</label> <input class="input" ref="f_name" type="text"> </div> </div> <div class="column is-full"> <h3 class="has-text-weight-bold is-size-4 has-text-link">Work Information</h3> <hr style="margin-top: 0.5em; margin-bottom: 0.5em;"> </div> <div class="column is-one-third"> <label class="label" for="f_occupation">Occupation</label> <input class="input" id="f_occupation" ref="f_occupation" type="text"> </div> <div class="column is-one-third"> <label class="label" for="f_organisation_type">Organization Type</label> <div class="control"> <div class="select is-fullwidth"> <select id="f_organisation_type" ref="f_organisation_type"> <option value="Governmnet">Governmnet</option> <option value="Business">Business</option> <option value="NGO">NGO</option> <option value="Professional">Professional</option> <option value="Other">Other</option> </select> </div> </div> </div> <div class="column is-one-third"> <label class="label" for="f_annual_income">Annual Income</label> <input class="input" id="f_annual_income" ref="f_annual_income" type="number"> </div> <div class="column is-one-third"> <label class="label" for="f_work_profile">Work Profile</label> <input class="input" ref="f_work_profile" type="text"> </div> <div class="column is-one-third"> <label class="label" for="f_organisation_name">Organization Name</label> <input class="input" ref="f_organisation_name" type="text"> </div> <div class="column is-one-third"> <label class="label" for="f_designation">Designation</label> <input class="input" ref="f_designation" type="text"> </div> <div class="column is-one-third"> <label class="label" for="f_department">Department</label> <input class="input" ref="f_department" type="text"> </div> <div class="column is-one-third"> <label class="label" for="f_office_add_l1">Office Address Line 1</label> <input class="input" ref="f_office_add_l1" type="text"> </div> <div class="column is-one-third"> <label class="label" for="f_office_add_l2">Office Address Line 2</label> <input class="input" ref="f_office_add_l2" type="text"> </div> <div class="column is-one-third"> <label class="label" for="f_office_city">City</label> <input class="input" ref="f_office_city" type="text"> </div> <div class="column is-one-third"> <label class="label" for="f_office_zip">Zip</label> <input class="input" ref="f_office_zip" type="number"> </div> <div class="column is-one-third"> <label class="label" for="f_office_state">State</label> <input class="input" ref="f_office_state" type="text"> </div> <div class="column is-one-third"> <label class="label" for="f_office_country">Country</label> <input class="input" ref="f_office_country" type="text"> </div> <div class="column is-one-third"> <label class="label" for="f_office_phone">Phone(O)</label> <input class="input" ref="f_office_phone" type="number"> </div> <div class="column is-full"> <h3 class="has-text-weight-bold is-size-4 has-text-link">Educational Information</h3> <hr style="margin-top: 0.5em; margin-bottom: 0.5em;"> </div> <div class="column is-one-third"> <label class="label" for="f_qualification">Qualification</label> <input class="input" ref="f_qualification" type="text"> </div> <div class="column is-one-third"> <label class="label" for="f_other_qualification">Other Qualification</label> <input class="input" ref="f_other_qualification" type="text"> </div> <div class="column is-full"> <h3 class="has-text-weight-bold is-size-4 has-text-link">Check if Candidate\'s Correspondence Address is same as Father\'s Address <input type="checkbox" id="fatherCorrespondenceCheckbox" onclick="{copyFatherAddress.bind(this)}"> </h3> <hr style="margin-top: 0.5em; margin-bottom: 0.5em;"> </div> <div class="column is-one-third"> <label class="label" for="f_add_l1">Address Line 1</label> <input class="input" ref="f_add_l1" type="text"> </div> <div class="column is-one-third"> <label class="label" for="f_add_l2">Address Line 2</label> <input class="input" ref="f_add_l2" type="text"> </div> <div class="column is-one-third"> <label class="label" for="f_city">City</label> <input class="input" ref="f_city" type="text"> </div> <div class="column is-one-third"> <label class="label" for="f_zip">Zip</label> <input class="input" ref="f_zip" type="number"> </div> <div class="column is-one-third"> <label class="label" for="f_state">State</label> <input class="input" ref="f_state" type="text"> </div> <div class="column is-one-third"> <label class="label" for="f_country">Country</label> <input class="input" ref="f_country" type="text"> </div> <div class="column is-one-third"> <label class="label" for="f_mobile">Mobile</label> <input class="input" ref="f_mobile" type="number"> </div> <div class="column is-one-third"> <label class="label" for="f_email">Email</label> <input class="input" ref="f_email" type="email"> </div> <div class="column is-one-third"> <label class="label" for="f_nationality">Nationality</label> <input class="input" ref="f_nationality" type="text"> </div> <div class="column is-full"> <button class="button is-primary has-text-weight-bold adjusted-top" onclick="{closeFatherInformation}"> Previous </button> <button class="button is-info has-text-weight-bold adjusted-top" onclick="{addMotherInformation}"> Next >> </button> <button class="button is-danger has-text-weight-bold adjusted-top" onclick="{close}"> Cancel </button> </div> </div> </div> </section> <section class=" is-fluid" show="{student_view ==\'add_mother_information\'}"> <div class="label"> <div class="level-left"> <h2 class="title" style="color: #ff3860;">{title} Mother</h2> </div> <div class="level-right"> </div> </div> <div class="box"> <div class="columns is-variable is-1 is-multiline"> <div class="column is-half"> <div id="m_pp_box" class="m_pp-box" onclick="{trigger_mother_file_input.bind(this,\'mother_picture\')}"> <div class="icon has-text-danger" onclick="{remove_mother_picture.bind(this, \'m_pp_box\',\'mother_picture\')}"><i class="fas fa-trash"></i></div> </div> <input accept="image/*" class="is-hidden" id="mother_picture" name="mother_picture" onchange="{loadMotherFile.bind(this, \'m_pp_box\')}" type="file"> </div> <div class="column is-half"> <div class="column is-narrow"> <label class="label" for="m_title">Title</label> <input class="input" id="m_title" ref="m_title" type="text"> </div> <div class="column is-narrow"> <label class="label" for="m_name">Mother\'s Name</label> <input class="input" ref="m_name" type="text"> </div> </div> <div class="column is-full"> <h3 class="has-text-weight-bold is-size-4 has-text-link">Work Information</h3> <hr style="margin-top: 0.5em; margin-bottom: 0.5em;"> </div> <div class="column is-one-third"> <label class="label" for="m_occupation">Occupation</label> <input class="input" ref="m_occupation" type="text"> </div> <div class="column is-one-third"> <label class="label" for="m_organisation_type">Organization Type</label> <div class="control"> <div class="select is-fullwidth"> <select ref="m_organisation_type"> <option value="Governmnet">Governmnet</option> <option value="Business">Business</option> <option value="NGO">NGO</option> <option value="Professional">Professional</option> <option value="Other">Other</option> </select> </div> </div> </div> <div class="column is-one-third"> <label class="label" for="m_annual_income">Annual Income</label> <input class="input" ref="m_annual_income" type="number"> </div> <div class="column is-one-third"> <label class="label" for="m_work_profile">Work Profile</label> <input class="input" ref="m_work_profile" type="text"> </div> <div class="column is-one-third"> <label class="label" for="m_organisation_name">Organization Name</label> <input class="input" ref="m_organisation_name" type="text"> </div> <div class="column is-one-third"> <label class="label" for="m_designation">Designation</label> <input class="input" ref="m_designation" type="text"> </div> <div class="column is-one-third"> <label class="label" for="m_department">Department</label> <input class="input" ref="m_department" type="text"> </div> <div class="column is-one-third"> <label class="label" for="m_office_add_l1">Office Address Line 1</label> <input class="input" ref="m_office_add_l1" type="text"> </div> <div class="column is-one-third"> <label class="label" for="m_office_add_l2">Office Address Line 2</label> <input class="input" ref="m_office_add_l2" type="text"> </div> <div class="column is-one-third"> <label class="label" for="m_office_city">City</label> <input class="input" ref="m_office_city" type="text"> </div> <div class="column is-one-third"> <label class="label" for="m_office_zip">Zip</label> <input class="input" ref="m_office_zip" type="number"> </div> <div class="column is-one-third"> <label class="label" for="m_office_state">State</label> <input class="input" ref="m_office_state" type="text"> </div> <div class="column is-one-third"> <label class="label" for="m_office_country">Country</label> <input class="input" ref="m_office_country" type="text"> </div> <div class="column is-one-third"> <label class="label" for="m_office_phone">Phone(O)</label> <input class="input" ref="m_office_phone" type="number"> </div> <div class="column is-full"> <h3 class="has-text-weight-bold is-size-4 has-text-link">Educational Information</h3> <hr style="margin-top: 0.5em; margin-bottom: 0.5em;"> </div> <div class="column is-one-third"> <label class="label" for="m_qualification">Qualification</label> <input class="input" ref="m_qualification" type="text"> </div> <div class="column is-one-third"> <label class="label" for="m_other_qualification">Other Qualification</label> <input class="input" ref="m_other_qualification" type="text"> </div> <div class="column is-full"> <h3 class="has-text-weight-bold is-size-4 has-text-link">Contact Information Check if Mother\'s Address is same as Father\'s Address <input type="checkbox" id="motherCorrespondenceCheckbox" onclick="{copyMotherAddress.bind(this)}"> </h3> <hr style="margin-top: 0.5em; margin-bottom: 0.5em;"> </div> <div class="column is-one-third"> <label class="label" for="m_add_l1">Address Line 1</label> <input class="input" ref="m_add_l1" type="text"> </div> <div class="column is-one-third"> <label class="label" for="m_add_l2">Address Line 2</label> <input class="input" ref="m_add_l2" type="text"> </div> <div class="column is-one-third"> <label class="label" for="m_city">City</label> <input class="input" ref="m_city" type="text"> </div> <div class="column is-one-third"> <label class="label" for="m_zip">Zip</label> <input class="input" ref="m_zip" type="number"> </div> <div class="column is-one-third"> <label class="label" for="m_state">State</label> <input class="input" ref="m_state" type="text"> </div> <div class="column is-one-third"> <label class="label" for="m_country">Country</label> <input class="input" ref="m_country" type="text"> </div> <div class="column is-one-third"> <label class="label" for="m_mobile">Mobile</label> <input class="input" ref="m_mobile" type="number"> </div> <div class="column is-one-third"> <label class="label" for="m_email">Email</label> <input class="input" ref="m_email" type="email"> </div> <div class="column is-one-third"> <label class="label" for="m_nationality">Nationality</label> <input class="input" ref="m_nationality" type="text"> </div> <div class="column is-full"> <button class="button is-primary has-text-weight-bold adjusted-top" onclick="{closeMotherInformation}"> Previous </button> <button class="button is-info has-text-weight-bold adjusted-top" onclick="{addGuardianInformation}"> Next >> </button> <button class="button is-danger has-text-weight-bold adjusted-top" onclick="{close}"> Cancel </button> </div> </div> </div> </section> <section class=" is-fluid" show="{student_view ==\'add_guardian_information\'}"> <div class="label"> <div class="level-left"> <h2 class="title" style="color: #ff3860;">{title} Guardian</h2> </div> <div class="level-right"> <div class="column is-one-third"> <label class="label" for="is_guardian">Select Guardian</label> <div class="control"> <div class="select is-fullwidth"> <select ref="is_guardian" id="guardian" onchange="{getGuardianInformation}"> <option>Select Guardian</option> <option value="Father">Father</option> <option value="Mother">Mother</option> <option value="Other">Other</option> </select> </div> </div> </div> </div> </div> <div class="box"> <div class="columns is-variable is-1 is-multiline"> <div class="column is-half"> <div id="g_pp_box" class="g_pp-box" onclick="{trigger_guardian_file_input.bind(this,\'guardian_picture\')}"> <div class="icon has-text-danger" onclick="{remove_guardian_picture.bind(this, \'g_pp_box\',\'guardian_picture\')}"><i class="fas fa-trash"></i></div> </div> <input accept="image/*" class="is-hidden" id="guardian_picture" name="guardian_picture" onchange="{loadGuardianFile.bind(this, \'g_pp_box\')}" type="file"> </div> <div class="column is-half"> <div class="column is-narrow"> <label class="label" for="g_title">Title</label> <input class="input" id="g_title" ref="g_title" type="text"> </div> <div class="column is-narrow"> <label class="label" for="g_name">Guardian\'s Name</label> <input class="input" id="g_name" ref="g_name" type="text"> </div> </div> <div class="column is-full"> <h3 class="has-text-weight-bold is-size-4 has-text-link">Work Information</h3> <hr style="margin-top: 0.5em; margin-bottom: 0.5em;"> </div> <div class="column is-one-third"> <label class="label" for="g_occupation">Occupation</label> <input class="input" id="g_occupation" ref="g_occupation" type="text"> </div> <div class="column is-one-third"> <label class="label" for="g_organisation_type">Organization Type</label> <div class="control"> <div class="select is-fullwidth"> <select ref="g_organisation_type" id="g_organisation_type"> <option value="Governmnet">Governmnet</option> <option value="Business">Business</option> <option value="NGO">NGO</option> <option value="Professional">Professional</option> <option value="Other">Other</option> </select> </div> </div> </div> <div class="column is-one-third"> <label class="label" for="g_annual_income">Annual Income</label> <input class="input" id="g_annual_income" ref="g_annual_income" type="number"> </div> <div class="column is-one-third"> <label class="label" for="g_work_profile">Work Profile</label> <input class="input" id="g_work_profile" ref="g_work_profile" type="text"> </div> <div class="column is-one-third"> <label class="label" for="g_organisation_name">Organization Name</label> <input class="input" id="g_organisation_name" ref="g_organisation_name" type="text"> </div> <div class="column is-one-third"> <label class="label" for="g_designation">Designation</label> <input class="input" id="g_designation" ref="g_designation" type="text"> </div> <div class="column is-one-third"> <label class="label" for="g_department">Department</label> <input class="input" id="g_department" ref="g_department" type="text"> </div> <div class="column is-one-third"> <label class="label" for="g_office_add_l1">Office Address Line 1</label> <input class="input" id="g_office_add_l1" ref="g_office_add_l1" type="text"> </div> <div class="column is-one-third"> <label class="label" for="g_office_add_l2">Office Address Line 2</label> <input class="input" id="g_office_add_l2" ref="g_office_add_l2" type="text"> </div> <div class="column is-one-third"> <label class="label" for="g_office_city">City</label> <input class="input" id="g_office_city" ref="g_office_city" type="text"> </div> <div class="column is-one-third"> <label class="label" for="g_office_zip">Zip</label> <input class="input" id="g_office_zip" ref="g_office_zip" type="number"> </div> <div class="column is-one-third"> <label class="label" for="g_office_state">State</label> <input class="input" id="g_office_state" ref="g_office_state" type="text"> </div> <div class="column is-one-third"> <label class="label" for="g_office_country">Country</label> <input class="input" id="g_office_country" ref="g_office_country" type="text"> </div> <div class="column is-one-third"> <label class="label" for="g_office_phone">Phone(O)</label> <input class="input" id="g_office_phone" ref="g_office_phone" type="number"> </div> <div class="column is-full"> <h3 class="has-text-weight-bold is-size-4 has-text-link">Educational Information</h3> <hr style="margin-top: 0.5em; margin-bottom: 0.5em;"> </div> <div class="column is-one-third"> <label class="label" for="g_qualification">Qualification</label> <input class="input" id="g_qualification" ref="g_qualification" type="text"> </div> <div class="column is-one-third"> <label class="label" for="g_other_qualification">Other Qualification</label> <input class="input" id="g_other_qualification" ref="g_other_qualification" type="text"> </div> <div class="column is-full"> <h3 class="has-text-weight-bold is-size-4 has-text-link">Contact Information</h3> <hr style="margin-top: 0.5em; margin-bottom: 0.5em;"> </div> <div class="column is-one-third"> <label class="label" for="g_add_l1">Address Line 1</label> <input class="input" id="g_add_l1" ref="g_add_l1" type="text"> </div> <div class="column is-one-third"> <label class="label" for="g_add_l2">Address Line 2</label> <input class="input" id="g_add_l2" ref="g_add_l2" type="text"> </div> <div class="column is-one-third"> <label class="label" for="g_city">City</label> <input class="input" id="g_city" ref="g_city" type="text"> </div> <div class="column is-one-third"> <label class="label" for="g_zip">Zip</label> <input class="input" id="g_zip" ref="g_zip" type="number"> </div> <div class="column is-one-third"> <label class="label" for="g_state">State</label> <input class="input" id="g_state" ref="g_state" type="text"> </div> <div class="column is-one-third"> <label class="label" for="g_country">Country</label> <input class="input" id="g_country" ref="g_country" type="text"> </div> <div class="column is-one-third"> <label class="label" for="g_phone">Phone(R)</label> <input class="input" id="g_phone" ref="g_phone" type="number"> </div> <div class="column is-one-third"> <label class="label" for="g_mobile">Mobile</label> <input class="input" id="g_mobile" ref="g_mobile" type="number"> </div> <div class="column is-one-third"> <label class="label" for="g_email">Email</label> <input class="input" id="g_email" ref="g_email" type="email"> </div> <div class="column is-one-third"> <label class="label" for="g_nationality">Nationality</label> <input class="input" id="g_nationality" ref="g_nationality" type="text"> </div> <div class="column is-one-third"> <label class="label" for="g_relation">Relationship</label> <input class="input" id="g_relation" ref="g_relation" type="text"> </div> <div class="column is-full"> <button class="button is-primary has-text-weight-bold adjusted-top" onclick="{closeGuardianInformation}"> Previous </button> <button class="button is-info has-text-weight-bold adjusted-top" onclick="{addSiblingInformation}"> Next >> </button> <button class="button is-danger has-text-weight-bold adjusted-top" onclick="{close}"> Cancel </button> </div> </div> </div> </section> <section class=" is-fluid" show="{student_view ==\'add_sibling_information\'}"> <div class="label"> <div class="level-left"> <h2 class="title" style="color: #ff3860;">Sibling Detail</h2> </div> <div class="level-right"> </div> </div> <div class="box"> <div class="columns is-variable is-1 is-multiline"> <div class="column is-full"> <h3 class="has-text-weight-bold is-size-4 has-text-link">First Child</h3> <hr style="margin-top: 0.5em; margin-bottom: 0.5em;"> </div> <div class="column is-one-third"> <label class="label" for="first_child_name">Name</label> <input class="input" id="first_child_name" ref="first_child_name" type="text"> </div> <div class="column is-one-third"> <label class="label" for="first_child_age">Age</label> <input class="input" id="first_child_age" ref="first_child_age" type="number"> </div> <div class="column is-one-third"> <label class="label" for="first_child_class">Class</label> <input class="input" id="first_child_class" ref="first_child_class" type="text"> </div> <div class="column is-one-third"> <label class="label" for="first_child_section">Section</label> <input class="input" id="first_child_section" ref="first_child_section" type="text" onkeyup="this.value = this.value.toUpperCase();"> </div> <div class="column is-one-third"> <label class="label" for="first_enrol">Enroll No.</label> <input class="input" id="first_enrol" ref="first_enrol" type="text"> </div> <div class="column is-one-third"> <label class="label" for="first_child_school">School</label> <input class="input" id="first_child_school" ref="first_child_school" type="text"> </div> <div class="column is-full"> <h3 class="has-text-weight-bold is-size-4 has-text-link">Second Child</h3> <hr style="margin-top: 0.5em; margin-bottom: 0.5em;"> </div> <div class="column is-one-third"> <label class="label" for="second_child_name">Name</label> <input class="input" id="second_child_name" ref="second_child_name" type="text"> </div> <div class="column is-one-third"> <label class="label" for="second_child_age">Age</label> <input class="input" id="second_child_age" ref="second_child_age" type="number"> </div> <div class="column is-one-third"> <label class="label" for="second_child_class">Class</label> <input class="input" id="second_child_class" ref="second_child_class" type="text"> </div> <div class="column is-one-third"> <label class="label" for="second_child_section">Section</label> <input class="input" id="second_child_section" ref="second_child_section" type="text" onkeyup="this.value = this.value.toUpperCase();"> </div> <div class="column is-one-third"> <label class="label" for="second_enrol">Enroll No.</label> <input class="input" id="second_enrol" ref="second_enrol" type="text"> </div> <div class="column is-one-third"> <label class="label" for="second_child_school">School</label> <input class="input" id="second_child_school" ref="second_child_school" type="text"> </div> <div class="column is-full"> <h3 class="has-text-weight-bold is-size-4 has-text-link">Third Child</h3> <hr style="margin-top: 0.5em; margin-bottom: 0.5em;"> </div> <div class="column is-one-third"> <label class="label" for="third_child_name">Name</label> <input class="input" id="third_child_name" ref="third_child_name" type="text"> </div> <div class="column is-one-third"> <label class="label" for="third_child_age">Age</label> <input class="input" id="third_child_age" ref="third_child_age" type="number"> </div> <div class="column is-one-third"> <label class="label" for="third_child_class">Class</label> <input class="input" id="third_child_class" ref="third_child_class" type="text"> </div> <div class="column is-one-third"> <label class="label" for="third_child_section">Section</label> <input class="input" id="third_child_section" ref="third_child_section" type="text" onkeyup="this.value = this.value.toUpperCase();"> </div> <div class="column is-one-third"> <label class="label" for="third_enrol">Enroll No.</label> <input class="input" id="third_enrol" ref="third_enrol" type="text"> </div> <div class="column is-one-third"> <label class="label" for="third_child_school">School</label> <input class="input" id="third_child_school" ref="third_child_school" type="text"> </div> <div class="column is-full"> <h3 class="has-text-weight-bold is-size-4 has-text-link">Fourth Child</h3> <hr style="margin-top: 0.5em; margin-bottom: 0.5em;"> </div> <div class="column is-one-third"> <label class="label" for="fourth_child_name">Name</label> <input class="input" id="fourth_child_name" ref="fourth_child_name" type="text"> </div> <div class="column is-one-third"> <label class="label" for="fourth_child_age">Age</label> <input class="input" id="fourth_child_age" ref="fourth_child_age" type="number"> </div> <div class="column is-one-third"> <label class="label" for="fourth_child_class">Class</label> <input class="input" id="fourth_child_class" ref="fourth_child_class" type="text"> </div> <div class="column is-one-third"> <label class="label" for="fourth_child_section">Section</label> <input class="input" id="fourth_child_section" ref="fourth_child_section" type="text" onkeyup="this.value = this.value.toUpperCase();"> </div> <div class="column is-one-third"> <label class="label" for="fourth_enrol">Enroll No.</label> <input class="input" id="fourth_enrol" ref="fourth_enrol" type="text"> </div> <div class="column is-one-third"> <label class="label" for="fourth_child_school">School</label> <input class="input" id="fourth_child_school" ref="fourth_child_school" type="text"> </div> <div class="column is-full"> <button class="button is-primary has-text-weight-bold adjusted-top" onclick="{closeSiblingInformation}">Previous </button> <button class="button is-info has-text-weight-bold adjusted-top" onclick="{addOtherInformation}">Next >> </button> <button class="button is-danger has-text-weight-bold adjusted-top" onclick="{close}">Cancel </button> </div> </div> </div> </section> <section class=" is-fluid" show="{student_view ==\'add_other_information\'}"> <div class="box"> <div class="columns is-variable is-1 is-multiline"> <div class="column is-full"> <h3 class="has-text-weight-bold is-size-4 has-text-link">Areas Where Parent(Father or Mentor) can contribute to the school</h3> <hr style="margin-top: 0.5em; margin-bottom: 0.5em;"> </div> <div class=" column has-text-centered"> <table class="table is-fullwidth is-striped is-hoverable is-narrow"> <tbody> <tr> <td> <input type="checkbox" id="music" ref="music">Music </td> <td> <input type="checkbox" id="sports" ref="sports">Sports </td> <td> <input type="checkbox" id="social" ref="social">Social Skills </td> <td> <input type="checkbox" id="media" ref="media">Media/PR </td> </tr> <tr> <td> <input type="checkbox" id="academic" ref="academic">Academic </td> <td> <input type="checkbox" id="community" ref="community"> Community Programme </td> <td> <input type="checkbox" id="painting" ref="painting"> Painting/Sculpture </td> <td> <input type="checkbox" id="information" ref="information"> Information Technology </td> </tr> <tr> <td> <input type="checkbox" id="hr_training" ref="hr_training">HR Training </td> <td> <input type="checkbox" id="medical" ref="medical">Medical </td> <td> <input type="checkbox" id="career" ref="career"> Career Counselling </td> <td> <input type="checkbox" id="communication" ref="communication"> Public Speaking / Communication Skills </td> </tr> </tbody> </table> </div> <div class="column is-full"> <h3 class="has-text-weight-bold is-size-4 has-text-link">Please Mention if either parent possesses any of the following Qualification</h3> <hr style="margin-top: 0.5em; margin-bottom: 0.5em;"> </div> <div class=" column is-full"> <table class="table is-fullwidth is-striped is-hoverable is-narrow"> <tbody> <tr> <td> <input type="checkbox" id="med" ref="med">MEd </td> <td> <input type="checkbox" id="bed" ref="bed">BEd </td> <td> <input type="checkbox" id="ttc" ref="ttc">TTC </td> <td> <input type="checkbox" id="montessori" ref="montessori"> Montessori Trained </td> </tr> </tbody> </table> </div> <div class="column is-one-third"> <label class="label" for="transport_mode">Mode of Transport</label> <div class="control"> <div class="select is-fullwidth"> <select ref="transport_mode" id="transport_mode"> <option value="None">None</option> <option value="Bus">Bus</option> <option value="Carpool">Carpool</option> <option value="Rikshaw">Rikshaw</option> <option value="Self">Self</option> </select> </div> </div> </div> <div class="column is-one-third"> <label class="label" for="school_distance">Distance from school</label> <div class="control"> <div class="select is-fullwidth"> <select ref="school_distance" id="school_distance"> <option value="1 km">1 km</option> <option value="1-2 km">1-2 km</option> <option value="More than 2 km">More than 2 km</option> </select> </div> </div> </div> <div class="column is-one-third"> <label class="label" for="differently_abled">If child is Differently Abled</label> <div class="control"> <div class="select is-fullwidth"> <select ref="differently_abled" id="differently_abled"> <option value="None">None</option> <option value="In seeing">In seeing</option> <option value="In hearing">In hearing</option> <option value="In speaking">In speaking</option> <option value="In movement">In movement</option> <option value="In mental ability">In mental ability</option> </select> </div> </div> </div> <div class="column is-full"> <button class="button is-primary has-text-weight-bold adjusted-top" onclick="{closeOtherInformation}">Previous </button> <button class="button is-info has-text-weight-bold adjusted-top" onclick="{addInformation}">Submit </button> <button class="button is-danger has-text-weight-bold adjusted-top" onclick="{close}">Cancel </button> </div> </div> </div> </section>', '', '', function(opts) {

	var self = this
    self.on("mount", function(){
    	self.title='Add'
    	self.student_view = 'show_student'
    	self.is_student_picture=false
    	self.student_picture=false
    	self.role = getCookie('role')
    	self.readStandard()
    	self.readSection()
    	self.readHouse()
    	self.readCategory()
    	self.readReligion()
    	self.staff_name = true
        self.update()
        flatpickr(".date", {
	    	altInput: true,
	    	altFormat: "d/m/Y",
	    	dateFormat: "Y-m-d",
  		})
    })

    self.on("unmount", function(){
      studentStore.off('read_standard_changed',StandardChanged)
      studentStore.off('read_section_changed',SectionChanged)
      studentStore.off('read_house_changed',HouseChanged)
      studentStore.off('read_cast_changed',CastChanged)
      studentStore.off('read_religion_changed',ReligionChanged)
      studentStore.off('read_student_changed',StudentChanged)
      studentStore.off('add_student_changed',AddStudentChanged)
      studentStore.off('read_for_edit_student_changed',ReadForEditStudentChanged)
    })

    self.getStudentData = () =>{
    	if(self.refs.read_enroll_number.value==""){
    		studentStore.trigger('read_student', self.refs.read_standard_id.value,self.refs.read_section_id.value,0)
    	}else{
    		studentStore.trigger('read_student', self.refs.read_standard_id.value,self.refs.read_section_id.value,
      	self.refs.read_enroll_number.value)
    	}

    }

    self.add_new_student = () =>{
    	self.student_view='add_student'
    	self.update()
    	document.getElementById("first_name").focus()
    }

    self.close = () =>{
    	self.student_view = 'show_student'
    }

    self.GetStaffName = () =>{
    	if(self.refs.staff_child.value == "Y"){
    		self.staff_name = true
    	}else{
    		self.staff_name = false
    	}
    }

    self.addFatherInformation = () =>{
    	var phoneno = /^\d{10}$/;
    	if(!self.refs.first_name.value){
    		toastr.error("Please enter First Name and try again")
    		return;
    	}else if(!self.refs.enroll_number.value){
        	toastr.error("Please enter Enroll No and try again")
        	return;
      	}else if(!self.refs.dob.value){
        	toastr.error("Please enter DOB and try again")
        	return;
      	}else if(!self.refs.mobile.value){
        	toastr.error("Please enter SMS No and try again")
        	return;
      	}else if(!self.refs.mobile.value.match(phoneno)){
        	toastr.error("Please enter Valid SMS No and try again")
        	return;
      	}else if(!self.refs.doa.value){
        	toastr.error("Please enter DOA and try again")
        	return;
      	}else if(!self.refs.doj.value){
        	toastr.error("Please enter DOJ and try again")
        	return;
      	}else{
    		self.student_view='add_father_information'
    		self.update()
    		document.getElementById("f_title").focus()
      	}
    }
    self.closeFatherInformation = () =>{
    	self.student_view = 'add_student'
    	self.update()
    }
    self.addMotherInformation = () =>{
    	if(!self.refs.f_name.value){
    		toastr.error("Please enter Father Name and try again")
    		return;
    	}else{
    		self.student_view='add_mother_information'
    		self.update()
    		document.getElementById("m_title").focus()
      	}
    }
    self.closeMotherInformation = () =>{
    	self.student_view = 'add_father_information'
    	self.update()
    }

    self.addGuardianInformation = () =>{
    	if(!self.refs.m_name.value){
    		toastr.error("Please enter Mother Name and try again")
    		return;
    	}else{
    		self.student_view='add_guardian_information'
    		self.update()
    		document.getElementById("guardian").focus()
      	}
    }
    self.closeGuardianInformation = () =>{
    	self.student_view = 'add_mother_information'
    }
    self.addOtherInformation = () =>{
    	if(!self.refs.g_name.value){
    		toastr.error("Please enter Guardian Name and try again")
    		return;
    	}else{
    		self.student_view='add_other_information'
    		self.update()
      	}
    }
    self.closeOtherInformation = () =>{
    	self.student_view = 'add_sibling_information'
    }

    self.addSiblingInformation = () =>{
    	self.student_view='add_sibling_information'
    	self.update()
    }

    self.closeSiblingInformation = () =>{
    	self.student_view = 'add_guardian_information'
    }

    self.getGuardianInformation = () =>{
    	if(self.refs.is_guardian.value == 'Father'){
    		document.getElementById("g_title").disabled = true;
    		document.getElementById("g_name").disabled = true;
    		document.getElementById("g_occupation").disabled = true;
    		document.getElementById("g_organisation_type").disabled = true;
    		document.getElementById("g_annual_income").disabled = true;
    		document.getElementById("g_work_profile").disabled = true;
    		document.getElementById("g_organisation_name").disabled = true;
    		document.getElementById("g_designation").disabled = true;
    		document.getElementById("g_department").disabled = true;
    		document.getElementById("g_office_add_l1").disabled = true;
    		document.getElementById("g_office_add_l2").disabled = true;
    		document.getElementById("g_office_city").disabled = true;
    		document.getElementById("g_office_zip").disabled = true;
    		document.getElementById("g_office_state").disabled = true;
    		document.getElementById("g_office_state").disabled = true;
    		document.getElementById("g_office_country").disabled = true;
    		document.getElementById("g_office_phone").disabled = true;
    		document.getElementById("g_qualification").disabled = true;
    		document.getElementById("g_other_qualification").disabled = true;
    		document.getElementById("g_add_l1").disabled = true;
    		document.getElementById("g_add_l2").disabled = true;
    		document.getElementById("g_city").disabled = true;
    		document.getElementById("g_zip").disabled = true;
    		document.getElementById("g_state").disabled = true;
    		document.getElementById("g_country").disabled = true;
    		document.getElementById("g_mobile").disabled = true;
    		document.getElementById("g_email").disabled = true;
    		document.getElementById("g_nationality").disabled = true;
    		document.getElementById("g_relation").disabled = true;
    		self.refs.g_title.value = self.refs.f_title.value
    		self.refs.g_name.value = self.refs.f_name.value
    		self.refs.g_occupation.value = self.refs.f_occupation.value
    		self.refs.g_organisation_type.value = self.refs.f_organisation_type.value
    		self.refs.g_annual_income.value = self.refs.f_annual_income.value
    		self.refs.g_work_profile.value = self.refs.f_work_profile.value
    		self.refs.g_organisation_name.value = self.refs.f_organisation_name.value
    		self.refs.g_designation.value = self.refs.f_designation.value
    		self.refs.g_department.value = self.refs.f_department.value
    		self.refs.g_office_add_l1.value = self.refs.f_office_add_l1.value
    		self.refs.g_office_add_l2.value = self.refs.f_office_add_l2.value
    		self.refs.g_office_city.value = self.refs.f_office_city.value
    		self.refs.g_office_zip.value = self.refs.f_office_zip.value
    		self.refs.g_office_state.value = self.refs.f_office_state.value
    		self.refs.g_office_country.value = self.refs.f_office_country.value
    		self.refs.g_office_phone.value = self.refs.f_office_phone.value
    		self.refs.g_qualification.value = self.refs.f_qualification.value
    		self.refs.g_other_qualification.value = self.refs.f_other_qualification.value
    		self.refs.g_add_l1.value = self.refs.f_add_l1.value
    		self.refs.g_add_l2.value = self.refs.f_add_l2.value
    		self.refs.g_city.value = self.refs.f_city.value
    		self.refs.g_zip.value = self.refs.f_zip.value
    		self.refs.g_state.value = self.refs.f_state.value
    		self.refs.g_country.value = self.refs.f_country.value
    		self.refs.g_mobile.value = self.refs.f_mobile.value
    		self.refs.g_email.value = self.refs.f_email.value
    		self.refs.g_nationality.value = self.refs.f_nationality.value
    		self.refs.g_relation.value = self.refs.guardian.value

    	}else if(self.refs.is_guardian.value == 'Mother'){
    		document.getElementById("g_title").disabled = true;
    		document.getElementById("g_name").disabled = true;
    		document.getElementById("g_occupation").disabled = true;
    		document.getElementById("g_organisation_type").disabled = true;
    		document.getElementById("g_annual_income").disabled = true;
    		document.getElementById("g_work_profile").disabled = true;
    		document.getElementById("g_organisation_name").disabled = true;
    		document.getElementById("g_designation").disabled = true;
    		document.getElementById("g_department").disabled = true;
    		document.getElementById("g_office_add_l1").disabled = true;
    		document.getElementById("g_office_add_l2").disabled = true;
    		document.getElementById("g_office_city").disabled = true;
    		document.getElementById("g_office_zip").disabled = true;
    		document.getElementById("g_office_state").disabled = true;
    		document.getElementById("g_office_state").disabled = true;
    		document.getElementById("g_office_country").disabled = true;
    		document.getElementById("g_office_phone").disabled = true;
    		document.getElementById("g_qualification").disabled = true;
    		document.getElementById("g_other_qualification").disabled = true;
    		document.getElementById("g_add_l1").disabled = true;
    		document.getElementById("g_add_l2").disabled = true;
    		document.getElementById("g_city").disabled = true;
    		document.getElementById("g_zip").disabled = true;
    		document.getElementById("g_state").disabled = true;
    		document.getElementById("g_country").disabled = true;
    		document.getElementById("g_mobile").disabled = true;
    		document.getElementById("g_email").disabled = true;
    		document.getElementById("g_nationality").disabled = true;
    		document.getElementById("g_relation").disabled = true;
    		self.refs.g_title.value = self.refs.m_title.value
    		self.refs.g_name.value = self.refs.m_name.value
    		self.refs.g_occupation.value = self.refs.m_occupation.value
    		self.refs.g_organisation_type.value = self.refs.m_organisation_type.value
    		self.refs.g_annual_income.value = self.refs.m_annual_income.value
    		self.refs.g_work_profile.value = self.refs.m_work_profile.value
    		self.refs.g_organisation_name.value = self.refs.m_organisation_name.value
    		self.refs.g_designation.value = self.refs.m_designation.value
    		self.refs.g_department.value = self.refs.m_department.value
    		self.refs.g_office_add_l1.value = self.refs.m_office_add_l1.value
    		self.refs.g_office_add_l2.value = self.refs.m_office_add_l2.value
    		self.refs.g_office_city.value = self.refs.m_office_city.value
    		self.refs.g_office_zip.value = self.refs.m_office_zip.value
    		self.refs.g_office_state.value = self.refs.m_office_state.value
    		self.refs.g_office_country.value = self.refs.m_office_country.value
    		self.refs.g_office_phone.value = self.refs.m_office_phone.value
    		self.refs.g_qualification.value = self.refs.m_qualification.value
    		self.refs.g_other_qualification.value = self.refs.m_other_qualification.value
    		self.refs.g_add_l1.value = self.refs.m_add_l1.value
    		self.refs.g_add_l2.value = self.refs.m_add_l2.value
    		self.refs.g_city.value = self.refs.m_city.value
    		self.refs.g_zip.value = self.refs.m_zip.value
    		self.refs.g_state.value = self.refs.m_state.value
    		self.refs.g_country.value = self.refs.m_country.value
    		self.refs.g_mobile.value = self.refs.m_mobile.value
    		self.refs.g_email.value = self.refs.m_email.value
    		self.refs.g_nationality.value = self.refs.m_nationality.value
    		self.refs.g_relation.value = self.refs.guardian.value
    	}else {
    		document.getElementById("g_title").disabled = false;
    		document.getElementById("g_name").disabled = false;
    		document.getElementById("g_occupation").disabled = false;
    		document.getElementById("g_organisation_type").disabled = false;
    		document.getElementById("g_annual_income").disabled = false;
    		document.getElementById("g_work_profile").disabled = false;
    		document.getElementById("g_organisation_name").disabled = false;
    		document.getElementById("g_designation").disabled = false;
    		document.getElemenis_tById("g_department").disabled = false;
    		document.getElementById("g_office_add_l1").disabled = false;
    		document.getElementById("g_office_add_l2").disabled = false;
    		document.getElementById("g_office_city").disabled = false;
    		document.getElementById("g_office_zip").disabled = false;
    		document.getElementById("g_office_state").disabled = false;
    		document.getElementById("g_office_state").disabled = false;
    		document.getElementById("g_office_country").disabled = false;
    		document.getElementById("g_office_phone").disabled = false;
    		document.getElementById("g_qualification").disabled = false;
    		document.getElementById("g_other_qualification").disabled = false;
    		document.getElementById("g_add_l1").disabled = false;
    		document.getElementById("g_add_l2").disabled = false;
    		document.getElementById("g_city").disabled = false;
    		document.getElementById("g_zip").disabled = false;
    		document.getElementById("g_state").disabled = false;
    		document.getElementById("g_country").disabled = false;
    		document.getElementById("g_mobile").disabled = false;
    		document.getElementById("g_email").disabled = false;
    		document.getElementById("g_nationality").disabled = false;
    		document.getElementById("g_relation").disabled = false;
    		self.refs.g_title.value = ''
    		self.refs.g_name.value = ''
    		self.refs.g_occupation.value = ''
    		self.refs.g_organisation_type.value = ''
    		self.refs.g_annual_income.value = ''
    		self.refs.g_work_profile.value = ''
    		self.refs.g_organisation_name.value = ''
    		self.refs.g_designation.value = ''
    		self.refs.g_department.value = ''
    		self.refs.g_office_add_l1.value = ''
    		self.refs.g_office_add_l2.value = ''
    		self.refs.g_office_city.value = ''
    		self.refs.g_office_zip.value = ''
    		self.refs.g_office_state.value = ''
    		self.refs.g_office_country.value = ''
    		self.refs.g_office_phone.value = ''
    		self.refs.g_qualification.value = ''
    		self.refs.g_other_qualification.value = ''
    		self.refs.g_add_l1.value = ''
    		self.refs.g_add_l2.value = ''
    		self.refs.g_city.value = ''
    		self.refs.g_zip.value = ''
    		self.refs.g_state.value = ''
    		self.refs.g_country.value = ''
    		self.refs.g_mobile.value = ''
    		self.refs.g_email.value = ''
    		self.refs.g_nationality.value = ''
    		self.refs.g_relation.value = ''
    	}
    }
    self.copyAddress = (e) => {
    	let cbox = '#correspondenceCheckbox'
    	if($(cbox).prop('checked') == true){
    		console.log("true")
    		self.refs.c_add_l1.value=self.refs.p_add_l1.value
    		self.refs.c_add_l2.value=self.refs.p_add_l2.value
    		self.refs.c_city.value=self.refs.p_city.value
    		self.refs.c_zip.value=self.refs.p_zip.value
    		self.refs.c_state.value=self.refs.p_state.value
    		self.refs.c_country.value=self.refs.p_country.value
    		self.update()
    	}else{
    		console.log("false")
    		self.refs.c_add_l1.value=''
    		self.refs.c_add_l2.value=''
    		self.refs.c_city.value=''
    		self.refs.c_zip.value=''
    		self.refs.c_state.value=''
    		self.refs.c_country.value=''
    	}
    }
    self.copyFatherAddress = (e) => {
    	let cbox = '#fatherCorrespondenceCheckbox'
    	if($(cbox).prop('checked') == true){
    		console.log("true")
    		self.refs.f_add_l1.value=self.refs.c_add_l1.value
    		self.refs.f_add_l2.value=self.refs.c_add_l2.value
    		self.refs.f_city.value=self.refs.c_city.value
    		self.refs.f_zip.value=self.refs.c_zip.value
    		self.refs.f_state.value=self.refs.c_state.value
    		self.refs.f_country.value=self.refs.c_country.value
    		self.update()
    	}else{
    		console.log("false")
    		self.refs.f_add_l1.value=''
    		self.refs.f_add_l2.value=''
    		self.refs.f_city.value=''
    		self.refs.f_zip.value=''
    		self.refs.f_state.value=''
    		self.refs.f_country.value=''
    	}
    }
    self.copyMotherAddress = (e) => {
    	let cbox = '#motherCorrespondenceCheckbox'
    	if($(cbox).prop('checked') == true){
    		console.log("true")
    		self.refs.m_add_l1.value=self.refs.f_add_l1.value
    		self.refs.m_add_l2.value=self.refs.f_add_l2.value
    		self.refs.m_city.value=self.refs.f_city.value
    		self.refs.m_zip.value=self.refs.f_zip.value
    		self.refs.m_state.value=self.refs.f_state.value
    		self.refs.m_country.value=self.refs.f_country.value
    		self.update()
    	}else{
    		console.log("false")
    		self.refs.m_add_l1.value=''
    		self.refs.m_add_l2.value=''
    		self.refs.m_city.value=''
    		self.refs.m_zip.value=''
    		self.refs.m_state.value=''
    		self.refs.m_country.value=''
    	}
    }

	self.remove_picture = (item1, item2, e) => {
		console.log('item1'+item1)
		console.log('item2'+item2)
		var pp_box = document.getElementById(item1);
		pp_box.style.backgroundImage = "";
		document.getElementById(item2).value = ""
		event.stopPropagation();
	}

	self.trigger_file_input = (item,e) => {
		document.getElementById(item).click();
	}

     self.loadFile = (item,event) => {
		var reader = new FileReader();
		reader.onload = function (e) {
			console.log(item)
			document.getElementById(item).style.backgroundImage = 'url(' + e.target.result + ')';
			console.log(e.target.result)
			self.is_student_image=true
		};
		reader.readAsDataURL(event.target.files[0]);

		console.log(event.target.files[0])
		self.student_picture = event.target.files[0]
	}

	self.remove_father_picture = (item1, item2, e) => {
		console.log('item1'+item1)
		console.log('item2'+item2)
		var f_pp_box = document.getElementById(item1);
		f_pp_box.style.backgroundImage = "";
		document.getElementById(item2).value = ""
		event.stopPropagation();
	}

	self.trigger_father_file_input = (item,e) => {
		document.getElementById(item).click();
	}

     self.loadFatherFile = (item,event) => {
		var reader = new FileReader();
		reader.onload = function (e) {
			console.log(item)
			document.getElementById(item).style.backgroundImage = 'url(' + e.target.result + ')';
			console.log(e.target.result)
			self.is_father_image=true
		};
		reader.readAsDataURL(event.target.files[0]);

		console.log(event.target.files[0])
		self.father_picture = event.target.files[0]
	}

	self.remove_mother_picture = (item1, item2, e) => {
		console.log('item1'+item1)
		console.log('item2'+item2)
		var m_pp_box = document.getElementById(item1);
		m_pp_box.style.backgroundImage = "";
		document.getElementById(item2).value = ""
		event.stopPropagation();
	}

	self.trigger_mother_file_input = (item,e) => {
		document.getElementById(item).click();
	}

     self.loadMotherFile = (item,event) => {
		var reader = new FileReader();
		reader.onload = function (e) {
			console.log(item)
			document.getElementById(item).style.backgroundImage = 'url(' + e.target.result + ')';
			console.log(e.target.result)
			self.is_mother_image=true
		};
		reader.readAsDataURL(event.target.files[0]);

		console.log(event.target.files[0])
		self.mother_picture = event.target.files[0]
	}

	self.remove_guardian_picture = (item1, item2, e) => {
		console.log('item1'+item1)
		console.log('item2'+item2)
		var m_pp_box = document.getElementById(item1);
		m_pp_box.style.backgroundImage = "";
		document.getElementById(item2).value = ""
		event.stopPropagation();
	}

	self.trigger_guardian_file_input = (item,e) => {
		document.getElementById(item).click();
	}

     self.loadGuardianFile = (item,event) => {
		var reader = new FileReader();
		reader.onload = function (e) {
			console.log(item)
			document.getElementById(item).style.backgroundImage = 'url(' + e.target.result + ')';
			console.log(e.target.result)
			self.is_guardian_image=true
		};
		reader.readAsDataURL(event.target.files[0]);

		console.log(event.target.files[0])
		self.guardian_picture = event.target.files[0]
	}

	 self.readStandard = () => {
       studentStore.trigger('read_standard')
    }

    self.readSection = () => {
       studentStore.trigger('read_section')
    }

    self.readHouse = () => {
       studentStore.trigger('read_house')
    }

    self.readCategory = () => {
       studentStore.trigger('read_cast')
    }

    self.readReligion = () => {
       studentStore.trigger('read_religion')
    }

	self.getSection = () => {
    	self.filteredSections = []
    	self.filteredSections = self.sections.filter(s => {
    		return s.standard_id == self.refs.standard_id.value
    	})
    }

    self.getReadSection = () => {
    	self.readfilteredSections = []
    	self.readfilteredSections = self.sections.filter(s => {
    		return s.standard_id == self.refs.read_standard_id.value
    	})
    }

    self.addInformation = () =>{
    	console.log("addInformation")
    	var obj={}

        var student={};

    	student['first_name']=self.refs.first_name.value
    	student['middle_name']=self.refs.middle_name.value
    	student['last_name']=self.refs.last_name.value

    	student['enroll_number']=self.refs.enroll_number.value
    	student['roll_number']=self.refs.roll_number.value
    	student['reg_number']=self.refs.reg_number.value
    	student['gender']=self.refs.gender.value
    	student['category_id']=self.refs.category_id.value
    	student['dob']=self.refs.dob.value
    	student['blood_group']=self.refs.blood_group.value
    	student['p_add_l1']=self.refs.p_add_l1.value
    	student['p_add_l2']=self.refs.p_add_l2.value
    	student['p_city']=self.refs.p_city.value
    	student['p_zip']=self.refs.p_zip.value
    	student['p_state']=self.refs.p_state.value
    	student['p_country']=self.refs.p_country.value
    	if($('#correspondenceCheckbox').prop('checked') == true){
    		student['is_permanent'] = 1
    	}else{
    		student['is_permanent'] = 0
    	}

    	student['c_add_l1']=self.refs.c_add_l1.value
    	student['c_add_l2']=self.refs.c_add_l2.value
    	student['c_city']=self.refs.c_city.value
    	student['c_zip']=self.refs.c_zip.value
    	student['c_state']=self.refs.c_state.value
    	student['c_country']=self.refs.c_country.value
    	student['residence_phone']=self.refs.residence_phone.value
    	student['mobile']=self.refs.mobile.value
    	student['fax']=self.refs.emergency_no.value
    	student['student_type']=self.refs.student_type.value
    	student['aadhar_no']=self.refs.aadhar_no.value
    	student['doa']=self.refs.doa.value
    	student['old_doa']=self.refs.old_doa.value
    	student['doj']=self.refs.doj.value
    	student['old_doj']=self.refs.old_doj.value
    	student['mother_tongue']=self.refs.mother_tongue.value
    	student['last_school']=self.refs.last_school.value
    	student['last_class']=self.refs.last_class.value
    	student['admission_for_class']=self.refs.admission_for_class.value
    	student['hobby']=self.refs.hobby.value
    	student['cast']=self.refs.cast.value
    	student['religion_id']=self.refs.religion_id.value
    	student['staff_child']=self.refs.staff_child.value
    	student['staff_name']=self.refs.staff_name.value

    	student['transport_mode']=self.refs.transport_mode.value
    	student['school_distance']=self.refs.school_distance.value
    	student['differently_abled']=self.refs.differently_abled.value

        obj['student']=student;

        var student_current_standing={};

    	student_current_standing['section_id']=self.refs.section_id.value
    	student_current_standing['house_id']=self.refs.house_id.value

    	obj['student_current_standing'] = student_current_standing

        var student_login={};

    	student_login['enroll_number']=self.refs.enroll_number.value
    	student_login['password']=self.refs.dob.value
    	student_login['parent_password']='123456'
    	student_login['is_active']='Y'

    	obj['student_login'] = student_login

        var parent={};

    	parent['f_title']=self.refs.f_title.value
    	parent['f_name']=self.refs.f_name.value
    	parent['f_occupation']=self.refs.f_occupation.value
    	parent['f_organisation_type']=self.refs.f_organisation_type.value
    	parent['f_annual_income']=self.refs.f_annual_income.value
    	parent['f_work_profile']=self.refs.f_work_profile.value
    	parent['f_organisation_name']=self.refs.f_organisation_name.value
    	parent['f_designation']=self.refs.f_designation.value
    	parent['f_department']=self.refs.f_department.value
    	parent['f_office_add_l1']=self.refs.f_office_add_l1.value
    	parent['f_office_add_l2']=self.refs.f_office_add_l2.value
    	parent['f_office_city']=self.refs.f_office_city.value
    	parent['f_office_zip']=self.refs.f_office_zip.value
    	parent['f_office_state']=self.refs.f_office_state.value
    	parent['f_office_country']=self.refs.f_office_country.value
    	parent['f_office_phone']=self.refs.f_office_phone.value
    	parent['f_school_exam_passed']=self.refs.f_qualification.value
    	parent['f_college_exam_passed']=self.refs.f_other_qualification.value

    	if($('#fatherCorrespondenceCheckbox').prop('checked') == true){
    		parent['is_caddress'] = 1
    	}else{
    		parent['is_caddress'] = 0
    	}

    	parent['f_add_l1']=self.refs.f_add_l1.value
    	parent['f_add_l2']=self.refs.f_add_l2.value
    	parent['f_city']=self.refs.f_city.value
    	parent['f_zip']=self.refs.f_zip.value
    	parent['f_state']=self.refs.f_state.value
    	parent['f_country']=self.refs.f_country.value
    	parent['f_mobile']=self.refs.f_mobile.value
    	parent['f_email']=self.refs.f_email.value
    	parent['f_nationality']=self.refs.f_nationality.value

    	parent['m_title']=self.refs.m_title.value
    	parent['m_name']=self.refs.m_name.value
    	parent['m_occupation']=self.refs.m_occupation.value
    	parent['m_organisation_type']=self.refs.m_organisation_type.value
    	parent['m_annual_income']=self.refs.m_annual_income.value
    	parent['m_work_profile']=self.refs.m_work_profile.value
    	parent['m_organisation_name']=self.refs.m_organisation_name.value
    	parent['m_designation']=self.refs.m_designation.value
    	parent['m_department']=self.refs.m_department.value
    	parent['m_office_add_l1']=self.refs.m_office_add_l1.value
    	parent['m_office_add_l2']=self.refs.m_office_add_l2.value
    	parent['m_office_city']=self.refs.m_office_city.value
    	parent['m_office_zip']=self.refs.m_office_zip.value
    	parent['m_office_state']=self.refs.m_office_state.value
    	parent['m_office_country']=self.refs.m_office_country.value
    	parent['m_office_phone']=self.refs.m_office_phone.value
    	parent['m_school_exam_passed']=self.refs.m_qualification.value
    	parent['m_college_exam_passed']=self.refs.m_other_qualification.value

		if($('#motherCorrespondenceCheckbox').prop('checked') == true){
    		parent['is_motherAdd'] = 1
    	}else{
    		parent['is_motherAdd'] = 0
    	}

    	parent['m_add_l1']=self.refs.m_add_l1.value
    	parent['m_add_l2']=self.refs.m_add_l2.value
    	parent['m_city']=self.refs.m_city.value
    	parent['m_zip']=self.refs.m_zip.value
    	parent['m_state']=self.refs.m_state.value
    	parent['m_country']=self.refs.m_country.value
    	parent['m_mobile']=self.refs.m_mobile.value
    	parent['m_email']=self.refs.m_email.value
    	parent['m_nationality']=self.refs.m_nationality.value

    	if($('#motherCorrespondenceCheckbox').prop('checked') == true){
    		parent['is_motherAdd'] = 1
    	}else{
    		parent['is_motherAdd'] = 0
    	}
    	if(self.refs.is_guardian.value == 'Father'){
    		parent['is_guardian'] = 'Father'
    	}else if(self.refs.is_guardian.value == 'Mother'){
    		parent['is_guardian'] = 'Mother'
    	}else{
    		parent['is_guardian'] = 'Other'
    	}

        parent['g_title']=self.refs.g_title.value
    	parent['g_name']=self.refs.g_name.value
    	parent['g_occupation']=self.refs.g_occupation.value
    	parent['g_organisation_type']=self.refs.g_organisation_type.value
    	parent['g_annual_income']=self.refs.g_annual_income.value
    	parent['g_work_profile']=self.refs.g_work_profile.value
    	parent['g_organisation_name']=self.refs.g_organisation_name.value
    	parent['g_designation']=self.refs.g_designation.value
    	parent['g_department']=self.refs.g_department.value
    	parent['g_office_add_l1']=self.refs.g_office_add_l1.value
    	parent['g_office_add_l2']=self.refs.g_office_add_l2.value
    	parent['g_office_city']=self.refs.g_office_city.value
    	parent['g_office_zip']=self.refs.g_office_zip.value
    	parent['g_office_state']=self.refs.g_office_state.value
    	parent['g_office_country']=self.refs.g_office_country.value
    	parent['g_office_phone']=self.refs.g_office_phone.value
    	parent['g_school_exam_passed']=self.refs.g_qualification.value
    	parent['g_college_exam_passed']=self.refs.g_other_qualification.value
    	parent['g_add_l1']=self.refs.g_add_l1.value
    	parent['g_add_l2']=self.refs.g_add_l2.value
    	parent['g_city']=self.refs.g_city.value
    	parent['g_zip']=self.refs.g_zip.value
    	parent['g_state']=self.refs.g_state.value
    	parent['g_country']=self.refs.g_country.value
    	parent['g_phone']=self.refs.g_phone.value
    	parent['g_mobile']=self.refs.g_mobile.value
    	parent['g_email']=self.refs.g_email.value
    	parent['g_nationality']=self.refs.g_nationality.value
    	parent['g_relation']=self.refs.g_relation.value

    	parent['first_child_name']=self.refs.first_child_name.value
    	parent['first_child_age']=self.refs.first_child_age.value
    	parent['first_child_class']=self.refs.first_child_class.value
    	parent['first_child_section']=self.refs.first_child_section.value
    	parent['first_enrol']=self.refs.first_enrol.value
    	parent['first_child_school']=self.refs.first_child_school.value

    	parent['second_child_name']=self.refs.second_child_name.value
    	parent['second_child_age']=self.refs.second_child_age.value
    	parent['second_child_class']=self.refs.second_child_class.value
    	parent['second_child_section']=self.refs.second_child_section.value
    	parent['second_enrol']=self.refs.second_enrol.value
    	parent['second_child_school']=self.refs.second_child_school.value

    	parent['third_child_name']=self.refs.third_child_name.value
    	parent['third_child_age']=self.refs.third_child_age.value
    	parent['third_child_class']=self.refs.third_child_class.value
    	parent['third_child_section']=self.refs.third_child_section.value
    	parent['third_enrol']=self.refs.third_enrol.value
    	parent['third_child_school']=self.refs.third_child_school.value

    	parent['fourth_child_name']=self.refs.fourth_child_name.value
    	parent['fourth_child_age']=self.refs.fourth_child_age.value
    	parent['fourth_child_class']=self.refs.fourth_child_class.value
    	parent['fourth_child_section']=self.refs.fourth_child_section.value
    	parent['fourth_enrol']=self.refs.fourth_enrol.value
    	parent['fourth_child_school']=self.refs.fourth_child_school.value

    	if($('#music').prop('checked') == true){
    		parent['music'] = 1
    	}else{
    		parent['music'] = 0
    	}

    	if($('#sports').prop('checked') == true){
    		parent['sports'] = 1
    	}else{
    		parent['sports'] = 0
    	}

    	if($('#social').prop('checked') == true){
    		parent['social'] = 1
    	}else{
    		parent['social'] = 0
    	}

    	if($('#media').prop('checked') == true){
    		parent['media'] = 1
    	}else{
    		parent['media'] = 0
    	}

    	if($('#academic').prop('checked') == true){
    		parent['academic'] = 1
    	}else{
    		parent['academic'] = 0
    	}

    	if($('#community').prop('checked') == true){
    		parent['community'] = 1
    	}else{
    		parent['community'] = 0
    	}

    	if($('#painting').prop('checked') == true){
    		parent['painting'] = 1
    	}else{
    		parent['painting'] = 0
    	}

    	if($('#information').prop('checked') == true){
    		parent['information'] = 1
    	}else{
    		parent['information'] = 0
    	}

    	if($('#hr_training').prop('checked') == true){
    		parent['hr_training'] = 1
    	}else{
    		parent['hr_training'] = 0
    	}

    	if($('#medical').prop('checked') == true){
    		parent['medical'] = 1
    	}else{
    		parent['medical'] = 0
    	}

    	if($('#career').prop('checked') == true){
    		parent['career'] = 1
    	}else{
    		parent['career'] = 0
    	}

    	if($('#communication').prop('checked') == true){
    		parent['communication'] = 1
    	}else{
    		parent['communication'] = 0
    	}

    	if($('#med').prop('checked') == true){
    		parent['med'] = 1
    	}else{
    		parent['med'] = 0
    	}

    	if($('#bed').prop('checked') == true){
    		parent['bed'] = 1
    	}else{
    		parent['bed'] = 0
    	}

    	if($('#ttc').prop('checked') == true){
    		parent['ttc'] = 1
    	}else{
    		parent['ttc'] = 0
    	}

    	if($('#montessori').prop('checked') == true){
    		parent['montessori'] = 1
    	}else{
    		parent['montessori'] = 0
    	}

    	obj['parent']=parent

    	studentStore.trigger('add_student', obj)
    }

    self.edit = (c,st) => {
      console.log(c)
      self.student_id = c
      flatpickr(".date", {
    	allowInput: true,
    	altFormat: "d/m/Y",
    	dateFormat: "Y-m-d",
  		})
      studentStore.trigger('read_for_edit_student',self.student_id)
      self.add_new_student()
      self.title='Update'

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

    studentStore.on('read_house_changed',HouseChanged)
    function HouseChanged(houses){
      console.log(houses)
      self.houses = houses
      self.update()
    }

    studentStore.on('read_cast_changed',CastChanged)
    function CastChanged(cast){
      console.log(cast)
      self.cast = cast
      self.update()
    }

    studentStore.on('read_religion_changed',ReligionChanged)
    function ReligionChanged(religion){
      console.log(religion)
      self.religion = religion
      self.update()
    }

    studentStore.on('read_student_changed',StudentChanged)
    function StudentChanged(students){
      console.log(students)
      self.students = students
      self.update()
    }

    studentStore.on('add_student_changed',AddStudentChanged)
    function AddStudentChanged(students){
      console.log(students)
      self.students = students
      self.update()
    }

    studentStore.on('read_for_edit_student_changed',ReadForEditStudentChanged)
    function ReadForEditStudentChanged(student_details){
     	console.log(student_details)
      	flatpickr(".date", {
    		allowInput: true,
    		altFormat: "d/m/Y",
    		dateFormat: "Y-m-d",
  		})
      	self.student_details = student_details
      	self.refs.first_name.value = student_details[0].first_name
      	self.refs.middle_name.value = student_details[0].middle_name
      	self.refs.last_name.value = student_details[0].last_name
      	self.refs.standard_id.value = student_details[0].standard_id
      	self.filteredSections = []
    	self.filteredSections = self.sections.filter(s => {
    		return s.standard_id == student_details[0].standard_id
    	})
    	self.refs.house_id.value = student_details[0].house_id
    	self.refs.enroll_number.value = student_details[0].enroll_number
		self.refs.roll_number.value = student_details[0].roll_number
		self.refs.reg_number.value = student_details[0].reg_number
		self.refs.gender.value = student_details[0].gender
		self.refs.category_id.value = student_details[0].category_id
		self.refs.dob.value = student_details[0].edit_dob
		self.refs.blood_group.value = student_details[0].blood_group
		self.refs.p_add_l1.value = student_details[0].p_add_l1
		self.refs.p_add_l2.value = student_details[0].p_add_l2
		self.refs.p_city.value = student_details[0].p_city
		self.refs.p_zip.value = student_details[0].p_zip
		self.refs.p_state.value = student_details[0].p_state
		self.refs.p_country.value = student_details[0].p_country

		if(student_details[0].is_permanent == 1){
			$('#correspondenceCheckbox').prop('checked', true)
		}
		else{
			$('#correspondenceCheckbox').prop('checked', false)
		}
		self.refs.c_add_l1.value=student_details[0].c_add_l1
    	self.refs.c_add_l2.value=student_details[0].c_add_l2
    	self.refs.c_city.value=student_details[0].c_city
    	self.refs.c_zip.value=student_details[0].c_zip
    	self.refs.c_state.value=student_details[0].c_state
    	self.refs.c_country.value=student_details[0].c_country

		self.refs.mobile.value = student_details[0].mobile
		self.refs.emergency_no.value = student_details[0].fax
		self.refs.student_type.value = student_details[0].student_type
		self.refs.aadhar_no.value = student_details[0].aadhar_no
		self.refs.doa.value = student_details[0].edit_doa
		self.refs.old_doa.value = student_details[0].edit_old_doa
		self.refs.doj.value = student_details[0].edit_doj
		self.refs.old_doj.value = student_details[0].edit_old_doj
		self.refs.mother_tongue.value = student_details[0].mother_tongue
		self.refs.last_school.value = student_details[0].last_school
		self.refs.last_class.value = student_details[0].last_class
		self.refs.admission_for_class.value = student_details[0].admission_for_class
		self.refs.hobby.value = student_details[0].hobby
		self.refs.cast.value = student_details[0].cast
		self.refs.religion_id.value = student_details[0].religion_id
		self.refs.staff_child.value = student_details[0].staff_child
		if(self.refs.staff_child.value == "Y"){
    		self.staff_name = true
    	}else{
    		self.staff_name = false
    	}
    	self.refs.f_title.value = student_details[0].f_title
		self.refs.f_name.value = student_details[0].f_name
		self.refs.f_occupation.value = student_details[0].f_occupation
		self.refs.f_organisation_type.value = student_details[0].f_organisation_type
		self.refs.f_annual_income.value = student_details[0].f_annual_income
		self.refs.f_work_profile.value = student_details[0].f_work_profile
		self.refs.f_organisation_name.value = student_details[0].f_organisation_name
		self.refs.f_designation.value = student_details[0].f_designation
		self.refs.f_department.value = student_details[0].f_department
		self.refs.f_office_add_l1.value = student_details[0].f_office_add_l1
		self.refs.f_office_add_l2.value = student_details[0].f_office_add_l2
		self.refs.f_office_city.value = student_details[0].f_office_city
		self.refs.f_office_zip.value = student_details[0].f_office_zip
		self.refs.f_office_state.value = student_details[0].f_office_state
		self.refs.f_office_country.value = student_details[0].f_office_country
		self.refs.f_office_phone.value = student_details[0].f_office_phone
		self.refs.f_qualification.value = student_details[0].f_school_exam_passed
		self.refs.f_other_qualification.value = student_details[0].f_college_exam_passed
		self.refs.f_mobile.value = student_details[0].f_mobile
		self.refs.f_email.value = student_details[0].f_email
		self.refs.f_nationality.value = student_details[0].f_nationality

    	if(student_details[0].is_caddress == 1){
			$('#fatherCorrespondenceCheckbox').prop('checked', true)
		}
		else{
			$('#fatherCorrespondenceCheckbox').prop('checked', false)
		}
		self.refs.f_add_l1.value=student_details[0].f_add_l1
		self.refs.f_add_l2.value=student_details[0].f_add_l2
		self.refs.f_city.value=student_details[0].f_city
		self.refs.f_zip.value=student_details[0].f_zip
		self.refs.f_state.value=student_details[0].f_state
		self.refs.f_country.value=student_details[0].f_country

		self.refs.m_title.value = student_details[0].m_title
		self.refs.m_name.value = student_details[0].m_name
		self.refs.m_occupation.value = student_details[0].m_occupation
		self.refs.m_organisation_type.value = student_details[0].m_organisation_type
		self.refs.m_annual_income.value = student_details[0].m_annual_income
		self.refs.m_work_profile.value = student_details[0].m_work_profile
		self.refs.m_organisation_name.value = student_details[0].m_organisation_name
		self.refs.m_designation.value = student_details[0].m_designation
		self.refs.m_department.value = student_details[0].m_department
		self.refs.m_office_add_l1.value = student_details[0].m_office_add_l1
		self.refs.m_office_add_l2.value = student_details[0].m_office_add_l2
		self.refs.m_office_city.value = student_details[0].m_office_city
		self.refs.m_office_zip.value = student_details[0].m_office_zip
		self.refs.m_office_state.value = student_details[0].m_office_state
		self.refs.m_office_country.value = student_details[0].m_office_country
		self.refs.m_office_phone.value = student_details[0].m_office_phone
		self.refs.m_qualification.value = student_details[0].m_school_exam_passed
		self.refs.m_other_qualification.value = student_details[0].m_college_exam_passed

		if(student_details[0].is_motherAdd == 1){
			$('#motherCorrespondenceCheckbox').prop('checked', true)
		}
		else{
			$('#motherCorrespondenceCheckbox').prop('checked', false)
		}

		self.refs.m_add_l1.value = student_details[0].m_add_l1
		self.refs.m_add_l2.value = student_details[0].m_add_l2
		self.refs.m_city.value = student_details[0].m_city
		self.refs.m_zip.value = student_details[0].m_zip
		self.refs.m_state.value = student_details[0].m_state
		self.refs.m_country.value = student_details[0].m_country
		self.refs.m_mobile.value = student_details[0].m_mobile
		self.refs.m_email.value = student_details[0].m_email
		self.refs.m_nationality.value = student_details[0].m_nationality

		if(student_details[0].is_guardian == 'Father'){
			self.refs.is_guardian.value = 'Father'
		}else if(student_details[0].is_guardian == 'Father'){
			self.refs.is_guardian.value = 'Mother'
		}else{
			self.refs.is_guardian.value = 'Other'
		}
		self.refs.g_title.value = student_details[0].g_title
		self.refs.g_name.value = student_details[0].g_name
		self.refs.g_occupation.value = student_details[0].g_occupation
		self.refs.g_organisation_type.value = student_details[0].g_organisation_type
		self.refs.g_annual_income.value = student_details[0].g_annual_income
		self.refs.g_work_profile.value = student_details[0].g_work_profile
		self.refs.g_organisation_name.value = student_details[0].g_organisation_name
		self.refs.g_designation.value = student_details[0].g_designation
		self.refs.g_department.value = student_details[0].g_department
		self.refs.g_office_add_l1.value = student_details[0].g_office_add_l1
		self.refs.g_office_add_l2.value = student_details[0].g_office_add_l2
		self.refs.g_office_city.value = student_details[0].g_office_city
		self.refs.g_office_zip.value = student_details[0].g_office_zip
		self.refs.g_office_state.value = student_details[0].g_office_state
		self.refs.g_office_country.value = student_details[0].g_office_country
		self.refs.g_office_phone.value = student_details[0].g_office_phone
		self.refs.g_qualification.value = student_details[0].g_school_exam_passed
		self.refs.g_other_qualification.value = student_details[0].g_college_exam_passed
		self.refs.g_add_l1.value = student_details[0].g_add_l1
		self.refs.g_add_l2.value = student_details[0].g_add_l2
		self.refs.g_city.value = student_details[0].g_city
		self.refs.g_zip.value = student_details[0].g_zip
		self.refs.g_state.value = student_details[0].g_state
		self.refs.g_country.value = student_details[0].g_country
		self.refs.g_phone.value = student_details[0].g_phone
		self.refs.g_mobile.value = student_details[0].g_mobile
		self.refs.g_email.value = student_details[0].g_email
		self.refs.g_nationality.value = student_details[0].g_nationality
		self.refs.g_relation.value = student_details[0].g_relation

		self.refs.first_child_name.value = student_details[0].first_child_name
		self.refs.first_child_age.value = student_details[0].first_child_age
		self.refs.first_child_class.value = student_details[0].first_child_class
		self.refs.first_child_section.value = student_details[0].first_child_section
		self.refs.first_enrol.value = student_details[0].first_enrol
		self.refs.first_child_school.value = student_details[0].first_child_school
		self.refs.second_child_name.value = student_details[0].second_child_name
		self.refs.second_child_age.value = student_details[0].second_child_age
		self.refs.second_child_class.value = student_details[0].second_child_class
		self.refs.second_child_section.value = student_details[0].second_child_section
		self.refs.second_enrol.value = student_details[0].second_enrol
		self.refs.second_child_school.value = student_details[0].second_child_school
		self.refs.third_child_name.value = student_details[0].third_child_name
		self.refs.third_child_age.value = student_details[0].third_child_age
		self.refs.third_child_class.value = student_details[0].third_child_class
		self.refs.third_child_section.value = student_details[0].third_child_section
		self.refs.third_enrol.value = student_details[0].third_enrol
		self.refs.third_child_school.value = student_details[0].third_child_school
		self.refs.fourth_child_name.value = student_details[0].fourth_child_name
		self.refs.fourth_child_age.value = student_details[0].fourth_child_age
		self.refs.fourth_child_class.value = student_details[0].fourth_child_class
		self.refs.fourth_child_section.value = student_details[0].fourth_child_section
		self.refs.fourth_enrol.value = student_details[0].fourth_enrol
		self.refs.fourth_child_school.value = student_details[0].fourth_child_school

		if(student_details[0].music == 1){
			$('#music').prop('checked', true)
		}
		else{
			$('#music').prop('checked', false)
		}

		if(student_details[0].sports == 1){
			$('#sports').prop('checked', true)
		}
		else{
			$('#sports').prop('checked', false)
		}

		if(student_details[0].social == 1){
			$('#social').prop('checked', true)
		}
		else{
			$('#social').prop('checked', false)
		}

		if(student_details[0].media == 1){
			$('#media').prop('checked', true)
		}
		else{
			$('#media').prop('checked', false)
		}

		if(student_details[0].academic == 1){
			$('#academic').prop('checked', true)
		}
		else{
			$('#academic').prop('checked', false)
		}

		if(student_details[0].community == 1){
			$('#community').prop('checked', true)
		}
		else{
			$('#community').prop('checked', false)
		}

		if(student_details[0].painting == 1){
			$('#painting').prop('checked', true)
		}
		else{
			$('#painting').prop('checked', false)
		}

		if(student_details[0].information == 1){
			$('#information').prop('checked', true)
		}
		else{
			$('#information').prop('checked', false)
		}

		if(student_details[0].hr_training == 1){
			$('#hr_training').prop('checked', true)
		}
		else{
			$('#hr_training').prop('checked', false)
		}

		if(student_details[0].medical == 1){
			$('#medical').prop('checked', true)
		}
		else{
			$('#medical').prop('checked', false)
		}

		if(student_details[0].career == 1){
			$('#career').prop('checked', true)
		}
		else{
			$('#career').prop('checked', false)
		}

		if(student_details[0].communication == 1){
			$('#communication').prop('checked', true)
		}
		else{
			$('#communication').prop('checked', false)
		}

		if(student_details[0].med == 1){
			$('#med').prop('checked', true)
		}
		else{
			$('#med').prop('checked', false)
		}

		if(student_details[0].bed == 1){
			$('#bed').prop('checked', true)
		}
		else{
			$('#bed').prop('checked', false)
		}

		if(student_details[0].ttc == 1){
			$('#ttc').prop('checked', true)
		}
		else{
			$('#ttc').prop('checked', false)
		}

		if(student_details[0].montessori == 1){
			$('#montessori').prop('checked', true)
		}
		else{
			$('#montessori').prop('checked', false)
		}

		self.refs.transport_mode.value = student_details[0].transport_mode
		self.refs.school_distance.value = student_details[0].school_distance
		self.refs.differently_abled.value = student_details[0].differently_abled

		self.update()
		self.refs.staff_name.value = student_details[0].staff_name
        self.refs.section_id.value = student_details[0].section_id

    }
});
riot.tag2('top-five', '<h4>top-five</h4>', '', '', function(opts) {
});