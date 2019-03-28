<promotion-sheet-report>
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

    <h1 class="has-text-centered is-size-4">Tabulation Sheet 2018-2019 (studentwise) for class : {class} section : {section}
   </h1> 
  
  <!-- <h1 class="is-size-4">Class Teacher : {class_teacher}</h1>
  <p><span each={s, i in labels} class="is-size-6">{s.exam_type} &nbsp;&nbsp;</span></p>
  <table class="table is-striped is-hoverable is-bordered is-fullwidth">
    <thead>
      <tr>
        <th>Roll No</th>
        <th>Enroll No</th>
        <th>Student Name</th>

        <th each={c, i in subjects}>{c}</th>   

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
  </table> -->
	
  <table class="table is-striped is-hoverable is-bordered is-fullwidth">
     <thead>
      <tr style="font-size:10px;">
          <th></th>
          <th each={sub in subjects} class="has-text-centered"><p class="test">{sub.subject_short_name}</p></th>
          <th>Total</th>
          <th>Per.</th>
      </tr>
      </thead>
      <tbody each={student in students}>
        <tr>
            <td colspan="{3+subjects.length}" class="nameHeader">{student.student_name}</td>
        </tr>
        <tr each={ex in selectedExams}>
            <th style="width:130px;">{ex.exam_type}</th>
            <td each={sub in subjects} style="text-align:center">
              <span if={marks[student.student_id+"-"+ex.exam_type_id+"-"+sub.subject_id]!=undefined}>
                {marks[student.student_id+"-"+ex.exam_type_id+"-"+sub.subject_id].marks} 
                {marks[student.student_id+"-"+ex.exam_type_id+"-"+sub.subject_id].grade}
              </span>
            </td>
            <td style="text-align:center">{getTotal(ex.exam_type_id,student.student_id)}</td>
            <td style="text-align:center">{getTotalPercentage(ex.exam_type_id,student.student_id)}</td> 
        </tr>
        <tr>
            <th style="font-size:10px;">Grand Total</th>
            <th each={sub in subjects} style="text-align:center">{getExamTotal(sub.subject_id,student.student_id)}</th>
            <th style="text-align:center">{getGrandtotal(student.student_id)}</th>
            <th style="text-align:center">{getGrandTotalPercentage(student.student_id)}%</th>
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
      analysisReportStore.off('read_promotion_sheet_report_changed',PromotionSheetReportChanged)
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
      console.log(item.exam_type_id)
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
      self.loading=true
    	analysisReportStore.trigger('read_promotion_sheet_report', obj)	
    }

    self.getTotal = (examId,student) => {

     var total_marks = 0;
     var subject_total = 0;
     var total_label = "";

      self.marks_total.map(type=>{

        if(examId==type.exam_id && student==type.student_id){

          if(type.grand_total=='Y'){

             if(type.marks !='AB'){
               total_marks =Number(total_marks) + Number(type.marks);
             }
             subject_total = Number(subject_total) + Number(type.max_marks);
             total_label = total_marks +"/"+subject_total;

           }

        }
       
      })

      return total_label

    }

    self.getTotalPercentage = (examId,student) => {

     var total_marks = 0;
     var subject_total = 0;

      self.marks_total.map(type=>{

        if(examId==type.exam_id && student==type.student_id){

          if(type.grand_total=='Y'){

             if(type.marks !='AB'){
               total_marks =Number(total_marks) + Number(type.marks);
             }
             subject_total = Number(subject_total) + Number(type.max_marks);

           }

        }
       
      })

      var examPercenatge = ((Number(total_marks) / Number(subject_total)) *100).toFixed(2) +"%";    

      return examPercenatge

    }

    self.getExamTotal = (subject,studentID) => {
      
      var subject_total = '';
      
      self.marks_total.map(type=>{

        if(subject==type.subject_id && studentID==type.student_id){

           if(type.grand_total=='Y'){
              if(type.marks !='AB'){
                if(!Number(type.marks)){
                    subject_total =Number(subject_total);
                  }else{
                  subject_total =Number(subject_total) + Number(type.marks);
                }
              }   
            }

         }
       
      })
      
      return subject_total;

    }

    self.getGrandtotal = (stdId) => {

       var total_marks = 0;
       var subject_grand_total = 0;
       var total_label = "";
       
       self.marks_total.map(type=>{

        if(stdId == type.student_id){

         if(type.grand_total =='Y'){
            if(type.marks !='AB'){
              total_marks =Number(total_marks) + Number(type.marks);  
            }
              subject_grand_total = Number(subject_grand_total) + Number(type.max_marks);
              //grandTotalPercentage = ((Number(total_marks) / Number(subject_grand_total)) *100).toFixed(2);  
          }

        }
       
      })

      total_label = total_marks +"/"+subject_grand_total;
      return total_label;

    }

     self.getGrandTotalPercentage = (stdId) => {

       var total_marks = 0;
       var subject_grand_total = 0;
       
       self.marks_total.map(type=>{

        if(stdId == type.student_id){

         if(type.grand_total =='Y'){
            if(type.marks !='AB'){
              total_marks =Number(total_marks) + Number(type.marks);  
            }
              subject_grand_total = Number(subject_grand_total) + Number(type.max_marks);
          }

        }
       
      })

      var grandTotalPercentage = ((Number(total_marks) / Number(subject_grand_total)) *100).toFixed(2);  
      return grandTotalPercentage;

    }


    //change methods
    
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
    analysisReportStore.on('read_promotion_sheet_report_changed',PromotionSheetReportChanged)
    function PromotionSheetReportChanged(subjects,students,marks,marks_total){
      self.loading = false
      self.subjects = {}
      self.subjects = subjects

      self.students = []
      self.students = students

      self.selectedExams = []
      self.examTypes.map(i=>{
          if(i.done) {
            self.selectedExams.push(i)
          }
      })

      self.marks = marks
      self.marks_total = marks_total


      self.class = $("#standard_id option:selected").text();
      self.section = $("#section_id option:selected").text();

    self.update()
    }
</script>
</promotion-sheet-report>