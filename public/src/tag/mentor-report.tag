<mentor-report>
	<div class="field has-addons">
	    <p class="control">
		    <a class="button {is-active: selected_master == 'mentor-case-wise-report'}" href="#/mentor-report/mentor-case-wise-report">
		      <span>Case Wise Report</span>
		    </a>
	  	</p>
		<p class="control">
		    <a class="button {is-active: selected_master == 'mentor-class-wise-report'}" href="#/mentor-report/mentor-class-wise-report">
		      <span>Class Wise Report</span>
		    </a>
		</p>
		<p class="control">
		    <a class="button {is-active: selected_master == 'mentor-date-wise-case-report'}" href="#/mentor-report/mentor-date-wise-case-report">
		      <span>Date Wise Case Report</span>
		    </a>
		</p>
	</div>
<div id="mentor-report-view"></div>
 <script>
    var self = this
    console.log('opts.selected_master')
    console.log(opts.selected_master)
    if(!opts.selected_master){
      self.selected_master = 'mentor-case-wise-report'
    }else{
      self.selected_master = opts.selected_master
    }
  </script>
</mentor-report>