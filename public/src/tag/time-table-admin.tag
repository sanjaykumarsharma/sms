<time-table-admin>
	<div class="field has-addons">
	  	<p class="control">
		    <a class="button {is-active: selected_time_table_admin == 'time-table-class-report' }" href="#/time-table-admin/time-table-class-report">
		      <span>Class</span>
		    </a>
	  	</p>
	  	<p class="control">
		    <a class="button {is-active: selected_time_table_admin == 'time-table-room-report' }" href="#/time-table-admin/time-table-room-report">
		      <span>Rom</span>
		    </a>
	  	</p>
	  	<!-- <p class="control">
		    <a class="button {is-active: selected_time_table_admin == 'time-table-teacher-report' }" href="#/time-table-admin/time-table-teacher-report">
		      <span>Teacher</span>
		    </a>
	  	</p> -->
	</div>
<div id="time-table-admin-view"></div>
 <script>
    var self = this
    console.log('opts.selected_time_table_admin')
    console.log(opts.selected_time_table_admin)
    if(!opts.selected_time_table_admin){
      self.selected_time_table_admin = 'item'
    }else{
      self.selected_time_table_admin = opts.selected_time_table_admin
    }
  </script>
</time-table-admin>