<student-search>
	<section class=" is-fluid">
		<div class="level">
			<div class="level-left">
				<h2 class="title" style="color: #ff3860;">Students</h2>
			</div>
		</div>
		<div class="box">
			<div class="columns">
				<div class="column is-narrow">
					<div class="control">
			         <label class="label">Roll No</label>
			       </div>
			    </div> 
				<div class="column is-narrow">
					<div class="control">
						<input type="text" name="" ref='roll_no' class="input">
					</div>
				</div>
				<div class="column">
				<button class="button is-danger has-text-weight-bold"
				onclick={searchByField}>Go
				</button>
				<button class="button is-danger has-text-weight-bold"
				onclick={showSearchBox}><b>>></b>
				</button>
			   </div>
			</div>
		</div>
		<div class="box" show={search_view =='more_search_box'}>
			<div class="columns">
				<div class="column is-narrow">
					<div class="control">
			         <label class="label">Name</label>
			       </div>
			    </div> 
				<div class="column is-narrow">
					<div class="control">
						<input type="text" name="" ref='student_name' class="input">
					</div>
				</div>
				<div class="column is-narrow">
					<div class="control">
			         <label class="label">Reg.Number</label>
			       </div>
			    </div> 
				<div class="column is-narrow">
					<div class="control">
						<input type="text" name="" ref='reg_number' class="input">
					</div>
				</div>
			</div>
			<div class="columns">
				<div class="column is-narrow">
					<div class="control">
			         <label class="label">F Name</label>
			       </div>
			    </div> 
				<div class="column is-narrow">
					<div class="control">
						<input type="text" name="" ref='f_name' class="input">
					</div>
				</div>
				<div class="column is-narrow">
					<div class="control">
			         <label class="label">M Name</label>
			       </div>
			    </div> 
				<div class="column is-narrow">
					<div class="control">
						<input type="text" name="" ref='m_name' class="input">
					</div>
				</div>
				<div class="column">
				<button class="button is-danger has-text-weight-bold"
				onclick={searchByField}>Search
				</button>
			   </div>
			</div>
		</div>
		<table class="table is-fullwidth is-striped is-hoverable is-narrow">
			<thead>
				<tr>
					<th>#</th>
					<th>Student Name</th>
					<th>Withdrawn</th>
					<th>Enroll No</th>
					<th>Reg. No</th>
					<th>Roll No</th>
					<th>House</th>
					<th>Class</th>
					<th>Father's Name</th>
					<th>Mother's Name</th>
				</tr>
			</thead>
			<tbody>
				<tr each={st, i in searchStudents}>
					<td>{i+1}</td>
					<td>{st.first_name} {st.middle_name} {st.last_name}</td>
					<td>{st.withdraw}</td>
					<td> {st.enroll_number}</td>
					<td> {st.reg_number}</td>
					<td>{st.roll_number}</td>
					<td>{st.house_name}</td>
					<td>{st.standard}</td>
					<td>{st.f_name}</td>
					<td>{st.m_name}</td>
					
				</tr>
			</tbody>
		</table>
	</section>
<!-- End Other Information -->
<script>
	
	var self = this
    self.on("mount", function(){
    	self.title='Add'
    	self.search_by='more'
    	self.role = getCookie('role') 
        self.update()
        flatpickr(".date", {
	    	allowInput: true,
        	dateFormat: "d/m/Y",
  		})
    })

    self.on("unmount", function(){
     // studentSearchStore.off('read_by_roll_change',ReadByRollChange)
      studentSearchStore.off('read_by_field_change',ReadByFieldChanged)
    })

    self.showSearchBox = () =>{
      if(self.search_by=='one'){
      	self.search_view='search_box'
      	self.search_by='more';
      	//self.update()
      }else{
      	self.search_by='one';
      	self.search_view='more_search_box'
       // self.update()
      }
    } 

    /*self.searchByRoll = () =>{
       studentSearchStore.trigger('read_by_roll', self.refs.roll_no.value)
    }*/
    self.searchByField = () => {
    	console.log("inside")
    	console.log(self.refs.roll_no.value)
       studentSearchStore.trigger('read_by_field',self.refs.roll_no.value,self.refs.student_name.value,self.refs.reg_number.value,self.refs.f_name.value,self.refs.m_name.value)
    }
    
   /* studentSearchStore.on('read_by_roll_change',read_by_roll_change)
    function read_by_roll_change(searchStudents){
      //console.log(searchStudents) 
      self.title='Create'
      self.loading = false
      self.searchStudents = searchStudents
      self.update()
      //self.ReadBrowseStaff()
    }*/
    studentSearchStore.on('read_by_field_change',ReadByFieldChanged)
    function ReadByFieldChanged(searchStudents){
      //console.log(searchStudents) 
      self.title='Create'
      self.loading = false
      self.searchStudents = searchStudents
      self.update()
      //console.log(self.employeeTypes)
    }
    

    
</script>
</student-search>