<discipline-report>
	<div class="field has-addons">
	    <p class="control">
		    <a class="button {is-active: selected_master == 'discipline-case-wise-report'}" href="#/discipline-report/discipline-case-wise-report">
		      <span>Case Wise Report</span>
		    </a>
	  	</p>
		<p class="control">
		    <a class="button {is-active: selected_master == 'discipline-class-wise-report'}" href="#/discipline-report/discipline-class-wise-report">
		      <span>Class Wise Report</span>
		    </a>
		</p>
		<p class="control">
		    <a class="button {is-active: selected_master == 'discipline-date-wise-case-report'}" href="#/discipline-report/discipline-date-wise-case-report">
		      <span>Date Wise Case Report</span>
		    </a>
		</p>
	</div>
<div id="discipline-report-view"></div>
 <script>
    var self = this
    console.log('opts.selected_master')
    console.log(opts.selected_master)
    if(!opts.selected_master){
      self.selected_master = 'discipline-case-wise-report'
    }else{
      self.selected_master = opts.selected_master
    }
  </script>
</discipline-report>