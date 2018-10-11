<infirmary-case>
	<section class=" is-fluid">
		<h2 class="title" style="color: #ff3860;">Infirmary Case</h2>
		<div class="flex items-center mt-2 mb-6 no-print">
			<div class="bg-green py-1 rounded w-10">
				<div class="bg-grey h-px flex-auto"></div>
			</div>
		</div>
		<div class="box">
			<div class="columns">
				<div class="column is-narrow">
					<label class="label">Category</label>
				</div>
				<div class="column is-narrow">
					<div class="control">
						<div class="select">
							<select ref="category_id">
								<option each={infirmaryCategories} value={category_id}>{category_name}
	              </option>
							</select>
						</div>
					</div>
				</div>
				<div class="column is-narrow">
					<label class="label">Case</label>
				</div>
				<div class="column is-narrow">
					<div class="control">
						<input class=" input"
						  ref="infirmary_case" type="text">
					</div>
				</div>
				<div class="column">
					<button class="button is-danger has-text-weight-bold"
					onclick={add} >{title}
					</button>
				</div>
			</div>
		</div>
		<table class="table is-fullwidth is-striped is-hoverable">
			<thead>
				<tr>
					<th>SL</th>
					<th>Category</th>
					<th>Case</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr each={ev, i in infirmaryCases}>
					<td>{ i+1 }</td>
					<td>{ ev.category_name}</td>
					<td>{ ev.case_name}</td>
		          	<td class="has-text-right">
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
      self.readInfirmaryCategory()
      self.readInfirmaryCase()
    })
    self.on("unmount", function(){
      infirmarycaseStore.off('add_infirmary_case_changed', AddInfirmaryCaseChanged)
      infirmarycaseStore.off('read_infirmary_case_changed', ReadInfirmaryCaseChanged)
      infirmarycaseStore.off('read_infirmary_category_changed',InfirmaryCategoryChanged)
      infirmarycaseStore.off('edit_infirmary_case_changed',EditInfirmaryCaseChanged)
      infirmarycaseStore.off('delete_infirmary_case_changed',DeleteInfirmaryCaseChanged)
    })

    //read courses
    self.readInfirmaryCategory = () => {
       infirmarycaseStore.trigger('read_infirmary_category')
    }

    //read employe_roles
    self.readInfirmaryCase = () => {
       infirmarycaseStore.trigger('read_infirmary_case')
    }

     self.add = () => {
      if(!self.refs.infirmary_case.value){
        toastr.info("Please enter Event and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          console.log('create')
          infirmarycaseStore.trigger('add_infirmary_case', self.refs.infirmary_case.value,
           self.refs.category_id.value)
        }else if(self.title=='Update'){
          console.log('update')
          infirmarycaseStore.trigger('edit_infirmary_case', self.refs.infirmary_case.value,
            self.refs.category_id.value, self.edit_id)
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
      self.infirmaryCases.map(ev => {
          ev.confirmDelete = false
          ev.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.infirmaryCases.map(ev => {
        if(ev.case_id != e.item.ev.case_id){
          ev.confirmDelete = false
        }else{
          ev.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      infirmarycaseStore.trigger('delete_infirmary_case', e.item.ev.case_id)
    }

    self.edit = (ev,e) => {
      console.log(ev)
      self.title='Update'
      self.refs.infirmary_case.value = ev.case_name
      self.refs.category_id.value = ev.category_id
      self.edit_id = ev.case_id
    }
    
    infirmarycaseStore.on('add_infirmary_case_changed',AddInfirmaryCaseChanged)
    function AddInfirmaryCaseChanged(infirmaryCases){
      console.log(infirmaryCases) 
      self.title='Create'
      self.refs.infirmary_case.value = ''
      self.refs.category_id.value = ''
      self.loading = false
      self.infirmaryCases = infirmaryCases
      self.update()
      self.readInfirmaryCase()
      console.log(self.infirmaryCases)
    }

    infirmarycaseStore.on('edit_infirmary_case_changed',EditInfirmaryCaseChanged)
    function EditInfirmaryCaseChanged(infiramryCases){
      console.log(infiramryCases) 
      self.title='Create'
      self.refs.infirmary_case.value = ''
      self.refs.category_id.value = ''
      self.loading = false
      self.infiramryCases = infiramryCases
      self.update()
      self.readInfirmaryCase()
      //console.log(self.empinfiramryCasesloye_roles)
    }

    infirmarycaseStore.on('delete_infirmary_case_changed',DeleteInfirmaryCaseChanged)
    function DeleteInfirmaryCaseChanged(infiramryCases){
      console.log(infiramryCases) 
      self.title='Create'
      self.refs.infirmary_case.value = ''
      self.refs.category_id.value = ''
      self.loading = false
      self.infiramryCases = infiramryCases
      self.update()
      self.readInfirmaryCase()
      console.log(self.infiramryCases)
    }

    infirmarycaseStore.on('read_infirmary_case_changed',ReadInfirmaryCaseChanged)
    function ReadInfirmaryCaseChanged(infirmaryCases){
      console.log(infirmaryCases) 
      self.title='Create'
      self.refs.infirmary_case.value = ''
      self.loading = false
      self.infirmaryCases = infirmaryCases
      self.update()
      console.log(self.infirmaryCases)
    }

    infirmarycaseStore.on('read_infirmary_category_changed',InfirmaryCategoryChanged)
    function InfirmaryCategoryChanged(infirmaryCategories){
      console.log(infirmaryCategories) 
      self.infirmaryCategories = infirmaryCategories
      self.update()
      console.log(self.infirmaryCategories)
    }

</script>
</infirmary-case>