<issued-letter>

	<section class=" is-fluid" >
		<h2 class="title has-text-centered" style="color: #ff3860;">Issued Letter Report</h2>
		<div class="box">
			<div class="columns">
				<div class="column is-narrow">
					<label class="label">Month</label>
				</div>
				<div class="column is-narrow">
					<div class="control">
						<div class="select">
							<select ref="monthList">
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
					<button class="button is-danger has-text-weight-bold"
					onclick={getLetterStudent} > GO
					</button>
					
				</div> 
			</div>
		</div>
  <div class="columns is-full">
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
  </div>
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
      self.loading = true
      feesReportStore.trigger('read_issued_fees_letter', self.refs.monthList.value)
    }
    
      
    feesReportStore.on('read_fees_letter_changed',IssuedLetterChanged)
    function IssuedLetterChanged(letter_students){
    	console.log("letter_students")
       self.letter_students = letter_students
       self.update()
    }
    

</script>

 
</issued-letter>