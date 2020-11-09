
// fetch('https://launchlibrary.net/1.4/launch/2020-11-01/2020-12-30')
//   .then(response => response.json())
//   .then(data => console.log(data.launches));

let apiHead = 'https://weather.ls.hereapi.com/weather/1.0/report.json?product=forecast_7days&name=';
let apikey = "5kBKoUQpxOhKeh9-CgWHP8DgNbqTAR5uDwkCSGHnPjc";
let cityName = 'newyork';
let myURL = apiHead + cityName + '&apiKey=' + apikey;
let skyNum = 34;
let skyInfos = [];
let comforts = [];
let temps = [];
let tempDescs = [];
let windDirs = [];
let windSpeeds = [];
let soundHead = './materials/final/'
let soundPaths = [];
let audios = [];
let playlist = [];
let interval;
let timeOut;
let current = null;
let idx = 0;
let myShapes = [];
let svg = d3.select('svg');
let layer1 = d3.select('svg').append('g');
let layer2 = d3.select('svg').append('g');
let layer3 = d3.select('svg').append('g');


let infoDiv = document.getElementById("infoContent");
let page1 = document.getElementById("page1");
let page2 = document.getElementById("page2");
let page3 = document.getElementById("page3");
let page4 = document.getElementById("page4");
let pageBG = document.getElementById("pageBG");
let ifGetData = false;

//Get audio file
for (let i = 1; i <= skyNum; i++) {
  audios[i] = new Audio();
  audios[i].src = soundHead + i + ".wav";
  // playlist.push(audios[i]);
}


// audio[0]=new Audio();
// audio[0].src="Hezi.mp3";
// audio[0].play();

function getData() {
  //page transition
  page1.classList.remove("m-fadeIn");
  page1.classList.add("m-fadeOut");

  page2.classList.add("m-fadeIn");
  page2.classList.remove("m-fadeOut");

  pageBG.classList.add("m-fadeIn");
  pageBG.classList.remove("m-fadeOut");

  page4.classList.remove("m-fadeIn");
  page4.classList.add("m-fadeOut");

  cityName = document.getElementById('inputCity').value;

  //update title

  let titles = document.getElementsByClassName('cityTitle');
  for (let i = 0; i < titles.length; i++) {
    titles[i].innerHTML = 'RHYTHEM FROM ' + cityName.toUpperCase() + ' SKY';
  }



  console.log(cityName);
  myURL = apiHead + cityName + '&apiKey=' + apikey;
  skyInfos = [];
  comforts = [];
  temps = [];
  tempDescs = [];
  windDirs = [];
  windSpeeds = [];
  playlist = [];
  // clearTimeout();


  fetch(myURL)
    .then(response => response.json())
    .then(function (data) {

      data.forecasts.forecastLocation.forecast.forEach(element => {
        skyInfos.push(parseInt(element.skyInfo));
        comforts.push(parseInt(element.comfort));
        temps.push(parseInt(element.temperature));
        // tempDescs.push(element.temperatureDesc);
        windDirs.push(element.windDirection);
        windSpeeds.push(parseInt(element.windSpeed));
        playlist.push(audios[parseInt(element.skyInfo)]);
      });
      console.log(skyInfos);
      console.log(playlist);
      // console.log(data.forecasts.forecastLocation.forecast);
      // console.log(skyInfos);
      ifGetData = true;


    })
    .catch(function () {
      //another page to handle error? 
      console.log("error");
    });;

  //Start Drawing and Playing Beat


  //clear the canvas
  layer1.selectAll("*").remove();
  layer2.selectAll("*").remove();
  layer3.selectAll("*").remove();

  //start from the beginning
  idx = 0;
  clearTimeout(timeOut);
  timeOut = setTimeout(function () {
    page4.classList.remove("m-fadeIn");
    page4.classList.add("m-fadeOut");

    page2.classList.remove("m-fadeIn");
    page2.classList.add("m-fadeOut");

    pageBG.classList.remove("m-fadeIn");
    pageBG.classList.add("m-fadeOut");

    interval = setInterval(playSound, 500);
  }, 3000)


}

