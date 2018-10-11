<infirmary-staff-bp-weight-report>
	<div class="field has-addons">
	  	<p class="control">
		    <a class="button {is-active: selected_infirmary_staff_bp_weight_report == 'infirmary-staff-wise-report'}" href="#/infirmary/infirmary-staff-bp-weight-report/infirmary-staff-wise-report">
		      <span>Staff Wise Report</span>
		    </a>
	  	</p>
		<p class="control">
		      <a class="button {is-active: selected_infirmary_staff_bp_weight_report == 'infirmary-staff-monthly-report' }" href="#/infirmary/infirmary-staff-bp-weight-report/infirmary-staff-date-wise-report">
		      <span>Date Wise Report</span>
		      </a>
		</p>
    </div>
<div id="infirmary-staff-bp-weight-report-view"></div>
 <script>
    var self = this
    console.log('opts.selected_infirmary_staff_bp_weight_report')
    console.log(opts.selected_infirmary_staff_bp_weight_report)
    if(!opts.selected_infirmary_staff_bp_weight_report){
      self.selected_infirmary_staff_bp_weight_report = 'infirmary-staff-wise-report'
    }else{
    self.selected_infirmary_staff_bp_weight_report=opts.selected_infirmary_staff_bp_weight_report
    }
  </script>
</infirmary-staff-bp-weight-report>


