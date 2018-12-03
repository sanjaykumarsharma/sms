<fee-plan>
<loading-bar if={loading}></loading-bar>  
	<section class="container is-fluid" show={fee_plan_view =='show_fee_plan'}>
		<div class="level">
			<div class="level-left">
				<h2 class="title" style="color: #ff3860;">Fee Plan Management</h2>
			</div>
			<div class="level-right">
				<button class="button is-warning is-rounded" onclick={add_new_fee_plan}>
				<span class="icon">
					<span class="fas fa-plus"></span>
				</span>
				<span>Add Fee Plan</span>
				</button>
        <button disabled={loading} class="button is-warning is-rounded" onclick={readFeePlans} style="margin-left:2px">
        <span class="icon">
          <span class="fas fa-sync-alt"></span>
        </span>
        </button>
			</div>
		</div>
		<table class="table is-fullwidth is-striped is-hoverable">
			<thead>
				<tr>
					<th>SL</th>
					<th>Fee Plan Name</th>
					<th>Standard</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr each={s, i in feePlans}>

					<td>{ i+1 }</td>
					<td>{ s.fee_plan_name}</td>
					<td>{ s.standard}</td>
		          	<td class="has-text-right" >
            			<div class="inline-flex rounded border border-grey overflow-hidden" hide={s.confirmDelete}>

                      <span><a class="button is-small is-rounded " onclick={viewFeeSlip.bind(this, s)}>View/Edit/Del Slips</a></span>
                      <span><a class="button is-small is-rounded is-success" onclick={mapHead.bind(this, s.fee_plan_id)}>Map Fee Head</a></span>
              				 <!-- <span><a class="button is-small is-rounded" onclick={edit.bind(this, s)}>Edit</a></span>  -->
              				 <span> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick={confirmDelete}>Delete</a></span> 
              			</div>
              			<div class="table-buttons" if={s.confirmDelete}>
              				<span disabled={loading} class="button is-small is-rounded" title="Delete" onclick={delete}><i class="fa fa-check" ></i></span>
              				<span disabled={loading} class="button is-small  has-text-danger is-rounded" title="Cancel" onclick={cancelOperation}><i class="fa fa-times"></i></span>
            			</div>
          			</td>
          			
				</tr>
			</tbody>
		</table>
	</section>

	<section class="container is-fluid" show={fee_plan_view =='add_fee_plan'}>
		<div class="level">
		  <div class="level-left">
		    <div class="level-item">
		    	<h2 class="title" style="color: #ff3860;">{title} Fee Plan</h2>
		    </div>
		  </div>
		  <div class="level-right">
		    <a class="button" onclick={close_new_fee_plan}>Back</a>
		  </div>
		</div>
		<div class="flex items-center mt-2 mb-6 no-print">
			<div class="bg-green py-1 rounded w-10"></div>
			<div class="bg-grey h-px flex-auto"></div>
		</div>
		
	<div class="columns">
		<div class="column is-full">
			<div  class="box max-w-md">
				<div class="columns is-multiline">   
				    <div class="column is-two-fifths">
				      	<div class="field">
							<label class="label">Plan Name</label>
							<input class="input" ref="fee_plan_name" type="text">
				      	</div>
				    </div>
				    <div class="column is-three-fifths">
				      	<div class="field">
							<label class="label" >Description</label>
							<input class="input" ref="fee_plan_description" type="text">
				      	</div>
				   	</div>
				    <div class="column is-full">
						 <table class="table is-fullwidth is-striped is-hoverable">
							<thead>
								<tr>
									<th width="50">Select</th>
									<th>Standard</th>
								</tr>
							</thead>
							<tbody>
								<tr each={r, i in standards}>
									<td class="has-text-right">
										<input type="checkbox" class="id_check_box" checked={r.done} id="{ 'standardId' + r.standard_id }" onclick={selectStandard.bind(this,r)} > 
									</td>
									<td>{r.standard}</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="column is-full">
						<button class="button is-danger" onclick={add}>Submit</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- ========== Map Fee Plan View ============== -->
  <section class="container is-fluid" show={fee_plan_view =='map_fee_head'}>
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <h2 class="title" style="color: #ff3860;">Map Fee Plan with Fee Heads by Fee Slip</h2>
        </div>
      </div>
      <div class="level-right">
        <a class="button" onclick={close_new_fee_plan}>Back</a>
      </div>
    </div>
    
  <div class="columns">
    <div class="column is-full">
      <div  class="box max-w-md">
        <div class="columns is-multiline">   
          <div class="columns">
            <div class="column is-narrow">
              <label class="label" >Select Fee Slip</label>
            </div>
            <div class="column is-narrow">
              <div class="control">
                    <div class="select is-fullwidth">
                  <select ref="fee_slip_name">
                    <option value=''></option>
                    <option each={slips} value={fee_slip_name} >{fee_slip_name}</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="column is-narrow">
              <label class="label" >Last Date</label>
            </div>
            <div class="column is-narrow">
                <div class="control">
                  <input class="date input flatpickr-input form-control input" ref="lastDateInput" placeholder="" tabindex="0" type="text" readonly="readonly">
                </div>
              </div>
          </div>  
            <div class="column is-full">
             <table class="table is-fullwidth is-striped is-hoverable">
              <thead>
                <tr>
                  <th width="50">Head</th>
                  <th style="width:100px">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr each={r, i in heads}>
                  <td>{r.head}</td>
                  <td><input class="input" id="head_amount{r.head_id}" type="text" value="0" onkeyup={getTotal}></td>
                </tr>
              </tbody>
              <thead>
                <tr>
                  <th width="50" class="has-text-right">Total</th>
                  <th>{grandTotal}</th>
                </tr>
              </thead>
            </table>

          </div>
          <div class="column is-full">
            <button class="button is-danger" style="float:right" onclick={addHeadAmount}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
