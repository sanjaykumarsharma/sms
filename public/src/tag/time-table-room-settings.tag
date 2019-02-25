<time-table-room-settings>
  <print-header></print-header>
  <loading-bar if={loading}></loading-bar> 
	<section class="is-fluid">
    <h2 class="title is-size-5 has-text-centered" style="color: #ff3860;">Room List</h2>
    <div class="level box no-print">
      <div class="level-left">
        <div class="columns">
          <div class="column is-narrow">
            <label class="label">Room</label>
          </div>
          <div class="column is-narrow">
            <div class="control">
              <input class=" input" ref="addRoomInput" type="text" onkeyup={addEnter}>
            </div>
          </div>
          <div class="column is-narrow">
            <label class="label">Details</label>
          </div>
          <div class="column is-half">
            <div class="control">
              <input class=" input" ref="addDetailsInput" type="text" onkeyup={addEnter}>
            </div>
          </div>
          <div class="column">
            <button class="button is-danger has-text-weight-bold " onclick={add} > {title} </button>
          </div>
        </div>
      </div>
      <div class="level-right" >
        <div class="control">
          <input class="input" ref="searchRoomSetting" onkeyup={filterRoomSetting} type="text" placeholder="Search By Event">
        </div>
        <button class="button is-link has-text-weight-bold ml5 " onclick={readRoom}>
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
          <th>#</th>
          <th>Room</th>
          <th>Details</th>
          <th class="no-print"></th>
        </tr>
      </thead>
      <tbody>
        <tr each={d, i in filteredRoomSetting}>
          <td>{i + 1}</td>
          <td>{d.room_name}</td>
          <td>{d.room_details}</td>
          <td class="has-text-right no-print">
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
    self.filterRoomSetting = ()=>{
      self.filteredRoomSetting = self.rooms.filter(c => {
        return JSON.stringify(c).toLowerCase().indexOf(self.refs.searchRoomSetting.value.toLowerCase())>=0
      })
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
      self.filteredRoomSetting = rooms
      self.update()
    }

</script>
</time-table-room-settings>