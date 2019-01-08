<time-table-summary-report>
  <loading-bar if={loading}></loading-bar> 
	<section class="is-fluid">
    <div class="level">
      <div class="level-left">
        <h2 class="title" style="color: #ff3860;">Summary List</h2>
      </div>
      <div class="level-right">
        <button class="button is-warning is-rounded" onclick={readTimeTableSummary} style="margin-left:2px">
        <span class="icon">
          <span class="fas fa-sync-alt"></span>
        </span>
        </button>
      </div>
    </div>
      
    <div each={s in summaries}>

      <p>{s.teacher}</p>
      <table class="table is-fullwidth is-striped is-hoverable">
        <tbody>
          <thead>
              <tr>
                <th>Period</th>
                <th>Class</th>
                <th>Subject</th>
              </tr>
            </thead>
            <tbody>
              <tr each={d in s.details}>
                <td>{d.period_name}</td>
                <td>{d.standard}</td>
                <td>{d.subject_name}</td>
              </tr>  
            </tbody>
        </tbody>
      </table>

    </div>  
    

  </section>
  <script>
  var self = this
    self.on("mount", function(){
      self.title='Create'
      self.role = getCookie('role')
      self.loading=false
      self.update()
      self.readTimeTableSummary()
    })

     self.on("unmount", function(){
      timeTableReportStore.off('summary_changed', SummaryChanged)
    })

    //read courses
    self.readTimeTableSummary = () => {
      self.loading=true
       timeTableReportStore.trigger('read_summary')
    }


    timeTableReportStore.on('summary_changed',SummaryChanged)
    function SummaryChanged(summaries){
      console.log(summaries) 
      self.loading = false
      self.summaries = summaries
      self.update()
    }

</script>
</time-table-summary-report>