function Loader() {
	this.getImage = Loader_getImage;
	this.load = Loader_load;
	this.checkLoad = Loader_checkLoad;
	this.getNumberFinished = Loader_getNumberFinished;

	this._imagePath;
	this._loaded = new Array();
	this._images = new Array();
	this._numberFinished;
}

function Loader_getImage(index) {
	return this._images[index];
}

function Loader_load(imagesPath) {
	this._imagesPath = imagesPath;
	this._numberFinished = 0;
	for (var i = 0; i < imagesPath.length; i++) {
		this._loaded[i] = false;
	}
	for (var i = 0; i < imagesPath.length; i++) {
		this._images[i] = new Image();
		this._images[i].src = imagesPath[i];
	}
}

function Loader_checkLoad() {
	this._numberFinished = 0;
	for (var i = 0; i < this._imagesPath.length; i++) {
		if (this._loaded[i] || this._images[i].complete) {
			this._numberFinished++;
			this._loaded[i] = true;
		}
	}
}

function Loader_getNumberFinished() {
	return this._numberFinished;
}