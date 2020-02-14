var game;
var animationTime = 0;
var dksDragDrop;
var piles = new Array();
var paquets = new Array();
var cartes = new Array();
var listeCartes = new Array();
var vides = new Array();

function initialize() {
    for (var i = 0; i < 4; i++) {
        piles[i] = new Pile();
        paquets[i] = new Pile();
        vides[i] = PILE_EMPTY;
        vides[i + 4] = PILE_EMPTY;
    }

    var carte = new Carte();
    for (var i = INDEX_AS_PIQUE; i <= INDEX_ROI_TREFLE; i++) {
        cartes[i] = new Carte(i, NOM_ELEMENT_CARTE + i);
    }
    Cartes_preload(restart);
}

function displayElement(name, index, indexElement, espacement, top) {
    var element = document.getElementById(name + index);
    element.style.visibility = "visible";
    element.style.left = espacement + indexElement * (espacement + LARGEUR_CARTE);
    element.style.top = top;
    element.style.width = LARGEUR_CARTE;
    element.style.height = HAUTEUR_CARTE;
}

function animateStarting() {
    animationTime++;
    var carte = new Cartes();
    var espacement = (window.document.body.clientWidth - (LARGEUR_CARTE * 8)) / 9;
    if (espacement < 2) {
        espacement = 2;
    }

    if (animationTime == 25) {
        animationTime = 0;
        for (var i = 1; i <= 4; i++) {
            displayElement("pile", i, i + 3, espacement, "30px");
            displayElement("paquet", i, i - 1, espacement, "30px");
            displayElement("vide", i, i - 1, espacement, "0px");
            displayElement("vide", i + 4, i + 3, espacement, "0px");
        }
        return;
    }

    for (var i = 0; i < game._tirage.length; i++) {
        var element = window.document.getElementById(NOM_ELEMENT_CARTE + game._tirage[i]);
        element.style.zIndex = i;
        element.style.left = espacement + ((i % 8) * (espacement + LARGEUR_CARTE));
        element.style.top = (Math.floor(i / 8)) * (animationTime);
        element.style.width = LARGEUR_CARTE;
        element.style.height = HAUTEUR_CARTE;
    }
    setTimeout("animateStarting()", 50);
}

function getCarte(nomCarte) {
    for (var i = 0; i < cartes.length; i++) {
        if (cartes[i].getName() == nomCarte) {
            return cartes[i];
        }
    }
}

function setNextCarteIndex(currentNextCarteName, newNextCarte) {
    for (var i = 0; i < cartes.length; i++) {
        if (cartes[i].getNextCarte() != null && cartes[i].getNextCarte().getName() == currentNextCarteName) {
            cartes[i].setNextCarte(newNextCarte);
        }
    }
}

function saveOldPosition(carte) {
    var element = document.getElementById(carte.getName());
    if (element != null) {
        carte.setOldPositionX(element.style.left);
        carte.setOldPositionY(element.style.top);
    }
}

function isDragAutorized(carte, index) {
    var element = document.getElementById(carte.getName());
    if (element != null) {
        saveOldPosition(carte);
        if (carte.getNextCarte() != null) {
            if (carte.isNextCarteAvailable(carte.getNextCarte())) {
				return isDragAutorized(carte.getNextCarte(), index + 1);
            }
        } else {
			index++;
			if (index <= getMaxMoveAvailable()) {
			    return index;
			}
        }
    }
    return 0;
}

function getListCarteDrag(carte) {
    listeCartes[listeCartes.length] = carte;
    if (carte.getNextCarte() != null) {
        getListCarteDrag(carte.getNextCarte());
    }
}

function getLastPaquetCarte(element, positionX, positionY) {
    var selection = null;
    for (var i = INDEX_AS_PIQUE; i <= INDEX_ROI_TREFLE; i++) {
        var carteTmp = document.getElementById(NOM_ELEMENT_CARTE + i);
        if (carteTmp != null && carteTmp.id != element.id) {
            var left = parseInt(carteTmp.style.left);
            var width = left + parseInt(carteTmp.style.width);
            var top = parseInt(carteTmp.style.top) + 200;
            var height = top + parseInt(carteTmp.style.height);
            if (positionX >= left && positionX <= width && positionY >= top && positionY <= height) {
                if (selection == null) {
                    selection = carteTmp;
                } else {
                    if (parseInt(selection.style.zIndex) <= parseInt(carteTmp.style.zIndex)) {
                        selection = carteTmp;
                    }
                }
            }
        }
    }
    if (selection != null) {
        return getCarte(selection.id);
    }
    return null;
}

