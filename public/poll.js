
var svg = d3.select("body")
	.append("svg")
	.append("g");

svg.append("g")
	.attr("class", "slices");
svg.append("g")
	.attr("class", "labels");
svg.append("g")
	.attr("class", "lines");

var width = 560,
	height = 250,
	radius = Math.min(width, height) / 2;

var pie = d3.layout.pie()
	.sort(null)
	.value(function(d) {
		return d.value;
	});

var arc = d3.svg.arc()
	.outerRadius(radius * 0.8)
	.innerRadius(radius * 0.4);

var outerArc = d3.svg.arc()
	.innerRadius(radius * 0.9)
	.outerRadius(radius * 0.9);

svg.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
svg.attr('style', 'align:left');

var key = function(d) {
	return d.data.label;
};

var color = d3.scale.ordinal()
	.domain(["知らない", "聞いたことがある", "使ったことがある", "普段から頻繁に使っている"])
	.range(["#FAD091", "#EF7D7D", "#97C7FC", "#58DBD9"]);


function refreshData(resultArray) {
	var updateResult = new Array();
	var labels = color.domain();
	for (var index = 0; index < labels.length; index++) {
		updateResult.push({
			label: labels[index],
			value: resultArray[index]
		});
	}

	return updateResult;
}



function change(data) {

	/* ------- PIE SLICES -------*/
	var slice = svg.select(".slices").selectAll("path.slice")
		.data(pie(data), key);

	slice.enter()
		.insert("path")
		.style("fill", function(d) { return color(d.data.label); })
		.attr("class", "slice");

	slice
		.transition().duration(1000)
		.attrTween("d", function(d) {
			this._current = this._current || d;
			var interpolate = d3.interpolate(this._current, d);
			this._current = interpolate(0);
			return function(t) {
				return arc(interpolate(t));
			};
		})

	slice.exit()
		.remove();
}