<issued-certificate>
	<section class=" is-fluid">
		<div class="level">
			<div class="level-left">
				<h2 class="title" style="color: #ff3860;">Issued Certificate</h2>
			</div>
		</div>
		<div class="box">
			<div class="columns">
				<div class="column is-narrow">
					<div class="control">
						<div class="select">
							<select ref="standard_id" onchange={getReadSection}>
								<option>Choose Standard</option>
								<!-- <option value='-1'>All</option> -->
								<option each={standards} value={standard_id}>{standard}
	                            </option>
							</select>
						</div>
					</div>
				</div>
				<div class="column is-narrow">
					<div class="control">
			        	<div class="select is-fullwidth">
							<select ref="section_id">
								<option>Choose Section</option>
								<!-- <option value='-1'>All</option> -->
								<option each={readfilteredSections} value={section_id}>{section}
	                            </option>
							</select>
						</div>
			      	</div>
			    </div>
				<div class="column is-narrow">
					<button class="button is-danger has-text-weight-bold"
					onclick={readIssuedCertificateStudent} >GO
					</button>
					<!-- <input type="checkbox" id="checkTable" checked={e.done}
									    onclick={viewTable}  style="margin-top: 12px;"> Add New  -->
				</div>
				<!-- <div class="column is-narrow" show={report_view =='show_text_box'}>
					    <input class="input" ref="new_certiifcate_name" type="text">
				</div> -->
			</div>
		</div>
		<!-- <div class="box">
			<div class="columns">
				<div class="column is-narrow" show={report_view =='show_old_text_box'}>
					<div class="control">
						<div class="select">
							<select ref="certificate_id">
								<option>Choose Certificate</option>
								<option each={certificates} value={certificate_id}>{certiifcate_name}
			                            </option>
							</select>
						</div>
					</div>
				</div>
				<div class="column is-narrow" show={report_view =='show_text_box'}>
					<div class="control">
			        <input class="input" ref="new_certiifcate_name" type="text">
			      	</div>
			    </div>
			    <div class="column is-narrow">
					<div class="control">
			        <button class="button">Print</button>
			        <button class="button">Duplicate Print</button>
			      	</div>
			    </div>
			    
			</div>
		</div> -->
		<div style="height:270px; overflow-x: scroll; overflow-y:scroll ;border:solid #000 3px;">
		<table class="table is-fullwidth is-striped is-hoverable is-narrow">
			<thead>
				<tr>
					<th style="width:40px">#</th>
					<th>Student Name</th>
					<th>Certiifcate Key</th>
					<th>Class</th>
					<th>Certificate</th>
					<th>Type</th>
				</tr>
			</thead>
			<tbody>
				<tr each={st, i in issuedCertificates}>
					<td>{i+1}</td>
					<td>{st.name}</td>
					<td>{st.c_key}</td>
					<td>{st.standard}</td>
					<td>{st.certificate_name}</td>
					<td>{st.type}</td>
				</tr>
			</tbody>
		</table>
	</div>
	</section>
<!-- End Other Information -->
<script>
	
	var self = this
    self.on("mount", function(){
    	self.title='Add'
    	self.report_view = 'show_old_text_box'
    	self.readStandard()
    	self.readSection()
    	self.role = getCookie('role') 
    	 
		 // console.log(formatted.getHours())
        self.update()
        flatpickr(".date", {
	    	allowInput: true,
        	dateFormat: "d/m/Y",
  		})
    })

    self.on("unmount", function(){
      studentStore.off('read_standard_changed',StandardChanged)
      studentStore.off('read_section_changed',SectionChanged)
      certificateStore.off('read_issued_certificate_change',ReadIssuedCertificateChanged)
    })

    
    self.readStandard = () => {
       studentStore.trigger('read_standard')
    }

    self.readSection = () => {
       studentStore.trigger('read_section')
    }

    self.getReadSection = () => {
    	self.readfilteredSections = []
    	self.readfilteredSections = self.sections.filter(s => {
    		return s.standard_id == self.refs.standard_id.value
    	})
    }
    self.readIssuedCertificateStudent= () => {
       certificateStore.trigger('read_issued_certificate',self.refs.standard_id.value,self.refs.section_id.value)
    }

    

    certificateStore.on('read_issued_certificate_change',ReadIssuedCertificateChanged)
    function ReadIssuedCertificateChanged(issuedCertificates){
      console.log(issuedCertificates) 
      self.issuedCertificates = issuedCertificates
      self.update()
    }

   
    
   studentStore.on('read_standard_changed',StandardChanged)
    function StandardChanged(standards){
      console.log(standards) 
      self.standards = standards
      self.update()
    }

    studentStore.on('read_section_changed',SectionChanged)
    function SectionChanged(sections){
      console.log(sections) 
      self.sections = sections
      self.update()
      self.getReadSection()
    }
    
    
</script>
</issued-certificate>