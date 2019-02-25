<bank-account-setting>
<print-header></print-header>  
	<section class=" is-fluid">
		<h2 class="title has-text-centered" style="color: #ff3860;">Bank Account Management</h2>
		<div class="flex items-center mt-2 mb-6 no-print">
			<div class="bg-green py-1 rounded w-10">
				<div class="bg-grey h-px flex-auto"></div>
			</div>
		</div>
		<div class="box no-print">
			<div class="columns">
				<div class="column is-narrow">
					<label class="label">Bank A/C No.</label>
				</div>
				<div class="column is-narrow">
					<div class="control">
						<input class=" input"
						  ref="addBankAccountInput" type="text">
					</div>
				</div>
				<div class="column is-narrow">
					<label class="label">Bank Name</label>
				</div>
				<div class="column is-narrow">
					<div class="control">
						<input class=" input"
						  ref="addBankNameInput" type="text">
					</div>
				</div>
				<div class="column is-narrow">
					<label class="label">Branch</label>
				</div>
				<div class="column is-narrow">
					<div class="control">
						<input class=" input"
						  ref="addBranchInput" type="text">
					</div>
				</div>
				<div class="column">
					<button class="button is-danger has-text-weight-bold"
					onclick={add} >{title}
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
					<th>Bank A/C No.</th>
					<th>Bank Name</th>
					<th>Branch</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr each={s, i in banks}>

					<td>{ i+1 }</td>
					<td>{ s.bank_account_no}</td>
					<td>{ s.bank_name}</td>
					<td>{ s.branch}</td>
		          	<td class="has-text-right no-print">
            			<div class="inline-flex rounded border border-grey overflow-hidden" hide={s.confirmDelete}>
              				<span><a class="button is-small is-rounded" onclick={edit.bind(this, s)}>Edit</a></span>
              				<span> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick={confirmDelete}>Delete</a></span>
              			</div>
              			<div class="table-buttons" if={s.confirmDelete}>
              				<span disabled={loading} class="button is-small is-rounded" title="Delete" onclick={delete}><i class="fa fa-check" ></i></span>
              				<span disabled={loading} class="button is-small  has-text-danger is-rounded" title="Cancel" onclick={cancelOperation}><i class="fa fa-times"></i></span>
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
      self.readBank()
    })
    self.on("unmount", function(){
      bankStore.off('read_bank_changed', ReadBankChanged)
      bankStore.off('add_bank_changed',AddBankChanged)
      bankStore.on('bank_edit_changed',EditBankChanged)
      bankStore.off('delete_event_changed',DeleteBankChanged)
    })

    //read events
    self.readBank = () => {
       bankStore.trigger('read_bank')
    }

     self.add = () => {
      if(!self.refs.addBankAccountInput.value){
        toastr.info("Please enter Event and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          console.log('create')
          bankStore.trigger('add', self.refs.addBankAccountInput.value,
           self.refs.addBankNameInput.value , self.refs.addBranchInput.value)
           self.readBank()
        }else if(self.title=='Update'){
          console.log('update')
          bankStore.trigger('bank_edit',self.refs.addBankAccountInput.value,
          self.refs.addBankNameInput.value , 
          self.refs.addBranchInput.value, self.edit_id)
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
      self.banks.map(s => {
          s.confirmDelete = false
          s.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.banks.map(s => {
        if(s.bank_account_no != e.item.s.bank_account_no){
          s.confirmDelete = false
        }else{
          s.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      bankStore.trigger('delete', e.item.s.bank_account_no)
    }
    

    self.edit = (s,e) => {
      console.log(s)
      self.title='Update'
      
      self.refs.addBankAccountInput.value = s.bank_account_no
      self.refs.addBankNameInput.value = s.bank_name
      self.refs.addBranchInput.value = s.branch
      self.edit_id = s.bank_account_no
    }
    
    

    bankStore.on('read_bank_changed',ReadBankChanged)
    function ReadBankChanged(banks){
      console.log(banks) 
      //self.title='Create'
      //self.loading = false
      self.banks = banks
      self.update()
      console.log(self.banks)
    }

    bankStore.on('add_bank_changed',AddBankChanged)
    function AddBankChanged(banks){
      console.log(banks) 
      self.title='Create'
      self.loading = false
      self.banks = banks
      self.update()
      console.log(self.banks)
    }

    bankStore.on('bank_edit_changed',EditBankChanged)
    function EditBankChanged(banks){
      console.log(banks) 
      self.title='Create'
      self.loading = false
      self.banks = banks
      self.refs.addBankAccountInput.value = ''
      self.refs.addBankNameInput.value = ''
      self.refs.addBranchInput.value = ''
      self.update()
      console.log(self.banks)
    }
    bankStore.on('delete_event_changed',DeleteBankChanged)
    function DeleteBankChanged(banks){
      console.log(banks) 
      self.title='Create'
      self.banks = banks
      self.update()
    }

</script>
</bank-account-setting>