<scholarship>
	<section class="container is-fluid" show={scholar_ship_view =='scholarStudent'}>
		<div class="level">
			<div class="level-left">
				<h2 class="title" style="color: #ff3860;">Scholarship Assigned Students</h2>
			</div>
			<div class="level-right">
				<button class="button is-warning is-rounded" onclick={assign_scholar_ship}>
				<span class="icon">
					<span class="fas fa-plus"></span>
				</span>
				<span>Add/Update</span>
				</button>
			</div>
		</div>
	<table class="table is-fullwidth is-striped is-hoverable">
		<thead>
			<tr>
				<th>SL</th>
				<th>Enrol No.</th>
				<th>Standard</th>
				<th>Student</th>
				<th>Fee Slip</th>
				<th>Scholarship</th>
				<th>Scholarship</th>
				<th>Remarks</th>
			</tr>
		</thead>
		<tbody>
			<tr each={s, i in ScholarStudents}>

				<td>{ i+1 }</td>
				<td>{ s.enroll_number}</td>
				<td>{ s.standard}</td>
				<td>{ s.student_name}</td>
				<td>{ s.student_name}</td>
				<td>{ s.fee_slip_name}</td>
				<td>{ s.scholorship_amount}</td>
				<td>{ s.scholorship_remarks}</td>          	
			</tr>
		</tbody>
	</table>
	
</section>
<!-- ========== Assign Scholarship ============== -->
  <section class="container is-fluid" show={scholar_ship_view =='scholarshipAdd'}>
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <h2 class="title" style="color: #ff3860;">Add/Edit Scholarship</h2>
        </div>
      </div>
      <div class="level-right">
        <a class="button" onclick={close_scholarship_view}>Back</a>
      </div>
    </div>
    <div class="columns">
      <div class ="column box is-one-quarter is-multiline">
        <div class="column is-narrow">
          <div class="control">
            <input class=" input"
              ref="enrolNumberText" type="text" placeholder="Enrol Number">
          </div>
        </div>
        <div class="column">
          <div class="select is-fullwidth">
            <select ref="scholarshipType">
              <option value="amount">Amount</option>
              <option value="percentage">Percentage</option>
            </select>
          </div>
        </div>
        
        <div class="column">
          <input class=" input" ref="amountText" type="number" placeholder="Amount">
        </div>
        <div class="column">
          <button class="button is-danger" onclick={getStudentDetail}>Go</button>
        </div>
        <div class="column">
            <div class="pp-box">
              <img src="https://bulma.io/images/placeholders/128x128.png">
            </div>
        </div>
            
        <div class="control">
          <div class="column">
            <p class="title">{student_name}</p>
            <p class="title">{standard}</p>
          </div>
        </div>
      </div>
      <div class="column is-three-quarter">
        <table class="table is-fullwidth is-striped is-hoverable">
              <thead>
                <tr>
                  <th width="50">#</th>
                  <th>Fee Slip Name</th>
                  <th class="has-text-right" style="width:100px">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr each={r, i in slips}>
                  <td>{i + 1}</td>
                  <td>{r.fee_slip_name}</td>
                  <td class="has-text-right"><input class="input" id="head_amount{r.fee_slip_id}" type="text" value="{r.amount}" onkeyup={getTotal}></td>
                </tr>
              </tbody>
              <thead>
                <tr>
                  <th class="has-text-right" colspan="2">Total</th>
                  <th>{grandTotal}</th>
                </tr>
              </thead>
            </table>
                <div class="column is-full">
        <input class=" input" ref="remarksText" type="text" placeholder="Remarks">
      </div>
      <div class="column is-full">
        <button class="button is-danger" style="float:right" onclick={submitScholarship}>Submit</button>
      </div>
      </div>
    </div>
