<area>
  <print-header></print-header> 
   <loading-bar if={loading}></loading-bar>  
	<section class="is-fluid">
     <h2 class="title has-text-centered" style="color: #ff3860;">Area Details</h2>
      <div class="box no-print">
      <div class="columns">
        <div class="column is-narrow">
          <label class="label">Area</label>
        </div>
        <div class="column is-narrow">
          <div class="control">
            <input class=" input"
              ref="addAreaInput" type="text" onkeyup={addEnter}>
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
        <button class="button is-warning is-rounded is-pulled-right is-small ml5" onclick={readArea} style="margin-left:5px;margin-right:5px">
        <span class="icon">
          <span class="fas fa-sync-alt"></span>
        </span>
        </button>
          <input class="input is-pulled-right" ref="searchArea" onkeyup={filteredArea} type="text" style="width:200px;margin-right:5px" placeholder="Search">
        </div>
      </div>
    </div>
    <!-- <div class="box">
      <div class="columns">
        <div class="column is-half">
          <div class="field">
            <label class="label" for="level">area</label>
            <div class="control">
              <input class="input" type="text" ref="addAreaInput"
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
          <th>Area</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr each={d, i in filteredAreas}>
          <td>{i + 1}</td>
          <td>{d.area}</td>
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
      self.readArea()
    })

     self.on("unmount", function(){
      areaStore.off('area_changed', AreaChanged)
      areaStore.off('csv_export_area_changed',csv_export_areaChanged)
    })

     self.downloadCSV = () =>{
          areaStore.trigger('csv_export_area')
        //  console.log(obj)
    }

    self.filteredArea = ()=>{
      self.filteredAreas = self.areas.filter(c => {
        return JSON.stringify(c).toLowerCase().indexOf(self.refs.searchArea.value.toLowerCase())>=0
      })
    } 

    //read courses
    self.readArea = () => {
      self.loading=true
       areaStore.trigger('read_area')
    }

     self.add = () => {
      if(!self.refs.addAreaInput.value){
        toastr.info("Please enter area and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          console.log('create')
          areaStore.trigger('add_area', self.refs.addAreaInput.value)
        }else if(self.title=='Update'){
          console.log('update')
          areaStore.trigger('edit_area', self.refs.addAreaInput.value,
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
      self.areas.map(d => {
          d.confirmDelete = false
          d.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.areas.map(d => {
        if(d.area != e.item.d.area){
          d.confirmDelete = false
        }else{
          d.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      areaStore.trigger('delete_area', e.item.d.area)
    }

    self.edit = (d,e) => {
      console.log(d)
      self.title='Update'
      self.refs.addAreaInput.value = d.area
      self.edit_id = d.area
    }
    

    areaStore.on('area_changed',AreaChanged)
    function AreaChanged(areas){
      console.log('area_changed1') 
      console.log(areas) 
      self.title='Create'
      self.refs.addAreaInput.value = ''
      self.loading = false
      self.areas = areas
      self.filteredAreas = areas
      self.update()
    }
     areaStore.on('csv_export_area_changed',csv_export_areaChanged)
    function csv_export_areaChanged(url){
      var open_url = window.location.origin+url 
      window.open(open_url);
      self.loading = false
      self.update()
    }

</script>
</area>