<udise-report>
	<header></header>
	<loading-bar if={loading}></loading-bar>  
	<section class=" is-fluid">
		<h4 class="title has-text-centered" style="color: #ff3860;">Data Capture Format for student tracking in SDMIS {session_name} (in sync with U-DISE) Class:{standard} Section: {section}</h4>
		<div class="box no-print">
			<div class="columns">
				<div class="column is-narrow">
					<div class="control">
						<div class="select">
							<select ref="standard_id" id="standard_id" onchange={getReadSection} onkeyup={addEnter}>
								<option>Choose Standard</option>
								<option value='-1'>All</option>
								<option each={standards} value={standard_id}>{standard}
	                            </option>
							</select>
						</div>
					</div>
				</div>
				<div class="column is-narrow">
					<div class="control">
			        	<div class="select is-fullwidth">
							<select ref="section_id" id="section_id" onkeyup={addEnter}>
								<option>Choose Section</option>
								<option value='-1'>All</option>
								<option each={readfilteredSections} value={section_id}>{section}
	                            </option>
							</select>
						</div>
			      	</div>
			    </div>
			    <div class="column is-narrow">
					<div class="control">
			        	<div class="select is-fullwidth">
							<select ref="session_id" id="session_id" onkeyup={addEnter}>
								<option>Choose Session</option>
								<option each={sessions} value={session_id}>{session_name}
	                            </option>
							</select>
						</div>
			      	</div>
			    </div>
				<div class="column">
					<button class="button is-danger has-text-weight-bold"
					onclick={readUdiseReport} >GO
					</button>
				<!-- 	<input type="checkbox" id="checkTable" checked={e.done}
				    onclick={viewTable}  style="margin-top: 12px;"> Table -->

			        <button class="button is-primary has-text-weight-bold is-pulled-right" onclick="window.print()" title="Print">
			          <span class="icon"> <i class="fas fa-print"></i></span>
			        </button>
				    <button class="button is-warning is-rounded is-pulled-right" onclick={readUdiseReport} style="margin-left:5px;margin-right:5px">
			        <span class="icon">
			          <span class="fas fa-sync-alt"></span>
			        </span>
			        </button>
				</div>
			</div>
		</div>
		<div style="overflow-x: scroll; overflow-y:scroll" id="mydiv">
		<table class="table_t">
				<tr class="tr_t">
		             <td class="td_t">1.Student AADHAR No.</td> 
		             <td class="td_t">2.Name of Student </td> 
		             <td class="td_t">3.Fatder Name </td> 
		             <td class="td_t">4.Motder Name </td> 
		             <td class="td_t">5.Date of Birtd</td> 
		             <td class="td_t">6.Gender</td> 
		             <td class="td_t">7.Social Category</td> 
		             <td class="td_t">8.Religion</td> 
		             <td class="td_t">9.Motder Tongue</td> 
		             <td style="widtd:56px !important">10.Locality........</td> 
		             <td class="td_t">11.Date of Admission</td> 
		             <td class="td_t">12.Admission Number</td> 
		            
		             <td class="td_t">13.Whetder belong to BPL</td> 
		             <td class="td_t">14.Belong to Disadv. Group</td> 
		             <td class="td_t">15.Getting free education as RTE Act. (for private unaided school)</td> 
		             <td class="td_t">16.Studying in class in tde year {session_name}</td> 
		             <td class="td_t">17.Class studying in tde previous year</td>
		             <td class="td_t">18.If studying in class I, status of tde previous year</td> 
		             <td class="td_t">19.No. of day child attended school (in tde prev year)</td> 
		             <td class="td_t">20.Medium of Instructn</td> 
		             <td class="td_t">21.Type of disablities (if any)</td> 
		             <td class="td_t">22.Facility received by CWSN</td> 
		             <td class="td_t">23.No. of unifrom set</td> 
		             <td class="td_t">24.set of free text book</td> 
		             <td class="td_t">25.Free Transport</td> 
		             <td class="td_t">26.Free Escort Facility</td> 
		             <td class="td_t">27.Free Bicycle</td> 
		             <td class="td_t">28.Free Hostel facility</td> 
		             <td class="td_t">29.Special Training</td> 
		             <td class="td_t">30.Whetder tde child is homeless</td> 
		             <td class="td_t">31.Exam</td> 
		             <td class="td_t">32.% of marks obtained</td> 
		             <td class="td_t">33.Schooling status in {session_name}</td> 
		             <td class="td_t">34.Stream(For students of grades 11 & 12) </td> 
		             <td class="td_t">35.Trade/Sector</td> 
		             <td class="td_t">36.Job Role</td> 
		             <td class="td_t">37.Compl. NSQF Level</td> 
		             <td class="td_t">38.Stud opted for</td> 
		             <td class="td_t">39.EMPL</td> 
		             <td class="td_t">40.Salary offered</td> 
		             <td class="td_t">41.Student Bank Account Number</td> 
		             <td class="td_t">42.IFSC code of tde bank branch</td> 
		             <td class="td_t">43.Mobile Number(of student/parent)</td> 
		             <td class="td_t">44.Email Address(of student/parent)</td> 
				</tr>
				<tr each={st, i in udiseReports} class="tr_t">
					 <td class="td_t">{st.aadhar_no}</td> 
		             <td class="td_t">{st.student_name}</td> 
		             <td class="td_t">{st.f_name}</td>
		             <td class="td_t">{st.m_name}</td>
		             <td class="td_t">{st.dob}</td>
		             <td class="td_t">{st.gender}</td>
		             <td class="td_t">{st.category_name}</td>
		             <td class="td_t">{st.religion}</td>
		             <td class="td_t">{st.mother_tongue}</td>
		             <td style="width:56px !important"></td>
		             <td class="td_t">{st.doa}</td>
		             <td class="td_t">{st.reg_number}</td>
		             <td class="td_t">No</td>
		             <td class="td_t">No</td>
		             <td class="td_t">No</td>
		             <td class="td_t">{st.standard}</td>
		             <td class="td_t">{st.previous_class}</td>
		             <td class="td_t"></td>
		             <td class="td_t">{st.attendance}</td>
		             <td class="td_t">English</td>
		             <td class="td_t">No</td>
		             <td class="td_t">NA</td>
		             <td class="td_t">NA</td>
		             <td class="td_t">NA</td>
		             <td class="td_t">NA</td>
		             <td class="td_t">NA</td>
		             <td class="td_t">NA</td>
		             <td class="td_t">NA</td>
		             <td class="td_t">NA</td>
		             <td class="td_t">NA</td>
		             <td class="td_t">P</td>
		             <td class="td_t">{st.percentage}</td>
		             <td class="td_t">Regular</td>
		             <td class="td_t"></td>
		             <td class="td_t">NA</td>
		             <td class="td_t">NA</td>
		             <td class="td_t">NA</td>
		             <td class="td_t">NA</td>
		             <td class="td_t">NA</td> 
		             <td class="td_t">NA</td> 
		             <td class="td_t">NA</td> 
		             <td class="td_t">NA</td>
		             <td class="td_t">{st.mobile}</td>
		             <td class="td_t">{st.email}</td>
				</tr>
		</table>
	</div>
	</section>
