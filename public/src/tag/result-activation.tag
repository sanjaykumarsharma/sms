<result-activation>
<loading-bar if={loading}></loading-bar>  
	<section class=" is-fluid">
    <div class="level">
      <div class="level-left">
        <h2 class="title" style="color: #ff3860;">Result Activation </h2>
      </div>
      <div class="level-right">
        <div class="control">
          <input class="input" ref="searchClasses" onkeyup={filterClasses} type="text" placeholder="Search Here">
        </div>
        <button class="button is-success has-text-weight-bold ml5" onclick={allowBlock}>Allow/Block</button>

        <button class="button is-warning is-rounded ml5" onclick={readResultActivation}>
        <span class="icon">
          <span class="fas fa-sync-alt"></span>
        </span>
        </button>
      </div>
    </div>

		<table class="table is-fullwidth is-bordered is-hoverable is-narrow">
			<thead>
				<tr>
					<th class="slno">SL</th>
          <th>Standard</th>
          <th>Section</th>
          <th>Active</th>
          <th class="has-text-centered">
            <input type="checkbox" id="checkSection" onclick={selectAll}>
          </th>
				</tr>
			</thead>
			<tbody>
				<tr each={c, i in filteredClasses}>
					<td>{i+1 }</td>
          <td>{c.standard}</td>
          <td>{c.section}</td>
          <td>{c.active_section}</td>
          <td class="has-text-centered">
            <input type="checkbox" class="id_check_box" checked={c.done} id="{ 'SectiondId' + c.section_id }" onclick={selectStudent.bind(this,c)} >
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

    self.selectAll = () => {

      if($('#checkSection').is(":checked")){
        self.classes.map(c=>{
          c.done = true;
          $('SectiondId'+c.section_id).prop('checked', true);  
        })
      }else{
        self.classes.map(c=>{
          c.done = false;
          $('SectiondId'+c.section_id).prop('checked', false);
          self.section_id = c.section_id;
        })
      }
    }

    self.selectStudent = (item,event) => {
      item.done=!event.item.c.done
        self.section_id = item.section_id;
    }

    self.allowBlock = () =>{
      let section_id='';
      var active_section = 'No'
      var st = []
       self.classes.map( q => {
          if(q.done){
            var ob ={}
            ob.section_id=q.section_id

            if(q.active_section=='Yes'){
              ob.active_section='No'
            }else{
              ob.active_section='Yes'
            }
            st.push(ob)
          }
        })
        if(st.length==0){
          toastr.info('Please select at least one Class and try again')
        }else{
          self.loading = true
          resultActivationStore.trigger('result_activation_update', st)
      }
    }

    self.filterClasses = ()=>{
      self.filteredClasses = self.classes.filter(c => {
        return JSON.stringify(c).toLowerCase().indexOf(self.refs.searchClasses.value.toLowerCase())>=0
      })
    }

    // ****************************************** all change metods *************************************

    resultActivationStore.on('read_result_activation_changed',ClassesChanged)
    function ClassesChanged(classes){
      self.loading = false
      self.classes = []
      self.classes = classes
      self.filteredClasses = classes
      self.classes.map(c => {
        c.done=false
      })
      $("#checkSection").prop("checked", false);
      self.update()
      console.log(self.classes)
    }

    resultActivationStore.on('result_activation_update_changed',UpdateChanged)
    function UpdateChanged(){
      self.loading=false
      self.readResultActivation()
    }

</script>
</result-activation>