<!-- ========== End Map Fee Plan  View ========= -->
<!-- ======== Edit Fee Slip Head =========== -->
<!-- ========== Map Fee Plan View ============== -->
  <section class="container is-fluid" show={fee_plan_view =='edit_fee_head'}>
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <h4 class="title" style="color: #ff3860;">Edit Fee Slip Heads</h4>
        </div>
      </div>
      <div class="level-right">
        <a class="button" onclick={close_new_fee_plan}>Back</a>
      </div>
    </div>
    
  <div class="columns">
    <div class="column is-full">
      <div  class="box max-w-md">
        <div class="columns is-multiline">   
          <div class="columns">
            <div class="column is-narrow">
              <label class="label" >Selected=== {selectedFeeSlip}</label>
            </div>
            <div class="column is-narrow">
              <label class="label" >Last Date</label>
            </div>
            <div class="column is-narrow">
                <div class="control">
                  <input class="date input flatpickr-input form-control input" ref="lastDateEdit" placeholder="" tabindex="0" type="text" readonly="readonly">
                </div>
              </div>
          </div>  
            <div class="column is-full">
             <table class="table is-fullwidth is-striped is-hoverable">
              <thead>
                <tr>
                  <th width="50">Head</th>
                  <th style="width:100px">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr each={r, i in feeSlipEditHeads}>
                  <td>{r.head}</td>
                  <td><input class="input" id="head_edit{r.head_id}" type="text" value="{r.head_amount}" onkeyup={getEditTotal}></td>
                </tr>
              </tbody>
              <thead>
                <tr>
                  <th width="50" class="has-text-right">Total</th>
                  <th>{grandTotal}</th>
                </tr>
              </thead>
            </table>

          </div>
          <div class="column is-full">
            <button class="button is-danger" style="float:right" onclick={editHeadAmount}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
