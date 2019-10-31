function getNeighbors(node) {
    return links.reduce((neighbors, link) => {
        if (link.target.id === node.id) {
            neighbors.push(link.source.id)
        } else if (link.source.id === node.id) {
            neighbors.push(link.target.id)
        }
        return neighbors
    }, [node.id])
}

function isNeighborLink(node, link) {
    return link.target.id === node.id || link.source.id === node.id
}

function getNodeColor(node, neighbors) {
    if (neighbors.indexOf(node.id)) {
        return node.level === 1 ? 'blue' : 'green'
    }
    return node.level === 1 ? 'red' : 'gray'
}

function getTextColor(node, neighbors) {
    return neighbors.indexOf(node.id) ? 'green' : 'black'
}

function getLinkColor(node, link) {
    return isNeighborLink(node, link) ? 'green' : '#E5E5E5'
}

function selectNode(selectedNode) {
    const neighbors = getNeighbors(selectedNode)
    nodeElements
        .attr('fill', node => getNodeColor(node, neighbors))
    textElements
        .attr('fill', node => getTextColor(node, neighbors))
    linkElements
        .attr('stroke', link => getLinkColor(selectedNode, link))
}

function updateData(selectedNode) {
    const neighbors = getNeighbors(selectedNode)
    const newNodes = baseNodes.filter(node => {
        return neighbors.indexOf(node.id) > -1 || node.level === 1
    })
    const diff = {
        removed: nodes.filter(node => newNodes.indexOf(node) === -1),
        added: newNodes.filter(node => nodes.indexOf(node) === -1)
    }
    diff.removed.forEach(node => nodes.splice(nodes.indexOf(node), 1))
    diff.added.forEach(node => nodes.push(node))
    links = baseLinks.filter(link => {
        return link.target.id === selectedNode.id ||
            link.source.id === selectedNode.id
    })
}