<first-assessment-report-card>
	<loading-bar if={loading}></loading-bar>
	<section class=" is-fluid" show={student_view =='show_student_list_view'}>
		<h2 class="title has-text-centered is-size-5" style="color: #ff3860;">First Assessment Report Card</h2>
		<div class="level box">
			<div class="level-left">
				<div class="columns">
					<div class="column is-narrow">
						<label class="label">Standard</label>
					</div>
					<div class="column is-narrow">
						<div class="control">
							<div class="select">
								<select ref="standard_id" onchange={getSection} id="standard_id">
									<option each={standards} value={standard_id}>
									{standard}</option>
								</select>
							</div>
						</div>
					</div>
					<div class="column is-narrow">
						<label class="label">Section</label>
					</div>
					<div class="column is-narrow">
						<div class="control">
				        	<div class="select is-fullwidth">
								<select ref="section_id" onchange={getStudentData} id="section_id">
									<option each={filteredSections} value={section_id}>{section}</option>
								</select>
							</div>
				      	</div>
				    </div>
				</div>
			</div>
			<div class="level-right">
				<div class="column is-narrow"><label class="label">Issue date</label></div>
					<div class="column is-narrow">
						<div class="control">
							<input class="input date is-small" ref="issue_date" type="text">
						</div>
					</div>
					
				<button class="button is-warning has-text-weight-bold ml5 is-small" onclick={firstAssessmentReportCardOneToFour}>
					Print Report Card
	        	</button>
			</div>
		</div>
		
		<table class="table is-fullwidth is-bordered is-hoverable is-narrow">
			<thead>
				<tr>
					<th>SL no</th>
					<th>Enroll No</th>
					<th>Roll no</th>
					<th>Student Name</th>
					<th>First Term</th>
					<th class="has-text-centered">
	        			<input type="checkbox" id="checkStudent" onclick={selectAll}>
	      			</th>
				</tr>
			</thead>
			<tbody>
				<tr each={st, i in students}>
					<td>{ i+1 }</td>
					<td>{st.enroll_number}</td>
					<td>{st.roll_number}</td>
					<td>{st.name}</td>
					<td></td>
					<td class="has-text-centered">
	        			<input type="checkbox" class="id_check_box" checked={st.done} id="{ 'StudentId' + st.student_id }" onclick={selectStudent.bind(this,st)} >
	      			</td>
				</tr>
			</tbody>
		</table>
	</section>

	<section class="container is-fluid" show={student_view=='report_one_to_four'}>
		<div class="level no-print">
		    <div class="level-left"></div>
		    <div class="level-right" style="margin-bottom: 5px;">
		      <button class="button is-warning has-text-weight-bold" onclick={close_report_one_to_four} style="margin-right: 5px;">
		        <span class="icon">
		          <span class="fas fa-arrow-left"></span>
		        </span>
		      </button>
		      <button class="button is-primary has-text-weight-bold" onclick="window.print()">
		        <span class="icon">
		          <span class="fas fa-print"></span>
		        </span>
		      </button>
		    </div>
	  	</div>

        <div each={r, i in reportsOneToFour} class="fa-report-card-one-two-four">
    		<h4 style="text-align:center;margin-bottom: -6px;">REPORT CARD  </h4>
    		<h4 style="text-align:center;margin-bottom: 10px">
    			<span style="border-bottom: dotted 2px #000;">FIRST ASSESSMENT 2018-2019</span>
    		</h4>

        	<table class="table is-fullwidth is-narrow">    
	          <tbody>
	          	<tr>             
	             <th style="width:180px">Name</th> 
	             <td style="width:430px">{r.marks[0].student_name}</td>
	             <th style="width:180px">Issue Date</th>             
	             <td style="width:250px">{issue_date}</td>
	            </tr>
	            <tr>             
	             <th>Enroll No</th>
	             <td>{r.marks[0].enroll_number}</td>
	             <th>Class</th>             
	             <td>{standard}</td>
	            </tr>
	            <tr>             
	             <th>Date of birth</th>
	             <td>{r.marks[0].dob}</td>
	             <th>House</th>             
	             <td>{r.marks[0].house_name}</td>
	            </tr>
	          </tbody>
	        </table>

		  	<table class="table is-fullwidth is-narrow border-less-table divider-subject">
				<thead>
					<tr>
						<td class="table-head">Subject</td>
						<td style="width:250px" class="has-text-centered table-head lr-table-border">Grade Obtained<br/>(100)</td>
						<td style="width:250px" class="has-text-centered table-head">Highest Grade</td>
					</tr>
				</thead>
				<tbody>
					<tr each={m in r.marks} class={m.show_in}>
						<td>{m.subject_name}</td>
						<td class="has-text-centered lr-table-border">{m.marks}</td>
						<td class="has-text-centered">{m.max_marks}</td>
					</tr>
				</tbody>
			</table>

			<hr style="border-top: double !important;">
			<table class="table is-fullwidth signature-table is-narrow" style="margin-top:35px">
				<tr>
					<td>*Remarks</td>
					<td colspan="3"><hr style="border-top:dotted;width:100%"></td>
				</tr>
				<tr>
					<td colspan="4"><hr style="border-top:dotted;width:100%"></td>
				</tr>
				<tr>
					<td>*Signature</td>
					<td>
						<div class="signature">
							<hr style="border-top:dotted">
							<span>Class Teacher</span>
						</div>
					</td>
					<td>
						<div class="signature">
							<hr style="border-top:dotted">
							<span>Principal</span>
						</div>
					</td>
					<td>
						<div class="signature">
							<hr style="border-top:dotted">
							<span>Parent / Guardian</span>
						</div>
					</td>
				</tr>
			</table>
			
			<hr style="border-top: double !important;">
			<h6>EAP/F/002</h6>

			<h3 class="has-text-centered report-h3">Maturity Development</h3>

			<table class="table table-condensed backside is-narrow is-bordered">
	      	  
	      	  <tr>
		       <th colspan="2">Given below are six areas in which maturity of the student is shown. Within each area,
		           four levels of maturity have been given. This information indicates at which level your
		           son works at school.
		       </th>
		      </tr>

		      <tr>
		        <th class="has-text-centered">INITIATIVE &amp; PERSEVERANCE</th>
		        <th class="has-text-centered" style="width:120px;">1st Term</th>
		      </tr>

		      <tr>
		        <td>1. Self - motivated and completes tasks</td>
		        <td class="has-text-centered"><img src="dist/img/{r.md['initiative_first']}.jpg "></td>
		      </tr>   

		      <tr>
		        <td>2. Works well with minimum direction</td>
		        <td class="has-text-centered"><img src="dist/img/{r.md['initiative_second']}.jpg"></td>
		      </tr> 

		      <tr>
		        <td>3. Needs constant guidance</td>
		        <td class="has-text-centered"><img src="dist/img/{r.md['initiative_third']}.jpg"></td>
		      </tr>   

		      <tr>
		        <td>4. Has to be told every thing</td>
		        <td class="has-text-centered"><img src="dist/img/{r.md['initiative_fourth']}.jpg"></td>
		      </tr>   
		              
		      <tr>
		        <th class="has-text-centered">INTEREST</th>
		        <td class="has-text-centered"></td>
		      </tr>

		      <tr>
		        <td>1. Easily stimulated &amp; sustained</td>
		        <td class="has-text-centered"><img src="dist/img/{r.md['interest_first']}.jpg"></td>
		      </tr> 

		      <tr>
		        <td>2. Interested only in some areas</td>
		        <td class="has-text-centered"><img src="dist/img/{r.md['interest_second']}.jpg"></td>
		      </tr> 

		      <tr>
		        <td>3. Inconsistent</td>
		        <td class="has-text-centered"><img src="dist/img/{r.md['interest_third']}.jpg"></td>
		      </tr> 

		      <tr>
		        <td>4. Indifferent</td>
		        <td class="has-text-centered"><img src="dist/img/{r.md['interest_fourth']}.jpg"></td>
		      </tr>

		      <tr>
		        <th class="has-text-centered">USE OF TIME</th>
		        <th class="has-text-centered"></th>
		      </tr>

		      <tr>
		        <td>1. Uses time profitably</td>
		        <td class="has-text-centered"><img src="dist/img/{r.md['use_time_first']}.jpg"></td>
		      </tr>    

		      <tr>
		        <td>2. Organized most of the time</td>
		        <td class="has-text-centered"><img src="dist/img/{r.md['use_time_second']}.jpg"></td>
		      </tr> 

		      <tr>
		        <td>3. Disorganized but responds well to guidance</td>
		        <td class="has-text-centered"><img src="dist/img/{r.md['use_time_third']}.jpg"></td>
		      </tr> 

		      <tr>
		        <td>4. Easily distracted</td>
		        <td class="has-text-centered"><img src="dist/img/{r.md['use_time_fourth']}.jpg"></td>
		      </tr>

		      <tr>
		        <th class="has-text-centered">WORK HABITS</th>
		        <th class="has-text-centered"></th>
		      </tr>

		      <tr>
		        <td>1. Very careful worker</td>
		        <td class="has-text-centered"><img src="dist/img/{r.md['work_habit_first']}.jpg"></td>
		      </tr>  

		      <tr>
		        <td>2. Usually neat</td>
		        <td class="has-text-centered"><img src="dist/img/{r.md['work_habit_second']}.jpg"></td>
		      </tr> 

		      <tr>
		        <td>3. Untidy</td>
		        <td class="has-text-centered"><img src="dist/img/{r.md['work_habit_third']}.jpg"></td>
		      </tr> 

		      <tr>
		        <td>4. Careless</td>
		        <td class="has-text-centered"><img src="dist/img/{r.md['work_habit_fourth']}.jpg"></td>
		      </tr> 

		      <tr>
		        <th class="has-text-centered">PARTICIPATION IN GROUP WORK</th>
		        <th class="has-text-centered"></th>
		      </tr>

		      <tr>
		        <td>1. Contributes readily</td>
		        <td class="has-text-centered"><img src="dist/img/{r.md['participation_first']}.jpg"></td>
		      </tr> 

		      <tr>
		        <td>2. Tries to dominate the group</td>
		        <td class="has-text-centered"><img src="dist/img/{r.md['participation_second']}.jpg"></td>
		      </tr>

		      <tr>
		        <td>3. Takes part occasionally</td>
		        <td class="has-text-centered"><img src="dist/img/{r.md['participation_third']}.jpg"></td>
		      </tr>   

		      <tr>
		        <td>4. Has to be coaxed to participate</td>
		        <td class="has-text-centered"><img src="dist/img/{r.md['participation_fourth']}.jpg"></td>
		      </tr>

		      <tr>
		        <th class="has-text-centered">RESPONSIBILITY</th>
		        <th class="has-text-centered"></th>
		      </tr>

		      <tr>
		        <td>1. Takes initiative in situations which require responsibility</td>
		        <td class="has-text-centered"><img src="dist/img/{r.md['responsibility_first']}.jpg"></td>
		      </tr>  

		      <tr>
		        <td>2. Accepts a responsibility only when it is assigned</td>
		        <td class="has-text-centered"><img src="dist/img/{r.md['responsibility_second']}.jpg"></td>
		      </tr> 

		      <tr>
		        <td>3. Casual about responsibility</td>
		        <td class="has-text-centered"><img src="dist/img/{r.md['responsibility_third']}.jpg"></td>
		      </tr>

		      <tr>
		        <td>4. Reluctant to accept responsibility</td>
		        <td class="has-text-centered"><img src="dist/img/{r.md['responsibility_fourth']}.jpg"></td>
		      </tr>

		    </table>

		    <table class="table is-fullwidth">
		    	<tr>
		    		<td style="width:50%">
		    			<table class="table is-fullwidth is-narrow is-bordered">
					        <caption class="report-caption">Explanation of Unit Test and Terminal Exam Grades</caption>
					          <tbody>
					          	<tr>
						            <th class="has-text-centered">Unit Test</th>
						            <th class="has-text-centered">Terminal</th>
						            <th></th>
						            <th></th>
						        </tr>
						        <tr>
						            <td>43  -  50</td>
						            <td>86  -  100</td>
						            <td>A</td>
						            <td>Excellent</td>
    					        </tr>
						        <tr>
						            <td>36  -  42</td>
						            <td>71  -  85</td>
						            <td>B</td>
						            <td>Very Good</td>
						        </tr>
						        <tr>
						            <td>28  -  35</td>
						            <td>56  -  70</td>
						            <td>C</td>
						            <td>Good</td>
						        </tr>
						        <tr>
						            <td>20  -  27</td>
						            <td>40  -  55</td>
						            <td>D</td>
						            <td>Fair</td>
         				        </tr>
						        <tr>
						            <td>0  -  19</td>
						            <td>0  -  39</td>
						            <td>E</td>
						            <td>Poor</td>
						        </tr>
						    </tbody>
						</table>
		    		</td>
		    		<td style="width:50%">
		    			<table class="table is-fullwidth is-narrow is-bordered">
		    				<caption class="report-caption">Physical Fitness Assessment of your ward</caption>
		    				<thead>
								<tr>
									<th class="has-text-centered">Skill</th>
									<th style="width:250px" class="has-text-centered">Grade (First Term)</th>
								</tr>
							</thead>
							<tbody>
								<tr>
						            <td>Running</td>
						            <td class="has-text-centered">{r.pf['first_skill']}</td>
						        </tr>
						        <tr>
						            <td>Hopping</td>
						            <td class="has-text-centered">{r.pf['second_skill']}</td>
						        </tr>
						        <tr>
						            <td>Jumping</td>
						            <td class="has-text-centered">{r.pf['third_skill']}</td>
						        </tr>
						        <tr>
						            <td>Catching</td>
						            <td class="has-text-centered">{r.pf['fourth_skill']}</td>
						        </tr>
						        <tr>
						            <td>Throwing</td>
						            <td class="has-text-centered">{r.pf['fifth_skill']}</td>
						        </tr>
							</tbody>
		    			</table>
		    			
		    		</td>
		    	</tr>
		    </table>

            <table class="table is-fullwidth is-narrow is-bordered">
		        <caption class="report-caption" style="text-align:left">Physical Fitness Description</caption>
		          <tr>
		            <th>Grade</th>
		            <td class="has-text-centered">A</td>
		            <td class="has-text-centered">B</td>
		            <td class="has-text-centered">C</td>
		            <td class="has-text-centered">D</td>
		            <td class="has-text-centered">E</td>
		          <tr>
		          <tr>
		            <th>Description</th>
		            <td class="has-text-centered">Excellent</td>
		            <td class="has-text-centered">Very Good</td>
		            <td class="has-text-centered">Good</td>
		            <td class="has-text-centered">Average</td>
		            <td class="has-text-centered">Needs Improvement</td>
		          <tr>
		    </table>

		</div>	

	</section>
    
	<section class="container is-fluid " show={student_view=='report_five_to_eight'}>
		<div class="level no-print">
		    <div class="level-left"></div>
		    <div class="level-right" style="margin-bottom: 5px;">
		      <button class="button is-warning has-text-weight-bold" onclick={close_report_five_to_eight} style="margin-right: 5px;">
		        <span class="icon">
		          <span class="fas fa-arrow-left"></span>
		        </span>
		      </button>
		      <button class="button is-primary has-text-weight-bold" onclick="window.print()">
		        <span class="icon">
		          <span class="fas fa-print"></span>
		        </span>
		      </button>
		    </div>
	  	</div>

        <div each={r, i in reportsFiveToEight} class="fa-report-card-one-two-four">
    		<h4 style="text-align:center;margin-bottom: -6px;">REPORT CARD  </h4>
    		<h4 style="text-align:center;margin-bottom: 10px">
    			<span style="border-bottom: dotted 2px #000;">FIRST ASSESSMENT 2018-2019</span>
    		</h4>

        	<table class="table is-fullwidth is-narrow no-border">    
	          <tbody>
	          	<tr>             
	             <th style="width:180px">Name</th> 
	             <td style="width:430px">{r.sd.student_name}</td>
	             <th style="width:180px">Issue Date</th>             
	             <td style="width:250px">{issue_date}</td>
	            </tr>
	            <tr>             
	             <th>Enroll No</th>
	             <td>{r.sd.enroll_number}</td>
	             <th>Class</th>             
	             <td>{standard}</td>
	            </tr>
	            <tr>             
	             <th>Date of birth</th>
	             <td>{r.sd.dob}</td>
	             <th>House</th>             
	             <td>{r.sd.house_name}</td>
	            </tr>
	          </tbody>
	        </table>

		  	<table class="table is-fullwidth is-narrow divider-subject no-border">
				<thead>
					<tr>
						<td class="table-head">Subject</td>
						<td style="width:175px" class="has-text-centered table-head lr-table-border">Class Test<br/>50</td>
						<td style="width:175px" class="has-text-centered table-head lr-table-border">First <br/>Assessment<br/>100</td>
						<td style="width:175px" class="has-text-centered table-head lr-table-border">M.O.<br/>150</td>
						<td style="width:175px" class="has-text-centered table-head lr-table-border">H.M.<br/>150</td>
						<td style="width:250px" class="has-text-centered table-head">Comparison of student performance with class average</td>
					</tr>
				</thead>
				<tbody>
					<tr each={m in r.marks} class={m.show_in}>
						<td class="{m.class}">{m.subject_name}</td>
						<td class="has-text-centered lr-table-border {m.first_marks_limit} {m.class}">{m.first_marks}</td>
						<td class="has-text-centered lr-table-border {m.second_marks_limit} {m.class}">{m.second_marks}</td>
						<td class="has-text-centered lr-table-border {m.class}">
							<span if={m.marking_type=='N' || m.marking_type=='T'}>{m.mo_marks}</span>
						</td>
						<td class="has-text-centered lr-table-border {m.class}">
							<span if={m.marking_type=='N'}>{m.max_marks}</span>
						</td>
						<td class="has-text-centered {m.class}">
							<div class="graph" style="width:{(m.mo_marks * 0.80)}px" if={m.marking_type=='N'}>
                            	<div style="font-size:.7em;margin-left:{((m.mo_marks * 0.80) + 5 )}px">{m.mo_marks}</div>
                            </div>
                            <div class="graph1" style="width:{(m.avg_marks * 0.80)}px" if={m.marking_type=='N'}>
                            	<div style="font-size:.7em;margin-left:{((m.avg_marks * 0.80) + 5 )}px">{m.avg_marks}</div>
                            </div>
					    </td>
					</tr>
				</tbody>
			</table>
            

			<hr style="border-top: double !important;">
			<table class="table is-fullwidth signature-table is-narrow" style="margin-top:35px">
				<tr>
					<td>*Remarks</td>
					<td colspan="3"><hr style="border-top:dotted;width:100%"></td>
				</tr>
				<tr>
					<td colspan="4"><hr style="border-top:dotted;width:100%"></td>
				</tr>
				<tr>
					<td>*Signature</td>
					<td>
						<div class="signature">
							<hr style="border-top:dotted">
							<span>Class Teacher</span>
						</div>
					</td>
					<td>
						<div class="signature">
							<hr style="border-top:dotted">
							<span>Principal</span>
						</div>
					</td>
					<td>
						<div class="signature">
							<hr style="border-top:dotted">
							<span>Parent / Guardian</span>
						</div>
					</td>
				</tr>
			</table>
			
			<hr style="border-top: double !important;">
			<h6>EAP/F/002</h6>

			<h3 class="has-text-centered report-h3">Maturity Development</h3>

			<table class="table table-condensed backside is-narrow is-bordered">
		      <tbody>
		      	<tr>
			       <th colspan="2">Given below are six areas in which maturity of the student is shown. Within each area,
			           four levels of maturity have been given. This information indicates at which level your
			           son works at school.
			       </th>
			      </tr>
			      <tr>
			        <th class="has-text-centered">INITIATIVE &amp; PERSEVERANCE</th>
			        <th class="has-text-centered" style="width:120px;">1st Term</th>
			      </tr>
			      <tr>
			        <td>1. Self - motivated and completes tasks</td>
			        <td class="has-text-centered"><img src="dist/img/{r.md['initiative_first']}.jpg "></td>
			      </tr>   
			      <tr>
			        <td>2. Works well with minimum direction</td>
			        <td class="has-text-centered"><img src="dist/img/{r.md['initiative_second']}.jpg"></td>
			      </tr>   
			      <tr>
			        <td>3. Needs constant guidance</td>
			        <td class="has-text-centered"><img src="dist/img/{r.md['initiative_third']}.jpg"></td>
			      </tr>   
			      <tr>
			        <td>4. Has to be told every thing</td>
			        <td class="has-text-centered"><img src="dist/img/{r.md['initiative_fourth']}.jpg"></td>
			      </tr>   
			              
			      <tr>
			        <th class="has-text-centered">INTEREST</th>
			        <td class="has-text-centered"></td>
			      </tr>
			      <tr>
			        <td>1. Easily stimulated &amp; sustained</td>
			        <td class="has-text-centered"><img src="dist/img/{r.md['interest_first']}.jpg"></td>
			      </tr>   
			      <tr>
			        <td>2. Interested only in some areas</td>
			        <td class="has-text-centered"><img src="dist/img/{r.md['interest_second']}.jpg"></td>
			      </tr>   
			      <tr>
			        <td>3. Inconsistent</td>
			        <td class="has-text-centered"><img src="dist/img/{r.md['interest_third']}.jpg"></td>
			      </tr>   
			      <tr>
			        <td>4. Indifferent</td>
			        <td class="has-text-centered"><img src="dist/img/{r.md['interest_fourth']}.jpg"></td>
			      </tr>

			      <tr>
			        <th class="has-text-centered">USE OF TIME</th>
			        <th class="has-text-centered"></th>
			      </tr>
			      <tr>
			        <td>1. Uses time profitably</td>
			        <td class="has-text-centered"><img src="dist/img/{r.md['use_time_first']}.jpg"></td>
			      </tr>                            
			      <tr>
			        <td>2. Organized most of the time</td>
			        <td class="has-text-centered"><img src="dist/img/{r.md['use_time_second']}.jpg"></td>
			      </tr>   
			      <tr>
			        <td>3. Disorganized but responds well to guidance</td>
			        <td class="has-text-centered"><img src="dist/img/{r.md['use_time_third']}.jpg"></td>
			      </tr>   
			      <tr>
			        <td>4. Easily distracted</td>
			        <td class="has-text-centered"><img src="dist/img/{r.md['use_time_fourth']}.jpg"></td>
			      </tr>  
			      <tr>
			        <th class="has-text-centered">WORK HABITS</th>
			        <th class="has-text-centered"></th>
			      </tr>
			      <tr>
			        <td>1. Very careful worker</td>
			        <td class="has-text-centered"><img src="dist/img/{r.md['work_habit_first']}.jpg"></td>
			      </tr>                                   
			      <tr>
			        <td>2. Usually neat</td>
			        <td class="has-text-centered"><img src="dist/img/{r.md['work_habit_second']}.jpg"></td>
			      </tr>   
			      <tr>
			        <td>3. Untidy</td>
			        <td class="has-text-centered"><img src="dist/img/{r.md['work_habit_third']}.jpg"></td>
			      </tr>   
			      <tr>
			        <td>4. Careless</td>
			        <td class="has-text-centered"><img src="dist/img/{r.md['work_habit_fourth']}.jpg"></td>
			      </tr> 
			      <tr>
			        <th class="has-text-centered">PARTICIPATION IN GROUP WORK</th>
			        <th class="has-text-centered"></th>
			      </tr>
			      <tr>
			        <td>1. Contributes readily</td>
			        <td class="has-text-centered"><img src="dist/img/{r.md['participation_first']}.jpg"></td>
			      </tr>                                 
			      <tr>
			        <td>2. Tries to dominate the group</td>
			        <td class="has-text-centered"><img src="dist/img/{r.md['participation_second']}.jpg"></td>
			      </tr>   
			      <tr>
			        <td>3. Takes part occasionally</td>
			        <td class="has-text-centered"><img src="dist/img/{r.md['participation_third']}.jpg"></td>
			      </tr>   
			      <tr>
			        <td>4. Has to be coaxed to participate</td>
			        <td class="has-text-centered"><img src="dist/img/{r.md['participation_fourth']}.jpg"></td>
			      </tr>

			      <tr>
			        <th class="has-text-centered">RESPONSIBILITY</th>
			        <th class="has-text-centered"></th>
			      </tr>
			      <tr>
			        <td>1. Takes initiative in situations which require responsibility</td>
			        <td class="has-text-centered"><img src="dist/img/{r.md['responsibility_first']}.jpg"></td>
			      </tr>  
			      <tr>
			        <td>2. Accepts a responsibility only when it is assigned</td>
			        <td class="has-text-centered"><img src="dist/img/{r.md['responsibility_second']}.jpg"></td>
			      </tr> 
			      <tr>
			        <td>3. Casual about responsibility</td>
			        <td class="has-text-centered"><img src="dist/img/{r.md['responsibility_third']}.jpg"></td>
			      </tr>     
			      <tr>
			        <td>4. Reluctant to accept responsibility</td>
			        <td class="has-text-centered"><img src="dist/img/{r.md['responsibility_fourth']}.jpg"></td>
			      </tr>
		      </tbody>
		    </table>

		    <table class="table is-fullwidth">
		    	<tr>
		    		<td style="width:50%">
		    			<table class="table is-fullwidth is-narrow is-bordered">
					        <caption class="report-caption">Explanation of Unit Test and Terminal Exam Grades</caption>
					          <tbody>
					          	<tr>
						            <th class="has-text-centered">Unit Test</th>
						            <th class="has-text-centered">Terminal</th>
						            <th></th>
						            <th></th>
						        </tr>
						        <tr>
						            <td>43  -  50</td>
						            <td>86  -  100</td>
						            <td>A</td>
						            <td>Excellent</td>
    					        </tr>
						        <tr>
						            <td>36  -  42</td>
						            <td>71  -  85</td>
						            <td>B</td>
						            <td>Very Good</td>
						        </tr>
						        <tr>
						            <td>28  -  35</td>
						            <td>56  -  70</td>
						            <td>C</td>
						            <td>Good</td>
						        </tr>
						        <tr>
						            <td>20  -  27</td>
						            <td>40  -  55</td>
						            <td>D</td>
						            <td>Fair</td>
         				        </tr>
						        <tr>
						            <td>0  -  19</td>
						            <td>0  -  39</td>
						            <td>E</td>
						            <td>Poor</td>
						        </tr>
						    </tbody>
						</table>
		    		</td>
		    		<td style="width:50%">
		    			<table class="table is-fullwidth is-narrow is-bordered">
		    				<caption class="report-caption">Physical Fitness Assessment of your ward</caption>
		    				<thead>
								<tr>
									<th class="has-text-centered">Skill</th>
									<th style="width:250px" class="has-text-centered">Grade (First Term)</th>
								</tr>
							</thead>
							<tbody>
								<tr>
						            <td>Running</td>
						            <td class="has-text-centered">{r.pf['first_skill']}</td>
						        </tr>
						        <tr>
						            <td>Hopping</td>
						            <td class="has-text-centered">{r.pf['second_skill']}</td>
						        </tr>
						        <tr>
						            <td>Jumping</td>
						            <td class="has-text-centered">{r.pf['third_skill']}</td>
						        </tr>
						        <tr>
						            <td>Catching</td>
						            <td class="has-text-centered">{r.pf['fourth_skill']}</td>
						        </tr>
						        <tr>
						            <td>Throwing</td>
						            <td class="has-text-centered">{r.pf['fifth_skill']}</td>
						        </tr>
							</tbody>
		    			</table>
		    			
		    		</td>
		    	</tr>
		    </table>

		    <table class="table is-fullwidth is-narrow is-bordered">
		        <caption class="report-caption">Physical Fitness Description</caption>
		          <tr>
		            <th>Obtained Marks</th>
		            <td class="centeralign">9-10</td>
		            <td class="centeralign">7-8</td>
		            <td class="centeralign">5-6</td>
		            <td class="centeralign">3-4</td>
		            <td class="centeralign">0-2</td>
		          <tr>
		          <tr>
		            <th>Description</th>
		            <td class="centeralign">Excellent</td>
		            <td class="centeralign">Very Good</td>
		            <td class="centeralign">Good</td>
		            <td class="centeralign">Average</td>
		            <td class="centeralign">Needs Improvement</td>
		          <tr>
		    </table>

		</div>	

	</section>

