<mentor-date-wise-case-report>
	<print-header></print-header>
	<loading-bar if={loading}></loading-bar>
	<section class=" is-fluid">
    <h2 class="title has-text-centered is-size-6" style="color: #ff3860;">Student Wise Mentor Case Report</h2>
	
	<div class="box no-print">
		<div class="columns">
			<div class="column is-narrow">
				<label class="label">Category</label>
			</div>
			<div class="column is-narrow">
					<div class="control">
						<div class="select">
							<select ref="category_id" id="CategoryName">
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
				<input class="input date" ref="start_date" id="start_date" type="text" readonly="readonly">
			</div>
			<div class="column is-narrow">
				<label class="label">To Date</label>
			</div>
			<div class="column is-narrow">
				<input class="input date" ref="end_date" id="end_date" type="text" readonly="readonly">
			</div>
			<div class="column">
				<button class="button is-danger has-text-weight-bold"
				onclick={getData} > GO
				</button>
			</div>
			<div class="column">
				<button class="button is-success has-text-weight-bold ml5 is-pulled-right" onclick={csvExport}>
          			<span class="icon">
            			<i class="far fa-file-excel"></i>
			        </span>
			    </button>
			    <button class="button is-primary has-text-weight-bold is-pulled-right" onclick="window.print()">
          			<span class="icon">
            			<i class="fas fa-print"></i>
			        </span>
			    </button>
			</div>
		</div>
	</div>

		<table class="table is-striped is-hoverable is-bordered is-fullwidth">
			<p><center><strong>Session:{session_name} </strong></center></p>
			<p><center><strong>Category:{categoryName} From:{st_date}  To: {en_date}</strong></center></p>
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
      self.loading = false;
      flatpickr(".date", {
	    allowInput: true,
        dateFormat: "d/m/Y",
  		})
      self.readCategories()
      self.update();
    })

    self.on("unmount", function(){
      mentorReportStore.off('read_date_wise_case_report_changed',ReadDateWiseCaseReportChanged)
      mentordetailStore.off('read_mentor_categories_changed',CategoriesChanged)
      mentorReportStore.off('csv_date_wise_case_report_changed',csvMentorDateCaseReportChanged)
    })

    self.readCategories = () => {
       mentordetailStore.trigger('read_mentor_categories')
    }

    self.getData = () => {
    	var startDate = document.getElementById("start_date").value;
    	var endDate = document.getElementById("end_date").value;

    	if(!self.refs.start_date.value){
        	toastr.info("Please enter Start Date and try again")
      	}else if(!self.refs.end_date.value){
      		toastr.info("Please enter End Date and try again")
      	}else if((Date.parse(startDate) >= Date.parse(endDate))){
       		toastr.info("Please enter To Date Grater Than From Date")
      	}else{
    	var obj={}
          obj['start_date']=convertDate(self.refs.start_date.value)
          obj['end_date']=convertDate(self.refs.end_date.value)
          self.loading = true
          mentorReportStore.trigger('read_date_wise_case_report', obj,self.refs.category_id.value)
        }
    }
    self.csvExport = () => {
        mentorReportStore.trigger('csv_date_wise_case_report',self.date_wise_case_report)
        }

    mentordetailStore.on('read_mentor_categories_changed',CategoriesChanged)
    function CategoriesChanged(categories){
      console.log(categories) 
      self.categories = categories
      self.update()
    }

    mentorReportStore.on('read_date_wise_case_report_changed',ReadDateWiseCaseReportChanged)
    function ReadDateWiseCaseReportChanged(date_wise_case_report,session_name){
      self.loading = false;
      self.date_wise_case_report = date_wise_case_report
      self.session_name = session_name
      console.log(self.date_wise_case_report)
      self.st_date = self.refs.start_date.value
      self.en_date = self.refs.end_date.value
      self.categoryName = $("#CategoryName option:selected").text();
      self.update()
    }

    mentorReportStore.on('csv_date_wise_case_report_changed',csvMentorDateCaseReportChanged)
    function csvMentorDateCaseReportChanged(url){
      var open_url = window.location.origin+url 
      window.open(open_url);
      self.loading = false
      self.update()
     }
</script>

</mentor-date-wise-case-report>