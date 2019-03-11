<bill>
	<div class="field has-addons">
		<p class="control">
		    <a class="button {is-active: selected_master == 'fee-head' }" href="#/fee-bill/fee-head">
		      <span>Fee Head</span>
		    </a>
	  	</p>
	  	<p class="control">
		    <a class="button {is-active: selected_master == 'fee-slip' }" href="#/fee-bill/fee-slip">
		      <span>Fee Slip</span>
		    </a>
	  	</p>
	  	<p class="control">
		    <a class="button {is-active: selected_master == 'fee-plan' }" href="#/fee-bill/fee-plan">
		      <span>Fee Plan</span>
		    </a>
	  	</p>
		<p class="control">
		    <a class="button {is-active: selected_master == 'apply-fee-plan'}" href="#/fee-bill/apply-fee-plan">
		      <span>Apply Fee Plan </span>
		    </a>
		</p>		
		<!-- <p class="control">
		    <a class="button {is-active: selected_master == 'copy-fee-plan'}" href="#/fee-bill/copy-fee-plan">
		      <span>Copy Fee plan</span>
		    </a>
		</p> -->
</div>
<div id="bill-view"></div>
 <script>
    var self = this
    console.log('opts.selected_master')
    console.log(opts.selected_master)
    if(!opts.selected_master){
      self.selected_master = 'fee-head'
    }else{
      self.selected_master = opts.selected_master
    }
  </script>
</bill>