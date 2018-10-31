<id-signature>
	<section class=" is-fluid">
		<div class="level">
	    	<div class="level-left">
	        	<h2 class="title" style="color: #ff3860;">ID Card Signature Management</h2>
	      	</div>
      		<div class="level-right">
        		<button class="button is-warning is-rounded" onclick={openAddSignatureModal}>
        			<span class="icon">
          				<span class="fas fa-plus"></span>
        			</span>
        		</button>
      		</div>
    	</div>
		<table class="table is-fullwidth is-striped is-hoverable is-narrow">
			<thead>
				<tr>
					<th>SL No</th>
					<th>Type</th>
					<th>Active</th>
					<th>Signature</th>					
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr each={st, i in signature}>
					<td>{ i+1 }</td>
					<td>{st.type}</td>
					<td>{st.active}</td>
					<td><img src='/images/7/signature/{st.type}.jpg' width="65" height="75" ></td>
					<td class="has-text-right">
		            <div class="inline-flex rounded border border-grey overflow-hidden" hide={st.confirmDelete}>
		              <span><a class="button is-small is-rounded " onclick={isActive.bind(this, st)}>Active</a></span>
		              <span><a class="button is-small is-rounded " onclick={edit.bind(this, st)}>Edit</a></span>
		              <span if={role=='ADMIN'}> <a class="button is-small is-rounded has-text-danger" rel="nofollow"onclick={confirmDelete} >Delete</a></span>
		            </div>
		            <div class="table-buttons" if={st.confirmDelete}>
          				<span disabled={loading} class="button is-small is-rounded" onclick={delete}><i class="fa fa-check" ></i></span>
          				<span disabled={loading} class="button is-small  has-text-danger is-rounded" onclick={cancelOperation}><i class="fa fa-times"></i></span>
        			</div>
          			</td>
				</tr>
			</tbody>
		</table>
	</section>

<!-- Open Signature Modal Start -->
  	<div id="signatureModal" class="modal ">
    <div class="modal-background"></div>
	    <div class="modal-card">
	    	<header class="modal-card-head">
	        	<p class="modal-card-title">{title} Signature</p>
	      	</header>
	      	<section class="modal-card-body">
	        	<div class="columns">
		          	<div class="column">
			            <div class="control">
							<label class="label" for="type">Type</label>
				        	<div class="select is-fullwidth">
								<select ref="type" id="type">
									<option value="Principal">Principal</option>
									<option value="Trustee">Trustee</option>
									<option value="Sample">Sample</option>
									<option value="Test">Test</option>
								</select>
							</div>
						</div>
						<div class="control">
							<label class="label" for="withdraw_remarks">Signature</label>
					        <div id="pp_box" class="preview-box-wide" onclick={trigger_file_input.bind(this,'signature_picture')}>
			        <div class="icon has-text-danger" onclick=
			        	{remove_picture.bind(this, 'pp_box','signature_picture')}><i class="fas fa-trash"></i>
			        </div>
			    </div>
			    		<input accept="image/*" class="is-hidden" id="signature_picture" name="signature_picture" onchange={loadFile.bind(this, 'pp_box')} type="file">
					    </div>
		          	</div>
	       		</div>
			</section>
	      	<footer class="modal-card-foot">
	        	<button class="button is-danger" onclick={add} >Add</button>
	        	<button class="button" id="item-modal-close" onclick={closeAddSignatureModal}>Cancel</button>
	      	</footer>
	    </div>
  	</div>