<script>
	
	var self = this
    self.on("mount", function(){
    	self.loading = false
    	self.role = getCookie('role')
    	self.student_view = 'show_student_list_view'
    	self.readStandard()
        self.update()
        flatpickr(".date", {
	    	allowInput: true,
        	dateFormat: "d/m/Y",
  		})
    })

    self.on("unmount", function(){
     	firstAssessmentReportStore.off('read_standard_changed',StandardChanged)
    	firstAssessmentReportStore.off('read_student_changed',StudentChanged)
    	firstAssessmentReportStore.off('read_first_assessment_report_card_one_to_four_changed',ReportOneToFourChanged)
    	firstAssessmentReportStore.off('read_first_assessment_report_card_five_to_eight_changed',ReportFiveToEightChanged)
    })

    
    self.getStudentData = () =>{

		firstAssessmentReportStore.trigger('read_student', self.refs.standard_id.value,self.refs.section_id.value)
    }

    self.readStandard = () => {
       firstAssessmentReportStore.trigger('read_standard')
    }

    self.getSection = () => {
    	self.filteredSections = []
    	self.filteredSections = self.sections.filter(s => {
    		return s.standard_id == self.refs.standard_id.value
    	})
      self.update()
      self.getStudentData()
    }

    self.selectAll = () => {

    	if($('#checkStudent').is(":checked")){
    		self.students.map(i=>{
	          i.done = true;
	          $('StudentId'+i.student_id).prop('checked', true);
	          
	        })
    	}else{
    		self.students.map(i=>{
	          i.done = false;
	          $('StudentId'+i.student_id).prop('checked', false);
	          self.student_id = i.student_id;
            console.log(self.student_id)
	        })
    	}
      console.log(self.students)
    }

    self.selectStudent = (item,event) => {
    	item.done=!event.item.st.done
        self.student_id = item.student_id;
        console.log(self.student_id)
    }
    self.close_report_one_to_four = () => {
      self.student_view = 'show_student_list_view'
    }

    self.close_report_five_to_eight = () => {
      self.student_view = 'show_student_list_view'
    }
    self.firstAssessmentReportCardOneToFour = () => {
    	let student_id='';
	     self.students.map( q => {
	        if(q.done){
	          if(student_id==''){
	            student_id=q.student_id
	          }else{
	            student_id=student_id+','+q.student_id
	          }
	        }
	      })
	     console.log(student_id);	
    	if(student_id==''){
        	toastr.info('Please select at least one student and try again')
        	return;
      	}else if(!self.refs.issue_date.value){
        	toastr.error("Please enter Issue Date and try again")
        	return;
      	}else{
      		self.issue_date=self.refs.issue_date.value
      		self.standard=$("#standard_id option:selected").text()+ ' ' + $("#section_id option:selected").text();
      		var obj={}
          	obj['issue_date']=convertDate(self.refs.issue_date.value)
          	obj['standard_id']=self.refs.standard_id.value
          	obj['section_id']=self.refs.section_id.value
          	obj['student_id']=student_id
          	obj['end_date']=self.end_date
          	self.loading = true

          	if(self.refs.standard_id.value>=4 && self.refs.standard_id.value<=7){//one to four
	        	firstAssessmentReportStore.trigger('read_first_assessment_report_card_one_to_four',obj)
          	}else if(self.refs.standard_id.value>=8 && self.refs.standard_id.value<=11){//five to eight
          		firstAssessmentReportStore.trigger('read_first_assessment_report_card_five_to_eight',obj)
          	}else {
               toastr.error("No Report for this class")
               self.loading = false
               self.update()
        	   return;
          	} 
      	}
    }

    firstAssessmentReportStore.on('read_standard_changed',StandardChanged)
    function StandardChanged(standards,sections,end_date){
      console.log(standards) 
      self.standards = standards
      self.sections = sections
      self.end_date = end_date
      self.loading = false
      self.update()
      self.getSection()
      self.getStudentData()
    }

    firstAssessmentReportStore.on('read_student_changed',StudentChanged)
    function StudentChanged(students){
      console.log(students) 
      self.students = students
      self.students.map(i=>{
	      i.done = false;
      })
      self.update()
    }

    firstAssessmentReportStore.on('read_first_assessment_report_card_one_to_four_changed',ReportOneToFourChanged)
    function ReportOneToFourChanged(reportsOneToFour){
      self.loading = false
      self.student_view	= 'report_one_to_four'
      self.reportsOneToFour = reportsOneToFour
      console.log(self.student_view)
      console.log('read_first_assessment_report_card_one_to_four_changed')
      self.update()
    }

    firstAssessmentReportStore.on('read_first_assessment_report_card_five_to_eight_changed',ReportFiveToEightChanged)
    function ReportFiveToEightChanged(reportsFiveToEight){
      self.loading = false
      self.student_view	= 'report_five_to_eight'
      self.reportsFiveToEight = reportsFiveToEight
      self.update()
      self.update()
      console.log('read_first_assessment_report_card_five_to_eight_changed')
      console.log(self.student_view)
      console.log('student-view'+self.student_view)
      self.update()
    }
</script>
</first-assessment-report-card>