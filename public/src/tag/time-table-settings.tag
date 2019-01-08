<time-table-settings>
	<div class="field has-addons">
	  	<p class="control">
		    <a class="button {is-active: selected_time_table_settings == 'time-table-room-settings' }" href="#/time-table-admin/time-table-settings/time-table-room-settings">
		      <span>Room</span>
		    </a>
	  	</p>
	  	<p class="control">
		    <a class="button {is-active: selected_time_table_settings == 'time-table-period-settings' }" href="#/time-table-admin/time-table-settings/time-table-period-settings">
		      <span>Period</span>
		    </a>
	  	</p>
	  	<p class="control">
		    <a class="button {is-active: selected_time_table_settings == 'time-table-day-settings' }" href="#/time-table-admin/time-table-settings/time-table-day-settings">
		      <span>Day</span>
		    </a>
	  	</p>
	</div>
<div id="time-table-settings-view"></div>
 <script>
    var self = this
    console.log('opts.selected_time_table_settings')
    console.log(opts.selected_time_table_settings)
    if(!opts.selected_time_table_settings){
      self.selected_time_table_settings = 'time-table-room-settings'
    }else{
      self.selected_time_table_settings = opts.selected_time_table_settings
    }
  </script>
</time-table-settings>