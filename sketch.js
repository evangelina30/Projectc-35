//Create variables here
var dog;
var happydog;
var database;
var sfood;
var foodstock;
var BackgroundImage;

function preload()
{
	//load images here
  BackgroundImage =loadImage("images/real-space-BG.png");
  dogimage = loadImage("images/dogImg.png");
  happydog = loadImage("images/dogImg.png");
 
}

function setup() {
  database = firebase.database();
	createCanvas(500, 500);

  dog = createSprite(150,150,50,50);
  dog.addImage(dogimage);
  dog.scale=0.15;
  

  foodstock=database.ref('Food');
  foodstock.on("value",readStock);
  textSize(20);
}


function draw() {  
  background(BackgroundImage);
  if(keyWentDown(UP_ARROW)){
    writeStock(sfood);
    dog.addImage(happydog);
  }

  drawSprites();
  //add styles here
  fill(255,255,254);
   stroke("black");
   text("Food remaining : "+sfood,170,200);
   textSize(13);
   text("Note: Press UP_ARROW Key To Feed Drago Milk!",130,10,300,20);
}
function readStock(data){
  sfood=data.val();
}
function writeStock(x){
  if (x <=0){
    x=0
  }else{
 x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}


