<staff-report>
	<div class="field has-addons">
	  	<p class="control">
		    <a class="button {is-active: selected_staff_report == 'staff-gender-report' }" href="#/staff-report/staff-gender-report">
		      <span>Staff By Gender</span>
		    </a>
	  	</p>
		<p class="control">
		    <a class="button {is-active: selected_staff_report == 'staff-type-report'}" href="#/staff-report/staff-type-report">
		      <span>Staff By Type</span>
		    </a>
		</p>
	   
</div>
<div id="staff-report-view"></div>
 <script>
    var self = this
    console.log('opts.selected_staff_report')
    console.log(opts.selected_staff_report)
    if(!opts.selected_staff_report){
      self.selected_staff_report = 'staff-gender-report'
    }else{
      self.selected_staff_report = opts.selected_staff_report
    }
  </script>
</staff-report>


