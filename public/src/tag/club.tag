<club>
	<section class=" is-fluid">
		<h2 class="title" style="color: #ff3860;">Club</h2>
		<div class="box no-print">
			<div class="columns">
				<div class="column is-narrow">
					<label class="label">Club</label>
				</div>
				<div class="column is-narrow">
					<div class="control">
						<div class="control">
							<input class=" input"
              ref="addClubInput" type="text" onkeyup={addEnter} >
						</div>
					</div>
				</div>
				<div class="column is-narrow">
					<label class="label">Captain</label>
				</div>
				<div class="column is-narrow">
					<div class="control">
						<input class=" input"
						  ref="addCaptainInput" type="text" onkeyup={addEnter}>
					</div>
				</div>
        <div class="column is-narrow">
          <label class="label">Detail</label>
        </div>
        <div class="column is-narrow">
          <div class="control">
            <textarea class=" input"
              ref="addDetailInput" type="text" onkeyup={addEnter}></textarea> 
          </div>
        </div>
				<div class="column">
					<button class="button is-danger has-text-weight-bold"
					onclick={add} >{title}
					</button>

          <button class="button is-warning is-rounded is-pulled-right" onclick={readClub} style="margin-left:5px">
          <span class="icon">
            <span class="fas fa-sync-alt"></span>
          </span>
          </button>

           <button class="button is-primary has-text-weight-bold is-pulled-right" onclick="window.print()" title="Print">
                  <span class="icon">
                     <i class="fas fa-print"></i>
                 </span>
        </button>

				</div>
			</div>
		</div>
		<table class="table is-fullwidth is-striped is-hoverable">
			<thead>
				<tr>
					<th>SL</th>
					<th>Club Name</th>
          <th>Captain</th>
					<th>Detail</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr each={ev, i in clubs}>
					<td>{ i+1 }</td>
					<td>{ ev.club_name}</td>
          <td>{ ev.captain}</td>
					<td>{ ev.club_detail}</td>
		          	<td class="has-text-right no-print">
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
      self.readClub()
    })
    self.on("unmount", function(){
      clubStore.off('add_club_changed', AddClubChanged)
      clubStore.off('read_club_changed', ReadClubChanged)
      clubStore.off('edit_club_changed',EditClubChanged)
      clubStore.off('delete_club_changed',DeleteClubChanged)
    })

    //read employe_roles
    self.readClub = () => {
      self.loading=true
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
      //console.log(self.empclubsloye_roles)
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

</script>
</club>