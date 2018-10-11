<level>
	<section class="is-fluid">
    <h2 class="title" style="color: #ff3860;">Levels</h2>
    <div class="flex items-center mt-2 mb-6 no-print">
      <div class="bg-green py-1 rounded w-10">
        <div class="bg-grey h-px flex-auto"></div>
      </div>
    </div>
    <div class="box">
      <div class="columns">
        <div class="column is-half">
          <div class="field">
            <label class="label" for="level">Level</label>
            <div class="control">
              <input class="input" type="text" ref="addLevelInput"
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
          <th>#</th>
          <th>Level</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr each={d, i in levels}>
          <td>{i + 1}</td>
          <td>{d.level}</td>
          <td class="has-text-right">
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
      self.readLevel()
    })

     self.on("unmount", function(){
      levelStore.off('level_changed', LevelChanged)
    })

    //read courses
    self.readLevel = () => {
       levelStore.trigger('read_level')
    }

     self.add = () => {
      if(!self.refs.addLevelInput.value){
        toastr.info("Please enter Levle and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          console.log('create')
          levelStore.trigger('add_level', self.refs.addLevelInput.value)
        }else if(self.title=='Update'){
          console.log('update')
          levelStore.trigger('edit_level', self.refs.addLevelInput.value,
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
      self.levels.map(d => {
        if(d.level_id != e.item.d.level_id){
          d.confirmDelete = false
        }else{
          d.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      levelStore.trigger('delete_level', e.item.d.level_id)
    }

    self.edit = (d,e) => {
      console.log(d)
      self.title='Update'
      self.refs.addLevelInput.value = d.level
      self.edit_id = d.level_id
    }
    

    levelStore.on('level_changed',LevelChanged)
    function LevelChanged(levels){
      console.log('level_changed1') 
      console.log(levels) 
      self.title='Create'
      self.refs.addLevelInput.value = ''
      self.loading = false
      self.levels = levels
      self.levels = []
      self.levels = levels
      self.update()
      console.log(self.levels)
      console.log('self.levels')
    }

</script>
</level>