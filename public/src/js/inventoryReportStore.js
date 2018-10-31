function InventoryReportStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.receivedFromArray = []

  self.on('read_inventory_received_from', function() {
    console.log('i am in recievd Form api call from ajax')
    let req = {}
    $.ajax({
      url:'/inventory_report/read_received_from',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.receivedFromArray = data.receivedFromArray
            self.trigger('read_inventory_received_from_changed', data.receivedFromArray)
          }else if(data.status == 'e'){
            showToast("Received From Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
//read received goods
  self.on('read_inventory_received_goods_report', function(received_from,start_date,end_date) {
    console.log('i am in recievd Form api call from ajax')
    let req = {}
    $.ajax({
      
      url:'/inventory_report/read_inventory_received_goods_report/'+received_from+'/'+start_date+'/'+end_date,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.inventoryReceivedGoodsReports = data.inventoryReceivedGoodsReports
            self.trigger('read_inventory_received_goods_report_changed', data.inventoryReceivedGoodsReports)
          }else if(data.status == 'e'){
            showToast("Received From Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

// read issued goods

  self.on('read_inventory_issued_goods_report', function(issue_type,start_date,end_date) {
    console.log('i am in issued goods  api call from ajax')
    let req = {}
    $.ajax({
      // url:'/inventory_issue/'+id+'/'+type,
      url:'/inventory_report/read_inventory_issued_goods_report/'+issue_type+'/'+start_date+'/'+end_date,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.inventoryIssuedGoodsReports = data.inventoryIssuedGoodsReports
            self.trigger('read_inventory_issued_goods_report_changed', data.inventoryIssuedGoodsReports)
          }else if(data.status == 'e'){
            showToast("Data Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

 //read Issued Person

 self.on('read_inventory_issue_to', function(issue_type) {
    console.log('i am in issue to Form api call from ajax')
    let req = {}
    $.ajax({
      url:'/inventory_report/read_inventory_issue_to/'+issue_type,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.issuedPersons = data.issuedPersons
            self.trigger('read_inventory_issue_to_changed', data.issuedPersons)
          }else if(data.status == 'e'){
            showToast("data read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  }) 

 // read issued goods person wise

  self.on('read_inventory_person_wise_issued_goods_report', function(issue_type,issue_to,start_date,end_date) {
    console.log('i am in issued goods  api call from ajax')
    let req = {}
    $.ajax({
      // url:'/inventory_issue/'+id+'/'+type,
      url:'/inventory_report/read_inventory_person_wise_issued_goods_report/'+issue_type+'/'+issue_to+'/'+start_date+'/'+end_date,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.inventoryPersonWiseIssuedGoodsReports = data.inventoryPersonWiseIssuedGoodsReports
            self.trigger('read_inventory_person_wise_issued_goods_report_changed', data.inventoryPersonWiseIssuedGoodsReports)
          }else if(data.status == 'e'){
            showToast("Data Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
 
 //read category wise inventory item

 self.inventoryItems = []

  self.on('read_inventory_item', function(category_id) {
    console.log('i am in recievd Form api call from ajax')
    let req = {}
    $.ajax({
      url:'/inventory_report/read_inventory_item/'+category_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.inventoryItems = data.inventoryItems
            self.trigger('read_inventory_item_changed', data.inventoryItems)
          }else if(data.status == 'e'){
            showToast("inventory Item Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })


   // read issued goods Item wise

  self.on('read_inventory_item_wise_issued_goods_report', function(category_id,item_id,start_date,end_date) {
    console.log('i am in issued goods  api call from ajax')
    let req = {}
    $.ajax({
      // url:'/inventory_issue/'+id+'/'+type,
      url:'/inventory_report/read_inventory_item_wise_issued_goods_report/'+category_id+'/'+item_id+'/'+start_date+'/'+end_date,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.inventoryItemWiseIssuedGoodsReports = data.inventoryItemWiseIssuedGoodsReports
            self.trigger('read_inventory_item_wise_issued_goods_report_changed', data.inventoryItemWiseIssuedGoodsReports)
          }else if(data.status == 'e'){
            showToast("Data Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })


    // read Sale goods Item wise

  self.on('read_inventory_sale_goods_report', function(start_date,end_date) {
    console.log('i am in sale goods  api call from ajax')
    let req = {}
    $.ajax({
      // url:'/inventory_issue/'+id+'/'+type,
      url:'/inventory_report/read_inventory_sale_goods_report/'+start_date+'/'+end_date,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.inventorySaleGoodsReports = data.inventorySaleGoodsReports
            self.trigger('read_inventory_sale_goods_report_changed', data.inventorySaleGoodsReports)
          }else if(data.status == 'e'){
            showToast("Data Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  // read Return goods Item wise

  self.on('read_inventory_return_goods_report', function(start_date,end_date) {
    console.log('i am in return goods  api call from ajax')
    let req = {}
    $.ajax({
      // url:'/inventory_issue/'+id+'/'+type,
      url:'/inventory_report/read_inventory_return_goods_report/'+start_date+'/'+end_date,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.inventoryReturnGoodsReports = data.inventoryReturnGoodsReports
            self.trigger('read_inventory_return_goods_report_changed', data.inventoryReturnGoodsReports)
          }else if(data.status == 'e'){
            showToast("Data Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  // read Inventory Summary report

  self.on('read_inventory_summary_report', function(start_date,end_date) {
    console.log('i am in return goods  api call from ajax')
    let req = {}
    $.ajax({
      // url:'/inventory_issue/'+id+'/'+type,
      url:'/inventory_report/read_inventory_summary_report/'+start_date+'/'+end_date,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.inventorySummaryReports = data.inventorySummaryReports
            self.trigger('read_inventory_summary_report_changed', data.inventorySummaryReports)
          }else if(data.status == 'e'){
            showToast("Data Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })




}