function playSound() {
  // console.log(playlist.length);
  // go to next
  if (idx < playlist.length) {
    //Call shape animation
    // testAnime();
    current = playlist[idx++];
    
    // check if is the last of playlist
    if (idx >= playlist.length) {
      setTimeout(function () {
        // page1.classList.remove('m-fadeOut');
        // page1.classList.add('m-fadeIn')
        page4.classList.remove('m-fadeOut');
        page4.classList.add('m-fadeIn')
      }, 3000);

    }
    // return to begin
    current.currentTime = 0;
    // play
    
    current.play();
    setTimeout(function(){
      shapeAnime(skyInfos[idx]);
    },800)
   
    console.log("play")
  } else {
    clearInterval(interval);
  }

}

function shapeAnime(shapeIdx) {
  console.log('shapeIdx: ' + shapeIdx);
  switch (shapeIdx) {
    case 1:
      animeCross1();
      break;
    case 2:
      animeCircle3();
      break;
    case 3:
      animePie1();
      break;
    case 4:
      animeRect1();
      break;
    case 5:
      animeRect2();
      break;
    case 6:
      animeLine2();
      break;
    case 7:
      animeRect2();
      break;
    case 8:
      animeTris1();
      break;
    case 9:
      animeCircle3();
      break;
    case 10:
      animeArc1();
      break;
    case 11:
      animeTris1();
      break;
    case 12:
      animeRect1();
      break;
    case 13:
      animeRect2();
      break;
    case 14:
      animeCross1();
      break;
    case 15:
      animeTris1();
      break;
    case 16:
      animeRect2();
      break;
    case 17:
      animePie1();
      break;
    case 18:
      animeArc1();
      break;
    case 19:
      animeLine2();
      break;
    case 20:
      animeRect1();
      break;
    case 21:
      animeRect2();
      break;
    case 22:
      animeTris1();
      break;
    case 23:
      animeCross1();
      break;
    case 24:
      animeCircle3();
      break;
    case 25:
      animeLine2();
      break;
    case 26:
      animeArc1();
      break;
    case 27:
      animePie1();
      break;
    case 28:
      animeRect1();
      break;
    case 29:
      animeRect2();
      break;
    case 30:
      animeTris1();
      break;
    case 31:
      animeCross1();
      break;
    case 32:
      animeCircle3();
      break;
    case 33:
      animeRect2();
      break;
    case 34:
      animeCircle3();
      break;

  }
}

function testAnime() {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);


  layer3
    .append("circle")
    .attr("fill", 'none')
    .attr("stroke", '#' + randomColor)
    .attr("r", 10)
    .attr('cx', Math.floor(Math.random() * 120 + 20))
    .attr('cy', Math.floor(Math.random() * 50 + 20))
    .transition()
    .ease(d3.easeElastic)           // control the speed of the transition
    .duration(3000)           // apply it over 2000 milliseconds
    .attr("r", Math.floor(Math.random() * 50 + 10));
}

function closeOption() {
  page4.classList.add('m-fadeOut');
  page4.classList.remove('m-fadeIn');
}

function closeInfo(){
  infoDiv.classList.add('m-fadeOut');
  infoDiv.classList.remove('m-fadeIn');
}

function toggleInfo(){
  infoDiv.classList.toggle('m-fadeIn');
}

function toggleOption() {
  // page4.classList.toggle('m-fadeOut');
  page4.classList.toggle('m-fadeIn');
}

function backToHome() {

  page1.classList.remove('m-fadeOut');
  page1.classList.add('m-fadeIn');
  pageBG.classList.remove('m-fadeOut');
  pageBG.classList.add('m-fadeIn');
  page2.classList.remove('m-fadeIn');
  page2.classList.add('m-fadeOut');
}

function replay() {
  //clear the canvas
  layer1.selectAll("*").remove();
  layer2.selectAll("*").remove();
  layer3.selectAll("*").remove();

  //start from the beginning
  idx = 0;
  clearTimeout(timeOut);
  timeOut = setTimeout(function () {
    page4.classList.remove("m-fadeIn");
    page4.classList.add("m-fadeOut");

    page2.classList.remove("m-fadeIn");
    page2.classList.add("m-fadeOut");

    pageBG.classList.remove("m-fadeIn");
    pageBG.classList.add("m-fadeOut");

    interval = setInterval(playSound, 500);
  }, 50)
}

