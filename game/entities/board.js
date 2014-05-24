'use strict';

var d3 = require('d3');
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
    });

  this.nodes = [];
  this.lines = [];

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

Board.prototype.selectNode = function(node) {
  if(this.selectedNode === null) {
    this.selectedNode = node;

    var x = node.x() + 25;
    var y = node.y() + 25;
    this.selectedNodeLine = new Line(this.game, this, x, y, x, y, node.color);

    node.inner.transition().attr('r', 8);
  }
  else {

    this.selectedNode.inner
      .transition()
      .attr('r', 25);
    
    node.inner
      .transition()
      .delay(50)
      .attr('r', 25);

    this.selectedNodeLine.element
      .transition()
      .duration(150)
      .attr({
        'x2': node.x() + 25,
        'y2': node.y() + 25
      })
      
    this.selectedNode = null;

    var otherBoard = this.parent.getOtherBoard(this);
    otherBoard.selectNode(otherBoard.getNode(node.col, node.row));
  }
}

Board.prototype.getNode = function(col, row) {
  return this.nodes[row * this.cols + col];
}

module.exports = Board;