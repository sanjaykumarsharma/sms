<career-setting>
	<div class="field has-addons no-print">
	    <p class="control">
		    <a class="button {is-active: selected_master == 'applicant-detail'}" href="#/career-setting/applicant-detail">
		      <span>Applicant Detail</span>
		    </a>
	  	</p>
		<p class="control">
		    <a class="button {is-active: selected_master == 'career-interview'}" href="#/career-setting/career-interview">
		      <span>Career Interview</span>
		    </a>
		</p>
		<p class="control">
		    <a class="button {is-active: selected_master == 'interviewed-candidate'}" href="#/career-setting/interviewed-candidate">
		      <span>Interviewed Candidate</span>
		    </a>
		</p>
		<p class="control">
		    <a class="button {is-active: selected_master == 'career-report'}" href="#/career-setting/career-report">
		      <span>Career Reports</span>
		    </a>
		</p>
	</div>
<div id="career-setting-view"></div>
 <script>
    var self = this
    console.log('opts.selected_master')
    console.log(opts.selected_master)
    if(!opts.selected_master){
      self.selected_master = 'applicant-detail'
    }else{
      self.selected_master = opts.selected_master
    }
  </script>
</career-setting>