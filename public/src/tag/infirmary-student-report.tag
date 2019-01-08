<infirmary-student-report>
	<div class="field has-addons no-print">
	  	<p class="control">
		    <a class="button {is-active: selected_infirmary_student_report == 'infirmary-date-wise-case-report'}" href="#/infirmary/infirmary-student-report/infirmary-date-wise-case-report">
		      <span>Date Wise Case Report</span>
		    </a>
	  	</p>
		<p class="control">
		      <a class="button {is-active: selected_infirmary_student_report == 'infirmary-student-class-wise-report' }" href="#/infirmary/infirmary-student-report/infirmary-student-class-wise-report">
		      <span>Class Wise Report</span>
		      </a>
		</p>
	    <p class="control">
		    <a class="button {is-active: selected_infirmary_student_report == 'infirmary-student-case-wise-report'}" href="#/infirmary/infirmary-student-report/infirmary-student-case-wise-report">
		      <span>Case Wise Report</span>
		    </a>
	  	</p>
    </div>
<div id="infirmary-student-report-view"></div>
 <script>
    var self = this
    console.log('opts.selected_infirmary_student_report')
    console.log(opts.selected_infirmary_student_report)
    if(!opts.selected_infirmary_student_report){
      self.selected_infirmary_student_report = 'infirmary-date-wise-case-report'
    }else{
      self.selected_infirmary_student_report = opts.selected_infirmary_student_report
    }
  </script>
</infirmary-student-report>


