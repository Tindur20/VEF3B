//Hér læt ég sér stærð hefði átt að gera að það myndi taka allan skjáinn
var width = 1000,
    height = 800;

//hér er ég að gera svg og láta height og with fyrst (fill og stroke dótið kemur þegar ég náði að láta mapið virka)
var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("fill", "#31ff2f")
    .attr("stroke","black")
    .attr("stroke-width","0.5")   

//hér er ég að reada inn json skrána
d3.json("iceland_regions.topo.json", function(error, data) { //hér er ég að kalla í hana 
	var subunits = topojson.feature(data, data.objects.regions);// hérna er ég að locate-a gögninn fyrst gerði ég console.log(data) til að sjá gögninn
	console.log(subunits);
	var projection = d3.geoAlbers()//hér er ég að láta projection til að ladið verði rétt staðsett og að það geti reiknað út lat og long í x og y til að sína kortið
    .center([-1.0, 65])//center, rotate og parallels er til að hjálpa scale að geta zoomað inn til að kortið sjáist
    .rotate([18, 0])
    .parallels([50, 60])
    .scale(7000)
    .translate([width / 2, height / 2]); //hér er ég að finna miðjuna fyrir kortið að og hjálpar lika scale að fara rétt
    var path = d3.geoPath() //hér er ég að gera path sem ég mun nota á eftir
    .projection(projection);//læt ég gögninn í path
  
//hér er ég að fara að nota gögnin og byrta þau
  svg.selectAll(".subunit")//hér er ég að finna subunit til að láta göginn þar
    .data(subunits.features)
    .enter().append("path")//hér er ég að fara að appenda göginn í path
	.attr("class", function(d) { return "subunit"; })//hér er ég að búa til class til að geta notað göginn í
	.attr("d", path)//hér bý ég til "d" til að láta göginn byrtast
	//Hér er ég að gera hover functiunnalitið
	//þetta er eina notkunninn í verkefninu sem þú getur notað
	.on('mouseover', function(d) {
		d3.select(this).attr("fill", "yellow")//þegar það hoverast þá breytist liturinn frá grænum í gúlan
	})
	.on('mouseout', function(d) {
		d3.select(this).attr("fill","#31ff2f")//hér gerist að þegar þú hætir að hovera þá breytist aftur í grænan
	})	

});

//hér er ég að fara nota csv til að byrta smá gögn en það virkaði ekki vel utaf ég greyni lega 
//skrifaði vítlaust lat long coordinate þar sem þar sem long er á að vera lat og lat á að vera long
//og þá fæ ég gal vitlaus x og y þegar ég er að converta það og byrta það
//Þetta fyrir neðan er basically það sama og ég notaði í json dótarinu
	var xAndYCalculator = d3.geoAlbers()
		.translate([width / 2, height / 2])
		.center([-1.0, 65])
    	.rotate([18, 0])
    	.parallels([50, 60])
		.scale(200)

//hér er ég lika að gera svipað og með json nema ég geri d3.csv staðinn fyrir d3.json
d3.csv("capitals.csv", function(error,capitals){
	svg.selectAll(".city-circle")//hérna er ég að láta ætlaði ég að láta class .city-circle en gleymdi að gera annað til að láta classinn í
		.data(capitals)//hér er ég að load göginn inn
		.enter()
		.append("circle")//hér er ég að apenda göginn í circle element
		.attr("fill", "black")
		.attr("r", 2)
		//hér er ég að fara ná í coordinate og breyta þeim í x og y og byrta það
		.attr("cx", function(d) {
			var coords = xAndYCalculator([d.long,d.lat])	//hér er ég að ná í x 
			return coords[0]; //hér er ég að byrta x
		})
		.attr("cy", function(d) {
			var coords = xAndYCalculator([d.long,d.lat]) //hér er ég að ná í y
			return coords[1];//hér er ég að byrta y
		})

})
