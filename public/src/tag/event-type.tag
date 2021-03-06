<event-type>
   <print-header></print-header> 
  <loading-bar if={loading}></loading-bar>
	<section class=" is-fluid">
		<h2 class="title has-text-centered" style="color: #ff3860;">Event Type</h2>
    <div class="box no-print">
      <div class="columns">
        <div class="column is-narrow">
          <label class="label">Event type</label>
        </div>
        <div class="column is-narrow">
          <div class="control">
            <input class=" input"
              ref="addEventTypeInput" type="text" onkeyup={addEnter}>
          </div>
        </div>
        <div class="column">
          <button disabled={loading} class="button is-danger has-text-weight-bold"
          onclick={add} >{title}
          </button>
           <button class="button is-success has-text-weight-bold is-small ml5 is-pulled-right" onclick={downloadCSV} title="Excel Down Load">
              <span class="icon">
                  <i class="far fa-file-excel"></i>
              </span>
          </button>
          <button class="button is-warning is-rounded is-pulled-right is-small ml5" onclick={readEventTypes} style="margin-left:5px">
          <span class="icon">
            <span class="fas fa-sync-alt"></span>
          </span>
          </button>
           <input class="input is-pulled-right" ref="searchEventType" onkeyup={filteredEventType} type="text" style="width:200px;margin-right:5px" placeholder="Search" >
        </div>
      </div>
    </div>
		<table class="table is-fullwidth is-striped is-hoverable">
			<thead>
				<tr>
					<th>SL</th>
					<th>Event Type</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr each={r, i in filteredEventTypes}>
					<td>{ i+1 }</td>
					<td>{ r.event_type}</td>
		          	<td class="has-text-right no-print no-print">
            			<div class="inline-flex rounded border border-grey overflow-hidden" hide={r.confirmDelete}>
              				<span><a class="button is-small is-rounded" onclick={edit.bind(this, r)}>Edit</a></span>
              				<span if={role=='ADMIN'}> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick={confirmDelete}>Delete</a></span>
            			</div>
            			<div class="table-buttons" if={r.confirmDelete}>
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
      self.readEventTypes()
    })
    self.on("unmount", function(){
      eventTypeStore.off('eventTypes_changed', EventTypesChanged)
      eventTypeStore.off('csv_export_event_type_changed',csv_export_event_typeChanged)
    })

    self.downloadCSV = () =>{
          eventTypeStore.trigger('csv_export_event_type')
        //  console.log(obj)
    }

    self.filteredEventType = ()=>{
      self.filteredEventTypes = self.eventTypes.filter(c => {
        return JSON.stringify(c).toLowerCase().indexOf(self.refs.searchEventType.value.toLowerCase())>=0
      })
    } 
    //read courses
    self.readEventTypes = () => {
      self.loading=true
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
      self.filteredEventTypes = eventTypes
      self.update()
      console.log(self.eventTypes)
    }
    eventTypeStore.on('csv_export_event_type_changed',csv_export_event_typeChanged)
    function csv_export_event_typeChanged(url){
      var open_url = window.location.origin+url 
      window.open(open_url);
      self.loading = false
      self.update()
    }

</script>
</event-type>