<!-- End Other Information -->
<script>
	
	var self = this
    self.on("mount", function(){
    	self.title='Add'
    /*	self.report_view='show_graph'*/
    	self.readStandard()
    	self.readSection()
    	self.readSession()
    	self.role = getCookie('role') 
        self.update()
        flatpickr(".date", {
	    	allowInput: true,
        	dateFormat: "d/m/Y",
  		})
    })

    self.on("unmount", function(){
      studentStore.off('read_standard_changed',StandardChanged)
      studentStore.off('read_section_changed',SectionChanged)
      adminReportStore.off('read_udise_report_change',ReadUdiseReportChanged)
      adminReportStore.off('read_session_change',ReadSessionChange)
    })

   /* self.viewTable = () => {
    	if($('#checkTable').is(":checked")){
	        self.report_view = 'show_table'
    	}else{
	        self.report_view = 'show_graph'
    	}
    }*/

	self.readStandard = () => {
       studentStore.trigger('read_standard')
    }
    self.readSession = () => {
       adminReportStore.trigger('read_session')
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
     self.addEnter = (e) => {
      if(e.which == 13){
        self.readUdiseReport()
      }
    }
    self.readUdiseReport = () => {
    	self.loading=true
    	 self.standard = $("#standard_id option:selected").text();
    	 self.section = $("#section_id option:selected").text();
    	 self.session_name = $("#session_id option:selected").text();
       adminReportStore.trigger('read_udise_report',self.refs.standard_id.value,self.refs.section_id.value, self.refs.session_id.value,)
    }
    
   studentStore.on('read_standard_changed',StandardChanged)
    function StandardChanged(standards){
      console.log(standards) 
      self.standards = standards
      self.update()
    }

    adminReportStore.on('read_session_change',ReadSessionChange)
    function ReadSessionChange(sessions){
      console.log(sessions) 
      self.sessions = sessions
      self.update()
    }

    studentStore.on('read_section_changed',SectionChanged)
    function SectionChanged(sections){
      console.log(sections) 
      self.sections = sections
      self.update()
      self.getReadSection()
    }
    adminReportStore.on('read_udise_report_change',ReadUdiseReportChanged)
    function ReadUdiseReportChanged(udiseReports) {
      self.title='Create'
      self.loading = false
      self.udiseReports = udiseReports
    /*  self.grand_total = grandTotal

     var chartColors = ['#e3342f','#F6993F','#F2D024','#1F9D55','#2779BD','#9561E2','#B8C2CC','#fff','#a6cc33','#33cccc','#cc33cc','#60759f','#c2d1f0','#2952a3'];

		var labels = []
		var chart_percentage = []
        var backgroundColor = []


		 for (var i = self.studentGroupReports.length - 1; i >= 0; i--) {
		 	var total_percentage = ((self.studentGroupReports[i].total*100)/self.grand_total).toFixed(2);
		    var percentage = self.studentGroupReports[i].group_name + ' ( ' + self.studentGroupReports[i].total + ' , ' + total_percentage + '% )';

		    labels.push(percentage)
		    chart_percentage.push(self.studentGroupReports[i].total)
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
		  window.myPie = new Chart(ctx, config);*/
	      self.update()
	      console.log(self.udiseReports)
	      //self.update()


     
    }
    
</script>
</udise-report>