/* eslint-disable no-unused-vars */
/* eslint-disable no-redeclare */
'use strict';


var MallImages = [
  'bag.jpg',
  'banana.jpg',
  'bathroom.jpg',
  'boots.jpg',
  'breakfast.jpg',
  'bubblegum.jpg',
  'chair.jpg',
  'cthulhu.jpg',
  'dog-duck.jpg',
  'dragon.jpg',
  'pen.jpg',

  'pet-sweep.jpg',
  'scissors.jpg',
  'shark.jpg',
  'sweep.png',
  'tauntaun.jpg',
  'unicorn.jpg',
  'usb.gif',
  'water-can.jpg',
  'wine-glass.jpg',

];

// Globals
var leftMallImage = document.querySelector('#left_mall_img');
console.log(leftMallImage);
var centerMallImage = document.querySelector('#center_mall_img');
var rightMallImage = document.querySelector('#right_mall_img');
var groupImageSection = document.getElementById('all_Images');
var images = [];//an array to store all goats object
var totalClicks = 1;
// eslint-disable-next-line no-unused-vars
var leftImageRandom , rightImageRandom , centerImageRandom ;
// eslint-disable-next-line no-unused-vars
// var click=0;
// var views=0;

function Image(name) {
  this.name = name.split('.')[0];
  this.urlImage = `images/${name}`;
  this.clicks=0;
  this.views=0;
  images.push(this);//this its refer to the object that im created
}

function pickRandomImages() {
  leftImageRandom = images[randomNumber(0, images.length - 1)];
  rightImageRandom = images[randomNumber(0, images.length - 1)];
  centerImageRandom = images[randomNumber(0, images.length - 1)];

  while (leftImageRandom === rightImageRandom || leftImageRandom === centerImageRandom || rightImageRandom ===centerImageRandom) {
    leftImageRandom = images[randomNumber(0, images.length - 1)];
    rightImageRandom = images[randomNumber(0, images.length - 1)];
    centerImageRandom = images[randomNumber(0, images.length - 1)];

  }
  // eslint-disable-next-line no-unused-vars

  leftMallImage.setAttribute('src', leftImageRandom.urlImage);
  // eslint-disable-next-line no-undef

  leftMallImage.setAttribute('alt', leftImageRandom.name);
  leftImageRandom.views++;
  rightMallImage.setAttribute('src', rightImageRandom.urlImage);

  rightMallImage.setAttribute('alt', rightImageRandom.name);
  rightImageRandom.views++;
  centerMallImage.setAttribute('src', centerImageRandom.urlImage);

  centerMallImage.setAttribute('alt', centerImageRandom.name);
  centerImageRandom.views++;

  // eslint-disable-next-line no-empty
//   while (leftMallImage === rightMallImage || leftMallImage === centerMallImage || rightMallImage === centerMallImage) {
//     pickRandomImages();
//   }
}


for (var i = 0; i < MallImages.length; i++) {
  new Image(MallImages[i]);
}
pickRandomImages();
console.log(images);


function clickImage(e) {
  if (e.target.id === 'left_mall_img' || e.target.id === 'right_mall_img' || e.target.id === 'center_mall_img') {
    pickRandomImages();
    totalClicks++;
  }
  if (e.target.id === 'left_mall_img'){
    leftImageRandom.clicks++;
  }
  if (e.target.id === 'right_mall_img'){
    rightImageRandom.clicks++;
  }
  if (e.target.id === 'center_mall_img'){
    centerImageRandom.clicks++;
  }
  if (totalClicks === 25) {
    //remove event listener
    leftMallImage.remove();
    rightMallImage.remove();
    centerMallImage.remove();
    result();
    renderChartResults();
    // console.log('finished');

  }

}

// eslint-disable-next-line no-unused-vars
function result() {
  var ulE1 = document.getElementById('output');
  for (var j = 0; j < images.length; j++) {
    var liE1 = document.createElement('li');
    ulE1.appendChild(liE1);
    liE1.textContent = `${images[j].name} had ${images[j].clicks} votes and was shown ${images[j].views} times`;

    console.log(result);
  }
}
// eslint-disable-next-line no-undef
groupImageSection.addEventListener('click', clickImage);


//helper functions
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// chart
function renderChartResults(){
  var imagesNames = [];
  var imagesClicks = [];
  var imageViews=[];
  for(var i = 0 ; i < images.length ; i++){
    var imageName = images[i].name;
    imagesNames.push(imageName);

    var imageClick = images[i].clicks;
    imagesClicks.push( imageClick);

    var imageView = images[i].views;
    imageViews.push(imageView);
  }
  console.log(imageViews);

  var ctx = document.getElementById('myChart').getContext('2d');

  // eslint-disable-next-line no-undef
  var myChart = new Chart (ctx, {
    type: 'bar',
    data: {
      labels:imagesNames,
      datasets: [{
        label: '# of Votes',
        data: imagesClicks,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },

      {
        label: '# of Views',
        data: imageViews,
        backgroundColor:  'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(255, 159, 64, 0.2)',
        borderWidth: 1,
        type : 'bar',
        labels:imagesNames,
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}
