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

function Product(name, fileExtention = 'jpg', score = 0, views = 0){
  this.name = name;
  this.fileExtention = fileExtention;
  this.src = `img/${this.name}.${fileExtention}`;
  this.score = score;
  this.views = views;
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
    storeProducts();
  }else{
    renderProducts();
  }

}

// Lab 13 - Local Storage

// function to store - do this when displaying chart
function storeProducts(){
  let productsInfoString = JSON.stringify(allProducts);
  localStorage.setItem('products', productsInfoString);
}

// function to getStored - do this upon initialization
function getProducts(){
  // check if localstorage has orders?
  // if there are no orders potentialOrders will be null
  let productTallies = localStorage.getItem('products');
  // if it does have orders, unpack them
  if(productTallies){
    allProducts = [];
    let parsedProducts = JSON.parse(productTallies);
    //allProducts = parsedProducts; //I tried it here
    
    // POJO — Plain old JavaScript objects
    // reinstantiate — turn them POJOs back into instances of Drink (if using .prototype but it did it here as well)
    // OLD WAY: for (let i = 0; i < parsedOrders.length; i++)
    // NEW WAY: for (let varNameToReferToEachItemInArray of nameOfArray )
    
    for (let product of parsedProducts) {
      let name = product.name;
      let fileExtention = product.fileExtention;
      let score = product.score;
      let views = product.views;
      makeProduct(name, fileExtention, score, views);
    }
    
    // I may not have had to done the reinstatiation here bc general function and not prototype
    // question is can i just set allProducts to whatever parsedProducts is and it work?
    //It does work hahaha
  }
}

// make a product
function makeProduct(name, fileExtention, score, views){
  let addProduct = new Product(name, fileExtention, score, views);
  allProducts.push(addProduct);

}




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
            color: 'rgba(2, 299, 132, 0.6)',
            display: true,
            text: 'Tally',
            font: {size: 25}
          }
        },
        x:{
          title: {
            color: 'rgb(2, 299, 132, 0.6)',
            display: true,
            text: 'Products',
            font: {size: 25}

          }
        }
      }
    },
  };


  //there is a link in the html to the new Chart, VS Code doesn't like it
  const myChart = new Chart(
    document.getElementById('myChart'),
    config
  );

}

// Executable Code
getProducts(); //I let the initial creation occur but then if there is localStorage I just clear the old array of products and generate a new array with the data

imgContainer.addEventListener('click', handleClick);

renderProducts();
