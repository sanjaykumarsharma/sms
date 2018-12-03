<class-teacher-master>
	<section class=" is-fluid">
		<div class="box">
			<div class="columns">
        <div class="column is-narrow">
          <div class="control">
            <div class="select">
              <select ref="standard_id" onchange={getReadSection}>
                <option>Choose Standard</option>
                <!-- <option value='-1'>All</option> -->
                <option each={standards} value={standard_id}>{standard}
                              </option>
              </select>
            </div>
          </div>
        </div>
        <div class="column is-narrow">
          <div class="control">
                <div class="select is-fullwidth">
              <select ref="section_id">
                <option>Choose Section</option>
               <!--  <option value='-1'>All</option> -->
                <option each={readfilteredSections} value={section_id}>{section}
                              </option>
              </select>
            </div>
              </div>
          </div>
				<div class="column is-narrow">
					<label class="label">Room No</label>
				</div>
        <div class="column is-narrow">
        <div class="control">
            <input class=" input"
              ref="room_no" type="text" style="width:100px">
          </div>
        </div>
				<div class="column is-narrow">
          <div class="control">
            <div class="select">
              <select ref="class_teacher">
                <option>Class Teacher</option>
                <option each={employees} value={emp_id}>{teacher_name}
                </option>
              </select>
            </div>
          </div>
        </div>
       <div class="column is-narrow">
          <div class="control">
            <div class="select">
              <select ref="asst_class_teacher">
                 <option>Asst. Class Teacher</option>
                <option each={employees} value={emp_id}>{teacher_name}
                </option>
              </select>
            </div>
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
					<th>SL</th>
					<th>Standard</th>
          <th>Section</th>
          <th>Room</th>
          <th>Class Teacher</th>
					<th>Assistant Teacher</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr each={ev, i in classTeachers}>
					<td>{ i+1 }</td>
					<td>{ ev.standard}</td>
          <td>{ ev.section}</td>
          <td>{ ev.room}</td>
          <td>{ ev.class_teacher}</td>
					<td>{ ev.assistant_teacher}</td>
		          	<td class="has-text-right">
            			<div class="inline-flex rounded border border-grey overflow-hidden" hide={ev.confirmDelete}>
              				<span><a class="button is-small is-rounded" onclick={edit.bind(this, ev)}>Edit</a></span>
              				<span if={role=='ADMIN'}> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick={confirmDelete}>Delete</a></span>
            			</div>
            			<div class="table-buttons" if={ev.confirmDelete}>
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
      self.readStandard()
      self.readSection()
      self.readTeachingStaff()
      self.readClassTeacher()
      self.update()
    })
    self.on("unmount", function(){
      studentStore.off('read_standard_changed',StandardChanged)
      studentStore.off('read_section_changed',SectionChanged)
      classTeacherStore.off('read_teaching_staff_changed',ReadTeachingStaffChanged)
      classTeacherStore.off('read_class_teacher_changed', ReadClassTeacherChanged)
      classTeacherStore.off('add_class_teacher_changed', AddClassTeacherChanged)
      classTeacherStore.off('edit_class_teacher_changed',EditClassTeacherChanged)
      classTeacherStore.off('delete_class_teacher_changed',DeleteClassTeacherChanged)
    })

    self.readStandard = () => {
       studentStore.trigger('read_standard')
    }

    self.readSection = () => {
       studentStore.trigger('read_section')
    }

     self.getReadSection = () => {
      self.readfilteredSections = []
      self.readfilteredSections = self.sections.filter(s => {
        return s.standard_id == self.refs.standard_id.value
      })
    }

    //read courses
    self.readTeachingStaff = () => {
       classTeacherStore.trigger('read_teaching_staff')
    }

    //read employe_roles
    self.readClassTeacher = () => {
       classTeacherStore.trigger('read_class_teacher')
    }

     self.add = () => {
      if(!self.refs.standard_id.value){
        toastr.info("Please enter Subject and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          console.log('create')
          classTeacherStore.trigger('add_class_teacher',self.refs.standard_id.value,self.refs.section_id.value, self.refs.class_teacher.value,self.refs.asst_class_teacher.value, self.refs.room_no.value)
        }else if(self.title=='Update'){
          console.log('update')
          classTeacherStore.trigger('edit_class_teacher', self.refs.standard_id.value, self.refs.section_id.value, self.refs.class_teacher.value,self.refs.asst_class_teacher.value, self.refs.room_no.value, self.edit_id)
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

    self.cancelOperation = (e) =>{
      self.classTeachers.map(ev =>{
          ev.confirmDelete = false
          ev.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.classTeachers.map(ev => {
        if(ev.ts_id != e.item.ev.ts_id){
          ev.confirmDelete = false
        }else{
          ev.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      classTeacherStore.trigger('delete_class_teacher', e.item.ev.ts_id)
    }

    self.edit = (ev,e) => {
      console.log(ev)
      self.title='Update'
      self.refs.standard_id.value=ev.standard_id
      self.getReadSection()
      self.update()
      self.refs.section_id.value=ev.section_id
      self.refs.class_teacher.value=ev.c_id
      console.log(ev.c_id)
      console.log(ev.a_id)
      self.refs.asst_class_teacher.value=ev.a_id
      console.log(self.refs.asst_class_teacher.value)
      self.refs.room_no.value=ev.room
      self.edit_id = ev.ts_id
    }

    studentStore.on('read_standard_changed',StandardChanged)
    function StandardChanged(standards){
      console.log(standards) 
      self.standards = standards
      self.update()
    }

    studentStore.on('read_section_changed',SectionChanged)
    function SectionChanged(sections){
      console.log(sections) 
      self.sections = sections
      self.update()
      self.getReadSection()
    }
    
    classTeacherStore.on('add_class_teacher_changed',AddClassTeacherChanged)
    function AddClassTeacherChanged(classTeachers){
      console.log(classTeachers) 
      self.title='Create'
      self.refs.standard_id.value=''
      self.refs.section_id.value=''
      self.refs.class_teacher.value=''
      self.refs.asst_class_teacher.value=''
      self.refs.room_no.value=''

      self.loading = false
      self.classTeachers = classTeachers
      self.update()
    }

    classTeacherStore.on('edit_class_teacher_changed',EditClassTeacherChanged)
    function EditClassTeacherChanged(classTeachers){
      console.log(classTeachers) 
      self.title='Create'
      self.refs.standard_id.value=''
      self.refs.section_id.value=''
      self.refs.class_teacher.value=''
      self.refs.asst_class_teacher.value=''
      self.refs.room_no.value=''

      self.loading = false
      self.classTeachers = classTeachers
      self.update()
    }

    classTeacherStore.on('delete_class_teacher_changed',DeleteClassTeacherChanged)
    function DeleteClassTeacherChanged(classTeachers){
      console.log(classTeachers) 
      self.title='Create'
      self.loading = false
      self.classTeachers = classTeachers
      self.update()
    }

    classTeacherStore.on('read_teaching_staff_changed',ReadTeachingStaffChanged)
    function ReadTeachingStaffChanged(employees){
      self.title='Create'
      self.employees = employees
      self.loading = false
      self.update()
    }

    classTeacherStore.on('read_class_teacher_changed',ReadClassTeacherChanged)
    function ReadClassTeacherChanged(classTeachers){
      console.log(classTeachers) 
      self.classTeachers = classTeachers
      self.update()
      console.log(self.classTeachers)
    }

</script>
</class-teacher-master>