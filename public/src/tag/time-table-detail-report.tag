<time-table-detail-report>
  <loading-bar if={loading}></loading-bar> 
  <header></header>  

  <section class="is-fluid">
    <div class="level no-print">
      <div class="level-left">
        <h2 class="title" style="color: #ff3860;">Detail List</h2>
      </div>
      <div class="level-right">
        <button class="button is-warning is-rounded" onclick={readTimeTableDetail} style="margin-left:2px">
        <span class="icon">
          <span class="fas fa-sync-alt"></span>
        </span>
        </button>

        <button class="button is-warning is-rounded" onclick="window.print()" title="Print">
             <span class="icon">
               <i class="fas fa-print"></i>
           </span>
       </button>
      </div>
    </div>
    
    
    <p class="has-text-centered printOnly" style="color: #ff3860;font-weight:bold">Detail List</p>

    <table class="table is-fullwidth is-striped is-hoverable">
      <tbody>
        <thead>
            <tr>
              <th>Subject Teacher</th>
              <th>Signature</th>
              <th>Absent Teacher</th>
              <th>Period</th>
              <th>Class</th>
            </tr>
          </thead>
          <tbody>
            <tr each={d in details}>
              <td>{d.teacher}</td>
              <td></td>
              <td>{d.absent_teacher}</td>
              <td>{d.period_name}</td>
              <td>{d.standard}</td>
            </tr>  
          </tbody>
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
      self.readTimeTableDetail()
    })

     self.on("unmount", function(){
      timeTableReportStore.off('detail_changed', DetailChanged)
    })

    //read courses
    self.readTimeTableDetail = () => {
      self.loading=true
       timeTableReportStore.trigger('read_detail')
    }


    timeTableReportStore.on('detail_changed',DetailChanged)
    function DetailChanged(details){
      console.log(details) 
      self.loading = false
      self.details = details
      self.update()
    }

</script>
</time-table-detail-report>