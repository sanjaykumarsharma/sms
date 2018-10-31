<new-admission-report>
	<div class="field has-addons">
	  	<p class="control">
		    <a class="button {is-active: selected_new_admission_report == 'new-admission-category-report'}" href="#/admin-report/new-admission-report/new-admission-category-report">
		      <span>New Admission Category</span>
		    </a>
	  	</p>
		<p class="control">
		      <a class="button {is-active: selected_new_admission_report == 'new-admission-list-report' }" href="#/admin-report/new-admission-report/new-admission-list-report">
		      <span>New Admission List</span>
		      </a>
		</p>
    </div>
<div id="new-admission-report-view"></div>
 <script>
    var self = this
    console.log('opts.selected_new_admission_report')
    console.log(opts.selected_new_admission_report)
    if(!opts.selected_new_admission_report){
      self.selected_new_admission_report = 'new-admission-category-report'
    }else{
      self.selected_new_admission_report = opts.selected_new_admission_report
    }
  </script>
</new-admission-report>


