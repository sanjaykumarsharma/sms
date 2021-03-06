<inventory-unit>
   <print-header></print-header> 
  <loading-bar if={loading}></loading-bar>
	<section class=" is-fluid">
		<h2 class="title has-text-centered" style="color: #ff3860;">Inventory Unit Details</h2>
    <div class="box no-print">
      <div class="columns">
        <div class="column is-narrow">
          <label class="label">Unit</label>
        </div>
        <div class="column is-narrow">
          <div class="control">
            <input class=" input" ref="unit" id="unit" type="text" onkeyup={addEnter}>
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
          <button class="button is-warning is-rounded is-pulled-right ml5" onclick={readInventoryUnit} style="margin-left:5px">
          <span class="icon">
            <span class="fas fa-sync-alt"></span>
          </span>
          </button>

           <button class="button is-primary has-text-weight-bold is-pulled-right ml5" onclick="window.print()" title="Print">
                  <span class="icon">
                     <i class="fas fa-print"></i>
                 </span>
        </button>
           <input class="input is-pulled-right" ref="searchInventoryUnit" onkeyup={filteredInventoryUnit} type="text" style="width:200px;margin-right:5px;" placeholder="Search" >
        </div>
      </div>
    </div>
		<table class="table is-fullwidth is-striped is-hoverable">
			<thead>
				<tr>
					<th>SL</th>
					<th>Unit</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr each={c, i in filteredInventoryUnits}>
					<td>{ i+1 }</td>
					<td>{ c.unit}</td>
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
      self.readInventoryUnit()
    })
    self.on("unmount", function(){
      inventoryUnitStore.off('inventoryUnit_changed', InventoryUnitChanged)
      inventoryUnitStore.off('csv_export_inventory_unit_changed',csvInventoryUnitChanged)
    })


      self.filteredInventoryUnit = ()=>{
        self.filteredInventoryUnits = self.inventoryUnits.filter(c => {
          return JSON.stringify(c).toLowerCase().indexOf(self.refs.searchInventoryUnit.value.toLowerCase())>=0
        })
      } 

    //read courses
    self.readInventoryUnit = () => {
      self.loading=true;
      inventoryUnitStore.trigger('read_inventory_unit')
    }
    self.downloadCSV = () => {
      inventoryUnitStore.trigger('csv_export_inventory_unit',self.inventoryUnits)
    }
    self.add = () => {
      if(!self.refs.unit.value){
        toastr.info("Please enter Unit and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          console.log('creaadd_inventory_unit')
          inventoryUnitStore.trigger('add_inventory_unit', self.refs.unit.value)
        }else if(self.title=='Update'){
          console.log('update')
          inventoryUnitStore.trigger('edit_inventory_unit', self.refs.unit.value,
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
      self.inventoryUnits.map(c => {
          c.confirmDelete = false
          c.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.inventoryUnits.map(c => {
        if(c.unit_id != e.item.c.unit_id){
          c.confirmDelete = false
        }else{
          c.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      inventoryUnitStore.trigger('delete_inventory_unit', e.item.c.unit_id)
    }

    self.edit = (c,e) => {
      console.log(c)
      self.title='Update'
      document.getElementById("unit").focus()
      self.refs.unit.value = c.unit
      self.edit_id = c.unit_id
    }
    
    inventoryUnitStore.on('inventoryUnit_changed',InventoryUnitChanged)
    function InventoryUnitChanged(inventoryUnits){
      console.log(inventoryUnits) 
      self.title='Create'
      self.refs.unit.value = ''
      self.loading = false
      self.inventoryUnits = inventoryUnits
      self.filteredInventoryUnits = inventoryUnits
      /*self.categoryDataItems = []
      self.categoryDataItems = inventoryUnits*/
      self.update()
      console.log(self.inventoryUnits)
    }
    inventoryUnitStore.on('csv_export_inventory_unit_changed',csvInventoryUnitChanged)
    function csvInventoryUnitChanged(url){
      var open_url = window.location.origin+url 
      window.open(open_url);
      self.loading = false
      self.update()
    }

</script>
</inventory-unit>