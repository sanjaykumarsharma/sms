<staff-type-report>
	<section class=" is-fluid">
		<div class="level">
			<div class="level-left">
				<h2 class="title" style="color: #ff3860;">Student House Report</h2>
			</div>
		</div>
		<div class="box">
			<div class="columns">
				<div class="column is-narrow">
					<div class="control">
						<div class="select">
							<select ref="emp_type_id" onchange={getEmployeeTypeReport}>
								<option>Choose Type</option>
								<option value='-1'>All</option>
								<option each={employeeTypes} value={emp_type_id}>{emp_type}
	                            </option>
							</select>
						</div>
					</div>
				</div>
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
					<th>Type</th>
					<th>Strength</th>
				</tr>
			</thead>
			<tbody>
				<tr each={st, i in employeeTypeReports}>
					<td>{i+1}</td>
					<td>{st.emp_type}</td>
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
    	self.readEmployeeTypes()
    	//self.getEmployeeTypeReport()
    	self.role = getCookie('role') 
        self.update()
        flatpickr(".date", {
	    	allowInput: true,
        	dateFormat: "d/m/Y",
  		})
    })

    self.on("unmount", function(){
      employeeTypeStore.off('employeeTypes_changed', EmployeeTypesChanged)
      staffStore.off('read_employee_type_report_change',ReadEmployeeTypeReportChanged)
    })

     self.viewTable = () => {
    	if($('#checkTable').is(":checked")){
	        self.report_view = 'show_table'
    	}else{
	        self.report_view = 'show_graph'
    	}
    }

	self.readEmployeeTypes = () => {
       self.loading = true;
       employeeTypeStore.trigger('read_employeeTypes')
    }

    self.getEmployeeTypeReport = () => {
       staffStore.trigger('read_employee_type_report',self.refs.emp_type_id.value)
    }
    
   
    employeeTypeStore.on('employeeTypes_changed',EmployeeTypesChanged)
    function EmployeeTypesChanged(employeeTypes){
      console.log(employeeTypes) 
      self.employeeTypes = employeeTypes
      self.update()
      console.log(self.employeeTypes)
    }
    staffStore.on('read_employee_type_report_change',ReadEmployeeTypeReportChanged)
    function ReadEmployeeTypeReportChanged(employeeTypeReports,grandTotal){
      //console.log(employeeTypeReports) 
      self.title='Create'
      self.loading = false
      self.employeeTypeReports = employeeTypeReports
       self.grand_total = grandTotal

      var chartColors = ['#e3342f','#F6993F','#F2D024','#1F9D55','#2779BD','#9561E2','#B8C2CC','#fff'];

		var labels = []
		var chart_percentage = []
        var backgroundColor = []


		 for (var i = self.employeeTypeReports.length - 1; i >= 0; i--) {
		 	var total_percentage = ((self.employeeTypeReports[i].total*100)/self.grand_total).toFixed(2);
		    var percentage = self.employeeTypeReports[i].emp_type + ' ( ' + self.employeeTypeReports[i].total + ' , ' + total_percentage + '% )';

		    labels.push(percentage)
		    chart_percentage.push(self.employeeTypeReports[i].total)
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
	      console.log(self.employeeTypeReports)
      self.update()
      //console.log(self.employeeTypes)
    }
    

    
</script>
</staff-type-report>