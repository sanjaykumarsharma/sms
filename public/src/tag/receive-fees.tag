<receive-fees>
<loading-bar if={loading}></loading-bar> 
<!-- ========== Assign Scholarship ============== -->
  <section class="is-fluid" show={fees_view =='ReceiveFees'}>
   <div class="columns">
      <div class ="column is-three-fifths is-multiline">
        <div class="box">
          <div class="columns">
            <div class="column is-narrow">
              <div class="control">
                <input class=" input"
                ref="enrolNumberText" type="text" placeholder="Enrol Number">
              </div>
            </div>
            <div class="column">
              <button class="button is-danger" onclick={getStudentDetail}>Go</button>
            </div>
          </div>
          <div class="columns">
            <div class="column is-one-quarter">
              <img src="https://bulma.io/images/placeholders/128x128.png">
            </div>
            <div class="column">
              <p class="label"><span style="color: #ff3860;">{student_name} </span>({standard})</p>
              <p class="label">Father: {f_name}</p>
              <p class="label">Mother: {m_name}</p>
              <h4 class="title" style="color: #ff3860; font-size: 1.5rem;">{student_plan}</h4>
            </div>
            
          </div>
          <div class="field has-addons">
              <p class="control">
                <button class="button is-primary" onclick={getStudentTransactions}>Transactions</button>
              </p>
              <p class="control">
                <button class="button is-link" onclick={openSearchModal}>
                  <span>Search By Receipt No.</span>
                </button>
              </p>
              <p class="control">
                <button class="button is-warning" onclick={selectStudent}>
                  <span>Select Student</span>
                </button>
              </p>
            </div>
        </div>
        <div class="box" show={DueFeeSlips}>
          <table class="table is-fullwidth is-striped is-hoverable">
            <thead>
              <tr>
                <th width="50"></th>
                
                <th>Fee Slip Name</th>
                <th style="width:120px">Due Date</th>
                <th class="has-text-right" style="width:110px">Amount</th>
                <th class="has-text-right" style="width:100px">Scholarship</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr each={r, i in feeSlips}>
                <td class="has-text-right">
                  <input type="checkbox" class="id_check_box" checked={r.done} id="{ 'feeslipId' + r.fee_slip_id }" onclick={calculateFees.bind(this,r)} > 
                </td>
                <td>{r.fee_slip_name}</td>
                <td>{r.last_date}</td>
                <td class="has-text-right">{r.amount}</td>
                <td class="has-text-right">{r.scholorship_amount}</td>
                <td>
                   <span> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick={feeSlip.bind(this, r)}>View Slip</a></span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="box" show={PaidFeeSlips}>
          <table class="table is-fullwidth is-striped is-hoverable">
            <thead>
              <tr>
                <th width="50">Rcpt No.</th>
                
                <th>Fee Slip </th>
                <th style="width:100px">Mode</th>
                <th style="width:120px">Paid On</th>
                <th class="has-text-right" style="width:110px">Fees</th>
                <th class="has-text-right" style="width:110px">Fine</th>
                <th class="has-text-right" style="width:100px">Scholarship</th>
                <th><span> <a class="button is-danger is-small has-text-weight-bold is-rounded" onclick={hideTransaction} title='Close Transaction'>Close</a></span></th>
              </tr>
            </thead>
            <tbody>
              <tr each={r, i in transactions}>
                <td class="has-text-right">
                 {r.receipt_id}
                </td>
                <td>{r.fee_slip_name}</td>
                <td>{r.mode}</td>
                <td>{r.receipt_date}</td>
                <td class="has-text-right">{r.amount_due}</td>
                <td class="has-text-right">{r.fine_recevied}</td>
                <td class="has-text-right">{r.scholorship_amount}</td>
                <td class="has-text-right">
                <div class="inline-flex rounded border border-grey overflow-hidden" hide={r.confirmDelete}>
                    <span if={role=='ADMIN'}> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick={confirmDelete}>Delete</a></span>
                </div>
                <div class="table-buttons" if={r.confirmDelete}>
                    <span disabled={loading} class="button is-small is-rounded" onclick={delete}><i class="fa fa-check" ></i></span>
                    <span disabled={loading} class="button is-small  has-text-danger is-rounded" onclick={cancelOperation}><i class="fa fa-times"></i></span>
                </div>
              </td>
              </tr>
            </tbody>
          </table>
          
        </div>
      </div>
      <div class="column">
        <div class="box">
            <table class="fees-table" style="border-spacing:10px !important">
                <tr>
                  <th class="fieldLabel">Fees Due</th>
                  <td><input class="input textWidth" ref="feesDueText" type="number" readonly style="margin-bottom:8px"></td>
                  <th class="fieldLabel">Date</th>
                  <td><input class="input textWidth date" type="text" ref="feesReceiveDate" onchange={fineCalculation} ></td>
                </tr>
                <tr>
                  <th class="fieldLabel">Fees Paid</th>
                  <td><input class="input textWidth" id="feesPaidText"  ref="feesPaidText" type="number" onkeyup={adjustedChangeHandler}></td>
                  <th class="fieldLabel">Scholarship</th>
                  <td><input class="input textWidth " type="text" ref="scholorshipText" readonly></td>
                  <th colSpan="2"></th>
                </tr>
                <tr>
                  <th class="fieldLabel">Fine Due</th>
                  <td><input class="input textWidth" ref="fineDueText" type="number" readonly></td>
                  <th class="fieldLabel">Fine Paid</th>
                  <td><input class="input textWidth" ref="finePaidText" type="number" onkeyup={fineAdjustedChangeHandler}></td>
                  
                </tr>
                <tr>
                  <th class="fieldLabel">Fine Adjust</th>
                  <td><input class="input textWidth " type="text" ref="fineAdjustedText" readonly></td>
                  <th class="fieldLabel">Amount Due</th>
                  <td><input class="input textWidth " type="text" ref="amountDueText" readonly></td>
                </tr>
                <tr>
                  <th class="fieldLabel">Remarks</th>
                  <td colspan="3"> <textarea class="textarea" rows="2" type="text" ref="remarksText"></textarea></td>
                </tr>
                <tr>
                  <th class="fieldLabel">Mode</th>
                  <td colspan="3">
                    <div class="control">
                      <label class="radio"><input type="radio" name="modeRadioGroup"  value="Cash" onclick ={getRadioValue} checked>Cash</label>
                      <label class="radio"><input type="radio" name="modeRadioGroup"  value="Cheque" onclick ={getRadioValue}>Cheque</label>
                      <label class="radio"><input type="radio" name="modeRadioGroup"  value="Bank" onclick ={getRadioValue}>Bank</label>
                      <label class="radio"><input type="radio" name="modeRadioGroup"  value="Draft" onclick ={getRadioValue}>Draft</label>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th class="fieldLabel">Drawn On</th>
                  <td colspan="3"><input class="input" type="text" id="drawnOnText" ref="drawnOnText"></td>
                </tr>
                <tr>
                  <th class="fieldLabel">Number</th>
                  <td><input class="input textWidth " type="text" id="itemNumberText" ref="itemNumberText"></td>
                  <th class="fieldLabel">Dated</th>
                  <td><input class="input textWidth date" type="text" id="itemDate" ref="itemDate"></td>
                </tr>
                <tr>
                  <th class="fieldLabel">Received In</th>
                  <td colspan="3" class="select is-fullwidth">
                    <select id="bankNameList" ref="bankNameList">
                      <option class="fieldLabel">Select Bank</option>
                      <option each={banks} value={bank_account_no}>{bank_name}</option>
                    </select>
                  </td>
                  <td><button class="button is-danger" onclick={submitFees}>Submit</button></td>
                  
                  <td>
                    <input type="checkbox" id="checkTable" checked={e.done}
            onclick={tutionFeesOnly}  style="margin-top: 12px;"> If Only Tution Fees 
                  </td>
                </tr>
            </table>
        </div>

        <!-- Fee Slip Head Div Start -->
        <div class="box" show={FeeSlipHead}>
          <h4>status: {FeeSlipHead}</h4>
          <table class="table is-fullwidth is-striped is-hoverable">
            <thead>
              <tr>
                <th>Head</th>
                <th style="width:120px">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr each={r, i in feeSlipHeads}>
                <td>{r.head}</td>
                <td class="has-text-right">{r.amount}</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
