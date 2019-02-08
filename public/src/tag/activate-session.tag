<activate-session>
	<loading-bar if={loading}></loading-bar>
	<section class=" is-fluid">  
          <div class="level no-print">
			<div class="level-left">
				<h2 class="title has-text-centered" style="color: #ff3860;">Session Activation Management</h2>
			</div>
			<div class="level-right">
				<button class="button is-link has-text-weight-bold ml5 is-pulled-right" onclick={readSession}>
					 <span class="icon">
              			<i class="fas fa-sync-alt"></i>
            		</span>
          		</button>
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
					<th>Active Session</th>
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
					<td>{ s.is_active}</td>
		          	<td class="has-text-right">
            			<div class="inline-flex rounded border border-grey overflow-hidden" hide={ s.confirmCurrent}>
            				<span if={role=='ADMIN'}> <a class="button is-small  is-rounded" rel="nofollow" onclick={confirmCurrentSession}>Activate Session</a></span>
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
      activatesessionStore.off('read_session_changed', ReadSessionChanged)
      activatesessionStore.off('current_session_changed',CurrentSessionChanged)
    })

    self.readSession = () => {
    	self.loading = true
    	activatesessionStore.trigger('read_session')
    }

   self.cancelOperation = (e) => {
      self.sessions.map(s => {
          s.confirmCurrent = false
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
      activatesessionStore.trigger('current_session', e.item.s.session_id)
    }  

    activatesessionStore.on('read_session_changed',ReadSessionChanged)
    function ReadSessionChanged(sessions){
      self.loading = false
      self.sessions = sessions
      self.update()
    }

    activatesessionStore.on('current_session_changed',CurrentSessionChanged)
    function CurrentSessionChanged(sessions){
      self.loading = false
      self.sessions = sessions
      self.readSession()
      self.update()
    }

</script>
</activate-session>