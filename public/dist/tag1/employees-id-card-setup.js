riot.tag2('employees-id-card-setup', '<section class="container is-fluid"> <div class="level"> <div class="level-left"> <h2 class="title" style="color: #ff3860;">Employeess ID Card Setup</h2> </div> </div> <div class="flex items-center mt-2 mb-6 no-print"> <div class="bg-green py-1 rounded w-10"></div> <div class="bg-grey h-px flex-auto"></div> </div> <div class="columns"> <div class="column is-two-fifths"> <div class="field"> <label class="label" for="id_card_setup_header_image">Header image</label> <div id="header_image_box" class="preview-box-wide" style="" onclick="{trigger_file_input.bind(this,\'id_card_setup_header_picture\')}"> <div class="icon has-text-danger" onclick="{remove_picture.bind(this, \'header_image_box\',\'id_card_setup_header_picture\')}"> <i class="fas fa-trash"></i> </div> </div> <input accept="image/*" class="is-hidden" id="id_card_setup_header_picture" name="header_picture" onchange="{loadFile.bind(this, \'header_image_box\')}" type="file"> </div> <div class="field"> <label class="label" for="id_card_setup_signature_image">Signature image</label> <div id="signature_image_box" class="preview-box-wide" onclick="{trigger_file_input.bind(this,\'id_card_setup_signature_picture\')}"> <div class="icon has-text-danger" onclick="{remove_picture.bind(this, \'signature_image_box\', \'id_card_setup_signature_picture\')}"><i class="fas fa-trash"></i></div> </div> <input accept="image/*" class="is-hidden" id="id_card_setup_signature_picture" name="signature_picture" onchange="{loadFile.bind(this, \'signature_image_box\')}" type="file"> </div> <div class="field"> <label class="label" for="signature_text">Signature text</label> <input class="input" id="signature_text" ref="signature_text" type="text"> </div> <div class="field"> <label class="label" for="back_content_title">Back content title</label> <input class="input" id="back_content_title" ref="back_content_title" type="text"> </div> <div class="field"> <label class="label" for="back_content">Back content</label> <textarea class="textarea" id="back_content" ref="back_content"></textarea> </div> <div class="field"> <button class="button is-success" onclick="{add}">{title}</button> </div> </div> </div> </section>', '', '', function(opts) {
'use strict';

var self = this;
self.on("mount", function () {
  self.title = '';
  self.update();
  self.update_header_image = false;
  self.update_signature_image = false;
  self.readEmployeeCardSetup();
});

self.remove_picture = function (item1, item2, e) {
  console.log('item1' + item1);
  console.log('item2' + item2);
  var pp_box = document.getElementById(item1);
  pp_box.style.backgroundImage = "";
  document.getElementById(item2).value = "";
  event.stopPropagation();
};

self.trigger_file_input = function (item, e) {
  document.getElementById(item).click();
};

self.loadFile = function (item, event) {
  var reader = new FileReader();
  reader.onload = function (e) {
    document.getElementById(item).style.backgroundImage = 'url(' + e.target.result + ')';
    console.log(e.target.result);
    if (item == 'header_image_box') {
      self.update_header_image = true;
    } else if (item == 'signature_image_box') {
      self.update_signature_image = true;
    }
  };
  reader.readAsDataURL(event.target.files[0]);

  console.log(event.target.files[0]);
  self.header_image = event.target.files[0];
  self.signature_image = event.target.files[0];
};

/*all actions below this*/
self.on("unmount", function () {
  employeeIdCardSetupStore.off('upload_header_image_employee_card_setup_changed', EmployeeUploadHeaderImageChanged);
  employeeIdCardSetupStore.off('upload_signature_image_employee_card_setup_changed', EmployeeUploadSignatureImageChanged);
  employeeIdCardSetupStore.off('read_employee_card_setup_changed', ReadEmployeeCardSetupChanged);
  employeeIdCardSetupStore.off('add_employee_card_setup_changed', AddEmployeeCardSetupChanged);
});

self.readEmployeeCardSetup = function () {
  employeeIdCardSetupStore.trigger('read_employee_card_setup');
};

self.add = function () {

  if (self.title == 'Add') {
    if (self.update_header_image) {
      employeeIdCardSetupStore.trigger('upload_header_image_employee_card_setup', self.header_image);
    } else if (self.update_signature_image) {
      employeeIdCardSetupStore.trigger('upload_signature_image_employee_card_setup', self.signature_image);
    }

    if (!self.update_header_image) {
      self.addData();
    }
  } else if (self.title == 'update') {
    self.addData();
  }
};

self.addData = function () {
  var obj = {};
  if (self.update_header_image) {
    obj['header_image'] = self.header_image_name;
  } else {
    obj['header_image'] = '';
  }

  if (self.update_signature_image) {
    obj['signature_image'] = self.signature_image_name;
  } else {
    obj['signature_image'] = '';
  }

  obj['signature_text'] = self.refs.signature_text.value;
  obj['back_content_title'] = self.refs.back_content_title.value;
  obj['back_content'] = self.refs.back_content.value;

  console.log(obj);

  employeeIdCardSetupStore.trigger('add_employee_card_setup', obj);
};

/*all change methods below this*/
employeeIdCardSetupStore.on('read_employee_card_setup_changed', ReadEmployeeCardSetupChanged);
function ReadEmployeeCardSetupChanged(employeeCardSetup) {
  self.employeeCardSetup = employeeCardSetup;

  if (self.employeeCardSetup.length === 0) {
    self.title = 'Add';
  } else {
    self.title = 'Update';
  }

  document.getElementById('header_image_box').style.backgroundImage = 'url(' + 'images/employee_card_setup/' + self.employeeCardSetup[0].header_image + ')';

  document.getElementById('signature_image_box').style.backgroundImage = 'url(' + 'images/employee_card_setup/' + self.employeeCardSetup[0].signature_image + ')';

  self.update();
}

employeeIdCardSetupStore.on('upload_header_image_employee_card_setup_changed', EmployeeUploadHeaderImageChanged);
function EmployeeUploadHeaderImageChanged(header_image_name) {
  self.header_image_name = header_image_name;
  console.log(self.header_image_name);
  self.addData();
}

employeeIdCardSetupStore.on('upload_signature_image_employee_card_setup_changed', EmployeeUploadSignatureImageChanged);
function EmployeeUploadSignatureImageChanged(signature_image_name) {
  self.signature_image_name = signature_image_name;
  console.log(self.signature_image_name);
  self.addData();
}

employeeIdCardSetupStore.on('add_employee_card_setup_changed', AddEmployeeCardSetupChanged);
function AddEmployeeCardSetupChanged() {
  self.readEmployeeCardSetup();
}
});