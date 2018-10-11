<fees-setting>
	<div class="field has-addons">
	  	<p class="control">
		    <a class="button {is-active: selected_master == 'fine-setting' }" href="#/fees-setting/fine-setting">
		      <span>Fine Setting</span>
		    </a>
	  	</p>
		<p class="control">
		    <a class="button {is-active: selected_master == 'bank-account-setting'}" href="#/fees-setting/bank-account-setting">
		      <span>Bank Account </span>
		    </a>
		</p>		
		<p class="control">
		    <a class="button {is-active: selected_master == 'session-setting'}" href="#/fees-setting/session-setting">
		      <span>Session</span>
		    </a>
		</p>
</div>
<div id="setting-view"></div>
 <script>
    var self = this
    console.log('opts.selected_master')
    console.log(opts.selected_master)
    if(!opts.selected_master){
      self.selected_master = 'fine-setting'
    }else{
      self.selected_master = opts.selected_master
    }
  </script>
</fees-setting>