<infirmary-student-class-wise-report>
	<header></header>
  <loading-bar if={loading}></loading-bar>
	<section class=" is-fluid">
	<h2 class="title has-text-centered" style="color: #ff3860;">Class Wise Infirmary Report</h2>
	<div class="box no-print">
		<div class="columns">
			<div class="column is-narrow">
				<label class="label">Standard</label>
			</div>
			<div class="column is-narrow">
				<div class="control">
					<div class="select">
						<select ref="standard_id" onchange={getReadSection} onkeyup={addEnter}>
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
						<select ref="section_id" onkeyup={addEnter}>
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

	<canvas id="canvas_pie" show={report_view =='show_graph'}></canvas>

	<div class="columns is-centered">
		<table class="table is-striped is-hoverable is-bordered" show={report_view =='show_table'}>
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
          studentinfirmaryStore.trigger('read_class_wise_report', self.refs.standard_id.value,self.refs.section_id.value)
          	self.report_view = 'show_graph'
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
       self.class_wise_case_report = class_wise_case_report
       self.grand_total = grand_total
       console.log(self.grand_total)

      var chartColors = ['#e3342f','#F6993F','#F2D024','#1F9D55','#2779BD','#9561E2','#B8C2CC','#fdd', '#e6642f','#F6993F','#F2D038','#1F9D99','#2789BF','#9591E5','#B8C2DC','#fgg'];

		var labels = []
		var chart_percentage = []
        var backgroundColor = []


		 for (var i = self.class_wise_case_report.length - 1; i >= 0; i--) {
		 	var total_percentage = ((self.class_wise_case_report[i].total*100)/self.grand_total).toFixed(2);
		    var percentage = self.class_wise_case_report[i].category_name + ' ( ' + self.class_wise_case_report[i].total + ' , ' + total_percentage + '% )';

		    labels.push(percentage)
		    chart_percentage.push(self.class_wise_case_report[i].total)
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
      console.log(self.class_wise_case_report)
    }
</script>
</infirmary-student-class-wise-report>