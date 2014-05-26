'use strict';

var d3    = require('d3');
var Board = require('./board');

var Puzzle = function(game, parent) {
  var self = this;

  this.game = game;
  this.element = parent.element.append('div')
    .attr({
      'class': 'puzzle'
    })
    .style({
      'width': game.width,
      'height': game.height,
      'position': 'relative',
      'transform-style': 'preserve-3d',
      'transform-origin': '50% 50%',
      'transform': 'rotateY(0deg)'
    });

  this.frontBoard = new Board(game, this);
  this.backBoard = new Board(game, this);

  this.backBoard.element
    .style('transform', 'rotateY(180deg) scaleX(-1)');

  Hammer(this.element.node()).on('dragright dragleft swiperight swipeleft', function(event) {
    self.onSwipe.call(self, event);
  })
}

Puzzle.prototype.getOtherBoard = function(board) {
  if(board == this.frontBoard) {
    return this.backBoard;
  }
  else if(board === this.backBoard) {
    return this.frontBoard;
  }
}

Puzzle.prototype.rotateBoards = function(direction, callback) {
  var self = this;
  var direction = direction || 'right';
  var otherBoard = this.frontBoard.active ? this.backBoard : this.frontBoard;

  if(this.frontBoard.active && direction == 'left') {
    var begin = 0;
    var end = -180;
  }
  else if(this.frontBoard.active && direction == 'right') {
    var begin = 0;
    var end = 180;
  }
  else if(this.backBoard.active && direction == 'left') {
    var begin = 180;
    var end = 0;
  }
  else if(this.backBoard.active && direction == 'right') {
    var begin = 180;
    var end = 360;
  }

  if(typeof begin !== 'undefined') {
    this.frontBoard.setActive(false);
    this.backBoard.setActive(false);

    this.element
      .transition()
      .duration(750)
      .styleTween('transform', function(d, i, a) {
        return d3.interpolateString('rotateY('+begin+'deg)', 'rotateY('+end+'deg)');
      })
      .each('end', function() {
        otherBoard.setActive(true);

        if(typeof callback === 'function') {
          callback();
        }
      })
  }
}

Puzzle.prototype.onSwipe = function(event) {
  this.rotateBoards(event.gesture.direction);
}

module.exports = Puzzle;