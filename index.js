// this to initialise our snake's direction in the stsrting 
let inputDir  = {x:0 , y:0}; 

// now initialise our musics

const foodSound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('music.mp3');

let speed=10;
let lastPaintTime=0;

let score  =0 ;

let snakeArr = [
    {x:13 , y:15}
];

food = {x:7 , y:8};

// game fucntions

function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime-lastPaintTime)/1000 < 1/speed)
    {
        return;
    }
    lastPaintTime = ctime;

   gameEngine();
}

function isCollide(snake){
    // if you hit yourself

    for (let i = 1; i < snakeArr.length; i++) {
        // const element = array[i];
        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y){
            return true;
        }
    }
    // if it hit any wall
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y>=18 || snake[0].y<=0){
        return true; 
    }

    return false;
}

function  gameEngine(){
    // part 1 updating the snake array and food

    // if we collide then

    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        alert("Game Over Press any key to play again.");
        inputDir= {x:0,y:0};
        snakeArr = [{x:13 , y:15}];
        
        score = 0; 
        scoreBox.innerHTML="Score :"+ score;
    }
    // this shows after eating the food scroe increase and new food at anaother place

    if(snakeArr[0].x === food.x && snakeArr[0].y === food.y){
        foodSound.play();
        score++;
        if(score>hscore){
            hscore=score;
            localStorage.setItem("hiScore",JSON.stringify(hscore));
            HighScoreBox.innerHTML="High Score :"+hscore;

        }
        scoreBox.innerHTML="Score :"+ score;
        snakeArr.unshift({x:snakeArr[0].x+inputDir.x ,y:snakeArr[0].y+inputDir.y });
        let a =2 
        let b=16;
        food = { x: Math.round(a+ (b-a)*Math.random()),y: Math.round(a+ (b-a)*Math.random())}

    }

    // moving the snake
    for (let i = snakeArr.length-2; i >=0 ; i--) {
       // const element = array[i];
        snakeArr[i+1]={...snakeArr[i]};
                
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


    // part 2  Display the snake 
   // first make our board clean 
   board.innerHTML="";  

   // this willl generate our snake
    snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if(index === 0)
        {
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');

        }
        board.appendChild(snakeElement);
    });

    //display the food

    foodElement = document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);        
}



// main logic will be start from here

// musicSound.play();
   
// function clr () {
//     let cc=localStorage.clear();
//     return cc;
    
// }

// let clr = document.getElementById(clr1);   
// clr.addEventListener(e,"click") => {
//     localStorage.clear();
// };

let hiScore = localStorage.getItem("hiScore");
if(hiScore===null)
{
    hscore=0;
    localStorage.setItem("hiScore",JSON.stringify(hscore));
}
else{
    hscore=JSON.parse(hiScore);
    HighScoreBox.innerHTML="  High  Score :"+hiScore;
}

window.requestAnimationFrame(main);


window.addEventListener('keydown',e=>{
   // inputDir={x:0,y:1};// start the game by click any kkey
    moveSound.play();
    // musicSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("Arrw up");
            inputDir.x= 0;
            inputDir.y= -1;
            break;
            
        case "ArrowDown":
            console.log("Arrw down");
            inputDir.x= 0;
            inputDir.y= 1;
            break;
                
        case "ArrowLeft":
            console.log("Arrw left");
            inputDir.x= -1;
            inputDir.y= 0;
            break;
                    
        case "ArrowRight":
            console.log("ArrwRightp");
            inputDir.x= 1;
            inputDir.y= 0;
             break;

        default:
            break;
    }
});