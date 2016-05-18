/**
 * Export / import tools
 *
 * @param {String} storageKey localforage key name.
 */
function ExportTools(storageKey) {
	this.toolsContainer = null;
	this.storageKey = storageKey;
}
ExportTools.prototype.prepareToolsContainer = function() {
	this.toolsContainer = document.createElement('div');
	this.toolsContainer.className = 'tools-container';
	var body = document.querySelector('body');
	body.insertBefore(this.toolsContainer, body.firstChild);
};
ExportTools.prototype.show = function() {
	this.helperInput.style.display = '';
	this.closeButton.style.display = '';
	this.saveButton.style.display = '';
};
ExportTools.prototype.hide = function() {
	this.helperInput.style.display = 'none';
	this.closeButton.style.display = 'none';
	this.saveButton.style.display = 'none';
};

ExportTools.prototype.exportData = function() {
	var _self = this;
	localforage.getItem(this.storageKey).then(function(value) {
		var json = '';
		if (value === null) {
			console.log('No data stored yet');
		} else {
			json = JSON.stringify(value);
		}
		_self.helperInput.value = json;
	}).catch(function(err) {
		console.error('Problem reading from storage!', err);
	});
};
ExportTools.prototype.importData = function(onSuccess) {
	if (!confirm('Are you sure you want to overwrite your current data?')) {
		return;
	}
	var json = this.helperInput.value;
	localforage.setItem(this.storageKey, JSON.parse(json)).then(function() {
		console.log('Data import finished');
		onSuccess();
	}).catch(function(err) {
		console.error('Problem saving data to storage!', err);
	});
};

ExportTools.prototype.init = function() {
	var _self = this;

	this.prepareToolsContainer();

	// export
	var exportButton = document.createElement('button');
	exportButton.innerHTML = 'Export';
	exportButton.onclick = function () {
		_self.hide();
		helperInput.style.display = '';
		closeButton.style.display = '';
		_self.exportData();
	};
	this.toolsContainer.appendChild(exportButton);

	// init import
	var importButton = document.createElement('button');
	importButton.innerHTML = 'Import';
	importButton.onclick = function () {
		_self.show();
	};
	this.toolsContainer.appendChild(importButton);

	// input
	var helperInput = document.createElement('textarea');
	helperInput.style.display = 'none';
	this.toolsContainer.appendChild(helperInput);

	// save (import)
	var saveButton = document.createElement('button');
	saveButton.innerHTML = 'Save';
	saveButton.onclick = function () {
		_self.importData(function(){
			_self.hide();
		});
	};
	saveButton.style.display = 'none';
	this.toolsContainer.appendChild(saveButton);

	// close
	var closeButton = document.createElement('button');
	closeButton.innerHTML = 'Close';
	closeButton.onclick = function () {
		_self.hide();
	};
	closeButton.style.display = 'none';
	this.toolsContainer.appendChild(closeButton);

	this.helperInput = helperInput;
	this.closeButton = closeButton;
	this.saveButton = saveButton;
};
