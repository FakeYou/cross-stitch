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

Line.prototype.getBegin = function() {
  var x = parseInt(this.element.attr('x1'));
  var y = parseInt(this.element.attr('y1'));

  return { x: x, y: y };
}

Line.prototype.getEnd = function() {
  var x = parseInt(this.element.attr('x2'));
  var y = parseInt(this.element.attr('y2'));

  return { x: x, y: y };
}

/* http://stackoverflow.com/questions/563198/how-do-you-detect-where-two-line-segments-intersect/1968345#1968345 */
Line.prototype.isIntersecting = function(x3, y3, x4, y4) {
  var x1 = this.getBegin().x;
  var y1 = this.getBegin().y;
  var x2 = this.getEnd().x;
  var y2 = this.getEnd().y;

  var s1_x = x2 - x1;
  var s1_y = y2 - y1;
  var s2_x = x4 - x3;
  var s2_y = y4 - y3;

  var s = (-s1_y * (x1 - x3) + s1_x * (y1 - y3)) / (-s2_x * s1_y + s1_x * s2_y);
  var t = ( s2_x * (y1 - y3) - s2_y * (x1 - x3)) / (-s2_x * s1_y + s1_x * s2_y);

  if (s >= 0 && s <= 1 && t >= 0 && t <= 1)
  {
      // Collision detected
      var atX = x1 + (t * s1_x);
      var atY = y1 + (t * s1_y);

      return true;
  }

  // No collision
  return false;
}

module.exports = Line;