<time-table-assign-teacher>
<loading-bar if={loading}></loading-bar>  
  
  <section class=" is-fluid">

    <div class="level">
      <div class="level-left">
        <h2 class="title" style="color: #ff3860;">Time Table Assign Teacher</h2>
      </div>
      <div class="level-right">
      </div>
    </div>

    <div class="box">
      <div class="columns">

        <div class="column is-narrow"><label class="label">Select Teacher to make TT</label></div>  
        <div class="column is-narrow">  
          <div class="control">
            <div class="select ">
              <select ref="teacherOneSelect">
                <option each={teachers} value={emp_id}>{name}</option>
              </select>
            </div>
          </div>
        </div>

        <div class="column is-narrow"><label class="label">Select Teacher whose TT to be assigned</label></div>  
        <div class="column is-narrow">  
          <div class="control">
            <div class="select ">
              <select ref="teacherTwoSelect">
                <option each={teachersTwo} value={emp_id}>{name}</option>
              </select>
            </div>
          </div>
        </div>

        <div class="column">
          <button class="button is-rounded" onclick={assignTimeTable}> Go </button>
        </div>

      </div>
    </div> 


  </section>

	<script>
	var self = this

    self.on("mount", function(){
      self.loading = false;
      self.readInit();
    })
    self.on("unmount", function(){
      timeTableAdminStore.off('read_init_assign_teacher_changed',InitChanged)
      timeTableAdminStore.off('assign_teacher_time_table_changed',AssignTeacherChanged)
    })
  
   self.readInit = () => {
    self.loading = true;
    timeTableAdminStore.trigger('read_init_assign_teacher')
   }

   self.assignTimeTable = () => {
    self.loading = true;
    timeTableAdminStore.trigger('assign_teacher_time_table',self.refs.teacherOneSelect.value,self.refs.teacherTwoSelect.value)
   }

   

   /************************************************ Time Table Changed Method ************************************************/
   timeTableAdminStore.on('read_init_assign_teacher_changed',InitChanged)
    function InitChanged(teachers){
      self.loading = false

      self.teachers = []
      self.teachers = teachers

      self.teachersTwo = []
      self.teachersTwo = teachers

      self.update()
    }

   timeTableAdminStore.on('assign_teacher_time_table_changed',AssignTeacherChanged)
    function AssignTeacherChanged(){
      self.loading = false

      toastr.success("Teacher Assigned Successfully ")

      self.update()
    }

</script>
</time-table-assign-teacher>