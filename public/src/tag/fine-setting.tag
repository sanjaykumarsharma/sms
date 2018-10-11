<fine-setting>
	
	<section class="container is-fluid">
		<div class="level">
		  <div class="level-left">
		    <div class="level-item">
		    	<h2 class="title" style="color: #ff3860;">Fine Setting</h2>
		    </div>
		  </div>
		</div>
		<div class="flex items-center mt-2 mb-6 no-print">
			<div class="bg-green py-1 rounded w-10"></div>
			<div class="bg-grey h-px flex-auto"></div>
		</div>
		
	<div class="columns">
		<div class="column is-two-fifths">
			<div  class="box max-w-md">
				<div class="columns is-multiline">   
				    <div class="column is-full">
				    	<div class="field">
							<label class="label" for="venue">Grace Period for Fine</label>
							<input class="input" ref="fineGracePreiodText" type="number">
				      	</div>
				    </div>
				    <div class="column is-full">
				      	<div class="field">
							<label class="label" for="fineTypeList">Fine Type</label>
							<div class="control">
				        		<div class="select is-fullwidth">
									<select id="fineType" ref="fineTypeList">
										<option value="Daily">Daily</option>
										<option value="Slab">Slab</option>
									</select>
								</div>
				      		</div>
				      	</div>
				   	</div>
				    <div class="column is-full">
						<label class="label" for="fineAmount">Fine Amount</label>
							<input class="input" ref="fineAmountText" type="number">
				    </div>
				    <div class="column is-full">
						<button class="button is-danger" onclick={add}>Save</button>
						<button class="button is-info" onclick={reset}>Reset</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<script>
	var self = this
    self.on("mount", function(){
      self.title='Save'
      self.role = getCookie('role')
      self.update()
      self.readFineSetting()
    });
    self.on("unmount", function(){
      fineStore.off('read_fine_changed', ReadFineChanged)
      fineStore.off('add_fine_changed',AddFineChanged)

    });
    self.reset = () => {
    	fineStore.trigger('read_fine_setting')
    }
    //read  Fine
    self.readFineSetting = () => {
       fineStore.trigger('read_fine_setting')
       //self.refs.fineAmountText.value= self.fine_amount;
    }
    // add Fine setting 
    self.add = () => {
      if(!self.refs.fineGracePreiodText.value){
        toastr.info("Please enter Fine Grace Period and try again")
      }if(!self.refs.fineAmountText.value){
        toastr.info("Please enter Fine Amount and try again")
      }else{
        self.loading = true
          console.log('save')
          fineStore.trigger('add', self.refs.fineGracePreiodText.value,
           self.refs.fineAmountText.value , self.refs.fineTypeList.value)
      }
    }
    
    fineStore.on('add_fine_changed',AddFineChanged)
    function AddFineChanged(fines){
      self.loading = false
      self.fines = fines
      self.update()
      console.log(self.fines)
    }

     fineStore.on('read_fine_changed',ReadFineChanged)
    function ReadFineChanged(f){
      self.fines = f
      self.update()
      self.refs.fineAmountText.value = self.fines[0].fine_amount
      self.refs.fineGracePreiodText.value = self.fines[0].fine_grace_preiod
      self.refs.fineTypeList.value = self.fines[0].fine_type
    }
       


</script>

</fine-setting>