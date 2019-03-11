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
					<button class="button is-danger has-text-weight-bold"
					onclick={getData} > GO
					</button>
					<label class="checkbox " each={examTypes} style="padding: 10px;">
  						<input type="checkbox" value={exam_type_id}>{exam_type}
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
				 		<button class="button is-success ml5 " onclick={add_marks_range}>
							<span class="icon"><span class="fas fa-plus"></span></span>
				 		</button>
				   		<button class="button  is-danger ml5" onclick={remove.bind(this, i)} show={i!=0}>
							<span class="icon"><span class="fas fa-minus"></span></span>
				 		</button>
					</div>
				</div>
			</div>
		</div>

		<table class="table is-striped is-hoverable is-bordered is-fullwidth">
		<p><center><strong></strong></center></p>
			<thead>
				<tr></tr>
			</thead>
			<tbody>
				<tr>

				</tr>
			</tbody>
		</table>
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
    self.marksRangeArray.map((x, index) => {
        let min_marks='#min_marks'+index
        let max_marks='#max_marks'+index

        x.min_marks =  $(min_marks).val()
        x.max_marks =  $(max_marks).val()
    });

    self.remove = (index,e) => {
      console.log(index)
       self.marksRangeArray.splice(index,1);
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
      self.update()
    }
</script>
</assessment-report>