var canvas, backgroundImage;


var database;

var foodS,foodStock;
var fedTime,lastFed,currentTime;
var feed,addFood,milkImg;
var foodObj;

var dog1,dog2;

function preload(){
dogImg1=loadImage("Dog.png");
dogImg=loadImage("happydog.png");
milkImg=loadImage("Milk.png");



}


function setup(){
  canvas = createCanvas(1500,500);

  foodObj = new Food();
  database = firebase.database();
  dog=createSprite(780,200,150,150);
  dog.addImage(dogImg1);
  dog.scale=0.15;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  textSize(20);

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  
}


function draw(){

  background(46,139,87);
  textSize(15);
  fill("black")
  if(lastFed>12){
    text("last feed: "+lastFed%12+"PM",450,30)

  }else if(lastFed==0){
    text("last feed: 12 AM",350,30)

  }else{
    text("last feed: "+lastFed+"AM",450,30)

  }
 
  /*if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImg);
  }*/

foodObj.display();
 drawSprites();

 fill(255,255,254);
  stroke("black");
  text("Food remaining : "+foodS,140,100);
  textSize(13);
  text("Note: Press UP_ARROW Key To Feed Drago Milk!",130,10,300,20);
}
//function to add food in stock

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
//function to update food stock and last fed time
function feedDog(){
  dog.addImage(dogImg);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
   // gameState:"Hungry"
  })
}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

//Function to write values in DB
/*function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    Food:x
  })
}*/