// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 40},
  width = 800 - margin.left - margin.right,
  height = 800 - margin.top - margin.bottom;

// append the svg object to the body of the page
// var svg = d3.select("#my_dataviz")
// .append("svg")
//   .attr("width", width + margin.left + margin.right)
//   .attr("height", height + margin.top + margin.bottom)
// .append("g")
//   .attr("transform",
//         "translate(" + margin.left + "," + margin.top + ")");

var svg = d3.select("#my_dataviz").append("svg")
    .attr("width", width)
    .attr("height", height);
    
//d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_network.json", function( data) {
d3.json("/static/json/kubeSample.json", function(error, data) {
  if (error) throw error;

  // Initialize the links
  // var link = svg
  //   .selectAll("line")
  //   .data(data.links)
  //   .enter()
  //   .append("line")
  //     .style("stroke", "#aaa")

  // // Initialize the nodes
  // var node = svg
  //   .selectAll("circle")
  //   .data(data.nodes)
  //   .enter()
  //   .append("circle")
  //     .attr("r", 20) 
  //     .style("fill", "#69b3a2")

  var link = svg.selectAll(".link")
    .data(data.links)
    .enter().append("line")
    .attr("class","link");

  var node = svg.selectAll(".node")
    .data(data.nodes)
    .enter().append("g")
    .attr("class","node")
    //.call(force.drag);
  
  node.append("circle")
    .attr("r", 20)
    .style('fill', '#69b3a2');

  node.append("text")
    // .attr("dx", 12)
    // .atrr("dy", ".35em")
    .text(function(d) { return d.name});

  // Let's list the force we wanna apply on the network
  // var simulation = d3.forceSimulation(data.nodes)                 // Force algorithm is applied to data.nodes
  //     .force("link", d3.forceLink()                               // This force provides links between nodes
  //           .id(function(d) { return d.id; })                     // This provide  the id of a node
  //           .links(data.links)                                    // and this the list of links
  //     )
  //     .force("charge", d3.forceManyBody().strength(-200))         // This adds repulsion between nodes. Play with the -400 for the repulsion strength
  //     .force("center", d3.forceCenter(width / 2, height / 2))     // This force attracts nodes to the center of the svg area
  //     .on("end", ticked);

  var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d) { return d.id; }))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2));

  // This function is run at each iteration of the force algorithm, updating the nodes position.
  function ticked() {
    link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node
         .attr("cx", function (d) { return d.x+6; })
         .attr("cy", function(d) { return d.y-6; });
  }

});