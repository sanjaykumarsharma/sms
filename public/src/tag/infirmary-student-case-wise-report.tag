<infirmary-student-case-wise-report>
  <header></header>
  <loading-bar if={loading}></loading-bar>
	<section class=" is-fluid">
	<h2 class="title has-text-centered" style="color: #ff3860;">Student Category wise Infirmary Graph<br>Grand Total : <span style="color:#000">{grand_total}</span>
	</h2>
	
	<div class="box no-print">
		<div class="columns">
			<div class="column is-narrow">
				<label class="label">From Date</label>
			</div>
			<div class="column is-narrow">
				<input class="date input flatpickr-input form-control input" placeholder="" ref="start_date" tabindex="0" type="text" onkeyup={addEnter} readonly="readonly">
			</div>
			<div class="column is-narrow">
				<label class="label">To Date</label>
			</div>
			<div class="column is-narrow">
				<input class="date input flatpickr-input form-control input" placeholder="" ref="end_date" tabindex="0" type="text" onkeyup={addEnter} readonly="readonly">
			</div>
			<div class="column">
				<button class="button is-danger has-text-weight-bold"
				onclick={getData} > GO
				</button>
				<input type="checkbox" id="checkTable" checked={e.done} 
				onclick={viewTable}  style="margin-top: 12px;"> Table
				 <button class="button is-primary has-text-weight-bold is-pulled-right" onclick="window.print()" title="Print">
                  <span class="icon">
                     <i class="fas fa-print"></i>
                 </span>
			</div>
		</div>
	</div>
<!-- 
	<canvas id="canvas_pie" show={report_view =='show_graph'} style="margin-top:-30px" class="is-centered"></canvas> -->
	<center>
		<div id="piechart" style="width: 900px; height: 450px;" show={report_view =='show_graph'}></div>
	</center>

		<div class=" printOnly_t is-centered" >
		<table class="table is-striped is-hoverable is-bordered is-fullwidth" style="margin-top:35px">
			<thead>
				<tr>
				    <th>Category</th>
				    <th class="has-text-right">Total</th>
				</tr>
			</thead>
			<tbody>
				<tr each={cd, i in case_wise_reports}>
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
		<table class="table is-striped is-hoverable is-bordered no-print" show={report_view =='show_table'}>
			<thead>
				<tr>
				    <th>Category</th>
				    <th class="has-text-right">Total</th>
				</tr>
			</thead>
			<tbody>
				<tr each={cd, i in case_wise_reports}>
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
      self.update();
    })

    self.on("unmount", function(){
      studentinfirmaryStore.off('read_case_wise_report_changed',ReadCaseChanged)
    })

    self.viewTable = () => {
    	if($('#checkTable').is(":checked")){
	        self.report_view = 'show_table'
    	}else{
	        self.report_view = 'show_graph'
    	}
    }
    self.getData = () => {
    	var obj={}
          obj['start_date']=self.refs.start_date.value
          obj['end_date']=self.refs.end_date.value
          self.loading = true
          studentinfirmaryStore.trigger('read_case_wise_report', obj)
          self.report_view = 'show_graph'
          console.log(obj)
    }

    studentinfirmaryStore.on('read_case_wise_report_changed',ReadCaseChanged)
    function ReadCaseChanged(case_wise_reports,grand_total){
      self.case_wise_reports = case_wise_reports
      self.grand_total = grand_total
      self.loading=false

      var chart_percentage = []
       chart_percentage.push(['Task', 'Hours per Day'])
       for (var i = self.case_wise_reports.length - 1; i >= 0; i--) {
		   chart_percentage.push([self.case_wise_reports[i].category_name,self.case_wise_reports[i].total])
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

     /* var chartColors = ['#e3342f','#F6993F','#F2D024','#1F9D55','#2779BD','#9561E2','#B8C2CC','#fdd', '#e6642f','#F6993F','#F2D038','#1F9D99','#1F9D55','#873600','#641E16','#0E6251'];

		var labels = []
		var chart_percentage = []
        var backgroundColor = []


		 for (var i = self.case_wise_reports.length - 1; i >= 0; i--) {
		 	var total_percentage = ((self.case_wise_reports[i].total*100)/self.grand_total).toFixed(2);
		    var percentage = self.case_wise_reports[i].category_name + ' ( ' + self.case_wise_reports[i].total + ' , ' + total_percentage + '% )';

		    labels.push(percentage)
		    chart_percentage.push(self.case_wise_reports[i].total)
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
      console.log(self.case_wise_reports)
    }
</script>
</infirmary-student-case-wise-report>