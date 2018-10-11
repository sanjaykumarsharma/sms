<mentor-case-wise-report>
<section class=" is-fluid">
	<h2 class="title has-text-centered" style="color: #ff3860;">Student Category wise Mentor Report</h2>
	<div class="flex items-center mt-2 mb-6 no-print">
		<div class="bg-green py-1 rounded w-10">
			<div class="bg-grey h-px flex-auto"></div>
		</div>
	</div>
	<div class="box">
		<div class="columns">
			<div class="column is-narrow">
				<label class="label">From Date</label>
			</div>
			<div class="column is-narrow">
				<input class="date input flatpickr-input form-control input" placeholder="" ref="start_date" tabindex="0" type="text" readonly="readonly">
			</div>
			<div class="column is-narrow">
				<label class="label">To Date</label>
			</div>
			<div class="column is-narrow">
				<input class="date input flatpickr-input form-control input" placeholder="" ref="end_date" tabindex="0" type="text" readonly="readonly">
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
      mentorReportStore.off('read_case_wise_report_changed',ReadCaseChanged)
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
          mentorReportStore.trigger('read_case_wise_report', obj)
          self.report_view = 'show_graph'
          console.log(obj)
    }

    mentorReportStore.on('read_case_wise_report_changed',ReadCaseChanged)
    function ReadCaseChanged(case_wise_reports,grand_total){
      self.case_wise_reports = case_wise_reports
      self.grand_total = grand_total

      var chartColors = ['#e3342f','#F6993F','#F2D024','#1F9D55','#2779BD','#9561E2','#B8C2CC','#fff'];

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
		  window.myPie = new Chart(ctx, config);
      self.update()
      console.log(self.case_wise_reports)
    }
</script>

</mentor-case-wise-report>