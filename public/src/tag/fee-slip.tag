<fee-slip>
	<section class=" is-fluid">
		<h2 class="title has-text-centered" style="color: #ff3860;">Fee Slip Management</h2>
		<div class="flex items-center mt-2 mb-6 no-print">
			<div class="bg-green py-1 rounded w-10">
				<div class="bg-grey h-px flex-auto"></div>
			</div>
		</div>
		<div class="box">
			<div class="columns">
				<div class="column is-half">
					<div class="field">
						<label class="label" for="role">Slip Name</label>
						<div class="control">
							<input class="input" type="text" ref="addSlipName"
							onkeyup={addEnter}>
						</div>
					</div>
				</div>
				<div class="column is-narrow">
					<div class="field">
						<div class="control">
							<button class="button is-danger has-text-weight-bold adjusted-top"
					         onclick={add} >{title}</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<table class="table is-fullwidth is-striped is-hoverable">
			<thead>
				<tr>
					<th>#</th>
					<th>Slip Name</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr each={c, i in slips}>
					<td>{ i+1 }</td>
					<td>{ c.fee_slip_name}</td>
		          	<td class="has-text-right">
            			<div class="inline-flex rounded border border-grey overflow-hidden" hide={c.confirmDelete}>
              				<span><a class="button is-small is-rounded" onclick={edit.bind(this, c)}>Edit</a></span>
              				<span if={role=='ADMIN'}> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick={confirmDelete}>Delete</a></span>
            			</div>
            			<div class="table-buttons" if={c.confirmDelete}>
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
      self.readSlips()
    })
    self.on("unmount", function(){
      feeSlipStore.off('slips_changed', SlipsChanged)
    })

    //read courses
    self.readSlips = () => {
       feeSlipStore.trigger('read_slips')
    }

    self.add = () => {
      if(!self.refs.addSlipName.value){
        toastr.info("Please enter Slip Name and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          console.log('create')
          feeSlipStore.trigger('add_slip', self.refs.addSlipName.value)
        }else if(self.title=='Update'){
          console.log('update')
          feeSlipStore.trigger('edit_slip', self.refs.addSlipName.value,
            self.old_fee_slip_name)
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
   
   self.edit = (c,e) => {
   	  console.log("here");
      console.log(c)
      self.title='Update'
      self.refs.addSlipName.value = c.fee_slip_name
      self.old_fee_slip_name = c.fee_slip_name
    }

    self.cancelOperation = (e) => {
      self.slips.map(c => {
          c.confirmDelete = false
          c.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.slips.map(c => {
        if(c.fee_slip_name != e.item.c.fee_slip_name){
          c.confirmDelete = false
        }else{
          c.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      feeSlipStore.trigger('delete_slip', e.item.c.fee_slip_name)
    }


    feeSlipStore.on('slips_changed',SlipsChanged)
    function SlipsChanged(slips){
      console.log(slips) 
      self.title='Create'
      self.refs.addSlipName.value = ''
      self.loading = false
       self.slips = []
      self.slips = slips
      self.update()
      console.log(self.slips)
    }
    
  </script>
</fee-slip>