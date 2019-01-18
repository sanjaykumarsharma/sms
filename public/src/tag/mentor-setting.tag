<mentor-setting>
	<div class="field has-addons no-print">
	    <p class="control">
		    <a class="button {is-active: selected_master == 'mentor-category'}" href="#/mentor-setting/mentor-category">
		      <span>Category</span>
		    </a>
	  	</p>
		<p class="control">
		    <a class="button {is-active: selected_master == 'mentor-case'}" href="#/mentor-setting/mentor-case">
		      <span>Case</span>
		    </a>
		</p>
	</div>
<div id="mentor-setting-view"></div>
 <script>
    var self = this
    console.log('opts.selected_master')
    console.log(opts.selected_master)
    if(!opts.selected_master){
      self.selected_master = 'mentor-category'
    }else{
      self.selected_master = opts.selected_master
    }
  </script>
</mentor-setting>