let animeLine1 = () => {
  // line drawing animation, credit to: https://bl.ocks.org/basilesimon/f164aec5758d16d51d248e41af5428e4
  let curveX = d3.scaleLinear().domain([0, 10]).range([0, 100]);
  let curveY = d3.scaleLinear().domain([0, 10]).range([-10, 150]);

  // var line = d3.line()
  //   .x(function(d,i) {console.log(x(i)); return x(i);})
  //   .y(function(d) {return y(d);})
  //   .curve(d3.curveNatural)

  let line1Data = d3.range(10).map(function () { return Math.random() * 10 })

  let line1 = d3.line()
    .x(function (d, i) { return curveX(d) + i * 20; })
    .y(function (d, i) {
      // console.log(curveY(i)); 
      return curveY(i);
    })
    .curve(d3.curveNatural)
  // .curve(de.curveLinear)

  // data is created inside the function so it is always unique


  // console.log(line1Data);
  // Uncomment following line to clear the previously drawn line
  //svg.selectAll("path").remove();

  // Set a light grey class on old paths
  // layer3.selectAll("path").attr("class", "old");
  let path1 = layer3.append("path")
    .attr("d", line1(line1Data))
    .attr("stroke", "darkgrey")
    .attr("stroke-width", "1")
    .attr("fill", "none");
  let line1Len = path1.node().getTotalLength();
  path1
    .attr("stroke-dasharray", line1Len + " " + line1Len)
    .attr("stroke-dashoffset", line1Len)
    .transition()
    .duration(500)
    .ease(d3.easeLinear)
    // .ease(d3.easeElastic)

    .attr("stroke-dashoffset", 0);
  // .on("end", oneline);
};

//Done
let animeLine2 = () => {
  let shapeColor = randomColor({ hue: 'green', format: 'rgba', alpha: 0.8 });
  let xPos = Math.floor(Math.random() * 120 + 20);
  let yPos = Math.floor(Math.random() * 50 + 20);
  let angle = Math.floor(Math.random() * 360);

  let size = Math.random() * 0.5 + 0.5;

  let line2 = d3.line();
  let line2Data = [[0, 20], [10, 10], [20, 20], [30, 10], [40, 20], [50, 10]];
  let path2 = layer3.append("path")
    .attr("d", line2(line2Data))
    .attr("stroke", shapeColor)
    .attr("stroke-width", "2")
    .attr("fill", "none");
  let line2Len = path2.node().getTotalLength();

  path2
    .attr("stroke-dashoffset", 0)
    .attr("stroke-dasharray", line2Len + " " + line2Len)
    .attr("stroke-dashoffset", line2Len)
    .attr('transform', `translate(${xPos},${yPos}) rotate(${angle}) scale(${size})`)
    // .attr('transform',`translate(10,70) `)
    .transition()
    .duration(2000)
    .ease(d3.easeElastic)
    .attr("stroke-dashoffset", 0)
  // .attr('transform',"translate(50,50)");
  // .attr('transform',"translate(50,50)scale(1)");

};

//Done
let animeArc1 = () => {
  // credit to http://jsfiddle.net/Nw62g/1/
  let data = [{ name: "one", value: 100 },
  { name: "two", value: 100 },
  /*{name: "three", value:  832},
  {name: "four", value:  516}, 
    // { name: "five", value: 100 }*/];
  let radius = Math.floor(Math.random() * 10 + 10);
  let shapeColor = randomColor({ hue: 'blue', format: 'rgba', alpha: 0.8 });
  let xPos = Math.floor(Math.random() * 120 + 20);
  let yPos = Math.floor(Math.random() * 50 + 20);
  let angle = Math.floor(Math.random() * 360);
  let size = Math.random() * 0.6 + 0.3;

  let chart = layer3
    .append("g")

  // .attr("transform", 'translate(20,20)');

  let arc = d3.arc()
    .outerRadius(20)
    .innerRadius(16);

  let pie = d3.pie()
    .sort(null)
    .startAngle(0)
    .endAngle(2 * Math.PI)
    .value(function (d) { return d.value; });

  let g = chart.selectAll(".arc")
    .data(pie(data))
    .enter().append("g")
    .attr("class", "arc")
    .attr("transform", `translate(${xPos},${yPos}) rotate(${angle}) scale(${size})`);

  g.append("path")
    .style("fill", shapeColor)
    .transition()
    .ease(d3.easeElastic)
    .duration(1000)
    .attrTween('d', function (d) {
      var i = d3.interpolate(d.startAngle + 0.1, d.endAngle);
      return function (t) {
        d.endAngle = i(t);
        return arc(d);
      }
    });
}

