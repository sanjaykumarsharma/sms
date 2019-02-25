<new-event>
   <print-header></print-header> 
  <loading-bar if={loading}></loading-bar>
<section class="is-fluid" show={event_view =='show_event'}>
    <div class="" style="margin-bottom:10px">
      <div class="columns">
        <div class="column">
        <!-- <div class="column"> -->
          <span class="title has-text-centered" style="color: #ff3860;"> Events</span>
              <button class="button is-primary has-text-weight-bold is-pulled-right no-print" onclick="window.print()" title="Print">
                        <span class="icon">
                           <i class="fas fa-print"></i>
                       </span>
            </button>
            <button class="button is-warning is-rounded is-pulled-right no-print" onclick={readNewEvent} style="margin-right:5px;margin-left:5px;margin-right:5px">
                <span class="icon">
                  <span class="fas fa-sync-alt"></span>
                </span>
                </button>
            <button class="button is-info is-rounded is-pulled-right no-print" onclick={add_new_event}>
            <span class="icon">
              <span class="fas fa-plus"></span>
            </span>
            </button>
        </div>
      </div>
    </div>
      
  <!-- <div class="level no-print">
    <div class="level-left">
    </div>
    <div class="level-right">
    </div>
  </div> -->

  <table class="table is-fullwidth is-striped is-hoverable is-bordered">
      <thead>
        <tr>
          <th>#</th>
          <th>Event Type</th>
          <th>Event Name</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Holiday</th>
          <th>Detail</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr each={st, i in newEvents}>
          <td>{i+1}</td>
          <td>{st.event_type}</td>
          <td>{st.event_name}</td>
          <td>{st.s_date}</td>
          <td>{st.e_date}</td>
          <td>{st.holiday}</td>
          <td>{st.description}</td>
          <td class="has-text-right no-print">
            <div class="inline-flex rounded border border-grey overflow-hidden" hide={st.confirmDelete}>
              <span><a class="button is-small is-rounded" onclick={edit.bind(this, st)}>Edit</a></span>
              <span> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick={confirmDelete}>Delete</a></span>
            </div>
            <div class="table-buttons" if={st.confirmDelete}>
              <span disabled={loading} class="button is-small is-rounded" onclick={delete}><i class="fa fa-check" ></i></span>
              <soan disabled={loading} class="button is-small  has-text-danger is-rounded" onclick={cancelOperation}><i class="fa fa-times"></i></span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
</section>
<section class="is-fluid" show={event_view =='add_new_event'}>
  <div class="label">
    <div class="level-left">
      <h2 class="title" style="color: #ff3860;">{title} Event</h2>
    </div>
    <div class="level-right">
      <button class="button" onclick={close_new_event}>Back</button>
    </div>
  </div>
  <div class="box">
    <div class="columns is-variable is-1 is-multiline">
      <div class="column is-one-third">
      <label class="label" for="student_course">Event Type</label>
        <div class="control">
            <div class="select is-fullwidth">
            <select ref="event_type_id">
              <option each={eventTypes} value={event_type_id}>{event_type}
                            </option>
            </select>
          </div>
            </div>
        </div>
        <div class="column is-one-third">
      <label class="label">Event Name</label>
        <input class="input" ref="event_name" placeholder="" 
        type="text">
        </div>
        <div class="column is-one-third">
         <label class="label">Date From</label>
        <input class="input date flatpickr-input form-control input"  ref="start_date" placeholder="" tabindex="0" 
        type="text">
        </div>
        <div class="column is-one-third">
         <label class="label">Date To</label>
        <input class="input date flatpickr-input form-control input"  ref="end_date" placeholder="" tabindex="0" 
        type="text">
        </div>
        <div class="column is-one-third">
         <label class="label">Description</label>
        <textarea class="input" ref="detail" rows="2" 
        type="text"></textarea> 
        </div>
         <div class="column is-one-third">
         <label class="label">Holiday</label>
               <input type="checkbox" id="holiday_check_box">
          </div>
    <div class="column is-full">
    <button class="button is-danger has-text-weight-bold adjusted-top" onclick={add} >{title}</button>    
   </div>
  </div>
  </div>
</section>
 
  <!-- student profile end -->
<script>
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

     //read courses
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

    // read employe_roles
     self.readNewEvent = () => {
      self.loading=true
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
           neweventStore.trigger('edit_new_event', self.refs.event_type_id.value,
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

</script>
</new-event>