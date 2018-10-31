<fees-scheme-unassigned>
<section class=" is-fluid">
	<h2 class="title has-text-centered" style="color: #ff3860;">Un-assigned Students</h2>
	<div class="flex items-center mt-2 mb-6 no-print">
		<div class="bg-green py-1 rounded w-10">
			<div class="bg-grey h-px flex-auto"></div>
		</div>
	</div>

	<div class="columns is-full">
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
	</div>
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
      self.update()
    }
</script> 

</fees-scheme-unassigned>