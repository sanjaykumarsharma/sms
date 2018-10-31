<activity-event-wise-graph-report>
	<section class=" is-fluid">
	<h2 class="title has-text-centered" style="color: #ff3860;">Category Wise Activity Graph</h2>
	<div class="flex items-center mt-2 mb-6 no-print">
		<div class="bg-green py-1 rounded w-10">
			<div class="bg-grey h-px flex-auto"></div>
		</div>
	</div>
	<div class="box">
		<div class="columns">
			<div class="column is-narrow">
				<label class="label">Type</label>
			</div>
			<div class="column is-narrow">
				<div class="control">
					<div class="select">
						<select ref="activity_type">
							<option value="Intra-School">Intra-School</option>
							<option value="Inter-School">Inter-School</option>
							<option value="Both">Both</option>
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
		</div>
	</div>

	<canvas id="canvas_pie" show={report_view =='show_graph'}></canvas>

	<div class="columns is-centered">
		<table class="table is-striped is-hoverable is-bordered" show={report_view =='show_table'}>
			<thead>
				<tr>
				    <th>Category</th>
				    <th class="has-text-right">Total</th>
				</tr>
			</thead>
			<tbody>
				<tr each={cd, i in activity_event_wise_graph_report}>
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
	    allowInput: true,
        dateFormat: "d/m/Y",
  		})
      self.readSession()
      self.update();
    })

    self.on("unmount", function(){
      activityReportStore.on('read_activity_event_wise_graph_report_changed',ReadActivityEventWiseGraphReportChanged)
      activityReportStore.off('read_session_changed',SessionChanged)
    })

    self.readSession = () => {
       activityReportStore.trigger('read_session')
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
          activityReportStore.trigger('read_activity_event_wise_graph_report', self.refs.activity_type.value, 
          	self.refs.session_id.value)
          	self.report_view = 'show_graph'
    }

    activityReportStore.on('read_session_changed',SessionChanged)
    function SessionChanged(sessions){
      console.log(sessions) 
      self.sessions = sessions
      self.update()
    }

    activityReportStore.on('read_activity_event_wise_graph_report_changed',ReadActivityEventWiseGraphReportChanged)
    function ReadActivityEventWiseGraphReportChanged(activity_event_wise_graph_report,grand_total){
      self.activity_event_wise_graph_report = activity_event_wise_graph_report
      self.grand_total = grand_total

      var chartColors = ['#e3342f','#F6993F','#F2D024','#1F9D55','#2779BD','#9561E2','#B8C2CC','#fff'];

		var labels = []
		var chart_percentage = []
        var backgroundColor = []


		 for (var i = self.activity_event_wise_graph_report.length - 1; i >= 0; i--) {
		 	var total_percentage = ((self.activity_event_wise_graph_report[i].total*100)/self.grand_total).toFixed(2);
		    var percentage = self.activity_event_wise_graph_report[i].category_name + ' ( ' + self.activity_event_wise_graph_report[i].total + ' , ' + total_percentage + '% )';

		    labels.push(percentage)
		    chart_percentage.push(self.activity_event_wise_graph_report[i].total)
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
      console.log(self.activity_event_wise_graph_report)
    }
</script>
</activity-event-wise-graph-report>