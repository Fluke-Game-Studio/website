class Player {
    constructor(id, elementId, hexGrid) {
        this.id = id; // Unique ID for the player
        this.element = document.getElementById(elementId); // Reference to the bee element
        this.hexGrid = hexGrid; // Reference to the hexagonal grid
        this.currentHex = null; // Track the current hexagon the bee is on
        this.x = 0; // X position of the player
        this.y = 0; // Y position of the player
        this.flip = false; // To manage bee's flip state

        // Initial setup
        this.init();
    }

    // Initialize player
    init() {
        this.placeOnRandomHexagon();
    }

    // Update position of the player
    updatePosition(x, y) {
        this.x = x;
        this.y = y;

        // Move the bee element to the new position
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;

        // Flip the bee based on direction
        if (this.flip) {
            this.element.classList.add('flip');
        } else {
            this.element.classList.remove('flip');
        }
    }

    placeOnRandomHexagon() {
        const randomHex = this.hexGrid[Math.floor(Math.random() * this.hexGrid.length)];
        this.currentHex = randomHex;
        this.updatePosition(randomHex.x, randomHex.y);
    }

    moveToHexagon(targetHex) {
        this.currentHex = targetHex; // Update current hexagon
        this.updatePosition(targetHex.x, targetHex.y); // Move bee
    }

    // Validate the move to the target hexagon
    validateMove(targetHex) {
        // Example validation: Only allow moving to neighboring hexagons
        const dx = Math.abs(this.currentHex.x - targetHex.x);
        const dy = Math.abs(this.currentHex.y - targetHex.y);

        // Allow move if the hex is close enough
        const isNeighbor = dx <= 120 && dy <= 100; // Adjust based on hexagon dimensions
        return isNeighbor;
    }

    // Method to move the player (bee) based on coordinates
    moveTo(x, y) {
        if (this.x < x) {
            this.flip = true;
        } else {
            this.flip = false;
        }

        this.updatePosition(x, y);
        this.addHoneyTrail(x, y);
    }

    // Add honey trail when the player moves
    addHoneyTrail(x, y) {
        const trail = document.createElement('div');
        trail.className = 'honey_trail';
        trail.style.left = `${x + 10}px`;
        trail.style.top = `${y + 30}px`;

        // Add the honey trail to the DOM
        if (Math.random() < 0.5) {
            document.body.appendChild(trail);

            // Remove the honey trail after a delay
            setTimeout(() => {
                trail.remove();
            }, 2500);
        }
    }

    // Handle player movement on touch (for mobile)
    moveBeeMobile(e) {
        const touch = e.touches[0];
        const bx = touch.clientX;
        const by = touch.clientY;
        this.moveTo(bx, by);
    }

    // Handle player movement with mouse (for desktop)
    moveBeeMouse(e) {
        const x = e.clientX - 15;
        const y = e.clientY - 15;
        this.moveTo(x, y);
    }
}