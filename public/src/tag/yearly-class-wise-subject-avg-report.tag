<yearly-class-wise-subject-avg-report>
	<print-header></print-header>
	<loading-bar if={loading}></loading-bar>
	<section class=" is-fluid">
		<div class="box no-print">
			<div class="columns">
				<div class="column is-narrow">
					<label class="label">Class</label>
				</div>
				<div class="column is-narrow">
					<div class="control">
						<div class="select">
							<select ref="standard_id" id="standard_id" onchange={changeExamType}>
								<option>--Choose Class--</option>
								<option each={standards} value={standard_id}>{standard}</option>
							</select>
						</div>
					</div>
				</div>
				<div class="column is-narrow">
					<label class="label">Term</label>
				</div>
				<div class="column is-narrow">
					<div class="control">
						<div class="select">
							<select ref="term_id" id="term_id">
								<option value="F">Final</option>
								<option value="H">Half Yearly</option>
							</select>
						</div>
					</div>
				</div>
				<div class="column">
					<button class="button is-danger has-text-weight-bold" onclick={getYearWiseClassSubjectAvgReport}>GO</button>
				</div>
			</div>
		</div>

		<table class="table is-striped is-hoverable is-bordered is-fullwidth">
		<p><center><strong>Subject Wise Average Marks Report For Class:{ClassName}</strong></center></p>
		<p><span each={s, i in labels}>{s.exam_type} &nbsp;&nbsp;</span></p>
		</table>
		<div class="">
  			
  				<table class="table is-striped is-hoverable is-bordered is-fullwidth">
    				
    				<thead>
        				<tr>
         					<th>Subjects</th>
          					<th class="has-text-centered" each={s,i in sessions}>{s}</th>
        				</tr>
      				</thead>
      				<tbody>
        				<tr each={g,i in graphData}>
          					<td>{g.subject_name}</td>
         	 				  <td class="has-text-centered" each={s in g.sessions}>
                      {s}
                    </td>
        				</tr>
      				</tbody>
  				</table>
			</div>
  		
	</section>

<script>
	var self = this;
    self.on("mount", function(){
    	self.readStandard()
        self.update() 
    })
    self.on("unmount", function(){
      analysisReportStore.off('read_standard_changed',StandardChanged)
      analysisReportStore.off('read_year_wise_class_subject_avg_report_changed',YearWiseClassSubjectAvgReportChanged)
    })

    self.readStandard = () => {
       analysisReportStore.trigger('read_standard')
    }

    
    self.getYearWiseClassSubjectAvgReport = () =>{
    	
    	analysisReportStore.trigger('read_year_wise_class_subject_avg_report', self.refs.standard_id.value,self.refs.term_id.value)	
    }
    analysisReportStore.on('read_standard_changed',StandardChanged)
    function StandardChanged(standards){
      	self.standards = standards
      	self.update()
    }
    analysisReportStore.on('read_year_wise_class_subject_avg_report_changed',YearWiseClassSubjectAvgReportChanged)
    function YearWiseClassSubjectAvgReportChanged(sessions,subjects,graphData){
    	self.ClassName = $("#standard_id option:selected").text();
    	self.sessions = sessions
      	self.subjects = subjects
      	self.graphData = graphData
      	console.log(self.sessions)
      	console.log(self.subjects)
      	console.log(self.graphData)
      	self.update()
    }
  
</script>
</yearly-class-wise-subject-avg-report>