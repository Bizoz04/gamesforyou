function Pile(index) {
	this._currentDeck = PILE_EMPTY;

	this.getCurrentDeck = Pile_getCurrentDeck;
	this.setCurrentDeck = Pile_setCurrentDeck;
	this.isDeckable = Pile_isDeckable;
}

function Pile_getCurrentDeck() {
	return this._currentDeck;
}

function Pile_setCurrentDeck(currentDeck) {
	this._currentDeck = currentDeck;
}

function Pile_isDeckable(carte) {
	if (this._currentDeck == INDEX_ROI_PIQUE || this._currentDeck == INDEX_ROI_COEUR || this._currentDeck == INDEX_ROI_CARREAU || this._currentDeck == INDEX_ROI_TREFLE) {
		return false;
	}
	if (this._currentDeck == PILE_EMPTY) {
		if (carte.getIndex() == INDEX_AS_PIQUE || carte.getIndex() == INDEX_AS_COEUR || carte.getIndex() == INDEX_AS_CARREAU || carte.getIndex() == INDEX_AS_TREFLE) {
			return true;
		} else {
			return false;
		}
	}
	if (carte.getIndex() == this._currentDeck + 1) {
		return true;
	} else {
		return false;
	}
}
