<standard>
  <print-header></print-header> 
 <loading-bar if={loading}></loading-bar>  
	<section class="is-fluid">
    <h2 class="title has-text-centered" style="color: #ff3860;">Standard Details</h2>
      <div class="box no-print">
      <div class="columns">
        <div class="column is-narrow">
          <label class="label">Standard</label>
        </div>
        <div class="column is-narrow">
          <div class="control">
            <input class=" input"
              ref="addStandardInput" type="text" onkeyup={addEnter}>
          </div>
        </div>
        <div class="column">
          <button disabled={loading} class="button is-danger has-text-weight-bold"
          onclick={add} >{title}
          </button>
           <button class="button is-primary has-text-weight-bold is-pulled-right" onclick="window.print()" title="Print">
                  <span class="icon">
                     <i class="fas fa-print"></i>
                 </span>
        </button>
          <button class="button is-warning is-rounded is-pulled-right" onclick={readStandard} style="margin-left:5px;margin-right:5px">
          <span class="icon">
            <span class="fas fa-sync-alt"></span>
          </span>
          </button>

        </div>
      </div>
    </div>
    <!-- <div class="box">
      <div class="columns">
        <div class="column is-half">
          <div class="field">
            <label class="label" for="level">standard</label>
            <div class="control">
              <input class="input" type="text" ref="addStandardInput"
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
    </div> -->
    <table class="table is-fullwidth is-striped is-hoverable">
      <thead>
        <tr>
          <th>#</th>
          <th>Standard</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr each={d, i in standards}>
          <td>{i + 1}</td>
          <td>{d.standard}</td>
          <td class="has-text-right no-print">
            <div class="inline-flex rounded border border-grey overflow-hidden" hide={d.confirmDelete}>
              <span><a class="button is-small is-rounded" onclick={edit.bind(this, d)}>Edit</a></span>
              <span if={role=='ADMIN'}> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick={confirmDelete}>Delete</a></span>
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
      self.update()
      self.readStandard()
    })

     self.on("unmount", function(){
      standardStore.off('standard_changed', StandardChanged)
    })

    //read courses
    self.readStandard = () => {
      self.loading=true
       standardStore.trigger('read_standard')
    }

     self.add = () => {
      if(!self.refs.addStandardInput.value){
        toastr.info("Please enter standard and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          console.log('create')
          standardStore.trigger('add_standard', self.refs.addStandardInput.value)
        }else if(self.title=='Update'){
          console.log('update')
          standardStore.trigger('edit_standard', self.refs.addStandardInput.value,
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
      self.standards.map(d => {
          d.confirmDelete = false
          d.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.standards.map(d => {
        if(d.standard != e.item.d.standard){
          d.confirmDelete = false
        }else{
          d.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      standardStore.trigger('delete_standard', e.item.d.standard_id)
    }

    self.edit = (d,e) => {
      console.log(d)
      self.title='Update'
      self.refs.addStandardInput.value = d.standard
      console.log(d.standard_id);
      self.edit_id = d.standard_id
    }
    

    standardStore.on('standard_changed',StandardChanged)
    function StandardChanged(standards){
      console.log('standard_changed1') 
      console.log(standards) 
      self.title='Create'
      self.refs.addStandardInput.value = ''
      self.loading = false
      self.standards = standards
      self.update()
    }

</script>
</standard>