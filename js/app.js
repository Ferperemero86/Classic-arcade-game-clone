
  /* Project: Classic Arcade Game Clone
  *Author: Fernando Perez Merono - Front end web developer
  *23/2/2018
  */


  document.addEventListener('DOMContentLoaded', function() {

   'use strict';

    // Randomize speed and position

    var getRandomPosition = function() {
        var num = Math.floor((Math.random() * 3 ) + 1 );
    };

    //Enemies to be Avoided

    var Enemy = function() {
    this.x = 0;
    this.y = getRandomPosition()*50;
    this.speed = getRandomPosition()*130;
    this.sprite = 'images/enemy-bug.png';
    };


Enemy.prototype.update = function(dt) {


};


Enemy.prototype.render = function() {
    ctx.drawImage(this.sprite, this.x, this.y);
};


var Player = function() {
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt) {

    this.x = dt * 2;
    this.y = dt* 2;
};

Player.prototype.handleInput = function(handle) {

};;

Player.prototype.render = function(){
     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



var enemy1 = new Enemy();
var player1 = new Player();


var allEnemies = [enemy1];
console.log(allEnemies);
var player = player1;

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

});
