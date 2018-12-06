<staff-gender-report>
	<section class=" is-fluid">
		<div class="level">
			<div class="level-left">
				<h2 class="title" style="color: #ff3860;">Student Gender Report</h2>
			</div>
		</div>
		<div class="box">
			<div class="columns">
				<!-- <div class="column is-narrow">
					<div class="control">
						<div class="select">
							<select ref="standard_id" onchange={getReadSection}>
								<option>Choose Standard</option>
								<option value='-1'>All</option>
								<option each={standards} value={standard_id}>{standard}
					                            </option>
							</select>
						</div>
					</div>
				</div> -->
				<!-- <div class="column is-narrow">
					<div class="control">
							        	<div class="select is-fullwidth">
							<select ref="section_id">
								<option>Choose Section</option>
								<option value='-1'>All</option>
								<option each={readfilteredSections} value={section_id}>{section}
					                            </option>
							</select>
						</div>
							      	</div>
							    </div> -->
				<div class="column">
					<!-- <button class="button is-danger has-text-weight-bold"
					onclick={readStudentHouseReport} >GO
					</button> -->
					<input type="checkbox" id="checkTable" checked={e.done}
				    onclick={viewTable}  style="margin-top: 12px;"> Table
				</div>
			</div>
		</div>
		<canvas id="canvas_pie" show={report_view =='show_graph'}></canvas>
		<table class="table is-fullwidth is-striped is-hoverable is-narrow" show={report_view =='show_table'}>
			<thead>
				<tr>
					<th>#</th>
					<th>Gender</th>
					<th>Strength</th>
				</tr>
			</thead>
			<tbody>
				<tr each={st, i in employeeGenderReports}>
					<td>{i+1}</td>
					<td>{st.gender}</td>
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
    	self.report_view ='show_graph'
    	self.readEmployeeGenderReport()
    	self.role = getCookie('role') 
        self.update()
        flatpickr(".date", {
	    	allowInput: true,
        	dateFormat: "d/m/Y",
  		})
    })

    self.on("unmount", function(){
      staffStore.off('read_employee_gender_report_change',ReadEmployeeGenderReportChanged)
    })

     self.viewTable = () => {
    	if($('#checkTable').is(":checked")){
	        self.report_view = 'show_table'
    	}else{
	        self.report_view = 'show_graph'
    	}
    }

    self.readEmployeeGenderReport = () => {
       staffStore.trigger('read_employee_gender_report')
    }
    
  
    staffStore.on('read_employee_gender_report_change',ReadEmployeeGenderReportChanged)
    function ReadEmployeeGenderReportChanged(employeeGenderReports,grandTotal){
      //console.log(employeeGenderReports) 
      self.title='Create'
      self.loading = false
      self.employeeGenderReports = employeeGenderReports
       self.grand_total = grandTotal

      var chartColors = ['#e3342f','#F6993F','#F2D024','#1F9D55','#2779BD','#9561E2','#B8C2CC','#fff'];

		var labels = []
		var chart_percentage = []
        var backgroundColor = []


		 for (var i = self.employeeGenderReports.length - 1; i >= 0; i--) {
		 	var total_percentage = ((self.employeeGenderReports[i].total*100)/self.grand_total).toFixed(2);
		    var percentage = self.employeeGenderReports[i].gender + ' ( ' + self.employeeGenderReports[i].total + ' , ' + total_percentage + '% )';

		    labels.push(percentage)
		    chart_percentage.push(self.employeeGenderReports[i].total)
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
	      console.log(self.readEmployeeGenderReports)
      self.update()
      //console.log(self.employeeTypes)
    }
    

    
</script>
</staff-gender-report>