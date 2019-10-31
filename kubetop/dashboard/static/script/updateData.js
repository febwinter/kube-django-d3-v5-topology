const linkGroup = svg.append("g").attr("class", "links")
const nodeGroup = svg.append("g").attr("class", "nodes")
const textGroup = svg.append("g").attr("class", "texts")
let linkElements, nodeElements, textElements

linkElements = linkGroup.selectAll("line").data(links, link => {
    return link.target.id + link.source.id
})
// 1. remove old nodes
linkElements.exit().remove()
// 2. enter and create new ones
const linkEnter = linkElements
    .enter().append("line")
    .attr("stroke-width", 1)
    .attr("stroke", "rgba(50, 50, 50, 0.2)")
// 3. merge
linkElements = linkEnter.merge(linkElements)