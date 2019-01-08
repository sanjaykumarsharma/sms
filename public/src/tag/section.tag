<section-master>
   <header></header>
   <loading-bar if={loading}></loading-bar>  
	<section class=" is-fluid">
		<h2 class="title" style="color: #ff3860;">Sections</h2>
		<div class="box no-print">
			<div class="columns">
				<div class="column is-narrow">
					<label class="label">Standard</label>
				</div>
				<div class="column is-narrow">
					<div class="control">
						<div class="select">
							<select ref="standard_id" onkeyup={addEnter}>
								<option each={standards} value={standard_id}>{standard}
	              </option>
							</select>
						</div>
					</div>
				</div>
				<div class="column is-narrow">
					<label class="label">Section</label>
				</div>
				<div class="column is-narrow">
					<div class="control">
						<input class=" input"
						  ref="addSectionInput" type="text" onkeyup={addEnter}>
					</div>
				</div>
				<div class="column">
					<button class="button is-danger has-text-weight-bold"
					onclick={add} >{title}
					</button>
          <button class="button is-warning is-rounded is-pulled-right" onclick={readSection} style="margin-left:5px">
          <span class="icon">
            <span class="fas fa-sync-alt"></span>
          </span>
          </button>
           <button class="button is-primary has-text-weight-bold is-pulled-right" onclick="window.print()" title="Print">
                  <span class="icon">
                     <i class="fas fa-print"></i>
                 </span>
        </button>
				</div>
			</div>
		</div>
		<table class="table is-fullwidth is-striped is-hoverable">
			<thead>
				<tr>
					<th>SL</th>
					<th>Standard</th>
					<th>Section</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr each={ev, i in sections}>
					<td>{ i+1 }</td>
					<td>{ ev.standard}</td>
					<td>{ ev.section}</td>
		          	<td class="has-text-right no-print">
            			<div class="inline-flex rounded border border-grey overflow-hidden" hide={ev.confirmDelete}>
              				<span><a class="button is-small is-rounded" onclick={edit.bind(this, ev)}>Edit</a></span>
              				<span if={role=='ADMIN'}> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick={confirmDelete}>Delete</a></span>
            			</div>
            			<div class="table-buttons" if={ev.confirmDelete}>
              				<span disabled={loading} class="button is-small is-rounded" onclick={delete}><i class="fa fa-check" ></i></span>
              				<span disabled={loading} class="button is-small  has-text-danger is-rounded" onclick={cancelOperation}><i class="fa fa-times"></i></span>
            			</div>
          			</td>
				</tr>
			</tbody>
		</table>
	</section>
	<script>
	var self = this
    self.on("mount", function(){
      self.title='Create'
      self.role = getCookie('role')
      self.update()
      self.readStandard()
      self.readSection()
    })
    self.on("unmount", function(){
      sectionStore.off('add_section_changed', AddSectionChanged)
      sectionStore.off('read_section_changed', ReadSectionChanged)
      sectionStore.off('read_standard_changed',StandardChanged)
      sectionStore.off('edit_section_changed',EditSectionChanged)
      sectionStore.off('delete_section_changed',DeleteSectionChanged)
    })

    //read courses
    self.readStandard = () => {
       sectionStore.trigger('read_standard')
    }

    //read employe_roles
    self.readSection = () => {
      self.loading=true
       sectionStore.trigger('read_section')
    }

     self.add = () => {
      if(!self.refs.addSectionInput.value){
        toastr.info("Please enter Event and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          console.log('create')
          sectionStore.trigger('add_section', self.refs.addSectionInput.value,
           self.refs.standard_id.value)
        }else if(self.title=='Update'){
          console.log('update')
          sectionStore.trigger('edit_section', self.refs.addSectionInput.value,
            self.refs.standard_id.value, self.edit_id)
        }
      }
    }

    self.addEnter = (e) => {
      if(e.which == 13){
        self.add()
      }
    }

     self.editEnter = (e) => {
      if(e.which == 13){
        self.edit(e)
      }  
    }

   self.cancelOperation = (e) => {
      self.sections.map(ev => {
          ev.confirmDelete = false
          ev.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.sections.map(ev => {
        if(ev.section_id != e.item.ev.section_id){
          ev.confirmDelete = false
        }else{
          ev.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      sectionStore.trigger('delete_section', e.item.ev.section_id)
    }

    self.edit = (ev,e) => {
      console.log(ev)
      self.title='Update'
      self.refs.addSectionInput.value = ev.section
      self.refs.standard_id.value = ev.standard_id
      self.edit_id = ev.section_id
    }
    
    sectionStore.on('add_section_changed',AddSectionChanged)
    function AddSectionChanged(sections){
      console.log(sections) 
      self.title='Create'
      self.refs.addSectionInput.value = ''
      self.refs.standard_id.value = ''
      self.loading = false
      self.sections = sections
      self.update()
      self.readSection()
      console.log(self.sections)
    }

    sectionStore.on('edit_section_changed',EditSectionChanged)
    function EditSectionChanged(sections){
      console.log(sections) 
      self.title='Create'
      self.refs.addSectionInput.value = ''
      self.refs.standard_id.value = ''
      self.loading = false
      self.sections = sections
      self.update()
      self.readSection()
      //console.log(self.empsectionsloye_roles)
    }

    sectionStore.on('delete_section_changed',DeleteSectionChanged)
    function DeleteSectionChanged(sections){
      console.log(sections) 
      self.title='Create'
      self.refs.addSectionInput.value = ''
      self.refs.standard_id.value = ''
      self.loading = false
      self.sections = sections
      self.update()
      self.readSection()
      console.log(self.sections)
    }

    sectionStore.on('read_section_changed',ReadSectionChanged)
    function ReadSectionChanged(sections){
      console.log(sections) 
      self.title='Create'
      self.refs.addSectionInput.value = ''
      self.loading = false
      self.sections = sections
      self.update()
      console.log(self.sections)
    }

    sectionStore.on('read_standard_changed',StandardChanged)
    function StandardChanged(standards){
      console.log(standards) 
      self.standards = standards
      self.update()
      console.log(self.standards)
    }

</script>
</section-master>