<teacher-time-table>
<loading-bar if={loading}></loading-bar>  
  
  <section class=" is-fluid">

    <div class="level">
      <div class="level-left">
        <h2 class="title" style="color: #ff3860;">Teacher Time Table</h2>
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
              <select ref="teacherSelect">
                <option value="">Select Teacher</option>
                <option each={teachers} value={emp_id}>{name}</option>
              </select>
            </div>
          </div>
        </div>

        <div class="column is-narrow">
          <button class="button is-danger is-narrow has-text-weight-bold" onclick={refreshTimeTable} >GO </button>
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
          <td each={p, j in periods} class="has-text-centered" onclick={openTimeTableModalEdit.bind(this, d, p)} style="cursor: pointer;">
              <div each={t, k in time_table}>
                  <p if={d.day_id==t.day_id && p.period_id==t.period_id} style="font-size:12px" >
                     <span style="color:#ff0000">{t.subject_short_name}({t.period_type})</span><br>{t.room_no}<br>{t.standard}
                  </p>
              </div>
          </td>
        </tr>
      </tbody>
    </table>

     
  </section>
	<script>
	var self = this
    self.on("mount", function(){
      self.loading = false;
      self.readTeachers();

    })
    self.on("unmount", function(){
      teacherTimeTableStore.off('read_teachers_changed',TeachersChanged)
      teacherTimeTableStore.off('read_periods_changed',PeriodsChanged)
    })
  
   self.readTeachers = () => {
     self.loading = true;
     teacherTimeTableStore.trigger('read_teachers')
   }

   self.refreshTimeTable = () => {
     self.loading = true;
     teacherTimeTableStore.trigger('read_periods',self.refs.teacherSelect.value)
   }
   self.openTimeTableModalEdit = (d,p,e) => {
      console.log(d)
      console.log(p)
      let edit = 0;
      let edit_data = {};
      self.time_table.map(t=>{
        if(d.day_id==t.day_id && p.period_id==t.period_id){
          edit = 1
          edit_data = t
        }
      })

      if(edit==1){
        console.log('edit')
        console.log(edit_data)
      }else if(edit == 0){
        console.log('add')
      }
   }

   /************************************************ Students Changed Method ************************************************/
   teacherTimeTableStore.on('read_teachers_changed',TeachersChanged)
    function TeachersChanged(teachers){
      self.loading = false
      self.teachers = []
      self.teachers = teachers
      self.update()
      console.log(self.teachers)
    }
    
   teacherTimeTableStore.on('read_periods_changed',PeriodsChanged)
    function PeriodsChanged(periods,time_table,days){
      self.loading = false
      self.periods = []
      self.periods = periods

      self.time_table = []
      self.time_table = time_table

      self.days = []
      self.days = days

      self.update()
      console.log(self.periods)
      console.log(self.time_table)
      console.log(self.days)
    }
     


</script>
</teacher-time-table>