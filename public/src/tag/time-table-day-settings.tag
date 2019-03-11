<time-table-day-settings>
  <print-header></print-header>
  <loading-bar if={loading}></loading-bar> 
	<section class="is-fluid">
    <h2 class="title is-size-5 has-text-centered" style="color: #ff3860;">Day Settings</h2>
    <div class="level box no-print">
      <div class="level-left">
        <div class="columns">
          <div class="column is-narrow">
            <label class="label">Day</label>
          </div>
          <div class="column is-narrow">
            <div class="control">
              <input class=" input" ref="addDayInput" type="text" onkeyup={addEnter}>
            </div>
          </div>
          <div class="column">
            <button class="button is-danger has-text-weight-bold " onclick={add} > {title} </button>
          </div>
        </div>
      </div>
      <div class="level-right" >
        <button class="button is-link has-text-weight-bold ml5 " onclick={readDay}>
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
          <th>Day</th>
          <th class="no-print"></th>
        </tr>
      </thead>
      <tbody>
        <tr each={d, i in days}>
          <td>{i + 1}</td>
          <td>{d.day_name}</td>
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
      self.readDay()
    })

     self.on("unmount", function(){
      timeTableDaySettingsStore.off('day_changed', DayChanged)
      timeTableDaySettingsStore.off('csv_export_day_changed',csvDayChanged)
    })

    //read courses
    self.readDay = () => {
      self.loading=true
      timeTableDaySettingsStore.trigger('read_day')
    }

    self.downloadCSV = () =>{
      timeTableDaySettingsStore.trigger('csv_export_day', self.days)
    }

     self.add = () => {
      if(!self.refs.addDayInput.value){
        toastr.info("Please enter Day and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          console.log('create')
          self.loading=true
          timeTableDaySettingsStore.trigger('add_day', self.refs.addDayInput.value)
        }else if(self.title=='Update'){
          console.log('update')
          self.loading=true
          timeTableDaySettingsStore.trigger('edit_day', self.refs.addDayInput.value, self.edit_id)
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
      self.days.map(d => {
        if(d.day_id != e.item.d.day_id){
          d.confirmDelete = false
        }else{
          d.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      timeTableDaySettingsStore.trigger('delete_day', e.item.d.day_id)
    }

    self.edit = (d,e) => {
      console.log(d)
      self.title='Update'
      self.refs.addDayInput.value = d.day_name
      self.edit_id = d.day_id
    }
    

    timeTableDaySettingsStore.on('day_changed',DayChanged)
    function DayChanged(days){
      console.log('day_changed1') 
      console.log(days) 
      self.title='Create'
      self.refs.addDayInput.value = ''
      self.loading = false
      self.days = days
      self.update()
    }

    timeTableDaySettingsStore.on('csv_export_day_changed',csvDayChanged)
    function csvDayChanged(url){
      var open_url = window.location.origin+url 
      window.open(open_url);
      self.loading = false
      self.update()
    }

</script>
</time-table-day-settings>