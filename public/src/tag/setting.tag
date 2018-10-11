<setting>
	<div class="field has-addons">
	  	<p class="control">
		    <a class="button {is-active: selected_master == 'item' }" href="#/setting/item">
		      <span>Item</span>
		    </a>
	  	</p>
		<p class="control">
		    <a class="button {is-active: selected_master == 'event'}" href="#/setting/event">
		      <span>Event</span>
		    </a>
		</p>
	    <p class="control">
		    <a class="button {is-active: selected_master == 'category'}" href="#/setting/category">
		      <span>Category</span>
		    </a>
	  	</p>
	  	<p class="control">
		    <a class="button {is-active: selected_master == 'class-teacher'}" href="#/setting/class-teacher">
		      <span>Class Teacher</span>
		    </a>
	  	</p>
</div>
<div id="setting-view"></div>
 <script>
    var self = this
    console.log('opts.selected_master')
    console.log(opts.selected_master)
    if(!opts.selected_master){
      self.selected_master = 'item'
    }else{
      self.selected_master = opts.selected_master
    }
  </script>
</setting>