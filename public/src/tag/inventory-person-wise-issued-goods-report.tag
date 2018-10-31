<inventory-person-wise-issued-goods-report>
	<section class=" is-fluid">
		<h2 class="title" style="color: #ff3860;">Person wise Issue</h2>
		<div class="flex items-center mt-2 mb-6 no-print">
			<div class="bg-green py-1 rounded w-10">
				<div class="bg-grey h-px flex-auto"></div>
			</div>
		</div>
		<div class="box">
			<div class="columns">
        <div class="column is-narrow">
          <label class="label" style="margin-left:-14px">Type</label>
        </div>
        <div class="column is-narrow">
          <div class="control">
            <div class="select" >
                 <select ref="issue_type" onchange={getIssueTo}>
                  <option>Staff</option>
                  <option>College</option>
                  <option>Health</option>
                  <option>MV</option>
                  <option>Other</option>
              </select>
            </div>
          </div>
        </div>
         <div class="column is-narrow">
          <label class="label" style="margin-left:-14px">Person</label>
        </div>
        <div class="column is-narrow">
          <div class="control">
            <div class="select" >
              <select ref="issue_to" style="width:300px">
                <option each={issuedPersons} value={issue_to} >{name}
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
        onclick={getIssuedGoodsReport} >GO
        </button>
      </div>
			</div>
		</div>
		<table class="table is-fullwidth is-striped is-hoverable">
			<thead>
				<tr>
					<th>SL</th>
          <th>Date</th>
          <th>Item</th>
					<!-- <th>To Whom</th> -->
          <th>Issue Quantity</th>
          <th>Purpose</th>
				</tr>
			</thead>
			<tbody>
				<tr each={ev, i in inventoryPersonWiseIssuedGoodsReports}>
					<td>{ i+1 }</td>
					<td>{ ev.issue_date}</td>
          <td>{ ev.item_name}</td>
					<!-- <td>{ ev.issue_to} { ev.staff_name}</td> -->
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
         altFormat: "d/m/Y",
         dateFormat: "Y-m-d",
       })
       self.getIssueTo()
      self.update()
    })
  self.on("unmount", function(){
       inventoryReportStore.off('read_inventory_issue_to_changed', ReadInventoryIssueToChanged)
        inventoryReportStore.off('read_inventory_person_wise_issued_goods_report_changed',ReadInventoryPersonWiseIssuedGoodsReportChanged)
  })


    self.getIssuedGoodsReport = () => {
       inventoryReportStore.trigger('read_inventory_person_wise_issued_goods_report',self.refs.issue_type.value,self.refs.issue_to.value,self.refs.start_date.value,self.refs.end_date.value)
    }
    self.getIssueTo = () => {
       inventoryReportStore.trigger('read_inventory_issue_to',self.refs.issue_type.value)
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

    inventoryReportStore.on('read_inventory_issue_to_changed',ReadInventoryIssueToChanged)
    function ReadInventoryIssueToChanged(issuedPersons){
      console.log(issuedPersons) 
      self.title='Create'
      self.loading = false
      self.issuedPersons = issuedPersons
      self.update()
    }

    inventoryReportStore.on('read_inventory_person_wise_issued_goods_report_changed',ReadInventoryPersonWiseIssuedGoodsReportChanged)
    function ReadInventoryPersonWiseIssuedGoodsReportChanged(inventoryPersonWiseIssuedGoodsReports){
      console.log(inventoryPersonWiseIssuedGoodsReports) 
      self.title='Create'
      self.loading = false
      self.inventoryPersonWiseIssuedGoodsReports = inventoryPersonWiseIssuedGoodsReports
      self.update()
      console.log(self.inventoryPersonWiseIssuedGoodsReports)
    }
     
</script>
</inventory-person-wise-issued-goods-report>