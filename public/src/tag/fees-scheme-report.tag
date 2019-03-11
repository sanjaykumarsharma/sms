<fees-scheme-report>
<header></header> 
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

				
			</div>
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
		</div>
	</div>

	<p class="has-text-centered" style="color: #ff3860;font-weight:bold">Fee Scheme Report</p>
	<p class="has-text-centered">Session: {sessionName}</p>
  <p class="has-text-centered">Scheme: {selectedScheme}</p>

	<canvas id="canvas_pie" show={report_view =='show_graph'}></canvas>
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
      feesReportStore.off('csv_export_fees_scheme_changed',feesSchememChanged)
    })

    self.downloadCSV = () => {
      feesReportStore.trigger('csv_fees_scheme',self.schemes)
    }

    feesReportStore.on('csv_export_fees_scheme_changed',feesSchememChanged)
    function feesSchememChanged(url){
      var open_url = window.location.origin+url 
      window.open(open_url);
      self.loading = false
      self.update()
     }
    
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

      var chartColors = ['#e3342f','#F6993F','#F2D024','#1F9D55','#2779BD','#9561E2','#B8C2CC','#fff'];

		var labels = []
		var chart_percentage = []
        var backgroundColor = []


		 for (var i = self.schemes.length - 1; i >= 0; i--) {
		 	var total_percentage = ((self.schemes[i].total*100)/self.grand_total).toFixed(2);
		    var percentage = self.schemes[i].fee_plan_name + ' ( ' + self.schemes[i].total + ' , ' + total_percentage + '% )';

		    labels.push(percentage)
		    chart_percentage.push(self.schemes[i].total)
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


		  self.selectedSession = $("#session_id option:selected").text() 
		  self.loading = false
      self.update()


      console.log(self.schemes)
    }
</script>

 
</fees-scheme-report>