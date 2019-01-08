<mentor-class-wise-report>
	<header></header>
	<loading-bar if={loading}></loading-bar>
	<section class=" is-fluid">
    <h2 class="title has-text-centered is-size-5" style="color: #ff3860;margin-bottom: 6px;">Class Wise Mentor Report</h2>
    <h2 class="title has-text-centered is-size-5" style="color: #ff3860;">Grand Total: {grand_total}</h2>
	
	<div class="box no-print">
		<div class="columns">
			<div class="column is-narrow">
				<label class="label">Standard</label>
			</div>
			<div class="column is-narrow">
				<div class="control">
					<div class="select">
						<select ref="standard_id" onchange={getSection}>
							<option each={standards} value={standard_id}>{standard}
                            </option>
							<option value="-1">ALL</option>
						</select>
					</div>
				</div>
			</div>
			<div class="column is-narrow">
				<label class="label">Section</label>
			</div>
			<div class="column is-narrow">
				<div class="control">
					<div class="select">
						<select ref="section_id">
							<option each={filteredSections} value={section_id}>{section}
                            </option>
							<option value="-1">ALL</option>
						</select>
					</div>
				</div>
			</div>
			<div class="column is-narrow">
				<label class="label">Session</label>
			</div>
			<div class="column is-narrow">
				<div class="control">
					<div class="select">
						<select ref="session_id">
							<option each={sessions} value={session_id}>{session_name}
                            </option>
						</select>
					</div>
				</div>
			</div>
			<div class="column">
				<button class="button is-danger has-text-weight-bold"
				onclick={getData} > GO
				</button>
				<input type="checkbox" id="checkTable" checked={e.done}
				onclick={viewTable}  style="margin-top: 12px;"> Table
			</div>
			<div class="column">
				<button class="button is-success has-text-weight-bold ml5 is-pulled-right" onclick={csvExport}>
          			<span class="icon">
            			<i class="far fa-file-excel"></i>
			        </span>
			    </button>
			    <button class="button is-primary has-text-weight-bold is-pulled-right" onclick="window.print()">
          			<span class="icon">
            			<i class="fas fa-print"></i>
			        </span>
			    </button>
			</div>
		</div>
	</div>

	<canvas id="canvas_pie" show={report_view =='show_graph'}></canvas>

	<div class="printOnly">
		<table class="table is-striped is-hoverable is-bordered is-fullwidth" style="margin-top:50px;">
		<thead>
			<tr>
			    <th>Case</th>
			    <th class="has-text-right">Total</th>
			</tr>
		</thead>
		<tbody>
			<tr each={cd, i in class_wise_case_report}>
				<td>{cd.category_name}</td>
				<td class="has-text-right">{cd.total}</td>
			</tr>
			<tr>
				<td class="has-text-right">Total</td>
				<td class="has-text-right">{grand_total}</td>
			</tr>
		</tbody>
	</table>
	</div>

	<table class="table is-striped is-hoverable is-bordered is-fullwidth no-print" show={report_view =='show_table'}>
		<thead>
			<tr>
			    <th>Case</th>
			    <th class="has-text-right">Total</th>
			</tr>
		</thead>
		<tbody>
			<tr each={cd, i in class_wise_case_report}>
				<td>{cd.category_name}</td>
				<td class="has-text-right">{cd.total}</td>
			</tr>
			<tr>
				<td class="has-text-right">Total</td>
				<td class="has-text-right">{grand_total}</td>
			</tr>
		</tbody>
	</table>
</section>

<script>
	var self = this
    self.on("mount", function(){
      self.loading = false;
      self.readStandard()
      self.readSection()
      self.readSession()
      self.update();
    })

    self.on("unmount", function(){
      mentorReportStore.on('read_class_wise_report_changed',ReadClassWiseReportChanged)
      mentorReportStore.off('read_standard_changed',StandardChanged)
      mentorReportStore.off('read_section_changed',SectionChanged)
      mentorReportStore.off('read_session_changed',SessionChanged)
    })

    self.readStandard = () => {
       mentorReportStore.trigger('read_standard')
    }

    self.readSection = () => {
       mentorReportStore.trigger('read_section')
    }

    self.readSession = () => {
       mentorReportStore.trigger('read_session')
    }

    self.getSection = () => {
    	self.filteredSections = []
    	self.filteredSections = self.sections.filter(s => {
    		return s.standard_id == self.refs.standard_id.value
    	})
    }

    self.viewTable = () => {
    	if($('#checkTable').is(":checked")){
	        self.report_view = 'show_table'
    	}else{
	        self.report_view = 'show_graph'
    	}
    }
    self.getData = () => {
        self.loading = true
        mentorReportStore.trigger('read_class_wise_report', self.refs.standard_id.value,
        self.refs.section_id.value,self.refs.session_id.value)
        self.report_view = 'show_graph'
    }

    self.csvExport = () => {
        mentorReportStore.trigger('csv_class_wise_report', self.refs.standard_id.value,
        self.refs.section_id.value,self.refs.session_id.value)
    }

    mentorReportStore.on('read_standard_changed',StandardChanged)
    function StandardChanged(standards){
      console.log(standards) 
      self.standards = standards
      self.update()
    }

    mentorReportStore.on('read_section_changed',SectionChanged)
    function SectionChanged(sections){
      console.log(sections) 
      self.sections = sections
      self.update()
    }

    mentorReportStore.on('read_session_changed',SessionChanged)
    function SessionChanged(sessions){
      console.log(sessions) 
      self.sessions = sessions
      self.update()
    }

    mentorReportStore.on('read_class_wise_report_changed',ReadClassWiseReportChanged)
    function ReadClassWiseReportChanged(class_wise_case_report,grand_total){
      self.loading = false;
      self.class_wise_case_report = class_wise_case_report
      self.grand_total = grand_total

      var chartColors = ['#e3342f','#F6993F','#F2D024','#1F9D55','#2779BD','#9561E2','#B8C2CC','#fff'];

		var labels = []
		var chart_percentage = []
        var backgroundColor = []


		 for (var i = self.class_wise_case_report.length - 1; i >= 0; i--) {
		 	var total_percentage = ((self.class_wise_case_report[i].total*100)/self.grand_total).toFixed(2);
		    var percentage = self.class_wise_case_report[i].category_name + ' ( ' + self.class_wise_case_report[i].total + ' , ' + total_percentage + '% )';

		    labels.push(percentage)
		    chart_percentage.push(self.class_wise_case_report[i].total)
		    if(typeof chartColors[i] != "undefined"){
		    	backgroundColor.push(chartColors[i])
		    }

		 }

		  console.log(labels);
		  console.log(chart_percentage);

		  var config = {
		    type: 'pie',
		    data: {
		      datasets: [{
		        data: chart_percentage,
		        backgroundColor: backgroundColor,
		        label: 'labels'
		      }],
		      labels: labels
		    },
		    options: {
		      responsive: true
		    }
		  };

		  var ctx = document.getElementById('canvas_pie').getContext('2d');
		  window.myPie = new Chart(ctx, config);
      self.update()
      console.log(self.class_wise_case_report)
    }
</script>
</mentor-class-wise-report>