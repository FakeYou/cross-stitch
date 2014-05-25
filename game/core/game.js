'use strict';

var d3 = require('d3');
var Puzzle = require('./../entities/puzzle');

var Game = function(container) {
  this.container = container;

  this.width = 330;
  this.height = 420;
}

Game.prototype.setup = function() {
  this.element = d3.select(this.container);

  this.element.style({
    'width': this.width,
    'height': this.height,
    'position': 'absolute',
    'perspective': '1800px',
    'transform-style': 'preserve-3d',
    'transform-origin': '50% 50%'
  })

  this.puzzle = new Puzzle(this, this);
}

Game.prototype.start = function() {
  this.setup();
}

module.exports = Game;