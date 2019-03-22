<consolidate-tabulation-sheet-report>
	<print-header></print-header>
	<loading-bar if={loading}></loading-bar>
	<section class=" is-fluid">
		<div class="box no-print">
			<div class="columns">
				<div class="column is-narrow">
					<label class="label">Class</label>
				</div>
				<div class="column is-narrow">
					<div class="control">
						<div class="select">
							<select ref="standard_id" id="standard_id" onchange={changeExamType}>
								<option>--Choose Class--</option>
								<option each={standards} value={standard_id}>{standard}</option>
							</select>
						</div>
					</div>
				</div>
				<div class="column is-narrow">
					<label class="label">Class</label>
				</div>
				<div class="column is-narrow">
					<div class="control">
						<div class="select">
							<select ref="section_id" id="section_id">
								<option each={filteredSections} value={section_id}>{section}</option>
							</select>
						</div>
					</div>
				</div>
			<div class="column">
				<button class="button is-danger has-text-weight-bold" onclick={getConsolidateTabulationSheetReport}>GO</button>
					<label class="checkbox " each={st, i in examTypes} style="padding: 10px;">
  						<input type="checkbox" checked={st.done} id="{ 'ID' + st.exam_type_id }" onclick={selectExamType.bind(this,st)}>{st.exam_type}
					</label>
			</div>
			</div>
		    
		</div>

    <h1 class="has-text-centered is-size-4">Consolidated Tabulation Sheet for class : {class} section : {section}<br>
       Exam : {exam}
   </h1> 
  
  <h1 class="is-size-4">Class Teacher : {class_teacher}</h1>
  <p><span each={s, i in labels} class="is-size-6">{s.exam_type} &nbsp;&nbsp;</span></p>
  <table class="table is-striped is-hoverable is-bordered is-fullwidth">
    <thead>
      <tr>
        <th>Roll No</th>
        <th>Enroll No</th>
        <th>Student Name</th>

        <th each={c, i in headers}>{c}</th>   

        <th>Percentage</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody>
      <tr each={c, i in reports}>
        <td>{c.roll_number}</td>
        <td>{c.enroll_number}</td>
        <td>{c.student_name}</td>
        <td each={m, j in c.orderedSubjects}>{m}</td>
        <td>{c.total}</td>
        <td>{c.percentage}</td>
      </tr>
    </tbody>
  </table>
	
  		
	</section>

<script>
	var self = this;
    self.on("mount", function(){
    	self.readStandard()
    	self.readSection()
        self.update() 
    })
    self.on("unmount", function(){
      analysisReportStore.off('read_standard_changed',StandardChanged)
      analysisReportStore.off('exam_types_changed',ExamTypesChanged)
      analysisReportStore.off('read_section_changed',SectionChanged)
      analysisReportStore.off('read_consolidate_tabulation_sheet_report_changed',ConsolidateTabulationSheetReportChanged)
    })

    self.readStandard = () => {
       analysisReportStore.trigger('read_standard')
    }
    self.readSection = () => {
       analysisReportStore.trigger('read_section')
    }

    self.changeExamType = () => {
       analysisReportStore.trigger('read_exam_types',self.refs.standard_id.value)
       self.update()
       self.getSection()
    }
    self.getSection = () => {
    	self.filteredSections = []
    	self.filteredSections = self.sections.filter(s => {
    		return s.standard_id == self.refs.standard_id.value
    	})
    }

    self.selectExamType = (item,event) => {
    	console.log(event)
    	item.done=!event.item.st.done
        self.exam_type_id = item.exam_type_id;
        console.log(self.exam_type_id)
    }
    self.getConsolidateTabulationSheetReport= () =>{
    	var obj={}
      var searchdata={};
    	let exam_type_id='';
	     self.examTypes.map( q => {
	        if(q.done){
	          if(exam_type_id==''){
	            exam_type_id=q.exam_type_id
	          }else{
	            exam_type_id=exam_type_id+','+q.exam_type_id
	          }
	        }
	      })
	    console.log(exam_type_id);
    	searchdata['standard_id']=self.refs.standard_id.value
      searchdata['exam_type_id']=exam_type_id
    	searchdata['section_id']=self.refs.section_id.value
    	obj['searchdata']=searchdata;
    	console.log(obj)
    	analysisReportStore.trigger('read_consolidate_tabulation_sheet_report', obj)	
    }
    analysisReportStore.on('read_standard_changed',StandardChanged)
    function StandardChanged(standards){
      	self.standards = standards
      	self.update()
    }
    analysisReportStore.on('read_section_changed',SectionChanged)
    function SectionChanged(sections){
      console.log(sections) 
      self.sections = sections
      self.update()
      self.getSection()
      
    }
    analysisReportStore.on('exam_types_changed',ExamTypesChanged)
    function ExamTypesChanged(examTypes){
    	self.loading = false
      	self.examTypes = []
      	self.examTypes = examTypes
      	self.examTypes.map(i=>{
	    	  i.done = false;
      	})
      self.update()
      self.getSection()
    }
    analysisReportStore.on('read_consolidate_tabulation_sheet_report_changed',ConsolidateTabulationSheetReportChanged)
    function ConsolidateTabulationSheetReportChanged(headers,reports,class_teacher){
      self.loading = false
      self.headers = {}
      self.headers = headers
      self.reports = []
      self.reports = reports
      self.class = $("#standard_id option:selected").text();
      self.section = $("#section_id option:selected").text();
      self.class_teacher = class_teacher
      var selectedExamNames = []; 
      self.examTypes.map(i=>{
        if(i.done == true){
          var d = {};
          d.exam_type = i.exam_type;
          selectedExamNames.push(d);
        }
      })

    self.labels = selectedExamNames;
    self.update()
    }
</script>
</consolidate-tabulation-sheet-report>