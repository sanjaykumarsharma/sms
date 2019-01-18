<physical-fitness>
<loading-bar if={loading}></loading-bar>  
	<section class=" is-fluid" show={view=='physical_fitness'}>

    <div class="level">
      <div class="level-left">
        <h2 class="title" style="color: #ff3860;">Physical Fitness 
          <span style="font-weight:normal" show={action=='PhysicalFitnessForm'}>({details})({title})</span>
        </h2>
      </div>
      <div class="level-right">

        <button class="button is-warning is-rounded" onclick={closePhysicalFitnessForm} show={action=='PhysicalFitnessForm'}>
        <span class="icon">
          <span class="fas fa-arrow-left"></span>
        </span>
        </button>

        <button class="button is-warning is-rounded ml5" onclick={readPhysicalFitnessStudents} hide={action=='PhysicalFitnessForm'} >
        <span class="icon">
          <span class="fas fa-sync-alt"></span>
        </span>
        </button>

        <button class="button is-warning is-rounded ml5" onclick={viewAllDetails} hide={action=='PhysicalFitnessForm'} >
        <span class="icon">
          <span class="fas fa-print"></span>
        </span>
        </button>

      </div>
    </div>

    <div class="box">
      <div class="columns">

        <div class="column is-narrow"><label class="label">Standard</label></div>  
        <div class="column">  
          <div class="control">
            <div class="select is-fullwidth">
              <select ref="standardSelect" onchange={changeSection} id="standard">
                <option value="">Select Standard</option>
                <option each={classes} value={standard_id}>{standard}</option>
              </select>
            </div>
          </div>
        </div>

        <div class="column is-narrow"><label class="label">Section</label></div>  
        <div class="column">  
          <div class="control">
            <div class="select is-fullwidth">
              <select ref="sectionSelect" onchange={readClassSubject} id="section">
                <option value="">Select Section</option>
                <option each={tempSections} value={section_id}>{section}</option>
              </select>
            </div>
          </div>
        </div>

        <div class="column is-narrow"><label class="label">Exam Term</label></div>  
        <div class="column">
          <div class="control">
            <div class="select is-fullwidth">
              <select ref="examTermSelect">
                <option value="">Select Exam Term</option>
                <option value="First">First</option>
                <option value="Final">Final</option>
              </select>
            </div>
          </div>
        </div>

        <div class="column">
          <button class="button is-danger has-text-weight-bold" onclick={readPhysicalFitnessStudents} hide={action=='PhysicalFitnessForm'}>GO </button>
        </div>
          
      </div>
    </div>  

		<table class="table is-fullwidth is-striped is-hoverable" hide={action=='PhysicalFitnessForm'}>
			<thead>
				<tr>
					<th class="slno">SL</th>
          <th>Enroll No</th>
          <th>Name</th>
          <th>Status</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr each={c, i in physicalFitness}>
					<td>{i+1 }</td>
          <td>{c.enroll_number}</td>
          <td>{c.student_name}</td>
          <td>{c.exam_term}</td>
        	<td class="has-text-right">
      			<div class="inline-flex rounded border border-grey overflow-hidden" hide={c.confirmDelete}>
                <span show={c.exam_term=='N'}><a class="button is-small is-rounded" onclick={openPhysicalFitnessForm.bind(this, c)}>Add</a></span>
                <span><a class="button is-small is-rounded" onclick={viewDetails.bind(this, c)}>View</a></span>
                <span><a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick={confirmDelete}>Delete</a></span>
      			</div>
      			<div class="table-buttons" if={c.confirmDelete}>
        				<span disabled={loading} class="button is-small is-rounded" onclick={delete}><i class="fa fa-check" ></i></span>
        				<span disabled={loading} class="button is-small  has-text-danger is-rounded" onclick={cancelOperation}><i class="fa fa-times"></i></span>
      			</div>
    			</td>
				</tr>
			</tbody>
		</table>


    <section class=" is-fluid" show={action=='PhysicalFitnessForm'}> 

      <div class="columns" if={first_form}>
        
        <div class="column">  
          <div class="field">
            <label class="label" for="role">Running</label>
            <div class="control">
              <div class="select is-fullwidth">
                <select ref="first_skill" id="first_skill">
                  <option value="EXCELLENT">A</option>
                  <option value="VERY GOOD">B</option>
                  <option value="GOOD">C</option>
                  <option value="AVERAGE">D</option>
                  <option value="NEEDS IMPROVEMENT">E</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div class="column">  
          <div class="field">
            <label class="label" for="role">Hopping</label>
            <div class="control">
              <div class="select is-fullwidth">
                <select ref="second_skill" id="second_skill">
                  <option value="EXCELLENT">A</option>
                  <option value="VERY GOOD">B</option>
                  <option value="GOOD">C</option>
                  <option value="AVERAGE">D</option>
                  <option value="NEEDS IMPROVEMENT">E</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div class="column">  
          <div class="field">
            <label class="label" for="role">Jumping</label>
            <div class="control">
              <div class="select is-fullwidth">
                <select ref="third_skill" id="third_skill">
                  <option value="EXCELLENT">A</option>
                  <option value="VERY GOOD">B</option>
                  <option value="GOOD">C</option>
                  <option value="AVERAGE">D</option>
                  <option value="NEEDS IMPROVEMENT">E</option>
                </select>
              </div>
            </div>
          </div>
        </div>

      </div> 


      <div class="columns" if={first_form}>
        
        <div class="column">  
          <div class="field">
            <label class="label" for="role">Catching</label>
            <div class="control">
              <div class="select is-fullwidth">
                <select ref="fourth_skill" id="fourth_skill">
                  <option value="EXCELLENT">A</option>
                  <option value="VERY GOOD">B</option>
                  <option value="GOOD">C</option>
                  <option value="AVERAGE">D</option>
                  <option value="NEEDS IMPROVEMENT">E</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div class="column">  
          <div class="field">
            <label class="label" for="role">Throwing</label>
            <div class="control">
              <div class="select is-fullwidth">
                <select ref="fifth_skill" id="fifth_skill">
                  <option value="EXCELLENT">A</option>
                  <option value="VERY GOOD">B</option>
                  <option value="GOOD">C</option>
                  <option value="AVERAGE">D</option>
                  <option value="NEEDS IMPROVEMENT">E</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div class="column">  
        </div>

      </div>
      
    
      <div class="columns" if={second_form}>
        
        <div class="column">  
          <div class="field">
            <label class="label" for="role">Aerobic Capacity</label>
            <div class="control">
              <div class="select is-fullwidth">
                <select ref="first_skill" id="first_skill">
                  <option value="NEEDS IMPROVEMENT">0</option>
                  <option value="NEEDS IMPROVEMENT">1</option>
                  <option value="NEEDS IMPROVEMENT">2</option>
                  <option value="AVERAGE">3</option>
                  <option value="AVERAGE">4</option>
                  <option value="GOOD">5</option>
                  <option value="GOOD">6</option>
                  <option value="VERY GOOD">7</option>
                  <option value="VERY GOOD">8</option>
                  <option value="EXCELLENT">9</option>
                  <option value="EXCELLENT">10</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div class="column">  
          <div class="field">
            <label class="label" for="role">Agility</label>
            <div class="control">
              <div class="select is-fullwidth">
                <select ref="second_skill" id="second_skill">
                  <option value="NEEDS IMPROVEMENT">0</option>
                  <option value="NEEDS IMPROVEMENT">1</option>
                  <option value="NEEDS IMPROVEMENT">2</option>
                  <option value="AVERAGE">3</option>
                  <option value="AVERAGE">4</option>
                  <option value="GOOD">5</option>
                  <option value="GOOD">6</option>
                  <option value="VERY GOOD">7</option>
                  <option value="VERY GOOD">8</option>
                  <option value="EXCELLENT">9</option>
                  <option value="EXCELLENT">10</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div class="column">  
          <div class="field">
            <label class="label" for="role">Explosive Strength</label>
            <div class="control">
              <div class="select is-fullwidth">
                <select ref="third_skill" id="third_skill">
                  <option value="NEEDS IMPROVEMENT">0</option>
                  <option value="NEEDS IMPROVEMENT">1</option>
                  <option value="NEEDS IMPROVEMENT">2</option>
                  <option value="AVERAGE">3</option>
                  <option value="AVERAGE">4</option>
                  <option value="GOOD">5</option>
                  <option value="GOOD">6</option>
                  <option value="VERY GOOD">7</option>
                  <option value="VERY GOOD">8</option>
                  <option value="EXCELLENT">9</option>
                  <option value="EXCELLENT">10</option>
                </select>
              </div>
            </div>
          </div>
        </div>

      </div> 


      <div class="columns" if={second_form}>
        
        <div class="column">  
          <div class="field">
            <label class="label" for="role">Abdominal Strength</label>
            <div class="control">
              <div class="select is-fullwidth">
                <select ref="fourth_skill" id="fourth_skill">
                  <option value="NEEDS IMPROVEMENT">0</option>
                  <option value="NEEDS IMPROVEMENT">1</option>
                  <option value="NEEDS IMPROVEMENT">2</option>
                  <option value="AVERAGE">3</option>
                  <option value="AVERAGE">4</option>
                  <option value="GOOD">5</option>
                  <option value="GOOD">6</option>
                  <option value="VERY GOOD">7</option>
                  <option value="VERY GOOD">8</option>
                  <option value="EXCELLENT">9</option>
                  <option value="EXCELLENT">10</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div class="column">  
          <div class="field">
            <label class="label" for="role">Flexibility</label>
            <div class="control">
              <div class="select is-fullwidth">
                <select ref="fifth_skill" id="fifth_skill">
                  <option value="NEEDS IMPROVEMENT">0</option>
                  <option value="NEEDS IMPROVEMENT">1</option>
                  <option value="NEEDS IMPROVEMENT">2</option>
                  <option value="AVERAGE">3</option>
                  <option value="AVERAGE">4</option>
                  <option value="GOOD">5</option>
                  <option value="GOOD">6</option>
                  <option value="VERY GOOD">7</option>
                  <option value="VERY GOOD">8</option>
                  <option value="EXCELLENT">9</option>
                  <option value="EXCELLENT">10</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div class="column">  
        </div>

      </div>

      <div class="level">
        <div class="level-left">
          
        </div>
        <div class="level-right">
          <button class="button is-danger" onclick={add} >{title}</button>
          <button class="button ml5" onclick={closePhysicalFitnessForm}>Cancel</button>
        </div>
      </div>
    </section>  

      
	</section>

  <section class="is-fluid" show={view=='details'}>
    <div class="level no-print">
      <div class="level-left">

      </div>
      <div class="level-right">

        <button class="button is-warning is-rounded" onclick={closeDetails}>
          <span class="icon">
            <span class="fas fa-arrow-left"></span>
          </span>
        </button>

      </div>
    </div>

    <center>
     <h6 class="title is-size-5">Physical Fitness view for Class {student_info.standard} </h6>
    </center>

    <table class="table is-fullwidth is-striped is-hoverable">
      <tbody>
        <tr each={c, i in physicalFitnessDetails}>

          <td>
            <table class="table is-fullwidth is-striped is-hoverable">
              <tr>
                <td>Name: {c.student_name}</td>
                <td colspan="2">Enrol Number: {c.enroll_number}</td>
              </tr>
              <tr>
                <th><span show={senior}>Parameters Measured</span><span show={junior}>Skill</span></th>
                <th><span show={senior}>Obtained Marks (10)</span><span show={junior}>Grade</span></th>
                <th>Description</th>
              </tr>
              <tr>
                <td><span show={senior}> Aerobic Capacity</span><span show={junior}> Running</span></td>
                <td>{c.first_skill}</td>
                <td>{c.first_description}</td>
              </tr>
              <tr>
                <td><span show={senior}> Agility</span><span show={junior}> Hopping</span></td>
                <td>{c.second_skill}</td>
                <td>{c.second_description}</td>
              </tr>
              <tr>
                <td><span show={senior}> Explosive Strength</span><span show={junior}>Jumping </span></td>
                <td>{c.third_skill}</td>
                <td>{c.third_description}</td>
              </tr>
              <tr>
                <td><span show={senior}> Abdominal Strength</span><span show={junior}>Catching </span></td>
                <td>{c.fourth_skill}</td>
                <td>{c.fourth_description}</td>
              </tr>
              <tr>
                <td><span show={senior}> Flexibility</span><span show={junior}>Throwing </span></td>
                <td>{c.fifth_skill}</td>
                <td>{c.fifth_description}</td>
              </tr>
            </table>
          </td>
          
        </tr>
      </tbody>
    </table>

    

  </section>
  

	<script>
	var self = this
  self.physicalFitnessDetails= []
  self.second_form=false
  self.first_form=false
  self.senior = false
  self.junior = false
  self.student_info = {'student_name':'','enroll_number':'','term':'','standard':''}
    self.on("mount", function(){
      self.title = ''
      self.view = 'physical_fitness'
      self.action = ''
      self.details = ''
      self.loading = false;
      self.tempSections = []
      self.update()
      flatpickr(".date", {
        allowInput: true,
        dateFormat: "d/m/Y",
      })
      self.readClass()
      self.readSection()
    })
    self.on("unmount", function(){
      physicalFitnessStore.off('read_classes_changed',ClassesChanged)
      physicalFitnessStore.off('read_section_changed',SectionChanged)
      physicalFitnessStore.off('add_physical_fitness_changed',AddPhysicalFitnessChanged)
      physicalFitnessStore.off('delete_physical_fitness_changed',DeletePhysicalFitnessChanged)
      physicalFitnessStore.off('read_physical_fitness_details_changed',PhysicalFitnessDetailsChanged)
    })

    self.readClass = () => {
       self.loading = true;
       physicalFitnessStore.trigger('read_classes')
    }

    self.readSection = () => {
       self.loading = true;
       physicalFitnessStore.trigger('read_section')
    }

    self.changeSection = () => {
       if(self.refs.standardSelect.value==''){
        toastr.info("Please select standard and try again")
       }else{
        self.tempSections = []
        self.tempSections = self.sections.filter(s=>{
          return s.standard_id==self.refs.standardSelect.value
        })
       }

       //read exam type
       physicalFitnessStore.trigger('read_exam_types',self.refs.standardSelect.value)
    }

    self.readPhysicalFitnessStudents = () => {
      let error = '';
      
      if(self.refs.sectionSelect.value==''){
        error = error + "Please select section, "
      }

      if(self.refs.examTermSelect.value==''){
        error = error + "Please select exam type "
      }
      
      console.log(self.refs.examTermSelect.value)
      if(error.length!=0){
        toastr.error(error)
        return
      }else{
        self.loading=true
        physicalFitnessStore.trigger('read_physical_fitness_students',self.refs.sectionSelect.value, self.refs.examTermSelect.value)
      }  

    }

    self.openPhysicalFitnessForm = (c,e) => {
      if (c.standard_id>=8) {
        self.second_form=true
        self.first_form=false
      }else if (c.standard_id >= 4 && c.standard_id < 8) {
        self.second_form=false
        self.first_form=true
      }else{
        toastr.error("Physical Fitness is not applicable for selected class");
      }
      self.title='Add'
      self.action='PhysicalFitnessForm'
      self.details=c.student_name + ',' + 'Enroll No: ' + c.enroll_number
      self.student_id=c.student_id
      self.update()
    }

    self.closePhysicalFitnessForm = () => {
      self.title=''
      self.action=''
    }

    self.selectIncludeInGrandTotal = () => {
      console.log(self.refs.markingTypeSelect.value)
      if(self.refs.markingTypeSelect.value=='G'){
        self.refs.includeInGrandTotalSelect.value='N'
      }else{
        self.refs.includeInGrandTotalSelect.value='Y'
      }
      // self.update()
    }

    self.add = () => {
      let error = '';
      var obj = {}
      obj['student_id']=self.student_id
      obj['section_id']=self.refs.sectionSelect.value
      obj['exam_term']=self.refs.examTermSelect.value
      obj['first_skill']= $("#first_skill option:selected").text()
      obj['first_description']=self.refs.first_skill.value
      obj['second_skill']=$("#second_skill option:selected").text()
      obj['second_description']=self.refs.second_skill.value 
      obj['third_skill']= $("#third_skill option:selected").text()
      obj['third_description']=self.refs.third_skill.value
      obj['fourth_skill']= $("#fourth_skill option:selected").text()
      obj['fourth_description']=self.refs.fourth_skill.value
      obj['fifth_skill']=$("#fifth_skill option:selected").text()
      obj['fifth_description']=self.refs.fifth_skill.value 

      if(error.length!=0){
        toastr.error(error)
        return
      }else{
        self.loading = true
        physicalFitnessStore.trigger('add_physical_fitness', obj)
      }  

    }

    self.viewAllDetails = () => {
      let error = '';
      
      if(self.refs.sectionSelect.value==''){
        error = error + "Please select section, "
      }

      if(self.refs.examTermSelect.value==''){
        error = error + "Please select exam type "
      }
      
      console.log(self.refs.examTermSelect.value)
      if(error.length!=0){
        toastr.error(error)
        return
      }else{

        self.student_info.standard= $("#standard option:selected").text() + '-' + $("#section option:selected").text()
        if(self.refs.standardSelect.value>=8){
          self.senior = true
          self.junior = false
        }else{
          self.senior = false
          self.junior = true
        }
        
        self.loading=true
        physicalFitnessStore.trigger('read_physical_fitness_all_details', self.refs.sectionSelect.value, self.refs.examTermSelect.value)
      }
    }

    self.viewDetails = (c,e) => {
      self.student_info=c
      self.student_info.term=self.refs.examTermSelect.value
      if(self.refs.standardSelect.value>=8){
        self.senior = true
        self.junior = false
      }else{
        self.senior = false
        self.junior = true
      }
      
      self.loading=true
      physicalFitnessStore.trigger('read_physical_fitness_details',c.student_id, self.refs.examTermSelect.value)
    }

    self.closeDetails = (c,e) => {
      self.view='physical_fitness'
      self.update()
    }

   self.cancelOperation = (e) => {
      self.physicalFitness.map(c => {
          c.confirmDelete = false
          c.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.physicalFitness.map(c => {
        if(c.student_id != e.item.c.student_id){
          c.confirmDelete = false
        }else{
          c.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      physicalFitnessStore.trigger('delete_physical_fitness', e.item.c.student_id,self.refs.examTermSelect.value)
    }


    // ****************************************** all change metods *************************************

    physicalFitnessStore.on('read_classes_changed',ClassesChanged)
    function ClassesChanged(classes){
      self.loading = false
      self.classes = []
      self.classes = classes
      self.update()
      console.log(self.classes)
    }

    physicalFitnessStore.on('read_section_changed',SectionChanged)
    function SectionChanged(sections){
      self.loading = false
      self.sections = []
      self.sections = sections
      self.update()
    }

    physicalFitnessStore.on('physical_fitness_students_changed',PhysicalFitnessChanged)
    function PhysicalFitnessChanged(physicalFitness){
      self.loading = false
      self.physicalFitness = []
      self.physicalFitness = physicalFitness
      self.update()
    }

    physicalFitnessStore.on('read_physical_fitness_details_changed',PhysicalFitnessDetailsChanged)
    function PhysicalFitnessDetailsChanged(details){
      
      self.loading=false
      if(details.length>0){
        self.view='details'
        self.physicalFitnessDetails= []
        self.physicalFitnessDetails= details
        self.update()
      }else{
        toastr.error('Please Add Physical Fitness Details')
        self.update()
      }
    }

    physicalFitnessStore.on('add_physical_fitness_changed',AddPhysicalFitnessChanged)//update changes calls the same method
    function AddPhysicalFitnessChanged(physicalFitness){
      self.closePhysicalFitnessForm()
      self.loading = false
      self.update()
      self.readPhysicalFitnessStudents()
    }

    physicalFitnessStore.on('delete_physical_fitness_changed',DeletePhysicalFitnessChanged)
    function DeletePhysicalFitnessChanged(physicalFitness){
      self.loading = false
      self.physicalFitness.map(c => {
        c.confirmDelete = false
      })
      self.update()
      self.readPhysicalFitnessStudents()
    }

</script>
</physical-fitness>