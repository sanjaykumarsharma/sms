<inventory-received-goods-report>
   <print-header></print-header> 
  <loading-bar if={loading}></loading-bar>
	<section class=" is-fluid">
	     	<h4 class="title has-text-centered" style="color: #ff3860;">Inventory Received From {received_from} </h4>
		<div class="box no-print">
			<div class="columns">
        <div class="column is-narrow">
          <label class="label" style="margin-left:-14px">Received From</label>
        </div>
        <div class="column is-narrow">
          <div class="control">
            <div class="select" >
              <select ref="received_from" onchange={readReceivedFrom}>
                <option each={receivedFromArray} value={received_from} >{received_from}
                </option>
              </select>
            </div>
          </div>
        </div>
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
        onclick={getReceivedGoodsReport} >GO
        </button>
           <button class="button is-success has-text-weight-bold ml5 is-pulled-right" onclick={downloadCSV} title="Excel Down Load">
              <span class="icon">
                  <i class="far fa-file-excel"></i>
              </span>
          </button>
         <button class="button is-primary has-text-weight-bold is-pulled-right ml5" onclick="window.print()" title="Print"><span class="icon">   <i class="fas fa-print"></i></span>
        </button>
            </button>
        <input class="input is-pulled-right" ref="searchInventoryReceivedGoodsReport" onkeyup={filteredInventoryReceivedGoodsReport} type="text" style="width:200px;margin-right:5px;" placeholder="Search" >
      </div>
			</div>
		</div>
		<table class="table is-fullwidth is-striped is-hoverable">
			<thead>
				<tr>
					<th>SL</th>
          <th>Date</th>
          <th>Category</th>
					<th>Item</th>
          <th>Quantity</th>
          <th>Rate</th>
          <th>Amount</th>
         <!--  <th>Received From</th> -->
          <th>Rack</th>
          <th>Remarks</th>
				</tr>
			</thead>
			<tbody>
				<tr each={ev, i in filteredInventoryReceivedGoodsReports}>
					<td>{ i+1 }</td>
					<td>{ ev.received_date}</td>
          <td>{ ev.category_name}</td>
					<td>{ ev.item_name}</td>
          <td>{ ev.quantity}</td>
          <td>{ ev.rate}</td>
          <td>{ ev.amount}</td>
         <!--  <td>{ ev.received_from}</td> -->
          <td>{ ev.rack_name}</td>
          <td>{ ev.remark}</td>
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
          dateFormat: "d/m/Y",
      })
      self.update()
      self.getReceivedFrom()
     /* self.readInventoryCategory()
      self.readInventoryUnit()
      self.readInventorySubcategory()
      self.readInventoryItem()
      self.readInventoryRack()*/
    //  self.readInventoryStock()
    })
  self.on("unmount", function(){
      inventoryReportStore.off('read_inventory_received_From_changed', ReadInventoryReceivedFromChanged)
      inventoryReportStore.off('read_inventory_received_goods_report_changed',ReadInventoryReceivedGoodsReportChanged)
      inventoryReportStore.off('csv_export_inventory_received_goods_report_changed',csvInventoryReceivedGoodsReportChanged)
  })

      self.filteredInventoryReturnable = ()=>{
        self.filteredInventoryReceivedGoodsReports = self.inventoryReceivedGoodsReports.filter(c => {
          return JSON.stringify(c).toLowerCase().indexOf(self.refs.searchInventoryReceivedGoodsReport.value.toLowerCase())>=0
        })
      } 
    
    self.getReceivedFrom = () => {
       inventoryReportStore.trigger('read_inventory_received_from')
    }
    self.getReceivedGoodsReport = () => {
      var obj={}
      obj['received_from']=self.refs.received_from.value
      obj['start_date']=convertDate(self.refs.start_date.value)
      obj['end_date']=convertDate(self.refs.end_date.value)
      self.loading=true
       inventoryReportStore.trigger('read_inventory_received_goods_report',obj)
    }
    self.downloadCSV = () => {
      inventoryReportStore.trigger('csv_export_inventory_received_goods_report',self.inventoryReceivedGoodsReports)
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

  
inventoryReportStore.on('read_inventory_received_from_changed',ReadInventoryReceivedFromChanged)
    function ReadInventoryReceivedFromChanged(receivedFromArray){
      console.log(receivedFromArray) 
      self.title='Create'
      self.loading = false
      self.receivedFromArray = receivedFromArray
      self.update()
    }
inventoryReportStore.on('read_inventory_received_goods_report_changed',ReadInventoryReceivedGoodsReportChanged)
    function ReadInventoryReceivedGoodsReportChanged(inventoryReceivedGoodsReports){
      console.log(inventoryReceivedGoodsReports) 
      self.title='Create'
      self.loading = false
      self.inventoryReceivedGoodsReports = inventoryReceivedGoodsReports
      self.filteredInventoryReceivedGoodsReports = inventoryReceivedGoodsReports
      self.update()
      console.log(self.inventoryReceivedGoodsReports)
    }

    inventoryReportStore.on('csv_export_inventory_received_goods_report_changed',csvInventoryReceivedGoodsReportChanged)
    function csvInventoryReceivedGoodsReportChanged(url){
      var open_url = window.location.origin+url 
      window.open(open_url);
      self.loading = false
      self.update()
    }
     
</script>
</inventory-received-goods-report>