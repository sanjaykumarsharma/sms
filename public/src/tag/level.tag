<level>
  <print-header></print-header> 
   <loading-bar if={loading}></loading-bar>  
	<section class="is-fluid">
    <h2 class="title has-text-centered" style="color: #ff3860;">Level Details</h2>
    <div class="box no-print" >
    <div class="columns">
      <div class="column is-narrow">
        <label class="label">Level</label>
      </div>
      <div class="column is-narrow">
        <input class="input  form-control input" id="addLevelInput" ref="addLevelInput" tabindex="0" type="text"  onkeyup={addEnter}>
      </div>
      <div class="column">
        <button disabled={loading} class="button is-danger has-text-weight-bold"
        onclick={add}>{title}
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
        <button class="button is-warning is-rounded is-pulled-right is-small ml5" onclick={readLevel} style="margin-right:2px">
        <span class="icon">
          <span class="fas fa-sync-alt"></span>
        </span>
        </button>
         <input class="input is-pulled-right" ref="searchLevel" onkeyup={filteredLevel} type="text" style="width:200px;margin-right:5px" placeholder="Search">
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
        <tr each={d, i in filteredLevels}>
          <td>{i + 1}</td>
          <td>{d.level}</td>
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
      self.readLevel()
    })

     self.on("unmount", function(){
      levelStore.off('level_changed', LevelChanged)
      levelStore.off('csv_export_Level_changed',csv_export_LevelChanged)
    })

    self.downloadCSV = () =>{
          levelStore.trigger('csv_export_Level')
        //  console.log(obj)
    }

     self.filteredLevel = ()=>{
      self.filteredLevels = self.levels.filter(c => {
        return JSON.stringify(c).toLowerCase().indexOf(self.refs.searchLevel.value.toLowerCase())>=0
      })
    } 

    //read courses
    self.readLevel = () => {
      self.loading=true
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
      self.filteredLevels = levels
      self.update()
      console.log(self.levels)
      console.log('self.levels')
    }
    
    levelStore.on('csv_export_Level_changed',csv_export_LevelChanged)
    function csv_export_LevelChanged(url){
      var open_url = window.location.origin+url 
      window.open(open_url);
      self.loading = false
      self.update()
    }

</script>
</level>