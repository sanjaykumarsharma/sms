<alumni-setting>
	<div class="field has-addons no-print">
	  	<p class="control">
		    <a class="button {is-active: selected_master == 'alumni' }" href="#/alumni-setting/alumni">
		      <span>Alumni</span>
		    </a>
	  	</p>
		<p class="control">
		    <a class="button {is-active: selected_master == 'aprrove-alumni'}" href="#/alumni-setting/aprrove-alumni">
		      <span>Approve Alumni</span>
		    </a>
		</p>
	</div>
<div id="alumni-setting-view"></div>
 <script>
    var self = this
    console.log('opts.selected_master')
    console.log(opts.selected_master)
    if(!opts.selected_master){
      self.selected_master = 'alumni'
    }else{
      self.selected_master = opts.selected_master
    }
  </script>
</alumni-setting>