<time-table-teacher-report>
  <print-header></print-header>
<loading-bar if={loading}></loading-bar>  
  
  <section class=" is-fluid">
    <h2 class="title is-size-5 has-text-centered" style="color: #ff3860;">Time Table Teacher</h2>

    <div class="box no-print">
      <div class="columns">

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
      <center><strong>Session:{session_name}
      <thead>
        <tr>
          <th class="has-text-centered" style="vertical-align: middle;">Teacher/Day</th>
          <th each={d, i in days} class="has-text-centered">
              <span style="color:#ff0000">{d.day_name}</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr each={t in time_table}>
          <th class="has-text-centered" style="vertical-align: middle;">{t.teacher}</th>
          <td each={d in days} class="has-text-centered" >
              <p if={d.day_name=='Mon'}>
                <raw content="{t.day_one}"></raw>
              </p>
              <p if={d.day_name=='Tues'}>
                <raw content="{t.day_two}"></raw>
              </p>
              <p if={d.day_name=='Wed'}>
                <raw content="{t.day_three}"></raw>
              </p>
              <p if={d.day_name=='Thurs'}>
                <raw content="{t.day_four}"></raw>
              </p>
              <p if={d.day_name=='Fri'}>
                <raw content="{t.day_five}"></raw>
              </p>
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
      timeTableAdminStore.off('read_init_teacher_report_changed',InitChanged)
      timeTableAdminStore.off('read_periods_teacher_report_changed',PeriodsChanged)
    })
  
   self.readInit = () => {
    self.loading = true;
    timeTableAdminStore.trigger('read_init_teacher_report')
   }

   self.refreshTimeTable = () => {
      self.loading = true;
      timeTableAdminStore.trigger('read_periods_teacher_report')
   }

   /************************************************ Time Table Changed Method ************************************************/
   timeTableAdminStore.on('read_init_teacher_report_changed',InitChanged)
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

   timeTableAdminStore.on('read_periods_teacher_report_changed',PeriodsChanged)
    function PeriodsChanged(time_table,session_name){
      self.loading = false

      self.time_table = []
      self.time_table = time_table
      self.session_name = session_name
      self.update()
      console.log(self.periods)
      console.log(self.time_table)
      console.log(self.days)
    }

</script>
</time-table-teacher-report>