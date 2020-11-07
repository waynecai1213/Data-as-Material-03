// let page1= d3.select('#page1');
let page1 = document.getElementById("page1");

// use the classList API to remove and add classes
// div.classList.remove("foo");
// div.classList.add("anotherclass");



function toggleClass(){
    page1.classList.toggle("m-fadeOut");
    // page1.classed("m-fadeOut",true);

}

