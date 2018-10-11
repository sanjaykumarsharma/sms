<activity-setting>
	<div class="field has-addons">
	  	<p class="control">
		    <a class="button {is-active: selected_master == 'activity-item' }" href="#/activity-setting/activity-item">
		      <span>Item</span>
		    </a>
	  	</p>
		<p class="control">
		    <a class="button {is-active: selected_master == 'activity-event'}" href="#/activity-setting/activity-event">
		      <span>Event</span>
		    </a>
		</p>
	    <p class="control">
		    <a class="button {is-active: selected_master == 'activity-category'}" href="#/activity-setting/activity-category">
		      <span>Category</span>
		    </a>
	  	</p>
</div>
<div id="activity-setting-view"></div>
 <script>
    var self = this
    console.log('opts.selected_master')
    console.log(opts.selected_master)
    if(!opts.selected_master){
      self.selected_master = 'activity-item'
    }else{
      self.selected_master = opts.selected_master
    }
  </script>
</activity-setting>


