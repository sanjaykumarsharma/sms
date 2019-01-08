<time-table-report-nav>
	<div class="field has-addons no-print">
	  	<p class="control">
		    <a class="button {is-active: selected_time_table_report == 'time-table-summary-report' }" href="#/time-table-report-nav/time-table-summary-report">
		      <span>Summary List</span>
		    </a>
	  	</p>
	  	<p class="control">
		    <a class="button {is-active: selected_time_table_report == 'time-table-detail-report' }" href="#/time-table-report-nav/time-table-detail-report">
		      <span>Detail List</span>
		    </a>
	  	</p>
	</div>
<div id="time-table-report-view"></div>
 <script>
    var self = this
    console.log('opts.selected_time_table_report')
    console.log(opts.selected_time_table_report)
    if(!opts.selected_time_table_report){
      self.selected_time_table_report = 'time-table-summary-report'
    }else{
      self.selected_time_table_report = opts.selected_time_table_report
    }
  </script>
</time-table-report-nav>