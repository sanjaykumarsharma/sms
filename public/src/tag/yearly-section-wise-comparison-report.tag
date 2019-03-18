<yearly-section-wise-comparison-report>
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
							<select ref="standard_id" id="standard_id" onchange={readClassSubject}>
								<option>--Choose Class--</option>
								<option each={standards} value={standard_id}>{standard}</option>
							</select>
						</div>
					</div>
				</div>
				<div class="column is-narrow">
					<label class="label">Subject</label>
				</div>
				<div class="column is-narrow">
						<div class="control">
							<div class="select">
								<select ref="subject_id" id="subject_id" >
									<option>--Choose Subject--</option>
									<option each={subjects} value={subject_id}>{subject_name}</option>
								</select>
							</div>
						</div>
				</div>
				<div class="column is-narrow">
						<label class="label">Term</label>
					</div>
				<div class="column is-narrow">
						<div class="control">
							<div class="select">
								<select ref="term_id" id="term_id">
									<option value="F">Final</option>
									<option value="H">Half Yearly</option>
								</select>
							</div>
						</div>
				</div>
				<div class="column">
					<button class="button is-danger has-text-weight-bold" onclick={getAssessmentReport}>GO</button>
				</div>
			</div>
			<div each={st, i in marksRangeArray} style="margin-bottom:20px;margin-top:20px">
				<div class="columns mt30">
					<div class="column is-2">
						<label class="label" for="">Min Marks</label>
		      		</div>
		      		<div class="column is-2">
	        			<input class="input"  ref="min_marks" id="min_marks{i}" type="text" value={st.min_marks}>
		      		</div>
		      		<div class="column is-2">
						<label class="label" for="">Max Marks</label>
		      		</div>
		      		<div class="column is-2 ">
						<input class="input"  ref="max_marks" id="max_marks{i}" type="text" value={st.max_marks}>
		      		</div>
				 	<div class="column is-2">
				   		<button class="button  is-danger ml5" onclick={remove.bind(this, i)} show={marksRangeArray.length>1}>
							<span class="icon"><span class="fas fa-minus"></span></span>
				 		</button>
				 		<button class="button is-success ml5 " onclick={add_marks_range} show={marksRangeArray.length==(i+1)}>
							<span class="icon"><span class="fas fa-plus"></span></span>
				 		</button>
					</div>
				</div>
			</div>
		</div>

		<table class="table is-striped is-hoverable is-bordered is-fullwidth">
		<p><center><strong>Assessment Report For Class:{ClassName} , Subject:{SubjectName}  and Exam Term:{ExamTerm} </strong></center></p>
		
		
		</table>
		<div class="">
  			
  				<table class="table is-striped is-hoverable is-bordered is-fullwidth">
    				
  				</table>
			</div>
  		
	</section>

<script>
	var self = this;
    self.on("mount", function(){
    	self.readStandard()
        self.update() 
    })
    self.on("unmount", function(){
      analysisReportStore.off('read_standard_changed',StandardChanged)
      analysisReportStore.off('read_subjects_changed',ReadSubjectChanged)
      analysisReportStore.off('read_yearly_section_wise_comparison_report_changed',YearlySectionWiseComparisonReportChanged)
    })

    self.readStandard = () => {
       analysisReportStore.trigger('read_standard')
    }
    self.readClassSubject = () =>{
       analysisReportStore.trigger('read_subjects',self.refs.standard_id.value)
    }
    self.marksRangeArray =[]
    if(self.marksRangeArray.length==0){
		self.marksRangeArray =[]
		let obj = {}
		obj.min_marks=''
        obj.max_marks=''
		self.marksRangeArray.push(obj)  
	}
    self.add_marks_range=()=>{
	    let obj = {}
        obj.min_marks=''
        obj.max_marks=''
        self.marksRangeArray.push(obj)
    }
    self.remove = (index,e) => {
      console.log(index)
       self.marksRangeArray.splice(index,1);
    }

    self.getAssessmentReport = () =>{
    	var obj={}
        var searchdata={};

	    self.marksRangeArray.map((x, index) => {
	        let min_marks='#min_marks'+index
	        let max_marks='#max_marks'+index

	        x.min_marks =  $(min_marks).val()
	        x.max_marks =  $(max_marks).val()
    	});
    	searchdata['standard_id']=self.refs.standard_id.value
    	searchdata['subject_id']=self.refs.subject_id.value
    	searchdata['term_id']=self.refs.term_id.value
    	searchdata['marksRangeArray']=self.marksRangeArray
    	obj['searchdata']=searchdata;
    	console.log(obj)
    	analysisReportStore.trigger('read_yearly_section_wise_comparison_report', obj)	
    }

    analysisReportStore.on('read_standard_changed',StandardChanged)
    function StandardChanged(standards){
      	self.standards = standards
      	self.update()
    }

    analysisReportStore.on('read_subjects_changed',ReadSubjectChanged)
    function ReadSubjectChanged(subjects){
      	self.subjects = subjects
      	self.update()
    }

    analysisReportStore.on('read_yearly_section_wise_comparison_report_changed',YearlySectionWiseComparisonReportChanged)
    function YearlySectionWiseComparisonReportChanged(sections,subjects,graphData){
    	self.ClassName = $("#standard_id option:selected").text();
    	self.SubjectName = $("#subject_id option:selected").text();
    	self.ExamTerm = $("#term_id option:selected").text();
      	
      	self.update()
    }
</script>
</yearly-section-wise-comparison-report>