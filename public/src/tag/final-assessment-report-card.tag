<final-assessment-report-card>
	<loading-bar if={loading}></loading-bar>
	<section class=" is-fluid" show={student_view =='show_student_list_view'}>
		<h2 class="title has-text-centered is-size-5" style="color: #ff3860;">Final Assessment Report Card</h2>
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

				<div class="column is-narrow"><label class="label">Re-Open date</label></div>
				<div class="column is-narrow">
					<div class="control">
						<input class="input date is-small" ref="re_open_date" type="text">
					</div>
				</div>
					
				<button class="button is-warning has-text-weight-bold ml5 is-small" onclick={finalAssessmentReportCardOneToFour}>
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
					<th>Final Term</th>
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

        	<table class="table is-fullwidth is-narrow no-border">    
	          <tbody>
	          	<tr>
	             <td rowspan="5" style="width:145px;">
	             	<img style="border:solid Black 1px" src="../images/{r.details.session_id}/studentImages/103728.jpg">
	             </td>
	             <td colspan="3" style="font-weight: bold;font-size: 18px;">
	                <p style="text-align:center;margin-bottom: -6px;">REPORT CARD  </p> 
	                <p style="text-align:center;margin-top:6px;"><span style="border-bottom: dotted 2px #000;">FINAL ASSESSMENT, {session_name}</span></p>
	             </td>
	            </tr>
	          	<tr>    
	             <th style="width:180px">Name</th> 
	             <td style="width:430px">{r.details.student_name}</td>
	             <th style="width:180px">Issue Date</th>             
	             <td style="width:250px">{issue_date}</td>
	            </tr>
	            <tr>             
	             <th>Enrolment no.</th>
	             <td>{r.details.enroll_number}</td>
	             <th>Class/Sec.</th>             
	             <td>{standard}</td>
	            </tr>
	            <tr>             
	             <th>Date of birth</th>
	             <td>{r.details.dob}</td>
	             <th>House</th>             
	             <td>{r.details.house_name}</td>
	            </tr>
	            <tr>
	            	<th>Date of Admission</th>
	            	<td>{r.details.doa} (<b>Session:</b> {r.details.year})</td>
	            	<td></td>
	            	<td></td>
	            </tr>
	          </tbody>
	        </table>

		  	<table class="table is-fullwidth is-narrow border-less-table divider-subject">
				<thead>
					<tr>
						<td class="has-text-centered table-head"></td>
						<td colspan="2" class="has-text-centered table-head lr-table-border">1st Assessment</td>
						<td colspan="2" class="has-text-centered table-head lr-table-border">Final Assessment</td>
						<td class="has-text-centered table-head">Final Evaluation</td>
					</tr>
					<tr>
						<td class="table-head">Subject</td>
						<td style="width:150px" class="has-text-centered table-head lr-table-border">Grade Obtained<br/>(100)</td>
						<td style="width:150px" class="has-text-centered table-head">Highest Grade</td>
						<td style="width:150px" class="has-text-centered table-head lr-table-border">Grade Obtained<br/>(100)</td>
						<td style="width:150px" class="has-text-centered table-head lr-table-border">Highest Grade</td>
						<td style="width:150px" class="has-text-centered table-head">Grade Obtained<br/>(200)</td>
					</tr>
				</thead>
				<tbody>
					<tr each={m in r.marks} class={m.show_in}>
						<td>{m.subject_name}</td>
						<td class="has-text-centered lr-table-border">{m.first_assessment_marks}</td>
						<td class="has-text-centered">{m.max_marks}</td>
						<td class="has-text-centered lr-table-border">{m.final_assessment_marks}</td>
						<td class="has-text-centered lr-table-border">{m.max_marks_final}</td>
						<td class="has-text-centered">{m.final_marks} <span if={m.final_att_percentage>0}> (<b>{m.final_att_percentage}</b>)% </span></td>
					</tr>
				</tbody>
			</table>

			<hr style="border-top: double !important;">
			<table class="table is-fullwidth signature-table is-narrow" style="margin-top:35px">
				<tr>
					<td>Remarks</td>
					<td colspan="3"><hr style="border-top:dotted;width:100%"></td>
				</tr>
				<tr>
					<td>Signature</td>
					<td>
						<div class="signature">
							<hr style="border-top:dotted">
							<span><b>Class Teacher</b></span>
						</div>
					</td>
					<td>
						<div class="signature">
							<hr style="border-top:dotted">
							<span><b>Principal</b></span>
						</div>
					</td>
					<td>
						<div class="signature">
							<hr style="border-top:dotted">
							<span><b>Parent / Guardian</b></span>
						</div>
					</td>
				</tr>
			</table>
			
			<hr style="border-top: double !important;">
			<p style="margin-top:30px;font-size: 15px;">
				PROMOTED TO CLASS ___________ / NEEDS TO REPEAT CLASS ___________ &nbsp;&nbsp;&nbsp;SCHOOL RE-OPENS ON:&nbsp;<span style="font-weight:bold">{re_open_date}</span>
			</p>
			<h6>EAP/F/002</h6>


			<div class="page-break"></div>

			<h2 class="has-text-centered report-h3 is-size-3">Maturity Development</h2>

			<table class="table table-condensed backside is-narrow is-bordered">
	      	  
	      	  <tr>
		       <th colspan="3">Given below are six areas in which maturity of the student is shown. Within each area, four levels of maturity have been given. This information indicates at which level your son works at school.
		       </th>
		      </tr>

		      <tr>
		        <th class="has-text-centered">INITIATIVE &amp; PERSEVERANCE</th>
		        <th class="has-text-centered" style="width:120px;">1st Term</th>
		        <th class="has-text-centered" style="width:120px;">Final Term</th>
		      </tr>

		      <tr>
		        <td>1. Self - motivated and completes tasks</td>
		        <td class="has-text-centered"><img src="dist/img/{r.md['initiative_first']}.jpg "></td>
		        <td class="has-text-centered"><img src="dist/img/{r.md_final['initiative_first']}.jpg "></td>
		      </tr>   

		      <tr>
		        <td>2. Works well with minimum direction</td>
		        <td class="has-text-centered"><img src="dist/img/{r.md['initiative_second']}.jpg"></td>
		        <td class="has-text-centered"><img src="dist/img/{r.md_final['initiative_second']}.jpg"></td>
		      </tr> 

		      <tr>
		        <td>3. Needs constant guidance</td>
		        <td class="has-text-centered"><img src="dist/img/{r.md['initiative_third']}.jpg"></td>
		        <td class="has-text-centered"><img src="dist/img/{r.md_final['initiative_third']}.jpg"></td>
		      </tr>   

		      <tr>
		        <td>4. Has to be told every thing</td>
		        <td class="has-text-centered"><img src="dist/img/{r.md['initiative_fourth']}.jpg"></td>
		        <td class="has-text-centered"><img src="dist/img/{r.md_final['initiative_fourth']}.jpg"></td>
		      </tr>   
		              
		      <tr>
		        <th class="has-text-centered">INTEREST</th>
		        <td class="has-text-centered"></td>
		        <td class="has-text-centered"></td>
		      </tr>

		      <tr>
		        <td>1. Easily stimulated &amp; sustained</td>
		        <td class="has-text-centered"><img src="dist/img/{r.md['interest_first']}.jpg"></td>
		        <td class="has-text-centered"><img src="dist/img/{r.md_final['interest_first']}.jpg"></td>
		      </tr> 

		      <tr>
		        <td>2. Interested only in some areas</td>
		        <td class="has-text-centered"><img src="dist/img/{r.md['interest_second']}.jpg"></td>
		        <td class="has-text-centered"><img src="dist/img/{r.md_final['interest_second']}.jpg"></td>
		      </tr> 

		      <tr>
		        <td>3. Inconsistent</td>
		        <td class="has-text-centered"><img src="dist/img/{r.md['interest_third']}.jpg"></td>
		        <td class="has-text-centered"><img src="dist/img/{r.md_final['interest_third']}.jpg"></td>
		      </tr> 

		      <tr>
		        <td>4. Indifferent</td>
		        <td class="has-text-centered"><img src="dist/img/{r.md['interest_fourth']}.jpg"></td>
		        <td class="has-text-centered"><img src="dist/img/{r.md_final['interest_fourth']}.jpg"></td>
		      </tr>

		      <tr>
		        <th class="has-text-centered">USE OF TIME</th>
		        <th class="has-text-centered"></th>
		        <th class="has-text-centered"></th>
		      </tr>

		      <tr>
		        <td>1. Uses time profitably</td>
		        <td class="has-text-centered"><img src="dist/img/{r.md['use_time_first']}.jpg"></td>
		        <td class="has-text-centered"><img src="dist/img/{r.md_final['use_time_first']}.jpg"></td>
		      </tr>    

		      <tr>
		        <td>2. Organized most of the time</td>
		        <td class="has-text-centered"><img src="dist/img/{r.md['use_time_second']}.jpg"></td>
		        <td class="has-text-centered"><img src="dist/img/{r.md_final['use_time_second']}.jpg"></td>
		      </tr> 

		      <tr>
		        <td>3. Disorganized but responds well to guidance</td>
		        <td class="has-text-centered"><img src="dist/img/{r.md['use_time_third']}.jpg"></td>
		        <td class="has-text-centered"><img src="dist/img/{r.md_final['use_time_third']}.jpg"></td>
		      </tr> 

		      <tr>
		        <td>4. Easily distracted</td>
		        <td class="has-text-centered"><img src="dist/img/{r.md['use_time_fourth']}.jpg"></td>
		        <td class="has-text-centered"><img src="dist/img/{r.md_final['use_time_fourth']}.jpg"></td>
		      </tr>

		      <tr>
		        <th class="has-text-centered">WORK HABITS</th>
		        <th class="has-text-centered"></th>
		        <th class="has-text-centered"></th>
		      </tr>

		      <tr>
		        <td>1. Very careful worker</td>
		        <td class="has-text-centered"><img src="dist/img/{r.md['work_habit_first']}.jpg"></td>
		        <td class="has-text-centered"><img src="dist/img/{r.md_final['work_habit_first']}.jpg"></td>
		      </tr>  

		      <tr>
		        <td>2. Usually neat</td>
		        <td class="has-text-centered"><img src="dist/img/{r.md['work_habit_second']}.jpg"></td>
		        <td class="has-text-centered"><img src="dist/img/{r.md_final['work_habit_second']}.jpg"></td>
		      </tr> 

		      <tr>
		        <td>3. Untidy</td>
		        <td class="has-text-centered"><img src="dist/img/{r.md['work_habit_third']}.jpg"></td>
		        <td class="has-text-centered"><img src="dist/img/{r.md_final['work_habit_third']}.jpg"></td>
		      </tr> 

		      <tr>
		        <td>4. Careless</td>
		        <td class="has-text-centered"><img src="dist/img/{r.md['work_habit_fourth']}.jpg"></td>
		        <td class="has-text-centered"><img src="dist/img/{r.md_final['work_habit_fourth']}.jpg"></td>
		      </tr> 

		      <tr>
		        <th class="has-text-centered">PARTICIPATION IN GROUP WORK</th>
		        <th class="has-text-centered"></th>
		        <th class="has-text-centered"></th>
		      </tr>

		      <tr>
		        <td>1. Contributes readily</td>
		        <td class="has-text-centered"><img src="dist/img/{r.md['participation_first']}.jpg"></td>
		        <td class="has-text-centered"><img src="dist/img/{r.md_final['participation_first']}.jpg"></td>
		      </tr> 

		      <tr>
		        <td>2. Tries to dominate the group</td>
		        <td class="has-text-centered"><img src="dist/img/{r.md['participation_second']}.jpg"></td>
		        <td class="has-text-centered"><img src="dist/img/{r.md_final['participation_second']}.jpg"></td>
		      </tr>

		      <tr>
		        <td>3. Takes part occasionally</td>
		        <td class="has-text-centered"><img src="dist/img/{r.md['participation_third']}.jpg"></td>
		        <td class="has-text-centered"><img src="dist/img/{r.md_final['participation_third']}.jpg"></td>
		      </tr>   

		      <tr>
		        <td>4. Has to be coaxed to participate</td>
		        <td class="has-text-centered"><img src="dist/img/{r.md['participation_fourth']}.jpg"></td>
		        <td class="has-text-centered"><img src="dist/img/{r.md_final['participation_fourth']}.jpg"></td>
		      </tr>

		      <tr>
		        <th class="has-text-centered">RESPONSIBILITY</th>
		        <th class="has-text-centered"></th>
		        <th class="has-text-centered"></th>
		      </tr>

		      <tr>
		        <td>1. Takes initiative in situations which require responsibility</td>
		        <td class="has-text-centered"><img src="dist/img/{r.md['responsibility_first']}.jpg"></td>
		        <td class="has-text-centered"><img src="dist/img/{r.md_final['responsibility_first']}.jpg"></td>
		      </tr>  

		      <tr>
		        <td>2. Accepts a responsibility only when it is assigned</td>
		        <td class="has-text-centered"><img src="dist/img/{r.md['responsibility_second']}.jpg"></td>
		        <td class="has-text-centered"><img src="dist/img/{r.md_final['responsibility_second']}.jpg"></td>
		      </tr> 

		      <tr>
		        <td>3. Casual about responsibility</td>
		        <td class="has-text-centered"><img src="dist/img/{r.md['responsibility_third']}.jpg"></td>
		        <td class="has-text-centered"><img src="dist/img/{r.md_final['responsibility_third']}.jpg"></td>
		      </tr>

		      <tr>
		        <td>4. Reluctant to accept responsibility</td>
		        <td class="has-text-centered"><img src="dist/img/{r.md['responsibility_fourth']}.jpg"></td>
		        <td class="has-text-centered"><img src="dist/img/{r.md_final['responsibility_fourth']}.jpg"></td>
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
									<th style="width:250px" class="has-text-centered">Grade (Final Term)</th>
								</tr>
							</thead>
							<tbody>
								<tr>
						            <td>Running</td>
						            <td class="has-text-centered">{r.pf['first_skill']}</td>
						            <td class="has-text-centered">{r.pf_final['first_skill']}</td>
						        </tr>
						        <tr>
						            <td>Hopping</td>
						            <td class="has-text-centered">{r.pf['second_skill']}</td>
						            <td class="has-text-centered">{r.pf_final['second_skill']}</td>
						        </tr>
						        <tr>
						            <td>Jumping</td>
						            <td class="has-text-centered">{r.pf['third_skill']}</td>
						            <td class="has-text-centered">{r.pf_final['third_skill']}</td>
						        </tr>
						        <tr>
						            <td>Catching</td>
						            <td class="has-text-centered">{r.pf['fourth_skill']}</td>
						            <td class="has-text-centered">{r.pf_final['fourth_skill']}</td>
						        </tr>
						        <tr>
						            <td>Throwing</td>
						            <td class="has-text-centered">{r.pf['fifth_skill']}</td>
						            <td class="has-text-centered">{r.pf_final['fifth_skill']}</td>
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

		    <div class='page-break'></div>

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
    		<h4 style="text-align:center;margin-bottom: -6px;font-weight:bold">REPORT CARD  </h4>
    		<h4 style="text-align:center;margin-bottom: 10px">
    			<span style="border-bottom: dotted 2px #000;font-weight:bold">FINAL ASSESSMENT {session_name}</span>
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
						<td style="width:175px" class="has-text-centered table-head lr-table-border">Final <br/>Assessment<br/>100</td>
						<td style="width:175px" class="has-text-centered table-head lr-table-border">M.O.<br/>150</td>
						<td style="width:175px" class="has-text-centered table-head lr-table-border">H.M.<br/>150</td>
						<td style="width:250px" class="has-text-centered table-head">Comparison of student performance with class average</td>
					</tr>
				</thead>
				<tbody>
					<tr each={m in r.marks} class={m.show_in}>
						<td class="{m.class}">{m.subject_name}</td>
						<td class="has-text-centered lr-table-border {m.final_marks_limit} {m.class}">{m.final_marks}</td>
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
							<span><b>Class Teacher</b></span>
						</div>
					</td>
					<td>
						<div class="signature">
							<hr style="border-top:dotted">
							<span><b>Principal</b></span>
						</div>
					</td>
					<td>
						<div class="signature">
							<hr style="border-top:dotted">
							<span><b>Parent / Guardian</b></span>
						</div>
					</td>
				</tr>
			</table>
			
			<hr style="border-top: double !important;">
			<h6>EAP/F/002</h6>

			<div class="page-break"></div>

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
									<th style="width:250px" class="has-text-centered">Grade (Final Term)</th>
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

		    <div class='page-break'></div>

		</div>	

	</section>
    
    <section class="container is-fluid " show={student_view=='report_nine_ten'}>
		<div class="level no-print">
		    <div class="level-left"></div>
		    <div class="level-right" style="margin-bottom: 5px;">
		      <button class="button is-warning has-text-weight-bold" onclick={close_report_nine_ten} style="margin-right: 5px;">
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

        <div each={r, i in reportsNine} class="fa-report-card-one-two-four">
    		<h4 style="text-align:center;margin-bottom: -6px;font-weight:bold">REPORT CARD  </h4>
    		<h4 style="text-align:center;margin-bottom: 10px">
    			<span style="border-bottom: dotted 2px #000;font-weight:bold">
    				<span hide={ten_report}>FINAL ASSESSMENT {session_name}</span>
    				<span show={ten_report}>Pre Board Examination-I {session_name}</span>
    			</span>
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

		  	<table class="table is-fullwidth is-narrow divider-subject bottom-border">
				<thead>
					<tr>
						<td class="table-head" rowspan="2" style="vertical-align: middle;">Subject</td>
						<td style="width:175px" class="has-text-centered table-head lr-table-border" colspan="2">Ist Unit Test(50)</td>
						<td style="width:175px" class="has-text-centered table-head lr-table-border" colspan="2">Ist Term (100)</td>
						<td style="width:250px;vertical-align: middle;" class="has-text-centered table-head" rowspan="2">Comparison of student performance with class average</td>
					</tr>
					<tr>
						<td style="width:175px" class="has-text-centered table-head lr-table-border">M.O</td>
						<td style="width:175px" class="has-text-centered table-head lr-table-border">Avg.</td>
						<td style="width:175px" class="has-text-centered table-head lr-table-border">M.O</td>
						<td style="width:175px" class="has-text-centered table-head lr-table-border">Avg.</td>
					</tr>
				</thead>
				<tbody>
					<tr each={m in r.marks} class="{m.show_in} {m.subject_group_class}">
						<td class="{m.class}">{m.subject_name}</td>
						<td class="has-text-centered lr-table-border {m.final_marks_limit} {m.class}">{m.final_marks}</td>
                        
					    <td class="has-text-centered lr-table-border {m.class}" style="vertical-align: middle;" rowspan="{m.subject_group_count}" hide={m.hide_avg_td}>{m.final_avg_marks}</td>
					    
						<td class="has-text-centered lr-table-border {m.second_marks_limit} {m.class}">{m.second_marks}</td>

						<td class="has-text-centered lr-table-border {m.class}" style="vertical-align: middle;" rowspan="{m.subject_group_count}" hide={m.hide_avg_td}>{m.second_avg_marks}</td>

						<td class="has-text-centered {m.class}">
							<div class="graph" style="width:{m.mo_marks}px" if={m.marking_type=='N'}>
                            	<div style="font-size:.7em;margin-left:{(m.mo_marks + 5 )}px">{m.mo_marks}</div>
                            </div>
                            <div class="graph1" style="width:{m.avg_marks}px" if={m.marking_type=='N'}>
                            	<div style="font-size:.7em;margin-left:{(m.avg_marks + 5 )}px">{m.avg_marks}</div>
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
							<span><b>Class Teacher</b></span>
						</div>
					</td>
					<td>
						<div class="signature">
							<hr style="border-top:dotted">
							<span><b>Principal</b></span>
						</div>
					</td>
					<td>
						<div class="signature">
							<hr style="border-top:dotted">
							<span><b>Parent / Guardian</b></span>
						</div>
					</td>
				</tr>
			</table>
			
			<hr style="border-top: double !important;">
			<h6>EAP/F/002</h6>

			<div class="page-break"></div>

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
									<th class="has-text-centered">Parameters</th>
									<th style="width:250px" class="has-text-centered">Marks (Final Term)</th>
								</tr>
							</thead>
							<tbody>
								<tr>
						            <td>Aerobic Capacity</td>
						            <td class="has-text-centered">{r.pf['first_skill']}</td>
						        </tr>
						        <tr>
						            <td>Agility</td>
						            <td class="has-text-centered">{r.pf['second_skill']}</td>
						        </tr>
						        <tr>
						            <td>Explosive Strength</td>
						            <td class="has-text-centered">{r.pf['third_skill']}</td>
						        </tr>
						        <tr>
						            <td>Abdominal Strength</td>
						            <td class="has-text-centered">{r.pf['fourth_skill']}</td>
						        </tr>
						        <tr>
						            <td>Flexiblity</td>
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

		    <div class='page-break'></div>

		</div>	

	</section>

	<section class="container is-fluid " show={student_view=='report_eleven'}>
		<div class="level no-print">
		    <div class="level-left"></div>
		    <div class="level-right" style="margin-bottom: 5px;">
		      <button class="button is-warning has-text-weight-bold" onclick={close_report_eleven} style="margin-right: 5px;">
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

        <div each={r, i in reportsEleven} class="fa-report-card-one-two-four">
    		<h4 style="text-align:center;margin-bottom: -6px;font-weight:bold">REPORT CARD  </h4>
    		<h4 style="text-align:center;margin-bottom: 10px">
    			<span style="border-bottom: dotted 2px #000;font-weight:bold">
    				<span hide={twelve_report}>FINAL ASSESSMENT {session_name}</span>
    				<span show={twelve_report}>Pre Board Examination-I {session_name}</span>
    			</span>
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
						<td class="table-head" rowspan="2" style="vertical-align: middle;">Subject</td>
						<td style="width:175px" class="has-text-centered table-head lr-table-border" colspan="2">Ist Unit Test(50)</td>
						<td style="width:175px" class="has-text-centered table-head lr-table-border" colspan="2">Ist Term (100)</td>
						<td style="width:250px;vertical-align: middle;" class="has-text-centered table-head" rowspan="2">Comparison of student performance with class average</td>
					</tr>
					<tr>
						<td style="width:175px" class="has-text-centered table-head lr-table-border">M.O</td>
						<td style="width:175px" class="has-text-centered table-head lr-table-border">H.M</td>
						<td style="width:175px" class="has-text-centered table-head lr-table-border">M.O</td>
						<td style="width:175px" class="has-text-centered table-head lr-table-border">H.M</td>
					</tr>
				</thead>
				<tbody>
					<tr each={m in r.marks} class="{m.show_in} {m.subject_group_class}">
						<td class="{m.class}">{m.subject_name}</td>
						<td class="has-text-centered lr-table-border {m.final_marks_limit} {m.class}">{m.final_marks}</td>
					    <td class="has-text-centered lr-table-border {m.class}">{m.final_max_marks}</td>
						<td class="has-text-centered lr-table-border {m.second_marks_limit} {m.class}">{m.second_marks}</td>
						<td class="has-text-centered lr-table-border {m.class}">{m.second_max_marks}</td>

						<td class="has-text-centered {m.class}">
							<div class="graph" style="width:{m.mo_marks}px" if={m.marking_type=='N'}>
                            	<div style="font-size:.7em;margin-left:{(m.mo_marks + 5 )}px">{m.mo_marks}</div>
                            </div>
                            <div class="graph1" style="width:{m.avg_marks}px" if={m.marking_type=='N'}>
                            	<div style="font-size:.7em;margin-left:{(m.avg_marks + 5 )}px">{m.avg_marks}</div>
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
							<span><b>Class Teacher</b></span>
						</div>
					</td>
					<td>
						<div class="signature">
							<hr style="border-top:dotted">
							<span><b>Principal</b></span>
						</div>
					</td>
					<td>
						<div class="signature">
							<hr style="border-top:dotted">
							<span><b>Parent / Guardian</b></span>
						</div>
					</td>
				</tr>
			</table>
			
			<hr style="border-top: double !important;">
			<h6>EAP/F/002</h6>

			<div class="page-break"></div>

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

		    <table class="table is-fullwidth" hide={twelve_report}>
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
									<th class="has-text-centered">Parameters</th>
									<th style="width:250px" class="has-text-centered">Marks (Final Term)</th>
								</tr>
							</thead>
							<tbody>
								<tr>
						            <td>Aerobic Capacity</td>
						            <td class="has-text-centered">{r.pf['first_skill']}</td>
						        </tr>
						        <tr>
						            <td>Agility</td>
						            <td class="has-text-centered">{r.pf['second_skill']}</td>
						        </tr>
						        <tr>
						            <td>Explosive Strength</td>
						            <td class="has-text-centered">{r.pf['third_skill']}</td>
						        </tr>
						        <tr>
						            <td>Abdominal Strength</td>
						            <td class="has-text-centered">{r.pf['fourth_skill']}</td>
						        </tr>
						        <tr>
						            <td>Flexiblity</td>
						            <td class="has-text-centered">{r.pf['fifth_skill']}</td>
						        </tr>
							</tbody>
		    			</table>
		    			
		    		</td>
		    	</tr>
		    </table>

		    <table class="table is-fullwidth is-narrow is-bordered" hide={twelve_report}>
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
            
            <h1 class="has-text-centered is-size-3" show={twelve_report}>Explanation of Unit Test and Terminal Exam Grades</h1>
            <center style="font-weight: bolder;">
	            <table class="table table-condensed backside is-narrow no-border" show={twelve_report}>
		            <tbody>
		            	<tr>
			              <td class="has-text-centered" style="text-decoration:underline;width:200px;">Unit Test</td>
			              <td class="has-text-centered" style="text-decoration:underline;width:200px;">Terminal</td>
			              <td style="width:200px;"></td>
			              <td style="width:200px;"></td>
			            </tr>
			            <tr>
			              <td class="has-text-centered">43  -  50</td>
			              <td class="has-text-centered">86  -  100</td>
			              <td class="has-text-centered">A</td>
			              <td class="has-text-centered">Excellent</td>
			            </tr>
			            <tr>
			              <td class="has-text-centered">36  -  42</td>
			              <td class="has-text-centered">71  -  85</td>
			              <td class="has-text-centered">B</td>
			              <td class="has-text-centered">Very Good</td>
			            </tr>
			            <tr>
			              <td class="has-text-centered">28  -  35</td>
			              <td class="has-text-centered">56  -  70</td>
			              <td class="has-text-centered">C</td>
			              <td class="has-text-centered">Good</td>
			            </tr>
			            <tr>
			              <td class="has-text-centered">20  -  27</td>
			              <td class="has-text-centered">40  -  55</td>
			              <td class="has-text-centered">D</td>
			              <td class="has-text-centered">Fair</td>
			            </tr>
			            <tr>
			              <td class="has-text-centered">0  -  19</td>
			              <td class="has-text-centered">0  -  39</td>
			              <td class="has-text-centered">E</td>
			              <td class="has-text-centered">Poor</td>
			            </tr>
			        </tbody>
			    </table>
            </center>


		    <div class='page-break'></div>

		</div>	

	</section>