//Done
let animePie1 = () => {
  let data = [{ name: "one", value: 100 },
//  {name: "two", value:  100},
  /*{name: "three", value:  832},
  {name: "four", value:  516}, 
    // { name: "five", value: 100 }*/];

  let shapeColor = randomColor({ hue: 'blue', format: 'rgba', alpha: 0.8 });
  let xPos = Math.floor(Math.random() * 120 + 20);
  let yPos = Math.floor(Math.random() * 50 + 20);
  let angle = Math.floor(Math.random() * 360);
  let arcAngle = Math.PI * (Math.random() * 0.4 + 1.4);
  let size = Math.random() * 0.3 + 0.5;

  let chart = layer3
    .append("g")
    .attr("transform", `translate(${xPos},${yPos}) rotate(${angle}) scale(${size})`);

  let arc = d3.arc()
    .innerRadius(0)
    .outerRadius(20);

  let pie = d3.pie()
    .sort(null)
    .startAngle(0)
    .endAngle(arcAngle)
    .value(function (d) { return d.value; });

  let g = chart.selectAll(".arc")
    .data(pie(data))
    .enter().append("g")
    .attr("class", "arc");

  g.append("path")
    .style("fill", shapeColor)
    .transition()
    .ease(d3.easeElastic)
    .duration(1000)
    .attrTween('d', function (d) {
      // console.log(d);
      var i = d3.interpolate(d.startAngle + 0.1, d.endAngle);
      return function (t) {
        d.endAngle = i(t);
        return arc(d);
      }
    });


}

//Done
let animeRect1 = () => {
  let shapeColor = randomColor({ hue: 'blue', format: 'rgba', alpha: 0.4 });
  // let xPos= 150;
  // let yPos=10;
  let xPos = Math.floor(Math.random() * 130 + 20);
  let yPos = Math.floor(Math.random() * 70 + 10);
  let angle = Math.floor(Math.random() * 360);
  let size = Math.random() * 1 + 1;
  let rectWidth = 10;
  let rectHeight = 10;

  let thisRect = layer3.append('g').attr("transform", `translate(${xPos},${yPos}) rotate(${angle})`);

  let line = d3.line();
  let lineData = [[10, 10], [10, -10], [-10, -10], [-10, 10], [10, 10]];
  let path = thisRect.append("path")
    .attr("d", line(lineData))
    .attr("stroke", 'none')
    .attr("fill", shapeColor)
    .attr('transform', `scale(0)`)
    .transition()
    .duration(1000)
    .ease(d3.easeElastic)
    .attr('transform', `scale(${size}) `);




  // thisRect.append('rect')
  //   .attr('fill', shapeColor)
  //   .attr("x", xPos)
  //   .attr("y", yPos)
  //   .attr('width', rectWidth)
  //   .attr('height', rectHeight)
  //   .attr('transform', `scale(1) `)
  //   .transition()
  //   .duration(1000)
  //   .ease(d3.easeLinear)
  //   .attr("transform",  `translate(${-(xPos + rectWidth/ 2) * (size - 1)}, ${-(yPos+ rectHeight / 2) * (size - 1)} ) scale(${size})` );

  //   thisRect.attr("transform", `rotate(${angle})`);


}

//Done
let animeRect2 = () => {
  let shapeColor = randomColor({ hue: 'blue', format: 'rgba', alpha: 0.8 });
  let xPos = Math.floor(Math.random() * 120 + 20);
  let yPos = Math.floor(Math.random() * 50 + 20);
  let angle = Math.floor(Math.random() * 360);

  let size = Math.random() * 0.4 + 0.8;


  let rectGroup = layer3.append("g")
    .attr("transform", `translate(${xPos},${yPos}) rotate(${angle}) scale(${size})`);

  let rectWid = 20;
  let rectHeight = 2.4;
  let spacing = 5;
  let data = [1, 2, 3, 4];

  rectGroup.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', 0)
    .attr('y', function (d, i) {
      return i * spacing;
    })
    .attr('fill', shapeColor)
    // .attr('fill-opacity', 0.8)
    .attr('width', 0)
    .attr('height', rectHeight)
    .transition()
    .duration(function (d) { return Math.random() * 300 + 300 })
    .ease(d3.easeElastic)
    .attr("width", rectWid)

}

