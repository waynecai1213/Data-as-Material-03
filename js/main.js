
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
  cityName = document.getElementById('inputCity').value;
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
    });


  idx = 0;
  clearTimeout(timeOut);
  timeOut = setTimeout(function () {
    interval = setInterval(playSound, 500);
  }, 3000)

}


function playSound() {
  // console.log(playlist.length);
  // go to next

  if (idx < playlist.length) {
    testAnime();
    // shapeAnime();
    //Call shape animation
    // shapeAnime(skyinfos[idx]);

    current = playlist[idx++];

    // check if is the last of playlist and return to first
    // if (idx >= playlist.length)
    //   idx = 0;
    // return to begin
    current.currentTime = 0;
    // play
    current.play();
    console.log("play")

  } else {
    clearInterval(interval);
  }


}

function twojstest() {
  // // Make an instance of two and place it on the page.
  // var elem = document.getElementById('myCanvas');
  // var params = { width: 285, height: 200 };
  // // var params = { type: Two.Types[type],
  // //   fullscreen: true};
  // var two = new Two(params).appendTo(elem);

  // var circle1 = two.makeCircle(-70, 0, 50);
  // var rect1 = two.makeRectangle(70, 0, 100, 100);
  // circle1.fill = '#FF8000';
  // circle1.stroke = 'orangered';
  // rect1.fill = 'rgba(0, 200, 255, 0.75)';
  // rect1.stroke = '#1C75BC';

  // // Groups can take an array of shapes and/or groups.
  // var shape1 = two.makeGroup(circle1, rect1);

  // // And have translation, rotation, scale like all shapes.
  // shape1.translation.set(two.width / 2, two.height / 2);
  // shape1.rotation = Math.PI;
  // shape1.scale = 0.75;

  // // You can also set the same properties a shape have.
  // shape1.linewidth = 7;
  // // Don't forget to tell two to render everything
  // // to the screen
  // two.update();
}

function pxix() {
  const type = "WebGL";
  if (!PIXI.utils.isWebGLSupported()) {
    type = "canvas";
  }
  PIXI.utils.sayHello(type);
}

function shapeAnime() {

  // switch (idx-1){
  //  case 0: 
  //   d3.select('svg')
  //   .append("circle") 
  //   .attr("fill", "steelblue")
  //   .attr("r", 20)
  //   .attr('cx', 10)          // position the circle at 40 on the x axis
  //   .attr('cy', 20) 
  //   .transition()             
  //   .ease(d3.easeElastic)           // control the speed of the transition
  //   .duration(5000)           // apply it over 2000 milliseconds
  //   .attr("r", 90 );
  //   break;

  // case 1:
  //   d3.select('svg')
  //   .append("rect")
  //   .attr('x',10)
  //   .attr('y',10)
  //   .attr('height',20)
  //   .attr('width',20)
  //   .transition()             
  //   .ease(d3.easeBounce)
  //   .duration(4000)  
  //   .attr('height',100)
  //   .attr('width',100);
  //   break;
  // } 
}

function testAnime() {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  layer3
    .append("circle")
    .attr("fill", 'none')
    .attr("stroke", '#' + randomColor)
    .attr("r", 10)
    .attr('cx', Math.floor(Math.random() * 200))
    .attr('cy', Math.floor(Math.random() * 100))
    .transition()
    .ease(d3.easeElastic)           // control the speed of the transition
    .duration(3000)           // apply it over 2000 milliseconds
    .attr("r", Math.floor(Math.random() * 50 + 10));
}



// line drawing animation, credit to: https://bl.ocks.org/basilesimon/f164aec5758d16d51d248e41af5428e4
let curveX = d3.scaleLinear().domain([0, 10]).range([0, 100]);
let curveY = d3.scaleLinear().domain([0, 10]).range([-10, 150]);

