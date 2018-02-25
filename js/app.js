
  /* Project: Classic Arcade Game Clone
  *Author: Fernando Perez Merono - Front end web developer
  *23/2/2018
  */

    'use  strict';

   // Get random number between 1 to 3
   // Randomize enemy speed and position.

   var getRandomPosition = function() {
     var num = Math.floor((Math.random() * 3) + 1);
     return num;
   };

   // Enemies our player must avoid
   var Enemy = function() {
     this.sprite = 'images/enemy-bug.png';
     this.x = 0;
     this.y = (getRandomPosition())*70;
     this.speed = (getRandomPosition())*150;
   };

   // Update the enemy's positio

   Enemy.prototype.update = function(dt) {

  // multiplying any movement by the dt parameter
  // ensures the game runs at the same speed for
  // all computers.

    if(this.x >= 505) {

      this.x = 0;
      this.y = (getRandomPosition())*70;
    }
      this.x += this.speed * dt;
   };

   // Draw the enemy on the screen

    Enemy.prototype.render = function() {
     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };

    // player class

    var Player = function() {
      this.sprite = 'images/char-boy.png';
      this.x = 200;
      this.y = 410;
      this.speed = 20;
      this.win = 0;
      this.life = 5;
      this.game = true;
    };

    // instantiate objects.
    // Place all enemy objects in an Array
    // Place player object in a variable

     var enemy1 = new Enemy();
     var enemy2 = new Enemy();
     var enemy3 = new Enemy();
     var allEnemies = [enemy1, enemy2, enemy3];
     var player = new Player();

     //Define default player position for game

     Player.prototype.reset = function() {
       this.x = 200;
       this.y = 410;
     };

     // Reset the game once all lives are finished

    Player.prototype.gameReset = function() {
      this.life = 5;
      this.win = 0;
      this.game = true;
      this.reset();
    };

    //If player wins, update player score by 1

    Player.prototype.scoreWin = function() {
      this.win += 1;
      alert('YOU WIN');
      this.reset();
    };

   //If player loses, updates player score and life by decrementing score by 1

    Player.prototype.scoreLose = function() {
      if(this.win !== 0) {
         this.win -= 1;
      }
      this.life -= 1;
    };

    Player.prototype.checkCollisions = function() {
      var len = allEnemies.length;
      for (var i = 0; i < len; i++) {
      if ((allEnemies[i].x) <= this.x + 30 &&
          (allEnemies[i].x + 30) >= (this.x) &&
          (allEnemies[i].y)<= this.y + 30 &&
          (allEnemies[i].y + 30) >= (this.y)) {
      this.scoreLose();
      alert('YOU LOSE');
      this.reset();
      }
    }

   };

   //If the player reaches the river call scoreWin function

    Player.prototype.checkBorderWin = function() {
      if (this.y <=10)
      {
      this.scoreWin();
      }
    };

   Player.prototype.checkBorderSides = function() {
     if (this.x <= 0 || this.x >= 404 || this.y <=0 || this.y >=430)
     {
       this.reset();
     }
   };

   // Update player

   Player.prototype.update = function() {
     this.checkCollisions();
     this.checkBorderSides();
     this.checkBorderWin();

     if (this.game === true) {
      this.checkGameOver();
     }
     if(this.y <= 5) {
      this.reset();
      this.scoreWin();
     }
   };

   // Check player's lifes

   Player.prototype.checkGameOver = function() {
     if (this.life === 0) {
      alert('Game Over!!!');
      this.game = false;
      this.gameReset();
     }
   };

   Player.prototype.render = function() {
     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
   };

   Player.prototype.handleInput = function(action) {
    if(action ==='left') {
      this.x -= this.speed;
    }

    if(action === 'right') {
      this.x += this.speed;
    }

    if(action === 'up') {
      this.y -= this.speed;
    }

    if(action === 'down') {
      this.y += this.speed;
    }

  };

   // This listens for key presses and sends the keys to
   // Player.handleInput() method.

   document.addEventListener('keyup', function(e) {
   var allowedKeys = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