<!-- ========== End Map Fee Plan  View ========= -->
<!-- =========End Edit =================== -->
<!-- ========== View Fee Slip View ============== -->
<section class="container is-fluid" show={fee_plan_view =='viewFeeSlipDetail'}>
  <div class="level">
    <div class="level-left">
      <div class="level-item">
        <h4 class="title" style="color: #ff3860;">Selected Plan: {selectedPlan}</h4>
      </div>
    </div>
    <div class="level-right">
      <a class="button" onclick={close_new_fee_plan}>Back</a>
    </div>
  </div>
  
  <div class="columns">

    <div class="column is-full">
      <div  class="box max-w-md">
            
          <div class="column is-full">
           <table class="table is-fullwidth is-striped is-hoverable">
            <thead>
              <tr>
                <th>Particulars</th>
                <th class="has-text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr each={f, i in feeSlipHeads} class={header:f.amount==''}>
                <td class={texRight:f.head=='Sub Total' || f.head=='Grand Total'}>{f.head}</td>
                
                <td style="text-align: right">
                    <span  class={texBold:f.head=='Sub Total' || f.head=='Grand Total'} show={f.fee_slip_id==''}>{f.amount}
                      </span>
                      <span show={f.fee_slip_id!=''}>
                          <span><a class="button is-small is-rounded" onclick={editFeeSlip.bind(this, f)}>Edit</a></span>
                          <span> <a class="button is-small has-text-danger is-rounded"  id="showModal" onclick={confirmDeleteFeeSlip.bind(e, f.fee_slip_id)}>Delete</a></span> 
                    </span>
                </td>

                

              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ========== Map Fee Plan View ============== -->
  <section class="container is-fluid" show={fee_plan_view =='editFeeSlipDetail'}>
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <h4 class="title" style="color: #ff3860;">Edit Fee Slip Under:{selectedPlan} for the month of {selectedSlip}</h4>
        </div>
      </div>
      <div class="level-right">
        <a class="button" onclick={close_new_fee_plan}>Back</a>
      </div>
    </div>
    <div class="columns">
      <div class="column is-full">
        <div  class="box max-w-md">
          <div class="columns is-multiline">   
            <div class="columns">
              <div class="column is-narrow">
                <label class="label" >Select Fee Slip</label>
              </div>
              
            </div>  
              <div class="column is-full">
               <table class="table is-fullwidth is-striped is-hoverable">
                <thead>
                  <tr>
                    <th width="50">Head</th>
                    <th style="width:100px">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr each={r, i in heads}>
                    <td>{r.head}</td>
                    <td><input class="input" id="head_amount{r.head_id}" type="text" value="0" onkeyup={getTotal}></td>
                  </tr>
                </tbody>
                <thead>
                  <tr>
                    <th width="50" class="has-text-right">Total</th>
                    <th>{grandTotal}</th>
                  </tr>
                </thead>
              </table>

            </div>
            <div class="column is-full">
              <button class="button is-danger" style="float:right" onclick={addHeadAmount}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
</section>
<!-- ========== End Map Fee Plan  View ========= -->

<!-- Open Modal Start -->
  <div class="modal" id="deleteFeeSlipModel">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Delete Confirmation</p>
      </header>
      <section class="modal-card-body">
        <h4>Are you Sure?</h4>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-danger"  onclick={deleteFeeSlip}>Delete</button>  
        <button class="button " id="modal-close" onclick={removeDeleteFeeSlip}>Cancel</button>
      </footer>
    </div>
  </div>
<!-- Open Modal End -->

 <script>

 var self = this
    self.on("mount", function(){
      flatpickr(".date", {
      /*altInput: true,*/
      allowInput: true,
      altFormat: "d/m/Y",
      dateFormat: "Y-m-d",
      })
      self.title='Add'
      self.role = getCookie('role')
      self.fee_plan_view = 'show_fee_plan'
      self.loading = false
      self.update()
      self.readFeePlans()
      self.readStandards()
      self.readHeads()
    })

    self.on("unmount", function(){
      feePlanStore.off('fee_plan_changed', PlansChanged)
      feePlanStore.off('fee_slip_head_changed', FeeSlipHeadChanged)
      feePlanStore.off('fee_slip_read_edit_changed', FeeSlipReadEditChanged)
      feePlanStore.off('add_fee_plan_changed', AddFeePlansChanged)
      feePlanStore.off('read_standard_changed', ReadStandnard)
      feePlanStore.off('map_fee_head_changed', MapFeeHeadsChanged)
      feeSlipStore.off('slips_changed', SlipsChanged)
      feeHeadStore.off('heads_changed', HeadsChanged)
      feeHeadStore.off('fee_slip_delete_changed', FeeSlipDeleteChanged)
    })
    
    //====== get Total
    self.getTotal = () =>{
      self.feedHeadValues = [];
      self.grandTotal = 0
      self.heads.map(g=>{
        let ha = 'head_amount'+g.head_id
        if(document.getElementById(ha).value!=0){
          self.grandTotal = self.grandTotal + Number(document.getElementById(ha).value)
          var obj ={}
          obj.head_id = g.head_id
          obj.head_amount = Number(document.getElementById(ha).value)
          self.feedHeadValues.push(obj)
        }
      })
    }

    //=====get Edit Total
    self.getEditTotal = () =>{
      self.feedHeadValues = [];
      self.grandTotal = 0
      self.feeSlipEditHeads.map(g=>{
        let edit = 'head_edit'+g.head_id
        if(document.getElementById(edit).value!=0){
          self.grandTotal = self.grandTotal + Number(document.getElementById(edit).value)
          var obj ={}
          obj.head_id = g.head_id
          obj.head_amount = Number(document.getElementById(edit).value)
          self.feedHeadValues.push(obj)
        }
      })
    }
    /*console.log("head amount")
    console.log(self.feedHeadValues)*/
    //read courses
    self.readFeePlans = () => {
      self.loading=true
       feePlanStore.trigger('read_fee_plans')
    }
    self.readStandards = () =>{
    	feePlanStore.trigger('read_standards')	
    }
