<parentgroup>
	<section class=" is-fluid">
		<h2 class="title" style="color: #ff3860;">Parent Groups</h2>
		<div class="flex items-center mt-2 mb-6 no-print">
			<div class="bg-green py-1 rounded w-10">
				<div class="bg-grey h-px flex-auto"></div>
			</div>
		</div>
		<div class="box">
			<div class="columns">
				<div class="column is-narrow">
					<label class="label">Group Name</label>
				</div>
				<div class="column is-narrow">
					<div class="control">
						<div class="control">
							<input class=" input"
              ref="addPGNameInput" type="text">
						</div>
					</div>
				</div>
        <div class="column is-narrow">
          <label class="label">Detail</label>
        </div>
        <div class="column is-narrow">
          <div class="control">
            <textarea class=" input"
              ref="addPGDetailInput" type="text"></textarea> 
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
					<th>Group Name</th>
					<th>Detail</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr each={ev, i in parentGroups}>
					<td>{ i+1 }</td>
					<td>{ ev.pgroup_name}</td>
					<td>{ ev.pgroup_detail}</td>
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
      self.readParentGroup()
    })
    self.on("unmount", function(){
      parentgroupStore.off('add_parentgroup_changed', AddParentGroupChanged)
      parentgroupStore.off('read_parentgroup_changed', ReadParentGroupChanged)
      parentgroupStore.off('edit_parentgroup_changed',EditParentGroupChanged)
      parentgroupStore.off('delete_parentgroup_changed',DeleteParentGroupChanged)
    })

    //read employe_roles
    self.readParentGroup = () => {
       parentgroupStore.trigger('read_parentgroup')
    }

     self.add = () => {
      if(!self.refs.addPGNameInput.value){
        toastr.info("Please enter ParentGroup and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          console.log('create')
          parentgroupStore.trigger('add_parentgroup', self.refs.addPGNameInput.value,
          self.refs.addPGDetailInput.value)
        }else if(self.title=='Update'){
          console.log('update')
          parentgroupStore.trigger('edit_parentgroup', self.refs.addPGNameInput.value,
          self.refs.addPGDetailInput.value,self.edit_id)
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
      self.parentGroups.map(ev => {
          ev.confirmDelete = false
          ev.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.parentGroups.map(ev => {
        if(ev.pgroup_id != e.item.ev.pgroup_id){
          ev.confirmDelete = false
        }else{
          ev.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      parentgroupStore.trigger('delete_parentgroup', e.item.ev.pgroup_id)
    }

    self.edit = (ev,e) => {
      console.log(ev)
      self.title='Update'
      self.refs.addPGNameInput.value = ev.pgroup_name
      self.refs.addPGDetailInput.value = ev.pgroup_detail
      self.edit_id = ev.pgroup_id
    }
    
    parentgroupStore.on('add_parentgroup_changed',AddParentGroupChanged)
    function AddParentGroupChanged(parentGroups){
      console.log(parentGroups) 
      self.title='Create'
       self.refs.addPGNameInput.value =''
      self.refs.addPGDetailInput.value =''
      self.loading = false
      self.parentGroups = parentGroups
      self.update()
      self.readParentGroup()
      console.log(self.parentGroups)
    }

    parentgroupStore.on('edit_parentgroup_changed',EditParentGroupChanged)
    function EditParentGroupChanged(parentGroups){
      console.log(parentGroups) 
      self.title='Update'
      self.refs.addPGNameInput.value =''
      self.refs.addPGDetailInput.value =''
      self.loading = false
      self.parentGroups = parentGroups
      self.update()
      self.readParentGroup()
      //console.log(self.empparentGroupsloye_roles)
    }

    parentgroupStore.on('delete_parentgroup_changed',DeleteParentGroupChanged)
    function DeleteParentGroupChanged(parentGroups){
      console.log(parentGroups) 
      self.title='Create'
      self.refs.addPGNameInput.value =''
      self.refs.addPGDetailInput.value =''
      self.loading = false
      self.parentGroups = parentGroups
      self.update()
      self.readParentGroup()
      console.log(self.parentGroups)
    }

    parentgroupStore.on('read_parentgroup_changed',ReadParentGroupChanged)
    function ReadParentGroupChanged(parentGroups){
      console.log(parentGroups) 
      self.title='Create'
     self.refs.addPGNameInput.value =''
      self.refs.addPGDetailInput.value =''
      self.loading = false
      self.parentGroups = parentGroups
      self.update()
      console.log(self.parentGroups)
    }

</script>
</parentgroup>