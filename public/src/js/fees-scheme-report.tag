<fees-scheme-report>
<print-header></print-header> 
<loading-bar if={loading}></loading-bar>
<section class=" is-fluid">
	<h2 class="title has-text-centered" style="color: #ff3860;"></h2>
	<div class="box no-print">
		<div class="columns">
			<div class="column is-narrow">
				<label class="label">Session</label>
			</div>
			<div class="column is-narrow">
				<div class="control">
					<div class="select">
						<select ref="session_id" id="session_id">
							<option>Select Session</option>
							<option each={sessions} value={session_id}>{session_name}
                            </option>
						</select>
					</div>
				</div>
			</div>
			<div class="column">
				<button disabled={loading} class="button is-danger has-text-weight-bold"
				onclick={getData} > GO
				</button>
				<input type="checkbox" id="checkTable" checked={e.done} 
				onclick={viewTable}  style="margin-top: 12px;"> Table

				<button class="button is-primary has-text-weight-bold is-pulled-right" onclick="window.print()" title="Print">
		              <span class="icon">
		                 <i class="fas fa-print"></i>
		             </span>
		         </button>
			</div>
		</div>
	</div>

	<p class="has-text-centered" style="color: #ff3860;font-weight:bold">Fee Scheme Report</p>
	<p class="has-text-centered">Session: {sessionName}</p>
  	<p class="has-text-centered">Total: {grand_total}</p>
    <!-- <div id="piechart" style="width: 900px; height: 500px;" show={report_view =='show_graph'}></div> -->
    <center>
		<div id="piechart" style="width: 900px; height: 500px;" show={report_view =='show_graph'}></div>
	</center>
	<!-- <canvas id="canvas_pie" show={report_view =='show_graph'}></canvas> -->
    <center>
		<table class="table is-striped is-hoverable is-bordered" show={report_view =='show_table'}>
			<thead>
				<tr>
				    <th>Fee Schme</th>
				    <th class="has-text-right">Total</th>
				</tr>
			</thead>
			<tbody>
				<tr each={cd, i in schemes}>
					<td>{cd.fee_plan_name}</td>
					<td class="has-text-right">{cd.total}</td>
				</tr>
				<tr>
					<td class="has-text-right">Total</td>
					<td class="has-text-right">{grand_total}</td>
				</tr>
			</tbody>
		</table>
	</center>	
</section>

<script>
	var self = this
    self.on("mount", function(){
      self.readSession()
      self.update();
    })

    self.on("unmount", function(){
      sessionStore.off('read_session_changed', ReadSessionChanged)
      feesReportStore.off('read_session_scheme_changed',ReadSessionSchemeChanged)
    })
    
    //read events
    self.readSession = () => {
       sessionStore.trigger('read_session')
    }

    self.viewTable = () => {
    	if($('#checkTable').is(":checked")){
	        self.report_view = 'show_table'
    	}else{
	        self.report_view = 'show_graph'
    	}
    }
    self.getData = () => {
      if(self.refs.session_id.value){
      self.loading = true
      feesReportStore.trigger('read_session_scheme', self.refs.session_id.value)
      self.report_view = 'show_graph'
      }else{
      	toastr.info("Please select session")
      }	
    }

    sessionStore.on('read_session_changed',ReadSessionChanged)
    function ReadSessionChanged(sessions){
      console.log(sessions) 
      self.loading = false
      self.sessions = sessions
      self.update()
    }

    feesReportStore.on('read_session_scheme_changed',ReadSessionSchemeChanged)
    function ReadSessionSchemeChanged(schemes,grand_total, session_name){
      self.schemes = schemes
      self.grand_total = grand_total
      self.sessionName = session_name

      var chart_percentage = []
       chart_percentage.push(['Task', 'Hours per Day'])
       for (var i = self.schemes.length - 1; i >= 0; i--) {
		   chart_percentage.push([self.schemes[i].fee_plan_name,self.schemes[i].total])
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
	  self.loading = false 
      self.update()
      console.log(self.schemes)
    }
</script>

 
</fees-scheme-report>