//Done
let animeTris1 = () => {
  let shapeColor = randomColor({ hue: 'green', format: 'rgba', alpha: 0.8 });

  let xPos = Math.floor(Math.random() * 150);
  let yPos = Math.floor(Math.random() * 60);
  let angle = Math.floor(Math.random() * 360);

  let data = [1, 2, 3, 4, 5, 6, 7, 8];
  let triSize = 5;
  let triGroup = layer3.append("g");
  let symbolGenerator = d3.symbol()
    .type(d3.symbolTriangle)
    .size(triSize);
  let pathData = symbolGenerator();

  let size = Math.random() * 0.6 + 0.3;

  triGroup.selectAll('path')
    .data(data)
    .enter()
    .append('path')
    .attr("d", pathData)
    .attr('fill', shapeColor)
    .attr('fill-opacity', 0.8)
    .attr("transform", function (d) {
      return 'translate(' + Math.random() * 50 + ',' + Math.random() * 50 + ') scale(0.1)';
    })
    .transition()
    .duration(200)
    .ease(d3.easeLinear)
    .attr("transform", function (d) {
      return 'translate(' + Math.random() * 50 + ',' + Math.random() * 50 + ') rotate(' + Math.random() * 360 + ')';
    })
  triGroup.attr("transform", `translate(${xPos},${yPos})`);

}

//Done
let animeCross1 = () => {
  let shapeColor = randomColor({ hue: 'green', format: 'rgba', alpha: 0.8 });
  let xPos = Math.floor(Math.random() * 140 + 20);
  let yPos = Math.floor(Math.random() * 70 + 20);
  let angle = Math.floor(Math.random() * 360) + 360;

  let crossSize = Math.random() * 100 + 100;
  let symbolGenerator = d3.symbol()
    .type(d3.symbolCross)
    .size(crossSize);
  let pathData = symbolGenerator();


  layer3
    .append('path')
    .attr("d", pathData)
    .attr('fill', shapeColor)
    .attr('fill-opacity', 0.8)
    .attr("transform", `translate(${xPos},${yPos}) scale(0.1) rotate(0)`)
    // .attr("transform", `translate(160,90) scale(0.1) rotate(0)`)
    .transition()
    .duration(800)
    .ease(d3.easeElastic)
    .attr("transform", `translate(${xPos},${yPos}) scale(1) rotate(${angle})`)
  // .attr("transform", `translate(160,90) scale(1) rotate(${angle})`)
}

//-------------Done
let animeCricleBg = () => {
  let shapeColor = randomColor({ hue: 'blue', format: 'rgba', alpha: 0.8 });
  let circleX = Math.random() * 140 - 20;
  let circleY = - Math.random() * 20 + 100;

  // let circleX2=Math.random() * 140 -20;
  // let circleY2=- Math.random() * 20;

  layer1
    .append('circle')
    .attr('fill', shapeColor)
    .attr('fill-opacity', 0.8)
    .attr('r', 0)
    .attr("transform", function (d) {
      return `translate(${circleX},${circleY})`;
    })
    .transition()
    .duration(500)
    .ease(d3.easeLinear)
    .attr('r', 250)
}

let animeCricle2 = () => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);


  layer3
    .append("circle")
    .attr("fill", 'none')
    .attr("stroke", '#' + randomColor)
    .attr("r", 10)
    .attr('cx', Math.floor(Math.random() * 120 + 20))
    .attr('cy', Math.floor(Math.random() * 50 + 20))
    .transition()
    .ease(d3.easeElastic)           // control the speed of the transition
    .duration(3000)           // apply it over 2000 milliseconds
    .attr("r", Math.floor(Math.random() * 50 + 10));
}

//------------Not going to use it
let animeLine3 = (shapeColor) => {

  layer3.append('g').append('path')
    .attr("stroke", "darkgrey")
    .attr("stroke-width", "1")
    .attr('fill', 'none')
    .transition()
    .duration(1000)
    .ease(d3.easeElastic)
    .attrTween('d', function () {
      // M x y - move cursor to x, y
      // s x2 y2 x y - draw a smooth curve using control point x2, y2, to end point x, y
      // (it's a lower case s so use relative coords)
      return function (t) { return 'M 50 50 s 50 ' + (50 - t * 50) + ' 100 0'; };
    })

}