<script>
  var self = this
    self.on("mount", function(){
      self.title='Add'
      self.role = getCookie('role')
      self.update()
      self.readSignature()
    })

     self.on("unmount", function(){
      idSignatureStore.off('read_signature_changed',ReadSignatureChanged)
      idSignatureStore.off('add_signature_changed',AddSignatureChanged)
      idSignatureStore.off('edit_signature_changed',EditSignatureChanged)
      idSignatureStore.off('active_signature_changed',ActiveSignatureChanged)
      idSignatureStore.off('delete_signature_changed',DeleteSignatureChanged)
    })

    self.openAddSignatureModal = () => {
      self.title = 'Add'
      $("#signatureModal").addClass("is-active");
    }

    self.closeAddSignatureModal = () => {
      $("#signatureModal").removeClass("is-active");
    }

    /* Start Upload Student Image*/
	self.remove_picture = (item1, item2, e) => {
		console.log('item1'+item1)
		console.log('item2'+item2)
		var pp_box = document.getElementById(item1);
		pp_box.style.backgroundImage = "";
		document.getElementById(item2).value = ""
		event.stopPropagation();
	}

	self.trigger_file_input = (item,e) => {
		document.getElementById(item).click();
	}


     self.loadFile = (item,event) => {
		var reader = new FileReader();
		reader.onload = function (e) {
			console.log(item)
			document.getElementById(item).style.backgroundImage = 'url(' + e.target.result + ')';
			console.log(e.target.result)
			self.is_signature_image=true
		};
		reader.readAsDataURL(event.target.files[0]);
		
		console.log(event.target.files[0])
		self.signature_picture = event.target.files[0]
	}

	self.uploadSignatureImage = (type) => {
		if(self.is_signature_image == true){
    		idSignatureStore.trigger('upload_signature_image', self.signature_picture,type)
		}
    } 

	/* End */
    self.readSignature = () => {
       idSignatureStore.trigger('read_signature')
    }

     self.add = () => {
      if(!self.refs.type.value){
        toastr.info("Please enter Type and try again")
      }else{
        self.loading = true
        if(self.title=='Add'){
          console.log('Add')
          idSignatureStore.trigger('add_signature', self.refs.type.value)
        }else if(self.title=='Update'){
          console.log('update')
          idSignatureStore.trigger('edit_signature', self.refs.type.value,
            self.old_type)
        }
      }
    }

    self.cancelOperation = (e) => {
      self.signature.map(st => {
          st.confirmDelete = false
          st.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.signature.map(st => {
        if(st.type != e.item.st.type){
          st.confirmDelete = false
        }else{
          st.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      idSignatureStore.trigger('delete_signature', e.item.st.type)
    }

    self.edit = (st,e) => {
      console.log(st)
      console.log(st.type)
      self.title='Update'
      $("#signatureModal").addClass("is-active");
      self.refs.type.value = st.type
      self.old_type= st.type;
      document.getElementById('pp_box').style.backgroundImage = 'url(/images/7/signature/'+st.type+'.jpg)';
    }

    self.isActive = (st,e) => {
      console.log(st)
      console.log(st.type)
      self.type = st.type
      idSignatureStore.trigger('active_signature', self.type)
    }

    

    idSignatureStore.on('add_signature_changed',AddSignatureChanged)
    function AddSignatureChanged(signature,type){
      console.log(signature) 
      console.log(type) 
      self.signature = signature
      self.uploadSignatureImage(type)
      $("#signatureModal").removeClass("is-active");
      self.readSignature()
      self.update()
    }

    idSignatureStore.on('edit_signature_changed',EditSignatureChanged)
    function EditSignatureChanged(signature,type){
      console.log(signature)
      console.log("/****************")
      console.log(type) 
      console.log("/****************")
      self.signature = signature
      self.uploadSignatureImage(type)
      $("#signatureModal").removeClass("is-active");
      self.readSignature()
      self.update()
    }

    idSignatureStore.on('delete_signature_changed',DeleteSignatureChanged)
    function DeleteSignatureChanged(){
      self.readSignature()
      self.update()
    }

    idSignatureStore.on('active_signature_changed',ActiveSignatureChanged)
    function ActiveSignatureChanged(active_signature){
      console.log(active_signature)
      self.active_signature = active_signature
      self.readSignature()
      self.update()
    }

    idSignatureStore.on('read_signature_changed',ReadSignatureChanged)
    function ReadSignatureChanged(signature){
      /*console.log(signature)*/
      self.signature = signature
      self.update()
    }
    

    idSignatureStore.on('upload_signature_image_changed',UploadSignatureImage)
    function UploadSignatureImage(image_name){
      console.log(image_name) 
      self.signature_picture = image_name
    }

</script>
</id-signature>