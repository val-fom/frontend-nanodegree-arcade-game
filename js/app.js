// Enemies our player must avoid
var Enemy = function(startX, startY, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = this.startX = startX;
    this.y = startY;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > 500) this.x = this.startX;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(startX, startY) {
    this.sprite = 'images/char-boy.png';
    this.x = this.startX = startX;
    this.y = this.startY = startY;
};

// move player in borders
Player.prototype.handleInput = function(key) {
    if (key === 'left' && this.x > -1) {
        this.x -= 101;
        return;
    } else if (key === 'up') {
        this.y -= 83;
        return;
    } else if (key === 'right' && this.x < 403) {
        this.x += 101;
        return;
    } else if (key === 'down' && this.y < 383) {
        this.y += 83;
        return;
    } else return;
}

Player.prototype.update = function() {
    // player reaches the water
    if (this.y <= 32) {
        this.returnToStart();
    }
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// returning player to start position
Player.prototype.returnToStart = function() {
    this.x = this.startX;
    this.y = this.startY;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new Player(201, 383);

var allEnemies = [];

// instantiation enemies with random parameters
for (var i = 0; i < 5; i++) {
    // random factors r1, r2, r3 for startX, startY (line)
    // and speed respectively
    var r1 = 1 + 6 * Math.random();
    var r2 = Math.round(-0.49 + 2.49 * Math.random());
    var r3 = 1 + 2 * Math.random();

    allEnemies.push( new Enemy((-100 * r1),( 63 + 83 * r2), (150 * r3)) );
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// collision detection and returning player to start position
var checkCollisions = function() {
    allEnemies.forEach(function(enemy) {
        if (player.y === enemy.y - 12 && ( player.x < enemy.x + 80 && player.x > enemy.x - 70 ) ) {
            player.returnToStart();
        }
    });
}
