<time-table-room-report>
  <print-header></print-header>
<loading-bar if={loading}></loading-bar>  
  
  <section class=" is-fluid">
  <h2 class="title is-size-5 has-text-centered" style="color: #ff3860;">Time Table Room</h2>

    <div class="box no-print">
      <div class="columns">

        <div class="column is-narrow"><label class="label">Room</label></div>  
        <div class="column is-narrow">  
          <div class="control">
            <div class="select ">
              <select ref="roomSelect" id="roomSelect" onchange={refreshTimeTable}>
                <option value="">Select Room</option>
                <option each={rooms} value={room_id}>{room_name}</option>
              </select>
            </div>
          </div>
        </div>

        <div class="column">
          <button class="button is-danger" onclick={refreshTimeTable}> Go </button>
        </div>

        <div class="column">
          <button class="button is-link ml5" style="float:right" onclick={refreshTimeTable}> 
            <span class="icon"> <span class="fas fa-sync-alt"></span> </span> 
          </button>
          <button class="button is-primary" style="float:right" onclick="window.print()"> 
            <span class="icon"><i class="fas fa-print"></i></span>
          </button>
        </div>
          
      </div>
    </div> 


    <table class="table is-fullwidth is-bordered is-hoverable">
      <center><strong>Time Table Of Room : {RoomdName} / Session:{session_name}
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
          <td each={p, j in periods} class="has-text-centered" >
              <div each={t, k in time_table}>
                  <p if={d.day_id==t.day_id && p.period_id==t.period_id} style="font-size:12px" >
                     <span style="color:#ff0000">{t.subject_short_name}({t.period_type})</span><br>{t.standard}<br>{t.short_name}
                  </p>
              </div>
          </td>
        </tr>
      </tbody>
    </table>

     
  </section>

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
      timeTableAdminStore.off('read_init_room_report_changed',InitChanged)
      timeTableAdminStore.off('read_periods_room_report_changed',PeriodsChanged)
    })
  
   self.readInit = () => {
    self.loading = true;
    timeTableAdminStore.trigger('read_init_room_report')
   }

   self.refreshTimeTable = () => {
    console.log(self.refs.roomSelect.value)
    if(self.refs.roomSelect.value==''){
        toastr.info("Please select section and try again")
    }else{
        self.loading = true;
        timeTableAdminStore.trigger('read_periods_room_report',self.refs.roomSelect.value)
    }
   }

   /************************************************ Time Table Changed Method ************************************************/
   timeTableAdminStore.on('read_init_room_report_changed',InitChanged)
    function InitChanged(teachers,days,periods,rooms,standards,sections){
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

      self.standards = []
      self.standards = standards

      self.sections = []
      self.sections = sections

      self.update()
    }

   timeTableAdminStore.on('read_periods_room_report_changed',PeriodsChanged)
    function PeriodsChanged(time_table,session_name){
      self.loading = false

      self.time_table = []
      self.time_table = time_table
      self.session_name = session_name
      self.RoomdName = $("#roomSelect option:selected").text();
      self.update()
      console.log(self.periods)
      console.log(self.time_table)
      console.log(self.days)
    }

</script>
</time-table-room-report>