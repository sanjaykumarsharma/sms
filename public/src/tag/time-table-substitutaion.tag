<time-table-substitutation>
<loading-bar if={loading}></loading-bar>  
  
  <section class=" is-fluid">

    <div class="level">
      <div class="level-left">
        <h2 class="title" style="color: #ff3860;">Time Table Substitutation</h2>
      </div>
      <div class="level-right">
      </div>
    </div>

    <div class="box">
      <div class="columns">

        <div class="column is-narrow"><label class="label">Teacher</label></div>  
        <div class="column is-narrow">  
          <div class="control">
            <div class="select ">
              <select ref="teacherSelect" onchange="{refreshTimeTable}">
                <option value="">Select Teacher</option>
                <option each={teachers} value={emp_id}>{name}</option>
              </select>
            </div>
          </div>
        </div>

        <div class="column is-narrow">
          <button class="button is-danger is-narrow has-text-weight-bold" onclick={resetTimeTable}>Reset </button>
        </div>

        <div class="column">
          <button class="button is-warning is-rounded" style="float:right" onclick={refreshTimeTable}> 
            <span class="icon"> <span class="fas fa-sync-alt"></span> </span> 
          </button>
        </div>
          
      </div>
    </div> 


    <table class="table is-fullwidth is-bordered is-hoverable">
      <thead>
        <tr>
          <th class="has-text-centered" style="vertical-align: middle;">Days/Periods</th>
          <th each={p, i in periods} class="has-text-centered">
              <span style="color:#ff0000">{p.period_name}</span><br>
              <span style="font-size:12px">{p.period_time}</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr each={d, i in days}>
          <th class="has-text-centered" style="vertical-align: middle;">{d.day_name}</th>
          <td each={p, j in periods} class="has-text-centered" onclick={openTimeTableModal.bind(this, d, p)} >
              <div each={t, k in time_table}>
                  <p if={d.day_id==t.day_id && p.period_id==t.period_id} style="font-size:12px" >
                     <span style="color:#ff0000">{t.subject_short_name}({t.period_type})</span><br>{t.room_name}<br>{t.standard}
                  </p>
              </div>
          </td>
        </tr>
      </tbody>
    </table>

     
  </section>

<!-- Open Add Time Table Modal Start -->
  <div id="timeTableModalAdd" class="modal ">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Day:{day} &nbsp;&nbsp;&nbsp;&nbsp; Period:{period_name}{period_time}</p>
      </header>
      <section class="modal-card-body">
        

        <div class="field">
          <label class="label" for="role">Days</label>
          <div each={d, i in tempDays} style="float: left;padding-right: 15px;">
            <input type="checkbox" checked={d.checked} id="{ 'addDay' + d.day_id }" onclick={ selectDay.bind(this,d) }> {d.day_name}
          </div> 
        </div>

        
      </section>
      <footer class="modal-card-foot">
        <button class="button is-primary" onclick={addTimeTable} >Add</button>
        <button class="button" id="item-modal-close" onclick={closeTimeTableAddModal}>Cancel</button>
      </footer>
    </div>
  </div>