</section>

<section class=" is-fluid" show={fees_view =='show_student_list'}>
    <div class="level">
      <div class="level-left">
        <h2 class="title" style="color: #ff3860;">Students</h2>
      </div>
      <div class="level-right">
        <button class="button is-warning is-rounded" onclick={closeStudentlist}>
          <span class="icon">
            <span class="fas fa-arrow-left"></span>
          </span>
        </button>
      </div>
    </div>
    <div class="box">
      <div class="columns">
        <div class="column is-narrow">
          <div class="control">
            <div class="select">
              <select ref="standard_id" onchange={getSection}>
                <option>Choose Section</option>
                <option each={standards} value={standard_id}>{standard}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="column is-narrow">
          <div class="control">
              <div class="select is-fullwidth">
              <select ref="section_id">
                <option>Choose Class</option>
                <option each={filteredSections} value={section_id}>{section}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="column">
          <button class="button is-danger has-text-weight-bold"
          onclick={getStudentData} >GO
          </button>
        </div>
      </div>
    </div>
    <table class="table is-fullwidth is-striped is-hoverable is-narrow">
      <thead>
        <tr>
          <th>Roll no</th>
          <th>Student Name</th>
          <th>Enroll No</th>
          <th>Registration No</th>
          <th>SMS</th>
          <th>Father's Name</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr each={st, i in studentList}>
          <td>{st.roll_number}</td>
          <td>{st.name}</td>
          <td>{st.enroll_number}</td>
          <td>{st.reg_number}</td>
          <td>{st.mobile}</td>
          <td>{st.f_name}</td>
          <td class="has-text-right">
             <span><a class="button is-small is-rounded " onclick={addStudent.bind(this, st.enroll_number)}>Select</a></span>   
          </td>
        </tr>
      </tbody>
    </table>
  </section>

  <!-- Open Exam Scheme Modal Start -->
  <div id="SearchModal" class="modal ">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Search By Receipt Number</p>
      </header>
      <section class="modal-card-body">  
        <div class="columns">
          <div class="column">
            <div class="field">
              <label class="label" for="role">Receipt Number</label>
              <div class="control">
                <input class="input" type="number" ref="receiptNumberInput" id="receiptNumberInput" >
              </div>
            </div>
          </div>
        </div>

      </section>
      <footer class="modal-card-foot">
        <button class="button is-danger" onclick={searchByReceiptNo} >Search</button>
        <button class="button" id="item-modal-close" onclick={closeSearchModal}>Cancel</button>
      </footer>
    </div>
  </div>
  <!-- Exam Scheme Modal End -->
 <script>
 var self = this
    self.on("mount", function(){
      document.getElementById("drawnOnText").disabled=true
      document.getElementById("itemNumberText").disabled=true
      document.getElementById("itemDate").disabled=true
      document.getElementById("bankNameList").disabled=true
      document.getElementById("feesPaidText").readOnly = true

      self.fees_view = 'ReceiveFees'  
      self.PaidFeeSlips = false    
      self.DueFeeSlips = true 
      self.FeeSlipHead = false 
      self.role = getCookie('role')
      self.readStandard()
      self.readSection()
      self.payment_mode = 'Cash'
      self.loading = false
      self.update()
      flatpickr(".date", {
        allowInput: true,
        dateFormat: "d/m/Y",
      })

      self.refs.scholorshipText.value = 0;
      self.readBank()
      self.readFine()
    })
    self.on("unmount", function(){
      bankStore.off('read_bank_changed', ReadBankChanged)
      feeReceivedStore.off('read_fine_changed', ReadFineChanged)

      feeReceivedStore.off('read_student_changed', ReadStudentChanged)
      feeReceivedStore.off('read_transaction_changed', ReadTransactionChanged)
      feeReceivedStore.off('read_slip_head_changed', ReadSlipHeadChanged)
      feeReceivedStore.off('add_fees_changed', AddFeesChanged)
      feeReceivedStore.off('delete_transaction_changed',DeleteTransactionChanged)
      
      feeReceivedStore.off('read_feeslip_changed', ReadFeeSlipChanged)
      feeReceivedStore.off('read_fee_plan_changed', ReadFeePlanChanged)
      feeReceivedStore.off('read_student_by_receipt_no_changed',ReadStudentReceiptNoChanged)
      //bankStore.off('add_bank_changed',AddBankChanged)
    })

    self.readStandard = () => {
       feeReceivedStore.trigger('read_standard')
    }

    self.readSection = () => {
       feeReceivedStore.trigger('read_section')
    }

    self.getSection = () => {
      self.filteredSections = []
      self.filteredSections = self.sections.filter(s => {
        return s.standard_id == self.refs.standard_id.value
      })
    }

    self.getStudentData = () =>{
      self.students = []

      feeReceivedStore.trigger('read_student_list', self.refs.standard_id.value,self.refs.section_id.value)  
    }
    //=============== Student List===========
    self.selectStudent = () =>{
      self.fees_view ='show_student_list'
    }

    self.closeStudentlist = () =>{
      self.fees_view ='ReceiveFees'
    }

    self.openSearchModal = () => {
      $("#SearchModal").addClass("is-active");
      document.getElementById("receiptNumberInput").focus()
    }

    self.closeSearchModal = () => {
      $("#SearchModal").removeClass("is-active");
    }
    self.searchByReceiptNo = () =>{
      console.log("Hello");
      feeReceivedStore.trigger('read_student_by_receipt_no', self.refs.receiptNumberInput.value)
      self.closeSearchModal();
    }

    self.addStudent = (c,st) => {
      self.enroll_number = c
      console.log(self.enroll_number)
      self.refs.enrolNumberText.value = self.enroll_number
      feeReceivedStore.trigger('read_student', self.enroll_number)
      self.fees_view ='ReceiveFees'
    }

    self.cancelOperation = (r) => {
      self.transactions.map(c => {
          c.confirmDelete = false
      })
    }

    self.confirmDelete = (r) => {
      console.log("------------delete---------")
      console.log(e)
      self.transactions.map(c => {
        if(c.receipt_id != r.item.r.receipt_id){
          c.confirmDelete = false
        }else{
          c.confirmDelete = true
        }
      })
    }

    self.delete = (r) => {
      self.loading = true
      feeReceivedStore.trigger('delete_transaction', r.item.r.receipt_id)
    }
    //======== radio button selction 
    self.getRadioValue = (e) =>{
      self.payment_mode = e.target.value;
      if(self.payment_mode=='Cash'){
        document.getElementById("drawnOnText").disabled=true
        document.getElementById("itemNumberText").disabled=true
        document.getElementById("itemDate").disabled=true
        document.getElementById("bankNameList").disabled=true
      }else if(self.payment_mode=='Bank'){
        document.getElementById("drawnOnText").disabled=true
        document.getElementById("itemNumberText").disabled=true
        document.getElementById("itemDate").disabled=true
        document.getElementById("bankNameList").disabled=false

        
      }else{
        document.getElementById("drawnOnText").disabled=false
        document.getElementById("itemNumberText").disabled=false
        document.getElementById("itemDate").disabled=false
        document.getElementById("bankNameList").disabled=false
      }
      self.update()
      console.log(self.payment_mode )
    }
    self.tutionFeesOnly = () =>{
      if($('#checkTable').is(":checked")){
        console.log("checked")
        document.getElementById("feesPaidText").readOnly = false
          //self.report_view = 'show_table'
      }else{
        console.log("un-checked")
         // self.report_view = 'show_graph'
         document.getElementById("feesPaidText").readOnly = true
      }
    
    }
    //====== calculate Fees ==========
    self.calculateFees = (slip,event) => {
      console.log("item")
      console.log(slip);
        var total_fees = 0;
        var total_concession = 0;
        var total_scholorship = 0;

      self.feeSlips.map(i=>{
          if(slip.fee_slip_id==i.fee_slip_id){
            i.selected=!i.selected
          }
          if(i.selected==true){
            console.log("-----------")
            console.log(i);
            console.log("-----------")
            if(i.amount != null) total_fees = Number(total_fees) + Number(i.amount)
            if (i.scholorship_amount != null) total_scholorship += Number(i.scholorship_amount)
          }
        })

      
       self.refs.feesDueText.value = total_fees
       self.refs.feesPaidText.value = total_fees
       self.refs.scholorshipText.value = total_scholorship
       self.fineCalculation(); 

    }
  //=========== calculate fine ======


  self.fineCalculation = () =>{
    self.refs.finePaidText.value = 0;
      var total_fine = 0;
        var feeDate = new Date(convertDate(self.refs.feesReceiveDate.value));        //fee receive date
        var fine = 0;
        console.log("=========fine========")
        console.log(self.feeSlips)
        self.feeSlips.map(o=>{

          if(o.selected==true){

             var fineStart =  new Date(convertDate(o.last_date)); 
             var diff  = new Date(feeDate - fineStart);
             var fineDays =  Math.round(diff/1000/60/60/24); 
            if (self.fine_type == 'Daily') {
              if (fineDays < self.fine_grace_preiod) {

                  fine = Number(fine_days) * Number(self.fine_amount);
                  
                  o['fine'] = fine
                  }else{
                    fine = 0;
                    o['fine'] = fine
                  }
                 total_fine = total_fine + fine;
              }else if(self.fine_type == 'Slab'){
                if(fineStart >= feeDate){
                  o['fine'] = fine
                  total_fine = 0;
                }else{
                    var due_dt = o.last_date.split('/');
                    var l_day = due_dt[0];
                    var l_month = due_dt[1];
                    var l_year = due_dt[2];
                    var payment_date = self.refs.feesReceiveDate.value;
                    var f_dt = payment_date.split('/');

                    var p_day = f_dt[0]
                    var p_month = f_dt[1]
                    var p_year = f_dt[2]
                    var monthCount = 0;
                if (p_month < l_month) {
                  if (p_year > l_year) {
                    
                    monthCount = Number((12 - l_month) + Number(p_month));
                  }
                }else if (p_month > l_month) {
                  if (p_year > l_year) {
                    monthCount = Number((12 - l_month) + Number(p_month));
                  }else if(p_year == l_year){
                    monthCount = Number(p_month - l_month); 
                  }
                }else if (p_month == l_month) {
                  if (p_year > l_year) {
                    monthCount = Number((12 - l_month) + Number(p_month));
                  }else if (p_year == l_year) {
                    monthCount = 0;
                  }
                }
                 console.log("fine = "+ self.fine_amount)
                 fine = Number(monthCount * 50) + Number(self.fine_amount);
                 total_fine = total_fine + (monthCount*50) + self.fine_amount;
                 o['fine'] = fine
              }
            
            }
          }
      })
        self.refs.fineDueText.value = total_fine;
        self.refs.finePaidText.value = self.refs.fineDueText.value;
        self.fineAdjustedChangeHandler();
  }
  self.fineAdjustedChangeHandler =()=>{
    console.log("after  fee slip")
    if(Number(self.refs.finePaidText.value) <= 0){
      self.refs.fineAdjustedText.value = self.refs.fineDueText.value;
      return
    }
    self.refs.fineAdjustedText.value = Number(self.refs.fineDueText.value) - Number(self.refs.finePaidText.value);
      self.refs.amountDueText.value = Number(self.refs.feesDueText.value) - Number(self.refs.scholorshipText.value) + Number(self.refs.finePaidText.value);
  }
  self.adjustedChangeHandler = () =>{
    self.refs.feesDueText.value = self.refs.feesPaidText.value;
    self.refs.amountDueText.value = Number(self.refs.feesDueText.value) - Number(self.refs.scholorshipText.value) + Number(self.refs.finePaidText.value);
  }
    
    //read banks===========
    self.readBank = () => {
       bankStore.trigger('read_bank')
    }
    self.readFine = () =>{
     feeReceivedStore.trigger('read_fine') 
    }
    //read student
    self.getStudentDetail = () =>{
      self.FeeSlipHead = false;
      var enrol = self.refs.enrolNumberText.value 
      if(enrol.length==0){
        toastr.info("Please enter an enrol numbar")
        return
      }else if(enrol.length<8){
        toastr.info("Please enter an valid enrol numbar")
        return
      }else{
        self.loading = true
        feeReceivedStore.trigger('read_student', self.refs.enrolNumberText.value)
      }
    }
    //=========== view Fee Slips ======
    self.feeSlip = (c, r) =>{
      console.log("clicked to view")
      console.log(c);
      self.fee_slip_id = c.fee_slip_id
      self.fee_plan_id = c.fee_plan_id
      feeReceivedStore.trigger('read_fee_slip_head', self.studentId, self.fee_slip_id, self.fee_plan_id) 
    }
    self.getStudentTransactions = () =>{
      self.PaidFeeSlips = true
      self.DueFeeSlips = false
      feeReceivedStore.trigger('read_transaction', self.studentId)
      /*var students = self.students
      if(students.length==0){
        toastr.info("Please load student information first and try again")
        return
      }else{
        feeReceivedStore.trigger('read_transaction', self.studentId)
      }*/
    }
    self.hideTransaction = () => {
      self.PaidFeeSlips = false
      self.DueFeeSlips = true
    }
    //========read Fee Plan =======
    
    self.readPlanBYEnrollNumber = () =>{
      feeReceivedStore.trigger('read_fee_plan', self.studentId)
    }
    //======= read Slip by Enroll Number =====
    self.readFeeSlipBYEnrollNumber = () =>{
      feeReceivedStore.trigger('read_fee_slip', self.studentId)
    }


    self.submitFees = () =>{
     var msg='';
      if ( self.payment_mode == "Bank" || self.payment_mode== "Cheque" || self.payment_mode== "Draft") {
        if (self.refs.bankNameList.value == 'Select Bank') msg = msg + "\n" + "Select Bank Name specified.";
      } 
      if (msg != "") {
        Alert.show("Following errors have occured - \n" + msg, "Input Error");
        return;
      }
      var obj = {};
      //fee receipt details
      console.log("mode")
      console.log(self.payment_mode)
      obj.mode = self.payment_mode;
      obj.item_no = self.refs.itemNumberText.value ='' ? self.refs.itemNumberText.value : null;
      obj.drawn_on = self.refs.drawnOnText.length ='' ? self.refs.drawnOnText.value : null;
      obj.amounting_to = self.refs.amountDueText.value > 0 ? self.refs.amountDueText.value : null;
      var converted_date = ''
      if(self.refs.itemDate.value!=''){
         converted_date = convertDate(self.refs.itemDate.value) 
      }
      if(converted_date==''){
        obj.dated = null  
      }else{
        obj.dated = converted_date
      }
      
      obj.bank_id = self.refs.bankNameList.value != 'Select Bank' ? self.refs.bankNameList.value : null;
      obj.receipt_date = convertDate(self.refs.feesReceiveDate.value)
      obj.remarks = self.refs.remarksText.value;
      

      obj.amount_due = self.refs.amountDueText.value
      obj.fine_due = self.refs.fineDueText.value
      obj.fine_recevied = self.refs.finePaidText.value
      obj.fine_adjusted = self.refs.fineAdjustedText.value
      if($('#checkTable').is(":checked")){
      obj.tuition_fee_only = 'Y'  
    }else{
      obj.tuition_fee_only = 'N'
    }
      

      obj.fee_plan_id = self.student_plan_id
      obj.student_id = self.studentId

      /*console.log(obj)
      console.log("======Array======")
      return*/
      /*console.log(self.feeSlips);*/
      self.selectedfeeSlips = [];
      self.feeSlips.map(o=>{
        if(o.selected==true){
          var i = {}
          i.fee_slip_id = o.fee_slip_id 
          if(obj.tuition_fee_only == 'Y'){
            i.a_due = self.refs.feesPaidText.value
          }else{
            i.a_due = o.amount
          }
          i.fine_by_slip = o.fine        
          i.totalFineRemaining = 0
          self.selectedfeeSlips.push(i)
        }
      });
      obj.feeSlips = self.selectedfeeSlips
       /*console.log("======fee slips======")
      console.log(obj.feeSlips);*/
      
        self.loading = true
        feeReceivedStore.trigger('add_fees', obj)
    }

    //======read Banks ==========
    bankStore.on('read_bank_changed',ReadBankChanged)
    function ReadBankChanged(banks){
      console.log(banks) 
      self.banks = banks
      self.update()
      console.log(self.banks)
    }

    //====== read fines=========
    feeReceivedStore.on('read_fine_changed',ReadFineChanged)
    function ReadFineChanged(fines){
      self.fines = fines
      self.fine_type = self.fines[0].fine_type;
      self.fine_amount = self.fines[0].fine_amount;
      self.fine_grace_preiod = self.fines[0].fine_grace_preiod;
      console.log("fine amt"+ self.fine_amount)
      self.update()
    }


    feeReceivedStore.on('add_fees_changed',AddFeesChanged)
    function AddFeesChanged(){
      
      self.loading = false
      self.refs.feesDueText.value=''
      self.refs.scholorshipText.value=''
      self.refs.fineDueText.value=''
      self.refs.finePaidText.value=''
      self.refs.fineAdjustedText.value=''
      self.refs.amountDueText.value=''
      self.refs.remarksText.value=''
      self.refs.drawnOnText.value=''
      self.refs.itemNumberText.value=''
      self.refs.itemDate.value=''
      self.refs.itemDate.value=''
      self.payment_mode='Cash'
      self.getStudentDetail()
      
      self.update()
      
    }
    
   feeReceivedStore.on('read_student_changed',ReadStudentChanged)
    function ReadStudentChanged(students){
      console.log(students) 
      self.loading = false
      self.students = []
      if(students.length>0){
      self.students = students
      self.enroll_number = self.students[0].enroll_number;
      self.student_name = self.students[0].student_name;
      self.standard = self.students[0].standard;
      self.f_name = self.students[0].f_name;
      self.m_name = self.students[0].m_name;
      self.studentId = self.students[0].student_id;
      
      
      self.readPlanBYEnrollNumber()
      self.readFeeSlipBYEnrollNumber()
    }else{
      toastr.info("Invalid Enrol Number")
      self.enroll_number =''
      self.student_name = ''
      self.standard = ''
      self.f_name = ''
      self.m_name = ''
      self.studentId = ''
      self.feeSlips = []
    }
    self.update()
    }

    feeReceivedStore.on('read_student_by_receipt_no_changed',ReadStudentReceiptNoChanged)
    function ReadStudentReceiptNoChanged(students){
      console.log(students) 
      self.students = []
      self.students = students
      self.enroll_number = self.students[0].enroll_number;
      self.student_name = self.students[0].student_name;
      self.standard = self.students[0].standard;
      self.f_name = self.students[0].f_name;
      self.m_name = self.students[0].m_name;
      self.studentId = self.students[0].student_id;

      self.update()
      self.refs.enrolNumberText.value = self.enroll_number
      self.readPlanBYEnrollNumber()
      self.readFeeSlipBYEnrollNumber()
      //console.log(self.students)
    }

    feeReceivedStore.on('read_transaction_changed',ReadTransactionChanged)
    function ReadTransactionChanged(transactions){
      
      self.transactions = []
      self.transactions = transactions
      console.log("------read transacrions----")
      console.log(self.transactions)
      //self.fees_view = 'PaidFeeSlips'
      if(length.transactions>0){
        console.log("transactions");
      }
     self.update()
     self.PaidFeeSlips = true
     self.DueFeeSlips = false

      console.log(self.students)
    }
    feeReceivedStore.on('read_slip_head_changed',ReadSlipHeadChanged)
    function ReadSlipHeadChanged(feeSlipHeads){
      self.feeSlipHeads = []
      self.feeSlipHeads = feeSlipHeads
      self.FeeSlipHead =true;
      self.update()
    }
    
  


    
    feeReceivedStore.on('read_fee_plan_changed',ReadFeePlanChanged)
    function ReadFeePlanChanged(fee_plans){
      console.log(fee_plans) 
      self.student_plan = ''
      self.fee_plans = []
      self.fee_plans = fee_plans
      console.log("fee_plans")
      self.student_plan = self.fee_plans[0].fee_plan_name
      self.student_plan_id = self.fee_plans[0].fee_plan_id
      console.log(self.fee_plans)
      self.update()
    }
    feeReceivedStore.on('read_feeslip_changed',ReadFeeSlipChanged)
    function ReadFeeSlipChanged(feeSlips){
      console.log(feeSlips) 
      self.feeSlips = []
      self.feeSlips = feeSlips


      self.feeSlips.map(c => {
          c.selected=false
      })
      console.log("fee_slips")
      console.log(self.feeSlips)
      self.update()
     
    }
    
    
    feeReceivedStore.on('delete_transaction_changed',DeleteTransactionChanged)
    function DeleteTransactionChanged(transactions){
      console.log(transactions) 
      self.transactions = transactions
      self.loading = false
      self.update()
    }

    feeReceivedStore.on('read_standard_changed',StandardChanged)
    function StandardChanged(standards){
      console.log(standards) 
      self.standards = standards
      self.update()
    }

    feeReceivedStore.on('read_section_changed',SectionChanged)
    function SectionChanged(sections){
      console.log(sections) 
      self.sections = sections
      self.update()
      self.getSection()
    }
    feeReceivedStore.on('read_student_list_changed',StudentListChanged)
    function StudentListChanged(students){
      self.studentList = students
      self.FeeSlipHead = false;
      self.update()
    }
    
  </script>
</receive-fees>