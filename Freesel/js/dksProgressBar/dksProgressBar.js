var optionsDefaut = {
        height : 11,
        width : 253,
        progressBarImages : new Array("ressources/images/progressbar/progressBar0.png",
                                      "ressources/images/progressbar/progressBar1.png",
                                      "ressources/images/progressbar/progressBar2.png",
                                      "ressources/images/progressbar/progressBar3.png",
                                      "ressources/images/progressbar/progressBar4.png",
                                      "ressources/images/progressbar/progressBar5.png",
                                      "ressources/images/progressbar/progressBar6.png",
                                      "ressources/images/progressbar/progressBar7.png",
                                      "ressources/images/progressbar/progressBar8.png",
                                      "ressources/images/progressbar/progressBar9.png",
                                      "ressources/images/progressbar/progressBar10.png")
};

function DksProgressBar(element, percentage, options) {
	this.element = element;
    this.percentage = percentage;
    this.options = options;

    element.style.width = options.width + "px";
	element.style.height = options.height + "px";

    this.setPercentage = DksProgressBar_setPercentage;
    this.getPercentage = DksProgressBar_getPercentage;
    this.setBackground = DksProgressBar_setBackground;
}

function DksProgressBar_setPercentage(percentage) {
    var temp = parseInt(percentage);
    if (temp < 0) {
		temp = 0;
	}
    if (temp > 100) {
        temp = 100;
	}
	this.percentage = temp;
    this.setBackground();
}

function DksProgressBar_getPercentage() {
    return this.percentage;
}

function DksProgressBar_setBackground() {
	var percentageWidth = this.options.width / 100;
    this.element.style.backgroundPosition = -this.options.width + this.percentage * percentageWidth + "px";

    var progressIndex = Math.floor((this.percentage - 1) / (100 / this.options.progressBarImages.length));
    this.element.style.backgroundImage = "url(" + this.options.progressBarImages[progressIndex] + ")";
}