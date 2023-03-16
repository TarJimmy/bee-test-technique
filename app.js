class Square {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.color = this.getRandomColor();
        this.rotation = 0;
        this.element = this.createElement();
		this.completedRotation = false;
        this.update(x, y);
        document.getElementById('container').appendChild(this.element);
    }

    // Méthode pour générer une couleur aléatoire
    getRandomColor() {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    // Méthode pour créer l'élément HTML du carré
    createElement() {
        let square = document.createElement('div');
        square.classList.add('square');
        square.style.backgroundColor = this.color;
        return square;
    }

    // Méthode pour mettre à jour la position et la taille du carré en fonction de la position de la souris
    update(x, y) {
        let width = Math.abs(x - this.x);
        let height = Math.abs(y - this.y);
        let left = Math.min(x, this.x);
        let top = Math.min(y, this.y);
        this.element.style.width = width + 'px';
        this.element.style.height = height + 'px';
        this.element.style.left = left + 'px';
        this.element.style.top = top + 'px';
    }

    // Méthode pour faire tourner le carré de 360° et le supprimer à la fin
    rotate(callback) {
        if (this.interval || this.completedRotation) {
            return;
        }
        this.interval = setInterval(() => {
            this.rotation += 5;
            this.element.style.transform = 'rotate(' + this.rotation + 'deg)';
            if (this.rotation >= 360) {
				clearInterval(this.interval);
				this.completedRotation = true;
				callback(this);
            }
        }, 10);
    }

    // Méthode pour supprimer le carré
    delete() {
        this.element.remove()
    }
}

// On crée un tableau pour stocker les carrés
let squares = [];
// On crée un tableau pour les carrée à supprimer
let squaresRotating = [];

// Fonction pour gérer le clic de la souris
function handleMouseDown(event) {
    if (event.target.id !== 'container') {
        return;
    }
    let x = event.clientX;
    let y = event.clientY;
    let square = new Square(x, y);
    squares.push(square);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
}

// Fonction pour gérer le déplacement de la souris
function handleMouseMove(event) {
    if (squares.length === 0) {
        return;
    }
    let x = event.clientX;
    let y = event.clientY;
    let square = squares[squares.length - 1];
    square.update(x, y);
}

// Fonction pour gérer le relâchement de la souris
function handleMouseUp() {
    if (squares.length === 0) {
        return;
    }
    let square = squares[squares.length - 1];
    if (
        square.element.style.width === '0px' ||
        square.element.style.height === '0px'
    ) {
        square.delete();
    } else {
        document.addEventListener('dblclick', handleDoubleClick);
    }
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
}

// Supprime tout les carrée si aucun carré n'est en train de tourner
function deleteAll() {
	const squareRotating = squaresRotating.find((square) => !square.completedRotation);
	if (!squareRotating) {
		squaresRotating.forEach(square => square.delete());
	}
	if (squaresRotating.length === 0 && squares.length === 0) {
		document.removeEventListener('dblclick', handleDoubleClick);
	}
}

// Fonction pour gérer le double-clic sur un carré
function handleDoubleClick(event) {
    if (event.target.classList.contains('square')) {
       squares.forEach((square, index) => {
			if (square.element === event.target) {
				squares.splice(index, 1);
				squaresRotating.push(square);
				square.rotate(deleteAll)
			}
		});
    }
}

// On écoute le clic de la souris sur le conteneur
document
    .getElementById('container')
    .addEventListener('mousedown', handleMouseDown);
