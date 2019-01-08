<infirmary>
	<div class="field has-addons no-print">
	  	<p class="control">
		    <a class="button {is-active: selected_master == 'infirmary-student' }" href="#/infirmary/infirmary-student">
		      <span>Student Infirmary</span>
		    </a>
	  	</p>
		<p class="control">
		    <a class="button {is-active: selected_master == 'infirmary-student-report'}" href="#/infirmary/infirmary-student-report/infirmary-date-wise-case-report">Student Report</a>
		    </a>
	  	</p>
	    <p class="control">
		    <a class="button {is-active: selected_master == 'infirmary-staff'}" href="#/infirmary/infirmary-staff">
		      <span>Staff Infirmary</span>
		    </a>
	  	</p>
	  	 <p class="control">
		    <a class="button {is-active: selected_master == 'infirmary-lab-test'}" href="#/infirmary/infirmary-lab-test">
		      <span>Lab Test</span>
		    </a>
	  	</p>
	  	 <p class="control">
		    <a class="button {is-active: selected_master == 'infirmary-staff-report'}" href="#/infirmary/infirmary-staff-report/infirmary-staff-date-wise-case-report">
		      <span>Staff Report</span>
		    </a>
	  	</p>
	  	 <p class="control">
		    <a class="button {is-active: selected_master == 'infirmary-staff-bp-weight'}" href="#/infirmary/infirmary-staff-bp-weight">
		      <span>Staff B.P/Weight </span>
		    </a>
	  	</p>
	  	<p class="control">
		    <a class="button {is-active: selected_master == 'infirmary-staff-bp-weight-report'}" href="#/infirmary/infirmary-staff-bp-weight-report/infirmary-staff-wise-report">
		      <span>Staff B.P/Report</span>
		    </a>
	  	</p>
</div>
<div id="infirmary-view"></div>
 <script>
    var self = this
    console.log('opts.selected_master')
    console.log(opts.selected_master)
    if(!opts.selected_master){
      self.selected_master = 'infirmary-student'
    }else{
      self.selected_master = opts.selected_master
    }
  </script>
</infirmary>


