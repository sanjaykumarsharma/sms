<inventory-sales-goods-report>
  <header></header>
  <loading-bar if={loading}></loading-bar>
	<section class=" is-fluid">
		<h2 class="title has-text-centered" style="color: #ff3860;">Inventory Sales Report
      <br> <span style="font-size:18px">From: {start_date} To: {end_date}</span></h2>
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
        onclick={getSaleGoodsReport} >GO
        </button>
         <button class="button is-primary has-text-weight-bold is-pulled-right" onclick="window.print()" title="Print">
                  <span class="icon">
                     <i class="fas fa-print"></i>
                 </span>
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
					<th>Sale To</th>
				</tr>
			</thead>
			<tbody>
				<tr each={ev, i in inventorySaleGoodsReports}>
					<td>{ i+1 }</td>
					<td>{ ev.sale_date}</td>
          <td>{ ev.category_name}</td>
          <td>{ ev.item_name}</td>
					<td>{ ev.quantity}</td>
          <td>{ ev.sale_rate}</td>
          <td>{ ev.amount}</td>
          <td>{ ev.sale_to}</td>
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
    })
  self.on("unmount", function(){
         inventoryReportStore.off('read_inventory_sale_goods_report_changed',ReadInventorySaleGoodsReportChanged)
  })


    self.getSaleGoodsReport = () => {
      self.start_date=self.refs.start_date.value,
      self.end_date=self.refs.end_date.value

      self.s_date=convertDate(self.refs.start_date.value)
      self.e_date=convertDate(self.refs.end_date.value)
      self.loading=true
       inventoryReportStore.trigger('read_inventory_sale_goods_report', self.s_date,self.e_date)
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

    

    inventoryReportStore.on('read_inventory_sale_goods_report_changed',ReadInventorySaleGoodsReportChanged)
    function ReadInventorySaleGoodsReportChanged(inventorySaleGoodsReports){
      console.log(inventorySaleGoodsReports) 
      self.title='Create'
      self.loading = false
      self.inventorySaleGoodsReports = inventorySaleGoodsReports
      self.update()
      console.log(self.inventorySaleGoodsReports)
    }
     
</script>
</inventory-sales-goods-report>