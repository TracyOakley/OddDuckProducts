'use strict';

console.log("hi");

//Global Variables

let numOfVotes = 0;
let maxVotes = 25;


//Window to the DOM

let imgContainer = document.getElementById('imgContainer');

//let results = document.querySelector('ul');

let queArray = [];

let image1 = document.getElementById('image1');
let image2 = document.getElementById('image2');
let image3 = document.getElementById('image3');

//Constructor for Products

function Product(name, fileExtention = 'jpg'){
  this.name = name;
  this.fileExtention = fileExtention;
  this.src = `img/${this.name}.${fileExtention}`;
  this.score = 0;
  this.views = 0;
}

let bag = new Product('bag');
let banana = new Product('banana');
let bathroom = new Product('bathroom');
let boots = new Product('boots');
let breakfast = new Product('breakfast');
let bubblegum = new Product('bubblegum');
let chair = new Product('chair');
let cthulhu = new Product('cthulhu');
let dogduck = new Product('dogduck');
let dragon = new Product('dragon');
let pen = new Product('pen');
let petsweep = new Product('petsweep');
let scissors = new Product('scissors');
let shark = new Product('shark');
let sweep = new Product('sweep', 'png');
let tauntaun = new Product('tauntaun');
let unicorn = new Product('unicorn');
let watercan = new Product('watercan');
let wineglass = new Product('wineglass');

let allProducts = [bag, banana, bathroom, boots, breakfast,bubblegum, chair, cthulhu, dogduck, dragon, pen, petsweep, scissors, shark, sweep, tauntaun, unicorn, watercan, wineglass];

function randomProduct(){
  return Math.floor(Math.random() * allProducts.length);
}

function renderProducts(){
  
  while (queArray.length < 6) {
    let ranNum = randomProduct();
    if (!queArray.includes(ranNum)) {
      queArray.push(ranNum);
    }
  }
  console.log(queArray);
  let img1 = queArray.shift();
  let img2 = queArray.shift();
  let img3 = queArray.shift();

  image1.src = allProducts[img1].src;
  image1.alt = allProducts[img1].name;
  allProducts[img1].views++;

  image2.src = allProducts[img2].src;
  image2.alt = allProducts[img2].name;
  allProducts[img2].views++;

  image3.src = allProducts[img3].src;
  image3.alt = allProducts[img3].name;
  allProducts[img3].views++;

}
/*
function renderResults(){
  for(let i = 0; i < allProducts.length;i++){
    let li = document.createElement('li');
    li.textContent = `${allProducts[i].name} had ${allProducts[i].score} votes and was seen ${allProducts[i].views} times.`;
    results.appendChild(li);
  }
}
*/

function handleClick(event){

  if(event.target === imgContainer){
    alert('Please click on an image.');
  }

  numOfVotes++;
  let productPicked = event.target.alt;
  console.log(productPicked);

  for (let i = 0; i < allProducts.length;i++){
    if(event.target.alt === allProducts[i].name){
      allProducts[i].score++;
      break;
    }
  }

  if(numOfVotes === maxVotes){
    imgContainer.removeEventListener('click', handleClick);
    displayChart();
    //renderResults();
    //addButton();
  }else{
  //results.innerHTML=('');
    renderProducts();
  }

}
/*
function handleResults(){
  results.innerHTML='';
  results.removeEventListener('click', handleResults);
  renderResults();
}

function addButton(){
  let button = document.createElement('p');
  button.textContent= 'Results';
  results.appendChild(button);
  results.addEventListener('click', handleResults);
}
*/


// Lab 12 - Chart.js  new Chart comes from link in html


function displayChart(){

  let productNames = [];
  let productViews = [];
  let productScore = [];
  for (let i = 0; i < allProducts.length; i++) {
    productNames.push(allProducts[i].name);
    productViews.push(allProducts[i].views);
    productScore.push(allProducts[i].score);
  }


  const data = {
    labels: productNames,
    datasets: [{ 
      label: '# of Views',
      data: productViews,
      backgroundColor: [
        'rgba(2, 299, 132, 0.5)'
      ],
      borderColor: [
        'rgb(2, 299, 132)'
      ],
      borderWidth: 1,
      borderRadius: 7,
      
    },{
      label: '# of Votes',
      data: productScore,
      backgroundColor: [
        'rgba(20, 20, 20, 0.5)'
      ],
      borderColor: [
        'rgb(20, 20, 20)'
      ],
      borderWidth: 1,
      borderRadius:7,
    }]
  };

  const config = {
    type: 'bar',
    data: data,
    options: {
      plugins: {
        legend: {
          labels: {
          // This more specific font property overrides the global property
            font: {
              size: 20
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            color: 'brown',
            display: true,
            text: 'Tally',
            font: {size: 25}
          }
        },
        x:{
          title: {
            color: 'brown',
            display: true,
            text: 'Products',
            font: {size: 25}

          }
        }
      }
    },
  };



  const myChart = new Chart(
    document.getElementById('myChart'),
    config
  );

}



imgContainer.addEventListener('click', handleClick);

renderProducts();
//renderResults();
