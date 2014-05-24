var d3 = require('d3');
var Game = require('./game/core/game');

window.onload = function() {
  var container = document.getElementById('container');
  
  window.game = new Game(container);
  window.game.start();

  window.d3 = d3;
}