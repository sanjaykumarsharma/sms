<inventory-person-wise-issued-goods-report>
  <header></header>
  <loading-bar if={loading}></loading-bar>
	<section class=" is-fluid">
    <h2 class="title has-text-centered" style="color: #ff3860;">Inventory Issue Report<br>
     <span style='font-size:18px'>Type : {issue_type} Person: {issue_to}<br>
      From: {start_date} To: {end_date}</span></h2>
		<div class="box no-print">
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
              <select ref="issue_to" id="isue_to" style="width:300px">
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
         dateFormat: "d/m/Y",
       })
       self.getIssueTo()
      self.update()
    })
  self.on("unmount", function(){
       inventoryReportStore.off('read_inventory_issue_to_changed', ReadInventoryIssueToChanged)
        inventoryReportStore.off('read_inventory_person_wise_issued_goods_report_changed',ReadInventoryPersonWiseIssuedGoodsReportChanged)
  })


    self.getIssuedGoodsReport = () => {
      self.loading=true
      self.issue_type=self.refs.issue_type.value,
      self.issue_to = $("#isue_to option:selected").text();
      self.start_date=self.refs.start_date.value,
      self.end_date=self.refs.end_date.value,

      self.s_date=convertDate(self.refs.start_date.value)
      self.e_date=convertDate(self.refs.end_date.value)

      inventoryReportStore.trigger('read_inventory_person_wise_issued_goods_report',self.refs.issue_type.value,self.refs.issue_to.value,self.s_date,self.e_date)
    }
    self.getIssueTo = () => {
       inventoryReportStore.trigger('read_inventory_issue_to',self.refs.issue_type.value)
       self.update()
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