'use strict';

var d3 = require('d3');
var Puzzle = require('./../entities/puzzle');

var Game = function(container) {
  this.container = container;

  this.width = 320;
  this.height = 568;
}

Game.prototype.setup = function() {
  this.element = d3.select(this.container);

  this.puzzle = new Puzzle(this, this);
}

Game.prototype.start = function() {
  this.setup();
}

module.exports = Game;