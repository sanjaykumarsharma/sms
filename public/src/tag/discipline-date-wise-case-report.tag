<discipline-date-wise-case-report>
	<print-header></print-header>
	<loading-bar if={loading}></loading-bar>
	<section class=" is-fluid">
	<h2 class="title has-text-centered is-size-6" style="color: #ff3860;">Student Wise Discipline Case Report</h2>
	
	<div class="box no-print">
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
				<input class="input date " ref="start_date" id="start_date" type="text" readonly="readonly">
			</div>
			<div class="column is-narrow">
				<label class="label">To Date</label>
			</div>
			<div class="column is-narrow">
				<input class="input date " ref="end_date" id="end_date" type="text" readonly="readonly">
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
			<p><center><strong>Session:{session_name}</strong></center></p>
			<p><center><strong>From:{st_date}  To: {en_date}</strong></center></p>
			<thead>
				<tr>
				    <th>Sl No</th>
				    <th>Name</th>
				    <th>Enroll No</th>
				    <th>Class</th>
				    <th>Case</th>
				    <th>Date</th>
				    <th>Diagnosis</th>
				    <th>Remarks</th>
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
					<td>{cd.remarks}</td>
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
      disciplineReportStore.off('read_date_wise_case_report_changed',ReadDateWiseCaseReportChanged)
      disciplinedetailStore.off('read_discipline_categories_changed',CategoriesChanged)
    })

    self.readCategories = () => {
       disciplinedetailStore.trigger('read_discipline_categories')
    }

    self.getData = () => {
    	var startDate = document.getElementById("start_date").value;
    	var endDate = document.getElementById("end_date").value;

    	if(!self.refs.start_date.value){
        	toastr.info("Please enter From Date and try again")
      	}else if(!self.refs.end_date.value){
      		toastr.info("Please enter To Date and try again")
      	}else if((Date.parse(startDate) >= Date.parse(endDate))){
       		toastr.info("Please enter To Date Grater Than From Date")
      	}else{
    	var obj={}
          obj['start_date']=convertDate(self.refs.start_date.value)
          obj['end_date']=convertDate(self.refs.end_date.value)
          self.loading = true
          disciplineReportStore.trigger('read_date_wise_case_report', obj,self.refs.category_id.value)
          console.log(obj)
          console.log(self.refs.category_id.value)
        }
    }

    self.csvExport = () => {
    	var startDate = document.getElementById("start_date").value;
    	var endDate = document.getElementById("end_date").value;

    	if(!self.refs.start_date.value){
        	toastr.info("Please enter From Date and try again")
      	}else if(!self.refs.end_date.value){
      		toastr.info("Please enter To Date and try again")
      	}else if((Date.parse(startDate) >= Date.parse(endDate))){
       		toastr.info("Please enter To Date Grater Than From Date")
      	}else{
    	var obj={}

          obj['start_date']=convertDate(self.refs.start_date.value)
          obj['end_date']=convertDate(self.refs.end_date.value)
          disciplineReportStore.trigger('csv_export_read_date_wise_case_report', obj,self.refs.category_id.value)
          console.log(obj)
        }
    }

    disciplinedetailStore.on('read_discipline_categories_changed',CategoriesChanged)
    function CategoriesChanged(categories){
      console.log(categories) 
      self.categories = categories
      self.update()
    }

    disciplineReportStore.on('read_date_wise_case_report_changed',ReadDateWiseCaseReportChanged)
    function ReadDateWiseCaseReportChanged(date_wise_case_report,session_name){
      self.date_wise_case_report = date_wise_case_report
      self.session_name = session_name
      if(self.date_wise_case_report.length==0){
      	toastr.info("No Data Found")
      }
      console.log(self.date_wise_case_report)
      self.loading = false
      self.st_date = self.refs.start_date.value
      self.en_date = self.refs.end_date.value
      self.update()
    }
</script>
</discipline-date-wise-case-report>