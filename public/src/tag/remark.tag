<remark>
	<section class=" is-fluid">
		<h2 class="title" style="color: #ff3860;">Remarks</h2>
		<div class="flex items-center mt-2 mb-6 no-print">
			<div class="bg-green py-1 rounded w-10">
				<div class="bg-grey h-px flex-auto"></div>
			</div>
		</div>
		<div class="box">
			<div class="columns">
				<div class="column is-narrow">
					<label class="label">Remark</label>
				</div>
				<div class="column is-narrow">
					<div class="control">
						<div class="control">
							<input class=" input"
              ref="addRemarkInput" type="text">
						</div>
					</div>
				</div>
        <div class="column is-narrow">
          <label class="label">Short Reamrk</label>
        </div>
        <div class="column is-narrow">
          <div class="control">
            <input class=" input"
              ref="addShortRemarkInput" type="text">
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
					<th>Remark</th>
					<th>Short Remark</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr each={ev, i in remarks}>
					<td>{ i+1 }</td>
					<td>{ ev.remark}</td>
					<td>{ ev.short_remark}</td>
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
      self.readRemark()
    })
    self.on("unmount", function(){
      remarkStore.off('add_remark_changed', AddRemarkChanged)
      remarkStore.off('read_remark_changed', ReadRemarkChanged)
      remarkStore.off('edit_remark_changed',EditRemarkChanged)
      remarkStore.off('delete_remark_changed',DeleteRemarkChanged)
    })

    //read employe_roles
    self.readRemark = () => {
       remarkStore.trigger('read_remark')
    }

     self.add = () => {
      if(!self.refs.addRemarkInput.value){
        toastr.info("Please enter Remark and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          console.log('create')
          remarkStore.trigger('add_remark', self.refs.addRemarkInput.value,
          self.refs.addShortRemarkInput.value)
        }else if(self.title=='Update'){
          console.log('update')
          remarkStore.trigger('edit_remark', self.refs.addRemarkInput.value,
          self.refs.addShortRemarkInput.value,self.edit_id)
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
      self.remarks.map(ev => {
          ev.confirmDelete = false
          ev.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.remarks.map(ev => {
        if(ev.remark_id != e.item.ev.remark_id){
          ev.confirmDelete = false
        }else{
          ev.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      remarkStore.trigger('delete_remark', e.item.ev.remark_id)
    }

    self.edit = (ev,e) => {
      console.log(ev)
      self.title='Update'
      self.refs.addRemarkInput.value = ev.remark
      self.refs.addShortRemarkInput.value = ev.short_remark
      self.edit_id = ev.remark_id
    }
    
    remarkStore.on('add_remark_changed',AddRemarkChanged)
    function AddRemarkChanged(remarks){
      console.log(remarks) 
      self.title='Create'
      self.refs.addRemarkInput.value =''
      self.refs.addShortRemarkInput.value =''
      self.loading = false
      self.remarks = remarks
      self.update()
      self.readRemark()
      console.log(self.remarks)
    }

    remarkStore.on('edit_remark_changed',EditRemarkChanged)
    function EditRemarkChanged(remarks){
      console.log(remarks) 
      self.title='Update'
      self.refs.addRemarkInput.value =''
      self.refs.addShortRemarkInput.value =''
      self.loading = false
      self.remarks = remarks
      self.update()
      self.readRemark()
      //console.log(self.empremarksloye_roles)
    }

    remarkStore.on('delete_remark_changed',DeleteRemarkChanged)
    function DeleteRemarkChanged(remarks){
      console.log(remarks) 
      self.title='Create'
      self.refs.addRemarkInput.value =''
      self.refs.addShortRemarkInput.value =''
      self.loading = false
      self.remarks = remarks
      self.update()
      self.readRemark()
      console.log(self.remarks)
    }

    remarkStore.on('read_remark_changed',ReadRemarkChanged)
    function ReadRemarkChanged(remarks){
      console.log(remarks) 
      self.title='Create'
      self.refs.addRemarkInput.value =''
      self.refs.addShortRemarkInput.value =''
      self.loading = false
      self.remarks = remarks
      self.update()
      console.log(self.remarks)
    }

</script>
</remark>