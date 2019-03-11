<analysis-report>
	<div class="field has-addons no-print">
	  	<p class="control">
		    <a class="button {is-active: selected_master == 'assessment-report' }" href="#/analysis-report/assessment-report">
		      <span>Assessment Report</span>
		    </a>
	  	</p>
		<p class="control">
		    <a class="button {is-active: selected_master == 'yearly-section-wise-comparison'}" href="#/analysis-report/yearly-section-wise-comparison">
		      <span>Yearly Section wise comparison </span>
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