<occupation-report>
	<section class=" is-fluid">
		<div class="level">
			<div class="level-left">
				<h2 class="title" style="color: #ff3860;">Occupation Report</h2>
			</div>
		</div>
		<div class="box">
			<div class="columns">
				<div class="column is-narrow">
					<div class="control">
						<div class="select">
							<select ref="occupation" onchange={getOccupationReportData}>
								<option>Choose Occupation</option>
								<option each={parentOccupations} value={occupation}>{occupation}
	                            </option>
							</select>
						</div>
					</div>
				</div>
				<!-- <div class="column">
					<button class="button is-danger has-text-weight-bold"
					onclick={readStudentBrowserData} >GO
					</button>
				</div> -->
			</div>
		</div>
		<table class="table is-fullwidth is-striped is-hoverable is-narrow">
			<thead>
				<tr>
					<th>#</th>
					<th>Enroll No</th>
					<th>Class</th>
					<th>Student Name</th>
					<th>Relation</th>
					<th>Father/Mother/Guardian</th>
					<th>Mobile</th>
					<th>Email</th>
					<th>Address</th>
				</tr>
			</thead>
			<tbody>
				<tr each={st, i in occupationReports}>
					<td>{i+1}</td>
					<td>{st.enroll_number}</td>
					<td>{st.standard}</td>
					<td>{st.first_name} {st.middle_name} {st.last_name}</td>
					<td>{st.relation}</td>
					<td>{st.name}</td>
					<td>{st.mobile}</td>
					<td>{st.email}</td>
					<td>{st.add_line1} ,{st.add_line2}, {st.city}, {st.state}-{st.zip}, {st.country}</td>
					
				</tr>
			</tbody>
		</table>
	</section>
<!-- End Other Information -->
<script>
	
	var self = this
    self.on("mount", function(){
    	self.title='Add'
    	self.readOccupation()
    	self.role = getCookie('role') 
        self.update()
        flatpickr(".date", {
	    	allowInput: true,
        	dateFormat: "d/m/Y",
  		})
    })

    self.on("unmount", function(){
      studentSearchStore.off('read_occupation_changed',OccupationChanged)
      studentSearchStore.off('read_occupation_report_change',ReadOccupationReportChanged)
    })

    
	self.readOccupation = () => {
       studentSearchStore.trigger('read_occupation')
    }

    self.getOccupationReportData = () => {
       studentSearchStore.trigger('read_occupation_report',self.refs.occupation.value)
    }

    
   studentSearchStore.on('read_occupation_changed',OccupationChanged)
    function OccupationChanged(parentOccupations){
      console.log(parentOccupations) 
      self.parentOccupations = parentOccupations
      self.update()
    }

    studentSearchStore.on('read_occupation_report_change',ReadOccupationReportChanged)
    function ReadOccupationReportChanged(occupationReports){
      console.log(occupationReports) 
      self.occupationReports = occupationReports
      self.update()
    }
    
</script>
</occupation-report>