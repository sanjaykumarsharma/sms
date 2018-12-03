<manage-certificate>
	<section>
	   <div class="box">
			<div class="columns">
				<div class="column is-narrow" show={report_view =='show_old_text_box'}>
					<div class="control">
						<div class="select">
							<select ref="certificate_name">
								<option>Choose Certificate</option>
								<!-- <option value='-1'>All</option> -->
								<option each={certificates} value={certificate_name}>{certificate_name}
	                            </option>
							</select>
						</div>
					</div>
				</div>
				<div class="column is-narrow">
					<!-- <button class="button is-danger has-text-weight-bold"
					onclick={addNewCertificate} >Add New
					</button> -->
					<input type="checkbox" id="checkTable" checked={e.done}
									    onclick={viewTable}  style="margin-top: 12px;"> Add New
				</div>
					<div class="column is-narrow" show={report_view =='show_text_box'}>
				    <input class="input" ref="new_certificate_name" type="text">
			</div>
			</div>
		</div>
		<div class="box">
		<div class="columns">
			<div class="column">
			<input id="x" type="hidden" name="content">
            <trix-editor input="x" ref='certificate_text' class="HI">  </trix-editor>
            </div>
            <div class="column">
			 <table class="table is-fullwidth is-striped is-hoverable is-narrow">
			 	<thead>
			 	<tr>
			 		<th>Key</th>
			 		<th>Meaning</th>
			 	</tr>
			 	<tbody>
			 		<tr>
			 			<td>|child|</td>
			 			<td>Son/Daughter</td>
			 		</tr>
			 		<tr>
			 			<td>|heshe|</td>
			 			<td>he/she</td>
			 		</tr>
			 		<tr>
			 			<td>|hesheCaps|</td>
			 			<td>He/She</td>
			 		</tr>
			 		<tr>
			 			<td>|hisher|</td>
			 			<td>his/her</td>
			 		</tr>
			 		<tr>
			 			<td>|hisherCaps|</td>
			 			<td>His/Her</td>
			 		</tr>
			 		<tr>
			 			<td>|himher|</td>
			 			<td>him/her</td>
			 		</tr>
			 		<tr>
			 			<td>|session|</td>
			 			<td>Student Acedamic Year</td>
			 		</tr>
			 		<tr>
			 			<td>|rollno|</td>
			 			<td>Student Roll's Number</td>
			 		</tr>
			 		<tr>
			 			<td>|enrollno|</td>
			 			<td>Student Enroll's Number</td>
			 		</tr>
			 		<tr>
			 			<td>|name|</td>
			 			<td>Student's Name</td>
			 		</tr>
			 		<tr>
			 			<td>|father|</td>
			 			<td>Student's Father Name</td>
			 		</tr>
			 		<tr>
			 			<td>|address|</td>
			 			<td>Student's Permanent Address</td>
			 		</tr>
			 	</tbody>
			 </thead>
			 </table>
            </div>
        </div>
    </div>

    <div class="column is-narrow">
		<button class="button is-danger has-text-weight-bold"
		onclick={addCertificate} >Save
		</button>
		<button class="button has-text-weight-bold"
		onclick={deleteCertificate} >Delete
		</button>
	</div>
	</section>
<!-- End Other Information -->
<script>
	
	var self = this
    self.on("mount", function(){
    	self.title='Add'
    	self.report_view = 'show_old_text_box'
    	self.role = getCookie('role') 
    	 self.readCertificate()
    	// self.viewTable()
		 // console.log(formatted.getHours())
        self.update()
        flatpickr(".date", {
	    	allowInput: true,
        	dateFormat: "d/m/Y",
  		})
    })


    self.on("unmount", function(){
    	 certificateStore.off('read_certificate_change',ReadCertificateChanged)
         certificateStore.off('add_certificate_change',AddCertificateChanged)
    })

    self.addCertificate=()=>{
    	if($('#checkTable').is(":checked")){
    		self.certificate_name=self.refs.new_certificate_name.value
    	}else{
	        self.certificate_name=self.refs.certificate_name.value
    	}
    	 certificateStore.trigger('add_certificate',self.refs.certificate_text.value,self.certificate_name,self.new_certificate)
    }

    self.viewTable = () => {
    	if($('#checkTable').is(":checked")){
    		self.certificate_name=self.refs.new_certificate_name.value
	        self.report_view = 'show_text_box'
    	}else{
	        self.report_view = 'show_old_text_box'
	        self.certificate_name=self.refs.certificate_name.value
    	}
    }

    self.readCertificate = () => {
       certificateStore.trigger('read_certificate')
    }

    certificateStore.on('read_certificate_changed',ReadCertificateChanged)
    function ReadCertificateChanged(certificates){
      console.log(certificates) 
      self.certificates = certificates
      self.update()
    }

    certificateStore.on('add_certificate_change',AddCertificateChanged)
    function AddCertificateChanged(id){
      console.log(id) 
      self.c_id = id
      self.update()
    }

    
   /* self.readIssuedCertificateStudent= () => {
       certificateStore.trigger('read_issued_certificate',self.refs.standard_id.value,self.refs.section_id.value)
    }

    

    certificateStore.on('read_issued_certificate_change',ReadIssuedCertificateChanged)
    function ReadIssuedCertificateChanged(issuedCertificates){
      console.log(issuedCertificates) 
      self.issuedCertificates = issuedCertificates
      self.update()
    }

   */
    
  
    
</script>
</manage-certificate>