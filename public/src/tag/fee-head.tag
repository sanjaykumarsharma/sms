<fee-head>
	<section class=" is-fluid">
		<h2 class="title has-text-centered" style="color: #ff3860;">Fee Head Management</h2>
		<div class="flex items-center mt-2 mb-6 no-print">
			<div class="bg-green py-1 rounded w-10">
				<div class="bg-grey h-px flex-auto"></div>
			</div>
		</div>
		<div class="box">
			<div class="columns">
				<div class="column is-half">
					<div class="field">
						<label class="label" for="role">Head</label>
						<div class="control">
							<input class="input" type="text" ref="addHeadInput"
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
					<th>Head</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr each={c, i in heads}>
					<td>{ i+1 }</td>
					<td>{ c.head}</td>
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
      self.readHeads()
    })
    self.on("unmount", function(){
      feeHeadStore.off('heads_changed', HeadsChanged)
    })

    //read courses
    self.readHeads = () => {
       feeHeadStore.trigger('read_heads')
    }

    self.add = () => {
      if(!self.refs.addHeadInput.value){
        toastr.info("Please enter Head and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          console.log('create')
          feeHeadStore.trigger('add_head', self.refs.addHeadInput.value)
        }else if(self.title=='Update'){
          console.log('update')
          feeHeadStore.trigger('edit_head', self.refs.addHeadInput.value,
            self.head_id)
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
      self.refs.addHeadInput.value = c.head
      self.head_id = c.head_id
    }

    self.cancelOperation = (e) => {
      self.heads.map(c => {
          c.confirmDelete = false
          c.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.heads.map(c => {
        if(c.head_id != e.item.c.head_id){
          c.confirmDelete = false
        }else{
          c.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      feeHeadStore.trigger('delete_head', e.item.c.head_id)
    }


    feeHeadStore.on('heads_changed',HeadsChanged)
    function HeadsChanged(heads){
      console.log(heads) 
      self.title='Create'
      self.refs.addHeadInput.value = ''
      self.loading = false
       self.heads = []
      self.heads = heads
      self.update()
      console.log(self.heads)
    }
    
  </script>
</fee-head>