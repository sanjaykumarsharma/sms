<student-strength-report>
	<print-header></print-header> 
	 <loading-bar if={loading}></loading-bar>  
	<section class=" is-fluid">
		 <h4 class="title has-text-centered" style="color: #ff3860;">Student Strength School <br> ({grand_total})</h4>
	   <div class='box no-print'>
	   		<div class="columns">
			    <div class=" column">
				    <input type="checkbox" id="checkTable" checked={e.done}
				    onclick={viewTable}  style="margin-top: 12px;"> Table
				    <button class="button is-success has-text-weight-bold is-small ml5 is-pulled-right" onclick={downloadCSV} title="Excel Down Load">
		              <span class="icon">
		                  <i class="far fa-file-excel"></i>
		              </span>
		           </button>
			        <button class="button is-primary has-text-weight-bold is-pulled-right is-small ml5" onclick="window.print()" title="Print">
			          <span class="icon"> <i class="fas fa-print"></i></span>
			        </button>
			       <button class="button is-warning is-rounded is-pulled-right is-small ml5" onclick={readStudentStrengthReport} style="margin-left:5px;margin-right:5px">
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

	<!-- 	<canvas id="canvas_pie" show={report_view =='show_graph'} style="margin-lef5:-300px"></canvas> -->
		<table class="table is-fullwidth is-striped is-hoverable is-narrow printOnly_t"  show={report_view =='show_table'} style="margin-top:50px;margin-left:400px">
			<thead>
				<tr>
					<th>#</th>
					<th>Class</th>
					<th>Total</th>
				</tr>
			</thead>
			<tbody>
				<tr each={st, i in studentStrengthReports}>
					<td>{i+1}</td>
					<td>{st.standard}</td>
					<td>{st.total}</td>
					
				</tr>
			</tbody>
		</table>
	
		<table class="table is-fullwidth is-striped is-hoverable is-narrow no-print"  show={report_view =='show_table'}>
			<thead>
				<tr>
					<th>#</th>
					<th>Class</th>
					<th>Total</th>
				</tr>
			</thead>
			<tbody>
				<tr each={st, i in studentStrengthReports}>
					<td>{i+1}</td>
					<td>{st.standard}</td>
					<td>{st.total}</td>
					
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
    	self.role = getCookie('role') 
    	self.readStudentStrengthReport()	
        self.update()
        flatpickr(".date", {
	    	allowInput: true,
        	dateFormat: "d/m/Y",
  		})
    })

    self.on("unmount", function(){
      adminReportStore.off('read_student_strength_report_changed',ReadStudentStrengthReportChanged)
    })

    self.readStudentStrengthReport = () => {
    	self.loading=true
       adminReportStore.trigger('read_student_strength_report')
    }

     self.viewTable = () => {
    	if($('#checkTable').is(":checked")){
	        self.report_view = 'show_table'
    	}else{
	        self.report_view = 'show_graph'
    	}
    }
    
    adminReportStore.on('read_student_strength_report_changed',ReadStudentStrengthReportChanged)
    function ReadStudentStrengthReportChanged(studentStrengthReports,session_name){
      //console.log(studentStrengthReports) 
      self.title='Create'
      self.loading = false
      self.studentStrengthReports = studentStrengthReports
      self.grandTotal=0
      self.studentStrengthReports.map(d => {
          self.grand_total= Number(self.grandTotal) + Number(d.total)
      })
      self.session_name = session_name

      var chart_percentage = []
       chart_percentage.push(['Task', 'Hours per Day'])
       for (var i = self.studentStrengthReports.length - 1; i >= 0; i--) {
		   chart_percentage.push([self.studentStrengthReports[i].standard,self.studentStrengthReports[i].total])
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

         /*var chartColors = ['#e3342f','#efc8a2','#443902','#e6f2eb','#c9d7e2','#e7e1ef','#B8C2CC','#fdd', '#e6642f','#F6993F','#F2D038','#1F9D99','#2789BF','#9591E5','#B8C2DC','#fgg'];

		var labels = []
		var chart_percentage = []
        var backgroundColor = []


		 for (var i = self.studentStrengthReports.length - 1; i >= 0; i--) {
		 	var total_percentage = ((self.studentStrengthReports[i].total*100)/self.grand_total).toFixed(2);
		    var percentage = self.studentStrengthReports[i].standard + ' ( ' + self.studentStrengthReports[i].total + ' , ' + total_percentage + '% )';

		    labels.push(percentage)
		    chart_percentage.push(self.studentStrengthReports[i].total)
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

      //console.log(self.employeeTypes)
    }
    

    
</script>
</student-strength-report>