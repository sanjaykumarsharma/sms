<birthday>
	<section class=" is-fluid">
		<div class="level">
			<div class="level-left">
				<h2 class="title" style="color: #ff3860;">Birth Day</h2>
			</div>
		</div>
		<div class="box" style="font-size:13px ">
			<div class="columns">
				<div class="column is-narrow">
					<div class="control">
						<div class="select">
							<select ref="type_id">
								<option value='All'>All</option>
								<option value='Student'>Student</option>
								<option value='Staff'>Staff</option>
							</select>
						</div>
					</div>
				</div>
				<div class="column is-narrow">
					<div class="control">
						<button class="button" onclick={toDayBirthDay}>Today</button>
					</div>
				</div>
				<div class="column is-narrow">
					<div class="control">
						<button class="button" onclick={tomorrowBirthDay}>Tomorrow</button>
					</div>
				</div>
				<div class="column is-narrow">
					<div class="control">
						<button class="button" onclick={thisMonthBirthDay}>Month</button>
					</div>
				</div>
				 <div class="column is-narrow">
               <label class="label">Start Date</label>
               </div>
		        <div class="column is-narrow">
		          <div class="control">
		             <input class="input date flatpickr-input form-control input"  ref="start_date" placeholder="" tabindex="0"  type="text">
		          </div>
		        </div>
		          <div class="column is-narrow">
		          <label class="label">End Date</label>
		        </div>
		        <div class="column is-narrow">
		          <div class="control">
		              <input class="input date flatpickr-input form-control input"  ref="end_date" placeholder="" tabindex="0"  type="text">
		          </div>
		        </div>
		        <div class="column is-narrow">
					<div class="control">
						<button class="button is-danger has-text-weight-bold" onclick={dateRangeBirthDay}>Go</button>
						<input type="checkbox" id="checkTable" checked={e.done}
				         onclick={viewTable}  style="margin-top: 12px;"> Table
					</div>
				</div>
			</div>
		</div>
		<table class="table is-fullwidth is-striped is-hoverable is-narrow" show={report_view =='show_table'}>
			<thead>
				<tr>
					<th>#</th>
					<th>Enroll/ID</th>
					<th>Name</th>
					<th>Class/Designation</th>
					<th>Section/Department</th>
					<th>DOB</th>
					<th>Age</th>
					<th>Type</th>
					
				</tr>
			</thead>
			<tbody>
				<tr each={st, i in birthDayData}>
					<td>{i+1}</td>
					<td>{st.enroll_id}</td>
					<td>{st.name} </td>
					<td>{st.group}</td>
					<td>{st.category}</td>
					<td>{st.dob}</td>
					<td>{st.age}</td>
					<td>{st.type}</td>
					
				</tr>
			</tbody>
		</table>
		<div class="columns is-multiline">
			<div class="column is-narrow " each={st, i in birthDayData} show={report_view =='show_card'}>
			    <div class="control">
					<div class="card" style="height: 250px;">
						<div class="card-image">
						    <figure class="image is-4by3">
						      <div style="padding:2px;" show={st.type=='Student'}><img src="images/{session_id}/studentImages/{st.id}.jpg"></div>
						      <div style="padding:2px;" show={st.type=='Teacher'}><img src="images/empImages/{st.id}.jpg"></div>
						    </figure>
					  	</div>
					    <div class="content">
					    	<p style="padding:10px;" class="has-text-weight-bold">{st.name} <br>
					    	{st.group} {st.category}</p>
					    </div>
					  </div>
					</div>
		   		</div>
	   		</div>
        </div>
	</section>
	
<!-- End Other Information -->
<script>
	
	var self = this
    self.on("mount", function(){
    	self.title='Add'
    	self.report_view = 'show_card'
    	self.role = getCookie('role') 
    	//self.readCategory()	
        self.update()
        flatpickr(".date", {
	    	allowInput: true,
        	dateFormat: "Y-m-d",
  		})
    })

    self.on("unmount", function(){
      birthDayStore.off('read_birth_day_changed',ReadBirthDayChanged)
       //categoryStore.off('categories_changed', CategoriesChanged)
    })
    self.viewTable = () => {
    	if($('#checkTable').is(":checked")){
	        self.report_view = 'show_table'
    	}else{
	        self.report_view = 'show_card'
    	}
    }
    self.toDayBirthDay = () => {
       self.dayType='toDay'
       self.s_date=''
       self.e_date=''
       self.readBirthDay()
    }
    self.tomorrowBirthDay = () => {
       self.dayType='Tomorrow'
       self.s_date=''
       self.e_date=''
       self.readBirthDay()
    }
    self.thisMonthBirthDay = () => {
       self.dayType='Month'
       self.s_date=''
       self.e_date=''
       self.readBirthDay()
    }

    self.dateRangeBirthDay = () => {
    	self.s_date=self.refs.start_date.value
    	self.e_date=self.refs.end_date.value
    	self.dayType='DateRange'
        self.readBirthDay()
    }

    self.readBirthDay = () => {
       birthDayStore.trigger('read_birth_day', self.dayType, self.s_date,self.e_date,self.refs.type_id.value)
    }
     
    birthDayStore.on('read_birth_day_changed',ReadBirthDayChanged)
    function ReadBirthDayChanged(birthDayData,session_id){
      //console.log(birthDayData) 
      self.title='Create'
      self.loading = false
      self.birthDayData = birthDayData
      self.session_id = session_id
      self.update()
      //console.log(self.employeeTypes)
    }
    

    
</script>
</birthday>