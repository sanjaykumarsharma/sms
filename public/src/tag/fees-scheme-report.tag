<fees-scheme-report>
<section class=" is-fluid">
	<h2 class="title has-text-centered" style="color: #ff3860;">Fee Scheme Report</h2>
	<div class="flex items-center mt-2 mb-6 no-print">
		<div class="bg-green py-1 rounded w-10">
			<div class="bg-grey h-px flex-auto"></div>
		</div>
	</div>
	<div class="box">
		<div class="columns">
			<div class="column is-narrow">
				<label class="label">Session</label>
			</div>
			<div class="column is-narrow">
				<div class="control">
					<div class="select">
						<select ref="session_id">
							<option>Select Session</option>
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
		</div>
	</div>

	<canvas id="canvas_pie" show={report_view =='show_graph'}></canvas>

	<div class="columns is-centered">
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
	</div>
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
    	
      self.loading = true
      feesReportStore.trigger('read_session_scheme', self.refs.session_id.value)
    }

    sessionStore.on('read_session_changed',ReadSessionChanged)
    function ReadSessionChanged(sessions){
      console.log(sessions) 
      self.loading = false
      self.sessions = sessions
      self.update()
    }

    feesReportStore.on('read_session_scheme_changed',ReadSessionSchemeChanged)
    function ReadSessionSchemeChanged(schemes,grand_total){
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
      self.update()
      console.log(self.schemes)
    }
</script>

 
</fees-scheme-report>