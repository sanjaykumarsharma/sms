<time-table-period-settings>
  <loading-bar if={loading}></loading-bar> 
	<section class="is-fluid">
    <div class="level">
      <div class="level-left">
        <h2 class="title" style="color: #ff3860;">Period Settings</h2>
      </div>
      <div class="level-right">
        <button class="button is-warning is-rounded" onclick={readPeriod} style="margin-left:2px">
        <span class="icon">
          <span class="fas fa-sync-alt"></span>
        </span>
        </button>
      </div>
    </div>
      <div class="box">
      <div class="columns">

        <div class="column is-narrow">
          <label class="label">Period</label>
          <div class="control">
            <input class=" input" ref="addPeriodInput" type="text">
          </div>
        </div>

        <div class="column is-narrow">
          <label class="label">Start Time</label>
          <div class="control">
            <input class=" input" ref="addStartTimeInput" type="text" placeholder="00:00">
          </div>
        </div>

        <div class="column is-narrow">
          <label class="label">End Time</label>
          <div class="control">
            <input class=" input" ref="addEndTimeInput" type="text" placeholder="00:00">
          </div>
        </div>
        
        <div class="column is-narrow">
          <label class="label">Interval</label>
          <div class="control">
            <div class="select ">
              <select ref="IntervalSelect">
                <option value="">N</option>
                <option value="Y">Y</option>
              </select>
            </div>
          </div>
        </div>

        <div class="column is-narrow">
          <label class="label">Remarks</label>
          <div class="control">
            <input class=" input" ref="addRemarksInput" type="text">
          </div>
        </div>

        <div class="column">
          <button class="button is-danger has-text-weight-bold" style="margin-top: 31px;" onclick={add} >{title}
          </button>
        </div>
      </div>
    </div>
    <table class="table is-fullwidth is-striped is-hoverable">
      <thead>
        <tr>
          <th>#</th>
          <th>Period</th>
          <th>Start Time</th>
          <th>End Time</th>
          <th>Remarks</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr each={d, i in periods}>
          <td>{i + 1}</td>
          <td>{d.period_name}</td>
          <td>{d.start_time}</td>
          <td>{d.end_time}</td>
          <td>{d.remarks}</td>
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
      self.readPeriod()
    })

     self.on("unmount", function(){
      timeTablePeriodSettingsStore.off('period_changed', PeriodChanged)
    })

    //read courses
    self.readPeriod = () => {
      self.loading=true
       timeTablePeriodSettingsStore.trigger('read_period')
    }

     self.add = () => {
      if(!self.refs.addPeriodInput.value){
        toastr.info("Please enter Period and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          console.log('create')
          self.loading=true
          timeTablePeriodSettingsStore.trigger('add_period', self.refs.addPeriodInput.value,self.refs.addStartTimeInput.value,self.refs.addEndTimeInput.value,self.refs.IntervalSelect.value,self.refs.addRemarksInput.value)
        }else if(self.title=='Update'){
          console.log('update')
          self.loading=true
          timeTablePeriodSettingsStore.trigger('edit_period', self.refs.addPeriodInput.value,self.refs.addStartTimeInput.value,self.refs.addEndTimeInput.value,self.refs.IntervalSelect.value,self.refs.addRemarksInput.value, self.edit_id)
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
      self.periods.map(d => {
        if(d.period_id != e.item.d.period_id){
          d.confirmDelete = false
        }else{
          d.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      timeTablePeriodSettingsStore.trigger('delete_period', e.item.d.period_id)
    }

    self.edit = (d,e) => {
      console.log(d)
      self.title='Update'
      self.refs.addPeriodInput.value = d.period_name
      self.refs.addStartTimeInput.value = d.start_time
      self.refs.addEndTimeInput.value = d.end_time
      self.refs.IntervalSelect.value = d.is_break
      self.refs.addRemarksInput.value = d.remarks
      self.edit_id = d.period_id
    }
    

    timeTablePeriodSettingsStore.on('period_changed',PeriodChanged)
    function PeriodChanged(periods){
      console.log('period_changed1') 
      console.log(periods) 
      self.title='Create'
      self.refs.addPeriodInput.value = ''
      self.refs.addStartTimeInput.value = ''
      self.refs.addEndTimeInput.value = ''
      self.refs.IntervalSelect.value = ''
      self.refs.addRemarksInput.value = ''
      self.loading = false
      self.periods = periods
      self.update()
    }

</script>
</time-table-period-settings>