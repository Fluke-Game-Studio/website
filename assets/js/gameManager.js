class GameManager {
    constructor(canvasId) {
        // Initialize the canvas and game environment
        this.canvasId = canvasId;
        this.world = new World(canvasId); // Initialize world (hexagons, grid)
        this.players = []; // Initialize an array to store players
        this.session = new Session(this.world, this.players); // Pass world and players to session
        // this.chat = new Chat(); // Initialize the chat system
    }

    start() {
        this.session.start(); // Start the session from the Session class
    }
}

class Session {
    constructor(world, players) {
        this.started = false;
        this.ws = null;
        this.players = players; // Store players in session
        this.world = world; // Reference to world
    }

    start() {
        this.started = true;
        console.log('Game session started.');
        this.connectWebSocket();
    }

    connectWebSocket() {
        const wsUrl = `wss://nodegameserver-1.onrender.com/`; // WebSocket URL (secure)
        this.ws = new WebSocket(wsUrl);

        this.ws.onopen = () => {
            console.log("Connected to WebSocket!");
            this.sendMessage({ type: 'sessions' }); // Send a message to get session info
        };

        this.ws.onmessage = (event) => {
            try {
                const message = JSON.parse(event.data);
                if (message.type === 'sessions') {
                    // For each connected client, create a player and assign a bee
                    this.handlePlayerConnection(message.clientId, message.sessionId);
                }
            } catch (err) {
                console.error('Error parsing WebSocket message:', err.message);
            }
        };

        this.ws.onerror = (error) => {
            console.error('WebSocket error:', error.message);
        };

        this.ws.onclose = () => {
            console.log('Disconnected from WebSocket.');
        };
    }

    // Handle a new player connection and create a player object
    handlePlayerConnection(clientId, sessionId) {
        const player = new Player(clientId, 'bug', this.world.hexagons); // Create player
        this.players.push(player); // Add player to session's player list
        console.log(`Player ${clientId} with Session ID ${sessionId} joined.`);
    }

    // Send a message to the WebSocket server
    sendMessage(message) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(message));
        } else {
            console.log('WebSocket is not open. Message not sent.');
        }
    }
    
    // End the session
    end() {
        this.started = false;
        console.log('Game session ended.');
        if (this.ws) {
            this.ws.close();
        }
    }
}

class Chat {
    constructor() {
        this.messages = [];
    }

    // Send a message in the chat
    sendMessage(message) {
        this.messages.push(message);
        console.log('New message:', message);
    }

    // Get the chat messages
    getMessages() {
        return this.messages;
    }
}

// Main execution when document is ready
$(document).ready(function () {
    // Initialize the game manager with canvasId
    const gameManager = new GameManager('canvas');
    gameManager.start(); // Start the game session
});
