var dataX = [900];
var dataUro = ["930-992",
  		"967-1025",
        "990-1034",
        "986-1032",
        "990-1034",
        "990-1034",
        "1016-1058",
        "1042-1082",
        "1043-1102",
        "1043-1102",
        "1043-1102",
        "1043-1102",
        "1070-1113",
        "1086-1138",
        "1105-1159",
        "1121-1173",
        "1122-1202",
        "1138-1194",
        "1122-1202",
        "1138-1194",
        "1184-1227",
        "1122-1202",
        "1184-1227",
        "1122-1202",
        "1161-1231",
        "1184-1227",
        "1131-1211",
        "1184-1227",
        "1165-1238",
        "1184-1227",
        "1161-1231",
        "1187-1247",
        "1165-1238",
        "1196-1241",
        "1220-1278",
        "1187-1247",
        "1226-1279",
        "1240-1288",
        "1251-1313",
        "1257-1290",
        "1251-1313",
        "1260-1333",
        "1257-1290",
        "1257-1296",
        "1257-1296",
        "1271-1305",
        "1289-1306",
        "1260-1333",
        "1310-1370"
        ];

var generateDataX = function()
{
    for(i =0; i<50; i++)
    {
        dataX.push(800 + i*25);
    }
}

var names = ["Mieszko I", 
                "Bolesław I Chrobry", 
                "Mieszko II Lambert", 
                "Bezprym", 
                "Mieszko II Lambert, Otto Bolesławowic, Dytryk", 
                "Mieszko II Lambert", 
                "Kazimierz I Odnowiciel", 
                "Bolesław II Szczodry", 
                "Władysław I Herman", 
                "Władysław I Herman, Mieszko Bolesławowic", 
                "Władysław I Herman", 
                "Władysław I Herman, Zbigniew, Bolesław III Krzywousty", 
                "Zbigniew, Bolesław III Krzywousty", 
                "Bolesław III Krzywousty",
                "Władysław II Wygnaniec",
                "Bolesław IV Kędzierzawy",
                "Mieszko III Stary",
                "Kazimierz II Sprawiedliwy",
                "Mieszko III Stary",
                "Kazimierz II Sprawiedliwy",
                "Leszek I Biały",
                "Mieszko III Stary",
                "Leszek Biały",
                "Mieszko III Stary",
                "Władysław III Laskonogi",
                "Leszek Biały",
                "Mieszko I Plątonogi",
                "Leszek Biały",
                "Henryk I Brodaty",
                "Leszek Biały",
                "Władysław III Laskonogi",
                "Konrad I mazowiecki",
                "Henryk I Brodaty",
                "Henryk II Pobożny",
                "Bolesław Rogatka",
                "Konrad I mazowiecki",
                "Bolesław V Wstydliwy",
                "Leszek Czarny",
                "Bolesław mazowiecki",
                "Henryk Prawy",
                "Bolesław mazowiecki",
                "Władysław I Łokietek",
                "Henryk Prawy",
                "Przemysł II",
                "Przemysł II",
                "Wacław II",
                "Wacław II",
                "Władysław I Łokietek",
                "Kazimierz III Wielki"
                 ];

                 var rules = ["960-992",
  		"992-1025",
        "1025-1031",
        "1031-1032",
        "1032-1033",
        "1033-1034",
        "1034-1058",
        "1058-1079",
        "1079-1086",
        "1086-1089",
        "1089-1098",
        "1098-1102",
        "1102-1107",
        "1107-1138",
        "1138-1146",
        "1138-1146",
        "1146-1173",
        "1173-1177",
        "1177-1191",
        "1191-1191",
        "1191-1194",
        "1194-1198",
        "1198-1199",
        "1199-1199",
        "1199-1202",
        "1202-1206",
        "1206-1210",
        "1210-1211",
        "1211-1225",
        "1225-1225",
        "1225-1227",
        "1228-1229",
        "1229-1232",
        "1232-1238",
        "1238-1241",
        "1241-1241",
        "1241-1243",
        "1243-1279",
        "1279-1288",
        "1288-1288",
        "1288-1289",
        "1289-1289",
        "1289-1289",
        "1289-1290",
        "1290-1291",
        "1295-1296",
        "1291-1305",
        "1305-1306",
        "1306-1320",
        "1320-1333",
        "1333-1370"
        ];
var start = function()
{

    generateDataX();
var svg = d3.select("div.output svg");


var selection = svg.selectAll("rect")
  .data(dataUro)
        
 var selection2 = svg.selectAll("rect")
  .data(rules)

var svgx = d3.select("div.x svg")
  
var x = svgx.selectAll("rect")
.data(dataX)

var xtxt = svgx.selectAll("rect")
.data(dataX).enter();

selection.enter().append("rect")
.transition()
  .duration(3000)
  .attr("x", function(d,i) { return 2*(Number(d.split("-")[0]) - 830) })
  .attr("y", function(d,i) { return i*35 })
  .attr("width", function(d,i) { return 2*(Number(d.split("-")[1]) - Number(d.split("-")[0])) })
  .attr("height", 30)
  .style("fill", "#2C3E50")

  
selection2.enter().append("rect")
.transition()
  .duration(3000)
  .attr("x", function(d,i) { return 2*(Number(d.split("-")[0]) - 830) })
  .attr("y", function(d,i) { return i*35 })
  .attr("width", function(d,i) { return 2*(Number(d.split("-")[1]) - Number(d.split("-")[0])) })
  .attr("height", 30)
  .style("fill", "#3498DB")
  
  var texts = svg.selectAll("text")
                .data(names)
                .enter();
                
  texts.append("text")
  .text(function(d){
                    return d;
                })
	.attr("x", function(d, i) {return 2*(Number(dataUro[i].split("-")[1]) - 830)})
  .attr("y", function(d,i) { return i*35 + 20 })
   .style("fill", "black")

x.enter().append("rect")
.transition()
  .duration(3000)
  .attr("x", function(d,i) { return 2*(d - 830) })
  .attr("y", function(d,i) { return 90 })
  .attr("width", function(d,i) { return 5 })
  .attr("height", 30)
  .style("fill", "#2C3E50")

 xtxt.append("text")
 .transition()
  .duration(5000)
  .text(function(d){
                    return d;
                })
.attr("x", function(d,i) { return 2*(d - 835) })
  .attr("y", function(d,i) { return 140 })
   .style("fill", "black")

var svg = document.getElementsByTagName("svg");

var bbox = svg[1].getBBox();
svg[1].setAttribute("width", bbox.x + bbox.width  + "px");
svg[1].setAttribute("height",bbox.y + bbox.height + "px");

}

