'use strict';

var d3 = require('d3');

var Node = function(game, parent, row, col, x, y) {
  var self = this;

  this.game = game;
  this.parent = parent;

  this.row = row;
  this.col = col;

  this.element = parent.element.append('svg')
    .attr({
      'x': x,
      'y': y
    });

  Hammer(this.element.node()).on('tap', function(event) {
    self.onTap.call(self, event);
  })

  var colors = ['#FFC82C', '#69D2E7', '#F06048', '#AEE239'];
  this.color = colors[Math.floor(Math.random() * colors.length)];

  this.outer = this.element.append('circle')
    .attr({
      'cx': 25,
      'cy': 25,
      'r': 24
    })
    .style({
      'fill': 'transparent',
      'stroke': '#DDD',
      'stroke-width': 1
    });

  this.inner = this.element.append('circle')
    .attr({
      'cx': 25,
      'cy': 25,
      'r': 4
    })
    .style({
      'fill': this.color,
    });
}

Node.prototype.onTap = function(event) {
  console.log('tap');
  this.parent.selectNode(this);
}

Node.prototype.x = function() {
  return parseInt(this.element.attr('x'), 10);
}

Node.prototype.y = function() {
  return parseInt(this.element.attr('y'), 10);
}

module.exports = Node;