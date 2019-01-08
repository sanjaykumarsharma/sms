<fees-scheme-unassigned>
<header></header> 
<loading-bar if={loading}></loading-bar>
<section class=" is-fluid">
	<p class="has-text-centered" style="color: #ff3860;font-weight:bold">Un-assigned Students</p>
  	<p class="has-text-centered">Session: {sessionName}</p>

		<table class="table is-fullwidth is-striped is-hoverable is-bordered" >
			<thead>
				<tr>
					<th class="slno">#</th>
				    <th>Enrol No.</th>
				    <th >Student's Name</th>
				    <th >Father's Name</th>
				    <th >Class</th>
				</tr>
			</thead>
			<tbody>
				<tr each={cd, i in students}>
					<td>{i + 1}</td>
					<td>{cd.enroll_number}</td>
					<td>{cd.name}</td>
					<td>{cd.f_name}</td>
					<td>{cd.standard}</td>
				</tr>
			</tbody>
		</table>
</section>

<script>
	var self = this
    self.on("mount", function(){
      self.getUnAssignedStudent()
      self.update();
    })

    self.on("unmount", function(){
      feesReportStore.off('read_no_scheme_changed',ReadNoSchemeChanged)
    })

    self.getUnAssignedStudent = () => {
        self.loading = true
        feesReportStore.trigger('read_no_scheme')

    }

    feesReportStore.on('read_no_scheme_changed',ReadNoSchemeChanged)
    function ReadNoSchemeChanged(students){
      //console.log(students) 
      self.students = []
      self.students = students
      self.loading = false
      self.update()
    }
</script> 

</fees-scheme-unassigned>