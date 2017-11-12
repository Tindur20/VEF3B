var width = 1000,
    height = 800;

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("fill", "#31ff2f")
    .attr("stroke","black")
    .attr("stroke-width","0.5")   

d3.json("iceland_regions.topo.json", function(error, data) {
	var subunits = topojson.feature(data, data.objects.regions);
	console.log(subunits);
	var projection = d3.geoAlbers()
    .center([-1.0, 65])
    .rotate([18, 0])
    .parallels([50, 60])
    .scale(7000)
    .translate([width / 2, height / 2]);
    var path = d3.geoPath()
    .projection(projection);
  
  svg.selectAll(".subunit")
    .data(subunits.features)
    .enter().append("path")
	.attr("class", function(d) { return "subunit"; })
	.attr("d", path)
	.on('mouseover', function(d) {
		d3.select(this).attr("fill", "yellow")
	})
	.on('mouseout', function(d) {
		d3.select(this).attr("fill","#31ff2f")
	})	

});
	var xAndYCalculator = d3.geoAlbers()
		.translate([width / 2, height / 2])
		.center([-1.0, 65])
    	.rotate([18, 0])
    	.parallels([50, 60])
		.scale(200)

d3.csv("capitals.csv", function(error,capitals){
	svg.selectAll(".city-circle")
		.data(capitals)
		.enter()
		.append("circle")
		.attr("fill", "black")
		.attr("r", 2)
		.attr("cx", function(d) {
			var coords = xAndYCalculator([d.long,d.lat])	
			return coords[0];
		})
		.attr("cy", function(d) {
			var coords = xAndYCalculator([d.long,d.lat])
			return coords[1];
		})

})