function removeVide(id) {
    for (var i = 0; i <= 7; i++) {
        if (vides[i] == id) {
            vides[i] = PILE_EMPTY;
        }
    }
}

function defineListeCartePosition(element) {
    listeCartes.length = 0;
    getListCarteDrag(getCarte(element.id));
    for (var i = 0; i < listeCartes.length; i++) {
        if (listeCartes[i] != null) {
            var elementTmp = document.getElementById(listeCartes[i].getName());
            elementTmp.style.left = element.style.left;
            elementTmp.style.top = parseInt(element.style.top) + (25 * i);
            elementTmp.style.zIndex = parseInt(element.style.zIndex) + parseInt((parseInt(i) + parseInt(1)));
        }
    }
}

function getMaxMoveAvailable() {
	var paquet = 1;
	var vide = 1;
	for (var i = 0; i < 4; i++) {
		if (paquets[i].getCurrentDeck() == PILE_EMPTY) {
			paquet++;
		}
		if (vides[i] == PILE_EMPTY) {
			vide++;
		}
		if (vides[i + 4] == PILE_EMPTY) {
            vide++;
        }
	}
	return paquet * vide;
}

function getElementUnderCursor(name, positionX, positionY, offsetY, listeCarteLength) {
	var element = document.getElementById(name);
	var condition = 1000;
	if (listeCarteLength >= 0) {
        condition = listeCarteLength;
	}
    if (element != null && listeCartes.length <= condition) {
	    var left = parseInt(element.style.left);
	    var width = parseInt(element.style.width);
	    var top = parseInt(element.style.top) + parseInt(offsetY);
	    var height = parseInt(element.style.height);
	    var rect = new Rectangle(left, top, width, height, element);
	    if (rect.isOver(positionX, positionY)) {
	        return rect;
	    } else {
			return null;
		}
    }
}

function defineElementPosition(element, x, y, z) {
    element.style.left = x;
    element.style.top = y;
	if (z >= 0) {
		element.style.zIndex = z;
	}
}

function beginDragFunction(element, positionX, positionY){
    var carte = getCarte(element.id);
    if (carte.isDecked()) {
        return false;
    }
    defineListeCartePosition(element);
    return (isDragAutorized(carte, 0) > 0);
}

function dragFunction(element, positionX, positionY) {
    if (element != null) {
        defineListeCartePosition(element);
    }
}

function isWin() {
	var win = 0;
    for (var i = 0; i <= 3; i++) {
		var carte = piles[i].getCurrentDeck();
        if (!(carte == INDEX_ROI_PIQUE || carte == INDEX_ROI_COEUR || carte == INDEX_ROI_CARREAU || carte == INDEX_ROI_TREFLE)) {
			return false;
		}
	}
	return true;
}

function animateCarte(index, offset) {
    var carte = getCarte(NOM_ELEMENT_CARTE + index);
    var element = document.getElementById(NOM_ELEMENT_CARTE + index);
	index -= offset;
    if (carte.getTag() == "up") {
        if ((parseInt(element.style.top) - index) < 0) {
            carte.setTag("down");
        }
    } else if (carte.getTag() == "down") {
        if (parseInt(element.style.top) + parseInt(element.style.height) + index > window.document.body.clientHeight) {
            carte.setTag("up");
        }
    } else {
        carte.setTag("down");
    }
    if (carte.getTag() == "down") {
        element.style.top = parseInt(element.style.top) + index;
    } else {
        element.style.top = parseInt(element.style.top) - index;
    }
}

