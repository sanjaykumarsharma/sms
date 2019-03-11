<city>
 <print-header></print-header> 
  <loading-bar if={loading}></loading-bar>  
	<section class="is-fluid">
    <h2 class="title has-text-centered" style="color: #ff3860;">City Details</h2>
    <!-- <div class="level">
      <div class="level-left">
        <h2 class="title" style="color: #ff3860;">Cities</h2>
      </div>
    </div> -->
      <div class="box no-print">
      <div class="columns">
        <div class="column is-narrow">
          <label class="label">City</label>
        </div>
        <div class="column is-narrow">
          <div class="control">
            <input class=" input"
              ref="addCityInput" type="text" onkeyup={addEnter}>
          </div>
        </div>
        <div class="column is-narrow">
          <label class="label">Code</label>
        </div>
        <div class="column is-narrow">
          <div class="control">
            <input class=" input"
              ref="addCodeInput" type="text" onkeyup={addEnter}>
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
            <button class="button is-primary has-text-weight-bold is-pulled-right is-small ml5" onclick="window.print()" title="Print"> <span class="icon"> <i class="fas fa-print"></i></span>
          </button>
             <button class="button is-warning is-rounded is-pulled-right is-small ml5" onclick={readCity} style="margin-left:5px;margin-right:5px">
          <span class="icon">
            <span class="fas fa-sync-alt"></span>
          </span>
          </button>
        </div>
      </div>
    </div>
    <table class="table is-fullwidth is-striped is-hoverable">
      <thead>
        <tr>
          <th>#</th>
          <th>city</th>
          <th>Code</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr each={d, i in cities}>
          <td>{i + 1}</td>
          <td>{d.city}</td>
          <td>{d.code}</td>
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
      self.readCity()
    })

     self.on("unmount", function(){
      cityStore.off('city_changed', CityChanged)
      cityStore.off('csv_export_city_changed',csv_export_cityChanged)
    })

      self.downloadCSV = () =>{
          cityStore.trigger('csv_export_city')
        //  console.log(obj)
    }

    //read courses
    self.readCity = () => {
      self.loading=true
       cityStore.trigger('read_city')
    }

     self.add = () => {
      if(!self.refs.addCityInput.value){
        toastr.info("Please enter city and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          console.log('create')
          cityStore.trigger('add_city', self.refs.addCityInput.value,self.refs.addCodeInput.value,)
        }else if(self.title=='Update'){
          console.log('update')
          cityStore.trigger('edit_city', self.refs.addCityInput.value,self.refs.addCodeInput.value,
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
      self.cities.map(d => {
        if(d.city != e.item.d.city){
          d.confirmDelete = false
        }else{
          d.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      cityStore.trigger('delete_city', e.item.d.city)
    }

    self.edit = (d,e) => {
      console.log(d)
      self.title='Update'
      self.refs.addCityInput.value = d.city
      self.refs.addCodeInput.value = d.code
      self.edit_id = d.city
    }
    

    cityStore.on('city_changed',CityChanged)
    function CityChanged(cities){
      console.log('city_changed1') 
      console.log(cities) 
      self.title='Create'
      self.refs.addCityInput.value = ''
      self.refs.addCodeInput.value = ''
      self.loading = false
      self.cities = cities
      self.update()
    }

     cityStore.on('csv_export_city_changed',csv_export_cityChanged)
    function csv_export_cityChanged(url){
      var open_url = window.location.origin+url 
      window.open(open_url);
      self.loading = false
      self.update()
    }

</script>
</city>