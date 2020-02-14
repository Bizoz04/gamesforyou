var DksDrapDrop_instance = null;

function DksDragDrop(elements, offsetX, offsetY, beginDragFunction, dragFunction, endDragFunction, dblClickFunction) {
	this._selectedElement = null;
    this._cursorXStart = 0;
    this._cursorYStart = 0;
    this._selectionElementStartX = 0;
    this._selectionElementStartY = 0;
    this._oldzIndex = 0;

	this._elements = elements;
	this._offsetX = offsetX;
	this._offsetY = offsetY;
	this._beginDragFunction = beginDragFunction;
    this._dragFunction = dragFunction;
	this._endDragFunction = endDragFunction;
	this._dblClickFunction = dblClickFunction;

    document.onmousedown = DksDragDrop_beginDrag;
    document.onmouseup = DksDragDrop_endDrag;
	document.ondblclick = DksDragDrop_dblClick;
    DksDrapDrop_instance = this;
}

function DksDragDrop_dblClick(e) {
	if (!e) {
       var e = window.event;
    }
	var selected = DksDragDrop_elementUnderCursor(e);
	if (selected != null) {
		var instance = DksDrapDrop_instance;
	    instance._selectedElement = selected;
	    instance._dblClickFunction(selected, e.clientX, e.clientY);
	}
}

function DksDragDrop_beginDrag(e)
{
	if (!e) {
	   var e = window.event;
	}
	var instance = DksDrapDrop_instance;
	instance._selectedElement = null;
	var selected = DksDragDrop_elementUnderCursor(e);
    if(selected != null)
    {
		instance._selectedElement = selected;
		if (instance._beginDragFunction(selected, e.clientX, e.clientY)) {
			selected.style.borderWidth = 1;
			selected.style.borderStyle = "solid";
			selected.style.borderColor = "red";
			instance._cursorXStart = e.clientX;
			instance._cursorYStart = e.clientY;
			instance._oldzIndex = selected.style.zIndex;
			selected.style.zIndex = 1000;

			instance._selection_elementstartX = parseInt(selected.style.left);
			instance._selection_elementstartY = parseInt(selected.style.top);
			document.onmousemove = DksDragDrop_drag;
			instance._beginDragFunction(selected, e.clientX, e.clientY);
		} else {
			instance._selectedElement = null;
		}
    }
    return false;
}

function DksDragDrop_drag(e)
{
	if (!e) {
       var e = window.event;
    }
    var cursorX = e.clientX;
    var cursorY = e.clientY;
    var instance = DksDrapDrop_instance;
	var selected = DksDrapDrop_instance._selectedElement;
    if (selected != null) {
	    selected.style.left = instance._selection_elementstartX + cursorX - instance._cursorXStart;
        selected.style.top = instance._selection_elementstartY + cursorY - instance._cursorYStart;
		instance._dragFunction(selected, cursorX, cursorY);
	}
    return false;
}

function DksDragDrop_endDrag(e)
{
	if (!e) {
       var e = window.event;
    }

	var instance = DksDrapDrop_instance;
    var selected = DksDrapDrop_instance._selectedElement;
	if (selected != null) {
	   selected.style.borderWidth = 0;
	   selected.style.zIndex = instance._oldzIndex;
       instance._endDragFunction(selected, e.clientX, e.clientY);
	   instance._selectedElement = null;
	}
	document.onmousemove = "";
}

function DksDragDrop_elementUnderCursor(e)
{
    var selection = null;
    var cursorX = e.clientX;
    var cursorY = e.clientY;

	var instance = DksDrapDrop_instance;
    for (var i = 0; i < instance._elements.length; i++) {
		var element = instance._elements[i];
        var leftPosition = parseInt(element.style.left) + instance._offsetX;
        var topPosition = parseInt(element.style.top) + instance._offsetY;
        var widthPosition = leftPosition + parseInt(element.style.width);
        var heightPosition = topPosition + parseInt(element.style.height);
        if ((cursorX >= leftPosition) && (cursorX <= widthPosition) && (cursorY >= topPosition) && (cursorY <= heightPosition)) {
            if (selection == null) {
                selection = element;
            } else {
			    if (parseInt(selection.style.zIndex) <= parseInt(element.style.zIndex)) {
					selection = element;
                }
            }
        }
    }
    return selection;
}