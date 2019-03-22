<assessment-report>
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
				<div class="column">
					<button class="button is-danger has-text-weight-bold" onclick={getAssessmentReport}>GO</button>
					<label class="checkbox " each={st, i in examTypes} style="padding: 10px;">
  						<input type="checkbox" checked={st.done} id="{ 'ID' + st.exam_type_id }" onclick={selectExamType.bind(this,st)}>{st.exam_type}
					</label>
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
		<p><center><strong>Assessment Report For Class{ClassName}</strong></center></p>
		<p><span each={s, i in labels}>{s.exam_type} &nbsp;&nbsp;</span></p>
		
		</table>

<div class="row">
  <div class="col-sm-12">
    <table class="table table-bordered reportTable">
      <thead>
        <tr>
          <th rowspan="2">Range</th>
          <th class="text-center" ng-repeat="sub in subject_first" colspan="{sections.length}">{sub}</th>
        </tr>
        <tr>
          <!-- <th ng-repeat="mk in marks_keys_fifth">{{sections[$index%sections.length]}}</th> -->
        </tr>
      </thead>
      <tbody>
        <tr ng-repeat="m in marksLimits">
          <td>{{m.min_marks + "-" + m.max_marks}}</td>
          <td ng-repeat="mk in marks_keys_fifth">{{report_data[m.min_marks + "-" + m.max_marks + "|" + mk]}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

	<!-- 	<table class="table is-fullwidth">

      <tr each={s,i in subjects}>
        <td>
  				<table class="table is-striped is-hoverable is-bordered is-fullwidth">
    				<thead>
                <th rowspan="2">Range</th>
      					<th each={sub, j in s.subjects} colspan={sections.length}>{sub}</th>
    				</thead>
    				<tbody>
      					<tr each={r, k in graphData}>
                   <td>{r.range}</td>
                    
                     <td each={sec, m in r[s]} >{sec}</td>
                   
                </tr>
    				</tbody>
  				</table>

        </td>  
      </tr>

		</table> --><!-- main loop table -->
  		
	</section>

<script>
	var self = this;
    self.on("mount", function(){
    	self.readStandard()
        self.update() 
    })
    self.on("unmount", function(){
      analysisReportStore.off('read_standard_changed',StandardChanged)
      analysisReportStore.off('exam_types_changed',ExamTypesChanged)
      analysisReportStore.off('read_assessment_report_changed',AssessmentReportChanged)
    })

    self.readStandard = () => {
       analysisReportStore.trigger('read_standard')
    }
    self.changeExamType = () => {
       analysisReportStore.trigger('read_exam_types',self.refs.standard_id.value)
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
    self.selectExamType = (item,event) => {
    	console.log(event)
    	item.done=!event.item.st.done
        self.exam_type_id = item.exam_type_id;
        console.log(self.exam_type_id)
    }
    self.getAssessmentReport = () =>{
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
	    self.marksRangeArray.map((x, index) => {
	        let min_marks='#min_marks'+index
	        let max_marks='#max_marks'+index

	        x.min_marks =  $(min_marks).val()
	        x.max_marks =  $(max_marks).val()
    	});
    	searchdata['standard_id']=self.refs.standard_id.value
    	searchdata['exam_type_id']=exam_type_id
    	searchdata['marksRangeArray']=self.marksRangeArray
    	obj['searchdata']=searchdata;
    	console.log(obj)
    	analysisReportStore.trigger('read_assessment_report', obj)	
    }
    analysisReportStore.on('read_standard_changed',StandardChanged)
    function StandardChanged(standards){
      	self.standards = standards
      	self.update()
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
    }
    analysisReportStore.on('read_assessment_report_changed',AssessmentReportChanged)
    function AssessmentReportChanged(sections,subjects,graphData){
    	self.ClassName = $("#standard_id option:selected").text();
      self.sections = sections
      self.subjects = subjects
      self.graphData = graphData
      
      self.update()
    }
</script>
</assessment-report>