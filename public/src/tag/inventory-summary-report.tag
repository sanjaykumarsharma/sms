<inventory-summary-report>
     <print-header></print-header> 
  <loading-bar if={loading}></loading-bar>
	<section class=" is-fluid">
		<h4 class="title has-text-centered" style="color: #ff3860;">Item Wise Summary Report
     <br> <span style="font-size:18px"> From: {start_date} To: {end_date}</span></h4>
		<div class="box no-print">
			<div class="columns">
          <div class="column is-narrow">
          <label class="label">From Date</label>
        </div>
        <div class="column is-narrow">
          <div class="control">
             <input class="input date flatpickr-input form-control input"  ref="start_date" placeholder="" tabindex="0"  type="text" style="width:120px">
          </div>
        </div>
          <div class="column is-narrow">
          <label class="label">To Date</label>
        </div>
        <div class="column is-narrow">
          <div class="control">
              <input class="input date flatpickr-input form-control input"  ref="end_date" placeholder="" tabindex="0"  type="text" style="width:120px">
          </div>
        </div>
			  <div class="column">
        <button class="button is-danger has-text-weight-bold" style="margin-left:-20px"
        onclick={getInventorySummaryReport} >GO
        </button>
          <button class="button is-primary has-text-weight-bold is-pulled-right" onclick="window.print()" title="Print">
            <span class="icon"><i class="fas fa-print"></i></span>
          </button>
         <button class="button is-warning is-rounded is-pulled-right" onclick={getInventorySummaryReport} style="margin-left:5px;margin-right:5px">
          <span class="icon">
            <span class="fas fa-sync-alt"></span>
          </span>
          </button>
      </div>
			</div>
		</div>
		<table class="table is-fullwidth is-striped is-hoverable">
			<thead>
				<tr>
					<th>SL</th>
          <th>Item</th>
          <th>Opening Balance</th>
          <th>Total Received</th>
          <th>Total Issued</th>
          <th>Total Sold</th>
          <th>Closing Balance</th>
					
				</tr>
			</thead>
			<tbody>
				<tr each={ev, i in inventorySummaryReports}>
					<td>{ i+1 }</td>
          <td>{ ev.item_name}</td>
          <td>{ ev.opening_balance}</td>
          <td>{ ev.total_received}</td>
          <td>{ ev.total_issued}</td>
					<td>{ ev.total_sold}</td>
          <td>{ ev.closing_balance}</td>
				</tr>
			</tbody>
		</table>
	</section>
	<script>
	var self = this
    self.on("mount", function(){
      self.title='Create'
      self.role = getCookie('role')
      flatpickr(".date", {
         allowInput: true,
         altFormat: "d/m/Y",
         dateFormat: "Y-m-d",
       })
      
       self.update()
    })
  self.on("unmount", function(){
        inventoryReportStore.off('read_inventory_summary_report_changed',ReadInventorySummaryReportChanged)
  })


  self.getInventorySummaryReport = () => {
       self.start_date=self.refs.start_date.value,
       self.end_date=self.refs.end_date.value
       self.loading=true
       inventoryReportStore.trigger('read_inventory_summary_report',self.refs.start_date.value,self.refs.end_date.value)
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

    

    inventoryReportStore.on('read_inventory_summary_report_changed',ReadInventorySummaryReportChanged)
    function ReadInventorySummaryReportChanged(inventorySummaryReports){
      console.log(inventorySummaryReports) 
      self.title='Create'
      self.loading = false
      self.inventorySummaryReports = inventorySummaryReports
      self.update()
      console.log(self.inventorySummaryReports)
    }
     
</script>
</inventory-summary-report>