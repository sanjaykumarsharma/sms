<analysis-report>
	<div class="field has-addons no-print">
	  	<p class="control">
		    <a class="button {is-active: selected_master == 'assessment-report' }" href="#/analysis-report/assessment-report">
		      <span>Assessment Report</span>
		    </a>
	  	</p>
		<p class="control">
		    <a class="button {is-active: selected_master == 'yearly-section-wise-comparison-report'}" href="#/analysis-report/yearly-section-wise-comparison-report">
		      <span>Yearly Section Wise Comparison </span>
		    </a>
		</p>
		<p class="control">
		    <a class="button {is-active: selected_master == 'yearly-class-wise-comparison-report'}" href="#/analysis-report/yearly-class-wise-comparison-report">
		      <span>Yearly Class Wise Comparison </span>
		    </a>
		</p>
		<p class="control">
		    <a class="button {is-active: selected_master == 'yearly-class-wise-subject-avg-report'}" href="#/analysis-report/yearly-class-wise-subject-avg-report">
		      <span>Yearly Class Subject Avg.</span>
		    </a>
		</p>
		<p class="control">
		    <a class="button {is-active: selected_master == 'consolidate-tabulation-sheet-report'}" href="#/analysis-report/consolidate-tabulation-sheet-report">
		      <span>Consolidated Tabulation Sheet</span>
		    </a>
		</p>
		<p class="control">
		    <a class="button {is-active: selected_master == 'subject-wise-failure-report'}" href="#/analysis-report/subject-wise-failure-report">
		      <span>Subject Wise Failure Report</span>
		    </a>
		</p>
	</div>
	<div class="field has-addons no-print">
	  	<p class="control">
		    <a class="button {is-active: selected_master == 'student-wise-subject-failure-report' }" href="#/analysis-report/student-wise-subject-failure-report">
		      <span>Student Wise Subject Failure</span>
		    </a>
	  	</p>
	</div>
	<div id="analysis-report-view"></div>
 	<script>
	    var self = this
	    console.log('opts.selected_master')
	    console.log(opts.selected_master)
	    if(!opts.selected_master){
	      self.selected_master = 'assessment-report'
	    }else{
	      self.selected_master = opts.selected_master
	    }
  </script>
</analysis-report>