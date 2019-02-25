<class-teacher>
    <print-header></print-header> 
   <loading-bar if={loading}></loading-bar>  
	<section class=" is-fluid">
		<div class="level">
			<div class="level-left">
				<h2 class="title" style="color: #ff3860;">Class Teacher Standard Map</h2>
			</div>
			<div class="level-right">
				<button class="button is-warning is-rounded" id="teacherModal" onclick={addTeacher}>
					<span class="icon">
						<span class="fas fa-plus"></span>
					</span>
					<span>ADD</span>
				</button>
			</div>
		</div>
		<!-- Open addTeacherModal Modal Start -->
		<div id="showItemModal" class="modal ">
		  <div class="modal-background"></div>
		  <div class="modal-card">
		    <header class="modal-card-head">
		      <p class="modal-card-title">Add New Teacher</p>
		    </header>
		    <section class="modal-card-body">
		        <div class="column is-narrow">
		      		<label class="label">Standard</label>
		      	</div>
  				<div class="column ">
  					<div class="control">
  						<div class="select">
  							<select ref="standardIdInput" onchange={readSection}>
  								<option>Select Standard</option>
  								<option each={standard} value={standard_id}>{standard}
  			          </option>
  							</select>
  						</div>
  					</div>
  				</div>
  				<div class="column">
  					<label class="label">Section</label>
  				</div>
  				<div class="column">
  					<div class="control">
  						<div class="select">
  							<select ref="sectionIdInput">
  								<option each={section} value={section_id}>{section}
  			                    </option>
  							</select>
  						</div>
  					</div>
  				</div>
  				<div class="column is-narrow">
  					<label class="label">Room No.</label>
  				</div>
  				<div class="column">
  					<div class="control">
  						<input class="input" type="text" ref="addRoomNoInput"
  						onkeyup={addEnter}>
  					</div>
  				</div>
  				<div class="column is-narrow">
  					<label class="label">Class Teacher</label>
  				</div>
  				<div class="column ">
  					<div class="control">
  						<div class="select">
  							<select ref="sectionIdInput">
  								<option each={section} value={section_id}>{section}
  			          </option>
  							</select>
  						</div>
  					</div>
  				</div>
  				<div class="column is-narrow">
  					<label class="label">Assistant Class Teacher</label>
  				</div>
  				<div class="column is-narrow">
  					<div class="control">
  						<div class="select">
  							<select ref="sectionIdInput">
  								<option each={section} value={section_id}>{section}
  			                    </option>
  							</select>
  						</div>
  					</div>
  				</div>
		    </section>
		    <footer class="modal-card-foot">
		      <button class="button is-success" id="" onclick={add}>Add</button>
		      <button class="button is-danger" id="teacher-modal-close">Cancel</button>
		    </footer>
		  </div>
		</div>
		<!-- addTeacherModal Modal End -->
		<table class="table is-fullwidth is-striped is-hoverable">
			<thead>
				<tr>
					<th>SL</th>
					<th>Category</th>
					<th>Event</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr each={ev, i in eventDataItems}>
					<td>{ i+1 }</td>
					<td>{ ev.category_name}</td>
					<td>{ ev.event_name}</td>
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
      self.readStandard()
    })
    self.on("unmount", function(){
      classTeacherStore.off('read_standard_changed',StandardChanged)
      classTeacherStore.off('read_section_by_standardchanged',SectionChanged)
    })

    //read courses
    self.readStandard = () => {
       classTeacherStore.trigger('read_standard')
    }

    //read section
    self.readSection = () =>{
    	classTeacherStore.trigger('read_section_by_standard', self.refs.standardIdInput.value)
    	console.log(self.refs.standardIdInput.value)

    }

    self.addTeacher = () =>{
    	$("#teacherModal").click(function() {
  			$("#showItemModal").addClass("is-active");
		});

		$("#teacher-modal-close").click(function() {
		   $("#showItemModal").removeClass("is-active");
		   self.itemList()

		});
    }

     self.add = () => {
      if(!self.refs.addEventInput.value){
        toastr.info("Please enter Event and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          console.log('create')
          classTeacherStore.trigger('add_event', self.refs.addEventInput.value,
           self.refs.category_id.value)
        }else if(self.title=='Update'){
          console.log('update')
          classTeacherStore.trigger('edit_event', self.refs.addEventInput.value,
            self.refs.category_id.value, self.edit_id)
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
      self.events.map(ev => {
          ev.confirmDelete = false
          ev.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.events.map(ev => {
        if(ev.event_id != e.item.ev.event_id){
          ev.confirmDelete = false
        }else{
          ev.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      classTeacherStore.trigger('delete_event', e.item.ev.event_id)
    }

    self.edit = (ev,e) => {
      console.log(ev)
      self.title='Update'
      self.refs.addEventInput.value = ev.events
      self.refs.category_id.value = ev.category_id
      self.edit_id = ev.event_id
    }
    
   

    classTeacherStore.on('read_standard_changed',StandardChanged)
    function StandardChanged(standard){
      console.log(standard) 
      self.standard = standard
      self.update()
      console.log(self.standard)
    }
    classTeacherStore.on('read_section_by_standardchanged',SectionChanged)
    function SectionChanged(section){
      console.log(section) 
      self.section = section
      self.update()
      console.log(self.section)
    }

</script>
</class-teacher>