function win() {
	for (var i = INDEX_AS_PIQUE; i <= INDEX_ROI_PIQUE; i++) {
        animateCarte(i, INDEX_AS_PIQUE);
	}
	if (animationTime >= 25) {
		for (var i = INDEX_AS_COEUR; i <= INDEX_ROI_COEUR; i++) {
            animateCarte(i, INDEX_AS_COEUR);
        }
	}
	if (animationTime >= 50) {
        for (var i = INDEX_AS_CARREAU; i <= INDEX_ROI_CARREAU; i++) {
            animateCarte(i, INDEX_AS_CARREAU);
        }
    }
	if (animationTime >= 75) {
        for (var i = INDEX_AS_TREFLE; i <= INDEX_ROI_TREFLE; i++) {
            animateCarte(i, INDEX_AS_TREFLE);
        }
    }
	animationTime++;
	if (animationTime >= 100) {
		for (var i = 0; i < cartes.length; i++) {
			var element = document.getElementById(NOM_ELEMENT_CARTE + i);
			element.style.visibility = "hidden";
		}
		alert("Félicitation, vous avez gagné !");
	} else {
	   setTimeout("win()", 25);
	}
}

function endDragFunction(element, positionX, positionY) {
    var elementId = element.id;
    for (var i = 1; i <= 4; i++) {
		var rect = getElementUnderCursor("pile" + i, positionX, positionY, 0, 1);
        if (rect != null) {
            var carte = getCarte(element.id);
            if (carte != null) {
                if (piles[i - 1].isDeckable(carte)) {
					defineElementPosition(element, rect.getX() - 8, rect.getY() - 200, carte.getIndex());
                    piles[i - 1].setCurrentDeck(carte.getIndex());
                    if (carte.getPaquet() != PILE_EMPTY) {
                        paquets[carte.getPaquet()].setCurrentDeck(PILE_EMPTY);
						carte.setPaquet(PILE_EMPTY);
                    }
                    removeVide(carte.getIndex());
                    carte.setDecked(true);
                    setNextCarteIndex(carte.getName(), null);
					listeCartes.length = 0;
					if (isWin()) {
                        win();
                    }
                    return;
                } else {
					defineElementPosition(element, carte.getOldPositionX(), carte.getOldPositionY(), -1);
					defineListeCartePosition(element);
                    listeCartes.length = 0;
                    return;
                }
            }
        }
		rect = getElementUnderCursor("paquet" + i, positionX, positionY, 0, 1);
        if (rect != null) {
			var carte = getCarte(element.id);
            if (carte != null) {
                if (paquets[i - 1].getCurrentDeck() == PILE_EMPTY) {
					defineElementPosition(element, rect.getX() - 8, rect.getY() - 200, -1);
                    if (carte.getPaquet() != PILE_EMPTY) {
                        paquets[carte.getPaquet()].setCurrentDeck(PILE_EMPTY);
                    }
                    removeVide(carte.getIndex());
                    paquets[i - 1].setCurrentDeck(carte.getIndex());
                    carte.setPaquet(i - 1);
                    setNextCarteIndex(carte.getName(), null);
					listeCartes.length = 0;
                    return;
                } else {
					defineElementPosition(element, carte.getOldPositionX(), carte.getOldPositionY(), -1);
					defineListeCartePosition(element);
                    listeCartes.length = 0;
                    return;
                }
            }
		}
    }
    var carteUnder = getLastPaquetCarte(element, positionX, positionY);
    var carteMoved = getCarte(element.id);
    if (carteUnder != null && carteMoved != null) {
        if (carteUnder.isNextCarteAvailable(carteMoved)) {
            var elementTmp = document.getElementById(carteUnder.getName());
            element.style.left = elementTmp.style.left;
            element.style.top = parseInt(elementTmp.style.top) + 25;
            setNextCarteIndex(carteMoved.getName(), null);
            carteUnder.setNextCarte(carteMoved);
            var elementUnder = document.getElementById(carteUnder.getName());
            if (elementUnder != null) {
                element.style.zIndex = parseInt(elementUnder.style.zIndex) + 1;
            } else {
                element.style.zIndex = carte.getIndex();
            }
            removeVide(carteMoved.getIndex());
            if (carteMoved.getPaquet() != PILE_EMPTY) {
                paquets[carteMoved.getPaquet()].setCurrentDeck(PILE_EMPTY);
				carteMoved.setPaquet(PILE_EMPTY)
            }
			defineListeCartePosition(element);
            listeCartes.length = 0;
            return;
        }
    }
    for (var i = 1; i <= 8; i++) {
		rect = getElementUnderCursor("vide" + i, positionX, positionY, 200, -1);
		if (rect != null) {
	        var carte = getCarte(element.id);
            if (carte != null) {
                if (vides[i - 1] == PILE_EMPTY) {
					vides[i - 1] = carte.getIndex();
					var oldX = carte.getOldPositionX();
					var oldY = carte.getOldPositionY();
					if (carte.getNextCarte() == null || isDragAutorized(carte, 1) > 0) {
					    defineElementPosition(element, rect.getX(), rect.getY() - 200, carte.getIndex());
	                    removeVide(carte.getIndex());
						vides[i - 1] = carte.getIndex();
	                    if (carte.getPaquet() != PILE_EMPTY) {
	                        paquets[carte.getPaquet()].setCurrentDeck(PILE_EMPTY);
	                        carte.setPaquet(PILE_EMPTY);
	                    }
	                    defineListeCartePosition(element);
	                    listeCartes.length = 0;
	                    setNextCarteIndex(carte.getName(), null);
					} else {
					    vides[i - 1] = PILE_EMPTY;
						defineElementPosition(element, oldX, oldY, -1);
                        defineListeCartePosition(element);
                        listeCartes.length = 0;
					}
					return;
                } else {
					defineElementPosition(element, carte.getOldPositionX(), carte.getOldPositionY(), -1);
					defineListeCartePosition(element);
                    listeCartes.length = 0;
                    return;
                }
            }
		}
    }
    var carte = getCarte(element.id);
    if (carte != null) {
		defineElementPosition(element, carte.getOldPositionX(), carte.getOldPositionY(), -1);
        defineListeCartePosition(element);
        listeCartes.length = 0;
    }
}