<!-- Add Time Table Modal End -->

	<script>
	var self = this
    self.day = ''
    self.period_name = ''
    self.period_time = ''
    self.tempSections = []

    self.on("mount", function(){
      self.loading = false;
      self.readInit();
    })
    self.on("unmount", function(){
      timeTableSubstitutaionStore.off('read_init_changed',InitChanged)
      timeTableSubstitutaionStore.off('read_periods_changed',PeriodsChanged)
      timeTableSubstitutaionStore.off('reset_time_table_changed',resetTimeTableChanged)
      timeTableSubstitutaionStore.off('read_edit_time_table_changed',readEditChanged)


      timeTableSubstitutaionStore.off('update_time_table_changed',updateTimeTableChanged)
      timeTableSubstitutaionStore.off('add_time_table_changed',addTimeTableChanged)
    })
  
   self.readInit = () => {
    self.loading = true;
    timeTableSubstitutaionStore.trigger('read_init')
   }

   self.refreshTimeTable = () => {
    console.log(self.refs.teacherSelect.value)
    if(self.refs.teacherSelect.value==''){
        toastr.info("Please select standard and try again")
    }else{
        self.loading = true;
        timeTableSubstitutaionStore.trigger('read_periods',self.refs.teacherSelect.value)
    }
   }

   self.resetTimeTable = () => {
       timeTableSubstitutaionStore.trigger('reset_time_table')
    }

   self.closeTimeTableAddModal = () => {
      $("#timeTableModalAdd").removeClass("is-active");
   }

   self.openTimeTableModal = (d,p,e) => {
      console.log(d)
      console.log(p)

      if(p.is_break=='Y'){
        console.log('short_break');
        return;
      }

      self.day = d.day_name
      self.day_id = d.day_id

      self.period_name = p.period_name
      self.period_id = p.period_id
      self.period_time = p.period_time

      

      let edit = 0;
      self.edit_data = {};
      self.time_table.map(t=>{
        if(d.day_id==t.day_id && p.period_id==t.period_id){
          edit = 1
          self.edit_data = t
        }
      })
      
      
      var read_obj = {}
      read_obj['day_id']=self.day_id
      read_obj['period_id']=self.period_id
      read_obj['emp_id']=self.refs.teacherSelect.value
      if(self.edit_data.subject_id){
        read_obj['emp_id']=self.edit_data.subject_id
      }else{
        read_obj['emp_id']=''
      }

      timeTableSubstitutaionStore.trigger('read_edit_time_table',read_obj)

   }




   self.updateTimeTable = () => {
      var obj = {}
      obj['day_id'] = self.edit_data.day_id
      obj['period_id'] = self.edit_data.period_id
      obj['teacher_id'] = self.refs.teacherSelect.value

      obj['subject_id'] = self.refs.editSubjectSelect.value
      obj['period_type'] = self.refs.editPeriodTypeSelect.value
      obj['room_id'] = self.refs.editRoomSelect.value
      obj['section_id'] = self.refs.editSectionSelect.value


      self.loading = true;
      timeTableSubstitutaionStore.trigger('update_time_table',obj)
   }

  self.deleteTimeTable = () => {
      var obj = {}
      obj['day_id'] = self.day_id
      obj['period_id'] = self.period_id
      obj['teacher_id'] = self.refs.teacherSelect.value

      self.loading = true;
      timeTableSubstitutaionStore.trigger('delete_time_table',obj)
   }

   //add

   self.selectDay = (d,event) => {
    console.log(d)
    console.log(event)
      d.checked=!event.item.d.checked
      console.log(self.tempDays)
   }
   
   self.addTimeTable = () => {
      var obj = {}
      obj['day_id'] = self.day_id
      obj['period_id'] = self.period_id
      obj['teacher_id'] = self.refs.teacherSelect.value

      obj['subject_id'] = self.refs.addSubjectSelect.value
      obj['period_type'] = self.refs.addPeriodTypeSelect.value
      obj['room_id'] = self.refs.addRoomSelect.value
      obj['section_id'] = self.refs.addSectionSelect.value

      obj['days'] = self.tempDays.filter(td => {
        return td.checked == true
      })

      self.loading = true;
      timeTableSubstitutaionStore.trigger('add_time_table',obj)
   }

   /************************************************ Students Changed Method ************************************************/
   timeTableSubstitutaionStore.on('read_init_changed',InitChanged)
    function InitChanged(teachers,days,periods,rooms){
      self.loading = false

      self.teachers = []
      self.teachers = teachers

      self.days = []
      self.days = days

      self.tempDays = []
      self.tempDays = days

      self.periods = []
      self.periods = periods

      self.rooms = []
      self.rooms = rooms

      self.update()
    }

   timeTableSubstitutaionStore.on('reset_time_table_changed',resetTimeTableChanged)
      function resetTimeTableChanged(){
        self.loading = false
        toastr.success("Time Table Reset Successfully ")
        self.refreshTimeTable()
    } 

   timeTableSubstitutaionStore.on('read_periods_changed',PeriodsChanged)
    function PeriodsChanged(time_table){
      self.loading = false

      self.time_table = []
      self.time_table = time_table

      self.update()
      console.log(self.periods)
      console.log(self.time_table)
      console.log(self.days)
    }

    timeTableSubstitutaionStore.on('read_edit_time_table_changed',readEditChanged)
    function readEditChanged(rooms){

      self.loading = false
      
      $("#timeTableModalAdd").addClass("is-active");
      console.log('calling change section')
      self.update()
    }
    


   
     
    timeTableSubstitutaionStore.on('update_time_table_changed',updateTimeTableChanged)
      function updateTimeTableChanged(){
        self.loading = false
        toastr.success("Time Table Updated Successfully ")
        self.closeTimeTableEditModal()
        self.refreshTimeTable()

    }
    
    timeTableSubstitutaionStore.on('add_time_table_changed',addTimeTableChanged)
      function addTimeTableChanged(){
        self.loading = false
        toastr.success("Time Table Added Successfully ")
        self.closeTimeTableAddModal()
        self.refreshTimeTable()
    }
    
    
         


</script>
</time-table-substitutation>