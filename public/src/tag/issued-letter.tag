<issued-letter>
<header></header> 
<loading-bar if={loading}></loading-bar>
	<section class=" is-fluid" >
		<div class="box no-print">
			<div class="columns">
				<div class="column is-narrow">
					<label class="label">Month</label>
				</div>
				<div class="column is-narrow">
					<div class="control">
						<div class="select">
							<select ref="monthList" id="monthList">
								<option value="1">January</option>
								<option value="2">February</option>
								<option value="3">March</option>
								<option value="4">April</option>
								<option value="5">May</option>
								<option value="6">June</option>
								<option value="7">July</option>
								<option value="8">August</option>
								<option value="9">September</option>
								<option value="10">October</option>
								<option value="11">November</option>
								<option value="12">December</option>

							</select>
						</div>
					</div>
				</div>
				<div class="column">
					<button disabled={loading} class="button is-danger has-text-weight-bold"
					onclick={getLetterStudent} > GO
					</button>
					<button class="button is-primary has-text-weight-bold is-pulled-right" onclick="window.print()" title="Print">
                <span class="icon">
                   <i class="fas fa-print"></i>
               </span>
           </button>
				</div> 
			</div>
		</div>
  <p class="has-text-centered" style="color: #ff3860;font-weight:bold">Issued Letter Report</p>
  <p class="has-text-centered">Session: {sessionName}</p>
  <p class="has-text-centered">Month: {selecteMonth}</p>
    <table class="table is-fullwidth is-striped is-hoverable is-bordered" >
      <thead>
        <tr>
            <th class="slno">#</th>
            <th >Enrol No.</th>
            <th >Student's Name</th>
            <th >Class</th>
            <th >Issued Date</th>
            <th >Letter Key</th>
            <th >Letter</th>
            <th >Issued by</th>
        </tr>
        
      </thead>
      <tbody>
        <tr each={cd, i in letter_students}>
          <td>{i + 1}</td>
          <td>{cd.enroll_number}</td>
          <td>{cd.name}</td>
          <td>{cd.standard}</td>
          <td>{cd.issue_date}</td>
          <td>{cd.letter_key}</td>
          <td>{cd.letter_name}</td>
          <td>{cd.modified_by}</td>
        </tr>
      </tbody>
    </table>
</section>  
<script>
	var self = this
    self.on("mount", function(){
      self.role = getCookie('role')
       
      self.update()
      
    })
    self.on("unmount", function(){
      feesReportStore.off('read_fees_letter_changed',IssuedLetterChanged)
    })
    
 
    self.getLetterStudent = () =>{
      if(self.refs.monthList.value){
        self.loading = true
        feesReportStore.trigger('read_issued_fees_letter', self.refs.monthList.value)
      }else{
        toastr.info("Please select a month")
      }
    }
    
      
    feesReportStore.on('read_fees_letter_changed',IssuedLetterChanged)
    function IssuedLetterChanged(letter_students,session_name){
    	console.log("letter_students")
       self.letter_students = letter_students
       self.sessionName = session_name
       self.selectedMonth = $("#monthList option:selected").text() 
       self.loading = false
       self.update()
    }
    

</script>

 
</issued-letter>