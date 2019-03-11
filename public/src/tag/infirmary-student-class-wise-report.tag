<infirmary-student-class-wise-report>
	<header></header>
  <loading-bar if={loading}></loading-bar>
	<section class=" is-fluid">
	<h2 class="title has-text-centered" style="color: #ff3860;">Class Wise Infirmary Graph<br>Grand Total : <span style="color:#000">{grand_total}</span> <br>
	 <span style="color:#000">{standard} {section}</span></h2>
	<div class="box no-print">
		<div class="columns">
			<div class="column is-narrow">
				<label class="label">Standard</label>
			</div>
			<div class="column is-narrow">
				<div class="control">
					<div class="select">
						<select ref="standard_id" id="standard_id" onchange={getReadSection} onkeyup={addEnter}>
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
						<select ref="section_id" id="section_id" onkeyup={addEnter}>
							<option each={readfilteredSections} value={section_id}>{section}
                            </option>
							<option value="-1">ALL</option>
						</select>
					</div>
				</div>
			</div>
			<div class="column">
				<button class="button is-danger has-text-weight-bold"
				onclick={getData} > GO
				</button>
           <button class="button is-success has-text-weight-bold is-small ml5 is-pulled-right" onclick={downloadCSV} title="Excel Down Load">
              <span class="icon">
                  <i class="far fa-file-excel"></i>
              </span>
           </button>

				<input type="checkbox" id="checkTable" checked={e.done}
				onclick={viewTable}  style="margin-top: 12px;"> Table

				 <button class="button is-primary has-text-weight-bold is-pulled-right is-small ml5" onclick="window.print()" title="Print">
                  <span class="icon">
                     <i class="fas fa-print"></i>
                 </span>
        </button>
			</div>
		</div>
	</div>
	<center>
		<div id="chart_div" style="width:1300px; height: 600px;" show={report_view =='show_graph'}></div>
	</center>

	<!-- <canvas id="canvas_pie" show={report_view =='show_graph'} style="margin-top:-30px"></canvas> -->
	<div class=" printOnly_t is-centered" >
		<table class="table is-striped is-hoverable is-bordered is-fullwidth">
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
	<div class="columns is-centered">
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
     // self.readSession()
      self.update();
    })

    self.on("unmount", function(){
      studentinfirmaryStore.on('read_class_wise_report_changed',ReadClassWiseReportChanged)
      studentStore.off('read_standard_changed',StandardChanged)
      studentStore.off('read_section_changed',SectionChanged)
      studentinfirmaryStore.off('csv_export_infirmary_class_wise_case_report_changed',csvInfirmaryClassWiseCaseReportChanged)
    })

    self.readStandard = () => {
       studentStore.trigger('read_standard')
    }

    self.readSection = () => {
       studentStore.trigger('read_section')
    }

    self.getReadSection = () => {
    	self.readfilteredSections = []
    	self.readfilteredSections = self.sections.filter(s => {
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
           self.standard = $("#standard_id option:selected").text();
           self.section= $("#section_id option:selected").text();
          studentinfirmaryStore.trigger('read_class_wise_report', self.refs.standard_id.value,self.refs.section_id.value)
          	self.report_view = 'show_graph'
    }

    self.downloadCSV = () =>{
      studentinfirmaryStore.trigger('csv_export_infirmary_class_wise_case_report', self.class_wise_case_report)
    }

    studentStore.on('read_standard_changed',StandardChanged)
    function StandardChanged(standards){
      console.log(standards) 
      self.standards = standards
      self.update()
    }

    studentStore.on('read_section_changed',SectionChanged)
    function SectionChanged(sections){
      console.log(sections) 
      self.sections = sections
      self.update()
    }


    studentinfirmaryStore.on('read_class_wise_report_changed',ReadClassWiseReportChanged)
    function ReadClassWiseReportChanged(class_wise_case_report,grand_total){
       self.loading=false
       self.class_wise_case_report=[]
       self.class_wise_case_report = class_wise_case_report
       self.grand_total = grand_total
       console.log(self.grand_total)

         var chartColors = ['#e3342f','#F6993F','#F2D024','#1F9D55','#2779BD','#9561E2','#B8C2CC','#eeefff','#e3342f','#F6993F','#F2D024','#1F9D55','#2779BD','#9561E2','#B8C2CC','#ffeeee','#e3342f','#F6993F','#F2D024','#1F9D55','#2779BD','#9561E2','#B8C2CC','#ffce'];

	    var chart_percentage = []
      	chart_percentage.push(['Head', 'Value', { role: 'style' }])
       	for (var i = self.class_wise_case_report.length - 1; i >= 0; i--) {
       		/*var p = 0
       		p = ((self.class_wise_case_report[i].total*100)/self.grand_total)
       		var avg = p.toFixed(2);
       		console.log(avg);*/
		   chart_percentage.push([self.class_wise_case_report[i].category_name,self.class_wise_case_report[i].total,chartColors[i]])
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
        				width: 1000,
        				height: 450,
        				/*bar: {groupWidth: "95%"},*/
        				legend: { position: "none" },
      			};
      			var chart = new google.visualization.ColumnChart(document.getElementById("chart_div"));
      			/*var chart_print = new google.visualization.ColumnChart(document.getElementById("chart_div_one"));*/
      			chart.draw(view, options);
      			/*chart_print.draw(view, options);*/
  			}

      self.update()
      console.log(self.class_wise_case_report)
    }

    studentinfirmaryStore.on('csv_export_infirmary_class_wise_case_report_changed',csvInfirmaryClassWiseCaseReportChanged)
    function csvInfirmaryClassWiseCaseReportChanged(url){
      var open_url = window.location.origin+url 
      window.open(open_url);
      self.loading = false
      self.update()
     }
</script>
</infirmary-student-class-wise-report>