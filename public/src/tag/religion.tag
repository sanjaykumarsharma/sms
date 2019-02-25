<religion>
  <print-header></print-header> 
   <loading-bar if={loading}></loading-bar>  
	<section class="is-fluid">
      <h2 class="title has-text-centered" style="color: #ff3860;">Religion Details</h2>
   <!--  <div class="level">
      <div class="level-left">
       <h2 class="title" style="color: #ff3860;">Religions</h2>
      </div>
    </div> -->
      <div class="box no-print">
      <div class="columns">
        <div class="column is-narrow">
          <label class="label">Religion</label>
        </div>
        <div class="column is-narrow">
          <div class="control">
            <input class=" input"
              ref="ReligionInput" type="text" onkeyup={addEnter}>
          </div>
        </div>
        <div class="column">
          <button class="button is-danger has-text-weight-bold"
          onclick={add} >{title}
          </button>
          <button class="button is-primary has-text-weight-bold is-pulled-right" onclick="window.print()" title="Print">
                  <span class="icon">
                     <i class="fas fa-print"></i>
                 </span>
          </button>
         <button class="button is-warning is-rounded is-pulled-right" onclick={readReligion} style="margin-left :5px;margin-right:5px">
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
            <label class="label" for="level">religion</label>
            <div class="control">
              <input class="input" type="text" onkeyup={addEnter} ref="ReligionInput"
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
          <th>Religion</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr each={d, i in religions}>
          <td>{i + 1}</td>
          <td>{d.religion}</td>
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
      self.loading=false
      self.update()
      self.readReligion()
    })

     self.on("unmount", function(){
      religionStore.off('religion_changed', ReligionChanged)
    })

    //read courses
    self.readReligion = () => {
      self.loading=true
       religionStore.trigger('read_religion')
    }

     self.add = () => {
      if(!self.refs.ReligionInput.value){
        toastr.info("Please enter religion and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          console.log('create')
          religionStore.trigger('add_religion', self.refs.ReligionInput.value)
          self.readReligion()
        }else if(self.title=='Update'){
          console.log('update')
          religionStore.trigger('edit_religion', self.refs.ReligionInput.value,
            self.edit_id)
          self.readReligion()
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
      self.religions.map(d => {
          d.confirmDelete = false
          d.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.religions.map(d => {
        if(d.religion != e.item.d.religion){
          d.confirmDelete = false
        }else{
          d.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      religionStore.trigger('delete_religion', e.item.d.religion_id)
    }

    self.edit = (d,e) => {
      console.log(d)
      self.title='Update'
      self.refs.ReligionInput.value = d.religion
      self.edit_id = d.religion_id
    }
    

    religionStore.on('religion_changed',ReligionChanged)
    function ReligionChanged(religions){
      console.log('religion_changed1') 
      console.log(religions) 
      self.title='Create'
      self.refs.ReligionInput.value = ''
      self.loading = false
      self.religions = religions
      self.update()
    }

</script>
</religion>