// var line = d3.line()
//   .x(function(d,i) {console.log(x(i)); return x(i);})
//   .y(function(d) {return y(d);})
//   .curve(d3.curveNatural)
let line1 = d3.line()
  .x(function (d, i) { return curveX(d) + i * 20; })
  .y(function (d, i) { console.log(curveY(i)); return curveY(i); })
  .curve(d3.curveNatural)
// .curve(de.curveLinear)

// data is created inside the function so it is always unique
let animeLine1 = () => {
  let line1Data = d3.range(10).map(function () { return Math.random() * 10 })
  console.log(line1Data);
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
    .duration(1000)
    .ease(d3.easeLinear)
    // .ease(d3.easeElastic)

    .attr("stroke-dashoffset", 0);
  // .on("end", oneline);
};




let animeLine2 = () => {
  let line2 = d3.line();
  let line2Data = [[0, 20], [10, 10], [20, 20], [30, 10], [40, 20]];
  let path2 = layer3.append("path")
    .attr("d", line2(line2Data))
    .attr("stroke", "darkgrey")
    .attr("stroke-width", "1")
    .attr("fill", "none");
  let line2Len = path2.node().getTotalLength();
  path2
    .attr("stroke-dashoffset", 0)
    .attr("stroke-dasharray", line2Len + " " + line2Len)
    .attr("stroke-dashoffset", line2Len)
    // .attr('transform',"translate(50,50)scale(1)rotate(180)")
    .transition()
    .duration(500)
    .ease(d3.easeLinear)
    .attr("stroke-dashoffset", 0);
  // .attr('transform',"translate(50,50)scale(1)");

};

