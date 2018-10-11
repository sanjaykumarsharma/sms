<country>
	<section class="is-fluid">
    <h2 class="title" style="color: #ff3860;">Countries</h2>
    <div class="flex items-center mt-2 mb-6 no-print">
      <div class="bg-green py-1 rounded w-10">
        <div class="bg-grey h-px flex-auto"></div>
      </div>
    </div>
      <div class="box">
      <div class="columns">
        <div class="column is-narrow">
          <label class="label">Country</label>
        </div>
        <div class="column is-narrow">
          <div class="control">
            <input class=" input"
              ref="addCountryInput" type="text">
          </div>
        </div>
        <div class="column is-narrow">
          <label class="label">Code</label>
        </div>
        <div class="column is-narrow">
          <div class="control">
            <input class=" input"
              ref="addCodeInput" type="text">
          </div>
        </div>
        <div class="column">
          <button class="button is-danger has-text-weight-bold"
          onclick={add} >{title}
          </button>
        </div>
      </div>
    </div>
    <!-- <div class="box">
      <div class="columns">
        <div class="column is-half">
          <div class="field">
            <label class="label" for="level">Country</label>
            <div class="control">
              <input class="input" type="text" ref="addCountryInput"
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
          <th>Country</th>
          <th>Code</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr each={d, i in countries}>
          <td>{i + 1}</td>
          <td>{d.country}</td>
          <td>{d.code}</td>
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
      self.readCountry()
    })

     self.on("unmount", function(){
      countryStore.off('country_changed', CountryChanged)
    })

    //read courses
    self.readCountry = () => {
       countryStore.trigger('read_country')
    }

     self.add = () => {
      if(!self.refs.addCountryInput.value){
        toastr.info("Please enter Country and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          console.log('create')
          countryStore.trigger('add_country', self.refs.addCountryInput.value,self.refs.addCodeInput.value,)
        }else if(self.title=='Update'){
          console.log('update')
          countryStore.trigger('edit_country', self.refs.addCountryInput.value,self.refs.addCodeInput.value,
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
      self.countries.map(d => {
        if(d.country != e.item.d.country){
          d.confirmDelete = false
        }else{
          d.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      countryStore.trigger('delete_country', e.item.d.country)
    }

    self.edit = (d,e) => {
      console.log(d)
      self.title='Update'
      self.refs.addCountryInput.value = d.country
      self.refs.addCodeInput.value = d.code
      self.edit_id = d.country
    }
    

    countryStore.on('country_changed',CountryChanged)
    function CountryChanged(countries){
      console.log('country_changed1') 
      console.log(countries) 
      self.title='Create'
      self.refs.addCountryInput.value = ''
      self.refs.addCodeInput.value = ''
      self.loading = false
      self.countries = countries
      self.update()
    }

</script>
</country>