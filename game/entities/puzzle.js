'use strict';

var d3    = require('d3');
var Board = require('./board');

var Puzzle = function(game, parent) {
  this.game = game;
  this.element = parent.element.append('div')
    .attr({
      'class': 'puzzle'
    });

  this.frontBoard = new Board(game, this);
  this.backBoard = new Board(game, this);

  this.backBoard.element
    .style('transform', 'scaleX(-1)');
}

Puzzle.prototype.getOtherBoard = function(board) {
  if(board == this.frontBoard) {
    return this.backBoard;
  }
  else if(board === this.backBoard) {
    return this.frontBoard;
  }
}

module.exports = Puzzle;