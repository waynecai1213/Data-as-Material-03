
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


let page1 = document.getElementById("page1");
let page2 = document.getElementById("page2");
let page3 = document.getElementById("page3");
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
  page1.classList.add("m-fadeOut");
  pageBG.classList.add("m-fadeOut");
  // page2.classList.add("m-fadeIn");
  cityName = document.getElementById('inputCity').value;

  document.getElementById('cityTitle').innerHTML='RHYTHEM FROM '+ cityName.toUpperCase() +' SKY';
  document.getElementById('cityTitle2').innerHTML='RHYTHEM FROM '+ cityName.toUpperCase() +' SKY';

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
      ifGetData=true;


    })
    .catch(function() {
        //another page to handle error? 
        console.log("error");
    });;

//Start Drawing and Playing Beat
  idx = 0;
  clearTimeout(timeOut);
  timeOut = setTimeout(function () {
    page2.classList.add("m-fadeOut");
    interval = setInterval(playSound, 500);
  }, 3000)


}



function playSound() {
  // console.log(playlist.length);
  // go to next

  if (idx < playlist.length) {
   
    //Call shape animation
    testAnime();
    // shapeAnime(skyinfos[idx]);

    current = playlist[idx++];
    // check if is the last of playlist
    if (idx >= playlist.length){
      setTimeout(function(){ 
      page1.classList.remove('m-fadeOut');
      page1.classList.add('m-fadeIn')
    
    }, 3000);
     

    }
     
    // return to begin
    current.currentTime = 0;
    // play
    current.play();
    console.log("play")

  } else {
    clearInterval(interval);
  }

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




let animeLine1 = () => {
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
 
  let crossSize=100;
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
    return `translate(${shapeX},${shapeY}) scale(1) rotate(`+(Math.random() * 360+360) +')';
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

let animeLine3 =(shapeColor) => {

  layer3.append('g').append('path')
  .attr("stroke", "darkgrey")
  .attr("stroke-width", "1")
  .attr('fill','none')
.transition()
.duration(1000)
.ease(d3.easeElastic)
 .attrTween('d', function() {
  // M x y - move cursor to x, y
  // s x2 y2 x y - draw a smooth curve using control point x2, y2, to end point x, y
  // (it's a lower case s so use relative coords)
  return function(t) { return 'M 50 50 s 50 ' + (50-t * 50 ) + ' 100 0'; };
  })

} 

let animeRadar1 =(shapeColor) => {

  let data = [
    {
      className: 'argentina',
      axes: [
        {axis: "strength", value: 6}, 
        {axis: "intelligence", value: 7}, 
        {axis: "charisma", value: 10},  
        {axis: "dexterity", value: 13},  
        {axis: "luck", value: 9}
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


  let chart = RadarChart.chart();

  let cfg = chart.config(); // retrieve default config
  let svg = d3.select('body').append('svg')
    .attr('width', cfg.w + cfg.w + 50)
    .attr('height', cfg.h + cfg.h / 4);
  svg.append('g').classed('single', 1).datum(randomDataset()).call(chart);
  
  RadarChart.defaultConfig.color = function() {};
  RadarChart.defaultConfig.radius = 3;
  RadarChart.defaultConfig.w = 400;
  RadarChart.defaultConfig.h = 400;

  // many radars
  chart.config({w: cfg.w / 4, h: cfg.h / 4, axisText: false, levels: 0, circles: false});
  cfg = chart.config();

  function render() {
    let game = svg.selectAll('g.game').data(
      [
        randomDataset(),
        randomDataset(),
        randomDataset(),
        randomDataset()
      ]
    );
    game.enter().append('g').classed('game', 1);
    game
      .attr('transform', function(d, i) { return 'translate('+((cfg.w * 4) + 50 + (i * cfg.w))+','+ (cfg.h * 1.3) +')'; })
      .call(chart);
  
    setTimeout(render, 1000);
  }
  render();

  
}

let timeCount=1000;

// animeLine1();
// setTimeout(animeLine1,timeCount+=500);
// setTimeout(animeLine2,timeCount+=500);
// setTimeout(animeArc1,timeCount+=500);
// animePie1();
setTimeout(animeRect2('grey'),timeCount+=500);
// setTimeout(animeLine2,timeCount+=500);
// setTimeout(animePie1,timeCount+=500);
// setTimeout(animeTris1('grey'),timeCount+=500);
setTimeout(animeCross1('grey'),timeCount+=500);
// setTimeout(animeCricle1('red'),timeCount+=500);
// setTimeout(animeLine3,timeCount+=500);