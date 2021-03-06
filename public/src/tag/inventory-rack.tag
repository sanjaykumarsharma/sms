<inventory-rack>
  <print-header></print-header> 
  <loading-bar if={loading}></loading-bar>
	<section class=" is-fluid">
		<h2 class="title has-text-centered" style="color: #ff3860;">Inventory Rack Details</h2>
    <div class="box no-print">
      <div class="columns">
        <div class="column is-narrow">
          <label class="label">Rack</label>
        </div>
        <div class="column is-narrow">
          <div class="control">
            <input class=" input" ref="rack_name"  id="rack_name" type="text" onkeyup={addEnter}>
          </div>
        </div>
        <div class="column">
          <button disabled={loading} class="button is-danger has-text-weight-bold"
          onclick={add} >{title}
          </button>
           <button class="button is-success has-text-weight-bold ml5 is-pulled-right" onclick={downloadCSV} title="Excel Down Load">
              <span class="icon">
                  <i class="far fa-file-excel"></i>
              </span>
          </button>
          <button class="button is-warning is-rounded is-pulled-right ml5" onclick={readRack} style="margin-left:5px">
          <span class="icon">
            <span class="fas fa-sync-alt"></span>
          </span>
          </button>

           <button class="button is-primary has-text-weight-bold is-pulled-right ml5" onclick="window.print()" title="Print">
                  <span class="icon">
                     <i class="fas fa-print"></i>
                 </span>
        </button>
          <input class="input is-pulled-right" ref="searchInventoryRack" onkeyup={filteredInventoryRack} type="text" style="width:200px;margin-right:5px;" placeholder="Search" >
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
				<tr each={c, i in filteredInventoryRacks}>
					<td>{ i+1 }</td>
					<td>{ c.rack_name}</td>
		          	<td class="has-text-right no-print">
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
      inventoryRackStore.off('csv_export_inventory_rack_changed',csvInventoryRackChanged)
    })

      self.filteredInventoryRack = ()=>{
        self.filteredInventoryRacks = self.inventoryRacks.filter(c => {
          return JSON.stringify(c).toLowerCase().indexOf(self.refs.searchInventoryRack.value.toLowerCase())>=0
        })
      } 
    //read courses
    self.readInventoryRack = () => {
      self.loading=true
       inventoryRackStore.trigger('read_inventory_rack')
    }

    self.downloadCSV = () => {
      inventoryRackStore.trigger('csv_export_inventory_rack',self.inventoryRacks)
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
      document.getElementById("rack_name").focus()
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
      self.filteredInventoryRacks = inventoryRacks
      /*self.categoryDataItems = []
      self.categoryDataItems = inventoryRacks*/
      self.update()
      console.log(self.inventoryRacks)
    }

    inventoryRackStore.on('csv_export_inventory_rack_changed',csvInventoryRackChanged)
    function csvInventoryRackChanged(url){
      var open_url = window.location.origin+url 
      window.open(open_url);
      self.loading = false
      self.update()
     }

</script>
</inventory-rack>