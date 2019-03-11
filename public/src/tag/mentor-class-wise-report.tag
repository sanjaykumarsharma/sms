<mentor-class-wise-report>
	<print-header></print-header>
	<loading-bar if={loading}></loading-bar>
	<section class=" is-fluid">
    <h2 class="title has-text-centered is-size-6" style="color: #ff3860;margin-bottom: 40px;">Class Wise Mentor Report 
    	<br>(Grand Total: {grand_total})<br>{Standard} {Section}</h2>
	
	<div class="box no-print">
		<div class="columns">
			<div class="column is-narrow">
				<label class="label">Standard</label>
			</div>
			<div class="column is-narrow">
				<div class="control">
					<div class="select">
						<select ref="standard_id" id="standard" onchange={getSection}>
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
						<select ref="section_id" id="section">
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
				onclick={viewTable}  style="margin-top: 12px;"> <b>Table</b>
				
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

	<!-- <canvas id="canvas_bar" width="50" height="50" show={report_view =='show_graph'}></canvas> -->
	<center>
		<div  id="chart_div" show={report_view =='show_graph'} style="width: 900px; height: 500px;"></div>
	</center>

	<!-- <center>
		<div class="printOnly" id="chart_div_one" style="width: 900px; height: 500px; margin-top:100px;"></div>
	</center> -->

	<div class="printOnly">
		<div class="columns is-centered">
			<table class="table is-striped is-hoverable is-bordered" style="margin-top:50px;width:50%;">
				<thead>
					<tr>
					    <th>Category Name</th>
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
	</div>

	<div class="columns is-centered no-print">
		<table class="table is-striped is-hoverable is-bordered" style="width:50%;" show={report_view =='show_table'}>
			<thead>
				<tr>
				    <th>Category Name</th>
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
      mentorReportStore.off('read_class_wise_report_changed',ReadClassWiseReportChanged)
      mentorReportStore.off('read_standard_changed',StandardChanged)
      mentorReportStore.off('read_section_changed',SectionChanged)
      mentorReportStore.off('read_session_changed',SessionChanged)
      mentorReportStore.off('csv_class_wise_report_changed',csvMentorClassWiseReportChanged)
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
        mentorReportStore.trigger('csv_class_wise_report', self.class_wise_case_report)
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
 
      self.Standard = $("#standard option:selected").text();
      self.Section = $("#section option:selected").text();

      var chartColors = ['#e3342f','#F6993F','#F2D024','#1F9D55','#2779BD','#9561E2','#B8C2CC','#e3342f','#F6993F','#F2D024','#1F9D55','#2779BD','#9561E2','#B8C2CC','#e3342f','#F6993F','#F2D024','#1F9D55','#2779BD','#9561E2','#B8C2CC'];

	    var chart_percentage = []
      	chart_percentage.push(['Head', 'Value', { role: 'style' }])
       	for (var i = self.class_wise_case_report.length - 1; i >= 0; i--) {
       		var p = 0
       		p = Number(((self.class_wise_case_report[i].total*100)/self.grand_total).toFixed(2))
       		
       		console.log(p);
		   chart_percentage.push([self.class_wise_case_report[i].category_name,p,chartColors[i]])
		}
      	google.charts.load("current", {packages:['corechart']});
    	google.charts.setOnLoadCallback(drawChart);
    		function drawChart() {
      			var data = google.visualization.arrayToDataTable(chart_percentage);
      			var view = new google.visualization.DataView(data);
      			view.setColumns([0, 1,
                       	{ calc: "stringify",
                          sourceColumn: 1,
                          type: "string",
                          role: "annotation" },2
                ]);
      			var options = {
        				width: 600,
        				height: 400,
        				/*bar: {groupWidth: "95%"},*/
        				legend: { position: "none" },
        				vAxis: {
			             minValue: 0,
			             maxValue: 100,
			             format: '#\'%\''
			            }
      			};
      			var chart = new google.visualization.ColumnChart(document.getElementById("chart_div"));
      			//var chart_print = new google.visualization.ColumnChart(document.getElementById("chart_div_one"));
      			chart.draw(view, options);
      			//chart_print.draw(view, options);
  			}
      	self.update()
    }

    mentorReportStore.on('csv_class_wise_report_changed',csvMentorClassWiseReportChanged)
    function csvMentorClassWiseReportChanged(url){
      var open_url = window.location.origin+url 
      window.open(open_url);
      self.loading = false
      self.update()
     }
</script>
</mentor-class-wise-report>