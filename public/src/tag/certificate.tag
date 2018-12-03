<certificate>
	<div class="field has-addons">
	  	<p class="control">
		    <a class="button {is-active: selected_cartificate == 'issue-certificate' }" href="#/certificate/issue-certificate">
		      <span>Issue Certificate</span>
		    </a>
	  	</p>
		<p class="control">
		    <a class="button {is-active: selected_cartificate == 'manage-certificate'}" href="#/certificate/manage-certificate">
		      <span>Manage Certificate</span>
		    </a>
		</p>
	    <p class="control">
		    <a class="button {is-active: selected_cartificate == 'issued-certificate'}" href="#/certificate/issued-certificate">
		      <span>Issued Certificate</span>
		    </a>
	  	</p>
	  	
</div>
<div id="certificate-view"></div>
 <script>
    var self = this
    console.log('opts.selected_cartificate')
    console.log(opts.selected_cartificate)
    if(!opts.selected_cartificate){
      self.selected_cartificate = 'issue-certificate'
    }else{
      self.selected_cartificate = opts.selected_cartificate
    }
  </script>
</certificate>


