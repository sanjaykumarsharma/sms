<activity-event>
  <print-header></print-header>
  <loading-bar if={loading}></loading-bar>
	<section class=" is-fluid">
  <h2 class="title has-text-centered is-size-5" style="color: #ff3860;">Activity Event Management</h2>
    <div class="level box no-print">
      <div class="level-left">
        <div class="columns">
          <div class="column is-narrow">
            <label class="label">Category</label>
          </div>
          <div class="column is-narrow">
          <div class="control">
            <div class="select">
              <select ref="category_id">
                <option each={categories} value={category_id}>{category_name}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="column is-narrow">
          <label class="label">Event</label>
        </div>
        <div class="column is-half">
          <div class="control">
            <input class=" input" id="addEventInput" ref="addEventInput" type="text">
          </div>
        </div>
          <div class="column">
            <button class="button is-danger has-text-weight-bold " onclick={add} > {title} </button>
          </div>
        </div>
      </div>
      <div class="level-right" >
        <div class="control">
          <input class="input" ref="searchActivityEvent" onkeyup={filterActivityEvent} type="text" placeholder="Search By Event">
        </div>
        <button class="button is-link has-text-weight-bold ml5 " onclick={getData}>
          <span class="icon">
            <span class="fas fa-sync-alt"></span>
          </span>
        </button>
        <button class="button is-success has-text-weight-bold  ml5" onclick={downloadCSV}>
          <span class="icon">
            <i class="far fa-file-excel"></i>
          </span>
        </button>
        <button class="button is-primary has-text-weight-bold  ml5" onclick="window.print()">
          <span class="icon">
            <i class="fas fa-print"></i>
          </span>
        </button>
      </div>
    </div>

		<table class="table is-fullwidth is-striped is-hoverable">
			<thead>
				<tr>
					<th>SL</th>
					<th>Category</th>
					<th>Event</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr each={ev, i in filteredActivityEvent}>
					<td>{ i+1 }</td>
					<td>{ ev.category_name}</td>
					<td>{ ev.event_name}</td>
          	<td class="has-text-right">
        			<div class="inline-flex rounded border border-grey overflow-hidden no-print" hide={ev.confirmDelete}>
          				<span><a class="button is-small" onclick={edit.bind(this, ev)} title="Edit">
                    <i class="fa fa-edit" aria-hidden="true"></i>    
                  </a></span>
          				<span if={role=='ADMIN'}> <a class="button is-small" rel="nofollow" onclick={confirmDelete} title="Delete"><i class="fa fa-trash" aria-hidden="true"></i></a></span>
        			</div>
        			<div class="table-buttons" if={ev.confirmDelete}>
          				<span disabled={loading} class="button is-small is-rounded" onclick={delete}><i class="fa fa-check" ></i></span>
          				<span disabled={loading} class="button is-small  has-text-danger is-rounded" onclick={cancelOperation}><i class="fa fa-times"></i></span>
        			</div>
      			</td>
				</tr>
			</tbody>
		</table>
	</section>
	<script>
	var self = this
    self.on("mount", function(){
      self.title='Create'
      self.loading = false;
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

    //read courses
    self.readCategories = () => {
       activityeventStore.trigger('read_categories')
    }

    //read events
    self.readEvents = () => {
       activityeventStore.trigger('read_events')
    }

    self.getData = () =>{
      self.loading = true
      activityeventStore.trigger('read_events')
    }

    self.csvExport = () => {
      activityeventStore.trigger('csv_export_activity_event')
    }

    self.add = () => {
      if(!self.refs.addEventInput.value){
        toastr.info("Please enter Event and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          activityeventStore.trigger('add_event', self.refs.addEventInput.value,
           self.refs.category_id.value)
        }else if(self.title=='Update'){
          self.loading = true
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
      document.getElementById("addEventInput").focus()
      self.refs.addEventInput.value = ev.event_name
      self.refs.category_id.value = ev.category_id
      self.edit_id = ev.event_id
    }

    self.filterActivityEvent = ()=>{
      self.filteredActivityEvent = self.events.filter(c => {
        return JSON.stringify(c).toLowerCase().indexOf(self.refs.searchActivityEvent.value.toLowerCase())>=0
      })
    }
    
    activityeventStore.on('add_event_changed',AddEventsChanged)
    function AddEventsChanged(events){
      console.log(events) 
      self.title='Create'
      self.refs.addEventInput.value = ''
      self.loading = false
      self.events = events
      self.update()
      self.readEvents()
      self.readCategories()
    }

    activityeventStore.on('edit_event_changed',EditEventsChanged)
    function EditEventsChanged(events){
      console.log(events) 
      self.title='Create'
      self.refs.addEventInput.value = ''
      self.loading = false
      self.events = events
      self.update()
      self.readEvents()
      self.readCategories()
    }

    activityeventStore.on('delete_event_changed',DeleteEventsChanged)
    function DeleteEventsChanged(events){
      console.log(events) 
      self.title='Create'
      self.refs.addEventInput.value = ''
      self.loading = false
      self.events = events
      self.update()
      self.readEvents()
      self.readCategories()
    }

    activityeventStore.on('read_event_changed',ReadEventsChanged)
    function ReadEventsChanged(events){
      self.title='Create'
      self.refs.addEventInput.value = ''
      self.loading = false
      self.events = events
      self.filteredActivityEvent = events
      self.update()
    }

    activityeventStore.on('read_categories_changed',CategoriesChanged)
    function CategoriesChanged(categories){
      console.log(categories) 
      self.categories = categories
      self.loading = false
      self.update()
    }

</script>
</activity-event>