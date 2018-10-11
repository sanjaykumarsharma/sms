<mentor-date-wise-case-report>
	<section class=" is-fluid">
	<h2 class="title has-text-centered" style="color: #ff3860;">Student Wise Mentor Case Report</h2>
	<div class="flex items-center mt-2 mb-6 no-print">
		<div class="bg-green py-1 rounded w-10">
			<div class="bg-grey h-px flex-auto"></div>
		</div>
	</div>
	<div class="box">
		<div class="columns">
			<div class="column is-narrow">
				<label class="label">Category</label>
			</div>
			<div class="column is-narrow">
					<div class="control">
						<div class="select">
							<select ref="category_id">
								<option value="-1">ALL</option>
								<option each={categories} value={category_id}>{category_name}
	                            </option>
							</select>
						</div>
					</div>
				</div>
			<div class="column is-narrow">
				<label class="label">From Date</label>
			</div>
			<div class="column is-narrow">
				<input class="date input flatpickr-input form-control input" placeholder="" ref="start_date" tabindex="0" type="text" readonly="readonly">
			</div>
			<div class="column is-narrow">
				<label class="label">To Date</label>
			</div>
			<div class="column is-narrow">
				<input class="date input flatpickr-input form-control input" placeholder="" ref="end_date" tabindex="0" type="text" readonly="readonly">
			</div>
			<div class="column">
				<button class="button is-danger has-text-weight-bold"
				onclick={getData} > GO
				</button>
			</div>
		</div>
	</div>

		<table class="table is-striped is-hoverable is-bordered is-fullwidth">
			<thead>
				<tr>
				    <th>Sl No</th>
				    <th>Name</th>
				    <th>Enroll No</th>
				    <th>Class</th>
				    <th>Case</th>
				    <th>Date</th>
				    <th>Diagnosis</th>
				    <th>Suggestion</th>
				</tr>
			</thead>
			<tbody>
				<tr each={cd, i in date_wise_case_report}>
					<td>{ i+1 }</td>
					<td>{cd.student_name}</td>
					<td>{cd.enroll_number}</td>
					<td>{cd.standard}</td>
					<td>{cd.case_name}</td>
					<td>{cd.consult_date}</td>
					<td>{cd.diagnosis}</td>
					<td>{cd.suggestion}</td>
				</tr>
			</tbody>
		</table>
</section>
<script>
	var self = this
    self.on("mount", function(){
      flatpickr(".date", {
    	/*altInput: true,*/
    	allowInput: true,
    	altFormat: "d/m/Y",
    	dateFormat: "Y-m-d",
  		})
      self.readCategories()
      self.update();
    })

    self.on("unmount", function(){
      mentorReportStore.off('read_date_wise_case_report_changed',ReadDateWiseCaseReportChanged)
      mentordetailStore.off('read_mentor_categories_changed',CategoriesChanged)
    })

    self.readCategories = () => {
       mentordetailStore.trigger('read_mentor_categories')
    }

    self.getData = () => {
    	var obj={}
          obj['start_date']=self.refs.start_date.value
          obj['end_date']=self.refs.end_date.value
          self.loading = true
          mentorReportStore.trigger('read_date_wise_case_report', obj,self.refs.category_id.value)
          console.log(obj)
          console.log(self.refs.category_id.value)
    }

    mentordetailStore.on('read_mentor_categories_changed',CategoriesChanged)
    function CategoriesChanged(categories){
      console.log(categories) 
      self.categories = categories
      self.update()
    }

    mentorReportStore.on('read_date_wise_case_report_changed',ReadDateWiseCaseReportChanged)
    function ReadDateWiseCaseReportChanged(date_wise_case_report){
      self.date_wise_case_report = date_wise_case_report
      console.log(self.date_wise_case_report)
    }
</script>

</mentor-date-wise-case-report>