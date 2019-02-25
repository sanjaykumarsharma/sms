<maturity-development>
<loading-bar if={loading}></loading-bar>  
	<section class=" is-fluid" show={view=='maturity_developments'}>

    <div class="level">
      <div class="level-left">
        <h2 class="title" style="color: #ff3860;">Maturity Development 
          <span style="font-weight:normal" show={action=='MaturityDevelopmentForm'}>({details})({title})</span>
        </h2>
      </div>
      <div class="level-right">

        <button class="button is-warning is-rounded" onclick={closeMaturityDevelopmentForm} show={action=='MaturityDevelopmentForm'}>
        <span class="icon">
          <span class="fas fa-arrow-left"></span>
        </span>
        </button>

        <button class="button is-warning is-rounded ml5" onclick={readMaturityDevelopmentStudents} hide={action=='MaturityDevelopmentForm'} >
        <span class="icon">
          <span class="fas fa-sync-alt"></span>
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
              <select ref="standardSelect" onchange={changeSection}>
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
              <select ref="sectionSelect" onchange={readClassSubject}>
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
          <button class="button is-danger has-text-weight-bold" onclick={readMaturityDevelopmentStudents} hide={action=='MaturityDevelopmentForm'}>GO </button>
        </div>
          
      </div>
    </div>  

		<table class="table is-fullwidth is-striped is-hoverable" hide={action=='MaturityDevelopmentForm'}>
			<thead>
				<tr>
					<th class="slno">SL</th>
          <th>Enroll No</th>
          <th>Name</th>
          <th>Class</th>
          <th>Status</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr each={c, i in maturityDevelopments}>
					<td>{i+1 }</td>
          <td>{c.enroll_number}</td>
          <td>{c.student_name}</td>
          <td>{c.standard}</td>
          <td>{c.exam_term}</td>
        	<td class="has-text-right">
      			<div class="inline-flex rounded border border-grey overflow-hidden" hide={c.confirmDelete}>
                <span show={c.exam_term=='N'}><a class="button is-small" onclick={openMaturityDevelopmentForm.bind(this, c)} title="Assign"><i class="fa fa-plus-circle" aria-hidden="true"></i></a></span>
                <span><a class="button is-small" onclick={viewDetails.bind(this, c)} title="View"><i class="fa fa-eye" aria-hidden="true"></i></a></span>
        				<span><a class="button is-small" onclick={edit.bind(this, c)} title="Edit"><i class="fa fa-edit" aria-hidden="true"></i></a></span>
                <span><a class="button is-small" rel="nofollow" onclick={confirmDelete} title="Delete"><i class="fa fa-trash" aria-hidden="true"></i></a></span>
      			</div>
      			<div class="table-buttons" if={c.confirmDelete}>
        				<span disabled={loading} class="button is-small is-rounded" onclick={delete}><i class="fa fa-check" ></i></span>
        				<span disabled={loading} class="button is-small  has-text-danger is-rounded" onclick={cancelOperation}><i class="fa fa-times"></i></span>
      			</div>
    			</td>
				</tr>
			</tbody>
		</table>


    <section class=" is-fluid" show={action=='MaturityDevelopmentForm'}> 

      <div class="columns">
        
        <div class="column">  
          <div class="field">
            <label class="label" for="role">Initiative and Perseverance</label>
            <div class="control">
              <div class="select is-fullwidth">
                <select ref="initiativeAndPerseveranceSelect">
                  <option value="initiative_first">Self-motivated and completes tasks</option>
                  <option value="initiative_second">Works well with minimum direction</option>
                  <option value="initiative_third">Needs constant guidance</option>
                  <option value="initiative_fourth">Has to be told every thing</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div class="column">  
          <div class="field">
            <label class="label" for="role">Interest</label>
            <div class="control">
              <div class="select is-fullwidth">
                <select ref="interestSelect">
                  <option value="interest_first">Easily Stimulated and sustained</option>
                  <option value="interest_second">Interested only in some areas</option>
                  <option value="interest_third">Inconsistent</option>
                  <option value="interest_fourth">Indifferent</option>
                </select>
              </div>
            </div>
          </div>
        </div>

      </div> 


      <div class="columns">
        
        <div class="column">  
          <div class="field">
            <label class="label" for="role">Use of Time</label>
            <div class="control">
              <div class="select is-fullwidth">
                <select ref="useOfTimeSelect">
                  <option value="time_first">Uses time profitably</option>
                  <option value="time_second">Organized most of the time</option>
                  <option value="time_third">Disorganized but responds well to guidance</option>
                  <option value="time_fourth">Easily distracted</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div class="column">  
          <div class="field">
            <label class="label" for="role">Works Habits</label>
            <div class="control">
              <div class="select is-fullwidth">
                <select ref="worksHabitsSelect">
                  <option value="work_first">Very careful worker</option>
                  <option value="work_second">Usually neat</option>
                  <option value="work_third">Untidy</option>
                  <option value="work_fourth">Careless</option>
                </select>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div class="columns">
        
        <div class="column">  
          <div class="field">
            <label class="label" for="role">Participation in Group Work</label>
            <div class="control">
              <div class="select is-fullwidth">
                <select ref="participationInGroupWorkSelect">
                  <option value="participation_first">Contributes readily</option>
                  <option value="participation_second">Tries to dominate the group</option>
                  <option value="participation_third">Takes part occasionally</option>
                  <option value="participation_fourth">Has to be coaxed to participate</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div class="column">  
          <div class="field">
            <label class="label" for="role">Responsibility</label>
            <div class="control">
              <div class="select is-fullwidth">
                <select ref="responsibilitySelect">
                  <option value="responsibility_first">Takes initiative in situations which require responsibility</option>
                  <option value="responsibility_second">Accepts a responsibility only when it is assigned</option>
                  <option value="responsibility_third">Casual about responsibility</option>
                  <option value="responsibility_fourth">Reluctant to accept responsibility</option>
                </select>
              </div>
            </div>
          </div>
        </div>

      </div> 


      <div class="level">
        <div class="level-left">
          
        </div>
        <div class="level-right">
          <button class="button is-danger" onclick={add} >{title}</button>
          <button class="button ml5" onclick={closeMaturityDevelopmentForm}>Cancel</button>
        </div>
      </div>
    </section>  

      
	</section>

  <section class="is-fluid" show={view=='details'}>
    <div class="level no-print">
      <div class="level-left">
        <h2 class="title" style="color: #ff3860;">Maturity Development</h2>
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
     <h6 class="title">Maturity Development view for Class {student_info.standard} </h6>
     <table class="table">
        <tbody>
          <tr>
            <th>Name</th>
            <td>{student_info.student_name}</td>
            <th>Enroll Number</th>
            <td>{student_info.enroll_number}</td>
          </tr>
        </tbody>
     </table>

     <table class="table is-bordered">
        <tbody>
          <tr>
           <td colspan="2">Given below are six areas in which maturity of the students is shown. within each areas,
               four levels of maturity have been given. This information indicates at which level your
               son works at school.
           </td>
          </tr>
          <tr>
            <th class="has-text-centered">INITIATIVE &amp; PERSEVERANCE</th>
            <th class="has-text-centered" style="width:120px;">{student_info.term} Term</th>
          </tr>
          <tr>
            <td>1. Self - motivated and completes tasks</td>
            <td class="has-text-centered">
              <span class="icon" show={initiative_first}>
                <span class="fas fa-check"></span>
              </span>
            </td>
          </tr>   
          <tr>
            <td>2. Works well with minimum direction</td>
            <td class="has-text-centered">
              <span class="icon" show={initiative_second}>
                <span class="fas fa-check"></span>
              </span>
            </td>
          </tr>   
          <tr>
            <td>3. Needs constant guidance</td>
            <td class="has-text-centered">
              <span class="icon" show={initiative_third}>
                <span class="fas fa-check"></span>
              </span>
            </td>
          </tr>   
          <tr>
            <td>4. has to be told every thing</td>
            <td class="has-text-centered">
              <span class="icon" show={initiative_fourth}>
                <span class="fas fa-check"></span>
              </span>
            </td>
          </tr>   
                  
          <tr>
            <th class="has-text-centered">INTEREST</th>
            <td class="has-text-centered"></td>
          </tr>
          <tr>
            <td>1. Easily stimulated &amp; sustained</td>
            <td class="has-text-centered">
              <span class="icon" show={interest_first}>
                <span class="fas fa-check"></span>
              </span>
            </td>
          
          </tr>   
          <tr>
            <td>2. Interested only in some areas</td>
            <td class="has-text-centered">
              <span class="icon" show={interest_second}>
                <span class="fas fa-check"></span>
              </span>
            </td>
          </tr>   
          <tr>
            <td>3. Inconsistent</td>
            <td class="has-text-centered">
              <span class="icon" show={interest_third}>
                <span class="fas fa-check"></span>
              </span>
            </td>
            
          </tr>   
          <tr>
            <td>4. Indifferent</td>
            <td class="has-text-centered">
              <span class="icon" show={interest_fourth}>
                <span class="fas fa-check"></span>
              </span>
            </td>
          </tr>

          <tr>
            <th class="has-text-centered">USE OF TIME</th>
            <th class="has-text-centered"></th>
          </tr>
          <tr>
            <td>1. Uses time profitably</td>
            <td class="has-text-centered">
              <span class="icon" show={time_first}>
                <span class="fas fa-check"></span>
              </span>
            </td>
          </tr>                            
          <tr>
            <td>2. Organized most of the time</td>
            <td class="has-text-centered">
              <span class="icon" show={time_second}>
                <span class="fas fa-check"></span>
              </span>
            </td>
          </tr>   
          <tr>
            <td>3. Disorganized but responds well to guidance</td>
            <td class="has-text-centered">
              <span class="icon" show={time_third}>
                <span class="fas fa-check"></span>
              </span>
            </td>
          </tr>   
          <tr>
            <td>4. Easily distracted</td>
            <td class="has-text-centered">
              <span class="icon" show={time_fourth}>
                <span class="fas fa-check"></span>
              </span>
            </td>
          </tr>  
          <tr>
            <th class="has-text-centered">WORK HABITS</th>
            <th class="has-text-centered"></th>
          </tr>
          <tr>
            <td>1. Very careful worker</td>
            <td class="has-text-centered">
              <span class="icon" show={work_first}>
                <span class="fas fa-check"></span>
              </span>
            </td>
          </tr>                                   
          <tr>
            <td>2. Usually neat</td>
            <td class="has-text-centered">
              <span class="icon" show={work_second}>
                <span class="fas fa-check"></span>
              </span>
            </td>
          </tr>   
          <tr>
            <td>3. Untidy</td>
            <td class="has-text-centered">
              <span class="icon" show={work_third}>
                <span class="fas fa-check"></span>
              </span>
            </td>
          </tr>   
          <tr>
            <td>4. Careless</td>
            <td class="has-text-centered">
              <span class="icon" show={work_fourth}>
                <span class="fas fa-check"></span>
              </span>
            </td>
          </tr> 

          <tr>
            <th class="has-text-centered">PARTICIPATION IN GROUP WORK</th>
            <th class="has-text-centered"></th>
          </tr>
          <tr>
            <td>1. Contributes readily</td>
            <td class="has-text-centered">
              <span class="icon" show={participation_first}>
                <span class="fas fa-check"></span>
              </span>
            </td>
          </tr>                                 
          <tr>
            <td>2. Tries to dominate the group</td>
            <td class="has-text-centered">
              <span class="icon" show={participation_second}>
                <span class="fas fa-check"></span>
              </span>
            </td>
          </tr>   
          <tr>
            <td>3. Takes part occasionally</td>
            <td class="has-text-centered">
              <span class="icon" show={participation_third}>
                <span class="fas fa-check"></span>
              </span>
            </td>
          </tr>   
          <tr>
            <td>4. Has to be coaxed to participate</td>
            <td class="has-text-centered">
              <span class="icon" show={participation_fourth}>
                <span class="fas fa-check"></span>
              </span>
            </td>
          </tr>

          <tr>
            <th class="has-text-centered">RESPONSIBILITY</th>
            <th class="has-text-centered"></th>
          </tr>
          <tr>
            <td>1. Takes initiative in situations which require responsibility</td>
            <td class="has-text-centered">
              <span class="icon" show={responsibility_first}>
                <span class="fas fa-check"></span>
              </span>
            </td>
          </tr>   
          <tr>
            <td>2. Accepts a responsibility only when it is assigned</td>
            <td class="has-text-centered">
              <span class="icon" show={responsibility_second}>
                <span class="fas fa-check"></span>
              </span>
            </td>
          </tr>   
          <tr>
            <td>3. Casual about responsibility</td>
            <td class="has-text-centered">
              <span class="icon" show={responsibility_third}>
                <span class="fas fa-check"></span>
              </span>
            </td>
          </tr>   
          <tr>
            <td>4. Reluctant to accept responsibility</td>
            <td class="has-text-centered">
              <span class="icon" show={responsibility_fourth}>
                <span class="fas fa-check"></span>
              </span>
            </td>
          </tr>
        </tbody>
      </table>

    </center>

  </section>
  

	<script>
	var self = this
  self.student_info = {'student_name':'','enroll_number':'','term':'','standard':''}
    self.on("mount", function(){
      self.title = ''
      self.view = 'maturity_developments'
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
      maturityDevelopmentStore.off('read_classes_changed',ClassesChanged)
      maturityDevelopmentStore.off('read_section_changed',SectionChanged)
      maturityDevelopmentStore.off('maturity_developments_changed',MaturityDevelopmentsChanged)
      maturityDevelopmentStore.off('maturity_development_student_update_changed',MaturityDevelopmentsReadUpdateChanged)
      maturityDevelopmentStore.off('read_maturity_development_details_changed',MaturityDevelopmentsDetailsChanged)
    })

    self.readClass = () => {
       self.loading = true;
       maturityDevelopmentStore.trigger('read_classes')
    }

    self.readSection = () => {
       self.loading = true;
       maturityDevelopmentStore.trigger('read_section')
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
       maturityDevelopmentStore.trigger('read_exam_types',self.refs.standardSelect.value)
    }

    self.readMaturityDevelopmentStudents = () => {
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
        maturityDevelopmentStore.trigger('read_maturity_development_students',self.refs.sectionSelect.value, self.refs.examTermSelect.value)
      }  

    }

    self.openMaturityDevelopmentForm = (c,e) => {
      self.title='Add'
      self.action='MaturityDevelopmentForm'
      self.details=c.student_name + ',' + 'Enroll No: ' + c.enroll_number
      self.student_id=c.student_id
      self.update()
    }

    self.closeMaturityDevelopmentForm = () => {
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
      obj['initiative_first']=0
      obj['initiative_second']=0
      obj['initiative_third']=0
      obj['initiative_fourth']=0

      if(self.refs.initiativeAndPerseveranceSelect.value == 'initiative_first'){
        obj['initiative_first']=1
      }else if(self.refs.initiativeAndPerseveranceSelect.value == 'initiative_second'){
        obj['initiative_second']=1
      }else if(self.refs.initiativeAndPerseveranceSelect.value == 'initiative_third'){
        obj['initiative_third']=1
      }else if(self.refs.initiativeAndPerseveranceSelect.value == 'initiative_fourth'){
        obj['initiative_fourth']=1
      }

      obj['interest_first']=0
      obj['interest_second']=0
      obj['interest_third']=0
      obj['interest_fourth']=0

      if(self.refs.interestSelect.value == 'interest_first'){
        obj['interest_first']=1
      }else if(self.refs.interestSelect.value == 'interest_second'){
        obj['interest_second']=1
      }else if(self.refs.interestSelect.value == 'interest_third'){
        obj['interest_third']=1
      }else if(self.refs.interestSelect.value == 'interest_fourth'){
        obj['interest_fourth']=1
      }

      obj['use_time_first']=0
      obj['use_time_second']=0
      obj['use_time_third']=0
      obj['use_time_fourth']=0

      if(self.refs.useOfTimeSelect.value == 'time_first'){
        obj['use_time_first']=1
      }else if(self.refs.useOfTimeSelect.value == 'time_second'){
        obj['use_time_second']=1
      }else if(self.refs.useOfTimeSelect.value == 'time_third'){
        obj['use_time_third']=1
      }else if(self.refs.useOfTimeSelect.value == 'time_fourth'){
        obj['use_time_fourth']=1
      }

      obj['work_habit_first']=0
      obj['work_habit_second']=0
      obj['work_habit_third']=0
      obj['work_habit_fourth']=0

      if(self.refs.worksHabitsSelect.value == 'work_first'){
        obj['work_habit_first']=1
      }else if(self.refs.worksHabitsSelect.value == 'work_second'){
        obj['work_habit_second']=1
      }else if(self.refs.worksHabitsSelect.value == 'work_third'){
        obj['work_habit_third']=1
      }else if(self.refs.worksHabitsSelect.value == 'work_fourth'){
        obj['work_habit_fourth']=1
      }

      obj['participation_first']=0
      obj['participation_second']=0
      obj['participation_third']=0
      obj['participation_fourth']=0

      if(self.refs.participationInGroupWorkSelect.value == 'participation_first'){
        obj['participation_first']=1
      }else if(self.refs.participationInGroupWorkSelect.value == 'participation_second'){
        obj['participation_second']=1
      }else if(self.refs.participationInGroupWorkSelect.value == 'participation_third'){
        obj['participation_third']=1
      }else if(self.refs.participationInGroupWorkSelect.value == 'participation_fourth'){
        obj['participation_fourth']=1
      }


      obj['responsibility_first']=0
      obj['responsibility_second']=0
      obj['responsibility_third']=0
      obj['responsibility_fourth']=0

      if(self.refs.responsibilitySelect.value == 'responsibility_first'){
        obj['responsibility_first']=1
      }else if(self.refs.responsibilitySelect.value == 'responsibility_second'){
        obj['responsibility_second']=1
      }else if(self.refs.responsibilitySelect.value == 'responsibility_third'){
        obj['responsibility_third']=1
      }else if(self.refs.responsibilitySelect.value == 'responsibility_fourth'){
        obj['responsibility_fourth']=1
      }

      if(self.refs.examTermSelect.value==''){
        error = error + "Please select exam term, "
      }

      if(error.length!=0){
        toastr.error(error)
        return
      }else{
        obj['student_id']=self.student_id
        obj['exam_term']=self.refs.examTermSelect.value

        self.loading = true
        if(self.title=='Add'){
          maturityDevelopmentStore.trigger('add_maturity_developments', obj)
        }else if(self.title=='Update'){
          maturityDevelopmentStore.trigger('update_maturity_developments', obj, self.student_details.id)
        }
      }  

    }

    self.viewDetails = (c,e) => {
      self.student_info=c
      self.student_info.term=self.refs.examTermSelect.value
      self.loading=true
      maturityDevelopmentStore.trigger('read_maturity_development_details',c.student_id, self.refs.examTermSelect.value)
    }

    self.closeDetails = (c,e) => {
      self.view='maturity_developments'
      self.update()
    }

    self.edit = (c,e) => {
      self.details=c.student_name + ',' + 'Enroll No: ' + c.enroll_number
      self.loading=true
      maturityDevelopmentStore.trigger('read_maturity_development_update',c.student_id, self.refs.examTermSelect.value)
    }

   self.cancelOperation = (e) => {
      self.maturityDevelopments.map(c => {
          c.confirmDelete = false
          c.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.maturityDevelopments.map(c => {
        if(c.student_id != e.item.c.student_id){
          c.confirmDelete = false
        }else{
          c.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      maturityDevelopmentStore.trigger('delete_maturity_developments', e.item.c.student_id,self.refs.examTermSelect.value)
    }


    // ****************************************** all change metods *************************************

    maturityDevelopmentStore.on('read_classes_changed',ClassesChanged)
    function ClassesChanged(classes){
      self.loading = false
      self.classes = []
      self.classes = classes
      self.update()
      console.log(self.classes)
    }

    maturityDevelopmentStore.on('read_section_changed',SectionChanged)
    function SectionChanged(sections){
      self.loading = false
      self.sections = []
      self.sections = sections
      self.update()
    }

    maturityDevelopmentStore.on('maturity_development_students_changed',MaturityDevelopmentsChanged)
    function MaturityDevelopmentsChanged(maturityDevelopments){
      self.loading = false
      self.maturityDevelopments = []
      self.maturityDevelopments = maturityDevelopments
      self.update()
    }

    maturityDevelopmentStore.on('maturity_development_student_update_changed',MaturityDevelopmentsReadUpdateChanged)
    function MaturityDevelopmentsReadUpdateChanged(details){
      self.student_details = {}
      if(details.length>0){
        self.student_details = details[0]
        self.title='Update'
        self.action='MaturityDevelopmentForm'
        
        if(self.student_details.initiative_first==1){
          self.refs.initiativeAndPerseveranceSelect.value = 'initiative_first'
        }else if(self.student_details.initiative_second==1){
          self.refs.initiativeAndPerseveranceSelect.value = 'initiative_second'
        }else if(self.student_details.initiative_third==1){
          self.refs.initiativeAndPerseveranceSelect.value = 'initiative_third'
        }else if(self.student_details.initiative_fourth==1){
          self.refs.initiativeAndPerseveranceSelect.value = 'initiative_fourth'
        }

        if(self.student_details.interest_first==1){
          self.refs.interestSelect.value = 'interest_first'
        }else if(self.student_details.interest_second==1){
          self.refs.interestSelect.value = 'interest_second'
        }else if(self.student_details.interest_third==1){
          self.refs.interestSelect.value = 'interest_third'
        }else if(self.student_details.interest_fourth==1){
          self.refs.interestSelect.value = 'interest_fourth'
        }

        if(self.student_details.use_time_first==1){
          self.refs.useOfTimeSelect.value = 'time_first'
        }else if(self.student_details.use_time_second==1){
          self.refs.useOfTimeSelect.value = 'time_second'
        }else if(self.student_details.use_time_third==1){
          self.refs.useOfTimeSelect.value = 'time_third'
        }else if(self.student_details.use_time_fourth==1){
          self.refs.useOfTimeSelect.value = 'time_fourth'
        }

        if(self.student_details.work_habit_first==1){
          self.refs.worksHabitsSelect.value = 'work_first'
        }else if(self.student_details.work_habit_second==1){
          self.refs.worksHabitsSelect.value = 'work_second'
        }else if(self.student_details.work_habit_third==1){
          self.refs.worksHabitsSelect.value = 'work_third'
        }else if(self.student_details.work_habit_fourth==1){
          self.refs.worksHabitsSelect.value = 'work_fourth'
        }

        if(self.student_details.participation_first==1){
          self.refs.participationInGroupWorkSelect.value = 'participation_first'
        }else if(self.student_details.participation_second==1){
          self.refs.participationInGroupWorkSelect.value = 'participation_second'
        }else if(self.student_details.participation_third==1){
          self.refs.participationInGroupWorkSelect.value = 'participation_third'
        }else if(self.student_details.participation_fourth==1){
          self.refs.participationInGroupWorkSelect.value = 'participation_fourth'
        }

        if(self.student_details.responsibility_first==1){
          self.refs.responsibilitySelect.value = 'responsibility_first'
        }else if(self.student_details.responsibility_second==1){
          self.refs.responsibilitySelect.value = 'responsibility_second'
        }else if(self.student_details.responsibility_third==1){
          self.refs.responsibilitySelect.value = 'responsibility_third'
        }else if(self.student_details.responsibility_fourth==1){
          self.refs.responsibilitySelect.value = 'responsibility_fourth'
        }

        self.loading = false
        self.update()
      }else{
        self.loading = false
        toastr.error('Please Assign Maturity Development')
        self.update()
      }
      
    }

    maturityDevelopmentStore.on('read_maturity_development_details_changed',MaturityDevelopmentsDetailsChanged)
    function MaturityDevelopmentsDetailsChanged(details){
      
      if(details.length>0){
        self.view='details'

        self.initiative_first = false
        self.initiative_second = false
        self.initiative_third = false
        self.initiative_fourth = false
        if(details[0].initiative_first==1){
          self.initiative_first = true
        }else if(details[0].initiative_second==1){
          self.initiative_second = true
        }else if(details[0].initiative_third==1){
          self.initiative_third = true
        }else if(details[0].initiative_fourth==1){
          self.initiative_fourth = true
        }

        self.interest_first = false
        self.interest_second = false
        self.interest_third = false
        self.interest_fourth = false
        if(details[0].interest_first==1){
          self.interest_first = true
        }else if(details[0].interest_second==1){
          self.interest_second = true
        }else if(details[0].interest_third==1){
          self.interest_third = true
        }else if(details[0].interest_fourth==1){
          self.interest_fourth = true
        }

        self.time_first = false
        self.time_second = false
        self.time_third = false
        self.time_fourth = false 
        if(details[0].use_time_first==1){
          self.time_first = true
        }else if(details[0].use_time_second==1){
          self.time_second = true
        }else if(details[0].use_time_third==1){
          self.time_third = true
        }else if(details[0].use_time_fourth==1){
          self.time_fourth = true
        }

        self.work_first = false
        self.work_second = false
        self.work_third = false
        self.work_fourth = false 
        if(details[0].work_habit_first==1){
          self.work_first = true
        }else if(details[0].work_habit_second==1){
          self.work_second = true
        }else if(details[0].work_habit_third==1){
          self.work_third = true
        }else if(details[0].work_habit_fourth==1){
          self.work_fourth = true
        }

        
        self.participation_first = false
        self.participation_second = false
        self.participation_third = false
        self.participation_fourth = false
        if(details[0].participation_first==1){
          self.participation_first = true
        }else if(details[0].participation_second==1){
          self.participation_second = true
        }else if(details[0].participation_third==1){
          self.participation_third = true
        }else if(details[0].participation_fourth==1){
          self.participation_fourth = true
        }

        self.responsibility_first = false
        self.responsibility_second = false
        self.responsibility_third = false
        self.responsibility_fourth = false
        if(details[0].responsibility_first==1){
          self.responsibility_first = true
        }else if(details[0].responsibility_second==1){
          self.responsibility_second = true
        }else if(details[0].responsibility_third==1){
          self.responsibility_third = true
        }else if(details[0].responsibility_fourth==1){
          self.responsibility_fourth = true
        }

        self.loading = false
        self.update()
      }else{
        self.loading = false
        toastr.error('Please Assign Maturity Development')
        self.update()
      }
      
    }

    maturityDevelopmentStore.on('add_maturity_developments_changed',AddMaturityDevelopmentChanged)//update changes calls the same method
    function AddMaturityDevelopmentChanged(maturityDevelopments){
      self.closeMaturityDevelopmentForm()
      self.loading = false
      self.readMaturityDevelopmentStudents()
      self.update()
    }

    maturityDevelopmentStore.on('delete_maturity_developments_changed',DeleteMaturityDevelopmentChanged)
    function DeleteMaturityDevelopmentChanged(maturityDevelopments){
      self.loading = false
      self.maturityDevelopments.map(c => {
        c.confirmDelete = false
      })
      self.readMaturityDevelopmentStudents()
      self.update()
    }

</script>
</maturity-development>