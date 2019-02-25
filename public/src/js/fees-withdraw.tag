<fees-withdraw>
<loading-bar if={loading}></loading-bar> 
<section class="is-fluid" >
	<h2 class="title has-text-centered" style="color: #ff3860;">Activate / Inactivate Fee Slip</h2>
    <div class="columns is-multiline is-mobile">
    	<div class="column">
	      	<div class="box">
	        	<div class="columns">
		            <div class="column is-narrow">
		            	<div class="control">
		                	<input class=" input" ref="enrolNumberText" type="text" placeholder="Enrol Number">
		              	</div>
		            </div>
	            	<div class="column">
	              		<button class="button is-danger" onclick={getStudentDetail}>Go</button>
	            	</div>
	          	</div>
	          	<div class="columns">
	            	<div class="column ">
	              		<img id="student_image" width="90" height="90">

	              		<p class="label">Name: {student_name}</p>
	              		<p class="label">Class: {standard}</p>
	            	</div>
	          	</div>
	        </div>
    	</div>
        <div class="column">
	        <div class="box">
	        	<h4 class="title has-text-centered" style="color: #ff3860;">Active Fee slip</h4>
	          	<table class="table is-fullwidth is-striped is-hoverable">
		            <thead>
		              <tr>
		                <th>SL No.</th>
		                <th>Fee Slips</th>
		                <th>Amount</th>
		                <th></th>
		              </tr>
		            </thead>
		            <tbody>
		              <tr each={c, i in activeFeeSlips}>
		              	<td>{ i+1}</td>
		                <td>{c.fee_slip_name}</td>
		                <td>{c.amount}</td>
		                <td class="has-text-right">
		                  <a class="button is-small" onclick={activeFees.bind(this,c.fee_slip_id)}>
		                  	<span class="fas fa-angle-double-right"></span>
		                  </a>
		                </td>
		              </tr>
		            </tbody>
	          	</table>
	        </div>
    	</div>

        <div class="column">
			<div class="box">
			   <h4 class="title has-text-centered" style="color: #ff3860;">InActive Fee slip</h4>
	           <table class="table is-fullwidth is-striped is-hoverable">
	            <thead>
	              <tr>
	                <th>SL No.</th>
	                <th>Fee Slips</th>
	                <th>Amount</th>
	                <th></th>
	              </tr>
	            </thead>
	            <tbody>
	              <tr each={c, i in removefeeSlips}>
	              	<td>{ i+1}</td>
	                <td>{c.fee_slip_name}</td>
	                <td>{c.amount}</td>
	                <td class="has-text-right">
	                  <a class="button is-small" onclick={removeFees.bind(this,c.fee_slip_id)}>
	                  	<span class="fas fa-angle-double-left"></span>
	                  </a>
	                </td>
	              </tr>
	            </tbody>
	          </table>
	        </div>
    	</div>
	</div>
</section>
<script>
var self = this
    self.on("mount", function(){
      self.role = getCookie('role')
      self.loading = false
      self.update()
    })
    self.on("unmount", function(){
      feeWithdrawStore.off('read_student_changed',ReadStudentChanged)
      feeWithdrawStore.off('read_feeslip_changed',ReadFeeSlipChanged)
      feeWithdrawStore.off('active_fees_changed',ActiveFeeSlipChanged)
      
    })

	self.getStudentDetail = () =>{
      var enrol = self.refs.enrolNumberText.value 
      if(enrol.length==0){
        toastr.info("Please enter an enrol numbar")
        return
      }else if(enrol.length<8){
        toastr.info("Please enter an valid enrol numbar")
        return
      }else{
      	self.loading = true
        feeWithdrawStore.trigger('read_student', self.refs.enrolNumberText.value)
      }
    }
    //======= read Slip by Enroll Number =====
    self.readFeeSlipBYEnrollNumber = () =>{
    	self.loading = true
      	feeWithdrawStore.trigger('read_fee_slip', self.studentId)
    }

    self.activeFees = (c,st) =>{
	    self.fee_slip_id = c
	    console.log(self.studentId)
	    console.log(self.fee_slip_id)
	    feeWithdrawStore.trigger('active_fees', self.fee_slip_id, self.studentId)
    }
    self.removeFees = (c,st) =>{
	    self.fee_slip_id = c
	    console.log(self.studentId)
	    console.log(self.fee_slip_id)
	    feeWithdrawStore.trigger('active_fees', self.fee_slip_id, self.studentId)
    }

    feeWithdrawStore.on('read_student_changed',ReadStudentChanged)
    function ReadStudentChanged(students,session_id){
    	console.log("student id ="+ session_id)
      console.log(students) 
      self.students = []
      self.students = students
      self.enroll_number = self.students[0].enroll_number;
      self.student_name = self.students[0].student_name;
      self.standard = self.students[0].standard;
      self.studentId = self.students[0].student_id;
      self.last_fee_slip_id = self.students[0].last_fee_slip_id;
      self.session_id = session_id
      self.loading = false
      document.getElementById('student_image').src = '/images/'+self.session_id+'/studentImages/'+self.studentId+'.jpg';
      self.update()
      self.readFeeSlipBYEnrollNumber()
      //console.log(self.students)
    }
    feeWithdrawStore.on('read_feeslip_changed',ReadFeeSlipChanged)
    function ReadFeeSlipChanged(feeSlips){
      console.log(feeSlips) 
      self.feeSlips = []
      self.feeSlips = feeSlips
      self.last_month_id = self.last_fee_slip_id
      self.loading = false
      self.activeFeeSlips = Array()
      self.removefeeSlips = Array()

      if (self.last_fee_slip_id == 0) {
      	self.feeSlips.map(c => {
      		var obj = {}
			self.activeFeeSlips.push(c);
          
      		})
		}else if (self.last_fee_slip_id != 0){
			self.feeSlips.map(c => {
      		var obj = {}
			if(c.fee_slip_id <= self.last_month_id){
				self.activeFeeSlips.push(c)
			}else if (c.fee_slip_id > self.last_month_id) {
				self.removefeeSlips.push(c)
			}
          
      	 })
		}
		self.update()
    }
    feeWithdrawStore.on('active_fees_changed',ActiveFeeSlipChanged)
    function ActiveFeeSlipChanged(){
      self.getStudentDetail()

    }
</script>
</fees-withdraw>