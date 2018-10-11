<discipline-setting>
	<div class="field has-addons">
	    <p class="control">
		    <a class="button {is-active: selected_master == 'discipline-category'}" href="#/discipline-setting/discipline-category">
		      <span>Category</span>
		    </a>
	  	</p>
		<p class="control">
		    <a class="button {is-active: selected_master == 'discipline-case'}" href="#/discipline-setting/discipline-case">
		      <span>Case</span>
		    </a>
		</p>
	</div>
<div id="discipline-setting-view"></div>
 <script>
    var self = this
    console.log('opts.selected_master')
    console.log(opts.selected_master)
    if(!opts.selected_master){
      self.selected_master = 'discipline-category'
    }else{
      self.selected_master = opts.selected_master
    }
  </script>
</discipline-setting>