<script>
	
	var self = this
	self.ten_report = false
	self.twelve_report = false
    self.on("mount", function(){
	    self.session_name= getCookie('session_name')
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
     	finalAssessmentReportStore.off('read_standard_changed',StandardChanged)
    	finalAssessmentReportStore.off('read_student_changed',StudentChanged)
    	finalAssessmentReportStore.off('read_final_assessment_report_card_one_to_four_changed',ReportOneToFourChanged)
    	finalAssessmentReportStore.off('read_final_assessment_report_card_five_to_eight_changed',ReportFiveToEightChanged)
    	finalAssessmentReportStore.off('read_final_assessment_report_card_nine_changed',ReportNineChanged)
    	finalAssessmentReportStore.off('read_final_assessment_report_card_eleven_changed',ReportElevenChanged)
    })

    
    self.getStudentData = () =>{

		finalAssessmentReportStore.trigger('read_student', self.refs.standard_id.value,self.refs.section_id.value)
    }

    self.readStandard = () => {
       finalAssessmentReportStore.trigger('read_standard')
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

    self.close_report_eleven = () => {
      self.student_view = 'show_student_list_view'
    }

    self.close_report_nine_ten = () => {
      self.student_view = 'show_student_list_view'
    }

    self.close_report_five_to_eight = () => {
      self.student_view = 'show_student_list_view'
    }

    self.finalAssessmentReportCardOneToFour = () => {
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
      	}else if(!self.refs.re_open_date.value){
        	toastr.error("Please enter re-open and try again")
        	return;
      	}else{
      		self.issue_date=self.refs.issue_date.value
      		self.re_open_date=self.refs.re_open_date.value
      		self.standard=$("#standard_id option:selected").text()+ ' ' + $("#section_id option:selected").text();
      		var obj={}
          	obj['issue_date']=convertDate(self.refs.issue_date.value)
          	obj['standard_id']=self.refs.standard_id.value
          	obj['section_id']=self.refs.section_id.value
          	obj['student_id']=student_id
          	obj['end_date']=self.end_date
          	obj['end_date_final']=self.end_date_final
          	self.loading = true

          	if(self.refs.standard_id.value>=4 && self.refs.standard_id.value<=7){//one to four
	        	finalAssessmentReportStore.trigger('read_final_assessment_report_card_one_to_four',obj)
          	}else if(self.refs.standard_id.value>=8 && self.refs.standard_id.value<=11){//five to eight
          		finalAssessmentReportStore.trigger('read_final_assessment_report_card_five_to_eight',obj)
          	}else if(self.refs.standard_id.value==12 || self.refs.standard_id.value==13){//nine ten
          		if(self.refs.standard_id.value==13){
          			self.ten_report = true
          		}else{
          			self.ten_report = false
          		}
          		finalAssessmentReportStore.trigger('read_final_assessment_report_card_nine',obj)
          	}else if(self.refs.standard_id.value==14 || self.refs.standard_id.value==15){//eleven twelve
          		if(self.refs.standard_id.value==15){
          			self.twelve_report = true
          		}else{
          			self.twelve_report = false
          		}
          		finalAssessmentReportStore.trigger('read_final_assessment_report_card_eleven',obj)
          	}else {
               toastr.error("No Report for this class")
               self.loading = false
               self.update()
        	   return;
          	} 
      	}
    }

    finalAssessmentReportStore.on('read_standard_changed',StandardChanged)
    function StandardChanged(standards,sections,end_date,end_date_final){
      console.log(standards) 
      self.standards = standards
      self.sections = sections
      self.end_date = end_date
      self.end_date_final = end_date_final
      self.loading = false
      self.update()
      self.getSection()
      self.getStudentData()
    }

    finalAssessmentReportStore.on('read_student_changed',StudentChanged)
    function StudentChanged(students){
      console.log(students) 
      self.students = students
      self.students.map(i=>{
	      i.done = false;
      })
      self.update()
    }

    finalAssessmentReportStore.on('read_final_assessment_report_card_one_to_four_changed',ReportOneToFourChanged)
    function ReportOneToFourChanged(reportsOneToFour){
      self.loading = false
      self.student_view	= 'report_one_to_four'
      self.reportsOneToFour = reportsOneToFour
      console.log(self.student_view)
      console.log('read_final_assessment_report_card_one_to_four_changed')
      self.update()
    }

    finalAssessmentReportStore.on('read_final_assessment_report_card_five_to_eight_changed',ReportFiveToEightChanged)
    function ReportFiveToEightChanged(reportsFiveToEight){
      self.loading = false
      self.student_view	= 'report_five_to_eight'
      self.reportsFiveToEight = reportsFiveToEight
      self.update()
      console.log('read_final_assessment_report_card_five_to_eight_changed')
      console.log(self.student_view)
      console.log('student-view'+self.student_view)
      self.update()
    }

    finalAssessmentReportStore.on('read_final_assessment_report_card_nine_changed',ReportNineChanged)
    function ReportNineChanged(reportsNine){
      self.loading = false
      self.student_view	= 'report_nine_ten'
      self.reportsNine = reportsNine
      self.update()
      console.log('read_final_assessment_report_card_nine_changed')
      console.log(self.student_view)
      console.log('student-view'+self.student_view)
      self.update()
    }

    finalAssessmentReportStore.on('read_final_assessment_report_card_eleven_changed',ReportElevenChanged)
    function ReportElevenChanged(reportsEleven){
      self.loading = false
      self.student_view	= 'report_eleven'
      self.reportsEleven = reportsEleven
      self.update()
      console.log(self.student_view)
      console.log('student-view'+self.student_view)
      self.update()
    }


</script>
</final-assessment-report-card>