let animeArc1 = () => {
  // credit to http://jsfiddle.net/Nw62g/1/
  let data = [  {name: "one", value: 100},
 {name: "two", value:  100},
  /*{name: "three", value:  832},
  {name: "four", value:  516}, 
    // { name: "five", value: 100 }*/];

  let chart = layer3
    .append("g")
    .attr("transform", "translate(" + (Math.random() * 50 +10) + "," + (Math.random() * 50 +10)+ ")");

  let arc = d3.arc()
    .outerRadius(20)
    .innerRadius(15);

  let pie = d3.pie()
    .sort(null)
    .startAngle(0)
    .endAngle(2 * Math.PI)
    .value(function (d) { return d.value; });

  let g = chart.selectAll(".arc")
    .data(pie(data))
    .enter().append("g")
    .attr("class", "arc");

  g.append("path")
    .style("fill", 'grey')
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

let animePie1 = () => {
  let data = [  {name: "one", value: 100},
//  {name: "two", value:  100},
  /*{name: "three", value:  832},
  {name: "four", value:  516}, 
    // { name: "five", value: 100 }*/];

  let chart = layer3
    .append("g")
    .attr("transform", "translate(" + (Math.random() * 50 +10) + "," + (Math.random() * 50 +10)+ ")");

  let arc = d3.arc()
    .innerRadius(0)
    .outerRadius(20);

  let pie = d3.pie()
    .sort(null)
    .startAngle(0)
    .endAngle(1.6 * Math.PI)
    .value(function (d) { return d.value; });

  let g = chart.selectAll(".arc")
    .data(pie(data))
    .enter().append("g")
    .attr("class", "arc");

  g.append("path")
    .style("fill", 'grey')
    .attr('fill-opacity', 0.8)
    .transition()
    .ease(d3.easeLinear)
    .duration(200)
    .attrTween('d', function (d) {
      // console.log(d);
      var i = d3.interpolate(d.startAngle + 0.1, d.endAngle);
      return function (t) {
        d.endAngle = i(t);
        return arc(d);
      }
    });

  
}


let animeRect1 = () => {
  
    layer3.append('rect')
    .attr('width',20)
    .attr('height',10)
    .attr('transform',"translate(50,50)")
    .transition()
    .duration(100)
    .ease(d3.easeLinear)
    .attr('transform'," translate(60,55) scale(2) rotate(90) translate(-10,-5)  ");
  //   .attrTween('transform', function(d, i, a) { 
  //     return d3.interpolateString('translate(50,50) scale(1)    ',
  //                                 'translate(40,45) scale(2)   ' 
  //                                 );
  // })
  
    // .attr('transform'," translate(50,50) scale(2) ")
}

let animeRect2 = (shapeColor) => {
  let rectGroup= layer3.append("g")
  .attr("transform", "translate(" + (Math.random() * 50 +10) + "," + (Math.random() * 50 +10)+ ") rotate(" +Math.random() * 360+')');

  let rectWid =30;
  let rectHeight=2;
  let spacing=5;
  let data = [1,2,3,4];

  rectGroup.selectAll('rect')
  .data(data)
  .enter()
  .append('rect')
  .attr('x',0)
  .attr('y',function(d,i){
    return i*spacing;
  })
  .attr('fill',shapeColor)
  .attr('fill-opacity', 0.8)
  .attr('width',0)
  .attr('height',rectHeight)
  .transition()
  .duration(function(d){ return Math.random() * 300+200} )
  .ease(d3.easeLinear)
  .attr("width",  rectWid)
  
}

let animeTris1 = (shapeColor) => {

  let data = [1,2,3,4,5,6,7,8];
  let triSize=5;
  let triGroup= layer3.append("g");
  let symbolGenerator = d3.symbol()
	.type(d3.symbolTriangle)
  .size(triSize);
  let pathData = symbolGenerator();

  triGroup.selectAll('path')
  .data(data)
  .enter()
  .append('path')
  .attr("d", pathData)
  .attr('fill',shapeColor)
  .attr('fill-opacity', 0.8)
  .attr("transform", function(d) {
    return 'translate(' + (Math.random() * 50 +10) + ','+ (Math.random() * 50 +10) + ') scale(0.1)';
  } )
  .transition()
  .duration(200)
  .ease(d3.easeLinear)
  .attr("transform", function(d) {
    return 'translate(' + (Math.random() * 50 +10) + ','+ (Math.random() * 50 +10) + ') rotate('+Math.random() * 360 +')';
  } )

  
}

let animeCross1 = (shapeColor) => {
 
  let crossSize=50;
  let symbolGenerator = d3.symbol()
	.type(d3.symbolCross)
  .size(crossSize);
  let pathData = symbolGenerator();
  let shapeX=Math.random() * 50 +10;
  let shapeY=Math.random() * 50 +10;
  
   layer3
  .append('path')
  .attr("d", pathData)
  .attr('fill',shapeColor)
  .attr('fill-opacity', 0.8)
  .attr("transform", function(d) {
    return `translate(${shapeX},${shapeY}) scale(0.1) rotate(0)`;
  } )
  .transition()
  .duration(200)
  .ease(d3.easeLinear)
  .attr("transform", function(d) {
    return `translate(${shapeX},${shapeY}) scale(1) rotate(`+Math.random() * 360 +')';
  } )

}

let animeCricle1 =(shapeColor) => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);

  let circleX=Math.random() * 140 -20;
  let circleY=- Math.random() * 20 +100;

  // let circleX2=Math.random() * 140 -20;
  // let circleY2=- Math.random() * 20;

  layer1
  .append('circle')
  .attr('fill','#'+randomColor)
  .attr('fill-opacity', 0.8)
  .attr('r',0)
  .attr("transform", function(d) {
    return `translate(${circleX},${circleY})`;
  } )
  .transition()
  .duration(500)
  .ease(d3.easeLinear)
  .attr('r',200)
}

let timeCount=0;

// setTimeout(animeLine1,timeCount+=500s);
// setTimeout(animeLine2,timeCount+=500);
// setTimeout(animeArc1,timeCount+=500);
// // animePie1();
// setTimeout(animeRect2('grey'),500);
// animeLine2();
// animePie1();
// animeTris1('grey');
// animeCross1('grey');
// animeCricle1('red');