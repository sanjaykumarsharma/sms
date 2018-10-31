<inventory-report>
	<div class="field has-addons">
	  	<p class="control">
		    <a class="button {is-active: selected_inventory_report == 'inventory-received-goods-report' }" href="#/inventory-report/inventory-received-goods-report">
		      <span>Received Goods</span>
		    </a>
	  	</p>
        <p class="control">
        <a class="button {is-active: selected_inventory_report == 'inventory-issued-goods-report' }" href="#/inventory-report/inventory-issued-goods-report">
          <span>Issued Goods</span>
        </a>
      </p>
      <p class="control">
        <a class="button {is-active: selected_inventory_report == 'inventory-person-wise-issued-goods-report' }" href="#/inventory-report/inventory-person-wise-issued-goods-report">
          <span>Person Wise Issue</span>
        </a>
      </p>
      <p class="control">
        <a class="button {is-active: selected_inventory_report == 'inventory-item-wise-issued-goods-report' }" href="#/inventory-report/inventory-item-wise-issued-goods-report">
          <span>Item Wise Issue</span>
        </a>
      </p>
       <p class="control">
        <a class="button {is-active: selected_inventory_report == 'inventory-sales-goods-report' }" href="#/inventory-report/inventory-sales-goods-report">
          <span>Sale Goods</span>
        </a>
      </p>
      <p class="control">
        <a class="button {is-active: selected_inventory_report == 'inventory-return-goods-report' }" href="#/inventory-report/inventory-return-goods-report">
          <span>Return Goods</span>
        </a>
      </p>
      <p class="control">
        <a class="button {is-active: selected_inventory_report == 'inventory-summary-report' }" href="#/inventory-report/inventory-summary-report">
          <span>Summary</span>
        </a>
      </p>
      <p class="control">
        <a class="button {is-active: selected_inventory_report == 'inventory-return-goods-report' }" href="#/inventory-report/inventory-return-goods-report">
          <span>Item Issued report</span>
        </a>
      </p>
		
</div>
<div id="inventory-report-view"></div>
 <script>
    var self = this
    console.log('opts.selected_inventory_report')
    console.log(opts.selected_inventory_report)
    if(!opts.selected_inventory_report){
      self.selected_inventory_report = 'inventory-received-goods-report'
    }else{
      self.selected_inventory_report = opts.selected_inventory_report
    }
  </script>
</inventory-report>


