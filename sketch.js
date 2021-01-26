var dog, dog1, happy_dog;
var database, foodS;

var foodObj;
var fedTime, lastFed;
var addFood;
var feed;
var backImg;

function preload()
{
  dog1 = loadImage("images/dogImg.png");
	happy_dog = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 800);
  
  database = firebase.database();

  foodStock = database.ref('Food');
  foodStock.on("value");
  
  dog = createSprite(250, 300, 30, 30);
  dog.addImage(dog1);
  dog.scale = 0.3;

  food = new Food();

  feed = createButton("Feed the dog");
  feed.position(700, 95);
  feed.mousePressed(feed);

  addFood = createButton("Add Food");
  addFood.position(800, 95);
  addFood.mousePressed(addFood);
}

function draw() {  
  background("green");

  fill("black");
  textSize(20);
  text("Press UP_ARROW key to feed the dog", 80, 70);

  food.display();

  fedTime = database.ref("Feed Time");
  fedTime.on("value", function(data){
      lastFed = data.val();
  });

  fill(255, 255, 254);
  textSize(15);
  if(lastFed >= 12){
    text("Last Feed: "+ lastFed%12 + "PM", 350, 30);
  }
  else if(lastFed === 0){
    text("Last Feed: 12AM", 350, 30);
  }
  else{
    text("Last Fed: "+ lastFed + "AM", 350, 30);
  }

  drawSprites();
}

function addFood(){
  foodS++;
  database.ref('/').update({
    FoodS: foodS
  })
}

function feedDog(){
    dog.addImage(happyDog);

    foodObj.updateFoodStock(foodObj.getFoodStock() - 1);
    database.ref('/').update({
      Food: foodObj.getFoodStock(),
      FeedTime: hour()
    });
}