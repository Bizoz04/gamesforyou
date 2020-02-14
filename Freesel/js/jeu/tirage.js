function Tirage(cartes) {
    this.newGame = Tirage_newGame;

    this._tirage = new Array();
	this._cartes = cartes;
}

function Tirage_newGame() {
    var possibilities = new Array();
	for (var i = 0; i < this._cartes._imagesPath.length; i++) {
	   possibilities.push(i);
	}
    var possibilitiesTemp = new Array();
	var nombreCarte = 52;
	while (nombreCarte > 0) {
		var index = parseInt(Math.random() * nombreCarte);
		this._tirage[52 - nombreCarte] = possibilities[index];
        var position = 0;
		for (var i = 0; i < nombreCarte; i++) {
			if (i != index) {
			    possibilitiesTemp[position] = possibilities[i];
				position++;
			}
		}
		possibilities = possibilitiesTemp;
		nombreCarte--;
	}
}

function Tirage_newTirage() {
	var carte = new Cartes();
    var tirage = new Tirage(carte);
	tirage.newGame();
	return tirage;
}

