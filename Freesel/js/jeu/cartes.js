var cartes_progressBar;
var cartes_loader = new Loader();
var cartes_oldNumber = 0;
var cartes_loaderImageProgressbar = new Loader();

function Cartes() {
    this._imagesPath = new Array();

	for (var i = 0; i < 13; i++) {
		this._imagesPath[INDEX_AS_PIQUE + i] = "./ressources/images/cartes/pique" + (i + 1) + ".png";
		this._imagesPath[INDEX_AS_COEUR + i] = "./ressources/images/cartes/coeur" + (i + 1) + ".png";
		this._imagesPath[INDEX_AS_CARREAU + i] = "./ressources/images/cartes/carreau" + (i + 1) + ".png";
		this._imagesPath[INDEX_AS_TREFLE + i] = "./ressources/images/cartes/trefle" + (i + 1) + ".png";
	}
}

function Cartes_checkLoadImage() {
    cartes_loader.checkLoad();
    var numberFinished = cartes_loader.getNumberFinished();
	var carte = new Cartes();
    if (numberFinished != carte._imagesPath.length) {
        if (cartes_oldNumber < numberFinished) {
            cartes_oldNumber = numberFinished;
            cartes_progressBar.setPercentage((100 / carte._imagesPath.length) * numberFinished);
        }
        setTimeout("Cartes_checkLoadImage()", 500);
    } else {
        Cartes_displayImages();
    }
}

function Cartes_preload() {
    cartes_loaderImageProgressbar.load(optionsDefaut.progressBarImages);
	setTimeout("Cartes_preloadProgressBar()", 250);
}

function Cartes_preloadProgressBar() {
	cartes_loaderImageProgressbar.checkLoad();
	if (cartes_loaderImageProgressbar.getNumberFinished() > 9) {
        Cartes_loadImages();
	}
}

function Cartes_loadImages() {
    cartes_progressBar = new DksProgressBar(document.getElementById("progression"), 0, optionsDefaut);
	cartes_loader.load(new Cartes()._imagesPath);
    Cartes_checkLoadImage();
    cartes_progressBar.setPercentage('100');
}

function Cartes_displayImages() {
    window.document.getElementById("progression").style.display = "none";
    for (var i = INDEX_AS_PIQUE; i <= INDEX_ROI_TREFLE; i++) {
		var element = window.document.createElement(NOM_ELEMENT_CARTE + i);
		element.id = NOM_ELEMENT_CARTE + i;
		window.document.getElementById("cartes").appendChild(element);
		if (i < INDEX_AS_COEUR) {
			element.className = "carte pique" + (i + 1);
		} else if (i < INDEX_AS_CARREAU) {
            element.className = "carte coeur" + (i - INDEX_AS_COEUR + 1);
        } else if (i < INDEX_AS_TREFLE) {
			element.className = "carte carreau" + (i - INDEX_AS_CARREAU + 1);
        }  else {
			element.className = "carte trefle" + (i - INDEX_AS_TREFLE + 1);
        }
	}
	restart();
}