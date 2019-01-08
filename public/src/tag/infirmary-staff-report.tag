<infirmary-staff-report>
	<div class="field has-addons no-print">
	  	<p class="control">
		    <a class="button {is-active: selected_infirmary_staff_report == 'infirmary-staff-date-wise-case-report'}" href="#/infirmary/infirmary-staff-report/infirmary-staff-date-wise-case-report">
		      <span>Date Wise Case Report</span>
		    </a>
	  	</p>
		<p class="control">
		      <a class="button {is-active: selected_infirmary_staff_report == 'infirmary-staff-monthly-report' }" href="#/infirmary/infirmary-staff-report/infirmary-staff-monthly-report">
		      <span>Monthly Report</span>
		      </a>
		</p>
	    <p class="control">
		    <a class="button {is-active: selected_infirmary_staff_report == 'infirmary-staff-health-card-report'}" href="#/infirmary/infirmary-staff-report/infirmary-staff-health-card-report">
		      <span>Health Record</span>
		    </a>
	  	</p>
    </div>
<div id="infirmary-staff-report-view"></div>
 <script>
    var self = this
    console.log('opts.selected_infirmary_staff_report')
    console.log(opts.selected_infirmary_staff_report)
    if(!opts.selected_infirmary_staff_report){
      self.selected_infirmary_staff_report = 'infirmary-staff-date-wise-case-report'
    }else{
      self.selected_infirmary_staff_report = opts.selected_infirmary_staff_report
    }
  </script>
</infirmary-staff-report>


