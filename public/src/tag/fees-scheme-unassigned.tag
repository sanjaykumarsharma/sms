<fees-scheme-unassigned>
<header></header> 
<loading-bar if={loading}></loading-bar>
<div class="level-right" >
  <button class="button is-success has-text-weight-bold  ml5" onclick={downloadCSV}>
        <span class="icon">
          <i class="far fa-file-excel"></i>
        </span>
      </button>
  <button class="button is-primary has-text-weight-bold ml5" onclick="window.print()" title="Print">
          <span class="icon">
             <i class="fas fa-print"></i>
         </span>
     </button>
</div>
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
      feesReportStore.off('csv_export_fees_scheme_unassigned_changed',schemeunassignedChanged)
    })

    self.downloadCSV = () => {
      feesReportStore.trigger('csv_scheme_unassigned',self.students)
    }

    feesReportStore.on('csv_export_fees_scheme_unassigned_changed',schemeunassignedChanged)
    function schemeunassignedChanged(url){
      var open_url = window.location.origin+url 
      window.open(open_url);
      self.loading = false
      self.update()
     }

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