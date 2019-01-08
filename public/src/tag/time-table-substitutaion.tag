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
  <div id="timeTableModalEdit" class="modal ">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Day:{day} &nbsp;&nbsp;&nbsp;&nbsp; Period:{period_name}{period_time}</p>
      </header>
      <section class="modal-card-body">
        

         <table class="table is-fullwidth is-bordered is-hoverable">
          <thead>
            <tr>
              <th class="has-text-centered">Teacher</th>
              <th class="has-text-centered">Periods of Day</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr each={t, i in teacher_peiods}>
              <td>{t.teacher}</td>
              <td class="has-text-centered">{t.period_count_day}</td>
              <td>
                <span><a class="button is-small is-rounded is-primary" onclick={updateTimeTable.bind(this, t)}>Assign</a></span>
              </td>
            </tr>
          </tbody>
        </table>

        
      </section>
      <footer class="modal-card-foot">
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
       self.loading = true;
       timeTableSubstitutaionStore.trigger('reset_time_table')
    }

   self.closeTimeTableAddModal = () => {
      $("#timeTableModalEdit").removeClass("is-active");
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
      
      if(edit==1){

        console.log('edit')
        var read_obj = {}
        read_obj['day_id']=self.day_id
        read_obj['period_id']=self.period_id
        read_obj['emp_id']=self.refs.teacherSelect.value
        timeTableSubstitutaionStore.trigger('read_edit_time_table',read_obj) 

      }else if(edit == 0){

        console.log('add')
        toastr.error("This teacher is not assigned for this class")
        
      }

   }

   self.updateTimeTable = (t,e) => {
      var obj = {}
      obj['day_id'] = self.edit_data.day_id
      obj['period_id'] = self.edit_data.period_id
      obj['teacher_id'] = t.emp_id
      obj['prev_teacher_id'] = self.refs.teacherSelect.value

      self.loading = true;
      timeTableSubstitutaionStore.trigger('update_time_table',obj)
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
    function readEditChanged(teacher_peiods){

      self.loading = false
      self.teacher_peiods = []
      self.teacher_peiods = teacher_peiods

      $("#timeTableModalEdit").addClass("is-active");
      self.update()
    }
     
    timeTableSubstitutaionStore.on('update_time_table_changed',updateTimeTableChanged)
      function updateTimeTableChanged(){
        self.loading = false
        toastr.success("Time Table Updated Successfully ")
        self.closeTimeTableAddModal()
        self.refreshTimeTable()

    }
    
    
         


</script>
</time-table-substitutation>