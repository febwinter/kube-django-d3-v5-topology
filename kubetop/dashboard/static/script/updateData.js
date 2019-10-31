// we use svg groups to logically group the elements together
var linkGroup = svg.append('g').attr('class', 'links')
var nodeGroup = svg.append('g').attr('class', 'nodes')
var textGroup = svg.append('g').attr('class', 'texts')

// select node is called on every click
// we either update the data according to the selection
// or reset the data if the same node is clicked twice
function selectNode(selectedNode) {
  if (selectedId === selectedNode.id) {
    selectedId = undefined
    resetData()
    updateSimulation()
  } else {
    selectedId = selectedNode.id
    updateData(selectedNode)
    updateSimulation()
  }
  var neighbors = getNeighbors(selectedNode)
  // we modify the styles to highlight selected nodes
  nodeElements.attr('fill', function (node) {
    return getNodeColor(node, neighbors)
  })
  textElements.attr('fill', function (node) {
    return getTextColor(node, neighbors)
  })
  linkElements.attr('stroke', function (link) {
    return getLinkColor(selectedNode, link)
  })
}
// this helper simple adds all nodes and links
// that are missing, to recreate the initial state
function resetData() {
  var nodeIds = nodes.map(function (node) {
    return node.id
  })
  baseNodes.forEach(function (node) {
    if (nodeIds.indexOf(node.id) === -1) {
      nodes.push(node)
    }
  })
  links = baseLinks
}
// diffing and mutating the data
function updateData(selectedNode) {
  var neighbors = getNeighbors(selectedNode)
  var newNodes = baseNodes.filter(function (node) {
    return neighbors.indexOf(node.id) > -1 || node.level === 1
  })
  var diff = {
    removed: nodes.filter(function (node) {
      return newNodes.indexOf(node) === -1
    }),
    added: newNodes.filter(function (node) {
      return nodes.indexOf(node) === -1
    })
  }
  diff.removed.forEach(function (node) {
    nodes.splice(nodes.indexOf(node), 1)
  })
  diff.added.forEach(function (node) {
    nodes.push(node)
  })
  links = baseLinks.filter(function (link) {
    return link.target.id === selectedNode.id || link.source.id === selectedNode.id
  })
}

function updateGraph() {
  // links
  linkElements = linkGroup.selectAll('line')
    .data(links, function (link) {
      return link.target.id + link.source.id
    })
  linkElements.exit().remove()
  var linkEnter = linkElements
    .enter().append('line')
    .attr('stroke-width', 1)
    .attr('stroke', 'rgba(50, 50, 50, 0.2)')
  linkElements = linkEnter.merge(linkElements)
  // nodes
  nodeElements = nodeGroup.selectAll('circle')
    .data(nodes, function (node) {
      return node.id
    })
  nodeElements.exit().remove()
  var nodeEnter = nodeElements
    .enter()
    .append('circle')
    .attr('r', 10)
    .attr('fill', function (node) {
      return node.level === 1 ? 'red' : 'gray'
    })
    .call(dragDrop)
    // we link the selectNode method here
    // to update the graph on every click
    .on('click', selectNode)
  nodeElements = nodeEnter.merge(nodeElements)
  // texts
  textElements = textGroup.selectAll('text')
    .data(nodes, function (node) {
      return node.id
    })
  textElements.exit().remove()
  var textEnter = textElements
    .enter()
    .append('text')
    .text(function (node) {
      return node.label
    })
    .attr('font-size', 15)
    .attr('dx', 15)
    .attr('dy', 4)
  textElements = textEnter.merge(textElements)
}

function updateSimulation() {
  updateGraph()
  simulation.nodes(nodes).on('tick', () => {
    nodeElements
      .attr('cx', function (node) {
        return node.x
      })
      .attr('cy', function (node) {
        return node.y
      })
    textElements
      .attr('x', function (node) {
        return node.x
      })
      .attr('y', function (node) {
        return node.y
      })
    linkElements
      .attr('x1', function (link) {
        return link.source.x
      })
      .attr('y1', function (link) {
        return link.source.y
      })
      .attr('x2', function (link) {
        return link.target.x
      })
      .attr('y2', function (link) {
        return link.target.y
      })
  })
  simulation.force('link').links(links)
  simulation.alphaTarget(0.7).restart()
  console.log("activated")
}
// last but not least, we call updateSimulation
// to trigger the initial render
updateSimulation()