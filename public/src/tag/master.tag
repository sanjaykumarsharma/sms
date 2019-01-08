<master>
	<div class="field has-addons no-print">
	  	<p class="control">
		    <a class="button {is-active: selected_master == 'employee-type' }" href="#/master/employee-type">
		      <span>Employee Type</span>
		    </a>
	  	</p>
		<p class="control">
		    <a class="button {is-active: selected_master == 'designation'}" href="#/master/designation">
		      <span>Designation</span>
		    </a>
		</p>
	    <p class="control">
		    <a class="button {is-active: selected_master == 'department'}" href="#/master/department">
		      <span>Department</span>
		    </a>
	  	</p>
	  	 <p class="control">
		    <a class="button {is-active: selected_master == 'level'}" href="#/master/level">
		      <span>Level</span>
		    </a>
	  	</p>
	  	 <p class="control">
		    <a class="button {is-active: selected_master == 'employment-status'}" href="#/master/employment-status">
		      <span>Employment Status</span>
		    </a>
	  	</p>
	  	<p class="control">
		    <a class="button {is-active: selected_master == 'role'}" href="#/master/role">
		      <span>Employee Role</span>
		    </a>
	  	</p>
	  	<p class="control">
		    <a class="button {is-active: selected_master == 'category'}" href="#/master/category">
		      <span>Category</span>
		    </a>
	  	</p>
	  	<p class="control">
		    <a class="button {is-active: selected_master == 'subject'}" href="#/master/subject">
		      <span>Subject</span>
		    </a>
	  	</p>
	  	<p class="control">
		    <a class="button {is-active: selected_master == 'country'}" href="#/master/country">
		      <span>Country</span>
		    </a>
	  	</p>
	  	<p class="control">
		    <a class="button {is-active: selected_master == 'city'}" href="#/master/city">
		      <span>City</span>
		    </a>
	  	</p>
	  	<p class="control">
		    <a class="button {is-active: selected_master == 'state'}" href="#/master/state">
		      <span>State</span>
		    </a>
	  	</p>
	  	<p class="control">
		    <a class="button {is-active: selected_master == 'religion'}" href="#/master/religion">
		      <span>Religion</span>
		    </a>
	  	</p>
	  	<p class="control">
		    <a class="button {is-active: selected_master == 'area'}" href="#/master/area">
		      <span>Area</span>
		    </a>
	  	</p>
	 
	  
     </div>
     <div class="field has-addons no-print" >
     	 	<p class="control">
		    <a class="button {is-active: selected_master == 'standard'}" href="#/master/standard">
		      <span>New Class</span>
		    </a>
	  	</p>
	  	<p class="control">
		    <a class="button {is-active: selected_master == 'section-master'}" href="#/master/section-master">
		      <span>Section</span>
		    </a>
	  	</p>
     	<p class="control">
		    <a class="button {is-active: selected_master == 'class-teacher-master'}" href="#/master/class-teacher-master">
		      <span>Class Teacher</span>
		    </a>
	  	</p>
     	<p class="control">
		    <a class="button {is-active: selected_master == 'club'}" href="#/master/club">
		      <span>Club</span>
		    </a>
	  	</p>
	  	<p class="control">
		    <a class="button {is-active: selected_master == 'parentgroup' }" href="#/master/parentgroup">
		      <span>Parent Group</span>
		    </a>
	  	</p>
	  	<p class="control">
		    <a class="button {is-active: selected_master == 'remark' }" href="#/master/remark">
		      <span>Remark</span>
		    </a>
	  	</p>
	  	<p class="control">
		    <a class="button {is-active: selected_master == 'event-master'}" href="#/master/event-master/event-type">Event Calender</a>
		    </a>
	  	</p>
	  	<p class="control">
		    <a class="button {is-active: selected_master == 'event-master'}" href="#/master/inventory-department">Inventory Department</a>
		    </a>
	  	</p>
</div>
<div id="master-view"></div>
 <script>
    var self = this
    console.log('opts.selected_master')
    console.log(opts.selected_master)
    if(!opts.selected_master){
      self.selected_master = 'employee-type'
    }else{
      self.selected_master = opts.selected_master
    }
  </script>
</master>


