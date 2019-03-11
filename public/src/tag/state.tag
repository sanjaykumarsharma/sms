<state>
   <print-header></print-header> 
  <loading-bar if={loading}></loading-bar>  
	<section class="is-fluid">
   <h2 class="title has-text-centered" style="color: #ff3860;">State Details</h2>
      <div class="box no-print">
      <div class="columns">
        <div class="column is-narrow">
          <label class="label">State</label>
        </div>
        <div class="column is-narrow">
          <div class="control">
            <input class=" input"
              ref="addStateInput" type="text"  onkeyup={addEnter}>
          </div>
        </div>
        <div class="column">
          <button class="button is-danger has-text-weight-bold"
          onclick={add} >{title}
          </button>
          <button class="button is-success has-text-weight-bold is-small ml5 is-pulled-right" onclick={downloadCSV} title="Excel Down Load">
              <span class="icon">
                  <i class="far fa-file-excel"></i>
              </span>
          </button>
           <button class="button is-primary has-text-weight-bold is-pulled-right is-small ml5" onclick="window.print()" title="Print">
                  <span class="icon">
                     <i class="fas fa-print"></i>
                 </span>
        </button>
           <button class="button is-warning is-rounded is-pulled-right is-small ml5" onclick={readState} style="margin-right:5px">
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
            <label class="label" for="level">state</label>
            <div class="control">
              <input class="input" type="text" ref="addStateInput"
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
          <th>State</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr each={d, i in states}>
          <td>{i + 1}</td>
          <td>{d.state}</td>
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
      self.readState()
    })

     self.on("unmount", function(){
      stateStore.off('state_changed', StateChanged)
    })

    //read courses
    self.readState = () => {
      self.loading=true
       stateStore.trigger('read_state')
    }

     self.add = () => {
      if(!self.refs.addStateInput.value){
        toastr.info("Please enter state and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          console.log('create')
          stateStore.trigger('add_state', self.refs.addStateInput.value)
        }else if(self.title=='Update'){
          console.log('update')
          stateStore.trigger('edit_state', self.refs.addStateInput.value,
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
      self.levels.map(d => {
          d.confirmDelete = false
          d.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.states.map(d => {
        if(d.state != e.item.d.state){
          d.confirmDelete = false
        }else{
          d.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      stateStore.trigger('delete_state', e.item.d.state)
    }

    self.edit = (d,e) => {
      console.log(d)
      self.title='Update'
      self.refs.addStateInput.value = d.state
      self.edit_id = d.state
    }
    

    stateStore.on('state_changed',StateChanged)
    function StateChanged(states){
      console.log('state_changed1') 
      console.log(states) 
      self.title='Create'
      self.refs.addStateInput.value = ''
      self.loading = false
      self.states = states
      self.update()
    }

</script>
</state>