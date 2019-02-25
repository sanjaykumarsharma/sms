<staff-gender-report>
	<print-header></print-header> 
<loading-bar if={loading}></loading-bar>  
	<section class=" is-fluid">
		<h2 class="title has-text-centered" style="color: #ff3860;">Staff BY Gender<br>
					Grand Total <span style="color:#000">: {grand_total}</span></h2>
		<!-- <div class="level">
			<div class="level-left">
				<h2 class="title" style="color: #ff3860;">S <br>
				</h2>
			</div>
		</div> -->
		<div class="box no-print">
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
				<div class="column is-narrow">
					<div class="control">
					<div class="select is-fullwidth">
							<select ref="emp_type_id" onchange={readEmployeeGenderReport}>
								<option>Choose Type</option>
								<option value='-1'>All</option>
								<option each={employeeTypes} value={emp_type_id}>{emp_type}
	                            </option>
							</select>
						</div>
							      	</div>
							    </div>
				<div class="column">
					<!-- <button class="button is-danger has-text-weight-bold"
					onclick={readStudentHouseReport} >GO
					</button> -->
					<input type="checkbox" id="checkTable" checked={e.done}
				    onclick={viewTable}  style="margin-top: 12px;"> Table

				    <button class="button is-primary has-text-weight-bold is-pulled-right is-small" onclick="window.print()" title="Print">
                    <span class="icon">
                       <i class="fas fa-print"></i>
                   </span>
		          </button>
		          <button class="button is-warning is-rounded is-pulled-right is-small" onclick={readEmployeeGenderReport} style="margin-left:5px;margin-right:5px">
		          <span class="icon">
		            <span class="fas fa-sync-alt"></span>
		          </span>
		          </button>
				</div>
			</div>
		</div>

		<center>
			<div id="piechart" style="width: 900px; height: 500px;" show={report_view =='show_graph'}></div>
		</center>
		
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
    	self.readEmployeeTypes()
    	self.readEmployeeGenderReport()
    	self.role = getCookie('role') 
        self.update()
        flatpickr(".date", {
	    	allowInput: true,
        	dateFormat: "d/m/Y",
  		})
    })

    self.on("unmount", function(){
    	employeeTypeStore.off('employeeTypes_changed', EmployeeTypesChanged)
      staffStore.off('read_employee_gender_report_change',ReadEmployeeGenderReportChanged)
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

     employeeTypeStore.on('employeeTypes_changed',EmployeeTypesChanged)
    function EmployeeTypesChanged(employeeTypes){
      console.log(employeeTypes) 
      self.employeeTypes = employeeTypes
        self.loading = false;
      self.update()
      console.log(self.employeeTypes)
    }

    self.readEmployeeGenderReport = () => {
    	self.loading=true
       staffStore.trigger('read_employee_gender_report',self.refs.emp_type_id.value)
    }
    
  
    staffStore.on('read_employee_gender_report_change',ReadEmployeeGenderReportChanged)
    function ReadEmployeeGenderReportChanged(employeeGenderReports,grandTotal){
    	self.title='Create'
    	self.loading = false
    	self.employeeGenderReports = employeeGenderReports
       	self.grand_total = grandTotal

		var labels = []
		var chart_percentage = []
        var backgroundColor = []

        chart_percentage.push(['Task', 'Hours per Day'])
        for (var i = self.employeeGenderReports.length - 1; i >= 0; i--) {
		   chart_percentage.push([self.employeeGenderReports[i].gender,self.employeeGenderReports[i].total])
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
      	self.update()
    }
    

    
</script>
</staff-gender-report>