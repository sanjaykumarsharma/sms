<discipline-class-wise-report>
	<print-header></print-header>
	<loading-bar if={loading}></loading-bar>
	<section class=" is-fluid">
	<h2 class="title has-text-centered is-size-6" style="color: #ff3860;">Class Wise discipline Report
	<br>Grand Total:{grand_total} <br>{standard_name} {section_name}</h2>
	
	<div class="box no-print">
		<div class="columns">
			<div class="column is-narrow">
				<label class="label">Standard</label>
			</div>
			<div class="column is-narrow">
				<div class="control">
					<div class="select">
						<select ref="standard_id" onchange={getSection} id="Standard">
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
						<select ref="section_id" id="Section">
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
	<!-- <canvas id="canvas_pie" show={report_view =='show_graph'}></canvas> -->
	<center>
		<div  id="chart_div" show={report_view =='show_graph'} style="width: 900px; height: 500px;"></div>
	</center>

	<div class="printOnly" >
		<div class="columns is-centered">
			<table class="table is-striped is-hoverable is-bordered" style="margin-top:50px; width:50%;">
				
				<thead>
					<tr>
					    <th>Category</th>
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

	<div class="columns is-centered no-print" >
		<table class="table is-striped is-hoverable is-bordered" style="width:50%;" show={report_view =='show_table'}>
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
</section>

<script>
	var self = this
    self.on("mount", function(){
      flatpickr(".date", {
    	/*altInput: true,*/
    	allowInput: true,
    	altFormat: "d/m/Y",
    	dateFormat: "Y-m-d",
  		})
      self.readStandard()
      self.readSection()
      self.readSession()
      self.update();
    })

    self.on("unmount", function(){
      disciplineReportStore.on('read_class_wise_report_changed',ReadClassWiseReportChanged)
      disciplineReportStore.off('read_standard_changed',StandardChanged)
      disciplineReportStore.off('read_section_changed',SectionChanged)
      disciplineReportStore.off('read_session_changed',SessionChanged)
    })

    self.readStandard = () => {
       disciplineReportStore.trigger('read_standard')
    }

    self.readSection = () => {
       disciplineReportStore.trigger('read_section')
    }

    self.readSession = () => {
       disciplineReportStore.trigger('read_session')
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
        disciplineReportStore.trigger('read_class_wise_report', self.refs.standard_id.value,
          	self.refs.section_id.value,self.refs.session_id.value)
          	self.report_view = 'show_graph'
    }

    self.csvExport = () => {

        disciplineReportStore.trigger('csv_export_read_class_wise_report', self.refs.standard_id.value,
          	self.refs.section_id.value,self.refs.session_id.value)

        }
    

    disciplineReportStore.on('read_standard_changed',StandardChanged)
    function StandardChanged(standards){
      console.log(standards) 
      self.standards = standards
      self.update()
    }

    disciplineReportStore.on('read_section_changed',SectionChanged)
    function SectionChanged(sections){
      console.log(sections) 
      self.sections = sections
      self.update()
    }

    disciplineReportStore.on('read_session_changed',SessionChanged)
    function SessionChanged(sessions){
      console.log(sessions) 
      self.sessions = sessions
      self.update()
    }

    disciplineReportStore.on('read_class_wise_report_changed',ReadClassWiseReportChanged)
    function ReadClassWiseReportChanged(class_wise_case_report,grand_total){
      self.class_wise_case_report = class_wise_case_report
      self.loading = false
      self.grand_total = grand_total
	  self.standard_name = $("#Standard option:selected").text();
	  self.section_name = $("#Section option:selected").text();

      	if(self.class_wise_case_report.length==0){
	      	toastr.info("No Data Found")
	    }
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
      			chart.draw(view, options);
  			}
  		
      		self.update()
      		//self.update()
      		console.log(self.class_wise_case_report)
    }
</script>
</discipline-class-wise-report>