<fees-report>     
	<div class="field has-addons no-print">
	  	<p class="control">
		    <a class="button {is-active: selected_master == 'month-wise' }" href="#/fees-report/month-wise">
		      <span>Month Wise</span>
		    </a>
	  	</p>
		<p class="control">
		    <a class="button {is-active: selected_master == 'daily-collection'}" href="#/fees-report/daily-collection">
		      <span>Daily Collection</span>
		    </a>
		</p>
	    <p class="control">
		    <a class="button {is-active: selected_master == 'daily-register'}" href="#/fees-report/daily-register">
		      <span>Daily Register</span>
		    </a>
	  	</p>
	  	 <p class="control">
		    <a class="button {is-active: selected_master == 'bank-wise'}" href="#/fees-report/bank-wise">
		      <span>Bank Wise Collection</span>
		    </a>
	  	</p>
	  	 <p class="control">
		    <a class="button {is-active: selected_master == 'date-wise'}" href="#/fees-report/date-wise">
		      <span>Date Wise Fees</span>
		    </a>
	  	</p>
	  	 <p class="control">
		    <a class="button {is-active: selected_master == 'head-wise-summary'}" href="#/fees-report/head-wise-summary">
		      <span>Head Wise Fees</span>
		    </a>
	  	</p>
          
	  	 <p class="control">
		    <a class="button {is-active: selected_master == 'head-wise'}" href="#/fees-report/head-wise">
		      <span>Head Wise (C/B/Chq/Online)</span>
		    </a>
	  	</p>
	  	<p class="control">
		    <a class="button {is-active: selected_master == 'outstanding-fees'}" href="#/fees-report/outstanding-fees">
		      <span>Outstanding Fees</span>
		    </a>
	  	</p>
	  	
	  
     </div>
     <div class="field has-addons no-print">
     	<p class="control">
		    <a class="button {is-active: selected_master == 'outstanding-fees-class'}" href="#/fees-report/outstanding-fees-class">
		      <span>Outstanding Fees By Class</span>
		    </a>
	  	</p>
	  	<p class="control">
		    <a class="button {is-active: selected_master == 'due-by-class'}" href="#/fees-report/due-by-class">
		      <span>Class Wise Due Detail</span>
		    </a>
	  	</p>
	  	<p class="control">
		    <a class="button {is-active: selected_master == 'fees-collection-summary'}" href="#/fees-report/fees-collection-summary">
		      <span>Fees Collection Summary</span>
		    </a>
	  	</p>
	  	<p class="control">
		    <a class="button {is-active: selected_master == 'estimated-fees'}" href="#/fees-report/estimated-fees">
		      <span>Estimated Fees</span>
		    </a>
	  	</p>
	  	<p class="control">
		    <a class="button {is-active: selected_master == 'advance-by-class'}" href="#/fees-report/advance-by-class">
		      <span>Class Wise Advance</span>
		    </a>
	  	</p>
	  	<p class="control">
		    <a class="button {is-active: selected_master == 'advance-fees'}" href="#/fees-report/advance-fees">
		      <span>Advance Fees</span>
		    </a>
	  	</p>
	  		<p class="control">
		    <a class="button {is-active: selected_master == 'scholarship-list'}" href="#/fees-report/scholarship-list">
		      <span>Scholarship List</span>
		    </a>
	  	</p>
	  	
</div>
 <div class="field has-addons no-print">
 </p>
	  		<p class="control">
		    <a class="button {is-active: selected_master == 'issued-letter'}" href="#/fees-report/issued-letter">
		      <span>Issued Letter</span>
		    </a>
	  	</p>
	  	</p>
	  		<p class="control">
		    <a class="button {is-active: selected_master == 'fees-scheme-report'}" href="#/fees-report/fees-scheme-report">
		      <span>Fees Scheme</span>
		    </a>
	  	</p>
	  	</p>
	  		<p class="control">
		    <a class="button {is-active: selected_master == 'fees-scheme-assigned'}" href="#/fees-report/fees-scheme-assigned">
		      <span>Assigned Scheme</span>
		    </a>
	  	</p>
	  		<p class="control">
		    <a class="button {is-active: selected_master == 'fees-scheme-unassigned'}" href="#/fees-report/fees-scheme-unassigned">
		      <span>Un-assigned Student</span>
		    </a>
	  	</p>
 </div>
<div id="fees-report-view"></div>
 <script>
    var self = this
    console.log('opts.selected_master')
    console.log(opts.selected_master)
    if(!opts.selected_master){
      self.selected_master = 'month-wise'
    }else{
      self.selected_master = opts.selected_master
    }
  </script>
</fees-report>