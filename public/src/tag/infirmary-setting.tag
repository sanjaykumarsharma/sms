<infirmary-setting>
	<div class="field has-addons no-print">
	  	<p class="control">
		    <a class="button {is-active: selected_master == 'infirmary-category' }" href="#/infirmary-setting/infirmary-category">
		      <span>Category</span>
		    </a>
	  	</p>
		<p class="control">
		    <a class="button {is-active: selected_master == 'infirmary-case' }" href="#/infirmary-setting/infirmary-case">
		      <span>Case</span>
		    </a>
	  	</p>
</div>
<div id="infirmary-setting-view"></div>
 <script>
    var self = this
    console.log('opts.selected_master')
    console.log(opts.selected_master)
    if(!opts.selected_master){
      self.selected_master = 'infirmary-category'
    }else{
      self.selected_master = opts.selected_master
    }
  </script>
</infirmary-setting>


