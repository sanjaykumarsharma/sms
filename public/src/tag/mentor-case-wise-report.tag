<mentor-case-wise-report>
<header></header>
<loading-bar if={loading}></loading-bar>
<section class=" is-fluid">
    <h2 class="title has-text-centered is-size-5" style="color: #ff3860;margin-bottom: 6px;">Student Category wise Mentor Report</h2>
    <h2 class="title has-text-centered is-size-5" style="color: #ff3860;">Grand Total: {grand_total}</h2>

	<div class="box no-print">
		<div class="columns">
			<div class="column is-narrow">
				<label class="label">From Date</label>
			</div>
			<div class="column is-narrow">
				<input class="input date" ref="start_date" id="start_date" type="text" readonly="readonly">
			</div>
			<div class="column is-narrow">
				<label class="label">To Date</label>
			</div>
			<div class="column is-narrow">
				<input class="input date" ref="end_date" id="end_date" type="text" readonly="readonly">
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

	<canvas id="canvas_pie" show={report_view =='show_graph'}></canvas>

	<div class="printOnly">
		<table class="table is-striped is-hoverable is-bordered is-fullwidth " style="margin-top:50px;">
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

	<table class="table is-striped is-hoverable is-bordered is-fullwidth no-print" show={report_view =='show_table'}>
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
</section>

<script>
	var self = this
    self.on("mount", function(){
      self.loading = false;
      flatpickr(".date", {
	    allowInput: true,
        dateFormat: "d/m/Y",
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
    	var startDate = document.getElementById("start_date").value;
    	var endDate = document.getElementById("end_date").value;

    	if(!self.refs.start_date.value){
        toastr.info("Please enter Start Date and try again")
      	}else if(!self.refs.end_date.value){
      	toastr.info("Please enter End Date and try again")
      	}else if((Date.parse(startDate) >= Date.parse(endDate))){
       		toastr.info("Please enter To Date Grater Than From Date")
      	}else{
    	var obj={}
          obj['start_date']=convertDate(self.refs.start_date.value)
          obj['end_date']=convertDate(self.refs.end_date.value)
          self.loading = true
          mentorReportStore.trigger('read_case_wise_report', obj)
          self.report_view = 'show_graph'
          console.log(obj)
        }
    }
    self.csvExport = () => {
    	var startDate = document.getElementById("start_date").value;
    	var endDate = document.getElementById("end_date").value;

    	if(!self.refs.start_date.value){
        toastr.info("Please enter Start Date and try again")
      	}else if(!self.refs.end_date.value){
      	toastr.info("Please enter End Date and try again")
      	}else if((Date.parse(startDate) >= Date.parse(endDate))){
       		toastr.info("Please enter To Date Grater Than From Date")
      	}else{
    	var obj={}
          obj['start_date']=convertDate(self.refs.start_date.value)
          obj['end_date']=convertDate(self.refs.end_date.value)
          mentorReportStore.trigger('csv_case_wise_report', obj)
        }
    }

    mentorReportStore.on('read_case_wise_report_changed',ReadCaseChanged)
    function ReadCaseChanged(case_wise_reports,grand_total){
      self.loading = false;
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