let animeRadar1 = () => {
    // credit to https://github.com/alangrafu/radar-chart-d3
    RadarChart.defaultConfig.color = function() {};

    var data = [
      {
        className: 'radarChart',
        axes: [
          {axis: "strength", value: 6}, 
          {axis: "intelligence", value: 7}, 
          {axis: "charisma", value: 10},  
          {axis: "dexterity", value: 13},  
        ]
      }
    ];
    
    function randomDataset() {
      return data.map(function(d) {
        return {
          className: d.className,
          axes: d.axes.map(function(axis) {
            return {axis: axis.axis, value: Math.ceil(Math.random() * 10)};
          })
        };
      });
    }
    
    var chart = RadarChart.chart();
    
    var cfg = chart.config({
      containerClass: 'radar-chart', // target with css, the default stylesheet targets .radar-chart
      w: 60,
      h: 60,
      factor: 0.6,
      factorLegend: 1,
      levels: 0,
      maxValu: 0,
      minValue: 0,
      radians: 2* Math.PI,
      axisLine: false,
      axisText: false,
      circles: false,
      radius: 2,
      open: false,  // whether or not the last axis value should connect back to the first axis value
                    // if true, consider modifying the chart opacity (see "Style with CSS" section above)
      transitionDuration: 300
    });
    
    let svg = d3.select('svg');
    
    let radarChart = svg.append('g')
    // .classed('single', 1)
    .datum(randomDataset())
    .call(chart)
    .attr('fill','none')
    .attr('stroke','blue')
    .attr("stroke-width", '0.2');
}

//Done
let animeCircle3 = () => {
//credit to http://bl.ocks.org/bycoffe/3404776;
  let shapeColor = randomColor({ hue: 'blue', format: 'rgba', alpha: 0.8 });
  let xPos = Math.floor(Math.random() * 160 + 10);
  let yPos = Math.floor(Math.random() * 80 + 10);
  let size = Math.random() +0.6;
  let numNodes = 12;
  let radius = 20;
  let circleRadius = Math.random() +1;
  let radialCircles = layer3.append('g')
    .attr('transform', `translate(${xPos},${yPos}) scale(${size})`)
    // .attr('transform', `translate(10,90)`)
    ;

  let createNodes = function (numNodes, radius) {
    let nodes = [],
      width = 0, // X center of the radial
      height = 0,
      angle,
      x,
      y,
      i;
    for (i = 0; i < numNodes; i++) {
      angle = (i / (numNodes / 2)) * Math.PI; // Calculate the angle at which the element will be placed.
      // For a semicircle, we would use (i / numNodes) * Math.PI.
      x = (radius * Math.cos(angle)) + (width / 2); // Calculate the x position of the element.
      y = (radius * Math.sin(angle)) + (height / 2); // Calculate the y position of the element.
      nodes.push({ 'id': i, 'x': x, 'y': y });
    }
    return nodes;
  }

  let nodes = createNodes(numNodes, radius);
  // console.log(nodes);

  var interval = 20; // how much time should the delay between two iterations be (in milliseconds)?

  nodes.forEach(function (item, i) {
    setTimeout(function () {
      // console.log(item);

      radialCircles
        .append('circle')
        .attr('cx', item.x)
        .attr('cy', item.y)
        .attr('fill', shapeColor)
        .attr('r', 0)
        .transition()
        .duration(1200)
        .ease(d3.easeElastic)
        .attr('r', circleRadius)

    }, i * interval);
  });

  // for(let i =0; i<numNodes;i++){
  //   setTimeout(function(){
  //     radialCircles
  //     .append('circle')
  //     .attr('cx',nodes[i].x)
  //     .attr('cy',nodes[i].y)
  //     .attr('r', circleRadius)
  //   },100)

  // }

  // radialCircles.selectAll('circle')
  //   .data(nodes)
  //   .enter().append('circle')
  //   .attr('cx', function (d, i) {
  //     return d.x;
  //   })
  //   .attr('cy', function (d, i) {
  //     return d.y;
  //   })
  //   .attr('fill',shapeColor)
  //   .attr('r',0)
  //   .transition()
  //   .duration(1000)
  //   .ease(d3.easeElastic)
  //   .attr('r', circleRadius)
  //   ;





  // createElements(nodes, circleRadius);



}


// let timeCount = 1000;
// setTimeout(animeArc1,timeCount+=500);
