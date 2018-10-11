<result-activation>
<loading-bar if={loading}></loading-bar>  
	<section class=" is-fluid">

    <div class="level">
      <div class="level-left">
        <h2 class="title" style="color: #ff3860;">Result Activation </h2>
      </div>
      <div class="level-right">

        <button class="button is-warning is-rounded ml5" onclick={readResultActivation}>
        <span class="icon">
          <span class="fas fa-sync-alt"></span>
        </span>
        </button>
      </div>
    </div>

		<table class="table is-fullwidth is-striped is-hoverable">
			<thead>
				<tr>
					<th class="slno">SL</th>
          <th>Standard</th>
          <th>Section</th>
          <th>Active</th>
          <th></th>
				</tr>
			</thead>
			<tbody>
				<tr each={c, i in classes}>
					<td>{i+1 }</td>
          <td>{c.standard}</td>
          <td>{c.section}</td>
          <td>{c.active_section}</td>
          <td class="has-text-right">
            <span show={c.active_section=='No'}><a class="button is-small is-rounded is-primary" onclick={edit.bind(this, c)}>Allow</a></span>
            <span show={c.active_section=='Yes'}><a class="button is-small is-rounded is-danger" onclick={edit.bind(this, c)}>Block</a></span>
          </td>
				</tr>
			</tbody>
		</table>

	</section>

	<script>
	var self = this
  
    self.on("mount", function(){
      self.title = ''
      self.loading = false;
      self.readResultActivation()
    })
    self.on("unmount", function(){
      resultActivationStore.off('read_result_activation_changed',ClassesChanged)
      resultActivationStore.off('result_activation_update_changed',UpdateChanged)
    })
    
    self.readResultActivation = () => {
      self.loading = true;
      resultActivationStore.trigger('read_result_activation')
    }

    self.edit = (c,e) => {
      self.loading=true
      var obj = {}
      obj['section_id'] = c.section_id;
      

      if(c.active_section=='Yes'){
        obj['active_section'] = 'No';
      }else{
        obj['active_section'] = 'Yes';
      }

      resultActivationStore.trigger('result_activation_update', obj)
    }

    // ****************************************** all change metods *************************************

    resultActivationStore.on('read_result_activation_changed',ClassesChanged)
    function ClassesChanged(classes){
      self.loading = false
      self.classes = []
      self.classes = classes
      self.update()
      console.log(self.classes)
    }

    resultActivationStore.on('result_activation_update_changed',UpdateChanged)
    function UpdateChanged(){
      self.readResultActivation()
    }

</script>
</result-activation>