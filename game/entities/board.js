'use strict';

var d3 = require('d3');
var _ = require('underscore');
var Node = require('./node');
var Line = require('./line');

var Board = function(game, parent) {
  this.game = game;
  this.parent = parent;
  this.selectedNode = null;

  this.element = parent.element.append('svg')
    .attr({
      'width': game.width,
      'height': game.height
    })
    .style({
      'top': 0,
      'left': 0,
      'position': 'absolute',
      'backface-visibility': 'hidden',
      'transform-origin': '50% 50%',
    });

  this.nodes = [];
  this.lines = [];
  this.connections = [];

  this.active = true;

  this.cols = 3
  this.rows = 4;

  for(var col = 0; col < this.rows; col++) {
    for(var row = 0; row < this.cols; row++) {
      var x = 50 + row * 90;
      var y = 50 + col * 90;

      var node = new Node(game, this, col, row, x, y)

      this.nodes.push(node);
    }
  }
}

Board.prototype.setActive = function(active) {
  this.active = active;
}

Board.prototype.selectNode = function(node) {
  if(this.connections.length == 0 || typeof _.last(this.connections).end !== 'undefined') {
    this.beginConnection(node);
  }
  else {
    var connection = _.last(this.connections);

    if(this.isLegalConnection(connection.begin, node) && this.active) {
      this.endConnection(node);
    }
  }
}

Board.prototype.isLegalConnection = function(beginNode, endNode) {
  return true;

  if(beginNode.color !== endNode.color) {
    console.log('illegal: different color');
    return false;
  }

  var x1 = beginNode.x() + 25;
  var y1 = beginNode.y() + 25;
  var x2 = endNode.x() + 25;
  var y2 = endNode.y() + 25;

  for(var i = 0; i < this.lines.length; i++) {
    var line = this.lines[i];

    if(line.isIntersecting(x1, y1, x2, y2)) {
      console.log('illegal: intersecting');
      return false;
    }
  }

  return true;
}

Board.prototype.beginConnection = function(node) {
  this.connections.push({
    begin: node
  });

  node.inner.transition().attr('r', 8);
}

Board.prototype.endConnection = function(node) {
  var self = this;

  var connection = _.last(this.connections);
  connection.end = node;

  var x1 = connection.begin.x() + 25;
  var y1 = connection.begin.y() + 25;
  var x2 = connection.end.x() + 25;
  var y2 = connection.end.y() + 25;

  var otherBoard = this.parent.getOtherBoard(this);

  var line = new Line(this.game, this, x1, y1, x1, y1, connection.begin.color);
  this.lines.push(line);

  connection.begin.inner
    .transition()
    .attr('r', 25);

  connection.begin.hint
    .transition()
    .attr('r', 0);

  connection.end.inner
    .transition()
    .delay(50)
    .attr('r', 25);

  connection.end.hint
    .transition()
    .delay(50)
    .attr('r', 0);

  line.element
    .transition()
    .duration(150)
    .attr({
      'x2': x2,
      'y2': y2
    }).
    each('end', function() {
      self.parent.rotateBoards('right', function() {
        otherBoard.beginConnection(otherBoard.getNode(node.col, node.row));
      });
    });
}

Board.prototype.getNode = function(col, row) {
  return this.nodes[row * this.cols + col];
}

module.exports = Board;