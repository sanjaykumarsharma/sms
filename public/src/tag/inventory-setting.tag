<inventory-setting>
	<div class="field has-addons">
	  	<p class="control">
		    <a class="button {is-active: selected_master == 'inventory-rack' }" href="#/inventory-setting/inventory-rack">
		      <span>Rack</span>
		    </a>
	  	</p>
		<p class="control">
		    <a class="button {is-active: selected_master == 'inventory-unit' }" href="#/inventory-setting/inventory-unit">
		      <span>Unit</span>
		    </a>
	  	</p>
	  	<p class="control">
		    <a class="button {is-active: selected_master == 'inventory-category' }" href="#/inventory-setting/inventory-category">
		      <span>Category</span>
		    </a>
	  	</p>
	  	<p class="control">
		    <a class="button {is-active: selected_master == 'inventory-subcategory' }" href="#/inventory-setting/inventory-subcategory">
		      <span>Sub Category</span>
		    </a>
	  	</p>
	  	<p class="control">
		    <a class="button {is-active: selected_master == 'inventory-item' }" href="#/inventory-setting/inventory-item">
		      <span>Item</span>
		    </a>
	  	</p>
</div>
<div id="inventory-setting-view"></div>
 <script>
    var self = this
    console.log('opts.selected_master')
    console.log(opts.selected_master)
    if(!opts.selected_master){
      self.selected_master = 'inventory-rack'
    }else{
      self.selected_master = opts.selected_master
    }
  </script>
</inventory-setting>