self.viewFeeSlip = (c,e) =>{
      console.log("here");
      console.log(c)
     /* self.readSlips()
      self.readHeads()
      self.selected_fee_plan_id = c*/
      
      self.selectedPlan = c.fee_plan_name
      self.selected_plan_id = c.fee_plan_id
      feePlanStore.trigger('read_fee_slip_head', c.fee_plan_id)

}
self.readFeePlan = () =>{
  //feePlanStore.trigger('read_fee_slip_head', self.selected_plan_id, self.edit_fee_slip_name.)
}
//======== Map Fee Head
self.mapHead = (c,e) => {
      console.log("here");
      console.log(c)
      self.readSlips()
      self.readHeads()
      self.selected_fee_plan_id = c
      self.fee_plan_view='map_fee_head'
      /*self.refs.addSlipName.value = c.fee_slip_name
      self.old_fee_slip_name = c.fee_slip_name*/
    }
self.editFeeSlip = (c,e)=>{
  console.log("inside fee slip edit data read")
  console.log(c);
  //self.selected_fee_plan_id = c.fee_slip_id;
  self.selectedFeeSlip = c.head;
  self.refs.lastDateEdit.value = c.last_date
  self.edit_fee_slip_id = c.fee_slip_id
  self.fee_plan_view='edit_fee_head'
  feePlanStore.trigger('read_fee_slip_edit', c.fee_slip_id)

}
//read slips
    self.readSlips = () => {
       feeSlipStore.trigger('read_slips')
    }
