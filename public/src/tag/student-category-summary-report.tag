<student-category-summary-report>
	<print-header></print-header> 
	 <loading-bar if={loading}></loading-bar>  
	<section class=" is-fluid">
		<h4 class="title has-text-centered" style="color: #ff3860;">Class Wise Cast Category Strength({session_name}) </h4>
		<div class='box no-print'>
	   		<div class="columns">
			    <div class=" column">
				<!-- <div class="level-right"> -->
           <button class="button is-success has-text-weight-bold is-small ml5 is-pulled-right" onclick={downloadCSV} title="Excel Down Load">
                  <span class="icon">
                      <i class="far fa-file-excel"></i>
                  </span>
               </button>
			        <button class="button is-primary has-text-weight-bold is-pulled-right is-small ml5" onclick="window.print()" title="Print">
			          <span class="icon"> <i class="fas fa-print"></i></span>
			        </button>
			       <button class="button is-warning is-rounded is-pulled-right is-small ml5" onclick={readStudentCategorySummaryReport} style="margin-left:5px;margin-right:5px">
			        <span class="icon">
			          <span class="fas fa-sync-alt"></span>
			        </span>
			        </button>
			    </div>
		   </div>
		</div>	 
		<table class="table is-fullwidth is-bordered is-hoverable is-narrow">
			<thead>
				<tr>
					<th>#</th>
					<th>Standard</th>
					<th>General</th>
					<th>ST</th>
					<th>SC</th>
					<th>OBC</th>
				</tr>
			</thead>
			<tbody>
				<tr each={st, i in studentCategorySummaryReports}>
					<td>{i+1}</td>
					<td>{st.standard}</td>
					<td>{st.General}</td>
					<td>{st.ST}</td>
					<td>{st.SC}</td>
					<td>{st.OBC}</td>
				</tr>
				<tr><th colspan="2">Total</th>
					<th>{totalGeneral}</th>
					<th>{totalST}</th>
					<th>{totalSC}</th>
					<th>{totalOBC}</th>
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
      adminReportStore.off('read_student_category_summary_report_changed',ReadStudentCategorySummaryReportChanged)
      categoryStore.off('categories_changed', CategoriesChanged)
      adminReportStore.off('csv_export_student_category_summary_report_changed',csvStudentCategorySummaryReportChanged)
    })

     self.readCategory = () => {
       categoryStore.trigger('read_categories')
    }

    self.readStudentCategorySummaryReport = () => {
    	self.loading=true
       adminReportStore.trigger('read_student_category_summary_report', self.categories)
    }
    
    categoryStore.on('categories_changed',CategoriesChanged)
    function CategoriesChanged(categories){
      console.log(categories) 
      self.title='Create'
      self.loading = false
      self.categories = categories
      self.update()	
     self.readStudentCategorySummaryReport()
      console.log(self.categories)
    }
    self.downloadCSV = () =>{
      adminReportStore.trigger('csv_export_student_category_summary_report', self.studentCategorySummaryReports)
    }


    adminReportStore.on('read_student_category_summary_report_changed',ReadStudentCategorySummaryReportChanged)
    function ReadStudentCategorySummaryReportChanged(studentCategorySummaryReports,session_name){
      //console.log(studentCategorySummaryReports) 
      self.title='Create'
      self.loading = false
      self.session_name=session_name
      self.studentCategorySummaryReports = studentCategorySummaryReports
      self.totalGeneral=0;
      self.totalST=0;
      self.totalOBC=0;
      self.totalSC=0;
      self.studentCategorySummaryReports.map(c => {
      	console.log("c.General");
      	console.log(c.General);
	      	if(c.General!=undefined){
	          self.totalGeneral=Number(self.totalGeneral) + Number(c.General)
	        }
           if(c.OBC!=undefined){
            self.totalOBC=Number(self.totalOBC) + Number(c.OBC)
          }
          if(c.ST!=undefined){
              self.totalST=Number(self.totalST) + Number(c.ST)
   			}
            if(c.SC!=undefined){
              self.totalSC=Number(self.totalSC) + Number(c.SC)
   			 }
      })
      self.update()
      //console.log(self.employeeTypes)
    }

    adminReportStore.on('csv_export_student_category_summary_report_changed',csvStudentCategorySummaryReportChanged)
    function csvStudentCategorySummaryReportChanged(url){
      var open_url = window.location.origin+url 
      window.open(open_url);
      self.loading = false
      self.update()
    }
    

    
</script>
</student-category-summary-report>