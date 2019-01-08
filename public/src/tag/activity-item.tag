<activity-item>
  <print-header></print-header>
  <loading-bar if={loading}></loading-bar>
	<section class=" is-fluid">	
  <h2 class="title has-text-centered is-size-5" style="color: #ff3860;">Item Management Console</h2>
    <div class="box no-print">
      <div class="columns">
        <div class="column is-narrow">
          <label class="label" for="role">Item</label>
        </div>
        <div class="column">
          <input class="input" type="text" id="item_name" ref="addItemInput" onkeyup={addEnter}>
        </div>
        <div class="column">
          <button class="button is-danger has-text-weight-bold " onclick={add} > {title} </button>
        </div>
        <div class="column">
          <button class="button is-success has-text-weight-bold ml5 is-pulled-right" onclick={csvExport}>
            <span class="icon">
              <i class="far fa-file-excel"></i>
            </span>
          </button>
          <button class="button is-primary has-text-weight-bold ml5 is-pulled-right" onclick="window.print()">
            <span class="icon">
              <i class="fas fa-print"></i>
            </span>
          </button>
          <button class="button is-link has-text-weight-bold ml5 is-pulled-right" onclick={getData}>
            <span class="icon">
              <i class="fas fa-sync-alt"></i>
            </span>
          </button>
        </div>
      </div>
    </div>
		<table class="table is-fullwidth is-bordered is-hoverable">
			<thead>
				<tr>
					<th>SL</th>
					<th>Item</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr each={r, i in Items}>
					<td>{ i+1 }</td>
					<td>{ r.item_name}</td>
          	<td class="has-text-right ">
        			<div class="inline-flex rounded border border-grey overflow-hidden no-print" hide={r.confirmDelete}>
          				<span><a class="button is-small is-rounded" onclick={edit.bind(this, r)}>Edit</a></span>
          				<span if={role=='ADMIN'}> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick={confirmDelete}>Delete</a></span>
        			</div>
        			<div class="table-buttons" if={r.confirmDelete}>
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
      self.loading = false;
      self.role = getCookie('role')
      self.update()
      self.readItems()
    })
    self.on("unmount", function(){
      activityitemStore.off('items_changed', ItemsChanged)
    })

    //read courses
    self.readItems = () => {
      self.loading = true
      activityitemStore.trigger('read_items')
    }

    self.getData = () =>{
      self.loading = true
      activityitemStore.trigger('read_items')
    }

    self.csvExport = () => {
      activityitemStore.trigger('csv_export_activity_item')
    } 

     self.add = () => {
      if(!self.refs.addItemInput.value){
        toastr.info("Please enter Item and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          console.log('create')
          activityitemStore.trigger('add_item', self.refs.addItemInput.value)
        }else if(self.title=='Update'){
          self.loading = true
          console.log('update')
          activityitemStore.trigger('edit_item', self.refs.addItemInput.value,
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
      self.Items.map(r => {
          r.confirmDelete = false
          r.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.Items.map(r => {
        if(r.item_id != e.item.r.item_id){
          r.confirmDelete = false
        }else{
          r.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      activityitemStore.trigger('delete_item', e.item.r.item_id)
    }

    self.edit = (r,e) => {
      console.log(r)
      self.title='Update'
      document.getElementById("item_name").focus()
      self.refs.addItemInput.value = r.item_name
      self.edit_id = r.item_id
    }
    
    activityitemStore.on('items_changed',ItemsChanged)
    function ItemsChanged(items){
      console.log(items) 
      self.title='Create'
      self.refs.addItemInput.value = ''
      self.loading = false
      self.Items = items
      self.update()
      console.log(self.Items)
    }

</script>
</activity-item>