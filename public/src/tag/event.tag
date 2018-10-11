<event>
	<section class=" is-fluid">
		<h2 class="title has-text-centered" style="color: #ff3860;">Activity Event Management</h2>
		<div class="flex items-center mt-2 mb-6 no-print">
			<div class="bg-green py-1 rounded w-10">
				<div class="bg-grey h-px flex-auto"></div>
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
								<option each={categories} value={category_id}>{category_name}
	              </option>
							</select>
						</div>
					</div>
				</div>
				<div class="column is-narrow">
					<label class="label">Event</label>
				</div>
				<div class="column is-narrow">
					<div class="control">
						<input class=" input"
						  ref="addEventInput" type="text">
					</div>
				</div>
				<div class="column">
					<button class="button is-danger has-text-weight-bold"
					onclick={add} >{title}
					</button>
				</div>
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
				<tr each={ev, i in eventDataItems}>
					<td>{ i+1 }</td>
					<td>{ ev.category_name}</td>
					<td>{ ev.event_name}</td>
		          	<td class="has-text-right">
            			<div class="inline-flex rounded border border-grey overflow-hidden" hide={ev.confirmDelete}>
              				<span><a class="button is-small is-rounded" onclick={edit.bind(this, ev)}>Edit</a></span>
              				<span if={role=='ADMIN'}> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick={confirmDelete}>Delete</a></span>
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

    //read courses
    self.readCategories = () => {
       eventStore.trigger('read_categories')
    }

    //read events
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

</script>
</event>