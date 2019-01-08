<certificate>
	<div class="field has-addons no-print">
	  	<p class="control">
		    <a class="button {is-active: selected_cartificaee == 'issue-certificate' }" href="#/certificate/issue-certificate">
		      <span>Issue Certificate</span>
		    </a>
	  	</p>
		<p class="control">
		    <a class="button {is-active: selected_certificate == 'manage-certificate'}" href="#/certificate/manage-certificate">
		      <span>Manage Certificate</span>
		    </a>
		</p>
	    <p class="control"> 
		    <a class="button {is-active: selected_certificate == 'issued-certificate'}" href="#/certificate/issued-certificate">
		      <span>Issued Certificate</span>
		    </a>
	  	</p>
	  	
</div>
<div id="certificate-view"></div>
 <script>
    var self = this
    console.log('opts.selected_certificate')
    console.log(opts.selected_certificate)
    if(!opts.selected_certificate){
      self.selected_certificate = 'issue-certificate'
    }else{
      self.selected_certificate = opts.selected_certificate
    }
  </script>
</certificate>


