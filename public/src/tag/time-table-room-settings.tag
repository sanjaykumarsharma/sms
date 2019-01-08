<time-table-room-settings>
  <loading-bar if={loading}></loading-bar> 
	<section class="is-fluid">
    <div class="level">
      <div class="level-left">
        <h2 class="title" style="color: #ff3860;">Room Settings</h2>
      </div>
      <div class="level-right">
        <button class="button is-warning is-rounded" onclick={readRoom} style="margin-left:2px">
        <span class="icon">
          <span class="fas fa-sync-alt"></span>
        </span>
        </button>
      </div>
    </div>
      <div class="box">
      <div class="columns">
        <div class="column is-narrow">
          <label class="label">Room</label>
        </div>
        <div class="column is-narrow">
          <div class="control">
            <input class=" input"
              ref="addRoomInput" type="text" onkeyup={addEnter}>
          </div>
        </div>
        <div class="column is-narrow">
          <label class="label">Details</label>
        </div>
        <div class="column is-narrow">
          <div class="control">
            <input class=" input"
              ref="addDetailsInput" type="text" onkeyup={addEnter}>
          </div>
        </div>
        <div class="column">
          <button class="button is-danger has-text-weight-bold"
          onclick={add} >{title}
          </button>
        </div>
      </div>
    </div>
    <!-- <div class="box">
      <div class="columns">
        <div class="column is-half">
          <div class="field">
            <label class="label" for="level">Room</label>
            <div class="control">
              <input class="input" type="text" ref="addRoomInput"
              onkeyup={addEnter}>
            </div>
          </div>
        </div>
        <div class="column is-narrow">
          <div class="field">
            <div class="control">
              <button class="button is-danger has-text-weight-bold adjusted-top"
                   onclick={add} >{title}</button>
            </div>
          </div>
        </div>
      </div>
    </div> -->
    <table class="table is-fullwidth is-striped is-hoverable">
      <thead>
        <tr>
          <th>#</th>
          <th>Room</th>
          <th>Details</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr each={d, i in rooms}>
          <td>{i + 1}</td>
          <td>{d.room_name}</td>
          <td>{d.room_details}</td>
          <td class="has-text-right">
            <div class="inline-flex rounded border border-grey overflow-hidden" hide={d.confirmDelete}>
              <span><a class="button is-small is-rounded" onclick={edit.bind(this, d)}>Edit</a></span>
              <span if={role=='ADMIN'}> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick={confirmDelete}>Delete</a></span>
            </div>
            <div class="table-buttons" if={d.confirmDelete}>
              <span disabled={loading} class="button is-small is-rounded" onclick={delete}><i class="fa fa-check" ></i></span>
              <soan disabled={loading} class="button is-small  has-text-danger is-rounded" onclick={cancelOperation}><i class="fa fa-times"></i></span>
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
      self.loading=false
      self.update()
      self.readRoom()
    })

     self.on("unmount", function(){
      timeTableRoomSettingsStore.off('room_changed', RoomChanged)
    })

    //read courses
    self.readRoom = () => {
      self.loading=true
       timeTableRoomSettingsStore.trigger('read_room')
    }

     self.add = () => {
      if(!self.refs.addRoomInput.value){
        toastr.info("Please enter Room and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          console.log('create')
          self.loading=true
          timeTableRoomSettingsStore.trigger('add_room', self.refs.addRoomInput.value,self.refs.addDetailsInput.value,)
        }else if(self.title=='Update'){
          console.log('update')
          self.loading=true
          timeTableRoomSettingsStore.trigger('edit_room', self.refs.addRoomInput.value,self.refs.addDetailsInput.value,
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
      self.rooms.map(d => {
        if(d.room_name != e.item.d.room_name){
          d.confirmDelete = false
        }else{
          d.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      timeTableRoomSettingsStore.trigger('delete_room', e.item.d.room_name)
    }

    self.edit = (d,e) => {
      console.log(d)
      self.title='Update'
      self.refs.addRoomInput.value = d.room_name
      self.refs.addDetailsInput.value = d.room_details
      self.edit_id = d.room_name
    }
    

    timeTableRoomSettingsStore.on('room_changed',RoomChanged)
    function RoomChanged(rooms){
      console.log('room_changed1') 
      console.log(rooms) 
      self.title='Create'
      self.refs.addRoomInput.value = ''
      self.refs.addDetailsInput.value = ''
      self.loading = false
      self.rooms = rooms
      self.update()
    }

</script>
</time-table-room-settings>