//===== read Heads
  self.readHeads = () => {
       feeHeadStore.trigger('read_heads')
    }

 self.close_new_fee_plan = () => {
    	self.fee_plan_view='show_fee_plan'
    	self.update()
    }
   self.selectStandard = (item,event) => {
    	item.done=!event.item.r.done
    	self.standard_id = item.standard_id;
        console.log(self.standards)
        console.log(self.standard_id)
    }
    self.add_new_fee_plan = () =>{
    	self.fee_plan_view='add_fee_plan'
    	self.title='Add'
    	//self.clearForm()
    	self.update()

    	//document.getElementById("username").focus()
    }
    // add Fee Head Amount
    self.addHeadAmount = () =>{
      console.log("----------heads ")
      console.log(self.feedHeadValues)
     
      if(!self.refs.fee_slip_name.value){
        toastr.info("Please Fee Slip and try again")
      }else if(!self.refs.lastDateInput.value){
        toastr.info("Please insert Last date and try again")
      }else if(self.feedHeadValues.length==0){
          toastr.info("Please Insert Head amount and  try again") 
      }else{
        var obj = {}
        obj['fee_slip_name'] = self.refs.fee_slip_name.value  
        obj['last_date'] = self.refs.lastDateInput.value  
        obj['feeHeads'] = self.feedHeadValues
        obj['total_amount'] = self.grandTotal
        obj['fee_plan_id'] = self.selected_fee_plan_id
        self.loading = true
          console.log("Add")
          console.log(obj)
          feePlanStore.trigger('add_head_amount', obj)
        }
      }

    //======Edit Head Amount 
    self.editHeadAmount = () =>{
     if(!self.refs.lastDateEdit.value){
        toastr.info("Please insert Last date and try again")
      }else if(self.feedHeadValues.length==0){
          toastr.info("Please Insert Head amount and  try again") 
      }else{
        var obj = {}
        obj['fee_slip_id'] = self.edit_fee_slip_id
        obj['last_date'] = self.refs.lastDateEdit.value  
        obj['feeHeads'] = self.feedHeadValues
        obj['total_amount'] = self.grandTotal
        self.loading = true
          console.log("Edit")
          console.log(obj)
          feePlanStore.trigger('edit_head_amount', obj)
        }
      }
    
    //Add Fee Plan
    self.add = () => {
       var tempStandards = [];
       var tempStandards = self.standards.filter(c => {
          return c.done == true
        })
      if(!self.refs.fee_plan_name.value){
        toastr.info("Please enter Fee Plan Title and try again")
      }else if(tempStandards.length==0){
          toastr.info("Please Select standard and try again") 
      }else{
      	console.log("here")
        var obj = {}
        obj['fee_plan_name'] = self.refs.fee_plan_name.value	
        obj['fee_plan_description'] = self.refs.fee_plan_description.value	
        obj['standards'] = tempStandards
       
        self.loading = true
        if(self.title=='Add'){
        	console.log("Add")
          console.log(obj)
          feePlanStore.trigger('add_plan', obj)
        }else if(self.title=='Update'){
          console.log('update')
          /*feePlanStore.trigger('bank_edit',self.refs.addBankAccountInput.value,
          self.refs.addBankNameInput.value , 
          self.refs.addBranchInput.value, self.edit_id)*/
        }
      }
    }

    feePlanStore.on('fee_plan_changed',PlansChanged)
    function PlansChanged(feePlans){
      console.log(feePlans) 
      self.title='Add'
      //self.refs.addHeadInput.value = ''
      self.loading = false
       self.feePlans = []
      self.feePlans = feePlans
      self.update()
      console.log(self.feePlans)
    }
    
    feePlanStore.on('fee_slip_read_edit_changed',FeeSlipReadEditChanged)
     function FeeSlipReadEditChanged(feeSlipEditHeads){
      console.log(feeSlipEditHeads) 
      self.loading = false
      self.feeSlipEditHeads = []
      self.feeSlipEditHeads = feeSlipEditHeads
      self.update()
      console.log(self.feeSlipEditHeads)
    }

    feePlanStore.on('fee_slip_head_changed',FeeSlipHeadChanged)
     function FeeSlipHeadChanged(feeSlipHeads){
      console.log(feeSlipHeads) 
      self.loading = false
      self.feeSlipHeads = []
      self.fee_plan_view='viewFeeSlipDetail'  
      
      self.feeSlipHeads = feeSlipHeads
      self.update()
      console.log(self.feeSlipHeads)
    }
    self.editDeleteShow = ()=>{
      console.log("inside")
      if(self.refs.edit_fee_slip_name.value!=-1) self.confirmSlipEditDelete = true
      else self.confirmSlipEditDelete = false  
    }
  
  //======== Delete Fee Slip =====
    /*========== Modal ========*/
    self.confirmDeleteFeeSlip = (e, s) =>{
      console.log("clicked")
      console.log(e)
      console.log("=============")
      console.log(s)
        self.selected_fee_slip_id = e;
        $("#deleteFeeSlipModel").addClass("is-active");  
    }
    
    self.removeDeleteFeeSlip = () =>{
      console.log("")
      $("#deleteFeeSlipModel").removeClass("is-active");
    }
    self.deleteFeeSlip = () => {
      self.loading = true
      feePlanStore.trigger('delete_fee_slip', self.selected_fee_slip_id)
    }
    self.cancelOperation = () =>{
      c.confirmDelete = false
    }
  //=========End Fee Slip Delete  

    self.confirmDelete = (s) => {
      console.log(s);
      self.feePlans.map(c => {
        console.log(c);
        if(c.fee_plan_id != s.item.s.fee_plan_id){
          c.confirmDelete = false
        }else{
          c.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      feePlanStore.trigger('delete_plan', e.item.s.fee_plan_id)
    }
    
    feePlanStore.on('read_standard_changed',ReadStandnard)
    function ReadStandnard(standards){
      console.log(standards) 
      self.loading = false
      self.standards = standards
      self.update()
      console.log(self.standards)
    }    
    feePlanStore.on ('map_fee_head_changed',MapFeeHeadsChanged)
    function MapFeeHeadsChanged(feePlanHeads){
      console.log("-------Heads --------")
      console.log(feePlanHeads) 
      self.loading = false
      self.lastDateInput.value =''
      self.refs.fee_slip_name.value = '' 
      //self.feePlanHeads = feePlanHeads
      self.update()
      //console.log(self.feePlanHeads)
    }
    feePlanStore.on('fee_slip_delete_changed',FeeSlipDeleteChanged)
    function FeeSlipDeleteChanged(){
      self.loading = false
      $("#deleteFeeSlipModel").removeClass("is-active");
      //feePlanStore.trigger('read_fee_slip_head', c.fee_plan_id)
      self.update()
    }
    feePlanStore.on('add_fee_plan_changed',AddFeePlansChanged)
    function AddFeePlansChanged(feePlans){
      console.log(feePlans) 
      self.title='Add'
      self.loading = false
      self.feePlans = feePlans
      self.update()
      console.log(self.feePlans)
    }
    feeSlipStore.on('slips_changed',SlipsChanged)
    function SlipsChanged(slips){
      self.refs.lastDateInput.value = ''
      self.loading = false
       self.slips = []
      self.slips = slips
      self.update()
      //console.log(self.slips)
    }
    
    feeHeadStore.on('heads_changed',HeadsChanged)
    function HeadsChanged(heads){
      self.loading = false
       self.heads = []
       self.heads = heads
      self.update()
      console.log(self.heads)
    }
  </script>
</fee-plan>