function Carte(index, name) {
  this._index = index;
  this._name = name;
  this._decked = false;
  this._oldPositionX = 0;
  this._oldPositionY = 0;
  this._paquet = PILE_EMPTY;
  this._nextCarte = null;
  this._tag = "";

  this.getIndex = Carte_getIndex;
  this.getName = Carte_getName;
  this.isDecked = Carte_isDecked;
  this.setDecked = Carte_setDecked;
  this.getOldPositionX = Carte_getOldPositionX;
  this.setOldPositionX = Carte_setOldPositionX;
  this.getOldPositionY = Carte_getOldPositionY;
  this.setOldPositionY = Carte_setOldPositionY;
  this.getPaquet = Carte_getPaquet;
  this.setPaquet = Carte_setPaquet;
  this.getNextCarte = Carte_getNextCarte;
  this.setNextCarte = Carte_setNextCarte;
  this.getTag = Carte_getTag;
  this.setTag = Carte_setTag;
  this.isNextCarteAvailable = Carte_isNextCarteAvailable;
}

function Carte_getIndex() {
  return this._index;
}

function Carte_getName() {
  return this._name;
}

function Carte_isDecked() {
  return this._decked;
}

function Carte_setDecked(decked) {
  this._decked = decked;
}

function Carte_getOldPositionX() {
    return this._oldPositionX;
}

function Carte_setOldPositionX(oldPosition) {
  this._oldPositionX = oldPosition;
}

function Carte_getOldPositionY() {
  return this._oldPositionY;
}

function Carte_setOldPositionY(oldPosition) {
  this._oldPositionY = oldPosition;
}

function Carte_getPaquet() {
  return this._paquet;
}

function Carte_setPaquet(paquet) {
  this._paquet = paquet;
}

function Carte_getNextCarte() {
  return this._nextCarte;
}

function Carte_setNextCarte(nextCarte) {
  this._nextCarte = nextCarte;
}

function Carte_getTag() {
  return this._tag;
}

function Carte_setTag(tag) {
  this._tag = tag;
}

function Carte_isNextCarteAvailable(carte) {
	var index = this._index;
	var carteIndex = carte.getIndex();
	if (this._decked || this._paquet != PILE_EMPTY) {
		return false;
	}
    if (index == INDEX_AS_PIQUE || index == INDEX_AS_COEUR || index == INDEX_AS_CARREAU || index == INDEX_AS_TREFLE) {
        return false;
	}
	if (index >= INDEX_AS_PIQUE && index <= INDEX_ROI_PIQUE) {
        return ((carteIndex == index - 1 + (INDEX_AS_COEUR - INDEX_AS_PIQUE)) || (carteIndex == index - 1 + (INDEX_AS_CARREAU - INDEX_AS_PIQUE)));
	} else if (index >= INDEX_AS_COEUR && index <= INDEX_ROI_COEUR) {
        return ((carteIndex == index - 1 + (INDEX_AS_PIQUE - INDEX_AS_COEUR)) || (carteIndex == index - 1 + (INDEX_AS_TREFLE - INDEX_AS_COEUR)));
	} else if (index >= INDEX_AS_CARREAU && index <= INDEX_ROI_CARREAU) {
        return ((carteIndex == index - 1 + (INDEX_AS_PIQUE - INDEX_AS_CARREAU)) || (carteIndex == index - 1 + (INDEX_AS_TREFLE - INDEX_AS_CARREAU)));
    } else if (index >= INDEX_AS_TREFLE && index <= INDEX_ROI_TREFLE) {
        return ((carteIndex == index - 1 + (INDEX_AS_COEUR - INDEX_AS_TREFLE)) || (carteIndex == index - 1 + (INDEX_AS_CARREAU - INDEX_AS_TREFLE)));
    } else {
		return false;
	}
}