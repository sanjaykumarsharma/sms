<session-setting>
	<section class=" is-fluid">
		<h2 class="title has-text-centered" style="color: #ff3860;">Fee Session Management</h2>
		<div class="flex items-center mt-2 mb-6 no-print">
			<div class="bg-green py-1 rounded w-10">
				<div class="bg-grey h-px flex-auto"></div>
			</div>
		</div>
		<div class="box">
			<div class="columns">
				<div class="column is-narrow">
					<label class="label">Session Name</label>
				</div>
				<div class="column is-narrow">
					<div class="control">
						<input class=" input"
						  ref="addSessionInput" type="text">
					</div>
				</div>
				<div class="column is-narrow">
					<label class="label">Start Date</label>
				</div>
				<div class="column is-narrow">
					<div class="control">
						<input class="date input flatpickr-input form-control input" ref="sessionStartDateInput" placeholder="" tabindex="0" type="text" readonly="readonly">
					</div>
				</div>
				<div class="column is-narrow">
					<label class="label">End Date</label>
				</div>
				<div class="column is-narrow">
					<div class="control">
						<input class="date input flatpickr-input form-control input" ref="sessionEndDateInput" placeholder="" tabindex="0" type="text" readonly="readonly">
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
					<th>Session Name</th>
					<th>Session Start Date</th>
					<th>Session End Date</th>
					<th>Current Session</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr each={s, i in sessions}>
					<td>{ i+1 }</td>
					<td>{ s.session_name}</td>
					<td>{ s.session_start_date}</td>
					<td>{ s.session_end_date}</td>
					<td>{ s.is_current}</td>
		          	<td class="has-text-right">
            			<div class="inline-flex rounded border border-grey overflow-hidden" hide={s.confirmDelete || s.confirmCurrent}>
            				<span if={role=='ADMIN'}> <a class="button is-small  is-rounded" rel="nofollow" onclick={confirmCurrentSession}>Mark Current Session</a></span>
              				<span><a class="button is-small is-rounded" onclick={edit.bind(this, s)}>Edit</a></span>
              				<span if={role=='ADMIN'}> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick={confirmDelete}>Delete</a></span>
            			</div>
            			<div class="table-buttons" if={s.confirmDelete}>
              				<span disabled={loading} class="button is-small is-rounded" onclick={delete}><i class="fa fa-check" ></i></span>
              				<span disabled={loading} class="button is-small  has-text-danger is-rounded" onclick={cancelOperation}><i class="fa fa-times"></i></span>
            			</div>
            			<div class="table-buttons" if={s.confirmCurrent}>
              				<span disabled={loading} class="button is-small is-rounded" onclick={markCurrent}><i class="fa fa-check" ></i></span>
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
      flatpickr(".date", {
    	/*altInput: true,*/
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

    //read events
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

</script>
</session-setting>