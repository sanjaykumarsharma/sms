<activity-report>
	<div class="field has-addons no-print">
	    <p class="control">
		    <a class="button {is-active: selected_master == 'activity-date-wise-report'}" href="#/activity-report/activity-date-wise-report">
		      <span>Date Wise Report</span>
		    </a>
	  	</p>
		<p class="control">
		    <a class="button {is-active: selected_master == 'activity-session-wise-report'}" href="#/activity-report/activity-session-wise-report">
		      <span>Session Wise Report</span>
		    </a>
		</p>
		<p class="control">
		    <a class="button {is-active: selected_master == 'activity-event-wise-report'}" href="#/activity-report/activity-event-wise-report">
		      <span>Event Wise Report</span>
		    </a>
		</p>
		<p class="control">
		    <a class="button {is-active: selected_master == 'activity-student-event-report'}" href="#/activity-report/activity-student-event-report">
		      <span>Student Event Report</span>
		    </a>
		</p>
		<p class="control">
		    <a class="button {is-active: selected_master == 'activity-event-wise-graph-report'}" href="#/activity-report/activity-event-wise-graph-report">
		      <span>Event Wise Graph</span>
		    </a>
		</p>
	</div>
<div id="activity-report-view"></div>
 <script>
    var self = this
    console.log('opts.selected_master')
    //console.log(opts.selected_master)
    if(!opts.selected_master){
      self.selected_master = 'activity-date-wise-report'
    }else{
      self.selected_master = opts.selected_master
    }
  </script>
</activity-report>