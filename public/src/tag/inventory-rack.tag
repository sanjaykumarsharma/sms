<inventory-rack>
	<section class=" is-fluid">
		<h2 class="title has-text-centered" style="color: #ff3860;">Inventory Rack</h2>
		<div class="flex items-center mt-2 mb-6 no-print">
			<div class="bg-green py-1 rounded w-10">
				<div class="bg-grey h-px flex-auto"></div>
			</div>
		</div>
		<div class="box">
			<div class="columns">
				<div class="column is-half">
					<div class="field">
						<label class="label" for="role">Rack</label>
						<div class="control">
							<input class="input" type="text" ref="rack_name"
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
					<th>SL</th>
					<th>Rack Name</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr each={c, i in inventoryRacks}>
					<td>{ i+1 }</td>
					<td>{ c.rack_name}</td>
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
      self.readInventoryRack()
    })
    self.on("unmount", function(){
      inventoryRackStore.off('inventoryRack_changed', InventoryRackChanged)
    })

    //read courses
    self.readInventoryRack = () => {
       inventoryRackStore.trigger('read_inventory_rack')
    }

     self.add = () => {
      if(!self.refs.rack_name.value){
        toastr.info("Please enter Rack and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          console.log('create')
          inventoryRackStore.trigger('add_inventory_rack', self.refs.rack_name.value)
        }else if(self.title=='Update'){
          console.log('update')
          inventoryRackStore.trigger('edit_inventory_rack', self.refs.rack_name.value,
            self.edit_id)
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
      self.inventoryRacks.map(c => {
          c.confirmDelete = false
          c.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.inventoryRacks.map(c => {
        if(c.rack_id != e.item.c.rack_id){
          c.confirmDelete = false
        }else{
          c.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      inventoryRackStore.trigger('delete_inventory_rack', e.item.c.rack_id)
    }

    self.edit = (c,e) => {
      console.log(c)
      self.title='Update'
      self.refs.rack_name.value = c.rack_name
      self.edit_id = c.rack_id
    }
    
    inventoryRackStore.on('inventoryRack_changed',InventoryRackChanged)
    function InventoryRackChanged(inventoryRacks){
      console.log(inventoryRacks) 
      self.title='Create'
      self.refs.rack_name.value = ''
      self.loading = false
      self.inventoryRacks = inventoryRacks
      /*self.categoryDataItems = []
      self.categoryDataItems = inventoryRacks*/
      self.update()
      console.log(self.inventoryRacks)
    }

</script>
</inventory-rack>