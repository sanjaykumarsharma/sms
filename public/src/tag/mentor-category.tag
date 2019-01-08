<mentor-category>
  <header></header>
  <loading-bar if={loading}></loading-bar>
	<section class=" is-fluid">
  <h2 class="title has-text-centered is-size-5" style="color: #ff3860;">Mentor Category Management</h2>
    <div class="box no-print">
      <div class="columns">
        <div class="column is-narrow">
          <label class="label" for="role">Category</label>
        </div>
        <div class="column">
          <input class="input" type="text" ref="addMentorCategoryInput" id="addMentorCategoryInput" 
              onkeyup={addEnter}>
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
					<th>Category</th>
					<th class="no-print"></th>
				</tr>
			</thead>
			<tbody>
				<tr each={mc, i in mentor_categories}>
					<td>{ i+1 }</td>
					<td>{ mc.category_name}</td>
          	<td class="has-text-right no-print">
        			<div class="inline-flex rounded border border-grey overflow-hidden" hide={mc.confirmDelete}>
          				<span><a class="button is-small is-rounded" onclick={edit.bind(this, mc)}>Edit</a></span>
          				<span if={role=='ADMIN'}> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick={confirmDelete}>Delete</a></span>
        			</div>
        			<div class="table-buttons" if={mc.confirmDelete}>
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
      document.getElementById("addMentorCategoryInput").focus()
      self.update()
      self.readCategories()
    })
    self.on("unmount", function(){
      mentorcategoryStore.off('mentor_category_changed',MentorCategoryChanged)
    })

    //read Category
    self.readCategories = () => {
       mentorcategoryStore.trigger('read_mentor_category')
    }

    self.getData = () =>{
      self.loading = true
      mentorcategoryStore.trigger('read_mentor_category')
    }

    self.csvExport = () => {
      mentorcategoryStore.trigger('csv_export_mentor_category')
    }

     self.add = () => {
      if(!self.refs.addMentorCategoryInput.value){
        toastr.info("Please enter Category and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          console.log('create')
          mentorcategoryStore.trigger('add_mentor_category', self.refs.addMentorCategoryInput.value)
        }else if(self.title=='Update'){
          console.log('update')
          mentorcategoryStore.trigger('edit_mentor_category', self.refs.addMentorCategoryInput.value,self.edit_id)
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
      self.mentor_categories.map(mc => {
          mc.confirmDelete = false
          mc.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.mentor_categories.map(mc => {
        if(mc.category_id != e.item.mc.category_id){
          mc.confirmDelete = false
        }else{
          mc.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      mentorcategoryStore.trigger('delete_mentor_category', e.item.mc.category_id)
    }

    self.edit = (mc,e) => {
      self.title='Update'
      document.getElementById("addMentorCategoryInput").focus()
      self.refs.addMentorCategoryInput.value = mc.category_name
      self.edit_id = mc.category_id
    }
    
    mentorcategoryStore.on('mentor_category_changed',MentorCategoryChanged)
    function MentorCategoryChanged(mentor_categories){
      console.log(mentor_categories) 
      self.title='Create'
      self.refs.addMentorCategoryInput.value = ''
      self.loading = false
      self.mentor_categories = mentor_categories
      self.update()
      console.log(self.mentor_categories)
    }

</script>
</mentor-category>