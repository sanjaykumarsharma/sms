<employee-notification>
	<section class=" is-fluid" >
    <div class="level">
      <div class="level-left">
        <h2 class="title" style="color: #ff3860;">Employees Notification</h2>
      </div>
    </div>
    <div class="box">
      <div class="columns">
        <div class="column is-narrow">
          <label class="label">Staff Type</label>
        </div>
        <div class="column is-narrow">
          <div class="control">
            <div class="select">
              <select ref="emp_type_id" onchange={getEmployeeData}>
                <option each={staffDepartments} value={emp_type_id}>{emp_type}
                <option value="-1">ALL</option>
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="column is-narrow">
          <div class="control">
            <div class="select">
              <select ref="get_message_type" onchange={getMessageType}>
                <option value="Email">Email</option>
                <option value="SMS">SMS</option>
                <option value="Both">Both</option>
              </select>
            </div>
          </div>
        </div>
        <div class="column">
          <button class="button is-danger has-text-weight-bold" show={choose_button}
          onclick={getStaffManually} >Choose Staff Manually
          </button>
           <button class="button has-text-weight-bold" onclick={closeStaffManually} show={close_button} >Close
          </button>
        </div>
      </div>
    </div>
    <input class="input" style="margin-bottom: 12px;" type="text" id="employee_subject" ref="employee_subject" 
    show={employee_subject} placeholder="SUBJECT"><br>
    <textarea class="textarea" id="employee_message" ref="employee_message" placeholder="MESSAGE"></textarea><br>
    <button class="button is-info is-pulled-right ml5" onclick={clear} >Reset</button>
    <button class="button is-danger is-pulled-right" onclick={sendEmployeeNotification} >Send</button>
    <table class="table is-fullwidth is-striped is-hoverable is-narrow" show={employee_table}>
      <thead>
        <tr>
          <th>#</th>
          <th>Emp Id</th>
          <th>Name</th>
          <th>Department</th>
          <th>Designation</th>
          <th>Mobile</th>
          <th>Email</th>
          <th style="text-align:center;">
            <input type="checkbox" id="checkFacultyName" 
             onclick={selectAll}>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr each={emp, i in employees}>
          <td>{ i+1 }</td>
          <td>{emp.employee_id}</td>
          <td>{emp.employee_name}</td>
          <td>{emp.department_name}</td>
          <td>{emp.designation}</td>
          <td>{emp.mobile}</td>
          <td>{emp.email}</td>
          <td style="width:2%; text-align:center;"><input type="checkbox" checked={emp.done} id="{ 'addEmployeeName' + emp.employee_id }" onclick={ selectEmployee.bind(this,emp) }></td>
        </tr>
      </tbody>
    </table>
    
  </section>

  
<script>
  var self = this
    self.on("mount", function(){
      self.addAllCheckBox=true;
      self.addCheckBox=true;
      self.staff_name = false;
     // self.SendSms=true
      self.choose_button = true
      self.close_button = false
      self.update()
      self.readDepartments()

    })

     self.getMessageType = () =>{
      if(self.refs.get_message_type.value =='SMS'){
        self.employee_subject = false
      }else if(self.refs.get_message_type.value =='Email'){
        self.employee_subject = true
      }else{
        self.employee_subject = true
      }
    }

    self.getStaffManually = () =>{
      self.employee_table= true;
      self.choose_button = false
      self.close_button = true
    }

    self.closeStaffManually = () =>{
      self.employee_table = false;
      self.choose_button = true
      self.close_button = false
    }
    self.readDepartments = () => {
      console.log('readDepartments for employee tag file')
        employeeNotificationStore.trigger('read_staff_departments')
    }
    self.on("unmount", function(){
      employeeNotificationStore.off('employees_changed', EmployeeChanged)
      employeeNotificationStore.off('employee_sms_changed',SendSmsChanged)
      employeeNotificationStore.off('employee_email_changed',SendEmailChanged)
    })

    self.getEmployeeData = ()=>{
      employeeNotificationStore.trigger('read_employees', self.refs.emp_type_id.value)
    }

    self.selectAll = () => {
      if($('#checkFacultyName').is(":checked")){
        self.employees.map(i=>{
            i.done = true;
            $('addEmployeeName'+i.employee_id).prop('checked', true);
          })
      }else{
        self.employees.map(i=>{
            i.done = false;
            $('addEmployeeName'+i.employee_id).prop('checked', false);
            
          })
      }
      console.log(self.employees)
    }

    self.selectEmployee = (item,event) => {
      item.done=!event.item.emp.done
      self.mobile = item.mobile;
        console.log(self.mobile)
    }


    self.sendEmployeeNotification = () => {
      let mobile='';
      let email='';
      self.employees.map( q => {
        if(q.done){
          if(mobile==''){
            mobile=q.mobile
          }else{
            mobile=mobile+','+q.mobile
          }

          if(email==''){
            email=q.email
          }else{
            email=email+','+q.email
          }
        }
      })
      
      console.log(mobile);
      console.log(email);
      if(self.refs.get_message_type.value =='SMS'){
        if(self.refs.employee_message.value == ""){
          toastr.error("Please enter Valid Message and try again")
          return;
        }
        employeeNotificationStore.trigger('send_sms',mobile,self.refs.employee_message.value)
      }else if(self.refs.get_message_type.value =='Email'){
        if(self.refs.employee_subject.value == ""){
          toastr.error("Please enter Valid Subject and try again")
          return;
        }
        if(self.refs.employee_message.value == ""){
          toastr.error("Please enter Valid Message and try again")
          return;
        }
        employeeNotificationStore.trigger('send_email',email,self.refs.employee_subject.value,self.refs.employee_message.value)
      }else if(self.refs.get_message_type.value=='Both'){
        employeeNotificationStore.trigger('send_sms',mobile,self.refs.employee_message.value)
        employeeNotificationStore.trigger('send_email',email,self.refs.employee_subject.value,self.refs.employee_message.value)
      }
    }

    self.clear = () => {
      self.refs.employee_subject.value = ''
      self.refs.employee_message.value = ''
    }


    employeeNotificationStore.on('read_employee_notification_changed', function(employees) {
      self.loading = false
      self.employees = employees
      self.update()
    })

    employeeNotificationStore.on('staff_departments_changed',DepartmentChanged)
    function DepartmentChanged(staff_departments){
      console.log(staff_departments) 
      self.staffDepartments = []
      self.staffDepartments = staff_departments
      self.update()
      self.getEmployeeData()
    }
    employeeNotificationStore.on('employees_changed',EmployeeChanged)
    function EmployeeChanged(employees){
      console.log(employees) 
      self.employees = []
      self.employees = employees
      self.employees.map(i=>{
      if(i.mobile==""){
        i.done = false; //RoleId1
        //i.mobile = self.mobile
        $('addEmployeeName' + i.mobile ).prop('checked', false);
      }else{
        i.done = true;
        $('addEmployeeName' + i.mobile ).prop('checked', true);
      } 
      })
      self.update()
    }
    employeeNotificationStore.on('employee_sms_changed',SendSmsChanged)
    function SendSmsChanged(){
      self.refs.employee_subject.value = ''
      self.refs.employee_message.value = ''
      toastr.success('sms send successfully')
      self.update()
    }
    employeeNotificationStore.on('employee_email_changed',SendEmailChanged)
    function SendEmailChanged(){
      toastr.success('email send successfully')
      self.refs.employee_subject.value = ''
      self.refs.employee_message.value = ''
      self.update()
    }
</script>
</employee-notification>