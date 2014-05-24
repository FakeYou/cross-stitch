'use strict';

var d3 = require('d3');

var Line = function(game, parent, x1, y1, x2, y2, color) {
  this.game = game;
  this.parent = parent;

  this.element = parent.element.append('line')
    .attr({
      'x1': x1,
      'y1': y1,
      'x2': x2,
      'y2': y2
    })
    .style({
      'stroke': color,
      'stroke-linecap': 'round',
      'stroke-width': 4
    });
}

Line.prototype.setBegin = function(x, y) {
  this.element.attr({
    'x1': x,
    'y1': y
  });
}

Line.prototype.setEnd = function(x, y) {
  this.element.attr({
    'x2': x,
    'y2': y
  });
}

Line.prototype.setColor = function(color) {
  this.element.style('stroke', color);
}

module.exports = Line;