<student-group-report>
	<print-header></print-header> 
	<loading-bar if={loading}></loading-bar>  
	<section class=" is-fluid">
		<h4 class="title has-text-centered" style="color: #ff3860;">Student Group Report <br> Grand Total ({grand_total})</h4>
		<div class="box no-print">
			<div class="columns">
				<div class="column is-narrow">
					<div class="control">
						<div class="select">
							<select ref="standard_id" onchange={getReadSection} onkeyup={addEnter}>
								<option>Choose Standard</option>
								<option value='-1'>All</option>
								<option each={standards} value={standard_id}>{standard}
	                            </option>
							</select>
						</div>
					</div>
				</div>
				<div class="column is-narrow">
					<div class="control">
			        	<div class="select is-fullwidth">
							<select ref="section_id" onkeyup={addEnter}>
								<option>Choose Section</option>
								<option value='-1'>All</option>
								<option each={readfilteredSections} value={section_id}>{section}
	                            </option>
							</select>
						</div>
			      	</div>
			    </div>
				<div class="column">
					<button class="button is-danger has-text-weight-bold"
					onclick={readStudentGroupReport} >GO
					</button>
					<input type="checkbox" id="checkTable" checked={e.done}
				    onclick={viewTable}  style="margin-top: 12px;"> Table
					
					<button class="button is-success has-text-weight-bold is-pulled-right is-small ml5" onclick={downloadCSV} title="Excel Down Load">
	                  <span class="icon">
	                      <i class="far fa-file-excel"></i>
	                  </span>
	                 </button>

			        <button class="button is-primary has-text-weight-bold is-pulled-right is-small ml5" onclick="window.print()" title="Print">
			          <span class="icon"> <i class="fas fa-print"></i></span>
			        </button>
				    <button class="button is-warning is-rounded is-pulled-right is-small ml5" onclick={readStudentGroupReport} style="margin-left:5px;margin-right:5px">
			        <span class="icon">
			          <span class="fas fa-sync-alt"></span>
			        </span>
			        </button>
				</div>
			</div>
		</div>
		<center>
		<div id="piechart" style="width: 900px; height: 450px;" show={report_view =='show_graph'}></div>
	    </center>

	    <table class="table is-fullwidth is-striped is-hoverable is-narrow printOnly_t" show={report_view =='show_table'} style="margin-left:400px">
			<thead>
				<tr>
					<th>#</th>
					<th>Student Group</th>
					<th>Strength</th>
				</tr>
			</thead>
			<tbody>
				<tr each={st, i in studentGroupReports}>
					<td>{i+1}</td>
					<td>{st.group_name}</td>
					<td>{st.total}</td>
				</tr>
				<tr>
					<th colspan="2">Total</th>
					<th>{grand_total}</th>
				</tr>
			</tbody>
		</table>

		<table class="table is-fullwidth is-striped is-hoverable is-narrow no-print" show={report_view =='show_table'} >
			<thead>
				<tr>
					<th>#</th>
					<th>Student Group</th>
					<th>Strength</th>
				</tr>
			</thead>
			<tbody>
				<tr each={st, i in studentGroupReports}>
					<td>{i+1}</td>
					<td>{st.group_name}</td>
					<td>{st.total}</td>
				</tr>
				<tr>
					<th colspan="2">Total</th>
					<th>{grand_total}</th>
				</tr>
			</tbody>
		</table>
	</section>
<!-- End Other Information -->
<script>
	
	var self = this
    self.on("mount", function(){
    	self.title='Add'
    	self.report_view='show_graph'
    	self.readStandard()
    	self.readSection()
    	self.role = getCookie('role') 
        self.update()
        flatpickr(".date", {
	    	allowInput: true,
        	dateFormat: "d/m/Y",
  		})
    })

    self.on("unmount", function(){
      studentStore.off('read_standard_changed',StandardChanged)
      studentStore.off('read_section_changed',SectionChanged)
      adminReportStore.off('read_student_group_report_change',ReadStudentGroupReportChanged)
      adminReportStore.off('csv_export_student_group_report_changed',csvStudentGroupReportChanged)
    })

    self.viewTable = () => {
    	if($('#checkTable').is(":checked")){
	        self.report_view = 'show_table'
    	}else{
	        self.report_view = 'show_graph'
    	}
    }

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
    self.downloadCSV = () =>{
      adminReportStore.trigger('csv_export_student_group_report', self.studentGroupReports)
    }
     self.addEnter = (e) => {
      if(e.which == 13){
        self.readStudentGroupReport()
      }
    }
    self.readStudentGroupReport = () => {
    	self.loading=true
       adminReportStore.trigger('read_student_group_report',self.refs.standard_id.value,self.refs.section_id.value)
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
      self.getReadSection()
    }
    adminReportStore.on('read_student_group_report_change',ReadStudentGroupReportChanged)
    function ReadStudentGroupReportChanged(studentGroupReports,grandTotal){
       console.log(grandTotal) 
      self.title='Create'
      self.loading = false
      self.studentGroupReports = studentGroupReports
      self.grand_total = grandTotal


      var chart_percentage = []
       chart_percentage.push(['Task', 'Hours per Day'])
       for (var i = self.studentGroupReports.length - 1; i >= 0; i--) {
		   chart_percentage.push([self.studentGroupReports[i].group_name,self.studentGroupReports[i].total])
		}

      google.charts.load("current", {packages:["corechart"]});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {

        var data = google.visualization.arrayToDataTable(chart_percentage);

        var options = {
          is3D: true,
          legend:{position: 'labeled',
                  textStyle: {bold: true} },
          pieSliceText: 'value'
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));
        chart.draw(data, options);
      }

    /* var chartColors = ['#e3342f','#F6993F','#F2D024','#1F9D55','#2779BD','#9561E2','#B8C2CC','#fff','#a6cc33','#33cccc','#cc33cc','#60759f','#c2d1f0','#2952a3'];

		var labels = []
		var chart_percentage = []
        var backgroundColor = []


		 for (var i = self.studentGroupReports.length - 1; i >= 0; i--) {
		 	var total_percentage = ((self.studentGroupReports[i].total*100)/self.grand_total).toFixed(2);
		    var percentage = self.studentGroupReports[i].group_name + ' ( ' + self.studentGroupReports[i].total + ' , ' + total_percentage + '% )';

		    labels.push(percentage)
		    chart_percentage.push(self.studentGroupReports[i].total)
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
		  window.myPie = new Chart(ctx, config);*/
	      self.update()
	      console.log(self.studentGroupReports)
	      //self.update()
    }
    adminReportStore.on('csv_export_student_group_report_changed',csvStudentGroupReportChanged)
    function csvStudentGroupReportChanged(url){
      var open_url = window.location.origin+url 
      window.open(open_url);
      self.loading = false
      self.update()
    }
    

    
</script>
</student-group-report>