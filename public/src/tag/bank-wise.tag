<bank-wise>
	<section class=" is-fluid" >
		<div class="box">
			<div class="columns">
				<div class="column is-narrow">
					<label class="label">Bank</label>
				</div>
				<div class="column is-narrow">
					<div class="control">
						<div class="select">
							<select ref="bank_id">
								<option value='-1'>All</option>
								<option each={banks} value={bank_id}>{bank}
	                            </option>
							</select>
						</div>
					</div>
				</div>
				<div class="column is-narrow">
					<label class="label">Mode</label>
				</div>
				<div class="column is-narrow">
					<div class="control">
						<div class="select">
							<select ref="mode">
								<option value='All'>All</option>
								<option each={modes} value={mode}>{mode}
	                            </option>
							</select>
						</div>
					</div>
				</div>
				<div class="column is-narrow">
					<label class="label">From Date</label>
				</div>
				<div class="column is-narrow">
					<input class="date input flatpickr-input form-control input" placeholder="" ref="start_date" tabindex="0" type="text" readonly="readonly">
				</div>
				<div class="column is-narrow">
					<label class="label">To Date</label>
				</div>
				<div class="column is-narrow">
					<input class="date input flatpickr-input form-control input" placeholder="" ref="end_date" tabindex="0" type="text" readonly="readonly">
				</div>
				<div class="column">
					<button class="button is-danger has-text-weight-bold"
					onclick={getBankWiseFees} > GO
					</button>
					
				</div> 
			</div>
		</div>
  <div class="columns is-full">
    <table class="table is-fullwidth is-striped is-hoverable is-bordered" >
      <thead>
        <tr>
            <th class="slno">#</th>
            <th >Recpt Dt</th>
            <th >Recpt No</th>
            <th >Enro No</th>
            <th >Student's Name</th>
            <th >Class</th>
            <th >Month</th>
            <th >Fees</th>
            <th >Fine</th>
            <th >Schl</th>
            <th >Total</th>
        </tr>
        
      </thead>
      <tbody>
        <tr each={cd, i in bankWiseFees}>
          <td>{i + 1}</td>
          <td>{cd.receipt_date}</td>
          <td class="amount">{cd.receipt_id}</td>
          <td class="amount">{cd.enroll_number}</td>
          <td >{cd.student_name}</td>
          <td class="amount">{cd.class}</td>
          <td class="amount">{cd.fee_slip_name}</td>
          <td class="has-text-right amount">{cd.fees}</td>
          <td class="has-text-right amount">{cd.fine}</td>
          <td class="has-text-right amount">{cd.scholarship}</td>
          <td class="has-text-right amount">{cd.total}</td>
        </tr>
        <tr>
          <th class="has-text-right" colspan="7">Grand Total</th>
          <th class="has-text-right amount">{totalFees}</th>
          <th class="has-text-right amount">{totalFine}</th>
          <th class="has-text-right amount">{totalScholarship}</th>
          <th class="has-text-right amount">{grandTotal}</th>
        </tr>
      </tbody>
    </table>
  </div>
</section>  
<script>
	var self = this
    self.on("mount", function(){
      self.role = getCookie('role')
       flatpickr(".date", {
    	/*altInput: true,*/
    	allowInput: true,
    	altFormat: "d/m/Y",
    	dateFormat: "Y-m-d",
  		})
      self.update()
      self.readBanks()
      self.readMode()
    })
    self.on("unmount", function(){
      feesReportStore.off('read_bank_changed',BankChanged)
      feesReportStore.off('read_mode_changed',ModeChanged)
      feesReportStore.off('read_bank_wise_changed',BankWiseChanged)
    })
    self.getBankWiseFees = () => {
    	var obj={}
    	  obj.bank_id = self.refs.bank_id.value
    	  obj.mode = self.refs.mode.value
          obj['start_date']=self.refs.start_date.value
          obj['end_date']=self.refs.end_date.value
          self.loading = true
          feesReportStore.trigger('read_bank_wise_fees', obj)
          
    }
    /*========== Modal ========*/
    //read courses
    self.readMode = () => {
       feesReportStore.trigger('read_mode')
    }
    self.readBanks = () => {
       feesReportStore.trigger('read_banks')
       
    }
    feesReportStore.on('read_bank_changed',BankChanged)
    function BankChanged(banks){
      console.log(banks) 
      self.banks = banks
      self.update()

      console.log(self.banks)
    }
    feesReportStore.on('read_mode_changed',ModeChanged)
    function ModeChanged(modes){
    	console.log("MOdes")
      console.log(modes) 
      self.modes = modes
      self.update()
    }
    feesReportStore.on('read_bank_wise_changed',BankWiseChanged)
    function BankWiseChanged(bankWiseFees){
    	console.log("bankWiseFees")
      console.log(bankWiseFees) 
        self.bankWiseFees = bankWiseFees
        self.totalFees = 0
        self.totalFine = 0
        self.totalScholarship = 0
        self.grandTotal = 0

        self.bankWiseFees.map(c => {
        self.totalFees +=Number(c.fees)
        self.totalFine +=Number(c.fine)
        self.totalScholarship +=Number(c.scholarship)
        self.grandTotal +=Number(c.total)
      })
      self.update()
    }
    

</script>

</bank-wise>