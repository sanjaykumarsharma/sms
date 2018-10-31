<inventory-received-goods-report>
	<section class=" is-fluid">
		<h2 class="title" style="color: #ff3860;">Inventory Received Goods</h2>
		<div class="flex items-center mt-2 mb-6 no-print">
			<div class="bg-green py-1 rounded w-10">
				<div class="bg-grey h-px flex-auto"></div>
			</div>
		</div>
		<div class="box">
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
             <input class="input date flatpickr-input form-control input"  ref="start_date" placeholder="" tabindex="0"  type="text">
          </div>
        </div>
          <div class="column is-narrow">
          <label class="label">To Date</label>
        </div>
        <div class="column is-narrow">
          <div class="control">
              <input class="input date flatpickr-input form-control input"  ref="end_date" placeholder="" tabindex="0"  type="text">
          </div>
        </div>
			  <div class="column">
        <button class="button is-danger has-text-weight-bold" style="margin-left:-20px"
        onclick={getReceivedGoodsReport} >GO
        </button>
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
				<tr each={ev, i in inventoryReceivedGoodsReports}>
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
         altFormat: "d/m/Y",
         dateFormat: "Y-m-d",
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
  })


    
    self.getReceivedFrom = () => {
       inventoryReportStore.trigger('read_inventory_received_from')
    }
    self.getReceivedGoodsReport = () => {
       inventoryReportStore.trigger('read_inventory_received_goods_report',self.refs.received_from.value,self.refs.start_date.value,self.refs.end_date.value)
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
      self.update()
      console.log(self.inventoryReceivedGoodsReports)
    }
     
</script>
</inventory-received-goods-report>