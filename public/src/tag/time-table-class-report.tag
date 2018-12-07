<time-table-class-report>
<loading-bar if={loading}></loading-bar>  
  
  <section class=" is-fluid">

    <div class="level">
      <div class="level-left">
        <h2 class="title" style="color: #ff3860;">Time Table Class</h2>
      </div>
      <div class="level-right">
      </div>
    </div>

    <div class="box">
      <div class="columns">

        <div class="column is-narrow"><label class="label">Standard</label></div>  
        <div class="column is-narrow">  
          <div class="control">
            <div class="select ">
              <select ref="standardSelect" onchange={changeSection}>
                <option value="">Select Teacher</option>
                <option each={standards} value={standard_id}>{standard}</option>
              </select>
            </div>
          </div>
        </div>
        
        <div class="column is-narrow"><label class="label">Section</label></div>  
        <div class="column is-narrow">  
          <div class="control">
            <div class="select ">
              <select ref="sectionSelect">
                <option value="">Select Section</option>
                <option each={tempSections} value={section_id}>{section}</option>
              </select>
            </div>
          </div>
        </div>

        <div class="column">
          <button class="button is-rounded" onclick={refreshTimeTable}> Go </button>
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
          <td each={p, j in periods} class="has-text-centered" >
              <div each={t, k in time_table}>
                  <p if={d.day_id==t.day_id && p.period_id==t.period_id} style="font-size:12px" >
                     <span style="color:#ff0000">{t.subject_short_name}({t.period_type})</span><br>{t.room_name}<br>{t.short_name}
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
      timeTableAdminStore.off('read_init_class_report_changed',InitChanged)
      timeTableAdminStore.off('read_periods_class_report_changed',PeriodsChanged)
    })
  
   self.readInit = () => {
    self.loading = true;
    timeTableAdminStore.trigger('read_init_class_report')
   }

   self.refreshTimeTable = () => {
    console.log(self.refs.sectionSelect.value)
    if(self.refs.sectionSelect.value==''){
        toastr.info("Please select section and try again")
    }else{
        self.loading = true;
        timeTableAdminStore.trigger('read_periods_class_report',self.refs.sectionSelect.value)
    }
   }

   self.changeSection = () => {
       if(self.refs.standardSelect.value==''){
        toastr.info("Please select standard and try again")
       }else{
        self.tempSections = []
        self.tempSections = self.sections.filter(s=>{
          return s.standard_id==self.refs.standardSelect.value
        })
       }
       console.log(self.tempSections)
    }

   /************************************************ Time Table Changed Method ************************************************/
   timeTableAdminStore.on('read_init_class_report_changed',InitChanged)
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

   timeTableAdminStore.on('read_periods_class_report_changed',PeriodsChanged)
    function PeriodsChanged(time_table){
      self.loading = false

      self.time_table = []
      self.time_table = time_table

      self.update()
      console.log(self.periods)
      console.log(self.time_table)
      console.log(self.days)
    }

</script>
</time-table-class-report>