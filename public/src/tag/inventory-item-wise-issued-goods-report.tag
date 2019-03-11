<inventory-item-wise-issued-goods-report>
    <print-header></print-header> 
  <loading-bar if={loading}></loading-bar>
	<section class=" is-fluid">
		<h2 class="title has-text-centered" style="color: #ff3860;">Inventory Item wise Issue Report</h2>
		<div class="box no-print">
			<div class="columns">
       <div class="column is-narrow">
          <label class="label" style="margin-left:-14px">Category</label>
        </div>
        <div class="column is-narrow">
          <div class="control">
            <div class="select" >
              <select ref="category_id" onchange={readInventoryItem}>
                <option each={inventoryCategories} value={category_id} >{category_name}
                </option>
              </select>
            </div>
          </div>
        </div>
         <div class="column is-narrow">
          <label class="label" style="margin-left:-14px">Item</label>
        </div>
        <div class="column is-narrow">
          <div class="control">
            <div class="select" >
               <select ref="item_id" style="width:240px">
                <option each={inventoryItems} value={item_id}>{item_name}</option>
              </select>
            </div>
          </div>
        </div>
          <div class="column is-narrow">
          <label class="label">From Date</label>
        </div>
        <div class="column is-narrow">
          <div class="control">
             <input class="input date flatpickr-input form-control input"  ref="start_date" placeholder="" tabindex="0"  type="text" style="width:100px">
          </div>
        </div>
          <div class="column is-narrow">
          <label class="label">To Date</label>
        </div>
        <div class="column is-narrow">
          <div class="control">
              <input class="input date flatpickr-input form-control input"  ref="end_date" placeholder="" tabindex="0"  type="text" style="width:100px">
          </div>
        </div>
			  <div class="column">
        <button class="button is-danger has-text-weight-bold" style="margin-left:-20px"
        onclick={getItemWiseIssuedGoodsReport} >GO
        </button>
         <button class="button is-success has-text-weight-bold is-small ml5 is-pulled-right" onclick={downloadCSV} title="Excel Down Load">
              <span class="icon">
                  <i class="far fa-file-excel"></i>
              </span>
           </button>
            <input class="input is-pulled-right" ref="searchInventoryItemWiseIssuedGoodsReport" onkeyup={filteredinventoryItemWiseIssuedGoodsReport} type="text" style="width:180px;margin-right:5px;" placeholder="Search" >
      </div>
			</div>
		</div>
 <!--    <div class="columns">
        <div class="level">
          <div class="level-right">
          <button class="button is-success has-text-weight-bold is-small ml5 is-pulled-right" onclick={downloadCSV} title="Excel Down Load">
              <span class="icon">
                  <i class="far fa-file-excel"></i>
              </span>
           </button>
            <input class="input is-pulled-right" ref="searchInventoryItemWiseIssuedGoodsReport" onkeyup={filteredinventoryItemWiseIssuedGoodsReport} type="text" style="width:160px;margin-right:5px;" placeholder="Search" >
        </div>
      </div>
    </div> -->
		<table class="table is-fullwidth is-striped is-hoverable">
			<thead>
				<tr>
					<th>SL</th>
          <th>Date</th>
          <th>Item</th>
					<th>To Whom</th>
          <th>Issue Quantity</th>
          <th>Purpose</th>
				</tr>
			</thead>
			<tbody>
				<tr each={ev, i in filteredInventoryItemWiseIssuedGoodsReports}>
					<td>{ i+1 }</td>
					<td>{ ev.issue_date}</td>
          <td>{ ev.item_name}</td>
					<td>{ ev.issue_to} { ev.staff_name}</td>
          <td>{ ev.quantity}</td>
          <td>{ ev.purpose}</td>
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
       self.readInventoryCategory()
     //  self.readInventoryItem()
       self.update()
    })
  self.on("unmount", function(){
         inventoryCategoryStore.off('read_inventory_category_changed', ReadInventoryCategoryChanged)
         inventoryReportStore.off('read_inventory_item_changed', ReadInventoryItemChanged)
         inventoryReportStore.off('read_inventory_item_wise_issued_goods_report_changed',ReadInventoryItemWiseIssuedGoodsReportChanged)
  })


      self.filteredinventoryItemWiseIssuedGoodsReport = ()=>{
        self.filteredInventoryItemWiseIssuedGoodsReports = self.inventoryItemWiseIssuedGoodsReports.filter(c => {
          return JSON.stringify(c).toLowerCase().indexOf(self.refs.searchInventoryItemWiseIssuedGoodsReport.value.toLowerCase())>=0
        })
      } 

    self.getItemWiseIssuedGoodsReport = () => {
      self.loading=true

     /*  self.s_date=convertDate(self.refs.start_date.value)
       self.e_date=convertDate(self.refs.end_date.value)*/
       self.start_date=convertDate(self.refs.start_date.value)
       self.end_date=convertDate(self.refs.end_date.value)

       inventoryReportStore.trigger('read_inventory_item_wise_issued_goods_report',self.refs.category_id.value,self.refs.item_id.value,self.start_date,self.end_date)
    }
    self.readInventoryCategory = () => {
       inventoryCategoryStore.trigger('read_inventory_category')
     }
    self.readInventoryItem = () => {
       inventoryReportStore.trigger('read_inventory_item',self.refs.category_id.value)
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

    inventoryCategoryStore.on('read_inventory_category_changed',ReadInventoryCategoryChanged)
    function ReadInventoryCategoryChanged(inventoryCategories){
      console.log(inventoryCategories) 
      //self.title='Create'
      self.loading = false
      self.inventoryCategories = inventoryCategories
      self.update()
      self.readInventoryItem();
    }

     inventoryReportStore.on('read_inventory_item_changed',ReadInventoryItemChanged)
    function ReadInventoryItemChanged(inventoryItems){
      console.log(inventoryItems) 
      self.loading = false
      self.inventoryItems = inventoryItems
      self.update()
      console.log(self.inventoryItems)
    }  

    inventoryReportStore.on('read_inventory_item_wise_issued_goods_report_changed',ReadInventoryItemWiseIssuedGoodsReportChanged)
    function ReadInventoryItemWiseIssuedGoodsReportChanged(inventoryItemWiseIssuedGoodsReports){
      console.log(inventoryItemWiseIssuedGoodsReports) 
      self.title='Create'
      self.loading = false
      self.inventoryItemWiseIssuedGoodsReports = inventoryItemWiseIssuedGoodsReports
      self.filteredInventoryItemWiseIssuedGoodsReports = inventoryItemWiseIssuedGoodsReports
      self.update()
      console.log(self.inventoryItemWiseIssuedGoodsReports)
    }
     
</script>
</inventory-item-wise-issued-goods-report>