class Square {
    constructor(x, y, color) {
      this.x = x;
      this.y = y;
      this.color = color;
      this.width = 0;
      this.height = 0;
      this.angle = 0;
      this.rotationInProgress = false;
      this.id = `square-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
    }
  
    draw(container) {
      const element = document.createElement('div');
      element.className = 'square';
      element.style.backgroundColor = this.color;
      element.style.left = `${this.x}px`;
      element.style.top = `${this.y}px`;
      element.style.width = `${this.width}px`;
      element.style.height = `${this.height}px`;
      element.setAttribute('id', this.id);
      container.appendChild(element);
    }
  
    resize(width, height) {
      this.width = width;
      this.height = height;
      const element = this.getDOMElement();
      if (element) {
        element.style.width = `${width}px`;
        element.style.height = `${height}px`;
      }
    }
  
    rotate(callback) {
      this.rotationInProgress = true;
      const element = this.getDOMElement();
      if (element) {
        element.style.transition = 'transform 1s';
        element.style.transform = `rotate(${this.angle + 360}deg)`;
        this.angle += 360;
        setTimeout(() => {
          callback();
        }, 1000);
      }
    }
  
    startRotation(callback) {
      const element = this.getDOMElement();
      if (element) {
        element.style.transition = 'transform 0s';
        this.angle = this.angle % 360;
        element.style.transform = `rotate(${this.angle}deg)`;
        setTimeout(() => {
          this.rotate(callback);
        }, 0);
      }
    }
  
    endRotation() {
      this.rotationInProgress = false;
      const element = this.getDOMElement();
      if (element) {
        element.style.transition = 'transform 1s';
        element.style.transform = `rotate(${this.angle}deg)`;
      }
    }
  
    select() {
      const element = this.getDOMElement();
      if (element) {
        element.style.border = '2px solid #000';
      }
    }
  
    deselect() {
      const element = this.getDOMElement();
      if (element) {
        element.style.border = 'none';
      }
    }
  
    remove() {
      const element = this.getDOMElement();
      if (element) {
        element.parentNode.removeChild(element);
      }
    }
  
    getDOMElement() {
      return document.getElementById(this.id);
    }
  }