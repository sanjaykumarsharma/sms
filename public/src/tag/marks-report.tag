<marks-report>
	<div class="field has-addons no-print">
	  	<p class="control">
		    <a class="button {is-active: selected_marks_report == 'consolidate-tabulation-sheet' }" href="#/marks-report/consolidate-tabulation-sheet">
		      <span>Consolidate Tabulation Sheet</span>
		    </a>
	  	</p>
		<p class="control">
		    <a class="button {is-active: selected_marks_report == 'merit-list'}" href="#/marks-report/merit-list">
		      <span>Merit List</span>
		    </a>
		</p>
	    <p class="control">
		    <a class="button {is-active: selected_marks_report == 'top-five'}" href="#/marks-report/top-five">
		      <span>Top Five</span>
		    </a>
	  	</p>
	  	<p class="control">
		    <a class="button {is-active: selected_marks_report == 'first-assessment-report-card'}" href="#/marks-report/first-assessment-report-card">
		      <span>First Assessment Report Card</span>
		    </a>
	  	</p>
	  	<p class="control">
		    <a class="button {is-active: selected_marks_report == 'final-assessment-report-card'}" href="#/marks-report/final-assessment-report-card">
		      <span>Final Assessment Report Card</span>
		    </a>
	  	</p>
</div>
<div id="marks-report-view"></div>
 <script>
    var self = this
    console.log('opts.selected_marks_report')
    console.log(opts.selected_marks_report)
    if(!opts.selected_marks_report){
      self.selected_marks_report = 'item'
    }else{
      self.selected_marks_report = opts.selected_marks_report
    }
  </script>
</marks-report>