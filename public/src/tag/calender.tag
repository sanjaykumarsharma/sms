<calender>
	<section class="is-fluid">
    <h2 class="title" style="color: #ff3860;">Areas</h2>
    <div class="flex items-center mt-2 mb-6 no-print">
      <div class="bg-green py-1 rounded w-10">
        <div class="bg-grey h-px flex-auto"></div>
      </div>
    </div>
      <div class="box">
      <div class="columns">
        <div class="column is-narrow">
          <label class="label">Area</label>
        </div>
        <div class="column is-narrow">
          <div class="control">
            <input class=" input"
              ref="addAreaInput" type="text">
          </div>
        </div>
        <div class="column">
          <button class="button is-danger has-text-weight-bold"
          onclick={add} >{title}
          </button>
        </div>
      </div>
    </div>
    <table class="table is-fullwidth is-striped is-hoverable">
      <thead>
        <tr>
          <th>#</th>
          <th>Area</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr each={d, i in areas}>
          <td>{i + 1}</td>
          <td>{d.area}</td>
          <td class="has-text-right">
            <div class="inline-flex rounded border border-grey overflow-hidden" hide={d.confirmDelete}>
              <span><a class="button is-small is-rounded" onclick={edit.bind(this, d)}>Edit</a></span>
              <span if={role=='ADMIN'}> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick={confirmDelete}>Delete</a></span>
            </div>
            <div class="table-buttons" if={d.confirmDelete}>
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
      //self.readArea()
    })

    /* self.on("unmount", function(){
      areaStore.off('area_changed', AreaChanged)
    })*/

    //read courses
  
</script>
</calender>