function dblClickFunction(element, positionX, positionY){
	var carte = getCarte(element.id);
	if (isDragAutorized(carte, 1) > 0) {
		var decked = false;
		if (carte != null && !carte.isDecked()) {
			for (var i = 1; i <= 4; i++) {
				if (piles[i - 1].isDeckable(carte)) {
					var pile = document.getElementById("pile" + i);
					defineElementPosition(element, parseInt(pile.style.left) - 8, parseInt(pile.style.top) - 200, carte.getIndex());
					piles[i - 1].setCurrentDeck(carte.getIndex());
					carte.setDecked(true);
					removeVide(carte.getIndex());
					if (carte.getPaquet() != PILE_EMPTY) {
						paquets[carte.getPaquet()].setCurrentDeck(PILE_EMPTY);
						carte.setPaquet(PILE_EMPTY);
					}
					setNextCarteIndex(carte.getName(), null);
					decked = true;
					break;
				}
			}
		}
		if (!decked) {
			for (var i = 1; i <= 4; i++) {
				if (paquets[i - 1].getCurrentDeck() == PILE_EMPTY) {
					var paquet = document.getElementById("paquet" + i);
					paquets[i - 1].setCurrentDeck(carte.getIndex());
					defineElementPosition(element, parseInt(paquet.style.left) - 8, parseInt(paquet.style.top) - 200, -1);
					if (carte.getPaquet() != PILE_EMPTY) {
						paquets[carte.getPaquet()].setCurrentDeck(PILE_EMPTY);
					}
					carte.setPaquet(i - 1);
					removeVide(carte.getIndex());
					setNextCarteIndex(carte.getName(), null);
					break;
				}
			}
		}
		if (isWin()) {
			win();
		}
    }
}

function restart() {
    game = Tirage_newTirage();
    animateStarting();
    var elementsDragDrop = new Array();
    for (var i = INDEX_AS_PIQUE; i <= INDEX_ROI_TREFLE; i++) {
        elementsDragDrop[i] = document.getElementById(NOM_ELEMENT_CARTE + i);
    }
    dksDragDrop = new DksDragDrop(elementsDragDrop, 0, 200, beginDragFunction, dragFunction, endDragFunction, dblClickFunction);
    for (var i = 0; i < game._tirage.length; i++) {
        var carte = getCarte(NOM_ELEMENT_CARTE + game._tirage[i]);
        if (i < 8) {
            vides[i] = carte.getIndex();
        }
        var carteNext = getCarte(NOM_ELEMENT_CARTE + game._tirage[i + 8]);
        if (carteNext != null) {
            carte.setNextCarte(carteNext);
        }
    }
}