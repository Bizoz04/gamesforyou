function Rectangle(x, y, width, height, tag) {
	this._x = x;
	this._y = y;
	this._width = width;
	this._height = height;
	this._tag = tag;

	this.getX = Rectangle_getX;
	this.setX = Rectangle_setX;
	this.getY = Rectangle_getY;
	this.setY = Rectangle_setY;
	this.getWidth = Rectangle_getWidth;
	this.setWidth = Rectangle_setWidth;
	this.getHeight = Rectangle_getHeight;
	this.setHeight = Rectangle_setHeight;
	this.getTag = Rectangle_getTag;
	this.setTag = Rectangle_setTag;
	this.isOver = Rectangle_isOver;
}

function Rectangle_getX() {
	return this._x;
}

function Rectangle_setX(x) {
	this._x = x;
}

function Rectangle_getY() {
    return this._y;
}

function Rectangle_setY(y) {
    this._y = y;
}

function Rectangle_getWidth() {
    return this._width;
}

function Rectangle_setWidth(width) {
    this._width = width;
}

function Rectangle_getHeight() {
    return this._height;
}

function Rectangle_setHeight(height) {
    this._height = height;
}

function Rectangle_getTag() {
    return this._tag;
}

function Rectangle_setTag(tag) {
    this._tag = tag;
}

function Rectangle_isOver(x, y) {
    return (x >= this._x && x <= parseInt(this._x) + parseInt(this._width) && y >= this._y && y <= parseInt(this._y) + parseInt(this._height));
}