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
		_self.hide();
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
