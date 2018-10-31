<admin-report>
	<div class="field has-addons">
	  	<p class="control">
		    <a class="button {is-active: selected_admin_report == 'student-summary-report' }" href="#/admin-report/student-summary-report">
		      <span>Student Summary</span>
		    </a>
	  	</p>
		<p class="control">
		    <a class="button {is-active: selected_admin_report == 'student-strength-report'}" href="#/admin-report/student-strength-report">
		      <span>Student Strength</span>
		    </a>
		</p>
	    <p class="control">
		    <a class="button {is-active: selected_admin_report == 'student-category-summary-report'}" href="#/admin-report/student-category-summary-report">
		      <span>Category Summary</span>
		    </a>
	  	</p>
	  	<p class="control">
		    <a class="button {is-active: selected_admin_report == 'student-category-strength-report'}" href="#/admin-report/student-category-strength-report">
		      <span>Category Strength</span>
		    </a>
	  	</p>
	  	<p class="control">
		    <a class="button {is-active: selected_admin_report == 'student-category-strength-report'}" href="#/admin-report/student-religion-strength-report">
		      <span>Religion Strength</span>
		    </a>
	  	</p>
	  	<p class="control">
		    <a class="button {is-active: selected_admin_report == 'student-group-report'}" href="#/admin-report/student-group-report">
		      <span>Group Report</span>
		    </a>
	  	</p>
	  	<p class="control">
		    <a class="button {is-active: selected_admin_report == 'student-house-report'}" href="#/admin-report/student-house-report">
		      <span>House Report</span>
		    </a>
	  	</p>
	  	<p class="control">
		    <a class="button {is-active: selected_admin_report == 'student-class-teacher-report'}" href="#/admin-report/student-class-teacher-report">
		      <span>Class Teacher</span>
		    </a>
	  	</p>
	  	 <p class="control">
		    <a class="button {is-active: selected_admin_report == 'new-admission-report'}" href="#/admin-report/new-admission-report/new-admission-category-report">
		      <span>New Admission</span>
		    </a>
	  	</p>
</div>
<div id="admin-report-view"></div>
 <script>
    var self = this
    console.log('opts.selected_admin_report')
    console.log(opts.selected_admin_report)
    if(!opts.selected_admin_report){
      self.selected_admin_report = 'student-summary'
    }else{
      self.selected_admin_report = opts.selected_admin_report
    }
  </script>
</admin-report>