</section>
 <script>
 var self = this
    self.on("mount", function(){
      self.role = getCookie('role')
      self.scholar_ship_view ='scholarStudent'
      self.update()
      self.readScholarStudent()
    })
    self.on("unmount", function(){
      scholarshipStore.off('read_scholar_student_changed', ReadScholarStudentChanged)
      scholarshipStore.off('read_student_changed', ReadStudentChanged)
      scholarshipStore.off('read_scholar_feeslip_changed', ReadScholarFeeSlipChanged)
      scholarshipStore.off('add_scholarship_head_changed', AddScholarshipHeadChanged)
      //bankStore.off('add_bank_changed',AddBankChanged)
    })
    //read student
    self.getStudentDetail = () =>{
      console.log('get')
      scholarshipStore.trigger('read_student', self.refs.enrolNumberText.value)
    }
    // read scholarship by fee slip
    self.getScholarshipByStudent = ()=>{
      scholarshipStore.trigger('read_scholarship_slip', self.studentId)
      //readScholorshipFeeSlips
    }
    //read events
    self.readScholarStudent = () => {
       scholarshipStore.trigger('read_scholar_student')
    }
    self.close_scholarship_view = () =>{
    	self.scholar_ship_view ='scholarStudent'
    }
    self.assign_scholar_ship = () =>{
    	self.scholar_ship_view ='scholarshipAdd'
    }

    self.submitScholarship = () =>{
      var assigned_slips = []
      for(var i=0; i<self.slips.length; i++){
          var o ={}
          o.fee_slip_id = self.slips[i].fee_slip_id; 
          o.amount = self.slips[i].amount; 
          if(Number(self.slips[i].amount)>0){
          assigned_slips.push(o);
        }
      }
      /*console.log("assigned slips");
      console.log(assigned_slips);*/
      
        var obj = {}
        obj['scholorship_remarks'] = self.refs.remarksText.value  
        obj['student_id'] = self.studentId
        obj['fee'] = assigned_slips
        self.loading = true
        scholarshipStore.trigger('add_scholarship_amount', obj)
    }

   scholarshipStore.on('read_scholar_student_changed',ReadScholarStudentChanged)
    function ReadScholarStudentChanged(students){
      console.log(students) 
      self.ScholarStudents = students
      self.update()
      console.log(self.students)
    }

    scholarshipStore.on('add_scholarship_head_changed',AddScholarshipHeadChanged)
    function AddScholarshipHeadChanged(scholarships){
      console.log("under scholarship changed") 
      self.loading = false
      
      self.update()
      
    }
    
   scholarshipStore.on('read_student_changed',ReadStudentChanged)
    function ReadStudentChanged(scholarStudent){
      console.log(scholarStudent) 
      self.student = []
      self.student = scholarStudent
      self.student_name = self.student[0].student_name;
      self.standard = self.student[0].standard;
      self.studentId = self.student[0].student_id;
      self.update()
      self.getScholarshipByStudent()
      console.log(self.scholarStudent)
    }
    scholarshipStore.on('read_scholar_feeslip_changed',ReadScholarFeeSlipChanged)
    function ReadScholarFeeSlipChanged(scholarSlips){
      console.log(scholarSlips) 
      self.scholarSlips = []
      self.scholarSlips = scholarSlips
      self.slips= []
      for(var i=0; i<scholarSlips.length; i++){
        
        var obj = {};
        obj.fee_slip_id = scholarSlips[i].fee_slip_id;
        obj.fee_slip_name = scholarSlips[i].fee_slip_name;
        obj.scholorship_remarks = scholarSlips[i].scholorship_remarks;
          // for given scholarship amount
        if(self.refs.scholarshipType.value=='amount'){
          if(scholarSlips[i].scholorship_amount !=null){
            obj.amount = scholarSlips[i].scholorship_amount; 
          }else if (scholarSlips[i].scholorship_amount == null){
                obj.amount = self.refs.amountText.value;
          } 
          if (scholarSlips[i].scholorship_amount == null && i==11 && self.refs.amountText.value!=""){
             obj.amount = 2*Number(self.refs.amountText.value);
          }
          // for given scholarship percentage
        }else if (self.refs.scholarshipType.value == 'percentage') { 
          if(scholarSlips[i].scholorship_amount !=null){
            obj.amount = scholarSlips[i].scholorship_amount; 
          }else if (scholarSlips[i].scholorship_amount == null) {
            if (self.refs.amountText.value == ""){
              obj.amount = scholarSlips[i].total_amount;
            }else  
            obj.amount =( scholarSlips[i].total_amount * (Number(self.refs.amountText.value) * 0.01));
          } 
        }  
            self.slips.push(obj);
      }
      /*console.log("--------slips--------")
      console.log(self.slips)
      console.log("--------slips--------")*/
      self.update()
      console.log(self.scholarSlips)
    }
    
    

   /* bankStore.on('add_bank_changed',AddBankChanged)
    function AddBankChanged(banks){
      console.log(banks) 
      self.title='Create'
      self.loading = false
      self.banks = banks
      self.update()
      console.log(self.banks)
    }*/
    
  </script>
</scholarship>