<student-category-strength-report>
	<section class=" is-fluid">
		<div class="level">
			<div class="level-left">
				<h2 class="title" style="color: #ff3860;">Cast Category Listing</h2>
			</div>
		</div>
		<div class="box">
			<div class="columns">
				<div class="column is-narrow">
					<div class="control">
						<div class="select">
							<select ref="category_id" onchange={readStudentCategoryStrengthReport}>
								<option each={categories} value={category_id}>{category_name}
			                            </option>
							</select>
						</div>
					</div>
				</div>
			</div>
		</div>
		<table class="table is-fullwidth is-striped is-hoverable is-narrow">
			<thead>
				<tr>
					<th>#</th>
					<th>Enroll</th>
					<th>Name</th>
					<th>Class</th>
					<th>Sms</th>
					
				</tr>
			</thead>
			<tbody>
				<tr each={st, i in studentCategoryStrengthReports}>
					<td>{i+1}</td>
					<td>{st.enroll_number}</td>
					<td>{st.name}</td>
					<td>{st.standard}</td>
					<td>{st.sms}</td>
					
				</tr>
			</tbody>
		</table>
	</section>
<!-- End Other Information -->
<script>
	
	var self = this
    self.on("mount", function(){
    	self.title='Add'
    	self.role = getCookie('role') 
    	self.readCategory()	
        self.update()
        flatpickr(".date", {
	    	allowInput: true,
        	dateFormat: "d/m/Y",
  		})
    })

    self.on("unmount", function(){
      adminReportStore.off('read_student_category_strength_report_changed',ReadStudentCategoryStrengthReportChanged)
       categoryStore.off('categories_changed', CategoriesChanged)
    })
    self.readCategory = () => {
       categoryStore.trigger('read_categories')
    }

    self.readStudentCategoryStrengthReport = () => {
       adminReportStore.trigger('read_student_category_strength_report',self.refs.category_id.value)
    }

    categoryStore.on('categories_changed',CategoriesChanged)
    function CategoriesChanged(categories){
      console.log(categories) 
      self.loading = false
      self.categories = categories
      self.update()
      self.readStudentCategoryStrengthReport()
      console.log(self.categories)
    }

    
    adminReportStore.on('read_student_category_strength_report_changed',ReadStudentCategoryStrengthReportChanged)
    function ReadStudentCategoryStrengthReportChanged(studentCategoryStrengthReports){
      //console.log(studentCategoryStrengthReports) 
      self.title='Create'
      self.loading = false
      self.studentCategoryStrengthReports = studentCategoryStrengthReports
      self.update()
      //console.log(self.employeeTypes)
    }
    

    
</script>
</student-category-strength-report>