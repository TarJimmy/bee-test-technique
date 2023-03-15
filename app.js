class Square {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.color = this.getRandomColor();
        this.rotation = 0;
        this.element = this.createElement();
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
    rotate() {
        if (this.interval) {
            return;
        }
        this.interval = setInterval(() => {
            this.rotation += 10;
            this.element.style.transform = 'rotate(' + this.rotation + 'deg)';
            if (this.rotation >= 360) {
                this.delete();
            }
        }, 10);
    }

    // Méthode pour supprimer le carré
    delete() {
        clearInterval(this.interval);
        this.element.parentNode.removeChild(this.element);
        let index = squares.indexOf(this);
        if (index !== -1) {
            squares.splice(index, 1);
        }
        if (squares.length === 0) {
            document.removeEventListener('dblclick', handleDoubleClick);
        }
    }
}

// On crée un tableau pour stocker les carrés
let squares = [];

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
function handleMouseUp(event) {
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

// Fonction pour gérer le double-clic sur un carré
function handleDoubleClick(event) {
    if (event.target.classList.contains('square')) {
        let squaresToRotate = squares.filter(
            (square) => square.element === event.target
        );
        squaresToRotate.forEach((square) => square.rotate());
    }
}

// On écoute le clic de la souris sur le conteneur
document
    .getElementById('container')
    .addEventListener('mousedown', handleMouseDown);
