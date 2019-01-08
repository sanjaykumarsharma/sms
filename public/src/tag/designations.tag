<designations>
  <header></header>
	 <loading-bar if={loading}></loading-bar>  
  <section class="is-fluid">
        <h2 class="title has-text-centered" style="color: #ff3860;">Designation Details</h2>
    <div class="box no-print" >
    <div class="columns">
      <div class="column is-narrow">
        <label class="label">Designation</label>
      </div>
      <div class="column is-narrow">
        <input class="input  form-control input" id="addDesignationInput" ref="addDesignationInput" tabindex="0" type="text"  onkeyup={addEnter}>
      </div>
      <div class="column">
        <button disabled={loading} class="button is-danger has-text-weight-bold"
        onclick={add}>{title}
        </button>
        <button class="button is-warning is-rounded is-pulled-right" onclick={readDesignations} style="margin-left:5px;margin-right:5px">
        <span class="icon">
          <span class="fas fa-sync-alt"></span>
        </span>
        </button>
        <button class="button is-primary has-text-weight-bold is-pulled-right" onclick="window.print()" title="Print">
          <span class="icon"> <i class="fas fa-print"></i></span>
        </button>
      </div>
    </div>
  </div>  
    <table class="table is-fullwidth is-striped is-hoverable">
      <thead>
        <tr>
          <th>#</th>
          <th>Designation</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr each={d, i in designations}>
          <td>{i + 1}</td>
          <td>{d.designation}</td>
          <td class="has-text-right no-print">
            <div class="inline-flex rounded border border-grey overflow-hidden" hide={d.confirmDelete}>
              <span><a class="button is-small is-rounded" onclick={edit.bind(this, d)}>Edit</a></span>
              <span> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick={confirmDelete}>Delete</a></span>
            </div>
            <div class="table-buttons" if={d.confirmDelete}>
              <span disabled={loading} class="button is-small is-rounded" onclick={delete}><i class="fa fa-check" ></i></span>
              <soan disabled={loading} class="button is-small  has-text-danger is-rounded" onclick={cancelOperation}><i class="fa fa-times"></i></span>
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
      self.loading = false;
      self.update()
      self.readDesignations()
    })

     self.on("unmount", function(){
      designationStore.off('designations_changed', DesignationsChanged)
    })

    //read courses
    self.readDesignations = () => {
        self.loading = true;
       designationStore.trigger('read_designations')
    }

     self.add = () => {
      if(!self.refs.addDesignationInput.value){
        toastr.info("Please enter Designation and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          console.log('create')
          designationStore.trigger('add_designation', self.refs.addDesignationInput.value)
          self.readDesignations()
        }else if(self.title=='Update'){
          console.log('update')
          designationStore.trigger('edit_designation', self.refs.addDesignationInput.value,self.edit_id)
         self.readDesignations()
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
      self.designations.map(d => {
          d.confirmDelete = false
          d.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.designations.map(d => {
        console.log("hhjjsd")
        console.log(e.item.d.designation_id)
        if(d.designation_id != e.item.d.designation_id){
          d.confirmDelete = false
        }else{
          d.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      designationStore.trigger('delete_designation', e.item.d.designation_id)
    }

    self.edit = (d,e) => {
      console.log(d)
      self.title='Update'
      self.refs.addDesignationInput.value = d.designation
      self.edit_id = d.designation_id
    }
    

    designationStore.on('designations_changed',DesignationsChanged)
    function DesignationsChanged(designations){
      console.log('designations_changed1') 
      console.log(designations) 
      self.title='Create'
      self.refs.addDesignationInput.value = ''
      self.loading = false
      self.designations = designations
      self.designations = []
      self.designations = designations
      self.update()
      console.log(self.designations)
      console.log('self.designations')
    }

</script>
</designations>